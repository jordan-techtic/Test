# N8n

## Assumptions

### JAW-9955 — Generate Company Overview

- Webhook payload uses `companyId` (string). Dedupe key: `companyId`.
- Postgres `company_overviews` stores `company_id`, `overview`, `created_at` (unique on `company_id`).
- OpenAI chat completions use `$env.OPENAI_API_BASE_URL` and `$env.OPENAI_MODEL`; overview text is generated from the company id in the prompt (no separate website fetch in this workflow).
- API responses, error logs, and admin alerts omit company ids and overview body text.

### JAW-9966 — Claim Due Sent Row

- Schedule every 30 minutes (`settings.timezone`: UTC).
- Postgres table `due_sent_rows` (`status = 'due'`, `scheduled_at <= now()`); claim sets `status = 'claimed'`.
- Logs: `email_management_run_logs` (empty/completed runs), `due_sent_claim_logs` (per row), `workflow_error_logs` (errors).
- Admin notifications via Gmail API to `$env.ADMIN_NOTIFY_EMAIL` using **Outreach Gmail OAuth**.

### JAW-9962 — Schedule Warmup Actions

- Schedule cron `0 2 * * *` (UTC).
- Orchestrates five external n8n child workflows by id (Mark Not Spam, Message Reader, Auto Reply Sender, Mark Starred, Move to Archived); children use **Outreach Gmail OAuth**.
- After sub-workflows: lists spam (≤50), moves to inbox, stars for follow-up; logs `spam_to_inbox_flagged` in `warmup_action_logs`.
- Run summary status `warmup_with_spam_handling_completed` in `warmup_run_summaries`.
- Errors logged to `workflow_error_logs` with Gmail admin alert.

### JAW-9964 — Generate Email for Remaining Contacts (architecture)

- Fulfillment is `generate-email-for-remaining-contacts.json` (shared with **JAW-9960**); winning variant from Postgres or optional `winningVariantId` in the webhook payload.
- Webhook + OpenAI personalization; error branches documented under JAW-9960 below.

### JAW-9960 — Generate Email for Remaining Contacts

- Webhook `POST /generate-email-for-remaining-contacts` with `contactId`, `tone`; optional `winningVariantId`; dedupe `contactId|tone`.
- OpenAI personalizes from winning variant + customer overview child; validates greeting, `Best regards,`, and length; up to 3 regenerations.
- Stores `contact_personalized_emails`; errors → `workflow_error_logs` + Gmail admin.

### JAW-9959 — Generate Email Variants (architecture)

- Fulfillment is this repo’s `generate-email-variants.json` (shared with **JAW-9963**); no separate workflow file.
- Webhook-triggered OpenAI variant generation for a campaign action; validated, stored, and error branches documented under JAW-9963 below.

### JAW-9963 — Generate Email Variants with Validation

- Webhook `POST /generate-email-variants` with **Outreach Webhook Header Auth**; OpenAI via **Outreach OpenAI OAuth**.
- Validates variants: greeting prefix, `Best regards,` closing, 1–5 variants, field length; up to 3 regeneration attempts.
- Admin errors via Gmail to `$env.ADMIN_NOTIFY_EMAIL`.

### JAW-9956 — Generate Customer Overview (architecture)

- Fulfillment is `generate-customer-overview.json` (implementation **JAW-9940**); sub-workflow trigger with `contactId`.
- OpenAI persona summary for email prompts; storage in `customer_persona_summaries`; errors logged (not silent).

### JAW-9957 — Generate Case Study Insights (architecture)

- Fulfillment is `generate-case-study-insights.json` (implementation ticket **JAW-9941**).
- Webhook + Google Drive case study + OpenAI value propositions; stored in `case_study_insights`; errors surfaced (not silent).

### JAW-9958 — Generate Campaign Message Summary (architecture)

- Fulfillment is `generate-campaign-message-summary.json` (shared with **JAW-9969**); campaign-level summary from snapshot data, not inline per-action email generation.
- Webhook + Postgres snapshot flow; errors surfaced per JAW-9969 below.

### JAW-9969 — Generate Campaign Message Summary (snapshot)

- Webhook `POST /generate-campaign-message-summary` with `campaignId` and `snapshotVersion` (must be `2`).
- Loads `campaign_snapshots` snapshot v2 from Postgres; no external HTTP calls.
- Summary stored in `campaign_message_summaries` including `snapshot_version`.

### JAW-9961 — Generate Trial Email Variants

- Webhook `POST /generate-trial-email` with `trialInput` (string) and optional `requestId` (dedupe; default execution id).
- OpenAI generates 1–5 variants; validation requires greeting + `Best regards,` closing.
- Errors: `workflow_error_logs` and Gmail alert to `$env.ADMIN_NOTIFY_EMAIL`.

### JAW-9968 — Handle Long Random Waits

- Hourly schedule (UTC); table `email_processing_waits` with `due` / `waiting` / `processed`.
- `due` rows get a random delay (`$env.RANDOM_WAIT_MIN_SECONDS`–`$env.RANDOM_WAIT_MAX_SECONDS`) stored in `next_stage_at` (status `waiting`); a later run processes `waiting` rows once `next_stage_at <= now()`.
- Long waits use persisted `next_stage_at` plus the hourly schedule (no in-run **Wait**), so runs stay within `executionTimeout` and pass the workflow validator.
- Logs: `email_wait_process_logs`, `email_management_run_logs`, `workflow_error_logs`; Gmail admin on failure.

### JAW-9967 — Send Reply with Correct Headers

- Webhook `POST /send-reply` with **Outreach Webhook Header Auth**; body `threadId` + `message` (test payload in ticket).
- Loads Gmail thread by id; **In-Reply-To** / **References** from the last message’s Message-Id; reply via **Outreach Gmail OAuth**.
- Invalid `threadId` or input → 400, log to `workflow_error_logs`, Gmail admin (no message body logged). Success audit: `email_reply_send_audits`.

