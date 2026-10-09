---
name: repository-hygiene
description: Use when a software repository needs evidence-based cleanup of dead or orphan code, stale documentation, obsolete configuration, unnecessary legacy, duplication, abandoned artifacts, or AI-generated repository cruft before release or as periodic maintenance.
license: MIT
compatibility: Works across languages and repository layouts; cleanup and validation adapt to the target repository's actual runtime, build, test, lint, typecheck, dependency, documentation, and release tooling.
metadata:
  author: Turpial AI Academy
  version: "0.5.7"
---

# repository-hygiene

## Operating flow

~~~text
BASELINE
  -> SCAN
  -> CLASSIFY
  -> CLEAN
  -> RECONCILE
  -> VALIDATE
  -> FRESH VERIFY
  -> REPORT
~~~

The goal is convergence, not a single "looks clean" pass.

## Purpose

Reduce repository entropy without deleting useful history, compatibility, generated/runtime behavior, or operational safeguards.

This capability is intentionally repository-aware and tool-agnostic. Use the repository's own build, compiler, linter, dependency, test, package, documentation, Git, and runtime evidence before introducing new analysis tooling.

It can operate standalone or satisfy ASPS `repository-hygiene/v1`.

## Non-negotiable rules

- Inspect before deleting.
- Treat lack of textual references as a clue, never as proof that something is unused.
- Separate observed evidence from interpretation.
- Classify every material finding as `SAFE_DELETE`, `REVIEW_REQUIRED`, or `PROTECTED` before deletion.
- Determine release-history mode before removing legacy or compatibility behavior.
- Preserve public contracts, migrations, rollback paths, persisted formats, audit/security/legal history, generated-source ownership, and external integrations unless evidence explicitly supports removal.
- Prefer deletion and simplification over replacement abstractions when the removed behavior has no remaining responsibility.
- Do not perform unrelated refactors merely because cleanup exposed an opportunity.
- Do not report skipped, historical, or previous-HEAD validation as current proof.
- A fresh verification pass is read-only. If it finds actionable work, report it; do not silently mutate and still count the pass as clean.
- Two clean verifications count only when they are fresh invocations against the same HEAD.
- A mutation after a clean verification resets the clean-verification count.
- Never exceed three mutation cycles for one convergence attempt. Return `HYGIENE_NOT_CONVERGED` when unresolved actionable findings remain after the third cycle.

## Bounded cleanup follow-up

Use only for a local CLEANUP follow-up when an authoritative baseline/coverage map and durable findings are healthy, the affected responsibility is understood, and release-history, ownership, consumer, and protection facts remain valid.

1. Re-anchor current HEAD and dirty state; locate the objective baseline and the affected finding/artifact.
2. Inspect affected paths, their actual consumers, and required cross-cutting invariants: release-history mode, public/persisted contracts, migrations, rollback, intentional history, and dynamic/generated/external ownership.
3. Preserve unrelated artifacts, protected material, and still-valid evidence. Reconfirm classification and deletion proof before the smallest authorized cleanup; an empty reference search remains insufficient.
4. Invalidate only materially affected review/testing/integration or runtime/build evidence, revalidate the affected checks, and reach an integrated exact final HEAD. Every mutation still resets the clean-verification count.
5. Report changed responsibility, coverage, durable evidence reused, evidence invalidated, fresh checks, and uncertainty. Load detailed references for an affected concern, classification decision, or convergence obligation rather than replaying a full baseline/template.

This path does not count as FRESH_VERIFY or grant REPOSITORY_HYGIENE_PASS. Every fresh verification independently scans the full applicable hygiene scope, is read-only, and must meet the existing two-invocation/same-HEAD gate. Preserve objective completed convergence evidence for an unchanged candidate; a new turn alone does not reset the count or require replaying valid work.

## Deep path

Use complete discovery for a new/missing baseline, repository-wide cleanup, unclear scope, contradictions, unhealthy conventions or environment drift, missing durable evidence, or failed invariants. Expand for public API/event/schema, persisted data/migrations, auth/security, deployment/rollback, release/support history changes, uncertain dynamic/generated/external consumers, or cross-provider dependencies. Unproven deletion candidates remain REVIEW_REQUIRED or PROTECTED; do not reduce scope merely to reach a clean gate.

