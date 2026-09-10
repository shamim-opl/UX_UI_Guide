function textOf(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

// Must match TableOfContents.tsx's slugify exactly, so #anchors resolve.
export function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const id = slugify(textOf(props.children));
  return <h2 id={id} {...props} />;
}

export function H3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const id = slugify(textOf(props.children));
  return <h3 id={id} {...props} />;
}
