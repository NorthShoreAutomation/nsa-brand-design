# NSA Design System — CLAUDE.md snippets

Two snippets, one design system. Pick the one that matches the surface you're generating:

- **Internal** — working docs (plans, reports, status updates, scratch HTML). Light contract: get the look without ceremony.
- **External** — customer-facing surfaces (product UI, marketing pages, anything shipped under the NSA brand). Full contract: headlines, voice, gradient discipline, product theming.

Both load the same `dist/nsa.css`. The difference is which rules Claude is held to when generating against it.

---

## Internal — paste into `CLAUDE.md` for working docs

## NSA Design System (internal docs)

For internal working docs (plans, reports, scratch HTML), include the NSA stylesheet so the doc inherits the system without ceremony:

```html
<link rel="stylesheet" href="https://northshoreautomation.github.io/nsa-brand-design/dist/nsa.css">
```

That's enough — body, type, and color come in automatically. When you need more:

- **Color.** Use tokens, never raw hex. Body is `var(--bg)`; text is `var(--text)`; accent is `var(--nsa-signal)`.
- **Space.** Use the `--s-1`…`--s-20` scale for padding/margin. No arbitrary px.
- **Components.** Reach for `.card`, `.badge`, `.table`, `.btn`, `.ds-shell`/`.ds-side`/`.ds-main` before writing custom CSS.

Headlines, voice, product theming, and gradient rules don't apply here — write how you write. This is not client facing and not branded marketing. Internal use only.

Full reference: <https://github.com/NorthShoreAutomation/nsa-brand-design>

---

## External — paste into `CLAUDE.md` for customer-facing surfaces

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
