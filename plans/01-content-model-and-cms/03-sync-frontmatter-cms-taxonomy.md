---
task: 03-sync-frontmatter-cms-taxonomy
plan: 01-content-model-and-cms
status: done (component types); projects/knowledge deferred
---

# Task: Sync Frontmatter CMS taxonomy

## Goal

Update `frontmatter.json` so every schema added in Tasks 01–02 is editable
through the Frontmatter VS Code extension, keeping content editing
non-technical and CMS-free.

## Why

Frontmatter doesn't read `content.config.ts` — its `frontMatter.taxonomy.contentTypes`
and `frontMatter.content.pageFolders` arrays are maintained by hand and must
mirror the Zod schemas exactly, or the editor UI will show wrong fields (as
already done correctly for `page`, `component`/`hero`).

## Steps

- [x] For each of the six real component types (`intro`, `textBlock`,
      `cardGrid`, `stepList`, `cta`, `contactDetails` — see
      [Plan 01, Task 01](01-design-remaining-section-component-schemas.md)
      for why these replaced the originally-guessed `features`/`process`/
      `testimonials`/`stats` list): added a `contentTypes` entry in
      `frontmatter.json` matching the Zod fields exactly, including the
      `cardGridItem`/`stepListStep` field groups for the array-of-objects
      fields (`items`, `steps`)
- [x] Registered all six (plus the existing `hero`) in both `Components
      (English)` and `Components (Dutch)` `pageFolders` entries
- [x] Removed the old generic `component` content type — it never matched
      any real file (`type` is always a concrete value like `"hero"` or
      `"intro"`) and was dead weight
- [ ] Add `pageFolders` entries for the `projects` and `knowledge`
      collections — **deferred**, those collections don't exist yet (see
      [Plan 01, Task 02](02-design-projects-and-knowledge-collections.md),
      still `planned`). Revisit this task once that one lands.
- [ ] Open each folder in the Frontmatter panel and confirm the generated
      form matches the schema (no missing/extra fields) — **needs a human
      with the Frontmatter VS Code extension installed to verify**; the
      JSON was validated for syntax and cross-checked field-by-field
      against `src/content.config.ts`, but the actual editor UI hasn't been
      opened

## Acceptance criteria

- Every collection and component type from Tasks 01–02 has a matching
  Frontmatter content type
- Creating a new entry via the Frontmatter UI produces frontmatter that
  passes the Zod schema without manual edits

## Related files

- `frontmatter.json`
- `src/content.config.ts`
