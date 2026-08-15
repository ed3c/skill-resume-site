# Disclosure policy

## Safe to publish

- Public repository names and GitHub links.
- Plain-language summaries of demonstrated capability.
- Evidence labels that distinguish production background, public builds, public prototypes, and private implementations.
- Remote work terms and acceptance steps.

## Keep private

- Current or past company information that is not approved for public use.
- Client names and internal product names.
- Private repository URLs.
- Credentials, signing material, device identifiers, and environment values.
- Vendor bindings and the detailed inventory of paid or non-copyleft commercial libraries.
- Unverified customer, revenue, uptime, latency, success-rate, or adoption claims.

## Logo rule

Company and platform logos must not imply a customer, employer, sponsor, or partner relationship. The landing page uses Android, Apple, and GitHub icons only to describe the systems the work spans.

## Data rule

Every private project in `data/portfolio.json` must set:

```json
{
  "visibility": "private",
  "url": null
}
```

The release check fails when this rule is broken.
