"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// "/" focuses search from anywhere (Docspace-style redesign, 2026-09-10 —
// see decisions.md), skipped while already typing in a field so it doesn't
// hijack the character inside another input/textarea.
export default function SearchBar({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="প্ল্যাটফর্ম জুড়ে খুঁজুন"
      className={compact ? "relative w-full" : "relative w-full max-w-md"}
    >
      <label htmlFor="global-search" className="sr-only">
        খুঁজুন
      </label>
      <input
        ref={inputRef}
        id="global-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="ডকুমেন্টেশন খুঁজুন…"
        className="input-field w-full rounded-full py-2 pl-5 pr-14 outline-none"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-primary)",
          fontSize: "var(--text-body-sm-size)",
          height: "var(--size-input-height)",
        }}
      />
      <kbd
        aria-hidden="true"
        className="type-caption pointer-events-none absolute top-1/2 hidden -translate-y-1/2 rounded px-1.5 py-0.5 sm:block"
        style={{
          right: "calc(var(--size-touch-target) + var(--space-2))",
          background: "var(--color-surface-elevated)",
          border: "1px solid var(--color-border)",
        }}
      >
        /
      </kbd>
      {/* Right-side circular CTA (moved from a left-side icon, redesigned
          2026-09-15 per Morshed's reference) — Enter still submits since
          this stays a real <form>, the button just gives the same action a
          visible, clickable target. */}
      <button
        type="submit"
        aria-label="খুঁজুন"
        className="search-cta absolute right-0 flex items-center justify-center rounded-full"
        style={{
          top: "50%",
          marginTop: "calc(var(--size-touch-target) / -2)",
          width: "var(--size-touch-target)",
          height: "var(--size-touch-target)",
          background: "var(--color-accent-strong)",
          color: "var(--color-on-accent)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}
