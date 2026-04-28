# Training Canonical Sources

This document records which legacy evidence should be used for each training command family. It prevents workers from choosing different legacy files for the same behavior.

## Global Policy

Use legacy code as evidence, not architecture.

| Behavior area | Canonical policy |
| --- | --- |
| Availability | Prefer `legacy/training/commands/availability.ts` when it covers the command. |
| Source/effects | Prefer richer `legacy/training/commands/commands/COMF*.ts` files as evidence. |
| Pilot compatibility | `improved/Com0/1/6` remains temporary pilot evidence only. |
| SourceCheck | Use `legacy/training/systems/SourceCheck.ts`. |
| Chain/remap | Use `CommandChainHandler` plus command-local rules; central handler is incomplete. |
| Sex post-effects | Use `VaginaSexHandler` and `AnalSexHandler` as evidence, but port them into new domain services. |
| Mode state | Use original ERB/COMABLE evidence; port as training modes with TEQUIP compatibility bridges. |
| Transient fatigue/pressure | Map `LOSEBASE` and `UP` through named stat keys before implementing mode processors. |

Do not execute generated legacy command files directly as the final architecture.

## COMF0-19

Availability canonical: `availability.ts`.

Source/effects canonical: generated `commands/commands/COMF*.ts`.

Important exceptions and blockers:

- COMF0-6 pilot currently uses documented improved baselines for parity. This is temporary.
- COMF4 has anatomy availability conflicts between central and generated/improved evidence.
- COMF5 has top-clothing bit conflicts.
- COMF6 generated behavior differs from pilot SourceCheck/source index behavior.
- COMF10-19 have item ID conflicts between central availability and generated command files.
- COMF11/13/14/15/16/17/19 require equipment toggle semantics.
- COMF18 is an environment toggle and stain/parameter cleanup command.
- Passive equipment effects must be modeled before broad COMF10-19 migration.

TEQUIP canonical decisions:

- `TEQUIP:11` is `vibrator`.
- `TEQUIP:89` is `bestialityPlay`.
- `TEQUIP:90` is `tentacleTraining`.
- `TEQUIP:150` is `slime`.
- `COMF90` is a command id for rotor masturbation, not `TEQUIP:90`.
- Do not use command ids or item ids as equipment key names without TEQUIP evidence.

Recommended canonical matrix:

| Range | Availability | Source/effects | Required before migration |
| --- | --- | --- | --- |
| COMF0-9 | `availability.ts` | generated `COMF0-9` files | source-index reconciliation, stain effects, formula gates |
| COMF10/12/90/92 | `availability.ts` | generated action files | instant tool schema, item alias map |
| COMF11/13/14/15/16/17/19 | `availability.ts` | generated equipment files | equipment toggle schema, conflict overrides, passive hooks |
| COMF18 | `availability.ts` | `COMF18_shower.ts` | environment toggle schema, stain clear effects |
| COMF89 | generated/bespoke mode evidence | generated mode file | mode toggle schema, global blockers |

## COMF20-39

Availability canonical: `availability.ts`.

Source/effects canonical: generated `commands/commands/COMF20-39_*.ts`.

Shared post-effect evidence:

- `VaginaSexHandler.ts` for vaginal insertion effects.
- `AnalSexHandler.ts` for anal insertion effects.
- A new player-ejaculation domain service is required because generated files reference missing `PlayerEjaculation`.

Recommended canonical matrix:

| Range | Family | Canonical evidence | Required before migration |
| --- | --- | --- | --- |
| COMF20-23 | vaginal insertion | generated command + `VaginaSexHandler` | actor roles, remap phase, pregnancy/virginity/ejaculation services |
| COMF24-25 | reverse action | generated command | effect receiver modeling, player-side stain/base/source |
| COMF26-29 | anal insertion | generated command + `AnalSexHandler` | anal post-effect service, handler API reconciliation |
| COMF30-33/35/37-39 | service action | generated command | player ejaculation service, service score gates, player-side effects |
| COMF34/36 | mixed service/insertion | generated command + insertion handlers | mixed route post-effects |

Blockers:

- Generated files reference missing or mismatched APIs.
- Actor roles are inconsistent across legacy context shapes.
- Stain shape is inconsistent between flat arrays and nested player/master/assistant structures.
- SOURCE index meanings differ by layer.

## COMF40+

Use the same normalized schema contract, but split migration by behavior family. Do not treat COMF40+ as a flat continuation of COMF0-39.

Recommended grouping:

| Range | Family | Current fit | Required before migration |
| --- | --- | --- | --- |
| COMF40-42, 48, 50-52, 55-56, 72, 81-85, 92 | instant actions | current schema mostly fits | numeric/mixed source index fixtures and COMABLE availability evidence |
| COMF43-47, 49, 53-54, 57-59 | equipment/environment/passive actions | equipment, stain, postEffects, and passive hooks fit | item aliases, session/video state, and family conflict tables |
| COMF60-71, 73, 80 | assistant/service/multi-actor actions | not worker-ready | COM_ORDER formula hook, player/master/assistant effects, ejaculation, multi-actor stains |
| COMF87-88 | interactive body-state commands | blocked | option/input schema with preselected command choices |
| COMF89 | mode toggle | design-ready | standard named SOURCE multipliers exist; exact COMABLE fixtures remain |
| COMF100+ | tentacle/slime mode families | blocked | sub-flag cleanup and named passive processors exist; wrapper remaps remain |
| COMF90-91 | self/tool actions with remap | partially fits | remap fixtures and target-availability validation |
| COMF74-79, 86, 93-99 | absent in original ERB evidence | not pending | confirm absence before creating replacement content |

Canonical source policy:

- Original ERB plus `COMABLE.ERB` is authoritative for COMF40+ analysis.
- Generated TypeScript legacy files are evidence only when they can be reconciled with original ERB.
- Bestiality, tentacle, and slime-like mode states must not be modeled as ordinary equipment toggles.
- Current domain rule: forward-facing state is `training.mode.*`; TEQUIP keys are compatibility bridges for legacy formulas and parity checks.
- Tentacle disable cleanup must clear `TEQUIP:11/13/14/15/16/17/44/46/98`.
- SOURCE 11 and 14 are named as legacy buffers (`shame`, `aversion`) for source-modifier parity. They are not SourceCheck conversion rules unless a later canonical source proves otherwise.
- Slime disable cleanup must clear `TEQUIP:151/152/154`.

## Unsafe APIs To Quarantine

These legacy APIs must not be exposed directly to command specs:

- direct mutable `any` context access;
- UI/input APIs such as `showMessage`, `printHtml`, waits, prompts;
- save/load/quit/restart APIs;
- direct `Math.random()` in domain logic;
- overloaded `flags` without distinguishing `FLAG`, `TFLAG`, and `CFLAG`;
- opaque `runCustomCondition(id)` unless the custom condition has a typed predicate definition.

Use typed adapters, seeded RNG, and explicit domain processors instead.
