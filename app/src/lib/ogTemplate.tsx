// Shared OG/Twitter card template, used by every opengraph-image.tsx route.
// Renders the ENGLISH title only (title_en, which every ContentMeta has) —
// deliberately not the Bangla title. Satori (next/og's renderer) doesn't do
// complex script shaping, so Bengali conjuncts/matras can render as
// disconnected glyphs baked into a raster image with no way to fix it after
// the fact. The actual Bangla title is never at risk: it's carried as plain
// og:title/twitter:title metadata, which the sharing platform renders with
// its own correct font stack — this image is just the accompanying visual.
export function renderArticleOgCard({
  titleEn,
  badge,
  difficulty,
}: {
  titleEn: string;
  badge: string;
  difficulty: string;
}) {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        background: "#16181d",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: "#818cf8", display: "flex" }} />
        <span style={{ fontSize: "28px", fontWeight: 700, color: "#818cf8" }}>UX/UI Guide</span>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: titleEn.length > 40 ? "56px" : "72px",
          fontWeight: 700,
          color: "#f2f3f5",
          lineHeight: 1.15,
          maxWidth: "1000px",
        }}
      >
        {titleEn}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <div
          style={{
            display: "flex",
            padding: "10px 22px",
            borderRadius: "9999px",
            border: "2px solid #2e323a",
            color: "#a6acb5",
            fontSize: "24px",
          }}
        >
          {badge}
        </div>
        <div
          style={{
            display: "flex",
            padding: "10px 22px",
            borderRadius: "9999px",
            background: "#5b51e6",
            color: "#ffffff",
            fontSize: "24px",
          }}
        >
          {difficulty}
        </div>
      </div>
    </div>
  );
}
