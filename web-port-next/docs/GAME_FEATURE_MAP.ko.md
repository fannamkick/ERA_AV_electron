# Game Feature Map

## Purpose

This document is the canonical map for porting erAV by actual game features, not by old closure counts or vague milestone names.

The goal is to list every visible or hidden game capability, then attach each capability to original ERB/CSV evidence before implementation. This map is not completion proof. It is the navigation layer that prevents omissions.

Authoritative sources remain:

- `original-game/ERB`
- `original-game/CSV`
- `VariableSize.CSV`
- Chara CSV files

## Actual Game Hierarchy

The complete hierarchy is generated, not hand-shortened:

- Full artifact: `data/coverage/game-feature-map.json`
- Generator: `tools/build_game_feature_map.mjs`
- Command: `npm run coverage:game-feature-map`

The Markdown file is only the reader index. The JSON artifact is the actual map and must contain every extracted entry. If an entry exists in the source catalog, ERB-derived definitions, or feature coverage rows but is absent from `game-feature-map.json`, that is an inventory bug.

Current generated map summary:

| Area | Count |
|---|---:|
| Main menu options | 24 |
| Item definitions | 109 |
| Recruit coverage rows | 237 |
| Visit places | 7 |
| Visit coverage rows | 559 |
| Work definitions | 8 |
| Work coverage rows | 461 |
| Shooting scene definitions | 6 |
| Training commands | 105 |
| Training availability rows | 1625 |
| Training effect rows 0-34 | 35 |
| Mission definitions | 21 |
| Event definitions | 45 |
| Ending definitions | 2 |
| Help/TIPS definitions | 26 |
| Character definitions | 109 |
| Talent definitions | 261 |
| Legacy CFLAG definitions | 151 |

Top-level hierarchy in `game-feature-map.json`:

1. Boot / New Game / Load
2. Main Menu
3. Item Shop / Immediate Item Use
4. Recruit
5. Character Identity / Body / Social Seed
6. Visit / Facility
7. Work / Creative / Special Work
8. Shooting / Filming
9. Training
10. Mission
11. Roster / Wardrobe / Character Display
12. Turn Pipeline / Hidden Automatic Hooks
13. Event / Story / Ending / Info / Config / Misc

## Required Inventory Shape

Every feature must eventually have a machine-readable inventory with rows shaped like this:

| Column | Meaning |
|---|---|
| `featureId` | Stable feature id, for example `item-shop`, `recruit`, `training-effect-35-69`. |
| `entryKind` | `screen`, `item`, `command`, `event`, `auto-hook`, `config`, `save`, or `definition`. |
| `entryId` | Original id such as item id, command id, mission id, scene id, or ERB label. |
| `displayName` | Original display name when CSV/ERB provides one. |
| `sourceDefinition` | CSV row or ERB line that defines the entry. |
| `entryLabels` | ERB label(s) that execute the entry. |
| `callChain` | `CALL`, `CALLFORM`, `TRYCALLFORM`, or dynamic dispatch expansion. |
| `conditions` | Listing, availability, failure, cancel, repeat, and limit conditions. |
| `effects` | State writes and primitive effects, linked to source-effect row ids. |
| `stateFamilies` | Original state families touched, such as `CFLAG`, `TFLAG`, `FLAG`, `BASE`, `ABL`, `EXP`, `JUEL`, `MONEY`. |
| `webStateTargets` | Web state fields that receive those original state effects. |
| `ownerMilestone` | Milestone that owns runtime behavior. |
| `transferTarget` | Receiver milestone if current feature only hands off. |
| `runtimeTrace` | Smoke/test/trace id proving the behavior runs. |
| `status` | `unclassified`, `owned`, `implemented`, `transferred`, `excluded`, or `blocked`. |

Rows without original source identity are not valid inventory rows.

## Canonical Feature Map

