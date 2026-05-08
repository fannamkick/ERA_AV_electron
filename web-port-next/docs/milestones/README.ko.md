# Milestone Documentation Index

This directory is now organized around split-method milestone docs.

## Active Phase 5 Structure

- `PHASE_5_M28_M49.ko.md`: lightweight index only.
- `M28_MAIN_ROUTES.ko.md` through `M49_INFO_CONFIG_MISC.ko.md`: per-milestone split docs.
- `MILESTONE_DOCUMENTATION_RULES.ko.md`: required shape and worker rules.
- Legacy narrative docs are archived under `../trash/2026-05-08-milestone-restructure/`.

## Current Target

Next target: `M35_TURN_PIPELINE.ko.md`.

Do not start M37 until M35 and then M36 have been rechecked under the split-method process, unless the user explicitly redirects.

## Closure Rule

A submilestone closes only when it has:

- original source inventory
- inventory-quality attack
- implementation claim linked to source effect ids
- executable runtime trace
- save/session/global roundtrip evidence when relevant
- transfer ledger evidence for downstream responsibility

## Do Not Count As Complete

- gate pass alone
- old strict closure status alone
- `mapped`, `source-file-review`, `indexed`, or `static profile`
- `approved-excluded` without receiver evidence
- owner-name transfer without source-effect contract
- `runtimeConsumerId` text without executable trace

## Working Pattern

1. Open current `Mxx_*.ko.md`.
2. Build original inventory from ERB/CSV/VariableSize/Chara CSV.
3. Attack inventory quality with workers.
4. Implement or verify source effects.
5. Record implementation claims and runtime traces.
6. Only then update closure/gap artifacts.