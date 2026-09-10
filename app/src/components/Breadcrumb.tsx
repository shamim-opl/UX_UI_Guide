import Link from "next/link";

export type Crumb = { label: string; href?: string };

function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9v-6h6v6h2.5a1 1 0 0 0 1-1v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="ব্রেডক্রাম্ব" className="type-caption">
      <ol className="flex flex-wrap items-center gap-2">
        <li className="flex items-center gap-2">
          <Link href="/" aria-label="হোম" style={{ color: "var(--color-text-muted)" }}>
            <HomeIcon />
          </Link>
          {items.length > 0 && <span aria-hidden="true">/</span>}
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} style={{ color: "var(--color-text-secondary)" }}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" style={{ color: "var(--color-text-primary)" }}>
                {item.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
