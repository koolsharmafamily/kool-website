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
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Section({
  id,
  children,
  className = "",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-24 border-t border-rule py-16 sm:py-24 ${className}`}
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
}: {
  id?: string;
  title: string;
  lede?: string;
  kicker?: string;
}) {
  return (
    <Reveal className="mb-10 sm:mb-14">
      {kicker && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {kicker}
        </p>
      )}
      <h2 id={id} className="text-[1.75rem] leading-tight sm:text-[2.125rem]">
        {title}
      </h2>
      {lede && (
        <p className="mt-4 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-muted">
          {lede}
        </p>
      )}
    </Reveal>
  );
}

const statusStyles: Record<Status, string> = {
  "Delivered in role": "border-accent/30 bg-accent-wash text-accent",
  "Built prototype": "border-rule-strong bg-surface-sunk text-ink-muted",
  "Concept design": "border-rule-strong bg-surface text-ink-soft",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-rule bg-surface-sunk px-2.5 py-1 text-[0.8rem] text-ink-muted">
      {children}
    </span>
  );
}

/** A definition row: label on the left, value on the right. */
export function MetaRow({ label, value }: { label: string; value: ReactNode }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[minmax(0,7rem)_1fr] gap-x-4 gap-y-1 border-b border-rule py-3 last:border-b-0 max-[480px]:grid-cols-1">
      <dt className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">
        {label}
      </dt>
      <dd className="m-0 text-[0.95rem] text-ink">{value}</dd>
    </div>
  );
}
