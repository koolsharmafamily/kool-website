/**
 * Executive Candidate Dossier
 * Provides Big 4 recruiters and consulting leaders with an immediate, authoritative
 * synthesis of academic pedigree, institutional advisory experience, and core delivery capabilities.
 */
export function HeroExhibit() {
  return (
    <div className="hover-card flex flex-col justify-between overflow-hidden border border-rule bg-surface p-5 sm:p-7 w-full shadow-xs">
      {/* Header Bar */}
      <div className="mb-5 flex items-center justify-between border-b border-rule pb-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-accent">
            Candidate Dossier
          </span>
        </div>
        <span className="inline-block rounded-[2px] border border-rule bg-paper px-2 py-0.5 font-mono text-[11px] font-medium text-ink">
          Ref: 2026-KS
        </span>
      </div>

      {/* Structured Credentials Grid */}
      <div className="space-y-4 text-xs">
        {/* Education */}
        <div className="border-b border-rule/60 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block mb-1">
            Academic Pedigree
          </span>
          <p className="font-body font-semibold text-ink text-sm leading-snug">
            The University of Melbourne
          </p>
          <p className="text-ink-muted text-xs mt-0.5">
            Bachelor of Commerce: Finance & Management (2022–2026)
          </p>
          <p className="font-mono text-[11px] text-accent mt-1">
            Olive Wykes & Elite Athlete Scholar · UniMelb Sports Award
          </p>
        </div>

        {/* Institutional Client History */}
        <div className="border-b border-rule/60 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block mb-1">
            Institutional Advisory & Industry Roles
          </span>
          <div className="space-y-1.5 mt-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-medium text-ink">Grant Thornton Bharat</span>
              <span className="font-mono text-[11px] text-ink-muted shrink-0">M&A Lead Advisory</span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-medium text-ink">DSP Asset Managers</span>
              <span className="font-mono text-[11px] text-ink-muted shrink-0">Fintech & Workflows</span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-medium text-ink">Publicis Sapient</span>
              <span className="font-mono text-[11px] text-ink-muted shrink-0">Business Consulting</span>
            </div>
          </div>
        </div>

        {/* Core Methodologies & Applied Tech */}
        <div className="border-b border-rule/60 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block mb-1">
            Delivery & Technical Stack
          </span>
          <p className="text-ink leading-relaxed font-mono text-[11px]">
            Requirements Elicitation · Process Mapping · DCF Valuation · Multimodal AI Pipelines · n8n · Supabase · Python
          </p>
        </div>

        {/* High-Performance Distinction */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-signal block mb-1 font-semibold">
            Competitive Distinction
          </span>
          <p className="text-ink-muted text-[11px] leading-relaxed">
            Junior Asian Games Athlete (India) · Former India No. 2 · 3× UniNationals Medallist · Music Theory Teacher
          </p>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="mt-5 border-t border-rule pt-3.5 flex items-center justify-between text-xs">
        <a
          href="#work"
          className="font-medium text-accent hover:text-ink transition-colors inline-flex items-center gap-1 font-mono text-[11px]"
        >
          <span>Explore 8 case studies</span>
          <span aria-hidden="true">&darr;</span>
        </a>
        <span className="font-mono text-[11px] text-ink-muted">
          Melbourne · India
        </span>
      </div>
    </div>
  );
}
