# Web Port Architecture Contract

This document defines the architecture rules for the erAV_Ho web port. The goal is to preserve original-game compatibility while making future systems and content replaceable.

## Goals

- Preserve original ERB semantics where they matter.
- Make new content readable as conditions, effects, messages, and follow-up behavior.
- Keep UI, storage, content definitions, and game rules separated.
- Make systems replaceable without rewriting content.
- Keep legacy conversion output available for comparison, not as the long-term foundation.

## Dependency Direction

Allowed direction:

```txt
components -> application/hooks -> domain -> core -> state adapters
content -> domain -> core
legacy -> adapters -> domain
stores -> domain/core types only
```

Forbidden direction:

```txt
domain -> React
domain -> Zustand store
content -> Zustand store
content -> React
domain -> legacy generated files
core -> gameplay-specific systems
```

## Layers

### `core`

Generic execution building blocks. This layer knows about conditions, effects, registries, and runtime contracts. It should not know what "training", "mission", or "brothel" means.

Examples:

- `core/conditions`
- `core/effects`
- future `core/registry`

### `domain`

Game rules. This layer owns concepts such as training, character state, flags, PALAM, SOURCE, missions, visits, and economy.

Examples:

- `domain/training`
- `domain/flags`
- `domain/stats`
- future `domain/events`

### `content`

Declarative gameplay content. Content may describe requirements, effects, messages, IDs, categories, and original ERB references. It must not mutate state directly.

Examples:

- `content/training/basicCommands.ts`
- future `content/events/dailyEvents.ts`

### `stores`

Persistent state. Stores may expose actions to the UI, but domain rules should be able to run against a state adapter without importing the store.

### `legacy`

Original conversion output and manually improved legacy ports. Legacy code remains useful for comparison and migration, but new systems should not depend on it directly.

## Domain Responsibility Boundary

Layer direction is not enough by itself. Each gameplay concept also needs a clear owner.

Use `DOMAIN_RESPONSIBILITY_MAP.md` as the source of truth for deciding whether a rule belongs to training, person/character, contact/interaction, content, adapters, or stores.

Short rule:

- Training owns command execution, session state, modes, phase order, and transient values such as `SOURCE`, `LOSEBASE`, and `UP`.
- Person/character owns persistent character facts such as talents, abilities, experience, marks, base stats, pregnancy, virginity, and first-contact history.
- Contact/interaction owns reusable actor-to-actor or body-part interactions such as insertion, ejaculation, kissing, stain transfer, and contamination semantics.
- Content declares behavior; it does not own mutation logic.
- Adapters translate legacy/store shapes; they do not own gameplay rules.

When a migrated command touches multiple domains, training should orchestrate the event and call the owning domain rather than absorbing that domain's rules.

## State Access Rule

Original numeric indices remain authoritative, but new code should use named keys.

Bad:

```ts
ctx.params[5] += 1000;
target.cflag[620] = 50000;
```

Good:

```ts
ctx.palam.add(targetId, 'lust', 1000);
ctx.cflag.set(targetId, 'contractPrice', 50000);
```

The name map must include the original index so old data and new logic can be compared.

## Content Rule

A content definition should be made from:

- Stable content ID
- Optional original ERB command/event ID
- Requirements
- Effects
- Messages
- Tags/categories

Content should not own state mutation logic. It should describe the mutation through effects.

Content is registered through `ContentPack` and `ContentRegistry`. Experimental packs must be explicitly enabled, and saves record enabled content pack ids so later balance/content changes can be migrated safely.

## Training Migration Rule

Training is the first migration target.

The pilot migration scope is:

- COMF0
- COMF1
- COMF6

The pilot is considered acceptable only when:

- availability can be evaluated without UI imports;
- effects can be applied through `EffectApplier`;
- output can be compared with `ImprovedTrainingModule`;
- UI can call the new engine behind a feature flag.

## Review Checklist

Use `ARCHITECTURE_REVIEW_CHECKLIST.md` for review decisions. The short checklist below is the minimum filter.

- Does the change add direct numeric stat or flag access outside key maps?
- Does content mutate Zustand or character objects directly?
- Does a domain file import React, components, or legacy generated files?
- Does the change make a future system replacement harder?
- Is there a validation path for the behavior being introduced?
