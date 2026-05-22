# Distribution — NSA Design System

## How it ships

Everything lives in one public GitHub repo: **`NorthShoreAutomation/nsa-brand-design`**.

**GitHub Pages** serves the design system via the **Actions** deployment source. Every push to `main` rebuilds `dist/nsa.css` in the runner, stages the full site, and deploys it as a Pages artifact. Pages is the live, always-latest URL consumers load.

### Stylesheet URL

```
https://northshoreautomation.github.io/nsa-brand-design/dist/nsa.css
```

### Reference site

```
https://northshoreautomation.github.io/nsa-brand-design/
```

The bare URL redirects to `site/index.html` (via `index.html` at the repo root).

The served CSS pulls in:
- IBM Plex Sans + IBM Plex Mono (via Google Fonts inside the CSS)
- Microgramma D Bold Extended (via relative `../fonts/` paths — resolved against the CSS URL on the same host)
- All design tokens + UI components

### Tagged release artifacts

In addition to the live Pages URL, every PR merged to `main` with a `release:major|minor|patch` label triggers the release branch of `.github/workflows/release.yml`, which:

1. Computes the next semver from the most recent `v*` tag (the workflow uses `git describe` — there's no `VERSION` file).
2. Runs `build.sh` with `NSA_VERSION` set to the new version.
3. Creates an annotated tag `vX.Y.Z` whose tag message is the `[Unreleased]` block of `CHANGELOG.md`.
4. Creates a GitHub Release with `dist/nsa.css` attached and the same notes in the body.

Use these when you want a frozen, immutable snapshot of a given version — for archival, diffing between versions, or pinning a consumer to a specific release asset URL.

Release page: <https://github.com/NorthShoreAutomation/nsa-brand-design/releases>

## Enabling GitHub Pages

One-time, in the GitHub UI:

1. Repo → **Settings** → **Pages**
2. **Build and deployment → Source**: *GitHub Actions*

Or via API:

```bash
gh api -X PUT /repos/NorthShoreAutomation/nsa-brand-design/pages -F build_type=workflow
```

The workflow handles the deploy on every push to `main`.

## Releasing new versions

Releases are automatic and label-driven. The author of a change does not bump a version file, does not run `build.sh`, and does not tag — the workflow handles all of that. There is **no second PR** to merge.

### Author flow

1. Edit `tokens.css` / `components.css` on a branch.
2. Add entries under the `## [Unreleased]` section of `CHANGELOG.md`.
3. Open a PR against `main`.
4. Add exactly one label to the PR:
   - `release:major` — breaking change (`X+1.0.0`)
   - `release:minor` — new features, backward-compatible (`X.Y+1.0`)
   - `release:patch` — fixes only (`X.Y.Z+1`)
   - `release:skip` — merge with no release cut (still redeploys Pages)
5. Merge the PR.

### What the workflow does on the merge push

`.github/workflows/release.yml` runs once on the push to `main`. It:

1. Looks up the merging PR via `gh pr list --search "$GITHUB_SHA"` and reads its `release:*` label.
2. Computes the new version from the most recent `v*` tag (skip-labeled merges reuse the current version for the Pages banner only).
3. Builds `dist/nsa.css` fresh with `NSA_VERSION` set.
4. Stages `_site/` (sources + `dist/nsa.css` + a copy of `sidebar.js` with `__NSA_VERSION__` substituted) and deploys it to Pages.
5. If labeled for release: extracts the `[Unreleased]` block from `CHANGELOG.md`, creates an annotated tag `vX.Y.Z` with that content as the tag message, pushes the tag (tags are not blocked by the org ruleset), and runs `gh release create` to publish the GitHub Release with `dist/nsa.css` attached.

Nothing is committed back to `main`. The `[Unreleased]` block keeps accumulating bullets across releases — humans optionally promote entries under a dated heading in normal source PRs when they want a tidy timeline.

### Why single-phase

The previous two-phase pipeline existed because the original implementation committed `VERSION`, `dist/nsa.css`, `sidebar.js`, and a rewritten `CHANGELOG.md` back to `main`, which required a PR to clear the org ruleset `nsa-protect-default-branch`. The current pipeline removes all of that: version comes from git tags, `dist/nsa.css` is built fresh in the runner and served via the Pages artifact (gitignored in the repo), `sidebar.js` carries a placeholder that the workflow substitutes only in the deployed Pages copy, and `CHANGELOG.md` is human-managed. Tag pushes are not blocked by the ruleset, so the workflow completes in one run.

### Emergency / manual release

If something is broken with the label-driven path, you can force a release via `workflow_dispatch`:

```bash
gh workflow run release.yml -f force_version=1.2.3
```

This bypasses the label lookup and goes straight to the tag + Release path. It still builds and deploys Pages too.

If even that's broken, cut a release locally (you'll need bypass rights on `main` only if pushing changes back; tag pushes alone are unrestricted):

```bash
NSA_VERSION=1.2.3 ./build.sh
git tag -a v1.2.3 -m "$(awk '/^## \[Unreleased\]/{f=1;next} f && /^## \[/{exit} f' CHANGELOG.md)"
git push origin v1.2.3
gh release create v1.2.3 dist/nsa.css --title v1.2.3 --notes-file <(awk '/^## \[Unreleased\]/{f=1;next} f && /^## \[/{exit} f' CHANGELOG.md)
```

## Consumer setup

In each project's `CLAUDE.md`, paste the contents of `CLAUDE.md.snippet.md` — pick the **Internal** snippet for working docs, the **External** snippet for customer-facing surfaces.

That tells Claude:
- which stylesheet URL to load
- which tokens/components to use
- the voice rules and don't-list

## What's where

```
nsa-brand-design/
├── build.sh                   # regenerates dist/nsa.css (version from $NSA_VERSION or git tag)
├── tokens.css, components.css # source CSS (consumed by build.sh)
├── dist/                      # gitignored; workflow builds fresh per push
├── fonts/                     # Microgramma .ttf files (relative-linked from dist/nsa.css)
├── assets/                    # logo artwork
├── sidebar.js                 # shared sidebar; __NSA_VERSION__ placeholder substituted by workflow
├── site/                      # reference site pages (browseable via GH Pages)
├── index.html                 # root redirect → site/index.html
├── CHANGELOG.md               # human-managed; [Unreleased] block is release-notes source
├── .github/workflows/         # release.yml (single-phase) + pr-checks.yml (advisory)
└── CLAUDE.md.snippet.md       # paste-into-consumer-CLAUDE.md rules (internal + external)
```

## Rebuilding dist/nsa.css

`dist/nsa.css` is generated by `build.sh` from `tokens.css` + `components.css`. The script adds the release banner (read from `$NSA_VERSION` env var, or the most recent `v*` git tag, or `"dev"`), prepends the Google Fonts `@import`, and rewrites Microgramma `url("fonts/...")` to `url("../fonts/...")` so they resolve to the sibling `fonts/` directory under whichever host is serving the CSS.

For local preview: `./build.sh` (output lands in `dist/nsa.css`, gitignored).
The release workflow runs the same script in the runner with `NSA_VERSION` set.
