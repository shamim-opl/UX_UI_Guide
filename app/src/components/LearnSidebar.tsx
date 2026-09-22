"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { taxonomy, levelGroups } from "@/lib/taxonomy";
import LevelIcon from "@/components/icons/LevelIcon";

export type SidebarTopic = { id: string; slug: string; title_bn: string };

// Client component so it can live in app/learn/[level]/layout.tsx, which
// persists across /learn/[level]/[topic] navigations instead of remounting
// per page (see decisions.md, 2026-09-22 — sidebar used to flash/reset scroll
// on every topic click because it was rendered inside each page.tsx).
//
// Topics for the active level are fetched server-side by the layout and
// passed in as `topics` — getContentByLevel() reads MDX files off disk
// (node:fs), which can't be bundled into a client component. Only the active
// topic's highlight is derived here, from the URL, since that's cheap string
// work and lets the same sidebar work for both /learn/[level] and
// /learn/[level]/[topic] without the layout needing to know the topic.
export default function LearnSidebar({
  activeLevelSlug,
  topics,
}: {
  activeLevelSlug: string;
  topics: SidebarTopic[];
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const activeTopicSlug = segments[0] === "learn" && segments[1] === activeLevelSlug ? segments[2] : undefined;

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
                          <li key={doc.id}>
                            <Link
                              href={`/learn/${level.slug}/${doc.slug}`}
                              className="type-caption block py-1 pl-3"
                              style={{
                                color: doc.slug === activeTopicSlug ? "var(--color-accent)" : "var(--color-text-secondary)",
                                fontWeight: doc.slug === activeTopicSlug ? 600 : 400,
                              }}
                            >
                              {doc.title_bn}
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
