# AGENTS.md

## Mission

Maintain an evidence-backed public résumé for Eeon.

The repository must remain:

- truthful;
- public-safe;
- accessible;
- dependency-light;
- deployable on GitHub Pages;
- verifiable without a paid service.

## Required reading order

Before any change, read:

1. `CONTEXT.md`
2. `docs/disclosure-policy.md`
3. `.agents/skills/portfolio-evidence/references/evidence-contract.md`
4. the nearest relevant source file

Use `.agents/skills/portfolio-evidence/SKILL.md` for all portfolio content or site changes.

## Non-negotiable invariants

1. Do not publish employer, customer, current-company, credential, secret, device-identity, signing, or private-data information.
2. Do not publish proprietary source details or a commercial adapter inventory.
3. Do not convert private implementation into a public production claim.
4. Do not invent percentages, revenue, users, latency, reliability, hardware, GPU, or customer metrics.
5. Use an explicit evidence status for every material capability.
6. Keep private project links absent.
7. Keep public project links on `https://github.com/ed3c/`.
8. Preserve the ASD-STE100 disclaimer. The site is inspired by controlled-language principles; it does not claim official conformance.
9. Preserve the Anthropic comparison accurately. The small loop is a delivery specialization, not an Anthropic-defined name.
10. Run `npm run check` before completion.

## Editing protocol

1. Define one measurable outcome.
2. Identify the exact claim or behavior to change.
3. Edit the smallest set of files.
4. Run deterministic checks.
5. Read the exact failure.
6. Repair the exact failure.
7. Rerun the checks.
8. Report changed files, evidence, and open risks.

## Content authority

- `data/portfolio.json` owns project, capability, role, and delivery-loop content.
- `index.html` owns semantic page structure and stable explanatory text.
- `assets/app.js` renders structured evidence and controls language and filters.
- `docs/disclosure-policy.md` owns public/private boundaries.
- `docs/architecture.md` owns data flow and state-machine diagrams.
- `docs/stack-plan.md` owns molecular PR decomposition.
- CI exit status owns mechanical pass/fail truth.

## Completion contract

A task is complete only when:

- `npm run check` exits `0`;
- no prohibited disclosure appears;
- public and private evidence states remain accurate;
- the page works without third-party runtime code;
- the change is small enough to review;
- the final report names any unverified claim or remaining manual action.
