import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

// Self-hosted fonts: Fraunces (display), Inter Tight (body), IBM Plex Mono (data/labels)
import "@fontsource/fraunces/latin-400.css";
import "@fontsource/fraunces/latin-500.css";
import "@fontsource/inter-tight/latin-400.css";
import "@fontsource/inter-tight/latin-500.css";
import "@fontsource/inter-tight/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";

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
