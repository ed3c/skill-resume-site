---
name: portfolio-evidence
description: Reviews and validates the public portfolio before release. Use it after copy, design, project data, navigation, animation, or disclosure changes.
---

# Portfolio evidence skill

## Goal

Keep the portfolio clear, tasteful, accessible, and true.

A visual change is not complete until the page still works with a keyboard, private links remain hidden, public claims match repository evidence, and the automated check returns exit code `0`.

## Small execution loop

1. Name one visible or measurable result.
2. Change the smallest useful set of files.
3. Run the page locally.
4. Run the assertion script.
5. Repair the exact failed condition.
6. Repeat until the script returns exit code `0`.
7. Open a focused pull request with the result and proof.

## Run

```bash
npm test
```

Direct command:

```bash
node .agents/skills/portfolio-evidence/scripts/assert-site.mjs
```

## Required proof

- `index.html` loads the approved video, fonts, CSS, and JavaScript.
- `styles.css` keeps the single-viewport layout and reduced-motion behavior.
- `main.js` passes `node --check`.
- Mobile navigation supports Escape, overlay click, link click, and desktop resize.
- Public project links stay under `https://github.com/ed3c/`.
- Private projects use `url: null`.
- Unverified enterprise, uptime, speed, revenue, and customer claims do not appear.
- The local font binary is not committed; the display stack uses the CDN font and a local system fallback.

## Design review order

1. Readability and truth.
2. Keyboard and touch behavior.
3. Clear hierarchy and spacing.
4. Motion with a purpose.
5. Decorative polish.

Use strong ease-out curves for entry and feedback. Keep frequent controls fast. Add `scale(0.97)` press feedback. Do not animate from `scale(0)`. Respect reduced motion and data-saving preferences.

## Exit meaning

- `0`: all release checks passed.
- non-zero: do not publish. Read the exact failure, repair it, and rerun.
