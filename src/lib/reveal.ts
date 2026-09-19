/**
 * Scroll reveals, built so that content can never be stranded invisible.
 *
 * Three guarantees, in order of importance:
 *  1. Elements are visible by default. CSS only hides them when the
 *     `.reveal-enabled` flag is on <html>, which index.html sets only when JS
 *     runs, IntersectionObserver exists, and reduced motion is not requested.
 *  2. If the flag is absent for any reason, this module marks elements revealed
 *     immediately rather than waiting for an observer that will never fire.
 *  3. A bounded fallback covers the case where the observer exists but stays
 *     silent (for example a tab that was never painted) for an element that is
 *     already within the viewport.
 */

const REVEALED = "data-revealed";
const FALLBACK_MS = 2000;

let observer: IntersectionObserver | null = null;

function reveal(el: Element) {
  el.setAttribute(REVEALED, "");
}

function getObserver(): IntersectionObserver | null {
  if (observer) return observer;
  if (typeof IntersectionObserver === "undefined") return null;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    // Start slightly before the element enters view so motion finishes as the
    // reader arrives, rather than making them wait for it.
    { rootMargin: "0px 0px 10% 0px", threshold: 0.01 },
  );
  return observer;
}

function motionEnabled() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("reveal-enabled")
  );
}

/** Observe `el`, returning a cleanup function. Safe to call with null. */
export function observeReveal(el: Element | null): () => void {
  if (!el) return () => {};

  if (!motionEnabled()) {
    reveal(el);
    return () => {};
  }

  const io = getObserver();
  if (!io) {
    reveal(el);
    return () => {};
  }

  io.observe(el);

  const timer = window.setTimeout(() => {
    // Only force elements the reader can actually see; anything further down
    // keeps waiting for the observer so the effect still reads as a reveal.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal(el);
      io.unobserve(el);
    }
  }, FALLBACK_MS);

  return () => {
    window.clearTimeout(timer);
    io.unobserve(el);
  };
}
