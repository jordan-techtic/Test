# n8n credentials

Create these credentials in your n8n instance before activating workflows. Workflow JSON files reference credentials **by name only**; secret values never belong in git.

| Name | Type | Purpose |
|------|------|---------|
| Demo Webhook Auth | Header Auth (`httpHeaderAuth`) | Authenticates inbound `POST` calls to the demo webhook (`/demo/echo`). Use header name `X-Demo-Key`. Used by `workflows/demo/webhook-echo.json`. |
| Support Webhook Auth | Header Auth (`httpHeaderAuth`) | Authenticates inbound `POST` calls to the support intake webhook (`/support/requests`). Use header name `X-Support-Key`. Used by `workflows/support/receive-request.json`. |
| Gmail OAuth2 | Gmail OAuth2 API | Read, label, draft, and send mail for the shared support mailbox. Used by inbox workflows (Gmail Trigger and Gmail nodes). |
| OpenAI API | OpenAI API | Chat model calls for triage, draft replies, and digest summaries. Used by inbox workflows (OpenAI nodes). Model id is set via n8n env `OPENAI_MODEL` where applicable. |

Sub-workflows (`Classify Request`, `Failure Alert`, and similar) do not use inbound webhook credentials.
