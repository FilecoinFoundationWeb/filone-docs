# Agent guidelines for filone-docs

This repo is the source for [docs.fil.one](https://docs.fil.one), a Docusaurus site. These guidelines apply to any AI agent (or human) making changes here.

## Keep the LLM mirror files in sync

`static/llms.txt` and `static/llms-full.txt` are hand-maintained plain-text mirrors of this documentation, served for LLM/agent consumption. They are **not** auto-generated — nothing regenerates them from `docs/**` today.

**Whenever you add, remove, or change a fact in `docs/**`, update both mirror files to match.** This includes:

- New or removed pages (add/remove the corresponding entry and link in `llms.txt`; add/remove the corresponding section in `llms-full.txt`)
- Changed capability status (supported / not supported / region-dependent), pricing, limits, or any other fact
- Changed region availability or region-specific behavior

Check both files, not just one — they have drifted out of sync with each other before (different intro text, one file missing a fact the other had). A fix that only touches one of the two is an incomplete fix.

## Only document what's actually verified

Don't add or strengthen a capability claim (a supported S3 operation, a supported region, a security or compliance property) unless it's backed by an actual test, a code-level check, or explicit confirmation from engineering. If a capability's status is uncertain, say so explicitly (e.g. "not yet confirmed in `<region>`") rather than asserting it either way. Aspirational or "should work" framing is not the same as confirmed.

## Region-specific accuracy

Fil One's capabilities can differ by region. When documenting an S3 operation, a limit, or a behavior:

- Verify it separately for each publicly available region rather than making one blanket claim.
- Use public region IDs only (e.g. `eu-west-1`, `us-east-1`) — never internal infrastructure, vendor, or backend names.
- If a claim is confirmed for one region but not another, say so explicitly rather than implying parity.

## Dashboard vs. direct API/SDK are different surfaces

A feature working through the S3 API (via a customer's own SDK or CLI) does not mean the `app.fil.one` dashboard has a UI for it, and vice versa. Be explicit about which surface a claim applies to — don't let "supported" in one context imply the other.

## `docs/reference/s3-compatibility.mdx` is the single source of truth for API compatibility

Other pages (quickstart, SDK guides, both `llms*.txt` mirrors) restate facts from this page in different words. When you fix a compatibility claim, grep the whole repo for other phrasings of the same fact — the same claim tends to get duplicated across multiple pages, and a fix in one place isn't a fix if the others still say the old thing. Also check `docusaurus.config.js` (JSON-LD / meta tags can carry factual claims too, outside `docs/**`).

## Before considering a docs change done

```bash
npm run build
```

This catches MDX syntax errors (broken JSX, unclosed tags, invalid frontmatter) that won't show up just from reading the file.
