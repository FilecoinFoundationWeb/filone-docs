## What and why

<!-- Link the Linear issue and, if this follows a product change, the fil-one PR. -->

## Checklist

- [ ] Every new or changed fact is verified (code at `origin/main`, a test, or engineering), per region where it can differ (AGENTS.md)
- [ ] Other pages that restate the same fact are updated too (`grep -rn` the old wording across `docs/`, `static/`, `docusaurus.config.js`)
- [ ] Destructive, irreversible, or cost-affecting steps carry a `:::warning` / `:::danger`

## Mirrors

<!-- CI fails if docs/** changes and neither llms file does, unless the second box is ticked with a reason. -->

- [ ] `static/llms.txt` and `static/llms-full.txt` updated
- [ ] No mirror change needed: <!-- why, e.g. "typo fix, no fact changed" -->
