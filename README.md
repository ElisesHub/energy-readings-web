# energy-readings-web

React/TypeScript dashboard for time-series energy meter readings. Consumes the
[energy-readings-api](https://github.com/ElisesHub/energy-readings-api) (FastAPI, PostgreSQL).

## Status

Early development. Readings list rendering from the API; routing, charting,
and detail views in progress.

## Stack

| Concern | Choice |
|---|---|
| Build / dev server | Vite |
| Language | TypeScript |
| Routing | React Router (data mode) |
| Server state | TanStack Query |


## Running locally

Requires the API running on `http://localhost:8000`, with CORS permitting
`http://localhost:5173`.

```bash
npm install
npm run dev
```

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Vite does not type-check during dev — run `typecheck` before committing.

## Configuration

`VITE_API_BASE_URL` — API base URL. See `.env.example`.