---
plan: 06-deployment-cloudflare
status: planned
---

# Plan 06: Deployment (Cloudflare)

## Objective

Ship the static build to Cloudflare using Workers Static Assets (the current
Cloudflare-recommended path for static sites, ahead of Pages), plus baseline
production-readiness items (sitemap, robots.txt, SEO defaults).

## Background

The project currently has no adapter and no `wrangler.jsonc` — it's a plain
`astro build` outputting to `dist/`. Since the site is static (confirmed:
"mostly a static website"), no `@astrojs/cloudflare` SSR adapter is required
— Workers Static Assets serves a `dist/` folder directly via a `wrangler.jsonc`
`assets` binding. If the contact form (Plan 03, Task 05) ends up needing a
same-origin endpoint, that can be a separate Worker route alongside the
static assets, still without switching the whole site to SSR output.

Consult the `cloudflare` and `wrangler` skills for current syntax before
implementing — Cloudflare's static-hosting recommendations have shifted
over time and this plan should defer to whatever's current at
implementation time rather than this snapshot.

## Tasks

1. [Configure Workers Static Assets](01-configure-workers-static-assets.md)
2. [Add sitemap, robots.txt, and SEO defaults](02-add-sitemap-robots-and-seo-defaults.md)
3. [Set up deploy workflow](03-set-up-deploy-workflow.md)

## Out of scope

- Adding the `@astrojs/cloudflare` SSR adapter — only needed if/when the
  contact form or another feature requires true server rendering rather
  than a sibling Worker route.
