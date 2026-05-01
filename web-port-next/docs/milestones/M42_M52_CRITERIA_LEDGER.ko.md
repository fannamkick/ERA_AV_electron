# M42~M52 Criteria Ledger

This ledger records the remaining completion-criteria work after the M28~M41 source-unit manifest pass.

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
