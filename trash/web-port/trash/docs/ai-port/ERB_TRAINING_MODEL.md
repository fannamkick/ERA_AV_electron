# ERB Training Porting Model

This is the lossless front-end model for AI-assisted ERB-to-web-port migration.
It is not the final `TrainingCommandDefinition` shape. The final command shape is a lowering target.

The extraction rule is: AI may structure ERB facts, but it must not invent web-port keys,
helpers, phases, or command architecture. Unknown lowering remains an explicit blocker.

## State Ownership

| Residence | ERB domains / variables | Ownership rule | Lowering status |
| --- | --- | --- | --- |
| Character state | `ABL`, `TALENT`, `EXP`, `PALAM`, `BASE`, `MAXBASE`, `MARK`, `STAIN`, `CFLAG`, `CSTR` | Bare `DOMAIN:n` means implicit target. `DOMAIN:PLAYER:n`, `DOMAIN:MASTER:n`, `DOMAIN:ASSI:n`, `DOMAIN:TARGET:n` must preserve the explicit role. | Needs complete role-aware adapter coverage. |
| Character identity/display | `NO`, `NAME`, `CALLNAME` | Role lookup such as `NO:PLAYER` or `CALLNAME:TARGET`; read-only. | Context lookup, not numeric effect. |
| Relationship state | `RELATION` | Subject role plus object id/expression, e.g. `RELATION:TARGET:A`, `RELATION:ASSI:(NO:TARGET)`, or implicit subject `RELATION:R`. | Needs expression-capable relationship adapter. |
| Command/session buffers | `SOURCE`, `LOSEBASE`, `UP`, `DOWN`, `JUEL`, `TFLAG`, `SAVESTR`, `RESULT`, `RESULTS`, `PREVCOM`, `SELECTCOM`, `ASSIPLAY` | Scoped to the current training flow/session. These are not character stats unless a later phase consumes them. | `SOURCE`/`LOSEBASE` partly exist; the rest needs session-state adapters. |
| Equipment/session state | `TEQUIP` | Legacy equipment and mode bridge state. Some values are normal equipment, others are modes such as tentacle/slime/bestiality. | Needs first-class equipment/mode entry and tick support. |
| Global/environment | `FLAG`, `ITEM`, `DAY`, `TIME`, `NOITEM`, `RAND` | Global or runtime environment. `RAND:n` is nondeterministic input, not persisted state. | Needs environment adapter and deterministic test hooks. |
| Lookup tables | `PALAMLV`, `EXPLV`, `TALENTNAME`, `EXPNAME`, `ABLNAME`, `MARKNAME`, `PALAMNAME`, `ITEMNAME` | Read-only threshold/display lookup. | Must not be emitted as mutable effects. |
| Local scratch | scalar locals such as `A/B/C/D/E/S/Y/EJAC`, arrays `LOCAL`, `T`, `W`, `L` | Function-local calculation state. | Belongs in structured IR or generated local code, not global state. |

## Actor Roles

The extractor must preserve these roles without collapsing them too early:

| Role | Meaning in ERB extraction |
| --- | --- |
| `TARGET` | The trained character / command target. |
| `PLAYER` | Legacy current actor slot; often current trainer, but can be reassigned. |
| `MASTER` | Master/player character identity. Do not blindly merge with `PLAYER`. |
| `ASSI` | Assistant character identity. |

Role rebinding is real ERB behavior and must be represented explicitly:

```erb
PLAYER = ASSI
PLAYER = MASTER
TARGET = ASSI
TARGET = C
```

This means the IR needs a `roleAssign`/actor-frame operation. A plain stat dictionary cannot represent this correctly.

## Flow And Entries

The model must capture ERB statements before lowering them:

| Family | Examples | Required representation |
| --- | --- | --- |
| Structured branches | `IF`, `ELSEIF`, `ELSE`, `ENDIF`, `SIF` | Conditional statement tree. |
| Mutations | `=`, `+=`, `-=`, `*=`, `/=`, `|=`, `TIMES` | Assignment/mutation node with typed lhs/rhs expression. |
| Calls | `CALL COM_ORDER`, `CALL COM_ABLE64`, `CALL COM_EJAC_PLAYER_SEX` | Call node plus helper catalog entry describing `RESULT`/side effects. |
| Input/menu | `INPUT`, `SELECTCASE RESULT`, `CASE`, `GOTO INPUT_LOOP` | Interactive flow node; cannot lower to boolean confirmation only. |
| Command remap | `JUMP COM69` | Remap only when target is a command jump and availability can be rechecked. |
| Equipment/tick entries | `@EQUIP_COM...`, `@REJECT_CAMERA` | Separate entrypoint category, not a normal command body effect. |
| Messages | `PRINT*`, `SAVESTR`, `TRAIN_MESSAGE_B` | Message/output node; must not be treated as numeric state. |

## Lowering Decision

The first generated artifact should be a lossless ERB command IR.

Only after validation should lowering choose one of these paths:

| Path | Criteria |
| --- | --- |
| `trainingCommandDefinition` | Single command entry, no unresolved interactive flow, no role rebinding, helper calls covered by catalog, state refs mapped. |
| `interactiveCommandFlow` | Uses `INPUT`, `SELECTCASE`, retry labels, clothing menu/display helpers, or non-boolean decisions. |
| `equipmentOrModeEntry` | Uses `@EQUIP_`, `@REJECT_`, persistent active equipment effects, or mode cleanup/tick behavior. |
| `domainHelperCatalog` | Calls reusable helpers whose semantics must be centralized before command codegen. |
| `manualDesign` | Dynamic dispatch or behavior that should be redesigned rather than lowered mechanically. |

## Local Audit

Run the local-only audit without OpenRouter:

```sh
npx ts-node tools/ai-port/cli.ts model-audit --out artifacts/ai-port-model/model-audit.json
```

Current audit over `original-game/ERB/指導関係/COMF*.ERB`:

- Files scanned: 120.
- Modeled reference domains: 36.
- Unmodeled reference domains: 0.
- Dynamic index refs: 30, concentrated in relationship refs and `FLAG:S`.
- Call targets: 62.
- Unclassified call targets: 0.
- Existing static training-command lowering: blocked.

The blocker is not missing state names anymore. The blocker is engine/lowering capability:

- dynamic relationship/index expressions;
- `INPUT`/`SELECTCASE`/`GOTO` interactive flow;
- `JUMP` remap validation;
- `@EQUIP_` and `@REJECT_` entrypoints;
- helper catalog for `COM_ORDER`, `COM_ABLE*`, confirmation helpers, ejaculation/post-sex helpers, clothing display helpers, and domain event helpers;
- role rebinding for commands that temporarily change `PLAYER` or `TARGET`.

## AI Contract

AI extraction output must be validated against this model:

- Every state ref must resolve to one of the modeled residences above.
- Every role-qualified ref must preserve its role.
- Every dynamic index must be an expression node, not an invented key.
- Every helper call must have a catalog policy or become a blocking unresolved helper.
- Every `INPUT`, `GOTO`, `JUMP`, and non-`@COM` entry must remain explicit until a lowering rule exists.
- Generated TS may only use approved helpers and mappings; it may not invent web-port state keys or architecture.
