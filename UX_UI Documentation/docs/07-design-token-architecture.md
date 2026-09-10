# 07 — Design Token Architecture

Semantic tokens only. No component hard-codes a hex value, a raw px spacing, or a font-size — everything resolves through a token.

**Rewritten 2026-09-10 for the Docspace-style redesign** (see `decisions.md`) — Morshed asked to fully match a reference documentation site's visual style, which flips the default theme from Semi-Dark to Light and replaces the Medium-green accent with an indigo/purple one. This is a logged, deliberate deviation from the master spec's Semi-Dark-default instruction (§36). The original green/Semi-Dark-default values are preserved in git history and in the decisions log, not repeated here.

## Color tokens (spec §35)

Three themes, one set of names — **Light (default)**, **Semi-Dark**, **Dark**. `error` is always the error color in every theme; no token is repurposed across themes. Every value below was verified by computing actual WCAG contrast ratios (relative luminance), not eyeballed — see the audit history in `decisions.md`.

| Token | Light (default) | Semi-Dark | Dark |
|---|---|---|---|
| `background` | `#FFFFFF` | `#16181D` | `#0B0D10` |
| `surface` | `#FAFAFB` | `#1D2025` | `#14161A` |
| `surface-elevated` | `#FFFFFF` (+ `shadow-sm`) | `#242830` | `#1C1F24` |
| `surface-hover` | `#F3F4F6` | `#2B2F38` | `#24272D` |
| `text-primary` | `#0F172A` | `#E7E9EC` | `#F2F3F5` |
| `text-secondary` | `#475569` | `#A6ACB5` | `#B4B8BF` |
| `text-muted` | `#64748B` | `#7E848E` | `#7E848E` |
| `border` | `#E5E7EB` | `#2E323A` | `#2A2D33` |
| `accent` | `#4F46E5` | `#818CF8` | `#818CF8` |
| `accent-hover` | `#4338CA` | `#A5B4FC` | `#A5B4FC` |
| `accent-strong` | `#4338CA` | `#5B51E6` | `#5B51E6` |
| `accent-strong-hover` | `#3730A3` | `#392DE1` | `#392DE1` |
| `on-accent` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| `success` | `#15803D` | `#2FA968` | `#34B575` |
| `warning` | `#B45309` | `#D1A054` | `#E0A94D` |
| `error` | `#DC2626` | `#DB6459` | `#E5675A` |
| `info` | `#1D4ED8` | `#5B9DF5` | `#5B9DF5` |
| `focus` | `#4F46E5` | `#818CF8` | `#818CF8` |

**Measured contrast (2026-09-10):**

| Check | Light | Semi-Dark | Dark |
|---|---|---|---|
| `text-primary` vs `background` | 17.85:1 | 14.60:1 | 17.52:1 |
| `text-secondary` vs `background` | 7.58:1 | 7.77:1 | 9.77:1 |
| `text-muted` vs `background` | 4.76:1 | 4.72:1 | 5.17:1 |
| `accent` vs `background` (text/link use) | 6.29:1 | 5.95:1 | 6.52:1 |
| white on `accent-strong` (button fill) | 7.90:1 | 5.58:1 | 5.58:1 |
| `accent-strong` vs `background` (WCAG 1.4.11, ≥3:1) | 7.90:1 | 3.18:1 | 3.49:1 |
| `success`/`warning`/`error`/`info` vs `background` | all ≥4.83:1 | all ≥5.06:1 | all ≥5.95:1 |

Every row clears WCAG AA (4.5:1 text, 3:1 non-text UI boundary).

**Why `accent` and `accent-strong` are separate tokens, again:** the same lesson from the first (green) audit applied to the new purple — indigo-500 (`#6366F1`) measures only 4.47:1 as text on white (just under AA) and white text on it measures the same 4.47:1 (also just under). `accent` is indigo-600 (`#4F46E5`, safe as text/link color); `accent-strong` is indigo-700 (`#4338CA`, safe as a fill behind white button/chip labels). Buttons darken on hover (`accent-strong-hover`) rather than lighten, since lightening a fill that's already at the edge of passing contrast would fail it.

**Why Semi-Dark and Dark share one accent value:** unlike Light, both dark variants use the same `#818CF8` / `#5B51E6` pair — a single indigo tuned for dark backgrounds serves both without needing a second full ramp, since neither theme is the default that gets extra scrutiny.

Focus rings must never rely on color alone (spec §42) — pair the `focus` token with a visible outline/offset, not a color shift alone, in every theme.

## Typography tokens (spec §34)

**Font stacks**

```text
--font-heading: "Hind Siliguri", "Noto Sans Bengali", system-ui, sans-serif;
--font-body:    "SolaimanLipi", "Hind Siliguri", "Noto Sans Bengali", system-ui, sans-serif;
--font-code:    "Fira Code", "JetBrains Mono", ui-monospace, monospace;
```

