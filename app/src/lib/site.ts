// Single source of truth for the site's canonical origin, used by
// metadataBase, sitemap.ts, robots.ts, and JSON-LD. Set NEXT_PUBLIC_SITE_URL
// before production deploy — this placeholder is fine for local dev but
// sitemap/canonical URLs will be wrong (pointing at localhost) if shipped
// as-is. Added 2026-09-10 for the SEO pass — see UX_UI Documentation/docs/decisions.md.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4210";
export const SITE_NAME = "UX/UI Guide";
