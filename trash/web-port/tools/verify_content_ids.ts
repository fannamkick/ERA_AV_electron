import { createBaseContentRegistry } from '../src/content/training';

const CONTENT_ID_PATTERN = /^[a-z][a-z0-9]*(\.[a-z0-9_]+)+$/;

function assert(condition: unknown, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function main(): void {
  const registry = createBaseContentRegistry();
  const ids = new Set<string>();
  const originalIds = new Set<string>();

  for (const record of registry.getAllTrainingCommandRecords({ includeDisabledPacks: true })) {
    const id = record.command.id;
    assert(CONTENT_ID_PATTERN.test(id), `Invalid content id format: ${id}`);
    assert(!ids.has(id), `Duplicate content id: ${id}`);
    ids.add(id);

    if (record.command.originalId !== undefined) {
      const originalKey = `trainingCommand:${record.packId}:${record.command.originalId}`;
      assert(!originalIds.has(originalKey), `Duplicate original id mapping: ${originalKey}`);
      originalIds.add(originalKey);
    }
  }

  console.log(JSON.stringify({
    ok: true,
    verified: {
      contentIds: ids.size,
      originalIdMappings: originalIds.size,
    },
  }, null, 2));
}

main();
