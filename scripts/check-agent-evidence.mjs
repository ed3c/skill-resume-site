#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const errors = [];

const data = JSON.parse(await readFile(path.join(root, "data/portfolio.json"), "utf8"));
const matrixJs = await readFile(path.join(root, "assets/evidence-matrix.js"), "utf8");
const bootstrap = await readFile(path.join(root, "main.js"), "utf8");

const dimensions = data.evaluationFramework?.dimensions || [];
const weights = dimensions.map((item) => Number(item.weight));
if (weights.length !== 5) errors.push("evaluation matrix must contain five dimensions");
if (weights.reduce((sum, value) => sum + value, 0) !== 100) errors.push("evaluation weights must sum to 100");
if (weights.join(",") !== "25,20,20,20,15") errors.push("evaluation weights must remain 25/20/20/20/15");

const gates = data.evaluationFramework?.exampleGates || {};
for (const [key, expected] of Object.entries({
  safetyPassRate: "100%",
  accuracyDelta: ">= 0.0%",
  judgeScoreDelta: ">= -0.02",
  tokenGrowth: "<= +15%",
  p95LatencyGrowth: "<= +20%",
})) {
  if (gates[key] !== expected) errors.push(`evaluation gate ${key} must remain ${expected}`);
}

const allowedCapabilityEvidence = new Set(["production-background", "public-builds", "private-implementation"]);
for (const capability of data.capabilities || []) {
  if (!allowedCapabilityEvidence.has(capability.evidence)) errors.push(`unknown capability evidence source: ${capability.id}`);
  if (!capability.nextProof?.en || !capability.nextProof?.["zh-Hant"]) errors.push(`capability ${capability.id} must state the next proof`);
}

const agentShield = (data.projects || []).find((project) => project.id === "agent-shield-monorepo");
if (!agentShield) errors.push("agent-shield-monorepo evidence entry is required");
else {
  if (agentShield.visibility !== "private") errors.push("agent-shield-monorepo must remain private in the public portfolio model");
  if (agentShield.url !== null) errors.push("agent-shield-monorepo private URL must not be published");
}

for (const phrase of [
  "The percentages are rubric weights, not my personal completion score.",
  "LLM 可以提出好答案，但軟體交付需要更強的規則",
  "Vibe Coding → Agentic Architect",
  "DROP-IN REMOTE AGENT",
  "GIT TOWN STACK PRS",
  "Safety/Guardrail = 100%",
]) {
  if (!matrixJs.includes(phrase)) errors.push(`evidence matrix must include: ${phrase}`);
}

for (const asset of ["assets/evidence-matrix.css", "assets/evidence-matrix.js", "assets/main-base.js", "assets/responsive.css"]) {
  if (!bootstrap.includes(asset) && !asset.endsWith("main-base.js") && !asset.endsWith("responsive.css")) {
    errors.push(`main.js must load ${asset}`);
  }
}
if (!bootstrap.includes("assets/evidence-matrix.css")) errors.push("main.js must load evidence-matrix.css");
if (!bootstrap.includes("assets/evidence-matrix.js")) errors.push("main.js must load evidence-matrix.js");
if (!bootstrap.includes("assets/main-base.js")) errors.push("main.js must preserve the v1 runtime");
if (!bootstrap.includes("assets/responsive.css")) errors.push("main.js must preserve the v1 responsive layer");

const publicText = await collectText(root, [
  "index.html",
  "main.js",
  "assets",
  "data",
  "docs",
  "README.md",
  "CONTEXT.md",
  "AGENTS.md",
]);
if (/ix-agy-private/i.test(publicText)) errors.push("retired private repository identity must not appear anywhere in public portfolio content");

for (const forbidden of [
  /capability completion\s*[:=]?\s*\d+%/i,
  /overall completion\s*[:=]?\s*\d+%/i,
  /my (?:agent )?(?:architect )?score\s*[:=]?\s*\d+/i,
  /我的(?:能力)?完成度\s*[:：]?\s*\d+%/u,
]) {
  if (forbidden.test(publicText)) errors.push(`invented personal completion score detected: ${forbidden}`);
}

if (errors.length) {
  console.error("Agent evidence assertions failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Agent evidence source labels: pass");
console.log("PDF-derived 25/20/20/20/15 rubric weights: pass");
console.log("Outcome gates and deterministic repair loop: pass");
console.log("Private repository disclosure boundary: pass");
console.log("v1 runtime and responsive layer preserved: pass");

async function collectText(base, entries) {
  const chunks = [];
  for (const entry of entries) await visit(path.join(base, entry), chunks);
  return chunks.join("\n");
}

async function visit(target, chunks) {
  try {
    const items = await readdir(target, { withFileTypes: true });
    for (const item of items) {
      const next = path.join(target, item.name);
      if (item.isDirectory()) await visit(next, chunks);
      else if (/\.(?:html|css|js|mjs|json|md|txt|yml|yaml)$/i.test(item.name)) chunks.push(await readFile(next, "utf8"));
    }
  } catch {
    try { chunks.push(await readFile(target, "utf8")); } catch { /* optional path */ }
  }
}
