// Responsive-audit fix (2026-09-15, see decisions.md): comparison tables in
// content (design-systems-comparison, measurements reference, etc.) have no
// wrapping element, so a wide table either overflowed the article column or
// forced horizontal scroll on the whole page on mobile. MDX renders a bare
// <table>, so this wraps it in its own scroll container instead — the table
// scrolls, the page never does.
export function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div style={{ overflowX: "auto", marginBottom: "var(--space-4)" }}>
      <table {...props} style={{ marginBottom: 0 }} />
    </div>
  );
}
