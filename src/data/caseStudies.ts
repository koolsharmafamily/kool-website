import type { CaseStudy } from "./types";

/**
 * Case study content. Every page renders from this file, so copy can be edited
 * without touching a component.
 *
 * Honesty rules applied throughout:
 *  - `status` tells the reader whether something shipped, was prototyped, or is a design.
 *  - `outcome.kind: "measured"` is used ONLY where a real figure exists. Everywhere
 *    else it is "expected", listing measures that would be tracked. No invented numbers.
 *  - Client data is anonymised and no individual is named.
 */

const adlens: CaseStudy = {
  slug: "adlens-ai",
  title: "AdLens AI",
  subtitle:
    "Turning unstructured ad videos into structured, evidence-based marketing intelligence",
  industry: "Marketing technology",
  role: "Product strategy, AI solution architecture, build",
  timeframe: "TODO(kulvir): dates",
  status: "Built prototype",
  tags: ["Applied AI", "Product strategy", "Solution architecture", "Workflow automation"],
  featured: true,
  cardProblem:
    "Creative review is manual, slow and inconsistent between analysts, and it does not scale across a large video library.",

  context: [
    "Marketing teams and agencies accumulate large libraries of video advertising. Deciding what to make next depends on understanding what is already there: which hooks worked, how the message was structured, how a competitor positioned the same product.",
    "That understanding is locked inside video, which is the least structured format an organisation owns. AdLens AI is a prototype I built to test whether that content can be turned into something queryable and comparable.",
  ],
  problem: [
    "Creative review is done by hand. An analyst watches each ad, takes notes, scores it against an internal rubric, researches competitors separately, and assembles the findings into slides.",
    "This is slow, and it is inconsistent: two analysts reviewing the same ad produce different scores, because the rubric lives in their heads rather than in the process. It also does not scale — the review effort grows linearly with the size of the library, so most libraries simply go unreviewed.",
    "Commercially, the cost is not the review time itself. It is that creative decisions get made on the few ads someone happened to watch recently.",
  ],
  framingQuestion:
    "How can an organisation turn unstructured marketing content into repeatable, actionable intelligence?",

  currentState: {
    kind: "beforeAfter",
    title: "Current state and target state",
    summary:
      "Today: a video is watched by a person, who writes notes, fills a spreadsheet and builds a presentation. Target: a video is processed by AI video understanding into structured evidence, assessed against a marketing framework, and surfaced as a dashboard and recommendations that feed an automated workflow.",
    before: {
      label: "Today",
      steps: [
        { label: "Video", tone: "muted" },
        { label: "Human watches", tone: "pain", detail: "Real time, once per ad" },
        { label: "Notes", tone: "pain", detail: "Format varies by analyst" },
        { label: "Spreadsheet", tone: "pain" },
        { label: "Presentation", tone: "muted" },
      ],
    },
    after: {
      label: "With AdLens",
      steps: [
        { label: "Video", tone: "muted" },
        { label: "AI video understanding", tone: "accent" },
        { label: "Structured evidence", tone: "accent" },
        { label: "Marketing framework", tone: "accent" },
        { label: "Dashboard", tone: "default" },
        { label: "Recommendations", tone: "default" },
        { label: "Automated workflow", tone: "default" },
      ],
    },
  },

  approach: [
    {
      title: "Framed it as a transformation problem, not a model problem",
      body: "The interesting question was never 'can a model describe a video'. It was 'what has to be true for a marketing team to trust and use that description'. That pushed the design towards evidence and traceability rather than a single generated summary.",
    },
    {
      title: "Separated perception from reasoning",
      body: "I split the system into an agent that observes what is in the video and a second agent that reasons about what it means for the marketing. Keeping them apart means each can be tested, corrected and improved without disturbing the other.",
    },
    {
      title: "Designed the output before the pipeline",
      body: "I wrote the target report first — the scorecard, the recommendation card, the competitive comparison — and then worked backwards to the data each one needed. That stopped the model from deciding what the product was.",
    },
    {
      title: "Built it into a workflow, not a chat window",
      body: "The prototype runs from a watched folder through to a report delivered where the team already works, because an analysis tool that requires someone to remember to open it gets used twice.",
    },
  ],

  solution: {
    intro:
      "AdLens processes a video into structured evidence, assesses that evidence against a marketing framework, and returns a scored report with specific, timestamped recommendations. Five layers sit between the raw file and a decision.",
    diagram: {
      kind: "stack",
      title: "Five transformation layers",
      summary:
        "Digitisation, then data extraction, then intelligence, then decision support, then automation.",
      layers: [
        {
          name: "Digitisation",
          body: "Video files become addressable assets with consistent metadata.",
        },
        {
          name: "Data extraction",
          body: "Scenes, speech, on-screen text and calls to action are pulled out with timestamps.",
        },
        {
          name: "Intelligence",
          body: "Extracted evidence is assessed against a marketing framework rather than described in prose.",
        },
        {
          name: "Decision support",
          body: "Scores and recommendations are presented with the evidence that produced them.",
        },
        {
          name: "Automation",
          body: "The whole path runs on a trigger and delivers into existing tools.",
        },
      ],
    },
    extraDiagram: {
      kind: "flow",
      title: "AI architecture",
      summary:
        "A video agent performs perception and produces structured evidence. A marketing agent reasons across creative, audience and messaging. A recommendation engine turns that into ranked actions, presented as a report or dashboard.",
      steps: [
        { label: "Video agent", detail: "Perception", tone: "accent" },
        { label: "Structured evidence", detail: "Timestamped, observed only" },
        {
          label: "Marketing agent",
          detail: "Reasoning across creative, audience, messaging",
          tone: "accent",
        },
        { label: "Recommendation engine", detail: "Ranked, evidence-linked" },
        { label: "Report or dashboard", detail: "Presentation", tone: "default" },
      ],
      caption:
        "The three stages are deliberately separate: each can be evaluated and improved on its own, and a failure in reasoning cannot silently rewrite what was observed.",
    },
    highlights: [
      "Observed facts and inferred judgements are stored separately, so a reader can always see what the model saw versus what it concluded.",
      "Every recommendation cites a timestamp, which makes it checkable in seconds.",
    ],
  },

  capabilityGrid: [
    {
      name: "Ad intelligence",
      body: "Scenes, speech, on-screen text and the call to action, each with a timestamp.",
    },
    {
      name: "Creative analysis",
      body: "Hook, storytelling, pacing, product visibility and emotional appeal.",
    },
    {
      name: "Strategy analysis",
      body: "Value proposition, audience, positioning and differentiation.",
    },
    {
      name: "Competitive benchmarking",
      body: "The same framework applied across several ads so they can be compared like for like.",
    },
    {
      name: "Improve this ad",
      body: "Three alternative concepts, each with a hook, script, storyboard and an A/B test hypothesis.",
    },
  ],

  recommendation: {
    problem: "The product appears before the customer's pain point is established.",
    evidence: "00:00–00:04, product demo.",
    recommendation: "Open with the pain point in the first 3 seconds.",
    priority: "High",
  },

  scorecard: {
    criteria: [
      "Hook",
      "Message clarity",
      "Value proposition",
      "Creative",
      "Brand integration",
      "Emotional appeal",
      "Call to action",
      "Conversion potential",
    ],
    note: "Illustrative output. A consistent review framework, not a performance prediction.",
  },

  challenges: [
    {
      title: "Reliable structured output",
      body: "Getting a multimodal model to return the same schema every time, including for ads that break the pattern it expects. The fix was strict schema validation with a bounded retry, rather than trusting the first response.",
    },
    {
      title: "Controlling hallucination",
      body: "The single most important design decision was keeping what was observed separate from what was inferred. A claim that cannot be traced to a timestamp does not reach the report.",
    },
    {
      title: "Timestamp alignment",
      body: "Speech, on-screen text and scene changes are detected on different clocks. They have to be reconciled before a recommendation can point at a moment and be believed.",
    },
    {
      title: "Failure and timeout handling",
      body: "Long videos time out and models occasionally return nothing. The pipeline had to treat that as an expected state with a queue and retry, not an error the user sees.",
    },
    {
      title: "Cost control",
      body: "Analysis cost scales with library size, so results are cached and the same video is never re-analysed unless the framework itself changes.",
    },
  ],

  tools: [
    "Google Gemini (multimodal)",
    "Next.js",
    "TypeScript",
    "Supabase",
    "n8n",
    "Vercel",
  ],

  outcome: {
    kind: "expected",
    intro:
      "This is a prototype, so there are no deployment figures to report. These are the measures I would put in place before calling it successful, and the ones I would expect a client to ask for.",
    groups: [
      {
        name: "Operational",
        items: ["Analysis time per ad", "Cost per analysis"],
      },
      {
        name: "Adoption",
        items: ["Active users", "Repeat usage per user"],
      },
      {
        name: "Quality",
        items: [
          "Analyst agreement with the AI assessment",
          "Hallucination rate, measured against the cited evidence",
        ],
      },
      {
        name: "Business",
        items: ["Creative iteration speed", "Time-to-launch for a new concept"],
      },
    ],
    items: [],
  },

  limitations: [
    "It cannot know real ROAS, conversion rate, customer intent or causal impact. It assesses the creative, not the market's response to it.",
    "The scorecard is a consistency device. It makes two analysts agree more often; it does not predict performance.",
    "Assessment quality depends on the framework encoded in the prompt, which is a point of view and should be argued with.",
  ],

  risks: [
    {
      title: "Over-trust in a score",
      body: "A number on a dashboard carries more authority than it has earned. The scorecard is labelled as a review framework everywhere it appears, and every score opens to the evidence behind it.",
    },
    {
      title: "Data and rights",
      body: "Competitor ads are third-party content. Any deployment needs a clear position on what may be stored and for how long.",
    },
    {
      title: "Cost at scale",
      body: "Multimodal analysis is not free. Without caching and deduplication, a large library turns into a large invoice.",
    },
    {
      title: "Change management",
      body: "This tool tells experienced creatives their work scores poorly. It lands very differently when introduced as a shared rubric than as a verdict.",
    },
  ],

  learned: [
    "The hard part of an AI product is not the model. It is deciding what the output should be, and building enough traceability that someone will act on it.",
    "Separating perception from reasoning made the system debuggable. When a recommendation was wrong, I could see immediately whether the model had misread the video or misjudged the marketing.",
    "AI adds the most value when it is built into existing processes rather than sitting alone as a chatbot.",
  ],
  next: [
    "Connect it to Meta, Google and TikTok Ads performance data so the assessments can be compared against what actually happened.",
    "Run a blind agreement test: several analysts score the same ads, and the gap between them measures whether the framework is doing its job.",
  ],

  links: [
    // TODO(kulvir): add the live demo URL, the GitHub URL, and a 30–60s screen
    // recording (MP4, muted, with a poster frame). Only add the code link once
    // the repo is clean and has a README.
  ],
};

