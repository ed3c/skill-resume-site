---
name: portfolio-evidence
description: Reviews and validates the public portfolio before release. Use it after copy, long-scroll content, page-index, design, project data, animation, or disclosure changes.
---

# Portfolio evidence skill

## Goal

Keep the portfolio clear, tasteful, accessible, complete, and true.

A change is not complete until the page still works with a keyboard, every category remains available on the homepage, index links scroll to valid sections, private links remain hidden, public claims match repository evidence, and the automated check returns exit code `0`.

## Small execution loop

1. Name one visible or measurable result.
2. Change the smallest useful set of files.
3. Run the page locally.
4. Run the assertion script.
5. Read the exact failed condition.
6. Repair the failed condition.
7. Repeat until the script returns exit code `0`.
8. Open a focused pull request with the result and proof.

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
- The homepage includes Overview, Why now, Journey, Capabilities, Work, Method, Architecture, Services, Engagement, Direction, and Contact.
- The top-right index uses in-page anchors and does not replace article content.
- `main.js` passes `node --check`.
- Index navigation supports keyboard focus, Escape, overlay click, and desktop resize.
- Scrollspy updates the active section and `aria-current`.
- Public project links stay under `https://github.com/ed3c/`.
- Private projects use `url: null`.
- Unverified enterprise, uptime, speed, revenue, performance, and customer claims do not appear.
- The local font binary is not committed; the display stack uses the CDN font and a local system fallback.

## Design review order

1. Readability and truth.
2. Complete information architecture.
3. Keyboard and touch behavior.
4. Clear hierarchy and article rhythm.
5. Motion with a purpose.
6. Decorative polish.

Use strong ease-out curves for entry and feedback. Keep frequent controls fast. Add `scale(0.97)` press feedback. Do not animate from `scale(0)`. Respect reduced motion and data-saving preferences.

## Exit meaning

- `0`: all release checks passed.
- non-zero: do not publish. Read the exact failure, repair it, and rerun.
