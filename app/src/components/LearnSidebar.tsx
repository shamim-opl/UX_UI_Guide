import Link from "next/link";
import { taxonomy, levelGroups } from "@/lib/taxonomy";
import { getContentByLevel } from "@/lib/content";
import LevelIcon from "@/components/icons/LevelIcon";

export default function LearnSidebar({ activeLevelSlug, activeTopicSlug }: { activeLevelSlug?: string; activeTopicSlug?: string }) {
  return (
    <nav
      aria-label="Learn ন্যাভিগেশন"
      className="hidden lg:block"
      style={{
        width: "260px",
        // Same fix as TocList.tsx (2026-09-10, see decisions.md) — without
        // this the sidebar scrolls away with the article instead of
        // staying put while you read.
        position: "sticky",
        top: "96px",
        maxHeight: "calc(100vh - 96px - 2rem)",
        overflowY: "auto",
        alignSelf: "flex-start",
      }}
    >
      <div className="flex flex-col gap-6">
        {levelGroups.map((group) => (
          <div key={group.slug}>
            <Link
              href={`/learn/path/${group.slug}`}
              className="type-label mb-2 block px-3"
              style={{ textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-text-secondary)" }}
            >
              {group.title_bn}
            </Link>
            <ul className="flex flex-col gap-0.5">
              {group.levelIds.map((levelId) => {
                const level = taxonomy.find((l) => l.id === levelId);
                if (!level) return null;
                const isActiveLevel = level.slug === activeLevelSlug;
                const topics = isActiveLevel ? getContentByLevel(level.id) : [];
                return (
                  <li key={level.id}>
                    <Link
                      href={`/learn/${level.slug}`}
                      className="type-body-sm flex items-center gap-2.5 rounded-md px-3 py-1.5"
                      style={{
                        color: isActiveLevel ? "var(--color-accent)" : "var(--color-text-secondary)",
                        background: isActiveLevel ? "color-mix(in srgb, var(--color-accent) 10%, transparent)" : "transparent",
                        fontWeight: isActiveLevel ? 600 : 400,
                        borderLeft: isActiveLevel ? "2px solid var(--color-accent)" : "2px solid transparent",
                      }}
                    >
                      <LevelIcon levelId={level.id} />
                      {level.title_bn}
                    </Link>
                    {isActiveLevel && topics.length > 0 && (
                      <ul className="ml-8 mt-0.5 flex flex-col gap-0.5" style={{ borderLeft: "1px solid var(--color-border)" }}>
                        {topics.map((doc) => (
                          <li key={doc.meta.id}>
                            <Link
                              href={`/learn/${level.slug}/${doc.meta.slug}`}
                              className="type-caption block py-1 pl-3"
                              style={{
                                color:
                                  doc.meta.slug === activeTopicSlug
                                    ? "var(--color-accent)"
                                    : "var(--color-text-secondary)",
                                fontWeight: doc.meta.slug === activeTopicSlug ? 600 : 400,
                              }}
                            >
                              {doc.meta.title_bn}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
