# Milestone Documentation Rules

## Purpose

Milestone documents are not completion proof. They are compact navigation and review surfaces over machine-readable source-effect ledgers, source-unit manifests, implementation claims, runtime traces, gap audits, and transfer ledgers.

The alpha and omega is preventing original erAV logic omissions. Gate pass, coverage counts, and closure words are secondary.

Milestone docs must refine the canonical feature map in `../GAME_FEATURE_MAP.ko.md`. Do not use a milestone title as a substitute for a concrete feature-entry inventory.

## Required Shape

Each milestone document must keep these sections:

1. Objective
2. Original Source Scope
3. Canonical Feature Map Link
4. Submilestones
5. Current Machine Artifacts
6. Source Effect Ledger Summary
7. Source Inventory Summary
8. Transfer Contracts
9. Worker Instructions
10. Do Not Count As Complete

## Feature Inventory Rule

Every milestone must eventually list concrete feature entries, not only feature groups.

Examples:

- shop item id -> listing, price, purchase result, inventory write
- recruit option id -> listing, generated character bundle, limit/duplicate handling
- mission id -> listing, accept/progress/result/reward labels
- training command id -> availability program and effect program
- turn hook label -> automatic side effects and save/session boundaries

Each entry must point to original source identity and source-effect rows. A prose description such as "visit flow implemented" or "mission handled downstream" is not enough.

## Source Effect Ledger Rule

The source-effect ledger is a verifiable index over original source. It is not the source of truth and is not completion evidence by itself.

Authoritative sources remain:

- `original-game/ERB`
- `original-game/CSV`
- `VariableSize.CSV`
- Chara CSV files

Every source-effect row must keep:

- `sourcePath`
- `sourceLine`
- `raw`
- `sourceSha256`
- `kind`
- `status`

Rows without original line identity are not valid closure evidence. LLMs and workers must not create source-effect rows from memory or prose. They may only classify, attack, or challenge rows extracted from original source.

Allowed source-effect statuses:

- `unclassified`: responsibility not decided; blocks closure.
- `owned`: current milestone owns it but implementation evidence is still required; blocks closure until evidence exists.
- `implemented`: current milestone owns it and has implementation plus runtime trace evidence.
- `transferred`: another milestone owns it; requires accepted sender/receiver transfer contract.
- `excluded`: original-source-grounded exclusion; requires explicit reason.
- `blocked`: known blocker; blocks closure.

Strict closure requires:

- `unclassified = 0`
- `blocked = 0`
- every `owned` or `implemented` row has implementation and runtime trace evidence
- every `transferred` row has an accepted transfer contract
- every `excluded` row has an original-source-grounded exclusion reason

## Submilestone Closure Rule

A submilestone is closed only when all of these exist:

- original source inventory for the transaction/capability
- source-effect ledger generated from original line/raw evidence
- inventory quality attack completed
- implementation claim linked to source effect ids
- executable runtime trace covering behavior ids and state writes
- save/session/global roundtrip evidence when the original effect persists
- transfer ledger entries for downstream responsibility

## Worker Instructions

Workers may collect evidence, find omissions, compare manifests, and produce structured candidates. Workers must not declare a milestone complete, change closure status, or decide final owner boundaries.

Worker output must prefer structured rows:

| stableKey | findingType | sourceEvidence | currentStatus | whySuspicious | counterEvidence | confidence |

## Worker Do-Not-Do Rules

- Do not treat gate pass as original parity.
- Do not treat `mapped`, `source-file-review`, `indexed`, or `static profile` as implementation.
- Do not treat `runtimeConsumerId` text as executable trace.
- Do not accept `approved-excluded` without receiver evidence.
- Do not accept self-exclusion where `fromMilestone` equals current milestone and `toMilestone` is empty.
- Do not use owner name alone to transfer responsibility.
- Do not summarize giant manifests in prose when a machine artifact can hold the row list.
- Do not decide completion by majority vote among workers; one strong counterexample is enough to reopen review.

## Trash Policy

Large legacy narrative docs may be moved to `docs/trash/<date>-milestone-restructure/` once the active milestone docs link to canonical machine artifacts. Trash is archive, not deletion.
