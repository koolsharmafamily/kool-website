interface CoverProps {
  className?: string;
}

export function AdLensCover({ className = "" }: CoverProps) {
  return (
    <svg
      viewBox="0 0 400 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full block ${className}`}
      aria-hidden="true"
    >
      <rect width="400" height="260" fill="#0E1A2B" />
      {/* Wave / Flow lines */}
      <path d="M-20,130 Q120,70 200,130 T420,130" stroke="#495664" strokeWidth="1" opacity="0.4" />
      <path d="M-20,150 Q120,90 200,150 T420,150" stroke="#495664" strokeWidth="1" opacity="0.4" />
      <path d="M-20,110 Q120,50 200,110 T420,110" stroke="#495664" strokeWidth="1" opacity="0.4" />

      {/* Nodes */}
      <circle cx="80" cy="118" r="4" fill="#0F5B5B" />
      <circle cx="200" cy="130" r="5" fill="#C8762B" />
      <circle cx="320" cy="142" r="4" fill="#0F5B5B" />

      {/* Structured metrics / audio-visual extraction bars */}
      <rect x="180" y="85" width="3" height="35" fill="#0F5B5B" opacity="0.8" />
      <rect x="190" y="70" width="3" height="50" fill="#0F5B5B" opacity="0.6" />
      <rect x="200" y="95" width="3" height="25" fill="#C8762B" opacity="0.9" />
      <rect x="210" y="78" width="3" height="42" fill="#0F5B5B" opacity="0.6" />
      <rect x="220" y="90" width="3" height="30" fill="#0F5B5B" opacity="0.8" />

      {/* HUD Frame */}
      <rect x="30" y="24" width="340" height="212" stroke="#203047" strokeWidth="1" fill="none" rx="2" />
      <text x="44" y="44" fill="#A0ABB5" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="0.08em">
        ANALYSIS STREAM // RUN_TIME: 4M
      </text>
      <text x="356" y="44" fill="#0F5B5B" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="600">
        85% EFFICIENCY
      </text>
    </svg>
  );
}

export function DistributorCover({ className = "" }: CoverProps) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full block ${className}`}
      aria-hidden="true"
    >
      <rect width="400" height="240" fill="#0E1A2B" />
      {/* Grid pattern */}
      <line x1="40" y1="40" x2="360" y2="40" stroke="#203047" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="40" y1="120" x2="360" y2="120" stroke="#203047" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="40" y1="200" x2="360" y2="200" stroke="#203047" strokeWidth="1" strokeDasharray="2,2" />

      {/* Distributor input nodes */}
      <rect x="50" y="60" width="70" height="24" stroke="#495664" strokeWidth="1" fill="#0E1A2B" rx="1" />
      <text x="85" y="76" fill="#A0ABB5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8">DIST_01</text>

      <rect x="50" y="108" width="70" height="24" stroke="#495664" strokeWidth="1" fill="#0E1A2B" rx="1" />
      <text x="85" y="124" fill="#A0ABB5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8">DIST_02</text>

      <rect x="50" y="156" width="70" height="24" stroke="#495664" strokeWidth="1" fill="#0E1A2B" rx="1" />
      <text x="85" y="172" fill="#A0ABB5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8">DIST_03</text>

      {/* Convergence connector lines */}
      <path d="M120,72 L180,120 L240,120" stroke="#0F5B5B" strokeWidth="1.5" />
      <path d="M120,120 L240,120" stroke="#0F5B5B" strokeWidth="1.5" />
      <path d="M120,168 L180,120 L240,120" stroke="#0F5B5B" strokeWidth="1.5" />

      {/* Central Pipeline Node */}
      <rect x="240" y="96" width="110" height="48" fill="#0F5B5B" stroke="#0F5B5B" rx="2" />
      <text x="295" y="120" fill="#FFFFFF" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="11" fontWeight="600">
        Reconciliation
      </text>
      <text x="295" y="133" fill="#E6F0F0" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8">
        SINGLE ENGINE
      </text>

      {/* Signal indicator */}
      <circle cx="180" cy="120" r="4" fill="#C8762B" />
    </svg>
  );
}

export function AgencyAdOpsCover({ className = "" }: CoverProps) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full block ${className}`}
      aria-hidden="true"
    >
      <rect width="400" height="240" fill="#0E1A2B" />
      {/* Central Gateway Circle */}
      <circle cx="200" cy="120" r="50" stroke="#0F5B5B" strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
      <circle cx="200" cy="120" r="32" fill="#0F5B5B" />
      <text x="200" y="117" fill="#FFFFFF" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="10" fontWeight="600">
        CENTRAL
      </text>
      <text x="200" y="129" fill="#E6F0F0" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8">
        GATEWAY
      </text>

      {/* Orbiting client nodes */}
      <rect x="50" y="50" width="80" height="24" stroke="#495664" strokeWidth="1" fill="#0E1A2B" rx="1" />
      <text x="90" y="66" fill="#A0ABB5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8">CLIENT_META</text>
      <line x1="130" y1="62" x2="175" y2="98" stroke="#495664" strokeWidth="1" />

      <rect x="50" y="166" width="80" height="24" stroke="#495664" strokeWidth="1" fill="#0E1A2B" rx="1" />
      <text x="90" y="182" fill="#A0ABB5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8">CLIENT_GOOGLE</text>
      <line x1="130" y1="178" x2="175" y2="142" stroke="#495664" strokeWidth="1" />

      <rect x="270" y="108" width="80" height="24" stroke="#C8762B" strokeWidth="1.5" fill="#0E1A2B" rx="1" />
      <text x="310" y="124" fill="#C8762B" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8">AUDIT_LOG</text>
      <line x1="232" y1="120" x2="270" y2="120" stroke="#C8762B" strokeWidth="1.5" />
    </svg>
  );
}