**Flag on SolaimanLipi (per Morshed's choice, not a rejection of it):** SolaimanLipi was not built as a screen/UI webfont the way Hind Siliguri and Noto Sans Bengali were (both are Google Fonts, hinted and tested for small on-screen sizes). At `Body`/`Body Large` reading sizes (16–18px) it should render fine and gives the platform a distinct, less "generic Google Font" character. At `Caption`/`Label` sizes (13px and below) glyph clarity can degrade — the stack above lets Caption/Label fall through to Hind Siliguri rather than force SolaimanLipi at a size it wasn't designed for. Confirm this by testing the actual rendered UI, not by assumption — this is a hypothesis to verify in Phase 1, not settled fact.

**Scale**

| Token | Size | Line-height | Weight | Family |
|---|---|---|---|---|
| Display | 44px | 1.2 | 600 | heading |
| H1 | 36px | 1.25 | 600 | heading |
| H2 | 28px | 1.3 | 600 | heading |
| H3 | 24px | 1.35 | 500 | heading |
| H4 | 20px | 1.4 | 500 | heading |
| Body Large | 20px | 1.65 | 400 | body |
| Body | 18px | 1.75 | 400 | body |
| Body Small | 15px | 1.65 | 400 | body |
| Caption | 14px | 1.5 | 400 | heading (fallback, see flag above) |
| Label | 14px | 1.4 | 500 | heading |
| Code | 15px | 1.6 | 400 | code |

Line-heights run generous (1.65–1.75 for body) because Bangla conjuncts and matras need more vertical room than Latin text at the same point size — a tight Latin-style line-height clips Bangla glyphs.

**Sizes bumped from the original pass (16px body → 18px) during the 2026-09-10 audit** — Morshed flagged the original scale as tiring to read for long articles. Body copy carries the most reading time on this platform, so it moved the most; headings scaled proportionally less. Reading width widened from 680px to 736px (`--size-reading-width`) to keep line length in a comfortable range at the larger size.

Weights: 400 regular, 500 medium, 600 semibold, 700 bold (bold reserved for rare emphasis, not a heading default).

## Spacing, radius, size tokens

8px base scale:

```text
--space-1: 4px    (tight — icon-to-label gaps)
--space-2: 8px    (compact — internal component padding)
--space-3: 12px
--space-4: 16px   (comfortable — default stack gap)
--space-5: 24px   (spacious — between related groups)
--space-6: 32px
--space-7: 48px   (section — between page sections)
--space-8: 64px   (page — top-level page padding on desktop)
```

**Radius**

```text
--radius-sm: 6px      (input, button)
--radius-md: 10px     (card)
--radius-lg: 16px     (modal, sheet)
--radius-full: 9999px (pill, avatar)
```

**Sizing — recommended range + rationale, not a single universal value (spec §15)**

| Measurement | Range | Rationale / source |
|---|---|---|
| Touch target | 24–44px | WCAG 2.2 SC 2.5.8 sets 24×24 CSS px as the AA minimum; 44px (Apple HIG, Material Design common practice) is the comfortable target for primary actions on mobile. Use 24px only for dense, non-primary controls with adequate spacing between them. |
| Button height | 36–44px | 36px for compact/dense UI (e.g. reference-page inline controls), 44px for primary actions and anything touch-first. |
| Input height | 40–48px | Matches button height family so form rows feel aligned; err toward 48px on mobile. |
| Icon size | 16 / 20 / 24px | 16px inline with Body Small/Caption text, 20px with Body, 24px standalone (nav, buttons). |
| Reading width (article body) | 60–75 characters (~736px at the current 18px Body size) | Standard typographic reading-width guidance; Bangla's wider average glyph width means testing the actual character count on real content, not assuming the Latin-derived px value transfers exactly. |

## Other token categories

**Shadow** (Light theme only — Semi-Dark/Dark achieve elevation via `surface-elevated`'s lighter value, not shadow, since shadows barely read on dark backgrounds and risk looking like unintended glassmorphism):

```text
--shadow-sm: 0 1px 2px rgba(0,0,0,0.06)
--shadow-md: 0 4px 12px rgba(0,0,0,0.10)
--shadow-lg: 0 12px 32px rgba(0,0,0,0.14)
```

**Motion**

```text
--duration-fast: 100ms      (hover states, focus rings)
--duration-default: 200ms   (most transitions — theme switch, drawer open)
--duration-slow: 320ms      (page-level transitions, if any)
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)
```

320ms is the slow-end ceiling because on a budget Android device (a realistic device in this platform's Bangladesh-first audience), anything past ~350ms starts reading as lag rather than intentional motion. `prefers-reduced-motion: reduce` disables all non-essential transitions regardless of these values (spec §42).

**Breakpoints** (see `09-responsive-strategy.md` for intent per breakpoint)

```text
--bp-small-mobile: 360px
--bp-large-mobile: 480px
--bp-tablet: 768px
--bp-laptop: 1024px
--bp-desktop: 1280px
--bp-large-desktop: 1536px
```

**Z-index**

```text
--z-dropdown: 100
--z-sticky-header: 200
--z-drawer: 300
--z-modal: 400
--z-toast: 500
```

## Status

Values are set. See `12-theme-architecture.md` for the CSS custom-property implementation (`:root` + `[data-theme]` overrides). This unblocks Phase 1 per `16-development-roadmap.md`. Open item carried forward: verify the SolaimanLipi small-size legibility flag above against real rendered UI before Phase 1 sign-off, and confirm accent-color contrast ratios against the actual production font weights (contrast math above uses standard sRGB luminance, not font-specific rendering).
