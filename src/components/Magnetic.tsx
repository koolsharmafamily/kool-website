import { useState, useRef, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  maxDistance?: number;
}

/**
 * Magnetic Micro-Interaction Wrapper
 * Subtly draws the element toward the cursor on hover (desktop only).
 * Automatically bypassed on touch devices or if reduced motion is requested.
 */
export function Magnetic({
  children,
  className = "",
  intensity = 0.25,
  maxDistance = 6,
}: MagneticProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Skip if on touch device or reduced motion
    if (typeof window !== "undefined") {
      if (window.matchMedia("(hover: none)").matches || 
          window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
    }

    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * intensity;
    const deltaY = (e.clientY - centerY) * intensity;

    const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX));
    const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? "transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)"
          : "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      {children}
    </div>
  );
}
