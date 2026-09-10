# Decisions Log

Per spec §58: any deviation from the source spec (information architecture, learning hierarchy, theme/language architecture, content model, accessibility direction, responsive strategy) must be logged here with Decision / Reason / Alternatives Considered / Impact / Date.

---

## Full audit, 2026-09-10 — findings and fixes

Ran a full review of the built product (content, code, accessibility) after the reading-size adjustment. Findings, all fixed in the same session:

1. **Body/heading type scale increased.** Morshed flagged the original sizes as tiring for long-form reading. Body copy moved 16px → 18px (line-height 1.7 → 1.75), other sizes scaled proportionally, reading width widened 680px → 736px to keep line length comfortable. See `07-design-token-architecture.md`.
2. **Duplicate "related topics" section on every article.** Each seed article had a hand-written `## সম্পর্কিত বিষয়` list in its MDX body *and* the auto-generated `<RelatedTopics>` component rendered the same thing again from `meta.yaml`. Removed the hand-written section from all 10 articles — the component is the single source now.
3. **Two content typos.** A stray `ৱ` character before "১৫টা" in `ux-vs-ui/bn.mdx`, and a misleading link (`[anti-pattern]` pointing to a level index with no anti-pattern content) in `what-is-ui/bn.mdx`. Fixed/removed.
4. **One inaccurate claim.** `wcag-accessibility/bn.mdx` stated the platform already shows icons alongside color for error states — no form/error UI exists yet. Reworded to state this as a future commitment, not a shipped fact (spec §46 requires not overstating what's built).
5. **Incorrect ARIA on the theme toggle.** Used `role="radiogroup"`/`role="radio"`/`aria-checked` on independently-tabbable `<button>` elements — real radiogroup semantics require arrow-key navigation and a single tab stop, which wasn't implemented. Screen readers would announce something a keyboard couldn't actually do. Changed to `role="group"` + `aria-pressed` per button, matching the pattern already used correctly in the search filters.
6. **Two WCAG AA contrast failures**, found by computing actual contrast ratios rather than eyeballing:
   - `text-muted` on background: 4.23:1 in Semi-Dark (needs 4.5:1). Lightened to `#7e848e` (4.72:1). Light theme's 4.54:1 had no safety margin either — darkened to `#6b6b6b` (5.33:1).
   - White button-label text on the accent green: 3.00:1 (Semi-Dark) and 2.62:1 (Dark) — both fail badly; even Light's 4.53:1 was right at the line. The accent green isn't dark enough to carry white text at any theme. Added a new `--color-on-accent` token (black, `#000000`) which measures 4.6–8:1 against the accent in all three themes, and switched every white-on-accent usage (buttons, skip link, active toggle/filter states) to it.
- **Verified after fixing:** `next build`, `tsc --noEmit`, `eslint` all clean; contrast ratios re-measured in-browser via relative-luminance calculation, not assumed; mobile menu and theme toggle interaction re-tested via DOM state, not just visual screenshot.
- **Still open:** no automated accessibility test suite (axe-core etc.) — this audit was manual/computed, not tool-driven. Flagged already in `10-accessibility-strategy.md`.

## TOC and sidebar made sticky

- **The bug:** after the click-scroll fix above, Morshed reported the TOC still felt broken — clicking a link seemed to make the whole panel "jump up." The actual cause was different from what the panel's own layout suggested: neither `TocList.tsx`'s nav nor `LearnSidebar.tsx`'s nav had `position: sticky`, so both scrolled away with the rest of the page like ordinary content. Scrolling down to click a later heading scrolled the TOC itself most of the way off-screen first, which reads as "it jumped."
- **Fix:** added `position: sticky; top: 96px; max-height: calc(100vh - 96px - 2rem); overflow-y: auto; align-self: flex-start` to both navs. `align-self: flex-start` is required — the parent is a flex row with default `align-items: stretch`, which would otherwise stretch the nav to the tallest sibling's height and leave no room for `sticky` to do anything.
- **Verified:** measured the TOC's `getBoundingClientRect().top` before and after `window.scrollTo(0, 800)` — identical (152.27px both times), confirming it holds position while the article scrolls beneath it. Confirmed the same for the Learn sidebar. Screenshotted both together mid-scroll.
- **Date:** 2026-09-10

## TOC click bug fixed + full click-through audit + micro-animations

- **The reported bug:** clicking a TOC link ("এই পাতায়") on an article page didn't scroll smoothly and the clicked item's highlight was unreliable/flickering.
- **Root cause (found, not guessed):** `TocList.tsx`'s `IntersectionObserver` callback picked `entries[0]` — whichever heading happened to be first in *that callback's batch of changed entries*, not necessarily the topmost visible heading. Combined with two missing pieces — no `scroll-behavior: smooth` anywhere, and no `scroll-margin-top` on headings — clicking a link caused an instant jump that could land the target heading directly behind the sticky header, and the observer's batch-order quirk produced a wrong or flickering active state on top of that.
- **Fix:** rewrote `TocList.tsx` to use a conventional "last heading whose top has scrolled past the header offset" scrollspy computed on scroll (rAF-throttled) instead of IntersectionObserver; added an explicit click handler that sets the active item immediately and calls `scrollIntoView({behavior: 'smooth'})` (falling back to `'auto'` under `prefers-reduced-motion`); added `scroll-margin-top: 96px` to `.article-prose h2/h3` as a second line of defense for any non-JS anchor navigation; added `html { scroll-behavior: smooth }` (disabled under reduced motion) globally so any anchor jump site-wide benefits, not just the TOC.
- **Verified:** clicked a TOC link via the DOM and confirmed programmatically — target heading lands at exactly 96px from viewport top (clear of the header), and the clicked link's computed color/font-weight match the active-state styling.
- **Full click-through audit:** navigated Home, Learn (index/level/article), Reference (index/category/article), Search, Glossary, Platforms, and the mobile drawer/desktop dropdown across breakpoints. One recurring console 404 investigated and traced to a debugging `fetch(..., {method:'HEAD'})` loop I ran mid-session that got aborted by a subsequent navigation — confirmed absent from the actual network log and from the production build; not a real site issue.
- **Micro-animations added** (150–300ms range, `ease-out`-equivalent `--ease-standard`, all wired through the existing `--duration-*` tokens that already zero out under `prefers-reduced-motion` — so every animation below is automatically disabled for that preference with no extra work): button `:active` press (scale 0.97), card `:active` tap feedback (scale 0.98) for the clickable Level/Topic/PrevNext cards, the "আরও" dropdown menu's open transition (fade + slight scale, `dropdown-panel` class — close stays instant, which reads as normal for a menu dismiss), and a focus border-color transition on both search inputs (previously snapped with no transition at all).
- **Deliberately not done:** full page-route transitions (fade between pages) and a theme-icon crossfade on the compact toggle — both would need more structural work (View Transitions API / a mount-key animation) for a marginal payoff, and the instruction was for subtle, safe motion, not effects justifying that risk. Flagged here rather than silently skipped.
- **Date:** 2026-09-10

## Content polish pass — gap audit against the article template

- **Decision:** Reviewed all 10 seed articles against the article template in `06-content-schema.md` (What is it / Why / Examples / Rules / Accessibility / Mobile-Tablet-Desktop / AI-Future / Limitations / Sources) and added the sections that were genuinely missing rather than padding every article uniformly.
- **What was added, by article:**
  - `cognitive-load` — Accessibility (cognitive accessibility, WCAG citation), AI/Future Context (conversational-UI load, labeled emerging).
  - `hicks-law` — Accessibility, Limitations (previously missing despite Common Misuse covering similar ground informally).
  - `fitts-law` — AI/Future Context (voice/gesture interfaces, labeled emerging).
  - `jakobs-law` — Good/Bad Example, Accessibility (ARIA landmark consistency) — also corrected its `<Callout type="established">` to `type="practice"` since, unlike Fitts's/Hick's, this "law" has no single empirical paper behind it (now reflected in `evidence_level: medium` vs. the others' `high`).
  - `user-journey` — সাধারণ ভুল (previously only had Rules, no explicit mistakes section), Accessibility (assistive-tech user journeys), AI/Future Context (chatbot touchpoints).
  - `button-component` — Good/Bad Example (was entirely missing), AI/Future Context (conversational-UI suggestion chips, labeled emerging), expanded Mobile/Desktop into Mobile/Tablet/Desktop.
  - `wcag-accessibility` — Limitations (WCAG conformance ≠ full usability), AI/Future Context (AI alt-text unreliability, labeled speculative), and a Common Mistakes addition about accessibility overlay widgets (a real, well-documented industry pitfall).
  - `what-is-ui` — সাধারণ ভুল (what-is-ux had one, this didn't) and an Accessibility section tying UI decisions to accessibility outcomes.
- **Glossary:** found six terms referenced via `related_terms` across existing entries that had no entry of their own (WCAG, Mental Model, Signifier, Navigation, User Research, Usability Testing) — added all six.
- **A duplication bug I introduced and then caught:** every article's new "Sources & Evidence" section ended with a manually-typed `_সর্বশেষ পর্যালোচনা: ..._` line, duplicating the `last_reviewed` date already shown in the article header from `meta.yaml`. This is the same class of mistake as the earlier related-topics duplication (manually writing what a component already derives from metadata) — removed the manual line from all 10 files; the header badge is now the single source of truth for that date.
- **Reading times updated** on every article that grew (5→7, 4→6, etc.) to stay honest — the numbers were becoming stale as content was added without revisiting them.
- **Verified:** all new internal links checked against actual routes (none broken); `next build`, `eslint`, `tsc --noEmit` all clean; spot-checked rendered pages in-browser.
- **Date:** 2026-09-10

## Source registry, evidence-tagged content, and SEO foundation

- **Decision:** At Morshed's request, adopted a source-tiering system (Authority/Research/Education/Inspiration, matching his own prioritization logic) instead of treating all 100 provided sources as equally citable. Built `UX_UI Documentation/content-sources/` with full registry entries for ~32 sources most likely to be cited (official standards, major design systems, top research/education bodies) and a complete one-line index of all 100. Added sourcing metadata to the content schema (`source_type`, `evidence_level`, `last_reviewed`, `content_status`) and a structured "Sources & Evidence" section (replacing the bare "Reference" heading) that separates Primary sources from Research from Further Reading, per the multi-source-comparison workflow Morshed described (the Button-article example: compare Apple HIG vs. Material vs. WCAG rather than paraphrasing one site).
- **Reason:** Direct client instruction — content should be reference-based for trust and SEO, and should explicitly compare sources rather than copy one.
- **Alternatives Considered:** A full individual registry file for all 100 sources — rejected as disproportionate effort for sources (visual-inspiration galleries, general design-news blogs) that will rarely if ever be cited as fact; promoting an index entry to a full one takes one file, done on demand instead of upfront.
- **Impact:** All 10 seed articles retrofitted with real, verifiable citations (original research papers for Fitts's/Hick's laws, official platform docs for Button, W3C for WCAG) and the new metadata fields. `06-content-schema.md` updated with the schema addition. This is a new methodology layer, not a taxonomy/IA change, so it doesn't touch the master spec's locked-in sections.
- **A real bug found and fixed during this work:** the Button article's new comparison table (Apple/Material/WCAG) rendered as raw pipe-separated text instead of an actual table — `next-mdx-remote` doesn't parse GitHub-Flavored-Markdown tables without the `remark-gfm` plugin, which wasn't wired in. This also silently affected the pre-existing UX-vs-UI comparison table from the first build pass, which had been rendering broken the whole time without anyone noticing (no visual QA step had scrolled far enough to catch it). Fixed by installing `remark-gfm` and passing it via `MDXRemote`'s `mdxOptions.remarkPlugins`.
- **SEO groundwork added:** `sitemap.ts` (dynamic, covers all published articles/levels/platforms), `robots.ts`, `metadataBase` + Open Graph/Twitter card defaults + a title template (`%s — UX/UI জ্ঞান প্ল্যাটফর্ম`) in the root layout, per-article `TechArticle` JSON-LD structured data (headline/description/dateModified/author), self-canonical tags on Learn article pages, and keyword-bearing per-page titles/descriptions replacing several that were just an English section name. `NEXT_PUBLIC_SITE_URL` must be set before production deploy — it currently falls back to `localhost:4210`, which would produce a wrong sitemap/canonical if shipped as-is.
- **Date:** 2026-09-10

## Docspace-style redesign — default theme flipped to Light, indigo accent

- **Decision:** At Morshed's explicit request (shown a reference documentation site, "Docspace", built on Framer), fully matched its visual style: default theme changed from Semi-Dark to **Light**, accent changed from the Medium-green family to an **indigo/purple** family (`#4F46E5` on Light, `#818CF8` on Semi-Dark/Dark). Structural patterns adopted: icon-per-level sidebar grouped into sections, a secondary tab row (Learn/Reference/Patterns/Platforms + an "আরও" overflow menu) under the header, breadcrumb with a home icon, a working "Copy Page" button (copies the article's raw Markdown), a scrollspy-driven "ON THIS PAGE" TOC with an active accent bar, `/`-key search focus, and a mobile bottom-sheet nav drawer (replacing the earlier full-width dropdown panel).
- **Reason:** Direct client design direction — "eytar moto banate chai" (want to build like this), confirmed as a full visual copy rather than structure-only when explicitly asked.
- **Alternatives Considered:** Keep Semi-Dark/green and only adopt layout structure — offered first, Morshed chose the full-copy option instead. Explicitly declined: the reference's "Sign up"/"Pricing" buttons, GitHub star count, and floating "View Changelog"/"Get Template" badges — none correspond to anything this platform has (no auth, no monetization, no changelog page, no separate template product), so copying them would be decoration without function.
- **Impact:** `07-design-token-architecture.md` and `12-theme-architecture.md` rewritten for the new palette and default. Every new color pairing was verified by computed contrast ratio (not assumed) before landing — see the measured-contrast table in `07-design-token-architecture.md`. New components: `LevelIcon.tsx`, `TocList.tsx`, `MobileNavSheet.tsx`, `CopyPageButton.tsx`; `Header.tsx`, `LearnSidebar.tsx`, `Breadcrumb.tsx`, `ThemeToggle.tsx`, `SearchBar.tsx`, `TableOfContents.tsx`, and the `.callout` styling were all rewritten, not patched.
- **A real bug found and fixed during this work:** the icon-based compact theme toggle caused a genuine hydration-mismatch crash (not a cosmetic issue) — React threw because the server always renders as if theme were Light, but a `useState(lazyInitializer)` pattern read the *actual* persisted theme (e.g. Dark) during the client's very first render, producing a different icon's DOM structure than the server sent. Fixed by switching `ThemeToggle` to `useSyncExternalStore`, the correct tool for state that lives outside React (here, the `data-theme` attribute on `<html>`) — this also fixed a latent bug where multiple mounted toggle instances (header + mobile sheet) wouldn't have stayed in sync under the old per-component `useState`.
- **Date:** 2026-09-10

## Button color revised again — accent-strong token added

- **Decision:** The audit above fixed the white-on-accent contrast failure by switching button/active-toggle text to black (`on-accent: #000000`). Morshed found black text on the green hard to read in practice and asked for white back. Reverting to plain white on the existing `accent` green would reintroduce the original failure (2.6–3.0:1), so instead: added `--color-accent-strong` (`#22774F`) and `--color-accent-strong-hover` (`#18593A`), a darker green used only as a fill behind white text (buttons, active theme-toggle/filter states). `--color-accent` itself is unchanged and still used as text/link color and for borders, where it already worked. `on-accent` is now white (`#ffffff`) again, paired only with `accent-strong`.
- **Reason:** White is the expected convention on a primary button and reads better to Morshed than black-on-green did, even though both were contrast-legal candidates at different shades. Rather than pick one universal fill for both "text-on-background" and "background-under-white-text" (which forced an either/or tradeoff), split into two tokens so each usage gets a color actually suited to it.
- **Alternatives Considered:** (a) Keep black text — technically already passed AA, rejected on Morshed's direct legibility feedback, which matters even when the math is defensible. (b) Make `accent` itself darker everywhere — rejected, would have weakened `accent`'s contrast/legibility where it's used as link/focus-ring color directly on dark backgrounds, which already worked well.
- **Impact:** `.btn-primary`, `.skip-link`, `ThemeToggle`'s active state, and `SearchClient`'s active filter chip all now use `accent-strong` as background instead of `accent`, with white text. Verified: white-on-`accent-strong` measures 5.50:1 (rest) / 8.30:1 (hover) in every theme; `accent-strong` itself measures ≥3.0:1 against every page background (WCAG 1.4.11 non-text contrast).
- **Date:** 2026-09-10

## Technical stack confirmed

- **Decision:** Use the spec's suggested stack as-is: Next.js/React, TypeScript, Tailwind CSS (token-driven, using `tokens.css`), MDX/structured Markdown for content, client-side search index for MVP, static/edge deployment.
- **Reason:** Morshed confirmed. No project-specific reason to deviate from the spec's own recommendation (§44) — static generation fits the no-backend, no-CMS, content-as-git-repo model already settled in `14-technical-architecture.md`.
- **Alternatives Considered:** None evaluated in depth — spec explicitly called this a starting suggestion to validate, not a fixed requirement; validation here is "does anything in MVP scope need a backend/database?" (No, per `17-mvp-scope.md`.)
- **Impact:** `14-technical-architecture.md` and `15-folder-structure.md` move from provisional to confirmed. Phase 1 can proceed on this stack.
- **Date:** 2026-09-10

## Canonical URL vs. Learn/Reference duplicate view

- **Decision (superseded during Phase 1 implementation, see below):** One canonical URL per article at `/[topic-slug]`, with `/learn/...` and `/reference/...` rewriting to it.
- **What was actually built:** Both `/learn/[level]/[topic]` and `/reference/[category]/[topic]` are real Next.js routes, each reading the *same* MDX source file (one file per `id`, per `06-content-schema.md` — no content is duplicated at the source level). To avoid the resulting duplicate-URL problem for SEO/search, the Reference route's page metadata sets `alternates.canonical` to the corresponding Learn URL (Learn is canonical for every article, since every article has a taxonomy level; Reference is the fast-access alternate view). No content fork exists; only the URL-level duplication is mitigated, via a `<link rel="canonical">` tag rather than a server rewrite.
- **Reason for the change:** A true rewrite-to-one-canonical-route with Next.js's static generation (`generateStaticParams`) turned out to add real implementation complexity for MVP with no user-facing benefit — both routes still need their own statically generated pages either way. The `mode` prop approach from the original decision (chrome differs, content doesn't) was kept; only the routing mechanism changed from "rewrite" to "two routes, one canonical tag."
- **Alternatives Considered:** (a) Redirect Reference → Learn — rejected, breaks the "answer fast, no forced curriculum context" promise of Reference mode (§41). (b) Actual server-side rewrite — deferred; revisit if SEO data later shows the canonical tag insufficient.
- **Impact:** `03-sitemap.md` should be read as "one canonical URL for indexing purposes," not "one URL in the routing table." Article renderer (`ArticleLayout.tsx`) takes the `mode` prop as originally decided.
- **Date:** 2026-09-10 (decided), revised 2026-09-10 during Phase 1 build.

## Content-quality classification mechanism

- **Decision:** Content-quality classification (spec §46: Established / Research finding / Guideline / Convention / Practice / Opinion / Emerging / Speculation) is implemented as a `<Callout type="...">` MDX component (`app/src/components/mdx/Callout.tsx`), rendered inline wherever an article makes a claim needing that label.
- **Reason:** This was an open item in `06-content-schema.md` ("mechanism not yet decided"). A per-claim inline component fits better than a document-level metadata field, since classification applies to individual claims, not whole articles.
- **Alternatives Considered:** A metadata field on the whole document — rejected, too coarse; most articles mix established fact with opinion or convention in different sections.
- **Impact:** `06-content-schema.md`'s open item is resolved. All seed content written during Phase 1 uses this component.
- **Date:** 2026-09-10

---

<!-- Template for future entries:

## [Short title]

- **Decision:**
- **Reason:**
- **Alternatives Considered:**
- **Impact:**
- **Date:**

-->
