// Curated source list for the /resources page — mirrors the tiering system
// in UX_UI Documentation/content-sources/ (Authority/Research/Education),
// added 2026-09-10 to replace the earlier 3-link stub. See decisions.md.
// Inspiration-tier (Mobbin, Dribbble, etc.) is deliberately excluded here —
// those are never cited as fact, so they don't belong on a "sources we
// verify claims against" page; they're catalogued in the internal registry
// only.

export type ResourceTier = "authority" | "research" | "education";

export type Resource = { name: string; url: string; note: string };

export const RESOURCE_TIERS: { tier: ResourceTier; title_bn: string; description_bn: string; items: Resource[] }[] = [
  {
    tier: "authority",
    title_bn: "প্রামাণিক উৎস (Authority)",
    description_bn: "স্পেসিফিকেশন, প্ল্যাটফর্ম গাইডলাইন, এবং সরকারি/এন্টারপ্রাইজ ডিজাইন সিস্টেম — কোনো দাবি বা নিয়মের জন্য সরাসরি উদ্ধৃত।",
    items: [
      { name: "W3C", url: "https://www.w3.org/", note: "ওয়েব স্ট্যান্ডার্ডের মূল উৎস" },
      { name: "W3C WAI — Web Accessibility Initiative", url: "https://www.w3.org/WAI/", note: "অ্যাক্সেসিবিলিটি নীতি" },
      { name: "WCAG 2.2", url: "https://www.w3.org/WAI/standards-guidelines/wcag/", note: "অ্যাক্সেসিবিলিটি সাফল্য মানদণ্ড" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/", note: "ওয়েব প্ল্যাটফর্ম রেফারেন্স" },
      { name: "Apple Human Interface Guidelines", url: "https://developer.apple.com/design/human-interface-guidelines/", note: "iOS/Apple প্ল্যাটফর্ম কনভেনশন" },
      { name: "Android Design", url: "https://developer.android.com/design", note: "Android প্ল্যাটফর্ম কনভেনশন" },
      { name: "Material Design 3", url: "https://m3.material.io/", note: "Google-এর ডিজাইন সিস্টেম" },
      { name: "Microsoft Fluent 2", url: "https://fluent2.microsoft.design/", note: "Microsoft-এর ডিজাইন সিস্টেম" },
      { name: "Microsoft HAX Toolkit", url: "https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/", note: "Human-AI ইন্টারঅ্যাকশন গাইডলাইন" },
      { name: "Google People + AI Guidebook", url: "https://pair.withgoogle.com/guidebook/", note: "Human-centered AI ডিজাইন" },
      { name: "IBM Carbon Design System", url: "https://carbondesignsystem.com/", note: "এন্টারপ্রাইজ ডিজাইন সিস্টেম" },
      { name: "GitHub Primer", url: "https://primer.style/", note: "প্রোডাক্ট ডিজাইন সিস্টেম" },
      { name: "GOV.UK Design System", url: "https://design-system.service.gov.uk/", note: "সরকারি সার্ভিস প্যাটার্ন" },
      { name: "US Web Design System (USWDS)", url: "https://designsystem.digital.gov/", note: "সরকারি অ্যাক্সেসিবল ডিজাইন সিস্টেম" },
    ],
  },
  {
    tier: "research",
    title_bn: "গবেষণা উৎস (Research)",
    description_bn: "মানুষের আচরণ, ব্যবহারযোগ্যতা, এবং কার্যকারিতা সংক্রান্ত দাবির পেছনের প্রমাণ।",
    items: [
      { name: "Nielsen Norman Group (NN/g)", url: "https://www.nngroup.com/", note: "UX গবেষণা ও ইউজেবিলিটি" },
      { name: "Baymard Institute", url: "https://baymard.com/", note: "ই-কমার্স UX গবেষণা" },
      { name: "MeasuringU", url: "https://measuringu.com/", note: "UX পরিমাপ ও পরিসংখ্যান" },
      { name: "ACM Digital Library", url: "https://dl.acm.org/", note: "মূল একাডেমিক HCI গবেষণাপত্র" },
      { name: "ACM CHI Conference", url: "https://chi.acm.org/", note: "সাম্প্রতিক HCI গবেষণা" },
      { name: "Google Scholar", url: "https://scholar.google.com/", note: "গবেষণাপত্র খুঁজে বের করার টুল" },
    ],
  },
  {
    tier: "education",
    title_bn: "শিক্ষামূলক উৎস (Education)",
    description_bn: "সহজভাবে ধারণা ব্যাখ্যা করার জন্য — এখান থেকে কোনো তথ্য সরাসরি সত্য হিসেবে না নিয়ে, প্রামাণিক উৎসের সাথে যাচাই করে নেওয়া হয়।",
    items: [
      { name: "Interaction Design Foundation (IxDF)", url: "https://www.interaction-design.org/", note: "UX/HCI শিক্ষা" },
      { name: "Smashing Magazine", url: "https://www.smashingmagazine.com/", note: "ব্যবহারিক UI/UX আর্টিকেল" },
      { name: "Laws of UX", url: "https://lawsofux.com/", note: "UX আইনের দ্রুত রেফারেন্স" },
      { name: "Don Norman (jnd.org)", url: "https://jnd.org/", note: "Human-centered design-এর মূল লেখক" },
      { name: "Figma Resource Library", url: "https://www.figma.com/resource-library/", note: "ডিজাইন বেসিক ও সিস্টেম" },
    ],
  },
];
