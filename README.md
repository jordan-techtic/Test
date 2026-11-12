# n8n workflows

Git repository for **n8n 1.x** workflow exports. Each automation ticket adds one JSON file under `workflows/<module>/<workflow-slug>.json`. There is no application backend in this repo—only workflow definitions and small Node stdlib scripts that validate and format them.

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

## Import workflows into n8n

1. Open your n8n 1.x instance (self-hosted or cloud).
2. Create credentials listed in [credentials.md](./credentials.md) before activating workflows.
3. For each file under `workflows/`:
   - **Settings → Import workflow** (or **Workflows → Import from file**), or drag the JSON onto the canvas.
   - Confirm credential names in the import match entries you created in n8n.
   - Leave the workflow **inactive** in git (`"active": false`); enable only in your environment when you are ready to run it.
4. If a workflow uses `$env` variables, configure them on the n8n host and mirror names in `.env.example` for documentation.

## Run checks locally

Requires **Node.js 18+**. No `npm install`—scripts use the Node standard library only.

| Command | Purpose |
| --- | --- |
| `npm test` | Validate every `workflows/**/*.json` (structure, single trigger, connections, credentials documented, no secrets). |
| `npm run lint` | Same as `npm test`, plus canonical JSON formatting and `active` must be `false`. |
| `npm run format` | Rewrite workflow JSON files to canonical indentation (run after editing workflows so lint passes). |

Until at least one workflow file exists, `npm test` and `npm run lint` exit with a clear failure: `no workflow files found under workflows/**/*.json`. After adding a valid workflow, both commands should pass.

## Assumptions

- **credentials.md at bootstrap:** Only credentials referenced by workflows already in the repo are listed. With no workflow JSON yet, the table has no data rows; chatbot and other tickets add rows when they introduce credential names.
- **`.env.example`:** Comment-only until a workflow uses `$env`; variable lines are added per workflow ticket, not preemptively.
- **Chatbot - Receive User Message (JAW-9913):** Uses an authenticated **Webhook** node (not Telegram Trigger) for Telegram-style JSON bodies; normalizes `message.text` and does not call other workflows in this file.
- **Chatbot - Generate AI Response (JAW-9914):** Uses **Execute Workflow Trigger** (sub-workflow); **AI Agent** + **OpenAI Chat Model**; expects `userMessageText` and returns `aiResponseText` (and passthrough `chatId`).
- **Chatbot - Send Answer to User (JAW-9915):** Uses **Execute Workflow Trigger**; expects `chatId` + `aiResponseText` from the caller and sends via the Telegram **Send Message** operation.

## Contributing workflows

1. Add or edit exactly one file per ticket under `workflows/<module>/`.
2. Reference credentials by **name** only in JSON; document each name in `credentials.md`.
3. Run `npm run format`, then `npm run lint`.
4. Never commit secrets, `.env`, or `node_modules/`.
