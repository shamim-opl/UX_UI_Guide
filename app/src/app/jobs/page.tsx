import Breadcrumb from "@/components/Breadcrumb";
import JobsClient from "@/components/JobsClient";
import { getAllJobs } from "@/lib/jobs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "চাকরি — UX/UI, Product, Development",
  description: "UI/UX, Product Management, Software Development, Frontend, App ও Web Development-এর জন্য যাচাইকৃত চাকরির খবর, ডেডলাইনসহ।",
};

export default function JobsPage() {
  const jobs = getAllJobs();

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "চাকরি" }]} />
      <h1 className="type-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
        চাকরি
      </h1>
      <p className="type-body-lg mt-2 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
        UI/UX, Product Management, Software Development, Frontend, App ও Web Development-সহ IT-র সব ধরনের পদের জন্য যাচাই করা চাকরির খবর — প্রতিটার সাথে আসল সোর্স লিংক দেওয়া আছে।
      </p>
      <p className="type-caption mt-2" style={{ color: "var(--color-text-muted)" }}>
        এখানে শুধু যাচাইকৃত, বাস্তব পোস্টিং রাখা হয় — কোনো তথ্য বানানো হয় না। নিয়মিত আপডেট করা হচ্ছে।
      </p>
      <JobsClient jobs={jobs} />
    </div>
  );
}
