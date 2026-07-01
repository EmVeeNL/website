---
plan: 03-component-library
status: done
---

# Plan 03: Component Library

> **Superseded.** The original 7-component, one-per-page-section list below
> was written before the real page content (`EmVee-Docs/docs/website/content/`)
> was reviewed. That content maps to six small **generic** section components
> instead — built directly as part of [Plan 01](../01-content-model-and-cms/index.md)'s
> schema work rather than as a separate follow-on plan:
>
> - `Intro.astro` — page openers (replaces the planned `AboutIntro`, and
>   covers every page's non-hero header, not just About's)
> - `TextBlock.astro` — prose sections with an optional bullet/numbered list
>   (covers most of what was speculatively split across `Features`,
>   `Testimonials`, and `AboutIntro`)
> - `CardGrid.astro` — title/description/list cards (replaces `Features`
>   *and* `ProjectCard`/`ProjectsGrid` — home's services, Diensten's 8
>   services, About's 6 values, and Projecten's case-structure breakdown all
>   share the same shape)
> - `StepList.astro` — numbered steps with optional description/list
>   (replaces the planned `process` type — used by both home's 6-step
>   preview and Werkwijze's 10 full phases)
> - `Cta.astro` — closing call-to-action band (built as originally planned)
> - `ContactDetails.astro` — email/phone/location block (new, not in the
>   original list — needed once the real Contact page content was read)
>
> `ContactForm.astro` (task 5) and the Knowledge/Projects collection +
> detail-page work (tasks 4 and 6) were real, separate work — now also done,
> see the note at the bottom of this file.

## Objective

Build the Astro components that render each section schema added in
[Plan 01](../01-content-model-and-cms/index.md), matching the visual and
accessibility conventions already established by `Hero.astro`.

## Background

`src/components/Hero.astro` sets the pattern to follow:
- Props typed as a local `*Content` type mirroring the Zod schema (not
  importing the Zod-inferred type directly — keep the Astro component
  decoupled from `content.config.ts`)
- Tailwind utility classes only, using the CSS custom properties from
  `src/styles/global.css` (`--color-*`, never raw hex/oklch in components)
- `Icon.astro` for all iconography (extend its `name` union when a new icon
  is needed — see `src/components/Icon.astro`)
- Optional fields rendered conditionally (`{hero.eyebrow && (...)}`)
- Dark mode handled automatically via the `dark:` variant + CSS vars, no
  per-component dark mode logic needed

## Original tasks (see superseded note above)

1. ~~Build Features section component~~ → `CardGrid.astro`
2. [Build CTA section component](02-build-cta-section-component.md) — still accurate, now called `Cta.astro`
3. ~~Build Testimonials section component~~ → not needed by any real page yet; revisit if content requires it
4. [Build Projects grid & card components](04-build-projects-grid-and-card-components.md) — done, alongside the `projects` collection and its detail pages
5. [Build Contact form component](05-build-contact-form-component.md) — done; built as a same-origin Worker endpoint using Cloudflare Email Service, blocked on a custom domain for actually sending email (see that task for details)
6. [Build Knowledge article list & card components](06-build-knowledge-article-list-and-card-components.md) — done, alongside the `knowledge` collection, its detail pages, and the previously-nonexistent Kennis/Knowledge pages
7. ~~Build About intro component~~ → `Intro.astro` (made generic, used by every page)

## Out of scope

- Motion/animation — components should render static-first; animation is
  layered on in [Plan 05](../05-animation-motion/index.md).
