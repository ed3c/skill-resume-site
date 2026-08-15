# AGENTS.md

## Purpose

Maintain a clear, truthful, single-viewport portfolio without breaking the evidence and disclosure gates.

## Read first

1. `CONTEXT.md`
2. `.agents/skills/portfolio-evidence/SKILL.md`
3. `docs/architecture.md`
4. `docs/disclosure-policy.md`

## Presentation files

- `index.html`: semantic content, views, external resource allowlist.
- `styles.css`: layout, visual system, responsive behavior, motion.
- `main.js`: hash routing, mobile menu, language switch, stats, project rendering.
- `assets/logo.webp`: brand mark.

## Evidence files

- `data/portfolio.json`: public/private project and capability data.
- `.agents/skills/portfolio-evidence/scripts/assert-site.mjs`: release gate.
- `.agents/skills/portfolio-evidence/references/evidence-contract.md`: public boundary.

## Hard rules

- Do not add fake customer, revenue, uptime, speed, or adoption numbers.
- Do not link private repositories.
- Do not expose client, employer, credential, device, or vendor details.
- Keep the exact approved background-video URL unless the owner changes it.
- Keep keyboard focus, Escape handling, reduced motion, and touch states.
- Do not add a frontend framework or package dependency without explicit approval.
- Do not commit font binaries.

## Required command

```bash
npm test
```

A non-zero exit means the change is not ready.
