"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "semi-dark" | "dark";

// Light first — it's the default now (2026-09-10 redesign, see decisions.md).
// Semi-Dark stays available since the master spec mandates it as a theme
// even though it's no longer the default.
const THEMES: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "semi-dark", label: "Semi-Dark" },
  { value: "dark", label: "Dark" },
];

// Theme lives on the <html> element, outside React's own state — a
// tiny external store (useSyncExternalStore) is the correct tool for that,
// not useState+useEffect. It also fixes a real bug that pattern had: the
// server always renders as if theme were "light" (SSR has no localStorage),
// so an initial-client-render lazy useState that read the *real* persisted
// theme produced a hydration-mismatch crash whenever the two differed
// (found 2026-09-10 during the Docspace redesign, see decisions.md) —
// useSyncExternalStore's getServerSnapshot/getSnapshot split handles that
// by design. It also keeps multiple mounted toggles (header + mobile
// sheet) in sync with each other via the shared listener list below.
type Listener = () => void;
let listeners: Listener[] = [];
function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
function notify() {
  listeners.forEach((l) => l());
}

function getSnapshot(): Theme {
  return (document.documentElement.getAttribute("data-theme") as Theme | null) ?? "light";
}
function getServerSnapshot(): Theme {
  return "light";
}

function setGlobalTheme(next: Theme) {
  const root = document.documentElement;
  if (next === "light") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", next);
  }
  try {
    localStorage.setItem("uxui-theme", next);
  } catch {
    /* local storage unavailable — theme still applies for this session */
  }
  notify();
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function DimIcon() {
  // Semi-Dark: half-filled circle, distinct from the plain moon (Dark)
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" />
    </svg>
  );
}

const ICONS: Record<Theme, () => React.ReactElement> = {
  light: SunIcon,
  "semi-dark": DimIcon,
  dark: MoonIcon,
};

function useThemeState() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { theme, handleChange: setGlobalTheme };
}

/** Compact icon button that cycles Light → Semi-Dark → Dark → Light, for the header row (matches the reference site's single sun/moon icon). */
function CompactThemeToggle() {
  const { theme, handleChange } = useThemeState();
  const order: Theme[] = ["light", "semi-dark", "dark"];
  const next = order[(order.indexOf(theme) + 1) % order.length];
  const Icon = ICONS[theme];

  return (
    <button
      onClick={() => handleChange(next)}
      aria-label={`থিম বদলান (বর্তমান: ${THEMES.find((t) => t.value === theme)?.label})`}
      className="flex items-center justify-center rounded-full p-2 transition-colors"
      style={{ color: "var(--color-text-secondary)", border: "1px solid var(--color-border)" }}
      suppressHydrationWarning
    >
      <Icon />
    </button>
  );
}

/** Full three-way labeled control, for the mobile sheet / anywhere with room. */
function FullThemeToggle() {
  const { theme, handleChange } = useThemeState();

  return (
    <div
      role="group"
      aria-label="থিম নির্বাচন করুন"
      className="flex items-center gap-1 rounded-full p-1"
      style={{ background: "var(--color-surface-elevated)", border: "1px solid var(--color-border)" }}
      suppressHydrationWarning
    >
      {THEMES.map((t) => (
        <button
          key={t.value}
          aria-pressed={theme === t.value}
          onClick={() => handleChange(t.value)}
          className="type-label rounded-full px-3 py-1 transition-colors"
          style={{
            background: theme === t.value ? "var(--color-accent-strong)" : "transparent",
            color: theme === t.value ? "var(--color-on-accent)" : "var(--color-text-secondary)",
          }}
          suppressHydrationWarning
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  return compact ? <CompactThemeToggle /> : <FullThemeToggle />;
}
