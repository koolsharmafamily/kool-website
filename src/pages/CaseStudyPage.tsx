import { useEffect } from "react";
import { Link } from "wouter";
import { getAdjacent, getCaseStudy } from "../data/caseStudies";
import { Chip, Container, MetaRow, StatusBadge } from "../components/ui";
import { Reveal } from "../components/Reveal";
import { Diagram } from "../components/Diagram";
import { ArrowIcon } from "../components/Icons";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { NotFound } from "./NotFound";

function Block({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section aria-labelledby={id} className="mt-12 sm:mt-16">
      <Reveal>
        <h2 id={id} className="text-[1.4rem] sm:text-[1.6rem]">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <Reveal className="mt-4 max-w-[68ch] space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-[1rem] leading-relaxed text-ink-muted">
          {p}
        </p>
      ))}
    </Reveal>
  );
}

export function CaseStudyPage({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);
  const { prev, next } = getAdjacent(slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  useDocumentMeta({
    title: study
      ? `${study.title} — ${study.subtitle} | Kulvir Sharma`
      : "Not found | Kulvir Sharma",
    description: study ? study.cardProblem : "Page not found.",
    path: `/work/${slug}`,
  });

  if (!study) return <NotFound />;

  return (
    <article className="pb-16">
      {/* 1. Header */}
      <header className="border-b border-rule bg-surface-sunk py-10 sm:py-14">
        <Container>
          <Reveal>
            <Link
              href="/#work"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-[0.875rem] font-semibold text-accent hover:underline"
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
              All case studies
            </Link>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={study.status} />
            </div>

            <h1 className="mt-4 text-[2rem] leading-tight sm:text-[2.75rem]">
              {study.title}
            </h1>
            <p className="mt-3 max-w-[60ch] font-serif text-[1.15rem] leading-snug text-ink-muted sm:text-[1.35rem]">
              {study.subtitle}
            </p>

            <dl className="mt-7 max-w-[46rem]">
              <MetaRow label="Industry" value={study.industry} />
              <MetaRow label="Role" value={study.role} />
              <MetaRow label="Timeframe" value={study.timeframe} />
            </dl>

            <ul className="mt-5 flex list-none flex-wrap gap-1.5 p-0">
              {study.tags.map((tag) => (
                <li key={tag}>
                  <Chip>{tag}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </header>

      <Container>
        {/* 2. Context */}
        <Block id="context" title="Context">
          <Prose paragraphs={study.context} />
        </Block>

        {/* 3. Problem */}
        <Block id="problem" title="The problem">
          <Prose paragraphs={study.problem} />
          {study.framingQuestion && (
            <Reveal className="mt-6 max-w-[68ch] border-l-2 border-accent bg-accent-wash px-5 py-4">
              <p className="font-serif text-[1.1rem] leading-snug text-accent">
                {study.framingQuestion}
              </p>
            </Reveal>
          )}
        </Block>

        {/* 4. Current state */}
        <Block id="current-state" title="Current state">
          <Diagram data={study.currentState} />
        </Block>

        {/* 5. Approach */}
        <Block id="approach" title="Approach">
          <ol className="mt-5 list-none space-y-5 p-0">
            {study.approach.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                index={Math.min(i, 4)}
                className="grid max-w-[68ch] grid-cols-[2rem_1fr] gap-x-3"
              >
                <span
                  aria-hidden="true"
                  className="pt-0.5 text-[0.8rem] font-semibold tabular-nums text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.05rem]">{item.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Block>

        {/* 6. Solution / future state */}
        <Block id="solution" title="Solution">
          <Prose paragraphs={[study.solution.intro]} />
          <Diagram data={study.solution.diagram} />
          {study.solution.extraDiagram && <Diagram data={study.solution.extraDiagram} />}
          {study.solution.highlights && (
            <Reveal as="ul" className="mt-2 max-w-[68ch] list-none space-y-2.5 p-0">
              {study.solution.highlights.map((h) => (
                <li
                  key={h}
                  className="grid grid-cols-[1rem_1fr] gap-x-2.5 text-[0.95rem] leading-relaxed text-ink-muted"
                >
                  <span aria-hidden="true" className="pt-[0.45rem] text-accent">
                    <span className="block h-1 w-1 rounded-full bg-current" />
                  </span>
                  {h}
                </li>
              ))}
            </Reveal>
          )}
        </Block>

        {/* Flagship extras: capabilities, worked example, scorecard */}
        {study.capabilityGrid && (
          <Block id="capabilities" title="Capabilities">
            <ul className="mt-5 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {study.capabilityGrid.map((cap, i) => (
                <Reveal
                  as="li"
                  key={cap.name}
                  index={Math.min(i, 5)}
                  className="rounded-lg border border-rule bg-surface p-4"
                >
                  <h3 className="text-[0.98rem]">{cap.name}</h3>
                  <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-muted">
                    {cap.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </Block>
        )}

        {study.recommendation && (
          <Block id="example-output" title="A worked example">
            <Reveal className="mt-5 max-w-[42rem] overflow-hidden rounded-lg border border-rule bg-surface">
              <div className="flex items-center justify-between gap-3 border-b border-rule bg-surface-sunk px-5 py-3">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-ink-soft">
                  Recommendation
                </span>
                <span className="rounded-full border border-accent/30 bg-accent-wash px-2.5 py-0.5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-accent">
                  Priority: {study.recommendation.priority}
                </span>
              </div>
              <dl className="px-5 py-4">
                <MetaRow label="Problem" value={study.recommendation.problem} />
                <MetaRow label="Evidence" value={study.recommendation.evidence} />
                <MetaRow label="Recommend" value={study.recommendation.recommendation} />
              </dl>
            </Reveal>
          </Block>
        )}

        {study.scorecard && (
          <Block id="scorecard" title="Sample scorecard">
            <Reveal className="mt-5 max-w-[42rem]">
              <ul className="grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4">
                {study.scorecard.criteria.map((c) => (
                  <li
                    key={c}
                    className="rounded-md border border-rule bg-surface px-3 py-2.5 text-[0.85rem] font-medium text-ink"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.85rem] italic leading-relaxed text-ink-soft">
                {study.scorecard.note}
              </p>
            </Reveal>
          </Block>
        )}

        {/* 7. Tools and technology */}
        <Block id="tools" title="Tools and technology">
          <Reveal as="ul" className="mt-5 flex list-none flex-wrap gap-1.5 p-0">
            {study.tools.map((tool) => (
              <li key={tool}>
                <Chip>{tool}</Chip>
              </li>
            ))}
          </Reveal>
        </Block>

        {study.challenges && (
          <Block id="challenges" title="Technical challenges">
            <ul className="mt-5 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
              {study.challenges.map((c, i) => (
                <Reveal
                  as="li"
                  key={c.title}
                  index={Math.min(i, 4)}
                  className="rounded-lg border border-rule bg-surface p-4"
                >
                  <h3 className="text-[0.98rem]">{c.title}</h3>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-muted">
                    {c.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </Block>
        )}

        {/* 8. Outcome */}
        <Block
          id="outcome"
          title={study.outcome.kind === "measured" ? "Outcome" : "Expected impact"}
        >
          <Prose paragraphs={[study.outcome.intro]} />

          {study.outcome.items.length > 0 && (
            <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {study.outcome.items.map((item, i) => (
                <Reveal key={item.label} index={i} className="min-w-0">
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="m-0">
                    {item.value && (
                      <span className="block font-serif text-[1.9rem] font-bold leading-none text-accent">
                        {item.value}
                      </span>
                    )}
                    <span className="mt-2 block text-[0.9rem] leading-snug text-ink">
                      {item.label}
                    </span>
                    {item.source && (
                      <span className="mt-1 block text-[0.78rem] text-ink-soft">
                        {item.source}
                      </span>
                    )}
                  </dd>
                </Reveal>
              ))}
            </dl>
          )}

          {study.outcome.groups?.map((group, gi) => (
            <Reveal key={group.name} index={gi} className="mt-7 max-w-[68ch]">
              <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent">
                {group.name}
              </h3>
              <ul className="mt-3 list-none space-y-2 p-0">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1rem_1fr] gap-x-2.5 text-[0.95rem] leading-relaxed text-ink-muted"
                  >
                    <span aria-hidden="true" className="pt-[0.45rem] text-accent">
                      <span className="block h-1 w-1 rounded-full bg-current" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </Block>

        {study.limitations && (
          <Block id="limitations" title="Limitations">
            <Reveal as="ul" className="mt-4 max-w-[68ch] list-none space-y-2.5 p-0">
              {study.limitations.map((l) => (
                <li
                  key={l}
                  className="grid grid-cols-[1rem_1fr] gap-x-2.5 text-[0.95rem] leading-relaxed text-ink-muted"
                >
                  <span aria-hidden="true" className="pt-[0.45rem] text-accent">
                    <span className="block h-1 w-1 rounded-full bg-current" />
                  </span>
                  {l}
                </li>
              ))}
            </Reveal>
          </Block>
        )}

        {/* 9. Risks and considerations */}
        <Block id="risks" title="Risks and considerations">
          <ul className="mt-5 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {study.risks.map((risk, i) => (
              <Reveal
                as="li"
                key={risk.title}
                index={Math.min(i, 4)}
                className="rounded-lg border border-rule bg-surface p-4"
              >
                <h3 className="text-[0.98rem]">{risk.title}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-muted">
                  {risk.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </Block>

        {/* 10. What I learned / what I'd do next */}
        <Block id="learned" title="What I learned">
          <Reveal as="ul" className="mt-4 max-w-[68ch] list-none space-y-3 p-0">
            {study.learned.map((l) => (
              <li
                key={l}
                className="grid grid-cols-[1rem_1fr] gap-x-2.5 text-[0.95rem] leading-relaxed text-ink-muted"
              >
                <span aria-hidden="true" className="pt-[0.45rem] text-accent">
                  <span className="block h-1 w-1 rounded-full bg-current" />
                </span>
                {l}
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-8 max-w-[68ch]">
            <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-accent">
              What I would do next
            </h3>
            <ul className="mt-3 list-none space-y-2.5 p-0">
              {study.next.map((n) => (
                <li
                  key={n}
                  className="grid grid-cols-[1rem_1fr] gap-x-2.5 text-[0.95rem] leading-relaxed text-ink-muted"
                >
                  <span aria-hidden="true" className="pt-[0.45rem] text-accent">
                    <span className="block h-1 w-1 rounded-full bg-current" />
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </Block>

        {study.links && study.links.length > 0 && (
          <Block id="links" title="Links">
            <Reveal as="ul" className="mt-4 flex list-none flex-wrap gap-3 p-0">
              {study.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-rule-strong bg-surface px-5 py-2.5 text-[0.95rem] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </Reveal>
          </Block>
        )}

        {/* 11. Navigation */}
        <nav
          aria-label="Case study navigation"
          className="mt-16 grid grid-cols-1 gap-3 border-t border-rule pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group rounded-lg border border-rule bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <span className="flex items-center gap-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
                Previous
              </span>
              <span className="mt-1.5 block font-serif text-[1.05rem] font-semibold text-ink group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group rounded-lg border border-rule bg-surface p-4 text-right transition-colors hover:border-accent/40 sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                Next
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
              <span className="mt-1.5 block font-serif text-[1.05rem] font-semibold text-ink group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          )}
        </nav>

        <div className="mt-8">
          <Link
            href="/#work"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[0.95rem] font-semibold text-accent hover:underline"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            Back to all work
          </Link>
        </div>
      </Container>
    </article>
  );
}
