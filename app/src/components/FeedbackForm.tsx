"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Feedback & Suggestions form — added 2026-09-15. This is a fully static
// site (see next.config.ts's GITHUB_PAGES export mode and the gh-pages
// deploy branch) with no backend, database, or email service of any kind,
// so submission goes straight from the browser to Web3Forms
// (https://web3forms.com), which forwards to Morshed's email. The access
// key below is meant to be public — Web3Forms' own spam/domain controls
// live on their dashboard, not in a secret key — but it still needs to be
// a real key from https://web3forms.com/create-api-key rather than this
// placeholder before submissions actually arrive anywhere.
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type FeedbackCategory =
  | "Content Error"
  | "Correction Request"
  | "Missing Topic"
  | "Outdated Content"
  | "New Feature Suggestion"
  | "Technical Problem"
  | "UX/UI Improvement"
  | "General Advice"
  | "Other";

const CATEGORIES: FeedbackCategory[] = [
  "Content Error",
  "Correction Request",
  "Missing Topic",
  "Outdated Content",
  "New Feature Suggestion",
  "Technical Problem",
  "UX/UI Improvement",
  "General Advice",
  "Other",
];

// One example placeholder per category so the message field always shows
// something concrete rather than a generic "type here" — helps a beginner
// learner understand what level of detail is useful.
const MESSAGE_PLACEHOLDER: Record<FeedbackCategory, string> = {
  "Content Error": "যেমন: 'Fitts's Law' পেজে সূত্রটা ভুল লেখা আছে — W এর জায়গায় D বসানো উচিত।",
  "Correction Request": "যেমন: 'Design Tokens' আর্টিকেলের দ্বিতীয় উদাহরণটা বর্তমান UI-এর সাথে মিলছে না।",
  "Missing Topic": "যেমন: Figma Auto Layout নিয়ে কোনো আর্টিকেল নেই, কিন্তু এটা খুব দরকারি।",
  "Outdated Content": "যেমন: 'iOS Platform Guide'-এ পুরনো HIG স্পেসিফিকেশন আছে বলে মনে হচ্ছে।",
  "New Feature Suggestion": "যেমন: প্রতিটা লেভেল শেষে একটা ছোট কুইজ থাকলে ভালো হতো।",
  "Technical Problem": "যেমন: মোবাইলে সাইডবার মেনু খুললে স্ক্রল আটকে যাচ্ছে।",
  "UX/UI Improvement": "যেমন: সার্চ রেজাল্টের ট্যাগগুলো আরেকটু স্পষ্ট রঙে হলে ভালো হতো।",
  "General Advice": "যেমন: বিগিনারদের জন্য একটা 'শুরু কোথা থেকে করব' গাইড থাকলে সাহায্য হতো।",
  Other: "যা বলতে চাও, লিখে ফেলো — নির্দিষ্ট ক্যাটাগরিতে না পড়লেও সমস্যা নেই।",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function FeedbackForm({ topicSuggestions }: { topicSuggestions: string[] }) {
  const [category, setCategory] = useState<FeedbackCategory | null>(null);
  const [categoryTouched, setCategoryTouched] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTouched, setMessageTouched] = useState(false);
  const [relatedTopic, setRelatedTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  // Custom dropdown instead of native <input list>/<datalist> — that combo
  // renders unreliably on mobile (Safari/Chrome often show it as a
  // barely-usable native picker or nothing at all), so this reuses the same
  // .dropdown-panel pattern as the header's "আরও" menu: a plain filtered
  // list, tap/click to select, works identically on every device.
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false);
  const topicFieldRef = useRef<HTMLDivElement>(null);

  const filteredTopics = useMemo(() => {
    const q = relatedTopic.trim().toLowerCase();
    if (!q) return [];
    return topicSuggestions.filter((t) => t.toLowerCase().includes(q)).slice(0, 8);
  }, [relatedTopic, topicSuggestions]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (topicFieldRef.current && !topicFieldRef.current.contains(e.target as Node)) {
        setShowTopicSuggestions(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  const messageError = messageTouched && message.trim().length === 0 ? "একটা মেসেজ লিখতে হবে — খালি রাখা যাবে না।" : null;
  const categoryError = categoryTouched && !category ? "একটা ক্যাটাগরি বেছে নাও।" : null;
  const emailError = email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? "ইমেইল ঠিকানাটা সঠিক মনে হচ্ছে না।" : null;

  function resetForm() {
    setCategory(null);
    setCategoryTouched(false);
    setMessage("");
    setMessageTouched(false);
    setRelatedTopic("");
    setName("");
    setEmail("");
    setStatus("idle");
    setErrorDetail(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCategoryTouched(true);
    setMessageTouched(true);
    if (!category || message.trim().length === 0 || emailError) return;

    // Honeypot: a real visitor never fills a field named this way (it's
    // visually hidden below), a bot filling every field will. Silently
    // pretend success rather than telling a bot its submission was
    // rejected — that only teaches it to adapt.
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement | null)?.value;
    if (honeypot) {
      setStatus("success");
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setErrorDetail("ফর্মটা এখনো সেটআপ শেষ হয়নি (access key যোগ করা হয়নি)। সরাসরি morshedux@gmail.com-এ ইমেইল করো।");
      return;
    }

    setStatus("submitting");
    setErrorDetail(null);
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `[UX/UI Guide Feedback] ${category}`,
          from_name: name.trim() || "নাম দেওয়া হয়নি",
          category,
          related_topic: relatedTopic.trim() || "—",
          message: message.trim(),
          replyto: email.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorDetail(typeof data.message === "string" ? data.message : null);
      }
    } catch {
      setStatus("error");
      setErrorDetail(null);
    }
  }

  if (status === "success") {
    return (
      <div className="card list-item-in mt-6" style={{ borderColor: "var(--color-success)" }}>
        <p className="type-h4" style={{ color: "var(--color-success)" }}>
          ধন্যবাদ! তোমার মতামত পাঠানো হয়েছে।
        </p>
        <p className="type-body-sm mt-2" style={{ color: "var(--color-text-secondary)" }}>
          এটা পড়ে দেখা হবে। ইমেইল দিয়ে থাকলে, দরকার হলে যোগাযোগ করা হতে পারে।
        </p>
        <button type="button" onClick={resetForm} className="btn btn-secondary mt-4">
          আরেকটা পাঠাও
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-6">
      {/* Honeypot — hidden from real users via CSS, not `type="hidden"`
          (some bots skip hidden inputs but still fill visible-looking
          ones), never `display:none`/`aria-hidden` skip logic that would
          also fool a screen reader user into thinking it's a real field. */}
      <div style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* 1. Feedback type — required, selected before writing the message */}
      <div>
        <label className="type-label mb-2 block" style={{ color: "var(--color-text-primary)" }}>
          কী ধরনের মতামত? <span style={{ color: "var(--color-error)" }}>*</span>
        </label>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-required="true" aria-invalid={!!categoryError}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={category === c}
              onClick={() => {
                setCategory(c);
                setCategoryTouched(true);
              }}
              className="tag"
              style={
                category === c
                  ? { background: "var(--color-accent-strong)", color: "var(--color-on-accent)", borderColor: "var(--color-accent-strong)" }
                  : undefined
              }
            >
              {c}
            </button>
          ))}
        </div>
        {categoryError && (
          <p className="type-caption mt-2" style={{ color: "var(--color-error)" }} role="alert">
            {categoryError}
          </p>
        )}
      </div>

      {/* 2. Related topic/page — optional */}
      <div ref={topicFieldRef} className="relative">
        <label htmlFor="related-topic" className="type-label mb-2 block" style={{ color: "var(--color-text-primary)" }}>
          কোন টপিক/পেজ নিয়ে? <span className="type-caption" style={{ color: "var(--color-text-muted)" }}>(ঐচ্ছিক)</span>
        </label>
        <input
          id="related-topic"
          value={relatedTopic}
          onChange={(e) => {
            setRelatedTopic(e.target.value);
            setShowTopicSuggestions(true);
          }}
          onFocus={() => setShowTopicSuggestions(true)}
          placeholder="যেমন: 'Fitts's Law' বা 'Design Tokens' — না জানলে খালি রাখো"
          className="input-field w-full rounded-md px-4 outline-none"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            height: "var(--size-input-height)",
          }}
          role="combobox"
          aria-expanded={showTopicSuggestions && filteredTopics.length > 0}
          aria-controls="topic-suggestions"
          aria-autocomplete="list"
          autoComplete="off"
        />
        {showTopicSuggestions && filteredTopics.length > 0 && (
          <ul
            id="topic-suggestions"
            role="listbox"
            className="dropdown-panel absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-y-auto rounded-lg py-1"
            style={{ background: "var(--color-surface-elevated)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)" }}
          >
            {filteredTopics.map((t) => (
              <li key={t} role="option" aria-selected={relatedTopic === t}>
                <button
                  type="button"
                  onClick={() => {
                    setRelatedTopic(t);
                    setShowTopicSuggestions(false);
                  }}
                  className="feedback-topic-option type-body-sm block w-full px-4 py-2 text-left"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 3. Message — required */}
      <div>
        <label htmlFor="message" className="type-label mb-2 block" style={{ color: "var(--color-text-primary)" }}>
          বিস্তারিত লেখো <span style={{ color: "var(--color-error)" }}>*</span>
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => setMessageTouched(true)}
          rows={6}
          required
          aria-required="true"
          aria-invalid={!!messageError}
          aria-describedby={messageError ? "message-error" : undefined}
          placeholder={category ? MESSAGE_PLACEHOLDER[category] : "প্রথমে উপরে একটা ক্যাটাগরি বেছে নাও, তাহলে এখানে একটা উদাহরণ দেখাবে।"}
          className="input-field w-full rounded-md p-4 outline-none"
          style={{
            background: "var(--color-surface)",
            border: `1px solid ${messageError ? "var(--color-error)" : "var(--color-border)"}`,
            color: "var(--color-text-primary)",
            resize: "vertical",
          }}
        />
        {messageError && (
          <p id="message-error" className="type-caption mt-2" style={{ color: "var(--color-error)" }} role="alert">
            {messageError}
          </p>
        )}
      </div>

      {/* 4-5. Name + email — both optional */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="type-label mb-2 block" style={{ color: "var(--color-text-primary)" }}>
            নাম <span className="type-caption" style={{ color: "var(--color-text-muted)" }}>(ঐচ্ছিক)</span>
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="তোমার নাম"
            className="input-field w-full rounded-md px-4 outline-none"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
              height: "var(--size-input-height)",
            }}
          />
        </div>
        <div>
          <label htmlFor="email" className="type-label mb-2 block" style={{ color: "var(--color-text-primary)" }}>
            ইমেইল <span className="type-caption" style={{ color: "var(--color-text-muted)" }}>(ঐচ্ছিক)</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "email-error" : "email-hint"}
            className="input-field w-full rounded-md px-4 outline-none"
            style={{
              background: "var(--color-surface)",
              border: `1px solid ${emailError ? "var(--color-error)" : "var(--color-border)"}`,
              color: "var(--color-text-primary)",
              height: "var(--size-input-height)",
            }}
          />
          {emailError ? (
            <p id="email-error" className="type-caption mt-1" style={{ color: "var(--color-error)" }} role="alert">
              {emailError}
            </p>
          ) : (
            <p id="email-hint" className="type-caption mt-1">
              দিলে, দরকার হলে ফলো-আপ করা যাবে — না দিলেও মতামত পাঠানো যাবে।
            </p>
          )}
        </div>
      </div>

      {status === "error" && (
        <div className="card list-item-in" style={{ borderColor: "var(--color-error)" }}>
          <p className="type-body-sm" style={{ color: "var(--color-error)" }}>
            পাঠানো যায়নি। {errorDetail ?? "একটু পর আবার চেষ্টা করো।"}
          </p>
        </div>
      )}

      <div>
        <button type="submit" disabled={status === "submitting"} className="btn btn-primary" style={{ opacity: status === "submitting" ? 0.7 : 1 }}>
          {status === "submitting" ? "পাঠানো হচ্ছে…" : "পাঠিয়ে দিন"}
        </button>
      </div>
    </form>
  );
}
