---
task: 03-set-up-deploy-workflow
plan: 06-deployment-cloudflare
status: planned
---

# Task: Set up deploy workflow

## Goal

Automate `wrangler deploy` on push to the main branch via GitHub Actions (or
Cloudflare's native git integration for Workers, if available at
implementation time — check current Cloudflare docs, this has changed
recently).

## Steps

- [ ] Confirm current Cloudflare-recommended CI approach for Workers
      (native git integration vs GitHub Actions + `wrangler-action`)
- [ ] Add the chosen CI config, building via `pnpm build` then deploying
      `dist/`
- [ ] Store the Cloudflare API token as a repo secret, never committed
- [ ] Add a preview-deploy step for pull requests if the chosen approach
      supports it, so content/design changes can be reviewed before merge

## Acceptance criteria

- Pushing to main triggers an automatic deploy without manual `wrangler deploy`
- No secrets committed to the repo

## Related files

- (new) `.github/workflows/deploy.yml` or Cloudflare dashboard git integration config
