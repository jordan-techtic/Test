# N8n

## Assumptions

- **Telegram AI Chatbot Response (JAW-9926):** The Assumptions sticky note inside `workflows/telegram-ai-chatbot/telegram-ai-chatbot-response.json` was updated to describe inline error handling (no separate `tg-ai-chatbot-error` workflow).
- Failures in **Send to OpenAI** or **Send Telegram Reply** are handled in the same file via **Prepare Error Log** → **Notify Administrator** → optional **Notification Delivery Failed** on notify failure.
- Administrator alerts use `$env.TELEGRAM_ADMIN_CHAT_ID` and never include end-user message text or chat ids.
