# n8n credentials

Create these credentials in your n8n instance before activating workflows. Workflow JSON files reference them **by name only** (plus an empty `id` placeholder until import).

| Name | n8n credential type | Purpose |
| --- | --- | --- |
| Telegram API | `telegramApi` | Send and receive Telegram messages for the chatbot workflows. |
| OpenAI API Key | `openAiApi` | Generate AI chat responses via OpenAI. |
| Webhook Header Auth | `httpHeaderAuth` | Authenticates inbound webhook requests to the receive-user-message workflow. |

Store secrets only inside n8n; never commit tokens or API keys to this repository.
