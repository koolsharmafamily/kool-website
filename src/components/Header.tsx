import { useCallback, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { nav, site } from "../data/content";
import { DownloadIcon } from "./Icons";
import { KSMonogram } from "./KSMonogram";
import { useScrollSpy } from "../lib/useScrollSpy";

const sectionIds = nav.map((item) => item.href.split("#")[1]);

export function Header() {
  const [location, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onHome = location === "/";
  const active = useScrollSpy(onHome ? sectionIds : []);

  // Track scroll position for header transparency vs solid state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the menu on route change and prevent body scroll when menu is open
  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
        // Wait for the home page to mount before looking for the target
        requestAnimationFrame(() => requestAnimationFrame(scroll));
      }
    },
    [onHome, navigate],
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 no-print ${
          scrolled || open
            ? "border-b border-rule bg-paper/95 backdrop-blur-md"
            : "border-b border-transparent bg-paper/80 backdrop-blur-xs"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              if (onHome) window.scrollTo({ top: 0, behavior: "smooth" });
              else navigate("/");
            }}
            className="group flex min-h-[44px] items-center gap-3 text-ink transition-colors hover:text-accent"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-ink text-paper transition-transform duration-200 group-hover:scale-105">
              <KSMonogram size={20} />
            </div>
            <span className="font-body text-[15px] font-medium tracking-[-0.01em]">
              Kulvir Sharma
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 md:flex"
          >
            {nav.map((item) => {
              const id = item.href.split("#")[1];
              const isActive = onHome && active === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(e) => goToSection(e, item.href)}
                  className={`nav-link text-[14px] font-medium transition-colors ${
                    isActive ? "active text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume (PDF, opens in a new tab)"
              className="btn btn-outline min-h-[44px] px-2.5 sm:px-4"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Resume</span>
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="relative grid h-11 w-11 place-items-center rounded-[2px] border border-rule text-ink hover:border-ink md:hidden"
            >
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
      </header>

      {/* Full-screen Mobile Menu Sheet */}
      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[65px] z-40 flex flex-col justify-between bg-paper p-6 md:hidden animate-fade-in"
        >
          <nav aria-label="Mobile Primary" className="flex flex-col gap-1">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              Navigation
            </p>
            {nav.map((item) => {
              const id = item.href.split("#")[1];
              const isActive = onHome && active === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(e) => goToSection(e, item.href)}
                  className={`flex min-h-[52px] items-center border-b border-rule font-display text-2xl tracking-tight ${
                    isActive ? "text-accent" : "text-ink"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="border-t border-rule pt-6">
            <div className="flex flex-col gap-3">
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full py-3 text-center"
              >
                <DownloadIcon className="h-4 w-4" />
                <span>Download Resume (PDF)</span>
              </a>
              <div className="mt-2 flex items-center justify-between font-mono text-xs text-ink-muted">
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
                  LinkedIn ↗
                </a>
                <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-ink">
                  GitHub ↗
                </a>
                <a href={`mailto:${site.email}`} className="hover:text-ink">
                  Email ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
