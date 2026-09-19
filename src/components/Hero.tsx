import { hero, proofPoints, site } from "../data/content";
import { Container } from "./ui";
import { Reveal } from "./Reveal";
import { DownloadIcon, LinkedInIcon, MailIcon } from "./Icons";

export function Hero() {
  return (
    <section id="top" className="pt-12 pb-14 sm:pt-20 sm:pb-20">
      <Container>
        <Reveal>
          <h1 className="text-[2.25rem] leading-[1.1] sm:text-[3.25rem]">{hero.name}</h1>
          <p className="mt-2 text-[1.15rem] font-semibold text-accent sm:text-[1.35rem]">
            {hero.role}
          </p>
        </Reveal>

        <Reveal index={1}>
          <p className="mt-6 max-w-[38ch] font-serif text-[1.3rem] leading-snug text-ink sm:text-[1.6rem]">
            {hero.value}
          </p>
        </Reveal>

        <Reveal index={2}>
          <p className="mt-5 max-w-[62ch] text-[1rem] leading-relaxed text-ink-muted">
            {hero.sub}
          </p>
        </Reveal>

        <Reveal index={3} className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("work")?.scrollIntoView({ block: "start" });
              history.replaceState(null, "", "/#work");
            }}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-accent px-5 py-2.5 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
          >
            View case studies
          </a>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-rule-strong bg-surface px-5 py-2.5 text-[0.95rem] font-semibold text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <DownloadIcon className="h-4 w-4" />
            Download resume (PDF)
          </a>

          <span className="mx-1 hidden h-6 w-px bg-rule sm:block" aria-hidden="true" />

          {/* Grouped so the two icons never split across lines on a narrow screen. */}
          <span className="flex gap-2">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-md border border-rule text-ink-muted transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
              <span className="sr-only">LinkedIn profile (opens in a new tab)</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="grid h-11 w-11 place-items-center rounded-md border border-rule text-ink-muted transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <MailIcon className="h-[18px] w-[18px]" />
              <span className="sr-only">Email {site.email}</span>
            </a>
          </span>
        </Reveal>
      </Container>
    </section>
  );
}

export function ProofStrip() {
  return (
    <section aria-label="Selected figures" className="border-y border-rule bg-surface-sunk">
      <Container className="py-8 sm:py-10">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
          {proofPoints.map((point, i) => (
            <Reveal key={point.label} index={i} className="min-w-0">
              <dt className="sr-only">{point.label}</dt>
              <dd className="m-0">
                <span className="block font-serif text-[1.9rem] font-bold leading-none text-accent sm:text-[2.35rem]">
                  {point.value}
                </span>
                <span className="mt-2 block text-[0.875rem] leading-snug text-ink">
                  {point.label}
                </span>
                {/* Every number is tied to where it came from. */}
                <span className="mt-1 block text-[0.78rem] leading-snug text-ink-soft">
                  {point.source}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
