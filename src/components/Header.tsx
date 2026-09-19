import { useCallback, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { nav, site } from "../data/content";
import { DownloadIcon } from "./Icons";
import { useScrollSpy } from "../lib/useScrollSpy";

const sectionIds = nav.map((item) => item.href.split("#")[1]);

export function Header() {
  const [location, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const onHome = location === "/";
  const active = useScrollSpy(onHome ? sectionIds : []);

  // Close the menu on route change, so navigating never leaves it hanging open.
  useEffect(() => setOpen(false), [location]);

  const goToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hash = href.split("#")[1];
      if (!hash) return;
      e.preventDefault();
      setOpen(false);

      const scroll = () => {
        const el = document.getElementById(hash);
        if (!el) return;
        el.scrollIntoView({ block: "start" });
        history.replaceState(null, "", `/#${hash}`);
      };

      if (onHome) {
        scroll();
      } else {
        navigate("/");
        // Wait for the home page to mount before looking for the target.
        requestAnimationFrame(() => requestAnimationFrame(scroll));
      }
    },
    [onHome, navigate],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm no-print">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-5 py-2.5 sm:px-8 sm:py-3">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            if (onHome) window.scrollTo({ top: 0 });
            else navigate("/");
          }}
          className="flex min-h-[44px] items-center font-serif text-[1.05rem] font-semibold tracking-tight text-ink"
        >
          Kulvir Sharma
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => {
            const id = item.href.split("#")[1];
            const isActive = onHome && active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => goToSection(e, item.href)}
                className={`flex min-h-[44px] items-center rounded-md px-3 text-[0.9rem] transition-colors duration-200 ${
                  isActive
                    ? "font-semibold text-accent"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Stays visible at every width — it is the most likely action. */}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-accent px-3.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-accent-dark sm:px-4 sm:text-[0.9rem]"
          >
            <DownloadIcon className="h-4 w-4" />
            <span>Resume</span>
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-11 w-11 place-items-center rounded-md border border-rule-strong text-ink md:hidden"
          >
            {/* Explicitly positioned: a static parent would collapse all three
                bars onto one another. */}
            <span
              className={`absolute block h-0.5 w-4 bg-current transition-transform duration-200 ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-4 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-4 bg-current transition-transform duration-200 ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-rule bg-paper md:hidden"
        >
          <ul className="mx-auto flex w-full max-w-5xl list-none flex-col px-5 py-2 sm:px-8">
            {nav.map((item) => {
              const id = item.href.split("#")[1];
              const isActive = onHome && active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => goToSection(e, item.href)}
                    className={`flex min-h-[48px] items-center border-b border-rule text-[0.95rem] last:border-b-0 ${
                      isActive ? "font-semibold text-accent" : "text-ink-muted"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
