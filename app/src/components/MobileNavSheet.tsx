"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

type NavItem = { href: string; label: string };

// Bottom-sheet mobile nav (Docspace-style redesign, 2026-09-10 — see
// decisions.md) — replaces the earlier full-width dropdown panel. Slides up
// from the bottom with a drag-handle affordance and a dimmed overlay,
// closer to how a mobile OS action sheet behaves than a header dropdown.
export default function MobileNavSheet({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}) {
  const pathname = usePathname();

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

  return (
    <div
      id="mobile-nav-sheet"
      aria-hidden={!open}
      className="fixed inset-0 md:hidden"
      style={{
        zIndex: "var(--z-drawer)" as unknown as number,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <button
        aria-label="মেনু বন্ধ করুন"
        onClick={onClose}
        className="absolute inset-0 transition-opacity"
        style={{
          background: "rgba(15, 23, 42, 0.4)",
          opacity: open ? 1 : 0,
          transitionDuration: "var(--duration-default)",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="মোবাইল ন্যাভিগেশন"
        className="absolute bottom-0 left-0 right-0 flex max-h-[85vh] flex-col rounded-t-2xl transition-transform"
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

        <div className="overflow-y-auto px-4 pb-6">
          <div className="py-3">
            <SearchBar />
          </div>

          <nav aria-label="মোবাইল বিভাগ" className="flex flex-col">
            {items.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="type-body-sm py-3"
                  style={{
                    color: active ? "var(--color-accent)" : "var(--color-text-primary)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
