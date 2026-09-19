import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

// Self-hosted fonts: no render-blocking request to fonts.googleapis.com, and
// only the weights the design actually uses. The `latin-` prefix matters —
// the unprefixed files pull in cyrillic, greek and vietnamese subsets too,
// which roughly triples the font payload for a site written in English.
import "@fontsource/source-serif-4/latin-600.css";
import "@fontsource/source-serif-4/latin-700.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";

import "./index.css";
import App from "./App";

const container = document.getElementById("root")!;

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Prerendered pages arrive with markup already in #root, so hydrate those and
// only fall back to a fresh render during `vite dev`.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
