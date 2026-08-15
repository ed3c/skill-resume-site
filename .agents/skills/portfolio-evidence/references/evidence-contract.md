# Public Portfolio Evidence Contract

## Evidence states

| State | Public meaning | Allowed wording |
|---|---|---|
| `verified-public` | Public code and repeatable checks exist. | Implemented, public, tested. |
| `public-prototype` | Public architecture or prototype exists. | Prototype, reference, demonstration. |
| `production-background` | The capability comes from prior professional work. | Production background, without employer details. |
| `private-implementation` | Implementation exists but remains private. | Private implementation, sanitized evidence. |
| `deterministic-reference` | Local deterministic behavior exists. Live infrastructure is not proven. | Deterministic reference implementation. |

## Claim record

Every material claim must answer:

```text
claim
-> source
-> evidence state
-> public disclosure decision
-> missing proof
```

## Evidence precedence

```text
current executable proof
> current repository contract
> current documentation
> historical statement
> aspiration
```

A diagram, dependency, package name, old commit, or planned architecture cannot create current capability truth.

## Public allowlist

The site can disclose:

- transferable engineering methods;
- public repository names and public URLs;
- sanitized private capability summaries;
- explicit limitations and missing evidence;
- engagement terms;
- role direction and next proof targets.

## Public denylist

The site must exclude:

- current or former employer identity unless separately approved;
- customer identity or operational data;
- private product names and private repository URLs;
- credentials, device identifiers, signing material, or secrets;
- proprietary adapter inventories and runtime bindings;
- unverified performance, reliability, revenue, or usage metrics.

## Verification rule

A check has evidence value only when the check executes against the relevant content and exits with an interpretable verdict. Missing execution is `ABSENT`, not `PASS`.
