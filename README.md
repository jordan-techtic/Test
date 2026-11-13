# N8n

## Assumptions

### Post-launch workflow (`workflows/post-launch/post-launch-workflow.json`, JAW-9931)

- ThoughtSpot, Databricks, Google Ads, and Microsoft Advertising data are aggregated by the MPA backend; the workflow calls MPA HTTP endpoints only.
- Base URL is read from `$env.BACKEND_BASE_URL` (see `.env.example`).
- Schedule: daily at midnight UTC (`cron` `0 0 * * *`, `settings.timezone` `UTC`).
- Duplicate calendar days are skipped via workflow global static data (`lastProcessedDate`).
- Reconciliation uses `hasDiscrepancies` on the reconcile response; discrepancies trigger precedent proposals; aligned metrics end with no further calls.
- Failures notify the post-launch team via `POST /v1/post-launch/team-alert` and the run ends with a Stop and Error node.

### Intake workflow (`workflows/intake/intake-workflow.json`, JAW-9929)

- Webhook `POST /intake-brief` with Monday.com header auth; body `{ briefId, content }`.
- MPA calls use `$env.BACKEND_BASE_URL` (`/v1/intake/validate-brief`, `/v1/intake/gap-messages`, `/v1/intake/planning-run`, `/v1/intake/event-record`, `/v1/intake/team-alert`).
- Valid brief: non-empty fields and content length ≥ 5; test payload `{"briefId":"12345","content":"Sample brief content"}` triggers planning.
- Duplicate `briefId` detection uses workflow global static data in **Assess Brief** (equivalent to deduplicating on `briefId`).
- Successful planning hand-off: **Execute Workflow** id `PlanningWorkflow` with `requestId` = `briefId` and `qaResult` = `Pass`.
- Invalid and duplicate events are persisted via `POST /v1/intake/event-record`; processing failures alert the intake team and end with Stop and Error.

### Planning workflow (`workflows/planning/planning-workflow.json`, JAW-9930)

- Sub-workflow trigger inputs: `requestId` and `qaResult` (from Intake); manual test payload may include `details` instead of `qaResult`.
- Invalid when `requestId` is missing or both `qaResult` and `details` are empty.
- Rules/QA via `POST /v1/planning/validate-request`; success notification via `POST /v1/planning/ready-notify`.
- Invalid/duplicate records via `POST /v1/planning/event-record`; failures via `POST /v1/planning/team-alert` and Stop and Error.
- Duplicate `requestId` handled with workflow global static data; `settings.callerPolicy` is `workflowsFromSameOwner`.

### Error handler workflow (`workflows/error-handling/error-and-exception-handling.json`, JAW-9932)

- Authenticated webhook `POST /error`; accepts `errorId` and `message` (or `details`).
- Classify via `POST /v1/errors/classify`; record via `/v1/errors/record`; audit via `/v1/errors/event-record`.
- Retry-safe errors → `/v1/errors/schedule-retry`; unsafe/exhausted → exception queue ticket + admin notify.
- Program workflows keep inline error handling; this workflow is a dedicated entry point, not wired from n8n error outputs.
- Failures use `/v1/admin/team-alert` and Stop and Error.
