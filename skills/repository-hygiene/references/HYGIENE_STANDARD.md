# Repository Hygiene Standard

## Outcome

Repository hygiene means the repository contains the code, documentation, configuration, dependencies, assets, compatibility behavior, generated material, and history that are still justified by real consumers or operating requirements — and avoids leaving abandoned alternatives or accidental agent-generated residue.

The standard optimizes for **truthful minimality**, not aesthetic minimalism.

## Release-history policy

### PRE_RELEASE

Use only when evidence shows there has been no supported public/production release and no external/persisted contract that must be maintained.

In this mode, cleanup may be aggressive about never-published residue:

- obsolete aliases and wrappers;
- abandoned implementations;
- experimental migrations;
- compatibility layers for versions nobody consumed;
- stale scaffolding;
- superseded docs/config/examples.

Deletion still requires evidence and validation.

### RELEASED_OR_PRODUCTION

Use when any supported version, production deployment, external consumer, public API, persisted data format, integration, migration path, or operational rollback dependency exists.

In this mode, apparent legacy may be deliberate compatibility.

Default to preserving:

- public APIs/CLIs/schemas/events;
- migrations needed by supported upgrade paths;
- deprecation shims still inside support policy;
- rollback scripts and recovery configuration;
- persisted serialization formats;
- operational/runbook history still needed for support;
- ADR/changelog/audit/security/legal records;
- external integration hooks;
- generated source whose generator remains authoritative.

Removal requires explicit evidence that support/retention obligations are over.

## Protected material

Never treat the following as disposable solely because reference search is empty:

- reflection/plugin/dynamic-discovery targets;
- framework-convention files;
- generated inputs/outputs;
- migration history;
- deployment/rollback assets;
- externally called endpoints/hooks/scripts;
- test-only public contracts;
- compliance/security/legal records;
- release notes/changelogs/ADRs;
- ownership/configuration files consumed outside local source imports.

## Scope boundaries

Repository hygiene can modify code, docs, tests, configuration, dependencies, assets, and repository metadata when cleanup requires it.

It does not own:

- broad architecture redesign;
- product behavior changes;
- dependency upgrades merely because they are newer;
- style rewrites unrelated to hygiene;
- security-policy redesign;
- CI/CD redesign;
- migration/removal of a supported public contract without explicit authorization.

Escalate those responsibilities to their proper capability.

## Evidence hierarchy

Prefer stronger evidence:

1. compiler/build/runtime/package graph;
2. explicit entrypoints/manifests/configuration;
3. tests and deployment/release paths;
4. static analysis and repository search;
5. documentation/comments;
6. agent inference.

Lower levels can suggest a finding but should not override stronger contradictory evidence.
