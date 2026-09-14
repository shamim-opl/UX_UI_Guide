import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllJobs, getJobBySlug, isJobOpen, CATEGORY_LABELS } from "@/lib/jobs";
import type { Metadata } from "next";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" });
}

export function generateStaticParams() {
  return getAllJobs().map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/jobs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "চাকরি" };
  return { title: `${job.title} — ${job.company}`, description: job.summary_bn };
}

export default async function JobDetailPage({ params }: PageProps<"/jobs/[slug]">) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const open = isJobOpen(job);

  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "চাকরি", href: "/jobs" }, { label: job.title }]} />
      <div className="mt-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h1 className="type-h1" style={{ color: "var(--color-text-primary)" }}>
            {job.title}
          </h1>
          <p className="type-body-lg mt-1" style={{ color: "var(--color-text-secondary)" }}>
            {job.company} &bull; {job.location}
          </p>
        </div>
        <span className="tag shrink-0">{CATEGORY_LABELS[job.category]}</span>
      </div>

      {!open && job.deadline && (
        <div className="card mt-6" style={{ borderColor: "var(--color-error)" }}>
          <p className="type-body-sm" style={{ color: "var(--color-error)" }}>
            এই পোস্টের আবেদনের মেয়াদ শেষ হয়ে গেছে ({formatDate(job.deadline)})। এটা রেফারেন্সের জন্য রাখা হয়েছে।
          </p>
        </div>
      )}

      {/* Quick facts */}
      <div className="card mt-6">
        <dl className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 border-b py-2" style={{ borderColor: "var(--color-border)" }}>
            <dt className="type-body-sm w-40 shrink-0" style={{ color: "var(--color-text-muted)" }}>
              চাকরির ধরন
            </dt>
            <dd className="type-body-sm" style={{ color: "var(--color-text-primary)" }}>
              {job.jobType}
            </dd>
          </div>
          {job.experience_level && (
            <div className="flex flex-wrap gap-2 border-b py-2" style={{ borderColor: "var(--color-border)" }}>
              <dt className="type-body-sm w-40 shrink-0" style={{ color: "var(--color-text-muted)" }}>
                অভিজ্ঞতা
              </dt>
              <dd className="type-body-sm" style={{ color: "var(--color-text-primary)" }}>
                {job.experience_level}
              </dd>
            </div>
          )}
          {job.salary_range && (
            <div className="flex flex-wrap gap-2 border-b py-2" style={{ borderColor: "var(--color-border)" }}>
              <dt className="type-body-sm w-40 shrink-0" style={{ color: "var(--color-text-muted)" }}>
                বেতন
              </dt>
              <dd className="type-body-sm" style={{ color: "var(--color-text-primary)" }}>
                {job.salary_range}
              </dd>
            </div>
          )}
          <div className="flex flex-wrap gap-2 border-b py-2" style={{ borderColor: "var(--color-border)" }}>
            <dt className="type-body-sm w-40 shrink-0" style={{ color: "var(--color-text-muted)" }}>
              আবেদনের শেষ তারিখ
            </dt>
            <dd className="type-body-sm" style={{ color: open ? "var(--color-success)" : "var(--color-error)" }}>
              {job.deadline ? formatDate(job.deadline) : "চলমান নিয়োগ (নির্দিষ্ট ডেডলাইন নেই)"}
            </dd>
          </div>
          <div className="flex flex-wrap gap-2 py-2">
            <dt className="type-body-sm w-40 shrink-0" style={{ color: "var(--color-text-muted)" }}>
              যাচাই করা হয়েছে
            </dt>
            <dd className="type-body-sm" style={{ color: "var(--color-text-primary)" }}>
              {formatDate(job.verified_date)}
            </dd>
          </div>
        </dl>
      </div>

      <p className="type-body-lg mt-6" style={{ color: "var(--color-text-secondary)" }}>
        {job.summary_bn}
      </p>

      {job.responsibilities.length > 0 && (
        <>
          <h2 className="type-h3 mt-8" style={{ color: "var(--color-text-primary)" }}>
            দায়িত্ব
          </h2>
          <ul className="type-body-sm mt-3 flex flex-col gap-2" style={{ color: "var(--color-text-secondary)" }}>
            {job.responsibilities.map((r, i) => (
              <li key={i}>&bull; {r}</li>
            ))}
          </ul>
        </>
      )}

      {job.requirements.length > 0 && (
        <>
          <h2 className="type-h3 mt-8" style={{ color: "var(--color-text-primary)" }}>
            প্রয়োজনীয় যোগ্যতা
          </h2>
          <ul className="type-body-sm mt-3 flex flex-col gap-2" style={{ color: "var(--color-text-secondary)" }}>
            {job.requirements.map((r, i) => (
              <li key={i}>&bull; {r}</li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href={job.apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary rounded-full px-6 py-2.5"
          style={{ pointerEvents: open ? "auto" : "none", opacity: open ? 1 : 0.5 }}
          aria-disabled={!open}
        >
          আবেদন করো →
        </a>
        <a href={job.source} target="_blank" rel="noopener noreferrer" className="type-caption" style={{ color: "var(--color-accent)" }}>
          মূল পোস্ট দেখো (সোর্স)
        </a>
      </div>
    </div>
  );
}
