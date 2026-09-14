import { notFound } from "next/navigation";
import Link from "next/link";
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
      <Breadcrumb items={[{ label: "প্ল্যাটফর্ম", href: "/platforms" }, { label: p.title_bn }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        {p.title_bn}
      </h1>
      <p className="type-body-lg mt-2" style={{ color: "var(--color-text-secondary)" }}>
        {p.summary_bn}
      </p>

      {/* Quick Facts */}
      <div className="card mt-8">
        <h2 className="type-h3" style={{ color: "var(--color-text-primary)" }}>
          Quick Facts
        </h2>
        <dl className="mt-3 flex flex-col gap-2">
          {p.quickFacts.map((f) => (
            <div key={f.label} className="flex flex-wrap gap-2 border-b py-2 last:border-b-0" style={{ borderColor: "var(--color-border)" }}>
              <dt className="type-body-sm w-40 shrink-0" style={{ color: "var(--color-text-muted)" }}>
                {f.label}
              </dt>
              <dd className="type-body-sm" style={{ color: "var(--color-text-primary)" }}>
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Conventions */}
      <h2 className="type-h3 mt-10" style={{ color: "var(--color-text-primary)" }}>
        মূল কনভেনশন
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {p.conventions.map((c) => (
          <div key={c.title_bn} className="card">
            <h3 className="type-h4" style={{ color: "var(--color-text-primary)" }}>
              {c.title_bn}
            </h3>
            <p className="type-body-sm mt-2" style={{ color: "var(--color-text-secondary)" }}>
              {c.body_bn}
            </p>
          </div>
        ))}
      </div>

      {/* Common Components */}
      <h2 className="type-h3 mt-10" style={{ color: "var(--color-text-primary)" }}>
        সাধারণ কম্পোনেন্ট
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.commonComponents.map((c) => (
          <span key={c} className="tag">
            {c}
          </span>
        ))}
      </div>

      {/* Do's and Don'ts */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card" style={{ borderColor: "var(--color-success)" }}>
          <h3 className="type-h4" style={{ color: "var(--color-success)" }}>
            করো
          </h3>
          <ul className="type-body-sm mt-2 flex flex-col gap-2" style={{ color: "var(--color-text-secondary)" }}>
            {p.dos.map((d, i) => (
              <li key={i}>&bull; {d}</li>
            ))}
          </ul>
        </div>
        <div className="card" style={{ borderColor: "var(--color-error)" }}>
          <h3 className="type-h4" style={{ color: "var(--color-error)" }}>
            করো না
          </h3>
          <ul className="type-body-sm mt-2 flex flex-col gap-2" style={{ color: "var(--color-text-secondary)" }}>
            {p.donts.map((d, i) => (
              <li key={i}>&bull; {d}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related deep-dive links */}
      <h2 className="type-h3 mt-10" style={{ color: "var(--color-text-primary)" }}>
        বিস্তারিত পড়ুন
      </h2>
      <ul className="mt-3 flex flex-col gap-2">
        {p.related.map((r) => (
          <li key={r.href}>
            <Link href={r.href} style={{ color: "var(--color-accent)" }}>
              {r.title} →
            </Link>
          </li>
        ))}
      </ul>

      <p className="type-caption mt-8">
        উৎস:{" "}
        {p.sources.map((s, i) => (
          <span key={s.url}>
            {i > 0 && ", "}
            <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)" }}>
              {s.label}
            </a>
          </span>
        ))}
      </p>
    </div>
  );
}
