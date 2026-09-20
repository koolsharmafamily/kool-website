import { experience, site } from "../data/content";
import { Section } from "./ui";
import { Reveal } from "./Reveal";
import { DownloadIcon } from "./Icons";

// Helper to generate a 2-letter monogram badge for company
function getInitials(org: string): string {
  if (org.includes("Grant Thornton")) return "GT";
  if (org.includes("DSP")) return "DSP";
  if (org.includes("Publicis")) return "PS";
  if (org.includes("TrakIT")) return "TK";
  if (org.includes("Kool")) return "KK";
  if (org.includes("Elite")) return "EA";
  return org.slice(0, 2).toUpperCase();
}

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-heading" variant="surface">
      {/* Asymmetric Header: 4 cols header, 8 cols content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-12 sm:mb-16">
        <div className="md:col-span-4">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium mb-3">
              04 · Track Record
            </p>
            <h2
              id="experience-heading"
              className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-tight tracking-[-0.02em] text-ink"
            >
              Experience
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-8 flex items-end">
          <Reveal index={1}>
            <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-muted">
              Professional engagements across advisory, asset management, enterprise SaaS, and operational execution.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Timeline Table with Hairlines */}
      <Reveal index={2}>
        <div className="border-t border-b border-rule divide-y divide-rule">
          {experience.map((role) => (
            <div
              key={`${role.org}-${role.title}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5 sm:py-6 items-baseline transition-colors hover:bg-paper/50"
            >
              {/* Left Column: Mono Dates & Location */}
              <div className="md:col-span-3 flex flex-col justify-start">
                <span className="font-mono text-xs font-semibold text-accent tracking-wide">
                  {role.dates}
                </span>
                <span className="font-mono text-[11px] text-ink-muted mt-0.5">
                  {role.location}
                </span>
              </div>

              {/* Right Column: Initial Circle Badge + Role / Org + Outcome */}
              <div className="md:col-span-9 flex items-start gap-4">
                <div
                  aria-hidden="true"
                  className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule bg-paper font-mono text-[10px] font-bold text-ink"
                >
                  {getInitials(role.org)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-body text-base font-semibold text-ink">
                      {role.title}
                    </h3>
                    <span className="text-ink-muted font-normal">·</span>
                    <span className="font-body text-base font-medium text-ink-muted">
                      {role.org}
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">
                    {role.shows}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Link to Resume */}
        <div className="mt-8 flex items-center justify-between">
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-accent hover:underline text-sm"
          >
            <DownloadIcon className="h-4 w-4" />
            <span>Full detail in the resume (PDF)</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
