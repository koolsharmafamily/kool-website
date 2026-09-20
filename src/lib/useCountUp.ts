import { useEffect, useState, useRef } from "react";

export function useCountUp(targetStr: string, durationMs: number = 800): { count: string; ref: React.RefObject<HTMLSpanElement | null> } {
  const [display, setDisplay] = useState(targetStr);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplay(targetStr);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Parse number and suffix
    const match = targetStr.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
    if (!match) {
      setDisplay(targetStr);
      return;
    }

    const prefix = match[1];
    const rawNumber = parseInt(match[2].replace(/,/g, ""), 10);
    const suffix = match[3];

    // Initialize to 0 with formatting
    setDisplay(`${prefix}0${suffix}`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const currentVal = Math.round(easeProgress * rawNumber);

            const formatted = currentVal.toLocaleString("en-US");
            setDisplay(`${prefix}${formatted}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplay(targetStr);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [targetStr, durationMs]);

  return { count: display, ref };
}
