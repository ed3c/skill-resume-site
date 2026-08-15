# CONTEXT.md

## Product statement

This repository is Eeon's public remote-work portfolio. It explains the path from Android development to full-stack delivery, mobile automation, and software Agent systems.

## Public promise

The site must show what can be proved, keep private work private, and make the next step easy for a remote client or hiring team.

## Architecture invariants

1. Use static HTML, CSS, and vanilla JavaScript only.
2. Keep the cinematic first viewport and a continuous long-scroll homepage.
3. Use the top-right page index only for in-page anchor navigation.
4. Keep all major résumé information in semantic homepage sections.
5. Use `data/portfolio.json` as the project and capability evidence source.
6. Public links point only to repositories owned by `ed3c`.
7. Private records use `url: null`.
8. Keep the executable release check fail-closed.
9. Preserve keyboard, mobile, reduced-motion, and data-saving behavior.
10. Do not store font binaries in the repository.

## Copy rules

- Use plain words before specialist terms.
- Explain why the work exists, how it works, and what evidence is available.
- Keep procedural steps short and explicit.
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

returns exit code `0` and the long page has been checked at desktop and mobile widths.
