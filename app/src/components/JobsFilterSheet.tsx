"use client";

import { useEffect } from "react";
import type { Job, JobCategory } from "@/lib/job-types";
import { CATEGORY_LABELS, isJobOpen } from "@/lib/job-types";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Row({
  label,
  count,
  selected,
  onClick,
}: {
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="type-body-sm flex w-full items-center justify-between gap-2 rounded-md px-3 py-3 text-left"
      style={{ color: selected ? "var(--color-accent)" : "var(--color-text-primary)", fontWeight: selected ? 600 : 400 }}
    >
      <span>
        {label} <span style={{ color: "var(--color-text-muted)" }}>({count})</span>
      </span>
      {selected && <CheckIcon />}
    </button>
  );
}

// Mobile category filter, as a bottom sheet — same visual pattern as
// MobileNavSheet.tsx (rounded-t-2xl, drag handle, dimmed overlay). Replaces
// the horizontal-scroll chip row on mobile (2026-09-22 feedback): with 10
// categories, the scrollable row gave no hint that it scrolled, chips sat
// cut off mid-word at both edges, and there was no way to see which filter
// was active once you'd swiped past it. A full-height list of one-line rows
// is scannable in one glance and is the pattern already used by MobileNavSheet
// and PhotoShareButtons's dropdown for "pick one of several options" — same
// as a food-delivery or e-commerce app's filter sheet, which is the mental
// model most phone users already have for this. Desktop/tablet keep the
// existing wrapping pill row (JobsClient.tsx), which has room to show every
// chip at once without scrolling.
export default function JobsFilterSheet({
  open,
  onClose,
  jobs,
  categories,
  activeCategory,
  onSelectCategory,
  showClosed,
  onToggleShowClosed,
}: {
  open: boolean;
  onClose: () => void;
  jobs: Job[];
  categories: JobCategory[];
  activeCategory: JobCategory | null;
  onSelectCategory: (c: JobCategory | null) => void;
  showClosed: boolean;
  onToggleShowClosed: (v: boolean) => void;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const allCount = jobs.filter((j) => showClosed || isJobOpen(j)).length;

  return (
    <div
      aria-hidden={!open}
      className="fixed inset-0 sm:hidden"
      style={{ zIndex: "var(--z-drawer)" as unknown as number, pointerEvents: open ? "auto" : "none" }}
    >
      <button
        aria-label="ফিল্টার বন্ধ করুন"
        onClick={onClose}
        className="absolute inset-0 transition-opacity"
        style={{ background: "rgba(15, 23, 42, 0.4)", opacity: open ? 1 : 0, transitionDuration: "var(--duration-default)" }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="ক্যাটাগরি ফিল্টার"
        className="absolute bottom-0 left-0 right-0 flex max-h-[80vh] flex-col rounded-t-2xl transition-transform"
        style={{
          background: "var(--color-background)",
          borderTop: "1px solid var(--color-border)",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transitionDuration: "var(--duration-default)",
          transitionTimingFunction: "var(--ease-standard)",
        }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <span
            aria-hidden="true"
            className="block"
            style={{ width: "36px", height: "4px", borderRadius: "9999px", background: "var(--color-border)" }}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2">
          <span className="type-label" style={{ color: "var(--color-text-secondary)" }}>
            ক্যাটাগরি বেছে নাও
          </span>
          <button type="button" onClick={onClose} className="type-body-sm" style={{ color: "var(--color-accent)" }}>
            বন্ধ করো
          </button>
        </div>

        {/* Picking a row closes the sheet immediately (2026-09-22 feedback)
            — a single tap should be enough since this list is a one-of set,
            not a multi-select; needing a separate "done" tap after was one
            extra, redundant step. The header's own close button stays for
            someone who opens the sheet just to check "মেয়াদ শেষ..." without
            changing the category. */}
        <div className="overflow-y-auto px-2 pb-2">
          <Row
            label="সব"
            count={allCount}
            selected={activeCategory === null}
            onClick={() => {
              onSelectCategory(null);
              onClose();
            }}
          />
          {categories.map((c) => {
            const count = jobs.filter((j) => j.category === c && (showClosed || isJobOpen(j))).length;
            if (count === 0) return null;
            return (
              <Row
                key={c}
                label={CATEGORY_LABELS[c]}
                count={count}
                selected={activeCategory === c}
                onClick={() => {
                  onSelectCategory(c);
                  onClose();
                }}
              />
            );
          })}
        </div>

        <label
          className="type-caption flex items-center gap-2 px-4 py-3"
          style={{ color: "var(--color-text-muted)", borderTop: "1px solid var(--color-border)" }}
        >
          <input type="checkbox" checked={showClosed} onChange={(e) => onToggleShowClosed(e.target.checked)} />
          মেয়াদ শেষ হওয়া পোস্টও দেখাও
        </label>
      </div>
    </div>
  );
}
