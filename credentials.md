# n8n credentials

Create these credentials in your n8n instance before activating workflows. Workflow JSON files reference them **by name only**; never commit secrets.

| Name | n8n credential type | Purpose |
| --- | --- | --- |
| Telegram Webhook Secret | httpHeaderAuth | Authenticate inbound POST requests to the Telegram webhook |
| Telegram API | telegramApi | Send Telegram user replies, retry messages, and administrator alerts |
| OpenAI API | openAiApi | Send chat text to OpenAI and receive AI-generated responses |