## Evidence lifecycle

Reuse only durable, inspectable objective facts and actual execution evidence with unchanged inputs, environment, scope, and obligations. Assumptions, recollection, and a previous verifier's subjective clean conclusion are not evidence. Reconcile materially invalidated checks proportionally and preserve unaffected proof. Required mutable-state observations and final-HEAD checks must be fresh when validity is not independently established. Fresh verification conclusions remain independently owned, even when objective facts or valid completed gate receipts are reused.

## Invocation modes

### CLEANUP

Use for baseline, scanning, classification, authorized cleanup, evidence reconciliation, and validation.

A cleanup invocation may mutate repository files when authorized.

### FRESH_VERIFY

Use only after the latest cleanup mutation and required validation/reconciliation.

A fresh verification invocation must:

- start from current repository evidence rather than a previous agent's "clean" conclusion;
- be read-only;
- record the exact HEAD inspected;
- independently scan the full hygiene scope;
- return zero actionable findings to count as a clean verification.

If it finds `SAFE_DELETE` or unresolved `REVIEW_REQUIRED` work, return findings and require another cleanup cycle. Do not mutate in the same verification invocation.

Read [CONVERGENCE_PROTOCOL.md](references/CONVERGENCE_PROTOCOL.md).

## 1. Baseline

For complete discovery, read [HYGIENE_STANDARD.md](references/HYGIENE_STANDARD.md) and [DISCOVERY_MODEL.md](references/DISCOVERY_MODEL.md). For bounded cleanup, load the affected guidance when needed and reuse the healthy objective baseline.

Before judging cleanup work, establish:

- repository root, current branch/HEAD, dirty state, nested repositories/submodules/worktrees when relevant;
- repository instructions, ownership rules, generated-code markers, vendored dependencies, and protected paths;
- public or production release history;
- runtime/application entrypoints;
- package/workspace manifests and dependency graph;
- build/typecheck/lint/test/format tasks;
- CI/release/deployment configuration as evidence of actual consumers;
- schemas, migrations, persisted formats, public APIs/events/CLIs;
- documentation sources of truth and generated documentation;
- feature flags, deprecation policy, compatibility layers, rollback paths;
- external integrations and dynamically discovered/plugin/reflection-based code when applicable.

Determine one operating mode:

~~~text
PRE_RELEASE
or
RELEASED_OR_PRODUCTION
~~~

If release history is ambiguous, choose `RELEASED_OR_PRODUCTION` until evidence proves the repository is safely pre-release.

## 2. Scan

Use [DISCOVERY_MODEL.md](references/DISCOVERY_MODEL.md) and scan by concern rather than one vague repository review.

### Dead & orphan

Look for evidence-backed candidates such as:

- unused imports/exports/symbols;
- unreachable branches;
- unreferenced modules/files/assets/routes;
- orphan configuration;
- stale generated output;
- unused dependencies or scripts;
- abandoned test fixtures;
- files no current build/package/archive/deployment path consumes.

### Legacy & cruft

Look for:

- obsolete wrappers and compatibility aliases;
- replaced implementations still present;
- stale feature flags;
- debug or temporary code;
- commented-out implementation;
- abandoned TODO/FIXME experiments;
- duplicate old/new paths;
- pre-release migration or compatibility scaffolding that never became supported behavior.

### Documentation & repository drift

Look for:

- commands that no longer work;
- docs describing deleted files, APIs, flags, environments, or architecture;
- conflicting sources of truth;
- duplicated documentation that can drift;
- orphan docs;
- stale examples;
- comments that contradict implementation;
- unnecessary historical docs outside intentional changelog/ADR/migration/audit history.

### Consolidation

Look for obvious duplication where a smaller representation preserves behavior and ownership.

Do not turn this stage into architecture redesign.

## 3. Classify

Use [FINDING_CLASSIFICATION.md](references/FINDING_CLASSIFICATION.md).

