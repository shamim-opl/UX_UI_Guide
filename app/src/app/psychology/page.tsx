import Breadcrumb from "@/components/Breadcrumb";
import TopicCard from "@/components/TopicCard";
import { getContentByLevel } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "হিউম্যান ও সাইকোলজি" };

// This section mirrors taxonomy level 02 (Human & Psychology) content in a
// dedicated primary-nav view, per UX_UI Documentation/docs/02-information-architecture.md
// — same underlying documents as /learn/02-human-and-psychology, not a fork.
export default function PsychologyPage() {
  const topics = getContentByLevel("02");

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "সাইকোলজি" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        হিউম্যান ও সাইকোলজি
      </h1>
      <p className="type-body-lg mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
        উপলব্ধি, স্মৃতি, Cognitive Load, Decision Making — ডিজাইন-প্রাসঙ্গিক মানব আচরণ ও কগনিশন। এটা মেডিকেল পরামর্শ না।
      </p>
      {topics.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((doc) => (
            <TopicCard key={doc.meta.id} doc={doc} href={`/learn/02-human-and-psychology/${doc.meta.slug}`} />
          ))}
        </div>
      ) : (
        <p className="type-body-sm mt-8" style={{ color: "var(--color-text-muted)" }}>
          বিষয়বস্তু শীঘ্রই যোগ করা হবে।
        </p>
      )}
    </div>
  );
}
