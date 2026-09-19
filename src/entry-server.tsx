import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
// wouter takes the path for a static render through `ssrPath` on <Router>;
// the client uses the default browser router and hydrates over the result.
import { Router } from "wouter";
import App from "./App";
import { caseStudies } from "./data/caseStudies";

export type PrerenderRoute = {
  path: string;
  title: string;
  description: string;
  /** Excluded from the sitemap and marked noindex when false. */
  index: boolean;
  priority: number;
  /** Open Graph type — the home page is the site, a case study is a document. */
  ogType: "website" | "article";
};

export const SITE_TITLE = "Kulvir Sharma | Business Analyst, Digital Transformation";
export const SITE_DESCRIPTION =
  "I turn business problems into practical, technology-enabled solutions. Case studies in process redesign, workflow automation and applied AI, from a Commerce graduate at the University of Melbourne.";

/**
 * Every route the build writes to disk. The prerenderer and the sitemap both
 * read this, so they cannot disagree about what exists.
 */
export function getRoutes(): PrerenderRoute[] {
  return [
    {
      path: "/",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      index: true,
      priority: 1.0,
      ogType: "website",
    },
    ...caseStudies.map((study) => ({
      path: `/work/${study.slug}`,
      title: `${study.title} — ${study.subtitle} | Kulvir Sharma`,
      description: study.cardProblem,
      index: true,
      priority: 0.8,
      ogType: "article" as const,
    })),
  ];
}

/**
 * Renders one route to an HTML string. Called by scripts/prerender.mjs once per
 * route at build time — there is no server at runtime.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <Router ssrPath={url}>
        <App />
      </Router>
    </StrictMode>,
  );
}
