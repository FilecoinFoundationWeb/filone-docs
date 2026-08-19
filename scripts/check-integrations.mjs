import fs from "node:fs";
import path from "node:path";

const root = path.resolve("docs/integrations");
const guides = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.name.endsWith(".mdx") && path.dirname(absolute) !== root) guides.push(absolute);
  }
}

walk(root);
guides.sort();
const failures = [];
const allowedStatuses = new Set(["Verified", "Compatible", "Preview", "Not currently tested", "Not currently supported"]);
const sidebar = fs.readFileSync("sidebars.js", "utf8");
const mirrors = Object.fromEntries(["static/llms.txt", "static/llms-full.txt"].map((m) => [m, fs.readFileSync(m, "utf8")]));

for (const file of guides) {
  const source = fs.readFileSync(file, "utf8");
  const route = path.relative("docs", file).replace(/\.mdx$/, "");
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    failures.push(`${file}: missing frontmatter`);
    continue;
  }
  const value = (key) => match[1].match(new RegExp(`^${key}:\\s*(.*)$`, "m"))?.[1]?.trim();
  const status = value("integration_status");
  const body = source.slice(match[0].length);
  if (!status) failures.push(`${file}: missing integration_status`);
  if (status && !allowedStatuses.has(status)) failures.push(`${file}: invalid integration_status`);
  const blocked = status === "Not currently supported";
  if (blocked && value("draft") !== "true") failures.push(`${file}: blocked guide must be draft: true`);
  if (status === "Verified") {
    for (const key of ["tested_versions", "verified_regions", "verification_date", "evidence"]) {
      const field = value(key);
      if (!field || field === "[]" || field === "null") failures.push(`${file}: Verified requires ${key}`);
    }
    if (!/^\[[^\]]+\]$/.test(value("tested_versions") ?? "")) failures.push(`${file}: Verified versions must be a non-empty inline list`);
    if (!/^\[(eu-west-1|us-east-1)(,\s*(eu-west-1|us-east-1))*\]$/.test(value("verified_regions") ?? "")) failures.push(`${file}: Verified regions must use public region IDs`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value("verification_date") ?? "")) failures.push(`${file}: Verified requires an ISO verification date`);
    if (!/^https:\/\//.test(value("evidence") ?? "")) failures.push(`${file}: Verified evidence must be an HTTPS link`);
  }
  if (status !== "Verified" && /(^|\W)Verified(\W|$)/.test(body)) {
    failures.push(`${file}: body uses Verified without Verified metadata`);
  }
  if (status && !blocked) {
    const statusLines = body.split("\n").filter((line) => line.startsWith("Validation status: "));
    if (statusLines.length !== 1 || !statusLines[0].startsWith(`Validation status: ${status}.`)) {
      failures.push(`${file}: body must contain exactly one line starting with "Validation status: ${status}."`);
    }
  }
  if (blocked && sidebar.includes(`"${route}"`)) failures.push(`sidebars.js: blocked guide must not be listed: ${route}`);
  if (!blocked && !sidebar.includes(`"${route}"`)) failures.push(`sidebars.js: missing ${route}`);
  for (const [mirror, text] of Object.entries(mirrors)) {
    if (blocked && text.includes(`/${route}`)) failures.push(`${mirror}: blocked guide must not be mirrored: /${route}`);
    if (!blocked && !text.includes(`/${route}`)) failures.push(`${mirror}: missing /${route}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Checked ${guides.length} integration guides.`);
