# Content Source Registry

This is the source-of-truth list Claude (or any writer) must consult before writing or revising a UX/UI Knowledge Platform article. It exists so this platform is a **curated, source-backed knowledge base**, not a Bangla blog restating whatever one site said.

## Why this exists

Morshed's instruction (2026-09-10): content should be reference-based so readers trust it, and every article should compare multiple authoritative sources rather than paraphrasing one. This registry is how that gets enforced structurally instead of relying on remembering to do it each time.

## Tiers — what each is *for*, not how "good" it is

| Tier | Question it answers | Use it to... |
|---|---|---|
| 🔴 **Authority** | "Is this actually true?" | State a fact, a spec requirement, or a platform convention. Cite these directly. |
| 🟠 **Research** | "What's the evidence behind this?" | Support a claim about human behavior, usability, or effectiveness — cite the study/report, not just the conclusion. |
| 🟡 **Education** | "How do I explain this simply?" | Calibrate the *explanation*, never the *fact*. Never cite these as the source of a claim — cross-check their claims against an Authority or Research source first. |
| 🟢 **Inspiration** | "What does this look like in practice?" | Find real UI examples to reference or screenshot-describe. Never a source of truth for a rule or number. |

## Workflow for writing or revising an article

```text
Topic
  → Check 2+ Authority sources (do platforms agree or differ?)
  → Check Research sources for the evidence behind any behavioral claim
  → Check Education sources only to calibrate a beginner-friendly explanation
  → Separate "universal principle" from "platform-specific convention"
  → Write the article in simple Bangla
  → Add a Sources & Evidence section (see 06-content-schema.md)
  → Set source_type / evidence_level / last_reviewed / content_status in meta.yaml
```

Never: read one article on one site and rewrite it in Bangla. That's translation, not knowledge-building, and it's exactly what this registry prevents.

## Files in this folder

- `registry-authority.md` — Tier 1 official standards, platform guidelines, government/enterprise design systems
- `registry-research.md` — Tier 2 UX research bodies and academic HCI sources
- `registry-education.md` — Tier 3 UX education and practical-tutorial sources
- `registry-inspiration.md` — Tier 4 visual/pattern reference sources (never cited as fact)
- `full-index.md` — every source Morshed listed (100), including the ones without a dedicated entry above; consult this before assuming a source isn't tracked

## Scope note

Morshed listed 100 sources. This registry gives full, structured entries (name/url/type/topics/best_for/priority) to the ~32 sources actually likely to get cited in this platform's content — the official standards, the major design systems, and the highest-authority research/education bodies. The remaining sources are catalogued in `full-index.md` with a one-line description each, not a full entry, because most of them (visual inspiration galleries, general design-news blogs) will rarely if ever be *cited*, only occasionally *browsed*. Promote an entry from the index to a full registry file the first time an article actually needs to cite it.
