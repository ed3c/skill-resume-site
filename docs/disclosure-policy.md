# Public Disclosure Policy

## Approved private-project summary

The public site can describe `ix-agy-private` only as:

> The career bridge from Android engineering to full-stack delivery, mobile E2E automation, and agentic control systems.

The site can describe the private mobile automation work as local-first Android and iOS simulator or real-device control, bounded repair, and redacted evidence.

## Excluded information

Do not publish:

- employer, customer, or current-company identity;
- internal product or subproject names;
- private repository URLs or directory paths;
- credentials, signing material, private device identifiers, or user data;
- proprietary adapter names, inventories, provider bindings, or commercial-library selection records;
- internal operational scenarios;
- performance or usage metrics without public, repeatable evidence.

## Method-before-vendor rule

Describe the transferable method before any implementation provider:

```text
stateful control plane
bounded execution
mechanical verdict
repair and rerun
redacted evidence
```

Do not expose the private provider or adapter inventory that implements the method.

## Metric admission rule

A quantitative claim requires all fields:

```text
metric name
baseline
result
measurement method
sample or workload
date or commit
public evidence state
```

Without all fields, use qualitative wording and state the missing proof.

## Review checklist

- [ ] Every private project URL is `null` in public data.
- [ ] No company or customer name is present.
- [ ] No secret pattern is present.
- [ ] No proprietary adapter inventory is present.
- [ ] Every strong claim has an evidence state.
- [ ] Current gaps remain visible.