const dsp: CaseStudy = {
  slug: "distributor-workflow-automation",
  title: "Distributor workflow research and automation",
  subtitle: "Finding where a distribution network actually loses time, then removing it",
  industry: "Asset management",
  role: "Distributor Success Intern",
  timeframe: "Dec 2024 – Feb 2025",
  status: "Delivered in role",
  tags: ["User research", "Process mapping", "Workflow automation", "Change adoption"],
  featured: true,
  cardProblem:
    "Distributors were spending hours each week assembling reporting by hand, and nobody had mapped where the time actually went.",

  context: [
    "DSP Asset Managers distributes mutual funds through a large network of independent distributors. Those distributors are not employees; they choose which fund house is easiest to work with.",
    "I joined the Distributor Success team, whose remit is that experience. The brief was open: find out what makes the relationship harder than it needs to be.",
  ],
  problem: [
    "Distributors were spending a substantial part of each week assembling reporting for their own clients — pulling figures from more than one system, re-keying them into a template, and going back and forth over email when something did not reconcile.",
    "The cost fell on the distributor rather than on the fund house, which is precisely why it had persisted: the people feeling the pain were not the people who could fix it.",
    "Commercially it matters because distributor attention is the scarce resource. Time spent on manual reporting is time not spent selling, and friction is a reason to favour a competitor.",
  ],

  currentState: {
    kind: "flow",
    title: "Current state: producing one distributor report",
    summary:
      "A client asks for a report. The distributor pulls data from more than one system, re-keys it into a template, checks it, resolves discrepancies over email, and sends the report. Several steps are manual and repeated for each client.",
    steps: [
      { label: "Client asks for a report", tone: "muted" },
      { label: "Pull data from multiple systems", tone: "pain", detail: "Manual, per client" },
      { label: "Re-key into a template", tone: "pain", detail: "Error-prone" },
      { label: "Check and reconcile", tone: "pain" },
      { label: "Email back and forth", tone: "pain", detail: "Delay measured in days" },
      { label: "Send report", tone: "muted" },
    ],
  },

  approach: [
    {
      title: "Interviewed more than 20 distributors",
      body: "I ran structured interviews across the network, asking people to walk me through their week rather than asking what they wanted. Stated preferences and actual time sinks turned out to be different things.",
    },
    {
      title: "Mapped the process as it runs",
      body: "I mapped the real reporting process, including the workarounds. The official process had five steps; the real one had considerably more, most of them undocumented.",
    },
    {
      title: "Sized the friction before proposing anything",
      body: "I grouped each pain point by how often it happened and how long it took, which separated the tasks that were irritating from the ones that were genuinely expensive. Only the second group justified building something.",
    },
    {
      title: "Built the automation, then taught it",
      body: "I designed Zapier workflows for the highest-frequency steps, then wrote CRM and RMX guides and ran two workshops. The build was the smaller half of the work.",
    },
  ],

  solution: {
    intro:
      "The redesign removed the re-keying step entirely and turned the email reconciliation loop into an exception path rather than the default. The distributor's job becomes reviewing a report rather than assembling one.",
    diagram: {
      kind: "flow",
      title: "Future state: the same report, automated",
      summary:
        "A scheduled trigger pulls data from the source systems automatically, populates the template, and routes only genuine discrepancies to a person. The distributor reviews and sends.",
      steps: [
        { label: "Scheduled trigger", tone: "accent" },
        { label: "Automated data pull", detail: "Source systems", tone: "accent" },
        { label: "Template populated", tone: "accent" },
        { label: "Exceptions only to a person", detail: "Not every report" },
        { label: "Distributor reviews", tone: "default" },
        { label: "Send report", tone: "muted" },
      ],
      caption:
        "The design goal was not to remove the distributor from the process. It was to change their task from assembly to judgement.",
    },
    highlights: [
      "Adoption was treated as part of the deliverable: guides and workshops shipped with the workflows, not after them.",
      "No distributor data was used in building or demonstrating the automation.",
    ],
  },

  tools: ["Zapier", "CRM platform", "RMX", "Excel", "Structured interviews", "Process mapping"],

  outcome: {
    kind: "measured",
    intro:
      "What I can state precisely is the work delivered. I did not have access to post-implementation time tracking, so I am not going to claim an hours-saved figure I cannot evidence.",
    items: [
      { value: "20+", label: "Distributors interviewed", source: "Structured interviews" },
      { value: "2", label: "Adoption workshops delivered" },
      { value: "1", label: "Reporting process mapped end to end, current and future state" },
    ],
    groups: [
      {
        name: "What I would track next",
        items: [
          "Hours per week spent on reporting, measured before and after",
          "Error rate and rework on submitted reports",
          "Cycle time from client request to report sent",
          "Share of active distributors using the workflow after 90 days",
        ],
      },
    ],
  },

  risks: [
    {
      title: "Data privacy",
      body: "Distributor and client data is sensitive and regulated. The workflows were designed to move data between approved systems only, and no real distributor data was used while building them.",
    },
    {
      title: "Adoption is the real risk",
      body: "An automation that half the network ignores is worse than none, because reporting then exists in two inconsistent forms. Hence the guides and workshops.",
    },
    {
      title: "Dependence on a no-code platform",
      body: "Zapier made it possible to build quickly inside an internship. It also means a third party sits in the path of a business process, which is a deliberate trade-off to revisit at scale.",
    },
    {
      title: "Process variation",
      body: "Distributors are independent businesses and do not all work the same way. A workflow built around the most common pattern will not fit everyone.",
    },
  ],

  learned: [
    "Asking people to describe their week surfaces different problems than asking them what they need. The most expensive step was one nobody thought to complain about.",
    "The build was the easy part. Writing the guides and running the workshops is what determined whether any of it was used.",
    "Sizing friction by frequency and duration is a cheap way to stop a project from automating the wrong thing.",
  ],
  next: [
    "Instrument the workflow so time saved is measured rather than estimated.",
    "Revisit whether the highest-volume steps belong in a supported internal system rather than a no-code tool.",
  ],
};

