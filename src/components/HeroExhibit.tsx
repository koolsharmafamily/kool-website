import { useEffect, useRef, useState } from "react";
import { heroExhibit } from "../data/motion";
import { isReducedMotion } from "../lib/motion";

export function HeroExhibit() {
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [loopCount, setLoopCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [scrubberProgress, setScrubberProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reduced motion support
  useEffect(() => {
    if (isReducedMotion()) {
      setStage(3);
      setLoopCount(2);
      setScrubberProgress(100);
    }
  }, []);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scrubber animation for Stage 1 (0 to 100% over 4s)
  useEffect(() => {
    if (stage !== 1 || isHovered || !isInView || loopCount >= heroExhibit.loops) {
      return;
    }

    const startTime = performance.now();
    const duration = 4000;
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      setScrubberProgress(Math.round(p * 100));
      if (p < 1) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [stage, isHovered, isInView, loopCount]);

  // Main stage timer (4 seconds per stage, 2 full loops then holds on stage 3)
  useEffect(() => {
    if (isHovered || !isInView || loopCount >= heroExhibit.loops) {
      return;
    }

    const timer = setTimeout(() => {
      setStage((prev) => {
        if (prev === 1) return 2;
        if (prev === 2) return 3;
        // From stage 3, check if we loop
        setLoopCount((lc) => {
          const nextCount = lc + 1;
          return nextCount;
        });
        return 1;
      });
      if (stage === 3) {
        setScrubberProgress(0);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [stage, isHovered, isInView, loopCount]);

  // Format seconds for scrubber
  const currentSeconds = Math.min(27, Math.floor((scrubberProgress / 100) * 27));
  const formattedTime = `00:${currentSeconds.toString().padStart(2, "0")}`;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hover-card flex flex-col justify-between overflow-hidden border border-rule bg-surface p-5 sm:p-6 w-full shadow-xs transition-shadow duration-300 hover:shadow-md"
      aria-label={`${heroExhibit.title} — ${heroExhibit.sampleAd}`}
    >
      {/* Exhibit Header */}
      <div className="flex items-center justify-between border-b border-rule pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              isHovered ? "bg-signal" : "bg-accent animate-pulse"
            }`}
            aria-hidden="true"
          />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-accent">
            {heroExhibit.title}
          </span>
        </div>
        <span className="inline-block rounded-[2px] border border-rule bg-paper px-2 py-0.5 font-mono text-[10px] uppercase font-medium text-ink-muted">
          Illustrative sample
        </span>
      </div>

      {/* Sample Ad Info & Stage Selector Tabs */}
      <div className="mt-3.5 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] text-ink font-medium">
            Pulse smart bottle · 27s ad
          </span>
          <span className="font-mono text-[10px] text-ink-muted">
            {loopCount >= heroExhibit.loops ? "Complete (Holding)" : isHovered ? "Paused" : `Loop ${loopCount + 1}/${heroExhibit.loops}`}
          </span>
        </div>

        {/* 3-Stage Tab Controls */}
        <div className="grid grid-cols-3 gap-1 rounded-[2px] bg-paper p-1 border border-rule/60 text-center font-mono text-[10px]">
          <button
            type="button"
            onClick={() => {
              setStage(1);
              setScrubberProgress(0);
            }}
            className={`py-1 px-1.5 rounded-[1px] transition-colors ${
              stage === 1
                ? "bg-surface text-ink font-semibold shadow-xs"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            1. Video Scrubber
          </button>
          <button
            type="button"
            onClick={() => setStage(2)}
            className={`py-1 px-1.5 rounded-[1px] transition-colors ${
              stage === 2
                ? "bg-surface text-ink font-semibold shadow-xs"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            2. Evidence
          </button>
          <button
            type="button"
            onClick={() => setStage(3)}
            className={`py-1 px-1.5 rounded-[1px] transition-colors ${
              stage === 3
                ? "bg-surface text-ink font-semibold shadow-xs"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            3. Scorecard
          </button>
        </div>
      </div>

      {/* Stage Body Container */}
      <div className="mt-4 min-h-[260px] flex flex-col justify-center">
        {/* STAGE 1: Video Scrubber */}
        {stage === 1 && (
          <div className="space-y-3 animate-fade-in">
            {/* Video Viewport Mockup */}
            <div className="relative rounded-[2px] bg-ink text-paper p-4 overflow-hidden border border-[#203047] flex flex-col justify-between h-[150px]">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#A0ABB5]">
                <span>REC ● 1080×1920 (9:16)</span>
                <span className="text-paper font-semibold">{formattedTime} / 00:27</span>
              </div>

              {/* Dynamic Scene Caption based on Scrubber Position */}
              <div className="my-auto py-2">
                <p className="font-display text-sm sm:text-base text-paper font-normal leading-snug">
                  {scrubberProgress < 12
                    ? 'Scene 1: "Still forgetting to drink enough water?"'
                    : scrubberProgress < 26
                    ? "Scene 2: Pulse bottle appears; person fills it"
                    : scrubberProgress < 48
                    ? "Scene 3: Bottle shows hydration reminder alert"
                    : scrubberProgress < 67
                    ? "Scene 4: Person drinks water mid-workout"
                    : scrubberProgress < 82
                    ? "Scene 5: Close-up of product benefits"
                    : "Scene 6: Final product hero shot + CTA"}
                </p>
                <span className="inline-block mt-1.5 font-mono text-[10px] text-paper bg-[#142338] px-1.5 py-0.5 rounded-[2px] border border-[#203047]">
                  {scrubberProgress < 12
                    ? "Hook · Pain point"
                    : scrubberProgress < 26
                    ? "Product intro"
                    : scrubberProgress < 48
                    ? "Key feature · Demo"
                    : scrubberProgress < 67
                    ? "Use case · Audience"
                    : scrubberProgress < 82
                    ? "Benefits"
                    : "Branding · CTA"}
                </span>
              </div>

              {/* Scrubber Track */}
              <div className="space-y-1">
                <div className="relative h-1.5 w-full rounded-full bg-[#203047] overflow-hidden">
                  <div
                    className="h-full bg-signal transition-all duration-75 ease-linear"
                    style={{ width: `${scrubberProgress}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[9px] text-[#A0ABB5]">
                  <span>00:00</span>
                  <span>00:13 (Feature)</span>
                  <span>00:27 (CTA)</span>
                </div>
              </div>
            </div>

            <p className="font-mono text-[11px] text-ink-muted text-center">
              Multimodal video pipeline parsing audio transcripts and frame evidence.
            </p>
          </div>
        )}

        {/* STAGE 2: Extracted Evidence */}
        {stage === 2 && (
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase text-ink-muted border-b border-rule pb-1 px-1">
              <span>Timestamp & Scene</span>
              <span>Classification</span>
            </div>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {heroExhibit.evidence.map((ev, i) => (
                <div
                  key={ev.t}
                  className="flex items-start justify-between gap-2 p-1.5 rounded-[2px] bg-paper/60 border border-rule/50 text-xs transition-colors hover:bg-paper"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-semibold text-accent">
                        {ev.t}
                      </span>
                      {ev.text && (
                        <span className="font-mono text-[10px] text-signal italic">
                          "{ev.text}"
                        </span>
                      )}
                    </div>
                    <p className="text-ink text-[11px] leading-tight line-clamp-1">
                      {ev.scene}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-[9px] text-ink-muted bg-surface px-1.5 py-0.5 rounded-[2px] border border-rule">
                    {ev.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STAGE 3: Diagnostic Scorecard & Recommendation */}
        {stage === 3 && (
          <div className="space-y-3.5 animate-fade-in">
            {/* Scorecard Bars */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono text-[10px] uppercase text-ink-muted">
                <span>Evaluation Dimensions</span>
                <span>Score / 10</span>
              </div>
              {heroExhibit.scorecard.map((item, idx) => (
                <div key={item.dim} className="space-y-0.5">
                  <div className="flex justify-between font-body text-xs font-medium text-ink">
                    <span>{item.dim}</span>
                    <span className="font-mono text-[11px] font-semibold">
                      {item.score}/10
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-paper border border-rule/60 overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-700 ease-out"
                      style={{
                        width: `${(item.score / 10) * 100}%`,
                        transitionDelay: `${idx * 60}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendation Card */}
            <div className="rounded-[2px] border-l-2 border-l-signal border border-rule bg-paper p-2.5 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase font-semibold text-signal">
                  Strategic Action
                </span>
                <span className="font-mono text-[9px] uppercase px-1 py-0.2 bg-surface border border-rule text-signal rounded-[2px]">
                  Priority: {heroExhibit.recommendation.priority}
                </span>
              </div>
              <p className="text-ink text-[11px] leading-snug font-medium">
                {heroExhibit.recommendation.action}
              </p>
              <p className="mt-1 font-mono text-[10px] text-ink-muted">
                Evidence: {heroExhibit.recommendation.evidence}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Exhibit Footer Link */}
      <div className="mt-4 border-t border-rule pt-3 flex items-center justify-between text-xs">
        <a
          href="/work/adlens-ai"
          className="font-medium text-accent hover:text-ink transition-colors inline-flex items-center gap-1 font-mono text-[11px]"
        >
          <span>View full AdLens AI case study</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
        <span className="font-mono text-[10px] text-ink-muted">
          Stage {stage} of 3
        </span>
      </div>
    </div>
  );
}
