export type Level = {
  id: string; // "00".."18"
  slug: string; // "00-getting-started"
  title_bn: string;
  title_en: string;
  description_bn: string;
};

// The 19-level taxonomy from the master spec (§2, §7–§27). Stored as data,
// not hard-coded routes, so adding a level never requires a schema change —
// see UX_UI Documentation/docs/05-content-taxonomy.md.
export const taxonomy: Level[] = [
  { id: "00", slug: "00-getting-started", title_bn: "শুরু করা", title_en: "Getting Started", description_bn: "ডিজাইন, UX, UI — মূল শব্দগুলো বোঝা দিয়ে শুরু।" },
  { id: "01", slug: "01-digital-design-fundamentals", title_bn: "ডিজিটাল ডিজাইনের ভিত্তি", title_en: "Digital Design Fundamentals", description_bn: "ডিজিটাল প্রোডাক্ট ডিজাইনের বুনিয়াদি ধারণা।" },
  { id: "02", slug: "02-human-and-psychology", title_bn: "মানুষ ও মনোবিজ্ঞান", title_en: "Human & Psychology", description_bn: "উপলব্ধি, স্মৃতি, Cognitive Load, Decision Making।" },
  { id: "03", slug: "03-ux-fundamentals", title_bn: "UX-এর ভিত্তি", title_en: "UX Fundamentals", description_bn: "ইউজার, নিড, জার্নি, ফ্লো এবং UX প্রসেস।" },
  { id: "04", slug: "04-ux-research", title_bn: "UX গবেষণা", title_en: "UX Research", description_bn: "রিসার্চ পদ্ধতি ও ডেলিভারেবল।" },
  { id: "05", slug: "05-information-architecture", title_bn: "Information Architecture", title_en: "Information Architecture", description_bn: "স্ট্রাকচার, ন্যাভিগেশন, লেবেলিং।" },
  { id: "06", slug: "06-interaction-design", title_bn: "Interaction Design", title_en: "Interaction Design", description_bn: "অ্যাফোর্ডেন্স, ফিডব্যাক, কম্পোনেন্ট স্টেট।" },
  { id: "07", slug: "07-visual-design", title_bn: "ভিজ্যুয়াল ডিজাইন", title_en: "Visual Design", description_bn: "রং, টাইপোগ্রাফি, গ্রিড, হায়ারার্কি।" },
  { id: "08", slug: "08-ui-design", title_bn: "UI ডিজাইন", title_en: "UI Design", description_bn: "সম্পূর্ণ UI কম্পোনেন্ট রেফারেন্স।" },
  { id: "09", slug: "09-usability", title_bn: "ইউজেবিলিটি", title_en: "Usability", description_bn: "লার্নেবিলিটি, এফিশিয়েন্সি, SUS।" },
  { id: "10", slug: "10-accessibility", title_bn: "অ্যাক্সেসিবিলিটি", title_en: "Accessibility & Inclusive Design", description_bn: "WCAG, POUR, কীবোর্ড, স্ক্রিন রিডার।" },
  { id: "11", slug: "11-platform-device-design", title_bn: "প্ল্যাটফর্ম ও ডিভাইস ডিজাইন", title_en: "Platform & Device Design", description_bn: "মোবাইল, ট্যাবলেট, ডেস্কটপ, অন্যান্য ডিভাইস।" },
  { id: "12", slug: "12-design-systems", title_bn: "ডিজাইন সিস্টেম", title_en: "Design Systems", description_bn: "ফাউন্ডেশন, টোকেন, কম্পোনেন্ট, গভর্নেন্স।" },
  { id: "13", slug: "13-product-design", title_bn: "প্রোডাক্ট ডিজাইন", title_en: "Product Design", description_bn: "স্ট্র্যাটেজি, ডিসকভারি, মেট্রিক্স।" },
  { id: "14", slug: "14-service-design", title_bn: "সার্ভিস ডিজাইন", title_en: "Service Design", description_bn: "কাস্টমার জার্নি, সার্ভিস ব্লুপ্রিন্ট।" },
  { id: "15", slug: "15-advanced-ux", title_bn: "অ্যাডভান্সড UX", title_en: "Advanced UX", description_bn: "এন্টারপ্রাইজ UX, ড্যাশবোর্ড, ওয়ার্কফ্লো।" },
  { id: "16", slug: "16-ai-ux", title_bn: "AI UX", title_en: "AI UX", description_bn: "কনভার্সেশনাল UX, AI এজেন্ট, প্রম্পট UX।" },
  { id: "17", slug: "17-human-ai-interaction", title_bn: "মানুষ–AI ইন্টারঅ্যাকশন", title_en: "Human–AI Interaction", description_bn: "কন্ট্রোল, ট্রান্সপারেন্সি, ওভাররাইড।" },
  { id: "18", slug: "18-emerging-future-interaction", title_bn: "উদীয়মান ও ভবিষ্যৎ ইন্টারঅ্যাকশন", title_en: "Emerging & Future Interaction", description_bn: "ভয়েস, জেসচার, স্প্যাশিয়াল কম্পিউটিং। প্রতিষ্ঠিত/উদীয়মান/পরীক্ষামূলক/অনুমানভিত্তিক লেবেল আবশ্যক।" },
  // Product Management track — added 2026-09-14 per Morshed's curriculum
  // review (see decisions.md). Appended as new levels rather than
  // renumbering 00-18, which would have broken every existing article's
  // URL and cross-link. UX/UI stays the platform's core identity; this
  // track covers the adjacent PM discipline a Product Designer works
  // alongside, not a full standalone PM bootcamp.
  { id: "19", slug: "19-product-management-fundamentals", title_bn: "প্রোডাক্ট ম্যানেজমেন্টের ভিত্তি", title_en: "Product Management Fundamentals", description_bn: "PM/PO/Designer-এর ভূমিকার পার্থক্য, প্রোডাক্ট লাইফসাইকেল, Agile প্রোডাক্ট ডেভেলপমেন্ট।" },
  { id: "20", slug: "20-product-requirements-and-documentation", title_bn: "প্রোডাক্ট রিকোয়ারমেন্ট ও ডকুমেন্টেশন", title_en: "Product Requirements & Documentation", description_bn: "PRD, User Story, Acceptance Criteria — একটা ফিচার লেখার মাধ্যমে দলকে বোঝানো।" },
  { id: "21", slug: "21-prioritization-and-roadmapping", title_bn: "Prioritization ও Roadmap", title_en: "Prioritization & Roadmapping", description_bn: "RICE, MoSCoW, Kano Model — কোন ফিচার আগে বানাবে তা সিদ্ধান্ত নেওয়ার ফ্রেমওয়ার্ক।" },
  { id: "22", slug: "22-agile-scrum-and-delivery", title_bn: "Agile, Scrum ও প্রোডাক্ট ডেলিভারি", title_en: "Agile, Scrum & Product Delivery", description_bn: "Scrum-এর ভূমিকা ও অনুষ্ঠান, MVP ডেলিভারি, রিলিজ ম্যানেজমেন্ট।" },
  { id: "23", slug: "23-product-analytics-and-growth", title_bn: "প্রোডাক্ট অ্যানালিটিক্স ও গ্রোথ", title_en: "Product Analytics & Growth", description_bn: "North Star Metric, Funnel, Retention, AARRR — সংখ্যা দিয়ে প্রোডাক্টের স্বাস্থ্য বোঝা।" },
  { id: "24", slug: "24-business-market-and-monetization", title_bn: "বিজনেস, মার্কেট ও মনিটাইজেশন", title_en: "Business, Market & Monetization", description_bn: "Business Model Canvas, TAM/SAM/SOM, প্রাইসিং ও রেভিনিউ মডেল।" },
  { id: "25", slug: "25-career-and-professional-growth", title_bn: "ক্যারিয়ার ও পেশাগত উন্নয়ন", title_en: "Career & Professional Growth", description_bn: "পোর্টফোলিও, কেস স্টাডি লেখা, ইন্টারভিউ প্রস্তুতি — একটা রিডিং রেফারেন্স, কোনো সাবমিশন/স্কোরিং ফিচার ছাড়া।" },
];

