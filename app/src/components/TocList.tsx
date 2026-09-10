"use client";

import { useEffect, useRef, useState } from "react";

type Heading = { text: string; slug: string };

// Scrollspy TOC (Docspace-style redesign, 2026-09-10 — see decisions.md).
//
// Rewritten 2026-09-10 (see decisions.md, "TOC click bug") — the original
// IntersectionObserver version picked `entries[0]` from whichever headings
// happened to change intersection state in a given callback batch, which
// is not necessarily the topmost visible heading. Combined with no
// scroll-margin-top on headings (so a clicked link landed the heading
// straight under the sticky header) and no smooth scroll, clicking a TOC
// link both looked broken (target hidden behind header) and produced a
// wrong/flickering active highlight. Fixed by:
// 1. A conventional "last heading whose top has scrolled past the header
//    offset" scrollspy algorithm instead of IntersectionObserver.
// 2. An explicit click handler that scrolls with the header offset
//    accounted for and sets the active state immediately (no lag waiting
//    for the scroll handler to catch up).
// 3. scroll-margin-top on headings themselves (globals.css) as a
//    second line of defense for any non-JS anchor navigation.
const HEADER_OFFSET = 96; // px — clears the sticky header; see --scroll-header-offset in globals.css

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function TocList({ headings }: { headings: Heading[] }) {
  const [activeSlug, setActiveSlug] = useState<string>(headings[0]?.slug ?? "");
  const tickingRef = useRef(false);

  useEffect(() => {
    const elements = headings
      .map((h) => ({ slug: h.slug, el: document.getElementById(h.slug) }))
      .filter((h): h is { slug: string; el: HTMLElement } => h.el !== null);
    if (elements.length === 0) return;

    function computeActive() {
      const scrollLine = window.scrollY + HEADER_OFFSET + 8;
      let current = elements[0].slug;
      for (const { slug, el } of elements) {
        if (el.getBoundingClientRect().top + window.scrollY <= scrollLine) {
          current = slug;
        } else {
          break;
        }
      }
      setActiveSlug(current);
    }

    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        computeActive();
        tickingRef.current = false;
      });
    }

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, slug: string) {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (!el) return;
    setActiveSlug(slug);
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${slug}`);
  }

  return (
    <nav
      aria-label="এই পাতায়"
      className="hidden xl:block"
      style={{
        width: "220px",
        // Sticky so the TOC stays in place while the article scrolls
        // beneath it — without this, scrolling down to click a later
        // heading scrolls the TOC itself out of view first (reported
        // 2026-09-10, see decisions.md). Its own max-height + scroll
        // handles the case where the heading list is taller than the
        // viewport.
        position: "sticky",
        top: "96px",
        maxHeight: "calc(100vh - 96px - 2rem)",
        overflowY: "auto",
        alignSelf: "flex-start",
      }}
    >
      <p className="type-label mb-3" style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}>
        এই পাতায়
      </p>
      <ul className="flex flex-col gap-0.5" style={{ borderLeft: "1px solid var(--color-border)" }}>
        {headings.map((h) => {
          const active = h.slug === activeSlug;
          return (
            <li key={h.slug}>
              <a
                href={`#${h.slug}`}
                onClick={(e) => handleClick(e, h.slug)}
                className="type-body-sm block py-1 pl-3 transition-colors"
                style={{
                  color: active ? "var(--color-accent)" : "var(--color-text-secondary)",
                  fontWeight: active ? 600 : 400,
                  borderLeft: active ? "2px solid var(--color-accent)" : "2px solid transparent",
                  marginLeft: "-1px",
                  transitionDuration: "var(--duration-fast)",
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
