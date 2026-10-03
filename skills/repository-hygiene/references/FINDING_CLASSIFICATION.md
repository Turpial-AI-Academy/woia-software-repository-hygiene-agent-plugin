# Finding Classification

## SAFE_DELETE

Use when evidence strongly establishes the artifact/responsibility has no required consumer and removal can be validated.

Typical evidence combinations:

- compiler/static graph reports unused **and** no dynamic/framework registration exists;
- file absent from build/package/runtime/deploy graph **and** repository search finds no consumer;
- dependency has no import/script/plugin/config consumer and package tooling confirms it;
- pre-release compatibility layer targets behavior never released or persisted;
- stale documentation references behavior/files that no longer exist.

Required handoff fields:

- evidence;
- removal scope;
- expected validation.

## REVIEW_REQUIRED

Use when likely stale but uncertainty remains.

Examples:

- dynamic/reflection/plugin discovery may call it;
- external consumer may exist;
- generated ownership is unclear;
- runtime configuration could reference it outside the repository;
- compatibility/support window is unclear;
- deletion could affect persisted data;
- repository history indicates intentional retention but rationale is incomplete.

Do not delete until uncertainty is resolved or an authorized owner accepts the risk.

## PROTECTED

Use when retention is intentional or required.

Examples:

- supported public API/CLI/schema/event;
- active deprecation/compatibility path;
- required migration;
- rollback/recovery artifact;
- legal/compliance/security/audit history;
- changelog or accepted/superseded ADR;
- externally consumed hook confirmed by evidence;
- generated artifact required by release/package/runtime.

A protected finding is not "cleanup debt" when its retention has a current rationale.

## Actionability

For convergence:

- unresolved `SAFE_DELETE` = actionable;
- unresolved `REVIEW_REQUIRED` = actionable until resolved, risk-accepted, or reclassified;
- justified `PROTECTED` = non-actionable.

The report must preserve the rationale for every retained protected item that initially looked stale.
