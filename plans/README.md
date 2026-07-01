# Plans

Each numbered folder is one plan. `index.md` describes the objective and
links its tasks; task files are numbered `XX-<description>.md` within.

0. [Project Foundations](00-project-foundations/index.md) — retroactive record
   of the Astro/Tailwind/fonts/layout setup that already existed before
   planning started — **done**
1. [Content Model & CMS](01-content-model-and-cms/index.md) — content
   schemas + Frontmatter CMS sync, including `projects`/`knowledge`
   collections — **done**
2. [Routing Architecture](02-routing-architecture/index.md) — dynamic
   catch-all route to stop duplicating per-page `.astro` files — **done**
3. [Component Library](03-component-library/index.md) — the section
   components the content model needs, incl. Contact form and the
   Projects/Knowledge card+grid+detail components — **done**
4. [Page Rollout (NL/EN)](04-page-rollout-nl-en/index.md) — real content for
   every nav page, incl. Kennis/Knowledge — **done**
5. [Animation (Motion)](05-animation-motion/index.md) — `motion` for
   nav/theme-toggle/hero/section-reveal animation — **done**
6. [Deployment (Cloudflare)](06-deployment-cloudflare/index.md) — Workers
   Static Assets, sitemap/SEO, CI deploy — **done**, live at
   https://emvee-website.frosty-hill-6079.workers.dev
7. [Asset Production](07-asset-production/index.md) — generate and wire in
   the images from `docs/image-prompts/` per page — **blocked**, no
   image-generation tool is available in this environment; prompts are
   ready whenever images get generated some other way

## Current state

Plans 00–06 are done. The site has 23 pages (6 nav pages × nl/en, a
homepage, a 404, 4 project + 4 article placeholder detail pages, and 2
listing pages), all content-collection driven, deployed, animated, with a
working (not-yet-email-verified — needs a custom domain) contact form.

Plan 07 (real images) is the only fully-blocked item. Everything else
remaining is either genuinely optional polish or waiting on external input
(a custom domain for the contact form to actually send email; real project
case studies and knowledge articles to replace the placeholder entries).
