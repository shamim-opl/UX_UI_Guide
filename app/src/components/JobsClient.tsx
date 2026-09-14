"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Job, JobCategory } from "@/lib/job-types";
import { CATEGORY_LABELS, isJobOpen } from "@/lib/job-types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" });
}

export default function JobsClient({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<JobCategory | null>(null);
  const [showClosed, setShowClosed] = useState(false);

  const categories = useMemo(() => {
    const seen = new Set(jobs.map((j) => j.category));
    return (Object.keys(CATEGORY_LABELS) as JobCategory[]).filter((c) => seen.has(c));
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (!showClosed && !isJobOpen(j)) return false;
      if (activeCategory && j.category !== activeCategory) return false;
      if (!q) return true;
      return (
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      );
    });
  }, [jobs, query, activeCategory, showClosed]);

  return (
    <div>
      {/* Search */}
      <div className="mt-6">
        <label htmlFor="jobs-search" className="sr-only">
          চাকরিতে খুঁজুন
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
            id="jobs-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="পদ, কোম্পানি বা লোকেশন লিখো…"
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
      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="ক্যাটাগরি অনুযায়ী ফিল্টার">
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
          সব ({jobs.filter((j) => showClosed || isJobOpen(j)).length})
        </button>
        {categories.map((c) => {
          const count = jobs.filter((j) => j.category === c && (showClosed || isJobOpen(j))).length;
          if (count === 0) return null;
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
        <label className="type-caption ml-auto flex items-center gap-2" style={{ color: "var(--color-text-muted)" }}>
          <input type="checkbox" checked={showClosed} onChange={(e) => setShowClosed(e.target.checked)} />
          মেয়াদ শেষ হওয়া পোস্টও দেখাও
        </label>
      </div>

      {/* Results */}
      <div className="mt-8">
        {filtered.length === 0 && (
          <p className="type-body-sm" style={{ color: "var(--color-text-muted)" }}>
            এই মুহূর্তে এই শর্তে কোনো চাকরির পোস্ট নেই। ফিল্টার বদলে আবার চেষ্টা করো।
          </p>
        )}

        <div className="flex flex-col gap-4">
          {filtered.map((job) => {
            const open = isJobOpen(job);
            return (
              // list-item-in's "forwards" fill would otherwise pin opacity:1
              // permanently once it finishes, clobbering the closed-job dim
              // below — so the entrance animation lives on a wrapper instead
              // of the same element that carries the dimmed opacity.
              <div key={job.id} className="list-item-in">
                <Link href={`/jobs/${job.slug}`} className="card block" style={{ opacity: open ? 1 : 0.6 }}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="type-h4" style={{ color: "var(--color-text-primary)" }}>
                        {job.title}
                      </h3>
                      <p className="type-body-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                        {job.company} &bull; {job.location}
                      </p>
                    </div>
                    <span className="tag shrink-0">{CATEGORY_LABELS[job.category]}</span>
                  </div>
                  <div className="type-caption mt-3 flex flex-wrap items-center gap-3" style={{ color: "var(--color-text-muted)" }}>
                    <span>{job.jobType}</span>
                    {job.experience_level && <span>{job.experience_level}</span>}
                    <span style={{ color: open ? "var(--color-success)" : "var(--color-error)" }}>
                      {!job.deadline
                        ? "চলমান নিয়োগ (নির্দিষ্ট ডেডলাইন নেই)"
                        : open
                          ? `আবেদনের শেষ তারিখ: ${formatDate(job.deadline)}`
                          : `মেয়াদ শেষ হয়েছে (${formatDate(job.deadline)})`}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