export function ConstructionCover({ className = "" }: CoverProps) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full block ${className}`}
      aria-hidden="true"
    >
      <rect width="400" height="240" fill="#0E1A2B" />
      {/* Timesheet Matrix */}
      <rect x="60" y="45" width="280" height="150" stroke="#203047" strokeWidth="1" rx="2" />
      <line x1="60" y1="75" x2="340" y2="75" stroke="#203047" strokeWidth="1" />
      <text x="75" y="65" fill="#A0ABB5" fontFamily="IBM Plex Mono, monospace" fontSize="9">
        WORKFORCE DIGITIZATION // SITE_LOG
      </text>

      {/* Grid rows */}
      <line x1="60" y1="110" x2="340" y2="110" stroke="#203047" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="60" y1="145" x2="340" y2="145" stroke="#203047" strokeWidth="1" strokeDasharray="2,2" />

      {/* Progress / Status blocks */}
      <rect x="75" y="86" width="60" height="14" fill="#0F5B5B" rx="1" />
      <rect x="145" y="86" width="75" height="14" fill="#0F5B5B" opacity="0.6" rx="1" />
      <rect x="230" y="86" width="40" height="14" fill="#C8762B" rx="1" />

      <rect x="75" y="121" width="90" height="14" fill="#0F5B5B" rx="1" />
      <rect x="175" y="121" width="65" height="14" fill="#0F5B5B" opacity="0.6" rx="1" />
      <rect x="250" y="121" width="55" height="14" fill="#0F5B5B" rx="1" />

      <rect x="75" y="156" width="110" height="14" fill="#0F5B5B" rx="1" />
      <rect x="195" y="156" width="80" height="14" fill="#0F5B5B" opacity="0.6" rx="1" />
    </svg>
  );
}

export function FinanceCover({ className = "" }: CoverProps) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full block ${className}`}
      aria-hidden="true"
    >
      <rect width="400" height="240" fill="#0E1A2B" />
      {/* Ledger split */}
      <rect x="50" y="50" width="130" height="140" stroke="#495664" strokeWidth="1" fill="#0E1A2B" rx="1" />
      <text x="65" y="70" fill="#A0ABB5" fontFamily="IBM Plex Mono, monospace" fontSize="8">BANK STATEMENTS</text>
      <line x1="65" y1="90" x2="165" y2="90" stroke="#495664" strokeWidth="1" />
      <line x1="65" y1="110" x2="150" y2="110" stroke="#495664" strokeWidth="1" />
      <line x1="65" y1="130" x2="160" y2="130" stroke="#495664" strokeWidth="1" />
      <line x1="65" y1="150" x2="140" y2="150" stroke="#495664" strokeWidth="1" />

      {/* Match Engine */}
      <circle cx="200" cy="120" r="16" fill="#0F5B5B" />
      <path d="M194,120 L198,124 L206,116" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Internal Ledger */}
      <rect x="220" y="50" width="130" height="140" stroke="#0F5B5B" strokeWidth="1.5" fill="#0E1A2B" rx="1" />
      <text x="235" y="70" fill="#0F5B5B" fontFamily="IBM Plex Mono, monospace" fontSize="8">ERP RECONCILED</text>
      <line x1="235" y1="90" x2="335" y2="90" stroke="#0F5B5B" strokeWidth="1" />
      <line x1="235" y1="110" x2="320" y2="110" stroke="#0F5B5B" strokeWidth="1" />
      <line x1="235" y1="130" x2="330" y2="130" stroke="#0F5B5B" strokeWidth="1" />
      <line x1="235" y1="150" x2="310" y2="150" stroke="#0F5B5B" strokeWidth="1" />
    </svg>
  );
}

