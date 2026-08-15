---
name: portfolio-evidence
description: Build or update Eeon's evidence-backed public portfolio. Use for résumé claims, repository evidence, disclosure controls, GitHub Pages delivery, or portfolio verification.
license: MIT
compatibility: Claude Code, Codex CLI, and filesystem-based Agent Skills hosts
allowed-tools: Bash Read Write
metadata:
  version: "1.0.0"
  owner: "Eeon"
---

# Portfolio Evidence Workflow

Publish only claims that have an explicit evidence state. Keep private implementation details private.

## Phase 1: Orient

1. Read `/AGENTS.md`.
2. Read `/CONTEXT.md`.
3. Read `/docs/disclosure-policy.md`.
4. Read `references/evidence-contract.md`.

## Phase 2: Specify

1. Define one public outcome.
2. Name the target audience.
3. List the source repositories.
4. Assign one evidence state to each claim.
5. Mark excluded employer, customer, product, credential, and adapter details.

## Phase 3: Change

1. Update `data/portfolio.json` first.
2. Keep `index.html` structural.
3. Render repeated evidence from `assets/app.js`.
4. Use direct, controlled language.
5. Keep each procedural step atomic.

## Phase 4: Execute and Assert

Run the complete verification command:

```bash
npm run check
```

The command must execute syntax checks and deterministic site assertions.

## Repair Loop

1. Read the exact assertion failure.
2. Change only the failed condition.
3. Run `npm run check` again.
4. Repeat until Exit Code is `0`.
5. Stop after three identical failures.
6. Record the blocker instead of bypassing the assertion.

A skipped, missing, or cancelled check is not a pass.

## Phase 5: Deliver

Use this dependent branch order for substantial changes:

```text
portfolio/foundation
  -> portfolio/evidence
    -> portfolio/agentic-loop
```

Each branch must contain one reviewable behavior and its proof. Ship the oldest branch first.

## Release Authority

- Repository evidence owns technical claims.
- Deterministic assertions own machine-checkable site truth.
- Human review owns disclosure and commercial acceptance.
- GitHub Pages deployment owns only publication status.
