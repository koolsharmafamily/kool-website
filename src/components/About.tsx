import { beyondWork, education, toolkit } from "../data/content";
import { Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <SectionHeading id="about-heading" kicker="Background" title="Education and development" />

      <Reveal className="rounded-lg border border-rule bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="text-[1.15rem]">{education.primary.qualification}</h3>
          <span className="text-[0.85rem] tabular-nums text-ink-soft">
            {education.primary.dates}
          </span>
        </div>
        <p className="mt-1 text-[0.95rem] text-ink-muted">{education.primary.institution}</p>

        <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
          {education.primary.scholarships.map((item) => (
            <li
              key={item}
              className="rounded-full border border-rule bg-surface-sunk px-3 py-1 text-[0.78rem] text-ink-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <ul className="mt-4 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
        {education.further.map((item, i) => (
          <Reveal
            as="li"
            key={item.qualification}
            index={i}
            className="rounded-lg border border-rule bg-surface p-5"
          >
            <h3 className="text-[1rem]">{item.qualification}</h3>
            <p className="mt-1 text-[0.9rem] text-ink-muted">{item.institution}</p>
            <p className="mt-1 text-[0.82rem] tabular-nums text-ink-soft">{item.dates}</p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-16">
        <SectionHeading title="Beyond work" />
        <Reveal className="max-w-[68ch]">
          <p className="text-[1rem] leading-relaxed text-ink">{beyondWork.body}</p>
          <p className="mt-4 text-[1rem] leading-relaxed text-ink-muted">
            {beyondWork.lesson}
          </p>
          <p className="mt-4 text-[1rem] leading-relaxed text-ink-muted">{beyondWork.extra}</p>
        </Reveal>
      </div>

      <div className="mt-16">
        <SectionHeading title="Toolkit" />
        <dl className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
          {toolkit.map((group, i) => (
            <Reveal key={group.group} index={i} className="min-w-0">
              <dt className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent">
                {group.group}
              </dt>
              <dd className="m-0 mt-2.5 text-[0.95rem] leading-relaxed text-ink-muted">
                {group.items.join(" · ")}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  );
}
