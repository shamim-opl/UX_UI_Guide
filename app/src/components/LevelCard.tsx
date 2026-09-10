import Link from "next/link";
import type { Level } from "@/lib/taxonomy";

export default function LevelCard({ level, topicCount }: { level: Level; topicCount: number }) {
  return (
    <Link href={`/learn/${level.slug}`} className="card block" style={{ textDecoration: "none" }}>
      <span className="type-label">Level {level.id}</span>
      <h3 className="type-h4 mt-1" style={{ color: "var(--color-text-primary)" }}>
        {level.title_bn}
      </h3>
      <p className="type-body-sm mt-2" style={{ color: "var(--color-text-secondary)" }}>
        {level.description_bn}
      </p>
      <span className="type-caption mt-3 block">{topicCount} টি বিষয়</span>
    </Link>
  );
}
