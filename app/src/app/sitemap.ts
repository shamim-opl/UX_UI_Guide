import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { taxonomy } from "@/lib/taxonomy";
import { getAllContent, getContentByReferenceCategory } from "@/lib/content";
import { platforms } from "@/lib/platforms";

// Dynamic sitemap (SEO pass, 2026-09-10 — see UX_UI Documentation/docs/decisions.md).
// Learn URLs are listed as the canonical entry per doc.meta.reference_category
// decision in decisions.md; the /reference/... alternate view isn't
// separately listed here since its pages carry a canonical tag pointing
// back to Learn — listing both would contradict that canonicalization.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/learn",
    "/reference",
    "/patterns",
    "/platforms",
    "/psychology",
    "/ai",
    "/resources",
    "/glossary",
    "/search",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const levelRoutes = taxonomy.map((level) => ({
    url: `${SITE_URL}/learn/${level.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const articleRoutes = getAllContent().map((doc) => {
    const level = taxonomy.find((l) => l.id === doc.meta.level);
    return {
      url: `${SITE_URL}/learn/${level?.slug ?? doc.meta.level}/${doc.meta.slug}`,
      lastModified: doc.meta.last_reviewed ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  const referenceCategoryRoutes = ["laws", "components", "design-systems"]
    .filter((c) => getContentByReferenceCategory(c).length > 0)
    .map((category) => ({
      url: `${SITE_URL}/reference/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  const platformRoutes = platforms.map((p) => ({
    url: `${SITE_URL}/platforms/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...levelRoutes, ...articleRoutes, ...referenceCategoryRoutes, ...platformRoutes];
}
