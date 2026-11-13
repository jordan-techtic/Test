# n8n credentials

Create these credentials in your n8n instance before activating workflows. Workflow JSON files reference them **by name only**; never commit secrets.

| Name | n8n credential type | Purpose |
| --- | --- | --- |
| Telegram API | telegramApi / httpHeaderAuth | Authenticate inbound webhook requests (header secret) and send Telegram messages |
| OpenAI API | openAiApi | Send chat text to OpenAI and receive AI-generated responses |
