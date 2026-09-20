# Prompt for Claude Code: redesign the portfolio so it looks crafted, not generated

> Paste everything below into Claude Code from the `kool-website` folder.

---

## Context

This repo powers https://kulvirsharma-portfolio.vercel.app. The **content and structure are right**: the case studies, status badges, routes and resume link all stay. The problem is **presentation**. The site looks like a default AI template: plain, text-heavy and interchangeable. It will be linked from my resume for Business Analyst, Digital Transformation and Technology Consulting roles at TCS, IBM Consulting, Capgemini, Deloitte, PwC, EY, KPMG, Accenture and Infosys in India.

**The goal:** a recruiter should think *"this person has taste, thinks in structures, and can build"* within 10 seconds. Aim for something between a **McKinsey or BCG insights article** and a **Stripe or Linear product page**: editorial, precise and confident, never flashy.

**Ignore missing personal information for now.** Where something is needed (a photo, links, metrics), build the slot with a tasteful placeholder and add it to `TODO-FOR-KULVIR.md`. Don't change any factual claims in the content files.

---

## Part 1: Audit findings (from reviewing the live site at 1512px)

Fix every one of these.

### Why it reads as "AI-made"
1. **Default template signature.** Inter plus a stock serif, the default Tailwind blue (`#1a56a8`), white bordered cards with soft shadows, grey pill chips on everything, and small uppercase blue "eyebrow" labels above every heading. That combination is exactly what generated sites look like.
2. **Every section has the same layout:** eyebrow, H2, grey paragraph, then a grid of identical cards. There is no rhythm, no contrast between sections, and no single moment of design.
3. **Self-referential, meta copy**, for example *"Each one states plainly whether it shipped…"* and *"One line each — the resume has the detail."* It sounds like the site talking about itself. Delete that kind of line; let the work speak.
4. **Em dashes everywhere** in the copy, a well-known AI tell. Replace them with full stops, commas or colons across all content files. Keep an en dash only in date ranges.
5. **No visuals at all.** Not one image, thumbnail, portrait or real diagram on the home page. Eight identical text cards read like a spreadsheet.

### Layout issues
6. **Hero:** everything sits in the left 45%, and the right half of the first screen is empty. There's no portrait and no visual anchor. Name, title, tagline and sub-line compete at similar weights. There are two resume buttons in the same view (the nav one and the hero one).
7. **Proof strip:** the space between hero and work is a flat grey band with little presence. The numbers need to be the first strong visual moment.
8. **Case study grid:** eight cards at the same visual weight, each holding four chips, a two-line subtitle, a clamped problem sentence and a link. That's too much text per card and nothing to scan. The flagship (AdLens) doesn't stand out.
9. **Reveal animation bug:** at normal scroll speed, whole sections (Method, the case study hero, the diagrams) stay washed out at low opacity and look disabled or broken. The Chrome renderer also stalled while capturing screenshots mid-scroll, so check for expensive work that runs on scroll.
10. **Approach section:** five narrow columns of grey italic text, low contrast and hard to read.
11. **Experience:** a plain list with no dates visible at a glance and no company marks. The empty space on the right is wasted.
12. **Education:** long scholarship chips wrap awkwardly. The Outskill card is mostly empty.
13. **Case study pages:** the body text is capped around 900px and left-aligned, leaving the right third empty on desktop. The title block is grey on grey. Diagrams are small grey boxes with tiny arrows and don't look like consulting exhibits. There's no table of contents and no summary box at a glance.
14. **Nav:** the plain text links have a weak active state, and the name as a logo has no identity mark.

---

## Part 2: Design direction ("The Consultant's Report")

### Identity
- **Monogram "KS"**: a small square mark (serif K and S set tight, or a K|S split by a hairline) used in the nav, the favicon and the OG image. Build it as an SVG component.
- **Palette** (replace the tokens in `src/index.css`):
  - `ink` #0E1A2B (deep navy-black), used for text and the dark sections
  - `paper` #F7F5F0 (warm off-white), the page background
  - `surface` #FFFFFF
  - `rule` #E3DED3
  - `accent` #0F5B5B (deep teal), the one accent colour for links, focus and highlights. The point is to avoid the default blue.
  - `signal` #C8762B (muted amber), used **only** for numbers and data highlights in diagrams and stats, never on buttons
  - Status badges: Delivered in role uses teal on a light teal wash; Built prototype uses navy outline; Concept design uses dashed outline
  - Check that every text pair meets WCAG AA
