# N8n

## Assumptions

JAW-9970 Telegram AI Chatbot Response:

- The trigger stays the existing Webhook on POST /telegram with header auth credential "Telegram Webhook Secret", not a Telegram Trigger. Telegram fields are read from the webhook body.
- The OpenAI model is gpt-4o-mini with max tokens 500. The call is an HTTP Request to the OpenAI chat completions API using the "OpenAI API" credential, with 2 tries and a 3 second wait. The OpenAI node cannot retry while an error output is connected.
- Group-chat /ask gating and a private user allowlist are not in this workflow. No bot username or allowed Telegram user ids were provided. Every chat follows the text, /start, and AI paths.
- Per-chat memory is the last 10 user and assistant messages in n8n workflow static data, keyed by chat id, and is sent with each OpenAI call. Message text is not posted to the analytics webhook and is not included in the administrator alert.
- Errors are handled inside this workflow. There is no separate error workflow. The user gets the retry message, then the administrator is alerted, then Stop and Error marks the run failed.
- Telegram replies use HTML parse mode, with ampersands and angle brackets escaped, and attribution turned off, so the text shows as plain text.
- Each OpenAI attempt times out at 10 seconds. The workflow execution timeout stays 300 seconds so retries can finish. A successful answer is still expected in under 10 seconds when OpenAI responds promptly.
- Duplicate deliveries are dropped by body.update_id. When update_id is absent, the execution id is the key so the sample payload is not treated as a duplicate.
