# Kulvir Sharma — portfolio

Portfolio site for graduate and analyst roles in Business Analysis, Digital
Transformation and Technology Consulting.

Live: https://kulvirsharma-portfolio.vercel.app

## Stack

Vite · React 19 · TypeScript · Tailwind v4 · wouter (routing). No animation
library — the motion the site uses is CSS.

## Running it

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run lint` | oxlint |
| `node scripts/gen-sitemap.mjs` | Regenerate `public/sitemap.xml` from the case study slugs |

If `npm run build` ever fails with `MODULE_NOT_FOUND` for a package that `npm ls`
says is installed, the install is partially extracted. Fix:

```bash
rm -rf node_modules && npm install
```

## Editing content

All copy lives in `src/data/` — you should not need to touch a component to
change words.

- `src/data/content.ts` — everything on the home page
- `src/data/caseStudies.ts` — the eight case studies
- `src/data/types.ts` — the shape a case study takes

Search the repo for `TODO(kulvir)` for the facts still to confirm.

### Adding a case study

Add an object to the `caseStudies` array in `src/data/caseStudies.ts`. It routes
automatically at `/work/<slug>`. Then run `node scripts/gen-sitemap.mjs`.

### Diagrams

Diagrams are components, not screenshots, so they stay sharp and are edited from
the data file. Four kinds are available: `flow`, `beforeAfter`, `stack` and
`hub`. Each carries a `summary` string, which is the text equivalent read by
screen readers — keep it accurate when you change the steps.

## Conventions worth keeping

- **Status badges are load-bearing.** `Delivered in role`, `Built prototype` and
  `Concept design` tell a reader what they are looking at. Do not inflate them.
- **Real numbers only.** `outcome.kind: "measured"` is for figures that exist.
  Everywhere else use `"expected"` and list the measures you would track.
- **Money always carries a currency.**
- **Australian/British spelling.**
- **Content is visible by default.** Reveal animations are opt-in via a flag set
  in `index.html`; if JS, IntersectionObserver or motion preference says no, the
  page still renders in full. Do not invert this.

## Deployment

Vercel, from the repo root. `vercel.json` provides the SPA rewrite so deep links
to `/work/<slug>` resolve instead of 404ing.

`vite.config.ts` deliberately sets no `base` — the site is served from the domain
root. Setting a subpath there breaks every asset URL in production.

## Before going live

- [ ] Put `Kulvir-Sharma-Resume.pdf` in `public/`
- [ ] Resolve the `TODO(kulvir)` items
- [ ] Confirm the GitHub URL in `src/data/content.ts`, and pin the best repos
- [ ] Re-run Lighthouse on the deployed URL
