# n8n workflows

This repository holds **n8n 1.x** workflow definitions as importable JSON (one workflow per file). There is no application runtime here—only workflows and small Node.js validation scripts (stdlib only, no npm dependencies).

## Repository layout

```
.
├── package.json
├── README.md
├── .env.example
├── credentials.md
├── workflows/
│   └── <module>/
│       └── <workflow-slug>.json
└── scripts/
    ├── validate-workflows.mjs
    └── format-workflows.mjs
```

## Importing workflows into n8n

1. Open your n8n 1.x instance (**Settings → Import from file** or **Workflows → Import from file**).
2. Import each JSON file under `workflows/<module>/` separately.
3. After import, preserve the workflow **id** from the JSON if other workflows call it via **Execute Workflow** (for example `tg-ai-chatbot-error`).
4. Create credentials listed in `credentials.md` using the **exact names** shown there; map them in each node that references credentials.
5. Configure non-secret host-specific values on the n8n server as environment variables (see `.env.example` for names workflows may read via `$env`).
6. Leave workflows **inactive** in Git (`"active": false`); activate only in n8n after credentials and env are configured.

## Quality checks

Requires **Node.js 18+** (no `npm install`—scripts use only the Node standard library).

```bash
npm test       # structural validation, secrets scan, connections, credentials docs
npm run lint   # same as test, plus canonical JSON and active:false
npm run format # rewrite workflows/**/*.json with canonical formatting
```

If no workflow files exist under `workflows/`, `npm test` fails with a clear message. It passes once valid workflow JSON files are present.

## Credentials

See [credentials.md](credentials.md). Workflow files reference credentials **by name only**; never commit API keys or tokens.

## Assumptions (Telegram AI Chatbot Response)

- Generic **Webhook** on POST `/telegram` with JSON `message.text`; not the native Telegram Trigger node.
- **Telegram API** credential name is shared: HTTP Header Auth on the webhook, `telegramApi` on send-message.
- Reply **chatId**: `message.chat.id`, else `message.chat_id`, else body `chat_id`, else **$env.TELEGRAM_REPLY_CHAT_ID** (so `{"message":{"text":"Hello, AI!"}}` works when that env is set).
- OpenAI reply text is read from `message.content`, `choices[0].message.content`, or `text` depending on n8n OpenAI node output shape.
- OpenAI uses **gpt-4o-mini** with default chat options (maxTokens 500, temperature 0.7) and three retries.
- On failure, **Execute Workflow** calls workflow id `tg-ai-chatbot-error` (Error Handling workflow).

## Assumptions (Telegram AI Chatbot Error Handling)

- Sub-workflow entry via **Execute Workflow Trigger** when the response workflow's **Execute Workflow** node runs on error output.
- Workflow id **tg-ai-chatbot-error** matches the response workflow's `workflowId` reference; display name **Telegram AI Chatbot Error Handling**.
- Error **logging** is a **Set** node writing `failedNode`, `errorSummary`, and `sourceWorkflow` to execution data (no Telegram user message content).
- Administrator Telegram chat id from **$env.TELEGRAM_ADMIN_CHAT_ID** (documented in `.env.example`); **Telegram API** credential for notify; three retries on send failure.
