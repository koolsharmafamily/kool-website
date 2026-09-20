import { useEffect, useState } from "react";
import { Link } from "wouter";
import { getAdjacent, getCaseStudy } from "../data/caseStudies";
import { Container, MetaRow, StatusBadge, MonoTags } from "../components/ui";
import { Reveal } from "../components/Reveal";
import { Diagram } from "../components/Diagram";
import { CaseCover } from "../components/CaseCovers";
import { ArrowIcon, GitHubIcon } from "../components/Icons";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { useScrollSpy } from "../lib/useScrollSpy";
import { NotFound } from "./NotFound";

function SectionBlock({
  number,
  title,
  id,
  children,
}: {
  number: string;
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 pt-12 sm:pt-16 border-t border-rule first:border-t-0 first:pt-0">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-semibold block mb-2">
          {number}
        </span>
        <h2 id={`${id}-heading`} className="font-display text-2xl sm:text-3xl text-ink font-normal tracking-tight mb-4">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <Reveal className="space-y-4 max-w-[68ch]">
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
  const [scrollProgress, setScrollProgress] = useState(0);

  // Table of Contents section IDs for scroll-spy
  const tocSections = [
    "context",
    "problem",
    "current-state",
    "approach",
    "solution",
    ...(study?.capabilityGrid ? ["capabilities"] : []),
    ...(study?.scorecard ? ["scorecard"] : []),
    "outcome",
    "limitations-risks",
    "learned",
  ];

  const activeSection = useScrollSpy(tocSections);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  // Track reading progress for the top 2px teal bar
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        const current = window.scrollY;
        setScrollProgress(Math.min(Math.max((current / total) * 100, 0), 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  useDocumentMeta({
    title: study
      ? `${study.title} | ${study.caseNumber} | Kulvir Sharma`
      : "Not found | Kulvir Sharma",
    description: study ? study.cardProblem : "Page not found.",
    path: `/work/${slug}`,
  });

  if (!study) return <NotFound />;

  return (
    <article className="pb-24 bg-paper min-h-screen">
      {/* 2px Teal Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-accent z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* 1. Header & Title Block */}
      <header className="border-b border-rule bg-surface pt-10 pb-12 sm:pt-14 sm:pb-16">
        <Container>
          <Reveal>
            {/* Top Bar: Back Link + Case ID */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <Link
                href="/#work"
                className="inline-flex min-h-[40px] items-center gap-2 font-mono text-xs font-semibold text-accent hover:underline"
              >
                <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
                <span>All Case Studies</span>
              </Link>

              <span className="font-mono text-xs font-bold text-accent tracking-widest">
                {study.caseNumber}
              </span>
            </div>

            {/* Status & Industry */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <StatusBadge status={study.status} />
              <span className="font-mono text-xs text-ink-muted">
                {study.industry}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-ink max-w-[28ch]">
              {study.title}
            </h1>

            <p className="mt-4 max-w-[64ch] text-lg sm:text-xl font-normal leading-relaxed text-ink-muted">
              {study.subtitle}
            </p>

            {/* Full-width Signature Cover Visual */}
            <div className="mt-10 h-64 sm:h-80 lg:h-96 w-full rounded-[2px] overflow-hidden border border-rule bg-ink">
              <CaseCover slug={study.slug} />
            </div>
          </Reveal>
        </Container>
      </header>

      {/* Main Content Area */}
      <Container className="pt-12 sm:pt-16">
        {/* Executive Summary Box (McKinsey SCR Framework) */}
        {study.scr && (
          <Reveal className="mb-14">
            <div className="hover-card border border-rule bg-surface p-6 sm:p-8 rounded-[2px]">
              <div className="mb-5 pb-3 border-b border-rule flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-semibold">
                  Executive Summary · SCR Framework
                </span>
                <span className="font-mono text-[11px] text-ink-muted">
                  Situation · Complication · Resolution
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="font-mono text-xs uppercase text-ink font-semibold block mb-1.5">
                    01 · Situation
                  </span>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {study.scr.situation}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xs uppercase text-signal font-semibold block mb-1.5">
                    02 · Complication
                  </span>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {study.scr.complication}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xs uppercase text-accent font-semibold block mb-1.5">
                    03 · Resolution
                  </span>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {study.scr.resolution}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* 12-Column Grid: 7 cols body, 4 cols sticky sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Main 7 Columns Content */}
          <div className="lg:col-span-7 space-y-16">
            {/* 01. Context */}
            <SectionBlock id="context" number="01 · Background" title="Context">
              <Prose paragraphs={study.context} />
            </SectionBlock>

            {/* 02. Problem */}
            <SectionBlock id="problem" number="02 · Operational Friction" title="The Problem">
              <Prose paragraphs={study.problem} />

              {study.framingQuestion && (
                <Reveal className="my-6 border-l-2 border-accent pl-5 py-2">
                  <p className="font-display text-lg sm:text-xl text-ink leading-snug font-medium">
                    {study.framingQuestion}
                  </p>
                </Reveal>
              )}
            </SectionBlock>

            {/* 03. Current State */}
            <SectionBlock id="current-state" number="03 · Baseline" title="Current State Analysis">
              <Diagram data={study.currentState} exhibitNumber="EXHIBIT 1 · BASELINE ARCHITECTURE" />
            </SectionBlock>

            {/* 04. Approach */}
            <SectionBlock id="approach" number="04 · Execution" title="Method & Analysis">
              <ol className="mt-5 list-none space-y-6 p-0">
                {study.approach.map((item, i) => (
                  <Reveal
                    as="li"
                    key={item.title}
                    index={Math.min(i, 4)}
                    className="grid grid-cols-[2.5rem_1fr] gap-x-4 items-baseline"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs font-semibold text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-body text-base font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </SectionBlock>

            {/* 05. Solution / Future State */}
            <SectionBlock id="solution" number="05 · Implementation" title="Target Architecture & Solution">
              <Prose paragraphs={[study.solution.intro]} />
              <Diagram data={study.solution.diagram} exhibitNumber="EXHIBIT 2 · TARGET ARCHITECTURE" />
              {study.solution.extraDiagram && (
                <Diagram data={study.solution.extraDiagram} exhibitNumber="EXHIBIT 3 · SUBSYSTEM ARCHITECTURE" />
              )}

              {study.solution.highlights && (
                <Reveal as="ul" className="mt-6 list-none space-y-3 p-0 max-w-[68ch]">
                  {study.solution.highlights.map((h) => (
                    <li
                      key={h}
                      className="grid grid-cols-[1rem_1fr] gap-x-3 text-sm leading-relaxed text-ink-muted"
                    >
                      <span aria-hidden="true" className="pt-2 text-accent">
                        <span className="block h-1.5 w-1.5 rounded-full bg-current" />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </Reveal>
              )}
            </SectionBlock>

            {/* Capabilities (if present) */}
            {study.capabilityGrid && (
              <SectionBlock id="capabilities" number="05b · Systems" title="Core Capabilities">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {study.capabilityGrid.map((cap, i) => (
                    <Reveal
                      as="div"
                      key={cap.name}
                      index={Math.min(i, 5)}
                      className="border border-rule bg-surface p-4 rounded-[2px]"
                    >
                      <h3 className="font-body text-sm font-semibold text-ink">
                        {cap.name}
                      </h3>
                      <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                        {cap.body}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </SectionBlock>
            )}

            {/* Scorecard (if present) */}
            {study.scorecard && (
              <SectionBlock id="scorecard" number="05c · Evaluation" title="Scoring Matrix">
                <div className="border border-rule bg-surface p-6 rounded-[2px]">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {study.scorecard.criteria.map((c) => (
                      <div
                        key={c}
                        className="rounded-[2px] border border-rule bg-paper px-3 py-2 text-xs font-mono font-medium text-ink text-center"
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs italic font-mono text-ink-muted">
                    {study.scorecard.note}
                  </p>
                </div>
              </SectionBlock>
            )}

            {/* 06. Outcome */}
            <SectionBlock
              id="outcome"
              number="06 · Value Realization"
              title={study.outcome.kind === "measured" ? "Measured Outcome" : "Projected Impact"}
            >
              <Prose paragraphs={[study.outcome.intro]} />

              {study.outcome.items.length > 0 && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-b border-rule py-6">
                  {study.outcome.items.map((item, i) => (
                    <Reveal key={item.label} index={i} className="min-w-0">
                      {item.value && (
                        <span className="font-display text-3xl font-normal leading-none text-signal block">
                          {item.value}
                        </span>
                      )}
                      <span className="mt-2 block text-xs font-semibold text-ink leading-snug">
                        {item.label}
                      </span>
                      {item.source && (
                        <span className="mt-1 block font-mono text-[10px] text-ink-muted">
                          {item.source}
                        </span>
                      )}
                    </Reveal>
                  ))}
                </div>
              )}
            </SectionBlock>

            {/* 07. Limitations & Risks */}
            <SectionBlock id="limitations-risks" number="07 · Risk & Governance" title="Limitations & Constraints">
              {study.limitations && (
                <div className="mb-6">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-semibold mb-3">
                    Operational Boundaries
                  </h3>
                  <ul className="list-disc pl-4 space-y-2 text-sm text-ink-muted">
                    {study.limitations.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              )}

              {study.risks && study.risks.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-signal font-semibold mb-3">
                    Technical & Adoption Risks Managed
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {study.risks.map((risk, i) => (
                      <Reveal
                        as="div"
                        key={risk.title}
                        index={Math.min(i, 4)}
                        className="border border-rule bg-surface p-4 rounded-[2px]"
                      >
                        <h4 className="font-body text-xs font-semibold text-ink">
                          {risk.title}
                        </h4>
                        <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                          {risk.body}
                        </p>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
            </SectionBlock>

            {/* 08. What I learned */}
            <SectionBlock id="learned" number="08 · Reflection" title="Takeaways & Next Steps">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold mb-3">
                    Key Lessons
                  </h3>
                  <ul className="space-y-3 list-none p-0">
                    {study.learned.map((l) => (
                      <li key={l} className="text-xs text-ink-muted leading-relaxed flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-ink font-semibold mb-3">
                    Future Roadmap
                  </h3>
                  <ul className="space-y-3 list-none p-0">
                    {study.next.map((n) => (
                      <li key={n} className="text-xs text-ink-muted leading-relaxed flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal shrink-0 mt-1.5" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionBlock>
          </div>

          {/* Right 4 Columns: Sticky "At a Glance" Panel & Scroll-Spy TOC */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="sticky top-24 space-y-8">
              {/* Project Snapshot Card */}
              <div className="border border-rule bg-surface p-6 rounded-[2px] hover-card">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-semibold pb-3 border-b border-rule">
                  At a Glance
                </p>

                <dl className="mt-4 divide-y divide-rule/60 text-xs">
                  <MetaRow label="Case ID" value={study.caseNumber} />
                  <MetaRow label="Status" value={<StatusBadge status={study.status} />} />
                  <MetaRow label="Industry" value={study.industry} />
                  <MetaRow label="Role" value={study.role} />
                  <MetaRow label="Timeframe" value={study.timeframe} />
                </dl>

                {/* Stack Tags */}
                <div className="mt-5 border-t border-rule pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-2 font-semibold">
                    Core Technologies
                  </p>
                  <MonoTags tags={study.tools} />
                </div>

                {/* External Links */}
                {study.links && study.links.length > 0 && (
                  <div className="mt-5 border-t border-rule pt-4 space-y-2">
                    {study.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline w-full py-2 text-xs flex items-center justify-center gap-2"
                      >
                        <GitHubIcon className="h-3.5 w-3.5" />
                        <span>{link.label}</span>
                        <span className="text-[10px]">&nearr;</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Table of Contents with Scroll-Spy */}
              <div className="hidden lg:block border border-rule bg-surface p-6 rounded-[2px]">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-semibold mb-4">
                  Document Outline
                </p>
                <nav aria-label="Page Table of Contents">
                  <ul className="list-none space-y-2.5 p-0 text-xs font-mono">
                    {[
                      { id: "context", label: "01 · Context" },
                      { id: "problem", label: "02 · The Problem" },
                      { id: "current-state", label: "03 · Current State" },
                      { id: "approach", label: "04 · Approach" },
                      { id: "solution", label: "05 · Solution" },
                      ...(study.capabilityGrid ? [{ id: "capabilities", label: "05b · Capabilities" }] : []),
                      ...(study.scorecard ? [{ id: "scorecard", label: "05c · Scorecard" }] : []),
                      { id: "outcome", label: "06 · Outcome" },
                      { id: "limitations-risks", label: "07 · Limitations & Risks" },
                      { id: "learned", label: "08 · Takeaways" },
                    ].map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`transition-colors block py-0.5 ${
                            activeSection === item.id
                              ? "text-accent font-semibold pl-2 border-l-2 border-accent"
                              : "text-ink-muted hover:text-ink pl-2 border-l-2 border-transparent"
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>
        </div>

        {/* 11. Next & Previous Case Studies with Cover Thumbnails */}
        <nav
          aria-label="Adjacent case studies"
          className="mt-24 border-t border-rule pt-12 grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group hover-card flex flex-col justify-between overflow-hidden border border-rule bg-surface"
            >
              <div className="h-32 bg-ink border-b border-rule overflow-hidden">
                <CaseCover slug={prev.slug} />
              </div>
              <div className="p-5">
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
                  <ArrowIcon className="h-3 w-3 rotate-180" />
                  Previous Case
                </span>
                <h4 className="font-display text-lg text-ink font-normal mt-1 group-hover:text-accent transition-colors">
                  {prev.title}
                </h4>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group hover-card flex flex-col justify-between overflow-hidden border border-rule bg-surface text-right"
            >
              <div className="h-32 bg-ink border-b border-rule overflow-hidden">
                <CaseCover slug={next.slug} />
              </div>
              <div className="p-5">
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center justify-end gap-1.5">
                  Next Case
                  <ArrowIcon className="h-3 w-3" />
                </span>
                <h4 className="font-display text-lg text-ink font-normal mt-1 group-hover:text-accent transition-colors">
                  {next.title}
                </h4>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* Back to All Work */}
        <div className="mt-12 text-center">
          <Link
            href="/#work"
            className="btn btn-outline px-6 py-2.5"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            <span>Return to All Work</span>
          </Link>
        </div>
      </Container>
    </article>
  );
}
