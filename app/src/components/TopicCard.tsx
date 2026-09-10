import Link from "next/link";
import type { ContentDoc } from "@/lib/content";

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: "শিক্ষানবিশ",
  intermediate: "মধ্যম",
  advanced: "উন্নত",
};

export default function TopicCard({ doc, href }: { doc: ContentDoc; href: string }) {
  return (
    <Link href={href} className="card block" style={{ textDecoration: "none" }}>
      <div className="flex items-center justify-between">
        <span className="tag">{DIFFICULTY_LABEL[doc.meta.difficulty]}</span>
        <span className="type-caption">{doc.meta.reading_time_minutes} মিনিট</span>
      </div>
      <h3 className="type-h4 mt-3" style={{ color: "var(--color-text-primary)" }}>
        {doc.meta.title_bn}
      </h3>
      <p className="type-body-sm mt-2" style={{ color: "var(--color-text-secondary)" }}>
        {doc.meta.summary_bn}
      </p>
    </Link>
  );
}
