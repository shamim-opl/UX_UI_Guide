import Breadcrumb from "@/components/Breadcrumb";
import { RESOURCE_TIERS } from "@/lib/resources";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "রিসোর্স ও উৎস তালিকা",
  description: "এই প্ল্যাটফর্মে ব্যবহৃত প্রামাণিক, গবেষণা, ও শিক্ষামূলক উৎসের সম্পূর্ণ তালিকা।",
};

// Expanded 2026-09-10 from a 3-link stub — see decisions.md. Mirrors the
// tiering in UX_UI Documentation/content-sources/: Authority sources are
// cited directly, Research sources back behavioral claims, Education
// sources only calibrate explanations (never cited as fact on their own).
export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "রিসোর্স" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        রিসোর্স
      </h1>
      <p className="type-body-lg mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
        এই প্ল্যাটফর্মের প্রতিটা দাবি এই উৎসগুলো থেকে যাচাই করা — কোনো তথ্য স্বেচ্ছাচারীভাবে যোগ করা হয় না।
      </p>

      {RESOURCE_TIERS.map((group) => (
        <section key={group.tier} className="mt-10">
          <h2 className="type-h3" style={{ color: "var(--color-text-primary)" }}>
            {group.title_bn}
          </h2>
          <p className="type-body-sm mt-1 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
            {group.description_bn}
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {group.items.map((s) => (
              <li key={s.url} className="card">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-body-sm block"
                  style={{ color: "var(--color-text-primary)", textDecoration: "none" }}
                >
                  {s.name}
                </a>
                <p className="type-caption mt-1">{s.note}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
