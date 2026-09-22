/**
 * Source-of-truth content for every animated exhibit on the site.
 * Supplied or confirmed by Kulvir. Animate exactly these steps — do not invent new ones.
 */

export type Step = { label: string; pain?: boolean; automated?: boolean };

/* ---------- M1: Hero exhibit, AdLens analysing a sample ad ---------- */
export const heroExhibit = {
  title: "EXHIBIT 1 · AdLens AI",
  sampleAd: "Pulse smart bottle · 27s ad (illustrative sample)",
  loops: 2, // play twice, then hold on the final stage
  evidence: [
    { t: "00:00–00:03", scene: "Person exhausted after a workout", text: "Still forgetting to drink enough water?", tag: "Hook · Pain point" },
    { t: "00:03–00:07", scene: "Pulse bottle appears; person fills it", tag: "Product intro" },
    { t: "00:07–00:13", scene: "Bottle shows hydration reminder; phone notification", tag: "Key feature · Demo" },
    { t: "00:13–00:18", scene: "Person drinks water mid-workout", tag: "Use case · Audience: active adults" },
    { t: "00:18–00:22", scene: "Close-up of bottle and product benefits", tag: "Benefits" },
    { t: "00:22–00:27", scene: "Product hero shot", tag: "Branding" },
  ],
  cta: "Stay on top of your hydration. Shop Pulse.",
  // Illustrative scores for the demo animation. Label them as illustrative in the UI.
  scorecard: [
    { dim: "Hook", score: 8 },
    { dim: "Message clarity", score: 8 },
    { dim: "Value proposition", score: 7 },
    { dim: "Product visibility", score: 8 },
    { dim: "CTA", score: 6 },
  ],
  recommendation: {
    problem: "The CTA arrives only in the final 5 seconds and has no urgency or offer.",
    evidence: "00:22–00:27 · hero shot, then CTA",
    action: "Surface the reminder feature and a soft CTA by 00:13, and add an offer to the end card.",
    priority: "Medium",
  },
};

/* ---------- M3: Architecture data flows ---------- */
export const flows = {
  adlens: ["Google Drive", "n8n", "AdLens API", "Gemini", "Supabase", "Slack / Email / Sheets"],
  // TODO(kulvir): confirm the tools and order for agency ad-ops. This is the current draft.
  agencyAdOps: ["Google Ads API + Meta Marketing API", "Secure VPN gateway", "n8n", "Central data store", "Alerts (Slack/Email) + client reports"],
  tradingAgent: ["Market data", "n8n", "LLM", "Rules & controls", "Zerodha Kite API"],
};

/* ---------- M2: Before / after process diagrams ---------- */
export const processes = {
  constructionWorkforce: {
    beforeLabel: "Manual process",
    afterLabel: "Automated process",
    before: [
      { label: "Manual attendance capture", pain: true },
      { label: "Hours & workforce data compiled", pain: true },
      { label: "Wages calculated manually", pain: true },
      { label: "Data checked & reconciled", pain: true },
      { label: "Invoices prepared manually", pain: true },
      { label: "Records stored / updated" },
    ] as Step[],
    after: [
      { label: "Workforce attendance captured" },
      { label: "Hours & worker data processed", automated: true },
      { label: "Wages calculated", automated: true },
      { label: "Data validated, exceptions flagged", automated: true },
      { label: "Invoices generated", automated: true },
      { label: "Records & reports updated", automated: true },
    ] as Step[],
  },
  financeExcel: {
    beforeLabel: "Manual process",
    afterLabel: "Automated process",
    before: [
      { label: "Financial data received" },
      { label: "Manually entered into Excel", pain: true },
      { label: "Cleaned & formatted manually", pain: true },
      { label: "Calculations & formulas updated", pain: true },
      { label: "Outputs checked manually", pain: true },
      { label: "Reports shared" },
    ] as Step[],
    after: [
      { label: "Financial data received" },
      { label: "Data extracted", automated: true },
      { label: "Cleaned & structured", automated: true },
      { label: "Excel calculations populated", automated: true },
      { label: "Outputs validated" },
      { label: "Reports generated & shared", automated: true },
    ] as Step[],
  },
  dspDistributor: {
    // Research-led work: label the second row "Improved / proposed", never "Automated".
    beforeLabel: "How the work was approached",
    afterLabel: "Improved / proposed workflow",
    before: [
      { label: "Distributor research (20+ interviews)" },
      { label: "Pain points identified" },
      { label: "Existing workflow analysed" },
      { label: "Manual, repetitive tasks identified", pain: true },
      { label: "Automation opportunities mapped" },
      { label: "Recommendations presented" },
    ] as Step[],
    after: [
      { label: "Distributor requirements captured" },
      { label: "Workflow standardised" },
      { label: "Repetitive tasks automated (proposed)", automated: true },
      { label: "CRM / workflow usability improved" },
      { label: "How-to guidance provided" },
      { label: "More consistent distributor operations" },
    ] as Step[],
  },
};

/* ---------- M4: Proof strip (confirmed) ---------- */
export const proof = [
  { value: 3, suffix: "", label: "M&A transactions supported", source: "Grant Thornton Bharat" },
  { value: 20, suffix: "+", label: "Distributors interviewed", source: "DSP Asset Managers" },
  { value: 35, suffix: "%", label: "Increase in session duration", source: "TrakIT" },
  { value: 2000, suffix: "+", label: "Customers served", source: "KoolKollects" },
];

export const motionPrefs = { heroLoops: 2, caseCardPageTransition: true };
