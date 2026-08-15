#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(scriptPath), "../../../..");
const failures = [];

const requiredFiles = [
  "index.html",
  "404.html",
  "README.md",
  "AGENTS.md",
  "CONTEXT.md",
  "SECURITY.md",
  "assets/app.js",
  "assets/styles.css",
  "assets/favicon.svg",
  "data/portfolio.json",
  "manifest.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "docs/architecture.md",
  "docs/disclosure-policy.md",
  "docs/stack-plan.md",
  ".agents/skills/portfolio-evidence/SKILL.md",
  ".github/workflows/ci.yml",
  ".github/workflows/pages.yml",
];

for (const relative of requiredFiles) {
  if (!fs.existsSync(path.join(root, relative))) {
    failures.push(`Missing required file: ${relative}`);
  }
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), "utf8");
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const index = read("index.html");
const app = read("assets/app.js");
const styles = read("assets/styles.css");
const packageJson = JSON.parse(read("package.json"));
const manifest = JSON.parse(read("manifest.webmanifest"));
const portfolio = JSON.parse(read("data/portfolio.json"));

for (const id of [
  "top",
  "why-now",
  "career",
  "capabilities",
  "evidence",
  "loop",
  "engagement",
  "trajectory",
  "architecture",
]) {
  assert(index.includes(`id="${id}"`), `index.html is missing section #${id}`);
}

for (const phrase of [
  "Drop-in Remote Agent Engineer",
  "50%",
  "two-week",
  "SKILL.md",
  "STE100",
  "Git Town",
  "Android",
  "iOS",
]) {
  assert(index.includes(phrase), `index.html is missing required public phrase: ${phrase}`);
}

assert(!/<script[^>]+src=["']https?:\/\//i.test(index), "External scripts are not allowed.");
assert(!/<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:\/\//i.test(index), "External stylesheets are not allowed.");
assert(index.includes('Content-Security-Policy'), "index.html must include a Content Security Policy.");
assert(styles.includes(":focus-visible"), "styles.css must define visible keyboard focus.");
assert(styles.includes("prefers-reduced-motion"), "styles.css must respect reduced-motion preferences.");
assert(app.includes("textContent"), "assets/app.js must use textContent for dynamic text.");

const localReferences = [...index.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
  .map((match) => match[1])
  .filter((value) => !value.startsWith("http") && !value.startsWith("#") && !value.startsWith("mailto:") && !value.startsWith("data:"));

for (const reference of localReferences) {
  const clean = reference.split(/[?#]/)[0];
  if (!clean || clean === "./") continue;
  assert(fs.existsSync(path.join(root, clean)), `Broken local reference in index.html: ${reference}`);
}

assert(portfolio.schema_version === "1.0.0", "portfolio schema_version must be 1.0.0.");
assert(Array.isArray(portfolio.capabilities) && portfolio.capabilities.length >= 6, "At least six capability records are required.");
assert(Array.isArray(portfolio.projects) && portfolio.projects.length >= 8, "At least eight project records are required.");
assert(Array.isArray(portfolio.roles) && portfolio.roles.length === 3, "Exactly three target role records are required.");

const allowedStates = new Set([
  "verified-public",
  "public-prototype",
  "production-background",
  "private-implementation",
  "deterministic-reference",
]);

const ids = new Set();
for (const record of [...portfolio.capabilities, ...portfolio.projects, ...portfolio.roles]) {
  assert(typeof record.id === "string" && record.id.length > 0, "Every record requires a non-empty id.");
  assert(!ids.has(record.id), `Duplicate record id: ${record.id}`);
  ids.add(record.id);
}

for (const capability of portfolio.capabilities) {
  assert(allowedStates.has(capability.status_key), `Unknown capability status: ${capability.status_key}`);
  assert(Array.isArray(capability.stack) && capability.stack.length > 0, `Capability ${capability.id} requires stack labels.`);
}

for (const project of portfolio.projects) {
  assert(allowedStates.has(project.status_key), `Unknown project status: ${project.status_key}`);
  assert(["public", "private"].includes(project.visibility), `Project ${project.id} has invalid visibility.`);
  if (project.visibility === "public") {
    assert(typeof project.url === "string" && project.url.startsWith("https://github.com/ed3c/"), `Public project ${project.id} requires an ed3c GitHub URL.`);
  } else {
    assert(project.url === null, `Private project ${project.id} must not expose a URL.`);
  }
}

const steps = portfolio.delivery_loop?.steps_en;
assert(Array.isArray(steps) && steps.length === 7, "The English delivery loop must contain seven steps.");
if (Array.isArray(steps)) {
  for (const step of steps) {
    const wordCount = step.trim().split(/\s+/).filter(Boolean).length;
    assert(wordCount <= 20, `Delivery step exceeds 20 words: ${step}`);
    assert(!/\b(and then|after that|as well as|while)\b/i.test(step), `Delivery step contains a compound action marker: ${step}`);
  }
}

assert(manifest.start_url === "./", "manifest start_url must be ./ for project Pages.");
assert(Object.keys(packageJson.dependencies ?? {}).length === 0, "Runtime dependencies are not allowed.");
assert(Object.keys(packageJson.devDependencies ?? {}).length === 0, "Development dependencies are not allowed.");

const publicTextFiles = [
  "index.html",
  "404.html",
  "README.md",
  "AGENTS.md",
  "CONTEXT.md",
  "SECURITY.md",
  "assets/app.js",
  "data/portfolio.json",
  "docs/architecture.md",
  "docs/disclosure-policy.md",
  "docs/stack-plan.md",
  ".agents/skills/portfolio-evidence/SKILL.md",
  ".agents/skills/portfolio-evidence/references/evidence-contract.md",
];

const publicText = publicTextFiles.map(read).join("\n");
const prohibitedPatterns = [
  /ixsecurity/i,
  /iXSec/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:api[_-]?key|token|secret|password)\s*[:=]\s*["'][^"']{8,}["']/i,
  /sk-[A-Za-z0-9_-]{20,}/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
];

for (const pattern of prohibitedPatterns) {
  assert(!pattern.test(publicText), `Public content matches prohibited pattern: ${pattern}`);
}

if (failures.length > 0) {
  process.stderr.write("\nPORTFOLIO ASSERTION FAILURES\n");
  for (const failure of failures) process.stderr.write(`- ${failure}\n`);
  process.exit(1);
}

process.stdout.write("Portfolio assertions passed. Public claims, disclosure boundaries, assets, and delivery-loop rules are valid.\n");
