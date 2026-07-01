# Plans

Each numbered folder is one plan. `index.md` describes the objective and
links its tasks; task files are numbered `XX-<description>.md` within.

0. [Project Foundations](00-project-foundations/index.md) — retroactive record
   of the Astro/Tailwind/fonts/layout setup that already existed before
   planning started (all done, kept for traceability)
1. [Content Model & CMS](01-content-model-and-cms/index.md) — extend content
   schemas and keep Frontmatter CMS in sync
2. [Routing Architecture](02-routing-architecture/index.md) — dynamic
   catch-all route to stop duplicating per-page `.astro` files
3. [Component Library](03-component-library/index.md) — build the section
   components the content model needs
4. [Page Rollout (NL/EN)](04-page-rollout-nl-en/index.md) — populate content
   for the remaining nav pages
5. [Animation (Motion)](05-animation-motion/index.md) — layer in `motion`
   for interactive/entrance animation
6. [Deployment (Cloudflare)](06-deployment-cloudflare/index.md) — Workers
   Static Assets, sitemap/SEO, CI deploy
7. [Asset Production](07-asset-production/index.md) — generate and wire in
   the images from `docs/image-prompts/` per page

## Suggested order

00 is already done. 01 → 02 → 03 → 04, with 05 and 06 able to start any time
after 03 (05) or even from day one (06, since deployment doesn't depend on
content). 07 can start per-page as soon as that page's components exist
(04) — no need to wait for the whole rollout to finish.
