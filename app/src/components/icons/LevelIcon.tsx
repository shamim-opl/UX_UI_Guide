// Small icon set for the Learn sidebar (Docspace-style redesign, 2026-09-10
// — see decisions.md). One icon per taxonomy level, grouped by theme rather
// than 19 fully bespoke glyphs — keeps the icon vocabulary readable instead
// of noisy. All 16x16, stroke-based, inherit currentColor.

type IconProps = { className?: string };

const base = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none" as const };
const stroke = { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function BookIcon(p: IconProps) {
  return (
    <svg {...base} {...p} aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" {...stroke} />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" {...stroke} />
    </svg>
  );
}
function BrainIcon(p: IconProps) {
  return (
    <svg {...base} {...p} aria-hidden="true">
      <path
        d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.83V15a3 3 0 0 0 3 3 3 3 0 0 0 6 0 3 3 0 0 0 3-3v-2.17A3 3 0 0 0 16 7a3 3 0 0 0-3-3 3 3 0 0 0-2 .78A3 3 0 0 0 9 4Z"
        {...stroke}
      />
    </svg>
  );
}
function CompassIcon(p: IconProps) {
  return (
    <svg {...base} {...p} aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M14.5 9.5 13 13l-3.5 1.5L11 11l3.5-1.5Z" {...stroke} />
    </svg>
  );
}
function LayersIcon(p: IconProps) {
  return (
    <svg {...base} {...p} aria-hidden="true">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" {...stroke} />
      <path d="m3 13 9 5 9-5" {...stroke} />
    </svg>
  );
}
function CheckCircleIcon(p: IconProps) {
  return (
    <svg {...base} {...p} aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="m8.5 12 2.5 2.5 4.5-5" {...stroke} />
    </svg>
  );
}
function GridIcon(p: IconProps) {
  return (
    <svg {...base} {...p} aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" {...stroke} />
      <rect x="13" y="3" width="8" height="8" rx="1.5" {...stroke} />
      <rect x="3" y="13" width="8" height="8" rx="1.5" {...stroke} />
      <rect x="13" y="13" width="8" height="8" rx="1.5" {...stroke} />
    </svg>
  );
}
function SparkleIcon(p: IconProps) {
  return (
    <svg {...base} {...p} aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" {...stroke} />
      <path d="m7 7 2.5 2.5M14.5 14.5 17 17M17 7l-2.5 2.5M9.5 14.5 7 17" {...stroke} />
    </svg>
  );
}

// One icon per level id, grouped thematically.
const ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  "00": BookIcon,
  "01": LayersIcon,
  "02": BrainIcon,
  "03": CompassIcon,
  "04": CompassIcon,
  "05": GridIcon,
  "06": LayersIcon,
  "07": LayersIcon,
  "08": GridIcon,
  "09": CheckCircleIcon,
  "10": CheckCircleIcon,
  "11": GridIcon,
  "12": GridIcon,
  "13": CompassIcon,
  "14": CompassIcon,
  "15": LayersIcon,
  "16": SparkleIcon,
  "17": SparkleIcon,
  "18": SparkleIcon,
};

export default function LevelIcon({ levelId, className }: { levelId: string; className?: string }) {
  const Icon = ICONS[levelId] ?? BookIcon;
  return <Icon className={className} />;
}
