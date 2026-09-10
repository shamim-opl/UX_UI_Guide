// Content-quality classification per UX_UI Documentation/docs/06-content-schema.md
// §Content quality classification — every factual claim should be taggable,
// this is the mechanism chosen for that (previously an open item in that doc).
const LABELS: Record<string, string> = {
  established: "প্রতিষ্ঠিত জ্ঞান",
  "research-finding": "গবেষণার ফলাফল",
  guideline: "ডিজাইন গাইডলাইন",
  convention: "প্ল্যাটফর্ম কনভেনশন",
  practice: "ইন্ডাস্ট্রি প্র্যাকটিস",
  opinion: "মতামত",
  emerging: "উদীয়মান ধারণা",
  speculation: "অনুমানভিত্তিক",
};

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Callout({
  type = "guideline",
  children,
}: {
  type?: keyof typeof LABELS;
  children: React.ReactNode;
}) {
  return (
    <div className="callout">
      <span className="callout-icon">
        <InfoIcon />
      </span>
      <div>
        <span className="callout-label">{LABELS[type] ?? type}</span>
        <div className="type-body-sm">{children}</div>
      </div>
    </div>
  );
}
