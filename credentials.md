# n8n credentials

Create these credentials in the n8n UI before activating workflows. Workflow JSON files reference **name** only (`id` is assigned on import). Never commit secret values to this repository.

| Name | n8n credential type | Purpose |
| --- | --- | --- |
| MPA API Service | HTTP Header Auth (or HTTP Request credential with header auth) | Authenticated calls to MPA API services from intake validation, planning initiation, planning notification, error recording, post-launch data steps, and inbound webhook auth where specified |
| Monday.com Webhook Secret | HTTP Header Auth | Validates incoming `POST /intake-brief` webhook requests from Monday.com |
| Intake Team Email | SMTP (or Email Send) | Notifies the intake team when the intake workflow fails |
| Planning Team Email | SMTP (or Email Send) | Notifies the planning team when the planning workflow fails |
| Admin Team Email | SMTP (or Email Send) | Notifies the admin team when the error-handling workflow fails |
| Post-launch Team Email | SMTP (or Email Send) | Notifies the post-launch team when the post-launch workflow fails |

## Import mapping

After **Import from File** in n8n, open each node that shows a missing credential and select the matching entry from the table above by **name**.
