import { education, toolkit } from "../data/content";
import { Section } from "./ui";
import { Reveal } from "./Reveal";

/**
 * About & Foundation Component
 * Presents academic credentials, analytical toolkit, and high-performance leadership distinctions.
 */
export function About() {
  return (
    <Section id="about" labelledBy="about-heading" variant="paper">
      {/* 1. Header and Academic Foundation (05) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
        {/* Left Column: Heading and Narrative */}
        <div className="md:col-span-4">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium mb-3">
              05 · Academic Foundation
            </p>
            <h2
              id="about-heading"
              className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-tight tracking-[-0.02em] text-ink"
            >
              Education & credentials
            </h2>
            <p className="mt-5 text-sm text-ink-muted leading-relaxed">
              Combining a rigorous commercial foundation in finance and management from The University of Melbourne with hands-on systems architecture and automated workflow delivery.
            </p>
          </Reveal>
        </div>

        {/* Right Column: Clean Education List */}
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

              {/* Bulleted scholarships list */}
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

      {/* 2. Distinction & High Performance (06) */}
      <Reveal index={2} className="mb-16">
        <div className="hover-card border border-rule bg-surface p-7 sm:p-10">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-rule pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#9B5414] font-semibold">
                06 · High-Performance & Leadership
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-ink font-normal mt-1.5">
                Elite Athletics & Musical Direction
              </h3>
            </div>
            <span className="font-mono text-xs text-ink-muted">
              Execution Under Pressure · Active Listening
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Athletics */}
            <div className="p-5 bg-paper rounded-[2px] border border-rule flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#9B5414] font-semibold block mb-1">
                  International Athletics
                </span>
                <p className="font-display text-lg text-ink font-semibold">
                  Junior Asian Games & National Squash
                </p>
                <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                  Represented India at the Junior Asian Games; former India No. 2 and National Squash Champion; 3-time UniNationals Australia medallist.
                </p>
              </div>
              <p className="mt-4 text-xs text-ink font-medium border-t border-rule/60 pt-2.5">
                Consulting relevance: 15 years of elite competition taught me how to operate under intense pressure, maintain strict focus, and systematically coach teams to targets.
              </p>
            </div>

            {/* Music */}
            <div className="p-5 bg-paper rounded-[2px] border border-rule flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold block mb-1">
                  Musical Direction
                </span>
                <p className="font-display text-lg text-ink font-semibold">
                  Theory, Accompaniment & Ensemble
                </p>
                <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                  Music theory and piano accompaniment instructor; live rock band keyboardist and producer of independent cultural music events.
                </p>
              </div>
              <p className="mt-4 text-xs text-ink font-medium border-t border-rule/60 pt-2.5">
                Consulting relevance: Teaching complex harmonic theory to students and coordinating live ensemble players requires acute listening, real-time adaptation, and clear communication.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 3. Toolkit: 4 Plain Text Columns */}
      <div>
        <div className="mb-6 border-b border-rule pb-3 flex items-baseline justify-between">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium">
            Analytical & Technical Toolkit
          </h3>
          <span className="font-mono text-xs text-ink-muted hidden sm:inline">
            Methodologies, Data & Implementation Platforms
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
