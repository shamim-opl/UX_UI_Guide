import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "UX প্যাটার্ন" };

export default function PatternsPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "Patterns" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        UX প্যাটার্ন
      </h1>
      <p className="type-body-lg mt-2" style={{ color: "var(--color-text-secondary)" }}>
        পুনঃব্যবহারযোগ্য UX আচরণ ও কম্পোজিশন (যেমন progressive disclosure, empty states, onboarding
        ফ্লো) — একক UI কম্পোনেন্ট থেকে আলাদা, দেখো <Link href="/reference/components">UI Reference</Link>।
        এই সেকশনের বিষয়বস্তু এখনো তৈরি হয়নি — MVP-র পরের ধাপে যোগ হবে।
      </p>
    </div>
  );
}
