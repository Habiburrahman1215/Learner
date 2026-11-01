"use client";

import React, { useEffect, useId, useRef, useState } from "react";

export const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

/* ============================================================
   Icons — a single stroke-based set, so the whole app ships with
   no icon font and no network request.
   ============================================================ */

const P: Record<string, string> = {
  snow: "M12 3v18M4.2 7.5 19.8 16.5M19.8 7.5 4.2 16.5M12 7l2.5-2.5M12 7 9.5 4.5M12 17l2.5 2.5M12 17l-2.5 2.5",
  math: "M4 7h6M7 4v6M14 5l6 6M20 5l-6 6M4 17h6M17 14v6",
  book: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 5.5v15",
  flask: "M9 3h6M10 3v6L5 19a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 19l-5-10V3M7.5 15h9",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z",
  globe2: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8",
  badge: "M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM8.5 13.5 7 22l5-2.5L17 22l-1.5-8.5",
  shield: "M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z",
  thermo: "M10 14V5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0zM12 9v6",
  gas: "M7 21V8a5 5 0 0 1 10 0v13M7 12h10M9 21h6",
  engine: "M6 9h9l3 3h2v5H3v-5h3zM9 9V6h5v3M6 17v3M18 17v3",
  bolt: "M13 2 4 14h6l-1 8 9-12h-6z",
  parts: "M10.5 6.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10.5 22.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM12 6.5v10M4 12H2M22 12h-2M10.5 12H6M18 12h-4",
  torch: "M12 2v6M9 8h6l1 4H8zM12 12v10M9 22h6",
  window: "M3 5h18v14H3zM12 5v14M3 12h18",
  split: "M4 3h16v7H4zM9 10v5a3 3 0 0 0 3 3h5M17 15v6",
  install: "M12 3v10M8 9l4 4 4-4M3 17v3h18v-3",
  team: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 21v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2M16 11a3 3 0 1 0 0-6M17 14h1a4 4 0 0 1 4 4v3",
  trophy: "M8 3h8v6a4 4 0 0 1-8 0zM8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3M10 17h4M12 13v4M8 21h8",
  hash: "M5 9h14M5 15h14M9 4 7 20M17 4l-2 16",
  function: "M6 20c3 0 4-2 5-6l2-9c1-3 3-3 5-3M7 12h8",
  shapes: "M12 3 3 20h18zM14 8h6v12h-6z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  pen: "M3 21l4-1 12-12-3-3L4 17zM15 5l3 3",
  quill: "M4 20s2-6 8-10 8-6 8-6-1 6-4 9-8 5-8 5zM4 20l4-4",
  cell: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  dna: "M5 3c0 6 14 6 14 12M19 3c0 6-14 6-14 12M5 21h.01M19 21h.01M8 6h8M8 18h8",
  leaf: "M4 20c0-9 6-15 16-16 0 10-6 15-14 15H4zM4 20c2-5 5-8 9-10",
  atom: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 12c6-4 8 3 3 4s-8-4-3-8 8 3 3 8M12 12c-4 6-8 3-6-2s7-4 9 1",
  wave: "M2 12c2-5 4-5 6 0s4 5 6 0 4-5 6 0M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0",
  gov: "M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6",
  scroll: "M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2zM6 3a2 2 0 0 0-2 2v2h4M9 8h7M9 12h7M9 16h4",
  coins: "M9 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM15 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM3 7v4M4 2v2",
  map: "M9 3 3 6v15l6-3 6 3 6-3V3l-6 3zM9 3v15M15 6v15",
  home: "M3 11l9-8 9 8v10H3zM9 21v-7h6v7",
  play: "M6 4l14 8-14 8z",
  cards: "M4 6h11a2 2 0 0 1 2 2v12H4zM9 3h9a2 2 0 0 1 2 2v11",
  chartBar: "M4 20h16M7 20v-6M12 20V8M17 20v-9",
  user: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  star: "M12 3l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18l-5.9 3 1.2-6.5L2.5 9.9 9.1 9z",
  check: "M4 12.5 9.5 18 20 6.5",
  x: "M5 5l14 14M19 5 5 19",
  chevron: "M9 5l7 7-7 7",
  flame: "M12 22c4 0 6.5-2.7 6.5-6.2 0-4.4-4-5.8-4-10.8-3 0-5.5 2.8-5.5 5.5 0 1.4.6 2.3.6 2.3S8 11.7 8 9.5c-1.6 1.9-2.5 3.9-2.5 6.3C5.5 19.3 8 22 12 22z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3.5 2",
  download: "M12 3v12M7 11l5 5 5-5M4 21h16",
  wifi: "M2 8.5a15 15 0 0 1 20 0M5.5 12a10 10 0 0 1 13 0M9 15.5a5 5 0 0 1 6 0M12 19h.01",
  wifiOff: "M2 3l20 18M8.6 8.6a15 15 0 0 1 13.4-.1M5.5 12a10 10 0 0 1 4-1.9M9 15.5a5 5 0 0 1 6 0M12 19h.01",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a7.9 7.9 0 0 0 .1-1 7.9 7.9 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a8 8 0 0 0-1.7-1L15 4h-4l-.3 2.6a8 8 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.9 7.9 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a8 8 0 0 0 1.7 1L11 20h4l.3-2.6a8 8 0 0 0 1.7-1l2.4 1 2-3.4z",
  lock: "M6 11h12v10H6zM9 11V7a3 3 0 0 1 6 0v4",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6",
  plus: "M12 5v14M5 12h14",
  arrowLeft: "M19 12H5M11 6l-6 6 6 6",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  sparkles: "M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  cpu: "M6 6h12v12H6zM10 10h4v4h-4zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4",
  layers: "M12 3 3 8l9 5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z",
};

