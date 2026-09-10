// Thin platform-guideline stubs for MVP — per UX_UI Documentation/docs/17-mvp-scope.md,
// full content depth here is a Phase 3-6 concern, not MVP. These prove the
// route/template exists and are honestly sourced, not padded filler.
export type PlatformGuide = {
  slug: string;
  title_bn: string;
  summary_bn: string;
  points: string[];
  source: string;
};

export const platforms: PlatformGuide[] = [
  {
    slug: "ios",
    title_bn: "iOS",
    summary_bn: "অ্যাপলের Human Interface Guidelines অনুসরণ করে — নেভিগেশন, টাইপোগ্রাফি, এবং টাচ টার্গেটে।",
    points: [
      "নূন্যতম টাচ টার্গেট: 44×44pt (Apple HIG-এর সুপারিশ)।",
      "ব্যাক নেভিগেশন সাধারণত উপরে-বাঁয়ে, সোয়াইপ-ব্যাক জেসচার সহ।",
      "সিস্টেম ফন্ট (San Francisco) ব্যবহারে ডায়নামিক টাইপ সাইজিং স্বয়ংক্রিয়ভাবে সাপোর্ট হয়।",
    ],
    source: "Apple Human Interface Guidelines — developer.apple.com/design/human-interface-guidelines",
  },
  {
    slug: "android",
    title_bn: "Android",
    summary_bn: "গুগলের Material Design নীতি অনুসরণ করে — কম্পোনেন্ট, motion, এবং elevation-এ।",
    points: [
      "নূন্যতম টাচ টার্গেট: 48×48dp (Material Design-এর সুপারিশ)।",
      "সিস্টেম-ওয়াইড ব্যাক বাটন/জেসচার থাকে — অ্যাপের নিজস্ব ব্যাক বাটন অপশনাল।",
      "Elevation shadow দিয়ে হায়ারার্কি বোঝানো হয়, iOS-এর মতো blur/translucency-নির্ভর না।",
    ],
    source: "Material Design 3 — m3.material.io",
  },
  {
    slug: "web",
    title_bn: "Web (Responsive)",
    summary_bn: "কোনো একক প্ল্যাটফর্ম কনভেনশন নেই — বহু ডিভাইস, ব্রাউজার, ও ইনপুট পদ্ধতি সাপোর্ট করতে হয়।",
    points: [
      "কীবোর্ড নেভিগেশন বাধ্যতামূলক — মাউস/টাচ ছাড়াও সম্পূর্ণ ব্যবহারযোগ্য হতে হবে।",
      "রেসপন্সিভ ব্রেকপয়েন্ট অনুযায়ী লেআউট বদলানো উচিত, শুধু স্কেল করা না (দেখো Responsive Strategy)।",
      "কোনো একক 'সঠিক' টাচ টার্গেট সাইজ নেই — WCAG 2.2-এর ২৪px ন্যূনতম মান অনুসরণযোগ্য বেসলাইন।",
    ],
    source: "W3C WCAG 2.2 — w3.org/TR/WCAG22/",
  },
];

export function getPlatformBySlug(slug: string): PlatformGuide | undefined {
  return platforms.find((p) => p.slug === slug);
}
