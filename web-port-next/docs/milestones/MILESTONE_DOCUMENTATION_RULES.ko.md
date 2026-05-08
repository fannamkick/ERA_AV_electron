# Milestone Documentation Rules

## Purpose

Milestone documents are not completion proof. They are compact navigation and review surfaces over machine-readable source-unit manifests, implementation claims, runtime traces, gap audits, and transfer ledgers.

The alpha and omega is preventing original erAV logic omissions. Gate pass, coverage counts, and closure words are secondary.

## Required Shape

Each milestone document must keep these sections:

1. Objective
2. Original Source Scope
3. Submilestones
4. Current Machine Artifacts
5. Source Inventory Summary
6. Transfer Contracts
7. Worker Instructions
8. Do Not Count As Complete

## Submilestone Closure Rule

A submilestone is closed only when all of these exist:

- original source inventory for the transaction/capability
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