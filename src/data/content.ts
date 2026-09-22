/**
 * All home-page copy lives here so it can be edited without touching components.
 * Case study content lives in ./caseStudies.ts.
 *
 * Rules kept while writing this file:
 *  - No invented facts, dates, metrics or tools. Unknowns are marked TODO(kulvir).
 *  - Every number is tied to a named source.
 *  - Money figures always carry a currency.
 *  - Australian/British spelling throughout.
 */

import type { OtherWorkItem } from "./types";

export const site = {
  name: "Kulvir Sharma",
  role: "Business Analyst, Digital Transformation",
  url: "https://kulvirsharma-portfolio.vercel.app",
  email: "kulvirsharma13@gmail.com",
  linkedin: "https://www.linkedin.com/in/kulvir-sharma-0452a5256/",
  // TODO(kulvir): before sending the link out, pin your best repos (AdLens
  // first — it has no repo on this account yet) and make unfinished ones
  // private. Recruiters won't read the code, but technical interviewers might.
  github: "https://github.com/koolsharmafamily",
  resume: "/Kulvir-Sharma-Resume.pdf",
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Approach", href: "/#approach" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  kicker: "BUSINESS ANALYST · DIGITAL TRANSFORMATION · MELBOURNE → INDIA",
  name: "Kulvir Sharma",
  role: "Business Analyst, Digital Transformation",
  value: "I diagnose structural business problems and engineer practical, technology-enabled solutions.",
  sub: "Commerce graduate (Finance & Management), University of Melbourne. Proven track record across M&A lead advisory (Grant Thornton), wealth management workflows (DSP Asset Managers), and applied AI architectures.",
  trustedBy: [
    "Grant Thornton Bharat",
    "DSP Asset Managers",
    "Publicis Sapient",
    "TrakIT",
    "University of Melbourne",
  ],
};

/** Four audited metrics, each tied to its institutional source. */
export const proofPoints = [
  {
    value: "3",
    label: "M&A transactions supported in lead advisory",
    source: "Grant Thornton Bharat",
  },
  {
    value: "20+",
    label: "Distributors interviewed for workflow research",
    source: "DSP Asset Managers",
  },
  {
    value: "35%",
    label: "Increase in session duration after buyer redesign",
    source: "TrakIT",
  },
  {
    value: "2,000+",
    label: "Customers served across commercial ventures",
    source: "KoolKollects, founded venture",
  },
];


export const approach = {
  intro:
    "Whether it is an institutional booking process, multi-account agency reporting, or a content pipeline, I isolate the structural friction and build targeted solutions.",
  steps: [
    {
      name: "Understand",
      question: "What actually happens today?",
      body: "I sit with the people doing the work and map the process as it runs, not as the documentation describes it.",
      caption: "Applied in: DSP distributor research",
    },
    {
      name: "Analyse",
      question: "Where does the time and the money go?",
      body: "I separate the friction that is merely annoying from the friction that is expensive, then size the gap.",
      caption: "Applied in: Construction workforce redesign",
    },
    {
      name: "Design",
      question: "What should happen instead?",
      body: "I design the future-state process first, and only then decide which parts are worth automating.",
      caption: "Applied in: Finance reporting automation",
    },
    {
      name: "Build",
      question: "Does it work outside a slide?",
      body: "I build a working version (a workflow, an integration, or a functional prototype) so the recommendation can be tested rather than argued about.",
      caption: "Applied in: AdLens AI prototype",
    },
    {
      name: "Measure",
      question: "How will we know it worked?",
      body: "I define the measures before launch, so the result is a measurable metric rather than an opinion.",
      caption: "Applied in: TrakIT Australian market entry",
    },
  ],
};

/** Compact: one line per role. Full detail lives in the resume PDF. */
export const experience = [
  {
    org: "Anylytics",
    title: "Management Consultant Trainee",
    dates: "Mar 2026 – Present",
    location: "Melbourne, Australia",
    shows: "Translating business requirements into product features",
  },
  {
    org: "Publicis Sapient",
    title: "Business Consulting Intern",
    dates: "Nov 2025 – Jan 2026",
    location: "Delhi, India",
    shows: "Research synthesis for senior stakeholders",
  },
  {
    org: "Bitmetric Solutions (TrakIT)",
    title: "Business Development Coordinator",
    dates: "Jan 2025 – Jun 2025",
    location: "Ontario, Canada",
    shows: "Market entry and buyer-persona website redesign",
  },
  {
    org: "DSP Asset Managers",
    title: "Distributor Success Intern",
    dates: "Dec 2024 – Feb 2025",
    location: "Mumbai, India",
    shows: "User research, then automation, then adoption",
  },
  {
    org: "Grant Thornton Bharat",
    title: "Lead Advisory Trainee",
    dates: "Dec 2023 – Feb 2024",
    location: "Mumbai, India",
    shows: "DCF, comparable companies and synergy analysis across 3 transactions",
  },
  {
    org: "Enouvo Solutions, with the University of Melbourne",
    title: "Management Consultant Project",
    dates: "Nov 2023 – Dec 2023",
    location: "Da Nang, Vietnam",
    shows: "ASEAN regulatory and market-entry assessment",
  },
  {
    org: "Squash & Racquetball Victoria",
    title: "Marketing & Events Intern",
    dates: "Apr 2023 – Oct 2023",
    location: "Melbourne, Australia",
    shows: "Running an event end to end, including the budget",
  },
  {
    org: "KoolKollects",
    title: "Founder & Growth Strategist",
    dates: "May 2021 – Jun 2022",
    location: "Nagpur, India",
    shows: "Building and operating a venture to ~A$40K annual revenue",
  },
];

