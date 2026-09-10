# 12 — Theme Architecture

Three themes, one token set (spec §35, §36):

```text
Light       — default (since the 2026-09-10 Docspace-style redesign; see decisions.md)
Semi-Dark   — the master spec's original default (§36), kept as an alternate
Dark
```

**This default flip is a logged deviation from the master spec**, not an oversight — spec §36 calls for Semi-Dark as default. Morshed explicitly asked to match a reference documentation site's light-first visual style; see the "Full audit" and "Button color revised again" and the redesign entries in `decisions.md` for the reasoning and what was verified.

## Rules

- Same semantic token names across all three themes; only values change. `error` means error in every theme — themes never repurpose a token's meaning.
- Light is the default. Semi-Dark is kept exactly as the spec originally described it — professional, calm, layered dark surfaces, restrained contrast, **not pure black** — it just isn't the first thing a new visitor sees anymore.
- No unnecessary gradients, no excessive saturation, in any theme (spec §35, §51).
- Accessible focus states must hold their contrast in all three themes independently — verify per theme, not once. (Every color pairing in this redesign was verified by computing actual contrast ratios — see `07-design-token-architecture.md`'s measured-contrast table.)
- Theme switching preserves scroll position, reading progress, and any open UI state (drawer, TOC) — a theme toggle is not a page reload from the user's perspective.

## Where this lives technically

CSS custom properties scoped at the root, switched via a `data-theme` attribute, persisted in local storage (no account system in MVP — see `06-content-schema.md` / `17-mvp-scope.md`). `:root` carries Light directly (no attribute needed); `[data-theme="semi-dark"]` and `[data-theme="dark"]` override only the color tokens. Typography, spacing, radius, motion, and breakpoint tokens are shared across all three themes and never change per theme.

The toggle itself (`app/src/components/ThemeToggle.tsx`) uses `useSyncExternalStore`, not `useState` — the theme lives on the `<html>` element (outside React's own state, and unreadable during server rendering), which is exactly the case that hook is designed for. An earlier `useState` + lazy-initializer version caused a real hydration-mismatch crash whenever the persisted theme differed from the server's Light default (found and fixed 2026-09-10, see `decisions.md`).

## Implementation

Values are set (see `07-design-token-architecture.md`) and implemented as CSS custom properties in [`../app/src/app/globals.css`](../app/src/app/globals.css) — that file is the live source; `../tokens.css` is a stale pointer kept only so old links don't break.

Status: Phase 1's original theme-architecture blocker was resolved and audited twice (2026-09-10) — once for the original green/Semi-Dark-default palette's contrast failures, once for the redesign's new indigo/Light-default palette, both verified by computed contrast ratios rather than assumption. The SolaimanLipi small-size legibility flag from `07-design-token-architecture.md` is still unverified against real rendered UI.