export function getLevelBySlug(slug: string): Level | undefined {
  return taxonomy.find((l) => l.slug === slug);
}

// Sidebar section grouping — restructured 2026-09-14 into 5 named
// "Learning Paths" per Morshed's curriculum review (see decisions.md),
// replacing the earlier 7 untitled sections. Purely a presentation
// grouping for the Learn sidebar; not a change to the taxonomy itself,
// which stays flat 00-25 per 05-content-taxonomy.md — a level's group
// here is derived, not stored, so this can be re-shuffled freely without
// touching any level's id/slug/URL.
export type LevelGroup = { slug: string; title_bn: string; description_bn: string; levelIds: string[] };

export const levelGroups: LevelGroup[] = [
  {
    slug: "design-foundations",
    title_bn: "Design Foundations",
    description_bn: "ডিজাইন, UX, UI-এর মূল ধারণা আর মানুষ কীভাবে চিন্তা করে — বাকি সবকিছুর ভিত্তি।",
    levelIds: ["00", "01", "02", "03"],
  },
  {
    slug: "ux-design",
    title_bn: "UX Design",
    description_bn: "User Research, Information Architecture, আর Interaction Design — সমস্যা বোঝা থেকে সমাধান কাঠামো পর্যন্ত।",
    levelIds: ["04", "05", "06", "09"],
  },
  {
    slug: "ui-design-and-systems",
    title_bn: "UI Design ও Design Systems",
    description_bn: "ভিজ্যুয়াল ডিজাইন, UI কম্পোনেন্ট, প্ল্যাটফর্ম-নির্দিষ্ট গাইডলাইন, আর স্কেলযোগ্য ডিজাইন সিস্টেম।",
    levelIds: ["07", "08", "10", "11", "12"],
  },
  {
    slug: "product-design-and-management",
    title_bn: "Product Design ও Management",
    description_bn: "ব্যবসায়িক লক্ষ্য, Prioritization, Agile ডেলিভারি, আর প্রোডাক্ট অ্যানালিটিক্স — UX-এর সাথে প্রোডাক্ট থিংকিং যুক্ত করা।",
    levelIds: ["13", "14", "15", "19", "20", "21", "22", "23", "24"],
  },
  {
    slug: "advanced-and-career",
    title_bn: "Advanced ও Career",
    description_bn: "AI UX, ভবিষ্যৎ ইন্টারঅ্যাকশন, আর পোর্টফোলিও/ইন্টারভিউ প্রস্তুতি — শেখার পথের শেষ ধাপ।",
    levelIds: ["16", "17", "18", "25"],
  },
];
