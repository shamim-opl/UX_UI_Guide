import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { platforms } from "@/lib/platforms";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "প্ল্যাটফর্ম গাইডলাইন — iOS, Android, Web" };

export default function PlatformsPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "Platforms" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        প্ল্যাটফর্ম গাইডলাইন
      </h1>
      <p className="type-body-lg mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
        প্ল্যাটফর্ম-নির্দিষ্ট কনভেনশন, সার্বজনীন UX নীতি থেকে আলাদা।
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p) => (
          <Link key={p.slug} href={`/platforms/${p.slug}`} className="card block" style={{ textDecoration: "none" }}>
            <h2 className="type-h3" style={{ color: "var(--color-text-primary)" }}>
              {p.title_bn}
            </h2>
            <p className="type-body-sm mt-2" style={{ color: "var(--color-text-secondary)" }}>
              {p.summary_bn}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
