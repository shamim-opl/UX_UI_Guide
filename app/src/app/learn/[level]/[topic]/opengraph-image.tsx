import { ImageResponse } from "next/og";
import { getAllContent, getContentBySlug } from "@/lib/content";
import { taxonomy } from "@/lib/taxonomy";
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

export function generateStaticParams() {
  return getAllContent().map((doc) => {
    const level = taxonomy.find((l) => l.id === doc.meta.level);
    return { level: level?.slug ?? doc.meta.level, topic: doc.meta.slug };
  });
}

export default async function Image({ params }: { params: Promise<{ level: string; topic: string }> }) {
  const { topic } = await params;
  const doc = getContentBySlug(topic);
  const { regular, bold } = await loadOgFonts();

  return new ImageResponse(
    renderArticleOgCard({
      titleEn: doc?.meta.title_en ?? "UX/UI Guide",
      badge: "Learn",
      difficulty: DIFFICULTY_LABEL[doc?.meta.difficulty ?? "beginner"],
    }),
    { ...size, fonts: [{ name: "Inter", data: regular, weight: 400 }, { name: "Inter", data: bold, weight: 700 }] }
  );
}
