import type { ReactNode } from "react";
import type { Status } from "../data/types";
import { Reveal } from "./Reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  labelledBy,
  variant = "paper",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  variant?: "paper" | "surface" | "dark";
}) {
  const variantStyles = {
    paper: "bg-paper text-ink border-b border-rule",
    surface: "bg-surface text-ink border-b border-rule",
    dark: "bg-ink text-paper",
  };

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-20 py-20 sm:py-28 transition-colors ${variantStyles[variant]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  title,
  lede,
  kicker,
  dark = false,
}: {
  id?: string;
  title: string;
  lede?: string;
  kicker?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-8">
      {kicker && (
        <p
          className={`mb-3 font-mono text-xs uppercase tracking-[0.12em] ${
            dark ? "text-signal" : "text-ink-muted"
          }`}
        >
          {kicker}
        </p>
      )}
      <h2
        id={id}
        className={`font-display text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.1] tracking-[-0.02em] ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-4 max-w-[45ch] text-[1.0625rem] leading-relaxed ${
            dark ? "text-[#A0ABB5]" : "text-ink-muted"
          }`}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  if (status === "Delivered in role") {
    return <span className="badge badge-teal">{status}</span>;
  }
  if (status === "Built prototype") {
    return <span className="badge badge-navy">{status}</span>;
  }
  return <span className="badge badge-concept">{status}</span>;
}

/** Plain mono tag row, separated by middots, avoiding rounded grey pills */
export function MonoTags({
  tags,
  className = "",
}: {
  tags: string[];
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted ${className}`}
    >
      {tags.join(" · ")}
    </p>
  );
}

/** Legacy Chip wrapper for backwards compatibility, styled with subtle mono aesthetic */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[2px] border border-rule bg-surface px-2 py-0.5 font-mono text-[11px] text-ink-muted">
      {children}
    </span>
  );
}

/** A definition row: label on the left, value on the right. */
export function MetaRow({
  label,
  value,
  dark = false,
}: {
  label: string;
  value: ReactNode;
  dark?: boolean;
}) {
  if (!value) return null;
  return (
    <div
      className={`grid grid-cols-[minmax(0,7.5rem)_1fr] gap-x-4 gap-y-1 border-b py-3 last:border-b-0 max-[480px]:grid-cols-1 ${
        dark ? "border-[#203047]" : "border-rule"
      }`}
    >
      <dt
        className={`font-mono text-xs uppercase tracking-[0.08em] ${
          dark ? "text-[#A0ABB5]" : "text-ink-muted"
        }`}
      >
        {label}
      </dt>
      <dd className={`m-0 text-[0.95rem] ${dark ? "text-paper" : "text-ink"}`}>
        {value}
      </dd>
    </div>
  );
}
