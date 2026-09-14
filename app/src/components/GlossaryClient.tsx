"use client";

import { useMemo, useState } from "react";
import type { GlossaryEntry } from "@/lib/glossary";

// Category labels + display order (Docspace-style redesign, 2026-09-13 —
// the flat A-Z card list gave no sense of what the page was for or how
// "related terms" tags related to anything — they weren't even clickable).
const CATEGORY_LABELS: Record<string, string> = {
  fundamentals: "মৌলিক ধারণা",
  psychology: "মনোবিজ্ঞান",
  "interaction-design": "ইন্টারঅ্যাকশন ডিজাইন",
  research: "গবেষণা",
  usability: "ইউজেবিলিটি",
  accessibility: "অ্যাক্সেসিবিলিটি",
  "information-architecture": "তথ্য স্থাপত্য",
  "design-systems": "ডিজাইন সিস্টেম",
};

function slugify(term: string): string {
  return term.toLowerCase().replace(/\s+/g, "-");
}

function scrollToTerm(term: string) {
  // Filters can hide the target card from the DOM entirely; clearing them
  // first (via the caller resetting query/category state) guarantees the
  // element exists before we try to scroll to it, one paint later.
  requestAnimationFrame(() => {
    const el = document.getElementById(slugify(term));
    if (!el) return;
    el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    el.classList.add("glossary-flash");
    window.setTimeout(() => el.classList.remove("glossary-flash"), 1200);
  });
}

export default function GlossaryClient({ terms }: { terms: GlossaryEntry[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const termsById = useMemo(() => new Map(terms.map((t) => [slugify(t.term), t])), [terms]);

  const categories = useMemo(() => {
    const seen = new Set(terms.map((t) => t.category));
    return Object.keys(CATEGORY_LABELS).filter((c) => seen.has(c));
  }, [terms]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms.filter((t) => {
      if (activeCategory && t.category !== activeCategory) return false;
      if (!q) return true;
      return (
        t.term.toLowerCase().includes(q) ||
        t.term_bn.toLowerCase().includes(q) ||
        t.simple_explanation.toLowerCase().includes(q)
      );
    });
  }, [terms, query, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryEntry[]>();
    for (const t of filtered) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)!.push(t);
    }
    for (const list of map.values()) list.sort((a, b) => a.term.localeCompare(b.term));
    return map;
  }, [filtered]);

  const isSearching = query.trim().length > 0;

  return (
    <div>
      <style>{`
        .glossary-flash { animation: glossary-flash-anim 1.2s ease; }
        @keyframes glossary-flash-anim {
          0%, 100% { background: var(--color-surface); }
          20% { background: color-mix(in srgb, var(--color-accent) 15%, var(--color-surface)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .glossary-flash { animation: none; }
        }
      `}</style>

      {/* Search */}
      <div className="mt-6">
        <label htmlFor="glossary-search" className="sr-only">
          শব্দকোষে খুঁজুন
        </label>
        <div className="relative max-w-md">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-text-muted)" }}
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="একটা শব্দ লিখো, যেমন 'Wireframe' বা 'জ্ঞানীয়'…"
            className="input-field w-full rounded-full py-2 pl-10 pr-4 outline-none"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
              fontSize: "var(--text-body-sm-size)",
              height: "var(--size-input-height)",
            }}
          />
        </div>
      </div>

      {/* Category filter pills */}
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="বিষয় অনুযায়ী ফিল্টার">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className="tag"
          style={
            activeCategory === null
              ? { background: "var(--color-accent)", color: "var(--color-on-accent)", borderColor: "var(--color-accent)" }
              : undefined
          }
        >
          সব ({terms.length})
        </button>
        {categories.map((c) => {
          const count = terms.filter((t) => t.category === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c === activeCategory ? null : c)}
              className="tag"
              style={
                activeCategory === c
                  ? { background: "var(--color-accent)", color: "var(--color-on-accent)", borderColor: "var(--color-accent)" }
                  : undefined
              }
            >
              {CATEGORY_LABELS[c]} ({count})
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="mt-8">
        {filtered.length === 0 && (
          <p className="type-body-sm" style={{ color: "var(--color-text-muted)" }}>
            &quot;{query}&quot; দিয়ে কোনো শব্দ পাওয়া যায়নি। বানান বদলে আবার চেষ্টা করো, অথবা{" "}
            <a href="/search" style={{ color: "var(--color-accent)" }}>
              পুরো সাইটে খুঁজো
            </a>
            ।
          </p>
        )}

        {[...grouped.entries()].map(([category, entries]) => (
          <section key={category} className="mt-10 first:mt-0">
            {!isSearching && (
              <h2 className="type-h3" style={{ color: "var(--color-text-primary)" }}>
                {CATEGORY_LABELS[category] ?? category}
              </h2>
            )}
            <dl className="mt-4 flex flex-col gap-4">
              {entries.map((entry) => (
                <div key={entry.term} id={slugify(entry.term)} className="card list-item-in scroll-mt-24">
                  <dt>
                    <span className="type-h4" style={{ color: "var(--color-text-primary)" }}>
                      {entry.term}
                    </span>
                    <span className="type-body-sm ml-2" style={{ color: "var(--color-text-secondary)" }}>
                      ({entry.term_bn})
                    </span>
                  </dt>
                  <dd className="mt-2">
                    <p className="type-body-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {entry.simple_explanation}
                    </p>
                    <p className="type-caption mt-2">উদাহরণ: {entry.example}</p>
                    {entry.related_terms.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="type-caption" style={{ color: "var(--color-text-muted)" }}>
                          সম্পর্কিত:
                        </span>
                        {entry.related_terms.map((rt) => {
                          const target = termsById.get(slugify(rt));
                          return target ? (
                            <button
                              key={rt}
                              type="button"
                              onClick={() => {
                                setQuery("");
                                setActiveCategory(null);
                                scrollToTerm(rt);
                              }}
                              className="tag"
                              style={{ cursor: "pointer" }}
                            >
                              {rt}
                            </button>
                          ) : (
                            <span key={rt} className="tag" style={{ opacity: 0.6 }}>
                              {rt}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
