import { Fragment, type CSSProperties } from "react";
import type { Diagram as DiagramData, FlowStep } from "../data/types";
import { Reveal } from "./Reveal";

/**
 * Diagrams are components, not screenshots: they stay sharp, respond to the
 * viewport, and are editable from the data file.
 *
 * Accessibility: each diagram is a <figure> carrying a text summary, so a
 * screen reader gets the explanation rather than a list of disconnected boxes.
 * Steps animate in sequence once, which is the one place motion is doing
 * explanatory work rather than decoration.
 */

const toneStyles: Record<NonNullable<FlowStep["tone"]>, string> = {
  default: "border-rule-strong bg-surface text-ink",
  muted: "border-rule bg-surface text-ink-soft",
  accent: "border-accent/35 bg-accent-wash text-accent",
  pain: "border-dashed border-rule-strong bg-surface-sunk text-ink-muted",
};

function Step({ step, index }: { step: FlowStep; index: number }) {
  const tone = step.tone ?? "default";
  return (
    <li
      style={{ "--i": index } as CSSProperties}
      // basis/grow are row-direction only: in the mobile column layout they
      // would set a 9rem *height* on every step and balloon the diagram.
      // max-width keeps a step that wraps onto its own line the same size as
      // its peers instead of stretching across the whole figure.
      className={`flex min-w-0 flex-col justify-center rounded-md border px-3 py-2.5 sm:flex-1 sm:basis-[6rem] sm:max-w-[15rem] ${toneStyles[tone]}`}
    >
      <span className="text-[0.85rem] font-semibold leading-snug">{step.label}</span>
      {step.detail && (
        <span className="mt-1 text-[0.75rem] leading-snug text-ink-soft">{step.detail}</span>
      )}
      {tone === "pain" && <span className="sr-only"> (manual step)</span>}
    </li>
  );
}

function Arrow({ index }: { index: number }) {
  return (
    <li
      aria-hidden="true"
      style={{ "--i": index } as CSSProperties}
      className="flex shrink-0 items-center justify-center self-center py-1 sm:px-1 sm:py-0"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        className="rotate-90 text-rule-strong sm:rotate-0"
      >
        <path
          d="M4 12h15m0 0l-5-5m5 5l-5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </li>
  );
}

function Flow({ steps, compact = false }: { steps: FlowStep[]; compact?: boolean }) {
  return (
    <ol
      data-steps=""
      className={`flex list-none flex-col items-stretch gap-1.5 p-0 sm:flex-row sm:flex-wrap sm:items-stretch ${
        compact ? "" : "sm:gap-y-2"
      }`}
    >
      {steps.map((step, i) => (
        <Fragment key={`${step.label}-${i}`}>
          <Step step={step} index={i * 2} />
          {i < steps.length - 1 && <Arrow index={i * 2 + 1} />}
        </Fragment>
      ))}
    </ol>
  );
}

function Frame({
  title,
  summary,
  caption,
  children,
}: {
  title: string;
  summary: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="figure" className="my-8 min-w-0" steps>
      <figcaption className="mb-4">
        <span className="block text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-ink-soft">
          {title}
        </span>
        {/* The text equivalent of the diagram, for anyone not seeing it. */}
        <span className="sr-only">{summary}</span>
      </figcaption>
      <div className="rounded-lg border border-rule bg-surface p-4 sm:p-6">{children}</div>
      {caption && (
        <p className="mt-3 max-w-[68ch] text-[0.875rem] leading-relaxed text-ink-soft">
          {caption}
        </p>
      )}
    </Reveal>
  );
}

export function Diagram({ data }: { data: DiagramData }) {
  if (data.kind === "flow") {
    return (
      <Frame title={data.title} summary={data.summary} caption={data.caption}>
        <Flow steps={data.steps} />
      </Frame>
    );
  }

  if (data.kind === "beforeAfter") {
    return (
      <Frame title={data.title} summary={data.summary} caption={data.caption}>
        <div className="space-y-5">
          {[data.before, data.after].map((side, i) => (
            <div key={side.label}>
              <p
                className={`mb-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] ${
                  i === 1 ? "text-accent" : "text-ink-soft"
                }`}
              >
                {side.label}
              </p>
              <Flow steps={side.steps} />
            </div>
          ))}
        </div>
      </Frame>
    );
  }

  if (data.kind === "stack") {
    return (
      <Frame title={data.title} summary={data.summary} caption={data.caption}>
        <ol data-steps="" className="list-none space-y-2 p-0">
          {data.layers.map((layer, i) => (
            <li
              key={layer.name}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[2rem_1fr] items-start gap-3 rounded-md border border-rule bg-surface-sunk px-3 py-3 sm:grid-cols-[2.5rem_11rem_1fr] sm:items-center sm:gap-4"
            >
              <span
                aria-hidden="true"
                className="text-[0.8rem] font-semibold tabular-nums text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.9rem] font-semibold text-ink">{layer.name}</span>
              <span className="col-span-2 text-[0.85rem] leading-snug text-ink-muted sm:col-span-1">
                {layer.body}
              </span>
            </li>
          ))}
        </ol>
      </Frame>
    );
  }

  // hub
  return (
    <Frame title={data.title} summary={data.summary} caption={data.caption}>
      <div
        data-steps=""
        className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.15fr)_auto_minmax(0,1fr)]"
      >
        <ul className="list-none space-y-2 p-0" style={{ "--i": 0 } as CSSProperties}>
          {data.inputs.map((input) => (
            <li
              key={input}
              className="rounded-md border border-rule bg-surface px-3 py-2.5 text-[0.85rem] font-semibold text-ink"
            >
              {input}
            </li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="flex justify-center lg:block"
          style={{ "--i": 1 } as CSSProperties}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="rotate-90 text-rule-strong lg:rotate-0">
            <path
              d="M4 12h15m0 0l-5-5m5 5l-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          style={{ "--i": 2 } as CSSProperties}
          className="rounded-md border border-accent/35 bg-accent-wash px-4 py-3.5"
        >
          <p className="text-[0.9rem] font-semibold leading-snug text-accent">
            {data.hub.label}
          </p>
          {data.hub.detail && (
            <p className="mt-1.5 text-[0.78rem] leading-snug text-ink-muted">
              {data.hub.detail}
            </p>
          )}
        </div>

        <div
          aria-hidden="true"
          className="flex justify-center lg:block"
          style={{ "--i": 3 } as CSSProperties}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="rotate-90 text-rule-strong lg:rotate-0">
            <path
              d="M4 12h15m0 0l-5-5m5 5l-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <ul className="list-none space-y-2 p-0" style={{ "--i": 4 } as CSSProperties}>
          {data.outputs.map((output) => (
            <li
              key={output}
              className="rounded-md border border-rule bg-surface px-3 py-2.5 text-[0.85rem] font-semibold text-ink"
            >
              {output}
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}
