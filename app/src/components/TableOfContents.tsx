import TocList from "@/components/TocList";

// Heading extraction stays a plain function so it can run in this server
// component — only the scrollspy interaction (below) needs to be client.
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

export function extractHeadings(source: string): { text: string; slug: string }[] {
  const matches = [...source.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((m) => ({ text: m[1].replace(/[*_`]/g, ""), slug: slugify(m[1]) }));
}

export default function TableOfContents({ source }: { source: string }) {
  const headings = extractHeadings(source);
  if (headings.length === 0) return null;
  return <TocList headings={headings} />;
}
