#!/usr/bin/env node
import { readFile, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "styles.css",
  "main.js",
  "assets/logo.webp",
  "data/portfolio.json",
  "fonts/README.md",
  "README.md",
  "docs/architecture.md",
  "CONTEXT.md",
  "AGENTS.md",
];

const errors = [];
const notes = [];

for (const relative of requiredFiles) {
  try {
    const info = await stat(path.join(root, relative));
    if (!info.isFile() || info.size === 0) errors.push(`${relative} must be a non-empty file`);
  } catch {
    errors.push(`${relative} is missing`);
  }
}

const [html, css, js, rawData, packageText, pagesWorkflow, ciWorkflow] = await Promise.all([
  readText("index.html"),
  readText("styles.css"),
  readText("main.js"),
  readText("data/portfolio.json"),
  readText("package.json"),
  readText(".github/workflows/pages.yml"),
  readText(".github/workflows/ci.yml"),
]);

const exactVideo = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4";
const requiredHtml = [
  "<title>Intelligence Designed To Evolve</title>",
  exactVideo,
  "assets/logo.webp",
  "styles.css",
  "main.js",
  "BubbledotICG-FinePos",
  "font-awesome/6.5.2",
  "aria-expanded=\"false\"",
  "id=\"site-index\"",
  "data-index-link",
  "data-index-section",
  "Skip to the main content",
  "Drop-in remote engineering for the difficult part.",
  "Turn model output into shipped evidence.",
  "The résumé is itself an Agent-ready repository.",
];

for (const fragment of requiredHtml) {
  if (!html.includes(fragment)) errors.push(`index.html must include: ${fragment}`);
}

const requiredSectionIds = [
  "overview",
  "why-now",
  "career",
  "capabilities",
  "projects",
  "method",
  "architecture",
  "services",
  "engagement",
  "trajectory",
  "contact",
];

for (const id of requiredSectionIds) {
  if (!html.includes(`id=\"${id}\"`)) errors.push(`index.html must include section #${id}`);
  if (id !== "contact" && !html.includes(`href=\"#${id}\"`)) errors.push(`Page index must link to #${id}`);
}

if ((html.match(/data-index-section/g) || []).length < requiredSectionIds.length) {
  errors.push("Every long-form content section must participate in scrollspy");
}

