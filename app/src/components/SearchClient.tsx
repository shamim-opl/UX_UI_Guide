"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export type SearchIndexItem = {
  id: string;
  title_bn: string;
  category: string;
  summary_bn: string;
  difficulty: string;
  tags: string[];
  href: string;
};

const FILTERS = [
  { value: "all", label: "সব" },
  { value: "beginner", label: "শিক্ষানবিশ" },
  { value: "intermediate", label: "মধ্যম" },
  { value: "advanced", label: "উন্নত" },
];

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: "শিক্ষানবিশ",
  intermediate: "মধ্যম",
  advanced: "উন্নত",
};

// MVP search per UX_UI Documentation/docs/11-search-strategy.md: client-side
// substring match over title/summary/tags, bn + en both typed by the user
// match since titles/tags are stored in bn already for MVP content. No
// stemming/fuzzy Bangla matching yet — documented as a known limitation.
export default function SearchClient({ index }: { index: SearchIndexItem[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [filter, setFilter] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return index.filter((item) => {
      const matchesQuery =
        q.length === 0 ||
        item.title_bn.toLowerCase().includes(q) ||
        item.summary_bn.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      const matchesFilter = filter === "all" || item.difficulty === filter;
      return matchesQuery && matchesFilter;
    });
  }, [index, query, filter]);

  return (
    <div>
      <label htmlFor="search-input" className="sr-only">
        খুঁজুন
      </label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="যা খুঁজছেন লিখুন…"
        className="input-field w-full max-w-xl rounded-full px-4 py-3 outline-none"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-primary)",
        }}
      />

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
            <Link href={item.href} className="card block" style={{ textDecoration: "none" }}>
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
