# Project Context — UX/UI Knowledge Platform

## What this is

A standalone product, not Udvash-Unmesh-Uttoron client work. A Bangla-first UX/UI knowledge and documentation platform: structured learning system + documentation library + visual reference system + UX/UI encyclopedia, for beginner-to-advanced designers, developers, product designers, researchers.

Source of truth: [UX_UI Documentation/master-srs.md](UX_UI%20Documentation/master-srs.md). Do not contradict it without logging the change in `UX_UI Documentation/docs/decisions.md`.

## Users

- **Beginner** — knows nothing about UX/UI, needs simple Bangla, visual explanations, low cognitive load.
- **Intermediate designer** — needs practical rules, patterns, laws, UI references, platform guidelines.
- **Advanced/product designer** — needs complex systems, enterprise UX, research methods, AI UX.
- **Reference user** — wants to jump straight to one fact (a law, a spacing value, an accessibility rule) without reading a course.

Two modes required: **Learn mode** and **Reference mode**.

## Language

Primary: Bangla. Secondary: English. Content model must support both from day one via a stable `concept_id` with `bn`/`en` children — no duplicate parallel structures.

## Theme

Semi-Dark (default), Dark, Light. Semantic tokens only, no hard-coded colors. Semi-dark must read as calm, premium, documentation-grade — not pure black.

## Constraints carried from the spec

- Not a blog, not a social network, not a generic course platform.
- No gamification, comments, or social features in MVP.
- No invented UX laws, no invented accessibility standards, no fabricated references — cite authoritative sources (WCAG/W3C, Apple/Android/Microsoft platform docs, original research) or label as opinion/emerging/speculative.
- Taxonomy (00–18 levels) must stay expandable, not hard-coded.
- Planning before building: see `UX_UI Documentation/docs/` — 18 planning documents must exist and stay internally consistent before implementation begins (spec §56, §58).

## Status

Planning phase (Phase 1 in the spec's phased development, §53). No code written yet. Working through the 18 discovery documents listed in spec §56.
