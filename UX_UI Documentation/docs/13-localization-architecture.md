# 13 — Localization Architecture

Primary: Bangla. Secondary: English (spec §33). Architecture must support English being added **without restructuring**, so it is designed in from day one even though English content itself is Phase 7.

## Content model

```text
concept_id
 ├── bn   (required, MVP)
 └── en   (Phase 7, schema-ready from day one)
```

One `id` per concept, two language bodies (`bn.mdx`, `en.mdx`) under it — see `06-content-schema.md`. Never a parallel `content-bn/` / `content-en/` tree.

## Editorial rule (spec §47)

Bangla writing: সহজ, পরিষ্কার, natural, professional, beginner-friendly, technically accurate — avoid unnecessarily difficult Bangla terminology. When a technical term matters, introduce it as:

```text
বাংলা term (English term)
```

Explain first, *then* name the term — e.g. জ্ঞানীয় চাপ (Cognitive Load). English version (Phase 7) must read as professional and consistent on its own, not as a literal translation artifact.

## Routing (decide before Phase 7, not now)

Two live options: locale-prefixed routes (`/en/learn/...`) or a single route with a language toggle backed by the `en` field's presence. Given English content won't exist until Phase 7, defer the final choice — record it in `decisions.md` when Phase 7 starts, not speculatively now.

## Fallback behavior

If a user is in English mode and an `en` body doesn't exist yet for a given `id` (true for all content until Phase 7), fall back to Bangla with a visible "English translation not yet available" notice — never silently serve Bangla content under an English-labeled page.
