## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project context

Repo: `git@github.com:EmVeeNL/website.git` (public). `plans/` has numbered implementation plans + tasks (`plans/README.md` is the index — check each file's `status` frontmatter before treating it as still-accurate). `docs/` has the git workflow standard (`GIT_WORKFLOW.md`), the OKLCH styleguide (`STYLEGUIDE.md`), and curated image prompts (`image-prompts/`). Full brand/content/design-system source material lives in the sibling `EmVee-Docs` repo (`docs/website/`) — treat it as the source of truth for copy and design rationale; this repo is the implementation.

Branching: trunk-based off `develop` (see `docs/GIT_WORKFLOW.md`) — `main` is the protected/deployable branch, `develop` is the integration branch feature work targets.

## Content model

Content Collections (`src/content.config.ts`) drive every page: a `pages` entry lists ordered `components[]` refs resolved against a `components` collection, rendered by a `switch (config.type)` in `src/components/PageRenderer.astro`.

Eight generic, reusable section component types cover every page's real content (deliberately not one bespoke component per page-section — see DD-012 in `EmVee-Docs/docs/website/DESIGN_DECISIONS.md`): `hero` (home only, do not modify), `intro`, `textBlock`, `cardGrid`, `stepList`, `cta`, `contactDetails`, `contactForm`, plus two listing-anchor types, `projectsListing`/`knowledgeListing`, that render entries from separate collections rather than their own frontmatter. Don't add a new component type without checking whether one of these already fits.

`Hero.astro` and the two `hero.md` content files (`src/content/components/{nl,en}/home/hero.md`) are the one deliberately untouched piece — every other homepage section was added after it.

Routing is a single dynamic catch-all (`src/pages/[...slug].astro`, `getStaticPaths()` over the `pages` collection) rendered through `PageRenderer.astro` — adding a new *page* needs only a new `pages` collection entry + its component entries, never a new route file.

`projects` and `knowledge` are separate top-level collections (not page sections) — each entry gets its own detail page via a dedicated route: `src/pages/projecten/[slug].astro`, `src/pages/en/projects/[slug].astro`, `src/pages/kennis/[slug].astro`, `src/pages/en/knowledge/[slug].astro`. These coexist with the `[...slug].astro` catch-all without conflict (Astro prioritizes static path segments over rest params). Neither collection assumes a matching entry exists in the other language — no forced `hreflang` cross-linking for individual projects/articles, unlike `pages`.

A page with an empty `components: []` (e.g. legal pages) renders its own markdown body directly instead — see the `.prose-content` fallback in `PageRenderer.astro`, used for `nl/privacy.md`, `nl/voorwaarden.md`, `en/privacy.md`, `en/terms.md`. Real footer (`Footer.astro`) links to these plus the main nav via a new `legalPages` export in `navigation.ts`.

**Known state:** all 7 nav pages (home, services, process, projects, about, knowledge, contact) are implemented in nl+en, plus 4 project + 4 article entries — all placeholders (`status: Draft`, `seo.noindex: true`), not real case studies or articles — plus 4 legal pages (draft text with `[INVULLEN]`/`[TO BE COMPLETED]` placeholders, not ready to publish as-is). `pnpm build` produces 27 pages. Contact form is built but can't send email yet (needs a custom domain — see `plans/06-deployment-cloudflare`). Homepage images are wired in (`src/assets/images/homepage/`, generated externally then integrated) — every other page still has no imagery, since generation has to happen outside this environment (no image-generation tool available here — see `plans/07-asset-production`). `intro`/`textBlock`/`cardGrid`/`stepList`/`cta` component schemas all have an optional `image` field now, available for any page, not just home.
