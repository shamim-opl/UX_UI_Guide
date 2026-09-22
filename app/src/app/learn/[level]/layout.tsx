import { notFound } from "next/navigation";
import LearnSidebar from "@/components/LearnSidebar";
import { getLevelBySlug } from "@/lib/taxonomy";
import { getContentByLevel } from "@/lib/content";

// Shared layout for /learn/[level] and /learn/[level]/[topic]. Next only
// remounts what's INSIDE a layout on navigation — the layout itself persists
// — so hoisting the sidebar here (out of each page.tsx) is what stops it
// flashing/reflowing on every topic click. See decisions.md, 2026-09-22.
// Topic data is fetched here (server-side, fs-backed) and handed to the
// client-side LearnSidebar as plain props.
export default async function LearnLevelLayout({ children, params }: LayoutProps<"/learn/[level]">) {
  const { level: levelSlug } = await params;
  const level = getLevelBySlug(levelSlug);
  if (!level) notFound();

  const topics = getContentByLevel(level.id).map((doc) => ({
    id: doc.meta.id,
    slug: doc.meta.slug,
    title_bn: doc.meta.title_bn,
  }));

  return (
    <div className="mx-auto flex max-w-[1280px] gap-8 px-4 py-8 md:px-6">
      <LearnSidebar activeLevelSlug={level.slug} topics={topics} />
      {children}
    </div>
  );
}
