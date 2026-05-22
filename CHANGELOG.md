# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `.github/workflows/release.yml` — two-phase auto-release pipeline that respects the org-level branch protection on `main`. **Phase 1** fires when a labeled source PR merges to `main`: reads the `release:major|minor|patch` label, bumps `VERSION`, rewrites `CHANGELOG.md` (moves `[Unreleased]` under a new dated version heading), runs `build.sh`, commits to a `release/vX.Y.Z` branch, and opens a release PR back to `main`. **Phase 2** fires when any push to `main` changes the `VERSION` file (i.e. the release PR is merged): tags `vX.Y.Z` and creates a GitHub Release with `dist/nsa.css` attached. PRs with `release:skip` or no `release:*` label are no-ops.
- Four `release:*` labels on the repo: `release:major`, `release:minor`, `release:patch`, `release:skip`.

### Changed
- Distribution is now GitHub Pages only. All jsDelivr references removed from `README.md`, `DISTRIBUTION.md`, `CLAUDE.md`, and `build.sh`.
- `VERSION` format extended from `X.Y` to `X.Y.Z` semver to support patch releases. The release workflow normalizes the legacy `X.Y` value on first run (`1.0` is treated as `1.0.0`).
- Release flow no longer relies on manual `git tag` pushes — tagging and release-asset publishing happen inside the workflow after the release PR merges.

## [1.0] — 2026-05-22

### Added
- Initial public release of the NSA Design System.
- `tokens.css` — color, type, space, radius, elevation tokens; Microgramma `@font-face`; product-accent override layer.
- `components.css` — buttons, inputs, cards, badges, tables, `.ds-shell` layout primitives, eyebrows.
- `build.sh` — concatenates sources into single-file `dist/nsa.css` and syncs the sidebar version label.
- Reference site under `site/` with per-product pages (Akomi, Tsunami, Watcher).
- GitHub Pages as the primary distribution host.
