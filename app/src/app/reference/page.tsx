import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllContent } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "রেফারেন্স — UX আইন, UI কম্পোনেন্ট",
  description: "UX আইন ও নীতি, UI কম্পোনেন্ট স্পেসিফিকেশন — সরাসরি উত্তরে যান, পুরো আর্টিকেল পড়ার দরকার নেই।",
};

const CATEGORIES: { slug: string; title: string; description: string }[] = [
  { slug: "laws", title: "UX আইন ও নীতি", description: "Fitts's Law, Hick's Law, Nielsen's Heuristics, Gestalt Principles এবং আরও।" },
  { slug: "components", title: "UI কম্পোনেন্ট", description: "Button, Input, Modal ইত্যাদির সম্পূর্ণ স্পেসিফিকেশন।" },
  { slug: "design-systems", title: "ডিজাইন সিস্টেম", description: "Material Design, Apple HIG, Fluent, Carbon এবং আরও ১০+ প্রধান ডিজাইন সিস্টেম, তুলনাসহ।" },
  { slug: "measurements", title: "মেজারমেন্ট ও স্পেসিং", description: "Grid, Breakpoint, Spacing, iOS/Android platform-নির্দিষ্ট সঠিক পিক্সেল/dp/pt মান।" },
];

export default function ReferencePage() {
  const all = getAllContent();

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "রেফারেন্স" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        রেফারেন্স
      </h1>
      <p className="type-body-lg mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
        নির্দিষ্ট কোনো তথ্য খুঁজছেন? পুরো আর্টিকেল পড়ার দরকার নেই — সরাসরি উত্তরে যান।
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CATEGORIES.map((cat) => {
          const count = all.filter((d) => d.meta.reference_category === cat.slug).length;
          return (
            <Link key={cat.slug} href={`/reference/${cat.slug}`} className="card block" style={{ textDecoration: "none" }}>
              <h2 className="type-h3" style={{ color: "var(--color-text-primary)" }}>
                {cat.title}
              </h2>
              <p className="type-body-sm mt-2" style={{ color: "var(--color-text-secondary)" }}>
                {cat.description}
              </p>
              <span className="type-caption mt-3 block">{count} টি এন্ট্রি</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
