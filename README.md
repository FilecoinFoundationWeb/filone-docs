# Fil One Docs

User-facing documentation for [docs.fil.one](https://docs.fil.one). Built with [Docusaurus](https://docusaurus.io/) and deployed to [Vercel](https://vercel.com/).

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

### Custom domain (docs.fil.one)

1. In the Vercel project dashboard, go to **Settings > Domains**.
2. Add `docs.fil.one` and set a CNAME record pointing to `cname.vercel-dns.com`.

### Automatic deploys

Every push to `main` triggers a production deploy. Pull requests get preview deployments automatically.

## Project structure

```
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
3. **Mirror any factual change into the LLM files.** `static/llms.txt` and `static/llms-full.txt` are hand-maintained copies of the site with no generation script — a fix applied only to `docs/*.mdx` leaves the wrong value live at `docs.fil.one/llms-full.txt`, which is what LLM crawlers read. Update both, every time.
4. **Check `docusaurus.config.js`.** Its JSON-LD structured-data block carries product claims (description, featureList, price) that a page-level fix won't reach.
5. **Grep the whole tree for paraphrases, not just the value.** The same claim is often restated in different words across the quickstart, SDK, and app pages — "geographic data residency options" is a stale region claim that no value-based search would find.
6. Run `npm start` to preview locally.
7. Open a PR. Vercel will create a preview deployment.
