import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import TopicCard from "@/components/TopicCard";
import LearnSidebar from "@/components/LearnSidebar";
import { taxonomy, getLevelBySlug } from "@/lib/taxonomy";
import { getContentByLevel } from "@/lib/content";

export function generateStaticParams() {
  return taxonomy.map((level) => ({ level: level.slug }));
}

export default async function LevelPage({ params }: PageProps<"/learn/[level]">) {
  const { level: levelSlug } = await params;
  const level = getLevelBySlug(levelSlug);
  if (!level) notFound();

  const topics = getContentByLevel(level.id);

  return (
    <div className="mx-auto flex max-w-[1280px] gap-8 px-4 py-8 md:px-6">
      <LearnSidebar activeLevelSlug={level.slug} />
      <div className="min-w-0 flex-1">
        <Breadcrumb items={[{ label: "শেখা", href: "/learn" }, { label: level.title_bn }]} />
        <p className="type-label mt-4">Level {level.id}</p>
        <h1 className="type-h1 mt-1" style={{ color: "var(--color-text-primary)" }}>
          {level.title_bn}
        </h1>
        <p className="type-body-lg mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
          {level.description_bn}
        </p>

        {topics.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((doc) => (
              <TopicCard key={doc.meta.id} doc={doc} href={`/learn/${level.slug}/${doc.meta.slug}`} />
            ))}
          </div>
        ) : (
          <p className="type-body-sm mt-8" style={{ color: "var(--color-text-muted)" }}>
            এই লেভেলের বিষয়বস্তু শীঘ্রই যোগ করা হবে। এটা একটা কাজ-চলমান প্ল্যাটফর্ম — স্পেক অনুযায়ী
            (§52) প্রথমে সিস্টেম যাচাই করা হচ্ছে, একসাথে হাজার হাজার ডকুমেন্ট তৈরির আগে।
          </p>
        )}
      </div>
    </div>
  );
}
