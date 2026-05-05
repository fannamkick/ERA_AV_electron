# M42~M52 Criteria Ledger

This ledger records the remaining completion-criteria work after the M28~M41 source-unit manifest pass.

## 2026-05-06 item-level classification rule

M42~M52 must not start as isolated implementation work. First classify their existing checklist items in the phase documents themselves:

- M42~M49: `docs/milestones/PHASE_5_M28_M49.ko.md`
- M50~M52: `docs/milestones/PHASE_6_M50_M52.ko.md`

Do not create a separate replacement ledger for this. The milestone sections must directly show whether each item is `[HERE]`, `[LATER]`, `[EXCLUDED]`, `[BLOCKED]`, `[REDESIGN]`, `[VERIFY]`, or `[DOC-ONLY]`.

## 2026-05-02 M28-M52 registry enforcement update

Artifacts:
- `tools/build_coverage_gate_registry.mjs`
- `data/coverage/coverage-gate-registry.json`
- `data/coverage/manifests/M28-M52-criteria-consistency.json`

Result:
- M28~M34 registry contracts were added.
- Registry contracts now cover every M28~M52 manifest.
- `npm run coverage:gate-registry` wrote 26 milestone contracts.
- `npm run gate:coverage-hardening` passed with 26 contract(s), 20 coverage file(s), and 9 final script(s).
- The M28~M52 criteria baseline has no remaining registry gap.

Next work is not new criteria discovery. Close manifest units through implementation evidence, approved exclusion, or explicit scope redesign.

## 2026-05-02 M42-M44 source-unit manifest pass 1

Artifacts:
- `data/coverage/manifests/M42-source-units.json`
- `data/coverage/manifests/M43-source-units.json`
- `data/coverage/manifests/M44-source-units.json`

| M | manifest total | `implemented-verified` | `blocked` | `scope-redesign-required` | completable now | strict finding |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| M42 | 35 | 0 | 35 | 0 | no | Existing M42 coverage is profile/evidence only. Every command 0-34 remains blocked until original COMF behavior is implemented and verified. |
| M43 | 35 | 0 | 32 | 3 | no | Active Train.csv commands 35-69 produce 32 blocked units. `COMF64`, `COMF67`, and `COMF69` exist without active Train.csv rows and require scope redesign. |
| M44 | 61 | 0 | 38 | 23 | no | Active command 70-plus effects, active commands without matching COMF files, inactive/out-of-range COMF files, and named COMF helpers are all explicit criteria units. |

M42-M44 completion rules:
- Static profiles, line indexes, or SOURCE/LOSEBASE/EXP extraction do not count as implementation.
- Each command/source unit must name the original source, result owner, runtime consumer, verification command, and save-boundary expectation.
- Active Train.csv commands without matching `COMF*.ERB` must be resolved as alternate source mapping or blocked.
- `COMF*.ERB` files without active Train.csv rows must be assigned to an owner, approved exclusion, or `scope-redesign-required`; they cannot disappear from accounting.
- Named helper files such as `COMF_ANALSEX.ERB`, `COMF_KISS.ERB`, and `COMF_VAGINASEX.ERB` are M44 criteria units until assigned.

Next criteria calls:
- Call 2: M45-M49 criteria manifests for common system, mission, event/world, ending/meta, and view/text/settings.
- Call 3: M50-M52 criteria manifests for save/load, final audit, and complete-port verdict.
- Call 4: full M28-M52 consistency pass across manifests, registry, phase docs, status docs, and handoff.

## 2026-05-02 M45-M49 criteria skeleton pass 1

Artifacts:
- `data/coverage/manifests/M45-source-units.json`
- `data/coverage/manifests/M46-source-units.json`
- `data/coverage/manifests/M47-source-units.json`
- `data/coverage/manifests/M48-source-units.json`
- `data/coverage/manifests/M49-source-units.json`

