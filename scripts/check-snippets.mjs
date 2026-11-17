#!/usr/bin/env node
// Syntax-checks fenced code blocks in docs/**/*.mdx and scans them for
// credential-shaped values.
//
// What it catches: a Python/JS/Go/Bash/JSON snippet that would not even parse
// (a reader who copies it gets a syntax error), a code block with no language
// tag, and anything that looks like a real access key or secret.
//
// What it does NOT catch: whether a snippet works against Fil One. That needs
// credentials and a live bucket; see CONTRIBUTING.md ("Testing code snippets").
//
// Opt a single block out by adding `nocheck` to its fence meta:
//   ```python nocheck
// Use this only for deliberate fragments, and say why in the surrounding text.
//
// Usage: node scripts/check-snippets.mjs [files...]   (default: all docs)

import { readFileSync, writeFileSync, mkdtempSync, rmSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

const ROOT = new URL("..", import.meta.url).pathname;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".mdx") || p.endsWith(".md") ? [p] : [];
  });
}

function extractBlocks(file) {
  const lines = readFileSync(file, "utf8").split("\n");
  const blocks = [];
  let open = null;
  lines.forEach((line, i) => {
    const m = line.match(/^(\s*)(`{3,}|~{3,})(.*)$/);
    if (!m) {
      if (open) open.body.push(line.slice(Math.min(open.indent, line.length - line.trimStart().length)));
      return;
    }
    if (!open) {
      const [lang = "", ...meta] = m[3].trim().split(/\s+/);
      open = { fence: m[2], indent: m[1].length, lang: lang.toLowerCase(), meta, line: i + 1, body: [] };
    } else if (m[2].startsWith(open.fence[0]) && m[2].length >= open.fence.length && !m[3].trim()) {
      blocks.push({ ...open, code: open.body.join("\n") });
      open = null;
    } else {
      open.body.push(line);
    }
  });
  return blocks;
}

function have(cmd) {
  return spawnSync(cmd, ["--version"], { stdio: "ignore" }).status === 0 ||
    spawnSync(cmd, ["version"], { stdio: "ignore" }).status === 0;
}

const tools = { python3: have("python3"), bash: have("bash"), gofmt: have("go") };
const tmp = mkdtempSync(join(tmpdir(), "snippets-"));
let n = 0;

function run(cmd, args, code, ext) {
  const f = join(tmp, `s${n++}${ext}`);
  writeFileSync(f, code);
  const r = spawnSync(cmd, [...args, f], { encoding: "utf8" });
  return r.status === 0 ? null : (r.stderr || r.stdout).replaceAll(f, "<snippet>").trim().split("\n").slice(-3).join(" | ");
}

const checkers = {
  json: (c) => { try { JSON.parse(c); return null; } catch (e) { return e.message; } },
  python: (c) => tools.python3 ? run("python3", ["-m", "py_compile"], c, ".py") : undefined,
  javascript: (c) => run(process.execPath, ["--check"], c, ".mjs"),
  js: (c) => checkers.javascript(c),
  bash: (c) => tools.bash ? run("bash", ["-n"], c, ".sh") : undefined,
  sh: (c) => checkers.bash(c),
  go: (c) => {
    if (!tools.gofmt) return undefined;
    // Fragments (no package clause) are wrapped in a function body; a leading
    // import block stays at file level.
    let src = c;
    if (!/^\s*package\s+\w+/m.test(c)) {
      const m = c.match(/^\s*((?:import\s*(?:\([\s\S]*?\)|"[^"]*")\s*)+)/);
      src = `package snippet\n\n${m ? m[1] : ""}\nfunc _() {\n${c.slice(m ? m[0].length : 0)}\n}\n`;
    }
    return run("gofmt", ["-e", "-l"], src, ".go");
  },
};

// Credential-shaped values. AWS's documented example values contain "EXAMPLE".
const SECRET_PATTERNS = [
  [/\b(AKIA|ASIA)[0-9A-Z]{16}\b/g, "AWS-style access key ID"],
  [/(secret[_-]?access[_-]?key|aws_secret_access_key|secretAccessKey)\s*[:=]\s*["']?([A-Za-z0-9/+]{40})\b/gi, "40-char secret key"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/g, "private key"],
];

const files = process.argv.slice(2).length ? process.argv.slice(2) : walk(join(ROOT, "docs"));
const errors = [];
const skipped = new Set();
let checked = 0;

for (const file of files) {
  const rel = relative(ROOT, file);
  for (const b of extractBlocks(file)) {
    const where = `${rel}:${b.line}`;
    if (!b.lang) errors.push(`${where}  code block has no language tag (use \`text\` for plain output)`);
    for (const [re, what] of SECRET_PATTERNS) {
      for (const m of b.code.matchAll(re)) {
        if (!/EXAMPLE|YOUR_|<|\.\.\./.test(m[0])) errors.push(`${where}  looks like a real ${what}; use a placeholder`);
      }
    }
    if (b.meta.includes("nocheck")) continue;
    const check = checkers[b.lang];
    if (!check) continue;
    const err = check(b.code);
    if (err === undefined) { skipped.add(b.lang); continue; }
    checked++;
    if (err) errors.push(`${where}  ${b.lang} does not parse: ${err}`);
  }
}

rmSync(tmp, { recursive: true, force: true });
for (const lang of skipped) console.warn(`warning: ${lang} toolchain not found; ${lang} snippets were not syntax-checked`);
if (errors.length) {
  console.error(`Snippet check failed (${errors.length}):\n` + errors.map((e) => "  " + e).join("\n"));
  console.error("\nFix the snippet, or add `nocheck` to the fence if it is a deliberate fragment.");
  process.exit(1);
}
console.log(`Snippet check passed: ${checked} blocks syntax-checked across ${files.length} files.`);
