import { KSMonogram } from "./KSMonogram";
import { Container } from "./ui";
import { Magnetic } from "./Magnetic";

export function Footer() {
  return (
    <footer className="border-t border-[#203047] bg-ink text-paper py-8 no-print">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Monogram and Copyright */}
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-[2px] bg-[#142338] text-paper border border-[#203047]">
            <KSMonogram size={16} />
          </div>
          <div className="text-xs text-[#A0ABB5]">
            <span>© {new Date().getFullYear()} Kulvir Sharma</span>
            <span className="mx-2 text-[#203047]">·</span>
            <span>Melbourne → India</span>
          </div>
        </div>

        {/* Tech Stack Signature */}
        <div className="font-mono text-[11px] text-[#A0ABB5] text-center">
          Built with React, TypeScript and Vercel
        </div>

        {/* Back to top */}
        <Magnetic maxDistance={4} intensity={0.2}>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#A0ABB5] hover:text-paper transition-colors py-1 px-2"
          >
            <span>Back to top</span>
            <span aria-hidden="true">&uarr;</span>
          </a>
        </Magnetic>
      </Container>
    </footer>
  );
}