Every material finding must carry:

- class;
- evidence;
- affected surface;
- risk if removed;
- proposed action;
- validation required;
- whether human/product/owner input is required.

Do not delete `REVIEW_REQUIRED` or `PROTECTED` material merely to reach zero findings.

## 4. Clean

Use [CLEANUP_PLAYBOOK.md](references/CLEANUP_PLAYBOOK.md).

Apply only evidence-backed cleanup.

For `PRE_RELEASE`, never-published compatibility, abandoned migrations, aliases, wrappers, and implementation history may be deleted when no supported consumer depends on them.

For `RELEASED_OR_PRODUCTION`, default to preserving externally observable or stateful compatibility unless a migration/deprecation/removal plan explicitly authorizes change.

After deletion, remove the full abandoned responsibility when safe: stale tests, docs, config, exports, dependencies, feature flags, and generated references should not be left half-alive.

## 5. Reconcile affected evidence

Cleanup can invalidate previous review/testing/integration evidence.

If a mutation affects behavior, contracts, build graph, runtime, persistence, or another surface previously validated:

1. identify which prior evidence is materially invalidated;
2. rerun only the affected review/test/integration validation proportionally;
3. reach one integrated exact HEAD;
4. reset the clean-verification count;
5. only then begin fresh verification.

Do not force a full suite when targeted evidence is sufficient, and do not reuse evidence from a materially different HEAD.

## 6. Validate

Run the repository's relevant existing checks.

Depending on the repository, this may include:

- formatter/linter;
- typecheck/compiler;
- unit/integration/contract/E2E tests;
- build/package/archive;
- dependency validation;
- docs/link validation;
- schema/migration checks;
- repository-specific doctor/quality/release checks.

Inspect the final diff and `git status`.

Validation must target the actual final cleanup HEAD.

## 7. Fresh verification and convergence

Use [CONVERGENCE_PROTOCOL.md](references/CONVERGENCE_PROTOCOL.md).

The caller/orchestrator owns cycle state. The skill returns evidence for that state.

Canonical policy:

~~~text
maximum mutation cycles = 3
required consecutive fresh clean verifications = 2
same HEAD required = true
~~~

A clean verification means:

- fresh invocation/context;
- read-only;
- exact HEAD recorded;
- full hygiene scope independently inspected;
- zero new actionable findings.

If a verification finds actionable work, return the findings and reset the clean count to zero.

## 8. Report

Use [hygiene-report.template.md](assets/hygiene-report.template.md) and [hygiene-handoff.template.json](assets/hygiene-handoff.template.json).

Return:

1. operating mode and evidence;
2. exact HEAD;
3. mutation cycle number;
4. scan surfaces covered;
5. findings by classification;
6. files/actions changed;
7. deleted responsibilities and any retained protected material;
8. evidence invalidated and reconciled;
9. validation actually executed;
10. fresh-verification state;
11. blockers and remaining risks;
12. one result status.

Allowed result statuses:

~~~text
HYGIENE_CHANGED
HYGIENE_FINDINGS_REMAIN
CLEAN_VERIFICATION_PASS
REPOSITORY_HYGIENE_PASS
HYGIENE_NOT_CONVERGED
BLOCKED
~~~

Only an orchestrator/caller that has evidence of **two consecutive** `CLEAN_VERIFICATION_PASS` results on the same HEAD may promote the final state to `REPOSITORY_HYGIENE_PASS`.

## Prevention feedback

When the same agent-generated entropy pattern has recurred, propose the smallest durable prevention control:

- repository instruction;
- development convention;
- lint/static-analysis rule;
- regression test;
- deterministic validation;
- build/CI check.

Do not add preventive machinery for a one-off finding.

## Detailed references

- [Hygiene Standard](references/HYGIENE_STANDARD.md)
- [Discovery Model](references/DISCOVERY_MODEL.md)
- [Finding Classification](references/FINDING_CLASSIFICATION.md)
- [Cleanup Playbook](references/CLEANUP_PLAYBOOK.md)
- [Convergence Protocol](references/CONVERGENCE_PROTOCOL.md)
