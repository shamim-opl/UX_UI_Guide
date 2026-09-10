# 02 — Information Architecture

## Primary navigation

```text
Home | Learn | Reference | Patterns | Platforms | Psychology | AI | Resources | Glossary
```

Plus a persistent, highly visible global search — not folded into a menu.

Mobile: compact nav (hamburger or bottom bar) + persistent search access. Do not port the desktop nav 1:1.

## Top-level sections and what lives in each

- **Learn** — the 19-level curriculum (00 Getting Started → 18 Emerging & Future Interaction), sequential, prerequisite-aware.
- **Reference** — fast-access lookup: UX laws, UI components, measurements, checklists. Same underlying docs as Learn, different presentation (no learning-path chrome, anatomy/spec-first layout).
- **Patterns** — reusable UX/UI patterns (distinct from "Components," which is UI building blocks; patterns are compositions/behaviors, e.g. progressive disclosure, empty states, onboarding flows).
- **Platforms** — device/platform-specific guidance (Android, iOS, Web, watchOS, tvOS, car, AR/VR, etc.) kept separate from universal UX laws (spec §17).
- **Psychology** — human & psychology foundation (perception, cognition, memory, bias, etc.).
- **AI** — AI UX + Human-AI Interaction + Emerging/Future Interaction.
- **Resources** — supplementary: further reading, glossary link, standards citations index.
- **Glossary** — bn↔en term lookup, standalone from articles.

## Home page structure (spec §5)

```text
Header → Hero → Start Learning → Learning Roadmap → Explore Knowledge →
Popular/Important Topics → UX Laws & Principles → UI Reference → Psychology →
AI UX → Recently Added/Updated → Footer
```

Primary CTA: "Start from Zero." Secondary CTA: "Explore Reference." No marketing sections beyond this — the product is knowledge-first.

## Article-level navigation (spec §49)

Every article answers, without the user asking:

- Where am I? → breadcrumb + level indicator + category label
- Where did I come from? → breadcrumb trail
- What is related? → related-topics block (from relationship metadata)
- What next? → previous/next, or next-in-curriculum if in Learn mode

## Knowledge relationships (feeds search + related-topics + future graph)

```text
Prerequisite | Related | Part of | Similar | Applied in | Platform-specific | Advanced version
```

Stored as metadata on each document (§06 Content Schema), not as a separate system, in MVP.

## Diagram

See `sitemap.md` for the route-level tree. A journey-to-screen HTML diagram (the `information-architecture` skill's usual output) has not been generated yet — this document was written directly against the spec, not through that skill. Run `/information-architecture` properly before Phase 2 if a visual journey map is needed for stakeholder review; don't assume one exists until it's actually generated.
