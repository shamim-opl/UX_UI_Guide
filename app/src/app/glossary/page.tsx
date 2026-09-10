import Breadcrumb from "@/components/Breadcrumb";
import { getGlossary } from "@/lib/glossary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "শব্দকোষ — UX/UI পরিভাষা",
  description: "ইংরেজি ও বাংলায় UX/UI-এর গুরুত্বপূর্ণ পরিভাষার তালিকা, উদাহরণসহ।",
};

export default function GlossaryPage() {
  const terms = [...getGlossary()].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "শব্দকোষ" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        শব্দকোষ
      </h1>
      <p className="type-body-lg mt-2" style={{ color: "var(--color-text-secondary)" }}>
        ইংরেজি ↔ বাংলা UX/UI পরিভাষা।
      </p>

      <dl className="mt-8 flex flex-col gap-6">
        {terms.map((entry) => (
          <div key={entry.term} id={entry.term.toLowerCase().replace(/\s+/g, "-")} className="card">
            <dt>
              <span className="type-h4" style={{ color: "var(--color-text-primary)" }}>
                {entry.term}
              </span>
              <span className="type-body-sm ml-2" style={{ color: "var(--color-text-secondary)" }}>
                ({entry.term_bn})
              </span>
            </dt>
            <dd className="mt-2">
              <p className="type-body-sm" style={{ color: "var(--color-text-secondary)" }}>
                {entry.simple_explanation}
              </p>
              <p className="type-caption mt-2">উদাহরণ: {entry.example}</p>
              {entry.related_terms.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.related_terms.map((rt) => (
                    <span key={rt} className="tag">
                      {rt}
                    </span>
                  ))}
                </div>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
