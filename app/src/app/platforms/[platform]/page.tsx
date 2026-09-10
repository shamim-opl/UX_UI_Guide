import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { platforms, getPlatformBySlug } from "@/lib/platforms";
import type { Metadata } from "next";

export function generateStaticParams() {
  return platforms.map((p) => ({ platform: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/platforms/[platform]">): Promise<Metadata> {
  const { platform } = await params;
  const p = getPlatformBySlug(platform);
  if (!p) return { title: "Platforms" };
  return { title: `${p.title_bn} প্ল্যাটফর্ম গাইডলাইন`, description: p.summary_bn };
}

export default async function PlatformDetailPage({ params }: PageProps<"/platforms/[platform]">) {
  const { platform } = await params;
  const p = getPlatformBySlug(platform);
  if (!p) notFound();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "Platforms", href: "/platforms" }, { label: p.title_bn }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        {p.title_bn}
      </h1>
      <p className="type-body-lg mt-2" style={{ color: "var(--color-text-secondary)" }}>
        {p.summary_bn}
      </p>
      <ul className="article-prose mt-6 flex flex-col gap-3">
        {p.points.map((point, i) => (
          <li key={i} className="type-body-sm" style={{ color: "var(--color-text-primary)" }}>
            {point}
          </li>
        ))}
      </ul>
      <p className="type-caption mt-8">উৎস: {p.source}</p>
    </div>
  );
}
