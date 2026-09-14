import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";
import type { Job } from "./job-types";

export type { Job, JobCategory, JobType } from "./job-types";
export { CATEGORY_LABELS, isJobOpen } from "./job-types";

export function getAllJobs(): Job[] {
  const file = path.join(process.cwd(), "src", "data", "jobs.yaml");
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8");
  const jobs = (loadYaml(raw) as Job[]) ?? [];
  // Soonest-expiring first — the most actionable ordering. Rolling/no-deadline
  // postings sort last since there's no urgency attached to them.
  return [...jobs].sort((a, b) => (a.deadline ?? "9999-99-99").localeCompare(b.deadline ?? "9999-99-99"));
}

export function getJobBySlug(slug: string): Job | undefined {
  return getAllJobs().find((j) => j.slug === slug);
}
