# n8n workflows

Git repository for **n8n 1.x** workflow definitions. Each automation ticket adds one exported workflow JSON under `workflows/<module>/<workflow-slug>.json`. There is no application server code here—only workflow JSON and small Node.js quality scripts (stdlib only, no npm dependencies).

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

1. In n8n, open **Workflows** → **Import from file** (or paste JSON).
2. Select the file from `workflows/<module>/<workflow-slug>.json`.
3. Create the credentials listed in [credentials.md](./credentials.md) with the **exact names** used in the workflow nodes.
4. Map each credential reference in the imported workflow to the credential you created.
5. Activate the workflow in n8n only when you are ready to run it in that environment (committed exports keep `"active": false`).

## Credentials

See [credentials.md](./credentials.md) for credential names, types, and purposes. Secrets live only in n8n, not in workflow files.

## Quality checks

Requires Node.js 18+.

| Command | What it does |
| --- | --- |
| `npm test` | Validates every `workflows/**/*.json` (structure, triggers, connections, no embedded secrets). |
| `npm run lint` | Same as `npm test`, plus canonical JSON formatting and `"active": false`. |
| `npm run format` | Rewrites workflow JSON files to canonical `JSON.stringify(data, null, 2)` format. |

After editing workflow files, run:

```bash
npm run format
npm run lint
```

If there are **no** workflow JSON files yet, `npm test` and `npm run lint` exit with a clear failure:

```text
FAIL: no workflow files found under workflows/**/*.json
```

Once at least one valid workflow file exists under `workflows/`, the validator reports `PASS` per file when checks succeed.

## Adding a new workflow

1. Add `workflows/<module>/<workflow-slug>.json` (one workflow per file).
2. Run `npm run format` then `npm run lint`.
3. Document any new credentials in `credentials.md`.
