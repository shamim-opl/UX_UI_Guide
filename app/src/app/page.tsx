import Link from "next/link";
import LevelCard from "@/components/LevelCard";
import TopicCard from "@/components/TopicCard";
import { taxonomy } from "@/lib/taxonomy";
import { getAllContent, getContentByLevel } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

// Home page structure per UX_UI Documentation/docs/02-information-architecture.md:
// Hero -> Start Learning -> Learning Roadmap -> Explore Knowledge ->
// Popular Topics -> UX Laws -> UI Reference -> Psychology -> AI UX -> Recently Added

export default function Home() {
  const allContent = getAllContent();
  const laws = allContent.filter((d) => d.meta.reference_category === "laws");
  const components = allContent.filter((d) => d.meta.reference_category === "components");
  const psychology = getContentByLevel("02");
  const beginnerTopics = getContentByLevel("00");

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-6 md:py-24">
        <p className="type-label mb-3">বাংলা-প্রথম {SITE_NAME}</p>
        <h1 className="type-display max-w-2xl" style={{ color: "var(--color-text-primary)" }}>
          শূন্য থেকে শুরু করে UX/UI-তে দক্ষ হয়ে ওঠার একটা কাঠামোবদ্ধ পথ।
        </h1>
        <p className="type-body-lg mt-4 max-w-xl" style={{ color: "var(--color-text-secondary)" }}>
          একজন শিক্ষানবিশের জন্য শেখার পথ, আর একজন অভিজ্ঞ ডিজাইনারের জন্য দ্রুত রেফারেন্স — একই প্ল্যাটফর্মে।
        </p>
        <div className="mt-8 flex gap-3 sm:flex-wrap [&>.btn]:flex-auto [&>.btn]:whitespace-nowrap [&>.btn]:px-2 [&>.btn]:text-[15px] sm:[&>.btn]:flex-none sm:[&>.btn]:px-5 sm:[&>.btn]:text-base">
          <Link href="/learn" className="btn btn-primary">
            শূন্য থেকে শুরু করুন
          </Link>
          <Link href="/jobs" className="btn btn-secondary">
            চাকরি খুঁজুন
          </Link>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="type-h2" style={{ color: "var(--color-text-primary)" }}>
            শেখার রোডম্যাপ
          </h2>
          <Link href="/learn" className="type-body-sm" style={{ color: "var(--color-accent)" }}>
            সব লেভেল দেখুন →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {taxonomy.slice(0, 4).map((level) => (
            <LevelCard key={level.id} level={level} topicCount={getContentByLevel(level.id).length} />
          ))}
        </div>
      </section>

      {/* Popular / foundational topics */}
      {beginnerTopics.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6">
          <h2 className="type-h2 mb-6" style={{ color: "var(--color-text-primary)" }}>
            শুরু করার জন্য গুরুত্বপূর্ণ বিষয়
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beginnerTopics.map((doc) => (
              <TopicCard key={doc.meta.id} doc={doc} href={`/learn/00-getting-started/${doc.meta.slug}`} />
            ))}
          </div>
        </section>
      )}

      {/* UX Laws */}
      {laws.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="type-h2" style={{ color: "var(--color-text-primary)" }}>
              UX আইন ও নীতি
            </h2>
            <Link href="/reference/laws" className="type-body-sm" style={{ color: "var(--color-accent)" }}>
              সব দেখুন →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {laws.map((doc) => (
              <TopicCard key={doc.meta.id} doc={doc} href={`/reference/laws/${doc.meta.slug}`} />
            ))}
          </div>
        </section>
      )}

      {/* UI Reference */}
      {components.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6">
          <h2 className="type-h2 mb-6" style={{ color: "var(--color-text-primary)" }}>
            UI রেফারেন্স
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((doc) => (
              <TopicCard key={doc.meta.id} doc={doc} href={`/reference/components/${doc.meta.slug}`} />
            ))}
          </div>
        </section>
      )}

      {/* Psychology */}
      {psychology.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6">
          <h2 className="type-h2 mb-6" style={{ color: "var(--color-text-primary)" }}>
            হিউম্যান ও সাইকোলজি
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {psychology.map((doc) => (
              <TopicCard key={doc.meta.id} doc={doc} href={`/learn/02-human-and-psychology/${doc.meta.slug}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
