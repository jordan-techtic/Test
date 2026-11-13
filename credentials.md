# n8n credentials

Create these credentials in your n8n instance before activating workflows. Workflow JSON files reference them **by name only**; never commit secrets.

| Name | n8n credential type | Purpose |
| --- | --- | --- |
| MPA API service credential | HTTP Header Auth | Access MPA API services (notifications, planning runs, error recording, performance data) |
| Monday.com webhook secret | Header Auth | Authenticate incoming Monday.com webhook requests on the intake workflow |
