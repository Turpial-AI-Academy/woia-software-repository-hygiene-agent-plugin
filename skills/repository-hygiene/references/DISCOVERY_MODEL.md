# Discovery Model

## Baseline map

Build a repository map before mutation.

For a bounded CLEANUP follow-up, preserve a healthy objective map and inspect only the affected responsibility, its consumers, and mandatory protection/release-history invariants. Load detailed concern guidance when facts are missing or invalidated. New scope, drift, unclear consumers, public/persisted contracts, or missing durable evidence require expanded discovery. This does not narrow FRESH_VERIFY: it independently covers the full applicable hygiene scope.

| Surface | Evidence to inspect | Common false-positive risk |
|---|---|---|
| Runtime entrypoints | manifests, routers, registries, CLI entry, server startup | dynamic loading |
| Source graph | imports, exports, package/workspace graph, compiler | reflection, generated code |
| Dependencies | manifests, lockfiles, build scripts, bundles | optional/peer/dev/runtime split |
| Assets | templates, static assets, package/archive manifests | runtime path lookup |
| Configuration | framework config, feature flags, env names | external platform consumption |
| Data/persistence | migrations, schemas, serializers | historical upgrade paths |
| Public contracts | APIs, schemas, events, CLIs, file formats | external consumers not in repo |
| Tests | unit/integration/E2E/fixtures | test-only contracts |
| Delivery | CI, package, release, deploy, rollback | out-of-repo automation |
| Documentation | README, guides, ADRs, runbooks, examples | historical records |
| Generated code | generator config + generated output | source of truth inversion |

## Evidence techniques

Use available repository tooling first:

- compiler/typechecker diagnostics;
- language-aware unused/dead-code tools already configured;
- package manager and dependency graph;
- framework route/plugin/registry discovery;
- build/package/archive outputs;
- test discovery;
- Git history for intent and replacement sequencing;
- exact-string/symbol/path search;
- CI/release/deployment references;
- documentation link/command validation.

When introducing a temporary analyzer, do not make it a permanent repository dependency unless explicitly justified.

## AI-generated entropy indicators

Investigate, do not auto-delete:

- two implementations with similar names and overlapping behavior;
- wrapper delegating 1:1 to a replacement with no remaining consumer;
- comments explaining code that no longer exists;
- TODOs referring to completed work;
- "temporary", "old", "legacy", "v2", "new", "copy", "backup" filenames;
- dead feature flags;
- multiple docs claiming to be canonical;
- duplicated helper logic created across separate agent tasks;
- unused compatibility for unreleased APIs;
- generated examples that diverged from real commands.

Names alone are not evidence.

## Coverage record

A hygiene report should record which applicable surfaces were inspected. A clean result without coverage evidence is weaker than an explicit blocked/partial result.
