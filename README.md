# Eeon — remote Agent engineering portfolio

A single-viewport GitHub Pages portfolio for remote software work across Android, iOS, full-stack systems, device automation, Agent workflows, system prompts, and SKILL.md packages.

The visible layer uses static HTML, CSS, and vanilla JavaScript. The existing evidence architecture remains in place: structured project data, disclosure rules, an executable SKILL.md, and a deterministic release check.

## Live site

`https://ed3c.github.io/skill-resume-site/`

## What changed in the design refresh

- Full-bleed video background with a restrained black-and-white interface.
- Clear portfolio copy instead of dense internal terminology.
- Desktop pill navigation and an accessible mobile sheet.
- Four single-viewport views: Home, Services, Work, and Contact.
- Public project evidence loaded from `data/portfolio.json`.
- Truthful work-model metrics instead of invented customer or benchmark numbers.
- Purposeful motion with reduced-motion and data-saving behavior.

## File map

```text
skill-resume-site/
├── index.html                         # Semantic page and four in-viewport views
├── styles.css                         # Visual system, responsive layout, motion
├── main.js                            # View routing, menu, language, stats, project data
├── assets/
│   ├── logo.webp                      # Public brand mark
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

The check verifies required files, the exact video URL, CSS variables, JavaScript syntax, keyboard hooks, reduced-motion support, public/private URL boundaries, and forbidden unverified claims.

## Design decisions

The page keeps one strong composition rather than stacking generic marketing cards. Motion is used for entry, state, and feedback. Frequent controls stay fast. Buttons have press feedback. The mobile menu closes on Escape, overlay click, link click, and desktop resize.

The three platform icons in the hero describe technical experience. They do not claim customer, employer, or sponsor relationships.

## Disclosure boundary

Public code links point only to `github.com/ed3c`. Private work appears as a capability description with `url: null`. The site does not disclose client names, employer details, credentials, device identifiers, vendor bindings, or paid library inventory.

## License

MIT. Repository content remains subject to the disclosure rules above.
