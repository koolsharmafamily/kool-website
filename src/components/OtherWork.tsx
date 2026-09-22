import { useState } from "react";
import { otherWork } from "../data/content";
import { Section } from "./ui";
import { Reveal } from "./Reveal";

/**
 * Systems & Utilities Ledger
 * Structured executive ledger of independent operational utilities, intake workflows,
 * and commercial client systems. Replaces generic card templates with high-density consulting records.
 */
export function OtherWork() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  const categories = [
    { label: "Client Intake & Bookings", code: "LEDGER-01", tag: "Deployed System" },
    { label: "Multi-API Songbook Utility", code: "LEDGER-02", tag: "Integration Tool" },
    { label: "GenAI Production Studio", code: "LEDGER-03", tag: "Automated Pipeline" },
    { label: "Cinema Food-Ordering Flow", code: "LEDGER-04", tag: "Process Architecture" },
    { label: "Sports Academy Advisory", code: "LEDGER-05", tag: "CRM & Strategy" },
  ];

  return (
    <Section id="other-work" labelledBy="other-work-heading" variant="paper">
      {/* Asymmetric Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-10 sm:mb-14">
        <div className="md:col-span-4">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium mb-3">
              03 · Systems & Utilities
            </p>
            <h2
              id="other-work-heading"
              className="font-display text-[clamp(2rem,3.5vw,3rem)] font-normal leading-tight tracking-[-0.02em] text-ink"
            >
              Operational ledger
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-8 flex items-end">
          <Reveal index={1}>
            <p className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-muted">
              Production workflows, automated intake pipelines, and bespoke web platforms engineered for independent commercial clients.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Structured Ledger List */}
      <div className="border-t border-rule divide-y divide-rule bg-surface border-x border-b">
        {otherWork.map((item, i) => {
          const isWebsitesTile = "gallery" in item && Boolean(item.gallery);
          const metaInfo = categories[i] || { label: "Utility", code: `LEDGER-0${i + 1}`, tag: "Deployed" };

          return (
            <Reveal
              as="div"
              key={item.title}
              index={Math.min(i, 4)}
              className="p-5 sm:p-6 transition-colors hover:bg-paper/40 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Left meta: 3 cols */}
                <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between lg:justify-start gap-2">
                  <span className="font-mono text-xs font-semibold text-accent">
                    {metaInfo.code}
                  </span>
                  <span className="font-mono text-[11px] text-ink-muted uppercase tracking-wider">
                    {metaInfo.tag}
                  </span>
                </div>

                {/* Center content: 7 cols */}
                <div className="lg:col-span-7">
                  <h3 className="font-body text-base font-semibold text-ink leading-snug group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">
                    {item.body}
                  </p>

                  {/* Client practice disclosure */}
                  {isWebsitesTile && item.gallery && (
                    <div className="mt-4 pt-3 border-t border-rule/60">
                      <button
                        type="button"
                        onClick={() => setGalleryOpen(!galleryOpen)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:text-ink cursor-pointer transition-colors"
                      >
                        <span>{galleryOpen ? "[-] Hide client deployments" : `[+] View 3 deployed client practices (${item.gallery.length})`}</span>
                      </button>

                      {galleryOpen && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                          {item.gallery.map((siteEntry) => (
                            <div key={siteEntry.name} className="p-3 bg-paper border border-rule rounded-[2px]">
                              <p className="text-xs font-semibold text-ink">
                                {siteEntry.name}
                              </p>
                              <p className="mt-1 text-[11px] text-ink-muted leading-relaxed">
                                {siteEntry.note}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right badge: 2 cols */}
                <div className="lg:col-span-2 lg:text-right">
                  <span className="inline-block rounded-[2px] border border-rule bg-paper px-2.5 py-1 font-mono text-[10px] uppercase text-ink-muted">
                    {metaInfo.label}
                  </span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
