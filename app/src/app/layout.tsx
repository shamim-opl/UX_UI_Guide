import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { SITE_URL, SITE_NAME } from "@/lib/site";

// Hind Siliguri is the embedded heading webfont (spec §34, §07-design-token
// docs). Body copy prefers system-installed SolaimanLipi first — extremely
// common among Bangla users via Avro Keyboard — falling back to these
// embedded webfonts when it isn't present. See
// UX_UI Documentation/docs/07-design-token-architecture.md for the flag on
// SolaimanLipi's small-size legibility.
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500"],
  variable: "--font-noto-bengali",
  display: "swap",
});

// SEO pass, 2026-09-10 (see decisions.md): metadataBase makes every relative
// og:image/canonical resolve correctly; the title template keeps every page
// title keyword-forward ("Fitts's Law — UX/UI Guide") instead of generic.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — বাংলায় UX/UI শিখুন`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "বাংলা-ভাষী ডিজাইনার, ডেভেলপার ও শিক্ষার্থীদের জন্য একটা কাঠামোবদ্ধ UX/UI শেখা ও রেফারেন্স সিস্টেম — UX আইন, UI কম্পোনেন্ট, অ্যাক্সেসিবিলিটি এবং মনোবিজ্ঞান, প্রতিটা তথ্যের উৎসসহ।",
  keywords: [
    "UX শিক্ষা",
    "UI ডিজাইন",
    "বাংলা UX",
    "UX UI বাংলা",
    "ইউজার এক্সপেরিয়েন্স",
    "ডিজাইন সিস্টেম",
    "অ্যাক্সেসিবিলিটি",
    "Fitts's Law",
    "Hick's Law",
    "WCAG বাংলা",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — বাংলায় UX/UI শিখুন`,
    description:
      "বাংলা-ভাষী ডিজাইনার ও শিক্ষার্থীদের জন্য কাঠামোবদ্ধ UX/UI শেখা ও রেফারেন্স সিস্টেম।",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — বাংলায় UX/UI শিখুন`,
    description:
      "বাংলা-ভাষী ডিজাইনার ও শিক্ষার্থীদের জন্য কাঠামোবদ্ধ UX/UI শেখা ও রেফারেন্স সিস্টেম।",
  },
};

// Runs before hydration to avoid a theme flash — reads the persisted
// choice and stamps data-theme on <html> synchronously.
const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem("uxui-theme");
    if (t && t !== "light") document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${notoSansBengali.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          মূল কনটেন্টে যান
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
