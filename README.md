# n8n workflows

This repository stores **n8n 1.x** workflow definitions as JSON exports—one workflow per file under `workflows/<module>/<workflow-slug>.json`. There is no application server in this repo; validation is done with small Node scripts (stdlib only).

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer

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

1. Open your n8n instance → **Workflows** → **Import from file** (or paste JSON).
2. Import each file under `workflows/`, grouped by module (`demo`, `support`, `inbox`, etc.).
3. Create credentials listed in [credentials.md](./credentials.md) with the **exact names** referenced in the workflow nodes.
4. Map credential IDs in the UI if prompted after import (exports use name placeholders only).
5. Configure any **n8n environment variables** referenced in workflow expressions (for example `OPENAI_MODEL`, `SUPPORT_LABEL`) on the instance—not in this git repo.
6. Leave workflows **inactive** in git (`"active": false`); activate only in the environment where they should run.

Import order for the support module: `classify-request.json` and `failure-alert.json` before `receive-request.json`, so sub-workflow and error-workflow names resolve.

## Quality checks

From the repository root:

```bash
npm test          # structural validation of every workflows/**/*.json
npm run lint      # same as test, plus canonical JSON formatting and active must be false
npm run format    # rewrite workflow JSON files to canonical pretty-print
```

After editing any workflow file, run:

```bash
npm run format && npm run lint
```

The validator fails with a clear message if no workflow files exist under `workflows/**/*.json`. It checks node structure, unique names and ids, connections, a single trigger per workflow, and scans for embedded secrets.

## Security

- Never commit API keys, tokens, or passwords in workflow JSON.
- Use n8n credentials and `={{ $env.VAR_NAME }}` expressions for configuration.
- See `.env.example` for how this repo treats local env files (comment-only; real config lives on the n8n instance).
