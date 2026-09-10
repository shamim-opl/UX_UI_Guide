# 06 — Content Schema

## Document metadata (spec §45)

```yaml
id: string                # stable content_id, never reused, e.g. "cognitive-load"
slug: string               # URL slug, can change; id cannot
title_bn: string
title_en: string
category: string           # one of the 19 taxonomy levels, by key not index
subcategory: string?
level: enum                # "00".."18"
difficulty: enum           # beginner | intermediate | advanced
summary_bn: string
summary_en: string
prerequisites: [id]        # content_ids
related_topics: [id]
platforms: [string]?       # e.g. ["ios", "android"], only for platform-scoped docs
devices: [string]?
tags: [string]
status: enum               # draft | review | published
version: string
created_at: date
updated_at: date

# Sourcing metadata — added 2026-09-10 (see decisions.md) so every article
# is auditable years later. See content-sources/ for the source registry
# these fields point into.
source_type: enum          # primary | research | secondary | industry | inspiration
evidence_level: enum       # high | medium | emerging
sources_primary: [string]?    # names from content-sources/registry-authority.md
sources_research: [string]?   # names from content-sources/registry-research.md
sources_further: [string]?    # names from content-sources/registry-education.md, for "read more"
last_reviewed: date
content_status: enum       # verified | needs-review | deprecated
```

`source_type` and `evidence_level` describe the article as a whole (its dominant claim type); the per-claim classification inside the body still uses `<Callout type="...">` — see below. `sources_primary` / `sources_research` / `sources_further` hold source *names* (matching a `name:` field in the registry), not raw URLs, so a source's URL can change in the registry without touching every article that cites it.

## bn/en content split

```text
content/
  {id}/
    meta.yaml          # shared metadata (category, level, relationships, etc.)
    bn.mdx             # Bangla body
    en.mdx             # English body (Phase 7, can be absent pre-Phase-7)
```

One `id`, two language bodies. Never fork into `content-bn/` and `content-en/` trees (spec §33 explicitly forbids duplicate independent structures).

## Article body template (spec §29 — Documentation Standard)

Not every section is required; omit what's irrelevant rather than filling with filler (spec: "do not add meaningless filler").

```text
Title, Short Definition, Difficulty, Reading Time, Category, Prerequisites
────────────────────────────────────────────
What is it? / Why does it matter? / Simple Explanation / How does it work?
Real-world Example / UX Example / UI Example / Visual Example
Good Example / Bad Example
Rules or Principles / Best Practices / Common Mistakes
Accessibility / Mobile / Tablet / Desktop
AI / Future Context
Limitations / Related Concepts / Practice
Sources & Evidence
Next Topic
```

## Sources & Evidence section (added 2026-09-10, see decisions.md)

Replaces the earlier bare "Reference" heading. Required whenever an article makes a factual or evidence-based claim (i.e. almost always) — omit only for a pure opinion/definitional piece with nothing to cite. Written as a real section with subheadings, not a flat bibliography, because the *comparison* across sources is itself the content — see the `content-sources/README.md` workflow:

```markdown
## Sources & Evidence

**প্রাথমিক উৎস (Primary):**
- [Apple Human Interface Guidelines — Buttons](https://...)
- [Material Design 3 — Buttons](https://...)

**গবেষণা (Research):**
- Fitts, P. M. (1954). *The information capacity of the human motor system.*

**আরও পড়ুন (Further Reading):**
- [Laws of UX — Fitts's Law](https://...)

_সর্বশেষ পর্যালোচনা: 2026-09-10_
```

When two Primary sources disagree (e.g. Apple's 44pt vs. Material's 48dp touch target), state both and name it as a platform-specific convention — never silently pick one and present it as universal.

## Content quality classification (spec §46)

Every factual claim must be taggable as one of: Established knowledge, Research finding, Design guideline, Platform convention, Industry practice, Opinion, Emerging concept, Speculation. **Decided** (see `decisions.md`): implemented as a `<Callout type="...">` MDX component (`app/src/components/mdx/Callout.tsx`), not a document-level schema field, since classification applies per-claim.

## Glossary entry schema (spec §28, distinct from article schema)

```yaml
term: string
term_bn: string
definition_en: string
simple_explanation: string
example: string
related_terms: [id]
category: string
```

## Relationships (spec §32)

Stored as typed edges on `meta.yaml`: `prerequisite`, `related`, `part_of`, `similar`, `applied_in`, `platform_specific`, `advanced_version`. MVP renders these as related-topic lists; a graph visualization is explicitly long-term (§32), not MVP.
