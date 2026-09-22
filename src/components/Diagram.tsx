import { Fragment, useState, type CSSProperties } from "react";
import type { Diagram as DiagramData, FlowStep } from "../data/types";
import { Reveal } from "./Reveal";

/**
 * Consulting Exhibit Styles
 * Nodes as clean boxes, 1.5px connectors, amber bottlenecks, teal automated steps.
 */

const toneStyles: Record<NonNullable<FlowStep["tone"]>, string> = {
  default: "border border-rule bg-surface text-ink",
  muted: "border border-rule bg-paper text-ink-muted",
  accent: "border border-accent bg-[#E6F0F0] text-accent font-medium",
  pain: "border border-dashed border-signal bg-[#FCF8F2] text-signal font-medium",
};

function Step({ step, index }: { step: FlowStep; index: number }) {
  const tone = step.tone ?? "default";
  return (
    <li
      style={{ "--i": index } as CSSProperties}
      className={`group/step relative flex min-w-0 flex-col justify-center rounded-[2px] px-3.5 py-3 sm:flex-1 sm:basis-[7rem] sm:max-w-[16rem] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs ${toneStyles[tone]}`}
    >
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          {tone === "pain" && (
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal shrink-0" aria-hidden="true" />
          )}
          {tone === "accent" && (
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
          )}
          <span className="text-[0.85rem] font-semibold leading-snug">{step.label}</span>
        </div>
        <span className="font-mono text-[9px] text-ink-muted/50 group-hover/step:text-accent group-hover/step:opacity-100 transition-colors shrink-0">
          {String(Math.floor(index / 2) + 1).padStart(2, "0")}
        </span>
      </div>
      {step.detail && (
        <span className={`mt-1 text-[0.75rem] leading-snug ${tone === "pain" ? "text-signal/90" : tone === "accent" ? "text-accent/90" : "text-ink-muted"}`}>
          {step.detail}
        </span>
      )}
      {tone === "pain" && <span className="sr-only"> (bottleneck step)</span>}
      {tone === "accent" && <span className="sr-only"> (automated step)</span>}
    </li>
  );
}


