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
const TABS = [
  { href: "/learn", label: "Learn" },
  { href: "/reference", label: "Reference" },
  { href: "/patterns", label: "Patterns" },
  { href: "/platforms", label: "Platforms" },
];

const MORE_LINKS = [
  { href: "/psychology", label: "Psychology" },
  { href: "/ai", label: "AI" },
  { href: "/resources", label: "Resources" },
  { href: "/glossary", label: "Glossary" },
];

const ALL_NAV = [...TABS, ...MORE_LINKS];

function MoreMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
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
          className="dropdown-panel absolute left-0 top-full z-10 mt-1 min-w-[180px] rounded-lg py-2"
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

        <div className="hidden flex-1 max-w-md md:block">
          <SearchBar compact />
        </div>

        <div className="ml-auto hidden md:block">
          <ThemeToggle compact />
        </div>

        <button
          className="ml-auto rounded-md p-2 md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-sheet"
          aria-label="মেনু খুলুন/বন্ধ করুন"
          onClick={() => setMobileOpen(true)}
          style={{ color: "var(--color-text-primary)" }}
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
