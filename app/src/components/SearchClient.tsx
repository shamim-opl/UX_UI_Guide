"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type SearchIndexItem = {
  id: string;
  title_bn: string;
  title_en: string;
  category: string;
  summary_bn: string;
  difficulty: string;
  tags: string[];
  body: string;
  href: string;
};

const FILTERS = [
  { value: "all", label: "সব" },
  { value: "beginner", label: "প্রাইমারি" },
  { value: "intermediate", label: "মধ্যম" },
  { value: "advanced", label: "উন্নত" },
];

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: "প্রাইমারি",
  intermediate: "মধ্যম",
  advanced: "উন্নত",
};

// Unicode-normalize before comparing (NFC) — Bangla text can reach the page
// through different combining-mark orderings that look identical but fail
// a raw substring match otherwise. Also fixes nothing for case since Bangla
// has none, but toLowerCase() still helps for the English half of queries.
function normalize(s: string): string {
  return s.normalize("NFC").toLowerCase();
}

// Find a short window of `text` around the first match of `q`, for a
// search-result snippet — without this, a hit inside the body (the most
// common case now that body is indexed) was invisible in the results list.
function snippetAround(text: string, q: string, radius = 60): string | null {
  const idx = normalize(text).indexOf(q);
  if (idx === -1) return null;
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + q.length + radius);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

// Full-text search: previously only title_bn/summary_bn/tags were indexed,
// so any query matching only an article's body (the vast majority of real
// searches, in Bangla or English) returned zero results. body now carries
// the full stripped MDX text; title_en is included so an English title
// (e.g. "Fitts's Law") matches even when the Bangla title doesn't spell it
// out inline.
export default function SearchClient({ index }: { index: SearchIndexItem[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [filter, setFilter] = useState("all");

  // Results already filter live on every keystroke — this box previously
  // had no icon/button at all (inconsistent with the header's SearchBar)
  // and, more importantly, never wrote the refined query back to the URL,
  // so a search couldn't be bookmarked or shared once you'd typed past
  // whatever ?q= the page loaded with. Submitting now fixes both.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    router.replace(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return index
      .filter((item) => {
        const matchesQuery =
          q.length === 0 ||
          normalize(item.title_bn).includes(q) ||
          normalize(item.title_en).includes(q) ||
          normalize(item.summary_bn).includes(q) ||
          normalize(item.body).includes(q) ||
          item.tags.some((t) => normalize(t).includes(q));
        const matchesFilter = filter === "all" || item.difficulty === filter;
        return matchesQuery && matchesFilter;
      })
      .map((item) => ({
        ...item,
        snippet: q.length > 0 ? snippetAround(item.body, q) : null,
      }));
  }, [index, query, filter]);

  return (
    <div>
      <form onSubmit={handleSubmit} role="search" aria-label="প্ল্যাটফর্ম জুড়ে খুঁজুন" className="relative w-full max-w-xl">
        <label htmlFor="search-input" className="sr-only">
          খুঁজুন
        </label>
        {/* Matches SearchBar.tsx's icon+button pattern — this box previously
            had neither, which read as inconsistent and, worse, gave no
            clickable way to (re)submit a refined query into the URL. */}
        <button
          type="submit"
          aria-label="খুঁজুন"
          className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full"
          style={{
            color: "var(--color-text-muted)",
            width: "var(--size-touch-target)",
            height: "var(--size-touch-target)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="যা খুঁজছেন লিখুন…"
          className="input-field w-full rounded-full py-3 pl-11 pr-4 outline-none"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
          }}
        />
      </form>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="ফিল্টার">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className="tag"
            aria-pressed={filter === f.value}
            style={{
              background: filter === f.value ? "var(--color-accent-strong)" : "var(--color-surface-elevated)",
              color: filter === f.value ? "var(--color-on-accent)" : "var(--color-text-secondary)",
              cursor: "pointer",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="type-caption mt-4">{results.length} টা ফলাফল পাওয়া গেছে</p>

      <ul className="mt-4 flex flex-col gap-3">
        {results.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className="card list-item-in block" style={{ textDecoration: "none" }}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag">{item.category}</span>
                <span className="tag">{DIFFICULTY_LABEL[item.difficulty] ?? item.difficulty}</span>
              </div>
              <h3 className="type-h4 mt-2" style={{ color: "var(--color-text-primary)" }}>
                {item.title_bn}
              </h3>
              <p className="type-body-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                {item.summary_bn}
              </p>
              {item.snippet && (
                <p className="type-caption mt-2" style={{ color: "var(--color-text-muted)" }}>
                  {item.snippet}
                </p>
              )}
            </Link>
          </li>
        ))}
        {results.length === 0 && (
          <p className="type-body-sm" style={{ color: "var(--color-text-muted)" }}>
            কোনো ফলাফল পাওয়া যায়নি। ভিন্ন শব্দ দিয়ে চেষ্টা করুন।
          </p>
        )}
      </ul>
    </div>
  );
}
