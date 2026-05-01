export type ShootingSessionState = {
  readonly selectedCharacterId?: string;
  readonly selectedSceneId?: string;
  readonly visibleCharacterIds: readonly string[];
  readonly visibleSceneIds: readonly string[];
  readonly filmingAmount: number;
  readonly sceneTemporaryValues: Record<string, number>;
  readonly sceneFlags: Record<string, boolean | number | string>;
};

export const initialShootingSessionState: ShootingSessionState = {
  visibleCharacterIds: [],
  visibleSceneIds: [],
  filmingAmount: 0,
  sceneTemporaryValues: {},
  sceneFlags: {},
};
