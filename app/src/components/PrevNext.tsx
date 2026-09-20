import Link from "next/link";

export type NavTarget = { href: string; title: string } | null;

// .card sets display:block and 24px padding; overridden here so the title and
// direction label sit close together instead of stretching the card.
const CARD_STYLE = {
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-2)",
  padding: "var(--space-4) var(--space-5)",
} as const;

// Topic title leads (left, semibold) so the card reads as "where does this
// go"; the direction label sits underneath on the side the arrow points to.
export default function PrevNext({ prev, next }: { prev: NavTarget; next: NavTarget }) {
  if (!prev && !next) return null;
  return (
    <nav aria-label="আগের ও পরের বিষয়" className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
      {prev ? (
        <Link href={prev.href} className="card flex-1" style={CARD_STYLE}>
          <span className="text-left leading-snug" style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>
            {prev.title}
          </span>
          <span className="type-caption block text-left">← আগের বিষয়</span>
        </Link>
      ) : (
        <div className="hidden flex-1 sm:block" />
      )}
      {next ? (
        <Link href={next.href} className="card flex-1" style={CARD_STYLE}>
          <span className="text-left leading-snug" style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>
            {next.title}
          </span>
          <span className="type-caption block text-right">পরের বিষয় →</span>
        </Link>
      ) : (
        <div className="hidden flex-1 sm:block" />
      )}
    </nav>
  );
}
