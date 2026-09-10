import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";

// Content model per UX_UI Documentation/docs/06-content-schema.md:
// one concept_id, one meta.yaml (shared metadata + relationships),
// language bodies split into bn.mdx / en.mdx. MVP ships bn only.

export type ContentMeta = {
  id: string;
  slug: string;
  title_bn: string;
  title_en: string;
  level: string; // taxonomy level id, e.g. "00"
  reference_category?: "laws" | "components" | "measurements" | "design-systems" | null;
  difficulty: "beginner" | "intermediate" | "advanced";
  summary_bn: string;
  reading_time_minutes: number;
  prerequisites: string[];
  related_topics: string[];
  tags: string[];
  status: "draft" | "review" | "published";
  // Sourcing metadata (spec 06-content-schema.md, added 2026-09-10) — see
  // UX_UI Documentation/content-sources/ for the registry these point into.
  source_type?: "primary" | "research" | "secondary" | "industry" | "inspiration";
  evidence_level?: "high" | "medium" | "emerging";
  last_reviewed?: string;
  content_status?: "verified" | "needs-review" | "deprecated";
};

export type ContentDoc = {
  meta: ContentMeta;
  body_bn: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export function getAllContentIds(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getContentById(id: string): ContentDoc | null {
  const dir = path.join(CONTENT_DIR, id);
  const metaPath = path.join(dir, "meta.yaml");
  const bodyPath = path.join(dir, "bn.mdx");
  if (!fs.existsSync(metaPath) || !fs.existsSync(bodyPath)) return null;
  const meta = loadYaml(fs.readFileSync(metaPath, "utf8")) as ContentMeta;
  const body_bn = fs.readFileSync(bodyPath, "utf8");
  return { meta, body_bn };
}

export function getContentBySlug(slug: string): ContentDoc | null {
  return getAllContentIds()
    .map((id) => getContentById(id))
    .find((doc) => doc?.meta.slug === slug) ?? null;
}

export function getAllContent(): ContentDoc[] {
  return getAllContentIds()
    .map((id) => getContentById(id))
    .filter((d): d is ContentDoc => d !== null && d.meta.status === "published");
}

export function getContentByLevel(levelId: string): ContentDoc[] {
  return getAllContent().filter((d) => d.meta.level === levelId);
}

export function getContentByReferenceCategory(category: string): ContentDoc[] {
  return getAllContent().filter((d) => d.meta.reference_category === category);
}

export function resolveRelated(ids: string[]): ContentDoc[] {
  return ids
    .map((id) => getContentById(id))
    .filter((d): d is ContentDoc => d !== null);
}
