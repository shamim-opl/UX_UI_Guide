import Breadcrumb from "@/components/Breadcrumb";
import FeedbackForm from "@/components/FeedbackForm";
import { getAllContent } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "মতামত ও পরামর্শ",
  description: "কোনো তথ্য ভুল মনে হলে, কোনো টপিক মিসিং মনে হলে, বা প্ল্যাটফর্ম নিয়ে যেকোনো পরামর্শ থাকলে জানাও।",
};

export default function FeedbackPage() {
  const topicSuggestions = getAllContent().map((doc) => doc.meta.title_bn);

  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "মতামত ও পরামর্শ" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        মতামত ও পরামর্শ
      </h1>
      <p className="type-body-lg mt-2" style={{ color: "var(--color-text-secondary)" }}>
        কোনো তথ্য ভুল বা পুরনো মনে হলে, কোনো টপিক মিসিং মনে হলে, কোনো সমস্যায় পড়লে, বা প্ল্যাটফর্ম আরও ভালো করার কোনো আইডিয়া থাকলে — নিচে জানাও। প্রতিটা মতামত পড়া হয়।
      </p>
      <FeedbackForm topicSuggestions={topicSuggestions} />
    </div>
  );
}
