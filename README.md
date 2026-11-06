# n8n workflow definitions

This repository holds **n8n 1.x workflow exports** as JSON: one file per workflow under `workflows/<module-slug>/<workflow-slug>.json`. There is no application runtime here—only workflow files and small Node.js scripts (stdlib only) that validate and format them.

## Prerequisites

- **Node.js** 18 or newer (see `package.json` → `engines`)

There are **no npm package dependencies**; you do not need `npm install` for the checks to run.

## Repository layout

| Path | Purpose |
| --- | --- |
| `workflows/` | Workflow exports (`*.json`), grouped by module folder |
| `scripts/validate-workflows.mjs` | Validates structure, connections, triggers, and credential references |
| `scripts/format-workflows.mjs` | Rewrites workflow JSON in canonical pretty-printed form |
| `credentials.md` | Credential **names** and types to create in n8n (no secrets) |
| `.env.example` | Notes only—env for n8n is configured outside this repo |

## Checks

From the repository root:

```bash
npm test        # validate all workflows (structure + secrets heuristics)
npm run lint    # same as test, plus canonical formatting and active=false
npm run format  # rewrite workflow JSON with stable formatting (run after edits)
```

- If there are **no** `workflows/**/*.json` files, validation **fails** with a clear message (`FAIL: no workflow files found under workflows/**/*.json`). That is expected for an empty tree.
- After a valid workflow file is present, `npm test` and `npm run lint` should **pass** if the file conforms to the rules enforced by `scripts/validate-workflows.mjs`.

Always run `npm run format` after creating or editing a workflow, then run `npm run lint` before pushing.

## Importing a workflow into n8n

1. Open your n8n editor (target **n8n 1.x**).
2. Use **Import from File** (or paste) and select a JSON file from `workflows/<module-slug>/<workflow-slug>.json`.
3. Create any credentials listed in `credentials.md` (same **name** as referenced in the JSON).
4. Review nodes and activate only when appropriate for your environment.

## Contributing workflows

1. Add or update `workflows/<module-slug>/<workflow-slug>.json`.
2. Ensure credentials are referenced by **name** only in the JSON; update `credentials.md` with each named credential.
3. Run `npm run format` then `npm run lint`.
