# Notes for agents working on this repo

## What this is
Frontend-only React 18 + TypeScript + Tailwind app bundled by Vite. No backend, no
database, no external services, no environment variables or secrets.

## Running it here (Base44 sandbox)
`docker compose -f docker-compose.base44.yml up -d --build` — a single `web` service
(`node:22`) that bind-mounts the repo at `/app`, installs dependencies into a named
`node_modules` volume, and runs the Vite dev server on `0.0.0.0:3000` (host port 3000).

- There is **no lockfile** in the repo, so the service runs `npm install` (not
  `--frozen-lockfile`) on every start. If you add `package-lock.json`, switch the
  compose command to `npm ci` to keep installs reproducible.
- Because `node_modules` lives in a named volume, a dependency change requires
  `docker compose -f docker-compose.base44.yml up -d --force-recreate web`
  (or `exec web npm install <pkg>`) rather than a plain restart.
- The repo's own README describes `npm run dev` on port 8080; the compose command
  overrides the port to 3000 with CLI flags. `vite.config.ts` keeps `port: 8080`
  for plain local runs.

## Preview / host access
`vite.config.ts` sets `server.allowedHosts: true` so the sandbox preview proxy
hostnames are accepted (Vite 5.4.12+ only; older Vite ignores the option and would
need `server.host` handling instead). The preview origin is not allowlisted anywhere
else — no HOST/ORIGIN lists exist in this app.

## Verification
`curl -s http://localhost:3000/` should return the HTML with `/@vite/client` and
`/src/main.tsx` script tags (proof the dev server, not a prebuilt bundle, is serving).
`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/src/main.tsx` should be
200. The UI is a single screen: a heading, a subtitle, and a −/+ counter that must
increment and decrement.

## Deployment
`vercel.json` configures Vercel (`vite` framework, `npm run build`, output `dist`);
pushes to `main` deploy to production. The sandbox preview is development only.
