# AGENTS.md

## Purpose

Maintain a clear, truthful, long-scroll portfolio without breaking the evidence and disclosure gates.

## Read first

1. `CONTEXT.md`
2. `.agents/skills/portfolio-evidence/SKILL.md`
3. `docs/architecture.md`
4. `docs/disclosure-policy.md`

## Presentation files

- `index.html`: semantic article sections, page index, external resource allowlist.
- `styles.css`: cinematic hero, editorial layout, responsive behavior, motion.
- `main.js`: in-page navigation, scrollspy, index panel, language switch, stats, evidence rendering.
- `assets/logo.webp`: brand mark.

## Evidence files

- `data/portfolio.json`: public/private project and capability data.
- `.agents/skills/portfolio-evidence/scripts/assert-site.mjs`: release gate.
- `.agents/skills/portfolio-evidence/references/evidence-contract.md`: public boundary.

## Hard rules

- Keep all major résumé categories on the homepage.
- Do not replace sections with routed center panels.
- The top-right control must remain a page index that scrolls to section anchors.
- Do not add fake customer, revenue, uptime, speed, adoption, or performance numbers.
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
