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
  "data-view-panel=\"work\"",
  "data-view-link=\"contact\"",
  "Skip to the main content",
];

for (const fragment of requiredHtml) {
  if (!html.includes(fragment)) errors.push(`index.html must include: ${fragment}`);
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

for (const [name, value] of Object.entries(requiredVariables)) {
  const compactCss = css.replace(/\s+/g, " ");
  if (!compactCss.includes(`${name}: ${value}`)) errors.push(`styles.css must keep ${name}: ${value}`);
}

for (const fragment of [
  "height: 100dvh",
  "@media (prefers-reduced-motion: reduce)",
  "cubic-bezier(0.23, 1, 0.32, 1)",
  ".menu-button[aria-expanded=\"true\"]",
  "font-variant-numeric: tabular-nums",
]) {
  if (!css.includes(fragment)) errors.push(`styles.css must include: ${fragment}`);
}

for (const fragment of [
  "IntersectionObserver",
  "480 + index * 90",
  "1500 + index * 80",
  "Math.pow(1 - progress, 3)",
  "event.key === \"Escape\"",
  "window.innerWidth > 720",
  "data/portfolio.json",
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
  if (!Array.isArray(data.projects) || data.projects.length < 6) errors.push("portfolio.json needs at least six projects");
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

for (const [name, workflow] of [["pages.yml", pagesWorkflow], ["ci.yml", ciWorkflow]]) {
  for (const artifact of ["styles.css", "main.js", "fonts"]) {
    if (!workflow.includes(artifact)) errors.push(`${name} must publish ${artifact}`);
  }
}

if (!errors.length) {
  notes.push("Static architecture: pass");
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