| Feature | Milestone | Depth | Inventory unit | Notes |
|---|---:|---|---|---|
| Main routes and screen transitions | M28 | shallow | route/menu action | Entry, cancel, transition, session state, save boundary. |
| Item shop purchase | M29 | shallow | shop item row | Listing, price, money check, buy/cancel/fail, inventory write. |
| Immediate item use | M30 | shallow-with-effects | item id | Target selection, repeat loop, special item effects, downstream handoff. |
| Recruit | M31 | shallow-with-bundle | recruit item/option | Listing, purchase, duplicate/limit, generated character bundle. |
| Character identity seed | M32 | seed pipeline | chara/generated character | Names, profile, ids, generated/recruited identity. |
| Body/stat/talent/experience seed | M33 | seed pipeline | chara/generated character | `BASE`, `MAXBASE`, `ABL`, `TALENT`, `EXP` seed application. |
| Social/equipment/CFLAG seed | M34 | seed pipeline | state family row | Social flags, equipment, wardrobe availability, CFLAG boundaries. |
| Turn and time pipeline | M35 | hidden hooks | auto-hook label | Turn end, day/month rollover, automatic buying/use, upkeep, cleanup. |
| Visit/facility | M36 | mostly shallow | facility/visit command | Listing, availability, facility effects, session/global writes. |
| Work/creative/special work | M37 | medium dynamic | work command | Work listing, special dispatch, result/reward/stat effects. |
| Shooting definitions/screen | M38 | shallow definition | shooting definition | Definition and screen condition inventory. |
| Shooting execution/results | M39 | medium | shooting scene/result | Execution, result calculation, sales, economy/reputation effects. |
| Training menu/session | M40 | shallow shell | training command selection | Menu/session/cancel/cleanup shell; availability/effects are downstream. |
| Training availability | M41 | deep repetitive | `COM_ABLE` command condition | Availability interpreter/table, dynamic condition dispatch. |
| Training effects 0-34 | M42 | deep repetitive | `COMF` command effect | Command formulas, state writes, result trace. |
| Training effects 35-69 | M43 | deep repetitive | `COMF` command effect | Same as M42 for middle command range. |
| Training effects 70+ and post-processing | M44 | deep repetitive | `COMF` command effect/post hook | Higher command range plus shared post-processing. |
| Power/growth/common bonus | M45 | catchall to split | growth/bonus label | Must be decomposed into concrete growth, transfer, bonus entries. |
| Mission | M46 | medium dynamic | mission id/label | Listing, accept/progress/result/reward, deadline interaction. |
| Event/story/progression | M47 | catchall to split | event label/dynamic call | Story flags, relationship events, post-action hooks. |
| Ending/inheritance/area | M48 | catchall to split | ending/area/inheritance entry | Ending conditions, carryover, world/area state. |
| Info/config/misc | M49 | mixed shallow/catchall | config/help/misc entry | Config writes, info/help screens, utility exclusions. |

## Why This Is Not A Deep Tree For Most Features

Most features are not deep command trees. They are entry lists plus conditions and effects:

- shop item -> listing/price/purchase result
- recruit option -> listing/generated character result
- visit facility -> availability/effect
- shooting definition -> screen condition/execution handoff
- mission -> condition/result/reward

The genuinely deep repeated area is training:

- M41: `COM_ABLE` availability programs
- M42-M44: `COMF` effect programs and shared post-processing

M35 is large for a different reason: it is a hidden automatic hook chain behind one turn-end action. M45-M49 are large because they still contain catchall owner scopes that must be split into concrete entries.

## Required Per-Feature Documents

Each milestone document must include or link a concrete inventory table for its feature. The table must answer:

1. What entries exist?
2. Where is each entry defined in original source?
3. What ERB labels execute it?
4. What are the listing/availability/failure/cancel/repeat paths?
5. What state families are read and written?
6. Which effects are implemented now?
7. Which effects are transferred, and to whom?
8. Which tests prove runtime behavior?

Do not close a feature from prose summaries. The detailed list must be backed by original line evidence and source-effect rows.

## Machine Artifacts

The feature map should be backed by generated artifacts rather than hand-written lists where possible.

| Artifact | Purpose |
|---|---|
| `data/coverage/game-feature-map.json` | Full generated hierarchical game map. This is the exhaustive map body. |
| `data/coverage/source-manifest.json` | Original file list and hashes. |
| `data/coverage/manifests/Mxx-source-units.json` | Existing milestone source-unit scope. |
| `data/coverage/source-effects/Mxx.effects.json` | Original line/effect inventory. |
| `data/coverage/source-effects/Mxx.review-queue.json` | Review grouping and omission attack surface. |
| `data/implementation-packets/*.json` | Bounded implementation work packets. |
| Feature-specific coverage JSON | Item/command/mission/scene inventories generated from ERB/CSV. |

## Worker Use

Workers should be used to populate and attack the inventory, not to declare completion.

Useful worker tasks:

- enumerate missing entries in a feature list
- expand `CALLFORM`/`TRYCALLFORM` candidates
- compare CSV definitions against ERB handlers
- group state writes by original state family
- find unowned source-effect rows
- produce test scenario candidates

Workers must not:

- decide a milestone is complete
- transfer responsibility by owner name alone
- count `mapped`, `source-file-review`, `indexed`, or `static profile` as implementation
- create inventory rows without original file/line evidence

## Implementation Workflow

1. Pick one feature from the canonical map.
2. Generate or update its entry inventory from original ERB/CSV.
3. Attach source-effect rows to each entry.
4. Use workers to attack omissions and dynamic call expansion.
5. Implement the feature from that inventory.
6. Add runtime traces for success, failure, cancel, repeat, hidden hook, and save/session paths as relevant.
7. Update milestone docs with links to the inventory and trace evidence.
