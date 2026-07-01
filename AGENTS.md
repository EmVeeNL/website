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

Content Collections (`src/content.config.ts`) drive every page: a `pages` entry lists ordered `components[]` refs resolved against a `components` collection, rendered by a `switch (config.type)` in each page's `.astro` file (see `src/pages/index.astro`).

Six generic, reusable section component types cover every page's real content (deliberately not one bespoke component per page-section — see DD-012 in `EmVee-Docs/docs/website/DESIGN_DECISIONS.md`): `hero` (home only, do not modify), `intro`, `textBlock`, `cardGrid`, `stepList`, `cta`, `contactDetails`. Don't add a new component type without checking whether one of these already fits.

`Hero.astro` and the two `hero.md` content files (`src/content/components/{nl,en}/home/hero.md`) are the one deliberately untouched piece — every other homepage section was added after it.

Routing is a single dynamic catch-all (`src/pages/[...slug].astro`, `getStaticPaths()` over the `pages` collection) rendered through `src/components/PageRenderer.astro` — adding a new page needs only a new `pages` collection entry + its component entries, never a new route file.

**Known state:** home, services, process, projects, about, and contact (nl+en, 12 pages total) are implemented and `pnpm build` passes. Knowledge/Kennis has no real content yet and isn't started (see `plans/04-page-rollout-nl-en`).
