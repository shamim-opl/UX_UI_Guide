import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Breadcrumb, { type Crumb } from "@/components/Breadcrumb";
import TableOfContents from "@/components/TableOfContents";
import LearnSidebar from "@/components/LearnSidebar";
import PrevNext, { type NavTarget } from "@/components/PrevNext";
import RelatedTopics from "@/components/RelatedTopics";
import CopyPageButton from "@/components/CopyPageButton";
import ShareButtons from "@/components/ShareButtons";
import Callout from "@/components/mdx/Callout";
import { H2, H3 } from "@/components/mdx/Heading";
import { Table } from "@/components/mdx/Table";
import type { ContentDoc } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

// English labels per Morshed's request (2026-09-15) — Bangla translations
// of these three (প্রাইমারি/মধ্যম/উন্নত) read as less familiar than the
// plain English terms already common in this space.
const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function ArticleLayout({
  doc,
  mode,
  breadcrumb,
  levelSlug,
  canonicalPath,
  prev,
  next,
  related,
}: {
  doc: ContentDoc;
  mode: "learn" | "reference";
  breadcrumb: Crumb[];
  levelSlug?: string;
  canonicalPath: string;
  prev: NavTarget;
  next: NavTarget;
  related: ContentDoc[];
}) {
  // Article structured data (SEO pass, 2026-09-10 — see decisions.md) so
  // search engines can render rich snippets and trust signals (author,
  // review date) rather than a bare blue link.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.meta.title_bn,
    description: doc.meta.summary_bn,
    inLanguage: "bn",
    dateModified: doc.meta.last_reviewed,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  return (
    <div className="mx-auto flex max-w-[1280px] gap-8 px-4 py-8 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {mode === "learn" && <LearnSidebar activeLevelSlug={levelSlug} activeTopicSlug={doc.meta.slug} />}

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumb items={breadcrumb} />
          <div className="flex items-center gap-2">
            <ShareButtons path={canonicalPath} title={doc.meta.title_bn} />
            <CopyPageButton markdown={doc.body_bn} />
          </div>
        </div>

        <header className="mt-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag">{DIFFICULTY_LABEL[doc.meta.difficulty]}</span>
            <span className="type-caption">{doc.meta.reading_time_minutes} মিনিট পড়া</span>
            {mode === "reference" && <span className="tag">রেফারেন্স</span>}
            {doc.meta.last_reviewed && (
              <span className="type-caption">সর্বশেষ পর্যালোচনা: {doc.meta.last_reviewed}</span>
            )}
            {doc.meta.content_status === "needs-review" && (
              <span className="tag" style={{ color: "var(--color-warning)", borderColor: "var(--color-warning)" }}>
                পুনঃপর্যালোচনা প্রয়োজন
              </span>
            )}
          </div>
          <h1 className="type-h1 mt-3" style={{ color: "var(--color-text-primary)" }}>
            {doc.meta.title_bn}
          </h1>
          <p className="type-body-lg mt-2" style={{ color: "var(--color-text-secondary)" }}>
            {doc.meta.summary_bn}
          </p>
        </header>

        <article className="article-prose">
          <MDXRemote
            source={doc.body_bn}
            components={{ Callout, h2: H2, h3: H3, table: Table }}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>

        <RelatedTopics items={related} mode={mode} />
        <PrevNext prev={prev} next={next} />
      </div>

      <TableOfContents source={doc.body_bn} />
    </div>
  );
}