- **Typography:**
  - Display: **Newsreader** or **Fraunces (optical size, low softness)** for H1/H2 only, large and tightly tracked (−0.02em)
  - UI and body: **Geist Sans** or **Inter Tight** (not plain Inter)
  - Data and labels: **Geist Mono** or **IBM Plex Mono** for numbers, dates, case numbers ("CASE 01") and diagram labels
  - Self-host with @fontsource. Use a clear scale: H1 clamp(3rem, 6vw, 5.5rem), H2 clamp(2rem, 3.5vw, 3rem), body 17–18px, line length 65–72 characters
- **Grid:** a 12-column grid, 1200px container, with an asymmetric layout (for example, section headings in columns 1–4 and content in columns 5–12, as in an annual report). This one change removes most of the "template" feel.
- **Rhythm:** alternate section backgrounds (paper → white → **one full-bleed dark navy section** → paper). Use hairline rules instead of card borders where possible. Cut card shadows by about 80%.
- **Remove:** the eyebrow labels on every section. Keep them only as mono numbers ("01 · Work") in the heading column.

### Motion (subtle, but finished)
- Replace the current reveal with one based on IntersectionObserver: opacity from 0 to 1 and translateY 12px to 0, over 450ms, ease-out, animated once.
- It must **never** leave content semi-transparent. The final state is guaranteed, and content is visible immediately if JS fails or `prefers-reduced-motion` is set.
- Animate only `transform` and `opacity`. No scroll listeners doing layout work.
- Diagrams: the steps light up in sequence once when they come into view.
- Numbers in the proof strip count up once over 800ms (static if reduced motion is set).
- Cards: lift 2px and the arrow nudges on hover. The nav gets an underline that slides to the active section.
- Nothing else: no parallax, no cursor effects, no loaders.

---

## Part 3: Section-by-section spec (home page)

1. **Header.** KS monogram plus name on the left. Nav: Work, Approach, Experience, About, Contact, with a sliding active indicator. On the right, a single **Resume** button (outline, with a download icon). The header is transparent over the hero, then solid with a hairline and a light backdrop blur after scrolling. On mobile, a full-screen menu sheet.

2. **Hero (the whole first viewport on desktop, split 7/5):**
   - **Left:**
     - a small mono line: "BUSINESS ANALYST · DIGITAL TRANSFORMATION · MELBOURNE → INDIA" (edit the location wording via content)
     - H1: *I turn business problems into practical, technology-enabled solutions.* (The value statement becomes the H1. The name is already in the nav and the page title.)
     - One sentence of background
     - Primary button **View the work** (solid ink) and secondary **Download resume** (text link with arrow)
     - LinkedIn, GitHub and email icons
   - **Right: a signature visual.** Build a **live, animated "transformation exhibit"** as an SVG/HTML component: a small before→after process diagram that fades from "Manual: Video → Watch → Notes → Spreadsheet" to "AI-enabled: Video → Extraction → Framework → Dashboard", labelled "EXHIBIT 1 · AdLens AI". It looks like a figure from a consulting report and immediately says "BA who builds". Also leave a **portrait slot** (rounded rectangle, greyscale, 4:5) that can replace or sit beside the exhibit once I supply a photo (`TODO`).
   - A thin logo row below the fold line: "Experience across" followed by wordmarks set in text (not logos) for Grant Thornton Bharat, DSP Asset Managers, Publicis Sapient, TrakIT, University of Melbourne, in muted ink.

3. **Proof strip (the full-bleed dark navy section):** four large numbers in the mono or display font with the amber signal colour, each with a one-line label and its source in small text, and vertical hairlines between them. Count up once.

