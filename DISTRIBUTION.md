# Distribution — NSA Design System

## How it ships

Everything lives in one public GitHub repo: **`NorthShoreAutomation/nsa-brand-design`**.

**GitHub Pages** serves the whole repo as a static site directly from `main`. This is the live, always-latest URL consumers load.

### Stylesheet URL

```
https://northshoreautomation.github.io/nsa-brand-design/dist/nsa.css
```

### Reference site (browseable in any browser)

```
https://northshoreautomation.github.io/nsa-brand-design/
```

The bare URL redirects to `site/index.html` (via `index.html` at the repo root). Every push to `main` is the deploy — Pages typically reflects the change within a minute.

The served CSS pulls in:
- IBM Plex Sans + IBM Plex Mono (via Google Fonts inside the CSS)
- Microgramma D Bold Extended (via relative `../fonts/` paths — resolved against the CSS URL on the same host)
- All design tokens + UI components

### Tagged release artifacts

In addition to the live Pages URL, every PR merged to `main` with a `release:major|minor|patch` label triggers `.github/workflows/release.yml`, which bumps `VERSION`, runs `build.sh`, tags `vX.Y.Z`, and attaches the regenerated `dist/nsa.css` to a GitHub Release. Use these when you want a frozen, immutable snapshot of a given version — e.g., as an archival download or to diff between versions.

Release page: <https://github.com/NorthShoreAutomation/nsa-brand-design/releases>

## Enabling GitHub Pages

One-time, in the GitHub UI:

1. Repo → **Settings** → **Pages**
2. **Source**: *Deploy from a branch*
3. **Branch**: `main`, folder `/ (root)`
4. Save. First build takes ~60s; subsequent pushes deploy in ~10–30s.

No workflow file needed. The repo is already structured to serve directly from `main`.

## Releasing new versions

Releases are automatic and label-driven, but happen in **two phases** so the workflow never needs to bypass the org-level branch protection on `main`. The author of a change does not bump `VERSION`, does not run `build.sh`, and does not tag — the workflow handles all of that.

### Author flow

1. Edit `tokens.css` / `components.css` on a branch.
2. Add entries under the `## [Unreleased]` section of `CHANGELOG.md`.
3. Open a PR against `main`.
4. Add exactly one label to the PR:
   - `release:major` — breaking change (`X+1.0.0`)
   - `release:minor` — new features, backward-compatible (`X.Y+1.0`)
   - `release:patch` — fixes only (`X.Y.Z+1`)
   - `release:skip` (or no label) — merge with no release cut
5. Merge the PR.

### Phase 1 — workflow opens a release PR

When the source PR merges, `.github/workflows/release.yml` runs `open-release-pr`:

1. Reads the label, computes the new semver.
2. Writes the new value to `VERSION`.
3. Rewrites `CHANGELOG.md`: the existing `[Unreleased]` section is moved under a new `## [X.Y.Z] — YYYY-MM-DD` heading and a fresh empty `[Unreleased]` is left at the top.
4. Runs `build.sh` to regenerate `dist/nsa.css` and sync the `sidebar.js` version label.
5. Commits the changes to a new `release/vX.Y.Z` branch as `github-actions[bot]`.
6. Opens a release PR from `release/vX.Y.Z` → `main`.

### Phase 2 — maintainer merges the release PR

A maintainer reviews the release PR (it should contain only the four files: `VERSION`, `CHANGELOG.md`, `sidebar.js`, `dist/nsa.css`) and merges it.

The merge produces a push event to `main`. `.github/workflows/release.yml` runs `tag-and-publish`:

1. Detects that the new commit changed `VERSION` (vs. its parent).
2. Tags `vX.Y.Z`, pushes the tag.
3. Creates a GitHub Release named after the tag with `dist/nsa.css` attached.

Tags are not gated by the branch ruleset, so the bot can push them directly.

### Why two phases

The org ruleset `nsa-protect-default-branch` requires all changes to `main` to go through a PR and disallows direct pushes from non-bypass actors. Adding `github-actions[bot]` to the org-level bypass list would affect every repo in the organization, so the workflow instead opens a PR like any other contributor.

### Manual / emergency releases

If the workflow is broken, cut a release locally (you'll need bypass rights on `main`):

```bash
echo "1.2.3" > VERSION
./build.sh
# Edit CHANGELOG.md by hand: move [Unreleased] entries under ## [1.2.3] — <date>
git commit -am "release v1.2.3"
git push origin main
git tag v1.2.3
git push origin v1.2.3
gh release create v1.2.3 dist/nsa.css --title v1.2.3 --generate-notes
```

Alternatively, push only the `VERSION`/`CHANGELOG.md`/`dist/nsa.css` changes through a normal PR — once merged, Phase 2 of the workflow will see the `VERSION` change and tag + publish automatically.

## Consumer setup

In each project's `CLAUDE.md`, paste the contents of `CLAUDE.md.snippet.md`.
That tells Claude:
- which stylesheet URL to load
- which tokens/components to use
- the voice rules and don't-list

## What's where

```
nsa-brand-design/
├── VERSION                    # single source of truth for the release version
├── build.sh                   # regenerates dist/nsa.css + syncs sidebar.js
├── tokens.css, components.css # source CSS (consumed by build.sh)
├── dist/
│   └── nsa.css                # ← the single distributable file (generated)
├── fonts/                     # Microgramma .ttf files (relative-linked from dist/nsa.css)
├── assets/                    # logo artwork
├── sidebar.js                 # shared sidebar for the reference site
├── site/                      # reference site pages (browseable via GH Pages)
├── index.html                 # root redirect → site/index.html
└── CLAUDE.md.snippet.md       # paste-into-consumer-CLAUDE.md rules
```

## Rebuilding dist/nsa.css

`dist/nsa.css` is generated by `build.sh` from `tokens.css` + `components.css`. The script adds the release banner (read from `VERSION`), prepends the Google Fonts `@import`, and rewrites Microgramma `url("fonts/...")` to `url("../fonts/...")` so they resolve to the sibling `fonts/` directory under whichever host is serving the CSS. It also propagates `VERSION` to the `NSA_DS_VERSION` constant in `sidebar.js` (the on-screen sidebar label).

Always run `./build.sh` before pushing a release. Do not edit `dist/nsa.css` by hand.
