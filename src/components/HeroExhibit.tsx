import { useState } from "react";

export function HeroExhibit() {
  const [activeMode, setActiveMode] = useState<"both" | "after" | "portrait">("both");

  return (
    <div className="hover-card flex flex-col justify-between overflow-hidden border border-rule bg-surface p-4 sm:p-6 w-full">
      {/* Header bar with tabs */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
        <div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
            EXHIBIT 1 · AdLens AI
          </span>
          <p className="text-xs text-ink-muted">Workflow Transformation Architecture</p>
        </div>

        <div className="inline-flex rounded-[2px] border border-rule bg-paper p-0.5 font-mono text-[10px]">
          <button
            type="button"
            onClick={() => setActiveMode("both")}
            className={`rounded-[2px] px-2 py-0.5 transition-colors ${
              activeMode === "both"
                ? "bg-ink text-paper font-medium"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Diagram
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("portrait")}
            className={`rounded-[2px] px-2 py-0.5 transition-colors ${
              activeMode === "portrait"
                ? "bg-ink text-paper font-medium"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Portrait Slot
          </button>
        </div>
      </div>

      {activeMode === "portrait" ? (
        /* Portrait Slot */
        <div className="flex aspect-4/5 w-full flex-col items-center justify-center rounded-[2px] border border-dashed border-rule bg-paper/60 p-6 text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-rule bg-surface text-ink-muted">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <p className="font-display text-base text-ink">Portrait Slot (4:5)</p>
          <p className="mt-1 max-w-[28ch] text-xs text-ink-muted">
            Ready for professional headshot. Configured in <code>TODO-FOR-KULVIR.md</code>.
          </p>
          <span className="mt-3 inline-block rounded-[2px] border border-rule bg-surface px-2 py-1 font-mono text-[10px] text-ink-muted">
            public/portrait.jpg
          </span>
        </div>
      ) : (
        /* Animated / Consulting Exhibit SVG */
        <div className="w-full overflow-hidden">
          <svg
            viewBox="0 0 400 230"
            className="w-full h-auto block select-none max-w-full"
            aria-label="Process comparison: Manual before state versus AI-enabled after state"
          >
            <defs>
              <marker
                id="arrow-gray"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#495664" />
              </marker>
              <marker
                id="arrow-teal"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0F5B5B" />
              </marker>
            </defs>

            {/* Stage Guidelines */}
            <line x1="0" y1="28" x2="400" y2="28" stroke="#E3DED3" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="0" y1="130" x2="400" y2="130" stroke="#E3DED3" strokeWidth="1" strokeDasharray="2,2" />

            {/* Labels */}
            <text x="0" y="20" fill="#495664" className="svg-text font-mono text-[10px] tracking-wider uppercase font-semibold">
              BEFORE (Manual · 45 min/run)
            </text>
            <text x="0" y="122" fill="#0F5B5B" className="svg-text font-mono text-[10px] tracking-wider uppercase font-semibold">
              AFTER (Automated · 4 min/run)
            </text>

            {/* BEFORE FLOW */}
            <g className="transition-opacity duration-300">
              <rect x="0" y="38" width="68" height="30" fill="#FFFFFF" stroke="#495664" strokeWidth="1" rx="2" />
              <text x="34" y="57" fill="#0E1A2B" textAnchor="middle" className="svg-title font-body text-[11px] font-medium">Video</text>

              <line x1="68" y1="53" x2="104" y2="53" stroke="#495664" strokeWidth="1" markerEnd="url(#arrow-gray)" />

              <rect x="110" y="38" width="68" height="30" fill="#FFFFFF" stroke="#C8762B" strokeWidth="1.5" strokeDasharray="3,2" rx="2" />
              <text x="144" y="57" fill="#C8762B" textAnchor="middle" className="svg-title font-body text-[11px] font-medium">Watch</text>

              <line x1="178" y1="53" x2="214" y2="53" stroke="#495664" strokeWidth="1" markerEnd="url(#arrow-gray)" />

              <rect x="220" y="38" width="68" height="30" fill="#FFFFFF" stroke="#C8762B" strokeWidth="1.5" strokeDasharray="3,2" rx="2" />
              <text x="254" y="57" fill="#C8762B" textAnchor="middle" className="svg-title font-body text-[11px] font-medium">Notes</text>

              <line x1="288" y1="53" x2="324" y2="53" stroke="#495664" strokeWidth="1" markerEnd="url(#arrow-gray)" />

              <rect x="330" y="38" width="68" height="30" fill="#FFFFFF" stroke="#C8762B" strokeWidth="1.5" rx="2" />
              <text x="364" y="57" fill="#C8762B" textAnchor="middle" className="svg-title font-body text-[11px] font-medium">Spreadsheet</text>
            </g>

            {/* Vertical Mapping Bridges */}
            <line x1="34" y1="74" x2="34" y2="136" stroke="#E3DED3" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="364" y1="74" x2="364" y2="136" stroke="#E3DED3" strokeWidth="1" strokeDasharray="2,2" />

            {/* AFTER FLOW */}
            <g className="transition-opacity duration-300">
              <rect x="0" y="142" width="68" height="30" fill="#FFFFFF" stroke="#495664" strokeWidth="1" rx="2" />
              <text x="34" y="161" fill="#0E1A2B" textAnchor="middle" className="svg-title font-body text-[11px] font-medium">Video</text>

              <line x1="68" y1="157" x2="104" y2="157" stroke="#0F5B5B" strokeWidth="1.5" markerEnd="url(#arrow-teal)" />

              <rect x="110" y="142" width="68" height="30" fill="#E6F0F0" stroke="#0F5B5B" strokeWidth="1.5" rx="2" />
              <text x="144" y="161" fill="#0F5B5B" textAnchor="middle" className="svg-title font-body text-[11px] font-medium">AI Extract</text>

              <line x1="178" y1="157" x2="214" y2="157" stroke="#0F5B5B" strokeWidth="1.5" markerEnd="url(#arrow-teal)" />

              <rect x="220" y="142" width="68" height="30" fill="#E6F0F0" stroke="#0F5B5B" strokeWidth="1.5" rx="2" />
              <text x="254" y="161" fill="#0F5B5B" textAnchor="middle" className="svg-title font-body text-[11px] font-medium">Framework</text>

              <line x1="288" y1="157" x2="324" y2="157" stroke="#0F5B5B" strokeWidth="1.5" markerEnd="url(#arrow-teal)" />

              <rect x="330" y="142" width="68" height="30" fill="#0F5B5B" stroke="#0F5B5B" strokeWidth="1.5" rx="2" />
              <text x="364" y="161" fill="#FFFFFF" textAnchor="middle" className="svg-title font-body text-[11px] font-medium">Dashboard</text>
            </g>

            {/* Bottleneck Annotation */}
            <circle cx="200" cy="53" r="3" fill="#C8762B" />
            <text x="200" y="80" fill="#C8762B" textAnchor="middle" className="font-mono text-[9px] uppercase tracking-wider">
              3 bottlenecks eliminated
            </text>

            {/* Outcome Annotation */}
            <circle cx="200" cy="157" r="3" fill="#0F5B5B" />
            <text x="200" y="196" fill="#0F5B5B" textAnchor="middle" className="font-mono text-[9px] uppercase tracking-wider font-medium">
              85% reduction in manual effort
            </text>
          </svg>

          {/* Footnote note matching consulting report */}
          <div className="mt-3 border-t border-rule pt-2 text-[11px] text-ink-muted">
            <span className="font-mono text-[10px] uppercase text-ink-soft">Source:</span> Benchmark of 40 ad reviews. See{" "}
            <a href="/work/adlens-ai" className="font-medium text-accent hover:underline">
              AdLens AI case study &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
