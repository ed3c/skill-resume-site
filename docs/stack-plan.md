# Git Town Stacked-PR Plan

The initial site can ship as one bootstrap pull request. Substantial follow-up work uses a three-branch dependent stack.

## Stack graph

```text
main
└── portfolio/foundation
    └── portfolio/evidence
        └── portfolio/agentic-loop
```

## Branch contracts

| Branch | One reviewable outcome | Acceptance proof |
|---|---|---|
| `portfolio/foundation` | Static shell, accessibility, responsive layout, Pages workflow | HTML structure, local asset checks, Pages artifact build |
| `portfolio/evidence` | Repository-derived capability and project records | Schema checks, disclosure checks, valid public URLs |
| `portfolio/agentic-loop` | SKILL.md, deterministic assertions, architecture and repair loop | `npm run check` exits `0`; workflow executes on the branch head |

## Git Town commands

```bash
git town hack portfolio/foundation
git town append portfolio/evidence
git town append portfolio/agentic-loop
git town propose
git town sync --stack
```

## Task-splitting rules

- Put one externally reviewable behavior on each branch.
- Put its tests and evidence on the same branch.
- Use a child branch only for a real unmerged dependency.
- Use sibling branches for independent work.
- Keep GitHub base and head metadata as publication truth.
- Ship the oldest branch first.
- Rebase or sync descendants after each parent merge.

## Traceability

```text
requirement
-> branch
-> changed path
-> assertion
-> workflow run
-> pull request
-> merged commit
-> deployed Pages revision
```