if ((html.match(/class=\"article-lead\"/g) || []).length < 9) {
  errors.push("Long-form page must include article explanations for the major sections");
}

for (const obsolete of ["data-view-panel", "data-view-link", "main.js router", "four routed center views"]) {
  if (html.includes(obsolete)) errors.push(`Old single-viewport router fragment must be removed: ${obsolete}`);
}

const requiredVariables = {
  "--bg": "#000000",
  "--text": "#ffffff",
  "--muted": "#8e8e8e",
  "--nav-text": "#2e2e2e",
  "--pill-dark": "#28282a",
  "--sign-in-text": "#c8c8c8",
  "--nav-shadow": "0 4px 14px rgba(0, 0, 0, 0.16)",
  "--trust-bg": "#28282a",
  "--trust-border": "rgba(255, 255, 255, 0.4)",
  "--trust-text": "#c4c2c3",
};

const compactCss = css.replace(/\s+/g, " ");
for (const [name, value] of Object.entries(requiredVariables)) {
  if (!compactCss.includes(`${name}: ${value}`)) errors.push(`styles.css must keep ${name}: ${value}`);
}

for (const fragment of [
  "height: 100dvh",
  "scroll-behavior: smooth",
  "scroll-margin-top",
  "@media (prefers-reduced-motion: reduce)",
  "cubic-bezier(0.23, 1, 0.32, 1)",
  ".index-button[aria-expanded=\"true\"]",
  "font-variant-numeric: tabular-nums",
  ".article-layout",
  ".section-rail",
]) {
  if (!css.includes(fragment)) errors.push(`styles.css must include: ${fragment}`);
}

for (const fragment of [
  "IntersectionObserver",
  "scrollIntoView",
  "480 + index * 90",
  "1500 + index * 80",
  "Math.pow(1 - progress, 3)",
  "event.key === \"Escape\"",
  "window.innerWidth > 720",
  "data/portfolio.json",
  "data-index-section",
  "data-index-link",
  "aria-current",
]) {
  if (!js.includes(fragment)) errors.push(`main.js must include: ${fragment}`);
}

const requiredArtifactFiles = ["index.html", "styles.css", "main.js", "404.html"];
const requiredArtifactDirectories = ["assets", "fonts", "data", "docs"];
for (const [name, workflow] of [["pages.yml", pagesWorkflow], ["ci.yml", ciWorkflow]]) {
  for (const file of requiredArtifactFiles) {
    if (!workflow.includes(file)) errors.push(`${name} must publish ${file}`);
  }
  for (const directory of requiredArtifactDirectories) {
    if (!workflow.includes(directory)) errors.push(`${name} must publish ${directory}/`);
  }
}

const forbiddenClaims = [
  /Trusted by 2000\+ Enterprises/i,
  /99\.99%/,
  /120ms/i,
  /2\.4M/i,
  /world[- ]class/i,
  /game[- ]changer/i,
  /工兛/u,
];

for (const pattern of forbiddenClaims) {
  if (pattern.test(`${html}\n${rawData}`)) errors.push(`Public copy contains a forbidden or unverified claim: ${pattern}`);
}

let data;
try {
  data = JSON.parse(rawData);
} catch (error) {
  errors.push(`data/portfolio.json is not valid JSON: ${error.message}`);
}

if (data) {
  if (!Array.isArray(data.projects) || data.projects.length < 8) errors.push("portfolio.json needs at least eight projects");
  if (!Array.isArray(data.capabilities) || data.capabilities.length !== 6) errors.push("portfolio.json must expose six capability areas");

  const ids = new Set();
  for (const project of data.projects || []) {
    if (!project.id || ids.has(project.id)) errors.push(`Project IDs must be present and unique: ${project.id || "missing"}`);
    ids.add(project.id);

    if (project.visibility === "private" && project.url !== null) {
      errors.push(`Private project ${project.id} must set url to null`);
    }

    if (project.visibility === "public") {
      if (typeof project.url !== "string" || !project.url.startsWith("https://github.com/ed3c/")) {
        errors.push(`Public project ${project.id} must link only to github.com/ed3c`);
      }
    }
  }
}

let pkg;
try {
  pkg = JSON.parse(packageText);
  if (Object.keys(pkg.dependencies || {}).length !== 0) errors.push("Runtime dependencies must remain empty");
  if (Object.keys(pkg.devDependencies || {}).length !== 0) errors.push("Development dependencies must remain empty");
} catch (error) {
  errors.push(`package.json is not valid JSON: ${error.message}`);
}

const nodeCheck = spawnSync(process.execPath, ["--check", path.join(root, "main.js")], { encoding: "utf8" });
if (nodeCheck.status !== 0) errors.push(`main.js syntax check failed:\n${nodeCheck.stderr.trim()}`);

if (!html.includes("Content-Security-Policy")) errors.push("index.html must keep a Content-Security-Policy");
if (!html.includes("media-src https://d8j0ntlcm91z4.cloudfront.net")) errors.push("CSP must allow only the requested CloudFront host for video");
if (html.includes("fonts/GeistPixel-Circle.woff2")) errors.push("The font binary is not bundled; CSS must use the local() fallback described in fonts/README.md");

if (!html.includes("href=\"#why-now\" data-index-link")) errors.push("The page index must use in-page anchors instead of routed views");
if (!html.includes("href=\"#architecture\" data-index-link")) errors.push("Architecture must be reachable from the page index");

if (!errors.length) {
  notes.push("Long-scroll content architecture: pass");
  notes.push("Index anchors and scrollspy hooks: pass");
  notes.push("Truth and disclosure gate: pass");
  notes.push("Keyboard and reduced-motion hooks: pass");
  notes.push("JavaScript syntax: pass");
  console.log(notes.join("\n"));
  process.exit(0);
}

console.error("Portfolio assertions failed:\n");
for (const error of errors) console.error(`- ${error}`);
process.exit(1);

async function readText(relative) {
  try {
    return await readFile(path.join(root, relative), "utf8");
  } catch {
    return "";
  }
}