const agencyAdOps: CaseStudy = {
  slug: "agency-ad-operations",
  title: "Agency ad-operations automation",
  subtitle: "Centralised reporting and alerting across many client ad accounts",
  industry: "Digital marketing agency",
  role: "TODO(kulvir): confirm your role",
  timeframe: "TODO(kulvir): dates",
  // TODO(kulvir): confirm the status — Delivered in role, Built prototype, or Concept design.
  status: "Built prototype",
  tags: ["API integration", "Workflow automation", "Reporting", "Access control"],
  cardProblem:
    "Staff logged in and out of dozens of client ad accounts to pull reports by hand, so budget problems surfaced late.",

  context: [
    "A digital marketing agency managing many client advertising accounts across Google Ads and Meta Ads.",
    "Every account was reached individually. Staff logged in and out to pull reports, and checked budgets and campaign status one account at a time.",
    "TODO(kulvir): every detail on this page is drafted from your brief and needs confirming or correcting before this case study goes live.",
  ],
  problem: [
    "The reporting routine was repetitive and slow: switching between accounts, exporting the same figures, and assembling them into client-ready formats by hand.",
    "Because checks were manual, they happened on a schedule rather than continuously. A campaign that overspent or stopped delivering was discovered at the next check, not when it happened.",
    "Access control drifted as team members joined and left, because permissions were managed account by account.",
  ],

  currentState: {
    kind: "flow",
    title: "Current state: one reporting round",
    summary:
      "A staff member logs into each account in turn, exports figures by hand, pastes them into a client template, and repeats for the next account. Budget checks happen only during this round.",
    steps: [
      { label: "Log into account", tone: "pain", detail: "Repeated per client" },
      { label: "Export figures by hand", tone: "pain" },
      { label: "Paste into client template", tone: "pain", detail: "Error-prone" },
      { label: "Eyeball budgets", tone: "pain", detail: "Only during this round" },
      { label: "Next account", tone: "muted" },
    ],
  },

  approach: [
    {
      title: "Treated it as an access problem first",
      body: "Before any automation, the question was how servers and staff reach client platforms in a controlled, repeatable way. Everything else depends on that being settled.",
    },
    {
      title: "Used the official APIs",
      body: "Data comes from the Google Ads API and the Meta Marketing API, operated within each platform's policies. Nothing in the design works around a platform restriction.",
    },
    {
      title: "Separated collection from presentation",
      body: "Pulling data into one store, and producing reports from that store, are two different jobs. Keeping them apart means a report format can change without touching collection.",
    },
    {
      title: "Made alerting continuous",
      body: "Budget pacing and delivery anomalies are rules that run on the data as it lands, rather than checks a person remembers to do.",
    },
  ],

  solution: {
    intro:
      "A centralised automation layer: one controlled network path to the platforms, scheduled pulls into a single store, and rules that raise alerts and produce client reports from that store.",
    diagram: {
      kind: "hub",
      title: "Solution architecture",
      summary:
        "The Google Ads API and Meta Marketing API are reached through a secure VPN gateway with a static IP. n8n workflows pull daily spend, conversions, CPA and ROAS into a central data store, which feeds alerts, client reports and a dashboard.",
      inputs: ["Google Ads API", "Meta Marketing API"],
      hub: {
        label: "Secure gateway → n8n → central data store",
        detail: "Static IP, allow-listed. Daily spend, conversions, CPA, ROAS.",
      },
      outputs: ["Budget and anomaly alerts", "Automated weekly client reports", "Dashboard"],
      caption:
        "The VPN gateway exists so automation servers and staff reach client platforms from one controlled, allow-listed network. It is an access-control measure, operated within each platform's policies and official APIs.",
    },
    highlights: [
      "Multi-account structure through the Google Ads manager account (MCC) and Meta Business Manager, with role-based access for staff.",
      "Alerts post to Slack or email as pacing and anomaly rules fire, rather than waiting for a reporting round.",
    ],
  },

  tools: [
    "n8n",
    "Google Ads API",
    "Meta Marketing API",
    "Google Sheets or Supabase",
    "Slack",
    "VPN gateway with static IP",
  ],

  outcome: {
    kind: "expected",
    intro:
      "TODO(kulvir): if you have real figures — hours per week saved on reporting, or the number of accounts managed — put them here and change this section to measured. Until then these are the measures I would track.",
    items: [],
    groups: [
      {
        name: "Expected impact",
        items: [
          "Hours per week spent assembling client reports",
          "Number of accounts under automated monitoring",
          "Time from a budget breach occurring to someone being alerted",
          "Reporting errors found by clients rather than internally",
        ],
      },
    ],
  },

  risks: [
    {
      title: "Platform policy",
      body: "Everything runs through official APIs under each platform's terms. The gateway is about secure, centralised access — it is not a way to create, disguise or rotate accounts, and it must never be described or used that way.",
    },
    {
      title: "Credential handling",
      body: "Centralising access concentrates risk. API credentials need proper secret storage, rotation, and least-privilege scopes per client.",
    },
    {
      title: "Client data separation",
      body: "One store holding several clients' performance data requires hard separation, so a reporting bug cannot leak one client's figures into another's report.",
    },
    {
      title: "Alert fatigue",
      body: "Rules that fire too often get muted, at which point the system is worse than no alerting at all. Thresholds need tuning against real spend patterns.",
    },
  ],

  learned: [
    "TODO(kulvir): replace these with what you actually took from the project.",
    "Centralising access was the prerequisite, not a detail — no reporting automation is stable until the path to the data is.",
  ],
  next: [
    "TODO(kulvir): confirm what the next step would be, and whether this reached production.",
  ],
};

