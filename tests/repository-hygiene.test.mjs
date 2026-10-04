import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "..");

const skillRoot = path.join(ROOT, "skills", "repository-hygiene");

test("skill enforces release-history-aware deletion policy", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  assert.match(skill, /PRE_RELEASE/);
  assert.match(skill, /RELEASED_OR_PRODUCTION/);
  assert.match(skill, /If release history is ambiguous, choose `RELEASED_OR_PRODUCTION`/);
  assert.match(skill, /never-published compatibility/i);
  assert.match(skill, /public contracts, migrations, rollback paths, persisted formats/i);
});

test("finding classification prevents reference-search-only deletion", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const classification = await readFile(path.join(skillRoot, "references", "FINDING_CLASSIFICATION.md"), "utf8");
  assert.match(skill, /lack of textual references.*never as proof/i);
  for (const value of ["SAFE_DELETE", "REVIEW_REQUIRED", "PROTECTED"]) {
    assert.match(classification, new RegExp(value));
  }
  assert.match(classification, /Do not delete until uncertainty is resolved/i);
});

test("cleanup is staged instead of one vague pass", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const dead = skill.indexOf("### Dead & orphan");
  const legacy = skill.indexOf("### Legacy & cruft");
  const docs = skill.indexOf("### Documentation & repository drift");
  const consolidation = skill.indexOf("### Consolidation");
  assert.ok(dead >= 0 && legacy > dead && docs > legacy && consolidation > docs);
});

test("convergence requires three-cycle ceiling and two fresh clean passes on one HEAD", async () => {
  const protocol = await readFile(path.join(skillRoot, "references", "CONVERGENCE_PROTOCOL.md"), "utf8");
  assert.match(protocol, /Repeat mutation cycles up to 3/i);
  assert.match(protocol, /clean_count = 2 -> REPOSITORY_HYGIENE_PASS/);
  assert.match(protocol, /both verification results target exactly the same HEAD/i);
  assert.match(protocol, /new invocation\/context/);
  assert.match(protocol, /read-only/);
  assert.match(protocol, /HYGIENE_NOT_CONVERGED/);
});

test("fresh verification cannot mutate and still count clean", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  assert.match(skill, /A fresh verification pass is read-only/);
  assert.match(skill, /do not silently mutate and still count the pass as clean/i);
  assert.match(skill, /A mutation after a clean verification resets the clean-verification count/i);
});

test("cleanup mutations reconcile materially invalidated prior evidence", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  assert.match(skill, /identify which prior evidence is materially invalidated/);
  assert.match(skill, /rerun only the affected review\/test\/integration validation proportionally/);
  assert.match(skill, /do not reuse evidence from a materially different HEAD/i);
});

test("standard protects dynamic, generated, migration, rollback and historical surfaces", async () => {
  const standard = await readFile(path.join(skillRoot, "references", "HYGIENE_STANDARD.md"), "utf8");
  for (const phrase of [
    "reflection/plugin/dynamic-discovery targets",
    "generated inputs/outputs",
    "migration history",
    "deployment/rollback assets",
  ]) {
    assert.match(standard, new RegExp(phrase.replace("/", "\\/"), "i"));
  }
  assert.match(standard, /ADR\/changelog\/audit\/security\/legal records/i);
  assert.match(standard, /release notes\/changelogs\/ADRs/i);
});

test("handoff asset exposes objective convergence state", async () => {
  const handoff = JSON.parse(await readFile(path.join(skillRoot, "assets", "hygiene-handoff.template.json"), "utf8"));
  assert.equal(handoff.schema, "com.turpial.repository-hygiene-handoff/v1");
  assert.equal(handoff.mutation_cycle, 1);
  assert.equal(handoff.consecutive_clean_verifications, 0);
  assert.ok(Array.isArray(handoff.coverage));
  assert.ok(Array.isArray(handoff.findings.safe_delete));
  assert.ok(Array.isArray(handoff.findings.review_required));
  assert.ok(Array.isArray(handoff.findings.protected));
});

test("report separates coverage, findings, evidence reconciliation and fresh verification", async () => {
  const report = await readFile(path.join(skillRoot, "assets", "hygiene-report.template.md"), "utf8");
  const coverage = report.indexOf("## 3. Coverage");
  const findings = report.indexOf("## 4. Findings");
  const reconcile = report.indexOf("## 7. Evidence reconciliation");
  const validation = report.indexOf("## 8. Validation executed");
  const fresh = report.indexOf("## 9. Fresh verification");
  assert.ok(coverage >= 0 && findings > coverage && reconcile > findings && validation > reconcile && fresh > validation);
});

test("bounded cleanup preserves protection evidence without becoming a fresh verification shortcut", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const bounded = skill.split("## Bounded cleanup follow-up\n")[1]?.split("## Deep path\n")[0];
  assert.ok(bounded);
  for (const obligation of [
    /CLEANUP follow-up/i, /authoritative baseline/i, /Re-anchor current HEAD.*dirty/is,
    /actual consumers/i, /release-history/i, /public\/persisted/i, /migrations/i,
    /rollback/i, /dynamic\/generated\/external/i, /Preserve unrelated.*protected.*still-valid/is,
    /classification.*deletion proof/i, /empty reference search.*insufficient/is,
    /mutation.*resets.*count/is, /references.*affected concern/is,
  ]) assert.match(bounded, obligation);
  assert.match(bounded, /does not count as FRESH_VERIFY.*REPOSITORY_HYGIENE_PASS/is);
  assert.match(bounded, /fresh verification independently scans the full/is);
  assert.match(bounded, /two-invocation\/same-HEAD/i);
});

test("deep hygiene routing preserves uncertain deletion, state and release risk handling", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const deep = skill.split("## Deep path\n")[1]?.split("## Evidence lifecycle\n")[0];
  assert.ok(deep);
  for (const risk of [
    /new\/missing baseline/i, /repository-wide/i, /unclear scope/i, /contradictions/i,
    /environment drift/i, /missing durable evidence/i, /failed invariants/i,
    /public.*schema/i, /persisted.*migrations/i, /auth.*security/i,
    /deployment.*rollback/i, /release\/support history/i,
    /uncertain dynamic\/generated\/external/i, /cross-provider/i,
    /REVIEW_REQUIRED.*PROTECTED/is,
  ]) assert.match(deep, risk);
});

test("objective evidence reuse and targeted invalidation preserve independent convergence ownership", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const lifecycle = skill.split("## Evidence lifecycle\n")[1]?.split("## Invocation modes\n")[0];
  const protocol = await readFile(path.join(skillRoot, "references", "CONVERGENCE_PROTOCOL.md"), "utf8");
  assert.ok(lifecycle);
  assert.match(lifecycle, /durable.*inspectable.*actual execution.*unchanged/is);
  assert.match(lifecycle, /Assumptions.*subjective clean conclusion.*not evidence/is);
  assert.match(lifecycle, /invalidated checks proportionally.*preserve unaffected proof/is);
  assert.match(lifecycle, /conclusions remain independently owned/i);
  assert.match(protocol, /completed objective.*unchanged candidate.*new turn.*does not require replay/is);
  assert.match(protocol, /new FRESH_VERIFY.*full-scope conclusion.*independent/is);
});
