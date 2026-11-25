#!/usr/bin/env node
// Checks that static/llms.txt and static/llms-full.txt cover the same pages as
// docs/**, so a page can't be added, renamed or removed without its mirrors.
//
// - Every docs page has a link in llms.txt and a "Source: <url>" section in
//   llms-full.txt.
// - Every docs.filone.com page URL in either mirror points at a page that exists
//   (or at a redirect in vercel.json).
//
// It cannot tell whether a *fact* inside a page and its mirror agree; that is
// what the PR checklist and review are for (see CONTRIBUTING.md).

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const HOST = "https://docs.filone.com";

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : /\.mdx?$/.test(p) ? [p] : [];
  });
}

function routeOf(file) {
  const src = readFileSync(file, "utf8");
  const fm = src.match(/^---\n([\s\S]*?)\n---/);
  if (fm && /^draft:\s*true/m.test(fm[1])) return null;
  const slug = fm?.[1].match(/^slug:\s*["']?([^"'\n]+)/m)?.[1].trim();
  if (slug) return slug.startsWith("/") ? slug : "/" + slug;
  return "/" + relative(join(ROOT, "docs"), file).replace(/\.mdx?$/, "").replace(/(^|\/)index$/, "");
}

const norm = (u) => (u.replace(/[#?].*$/, "").replace(/\/+$/, "") || "/");
const pages = new Map(walk(join(ROOT, "docs")).map((f) => [norm(routeOf(f) ?? ""), relative(ROOT, f)]));
pages.delete("");
const redirects = new Set(JSON.parse(readFileSync(join(ROOT, "vercel.json"), "utf8")).redirects?.map((r) => norm(r.source)) ?? []);

const llms = readFileSync(join(ROOT, "static/llms.txt"), "utf8");
const full = readFileSync(join(ROOT, "static/llms-full.txt"), "utf8");
const urlsIn = (text) => [...text.matchAll(/https:\/\/docs\.filone\.com(\/[^\s)>\]"'`,]*)?/g)].map((m) => norm(m[1] ?? "/"));
const linked = new Set(urlsIn(llms));
const sources = new Set([...full.matchAll(/^Source:\s*https:\/\/docs\.filone\.com(\/\S*)?/gm)].map((m) => norm(m[1] ?? "/")));

const errors = [];
for (const [route, file] of pages) {
  if (!linked.has(route)) errors.push(`${file}: no link to ${HOST}${route} in static/llms.txt`);
  if (!sources.has(route)) errors.push(`${file}: no "Source: ${HOST}${route}" section in static/llms-full.txt`);
}
const assets = new Set(["/llms.txt", "/llms-full.txt", "/sitemap.xml", "/robots.txt"]);
for (const [name, text] of [["static/llms.txt", llms], ["static/llms-full.txt", full]]) {
  for (const route of new Set(urlsIn(text))) {
    if (!pages.has(route) && !redirects.has(route) && !assets.has(route)) {
      errors.push(`${name}: links to ${HOST}${route}, which is not a docs page`);
    }
  }
}

if (errors.length) {
  console.error(`Mirror check failed (${errors.length}):\n` + errors.map((e) => "  " + e).join("\n"));
  console.error("\nAdd or remove the page's entry in both static/llms.txt and static/llms-full.txt (AGENTS.md).");
  process.exit(1);
}
console.log(`Mirror check passed: ${pages.size} pages, each linked in llms.txt and mirrored in llms-full.txt.`);