const constructionWorkforce: CaseStudy = {
  slug: "construction-workforce-automation",
  title: "Construction workforce automation",
  subtitle: "From site attendance to wages to invoicing, as one process instead of three",
  industry: "Construction",
  role: "TODO(kulvir): confirm your role",
  timeframe: "TODO(kulvir): dates",
  // TODO(kulvir): confirm — Built prototype if you built it, Concept design if not.
  status: "Built prototype",
  tags: ["Process redesign", "Workflow automation", "Payroll", "Operations"],
  cardProblem:
    "Attendance was recorded on paper, re-entered for wages, then re-entered again for invoicing — the same data, keyed three times.",

  context: [
    "A construction business tracking a daily workforce across sites, where the same underlying fact — who worked, where, for how long — drives both what workers are paid and what clients are billed.",
    "TODO(kulvir): confirm the organisation, the size of the workforce, and whether this was built or designed.",
  ],
  problem: [
    "Attendance was captured on site, on paper. That record was then re-entered to calculate wages, and re-entered a second time to raise client invoices.",
    "Keying the same data three times produces three chances to get it wrong, and the errors are expensive in both directions: underpaid workers, and under-billed clients who are never re-invoiced.",
    "It is also slow. Because each step waits for the previous one, invoicing lags the work by considerably longer than it needs to, which pushes out cash collection.",
  ],

  currentState: {
    kind: "flow",
    title: "Current state: one fact, entered three times",
    summary:
      "Attendance is recorded on paper on site, delivered to the office, re-entered into a wages calculation, and re-entered again into an invoice. Each re-entry is a separate opportunity for error and delay.",
    steps: [
      { label: "Paper attendance on site", tone: "pain" },
      { label: "Sheets delivered to office", tone: "pain", detail: "Delay, and loss" },
      { label: "Re-entered for wages", tone: "pain", detail: "Keying #2" },
      { label: "Re-entered for invoicing", tone: "pain", detail: "Keying #3" },
      { label: "Invoice sent", tone: "muted", detail: "Lagging the work" },
    ],
  },

  approach: [
    {
      title: "Mapped the data, not the departments",
      body: "Attendance, payroll and invoicing were three processes owned by different people, but they consume one fact. Following the data rather than the org chart made the duplication obvious.",
    },
    {
      title: "Captured at source",
      body: "The redesign records attendance once, digitally, at the point it happens — because every downstream problem traces back to that record being on paper.",
    },
    {
      title: "Made wages and invoicing two views of one record",
      body: "Rather than two processes reading two copies, both are derived from the same attendance record with different rates applied.",
    },
    {
      title: "Kept a human approval step",
      body: "Money leaving the business and invoices reaching clients both stay behind an explicit approval. Automation removes the keying, not the accountability.",
    },
  ],

  solution: {
    intro:
      "One digital capture at source, feeding both wage calculation and invoice generation from the same record, with approval gates before anything is paid or sent.",
    diagram: {
      kind: "flow",
      title: "Future state: captured once, used twice",
      summary:
        "Attendance is captured digitally on site into a single record. Wage calculation and invoice generation both derive from that record. A human approves before wages are paid and before invoices are sent.",
      steps: [
        { label: "Digital capture on site", tone: "accent", detail: "Recorded once" },
        { label: "Single attendance record", tone: "accent" },
        { label: "Wages calculated", detail: "Rates applied" },
        { label: "Invoice generated", detail: "Same record, client rates" },
        { label: "Approval", tone: "default", detail: "Human, before money moves" },
        { label: "Paid and sent", tone: "muted" },
      ],
      caption:
        "The change is not that steps were automated. It is that the same fact stopped being entered three times.",
    },
  },

  tools: [
    "TODO(kulvir): confirm the stack actually used",
    "Workflow automation",
    "Spreadsheet or database of record",
  ],

  outcome: {
    kind: "expected",
    intro:
      "TODO(kulvir): if this ran in the business, replace this with real figures and change the section to measured. These are the measures the redesign was aimed at.",
    items: [],
    groups: [
      {
        name: "Expected impact",
        items: [
          "Hours per week spent re-entering attendance data",
          "Payroll error rate, and corrections issued after payment",
          "Days from work performed to invoice sent",
          "Value of work billed late or not billed at all",
        ],
      },
    ],
  },

  risks: [
    {
      title: "Site conditions",
      body: "Digital capture has to work on a construction site: poor connectivity, gloves, weather, shared devices. A tool that assumes an office defeats the redesign at step one.",
    },
    {
      title: "Payroll accuracy is not negotiable",
      body: "Wages are the one area where an automation error is immediately serious and erodes trust permanently. Hence the approval gate before payment.",
    },
    {
      title: "Worker trust and monitoring",
      body: "Digital attendance capture can feel like surveillance. How it is introduced, and what else the data is used for, matters as much as the design.",
    },
    {
      title: "Change management",
      body: "The paper process is understood by everyone, including people who do not want to use an app. Adoption is the binding constraint.",
    },
  ],

  learned: [
    "TODO(kulvir): replace with your own takeaways.",
    "Following one fact through three departments is a fast way to find duplicated effort that an org-chart view hides.",
  ],
  next: [
    "TODO(kulvir): confirm whether this progressed beyond the prototype.",
  ],
};

