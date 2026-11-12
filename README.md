# n8n workflows

Git repository for **n8n 1.x** workflow exports. Each automation ticket adds one JSON file under `workflows/<module>/<workflow-slug>.json`. There is no application runtime here—only workflow definitions and Node stdlib scripts that validate them.

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

1. Open your n8n instance (1.x).
2. Create credentials listed in `credentials.md` with **matching names** (types and purposes are documented there).
3. For each file under `workflows/**/*.json`:
   - **Workflows → Import from file** (or **⋯ → Import**), select the JSON file.
   - Confirm `active` stays **off** in the repo export; only turn a workflow on after credentials and URLs are configured in the UI.
   - If a workflow calls another via **Execute Workflow**, ensure the callee is imported first so the name resolves.
4. Map any host-specific URLs in HTTP Request nodes (placeholder hosts in exports are intentional).

## Credentials and environment

- **Credentials:** See `credentials.md`. Workflow nodes store only `{ "id", "name" }` in the JSON; secrets live in n8n.
- **Environment:** See `.env.example`. List every `$env.NAME` a workflow uses on the n8n host. None are required for the workflows committed so far.

## Checks

Requires Node.js ≥ 18 (stdlib only; no `npm install`).

```bash
npm test        # validate all workflows under workflows/
npm run lint    # validation plus active=false and canonical JSON formatting
npm run format  # rewrite workflow JSON to canonical formatting (then re-run lint)
```

If no workflow JSON exists yet, `npm test` exits with a clear failure (`no workflow files found`). After a valid workflow is added, tests should pass.

## Assumptions (Automation Project Setup — JAW-9916)

- **`credentials.md` catalogs all credentials named across program workflow tickets** (not only the repo today), so reviewers and importers see the full list up front; add a row when a new workflow introduces a credential name.
- **`.env.example` stays comment-only** until a committed workflow references `$env.*`; then add names there without values.
- **Validators in `scripts/` are fixed**; workflow authors change JSON under `workflows/`, not the scripts.

## Assumptions (Planning Workflow — JAW-9918)

- **MPA notify:** `POST https://mpa-api.example/v1/planning/ready-notify` with `{ requestId, qaResult, audience: "planning-personnel" }`, using **MPA API service credential**.
- **Failure email:** `POST https://mpa-api.example/v1/planning/team-alert` with `team: "planning"` and error context; same credential (MPA sends email).
- **Duplicates:** `requestId` stored in workflow global static data; repeats are logged and not notified.
- **Invalid input:** Empty/missing `requestId` or `qaResult` is logged in the execution and ignored (no notification).
- **Retries:** The notify HTTP node retries twice (3 attempts total) with 30 seconds between tries.

Replace `mpa-api.example` URLs when configuring the HTTP Request nodes for your MPA environment.

## Assumptions (Intake Workflow — JAW-9917)

- **Webhook:** `POST /intake-brief`, JSON `{ briefId, content }`; **Monday.com webhook secret** (Header Auth) on the Webhook node.
- **Valid brief:** Non-empty `briefId` and `content`; `content.trim().length >= 5` (sample payload passes).
- **Invalid payload:** Missing/empty fields → logged and ignored.
- **Validation fail (short content):** MPA `POST …/v1/intake/gap-messages` with `gaps` array.
- **Validation pass:** MPA `POST …/v1/intake/planning-run`, then **Execute Workflow → Planning Workflow** with `requestId=briefId`, `qaResult=Pass`.
- **MPA validation audit:** `POST …/v1/intake/validate-brief` before branching.
- **Duplicates:** `briefId` in workflow global static data.
- **Failures:** MPA `POST …/v1/intake/team-alert` (`team: intake`); processing HTTP nodes retry twice (30s between attempts).

## Assumptions (Error and Exception Handling — JAW-9920)

- **Webhook:** `POST /error`, JSON `{ errorId, details, retryCount?, maxRetries?, retrySafe? }`; **MPA API service credential** (Header Auth) on the Webhook node.
- **Invalid payload:** Missing/empty `errorId` or `details` → logged and ignored.
- **Duplicates:** `errorId` in workflow global static data.
- **Record:** MPA `POST …/v1/errors/record` (2 retries, 30s between attempts on that node).
- **Admin ticket** when `retrySafe === false` or `retryCount >= maxRetries` (defaults: `0` and `2`; test payload → **record** then **schedule retry**).
- **Retry path:** MPA `POST …/v1/errors/schedule-retry`.
- **Ticket path:** MPA `POST …/v1/admin/exception-queue/tickets`.
- **Failures:** MPA `POST …/v1/admin/team-alert` (`team: admin`).

## Assumptions (Post-launch Workflow — JAW-9919)

- **Schedule:** Cron `0 0 * * *` at **UTC** midnight (`settings.timezone: UTC`).
- **Daily idempotency:** `lastProcessedDate` in workflow static data; second run same UTC day → no pull.
- **Pull:** MPA `GET …/v1/post-launch/performance?date={processingDate}` (2 retries, 30s on pull node).
- **Reconcile:** MPA `POST …/v1/post-launch/reconcile`; response includes `hasDiscrepancies` and `discrepancies` (>1% planned vs actual per metric).
- **Discrepancies:** MPA `POST …/v1/post-launch/precedent-proposals` (`status: pending-approval`).
- **No discrepancies:** set-only node; no further calls.
- **Failures:** MPA `POST …/v1/post-launch/team-alert` (`team: post-launch`).
