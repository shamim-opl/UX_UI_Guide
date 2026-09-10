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
        ref={inputRef}
        id="global-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="ডকুমেন্টেশন খুঁজুন…"
        className="input-field w-full rounded-full py-2 pl-10 pr-10 outline-none"
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
        className="type-caption pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded px-1.5 py-0.5 sm:block"
        style={{ background: "var(--color-surface-elevated)", border: "1px solid var(--color-border)" }}
      >
        /
      </kbd>
    </form>
  );
}
