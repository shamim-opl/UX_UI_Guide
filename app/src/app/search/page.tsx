import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import SearchClient, { type SearchIndexItem } from "@/components/SearchClient";
import { getAllContent } from "@/lib/content";
import { taxonomy } from "@/lib/taxonomy";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "খুঁজুন" };

const CATEGORY_LABEL: Record<string, string> = { laws: "আইন", components: "কম্পোনেন্ট" };

function buildIndex(): SearchIndexItem[] {
  return getAllContent().map((doc) => {
    const level = taxonomy.find((l) => l.id === doc.meta.level);
    const href = doc.meta.reference_category
      ? `/reference/${doc.meta.reference_category}/${doc.meta.slug}`
      : `/learn/${level?.slug ?? doc.meta.level}/${doc.meta.slug}`;
    return {
      id: doc.meta.id,
      title_bn: doc.meta.title_bn,
      category: doc.meta.reference_category ? CATEGORY_LABEL[doc.meta.reference_category] : level?.title_bn ?? "",
      summary_bn: doc.meta.summary_bn,
      difficulty: doc.meta.difficulty,
      tags: doc.meta.tags,
      href,
    };
  });
}

export default function SearchPage() {
  const index = buildIndex();
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "খুঁজুন" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        খুঁজুন
      </h1>
      <div className="mt-6">
        <Suspense fallback={<div className="skeleton h-12 w-full max-w-xl" />}>
          <SearchClient index={index} />
        </Suspense>
      </div>
    </div>
  );
}
