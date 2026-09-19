import { Link } from "wouter";
import { Container } from "../components/ui";
import { ArrowIcon } from "../components/Icons";

export function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <p className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-accent">
        404
      </p>
      <h1 className="mt-3 text-[2rem] sm:text-[2.5rem]">This page does not exist</h1>
      <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-ink-muted">
        The link may be out of date. The case studies are all listed on the home page.
      </p>
      <Link
        href="/#work"
        className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        <ArrowIcon className="h-4 w-4 rotate-180" />
        Back to the case studies
      </Link>
    </Container>
  );
}
