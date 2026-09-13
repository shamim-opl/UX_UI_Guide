// Platform guideline pages — expanded 2026-09-13 from a 3-bullet MVP stub
// (per 17-mvp-scope.md) into a real quick-reference, since the platform's
// measurement articles (see /reference/measurements) now have the deep
// pixel/pt/dp specs — this page links out to those rather than repeating
// them, and focuses on the platform's identity: conventions, quick facts,
// common pitfalls.
export type QuickFact = { label: string; value: string };
export type RelatedLink = { title: string; href: string };

export type PlatformGuide = {
  slug: string;
  title_bn: string;
  summary_bn: string;
  quickFacts: QuickFact[];
  conventions: { title_bn: string; body_bn: string }[];
  commonComponents: string[];
  dos: string[];
  donts: string[];
  related: RelatedLink[];
  sources: { label: string; url: string }[];
};

export const platforms: PlatformGuide[] = [
  {
    slug: "ios",
    title_bn: "iOS",
    summary_bn: "অ্যাপলের Human Interface Guidelines অনুসরণ করে — নেভিগেশন, টাইপোগ্রাফি, এবং টাচ টার্গেটে।",
    quickFacts: [
      { label: "ডিজাইন সিস্টেম", value: "Apple Human Interface Guidelines (HIG)" },
      { label: "একক", value: "pt (points) — ডেনসিটি-স্বাধীন" },
      { label: "ন্যূনতম টাচ টার্গেট", value: "44×44pt" },
      { label: "ফন্ট", value: "SF Pro (সিস্টেম ফন্ট)" },
      { label: "ব্যাক নেভিগেশন", value: "উপরে-বাঁয়ে + সোয়াইপ-ব্যাক জেসচার" },
    ],
    conventions: [
      {
        title_bn: "নেভিগেশন",
        body_bn: "ব্যাক বাটন সবসময় উপরে-বাঁয়ে, সাথে স্ক্রিনের বাম কিনারা থেকে ডানে সোয়াইপ করে আগের স্ক্রিনে ফেরার জেসচার — এই দুটো একসাথে প্রত্যাশিত, শুধু বাটন থাকলেই যথেষ্ট মনে করা ভুল।",
      },
      {
        title_bn: "টাইপোগ্রাফি",
        body_bn: "সিস্টেম ফন্ট (San Francisco) ব্যবহার করলে Dynamic Type স্বয়ংক্রিয়ভাবে কাজ করে — ইউজার সিস্টেম সেটিংসে টেক্সট সাইজ বড়-ছোট করলে অ্যাপও সেই অনুযায়ী মানিয়ে নেয়, আলাদা কোড ছাড়াই।",
      },
      {
        title_bn: "টাচ টার্গেট",
        body_bn: "ন্যূনতম 44×44pt — এটা Apple-এর নিজস্ব App Store রিভিউ গাইডলাইনের অংশ, শুধু সুপারিশ না। সম্পূর্ণ pt/px রূপান্তর ও সব উপাদানের নির্দিষ্ট মাপের জন্য দেখো iOS App লেআউট স্পেসিফিকেশন।",
      },
      {
        title_bn: "মোডাল ও শিট",
        body_bn: "iOS-এ পূর্ণ-স্ক্রিন Modal-এর চেয়ে নিচ থেকে উঠে আসা Sheet (Bottom Sheet) বেশি প্রচলিত — ইউজার নিচে সোয়াইপ করে বন্ধ করতে পারে, যা একটা পরিচিত, প্রত্যাশিত জেসচার।",
      },
    ],
    commonComponents: ["Tab Bar", "Navigation Bar", "Segmented Control", "Action Sheet", "SF Symbols আইকন"],
    dos: [
      "সিস্টেম ফন্ট ও Dynamic Type সাপোর্ট রাখো, নির্দিষ্ট pt সাইজ হার্ডকোড কোরো না।",
      "Safe Area (নচ, Home Indicator) সবসময় respect করো — কনটেন্ট এর নিচে চাপা পড়া উচিত না।",
      "সোয়াইপ-ব্যাক জেসচার নিষ্ক্রিয় কোরো না, এটা প্রতিটা iOS ইউজারের প্রত্যাশিত অভ্যাস।",
    ],
    donts: [
      "Android-এর কনভেনশন (নিচে ব্যাক বাটন, FAB) হুবহু কপি কোরো না — iOS ইউজারের মানসিক মডেলের সাথে মেলে না।",
      "টাচ টার্গেট 44×44pt-এর কম রেখো না, এমনকি ঘন UI-তেও।",
    ],
    related: [
      { title: "iOS App লেআউট স্পেসিফিকেশন (সম্পূর্ণ pt/px মান)", href: "/reference/measurements/mobile-app-layout-ios" },
      { title: "Tablet লেআউট স্পেসিফিকেশন (iPad)", href: "/reference/measurements/tablet-layout-specs" },
      { title: "Apple HIG ডিজাইন সিস্টেম", href: "/reference/design-systems/apple-hig" },
    ],
    sources: [{ label: "Apple Human Interface Guidelines", url: "https://developer.apple.com/design/human-interface-guidelines" }],
  },
  {
    slug: "android",
    title_bn: "Android",
    summary_bn: "গুগলের Material Design নীতি অনুসরণ করে — কম্পোনেন্ট, motion, এবং elevation-এ।",
    quickFacts: [
      { label: "ডিজাইন সিস্টেম", value: "Material Design 3 (M3)" },
      { label: "একক", value: "dp (স্পেসিং), sp (টেক্সট) — উভয়ই ডেনসিটি-স্বাধীন" },
      { label: "ন্যূনতম টাচ টার্গেট", value: "48×48dp" },
      { label: "ফন্ট", value: "Roboto (ডিফল্ট সিস্টেম ফন্ট)" },
      { label: "ব্যাক নেভিগেশন", value: "সিস্টেম-ওয়াইড জেসচার/বাটন (অ্যাপের নিজস্ব ঐচ্ছিক)" },
    ],
    conventions: [
      {
        title_bn: "নেভিগেশন",
        body_bn: "Android-এ সিস্টেম-লেভেল ব্যাক জেসচার/বাটন থাকে, যা প্রতিটা অ্যাপে কাজ করে — অ্যাপের নিজস্ব ব্যাক বাটন iOS-এর মতো বাধ্যতামূলক না, কারণ সিস্টেম নিজেই এই কাজ করে।",
      },
      {
        title_bn: "টাইপোগ্রাফি",
        body_bn: "টেক্সট সাইজের জন্য সবসময় sp ব্যবহার করো, dp না — sp ইউজারের সিস্টেম ফন্ট-সাইজ সেটিং অনুযায়ী স্কেল হয়, যা অ্যাক্সেসিবিলিটির জন্য জরুরি।",
      },
      {
        title_bn: "Elevation",
        body_bn: "Material Design shadow/elevation (1dp, 3dp, 6dp, 8dp, 12dp — নির্দিষ্ট স্কেল) দিয়ে হায়ারার্কি বোঝায়, iOS-এর blur/translucency থেকে ভিন্ন পদ্ধতি — নিজের মতো এলোমেলো shadow বসানো উচিত না।",
      },
      {
        title_bn: "FAB (Floating Action Button)",
        body_bn: "স্ক্রিনের সবচেয়ে গুরুত্বপূর্ণ, একক অ্যাকশনের জন্য একটা ভাসমান বৃত্তাকার বাটন — Material Design-এর নিজস্ব প্যাটার্ন, iOS-এ এর সরাসরি সমতুল্য নেই।",
      },
    ],
    commonComponents: ["Bottom Navigation Bar", "Top App Bar", "FAB", "Navigation Drawer", "Material Icons"],
    dos: [
      "টেক্সট সাইজে sp, স্পেসিং/লেআউটে dp ব্যবহার করো — দুটো গুলিয়ে ফেলা একটা সাধারণ ভুল।",
      "৮dp গ্রিড মেনে চলো — Material Design-এর পুরো সিস্টেম এই একক গ্রিডের উপর ভিত্তি করে বানানো।",
      "সিস্টেম ব্যাক জেসচারের সাথে সাংঘর্ষিক কোনো কাস্টম জেসচার (যেমন বাম-কিনারা থেকে সোয়াইপ) এড়িয়ে চলো।",
    ],
    donts: [
      "iOS-এর মতো সবসময়-দৃশ্যমান একক ব্যাক বাটন কনভেনশন জোর করে বসিও না — Android ইউজার সিস্টেম জেসচারে অভ্যস্ত।",
      "টাচ টার্গেট 48×48dp-এর কম রেখো না — Google-এর Accessibility Scanner এটা চিহ্নিত করবে।",
    ],
    related: [
      { title: "Android App লেআউট স্পেসিফিকেশন (সম্পূর্ণ dp/sp মান)", href: "/reference/measurements/mobile-app-layout-android" },
      { title: "Tablet লেআউট স্পেসিফিকেশন (Android Tablet)", href: "/reference/measurements/tablet-layout-specs" },
      { title: "Material Design ডিজাইন সিস্টেম", href: "/reference/design-systems/material-design" },
    ],
    sources: [{ label: "Material Design 3", url: "https://m3.material.io" }],
  },
  {
    slug: "web",
    title_bn: "Web (Responsive)",
    summary_bn: "কোনো একক প্ল্যাটফর্ম কনভেনশন নেই — বহু ডিভাইস, ব্রাউজার, ও ইনপুট পদ্ধতি সাপোর্ট করতে হয়।",
    quickFacts: [
      { label: "ডিজাইন সিস্টেম", value: "কোনো একক অফিসিয়াল সিস্টেম নেই — প্রতিষ্ঠান-নির্দিষ্ট" },
      { label: "একক", value: "px (সাধারণত), rem (টাইপোগ্রাফির জন্য প্রস্তাবিত)" },
      { label: "ন্যূনতম টাচ টার্গেট (WCAG 2.2)", value: "24×24 CSS px (ন্যূনতম AA মানদণ্ড)" },
      { label: "ইনপুট পদ্ধতি", value: "মাউস, কীবোর্ড, টাচ — সবগুলোই একসাথে সাপোর্ট করতে হয়" },
      { label: "নেভিগেশন", value: "ব্রাউজার-নিয়ন্ত্রিত Back/Forward + সাইটের নিজস্ব নেভিগেশন" },
    ],
    conventions: [
      {
        title_bn: "কীবোর্ড অ্যাক্সেসিবিলিটি",
        body_bn: "কীবোর্ড নেভিগেশন ঐচ্ছিক না, বাধ্যতামূলক — মাউস বা টাচ ছাড়াও Tab/Enter/Arrow key দিয়ে সম্পূর্ণ সাইট ব্যবহারযোগ্য হতে হবে। এটা মোবাইল অ্যাপের চেয়ে ওয়েবের একটা মৌলিক পার্থক্য।",
      },
      {
        title_bn: "Hover আচরণ",
        body_bn: "Hover শুধু ডেস্কটপে (মাউস) নির্ভরযোগ্য — টাচ ডিভাইসে hover অস্তিত্বহীন বা অনির্ভরযোগ্য, তাই কোনো গুরুত্বপূর্ণ তথ্য বা ফাংশন শুধু hover-এ দেখানো উচিত না।",
      },
      {
        title_bn: "Responsive Breakpoint",
        body_bn: "নির্দিষ্ট ডিভাইসের (যেমন 'iPhone 14') উপর ভিত্তি করে না, কন্টেন্ট কখন ভেঙে পড়া শুরু করে তার উপর ভিত্তি করে breakpoint ঠিক করা উচিত — সম্পূর্ণ পিক্সেল রেফারেন্সের জন্য দেখো Breakpoint রেফারেন্স।",
      },
      {
        title_bn: "পারফরম্যান্স",
        body_bn: "মোবাইল অ্যাপের বিপরীতে, একটা ওয়েব পেজ প্রতিবার নতুন করে লোড/রেন্ডার হতে পারে — ধীর নেটওয়ার্ক বা পুরনো ডিভাইসেও ব্যবহারযোগ্য থাকা ওয়েব ডিজাইনের একটা অতিরিক্ত বিবেচ্য বিষয়, দেখো Doherty Threshold।",
      },
    ],
    commonComponents: ["Responsive Navbar", "Hamburger Menu (Mobile)", "Modal/Dialog", "Dropdown", "Sticky Header/Sidebar"],
    dos: [
      "কীবোর্ড-শুধু নেভিগেশন টেস্ট করো (Tab দিয়ে পুরো পেজ ঘুরে দেখা) — এটা প্রায়ই ভুলে যাওয়া হয়।",
      "একটা এলিমেন্ট hover আর focus দুটো অবস্থাতেই একই তথ্য দেখাও, শুধু hover-এ না।",
      "Progressive enhancement মেনে চলো — জাভাস্ক্রিপ্ট ব্যর্থ হলেও মূল কনটেন্ট যেন পড়া যায়।",
    ],
    donts: [
      "কোনো গুরুত্বপূর্ণ ফিচার শুধু hover-এর উপর নির্ভরশীল রেখো না — টাচ ডিভাইসে সেটা কখনো আবিষ্কারই হবে না।",
      "নির্দিষ্ট ডিভাইস মডেল টার্গেট করে breakpoint ঠিক কোরো না — নতুন ডিভাইস সাইজ প্রতিনিয়ত আসছে।",
    ],
    related: [
      { title: "Responsive Breakpoint রেফারেন্স (সম্পূর্ণ পিক্সেল টেবিল)", href: "/reference/measurements/responsive-breakpoints-reference" },
      { title: "Grid ও Spacing সিস্টেম", href: "/reference/measurements/web-design-grid-and-spacing" },
      { title: "SaaS/Web App লেআউট গাইড", href: "/reference/measurements/saas-web-app-layout-guide" },
    ],
    sources: [{ label: "W3C WCAG 2.2", url: "https://www.w3.org/TR/WCAG22/" }],
  },
];

export function getPlatformBySlug(slug: string): PlatformGuide | undefined {
  return platforms.find((p) => p.slug === slug);
}
