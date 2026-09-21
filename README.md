# Agentwise

Vite + React + TypeScript frontend for Agentwise.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

API base URL comes from `VITE_API_BASE_URL` (preferred) or `VITE_API_URL`. The live backend origin is `http://174.138.72.184:4040/api`.

## Scripts

- `npm run dev` — development server
- `npm run build` — typecheck and production build
- `npm run lint` — ESLint
- `npm run format` — Prettier
- `npm test` — Vitest

## Routes

- `/` — Home
- unmatched paths — Not found

Do not invent `/protected` URL prefixes. `ProtectedRoute` is a layout guard for later authenticated product routes.
