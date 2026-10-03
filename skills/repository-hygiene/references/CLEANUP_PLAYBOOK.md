# Cleanup Playbook

## Mutation-cycle order

Use this order to reduce cascading false findings.

### 1. Remove abandoned leaves

Delete strongly evidenced dead files/symbols/assets/config/dependencies that do not own surviving responsibilities.

### 2. Collapse replacement residue

When one implementation replaced another, remove the obsolete path plus stale aliases/wrappers/tests/docs/config only when no supported compatibility consumer remains.

### 3. Reconcile references

Update imports, exports, manifests, package scripts, indexes/registries, tests, docs, examples, generated references, and dependency declarations affected by cleanup.

### 4. Remove stale documentation

Delete or rewrite documentation that describes removed behavior. Preserve intentional historical records.

Prefer one canonical document plus links over duplicated normative text.

### 5. Consolidate only obvious duplication

Consolidate duplicated helpers/policy only when:

- responsibility is genuinely the same;
- ownership becomes clearer;
- behavior remains unchanged;
- validation is available.

Do not introduce a generic abstraction solely to reduce line count.

### 6. Validate after each meaningful cluster

Small clusters make regressions attributable.

Use the repository's own checks and inspect the diff.

## Whole-responsibility deletion

Avoid half-deleted features.

When a responsibility is removed, inspect for:

- source;
- exports/registrations;
- tests/fixtures;
- docs/examples;
- package dependencies;
- configuration/flags;
- assets;
- generated outputs;
- migration or rollback implications.

Some of these may remain intentionally; classify them explicitly rather than forgetting them.

## Stop conditions

Stop mutation and return `BLOCKED` when:

- required ownership/product intent is unavailable;
- production/public compatibility cannot be determined safely;
- validation tooling is broken for reasons unrelated to cleanup;
- repository instructions prohibit the needed mutation;
- secrets/access/external systems are required to establish safety.

Return `HYGIENE_NOT_CONVERGED` after mutation cycle 3 when actionable findings still remain.
