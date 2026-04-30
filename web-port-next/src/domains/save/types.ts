export type SaveState = {
  readonly entries: Record<string, string>;
  readonly autosaveEntryId?: string;
  readonly migrationVersion: number;
};

export type SaveLoadSessionState = {
  readonly snapshotText: string;
  readonly loadText: string;
  readonly lastSnapshotAt?: string;
};

export const initialSaveState: SaveState = {
  entries: {},
  migrationVersion: 1,
};

export const initialSaveLoadSessionState: SaveLoadSessionState = {
  snapshotText: '',
  loadText: '',
};
