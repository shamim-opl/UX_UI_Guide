# 18 — Risks & Trade-offs

| Risk | Why it matters | Mitigation |
|---|---|---|
| ~~No visual/brand direction exists yet~~ **Resolved 2026-09-10** | Token values are now set: Semi-Dark/Dark/Light color palettes, Hind Siliguri + SolaimanLipi typography, spacing/radius/motion scales — see `07-design-token-architecture.md` and `../tokens.css`. | Verify before Phase 1 sign-off: SolaimanLipi legibility at Caption/Label sizes, and accent-color contrast ratios against actual rendered font weights (both flagged in `07`'s Status section as unverified assumptions, not settled fact). |
| Bangla search quality | Bangla lacks the mature tokenization/stemming tooling English has; naive substring search will miss valid queries (spelling variants, conjunct forms). | Ship substring + synonym-map search for MVP, explicitly document it as a known limitation (not a silent gap), revisit with a proper Bangla-aware search approach in Phase 4+. |
| Content volume vs. quality | Spec explicitly warns against generating "thousands of documents before validating" (§52), but the full taxonomy is enormous (19 levels × dozens of topics each, plus 36 UI components each needing ~17 sub-sections). | Enforce `17-mvp-scope.md`'s content-depth limit strictly; resist the temptation to pre-populate the full taxonomy before the platform itself is validated. |
| Canonical URL vs. Learn/Reference duplication | Same article must be reachable from two different navigational contexts without becoming two content objects (§33) or two URLs indexed separately (SEO + maintenance cost). | Resolve routing approach (canonical + rewrites vs. single dynamic template with a `mode` prop) in Phase 1, before the article renderer (Phase 2) is built — flagged in `03-sitemap.md`. |
| Claims about UX laws / accessibility / platform rules | Spec is explicit and repeated: never invent a law, standard, or source (§18, §20, §46). This is a content-authoring discipline risk, not a code risk — easy to violate under time pressure. | Every factual article must carry its source classification (§46) and, for standards, a named authoritative citation (WCAG/W3C, official platform docs). Treat this as a content review gate, not optional polish. |
| AI UX / Emerging sections aging poorly | Section 16–18 content (AI UX, Human-AI Interaction, Emerging & Future) is the most likely to become outdated or to blur established-vs-speculative if not disciplined. | Mandatory Established/Emerging/Experimental/Speculative labeling (§27, §46) on every claim in these sections; treat as a living/versioned area, not "finish once." |
| Solo builder, large spec | This is an 18-level encyclopedia-scale platform being planned by one person's Claude Code session. Realistic pacing risk if Phase 3–6 content population is treated as a single push. | Phased delivery is already the spec's own structure (§53) — hold to it; do not let "finish the platform" collapse into "finish everything at once." |

## Open decisions still needing Morshed's input

1. ~~Visual/brand direction for the token values~~ — resolved 2026-09-10, see `07-design-token-architecture.md`.
2. ~~Final call on the technical stack~~ — confirmed 2026-09-10, see `decisions.md`.
3. Whether MVP includes any progress-tracking at all, or defers it entirely past MVP given no accounts exist. **Still open** — not yet raised with Morshed.
