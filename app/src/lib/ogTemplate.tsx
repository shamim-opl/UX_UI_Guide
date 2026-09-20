// Shared OG/Twitter card template, used by every opengraph-image.tsx route.
// Renders the ENGLISH title only (title_en, which every ContentMeta has) —
// deliberately not the Bangla title. Satori (next/og's renderer) doesn't do
// complex script shaping, so Bengali conjuncts/matras can render as
// disconnected glyphs baked into a raster image with no way to fix it after
// the fact. The actual Bangla title is never at risk: it's carried as plain
// og:title/twitter:title metadata, which the sharing platform renders with
// its own correct font stack — this image is just the accompanying visual.
//
// Layout: everything is centred inside the middle 630px column. The Facebook
// mobile composer (and some feeds) crop the 1200x630 card to a square, so
// anything outside that column gets cut mid-word.
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
        alignItems: "center",
        justifyContent: "center",
        background: "#16181d",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          width: "560px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "56px 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "18px", height: "18px", borderRadius: "5px", background: "#818cf8", display: "flex" }} />
          <span style={{ fontSize: "26px", fontWeight: 700, color: "#818cf8" }}>UX/UI Guide</span>
        </div>

        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            fontSize: titleEn.length > 30 ? "54px" : "68px",
            fontWeight: 700,
            color: "#f2f3f5",
            lineHeight: 1.15,
          }}
        >
          {titleEn}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "2px solid #2e323a",
              color: "#a6acb5",
              fontSize: "22px",
            }}
          >
            {badge}
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 20px",
              borderRadius: "9999px",
              background: "#5b51e6",
              color: "#ffffff",
              fontSize: "22px",
            }}
          >
            {difficulty}
          </div>
        </div>
      </div>
    </div>
  );
}
