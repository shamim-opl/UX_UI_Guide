# 16 — Development Roadmap

Phases per spec §53. Each phase ends with the gate in `14-technical-architecture.md` (build/lint/typecheck/responsive/a11y/nav/theme/language checks) before the next begins.

```text
Phase 0  Planning              done — 18 docs in this folder, signed off
Phase 1  Foundation            done — see "Phase 1 + 2" below
Phase 2  Documentation Engine  done — built alongside Phase 1, see below
Phase 3  Learning System       ← we are here: levels/prerequisites exist in
                               the data model, but progression/completion
                               tracking is not built (MVP scope question,
                               see 18-risks-tradeoffs.md, still open)
Phase 4  Search & Reference    global search, filters, glossary, reference pages
Phase 5  Visual Knowledge      diagrams, examples, annotated UI, comparison views
Phase 6  Advanced Content      accessibility, design systems, advanced UX, AI UX,
                               Human-AI Interaction
Phase 7  English               English content architecture + localization
```

## Exit criteria for Phase 0 (this planning phase)

- [x] 01 Product Architecture
- [x] 02 Information Architecture
- [x] 03 Sitemap
- [x] 04 Route Map
- [x] 05 Content Taxonomy
- [x] 06 Content Schema
- [x] 07 Design Token Architecture (values set 2026-09-10)
- [x] 08 Component Inventory
- [x] 09 Responsive Strategy
- [x] 10 Accessibility Strategy
- [x] 11 Search Strategy
- [x] 12 Theme Architecture (implemented in `../app/src/app/globals.css`)
- [x] 13 Localization Architecture
- [x] 14 Technical Architecture
- [x] 15 Folder Structure
- [x] 16 Development Roadmap (this doc)
- [x] 17 MVP Scope
- [x] 18 Risks & Trade-offs
- [x] Morshed's sign-off — design tokens, technical stack, and canonical-URL routing all confirmed 2026-09-10, see `decisions.md`

## Phase 1 blockers — all cleared

1. ~~Design token values~~ — done, see `07-design-token-architecture.md` and `../app/src/app/globals.css`.
2. ~~Confirmation of the technical stack~~ — confirmed, see `decisions.md`.
3. ~~Canonical-URL-vs-duplicate-view decision~~ — decided, see `decisions.md` and `03-sitemap.md`.

Phase 0 is closed.

## Phase 1 + 2 — built, 2026-09-10

The actual product lives in `../../app/` (Next.js 16, TypeScript, Tailwind v4, MDX). Built and verified in this session:

- **Foundation:** project scaffold, App Router, design tokens wired into `app/src/app/globals.css` (`:root` = Semi-Dark default, `[data-theme]` overrides for Dark/Light), Hind Siliguri + Noto Sans Bengali embedded via `next/font/google`, responsive layout (mobile/tablet/desktop verified), content model (`app/src/lib/content.ts`, `meta.yaml` + `bn.mdx` per concept per `06-content-schema.md`).
- **Documentation Engine:** article renderer (`ArticleLayout.tsx`) with MDX rendering (`next-mdx-remote/rsc`), breadcrumb, TOC (heading-anchor based), previous/next, related topics, the `<Callout>` content-quality component.
- **Routes live:** Home, `/learn` + level pages + article pages (learn mode, three-pane desktop layout with `LearnSidebar`), `/reference` + category pages + article pages (reference mode, no sidebar, canonical tag pointing to the Learn URL), `/search` (client-side substring index), `/glossary`, `/platforms` (+ iOS/Android/Web stubs), thin honest stubs for `/psychology`, `/ai`, `/patterns`, `/resources`.
- **Seed content:** 10 real articles (not placeholders) across levels 00/02/03/06/08/10, ~15 glossary terms, 3 platform guides — deliberately not the full 19-level taxonomy, per `17-mvp-scope.md`'s explicit "don't populate thousands of documents before validating" rule.
- **Verified:** `next build` (Turbopack) clean, `tsc --noEmit` clean, `eslint` clean, manually checked in-browser at mobile/tablet/desktop widths and all three themes.

**Full audit run 2026-09-10** (see `decisions.md`): found and fixed a duplicate related-topics section on every article, two content typos, one overstated claim, incorrect radiogroup ARIA on the theme toggle, and two real WCAG AA contrast failures (`text-muted`, and white-on-accent button text) — the latter measured via actual relative-luminance contrast calculation, not eyeballed. All fixed and re-verified (build/lint/typecheck clean, contrast re-measured, interactions re-tested via DOM state).

**Known gaps, still not built:**
- No automated accessibility test suite (axe-core etc.) — `10-accessibility-strategy.md`'s flagged gap, still open. This audit was manual/computed, not tool-driven.
- No progress tracking (Phase 3 scope, and still an open MVP question per `18-risks-tradeoffs.md`).
- SolaimanLipi small-size legibility still unverified against real rendered UI (flagged in `07-design-token-architecture.md`).
- No live-pointer-click testing across every viewport size (interactions were verified via DOM/state inspection when the click tool had rendering hiccups) — worth a manual pass before shipping wider.
