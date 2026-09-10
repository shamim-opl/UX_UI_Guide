# 03 — Sitemap

```text
/                                   Home
/learn                              Learn overview (level list, progress)
/learn/[level]                      Level page (e.g. /learn/02-human-psychology)
/learn/[level]/[topic]               Article, in learning-path context
/reference                          Reference overview
/reference/[category]/[topic]        Article, in reference context (fast layout)
/patterns                           Pattern index
/patterns/[pattern]                  Pattern detail
/platforms                          Platform index (mobile/tablet/desktop/other)
/platforms/[platform]                Platform detail (e.g. /platforms/ios)
/psychology                         Psychology index
/psychology/[topic]                  Psychology article
/ai                                  AI UX + Human-AI Interaction index
/ai/[topic]                          AI UX article
/resources                          Curated resources, standards index
/glossary                           Glossary, bn↔en toggle
/glossary/[term]                     Term detail (or in-page anchor, see below)
/search                             Search results page
/[topic-slug]                       Canonical single-article URL; every section
                                     route above rewrites to this document rather
                                     than duplicating content (see decisions.md)
```

## Notes

- **One article, one canonical URL — decided, see `decisions.md`.** Learn and Reference both point at the same document (spec §33: "do not create duplicate independent structures"). `/learn/...` and `/reference/...` are routes that rewrite to `/[topic-slug]` (URL bar stays on the section path; no redirect), rendered with a `mode: "learn" | "reference"` prop that changes chrome only, never content. Implement in Phase 2 (article renderer).
- **Glossary term detail**: MVP can render as in-page anchors on `/glossary` rather than a route per term, given glossary entries are short (spec §28 fields: term, bn meaning, en definition, simple explanation, example, related terms, category). Revisit if glossary grows past ~300 terms.
- Level slugs use the two-digit prefix from the taxonomy (`00-getting-started` … `18-emerging-future-interaction`) so URLs sort naturally and stay stable as content is added mid-sequence is avoided (append only).

## Deferred to Phase 7 (English)

`/en/...` mirror is not a separate sitemap — same routes, locale-prefixed or via `Accept-Language`/toggle. Decide the exact locale routing strategy in `localization.md` before Phase 7, not now.
