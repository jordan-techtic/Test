# N8n

Workflow definitions live under `workflows/`. Run `npm test` and `npm run lint` after edits.

## Assumptions (telegram-ai-chatbot-response, JAW-9927)

- **Log Incoming Message** uses a Set node to capture `messageText`, `chatId`, `messageId`, and `loggedAt` for analytics within the n8n execution only (not included in administrator alerts).
- **Prepare Error Log** adds `errorName`, `errorHttpCode`, `failedNodeType`, `errorDetails`, and a fixed **userRetryText**; administrator alerts omit end-user message content and chat ids.
- **Send Retry Message** delivers the retry text to the user's chat when OpenAI or the primary Telegram reply fails (3 retries, 5s).
- **Send to OpenAI** uses OpenAI node `chat` + `complete` with a single `prompt` (not `message` / `messages`).
- Inbound webhook auth uses **httpHeaderAuth** credential **Telegram API** (Telegram `secret_token` header pattern).
