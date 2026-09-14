"use client";

// Explicit global-error boundary — added 2026-09-15. Next.js generates an
// implicit one when this file is absent, but the Vercel CLI's local build
// (`vercel deploy`/`vercel build`) failed converting that implicit page
// into a serverless function on this Next.js version ("ENOENT ... stat
// '.../functions/_global-error.func'"), blocking every deploy. Providing
// a real one is also just correct Next.js practice: it's the only
// boundary that can catch an error thrown by the root layout itself,
// which a normal error.tsx cannot.
//
// This replaces the entire document (Next renders it outside the root
// layout when the layout itself throws), so it needs its own <html>/<body>
// — it intentionally does not use the site's normal fonts/header/footer,
// since those come from the layout that just failed.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="bn">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          background: "#16181d",
          color: "#e7e9ec",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>কিছু একটা ভুল হয়েছে</h1>
        <p style={{ color: "#a6acb5", maxWidth: "32rem" }}>
          পেজটা লোড করতে সমস্যা হয়েছে। একটু পর আবার চেষ্টা করো।
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: "0.625rem 1.5rem",
            borderRadius: "6px",
            background: "#5b51e6",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          আবার চেষ্টা করো
        </button>
      </body>
    </html>
  );
}
