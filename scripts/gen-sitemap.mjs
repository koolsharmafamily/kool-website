/**
 * Regenerates public/sitemap.xml from the case study slugs, so the sitemap
 * cannot drift out of step with the routes.
 *
 *   node scripts/gen-sitemap.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const ORIGIN = "https://kulvirsharma-portfolio.vercel.app";

const source = readFileSync(new URL("../src/data/caseStudies.ts", import.meta.url), "utf8");
const slugs = [...source.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

if (slugs.length === 0) {
  throw new Error("No case study slugs found in src/data/caseStudies.ts — check the pattern.");
}

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${ORIGIN}/`, priority: "1.0" },
  ...slugs.map((slug) => ({ loc: `${ORIGIN}/work/${slug}`, priority: "0.8" })),
];

const body = urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap.xml written with ${urls.length} URLs (${slugs.length} case studies)`);
