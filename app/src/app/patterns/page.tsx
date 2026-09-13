import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import TopicCard from "@/components/TopicCard";
import { getContentByReferenceCategory } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UX প্যাটার্ন",
  description: "পুনঃব্যবহারযোগ্য UX আচরণ ও কম্পোজিশন — progressive disclosure, empty states, onboarding flow, skeleton loading।",
};

export default function PatternsPage() {
  const docs = getContentByReferenceCategory("patterns");

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "Patterns" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        UX প্যাটার্ন
      </h1>
      <p className="type-body-lg mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
        পুনঃব্যবহারযোগ্য UX আচরণ ও কম্পোজিশন (যেমন progressive disclosure, empty states, onboarding
        ফ্লো) — একক UI কম্পোনেন্ট থেকে আলাদা, দেখো <Link href="/reference/components">UI Reference</Link>।
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <TopicCard key={doc.meta.id} doc={doc} href={`/patterns/${doc.meta.slug}`} />
        ))}
      </div>
    </div>
  );
}
