# Content Changelog

Record balance and content changes here. This is separate from app release notes because it tracks gameplay compatibility and pack behavior.

## Format

```md
## YYYY-MM-DD - <packId>

- Added: <content id> - New command, event, mission, or visit.
- Changed: <content id> - Requirement, effect, message, or routing change.
- Balance: <content id> - SOURCE, EXP, reward, weight, or probability change.
- Migration: <content id> - Legacy parity decision or original reference change.
- Validation: Commands run and result.
```

## 2026-04-28 - training.base

- Added: `training.basic.caress`, `training.basic.cunnilingus`, `training.basic.kiss` are registered through the base training content pack.
- Migration: Saves now record enabled content pack ids; old saves migrate to `training.base`.
- Validation: Pending current verification batch.
