# 05 — Content Taxonomy

19 levels, 00–18, expandable (never hard-coded as a fixed enum — store as data, see `06-content-schema.md`).

```text
00 Getting Started               10 Accessibility & Inclusive Design
01 Digital Design Fundamentals   11 Platform & Device Design
02 Human & Psychology            12 Design Systems
03 UX Fundamentals               13 Product Design
04 UX Research                   14 Service Design
05 Information Architecture      15 Advanced UX
06 Interaction Design            16 AI UX
07 Visual Design                 17 Human–AI Interaction
08 UI Design                     18 Emerging & Future Interaction
09 Usability
```

## Per-level topic seeds (from spec, condensed — full lists in master-srs.md §7–§27)

- **00**: What is Design/UX/UI, UX vs UI, roles (UX/UI/Product/Interaction Designer), Design System, Interface, Experience, User, UX Process, learning roadmap.
- **02**: Perception, Attention, Memory, Cognition, Learning, Emotion, Motivation, Decision Making, Behavior, Habit, Mental Models, Cognitive Load, Human Error, Trust, Persuasion, cognitive biases, Gestalt, behavioral economics, color/typography psychology.
- **03**: User/Need/Goal/Problem/Pain Point/Context/Scenario/Task/Use Case/User Story, Journey, Flow, Workflow, Service, Touchpoint, plus the UX process (Understand → Research → Define → Ideate → Design → Prototype → Test → Measure → Iterate).
- **04**: Research methods (interview, survey, observation, diary study, contextual inquiry, usability/A-B testing, card sorting, tree testing) + deliverables (persona, empathy map, journey map, service blueprint, JTBD).
- **06**: Affordance, Signifier, Feedback, Mapping, Constraints, Consistency, Visibility, Discoverability, Error Prevention/Recovery, Direct Manipulation; component states (Default/Hover/Focus/Pressed/Selected/Disabled/Loading/Success/Error/Empty).
- **08**: Full UI component reference (36 components listed in `08-component-inventory.md`).
- **10**: WCAG, POUR, visual/auditory/motor/cognitive accessibility, keyboard, screen reader, contrast, focus, forms, touch, motion, typography, multilingual.
- **11**: Mobile (Android/iOS/responsive/foldable), Tablet, Desktop (web/SaaS/enterprise/admin/dashboard/desktop apps), Other (watch/TV/ATM/kiosk/POS/signage/car/smart-home/AR/VR/MR/large displays).
- **16–18**: AI UX, Human-AI Interaction, Emerging & Future Interaction — every claim here must be labeled Established / Emerging / Experimental / Speculative (spec §27, §46).

## Rules

- Never teach a concept before its prerequisite is declared (spec §48). Enforced structurally by the `prerequisites` field in the content schema, not by editorial discipline alone.
- Reference and Search bypass the sequence intentionally — direct access to any topic is required alongside the structured path (spec §48: "structured learning + open exploration").
- Adding a new level or sub-topic must not require a schema or routing change — taxonomy is data (a config/CMS list), not code.
