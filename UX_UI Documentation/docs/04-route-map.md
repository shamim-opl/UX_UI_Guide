# 04 — Route Map (technical)

Assumes Next.js App Router (see `14-technical-architecture.md` for the stack decision). Maps sitemap.md to file-system routes.

```text
app/
├── page.tsx                              → /
├── learn/
│   ├── page.tsx                          → /learn
│   └── [level]/
│       ├── page.tsx                      → /learn/[level]
│       └── [topic]/page.tsx              → /learn/[level]/[topic]
├── reference/
│   ├── page.tsx                          → /reference
│   └── [category]/
│       └── [topic]/page.tsx              → /reference/[category]/[topic]
├── patterns/
│   ├── page.tsx                          → /patterns
│   └── [pattern]/page.tsx                → /patterns/[pattern]
├── platforms/
│   ├── page.tsx                          → /platforms
│   └── [platform]/page.tsx               → /platforms/[platform]
├── psychology/
│   ├── page.tsx                          → /psychology
│   └── [topic]/page.tsx                  → /psychology/[topic]
├── ai/
│   ├── page.tsx                          → /ai
│   └── [topic]/page.tsx                  → /ai/[topic]
├── resources/page.tsx                    → /resources
├── glossary/page.tsx                     → /glossary
├── search/page.tsx                       → /search
└── [slug]/page.tsx                       → canonical article fallback
```

## Rendering strategy per route

- Static generation (SSG) for all article and index routes — content is authored, not user-generated, and performance is a stated priority (spec §43).
- `/search` needs client-side interactivity (filters, live results) but can still be statically shelled with a client-side search index (see `11-search-strategy.md`).
- No server-side data fetching, no database, no auth routes in MVP — content lives in the repo as MDX/Markdown.

## Route-to-taxonomy mapping

`[level]` params map 1:1 to the 19 taxonomy levels (`00-getting-started` … `18-emerging-future-interaction`). `[category]` under `/reference/` maps to reference categories (laws, components, measurements, glossary-adjacent), not to taxonomy levels — a UI law like Fitts's Law is taxonomy level 18 (UX Laws & Principles) but reference category "laws."
