import { Route, Switch } from "wouter";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GrainOverlay } from "./components/GrainOverlay";
import { Home } from "./pages/Home";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Toaster
        position="bottom-right"
        richColors={false}
        closeButton={false}
        toastOptions={{
          duration: 2500,
        }}
      />

      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/work/:slug">{(params) => <CaseStudyPage slug={params.slug} />}</Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      {/* Cookieless, so no consent banner is required. */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

