/** Shared shapes for case study content. Kept separate so content files stay readable. */

export type Status = "Delivered in role" | "Built prototype" | "Concept design";

export type StepTone = "default" | "accent" | "muted" | "pain";

export type FlowStep = {
  label: string;
  detail?: string;
  tone?: StepTone;
};

export type Diagram =
  | {
      kind: "flow";
      title: string;
      /** Plain-text equivalent, used as the accessible description. */
      summary: string;
      steps: FlowStep[];
      caption?: string;
    }
  | {
      kind: "beforeAfter";
      title: string;
      summary: string;
      before: { label: string; steps: FlowStep[] };
      after: { label: string; steps: FlowStep[] };
      caption?: string;
    }
  | {
      kind: "stack";
      title: string;
      summary: string;
      layers: { name: string; body: string }[];
      caption?: string;
    }
  | {
      kind: "hub";
      title: string;
      summary: string;
      inputs: string[];
      hub: { label: string; detail?: string };
      outputs: string[];
      caption?: string;
    };

export type OutcomeItem = {
  value?: string;
  label: string;
  source?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  industry: string;
  role: string;
  timeframe: string;
  status: Status;
  tags: string[];

  /** Card-only fields. */
  cardProblem: string;
  featured?: boolean;

  /** 2–3 sentences on the organisation and situation. */
  context: string[];
  /** What hurt, who it hurt, why it mattered commercially. */
  problem: string[];
  framingQuestion?: string;

  currentState: Diagram;

  approach: { title: string; body: string }[];

  solution: {
    intro: string;
    diagram: Diagram;
    /** Optional second diagram, e.g. the architecture behind the process. */
    extraDiagram?: Diagram;
    highlights?: string[];
  };

  tools: string[];

  outcome: {
    /** "measured" only where real figures exist. Otherwise "expected". */
    kind: "measured" | "expected";
    intro: string;
    items: OutcomeItem[];
    /** Grouped KPIs, used where the measures split by theme. */
    groups?: { name: string; items: string[] }[];
  };

  risks: { title: string; body: string }[];

  learned: string[];
  next: string[];

  links?: { label: string; href: string; note?: string }[];

  /** Flagship-only extras. */
  capabilityGrid?: { name: string; body: string }[];
  recommendation?: {
    problem: string;
    evidence: string;
    recommendation: string;
    priority: "High" | "Medium" | "Low";
  };
  scorecard?: { criteria: string[]; note: string };
  challenges?: { title: string; body: string }[];
  limitations?: string[];
};
