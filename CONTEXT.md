# CONTEXT.md

## Product statement

This repository is Eeon's public remote-work portfolio. It explains the path from Android development to full-stack delivery, mobile automation, and software Agent systems.

## Public promise

The site must show what can be proved, keep private work private, and make the next step easy for a remote client or hiring team.

## Architecture invariants

1. Static HTML, CSS, and vanilla JavaScript only.
2. One viewport with four routed center views.
3. `data/portfolio.json` is the project-evidence source.
4. Public links point only to repositories owned by `ed3c`.
5. Private records use `url: null`.
6. The release check is executable and fail-closed.
7. Keyboard, mobile, reduced-motion, and data-saving behavior remain supported.
8. No font binary is stored in the repository.

## Copy rules

- Use plain words before specialist terms.
- Explain what the work does, not only what tools it uses.
- Keep sentences short.
- Avoid inflated titles and unverified metrics.
- Use Traditional Chinese terms that a software client can understand.

## Work model

- Fully remote preferred.
- Part-time engagements first.
- 50% at kickoff.
- First result review after two weeks.
- Remaining balance after agreed checks pass.

## Completion rule

A change is complete only when:

```bash
npm test
```

returns exit code `0` and the page has been checked at desktop and mobile widths.
