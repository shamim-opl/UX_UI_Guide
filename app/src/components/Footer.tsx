import { SITE_NAME } from "@/lib/site";

// Same handle across every platform, per Morshed (2026-09-15) — confirmed
// explicitly rather than assumed, since a wrong social URL is worse than
// no link at all.
const HANDLE = "morshedUX";

const SOCIAL_LINKS: { label: string; href: string; path: string }[] = [
  {
    label: "GitHub",
    href: `https://github.com/${HANDLE}`,
    path: "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z",
  },
  {
    label: "LinkedIn",
    href: `https://linkedin.com/in/${HANDLE}`,
    path: "M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM21 21v-6.98c0-3.74-2-5.48-4.66-5.48-2.15 0-3.11 1.18-3.65 2.01V8.5H9.31c.04.96 0 12.5 0 12.5h3.38v-6.98c0-.37.03-.75.14-1.02.3-.75 1-1.53 2.16-1.53 1.52 0 2.13 1.16 2.13 2.86V21H21Z",
  },
  {
    label: "X (Twitter)",
    href: `https://x.com/${HANDLE}`,
    path: "M18.24 3H21l-6.55 7.49L22 21h-6.24l-4.88-6.38L5.28 21H2.5l7.03-8.03L2 3h6.4l4.4 5.83L18.24 3Zm-1.1 16.17h1.53L7.02 4.72H5.38l11.76 14.45Z",
  },
  {
    label: "Instagram",
    href: `https://instagram.com/${HANDLE}`,
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.13s-.01 3.07-.06 4.13c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.76 4.9 4.9 0 0 1-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.07-.01-4.13-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.07 2 14.73 2 12s.01-3.07.06-4.13c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76a4.9 4.9 0 0 1 1.76-1.15c.64-.25 1.37-.42 2.43-.47C8.93 2.01 9.27 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25A3.25 3.25 0 1 1 12 8.75a3.25 3.25 0 0 1 0 6.5ZM17.4 6.6a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0Z",
  },
  {
    label: "TikTok",
    href: `https://tiktok.com/@${HANDLE}`,
    path: "M16.6 2h-3.2v13.4a2.6 2.6 0 1 1-2.1-2.55V9.6a5.9 5.9 0 1 0 5.3 5.87V9.1a7.8 7.8 0 0 0 4.5 1.44V7.34A4.6 4.6 0 0 1 16.6 2Z",
  },
  {
    label: "Pinterest",
    href: `https://pinterest.com/${HANDLE}`,
    path: "M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.38 9.3-.09-.79-.17-2 .04-2.86.19-.79 1.23-5.02 1.23-5.02s-.31-.63-.31-1.55c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.57 2.25-.87 3.5-.25 1.05.52 1.9 1.55 1.9 1.86 0 3.29-1.96 3.29-4.79 0-2.5-1.8-4.26-4.37-4.26-2.98 0-4.72 2.23-4.72 4.54 0 .9.34 1.86.78 2.39a.31.31 0 0 1 .07.3c-.08.32-.25 1.05-.29 1.2-.04.19-.15.23-.35.14-1.3-.6-2.11-2.5-2.11-4.02 0-3.27 2.38-6.28 6.86-6.28 3.6 0 6.4 2.57 6.4 6 0 3.58-2.26 6.46-5.39 6.46-1.05 0-2.04-.55-2.38-1.19l-.65 2.47c-.23.9-.86 2.02-1.28 2.7A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z",
  },
  {
    label: "Facebook",
    href: `https://facebook.com/${HANDLE}`,
    path: "M13.5 22v-8.4h2.8l.42-3.26h-3.22V8.24c0-.94.26-1.58 1.6-1.58H16.9V3.7c-.28-.04-1.25-.12-2.38-.12-2.36 0-3.97 1.44-3.97 4.08v2.28H8v3.26h2.55V22h2.95Z",
  },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-border)" }}>
      <div
        className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-4 py-6 md:px-6"
        style={{ color: "var(--color-text-muted)" }}
      >
        <p className="type-caption">
          &copy; {new Date().getFullYear()} {SITE_NAME} — তৈরি করেছেন morshedUX
        </p>

        <div className="flex items-center gap-1">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="footer-social-link flex items-center justify-center rounded-full transition-colors"
              style={{ width: "36px", height: "36px", color: "var(--color-text-muted)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
