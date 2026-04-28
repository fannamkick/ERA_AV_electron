# Content Expansion Workflow

Use content packs for new or migrated gameplay content. Do not add command, event, mission, or visit behavior by importing stores, React components, or legacy generated files directly.

## Steps

1. Choose the content kind: `trainingCommand`, `event`, `mission`, or `visit`.
2. Choose the pack id. Base migration uses `training.base`; experimental or optional additions use `expansion.<name>` or a more specific pack namespace.
3. Assign a stable lowercase id using namespaces, for example `training.basic.caress`, `event.base.morning_check`, `mission.expansion.hikari_intro`, or `visit.base.eunice_labo_entry`.
4. If the content is legacy-based, record `originalId` or an `originalRef` in the relevant schema. Original new content must not claim a legacy `originalId`.
5. Declare requirements, effects, messages, roles, and tags through domain-owned APIs. Content may describe behavior but must not mutate state directly.
6. Register the content through a `ContentPack`.
7. Run `npx ts-node tools/verify_content_ids.ts`.
8. Record balance or content changes in `CONTENT_CHANGELOG.md`.

## Review Gate

- Content IDs must be globally stable and unique.
- Legacy mappings must not conflict inside the same `kind + packId + originalId` space.
- Experimental packs must be disabled by default unless the task explicitly says otherwise.
- Domain ownership must be clear before implementation: training orchestrates, person/contact/equipment own reusable gameplay facts, adapters translate state shape.
