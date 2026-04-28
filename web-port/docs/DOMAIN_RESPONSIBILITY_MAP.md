# Domain Responsibility Map

This document defines which domain owns each kind of rule or state. The purpose is to prevent the web port from turning into command-by-command custom code.

## Ownership Rule

A domain owns a concept when it defines the concept's meaning, lifecycle, and invariants.

A domain may call another domain, but it must not silently own another domain's facts.

Practical rule:

- If it exists only while one training command is being executed, it belongs to the training session.
- If it remains on a character after training ends, it belongs to the person/character domain.
- If it describes contact between actors and can be reused by training, events, visits, or brothel systems, it belongs to the contact/interaction domain.
- If it is only an index translation for legacy data, it belongs to adapters or stat/flag key registries, not gameplay ownership.
- If it is declarative command data, it belongs to content.

## Responsibility Matrix

| Concept | Owner | Training responsibility | Notes |
| --- | --- | --- | --- |
| Command selection, command phase order, SourceCheck timing | Training session | Owns | This is the training engine's core job. |
| `SOURCE`, `LOSEBASE`, `UP` during command execution | Training session | Owns | These are transient command/session values. |
| Training mode active state: bestiality, tentacle, slime | Training session | Owns | Legacy `TEQUIP` bridge is allowed as compatibility, but the mode meaning is training-specific. |
| Training apparatus sub-flags: tentacle mouth, slime entry, temporary devices | Training session | Owns while active | Cleanup rules belong near training mode handling. |
| Character identity, body traits, talents, abilities | Person/character | Reads and requests changes | Training must not define what these facts mean. |
| `BASE`, max stats, health/stamina persistence | Person/character | Applies effects through person/stat APIs | Training can cause damage or recovery; person owns persistence. |
| `PALAM`, `EXP`, `MARK`, `JUEL` | Person/character | Requests changes | Training can produce these changes, but the values belong to the character. |
| Pregnancy, fertility, virginity, first-contact history | Person/reproduction/contact | Calls service with context | Training is an event source, not the owner of these systems. |
| Stain/contamination on body parts | Contact/body state | Calls transfer/set/clear service | Training can trigger contact; contact/body owns transfer semantics. |
| Ejaculation, insertion, kiss, dirty-mouth transfer | Contact/interaction | Calls service with actors and parts | Must be reusable outside training. |
| Equipment state, equipment key validation, equipment cleanup effects | Equipment | Requests equipment effects | Training modes may decide when cleanup happens; equipment owns how equipment state is expressed. |
| Global flags, character flags, target flags | Flag domain and adapters | Reads/writes by named keys only | Numeric indices stay in key maps, not content code. |
| Availability requirements and simple effects | Content using core definitions | Declares | Content should describe behavior, not mutate state directly. |
| Legacy numeric arrays and ERB compatibility | Adapters/key registries | Uses through named APIs | Compatibility detail, not a gameplay domain. |
| React UI and Zustand store shape | Application/store layers | Calls training through adapter | Domain must not import UI/store implementation. |

## Current Placement Policy

Training is the first migrated system, so some reusable person/contact behavior currently exists under `domain/training` as a staging area.

This is acceptable only when the file is treated as a training-facing adapter or resolver, not the final owner.

Current examples:

- `domain/person` owns first-pass person-facing availability and experience helpers used by migrated training commands.
- `domain/person/orderFormulaTerms.ts` owns first-pass person-state COM_ORDER score terms.
- `domain/person/sourceProgression.ts` owns first-pass legacy `SOURCE -> PALAM` progression and natural PALAM decay.
- `domain/contact` owns first-pass contact-facing mouth access, dirty-mouth refusal, first-contact, and stain transfer helpers used by migrated training commands.
- `domain/equipment` owns first-pass equipment key validation, equipment active checks, equipment set/clear effects, equipment blocking conditions, and equipment effect handlers.
- `domain/contact` owns stain effect handlers and reusable contact/stain semantics.
- `domain/adapters` owns first-pass in-memory and store-backed training engine adapters. These translate character/store shapes into domain runtime APIs.
- `core/effects` owns the generic effect applier loop and replaceable handler registry. Default handlers must stay generic; domain-specific handlers such as equipment and stains are composed by training/domain registries.
- `domain/training/experienceEffectResolvers.ts` remains a training-facing command resolver, but delegates person/contact outcomes to `domain/person` and `domain/contact`.
- `domain/training/stainEffectResolvers.ts` remains a training-facing command resolver, but delegates contact transfer semantics to `domain/contact`.
- `domain/training/availabilityPredicates.ts` remains a compatibility wrapper for training content, but body/contact availability helpers live in `domain/person` and `domain/contact`.
- `domain/training/sourceConversion.ts`, `domain/training/inMemoryTrainingContext.ts`, and `domain/training/storeTrainingContext.ts` remain compatibility re-exports only.
- `domain/training/trainingModes.ts` stays in training because bestiality/tentacle/slime mode activation and cleanup are training-session concepts.
- `domain/training/passiveEquipmentHooks.ts` remains a training hook adapter, but delegates equipment key validation and active checks to `domain/equipment`.
- `domain/training/passiveTrainingModeProcessors.ts` owns training-mode source multiplier processors. It only applies named source keys; SOURCE 11/14 are named as legacy buffers and remain separate from SourceCheck conversion rules.
- `domain/stats` and `domain/flags` are key registries/access layers. They do not own gameplay meaning by themselves.
- Store context adapters translate store shape into domain APIs and must not become the owner of gameplay rules.

## Example Flows

### Kiss command

Content declares: command ID, availability, source effects, dirty-mouth side effect, and original ERB reference.

Training session owns: command execution order, actor roles, `SOURCE`, `LOSEBASE`, `UP`, formula gates, and SourceCheck.

Contact domain owns: mouth-to-mouth contact, stain transfer semantics, and first-contact event production.

Person domain owns: persistent `EXP`, `PALAM`, marks, talents, and first-contact history.

### Tentacle mode

Content declares: mode toggle command and any visible command metadata.

Training session owns: whether tentacle mode is active, which temporary tentacle sub-flags are active, and cleanup when mode ends.

Contact/body domain owns: what contact with tentacles does to body contamination or body-part state.

Person domain owns: lasting experience, marks, damage, pregnancy-relevant facts, and other persistent consequences.

### Pregnancy check after insertion

Training session owns: the command context, actors, command phase, and whether the relevant action happened.

Contact/reproduction domain owns: whether the action can produce pregnancy and how the check is calculated.

Person domain owns: persistent pregnancy state.

## Migration Review Rule

Before adding or migrating a feature, classify it using these questions:

1. Does the value disappear after the training command or session ends?
2. Does the value persist on a character?
3. Could the same rule be needed by non-training systems?
4. Is this only a legacy numeric index or adapter concern?
5. Is this declarative content or executable rule logic?

If a feature answers both "training" and "person/contact", split it. Training should orchestrate the event; person/contact should own the persistent or reusable rule.