export function ComputerVisionCover({ className = "" }: CoverProps) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full block ${className}`}
      aria-hidden="true"
    >
      <rect width="400" height="240" fill="#0E1A2B" />
      {/* Camera feed overlay */}
      <rect x="40" y="30" width="320" height="180" stroke="#203047" strokeWidth="1" rx="2" />
      {/* Corner crosshairs */}
      <path d="M48,46 L48,38 L56,38" stroke="#A0ABB5" strokeWidth="1.5" />
      <path d="M352,46 L352,38 L344,38" stroke="#A0ABB5" strokeWidth="1.5" />
      <path d="M48,194 L48,202 L56,202" stroke="#A0ABB5" strokeWidth="1.5" />
      <path d="M352,194 L352,202 L344,202" stroke="#A0ABB5" strokeWidth="1.5" />

      {/* Bounding box PPE Detection */}
      <rect x="130" y="60" width="90" height="120" stroke="#0F5B5B" strokeWidth="1.5" strokeDasharray="3,3" fill="#0F5B5B" fillOpacity="0.08" />
      <rect x="130" y="60" width="60" height="14" fill="#0F5B5B" />
      <text x="134" y="70" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="7" fontWeight="600">
        PPE: 98.4%
      </text>

      {/* Warning zone bounding box */}
      <rect x="250" y="100" width="70" height="70" stroke="#C8762B" strokeWidth="1.5" fill="#C8762B" fillOpacity="0.08" />
      <rect x="250" y="100" width="50" height="14" fill="#C8762B" />
      <text x="254" y="110" fill="#FFFFFF" fontFamily="IBM Plex Mono, monospace" fontSize="7" fontWeight="600">
        ZONE: HAZARD
      </text>
    </svg>
  );
}

export function MarketEntryCover({ className = "" }: CoverProps) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full block ${className}`}
      aria-hidden="true"
    >
      <rect width="400" height="240" fill="#0E1A2B" />
      {/* Geographic node link */}
      <circle cx="100" cy="120" r="30" stroke="#495664" strokeWidth="1" fill="#0E1A2B" />
      <text x="100" y="118" fill="#A0ABB5" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="10">INDIA</text>
      <text x="100" y="130" fill="#A0ABB5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8">BASE</text>

      <path d="M130,120 Q200,60 270,120" stroke="#0F5B5B" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
      <circle cx="200" cy="90" r="4" fill="#C8762B" />

      <circle cx="300" cy="120" r="30" stroke="#0F5B5B" strokeWidth="2" fill="#0E1A2B" />
      <text x="300" y="118" fill="#0F5B5B" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="10" fontWeight="600">AUSTRALIA</text>
      <text x="300" y="130" fill="#E6F0F0" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8">TARGET</text>
    </svg>
  );
}

export function OptionsAgentCover({ className = "" }: CoverProps) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full block ${className}`}
      aria-hidden="true"
    >
      <rect width="400" height="240" fill="#0E1A2B" />
      {/* Volatility curve */}
      <path d="M50,170 Q200,60 350,170" stroke="#495664" strokeWidth="1.5" fill="none" />
      <line x1="200" y1="40" x2="200" y2="200" stroke="#203047" strokeWidth="1" strokeDasharray="2,2" />

      {/* Multi-agent nodes */}
      <circle cx="120" cy="130" r="8" fill="#0F5B5B" />
      <text x="120" y="152" fill="#A0ABB5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="7">DATA_AGENT</text>

      <circle cx="200" cy="105" r="10" fill="#C8762B" />
      <text x="200" y="85" fill="#C8762B" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8" fontWeight="600">DECISION_AGENT</text>

      <circle cx="280" cy="130" r="8" fill="#0F5B5B" />
      <text x="280" y="152" fill="#A0ABB5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="7">EXEC_AGENT</text>

      <path d="M128,128 L190,108" stroke="#0F5B5B" strokeWidth="1" />
      <path d="M210,108 L272,128" stroke="#0F5B5B" strokeWidth="1" />
    </svg>
  );
}

export function CaseCover({ slug, className = "" }: { slug: string; className?: string }) {
  switch (slug) {
    case "adlens-ai":
      return <AdLensCover className={className} />;
    case "distributor-workflow-automation":
      return <DistributorCover className={className} />;
    case "agency-ad-operations":
      return <AgencyAdOpsCover className={className} />;
    case "construction-workforce-automation":
      return <ConstructionCover className={className} />;
    case "finance-data-automation":
      return <FinanceCover className={className} />;
    case "ai-construction-site":
      return <ComputerVisionCover className={className} />;
    case "trakit-australian-market-entry":
      return <MarketEntryCover className={className} />;
    case "options-trading-agent":
      return <OptionsAgentCover className={className} />;
    default:
      return <AdLensCover className={className} />;
  }
}
