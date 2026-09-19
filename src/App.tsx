import { Route, Switch } from "wouter";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <>
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
    </>
  );
}
