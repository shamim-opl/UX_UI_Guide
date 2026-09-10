# 11 — Search Strategy

Global search is core, not an add-on (spec §31) — visible on every page, not buried in a menu.

## Must support

Bangla + English queries, partial terms, synonyms, and filtering by category/tag/law/principle/component/platform/psychology/AI.

## Result card fields (spec §31)

```text
Title, Category, Short Description, Level, Language, Related Topics
```

## Filters (spec §31)

```text
All | Beginner | Intermediate | Advanced | UX | UI | Psychology | Accessibility | Platform | Design System | AI
```

## Technical approach — "start simple and scalable" (spec §44)

MVP: client-side search index built at build time from content frontmatter + a search-optimized excerpt (title_bn, title_en, summary_bn, summary_en, tags, category) — no backend, no external search service. A static-friendly library (e.g. a lightweight full-text index shipped as a JSON asset, loaded lazily) fits the "minimal JavaScript, static rendering" performance principle (spec §43).

Bilingual matching is the hard part: Bangla tokenization differs from English. MVP can do exact/substring + simple synonym map; true stemming/fuzzy Bangla search is a Phase 4+ refinement, not a Phase-1 blocker — log this as a known limitation, not a silent gap.

## Reference-mode requirement (spec §41)

A search for "Button" must land the user directly on `Definition → Anatomy → Sizes → States → Accessibility → Mobile → Web → Design System → Examples` without forcing a full article read first — this is a rendering/layout concern (reference template) more than a search concern, but search must route there, not to the Learn-mode version of the same content.