const financeAutomation: CaseStudy = {
  slug: "finance-data-automation",
  title: "Finance data and Excel automation",
  subtitle: "Removing the manual assembly between operations data and the finance view",
  industry: "TODO(kulvir): confirm sector",
  role: "TODO(kulvir): confirm your role",
  timeframe: "TODO(kulvir): dates",
  // TODO(kulvir): confirm the status.
  status: "Delivered in role",
  tags: ["Excel automation", "Finance operations", "Data quality", "Reporting"],
  cardProblem:
    "The monthly finance view was rebuilt by hand each cycle from operational data, so it was always slightly out of date and hard to trust.",

  context: [
    "A business where the finance reporting cycle depended on operational data that lived somewhere else and arrived in an inconsistent shape.",
    "The employer's data is anonymised throughout. TODO(kulvir): confirm the sector and your role before this goes live.",
  ],
  problem: [
    "Each reporting cycle, operational figures were exported, cleaned by hand, reshaped to match the finance template, and reconciled. The work was repetitive but not mindless — the cleaning steps required judgement, which is exactly why nobody had automated them.",
    "The cost was timing and trust. The finance view was always a little behind operations, and when the two disagreed, resolving it meant redoing the assembly to find where a manual step had gone wrong.",
    "Commercially, decisions were made on a number that people were not fully confident in, which is worse than a number that is openly approximate.",
  ],

  currentState: {
    kind: "flow",
    title: "Current state: rebuilding the same view each cycle",
    summary:
      "Operational data is exported, cleaned by hand, reshaped into the finance template, reconciled, and reviewed. Every step is repeated in full each cycle.",
    steps: [
      { label: "Export operational data", tone: "muted" },
      { label: "Clean by hand", tone: "pain", detail: "Judgement, undocumented" },
      { label: "Reshape to finance template", tone: "pain", detail: "Repeated each cycle" },
      { label: "Reconcile differences", tone: "pain" },
      { label: "Review and publish", tone: "muted" },
    ],
  },

  approach: [
    {
      title: "Separated the mechanical steps from the judgement",
      body: "I worked through the cleaning process step by step and sorted it into rules that were consistent every cycle and decisions that genuinely needed a person. Only the first group was a candidate for automation.",
    },
    {
      title: "Wrote the rules down before building them",
      body: "Several cleaning steps existed only as habit. Documenting them was useful on its own, because two people were doing the same step differently.",
    },
    {
      title: "Automated the assembly, kept the review",
      body: "The rebuild became a repeatable transformation. The review step stayed exactly where it was, because the point was to remove typing, not oversight.",
    },
    {
      title: "Made exceptions visible",
      body: "Rows the rules could not handle are surfaced rather than silently dropped, so the person reviewing sees what needed judgement this cycle.",
    },
  ],

  solution: {
    intro:
      "The cycle becomes: import, apply documented rules, surface exceptions, review, publish. The judgement stays with finance; the assembly does not.",
    diagram: {
      kind: "flow",
      title: "Future state: assembled automatically, reviewed by a person",
      summary:
        "Operational data is imported, documented cleaning rules are applied automatically, exceptions are surfaced for a person to decide, and the reviewed result is published.",
      steps: [
        { label: "Import operational data", tone: "accent" },
        { label: "Documented rules applied", tone: "accent", detail: "Same every cycle" },
        { label: "Exceptions surfaced", detail: "Visible, not dropped" },
        { label: "Finance reviews", tone: "default", detail: "Judgement stays here" },
        { label: "Publish", tone: "muted" },
      ],
      caption:
        "Framed deliberately as removing manual effort, not replacing judgement — the review step is load-bearing and stays.",
    },
  },

  tools: ["Excel (advanced)", "TODO(kulvir): confirm any other tools used"],

  outcome: {
    kind: "expected",
    intro:
      "TODO(kulvir): add real figures if you have them, and change this section to measured.",
    items: [],
    groups: [
      {
        name: "Expected impact",
        items: [
          "Hours per cycle spent assembling the finance view",
          "Number of reconciliation differences requiring investigation",
          "Days from period close to the view being available",
          "Cleaning rules documented rather than held as habit",
        ],
      },
    ],
  },

  risks: [
    {
      title: "Automating a judgement by mistake",
      body: "The main risk is encoding a cleaning step that actually required thought, so a wrong number is produced confidently and consistently. Surfacing exceptions is the guard against this.",
    },
    {
      title: "Key-person dependency",
      body: "A powerful workbook that only one person understands is a new single point of failure. Documentation is part of the deliverable, not an extra.",
    },
    {
      title: "Source data changes",
      body: "The rules assume a shape. When the upstream export changes, the automation needs to fail loudly rather than quietly produce nonsense.",
    },
    {
      title: "Confidentiality",
      body: "Finance data is sensitive. Nothing identifying the employer or their figures appears in this case study.",
    },
  ],

  learned: [
    "The reason a repetitive task has survived is usually that part of it requires judgement. Finding the exact boundary is most of the analysis.",
    "Writing down an undocumented process has value before a single step is automated — it surfaced two people doing the same thing differently.",
  ],
  next: ["TODO(kulvir): confirm what you would do next here."],
};

