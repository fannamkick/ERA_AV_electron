export type ShootingSessionState = {
  readonly selectedCharacterId?: string;
  readonly selectedSceneId?: string;
  readonly visibleCharacterIds: readonly string[];
  readonly visibleSceneIds: readonly string[];
  readonly filmingAmount: number;
};

export const initialShootingSessionState: ShootingSessionState = {
  visibleCharacterIds: [],
  visibleSceneIds: [],
  filmingAmount: 0,
};
