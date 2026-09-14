import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import LevelCard from "@/components/LevelCard";
import { levelGroups, taxonomy } from "@/lib/taxonomy";
import { getContentByLevel } from "@/lib/content";
import type { Metadata } from "next";

// Learning Path overview — added 2026-09-14. The sidebar's 5 path group
// headers (Design Foundations, UX Design, ...) looked clickable but did
// nothing — a real affordance mismatch caught in review. This gives each
// group a real landing page listing every level (and its topic count)
// inside that path.
export function generateStaticParams() {
  return levelGroups.map((g) => ({ pathSlug: g.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/learn/path/[pathSlug]">): Promise<Metadata> {
  const { pathSlug } = await params;
  const group = levelGroups.find((g) => g.slug === pathSlug);
  if (!group) return { title: "শেখার পথ" };
  return { title: group.title_bn, description: group.description_bn };
}

export default async function LearningPathPage({ params }: PageProps<"/learn/path/[pathSlug]">) {
  const { pathSlug } = await params;
  const group = levelGroups.find((g) => g.slug === pathSlug);
  if (!group) notFound();

  const levels = group.levelIds
    .map((id) => taxonomy.find((l) => l.id === id))
    .filter((l): l is NonNullable<typeof l> => !!l);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "শেখা", href: "/learn" }, { label: group.title_bn }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        {group.title_bn}
      </h1>
      <p className="type-body-lg mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
        {group.description_bn}
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} topicCount={getContentByLevel(level.id).length} />
        ))}
      </div>
    </div>
  );
}
