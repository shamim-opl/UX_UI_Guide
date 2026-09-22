"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Job, JobCategory } from "@/lib/job-types";
import { CATEGORY_LABELS, isJobOpen } from "@/lib/job-types";
import JobsFilterSheet from "@/components/JobsFilterSheet";

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s-7-6.05-7-11a7 7 0 1 1 14 0c0 4.95-7 11-7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" });
}

export default function JobsClient({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<JobCategory | null>(null);
  const [showClosed, setShowClosed] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

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
      {/* Search — shares a row with the mobile filter trigger (2026-09-22
          feedback) instead of stacking above it, so the two controls people
          use together to narrow the list sit together instead of the filter
          button reading as a second, separate step below. sm: and up keep
          the filter as the pill row further down, so the search box there
          stays alone at its original max-w-md. */}
      <div className="mt-6 flex items-center gap-2">
        <div className="relative flex-1 sm:max-w-md">
          <label htmlFor="jobs-search" className="sr-only">
            চাকরিতে খুঁজুন
          </label>
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
        {/* Wrapped in a plain div rather than putting sm:hidden directly on
            the button: .tag sets display:inline-block and, since it's
            defined below Tailwind's own @import in globals.css, wins the
            cascade over sm:hidden's display:none at the same specificity —
            the button stayed visible on desktop until this was caught
            (2026-09-22 feedback, screenshot in decisions.md). */}
        <div className="shrink-0 sm:hidden">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="tag inline-flex items-center gap-1.5"
            style={
              activeCategory
                ? { background: "var(--color-accent)", color: "var(--color-on-accent)", borderColor: "var(--color-accent)" }
                : undefined
            }
          >
            <FilterIcon />
            {activeCategory ? CATEGORY_LABELS[activeCategory] : "ফিল্টার"}
          </button>
        </div>
      </div>

      {(activeCategory || showClosed) && (
        // A <button>'s box shrinks to its text either way, so text-right
        // alone had nothing to push against — flex justify-end on the
        // wrapper actually moves the box itself (2026-09-22 feedback).
        <div className="mt-2 flex justify-end sm:hidden">
          <button
            type="button"
            onClick={() => {
              setActiveCategory(null);
              setShowClosed(false);
            }}
            className="type-caption"
            style={{ color: "var(--color-text-muted)", textDecoration: "underline" }}
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Category filter — a horizontal-scroll chip row (2026-09-15 fix for
          9 categories wrapping onto 8-9 lines) turned out to have its own
          mobile problem: nothing hints that the row scrolls, so chips sat
          cut off mid-word at both edges (feedback 2026-09-22, see screenshot
          in decisions.md), and once you scrolled past the active chip you
          couldn't see which filter was on. Mobile now gets a single compact
          "ফিল্টার" button that opens a bottom-sheet list (JobsFilterSheet) —
          the same picking-one-of-several pattern already used for the
          mobile nav. sm: and up keep the wrapping pill row, which has room
          to show every chip at once with no scrolling needed. */}
      <div className="mt-4">
        <div
          className="hidden items-center gap-2 sm:flex sm:flex-wrap"
          role="group"
          aria-label="ক্যাটাগরি অনুযায়ী ফিল্টার"
        >
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className="tag shrink-0"
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
                className="tag shrink-0"
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
        <label className="type-caption mt-3 hidden items-center gap-2 sm:flex" style={{ color: "var(--color-text-muted)" }}>
          <input type="checkbox" checked={showClosed} onChange={(e) => setShowClosed(e.target.checked)} />
          মেয়াদ শেষ হওয়া পোস্টও দেখাও
        </label>
      </div>

      <JobsFilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        jobs={jobs}
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        showClosed={showClosed}
        onToggleShowClosed={setShowClosed}
      />

      {/* Results */}
      <div className="mt-8">
        {filtered.length === 0 && (
          <div className="list-item-in">
            <p className="type-body-sm" style={{ color: "var(--color-text-muted)" }}>
              {query || activeCategory
                ? "এই সার্চ বা ক্যাটাগরিতে কোনো চাকরির পোস্ট নেই।"
                : "এই মুহূর্তে কোনো খোলা পোস্ট নেই।"}
              {!showClosed && " মেয়াদ শেষ হওয়া পোস্টসহ দেখতে নিচের চেকবক্সে টিক দাও।"}
            </p>
            {(query || activeCategory) && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory(null);
                }}
                className="tag mt-2"
                style={{ cursor: "pointer" }}
              >
                সব ফিল্টার মুছে দাও
              </button>
            )}
          </div>
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
                {/* Redesigned 2026-09-22 (mobile feedback): the old header
                    row put the category tag top-right in a flex-wrap row,
                    which looked fine with room to spare but on a narrow
                    phone had nowhere to sit next to the title — it wrapped
                    onto its own line, floating below the title/company block
                    with an odd gap. Grouping it into the badge row below
                    instead (with jobType and experience) means there's only
                    ever one place tags can wrap to, at any width, and the
                    deadline gets its own icon-led line so it reads as the
                    one thing worth a second glance. */}
                <Link href={`/jobs/${job.slug}`} className="card block" style={{ opacity: open ? 1 : 0.6 }}>
                  <h3 className="type-h4" style={{ color: "var(--color-text-primary)" }}>
                    {job.title}
                  </h3>
                  <p className="type-body-sm mt-1 flex items-center gap-1.5" style={{ color: "var(--color-text-secondary)" }}>
                    <PinIcon />
                    {job.company} &bull; {job.location}
                  </p>
                  <div className="type-caption mt-3 flex flex-wrap items-center gap-2" style={{ color: "var(--color-text-muted)" }}>
                    <span className="tag">{CATEGORY_LABELS[job.category]}</span>
                    <span>{job.jobType}</span>
                    {job.experience_level && <span>{job.experience_level}</span>}
                  </div>
                  <div
                    className="type-caption mt-3 flex items-center gap-1.5"
                    style={{ color: open ? "var(--color-success)" : "var(--color-error)" }}
                  >
                    <ClockIcon />
                    {!job.deadline
                      ? "চলমান নিয়োগ (নির্দিষ্ট ডেডলাইন নেই)"
                      : open
                        ? `আবেদনের শেষ তারিখ: ${formatDate(job.deadline)}`
                        : `মেয়াদ শেষ হয়েছে (${formatDate(job.deadline)})`}
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
