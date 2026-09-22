/**
 * Zero-dependency Motion Helper Module
 * Strictly adheres to REDESIGN_PROMPT.md motion guidelines:
 * - Durations: 150ms (micro), 300ms (UI), 450-600ms (reveals), max 1.2s (diagrams)
 * - Easing: cubic-bezier(0.2, 0.7, 0.2, 1)
 * - IntersectionObserver triggers, no continuous scroll listeners
 * - Reduced-motion bypass: immediately resolves to final state
 */

export function isReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Trigger a callback once when an element enters the viewport.
 * Automatically runs immediately if reduced motion is enabled or IntersectionObserver is unsupported.
 */
export function observeInView(
  element: Element | null,
  callback: () => void,
  options: IntersectionObserverInit = { threshold: 0.15 }
): () => void {
  if (!element) return () => {};

  if (isReducedMotion() || typeof IntersectionObserver === "undefined") {
    callback();
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(element);
  return () => observer.disconnect();
}

/**
 * Count up animation for numbers (M4)
 * Uses ease-out cubic over 800ms with tabular-nums
 */
export function animateCounter(
  onUpdate: (value: number) => void,
  endValue: number,
  duration = 800
): () => void {
  if (isReducedMotion()) {
    onUpdate(endValue);
    return () => {};
  }

  let startTime: number | null = null;
  let animId: number;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * endValue);
    onUpdate(current);

    if (progress < 1) {
      animId = requestAnimationFrame(step);
    } else {
      onUpdate(endValue);
    }
  };

  animId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(animId);
}

/**
 * Safe wrapper for native View Transitions API (M5)
 */
export function navigateWithTransition(navigateFn: () => void): void {
  if (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    !isReducedMotion()
  ) {
    (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
      navigateFn();
    });
  } else {
    navigateFn();
  }
}
