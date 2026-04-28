# Training Migration Notes

This file records legacy behavior that the modular training engine must preserve or intentionally replace.

## Pilot Commands

The first migration target is:

- COMF0 / caress
- COMF1 / cunnilingus
- COMF6 / kiss

These commands are represented in `src/content/training/basicCommands.ts` as modular command definitions. The current pilot uses original ERB as the canonical source for COMF0, COMF1, and COMF6, while derived chain targets are still availability/remap shells.

Current canonical decision:

- Original ERB is canonical for COMF0, COMF1, and COMF6.
- `src/legacy/training/commands/improved/*` and generated/plugin command files are reference aids only.
- The current modular pilot is the working system scaffold and includes COMF1/COMF6 original-ERB source/direct/post behavior. It must not be treated as full family parity until derived chain targets and executable legacy fixtures are added.

## Source Check Mapping

Legacy `SourceCheck` currently maps only these SOURCE indices to PALAM:

| SOURCE | PALAM | Meaning |
| --- | --- | --- |
| 0 | 0 | C pleasure |
| 1 | 1 | V/B-related pleasure in current legacy code |
| 2 | 2 | A-related pleasure |
| 17 | 14 | B secondary pleasure |
| 3 | 3 | arousal/lubrication |
| 4 | 4 | submission |
| 5 | 5 | lust |
| 6 | 6 | pain |
| 9 | 9 | pain-related secondary value |
| 10 | 10 | fear |

Several command-written values are currently no-ops for PALAM in the legacy pipeline, including SOURCE 7, 8, 11, 12, 14, and 16.

SOURCE 11 and 14 are still named in the web-port registry because legacy source modifiers multiply them:

| SOURCE | Named key | Current role |
| --- | --- | --- |
| 11 | `shame` | source modifier buffer; not converted by current SourceCheck |
| 14 | `aversion` | source modifier buffer; not converted by current SourceCheck |

## COMF0 Baseline

Availability:

- Legacy `COMMAND_CONDITIONS[0]` is empty, so COMF0 is always available.

Baseline effects before dynamic modifiers:

- SOURCE 0 += 20
- SOURCE 17 += 15
- SOURCE 3 += 50
- SOURCE 4 += 60
- SOURCE 8 += 30
- SOURCE 12 += 100
- EXP 14 += 1
- BASE 0 += 5
- BASE 1 += 50

Migrated first-pass behavior:

- ABL/talent/equipment source resolver scaffold exists.
- Stain and experience post-effect resolver scaffold exists.
- Trainer mouth stain now applies the original SOURCE 8 comfort multiplier.
- TEQUIP90 and non-TEQUIP90 stain side effects are covered by focused verification.

Remaining ERB parity gaps:

- Reduction branch around SOURCE 10/B-related behavior needs exact original-ERB parity.

## COMF1 Baseline

Availability:

- Has inline checks, not `COMMAND_CONDITIONS`.
- Blocks several clothing/equipment/talent states.
- Current legacy class calls `hasEquipment`, but `CommandBase` does not define it.

Baseline effects before dynamic modifiers:

- SOURCE 0 += ABL:0 table value, default 40
- SOURCE 9 += 100
- SOURCE 10 += 100
- SOURCE 12 += 220
- SOURCE 14 += 50
- SOURCE 16 += SOURCE 0 / 20 when trainer tongue skill or TEQUIP89 applies
- LOSEBASE 0 += 5
- LOSEBASE 1 += 50

Migrated behavior:

- Original COMF1 source/direct behavior now uses LOSEBASE and SOURCE 9/10/12/14/16 instead of the improved-command baseline.
- COM69 remap is represented through `remapBeforeExecute` and requires target availability before redirecting.
- Stain transfer merges target vagina and trainer mouth stains.
- TEQUIP89 bestiality path skips normal post effects.
- Same-sex, affection, and trainer first-contact post effects are role-aware.

Remaining ERB parity gaps:

- COM69 derived target effects are not migrated yet; only availability and redirect validation are present.
- Executable legacy parity fixtures are still needed once the legacy source set can run safely.

## COMF6 Baseline

Availability:

- Has inline checks, not `COMMAND_CONDITIONS`.
- Blocks several equipment/talent states.
- Assistant play checks may not read assistant state correctly in the current legacy bridge.

Baseline effects before dynamic modifiers:

- SOURCE 3 uses trainer ABL:12 table, default 100
- SOURCE 4 uses target ABL:16 and ABL:12 tables, default 25
- SOURCE 5 uses target ABL:16 and ABL:12 tables, default 5
- SOURCE 8 uses dirty-mouth comfort formula, default 40
- TEQUIP89 uses the bestiality branch and may write SOURCE 3/10 plus TFLAG 100
- LOSEBASE 0 += 5
- LOSEBASE 1 += 50

Migrated behavior:

- First-kiss confirmation is represented through the engine pre-execute decision phase and is wired in the training UI.
- COM128/COM133 remaps use availability-validated targets.
- COM_ORDER parity terms are enforced for COMF6 through reusable common terms plus COMF6-specific terms.
- ABL:16, target ABL:12, and trainer ABL:12 source tables are represented in the source resolver.
- Dirty-mouth penalty and TEQUIP89 bestiality source branch are represented.
- Normal stain/EXP/TFLAG post effects are skipped for TEQUIP89, matching the early-return branch.
- Kiss first-contact, sexual-contact, and love-contact TFLAG updates are represented.

Remaining ERB parity gaps:

- COM128 and COM133 derived target effects are not migrated yet; only availability and redirect validation are present.
- Command-family fixtures are still needed before applying COM_ORDER broadly outside the pilot command.
- Executable legacy parity fixtures are still needed once the legacy source set can run safely.

## Known Legacy Mismatch

`ImprovedTrainingModule.convertParametersToArray` stores B-related parameter data at `params[17]`, while `SourceCheck` applies SOURCE 17 to `params[14]`. Parity tests must capture this mismatch before changing either side.
