import { contact, site } from "../data/content";
import { Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

/**
 * No contact form: it is one more thing that can fail silently, and a recruiter
 * will email anyway.
 */
export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading">
      <SectionHeading id="contact-heading" kicker="Get in touch" title={contact.line} />

      <Reveal className="max-w-[62ch] text-[1rem] leading-relaxed text-ink-muted">
        {contact.note}
      </Reveal>

      <Reveal index={1} className="mt-8 flex flex-wrap gap-3">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-accent-dark"
        >
          <MailIcon className="h-[18px] w-[18px]" />
          {site.email}
        </a>

        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-rule-strong bg-surface px-5 py-2.5 text-[0.95rem] font-semibold text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <LinkedInIcon className="h-[18px] w-[18px]" />
          LinkedIn
        </a>

        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-rule-strong bg-surface px-5 py-2.5 text-[0.95rem] font-semibold text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <GitHubIcon className="h-[18px] w-[18px]" />
          GitHub
        </a>

        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-rule-strong bg-surface px-5 py-2.5 text-[0.95rem] font-semibold text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <DownloadIcon className="h-[18px] w-[18px]" />
          Resume (PDF)
        </a>
      </Reveal>
    </Section>
  );
}
