import { beyondWork, education, toolkit } from "../data/content";
import { Section } from "./ui";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <Section id="about" labelledBy="about-heading" variant="paper">
      {/* 1. Header and Education Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
        {/* Left Column: Heading and Narrative */}
        <div className="md:col-span-4">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium mb-3">
              05 · Background
            </p>
            <h2
              id="about-heading"
              className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-tight tracking-[-0.02em] text-ink"
            >
              Education & foundation
            </h2>
            <p className="mt-6 text-sm text-ink-muted leading-relaxed">
              Combining a rigorous commercial foundation in finance and management from Melbourne with hands-on systems development and automated workflow architecture.
            </p>
          </Reveal>
        </div>

        {/* Right Column: Clean Education List (No card borders) */}
        <div className="md:col-span-8">
          <Reveal index={1} className="divide-y divide-rule border-t border-b border-rule">
            {/* Primary Degree */}
            <div className="py-6 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-body text-lg font-semibold text-ink">
                  {education.primary.qualification}
                </h3>
                <span className="font-mono text-xs text-accent font-medium">
                  {education.primary.dates}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-ink-muted">
                {education.primary.institution}
              </p>

              {/* Bulleted scholarships list (No chips) */}
              <div className="mt-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
                  Academic & Athletic Honours:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-xs text-ink-muted">
                  {education.primary.scholarships.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Further Education */}
            {education.further.map((item) => (
              <div key={item.qualification} className="py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-body text-base font-semibold text-ink">
                    {item.qualification}
                  </h3>
                  {item.dates && (
                    <span className="font-mono text-xs text-ink-muted">
                      {item.dates}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {item.institution}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* 2. Beyond Work: Standout Block for Elite Athletics & Music */}
      <Reveal index={2} className="mb-20">
        <div className="hover-card border border-rule bg-surface p-7 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-baseline">
            <div className="md:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium">
                Beyond Work
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal mt-2 leading-snug">
                Discipline, pressure, and communication
              </h3>
            </div>

            <div className="md:col-span-8 space-y-4">
              <p className="font-display text-lg sm:text-xl text-ink font-medium leading-snug">
                {beyondWork.body}
              </p>
              <p className="text-sm text-ink-muted leading-relaxed">
                {beyondWork.lesson}
              </p>
              <div className="border-t border-rule pt-4 text-xs text-ink-muted leading-relaxed">
                {beyondWork.extra}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 3. Toolkit: 4 Plain Text Columns */}
      <div>
        <div className="mb-8 border-b border-rule pb-4 flex items-baseline justify-between">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium">
            06 · Core Toolkit
          </h3>
          <span className="font-mono text-xs text-ink-muted hidden sm:inline">
            Technical & Analytical Competencies
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {toolkit.map((group, i) => (
            <Reveal key={group.group} index={i} className="min-w-0">
              <h4 className="font-mono text-xs uppercase tracking-[0.1em] text-ink font-semibold pb-2 border-b border-rule">
                {group.group}
              </h4>
              <ul className="mt-3 list-none space-y-2 p-0 text-sm text-ink-muted">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent/60" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
