---
plan: 07-asset-production
status: in progress — homepage done
---

# Plan 07: Asset Production

## Objective

Generate and integrate the images each page actually needs, using [`../../docs/image-prompts/`](../../docs/image-prompts/) as the prompt source, and land them in `src/assets/images/`.

## Background

`docs/image-prompts/` (curated from `EmVee-Docs/docs/website/prompts/`) gives ready-to-use scene descriptions per page, but no image has actually been generated from them yet — only the original placeholder set exists in `src/assets/images/`: `hero-dark.png`, `hero-light.png`, `logo-dark.png`, `logo-light.png`, plus the theme-transition masks in `src/assets/masks/`. Home's hero already uses its images; every other page currently renders with no imagery at all.

This plan tracks, per page, which prompt scenes get generated, reviewed, optimized, and wired into a component — not the prompt-writing itself (already done in `docs/image-prompts/`).

## General process per image

1. Pick the scene from the relevant `docs/image-prompts/0X-<page>.md` file.
2. Append the master style block + negative prompt from `00-foundation.md`.
3. Generate, review against the negative prompt (no purple/neon/stock-photo clichés, no generated text/logo).
4. Export at the recommended aspect ratio, convert to AVIF/WebP (per `EmVee-Docs/docs/website/design-system` image guidance), place in `src/assets/images/<page>/`.
5. Wire into the relevant Astro component via `astro:assets` (`<Image>` / `getImage()`) — not a raw `<img src>` string path, so it gets automatic optimization, matching how `Hero.astro` already imports `hero-dark.png`/`hero-light.png` directly.
6. Provide functional alt text (or empty `alt=""` if purely decorative) and explicit width/height to avoid layout shift.
7. Check both light and dark mode — several prompts have dedicated dark/light variants (see `00-foundation.md`'s variant blocks); decide per image whether one asset works in both themes or two are needed.

Update from the homepage pass: this plan was originally written assuming *I* would generate images, which turned out to be impossible — no image-generation tool is available in this environment. Images have to be generated externally (by a human, using `docs/image-prompts/`) and dropped into the repo; wiring them in from there is what I can actually do. Update the "General process" above accordingly for future pages: step 3 (generate) happens outside this workflow.

## Tasks

1. [Homepage assets](01-homepage-assets.md) — done, except the footer background and hero (untouched by design)
2. [Services assets](02-services-assets.md)
3. [Process assets](03-process-assets.md)
4. [Projects assets](04-projects-assets.md)
5. [About assets](05-about-assets.md) — needs a real founder reference photo before any founder-portrait prompt can be used
6. [Contact assets](06-contact-assets.md)

## Out of scope

- Blog/knowledge, social media, open graph, mockup, and photography-category images — no page consumes these yet (Kennis/knowledge has no content, see [Plan 04](../04-page-rollout-nl-en/index.md)). Revisit once those pages exist; the source prompts already exist in `EmVee-Docs/docs/website/prompts/`.
- Logo work — the logo is a fixed brand asset, not something to regenerate (see `docs/image-prompts/00-foundation.md`'s logo-integration rules).
