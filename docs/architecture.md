# Portfolio Architecture

## Purpose

The site converts repository evidence into a public, controlled, and reviewable résumé. It separates technical truth, disclosure decisions, presentation, and publication.

## Evidence data flow

```mermaid
flowchart TD
    A[Public and private repository evidence] --> B{Disclosure boundary}
    B -->|Public| C[Public repository claim]
    B -->|Private| D[Sanitized capability claim]
    C --> E[Evidence-state classification]
    D --> E
    E --> F[Controlled public statement]
    F --> G[data/portfolio.json]
    G --> H[assets/app.js]
    H --> I[index.html]
    I --> J[Deterministic assertions]
    J -->|PASS| K[GitHub Actions]
    J -->|FAIL| L[Bounded repair loop]
    L --> J
    K --> M[GitHub Pages]
```

## Content state machine

```mermaid
stateDiagram-v2
    [*] --> DISCOVERED
    DISCOVERED --> CLASSIFIED: evidence state assigned
    CLASSIFIED --> SANITIZED: disclosure reviewed
    SANITIZED --> STRUCTURED: JSON record created
    STRUCTURED --> RENDERED: site generated
    RENDERED --> VERIFIED: deterministic checks pass
    RENDERED --> REPAIR_REQUIRED: checks fail
    REPAIR_REQUIRED --> RENDERED: exact failure repaired
    VERIFIED --> PUBLISHED: Pages deployment succeeds
    PUBLISHED --> CLASSIFIED: evidence changes
```

## Engagement state machine

```mermaid
stateDiagram-v2
    [*] --> FIT_CHECK
    FIT_CHECK --> SCOPE: mutual fit confirmed
    SCOPE --> DEPOSIT: written acceptance criteria agreed
    DEPOSIT --> DELIVERY: 50% kickoff payment received
    DELIVERY --> REVIEW: two-week evidence package delivered
    REVIEW --> SETTLED: accepted result and balance settled
    REVIEW --> REPAIR: acceptance condition failed
    REPAIR --> REVIEW: bounded correction completed
    SETTLED --> NEXT_CYCLE: new scope approved
    NEXT_CYCLE --> SCOPE
```

## Component responsibility

| Path | Responsibility | Must not own |
|---|---|---|
| `data/portfolio.json` | Claims, statuses, summaries, stack labels | Rendering logic |
| `assets/app.js` | Filtering, language selection, safe rendering | Technical claim authority |
| `index.html` | Page structure and one-time narrative | Repeated project records |
| `assets/styles.css` | Visual system and responsive behavior | Content truth |
| `assert-site.mjs` | Deterministic publication rules | Human disclosure approval |
| `docs/disclosure-policy.md` | Public/private boundary | Runtime secrets |
| GitHub Actions | Execute checks and deploy | Semantic proof by itself |

## Loop boundary

The portfolio uses a small engineering loop:

```text
specify
-> change
-> execute
-> assert
-> repair exact failure
-> rerun
-> publish evidence
```

The loop differs from a general evaluator-optimizer pattern. It uses deterministic commands and explicit exit codes for machine-checkable conditions. Human review remains the authority for disclosure and commercial fit.

## Failure policy

- Do not convert `ABSENT` into `PASS`.
- Do not claim private implementation as public code.
- Do not add quantitative impact without a source, method, scope, and date.
- Do not bypass a failing assertion to publish the site.
- Stop after three identical repair failures and report the blocker.
