import Breadcrumb from "@/components/Breadcrumb";
import GlossaryClient from "@/components/GlossaryClient";
import { getGlossary } from "@/lib/glossary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "শব্দকোষ — UX/UI পরিভাষা",
  description: "ইংরেজি ও বাংলায় UX/UI-এর গুরুত্বপূর্ণ পরিভাষার তালিকা, সহজ ব্যাখ্যা ও উদাহরণসহ।",
};

export default function GlossaryPage() {
  const terms = getGlossary();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "শব্দকোষ" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        শব্দকোষ
      </h1>
      <p className="type-body-lg mt-2" style={{ color: "var(--color-text-secondary)" }}>
        আর্টিকেল পড়ার সময় কোনো ইংরেজি UX/UI শব্দ (যেমন &quot;Affordance&quot; বা &quot;Cognitive
        Load&quot;) না বুঝলে এখানে খুঁজে দেখো — প্রতিটার সহজ বাংলা ব্যাখ্যা ও বাস্তব উদাহরণ আছে।
        নিচে বিষয় অনুযায়ী ফিল্টার করতে পারো, বা সরাসরি সার্চ বক্সে টাইপ করো। একটা শব্দের
        &quot;সম্পর্কিত&quot; ট্যাগে ক্লিক করলে সেই শব্দে সরাসরি চলে যাবে।
      </p>

      <GlossaryClient terms={terms} />
    </div>
  );
}
