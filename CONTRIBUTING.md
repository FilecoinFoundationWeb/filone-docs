# Contributing to the Fil One docs

The docs are part of the product. A reader should be able to trust every page as much as the console it describes. [`AGENTS.md`](AGENTS.md) has the accuracy rules: verify facts, check each region, keep the surfaces separate, and keep the mirrors in sync. This page covers **when** docs must change and **how** we keep them from drifting.

## When a docs change is required

A product change needs a docs change when a customer could see it or rely on it:

- a console screen, label, button, flow step, empty state or error message
- S3 API behaviour: a supported or unsupported operation, a header, an error code, a region difference
- a limit, a price, a plan or trial term, a region
- a security property: key permissions, MFA, encryption, retention, deletion

Refactors, tests, internal tooling and changes behind a feature flag that is off in production don't need one. Feature-flagged work gets its docs at launch: a public docs PR announces the feature.

**Definition of done for a user-facing product PR:** the product PR links a filone-docs PR, or says why no docs change is needed. That requirement lives in the product repo's PR template (see [Product-side check](#product-side-check)).

## Where a product change usually lands in the docs

Use this map to find the pages to check. It is a starting point, not a complete list, so grep the docs for the label or fact you changed.

| Product change (`fil-one/fil-one`) | Docs to check |
|---|---|
| `packages/website/src/routes/_app/buckets*`, bucket pages and components | `docs/app/buckets.mdx`, `docs/storage/buckets.mdx`, `docs/storage/objects.mdx`, `docs/quickstart/index.mdx` |
| `.../_app/api-keys*`, `packages/shared/src/access-key-permissions.ts` | `docs/app/api-keys.mdx`, `docs/security/api-keys.mdx`, `docs/security/authentication.mdx`, `docs/sdk/ai-agents.mdx` |
| `.../_app/organization*`, `members*`, `edit-organization*`, `packages/shared/src/permissions.ts` | `docs/app/organization.mdx`, `docs/faq.mdx` |
| `.../_app/billing*`, `packages/shared/src/api/billing.ts`, `usage.ts`, plan constants | `docs/app/billing.mdx`, `docs/billing/*`, `docs/limits.mdx`, JSON-LD in `docusaurus.config.js` |
| `.../_app/dashboard*`, `get-started*` | `docs/app/dashboard.mdx`, `docs/quickstart/index.mdx` |
| `.../_app/settings*`, auth / MFA / passkeys (`packages/shared/src/auth.ts`) | `docs/app/settings.mdx`, `docs/security/account-security.mdx` |
| `.../_app/support*` | `docs/app/support.mdx` |
| Regions, endpoints, S3 gateway behaviour, per-region grants | `docs/reference/s3-compatibility.mdx` first, then every page that restates it (quickstart, `docs/sdk/*`, `docs/reference/overview.mdx`) |
| Object Lock, versioning, retention, deletion | `docs/storage/object-lock.mdx`, `docs/storage/versioning.mdx`, `docs/faq.mdx` |
| Encryption, compliance claims | `docs/security/encryption.mdx`, `docs/faq.mdx` |

Every fact you change also goes into `static/llms.txt` and `static/llms-full.txt`.

## What CI checks, and what it can't

`.github/workflows/build.yaml` runs on every PR. It has no secrets.

| Check | Catches | Doesn't catch |
|---|---|---|
| `npm run build` | MDX syntax errors, bad frontmatter, broken internal links (`onBrokenLinks: "throw"`) | Raw `<a href>` links in HTML card grids. Docusaurus doesn't check those. |
| `scripts/check-mirrors.mjs` | A page added, renamed or removed without its `llms.txt` link and `llms-full.txt` section; mirror links to pages that no longer exist | A fact that differs between a page and its mirror |
| `scripts/check-snippets.mjs` | Python, JS, Go, Bash and JSON snippets that don't parse; untagged code blocks; values that look like real access keys | Whether a snippet works against Fil One |
| mirror-impact gate | A PR that changes `docs/**` but neither mirror and gives no reason | Whether the reason is right |

To opt a deliberate fragment out of the snippet check, add `nocheck` to its fence (`` ```python nocheck ``) and explain the fragment in the surrounding text.

## Testing code snippets

CI only checks that snippets parse. Before you merge a new or changed snippet, run it:

1. **Against a local S3 emulator** for request shape: endpoint, path-style addressing, flags, profile config. For example, run `uvx --from 'moto[server]' moto_server -p 5055`, then substitute only the endpoint and dummy credentials. This doesn't prove Fil One behaviour.
2. **Against Fil One, with a throwaway key** for anything region- or behaviour-specific. Use a key scoped to a test bucket, set in environment variables and never in the snippet. Delete the key afterwards. Never paste a real key into a doc, an issue, or a chat with an AI tool.

Not automated yet: running the snippets against Fil One in CI. That needs a scoped test key stored as a CI secret and a dedicated test bucket per region, so it's a decision for the team. It would run on a schedule, not on PRs, so a PR's code never sees the key.

## Periodic audit

Checks catch structure; they can't catch a console label that changed in a product PR that skipped its docs box. Run a full docs audit at least once a month and after any large product launch. The audit compares every docs area with the product code at `origin/main` and with the live sites, and writes a report to `audits/`. Today the `docs-audit` Claude Code skill that runs it lives on the docs maintainer's machine, not in this repo.

## Product-side check

The product repo gets the other half: a PR template with a **Docs** section, a "Documentation" section in its `AGENTS.md`, and a small `docs-impact` workflow. When a PR touches user-facing paths, the workflow requires its description to link a filone-docs PR, give a reason no docs change is needed, or carry the `docs:gated` label. It holds no secrets and calls no model, so it only makes the decision visible. It can't tell whether the decision is right. That's what the audit is for.
