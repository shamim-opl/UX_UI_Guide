import { notFound } from "next/navigation";
import ArticleLayout from "@/components/ArticleLayout";
import { getContentByReferenceCategory, getContentBySlug, resolveRelated } from "@/lib/content";
import { taxonomy } from "@/lib/taxonomy";
import type { Metadata } from "next";

const CATEGORY_TITLES: Record<string, string> = {
  laws: "UX আইন ও নীতি",
  components: "UI কম্পোনেন্ট",
  "design-systems": "ডিজাইন সিস্টেম",
  measurements: "মেজারমেন্ট ও স্পেসিং",
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_TITLES).flatMap((category) =>
    getContentByReferenceCategory(category).map((doc) => ({ category, topic: doc.meta.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/reference/[category]/[topic]">): Promise<Metadata> {
  const { topic } = await params;
  const doc = getContentBySlug(topic);
  if (!doc) return { title: "Reference" };

  // Same document is reachable at /learn/... — Learn is the canonical URL
  // for every article (every doc has a level), Reference is an alternate
  // fast-access view. See UX_UI Documentation/docs/decisions.md.
  const level = taxonomy.find((l) => l.id === doc.meta.level);
  const canonical = `/learn/${level?.slug ?? doc.meta.level}/${doc.meta.slug}`;

  return {
    title: doc.meta.title_bn,
    description: doc.meta.summary_bn,
    keywords: doc.meta.tags,
    alternates: { canonical },
    // og:image/twitter:image come from the colocated opengraph-image.tsx
    // file convention. Share feature, 2026-09-15 (see decisions.md).
    openGraph: { title: doc.meta.title_bn, description: doc.meta.summary_bn, type: "article", url: canonical },
    twitter: { card: "summary_large_image", title: doc.meta.title_bn, description: doc.meta.summary_bn },
  };
}

export default async function ReferenceTopicPage({
  params,
}: PageProps<"/reference/[category]/[topic]">) {
  const { category, topic: topicSlug } = await params;
  const categoryTitle = CATEGORY_TITLES[category];
  const doc = getContentBySlug(topicSlug);
  if (!categoryTitle || !doc || doc.meta.reference_category !== category) notFound();

  // Same canonical this doc's generateMetadata resolves to — Learn is the
  // canonical URL for every article, so Share always points there too.
  const level = taxonomy.find((l) => l.id === doc.meta.level);
  const canonicalPath = `/learn/${level?.slug ?? doc.meta.level}/${doc.meta.slug}`;

  return (
    <ArticleLayout
      doc={doc}
      mode="reference"
      canonicalPath={canonicalPath}
      breadcrumb={[
        { label: "রেফারেন্স", href: "/reference" },
        { label: categoryTitle, href: `/reference/${category}` },
        { label: doc.meta.title_bn },
      ]}
      prev={null}
      next={null}
      related={resolveRelated(doc.meta.related_topics)}
    />
  );
}
