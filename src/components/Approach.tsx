import type { CSSProperties } from "react";
import { approach } from "../data/content";
import { Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

export function Approach() {
  return (
    <Section id="approach" labelledBy="approach-heading">
      <SectionHeading
        id="approach-heading"
        kicker="Method"
        title="How I approach problems"
        lede={approach.intro}
      />

      <Reveal steps className="min-w-0">
        <ol className="grid list-none grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule bg-rule p-0 md:grid-cols-5">
          {approach.steps.map((step, i) => (
            <li
              key={step.name}
              style={{ "--i": i } as CSSProperties}
              className="flex min-w-0 flex-col bg-surface p-5"
            >
              <span
                aria-hidden="true"
                className="text-[0.75rem] font-semibold tabular-nums text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-[1.05rem]">{step.name}</h3>
              <p className="mt-2 text-[0.85rem] font-semibold italic leading-snug text-accent">
                {step.question}
              </p>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
