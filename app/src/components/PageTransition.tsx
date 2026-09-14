"use client";

import { usePathname } from "next/navigation";

// Keying on pathname forces a remount on real navigation (not on
// query-string-only changes, e.g. filter state), which replays the
// .page-transition entrance CSS animation defined in globals.css. Reduced
// motion is handled entirely in CSS (the animation is disabled there), so
// this component itself needs no matchMedia check.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
