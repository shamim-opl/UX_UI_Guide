import type { NextConfig } from "next";

// GITHUB_PAGES=true (set only for the GitHub Pages static export build) adds
// the repo-name basePath GitHub Pages needs for a project site; local dev
// and any future non-Pages deploy stay path-less.
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/UX_UI_Guide" : undefined,
  images: isGithubPages ? { unoptimized: true } : undefined,
};

export default nextConfig;