const aiConstructionSite: CaseStudy = {
  slug: "ai-construction-site",
  title: "AI-powered construction site",
  subtitle: "Computer vision for safety and operations: what it could do, and what it would cost",
  industry: "Construction",
  role: "Concept design, solution architecture",
  timeframe: "Self-directed",
  status: "Concept design",
  tags: ["Computer vision", "Digital transformation", "Risk assessment", "Operating model"],
  cardProblem:
    "Site safety and progress tracking rely on someone being in the right place at the right time, and on reporting written after the fact.",

  context: [
    "Construction sites generate continuous visual information and almost none of it is captured. Safety compliance is checked by walking the site. Progress is reported by people who were there, written up afterwards.",
    "This is a vision piece rather than a build: a current-state and future-state design for applying computer vision on site, and an honest assessment of what would make it fail.",
  ],
  problem: [
    "Safety observation is sampled. A supervisor sees what they happen to see, which means near-misses and repeated unsafe practice are visible only if someone is present when they occur.",
    "Progress reporting is retrospective and subjective. By the time a delay is visible in a report, the schedule has already absorbed it.",
    "Incident investigation relies on recollection, because there is usually no record of what actually happened.",
    "Commercially, all three converge on the same thing: decisions about a site are made on partial information, and the gap is filled with experience rather than evidence.",
  ],

  currentState: {
    kind: "beforeAfter",
    title: "Current state and proposed future state",
    summary:
      "Today, safety is checked by walking the site, progress is reported after the fact, and incidents are reconstructed from memory. Proposed: continuous capture feeds computer vision analysis, producing safety alerts, objective progress tracking and an evidence trail, with a person deciding what happens next.",
    before: {
      label: "Today",
      steps: [
        { label: "Supervisor walks the site", tone: "pain", detail: "Sampled, not continuous" },
        { label: "Observation noted", tone: "pain" },
        { label: "Report written after the fact", tone: "pain", detail: "Subjective" },
        { label: "Incident reconstructed from memory", tone: "pain" },
      ],
    },
    after: {
      label: "Proposed",
      steps: [
        { label: "Continuous capture", tone: "accent" },
        { label: "Computer vision analysis", tone: "accent", detail: "PPE, exclusion zones, progress" },
        { label: "Safety alert in near real time", tone: "default" },
        { label: "Objective progress tracking", tone: "default" },
        { label: "Human decides the response", tone: "default", detail: "Always" },
      ],
    },
    caption:
      "The system's job is to notice reliably. Deciding what to do about it stays with the site team.",
  },

  approach: [
    {
      title: "Started from the decisions, not the technology",
      body: "I listed the decisions a site manager makes in a week and asked which are currently made without evidence. That produced three candidate uses — PPE compliance, exclusion zones, and progress against plan — and ruled out several others as solutions looking for a problem.",
    },
    {
      title: "Designed for alerting, not for policing",
      body: "The same camera can support a safety alert or an individual performance review. Those are different systems with different consent requirements, and conflating them is the fastest way to lose the workforce.",
    },
    {
      title: "Assumed the model will be wrong",
      body: "A false positive rate that is tolerable for progress tracking is not tolerable for a safety stoppage. The design routes different confidence levels to different responses.",
    },
    {
      title: "Costed the change, not just the build",
      body: "The expensive part is not cameras or models. It is consultation, consent, policy, and the supervisor time spent responding to alerts.",
    },
  ],

  solution: {
    intro:
      "Continuous capture feeding a vision pipeline whose outputs split by confidence and by purpose: high-confidence safety events alert immediately, progress signals accumulate into a tracked view, and everything is retained as an evidence trail under a defined policy.",
    diagram: {
      kind: "hub",
      title: "Proposed architecture",
      summary:
        "Site cameras and existing plan data feed a computer vision pipeline. Outputs are safety alerts, progress tracking against plan, and a retained evidence trail. A person decides the response to every alert.",
      inputs: ["Site cameras", "Programme and plan data"],
      hub: {
        label: "Computer vision pipeline",
        detail: "PPE and exclusion-zone detection, progress inference, confidence scoring",
      },
      outputs: [
        "Safety alerts, high confidence only",
        "Progress tracked against plan",
        "Retained evidence trail",
      ],
      caption:
        "Confidence scoring is the load-bearing part: it decides whether an output interrupts someone or merely accumulates.",
    },
    highlights: [
      "Value would come from three places: fewer repeated unsafe practices, earlier visibility of schedule slippage, and evidence for incident investigation.",
      "None of it works without the workforce accepting it, which makes consultation a design input rather than a rollout task.",
    ],
  },

  tools: [
    "Computer vision models",
    "Edge or cloud inference",
    "Programme and scheduling data",
    "TODO(kulvir): confirm whether you prototyped any part of this",
  ],

  outcome: {
    kind: "expected",
    intro:
      "This is a design, so there are no results. These are the measures that would decide whether it was worth doing — and I would want a baseline for each one before any camera was installed.",
    items: [],
    groups: [
      {
        name: "Safety",
        items: [
          "Repeat unsafe practices observed per site per month",
          "Time from an unsafe condition occurring to it being addressed",
          "Incidents where an evidence trail materially helped the investigation",
        ],
      },
      {
        name: "Operations",
        items: [
          "Days between actual schedule slippage and it appearing in reporting",
          "Accuracy of progress inference against surveyed progress",
        ],
      },
      {
        name: "Cost and adoption",
        items: [
          "Supervisor hours spent responding to alerts, including false positives",
          "Share of alerts acted on versus dismissed",
        ],
      },
    ],
  },

  risks: [
    {
      title: "Privacy and worker consent",
      body: "Continuous capture of a workplace is monitoring of identifiable people. It needs consultation before deployment, a clear and narrow statement of purpose, defined retention, and a genuine answer to 'will this be used against me'. Without that, the project should not proceed — this is a condition, not a mitigation.",
    },
    {
      title: "Accuracy and false confidence",
      body: "Vision models degrade in rain, low light, dust and occlusion — which describes most of a construction site. A missed detection presented as a clean safety record is worse than no system, because it creates false assurance.",
    },
    {
      title: "Scope creep into performance management",
      body: "Once the footage exists, there will be pressure to use it for productivity monitoring. The purpose limitation has to be written down and enforced, or the safety case collapses the first time it is breached.",
    },
    {
      title: "Change management and cost",
      body: "Alerts create work. If supervisors are not given time to respond, the system gets ignored, and an ignored safety alert is a liability in an investigation rather than an asset.",
    },
    {
      title: "Regulatory and industrial relations",
      body: "Workplace surveillance is regulated and, on unionised sites, negotiated. Legal and industrial agreement is a precondition of the pilot.",
    },
  ],

  learned: [
    "Writing the risk section first changed the design. Splitting outputs by confidence and by purpose came out of the consent problem, not the technical one.",
    "The hardest constraint on this idea is not model accuracy. It is that a workforce has to accept being recorded, and that is earned rather than assumed.",
  ],
  next: [
    "Test the premise cheaply: review existing site photography and ask whether the three target signals are even detectable in realistic conditions.",
    "Draft the purpose limitation and retention policy before any technical pilot, and take it to the workforce first.",
  ],
};

