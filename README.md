# N8n

## Assumptions (JAW-9927 — Telegram AI Chatbot Response)

- Inbound webhook accepts `message.text` and `message.chat.id` at the JSON root or under `body`.
- **Log Incoming Message** POSTs analytics payloads to `$env.ANALYTICS_WEBHOOK_URL` (message text and chat id stay in that analytics channel only).
- **Prepare Error Log** records fixed stage `chatbot_reply_path`, truncated error text, workflow name, execution id, and timestamp; admin alerts omit user message content.
- Separate credentials: **Telegram Webhook Secret** (header auth) and **Telegram Bot** (outbound API).
