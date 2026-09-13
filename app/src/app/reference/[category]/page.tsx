import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import TopicCard from "@/components/TopicCard";
import { getContentByReferenceCategory } from "@/lib/content";
import type { Metadata } from "next";

const CATEGORY_TITLES: Record<string, string> = {
  laws: "UX আইন ও নীতি",
  components: "UI কম্পোনেন্ট",
  "design-systems": "ডিজাইন সিস্টেম",
  measurements: "মেজারমেন্ট ও স্পেসিং",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  laws: "Fitts's Law, Hick's Law, Nielsen's Heuristics, Gestalt Principles সহ UX-এর মূল আইন ও নীতিগুলো, উৎসসহ ব্যাখ্যা করা।",
  components: "Button, Input, Modal সহ UI কম্পোনেন্টের সম্পূর্ণ স্পেসিফিকেশন — অ্যানাটমি, ভ্যারিয়েন্ট, অ্যাক্সেসিবিলিটি।",
  "design-systems": "Material Design, Apple HIG, Fluent, Carbon, Polaris সহ প্রধান ডিজাইন সিস্টেমগুলোর তুলনামূলক বিশ্লেষণ।",
  measurements: "Grid, Breakpoint, Spacing, Platform-নির্দিষ্ট (iOS/Android) সঠিক পিক্সেল/dp/pt মান — সরাসরি ডিজাইনে ব্যবহারযোগ্য।",
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_TITLES).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/reference/[category]">): Promise<Metadata> {
  const { category } = await params;
  const title = CATEGORY_TITLES[category];
  if (!title) return { title: "Reference" };
  return { title, description: CATEGORY_DESCRIPTIONS[category] };
}

export default async function ReferenceCategoryPage({
  params,
}: PageProps<"/reference/[category]">) {
  const { category } = await params;
  const title = CATEGORY_TITLES[category];
  if (!title) notFound();

  const docs = getContentByReferenceCategory(category);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "রেফারেন্স", href: "/reference" }, { label: title }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        {title}
      </h1>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <TopicCard key={doc.meta.id} doc={doc} href={`/reference/${category}/${doc.meta.slug}`} />
        ))}
      </div>
    </div>
  );
}