const trakit: CaseStudy = {
  slug: "trakit-australian-market-entry",
  title: "TrakIT: Australian market entry",
  subtitle: "Taking a B2B logistics SaaS platform into a new market, and rebuilding the site around its buyer",
  industry: "B2B SaaS, logistics",
  role: "Business Development Coordinator",
  timeframe: "Jan 2025 – Jun 2025",
  status: "Delivered in role",
  tags: ["Market analysis", "Competitor analysis", "Partnerships", "Buyer persona"],
  cardProblem:
    "A logistics SaaS platform wanted to enter Australia, but its website spoke to a user rather than to the person who signs the contract.",

  context: [
    "TrakIT is a B2B logistics SaaS platform built by Bitmetric Solutions, operating out of Ontario, Canada. I joined as Business Development Coordinator with a brief covering international growth.",
    "Australia was a target market where the product had no presence, no reference customers and no local partners.",
  ],
  problem: [
    "Entering a new market with an enterprise product means two different problems at once: finding out whether the market wants the product, and being credible enough that someone will take the first meeting.",
    "The website was the second problem in miniature. It described features to an operational user, while the person who actually signs an enterprise contract needs to understand risk, integration and whether the vendor will still exist next year.",
    "Commercially, that mismatch meant traffic arrived and left without the buyer finding anything addressed to them.",
  ],

  currentState: {
    kind: "flow",
    title: "Current state: what an enterprise buyer met",
    summary:
      "A buyer arrived on a site organised around product features for an operational user, found no material addressing procurement concerns such as integration, security or vendor stability, and left without a next step.",
    steps: [
      { label: "Buyer arrives", tone: "muted" },
      { label: "Feature-led pages", tone: "pain", detail: "Written for the end user" },
      { label: "No integration or risk detail", tone: "pain", detail: "The buyer's actual questions" },
      { label: "No clear next step", tone: "pain" },
      { label: "Leaves", tone: "muted" },
    ],
  },

  approach: [
    {
      title: "Sized the market and mapped the competitors",
      body: "I worked through the Australian logistics software landscape to establish who was already there, how they positioned, and where an entrant could be credible rather than merely cheaper.",
    },
    {
      title: "Defined the enterprise buyer persona",
      body: "I separated the user from the buyer. The user cares about the daily workflow; the buyer cares about integration, data, security, support and vendor risk. The existing site only served the first.",
    },
    {
      title: "Rebuilt the site around that persona",
      body: "I directed a full redesign organised around the buyer's sequence of questions rather than the product's feature list, with the procurement-relevant material promoted rather than buried.",
    },
    {
      title: "Built the pipeline directly",
      body: "Alongside the site, outbound outreach and a technology partnership in Melbourne, to create the local proof that a new-market entrant does not start with.",
    },
  ],

  solution: {
    intro:
      "The redesign reorganised the site around what an enterprise buyer needs to resolve before taking a meeting, in the order they need to resolve it.",
    diagram: {
      kind: "flow",
      title: "Future state: the buyer's path",
      summary:
        "A buyer arrives, sees the problem framed in their own terms, finds integration and security detail, sees proof, and reaches a clear next step.",
      steps: [
        { label: "Buyer arrives", tone: "muted" },
        { label: "Problem framed in their terms", tone: "accent" },
        { label: "Integration and security answered", tone: "accent", detail: "Promoted, not buried" },
        { label: "Proof and references", tone: "default" },
        { label: "Clear next step", tone: "default" },
      ],
      caption:
        "The content largely existed already. The change was deciding whose questions set the order.",
    },
  },

  tools: [
    "Market and competitor analysis",
    "Buyer persona development",
    "CRM",
    "Outbound sales",
    "Partnership development",
  ],

  outcome: {
    kind: "measured",
    intro:
      "One measured result from the redesign, plus the market-entry work delivered. I have not attributed pipeline to the site, because I could not separate it from the outbound activity running at the same time.",
    items: [
      {
        value: "35%",
        label: "Increase in session duration after the redesign",
        source: "TrakIT website analytics",
      },
      { value: "1", label: "Technology partnership initiated in Melbourne" },
      { value: "1", label: "Australian market and competitor analysis delivered" },
    ],
    groups: [
      {
        name: "What I would track next",
        items: [
          "Demo requests per thousand sessions, before and after",
          "Share of sessions reaching integration and security pages",
          "Meetings booked from the Australian market specifically",
        ],
      },
    ],
  },

  risks: [
    {
      title: "Session duration is a weak proxy",
      body: "Longer sessions can mean more engagement or more confusion. I am reporting it because it is what was measured, but demo requests would have been the better metric and I would insist on it next time.",
    },
    {
      title: "Entering a market without references",
      body: "Enterprise logistics buyers want local reference customers. Until one exists, every deal carries an unavoidable credibility discount, and partnerships are the cheapest way to borrow it.",
    },
    {
      title: "Localisation beyond language",
      body: "Australian logistics has its own compliance, carrier and integration landscape. A product that fits North America does not automatically fit, and assuming it does is the classic entry failure.",
    },
    {
      title: "Single-person pipeline",
      body: "The outreach depended on one person. That is fine for validating a market and not fine for sustaining one.",
    },
  ],

  learned: [
    "Separating the user from the buyer changed the whole site. Most of the content was already right; it was aimed at the wrong reader.",
    "I would choose a different success metric now. Session duration was available, but demo requests would have told me whether the redesign actually worked.",
    "In a new market, a local partnership buys credibility faster than any amount of outbound.",
  ],
  next: [
    "Instrument the buyer path properly and measure demo requests rather than time on page.",
    "Secure a first Australian reference customer, which unblocks everything else.",
  ],
};