| M | criteria units | queued source rows | `blocked` | `scope-redesign-required` | completable now | strict finding |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| M45 | 2 | 1,122 | 1 | 1 | no | Common maintenance has 1,121 feature rows and one `SYSTEM_OTHERS.ERB` file-level review. No common-system coverage exists yet. |
| M46 | 1 | 432 | 1 | 0 | no | Mission lifecycle has definition, feature, and save-mapping rows, but no mission coverage/smoke/save evidence artifact exists yet. |
| M47 | 1 | 358 | 1 | 0 | no | Event/world has definitions, feature triggers/effects, and save-mapping rows. Prior event transfers must be accounted here, not silently completed. |
| M48 | 2 | 325 | 1 | 1 | no | Ending/meta has definition, feature, save-mapping rows and one `GameBase.csv` file review. Global/meta save must be separated from run save. |
| M49 | 2 | 150 | 1 | 1 | no | View/text/settings has 149 info/settings/help rows and one file-level LIFELIST review. M49 intake must not become a catch-all escape hatch. |

M45-M49 completion rules:
- A queued owner unit is not completed until its declared coverage artifact and gap audit exist.
- Definitions/listings/display-only rows need runtime consumption evidence.
- Feature rows need route/action/handler/calculation/view evidence as applicable.
- Save/session rows need save-boundary or explicit non-save/session-boundary evidence.
- File-level source reviews must be decomposed or explicitly approved/excluded before completion.
- M49 intake rows must record source id, original owner candidate, reason for M49 ownership, and exclusion status.

Remaining criteria calls:
- Call 3: M50-M52 criteria manifests for save/load, final audit, and complete-port verdict.
- Call 4: full M28-M52 consistency pass across manifests, registry, phase docs, status docs, and handoff.

## 2026-05-02 M50-M52 criteria manifest pass 1

Artifacts:
- `data/coverage/manifests/M50-source-units.json`
- `data/coverage/manifests/M51-source-units.json`
- `data/coverage/manifests/M52-source-units.json`

| M | criteria units | queued source rows | `blocked` | `scope-redesign-required` | completable now | strict finding |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| M50 | 9 | 193 | 9 | 0 | no | Full save/load has 193 queued persistence rows plus schema, payload-boundary, migration, failure, and mapping reconciliation criteria. No full-roundtrip report exists yet. |
| M51 | 8 | 1 | 7 | 1 | no | Final audit has seven zero-gap criteria plus one file-level `RANDCHOOSE/#DIM.ERH` review that must be decomposed or reassigned. |
| M52 | 10 | 0 | 10 | 0 | no | Complete-port verdict has no queue rows, so ten explicit verdict criteria were added to prevent narrative sign-off. |

M50-M52 completion rules:
- Phase 6 verifies completion; it must not implement or hide missing feature work.
- Missing feature/schema/audit/report work must be routed back to the owning milestone.
- M52 cannot complete unless every M28-M51 manifest is closed or explicitly approved-excluded.
- `verify:complete` must generate a current full-port report and run all required gates/smokes/long-play/failure-matrix/build/tests in one recorded flow.

Remaining criteria call:
- Call 4: full M28-M52 consistency pass across manifests, registry, phase docs, status docs, and handoff.

## 2026-05-02 M28-M52 consistency pass

Artifacts:
- `data/coverage/manifests/M28-M52-criteria-consistency.json`
- `docs/milestones/M28_M52_CRITERIA_CONSISTENCY.ko.md`

Result:
- All M28~M52 source-unit manifests exist.
- M28 is now closed; 1 manifest has `completedAllowedNow: true` and 25 remain false.
- Aggregate totals: total units 11,226; implemented-verified 8,035; blocked 2,819; scope-redesign-required 99; approved-excluded 273.
- Registry contracts exist for M28~M52.

Criteria-side baseline is now complete with uniform registry enforcement. Future work should close manifest units through evidence, approved exclusion, blocked status, or explicit scope redesign.
