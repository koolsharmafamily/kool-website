import { experience, site } from "../data/content";
import { Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";
import { DownloadIcon } from "./Icons";

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <SectionHeading
        id="experience-heading"
        kicker="Track record"
        title="Experience"
        lede="One line each — the resume has the detail. What matters here is the range: advisory, financial services, B2B SaaS, and a venture I ran myself."
      />

      <Reveal as="ul" className="list-none border-t border-rule p-0">
        {experience.map((role, i) => (
          <Reveal
            as="li"
            key={`${role.org}-${role.title}`}
            index={Math.min(i, 6)}
            className="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-rule py-4 sm:grid-cols-[1fr_auto] sm:items-baseline"
          >
            <div className="min-w-0">
              <h3 className="text-[1.02rem] font-semibold">
                {role.title}
                <span className="font-normal text-ink-muted"> · {role.org}</span>
              </h3>
              <p className="mt-1 text-[0.875rem] leading-snug text-ink-muted">
                {role.shows}
              </p>
            </div>
            <p className="text-[0.82rem] tabular-nums text-ink-soft sm:text-right">
              {role.dates}
              <span className="block sm:mt-0.5">{role.location}</span>
            </p>
          </Reveal>
        ))}
      </Reveal>

      <Reveal className="mt-8">
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 text-[0.95rem] font-semibold text-accent hover:underline"
        >
          <DownloadIcon className="h-4 w-4" />
          Full detail in the resume (PDF)
        </a>
      </Reveal>
    </Section>
  );
}
