"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import MobileNavSheet from "./MobileNavSheet";
import { SITE_NAME } from "@/lib/site";

// Secondary tab row (Docspace-style redesign, 2026-09-10 — see decisions.md).
// Eight primary-nav items don't fit as flat tabs the way Docspace's five do,
// so the lower-traffic sections group under "আরও" (More) instead of forcing
// an 8-wide tab row.
// Labels here must match each destination page's own Breadcrumb label
// (and stay recognizably close to its H1) — they didn't before (English nav
// label landing on a Bangla H1/breadcrumb reads as "did my click even
// work?"), a real findability bug caught 2026-09-13. Bangla-first to match
// the platform's own content; "AI" stays as-is since it's the term itself,
// not a translation choice.
const TABS = [
  { href: "/learn", label: "শেখা" },
  { href: "/reference", label: "রেফারেন্স" },
  { href: "/patterns", label: "প্যাটার্ন" },
  { href: "/platforms", label: "প্ল্যাটফর্ম" },
  { href: "/jobs", label: "চাকরি" },
];

const MORE_LINKS = [
  { href: "/reference/measurements", label: "পিক্সেল ও মেজারমেন্ট" },
  { href: "/psychology", label: "সাইকোলজি" },
  { href: "/ai", label: "AI UX" },
  { href: "/resources", label: "রিসোর্স" },
  { href: "/glossary", label: "শব্দকোষ" },
  { href: "/feedback", label: "মতামত ও পরামর্শ" },
];

const ALL_NAV = [...TABS, ...MORE_LINKS];

// Matches --duration-fast in globals.css (kept as a JS constant since the
// unmount delay below needs a real number, not a CSS custom property).
// Micro-animation pass, 2026-09-15 — closing used to be an instant unmount.
const DROPDOWN_CLOSE_MS = 150;

function MoreMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function requestClose() {
    setOpen((wasOpen) => {
      if (!wasOpen) return wasOpen;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return false;
      setClosing(true);
      closeTimer.current = setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, DROPDOWN_CLOSE_MS);
      return wasOpen;
    });
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) requestClose();
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => (open ? requestClose() : setOpen(true))}
        aria-expanded={open}
        aria-haspopup="true"
        className="type-body-sm flex items-center gap-1 border-b-2 px-1 py-3"
        style={{
          color: active ? "var(--color-accent)" : "var(--color-text-secondary)",
          borderColor: active ? "var(--color-accent)" : "transparent",
        }}
      >
        আরও
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          className={`dropdown-panel absolute left-0 top-full z-10 mt-1 min-w-[180px] rounded-lg py-2 ${closing ? "dropdown-panel-closing" : ""}`}
          style={{ background: "var(--color-surface-elevated)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)" }}
        >
          {MORE_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="type-body-sm block px-4 py-2"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isMoreActive = MORE_LINKS.some((l) => pathname?.startsWith(l.href));

  return (
    <header
      className="sticky top-0"
      style={{
        background: "var(--color-background)",
        borderBottom: "1px solid var(--color-border)",
        zIndex: "var(--z-sticky-header)" as unknown as number,
      }}
    >
      {/* Row 1: logo, search, utilities */}
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="type-h4 shrink-0" style={{ color: "var(--color-text-primary)" }}>
          {SITE_NAME}
        </Link>

        {/* Hidden on /search itself — that page has its own, larger search
            box in the main content; showing both read as a duplicate
            search affordance, flagged by Morshed 2026-09-15. */}
        {pathname !== "/search" && (
          <div className="hidden flex-1 max-w-md md:block">
            <SearchBar compact />
          </div>
        )}

        <div className="ml-auto hidden md:block">
          <ThemeToggle compact />
        </div>

        <button
          className="ml-auto flex items-center justify-center rounded-md md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-sheet"
          aria-label="মেনু খুলুন/বন্ধ করুন"
          onClick={() => setMobileOpen(true)}
          style={{
            color: "var(--color-text-primary)",
            width: "var(--size-touch-target)",
            height: "var(--size-touch-target)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Row 2: section tabs (desktop/tablet only — mobile uses the bottom sheet) */}
      <nav
        aria-label="প্রধান ন্যাভিগেশন"
        className="mx-auto hidden max-w-[1280px] items-center gap-6 px-4 md:flex md:px-6"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        {TABS.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className="type-body-sm border-b-2 px-1 py-3"
              style={{
                color: active ? "var(--color-accent)" : "var(--color-text-secondary)",
                borderColor: active ? "var(--color-accent)" : "transparent",
              }}
            >
              {item.label}
            </Link>
          );
        })}
        <MoreMenu active={!!isMoreActive} />
      </nav>

      <MobileNavSheet open={mobileOpen} onClose={() => setMobileOpen(false)} items={ALL_NAV} />
    </header>
  );
}
