# n8n credentials

Create these credentials in your n8n instance before activating workflows. Workflow JSON files reference them **by name only**; never commit secrets.

| Name | n8n credential type | Purpose |
| --- | --- | --- |
| Inbound Email Webhook JWT | jwtAuth | Authenticate POST /email/new (Bearer JWT). |
| Gmail OAuth2 API | oAuth2Api | Gmail API read and send (HTTP Request nodes). |
| Google Sheets OAuth2 | googleSheetsOAuth2Api | Append classification and error rows. |
| Google Calendar OAuth2 | googleCalendarOAuth2Api | Upcoming events when classification is meeting-related. |
| OpenAI API | openAiApi | Classify inbound email and draft replies. |
