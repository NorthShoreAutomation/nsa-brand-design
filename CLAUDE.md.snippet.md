# NSA Design System — CLAUDE.md snippet

Paste the section below into the `CLAUDE.md` of any project where you want Claude to follow the NSA design system when generating HTML.

---

## NSA Design System

All HTML you generate should follow the North Shore Automation design system. Include the stylesheet on every HTML page, before any page-specific styles:

```html
<link rel="stylesheet" href="https://northshoreautomation.github.io/nsa-brand-design/dist/nsa.css">
```

This loads IBM Plex Sans + Mono, the Microgramma display face, and the full NSA token + component layer. No other font imports needed.

**Rules:**
- **Color.** Dark-first. Body bg is `var(--bg)` (`#0A0F1C`). Never use raw hex — always tokens. Single CTA accent is `var(--nsa-signal)` (`#5EA1FF`).
- **Type.** Microgramma (`var(--font-display)`) for headlines — always italic, uppercase, `letter-spacing: .02em`. IBM Plex Sans (`var(--font-sans)`) for body/UI. IBM Plex Mono (`var(--font-mono)`) for code/metadata/IDs.
- **Space.** 4pt grid via `--s-1`…`--s-20`. No arbitrary px for padding/margin.
- **Radius.** `--r-xs` 4 / `--r-sm` 6 / `--r-md` 10 / `--r-lg` 14 / `--r-xl` 20 / `--r-pill` 999. Nothing in between.
- **Components.** Use built-in classes (`.btn`, `.input`, `.card`, `.badge`, `.table`, `.ds-shell`/`.ds-side`/`.ds-main`, `.ds-eyebrow`) — don't restyle from scratch.
- **Product theming.** Set `data-product="akomi|tsunami|watcher"` on `<html>` to rebind accent tokens.
- **Voice.** Senior engineer with design sensibility. Specific, calm, zero fluff. No exclamation points. No "unlock", "supercharge", "seamless", "next-gen".

**Don't:** invent new colors; use other fonts; add gradients to general UI (reserved for hero moments); draw faux icons in SVG when an asset is missing (use a placeholder and ask).

Full reference: <https://github.com/NorthShoreAutomation/nsa-brand-design>
