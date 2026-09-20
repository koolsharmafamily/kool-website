interface KSMonogramProps {
  className?: string;
  size?: number;
}

/**
 * Split Hairline KS Monogram from BRAND.html
 * Authoritative editorial aesthetics with analytical dichotomy (Before/After, Problem/Solution).
 */
export function KSMonogram({ className = "", size = 32 }: KSMonogramProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M22,18 h6 v28 h-6 v-28 M26,18 v28 M28,34 l10,-12 h6 l-12,12 M30,32 l14,14 h-6 l-12,-12"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="translate(-14, 0)"
      />
      <line x1="32" y1="16" x2="32" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path
        d="M52,20 c-2,-2 -5,-3 -8,-3 c-4,0 -7,2 -7,5 c0,4 10,4 10,9 c0,4 -3,6 -8,6 c-4,0 -7,-2 -9,-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        transform="translate(6, 0)"
      />
    </svg>
  );
}
