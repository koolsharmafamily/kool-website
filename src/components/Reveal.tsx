import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { observeReveal } from "../lib/reveal";

type Tag = "div" | "section" | "ul" | "li" | "header" | "figure" | "article";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger position within a group. Each step adds 60ms, capped in CSS use. */
  index?: number;
  as?: Tag;
  id?: string;
  style?: CSSProperties;
  /** Animate direct children in sequence (used by diagrams). */
  steps?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function Reveal({
  children,
  className,
  index = 0,
  as: Tag = "div",
  id,
  style,
  steps = false,
  ...aria
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => observeReveal(ref.current), []);

  return (
    <Tag
      // The ref type varies per tag; the runtime element is always an HTMLElement.
      ref={ref as React.Ref<never>}
      id={id}
      className={className}
      data-reveal=""
      {...(steps ? { "data-steps": "" } : {})}
      style={{ ...style, ...(index ? { "--reveal-i": index } : {}) } as CSSProperties}
      {...aria}
    >
      {children}
    </Tag>
  );
}
