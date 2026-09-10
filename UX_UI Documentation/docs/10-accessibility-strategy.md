# 10 — Accessibility Strategy

Target: **WCAG 2.2 AA** (spec §42). Every claim in this doc and in shipped content must be verifiable against the authoritative WCAG text — never an invented rule (spec §46).

## Platform requirements (the app itself, spec §42)

```text
Keyboard navigation (full, no traps)
Visible focus (token: `focus`, see 07-design-token-architecture.md)
Semantic HTML, accessible headings, links, buttons
Screen-reader-friendly structure and landmarks
Sufficient color contrast
Reduced-motion support (respect prefers-reduced-motion)
Responsive/scalable text
No information conveyed by color alone
Accessible form labels
Skip links
```

## Content requirements (accessibility as subject matter, spec §20)

A dedicated accessibility section in the taxonomy (level 10) covering WCAG, POUR, and Visual/Auditory/Motor/Cognitive accessibility, Keyboard, Screen Reader, Contrast, Focus, Forms, Touch, Motion, Typography, Inclusive Design, Multilingual Accessibility — each citing its authoritative source.

## Process gate (spec §54)

"Test accessibility" is a required check after every implementation phase, alongside build/lint/typecheck/responsive/navigation/theme checks. A phase does not close until this passes.

## Known gap to resolve before Phase 2

No automated a11y testing tool has been chosen yet (axe-core, Lighthouse CI, or manual-only for MVP). Decide and log in `decisions.md` before Phase 2 (Documentation Engine) begins, since the article renderer's semantic structure depends on it.
