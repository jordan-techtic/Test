# n8n credentials

Create these credentials in your n8n instance before activating workflows. Workflow JSON files reference them **by name only**; never commit secrets.

| Name | n8n credential type | Purpose |
| --- | --- | --- |
| Telegram API | `httpHeaderAuth` | Authenticates inbound webhook POSTs to the Telegram AI chatbot (e.g. Telegram `secret_token` header). |
| Telegram API | `telegramApi` | Sends outbound Telegram messages from the chatbot workflow. |
| OpenAI API | `openAiApi` | Generates AI chat responses via OpenAI. |
