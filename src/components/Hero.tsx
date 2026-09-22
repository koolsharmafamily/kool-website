import { hero, proofPoints, site } from "../data/content";
import { Container } from "./ui";
import { Reveal } from "./Reveal";
import { HeroExhibit } from "./HeroExhibit";
import { LinkedInIcon, MailIcon, GitHubIcon } from "./Icons";

export function Hero() {
  return (
    <section id="top" className="pt-10 pb-16 sm:pt-16 sm:pb-24">
      <Container>
        {/* 7/5 Grid Split */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: 7 Columns */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-accent font-medium">
                {hero.kicker}
              </p>
              <h1 className="font-display text-[clamp(2rem,4vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
                {hero.value}
              </h1>
            </Reveal>

            <Reveal index={1}>
              <p className="mt-6 max-w-[58ch] text-[1.125rem] leading-relaxed text-ink-muted">
                {hero.sub}
              </p>
            </Reveal>

            <Reveal index={2} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#work"
                className="btn btn-primary"
              >
                View the work
              </a>



              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[44px] text-[14px] font-medium text-ink hover:text-accent transition-colors"
              >
                <span>Download resume</span>
                <span aria-hidden="true">&rarr;</span>
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>

              <div className="mx-1 hidden h-5 w-px bg-rule sm:block" aria-hidden="true" />

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="grid h-11 w-11 place-items-center rounded-[2px] border border-rule bg-surface text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>

                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="grid h-11 w-11 place-items-center rounded-[2px] border border-rule bg-surface text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <GitHubIcon className="h-5 w-5" />
                </a>

                <a
                  href={`mailto:${site.email}`}
                  aria-label={`Email ${site.email}`}
                  className="grid h-11 w-11 place-items-center rounded-[2px] border border-rule bg-surface text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <MailIcon className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: 5 Columns Signature Visual */}
          <div className="lg:col-span-5">
            <Reveal index={2}>
              <HeroExhibit />
            </Reveal>
          </div>
        </div>

        {/* Logo Wordmark Strip */}
        <div className="mt-16 sm:mt-24 border-t border-rule pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted shrink-0">
              Experience across
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-ink-muted">
              {hero.trustedBy.map((org, i) => (
                <span key={org} className="inline-flex items-center gap-6">
                  <span className="hover:text-ink transition-colors cursor-default">{org}</span>
                  {i < hero.trustedBy.length - 1 && (
                    <span className="text-rule hidden sm:inline" aria-hidden="true">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProofItem({
  value,
  label,
  source,
  showHairline = true,
}: {
  value: string;
  label: string;
  source: string;
  showHairline?: boolean;
}) {
  return (
    <div className="relative flex-1 py-4 sm:py-2">
      <div className="flex flex-col">
        <span className="font-display text-[clamp(2.5rem,4.5vw,3.75rem)] font-normal leading-none text-signal">
          {value}
        </span>
        <span className="mt-3 font-body text-sm font-medium text-paper">
          {label}
        </span>
        <span className="mt-1 font-mono text-[11px] text-[#A0ABB5]">
          {source}
        </span>
      </div>
      {showHairline && (
        <div
          className="absolute right-0 top-2 bottom-2 hidden w-px bg-[#203047] lg:block"
          aria-hidden="true"
        />
      )}
    </div>
  );
}


export function ProofStrip() {
  return (
    <section
      aria-label="Key delivery metrics"
      className="border-y border-[#203047] bg-ink text-paper py-12 sm:py-16"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {proofPoints.map((point, i) => (
            <ProofItem
              key={point.label}
              value={point.value}
              label={point.label}
              source={point.source}
              showHairline={i < proofPoints.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
