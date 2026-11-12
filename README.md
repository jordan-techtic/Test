# N8n

Workflow definitions for n8n automation. Run `npm test` to validate structure and `npm run lint` for formatting plus `active: false`.

## Assumptions (Telegram AI Chatbot)

- Inbound webhook auth uses an **httpHeaderAuth** credential named **Telegram API** (not the `telegramApi` type on the Webhook node).
- **/start** receives a fixed greeting without calling OpenAI; all other non-empty text messages use OpenAI (**gpt-4o-mini**).
- OpenAI calls retry **3** times with **5** seconds between attempts.
- Error handling calls Execute Workflow id **tg-ai-chatbot-error** (error-handling workflow maintained separately in n8n).
- **TELEGRAM_REPLY_CHAT_ID** in the n8n host environment supplies `chatId` when test payloads omit `message.chat.id`.
