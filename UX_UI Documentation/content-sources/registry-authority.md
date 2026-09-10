# 🔴 Authority Sources — "Is this actually true?"

Cite these directly for facts, spec requirements, and platform conventions. When two Authority sources disagree (e.g. Apple says 44pt, Material says 48dp), that disagreement is itself the article's content — write it as "platform-specific convention," not as one universal number.

---

```yaml
name: W3C — World Wide Web Consortium
url: https://www.w3.org/
type: standards-body
authority: primary
topics: [web-standards, html, css, specifications]
best_for: Citing the origin of any web platform standard, not just accessibility.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: W3C Web Accessibility Initiative (WAI)
url: https://www.w3.org/WAI/
type: standards-body
authority: primary
topics: [accessibility, wcag, inclusive-design]
best_for: Accessibility principles and the POUR framework.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: WCAG 2.2 — Web Content Accessibility Guidelines
url: https://www.w3.org/WAI/standards-guidelines/wcag/
type: standards-body
authority: primary
topics: [accessibility, success-criteria, conformance]
best_for: The exact success-criterion number and text behind any accessibility claim (e.g. "SC 2.5.8 Target Size"). Never state a WCAG number without checking it here first.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/
type: standards-body
authority: primary
topics: [accessibility, wcag, rationale]
best_for: The *why* behind a WCAG success criterion, and its intent/examples — use this before writing an accessibility "why it matters" section.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: W3C WAI Tutorials
url: https://www.w3.org/WAI/tutorials/
type: standards-body
authority: primary
topics: [accessibility, implementation, forms, navigation, images]
best_for: Concrete implementation guidance to pair with a WCAG citation.
source_priority: 2
last_checked: 2026-09-10
```

```yaml
name: MDN Web Docs
url: https://developer.mozilla.org/
type: platform-documentation
authority: primary
topics: [html, css, javascript, web-apis, accessibility]
best_for: The technical/browser-support ground truth behind any web platform claim.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: Apple Human Interface Guidelines
url: https://developer.apple.com/design/human-interface-guidelines/
type: platform-documentation
authority: primary
topics: [ios, ipados, macos, watchos, tvos, visionos, components, patterns]
best_for: iOS/Apple-platform-specific conventions — never cite as a universal UX rule.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: Apple Accessibility (HIG)
url: https://developer.apple.com/design/human-interface-guidelines/accessibility/
type: platform-documentation
authority: primary
topics: [accessibility, ios, voiceover, dynamic-type]
best_for: Apple-specific accessibility implementation (VoiceOver, Dynamic Type) — pair with WCAG for the universal requirement.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: Android Design
url: https://developer.android.com/design
type: platform-documentation
authority: primary
topics: [android, adaptive-layouts, components, form-factors]
best_for: Android-specific conventions — never cite as a universal UX rule.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: Material Design 3
url: https://m3.material.io/
type: design-system
authority: primary
topics: [android, components, tokens, motion, theming]
best_for: Google's own component specs and token system — the Android-world equivalent of Apple HIG.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: Microsoft Fluent 2
url: https://fluent2.microsoft.design/
type: design-system
authority: primary
topics: [windows, components, tokens, cross-platform]
best_for: Microsoft's current design system and component specs.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: Microsoft Windows Design
url: https://learn.microsoft.com/en-us/windows/apps/design/
type: platform-documentation
authority: primary
topics: [windows, layout, navigation, typography, motion, accessibility]
best_for: Windows-specific conventions — never cite as a universal UX rule.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: Microsoft HAX Toolkit
url: https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
type: platform-documentation
authority: primary
topics: [ai-ux, human-ai-interaction, guidelines, patterns]
best_for: This platform's AI UX / Human-AI Interaction sections (levels 16-17) — evidence-based, not speculative.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: Microsoft Human-AI Interaction Research
url: https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/
type: research-body
authority: primary
topics: [ai-ux, human-ai-interaction, research]
best_for: The original research paper behind the HAX guidelines — cite this when a HAX guideline needs its evidentiary backing shown.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: Google People + AI Guidebook
url: https://pair.withgoogle.com/guidebook/
type: platform-documentation
authority: primary
topics: [ai-ux, human-centered-ai, patterns]
best_for: Google's own human-centered AI design patterns — pair with Microsoft HAX for AI UX content, they often converge and it's worth noting when they do.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: IBM Carbon Design System
url: https://carbondesignsystem.com/
type: design-system
authority: primary
topics: [enterprise-ux, accessibility, components, patterns]
best_for: Enterprise/data-dense UI conventions (Advanced UX, level 15) and a strong accessibility-documentation example.
source_priority: 2
last_checked: 2026-09-10
```

```yaml
name: GitHub Primer
url: https://primer.style/
type: design-system
authority: primary
topics: [product-design, accessibility, components]
best_for: A well-documented, accessibility-first product design system — good component-doc structure reference too.
source_priority: 2
last_checked: 2026-09-10
```

```yaml
name: GOV.UK Design System
url: https://design-system.service.gov.uk/
type: design-system
authority: primary
topics: [government-services, accessibility, forms, patterns]
best_for: The clearest publicly-documented accessible-forms patterns available — excellent for the Forms/Accessibility content.
source_priority: 1
last_checked: 2026-09-10
```

```yaml
name: US Web Design System (USWDS)
url: https://designsystem.digital.gov/
type: design-system
authority: primary
topics: [government-services, accessibility, mobile-friendly]
best_for: A second government-grade accessible-design reference to cross-check against GOV.UK.
source_priority: 2
last_checked: 2026-09-10
```
