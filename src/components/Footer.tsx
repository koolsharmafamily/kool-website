import { site } from "../data/content";
import { Container } from "./ui";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-surface-sunk no-print">
      <Container className="flex flex-col items-start justify-between gap-5 py-9 sm:flex-row sm:items-center">
        <div>
          <p className="text-[0.85rem] text-ink-soft">
            © {new Date().getFullYear()} Kulvir Sharma · Melbourne, Australia
          </p>
          <p className="mt-1 text-[0.78rem] text-ink-soft">
            React · TypeScript · Tailwind · Prerendered for performance
          </p>
        </div>

        <ul className="flex list-none items-center gap-1 p-0">
          <li>
            <a
              href={`mailto:${site.email}`}
              className="grid h-11 w-11 place-items-center rounded-md text-ink-muted transition-colors duration-200 hover:text-accent"
            >
              <MailIcon className="h-[18px] w-[18px]" />
              <span className="sr-only">Email {site.email}</span>
            </a>
          </li>
          <li>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-md text-ink-muted transition-colors duration-200 hover:text-accent"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
              <span className="sr-only">LinkedIn profile (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-md text-ink-muted transition-colors duration-200 hover:text-accent"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
              <span className="sr-only">GitHub profile (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
