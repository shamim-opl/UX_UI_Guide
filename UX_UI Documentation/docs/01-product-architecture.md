# 01 — Product Architecture

## Vision

A Bangla-first UX/UI knowledge and documentation platform. A beginner starts from zero; an advanced practitioner drops in for one fact. The product must behave like a structured learning system, a documentation library, a visual reference system, and a UX/UI encyclopedia — never like a blog.

## Core principle

> Understand Humans → Understand Psychology → Understand UX → Understand UI → Design Systems → Design Products → Design Intelligent Systems

Content is organized by this progression (00–18 levels), not by popularity or recency.

## Two operating modes

| Mode | Who | Behavior |
|---|---|---|
| **Learn mode** | Beginner → advanced, following the curriculum | Sequential, prerequisite-gated, progress-tracked |
| **Reference mode** | Anyone who already knows what they want | Search → land directly on the fact, no forced reading |

Both modes read from the same content model (§06 Content Schema) — reference pages are not a separate content type, they are the same articles surfaced without the learning-path chrome.

## System components

```text
Content Layer      — structured documents (MDX/Markdown + metadata), one per concept, bn/en children
Taxonomy Layer      — 19 levels (00–18), expandable, not hard-coded
Relationship Layer  — prerequisite / related / part-of / similar / applied-in / platform-specific / advanced-version edges (→ knowledge graph, long-term)
Navigation Layer     — global nav, sidebar, breadcrumbs, TOC, previous/next
Search Layer         — bilingual, filterable, synonym-aware
Learning Layer       — levels, progress, prerequisites, learning paths
Reference Layer      — fast-access component/law/pattern lookup
Theme Layer          — Semi-Dark (default) / Dark / Light, semantic tokens
Localization Layer   — bn primary, en secondary, same architecture
```

## Non-goals (explicit, from spec §51)

No social features, no comments, no gamification without purpose, no marketing-first homepage, no duplicate content structures per language, no hard-coded taxonomy or pixel values, no invented standards or laws.

## Open architectural questions

These need an answer before Phase 2 (see `decisions.md` once resolved):

1. Static-first (SSG) vs. server-rendered — affects search implementation and how "progress" is persisted.
2. Where does user progress live if there's no account system in MVP? (Likely: local storage only for MVP, per spec §52 which doesn't list accounts as MVP scope.)
3. Knowledge graph (spec §32) is a long-term goal — MVP only needs the relationship *fields* on each document, not a graph UI.
