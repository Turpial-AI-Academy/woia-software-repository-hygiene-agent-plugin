# Convergence Protocol

## Why convergence is explicit

A cleanup agent can miss issues on one pass and discover them after context changes, deletions expose new orphaned paths, or documentation is re-read against the simplified repository.

Therefore one "done" statement is not completion evidence.

## State

The caller/orchestrator carries only objective state between invocations:

~~~text
mutation_cycle
head
consecutive_clean_verifications
previous_result_status
~~~

Do not carry a previous agent's subjective claim that the repository is clean as evidence.

## Mutation loop

~~~text
cycle 1 CLEANUP
  -> reconcile affected evidence
  -> validate
  -> FRESH_VERIFY

finding?
  yes -> cycle 2 CLEANUP
  no  -> clean_count = 1

new FRESH_VERIFY on same HEAD
  finding?
    yes -> cycle 2 CLEANUP, clean_count = 0
    no  -> clean_count = 2 -> REPOSITORY_HYGIENE_PASS
~~~

Repeat mutation cycles up to 3.

## Fresh verification rules

A fresh verification must:

- use a new invocation/context;
- be read-only;
- inspect the full applicable hygiene scope;
- record exact HEAD;
- not rely on the previous verifier's conclusions;
- classify every finding;
- report zero actionable findings to count as clean.

It may reuse objective repository facts, protected-area rules, the capability contract, and exact cycle/HEAD state.

Reuse requires durable, inspectable facts with unchanged inputs and obligations. A scoped CLEANUP follow-up cannot count as a fresh clean pass. Previously completed objective convergence receipts can remain valid on an unchanged candidate; a new turn alone does not require replay. When a new FRESH_VERIFY is requested, its full-scope conclusion must be independent and cannot inherit a previous verifier's subjective clean claim.

## Reset rules

Reset `consecutive_clean_verifications` to zero when:

- any repository mutation occurs;
- HEAD changes;
- required evidence reconciliation changes the candidate;
- the verifier finds an actionable item.

## Completion

The caller may emit `REPOSITORY_HYGIENE_PASS` only when:

- mutation_cycle <= 3;
- relevant validation passed on final HEAD;
- affected prior evidence is reconciled;
- fresh verification #1 found zero actionable findings;
- fresh verification #2 found zero actionable findings;
- both verification results target exactly the same HEAD.

## Non-convergence

If actionable findings remain after cycle 3:

~~~text
HYGIENE_NOT_CONVERGED
~~~

Do not hide findings, downgrade them to protected without evidence, or create a fourth automatic mutation cycle merely to obtain a pass.
