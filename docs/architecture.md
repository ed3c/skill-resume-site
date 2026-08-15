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

## View flow

```text
Header navigation / URL hash
            │
            ▼
      main.js router
   ┌────────┼─────────┬─────────┐
   ▼        ▼         ▼         ▼
 Home    Services    Work     Contact
   │                   │
   │                   └── fetch data/portfolio.json
   │                              │
   └── stats count-up             ▼
                         public project rows
```

All views share one viewport. The background video, header, and stats remain in one composition. The center stage swaps between the home hero and an accessible panel.

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
    Browser renderer    Assertion script
          │                   │
          ▼                   ▼
      GitHub Pages      exit 0 / non-zero
```

The browser never receives a private repository URL. Private project records must use `url: null`.

## Interaction rules

- Hash routing supports browser history.
- Navigation updates `aria-current`.
- Panels update `aria-hidden` and `inert` when supported.
- The mobile menu traps focus while open.
- Escape closes the menu or returns to Home.
- Reduced motion pauses the video and removes movement-heavy transitions.
- Data-saving mode pauses the video.

## Security boundary

The meta Content Security Policy allows only the site itself plus the explicitly approved font, icon, and video hosts. Public project links must use `https://github.com/ed3c/`.
