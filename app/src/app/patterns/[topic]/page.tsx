import { notFound } from "next/navigation";
import ArticleLayout from "@/components/ArticleLayout";
import { getContentByReferenceCategory, getContentBySlug, resolveRelated } from "@/lib/content";
import { taxonomy } from "@/lib/taxonomy";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getContentByReferenceCategory("patterns").map((doc) => ({ topic: doc.meta.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/patterns/[topic]">): Promise<Metadata> {
  const { topic } = await params;
  const doc = getContentBySlug(topic);
  if (!doc) return { title: "Patterns" };

  // Same document is reachable at /learn/... — Learn is the canonical URL
  // for every article (every doc has a level), Patterns is an alternate
  // fast-access view, same convention as /reference. See decisions.md.
  const level = taxonomy.find((l) => l.id === doc.meta.level);
  const canonical = `/learn/${level?.slug ?? doc.meta.level}/${doc.meta.slug}`;

  return {
    title: doc.meta.title_bn,
    description: doc.meta.summary_bn,
    keywords: doc.meta.tags,
    alternates: { canonical },
    // og:image/twitter:image come from the colocated opengraph-image.tsx
    // file convention. Share feature, 2026-09-15 (see decisions.md).
    openGraph: { title: doc.meta.title_bn, description: doc.meta.summary_bn, type: "article", url: canonical, siteName: "UX/UI Guide", locale: "bn_BD" },
    twitter: { card: "summary_large_image", title: doc.meta.title_bn, description: doc.meta.summary_bn },
  };
}

export default async function PatternTopicPage({ params }: PageProps<"/patterns/[topic]">) {
  const { topic: topicSlug } = await params;
  const doc = getContentBySlug(topicSlug);
  if (!doc || doc.meta.reference_category !== "patterns") notFound();

  const level = taxonomy.find((l) => l.id === doc.meta.level);
  const canonicalPath = `/learn/${level?.slug ?? doc.meta.level}/${doc.meta.slug}`;

  return (
    <ArticleLayout
      doc={doc}
      mode="reference"
      canonicalPath={canonicalPath}
      breadcrumb={[{ label: "প্যাটার্ন", href: "/patterns" }, { label: doc.meta.title_bn }]}
      prev={null}
      next={null}
      related={resolveRelated(doc.meta.related_topics)}
    />
  );
}
