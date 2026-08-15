# Eeon — remote Agent engineering portfolio

A long-scroll GitHub Pages portfolio for remote software work across Android, iOS, full-stack systems, device automation, Agent workflows, system prompts, and executable SKILL.md packages.

The first viewport keeps the cinematic video composition. The rest of the homepage restores the full evidence-rich résumé as a continuous article. A single page index opens from the top-right corner and scrolls to semantic section anchors.

## Live site

`https://ed3c.github.io/skill-resume-site/`

## Information architecture

```text
Hero
  ↓
Overview
  ↓
Why now
  ↓
Career journey
  ↓
Capability evidence
  ↓
Selected repositories
  ↓
Execution method
  ↓
Architecture and data flow
  ↓
Services
  ↓
Remote engagement contract
  ↓
Career direction
  ↓
Contact
```

The page index is navigation only. It does not replace content or route to separate center panels. Each item uses an in-page anchor and smooth scrolling. Scrollspy updates the active index item and current section label.

## File map

```text
skill-resume-site/
├── index.html                         # Long-form semantic homepage
├── styles.css                         # Cinematic hero and editorial article system
├── main.js                            # Index, scrollspy, language, stats, evidence rendering
├── assets/
│   ├── logo.webp
│   └── favicon.svg
├── fonts/
│   └── README.md                      # Local fallback policy; no font binary
├── data/
│   └── portfolio.json                 # Public/private evidence model
├── docs/
│   ├── architecture.md
│   ├── disclosure-policy.md
│   └── stack-plan.md
└── .agents/skills/portfolio-evidence/
    ├── SKILL.md
    ├── scripts/assert-site.mjs
    └── references/evidence-contract.md
```

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Validate

```bash
npm test
```

The release gate verifies the long-scroll sections, index anchors, scrollspy hooks, exact background video, CSS variables, JavaScript syntax, keyboard behavior, reduced-motion support, public/private URL boundaries, and deployment artifact coverage.

## Content policy

- Use plain language before specialist terms.
- Explain the problem, method, evidence, and current limitation.
- Do not invent customer, revenue, adoption, uptime, speed, or performance claims.
- Public links point only to repositories owned by `ed3c`.
- Private work appears only as capability evidence with `url: null`.
- Do not expose company, client, credential, device identifier, vendor binding, or paid-library inventory.

## License

MIT. Repository content remains subject to the disclosure rules above.
