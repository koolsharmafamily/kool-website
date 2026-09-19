import { Link } from "wouter";
import { caseStudies } from "../data/caseStudies";
import type { CaseStudy } from "../data/types";
import { Section, SectionHeading, StatusBadge, Chip } from "./ui";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./Icons";

function Card({
  study,
  featured = false,
  index,
}: {
  study: CaseStudy;
  featured?: boolean;
  index: number;
}) {
  return (
    <Reveal as="article" index={index} className="min-w-0">
      <Link
        href={`/work/${study.slug}`}
        className="group flex h-full flex-col rounded-lg border border-rule bg-surface p-5 transition-colors duration-200 hover:border-accent/40 sm:p-6 card-elevation"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={study.status} />
          <span className="text-[0.78rem] text-ink-soft">{study.industry}</span>
        </div>

        <h3
          className={`text-ink ${featured ? "text-[1.35rem] sm:text-[1.6rem]" : "text-[1.15rem]"}`}
        >
          {study.title}
        </h3>
        <p
          className={`mt-1.5 text-ink-muted ${
            featured ? "text-[1rem]" : "text-[0.9rem]"
          } leading-snug`}
        >
          {study.subtitle}
        </p>

        <p
          className={`mt-4 leading-relaxed text-ink-muted line-clamp-3 ${
            featured ? "text-[0.95rem]" : "text-[0.875rem]"
          }`}
        >
          {study.cardProblem}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {study.tags.slice(0, 4).map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>

        <span className="mt-5 inline-flex items-center gap-1.5 pt-1 text-[0.875rem] font-semibold text-accent">
          Read the case study
          <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}

export function Work() {
  const [first, second, ...rest] = caseStudies;

  return (
    <Section id="work" labelledBy="work-heading">
      <SectionHeading
        id="work-heading"
        kicker="Selected work"
        title="Case studies"
        lede="Each one states plainly whether it shipped, was prototyped, or is a design. Where I have real numbers I give them; where I do not, I list the measures I would track instead."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card study={first} featured index={0} />
        <Card study={second} featured index={1} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((study, i) => (
          <Card key={study.slug} study={study} index={i} />
        ))}
      </div>
    </Section>
  );
}
