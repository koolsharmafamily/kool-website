/**
 * Tactile Paper Grain Overlay
 * Renders a subtle, non-intrusive micro-texture across the page to eliminate
 * digital sterility and give the appearance of high-grade uncoated paper (120gsm).
 * 
 * Uses an ultra-lightweight SVG noise tile (pointer-events: none, GPU-cached).
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden opacity-[0.032] mix-blend-multiply contrast-125 print:hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
      }}
    />
  );
}
