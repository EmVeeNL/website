# Git Workflow & Commit Conventions

Repository: `git@github.com:EmVeeNL/website.git` (public). This document adds concrete branch and commit-message rules on top of EMVEE's general Git philosophy (`EmVee-Docs/docs/standards/Git_Workflow.md`): small changes, one purpose per commit, a readable history, short-lived branches, and deliberate merges.

## Why a public repo changes a few things

Because this repo is public:
- Never commit secrets, API tokens, or the final contact email/phone once they replace the `[VOEG HIER ... TOE]` placeholders in `src/content/pages/*/contact.md` — use environment variables / Cloudflare secrets for anything sensitive (see [Plan 06](../plans/06-deployment-cloudflare/index.md)).
- Commit messages and PR descriptions are visible externally — keep them factual, no internal-only shorthand that needs context nobody outside the team has.
- `.env`, `.dev.vars`, and `wrangler.jsonc` secrets must stay in `.gitignore`.

## Branching model

Two long-lived branches, everything else short-lived:

```
main                     protected, always deployable, releases only
└─ develop                protected, integration branch — feature PRs target this
   ├─ feat/<slug>          new functionality
   ├─ fix/<slug>            bug fix
   ├─ content/<slug>        copy/content-only changes (no code)
   ├─ chore/<slug>           tooling, deps, config
   └─ docs/<slug>             documentation only
```

Rules:
- Branch feature/fix/content/chore/docs branches from the latest `develop`, not `main`.
- PRs target `develop`. `develop` merges to `main` only for a release (deploy).
- One branch = one logical change. If you're describing the branch with "and", split it.
- Keep branches short-lived — days, not weeks. Rebase or merge `develop` back in regularly rather than letting a branch drift.
- Delete the branch after merge (both locally and on GitHub).
- No direct commits to `main` or `develop` — even small fixes go through a PR, so there's always a review checkpoint (per the "samenvoegen gebeurt bewust" principle in the base Git standard).

Branch name format: `type/short-kebab-case-description`, e.g. `feat/services-page-content`, `fix/mobile-nav-focus-trap`, `content/nl-contact-copy`.

## Conventional Commits

Every commit message follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short summary, imperative mood>

<optional body — the WHY, not just the what>

<optional footer — BREAKING CHANGE:, Closes #123>
```

### Types

| Type | Use for |
|---|---|
| `feat` | New user-facing functionality or content section |
| `fix` | Bug fix |
| `content` | Copy/content changes with no code change (new page content, translation) |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code change that isn't a fix or a feature |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `docs` | Documentation only (`docs/`, `README.md`, `plans/`) |
| `chore` | Tooling, dependency bumps, config that isn't user-facing |
| `ci` | Deployment / CI configuration |

### Rules

- Summary in imperative mood: "add services page schema", not "added" or "adds".
- Summary under ~72 characters, no trailing period.
- Scope is optional but useful when a change is localized: `feat(nav): add language switcher active state`.
- The body explains *why*, matching the base standard's principle that commits "leggen intentie vast" (record intent) — a diff already shows *what* changed.
- Breaking changes get a `BREAKING CHANGE:` footer line even though this is a website, not a library — e.g. a URL structure change that breaks existing external links.

### Examples

```
feat(content): add diensten and services page content

Ports the service descriptions from EmVee-Docs/docs/website/content
into the cardGrid component schema so the services page no longer 404s.
```

```
fix(nav): correct active state for nested service routes

isActive was only matching exact paths, so /diensten/x never
highlighted "Diensten" in the header.
```

```
docs: add image prompt library and OKLCH styleguide

Curates the 333 EmVee-Docs prompts down to the ~76 scenes that map
to pages actually built in this repo.
```

## Pull requests

- PR description states what changed and why, mirroring the commit body — don't make reviewers reconstruct intent from the diff alone.
- Small PRs review faster and revert more safely; this matters more on a public repo where history is part of the project's credibility.
- Squash-merge is fine for feature branches with messy in-progress commits, as long as the final squashed message still follows the Conventional Commits format above. Preserve individual commits on merge when they're each independently meaningful (e.g. a series of per-page content commits).

## Connecting this repo

```sh
git remote add origin git@github.com:EmVeeNL/website.git
git push -u origin main
git checkout -b develop
git push -u origin develop
```

Force-pushing to `main` or `develop` should be treated as a last resort, never a routine fix.
