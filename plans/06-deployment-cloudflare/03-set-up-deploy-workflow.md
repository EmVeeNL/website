---
task: 03-set-up-deploy-workflow
plan: 06-deployment-cloudflare
status: done
---

# Task: Set up deploy workflow

## Goal

Automate `wrangler deploy` on push to the main branch via GitHub Actions (or
Cloudflare's native git integration for Workers, if available at
implementation time — check current Cloudflare docs, this has changed
recently).

## Steps

- [x] Confirm current Cloudflare-recommended CI approach for Workers
      (native git integration vs GitHub Actions + `wrangler-action`)
- [x] Add the chosen CI config, building via `pnpm build` then deploying
      `dist/`
- [x] Store the Cloudflare API token as a repo secret, never committed — both `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` are set
- [x] Add a preview-deploy step for pull requests if the chosen approach
      supports it, so content/design changes can be reviewed before merge

## Chosen approach

GitHub Actions + `cloudflare/wrangler-action@v3`, not Cloudflare's native
Workers Builds git integration. Workers Builds is Cloudflare's own
recommended starting point, but it's configured through the dashboard
(authorizing repo access via OAuth) rather than anything scriptable from
here — GitHub Actions is the CLI-reachable path that could actually be
fully wired up and verified in this session.

## Verified end-to-end

`CLOUDFLARE_API_TOKEN` was added 2026-07-01 (created and provided by a
human, not generated here). Two `preview.yml` runs that had originally
failed with "CLOUDFLARE_API_TOKEN environment variable" errors (runs
28541456046, 28540768035 — triggered before the secret existed) were
re-run via `gh run rerun` and passed, including the PR comment step
posting a working `*.workers.dev` preview URL. `deploy.yml` (push to
`main`) hasn't fired yet since nothing has merged to `main` since the
secret was added, but uses the identical auth path so is expected to work.

## Acceptance criteria

- Pushing to main triggers an automatic deploy without manual `wrangler deploy`
- No secrets committed to the repo

## Related files

- (new) `.github/workflows/deploy.yml` or Cloudflare dashboard git integration config
