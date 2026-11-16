# N8n

## Assumptions

### JAW-9939 — Generate Company Overview

- Postgres table `company_overviews` columns: `company_name` (unique key for dedupe), `overview`, `created_at`.
- Remove Duplicates uses `companyName` from the webhook payload (normalized to `company_name` on insert).
- OpenAI uses `POST {{ $env.OPENAI_API_BASE_URL }}/v1/chat/completions` with model `$env.OPENAI_MODEL` (falls back to `gpt-4o-mini` in the expression).
- Webhook authentication uses the **Outreach Webhook Header Auth** credential (standard n8n header auth on `POST /generate-company-overview`).
- Admin notification is an HTTP POST to `$env.ADMIN_ALERT_WEBHOOK_URL` (generic alerting webhook).
- Error audit rows are inserted into Postgres table `workflow_error_logs`.

### JAW-9940 — Generate Customer Overview

- Sub-workflow input is **`contactId` only** (declared on the Execute Workflow Trigger).
- Contact enrichment is loaded from Postgres table `contacts` (`contact_id`, `full_name`, `job_title`, `company_name`, `email`).
- Generated personas are stored in `customer_persona_summaries` (`contact_id`, `persona_summary`, `source`, `created_at`).
- Default fallback persona: *"A business professional who may benefit from tailored outreach about solutions relevant to their role and organization."*
- OpenAI uses the same `$env.OPENAI_API_BASE_URL` and `$env.OPENAI_MODEL` as JAW-9939.
- Errors are written to `workflow_error_logs`; the parent still receives `personaSummary` with `usedFallback: true`.
- `settings.callerPolicy` is `workflowsFromSameOwner`.

### JAW-9941 — Generate Case Study Insights

- Webhook `POST /generate-case-study-insights` with **Outreach Webhook Header Auth**.
- `caseStudyId` is treated as the **Google Drive file ID** (Docs exported to plain text on download).
- Optional `companyName` in the webhook body adds company context to the OpenAI prompt.
- Insights stored in Postgres table `case_study_insights` (`case_study_id`, `company_name`, `insights`, `created_at`).
- Remove Duplicates uses `caseStudyId`.
- Google Drive access uses **Outreach Google Drive** (`googleDriveOAuth2Api`).
- Errors logged to `workflow_error_logs` and alerted via `$env.ADMIN_ALERT_WEBHOOK_URL`.

### JAW-9942 — Generate Campaign Message Summary

- Webhook `POST /generate-campaign-message-summary` with **Outreach Webhook Header Auth**.
- `campaignId` is resolved from Postgres table `campaigns` (`campaign_id`, `company_name`).
- HTTP POST to `$env.N8N_WEBHOOK_BASE_URL/generate-company-overview` with `companyName` from the campaign row (header auth).
- HTTP POST to `$env.N8N_WEBHOOK_BASE_URL/generate-email-variants` once per request with `campaignId`.
- Summary persisted in `campaign_message_summaries` (`campaign_id`, `company_name`, `message_summary`, `company_overview`, `email_variants_result`, `created_at`).
- Remove Duplicates uses `campaignId`.

### JAW-9943 — Generate Email Variants

- Webhook `POST /generate-email-variants` with **Outreach Webhook Header Auth**.
- `actionId` maps to `contact_id` via Postgres `campaign_actions`; optional `campaignId` resolves the first action for parent callers.
- **Execute Workflow** `jaw9940-customer-overview` with declared input `contactId`.
- OpenAI returns JSON `variants[]` with `subject` and `body`; validation requires 1–5 variants, each field ≥ 10 characters.
- Stored in `email_action_variants` (`action_id`, `contact_id`, `variants_json`, `created_at`).
- Remove Duplicates uses `actionId`.

### JAW-9944 — Generate Email for Remaining Contacts

- Webhook `POST /generate-email-for-remaining-contacts` with **Outreach Webhook Header Auth**.
- Requires `contactId` and `tone`; optional `winningVariantId`.
- Winning variant loaded from `email_winning_variants` (by id or latest per contact).
- **Execute Workflow** `jaw9940-customer-overview` with `contactId`.
- OpenAI returns JSON `{ subject, body }` personalized to tone, persona, and winning variant.
- Stored in `contact_personalized_emails` (`contact_id`, `tone`, `winning_variant_id`, `email_subject`, `email_body`, `created_at`).
- Remove Duplicates uses composite `contactId|tone` (`dedupeKey`).

### JAW-9945 — Generate Trial Email Variants

- Webhook `POST /generate-trial-email` with **Outreach Webhook Header Auth**.
- Requires `subject` and `body`; optional `requestId` (defaults to `$execution.id`).
- OpenAI returns up to 5 variants as JSON `{ variants: [{ subject, body }] }`.
- Minimal audit in `trial_email_variant_audits` (`request_id`, `variant_count`, `created_at`) — no subject/body stored.
- Remove Duplicates uses `requestId`.
- Errors logged to `workflow_error_logs` with `requestId` only (no sensitive prompt content).

### JAW-9946 — Schedule Warmup Actions

- Schedule cron `0 2 * * *` with `settings.timezone` **UTC**.
- Lists up to 1000 messages via Gmail API using `$env.GMAIL_WARMUP_QUERY` and **Outreach Gmail OAuth**.
- Per message: unspam → mark read → auto-reply (`$env.GMAIL_WARMUP_REPLY_BODY`) → star → Postgres `warmup_action_logs` (message id only) → Gmail archive (remove INBOX).
- Run-level summary in `warmup_run_summaries`; errors in `workflow_error_logs` + `$env.ADMIN_ALERT_WEBHOOK_URL`.