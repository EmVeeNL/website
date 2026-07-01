---
task: 01-configure-workers-static-assets
plan: 06-deployment-cloudflare
status: done
---

# Task: Configure Workers Static Assets

## Goal

Add `wrangler.jsonc` configuring `dist/` as static assets served via a
Cloudflare Worker, without adding the Astro SSR adapter.

## Steps

- [x] Consult the `wrangler` skill for current `assets` binding syntax before
      writing config (this shifts between Wrangler versions)
- [x] `wrangler.jsonc` with `"assets": { "directory": "./dist" }` and a
      project `name`
- [x] Confirm `astro build` output (`dist/`) works as-is for Workers static
      assets, or whether any Astro config change is needed (e.g. trailing
      slash behavior, `build.format`)
- [x] `wrangler dev` locally to verify the built site serves correctly
      before first deploy
- [x] `wrangler deploy` for the first live deployment — live at https://emvee-website.frosty-hill-6079.workers.dev

## Deployed

Live at https://emvee-website.frosty-hill-6079.workers.dev — deployed 2026-07-01. All nl/en routes and the 404 page verified working.

## Acceptance criteria

- `wrangler dev` serves the built site correctly, including both `nl` and
  `en` routes and dark/light theme assets
- First deploy confirmed working on the assigned `*.workers.dev` URL (or
  custom domain, if already available) before wiring CI

## Related files

- `astro.config.mjs`
- (new) `wrangler.jsonc`
