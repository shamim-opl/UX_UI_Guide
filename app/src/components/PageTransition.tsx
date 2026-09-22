"use client";

import { usePathname } from "next/navigation";

// Keying on pathname forces a remount on real navigation (not on
// query-string-only changes, e.g. filter state), which replays the
// .page-transition entrance CSS animation defined in globals.css. Reduced
// motion is handled entirely in CSS (the animation is disabled there), so
// this component itself needs no matchMedia check.
//
// /learn/[level]/... is the one exception: it renders inside
// app/learn/[level]/layout.tsx, which holds the sidebar so it can persist
// across topic clicks instead of remounting (see decisions.md, 2026-09-22).
// A `key` here is a React-level remount that overrides Next's own layout
// persistence for everything under it, sidebar included — so keying on the
// full pathname there was replaying the whole-page fade over the sidebar too
// on every click, which read as a flash/flicker. Keying on a constant value
// for the whole /learn section fixes that: React reuses the same node while
// browsing within /learn (content just swaps in, no remount, no replay), and
// leaving /learn for another section still gets the normal entrance fade.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const transitionKey = pathname.startsWith("/learn") ? "learn" : pathname;
  return (
    <div key={transitionKey} className="page-transition">
      {children}
    </div>
  );
}
