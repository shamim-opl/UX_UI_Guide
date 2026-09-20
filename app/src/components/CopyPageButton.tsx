"use client";

import { useState } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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

function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Copies the article's raw Markdown to the clipboard — useful for pasting
// into an LLM or another editor, matching the "Copy Page" affordance from
// the Docspace reference (2026-09-10 redesign, see decisions.md). Also
// satisfies the "copy link"-adjacent reading-experience requirement in
// UX_UI Documentation/docs/09... (§39 of the master spec).
type Status = "idle" | "copied" | "error";

export default function CopyPageButton({ markdown, title, path }: { markdown: string; title: string; path: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleCopy() {
    // Source credit appended so pasted text always points back to the page.
    const withSource = `# ${title}\n\n${markdown.trim()}\n\n---\nসূত্র: ${SITE_NAME} — ${title}\n${SITE_URL}${path}\n`;
    try {
      await navigator.clipboard.writeText(withSource);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1800);
    } catch {
      // Clipboard API can fail (insecure context, denied permission, etc.) —
      // previously a silent no-op with zero feedback. Shown as a real error
      // state instead, since "nothing visibly happened" reads as broken.
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2600);
    }
  }

  const label =
    status === "copied" ? "কপি হয়েছে" : status === "error" ? "কপি করা যায়নি" : "পেজ কপি করুন";
  const icon = status === "copied" ? <CheckIcon /> : status === "error" ? <ErrorIcon /> : <CopyIcon />;

  return (
    <button
      onClick={handleCopy}
      className="type-caption flex min-h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 md:min-h-0 md:w-auto"
      style={{
        border: `1px solid ${status === "error" ? "var(--color-error)" : "var(--color-border)"}`,
        color: status === "error" ? "var(--color-error)" : "var(--color-text-secondary)",
      }}
      aria-live="polite"
    >
      <span key={status} className="success-pop flex items-center gap-1.5">
        {icon}
        {label}
      </span>
    </button>
  );
}
