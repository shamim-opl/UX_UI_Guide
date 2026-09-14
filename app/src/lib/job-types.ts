// Job listings — added 2026-09-14 per Morshed's request. Unlike the Learn/
// Reference content (evergreen knowledge, freely authored), every entry
// here is a factual claim about a real, currently-open position at a real
// company with a real deadline — so every entry MUST carry a `source` URL
// it was found at, and none may be fabricated or used as filler. See
// UX_UI Documentation/docs/decisions.md for the sourcing rule.
//
// Kept separate from jobs.ts (which reads the YAML file via node:fs):
// client components need these types and pure helpers, and importing an
// fs-based module from a client component drags node:fs into the browser
// bundle and breaks the build.
export type JobCategory =
  | "ui-ux"
  | "product-management"
  | "software-development"
  | "frontend"
  | "backend"
  | "full-stack"
  | "app-development"
  | "web-development"
  | "vibe-coding"
  | "it-general";

export type JobType = "Full-time" | "Part-time" | "Remote" | "Internship" | "Contract";

export type Job = {
  id: string;
  slug: string;
  title: string;
  company: string;
  category: JobCategory;
  jobType: JobType;
  location: string;
  experience_level?: string;
  salary_range?: string;
  // Source listing pages (bdjobs.com) don't expose an actual "posted on"
  // date on the list view — only a deadline. Recording a fabricated
  // posted_date would violate the sourcing rule above, so we record the
  // date *we* verified the listing was live instead.
  verified_date: string; // ISO date (YYYY-MM-DD) — when this entry was checked against its source
  deadline: string; // ISO date (YYYY-MM-DD)
  summary_bn: string;
  responsibilities: string[];
  requirements: string[];
  apply_link: string;
  source: string; // where this listing was found — required for verification
};

export const CATEGORY_LABELS: Record<JobCategory, string> = {
  "ui-ux": "UI/UX Design",
  "product-management": "Product Management",
  "software-development": "Software Development",
  frontend: "Frontend Development",
  backend: "Backend Development",
  "full-stack": "Full Stack Development",
  "app-development": "App Development",
  "web-development": "Web Development",
  "vibe-coding": "Vibe Coding / AI-Assisted Dev",
  "it-general": "IT / General",
};

export function isJobOpen(job: Job): boolean {
  // Compared as date-only strings (YYYY-MM-DD sorts lexicographically same
  // as chronologically) — avoids timezone drift from Date object math.
  const today = new Date().toISOString().slice(0, 10);
  return job.deadline >= today;
}
