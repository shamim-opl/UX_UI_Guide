import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { levelGroups, taxonomy } from "@/lib/taxonomy";
import { getContentByLevel } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "সুচিপত্র",
  description: "প্ল্যাটফর্মের সব Learning Path, Level ও Topic এক পাতায় — সরাসরি লিংকসহ।",
};

// Site index / "TOC" page — added 2026-09-15 per Morshed's request, after
// analysis (see decisions.md): with 143 topics across 26 levels, there was
// no single page to scan everything at once — /learn only shows the 26
// level cards, you had to open each one to see its topics. This is a
// secondary/utility page (linked from the header's আরও dropdown + footer,
// not the primary nav or homepage) — the platform's own Progressive
// Disclosure content argues against dumping 143 items into primary
// navigation. Groups by the same Learning Path → Level structure already
// used everywhere else (levelGroups/taxonomy), so it doesn't introduce a
// new mental model — just makes the existing one scannable on one page.
export default function TocPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "সুচিপত্র" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        সুচিপত্র
      </h1>
      <p className="type-body-lg mt-2" style={{ color: "var(--color-text-secondary)" }}>
        প্ল্যাটফর্মের সব Learning Path, Level ও Topic এক পাতায়। নির্দিষ্ট কিছু খুঁজলে ব্রাউজারের সার্চ (Ctrl+F / Cmd+F) ব্যবহার করতে পারো, অথবা{" "}
        <Link href="/search" style={{ color: "var(--color-accent)" }}>
          পূর্ণ সার্চ পেজে
        </Link>{" "}
        যেতে পারো।
      </p>

      <div className="mt-8 flex flex-col gap-8">
        {levelGroups.map((group) => {
          const levels = group.levelIds
            .map((id) => taxonomy.find((l) => l.id === id))
            .filter((l): l is NonNullable<typeof l> => !!l);

          return (
            <section key={group.slug}>
              <h2 className="type-h2" style={{ color: "var(--color-text-primary)" }}>
                {group.title_bn}
              </h2>
              <p className="type-body-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
                {group.description_bn}
              </p>

              <div className="mt-4 flex flex-col gap-5">
                {levels.map((level) => {
                  const topics = getContentByLevel(level.id);
                  if (topics.length === 0) return null;
                  return (
                    <div key={level.id}>
                      <Link
                        href={`/learn/${level.slug}`}
                        className="type-h4 inline-block"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {level.title_bn}
                      </Link>
                      <ul className="mt-2 flex flex-col" style={{ borderLeft: "2px solid var(--color-border)" }}>
                        {topics.map((doc) => (
                          <li key={doc.meta.id} className="pl-4 py-1.5">
                            <Link
                              href={`/learn/${level.slug}/${doc.meta.slug}`}
                              className="type-body-sm"
                              style={{ color: "var(--color-accent)" }}
                            >
                              {doc.meta.title_bn}
                            </Link>
                            <span className="type-caption ml-2">— {doc.meta.summary_bn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
