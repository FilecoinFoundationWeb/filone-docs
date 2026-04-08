# Fil One Docs

User-facing documentation for [docs.fil.one](https://docs.fil.one). Built with [Docusaurus](https://docusaurus.io/) and deployed to [Vercel](https://vercel.com/).

## Local development

```bash
npm install
npm start
```

Opens at `http://localhost:3000/docs/`.

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

1. Push this repo to GitHub (e.g., `filecoin-one/docs`).
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
  storage/               # Buckets, objects, multipart
  security/              # Auth, API keys, encryption
  billing/               # Trial, pricing, usage
  app/                   # Dashboard guides
  reference/             # API reference, S3 compat, errors
  sdk/                   # SDK examples per language
  faq.mdx
  limits.mdx
  introduction.mdx
docusaurus.config.js     # Site config (navbar, footer, theme)
sidebars.js              # Sidebar navigation structure
src/                     # Custom React components and CSS
  css/custom.css         # Custom styles
static/img/              # Logo, favicon, images
vercel.json              # Vercel deployment config
```

## Contributing

1. Create a branch.
2. Edit or add `.mdx` files in `docs/`.
3. Run `npm start` to preview locally.
4. Open a PR. Vercel will create a preview deployment.

## Placeholder pages

Pages marked "Coming soon" need content before or shortly after launch. Search for `PLACEHOLDER` in the codebase for values that need confirmation from engineering.
