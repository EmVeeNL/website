---
task: 03-projects-page
plan: 04-page-rollout-nl-en
status: done
---

# Task: Projects page

## Goal

Create `pages` collection entries for `projects` at `nl: /projecten` and
`en: /en/projects`, rendering `ProjectsGrid.astro` (Plan 03) populated from
the `projects` collection (Plan 01) rather than a `components[]` ref, since
this is a listing page over a separate collection.

## What's built

Went with the "dedicated anchor component type" approach exactly as
guessed here: `type: "projectsListing"` in `content.config.ts`, referenced
from `projecten.md`/`projects.md`'s `components[]` (inserted right after
the intro), resolved in `PageRenderer.astro` by querying the `projects`
collection filtered by `page.data.language` — not by the component entry's
own frontmatter. 2 nl + 2 en placeholder entries populated (see
[Plan 01, Task 02](../01-content-model-and-cms/02-design-projects-and-knowledge-collections.md)
for why they're placeholders, not real cases).

## Acceptance criteria

- Listing shows only entries matching the page's language — confirmed:
  the nl page shows the 2 nl entries, en page shows the 2 en entries
- Adding a new project entry requires no code change — confirmed: the
  listing component queries the collection dynamically, a new `.md` file
  under `src/content/projects/{lang}/` is picked up automatically
