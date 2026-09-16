# Marketing Content Calendar

Vite + React + TypeScript app for marketing team members. Sign in at `/login`, then manage the annual calendar at `/calendar`.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck and production build
- `npm run preview` — preview the production build
- `npm run lint` — ESLint
- `npm run format` — Prettier
- `npm test` — Jest
- `npm run typecheck` — TypeScript project build with `--noEmit`

## Environment

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` or `VITE_API_URL` to the API origin (for example `http://174.138.72.184:8989/api`). A trailing `/api` is stripped so request paths stay `/api/v1/marketing-team-member/...` and join to `http://174.138.72.184:8989/api/v1/marketing-team-member/...`.
