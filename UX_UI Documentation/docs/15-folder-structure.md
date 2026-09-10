# 15 — Folder Structure

Applies once implementation starts (Phase 1+), inside this project folder (`Project/ux_ui_knowledge_platform/`), separate from the planning docs in `UX_UI Documentation/`.

```text
Project/ux_ui_knowledge_platform/
├── context.md                        # this project's context (users, constraints)
├── UX_UI Documentation/
│   ├── master-srs.md                 # source-of-truth spec (do not edit; log deltas in decisions.md)
│   └── docs/                         # the 18 planning docs (this set)
└── app/                              # the actual product, created at implementation start
    ├── src/
    │   ├── app/                      # Next.js routes — see 04-route-map.md
    │   ├── components/
    │   │   ├── platform/             # nav, header, sidebar, TOC, search-bar, cards... (08-component-inventory.md §A)
    │   │   └── content/               # MDX-embeddable live examples (callout, code-block, comparison-table)
    │   ├── content/
    │   │   └── {concept-id}/
    │   │       ├── meta.yaml
    │   │       ├── bn.mdx
    │   │       └── en.mdx            # Phase 7+
    │   ├── lib/
    │   │   ├── taxonomy.ts           # 19-level definition as data, not hard-coded routes
    │   │   ├── search-index.ts
    │   │   └── content-loader.ts
    │   ├── styles/
    │   │   └── tokens/                # color, typography, spacing, radius, shadow, motion tokens
    │   └── glossary/
    │       └── terms.yaml
    ├── public/
    ├── tests/
    └── package.json
```

## Rule

Nothing under `app/` gets created until the 18 planning docs in `UX_UI Documentation/docs/` are internally consistent (spec §56, §58) and Morshed has confirmed the plan. This doc defines *where things will go*, not permission to start building.
