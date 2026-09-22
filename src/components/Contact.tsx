import { useState } from "react";
import { contact, site } from "../data/content";
import { Container } from "./ui";
import { Reveal } from "./Reveal";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-[#203047] bg-ink text-paper py-14 sm:py-28"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Main Inquiry Column */}
          <div className="md:col-span-8">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-signal font-medium mb-4">
                07 · Contact
              </p>
              <h2
                id="contact-heading"
                className="font-display text-[clamp(1.85rem,6vw,4rem)] font-normal leading-[1.08] tracking-[-0.02em] text-paper mb-8"
              >
                Let's talk about the problem you're solving.
              </h2>
            </Reveal>

            <Reveal index={1}>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href={`mailto:${site.email}`}
                  className="font-display text-[clamp(1.2rem,2.5vw,2rem)] text-paper border-b-2 border-accent pb-1 hover:text-accent transition-colors break-all sm:break-normal"
                >
                  {site.email}
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-[2px] border border-[#203047] bg-[#142338] px-3.5 py-2 min-h-[44px] font-mono text-xs text-[#A0ABB5] transition-colors hover:border-accent hover:text-paper cursor-pointer"
                >
                  <MailIcon className="h-3.5 w-3.5" />
                  <span>{copied ? "Copied to clipboard!" : "Copy email"}</span>
                </button>
              </div>

              <p className="max-w-[54ch] text-sm leading-relaxed text-[#A0ABB5]">
                {contact.note}
              </p>

              {/* Roles and Locations */}
              <div className="mt-8 border-t border-[#203047] pt-6 max-w-[60ch]">
                <p className="font-mono text-xs uppercase tracking-wider text-signal mb-1">
                  Availability & Locations
                </p>
                <p className="text-xs text-[#A0ABB5] leading-relaxed">
                  Open to Business Analyst, Digital Transformation, and Technology Consulting roles across Melbourne, Sydney, Mumbai, Delhi NCR, and Bangalore.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4 flex flex-col justify-end gap-3 border-t md:border-t-0 md:border-l border-[#203047] pt-8 md:pt-0 md:pl-8">
            <Reveal index={2} className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-wider text-[#A0ABB5] mb-2">
                External Profiles
              </p>

              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2.5 min-h-[44px] border-b border-[#203047] text-sm text-paper hover:text-accent transition-colors"
              >
                <span className="flex items-center gap-2">
                  <LinkedInIcon className="h-4 w-4 text-[#A0ABB5]" />
                  LinkedIn Profile
                </span>
                <span className="font-mono text-xs text-[#A0ABB5]">&nearr;</span>
              </a>

              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2.5 min-h-[44px] border-b border-[#203047] text-sm text-paper hover:text-accent transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GitHubIcon className="h-4 w-4 text-[#A0ABB5]" />
                  GitHub Repository
                </span>
                <span className="font-mono text-xs text-[#A0ABB5]">&nearr;</span>
              </a>

              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2.5 min-h-[44px] border-b border-[#203047] text-sm text-paper hover:text-accent transition-colors"
              >
                <span className="flex items-center gap-2">
                  <DownloadIcon className="h-4 w-4 text-[#A0ABB5]" />
                  Curriculum Vitae (PDF)
                </span>
                <span className="font-mono text-xs text-[#A0ABB5]">&nearr;</span>
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
