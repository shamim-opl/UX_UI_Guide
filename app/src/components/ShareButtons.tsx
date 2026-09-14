"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_URL } from "@/lib/site";

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8.6 10.6l6.8-3.8M8.6 13.4l6.8 3.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 14a5 5 0 0 0 7.07 0l2-2a5 5 0 0 0-7.07-7.07l-1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 10a5 5 0 0 0-7.07 0l-2 2a5 5 0 0 0 7.07 7.07l1-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Brand glyphs matching Footer.tsx's icon style (fill currentColor, 24x24
// viewBox, simplified paths).
const PLATFORM_ICONS: Record<string, string> = {
  Facebook:
    "M13.5 22v-8.4h2.8l.42-3.26h-3.22V8.24c0-.94.26-1.58 1.6-1.58H16.9V3.7c-.28-.04-1.25-.12-2.38-.12-2.36 0-3.97 1.44-3.97 4.08v2.28H8v3.26h2.55V22h2.95Z",
  LinkedIn:
    "M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM21 21v-6.98c0-3.74-2-5.48-4.66-5.48-2.15 0-3.11 1.18-3.65 2.01V8.5H9.31c.04.96 0 12.5 0 12.5h3.38v-6.98c0-.37.03-.75.14-1.02.3-.75 1-1.53 2.16-1.53 1.52 0 2.13 1.16 2.13 2.86V21H21Z",
  "X (Twitter)":
    "M18.24 3H21l-6.55 7.49L22 21h-6.24l-4.88-6.38L5.28 21H2.5l7.03-8.03L2 3h6.4l4.4 5.83L18.24 3Zm-1.1 16.17h1.53L7.02 4.72H5.38l11.76 14.45Z",
  WhatsApp:
    "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.41-1.42a9.87 9.87 0 0 0 4.63 1.18h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.06h-.01a8.15 8.15 0 0 1-4.15-1.14l-.3-.18-3.09.81.83-3.02-.19-.31a8.14 8.14 0 0 1-1.25-4.31c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.78c0 4.5-3.67 8.14-8.17 8.14Zm4.47-6.11c-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.29.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.04 0 1.2.88 2.36 1 2.53.12.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.45-.59 1.66-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z",
};

const PLATFORM_ORDER = ["Facebook", "LinkedIn", "X (Twitter)", "WhatsApp"];

function shareHref(platform: string, url: string, title: string): string {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  switch (platform) {
    case "Facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case "LinkedIn":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    case "X (Twitter)":
      return `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    case "WhatsApp":
      return `https://wa.me/?text=${t}%20${u}`;
    default:
      return url;
  }
}

export default function ShareButtons({ path, title }: { path: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const ref = useRef<HTMLDivElement>(null);
  const url = `${SITE_URL}${path}`;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2600);
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="type-caption flex items-center gap-1.5 rounded-md px-3 py-1.5"
        style={{ border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
      >
        <ShareIcon />
        শেয়ার করো
      </button>

      {open && (
        <div
          className="dropdown-panel absolute right-0 top-full z-10 mt-1 min-w-[220px] rounded-lg p-2"
          style={{ background: "var(--color-surface-elevated)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)" }}
        >
          <button
            onClick={handleCopy}
            className="dropdown-item type-body-sm flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left"
            style={{ color: copyStatus === "error" ? "var(--color-error)" : "var(--color-text-primary)" }}
          >
            <span key={copyStatus} className="success-pop flex items-center gap-2.5">
              {copyStatus === "copied" ? <CheckIcon /> : <LinkIcon />}
              {copyStatus === "copied" ? "লিংক কপি হয়েছে" : copyStatus === "error" ? "কপি করা যায়নি" : "লিংক কপি করো"}
            </span>
          </button>

          <div className="my-1" style={{ borderTop: "1px solid var(--color-border)" }} />

          {PLATFORM_ORDER.map((platform) => (
            <a
              key={platform}
              href={shareHref(platform, url, title)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="dropdown-item type-body-sm flex items-center gap-2.5 rounded-md px-3 py-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={PLATFORM_ICONS[platform]} />
              </svg>
              {platform}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
