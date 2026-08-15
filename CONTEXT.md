# CONTEXT.md

## Project purpose

`skill-resume-site` is Eeon's public online résumé and remote-delivery landing page.

The site serves three audiences:

1. hiring teams evaluating Agentic Architect, FDE, and AI Engineer fit;
2. founders and engineering leaders seeking a drop-in remote Agent Engineer;
3. reviewers inspecting the user's public and sanitized private technical evidence.

## Positioning

Primary positioning:

```text
Drop-in Remote Agent Engineer
Android systems depth
Full-stack delivery
Agentic verification
```

Preferred work mode:

```text
fully remote
part-time or embedded studio first
50% kickoff payment
biweekly review and settlement
selective full-time roles
```

## Career narrative

```text
Android Developer
→ Full-Stack Systems
→ Android and iOS Device Automation
→ Agentic Architect / Remote FDE / AI Engineer
```

The private repository `ix-agy-private` is presented only as a sanitized integration lab. Do not publish current-company or internal product information.

## Evidence model

Use these states:

- `verified-public`
- `public-prototype`
- `production-background`
- `private-implementation`
- `deterministic-reference`
- `next-evidence`

A public claim must identify the evidence boundary.

Examples:

- “Public and tested” is allowed when the public repository contains executable checks or recorded test evidence.
- “Private implementation” is allowed for sanitized capability summaries.
- “Production-ready” is not allowed without exact production evidence.
- “Real-device capable” must not imply a specific physical run unless evidence exists.

## Technology disclosure

The site may list:

- transferable methods;
- standard platform tools;
- open-source technologies already visible in public work;
- generic private capabilities.

The site must not list:

- confidential commercial adapters;
- provider credentials or account details;
- customer-specific systems;
- private source structure beyond the approved summary;
- current employer information.

## Architecture invariants

- Static HTML, CSS, JavaScript, and JSON only.
- No third-party client-side runtime dependency.
- GitHub Pages is the deployment target.
- English is the default public language.
- Traditional Chinese is available through a local toggle.
- Essential content remains semantic and keyboard accessible.
- `prefers-reduced-motion` is respected.
- Print output remains readable.

## Small loop definition

The local delivery specialization is:

```text
spec
→ bounded change
→ execute
→ deterministic assertion
→ exact repair
→ rerun
→ evidence receipt
```

Anthropic's Evaluator–Optimizer remains the upstream workflow reference. The local loop narrows the unit of work to a repository change and gives mechanical checks release authority.

## Definition of done

Run:

```bash
npm run check
```

Then verify the GitHub Pages workflow or state the remaining manual Pages-source action.
