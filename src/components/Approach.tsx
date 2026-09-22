import { approach } from "../data/content";
import { Section } from "./ui";
import { Reveal } from "./Reveal";

export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-heading" variant="surface">
      {/* Asymmetric Header: 4 cols header, 8 cols content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-12 sm:mb-16">
        <div className="md:col-span-4">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium mb-3">
              02 · How I work
            </p>
            <h2
              id="approach-heading"
              className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-tight tracking-[-0.02em] text-ink"
            >
              Structured problem solving
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-8 flex items-end">
          <Reveal index={1}>
            <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-muted">
              {approach.intro}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Horizontal Numbered Timeline on Desktop, Vertical on Mobile */}
      <Reveal index={2}>
        <div className="relative">
          {/* Connecting line on desktop */}
          <div
            className="absolute top-5 left-0 right-0 hidden h-px bg-rule lg:block"
            aria-hidden="true"
          />

          <ol className="grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {approach.steps.map((step, i) => (
              <li
                key={step.name}
                className="relative flex flex-col pt-0 lg:pt-10 group"
              >
                {/* Number node */}
                <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-rule bg-paper font-mono text-sm font-semibold text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-body text-lg font-bold text-ink tracking-tight">
                    {step.name}
                  </h3>
                </div>

                <p className="mt-2 text-sm font-medium text-ink leading-snug">
                  {step.question}
                </p>

                <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                  {step.body}
                </p>

                {step.caption && (
                  <div className="mt-4 border-t border-rule/60 pt-2 font-mono text-[11px] text-accent font-medium">
                    {step.caption}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}
