# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- `.github/workflows/release.yml` — collapsed from two-phase to **single-phase**. On every push to `main` the workflow rebuilds `dist/nsa.css` fresh, stages the full site, and deploys it to GitHub Pages via `actions/deploy-pages`. When the merging PR carried `release:major|minor|patch`, the workflow additionally creates an annotated `vX.Y.Z` tag (notes from the `[Unreleased]` block of `CHANGELOG.md`) and a GitHub Release with `dist/nsa.css` attached. Nothing is committed back to `main`; the org ruleset `nsa-protect-default-branch` is branch-scoped, so the tag push is unrestricted. A `workflow_dispatch` trigger with a `force_version` input is available for emergency releases.
- `.github/workflows/pr-checks.yml` — dropped the file-scope gate (no more generated/managed files on `main` to protect). Kept the label-discipline and `[Unreleased]`-bullet gates.
- `build.sh` — version is now read from `$NSA_VERSION` (set by the release workflow) or `git describe --tags --abbrev=0 --match 'v*'` for local dev, falling back to `"dev"`. The script no longer writes to `sidebar.js`.
- `sidebar.js` — `NSA_DS_VERSION` is now a `__NSA_VERSION__` placeholder; the release workflow substitutes it into the deployed Pages copy only. Locally the sidebar shows `"dev"` via a runtime fallback so source diffs aren't churned.
- GitHub Pages source switched from "Deploy from a branch (main /)" to "GitHub Actions".

### Removed
- `VERSION` file — superseded by `git describe`. The most recent `v*` tag is now the source of truth for the current version.
- `dist/nsa.css` committed to `main` — the workflow now builds it fresh in the runner and ships it via the Pages artifact + GitHub Release attachment. `dist/` is gitignored.
- Two-phase release PR flow. Source PRs no longer trigger an automated `release/v*` follow-up PR. The `CHANGELOG.md` `[Unreleased]` block is no longer auto-promoted under dated headings — humans curate it in normal source PRs when they want a tidy timeline.

## [1.0] — 2026-05-22

### Added
- Initial public release of the NSA Design System.
- `tokens.css` — color, type, space, radius, elevation tokens; Microgramma `@font-face`; product-accent override layer.
- `components.css` — buttons, inputs, cards, badges, tables, `.ds-shell` layout primitives, eyebrows.
- `build.sh` — concatenates sources into single-file `dist/nsa.css` and syncs the sidebar version label.
- Reference site under `site/` with per-product pages (Akomi, Tsunami, Watcher).
- GitHub Pages as the primary distribution host.
