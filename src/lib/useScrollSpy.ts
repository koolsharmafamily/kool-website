import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view, so the nav can expose
 * `aria-current` rather than signalling the active item by colour alone.
 */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("");
  // Array identity changes every render; the contents are what matter.
  const key = ids.join("|");

  useEffect(() => {
    if (!key) {
      setActive("");
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;

    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Pick the first section in document order that is currently visible.
        const current = elements.find((el) => visible.has(el.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
