import { Hero, ProofStrip } from "../components/Hero";
import { Approach } from "../components/Approach";
import { Work } from "../components/Work";
import { Experience } from "../components/Experience";
import { About } from "../components/About";
import { OtherWork } from "../components/OtherWork";
import { Contact } from "../components/Contact";
import { useDocumentMeta } from "../lib/useDocumentMeta";

const TITLE = "Kulvir Sharma | Business Analyst, Digital Transformation";
const DESCRIPTION =
  "I turn business problems into practical, technology-enabled solutions. Case studies in process redesign, workflow automation and applied AI, from a Commerce graduate at the University of Melbourne.";

export function Home() {
  useDocumentMeta({ title: TITLE, description: DESCRIPTION, path: "/" });

  return (
    <>
      <Hero />
      <ProofStrip />
      <Work />
      <Approach />
      <Experience />
      <About />
      <OtherWork />
      <Contact />
    </>
  );
}
