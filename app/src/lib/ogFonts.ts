// Shared font loader for opengraph-image.tsx routes (next/og's ImageResponse
// uses Satori, which needs raw font bytes — it can't use next/font's
// managed, content-hashed files or the browser's installed fonts). Fetched
// once at module scope so every route segment's build reuses the same
// promise instead of re-downloading. Stable direct gstatic.com TTF URLs
// (resolved from Google's CSS2 API for Inter 400/700, latin) rather than
// bundling a font binary into the repo.
const INTER_REGULAR_URL = "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf";
const INTER_BOLD_URL = "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf";

let cachedFonts: Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> | null = null;

export function loadOgFonts() {
  if (!cachedFonts) {
    cachedFonts = Promise.all([
      fetch(INTER_REGULAR_URL).then((r) => r.arrayBuffer()),
      fetch(INTER_BOLD_URL).then((r) => r.arrayBuffer()),
    ]).then(([regular, bold]) => ({ regular, bold }));
  }
  return cachedFonts;
}
