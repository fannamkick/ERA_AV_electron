export type MissionSessionState = {
  readonly selectedMissionId?: string;
  readonly visibleMissionIds: readonly string[];
};

export const initialMissionSessionState: MissionSessionState = {
  visibleMissionIds: [],
};