export type IconName = keyof typeof P | string;

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.7,
  style,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  const d = P[name] ?? P.sparkles;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/* ============================================================
   Inline markdown (bold, italic, code) for stems and lesson text
   ============================================================ */

export function Inline({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) nodes.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith("`")) nodes.push(<code key={key++}>{tok.slice(1, -1)}</code>);
    else nodes.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

/* ============================================================
   Primitives
   ============================================================ */

export function ProgressRing({
  value,
  size = 64,
  stroke = 6,
  label,
  sub,
  tone = "brand",
  className,
}: {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  label?: React.ReactNode;
  sub?: string;
  tone?: "brand" | "lime" | "amber" | "rose" | "cyan";
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  const colors: Record<string, string> = {
    brand: "#8A8CFF",
    lime: "#B7F25C",
    amber: "#FFC24B",
    rose: "#FF7A8A",
    cyan: "#5EE7F0",
  };
  const id = useId();
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors[tone]} stopOpacity="0.95" />
            <stop offset="100%" stopColor={colors[tone]} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(148,163,184,0.16)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#g${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label ?? <span className="text-sm font-bold tabular-nums">{Math.round(v * 100)}</span>}
        {sub && <span className="text-[9px] uppercase tracking-widest text-ink-faint">{sub}</span>}
      </div>
    </div>
  );
}

