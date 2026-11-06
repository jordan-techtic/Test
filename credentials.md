# n8n credentials

Workflow JSON files reference credentials **by name only** (and optional id placeholder). Create the following credential entries in your n8n instance before activating the listed workflows. Do not put secret values in this repository.

| Credential name (in workflow JSON) | n8n credential type | Purpose |
| --- | --- | --- |
| `bootstrap-webhook-header-auth` | HTTP Header Auth | Authenticates inbound GET requests to the bootstrap placeholder webhook (`workflows/bootstrap/project-setup-placeholder.json`). |

When you add new workflows that call other systems, extend this table with one row per named credential reference before merging the workflow file.
