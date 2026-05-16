import { Link } from "@tanstack/react-router";

export function SectionTitle({
  eyebrow,
  title,
  accent,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
}) {
  return (
    <div className="px-6 md:px-10 mb-10">
      {eyebrow && (
        <div className="font-marker text-hotpink text-2xl -rotate-2 mb-2">{eyebrow}</div>
      )}
      <h1 className="font-accent uppercase tracking-tighter leading-[0.85] text-6xl md:text-8xl lg:text-9xl">
        {title}
        {accent && <span className="block text-orange italic font-display normal-case ml-6 md:ml-16">{accent}</span>}
      </h1>
    </div>
  );
}

export function StickyNote({
  children,
  rotate = -2,
  color = "yellow",
  className = "",
}: {
  children: React.ReactNode;
  rotate?: number;
  color?: "yellow" | "pink" | "orange";
  className?: string;
}) {
  const bg =
    color === "pink"
      ? "bg-hotpink text-white"
      : color === "orange"
      ? "bg-orange text-white"
      : "bg-[oklch(0.95_0.12_92)] text-ink";
  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`paper-card p-4 ${bg} font-hand text-xl shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-marker text-lg text-ink/70 hover:text-hotpink transition-colors"
    >
      ← {label}
    </Link>
  );
}

export function Star({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L14 9 L21 9.5 L15.5 13.5 L17.5 21 L12 16.5 L6.5 21 L8.5 13.5 L3 9.5 L10 9 Z" />
    </svg>
  );
}

export function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M2 15 Q 15 2, 30 15 T 60 15 T 90 15 T 118 15" />
    </svg>
  );
}
