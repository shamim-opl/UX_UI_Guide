import { SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-border)" }}>
      <div
        className="mx-auto max-w-[1280px] px-4 py-8 md:px-6"
        style={{ color: "var(--color-text-muted)" }}
      >
        <p className="type-body-sm">
          {SITE_NAME} — বাংলা-ভাষী ডিজাইনার, ডেভেলপার এবং শিক্ষার্থীদের জন্য একটা কাঠামোবদ্ধ
          শেখা ও রেফারেন্স সিস্টেম।
        </p>
        <p className="type-caption mt-2">
          এই প্ল্যাটফর্ম WCAG 2.2 AA লক্ষ্য অনুসরণ করে। প্রতিটা তথ্যের উৎস উল্লেখ করা আছে যেখানে প্রযোজ্য।
        </p>
      </div>
    </footer>
  );
}
