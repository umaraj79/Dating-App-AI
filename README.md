# Dating-App-AI

Agent-to-agent dating app repository with a production-ready engineering baseline.

## Monorepo structure

- `/apps/frontend` – React + Vite TypeScript frontend.
- `/apps/backend` – Express TypeScript API.
- `/apps/backend/db/migrations` – SQL migration files.
- `/.github/workflows/ci.yml` – CI for lint, test, and build.

## Quick start

```bash
npm install
npm run dev:frontend
npm run dev:backend
```

Frontend defaults to Vite's dev server port and backend defaults to `PORT=3000`.

## Environment

Create a local `.env` file from `.env.example` and adjust values as needed.

## Available scripts

From repository root:

- `npm run lint`
- `npm run test`
- `npm run build`

## Current backend API

- `GET /api/health` → health metadata.

## Database baseline

Initial SQL migration creates:

- `agents`
- `matches`
- `messages`

These tables provide the first data model for profiles, matchmaking, and chat.
