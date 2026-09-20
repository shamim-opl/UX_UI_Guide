import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/ogFonts";

// Site-wide fallback share card. Applies to every route that doesn't have its
// own opengraph-image (home, /toc, level and category pages, /jobs, etc.), so
// links to those pages also get a preview image. English-only text: Satori
// can't shape Bengali conjuncts (see ogTemplate.tsx).
export const alt = "UX/UI Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const { regular, bold } = await loadOgFonts();

  return new ImageResponse(
    (
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
        {/* Centred 560px column: survives the square crop some feeds apply. */}
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
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", fontSize: "56px", fontWeight: 700, color: "#f2f3f5", lineHeight: 1.15 }}>
              Learn UX/UI in Bangla, from zero to expert
            </div>
            <div style={{ display: "flex", justifyContent: "center", fontSize: "24px", color: "#a6acb5" }}>
              Structured path and quick reference, with sources
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {["Learn", "Psychology", "AI UX", "Jobs"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  border: "2px solid #2e323a",
                  color: "#a6acb5",
                  fontSize: "20px",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Inter", data: regular, weight: 400 }, { name: "Inter", data: bold, weight: 700 }] }
  );
}
