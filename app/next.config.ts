import type { NextConfig } from "next";

// GITHUB_PAGES=true (set only for the GitHub Pages static export build) adds
// the repo-name basePath GitHub Pages needs for a project site; local dev
// and any future non-Pages deploy stay path-less.
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/UX_UI_Guide" : undefined,
  images: isGithubPages ? { unoptimized: true } : undefined,
  // Next.js's own floating dev-tools button (bottom-left "N" icon, Bundler/
  // Route Info/Preferences menu) — dev-only, never shipped to production,
  // but distracting during review. Hidden per Morshed's request 2026-09-13.
  devIndicators: false,
};

export default nextConfig;
