/**
 * Scroll reveals, built so that content can never be stranded invisible.
 * Matches the single-pass 450ms translateY(12px) ease-out motion system in BRAND.html.
 */

let observer: IntersectionObserver | null = null;

function reveal(el: Element) {
  el.classList.add("is-visible");
  el.setAttribute("data-revealed", "");
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
    { rootMargin: "0px 0px 120px 0px", threshold: 0.02 },
  );
  return observer;
}

function motionDisabled() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Observe `el`, returning a cleanup function. Safe to call with null. */
export function observeReveal(el: Element | null): () => void {
  if (!el) return () => {};

  if (motionDisabled()) {
    reveal(el);
    return () => {};
  }

  // Any element in or near the viewport is made visible immediately
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 800;
  if (rect.top <= vh + 150 && rect.bottom >= -150) {
    reveal(el);
    return () => {};
  }

  const io = getObserver();
  if (!io) {
    reveal(el);
    return () => {};
  }

  io.observe(el);

  // Safety fallback: ensure elements never remain invisible
  const timer = window.setTimeout(() => {
    reveal(el);
    io.unobserve(el);
  }, 1200);

  return () => {
    window.clearTimeout(timer);
    io.unobserve(el);
  };
}
