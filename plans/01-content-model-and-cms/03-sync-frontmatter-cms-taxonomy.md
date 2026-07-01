---
task: 03-sync-frontmatter-cms-taxonomy
plan: 01-content-model-and-cms
status: planned
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

- [ ] For each new component type (features, process, cta, testimonials,
      stats): add a `contentTypes` entry in `frontmatter.json` matching the
      Zod fields, and register it in the relevant `pageFolders` entries under
      `contentTypes: [...]` (both `en` and `nl` folders)
- [ ] Add `pageFolders` entries for the new `projects` and `knowledge`
      collections (`src/content/projects/en`, `/nl`, `src/content/knowledge/en`, `/nl`)
      with their own content type definitions
- [ ] Verify `frontMatter.taxonomy.contentTypeField` (`"type"`) still applies
      cleanly — projects/knowledge don't have a `type` discriminant like
      components do, so check whether Frontmatter needs a per-folder content
      type instead (it does — `pageFolders[].contentTypes` already scopes types
      per folder, so this should just work)
- [ ] Open each folder in the Frontmatter panel and confirm the generated
      form matches the schema (no missing/extra fields)

## Acceptance criteria

- Every collection and component type from Tasks 01–02 has a matching
  Frontmatter content type
- Creating a new entry via the Frontmatter UI produces frontmatter that
  passes the Zod schema without manual edits

## Related files

- `frontmatter.json`
- `src/content.config.ts`
