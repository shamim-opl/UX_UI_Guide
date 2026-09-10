# 09 — Responsive Strategy

Breakpoint set (names, not final pixel values — pixel values are a token, see `07-design-token-architecture.md`):

```text
Small Mobile | Large Mobile | Tablet | Laptop | Desktop | Large Desktop
```

## Explicit per-breakpoint intent (spec §37), not a naive shrink

```text
Desktop   Sidebar + Content + Optional TOC   (three-pane, spec §38)
Tablet    Compact sidebar / drawer + Content
Mobile    Top header → Content → Bottom/drawer navigation
```

## Article page (spec §38)

- **Desktop**: three-column — nav sidebar, article body, "on this page" TOC.
- **Mobile**: Header → Breadcrumb → Title → Metadata → Article → Related Topics → Previous/Next. No persistent sidebar; navigation collapses to a drawer, TOC collapses to a jump-to control (not a hard requirement in the spec, but implied by "avoid excessive sidebars on mobile").

## Home page

Same section order on all breakpoints (spec §5 structure); at small sizes, multi-column topic grids (Popular Topics, UI Reference, etc.) become single-column or horizontally-scrollable — decide per-section at build time, not globally.

## Reading width

Article body copy gets its own max-width independent of the viewport-full layout width, at every breakpoint (constrained reading width is a stated requirement, spec §34, §39) — this is a token (see `07-design-token-architecture.md`), not a one-off.

## Testing requirement (spec §54)

Every phase's output must be checked at all six breakpoints before moving on, plus the "test responsive layouts" gate before phase sign-off.
