import Link from "next/link";
import type { ContentDoc } from "@/lib/content";
import { taxonomy } from "@/lib/taxonomy";

function hrefFor(doc: ContentDoc, mode: "learn" | "reference"): string {
  const level = taxonomy.find((l) => l.id === doc.meta.level);
  if (mode === "reference" && doc.meta.reference_category) {
    return `/reference/${doc.meta.reference_category}/${doc.meta.slug}`;
  }
  return `/learn/${level?.slug ?? doc.meta.level}/${doc.meta.slug}`;
}

export default function RelatedTopics({
  items,
  mode = "learn",
}: {
  items: ContentDoc[];
  mode?: "learn" | "reference";
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="mt-10">
      <h2 id="related-heading" className="type-h4 mb-3">
        সম্পর্কিত বিষয়
      </h2>
      <ul className="flex flex-wrap gap-2">
        {items.map((doc) => (
          <li key={doc.meta.id}>
            <Link href={hrefFor(doc, mode)} className="tag" style={{ textDecoration: "none" }}>
              {doc.meta.title_bn}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