export const education = {
  primary: {
    institution: "The University of Melbourne",
    qualification: "Bachelor of Commerce: Finance & Management",
    dates: "2022 – 2026",
    scholarships: [
      "Olive Wykes & Elite Athlete Scholarship, Janet Clarke Hall (2023, 2024)",
      "International Undergraduate Scholarship (2022)",
      "Elite Athlete Sports Scholarship (2022–24)",
      "UniMelb Sports Award (2022–24)",
    ],
  },
  further: [
    {
      institution: "Outskill",
      qualification: "AI Engineering Accelerator",
      // TODO(kulvir): confirm the dates for this programme.
      dates: "",
    },
    {
      institution: "SSCBS, University of Delhi",
      qualification: "Diploma in Digital Marketing",
      dates: "Nov 2021 – Mar 2022",
    },
  ],
};

export const beyondWork = {
  body: "Represented India at the Junior Asian Games; former India No. 2 and National Squash Champion; UniNationals Australia 3-time medallist; coach.",
  lesson:
    "Fifteen years of elite competition taught me the things consulting actually runs on: performing under pressure, setting measurable goals, and coaching other people to hit them.",
  extra:
    "Outside athletics, I teach music theory and piano accompaniment, perform in rock bands, and produce live music events. Breaking down complex theory for students and adapting live with an ensemble reinforced the same communication, listening, and collaborative habits I bring to client work.",
};

export const toolkit = [
  {
    group: "Business and analysis",
    items: [
      "Process mapping",
      "Requirements gathering",
      "KPI analysis",
      "Business cases",
      "Financial modelling (DCF, comparable companies)",
      "Market research",
    ],
  },
  {
    group: "Automation and AI",
    items: [
      "n8n",
      "Zapier",
      "API integration",
      "GenAI and LLM workflows",
      "AI agents",
      "RAG",
    ],
  },
  {
    group: "Data and tools",
    items: ["Excel (advanced)", "CRM platforms", "Python (basic)", "SaaS tools"],
  },
  {
    group: "Build and platforms",
    items: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Vercel",
      "Google Gemini",
      "Google Ads API",
      "Meta Marketing API",
      "Cal.com",
    ],
  },
];
// TODO(kulvir): keep "Python (basic)" only if you can demo it in an interview.
// If not, delete that line from the "Data and tools" group above.

/** Compact cards: one line plus links. No full case study page. */
export const otherWork: OtherWorkItem[] = [
  {
    title: "Digitising small businesses: bookings, enquiries and online presence",
    body: "Websites for small practices and independent businesses, each built around the one action the owner needs a visitor to take.",
    gallery: [
      {
        name: "The Mint Couch",
        note: "A psychologist's practice website with an integrated Cal.com booking system, so clients book and confirm sessions without phone or email back-and-forth.",
      },
      {
        name: "Kool Kalakaars",
        note: "The website for a monthly music event at a major cultural centre in Nagpur.",
      },
      {
        name: "Squash coaching",
        note: "Used for enquiries and session bookings.",
      },
    ],
  },
  {
    title: "Kool Karaoke",
    body: "An app that combines several APIs into a single songbook, pulling lyrics, notes and chords automatically for any song and replacing a manual search across multiple sites.",
    // TODO(kulvir): which APIs, and a link.
    meta: "",
  },
  {
    title: "GenAI content automation studio",
    body: "A content pipeline for a music band, built to turn one session into a run of publishable assets.",
    meta: "",
  },
  {
    title: "Automated cinema food-ordering workflow",
    body: "An ordering flow designed to remove the queue between the customer and the kitchen.",
    meta: "",
  },
  {
    title: "Elite Akademy: growth strategy and CRM consulting",
    body: "Growth strategy and CRM advisory for a sports academy.",
    meta: "",
  },
];

export const contact = {
  title: "Let's talk about the problem you're solving.",
  line: "Open to Business Analyst, Digital Transformation and Technology Consulting roles across Melbourne and India.",
  note: "The quickest way to reach me is email. I reply to every enquiry.",
};
