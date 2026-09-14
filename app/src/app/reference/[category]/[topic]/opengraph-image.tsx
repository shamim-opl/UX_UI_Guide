import { ImageResponse } from "next/og";
import { getContentByReferenceCategory, getContentBySlug } from "@/lib/content";
import { loadOgFonts } from "@/lib/ogFonts";
import { renderArticleOgCard } from "@/lib/ogTemplate";

export const alt = "UX/UI Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const CATEGORY_BADGE: Record<string, string> = {
  laws: "UX Laws",
  components: "UI Component",
  "design-systems": "Design System",
  measurements: "Measurements",
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_BADGE).flatMap((category) =>
    getContentByReferenceCategory(category).map((doc) => ({ category, topic: doc.meta.slug }))
  );
}

export default async function Image({ params }: { params: Promise<{ category: string; topic: string }> }) {
  const { category, topic } = await params;
  const doc = getContentBySlug(topic);
  const { regular, bold } = await loadOgFonts();

  return new ImageResponse(
    renderArticleOgCard({
      titleEn: doc?.meta.title_en ?? "UX/UI Guide",
      badge: CATEGORY_BADGE[category] ?? "Reference",
      difficulty: DIFFICULTY_LABEL[doc?.meta.difficulty ?? "beginner"],
    }),
    { ...size, fonts: [{ name: "Inter", data: regular, weight: 400 }, { name: "Inter", data: bold, weight: 700 }] }
  );
}
