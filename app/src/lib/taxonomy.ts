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
  { id: "02", slug: "02-human-and-psychology", title_bn: "মানুষ ও মনোবিজ্ঞান", title_en: "Human & Psychology", description_bn: "উপলব্ধি, স্মৃতি, জ্ঞানীয় চাপ, সিদ্ধান্ত গ্রহণ।" },
  { id: "03", slug: "03-ux-fundamentals", title_bn: "UX-এর ভিত্তি", title_en: "UX Fundamentals", description_bn: "ইউজার, নিড, জার্নি, ফ্লো এবং UX প্রসেস।" },
  { id: "04", slug: "04-ux-research", title_bn: "UX গবেষণা", title_en: "UX Research", description_bn: "রিসার্চ পদ্ধতি ও ডেলিভারেবল।" },
  { id: "05", slug: "05-information-architecture", title_bn: "তথ্য স্থাপত্য", title_en: "Information Architecture", description_bn: "স্ট্রাকচার, ন্যাভিগেশন, লেবেলিং।" },
  { id: "06", slug: "06-interaction-design", title_bn: "ইন্টারঅ্যাকশন ডিজাইন", title_en: "Interaction Design", description_bn: "অ্যাফোর্ডেন্স, ফিডব্যাক, কম্পোনেন্ট স্টেট।" },
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
];

export function getLevelBySlug(slug: string): Level | undefined {
  return taxonomy.find((l) => l.slug === slug);
}

// Sidebar section grouping (Docspace-style redesign, 2026-09-10 — see
// decisions.md). Purely a presentation grouping for the Learn sidebar; not
// a change to the taxonomy itself, which stays flat 00-18 per
// 05-content-taxonomy.md — a level's group here is derived, not stored.
export type LevelGroup = { title_bn: string; levelIds: string[] };

export const levelGroups: LevelGroup[] = [
  { title_bn: "ভিত্তি", levelIds: ["00", "01"] },
  { title_bn: "মানুষ ও গবেষণা", levelIds: ["02", "03", "04"] },
  { title_bn: "স্ট্রাকচার ও ডিজাইন", levelIds: ["05", "06", "07", "08"] },
  { title_bn: "মান যাচাই", levelIds: ["09", "10"] },
  { title_bn: "প্ল্যাটফর্ম ও সিস্টেম", levelIds: ["11", "12"] },
  { title_bn: "প্রোডাক্ট", levelIds: ["13", "14", "15"] },
  { title_bn: "ভবিষ্যৎ", levelIds: ["16", "17", "18"] },
];