function Arrow({ index }: { index: number }) {
  return (
    <li
      aria-hidden="true"
      style={{ "--i": index } as CSSProperties}
      className="flex shrink-0 items-center justify-center self-center py-1 sm:px-1.5 sm:py-0"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="rotate-90 text-ink-muted sm:rotate-0"
      >
        <path
          d="M4 12h14m0 0l-5-5m5 5l-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
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
      className={`flex list-none flex-col items-stretch gap-2 p-0 sm:flex-row sm:flex-wrap sm:items-stretch ${
        compact ? "" : "sm:gap-y-3"
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
  exhibitNumber = "EXHIBIT",
  title,
  summary,
  caption,
  children,
  toggleControls,
}: {
  exhibitNumber?: string;
  title: string;
  summary: string;
  caption?: string;
  children: React.ReactNode;
  toggleControls?: React.ReactNode;
}) {
  return (
    <Reveal as="figure" className="my-8 min-w-0" steps>
      <div className="hover-card border border-rule bg-surface p-4 sm:p-8 rounded-[2px]">
        {/* Exhibit Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-semibold">
              {exhibitNumber}
            </span>
            <h4 className="font-body text-base font-medium text-ink mt-0.5">
              {title}
            </h4>
          </div>
          {toggleControls}
        </div>

        {/* The text equivalent for screen readers */}
        <figcaption className="sr-only">{summary}</figcaption>

        {/* Diagram Canvas */}
        <div className="w-full">{children}</div>

        {/* Footnote / Source Line */}
        {caption && (
          <div className="mt-6 border-t border-rule pt-3 text-[11px] font-mono text-ink-muted">
            <span className="uppercase text-ink font-semibold">Note: </span>
            {caption}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function Diagram({
  data,
  exhibitNumber = "EXHIBIT",
}: {
  data: DiagramData;
  exhibitNumber?: string;
}) {
  const [toggleState, setToggleState] = useState<"both" | "before" | "after">("both");

  if (data.kind === "flow") {
    return (
      <Frame
        exhibitNumber={exhibitNumber}
        title={data.title}
        summary={data.summary}
        caption={data.caption}
      >
        <Flow steps={data.steps} />
      </Frame>
    );
  }

  if (data.kind === "beforeAfter") {
    return (
      <Frame
        exhibitNumber={exhibitNumber}
        title={data.title}
        summary={data.summary}
        caption={data.caption}
        toggleControls={
          <div className="grid grid-cols-3 w-full sm:w-auto sm:inline-flex rounded-[2px] border border-rule bg-paper p-0.5 font-mono text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => setToggleState("both")}
              className={`py-1.5 px-2 text-center rounded-[2px] transition-colors min-h-[36px] sm:min-h-0 flex items-center justify-center ${
                toggleState === "both"
                  ? "bg-ink text-paper font-semibold"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <span className="sm:hidden">Both</span>
              <span className="hidden sm:inline">Side-by-side</span>
            </button>
            <button
              type="button"
              onClick={() => setToggleState("before")}
              className={`py-1.5 px-2 text-center rounded-[2px] transition-colors min-h-[36px] sm:min-h-0 flex items-center justify-center ${
                toggleState === "before"
                  ? "bg-signal text-white font-semibold"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <span className="sm:hidden">Before</span>
              <span className="hidden sm:inline">Before (Manual)</span>
            </button>
            <button
              type="button"
              onClick={() => setToggleState("after")}
              className={`py-1.5 px-2 text-center rounded-[2px] transition-colors min-h-[36px] sm:min-h-0 flex items-center justify-center ${
                toggleState === "after"
                  ? "bg-accent text-white font-semibold"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <span className="sm:hidden">After</span>
              <span className="hidden sm:inline">After (Automated)</span>
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          {(toggleState === "both" || toggleState === "before") && (
            <div className="rounded-[2px] border border-rule/70 bg-paper/40 p-3 sm:p-4">
              <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-signal">
                  {data.before.label} · Baseline manual flow
                </span>
                <span className="font-mono text-[11px] text-signal font-medium">Bottlenecks marked in amber</span>
              </div>
              <Flow steps={data.before.steps} />
            </div>
          )}

          {(toggleState === "both" || toggleState === "after") && (
            <div className="rounded-[2px] border border-accent/20 bg-[#F0F7F7]/60 p-3 sm:p-4">
              <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  {data.after.label} · Automated target architecture
                </span>
                <span className="font-mono text-[11px] text-accent font-medium">Automated steps marked in teal</span>
              </div>
              <Flow steps={data.after.steps} />
            </div>
          )}
        </div>
      </Frame>
    );
  }

  if (data.kind === "stack") {
    return (
      <Frame
        exhibitNumber={exhibitNumber}
        title={data.title}
        summary={data.summary}
        caption={data.caption}
      >
        <ol data-steps="" className="list-none space-y-2.5 p-0">
          {data.layers.map((layer, i) => (
            <li
              key={layer.name}
              style={{ "--i": i } as CSSProperties}
              className="grid grid-cols-[2rem_1fr] items-start gap-3 rounded-[2px] border border-rule bg-paper/50 px-4 py-3 sm:grid-cols-[2.5rem_11rem_1fr] sm:items-center sm:gap-4"
            >
              <span
                aria-hidden="true"
                className="font-mono text-xs font-semibold text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-body text-sm font-semibold text-ink">{layer.name}</span>
              <span className="col-span-2 text-xs leading-relaxed text-ink-muted sm:col-span-1">
                {layer.body}
              </span>
            </li>
          ))}
        </ol>
      </Frame>
    );
  }

  // Hub Architecture
  return (
    <Frame
      exhibitNumber={exhibitNumber}
      title={data.title}
      summary={data.summary}
      caption={data.caption}
    >
      <div
        data-steps=""
        className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)_auto_minmax(0,1fr)]"
      >
        <ul className="list-none space-y-2 p-0" style={{ "--i": 0 } as CSSProperties}>
          {data.inputs.map((input) => (
            <li
              key={input}
              className="rounded-[2px] border border-rule bg-paper px-3.5 py-2.5 font-mono text-xs text-ink font-medium"
            >
              {input}
            </li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="flex justify-center lg:block text-ink-muted"
          style={{ "--i": 1 } as CSSProperties}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="rotate-90 lg:rotate-0">
            <path
              d="M4 12h14m0 0l-5-5m5 5l-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          style={{ "--i": 2 } as CSSProperties}
          className="rounded-[2px] border border-accent bg-[#E6F0F0] px-5 py-4"
        >
          <p className="font-body text-sm font-bold text-accent">
            {data.hub.label}
          </p>
          {data.hub.detail && (
            <p className="mt-1 font-mono text-xs text-ink-muted leading-relaxed">
              {data.hub.detail}
            </p>
          )}
        </div>

        <div
          aria-hidden="true"
          className="flex justify-center lg:block text-ink-muted"
          style={{ "--i": 3 } as CSSProperties}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="rotate-90 lg:rotate-0">
            <path
              d="M4 12h14m0 0l-5-5m5 5l-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <ul className="list-none space-y-2 p-0" style={{ "--i": 4 } as CSSProperties}>
          {data.outputs.map((output) => (
            <li
              key={output}
              className="rounded-[2px] border border-rule bg-paper px-3.5 py-2.5 font-mono text-xs text-ink font-medium"
            >
              {output}
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}
