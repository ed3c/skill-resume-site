# Portfolio architecture

## Runtime

```text
Browser
  ├── index.html
  ├── styles.css
  ├── main.js
  ├── assets/logo.webp
  └── data/portfolio.json
```

No framework and no build step are required.

## Long-scroll content flow

```text
Fixed cinematic hero
         │
         ▼
Semantic article sections in index order
         │
         ├── static explanatory content
         ├── capability evidence from portfolio.json
         └── public/private project evidence from portfolio.json
         │
         ▼
Contact and remote engagement action
```

The top-right control opens a page index. Each item targets a section ID. `main.js` uses `scrollIntoView()` for navigation and `IntersectionObserver` for scrollspy, section reveal, and one-time statistic animation.

## Evidence flow

```text
Public and private repository knowledge
                    │
                    ▼
          Disclosure allowlist
                    │
                    ▼
          data/portfolio.json
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
  Long-form renderer     Assertion script
          │                   │
          ▼                   ▼
      GitHub Pages      exit 0 / non-zero
```

The browser never receives a private repository URL. Private project records must use `url: null`.

## Interaction rules

- The page index is navigation, not a route switcher.
- Anchor clicks scroll to semantic sections.
- Scrollspy updates `aria-current` and the visible section label.
- The index panel traps focus while open.
- Escape and overlay click close the index.
- Reduced motion removes movement-heavy transitions and pauses the video.
- Data-saving mode pauses the video.
- The language switch applies to static and dynamically rendered evidence.

## Release flow

```text
Feature branch
      │
      ▼
npm test
      │
      ▼
Focused pull request
      │
      ▼
Portfolio CI
      │
      ▼
Merge to main
      │
      ▼
GitHub Pages deployment
```

## Security boundary

The meta Content Security Policy allows only the site itself plus the explicitly approved font, icon, and video hosts. Public project links must use `https://github.com/ed3c/`.
