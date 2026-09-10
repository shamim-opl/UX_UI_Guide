# 14 — Technical Architecture

Confirmed by Morshed 2026-09-10 (see `decisions.md`). Spec's preferred initial direction (§44), validated against MVP scope — nothing in `17-mvp-scope.md` requires a backend or database, so the static-first stack below applies as-is.

```text
Frontend       Next.js / React
Language       TypeScript
Styling        Tailwind CSS (or equivalent token-driven CSS architecture — see 07-design-token-architecture.md)
Content        MDX / structured Markdown
Search         Start simple and scalable (see 11-search-strategy.md — client-side index for MVP)
Icons          Accessible SVG icon system
Deployment     Static/edge-friendly
```

## Why this fits

- Content is authored, versioned, and reviewed like documentation, not generated at request time — static generation matches the performance mandate (§43: static rendering, minimal JS, lazy loading, caching) and the "no unnecessary backend complexity" rule (§43, §44).
- MDX lets articles embed live component examples (needed for Visual Learning, §40) while staying diffable/reviewable as text.
- No database, no auth service, no server in MVP — content lives in the git repo. This also means no user accounts, so progress tracking is client-side only (local storage) for MVP; see `17-mvp-scope.md`.

## Explicitly not doing yet

- No CMS — content is git-managed Markdown/MDX to keep the workflow reviewable and versioned like code.
- No backend API — nothing in MVP scope requires server-side logic (spec §52 MVP list has no accounts, no comments, no dynamic personalization).
- No client-heavy SPA — routes are statically generated pages, not a single JS bundle driving all navigation.

## Verification gates after each phase (spec §54)

Build, lint, TypeScript check, responsive test, accessibility check, navigation check, theme-switch check, language-architecture check. A phase is not "done" until all of these pass — this is a process requirement, not optional.