const tradingAgent: CaseStudy = {
  slug: "options-trading-agent",
  title: "AI options-trading agent",
  subtitle: "An agentic workflow and API integration exercise, built to learn",
  industry: "Personal learning build",
  role: "Design and build",
  timeframe: "TODO(kulvir): dates",
  status: "Built prototype",
  tags: ["Agentic workflows", "API integration", "n8n", "Guardrails"],
  cardProblem:
    "How do you give an autonomous workflow access to a real financial API without giving it the ability to do something irreversible?",

  context: [
    "A self-directed build using n8n and the Zerodha Kite API. The interest was in agentic workflow design and API integration — specifically, how you constrain an automated system that touches something consequential.",
    "This is a learning build. It is not a trading strategy, it is not a product, and it has never run unsupervised.",
  ],
  problem: [
    "An agentic workflow that can read data is easy. One that can take an action which cannot be undone is a different engineering problem, and the interesting constraints are all on the action side.",
    "The design question I wanted to answer was: what has to be in place before an automated workflow is allowed anywhere near a real API that moves money?",
  ],
  framingQuestion:
    "What guardrails does an autonomous workflow need before it is allowed to act at all?",

  currentState: {
    kind: "flow",
    title: "The naive version, and why it is wrong",
    summary:
      "A naive agent reads market data, decides, and submits an order directly. There is no validation of the decision, no limit on size or frequency, and no human between the model and an irreversible action.",
    steps: [
      { label: "Read market data", tone: "muted" },
      { label: "Model decides", tone: "pain", detail: "Unvalidated" },
      { label: "Submit order", tone: "pain", detail: "Irreversible, unbounded" },
    ],
  },

  approach: [
    {
      title: "Built the constraints before the capability",
      body: "I implemented the rule checks, limits and approval step first, and only then connected anything that could place an order. Building it the other way round is how these projects cause damage.",
    },
    {
      title: "Made the agent propose, not act",
      body: "The workflow's output is a proposed action with its reasoning and the data behind it. Execution is a separate, gated step.",
    },
    {
      title: "Bounded everything",
      body: "Position size, frequency, instrument whitelist and a hard stop on the number of actions per session are enforced in the workflow, outside the model's control.",
    },
    {
      title: "Logged every decision",
      body: "Each proposal is recorded with its inputs, so the behaviour can be reviewed afterwards rather than inferred.",
    },
  ],

  solution: {
    intro:
      "The architecture puts three gates between a model's opinion and any real action: deterministic rule validation, hard limits, and explicit human approval.",
    diagram: {
      kind: "flow",
      title: "Architecture with guardrails",
      summary:
        "Market data is read through the API. The agent produces a proposed action with reasoning. Deterministic rules validate it, hard limits bound it, a human approves or rejects it, and only then is anything submitted. Every step is logged.",
      steps: [
        { label: "Market data via API", tone: "muted" },
        { label: "Agent proposes", detail: "With reasoning and inputs", tone: "accent" },
        { label: "Rule validation", detail: "Deterministic, outside the model", tone: "accent" },
        { label: "Hard limits", detail: "Size, frequency, whitelist", tone: "accent" },
        { label: "Human approval", detail: "Required, every time", tone: "default" },
        { label: "Logged", tone: "muted" },
      ],
      caption:
        "The model is the least trusted component in this diagram. Everything downstream of it is deterministic, and a person sits in the path.",
    },
    highlights: [
      "Rule validation is deliberately not done by the model — a system cannot check its own reasoning.",
      "The approval step is not a convenience toggle. Without it, this is not a design I would run.",
    ],
  },

  tools: ["n8n", "Zerodha Kite API", "Webhooks", "Structured logging"],

  outcome: {
    kind: "expected",
    intro:
      "There are no performance results here, and there will not be any. I make no claims about returns, profitability or live autonomous trading — this was built to learn agentic workflow design, and measuring it as a strategy would misrepresent what it is.",
    items: [],
    groups: [
      {
        name: "What the build was assessed on",
        items: [
          "Whether every proposed action passed through rule validation, with no path around it",
          "Whether hard limits held when the model proposed something outside them",
          "Whether the decision log was complete enough to reconstruct any proposal",
          "Whether the workflow failed safely when the API errored or timed out",
        ],
      },
    ],
  },

  limitations: [
    "No claims are made about returns, profitability, or live autonomous trading.",
    "It has never been run unsupervised, and the approval gate is not optional.",
    "Nothing here constitutes financial advice or a trading strategy.",
  ],

  risks: [
    {
      title: "Irreversible actions",
      body: "The central risk of any agentic system with real-world access. Addressed by making the agent propose rather than act, with a human approving every time.",
    },
    {
      title: "Model confidence without competence",
      body: "A model will produce a confident rationale for a poor decision. Deterministic rules sit outside the model precisely because its own confidence is not evidence.",
    },
    {
      title: "API credentials and access",
      body: "A workflow holding financial API credentials needs proper secret handling and the narrowest scopes the API allows.",
    },
    {
      title: "Presenting a learning build as more than it is",
      body: "The reputational risk here is describing this as a trading system. It is an exercise in constraint design, and I would rather say so plainly.",
    },
  ],

  learned: [
    "Designing the guardrails turned out to be the actual project. The agent was the straightforward part.",
    "Validation belongs outside the model. Asking a model to check its own output is not a control.",
    "Working out how a workflow should fail — API timeout, malformed response, limit breach — took longer than making it work.",
  ],
  next: [
    "Add a dry-run mode that replays historical data through the same gates, so the guardrails can be tested without touching a live API.",
  ],
};

/** Order matters: the first two render as larger cards. */
export const caseStudies: CaseStudy[] = [
  adlens,
  dsp,
  agencyAdOps,
  constructionWorkforce,
  financeAutomation,
  aiConstructionSite,
  trakit,
  tradingAgent,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? caseStudies[i - 1] : undefined,
    next: i < caseStudies.length - 1 ? caseStudies[i + 1] : undefined,
  };
}
