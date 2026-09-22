import { Link, useLocation } from "wouter";
import { caseStudies } from "../data/caseStudies";
import { Section, StatusBadge, MonoTags } from "./ui";
import { Reveal } from "./Reveal";
import { CaseCover } from "./CaseCovers";

export function Work() {
  const [, setLocation] = useLocation();
  const [featured, second, third, ...indexStudies] = caseStudies;

  return (
    <Section id="work" labelledBy="work-heading" variant="paper">

      {/* Asymmetric Header: 4 cols header, 8 cols intro */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-12 sm:mb-16">
        <div className="md:col-span-4">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium mb-3">
              01 · Selected Work
            </p>
            <h2
              id="work-heading"
              className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-tight tracking-[-0.02em] text-ink"
            >
              Case studies
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-8 flex items-end">
          <Reveal index={1}>
            <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-muted">
              Structured reviews of enterprise workflows, automated pipelines, and system architectures delivered across finance, operations, and logistics.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Featured Flagship Case: AdLens AI (Full width 7/5 split) */}
      <Reveal className="mb-8">
        <Link
          href={`/work/${featured.slug}`}
          className="group hover-card block overflow-hidden border border-rule bg-surface"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="flex flex-col justify-between p-5 sm:p-10 lg:col-span-7">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-accent">
                    {featured.caseNumber}
                  </span>
                  <StatusBadge status={featured.status} />
                  <span className="text-xs text-ink-muted">
                    {featured.industry}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-normal text-ink tracking-tight group-hover:text-accent transition-colors">
                  {featured.title}
                </h3>

                <p className="mt-3 text-base text-ink-muted leading-relaxed">
                  {featured.subtitle}
                </p>

                <p className="mt-4 text-sm text-ink-muted/90 line-clamp-2 leading-relaxed">
                  {featured.cardProblem}
                </p>
              </div>

              <div className="mt-8 border-t border-rule pt-6 flex flex-wrap items-center justify-between gap-4">
                <MonoTags tags={featured.tags.slice(0, 3)} />

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  <span>Read case study</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </div>

            <div className="h-64 sm:h-72 lg:h-auto lg:col-span-5 bg-ink overflow-hidden border-t lg:border-t-0 lg:border-l border-rule">
              <CaseCover slug={featured.slug} />
            </div>
          </div>
        </Link>
      </Reveal>

      {/* Next Two Flagship Cases: Half-width cards (6/6 split) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {[second, third].map((study, idx) => (
          <Reveal key={study.slug} index={idx + 1}>
            <Link
              href={`/work/${study.slug}`}
              className="group hover-card flex h-full flex-col justify-between overflow-hidden border border-rule bg-surface"
            >
              <div>
                <div className="h-52 bg-ink border-b border-rule overflow-hidden">
                  <CaseCover slug={study.slug} />
                </div>

                <div className="p-5 sm:p-8">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-accent">
                      {study.caseNumber}
                    </span>
                    <StatusBadge status={study.status} />
                    <span className="text-xs text-ink-muted">
                      {study.industry}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-normal text-ink tracking-tight group-hover:text-accent transition-colors">
                    {study.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-ink-muted leading-relaxed">
                    {study.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-8 pt-0 border-t border-rule/60 mt-4 flex flex-wrap items-center justify-between gap-3">
                <MonoTags tags={study.tags.slice(0, 3)} />
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                  <span>Read case</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Index Table for remaining 5 case studies */}
      <Reveal index={3} className="mt-12">
        <div className="border-t border-rule pt-8 mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium">
              Report Index
            </span>
            <h3 className="font-display text-2xl text-ink mt-1">Additional Case Studies</h3>
          </div>
          <p className="font-mono text-xs text-ink-muted">
            5 projects · Prototype to production
          </p>
        </div>

        {/* Desktop Data Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: "12%" }}>Case ID</th>
                <th style={{ width: "42%" }}>Project Title</th>
                <th style={{ width: "22%" }}>Domain</th>
                <th style={{ width: "18%" }}>Status</th>
                <th style={{ width: "6%", textAlign: "right" }}></th>
              </tr>
            </thead>
            <tbody>
              {indexStudies.map((study) => (
                <tr
                  key={study.slug}
                  onClick={() => {
                    setLocation(`/work/${study.slug}`);
                  }}
                  className="cursor-pointer group/row"
                >
                  <td className="font-mono text-xs font-semibold text-accent">
                    {study.caseNumber}
                  </td>
                  <td>
                    <Link
                      href={`/work/${study.slug}`}
                      className="font-medium text-ink hover:text-accent transition-colors block"
                    >
                      {study.title}
                    </Link>
                    <span className="text-xs text-ink-muted block mt-0.5 sm:hidden">
                      {study.subtitle}
                    </span>
                  </td>
                  <td className="text-sm text-ink-muted">{study.industry}</td>
                  <td>
                    <StatusBadge status={study.status} />
                  </td>
                  <td className="text-right text-ink-muted">
                    <span className="font-display text-base">&rarr;</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Clean list cards */}
        <div className="sm:hidden flex flex-col divide-y divide-rule border-y border-rule">
          {indexStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="py-4 flex flex-col gap-2 group active:bg-surface"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-accent">
                  {study.caseNumber}
                </span>
                <StatusBadge status={study.status} />
              </div>
              <p className="font-medium text-ink text-base group-hover:text-accent transition-colors">
                {study.title}
              </p>
              <div className="flex items-center justify-between text-xs text-ink-muted">
                <span>{study.industry}</span>
                <span className="text-accent font-medium">Read &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
