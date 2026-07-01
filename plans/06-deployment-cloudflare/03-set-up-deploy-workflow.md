---
task: 03-set-up-deploy-workflow
plan: 06-deployment-cloudflare
status: workflows added, needs CLOUDFLARE_API_TOKEN secret
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
- [ ] Store the Cloudflare API token as a repo secret, never committed — **CLOUDFLARE_ACCOUNT_ID is set; CLOUDFLARE_API_TOKEN still needs to be added by a human** (see note below)
- [x] Add a preview-deploy step for pull requests if the chosen approach
      supports it, so content/design changes can be reviewed before merge

## Chosen approach

GitHub Actions + `cloudflare/wrangler-action@v3`, not Cloudflare's native
Workers Builds git integration. Workers Builds is Cloudflare's own
recommended starting point, but it's configured through the dashboard
(authorizing repo access via OAuth) rather than anything scriptable from
here — GitHub Actions is the CLI-reachable path that could actually be
fully wired up and verified in this session.

## Required manual step

`CLOUDFLARE_API_TOKEN` was deliberately **not** set — creating and handling
an API token is a credential-issuing action that shouldn't happen without
you present. Create a scoped token (Cloudflare dashboard → My Profile → API
Tokens → Create Token → "Edit Cloudflare Workers" template, or a custom
token scoped to `Workers Scripts:Edit` for this account) and add it with:

```sh
gh secret set CLOUDFLARE_API_TOKEN --repo EmVeeNL/website
```

The `deploy.yml` and `preview.yml` workflows will fail until this secret
exists — they have not been tested end-to-end for that reason.

## Acceptance criteria

- Pushing to main triggers an automatic deploy without manual `wrangler deploy`
- No secrets committed to the repo

## Related files

- (new) `.github/workflows/deploy.yml` or Cloudflare dashboard git integration config