4. **Work.**
   - Heading column: "01 · Selected work" plus a single-sentence intro (not meta).
   - **Featured case (AdLens):** a full-width card split in two: text on the left (status, title, one-line outcome, 3 tags, "Read case study →") and a large **cover visual** on the right.
   - **The next two cases** get half-width cards with covers.
   - **The remaining five** are shown as an **index table** (like a report's contents): case number, title, industry, status badge, arrow, with a row hover highlight. This is where it stops looking like a template.
   - **Cover visuals:** generate one per case as an SVG component in the same style (abstract but specific: a mini process flow, a node graph for the agent, a camera grid for computer vision, a map outline for market entry), using the palette with teal and amber accents. No stock photos and no AI-generated images.
   - Tags: at most 3 per card, as plain mono text separated by " · ", not pills.

5. **Approach ("02 · How I work").** Five steps as a **horizontal numbered timeline** with a connecting line on desktop and vertical on mobile. Each step: a large mono number, a bold verb, the guiding question in regular weight (not grey italic), and one line. Add a short caption linking it to a real case (for example "Applied in: DSP distributor research").

6. **Other work.** A compact 3-column grid of small tiles:
   - The **client websites** tile opens a lightbox or expandable gallery with a screenshot slot per site
   - Kool Karaoke, the GenAI content studio, cinema ordering and Elite Akademy are one-liners with an arrow and an external link where one exists
   - Each has a small icon made from the monogram style

7. **Experience ("03 · Experience").** A **timeline table**: dates in mono in a left column, then role · organisation in bold, then the one-line "what it shows". Rows are separated by hairlines. Add a small circular initial badge for each organisation (text, not a copied logo). Keep it to one line each. End with "Full detail in the resume →".

8. **About / Education ("04 · Background").**
   - Two columns: a short About paragraph in the left column and a portrait slot, if not used in the hero.
   - On the right, education as a clean list with no card borders: B.Com at the University of Melbourne with scholarships as a small bulleted sub-list (not chips); the Outskill AI Engineering Accelerator; and the SSCBS Diploma.
   - **Beyond work:** a squash block with a single standout line in display type ("Former India No. 2") and two supporting lines. It's memorable, so give it presence.

9. **Toolkit.** Four columns (Business & analysis · Automation & AI · Build & platforms · Data & tools), each a plain list in body text. No chips and no logo wall.

10. **Contact (a dark navy closing section).** A large display line, for example *"Let's talk about the problem you're solving."*, then email as a large underlined link with a copy-to-clipboard button, LinkedIn, GitHub, the resume, and a line naming the roles and locations I'm open to. The footer: monogram, © year, "Built with React, TypeScript and Vercel", and back-to-top.

---

## Part 4: Case study page template (all eight)

- **Layout:** 12-column grid. Main text in 7 columns (max 68 characters per line), with a **sticky "At a glance" panel** in the right 4 columns on desktop. The panel holds status, industry, my role, timeframe, stack, links (demo, GitHub) and a mini table of contents with scroll-spy. On mobile the panel collapses into a summary block under the title.
- **Title block:** a mono case number ("CASE 01 / 08"), a large display title, a one-line subtitle, and the cover visual full width underneath. It must be high contrast, with no grey-on-grey.
- **Executive summary box** straight after the title: three short rows, **Situation / Complication / Resolution**, in the style of a consulting "SCR" summary. Draw them from the existing case content without inventing facts.
- **Numbered sections** ("01 Context", "02 Problem", …) with hairline dividers.
- **Exhibits:** render every diagram as a proper consulting exhibit:
  - a label ("EXHIBIT 2 · Current state vs future state") and a short takeaway title
  - the diagram at full content width, with nodes as clean boxes, 1.5px connectors and arrowheads, pain points marked in amber, and new AI or automation steps marked in teal
  - a source or note line underneath
  - a **Before / After toggle** on the process diagrams
- **The pull question and any key insight:** a large display quote with a teal rule, not a pale blue box.
- **Scorecard and KPI tables:** styled data tables with mono numbers, horizontal bar fills for scores, and the "illustrative" note visible.
- **End of page:** "What I learned" in two short columns, then **next and previous case cards** showing their covers, and "All case studies".
- **Reading progress bar:** 2px, teal, at the top.

---

## Part 5: Polish and technical checks

- **Mobile first** at 360, 390, 768, 1024, 1440 and 1920px. The hero exhibit stacks under the text on mobile and is simplified. The index table becomes cards. Touch targets are at least 44px.
- **Performance:** Lighthouse mobile at least 95 in all four categories. Largest Contentful Paint under 2s, layout shift under 0.05. Preload the display font only. Inline the SVG covers (no raster images).
- **Accessibility:** visible focus rings (teal, 2px offset), a skip link, `aria-label` on exhibits plus a text summary, and reduced-motion support.
- **OG image:** regenerate it in the new style (navy, monogram, name, value line), and give each case study its own OG title and description.
- **Favicon:** the KS monogram.
- **Content hygiene:** remove every em dash, remove the meta or self-referential lines, use British/Australian spelling, and keep "Kulvir Sharma" consistent.
- **Remove dead code and dependencies** left over from the old design.
- **Check before handing back:** `npm run build` and `npm run lint` pass cleanly, and you've screenshotted the home page and two case study pages at 390px and 1440px and reviewed them yourself, fixing anything that looks default, cramped or empty.
- **Hand-back:** commit in logical chunks (tokens and type, layout, hero, work, case study template, polish) and **do not deploy**. Give me a short summary with before/after screenshots and the updated `TODO-FOR-KULVIR.md`.

### Things to avoid
- Gradients, glassmorphism, neon, dark mode as the default, emoji, stock photos, and AI-generated portraits or illustrations.
- Tech-logo walls, skill percentage bars, typewriter or rotating headline text, testimonials I don't have, and a "Hire me" banner.
- Adding new claims, numbers or employers not already in the content files.
