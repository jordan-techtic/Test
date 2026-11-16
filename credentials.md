# n8n credentials

Create these credentials in your n8n instance before activating workflows. Workflow JSON files reference them **by name only**; never commit secrets.

| Name | n8n credential type | Purpose |
| --- | --- | --- |
| Outreach Webhook Header Auth | httpHeaderAuth | Authenticate inbound outreach webhooks (header checked by n8n) |
| Outreach Postgres | postgres | Read/write outreach automation data in Postgres |
| Outreach OpenAI OAuth | oAuth2Api | OpenAI chat completions via HTTP Request nodes |
| Outreach Google Drive | googleDriveOAuth2Api | Read case study files from Google Drive |
| Outreach Gmail OAuth | oAuth2Api | Gmail API via HTTP Request nodes (warmup) |