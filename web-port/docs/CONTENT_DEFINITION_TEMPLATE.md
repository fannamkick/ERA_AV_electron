# Content Definition Template

Use this as the common shape for future content definitions. Existing training commands already provide the first concrete implementation.

```ts
interface ContentMetadata {
  id: string;
  kind: 'trainingCommand' | 'event' | 'mission' | 'visit';
  packId: string;
  origin: 'legacy' | 'derived' | 'original';
  originalId?: number;
  originalRef?: string;
  title: string;
  tags?: readonly string[];
  balanceVersion?: string;
}
```

## Training Command

```ts
defineTrainingCommand({
  id: 'training.basic.example',
  originalId: 0,
  name: 'Example',
  category: 'basic',
  tags: ['legacy-baseline'],
  actors: [{ role: 'target', required: true }],
  requirements: [],
  effects: [],
  dynamicEffects: [],
  postEffects: [],
});
```

## Event

```ts
{
  metadata: {
    id: 'event.base.example',
    kind: 'event',
    packId: 'base',
    origin: 'original',
    title: 'Example Event',
  },
  requirements: [],
  effects: [],
}
```

## Mission

```ts
{
  metadata: {
    id: 'mission.base.example',
    kind: 'mission',
    packId: 'base',
    origin: 'legacy',
    originalRef: 'mission_example',
    title: 'Example Mission',
  },
  objectives: [],
  rewards: [],
}
```

## Visit

```ts
{
  metadata: {
    id: 'visit.base.example',
    kind: 'visit',
    packId: 'base',
    origin: 'legacy',
    originalRef: 'houmon_example',
    title: 'Example Visit',
  },
  requirements: [],
  effects: [],
}
```
