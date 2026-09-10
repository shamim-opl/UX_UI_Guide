import { notFound } from "next/navigation";
import ArticleLayout from "@/components/ArticleLayout";
import { getLevelBySlug, taxonomy } from "@/lib/taxonomy";
import { getAllContent, getContentByLevel, getContentBySlug, resolveRelated } from "@/lib/content";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllContent().map((doc) => {
    const level = taxonomy.find((l) => l.id === doc.meta.level);
    return { level: level?.slug ?? doc.meta.level, topic: doc.meta.slug };
  });
}

export async function generateMetadata({
  params,
}: PageProps<"/learn/[level]/[topic]">): Promise<Metadata> {
  const { level: levelSlug, topic } = await params;
  const doc = getContentBySlug(topic);
  if (!doc) return { title: "Learn" };
  return {
    title: doc.meta.title_bn,
    description: doc.meta.summary_bn,
    keywords: doc.meta.tags,
    // Self-canonical: this Learn URL is the canonical one for every article
    // (see decisions.md) — the Reference alternate view points its own
    // canonical tag back here.
    alternates: { canonical: `/learn/${levelSlug}/${doc.meta.slug}` },
    openGraph: { title: doc.meta.title_bn, description: doc.meta.summary_bn, type: "article" },
  };
}

export default async function LearnTopicPage({ params }: PageProps<"/learn/[level]/[topic]">) {
  const { level: levelSlug, topic: topicSlug } = await params;
  const level = getLevelBySlug(levelSlug);
  const doc = getContentBySlug(topicSlug);
  if (!level || !doc || doc.meta.level !== level.id) notFound();

  const levelTopics = getContentByLevel(level.id);
  const idx = levelTopics.findIndex((d) => d.meta.id === doc.meta.id);
  const prevDoc = idx > 0 ? levelTopics[idx - 1] : null;
  const nextDoc = idx >= 0 && idx < levelTopics.length - 1 ? levelTopics[idx + 1] : null;

  return (
    <ArticleLayout
      doc={doc}
      mode="learn"
      levelSlug={level.slug}
      breadcrumb={[
        { label: "Learn", href: "/learn" },
        { label: level.title_bn, href: `/learn/${level.slug}` },
        { label: doc.meta.title_bn },
      ]}
      prev={prevDoc ? { href: `/learn/${level.slug}/${prevDoc.meta.slug}`, title: prevDoc.meta.title_bn } : null}
      next={nextDoc ? { href: `/learn/${level.slug}/${nextDoc.meta.slug}`, title: nextDoc.meta.title_bn } : null}
      related={resolveRelated(doc.meta.related_topics)}
    />
  );
}
