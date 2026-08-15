# Public evidence contract

## Publish

- Public repository names and links.
- Plain-language capability summaries.
- Evidence status such as public build, public prototype, or private implementation.
- The remote engagement model and acceptance steps.

## Do not publish

- Client or employer names that are not already approved for public use.
- Private repository URLs.
- Credentials, signing material, device identifiers, or environment values.
- Vendor bindings and paid library inventory.
- Performance, revenue, customer, uptime, or adoption numbers without a public source.

## Visual truth rule

Do not use well-known company logos in a way that implies they are customers, employers, or sponsors. Platform icons may describe technology experience only when the nearby copy makes that meaning clear.

## Acceptance

The portfolio is publishable only when:

```bash
npm test
```

returns exit code `0`.
