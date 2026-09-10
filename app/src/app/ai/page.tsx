import Breadcrumb from "@/components/Breadcrumb";
import TopicCard from "@/components/TopicCard";
import { getContentByLevel } from "@/lib/content";
import { taxonomy } from "@/lib/taxonomy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI UX ও মানুষ-AI ইন্টারঅ্যাকশন",
  description: "AI-চালিত ফিচারের UX ডিজাইন, কনভার্সেশনাল UX, এবং Human-AI Interaction — প্রতিটা দাবি প্রতিষ্ঠিত/উদীয়মান/অনুমানভিত্তিক হিসেবে চিহ্নিত করে।",
};

// Content added 2026-09-10 (was a stub) — see UX_UI Documentation/docs/decisions.md.
// Pulls levels 16 (AI UX) and 17 (Human-AI Interaction) since this nav item
// covers both per 02-information-architecture.md.
export default function AiPage() {
  const aiUx = getContentByLevel("16");
  const humanAi = getContentByLevel("17");

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "AI" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        AI UX ও মানুষ–AI ইন্টারঅ্যাকশন
      </h1>
      <p className="type-body-lg mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
        এটা দ্রুত পরিবর্তনশীল একটা ক্ষেত্র — প্রতিটা আর্টিকেলে দাবি প্রতিষ্ঠিত, উদীয়মান, বা অনুমানভিত্তিক হিসেবে স্পষ্টভাবে চিহ্নিত করা আছে।
      </p>

      {aiUx.length > 0 && (
        <>
          <h2 className="type-h3 mt-8 mb-4" style={{ color: "var(--color-text-primary)" }}>
            AI UX
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiUx.map((doc) => {
              const level = taxonomy.find((l) => l.id === doc.meta.level);
              return <TopicCard key={doc.meta.id} doc={doc} href={`/learn/${level?.slug}/${doc.meta.slug}`} />;
            })}
          </div>
        </>
      )}

      {humanAi.length > 0 && (
        <>
          <h2 className="type-h3 mt-10 mb-4" style={{ color: "var(--color-text-primary)" }}>
            Human–AI Interaction
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {humanAi.map((doc) => {
              const level = taxonomy.find((l) => l.id === doc.meta.level);
              return <TopicCard key={doc.meta.id} doc={doc} href={`/learn/${level?.slug}/${doc.meta.slug}`} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}
