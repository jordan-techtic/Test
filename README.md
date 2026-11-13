# n8n workflows

Import workflow JSON from `workflows/` into n8n (keep `active: false` in git). Run `npm test` and `npm run lint` before opening a PR.

## Assumptions (AI Email Agent — JAW-9928)

- Inbound webhook uses **jwtAuth** (`Inbound Email Webhook JWT`); callers send `Authorization: Bearer <token>`.
- Webhook `email.subject` / `email.body` are authoritative; Gmail `messages.get` runs only when `email.id` or `email.messageId` is present (synthetic ids containing `::` skip fetch).
- Human approval uses a **Wait** node (`resume: webhook`) after an admin email that includes `$execution.resumeUrl`; resume query `approved=true` sends, otherwise the run ends without sending.
- Google Sheet id and tabs come from `$env` (`EMAIL_LOG_SHEET_*`, `ERROR_LOG_SHEET_TAB`); admin alerts go to `$env.ADMIN_EMAIL`.
- Google Calendar runs only when the classification JSON mentions `meeting`.
- OpenAI is prompted to return JSON with a `category` field; missing category is treated as a classification failure (logged and alerted).
- Approved sends go to `email.from` / `email.replyTo` when present; otherwise `$env.ADMIN_EMAIL` (covers the ticket test payload without a sender).
