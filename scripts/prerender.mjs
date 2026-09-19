/**
 * Build-time prerenderer.
 *
 * Why hand-rolled rather than a plugin: this project is on Vite 8 and React 19,
 * and the SSG plugins in that space either lag Vite majors or drag in a headless
 * Chromium just to read the DOM back out. This uses only first-party pieces —
 * Vite's own SSR build plus react-dom/server — so there is nothing to break on
 * the next Vite bump, and every route is rendered from real React rather than
 * scraped from a browser.
 *
 * What it buys: every route, including each /work/<slug> case study, ships as
 * real HTML with its own title, description and Open Graph tags. A crawler or a
 * link-preview bot that does not run JavaScript still sees the whole page.
 *
 * Run order (see package.json "build"):
 *   1. vite build                 → dist/ (client assets + index.html template)
 *   2. vite build --ssr           → dist-ssr/entry-server.js
 *   3. node scripts/prerender.mjs → writes real HTML into dist/
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, rmSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distDir = join(root, "dist");
const ssrEntry = join(root, "dist-ssr", "entry-server.js");

const SITE_URL = "https://kulvirsharma-portfolio.vercel.app";

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Replace the content of a meta tag matched by an attribute selector.
 * `\s+` rather than a single space, so tags that Prettier has wrapped across
 * several lines still match.
 */
function setMeta(html, attr, name, value) {
  const pattern = new RegExp(
    `(<meta\\s+${attr}="${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s+content=")[^"]*(")`,
    "i",
  );
  if (!pattern.test(html)) {
    throw new Error(
      `prerender: no <meta ${attr}="${name}"> found in dist/index.html. ` +
        `The template and this script have drifted apart.`,
    );
  }
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

function buildHead(template, route) {
  const url = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(route.title)}</title>`);
  html = setMeta(html, "name", "description", route.description);
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", route.description);
  html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${escapeAttr(url)}$2`);

  // The home page is the site; a case study is a document.
  if (route.ogType && route.ogType !== "website") {
    html = html.replace(
      /(<meta\s+property="og:type"\s+content=")[^"]*(")/i,
      `$1${escapeAttr(route.ogType)}$2`,
    );
  }

  if (!route.index) {
    html = html.replace(/<\/head>/i, '  <meta name="robots" content="noindex, nofollow" />\n  </head>');
  }

  return html;
}

function sitemap(routes, lastmod) {
  const urls = routes
    .filter((r) => r.index)
    .map(
      (r) =>
        `  <url>\n` +
        `    <loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <changefreq>monthly</changefreq>\n` +
        `    <priority>${r.priority.toFixed(1)}</priority>\n` +
        `  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  if (!existsSync(ssrEntry)) {
    throw new Error(`SSR bundle missing at ${ssrEntry}. Did "vite build --ssr" run?`);
  }

  const template = readFileSync(join(distDir, "index.html"), "utf8");
  const { render, getRoutes } = await import(pathToFileURL(ssrEntry).href);
  const routes = getRoutes();

  const lastmod = new Date().toISOString().slice(0, 10);
  const report = [];

  for (const route of routes) {
    const appHtml = render(route.path);
    let html = buildHead(template, route);
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    const outPath =
      route.path === "/"
        ? join(distDir, "index.html")
        : join(distDir, route.path.slice(1), "index.html");

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf8");

    report.push({
      route: route.path,
      kb: (Buffer.byteLength(html) / 1024).toFixed(1),
      indexed: route.index,
    });
  }

  writeFileSync(join(distDir, "sitemap.xml"), sitemap(routes, lastmod), "utf8");

  // A 404 Vercel can serve directly for anything not prerendered.
  const notFound = buildHead(template, {
    path: "/404",
    title: "Page not found | Kulvir Sharma",
    description: "That page does not exist.",
    index: false,
    ogType: "website",
  });
  writeFileSync(
    join(distDir, "404.html"),
    notFound.replace('<div id="root"></div>', `<div id="root">${render("/404")}</div>`),
    "utf8",
  );

  // The SSR bundle is a build artefact, not something to deploy.
  rmSync(join(root, "dist-ssr"), { recursive: true, force: true });

  console.log("\n  Prerendered routes");
  console.log("  ─────────────────────────────────────────────────────");
  for (const r of report) {
    console.log(
      `  ${r.indexed ? "✓" : "·"} ${r.route.padEnd(40)} ${r.kb.padStart(6)} KB${
        r.indexed ? "" : "  (noindex)"
      }`,
    );
  }
  console.log(`  ${routes.filter((r) => r.index).length} route(s) in sitemap.xml\n`);

  // Loud warnings for the placeholders that still need real files.
  if (!existsSync(join(distDir, "Kulvir-Sharma-Resume.pdf"))) {
    console.warn(
      "  ⚠ dist/Kulvir-Sharma-Resume.pdf is missing — the resume button will 404.\n" +
        "    Add public/Kulvir-Sharma-Resume.pdf.\n",
    );
  }

  const ogPath = join(distDir, "og-image.png");
  if (!existsSync(ogPath)) {
    console.warn("  ⚠ dist/og-image.png is missing — link previews will have no image.\n");
  } else {
    const kb = statSync(ogPath).size / 1024;
    if (kb > 300) console.warn(`  ⚠ og-image.png is ${kb.toFixed(0)} KB (target < 300 KB)\n`);
  }
}

main().catch((err) => {
  console.error("\nPrerender failed:\n", err);
  process.exit(1);
});
