import Breadcrumb from "@/components/Breadcrumb";
import LevelCard from "@/components/LevelCard";
import { taxonomy } from "@/lib/taxonomy";
import { getContentByLevel } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "শেখার পথ — শূন্য থেকে UX/UI",
  description: `${taxonomy.length}টা ধাপে সাজানো UX/UI ও Product শেখার কাঠামোবদ্ধ পথ — মানুষ বোঝা থেকে শুরু করে Product Management ও ক্যারিয়ার পর্যন্ত।`,
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "শেখা" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        শেখার পথ
      </h1>
      <p className="type-body-lg mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
        {taxonomy.length}টা ধাপে সাজানো — মানুষ বোঝা থেকে শুরু করে Product Management ও ক্যারিয়ার পর্যন্ত। প্রতিটা ধাপ আগেরটার উপর ভিত্তি করে তৈরি।
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {taxonomy.map((level) => (
          <LevelCard key={level.id} level={level} topicCount={getContentByLevel(level.id).length} />
        ))}
      </div>
    </div>
  );
}
