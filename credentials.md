# n8n credentials

Create these credentials in your n8n instance before activating workflows. Workflow JSON files reference them **by name only**; never commit secrets.

When a workflow ticket adds nodes that use a credential, add a row here (name must match the workflow’s `credentials.*.name` field).

| Name | n8n credential type | Purpose |
| --- | --- | --- |
| Telegram API | Telegram API | Access Telegram API for messaging (sibling chatbot workflows). |
| Telegram Webhook Header Auth | Header Auth | Secures the inbound **Chatbot - Receive User Message** webhook (Telegram secret token header). |
| OpenAI API Key | OpenAI | Access OpenAI API for **Chatbot - Generate AI Response** (chat model behind the AI Agent). |
