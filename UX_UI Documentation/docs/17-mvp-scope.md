# 17 — MVP Scope

Per spec §52, the first implementation targets exactly this list — nothing more:

```text
Home
Learn
Article
Reference
Search
Glossary
Platform Guidelines
Theme System
Language Architecture (bn only content, en-ready schema)
Responsive Layout
Accessibility Foundation
```

## Explicitly out of MVP

- Accounts, login, saved progress across devices (progress is local-storage-only if included at all).
- Comments, social features, gamification (spec §51 — "not without purpose").
- English content (Phase 7).
- Knowledge graph visualization (spec §32 — long-term).
- Patterns and AI sections as fully-populated taxonomies — the routes/templates can exist, but content depth here is a Phase 3–6 concern, not MVP.
- Any CMS or backend.

## Content depth for MVP

Spec §52: "Do not attempt to create thousands of documents before validating the platform." MVP content should prioritize high-value foundational topics — enough from levels 00–03 (Getting Started, Digital Design Fundamentals, Human & Psychology, UX Fundamentals) plus a representative slice of the UI component reference (§14) and 5–10 UX Laws (§18) to prove the templates, navigation, search, and theming actually work end to end. Full 19-level content population is Phases 3–6, not MVP.

## Definition of done for MVP

A learner can land on Home, understand what the platform is, start the curriculum from Level 00, read an article with full navigation context (breadcrumb, TOC, prev/next, related), switch theme and see it hold across pages, and a reference-mode user can search "Button" or "Fitts's Law" and land directly on a well-structured answer — all in Bangla, on mobile and desktop, meeting WCAG 2.2 AA on the pages that exist.
