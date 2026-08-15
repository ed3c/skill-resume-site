# Security Policy

## Supported surface

This repository contains a static public website.

## Do not report secrets in public issues

Do not post:

- credentials;
- tokens;
- signing data;
- private repository content;
- customer information;
- personal data;
- raw mobile-device evidence.

Use GitHub's private vulnerability reporting or a private channel agreed with the repository owner.

## Content security

The site:

- uses no third-party browser runtime;
- restricts content through a Content Security Policy;
- loads project data from the same origin;
- publishes no form endpoint;
- links project inquiries to a public GitHub issue template with a confidentiality warning.

## Disclosure regression

Run:

```bash
npm run check
```

The assertion script scans versioned public content for prohibited terms and common secret patterns.
