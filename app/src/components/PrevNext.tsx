import Link from "next/link";

export type NavTarget = { href: string; title: string } | null;

export default function PrevNext({ prev, next }: { prev: NavTarget; next: NavTarget }) {
  if (!prev && !next) return null;
  return (
    <nav aria-label="আগের ও পরের বিষয়" className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
      {prev ? (
        <Link href={prev.href} className="card flex-1" style={{ textDecoration: "none" }}>
          <span className="type-caption block">← আগের বিষয়</span>
          <span className="type-body-sm block mt-1" style={{ color: "var(--color-text-primary)" }}>
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link href={next.href} className="card flex-1 text-right" style={{ textDecoration: "none" }}>
          <span className="type-caption block">পরের বিষয় →</span>
          <span className="type-body-sm block mt-1" style={{ color: "var(--color-text-primary)" }}>
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
