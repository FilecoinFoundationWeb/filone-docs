# Fil One Docs

User-facing documentation for [docs.filone.com](https://docs.filone.com). Built with [Docusaurus](https://docusaurus.io/) and deployed to [Vercel](https://vercel.com/).

Before editing content, read [`AGENTS.md`](./AGENTS.md) — guidelines for anyone (human or AI agent) changing this repo, including the rule that `static/llms.txt` and `static/llms-full.txt` must be updated alongside any factual change to `docs/**`.

## Local development

```bash
npm install
npm start
```

Opens at `http://localhost:3000/`.

To preview a production build locally:

```bash
npm run build
npm run serve
```

## Build

```bash
npm run build
```

Static output goes to `./build/`.

## Deploy to Vercel

### First-time setup

1. Push this repo to GitHub (`FilecoinFoundationWeb/filone-docs`).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Docusaurus. Confirm these settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`
4. Click **Deploy**.

### Custom domains

The `filone-docs` Vercel project serves `docs.filone.com`, the canonical host, and `docs.fil.one`, which keeps serving until it redirects to `docs.filone.com`. Their DNS records are managed in Terraform in `fil-one/infrastructure` (`environments/prod/filone-com.tf` and `environments/prod/fil-one.tf`), using the CNAME target Vercel recommends for the project. To attach another domain, add it under **Settings > Domains** in the Vercel project, then add its CNAME, and any `_vercel` verification TXT record Vercel asks for, in that Terraform rather than in the Cloudflare dashboard.

### Automatic deploys

Every push to `main` triggers a production deploy. Pull requests get preview deployments automatically.

## Project structure

```
AGENTS.md                # Guidelines for anyone (human or AI agent) editing this repo
docs/                    # All documentation pages (MDX)
  quickstart/            # Getting started guides
  storage/               # Buckets, objects, versioning, object lock, multipart
  security/              # Auth, API keys, encryption
  billing/               # Trial, pricing, usage
  app/                   # Dashboard guides
  reference/             # API reference, S3 compat, errors
  sdk/                   # SDK examples per language
  bucket-intelligence.mdx
  faq.mdx
  limits.mdx
  introduction.mdx
docusaurus.config.js     # Site config (navbar, theme, JSON-LD structured data)
sidebars.js              # Sidebar navigation structure
src/                     # Custom React components and CSS
  css/custom.css         # Custom styles
static/                  # Served as-is at the site root
  img/                   # Logo, favicon, images
  llms.txt               # Hand-maintained LLM index mirror
  llms-full.txt          # Hand-maintained full-site LLM mirror
  robots.txt             # Crawler directives + sitemap pointer
vercel.json              # Vercel deployment config
```

## Contributing

1. Create a branch.
2. Edit or add `.mdx` files in `docs/`.
3. Follow [`AGENTS.md`](./AGENTS.md) — it covers keeping `static/llms.txt` / `static/llms-full.txt` in sync, checking `docusaurus.config.js` for claims outside `docs/**`, and verifying facts before publishing them.
4. Run `npm start` to preview locally.
5. Open a PR. Vercel will create a preview deployment.
