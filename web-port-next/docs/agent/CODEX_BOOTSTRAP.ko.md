# Codex Bootstrap

This is the startup rule sheet. It does not replace original-source verification.

## Current Task

Current target: M35 split-method original-logic recheck.

Use:

- `docs/agent/NEXT_MILESTONE.ko.md`
- `docs/SESSION_HANDOFF.ko.md`
- `docs/milestones/MILESTONE_DOCUMENTATION_RULES.ko.md`
- `docs/milestones/M35_TURN_PIPELINE.ko.md`

Do not start M37 until M35 and then M36 have been handled under the split-method recheck, unless the user explicitly redirects.

## Absolute Rules

- The goal is exact original erAV logic parity, not gate pass.
- Final references are original ERB, CSV, VariableSize.CSV, and Chara CSV.
- Do not read or output `.env.local` or secrets.
- Do not revert unrelated dirty files.
- Do not treat old strict closure status as final proof.
- Do not count `mapped`, `source-file-review`, `indexed`, or `static profile` as implementation.
- Do not accept `approved-excluded` without receiver evidence.
- Do not use owner name alone to transfer responsibility.
- Do not treat `runtimeConsumerId` text as executable trace.

## Split-Method Closure Rule

A submilestone can be treated as closed only when all of these exist:

1. original source inventory
2. inventory-quality attack
3. implementation claim linked to source effect ids
4. executable runtime trace covering behavior ids and state writes
5. save/session/global roundtrip evidence when relevant
6. transfer ledger evidence for downstream responsibility

## Worker Policy

Use OpenRouter workers for bounded evidence tasks:

- inventory omission attack
- dynamic CALL/CALLFORM/TRYCALLFORM expansion check
- CSV role check
- state-family alias check
- transfer/receiver evidence check

Workers are evidence collectors. They must not declare completion, change closure status, or make final owner decisions.

## I/O Discipline

- Do not dump giant docs or giant JSON into context.
- Prefer `rg`, section reads, and targeted file reads.
- Use workers for broad but bounded review.
- Main Codex makes final judgments from original source and local verification.