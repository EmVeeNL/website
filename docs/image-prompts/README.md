# EMVEE Image Prompts

Source of truth for these prompts: `EmVee-Docs/docs/website/prompts/` (333 prompts across 22 categories). This folder is a curated subset scoped to the pages actually built in this repo — homepage, services, process, projects, about, contact.

## How to use these files

Every scene description below is a fragment. To generate an image:

1. Take the scene description from the relevant page file.
2. Append the **master style block** (`00-foundation.md`).
3. Append the **negative prompt** (`00-foundation.md`).
4. Use the recommended aspect ratio.

This is the same content as the source prompts, just de-duplicated — the source repeats the ~130-word style block in full for every single prompt, which makes them long to read and easy to drift out of sync when the palette changes. Here the style block lives in one place.

## Files

- [`00-foundation.md`](00-foundation.md) — master style block, negative prompt, logo-integration rules (read this first)
- [`01-homepage.md`](01-homepage.md) — 12 scenes
- [`02-services.md`](02-services.md) — 20 scenes
- [`03-process.md`](03-process.md) — 12 scenes
- [`04-projects.md`](04-projects.md) — 12 scenes (case-study covers — swap in the real industry/solution per project)
- [`05-about.md`](05-about.md) — 12 scenes (several require a real founder reference photo, flagged inline)
- [`06-contact.md`](06-contact.md) — 8 scenes

## Not included here

Backgrounds/dividers, dark/light-mode utility textures, blog/knowledge, social media, open graph, newsletter, abstract brand art, icons/illustrations, patterns/textures, device/product mockups, print/stationery, photography (people/workspace), and technology-category (AI/ecommerce/web) prompts — 237 more ready-to-use prompts across those categories exist in `EmVee-Docs/docs/website/prompts/`. Pull from there when those pages/assets are actually being built (e.g. the Kennis/knowledge section, social sharing images).
