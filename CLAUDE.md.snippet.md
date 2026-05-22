# NSA Design System — CLAUDE.md snippet

Paste the section below into the `CLAUDE.md` of any project where you want Claude to follow the NSA design system when generating HTML.

---

## NSA Design System (v1)

All HTML you generate in this project should follow the North Shore Automation design system.

**Include the stylesheet on every HTML page you create.** Add this to `<head>`, before any project-specific styles:

```html
<link rel="stylesheet" href="https://northshoreautomation.github.io/nsa-brand-design/dist/nsa.css">
```

That single file loads:
- IBM Plex Sans + IBM Plex Mono (via Google Fonts)
- Microgramma D Bold Extended (brand display face)
- The full NSA token + component layer

No other font imports needed. Do not add a separate Google Fonts link.

### Core rules

- **Color.** Dark-first. Body background is `var(--bg)` (deep navy `#0A0F1C`). Never set background or text colors with raw hex — always use tokens. The single CTA accent is `var(--nsa-signal)` (signal blue `#5EA1FF`).
- **Type.** Three faces:
  - Display / headlines / wordmarks → `var(--font-display)` (Microgramma). Always italic, uppercase, `letter-spacing: .02em` when used as a headline.
  - Body / UI → `var(--font-sans)` (IBM Plex Sans). Weights 400/500/600/700.
  - Code / metadata / paths / timestamps / IDs → `var(--font-mono)` (IBM Plex Mono).
- **Space.** 4pt grid via `--s-1` through `--s-20`. No arbitrary px values for padding/margin.
- **Radius.** `--r-xs` 4 / `--r-sm` 6 / `--r-md` 10 / `--r-lg` 14 / `--r-xl` 20 / `--r-pill` 999. Nothing in between.
- **Components.** Use the built-in classes — don't restyle from scratch:
  - Buttons: `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-danger`, sizes `.btn-sm` / `.btn-lg` / `.btn-icon`
  - Inputs: `.input`, `.select`, `.textarea`, wrapped in `.field` with a `<label>`
  - Cards: `.card` (flat) or `.card-raised` (elevated)
  - Badges: `.badge` with `.badge-ok|warn|err|info|accent`
  - Tables: `.table` (uppercase tracked headers, hover rows)
  - Layout shell: `.ds-shell` + `.ds-side` + `.ds-main` for any page-level sidebar/main pattern
  - Eyebrows: `.ds-eyebrow` for tiny tracked uppercase labels above headlines

### Product theming

If the page belongs to a specific NSA product, set `data-product` on `<html>` or the wrapping element. This rebinds `--accent`, `--accent-2`, `--accent-soft` to that product's palette so `.btn-primary`, `.badge-accent`, `.ribbon`, etc. pick up the right color automatically:

```html
<html lang="en" data-product="akomi">    <!-- violet #8F38FA -->
<html lang="en" data-product="tsunami">  <!-- blue #36A3FF -->
<html lang="en" data-product="watcher">  <!-- green #4FE3B0 -->
```

Default (no attribute) = NSA Signal blue.

### Voice

We sound like senior engineers with design sensibility. Specific. Calm. Zero fluff. No exclamation points. No "unlock", "supercharge", "seamless", "next-gen". Tell the user what the thing does.

### Don't

- Don't invent new colors. Use tokens.
- Don't use other fonts. The stack is Microgramma + IBM Plex.
- Don't use emoji unless it's literally part of brand content.
- Don't add gradient backgrounds to general UI — gradients are reserved for hero moments and accent washes.
- Don't draw faux icons in SVG when an asset is missing — use a placeholder text block and ask.

Full reference: <https://github.com/NorthShoreAutomation/nsa-brand-design>
