import { otherWork } from "../data/content";
import { Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

export function OtherWork() {
  return (
    <Section labelledBy="other-work-heading">
      <SectionHeading
        id="other-work-heading"
        kicker="Also built"
        title="Other work"
        lede="Smaller builds, listed rather than written up. Most started as somebody's recurring manual task."
      />

      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
        {otherWork.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            index={Math.min(i, 4)}
            className="flex min-w-0 flex-col rounded-lg border border-rule bg-surface p-5"
          >
            <h3 className="text-[1.05rem]">{item.title}</h3>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-muted">{item.body}</p>

            {"gallery" in item && item.gallery && (
              <details className="group mt-4">
                <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center text-[0.875rem] font-semibold text-accent hover:underline">
                  <span className="group-open:hidden">
                    See the sites ({item.gallery.length})
                  </span>
                  <span className="hidden group-open:inline">Hide</span>
                </summary>
                <ul className="mt-2 list-none space-y-3 border-t border-rule p-0 pt-3">
                  {item.gallery.map((entry) => (
                    <li key={entry.name}>
                      <p className="text-[0.9rem] font-semibold text-ink">
                        {entry.href ? (
                          <a
                            href={entry.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline"
                          >
                            {entry.name}
                          </a>
                        ) : (
                          entry.name
                        )}
                      </p>
                      <p className="mt-0.5 text-[0.85rem] leading-snug text-ink-muted">
                        {entry.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {"meta" in item && item.meta && (
              <p className="mt-3 text-[0.8rem] text-ink-soft">{item.meta}</p>
            )}
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
