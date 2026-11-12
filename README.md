# n8n workflows

Git-backed exports for **n8n 1.x** automations. Each feature lives in one JSON file under `workflows/<module>/<workflow-slug>.json`. There is no application server in this repo—only workflow definitions and Node tooling to validate them.

## Repository layout

```
workflows/
  <module>/
    <workflow-slug>.json
scripts/
  validate-workflows.mjs
  format-workflows.mjs
credentials.md
.env.example
package.json
```

## Import into n8n

1. In n8n, choose **Workflows → Import from File** and select a file from `workflows/`.
2. Create credentials listed in [credentials.md](./credentials.md) in the n8n UI (secrets stay in n8n only).
3. On each node that references a credential, pick the credential **by name** from `credentials.md`.
4. Keep workflows **inactive** in git: every export must have `"active": false`. Activate only in your n8n environment after review.

## Quality checks

Requires Node.js 18+.

```bash
npm test          # structural validation (triggers, connections, no secrets in JSON)
npm run lint      # same as test, plus canonical formatting and active must be false
npm run format    # rewrite workflow JSON to canonical formatting (2-space indent)
```

- If no files exist under `workflows/**/*.json`, `npm test` and `npm run lint` exit with a clear failure message. Add at least one valid workflow JSON to get a passing run.
- After editing workflow files, run `npm run format` then `npm run lint` before committing.

## Conventions

- One workflow per file; unique node names and ids inside each export.
- Exactly one trigger node per workflow (webhook, schedule/cron, or sub-workflow trigger).
- Credentials in JSON contain only `id` and `name`—never API keys, tokens, or passwords in `parameters`.