export function Bar({
  value,
  tone = "brand",
  height = 6,
  className,
}: {
  value: number;
  tone?: "brand" | "lime" | "amber" | "rose" | "cyan";
  height?: number;
  className?: string;
}) {
  const bg: Record<string, string> = {
    brand: "bg-brand-400",
    lime: "bg-accent-lime",
    amber: "bg-accent-amber",
    rose: "bg-accent-rose",
    cyan: "bg-accent-cyan",
  };
  return (
    <div className={cn("w-full overflow-hidden rounded-full bg-surface-3", className)} style={{ height }}>
      <div
        className={cn("h-full rounded-full transition-[width] duration-700 ease-out", bg[tone])}
        style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
      />
    </div>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  size = "md",
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  size?: "sm" | "md";
}) {
  return (
    <div className="flex gap-1 rounded-2xl border border-line bg-surface-2/60 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "flex-1 rounded-xl font-semibold transition-all",
            size === "sm" ? "px-2.5 py-1.5 text-[12px]" : "px-3 py-2.5 text-[13px]",
            value === o.value ? "bg-brand-500/20 text-white shadow-[inset_0_0_0_1px_rgba(138,140,255,0.35)]" : "text-ink-muted hover:text-ink",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Chip({
  active,
  children,
  onClick,
  tone = "brand",
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  tone?: "brand" | "lime";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "tap shrink-0 rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-colors",
        active
          ? tone === "lime"
            ? "border-accent-lime/40 bg-accent-lime/12 text-accent-lime"
            : "border-brand-400/40 bg-brand-500/15 text-brand-200"
          : "border-line bg-surface-2/60 text-ink-muted hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function Stat({
  label,
  value,
  icon,
  tone = "brand",
  hint,
}: {
  label: string;
  value: React.ReactNode;
  icon?: IconName;
  tone?: "brand" | "lime" | "amber" | "rose" | "cyan";
  hint?: string;
}) {
  const ring: Record<string, string> = {
    brand: "text-brand-300 bg-brand-500/12",
    lime: "text-accent-lime bg-accent-lime/10",
    amber: "text-accent-amber bg-accent-amber/10",
    rose: "text-accent-rose bg-accent-rose/10",
    cyan: "text-accent-cyan bg-accent-cyan/10",
  };
  return (
    <div className="card-flat flex items-center gap-3 px-3.5 py-3">
      {icon && (
        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", ring[tone])}>
          <Icon name={icon} className="h-[18px] w-[18px]" />
        </span>
      )}
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">{label}</div>
        <div className="truncate text-[17px] font-semibold leading-tight tabular-nums">{value}</div>
        {hint && <div className="truncate text-[11px] text-ink-faint">{hint}</div>}
      </div>
    </div>
  );
}

export function SectionHeader({
  title,
  action,
  sub,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-[16px] font-semibold tracking-tight">{title}</h2>
        {sub && <p className="text-[12.5px] text-ink-faint">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Empty({ icon = "sparkles", title, body }: { icon?: IconName; title: string; body?: string }) {
  return (
    <div className="card flex flex-col items-center gap-2 px-6 py-10 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-3 text-ink-muted">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <p className="text-[15px] font-semibold">{title}</p>
      {body && <p className="max-w-xs text-[13px] leading-relaxed text-ink-muted">{body}</p>}
    </div>
  );
}

/* ============================================================
   Bottom sheet
   ============================================================ */

export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-lg animate-pop-in rounded-t-3xl border border-line bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-glow sm:rounded-3xl">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-surface-3 sm:hidden" />
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[17px] font-semibold">{title}</h3>
            <button className="btn-quiet" onClick={onClose} aria-label="Close">
              <Icon name="x" className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="max-h-[70dvh] overflow-y-auto">{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}

/* ============================================================
   Confetti — pure DOM, no dependency
   ============================================================ */

export function Confetti({ fire }: { fire: number }) {
  const [pieces, setPieces] = useState<{ id: number; x: number; d: number; c: string; s: number; r: number }[]>([]);
  useEffect(() => {
    if (!fire) return;
    const colors = ["#B7F25C", "#8A8CFF", "#FFC24B", "#5EE7F0", "#FF7A8A", "#ffffff"];
    const next = Array.from({ length: 42 }, (_, i) => ({
      id: fire * 1000 + i,
      x: Math.random() * 100,
      d: 0.7 + Math.random() * 0.9,
      c: colors[Math.floor(Math.random() * colors.length)],
      s: 5 + Math.random() * 7,
      r: Math.random() * 360,
    }));
    setPieces(next);
    const t = setTimeout(() => setPieces([]), 1900);
    return () => clearTimeout(t);
  }, [fire]);

  if (!pieces.length) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <style>{`@keyframes hlz-fall{0%{transform:translate3d(0,-10vh,0) rotate(0);opacity:1}100%{transform:translate3d(var(--dx),105vh,0) rotate(720deg);opacity:0}}`}</style>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.x}%`,
            width: p.s,
            height: p.s * 1.6,
            background: p.c,
            borderRadius: 2,
            position: "absolute",
            top: 0,
            ["--dx" as string]: `${(Math.random() - 0.5) * 22}vw`,
            transform: `rotate(${p.r}deg)`,
            animation: `hlz-fall ${p.d}s cubic-bezier(0.2,0.6,0.4,1) forwards`,
            animationDelay: `${Math.random() * 0.25}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   Charts
   ============================================================ */

export function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className={cn("flex h-12 items-end gap-1", className)}>
      {data.map((v, i) => (
        <div
          key={i}
          className={cn("flex-1 rounded-t-[3px] transition-all", v > 0 ? "bg-brand-400/70" : "bg-surface-3")}
          style={{ height: `${Math.max((v / max) * 100, 4)}%` }}
          title={`${v} XP`}
        />
      ))}
    </div>
  );
}

export function MasteryRadar({
  values,
  size = 220,
}: {
  values: { label: string; value: number }[];
  size?: number;
}) {
  const n = Math.max(values.length, 3);
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 30;
  const pt = (i: number, r: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  };
  const poly = values.map((v, i) => pt(i, R * Math.max(0.05, Math.min(1, v.value))).join(",")).join(" ");
  return (
    <svg width={size} height={size} className="mx-auto block">
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <polygon
          key={g}
          points={values.map((_, i) => pt(i, R * g).join(",")).join(" ")}
          fill="none"
          stroke="rgba(148,163,184,0.14)"
        />
      ))}
      {values.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(148,163,184,0.12)" />;
      })}
      <polygon points={poly} fill="rgba(138,140,255,0.28)" stroke="#B7F25C" strokeWidth="1.6" />
      {values.map((v, i) => {
        const [x, y] = pt(i, R + 16);
        return (
          <text
            key={v.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8.5"
            fill="#98A2B8"
            fontWeight={600}
          >
            {v.label.slice(0, 9)}
          </text>
        );
      })}
    </svg>
  );
}

/* ---------------- misc hooks ---------------- */

export function useCountUp(target: number, duration = 700) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(a + (target - a) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}
