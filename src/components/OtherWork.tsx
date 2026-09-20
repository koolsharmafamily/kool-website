import { useState } from "react";
import { otherWork } from "../data/content";
import { Section } from "./ui";
import { Reveal } from "./Reveal";

export function OtherWork() {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <Section id="other-work" labelledBy="other-work-heading" variant="paper">
      {/* Asymmetric Header: 4 cols header, 8 cols content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-12 sm:mb-16">
        <div className="md:col-span-4">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium mb-3">
              03 · Other Projects
            </p>
            <h2
              id="other-work-heading"
              className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-tight tracking-[-0.02em] text-ink"
            >
              Selected builds
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-8 flex items-end">
          <Reveal index={1}>
            <p className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-muted">
              Independent web applications, intake systems, and workflow utilities built for commercial clients and operational use.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Compact 3-Column Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {otherWork.map((item, i) => {
          const isWebsitesTile = "gallery" in item && Boolean(item.gallery);

          return (
            <Reveal
              as="div"
              key={item.title}
              index={Math.min(i, 4)}
              className="hover-card flex flex-col justify-between p-6 bg-surface border border-rule"
            >
              <div>
                {/* Monogram-style micro icon */}
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-[2px] border border-rule bg-paper text-ink">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1" />
                    <line x1="9" y1="3" x2="9" y2="21" strokeWidth="0.75" opacity="0.6" />
                    <path d="M14 8h3v8h-3" strokeWidth="1.5" />
                  </svg>
                </div>

                <h3 className="font-body text-base font-semibold text-ink leading-snug">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                  {item.body}
                </p>

                {"meta" in item && item.meta && (
                  <p className="mt-3 font-mono text-[11px] text-accent">
                    {item.meta}
                  </p>
                )}
              </div>

              {isWebsitesTile && item.gallery && (
                <div className="mt-5 border-t border-rule pt-4">
                  <button
                    type="button"
                    onClick={() => setGalleryOpen(!galleryOpen)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:underline cursor-pointer"
                  >
                    <span>{galleryOpen ? "Hide client sites" : `View client sites (${item.gallery.length})`}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>

                  {galleryOpen && (
                    <div className="mt-3 space-y-3 pt-2">
                      {item.gallery.map((siteEntry) => (
                        <div key={siteEntry.name} className="border-b border-rule/50 pb-2 last:border-b-0">
                          <p className="text-xs font-medium text-ink">
                            {siteEntry.href ? (
                              <a
                                href={siteEntry.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline inline-flex items-center gap-1"
                              >
                                <span>{siteEntry.name}</span>
                                <span className="text-[10px]">&nearr;</span>
                              </a>
                            ) : (
                              siteEntry.name
                            )}
                          </p>
                          <p className="text-[11px] text-ink-muted">
                            {siteEntry.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
