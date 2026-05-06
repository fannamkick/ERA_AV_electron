export type WorkSessionState = {
  readonly selectedWorkId?: string;
  readonly selectedCharacterId?: string;
  readonly selectedAssistantId?: string;
  readonly visibleWorkIds: readonly string[];
  readonly eligibleCharacterIds: readonly string[];
};

export const initialWorkSessionState: WorkSessionState = {
  visibleWorkIds: [],
  eligibleCharacterIds: [],
};
