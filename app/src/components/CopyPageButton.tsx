"use client";

import { useState } from "react";

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Copies the article's raw Markdown to the clipboard — useful for pasting
// into an LLM or another editor, matching the "Copy Page" affordance from
// the Docspace reference (2026-09-10 redesign, see decisions.md). Also
// satisfies the "copy link"-adjacent reading-experience requirement in
// UX_UI Documentation/docs/09... (§39 of the master spec).
export default function CopyPageButton({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard API unavailable (e.g. insecure context) — no-op */
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="type-caption flex items-center gap-1.5 rounded-md px-3 py-1.5"
      style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? "কপি হয়েছে" : "পেজ কপি করুন"}
    </button>
  );
}
