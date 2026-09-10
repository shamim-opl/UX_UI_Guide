// Strips MDX/Markdown syntax down to plain text for full-text search
// indexing — "good enough" for substring matching and short snippets, not
// a full parser. Added 2026-09-10 for the advanced-search feature — see
// UX_UI Documentation/docs/decisions.md.
export function stripMdx(source: string): string {
  return source
    .replace(/<Callout[^>]*>/g, "")
    .replace(/<\/Callout>/g, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^\s*[-|]\s*/gm, " ")
    .replace(/\|/g, " ")
    .replace(/\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}
