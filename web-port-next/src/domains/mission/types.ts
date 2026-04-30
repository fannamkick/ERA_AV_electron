export type MissionStatus = 'locked' | 'available' | 'accepted' | 'completed' | 'failed';

export type MissionProgress = {
  readonly status: MissionStatus;
  readonly progressBand: number;
  readonly acceptedByCharacterId?: string;
  readonly rewardClaimed: boolean;
  readonly remainingWeeks?: number;
};

export type MissionState = {
  readonly byMissionId: Record<string, MissionProgress>;
  readonly acceptedCountsByCharacterId: Record<string, number>;
  readonly missionFlags: Record<string, boolean | number | string>;
  readonly legacyPBandNeedingMapping: Record<string, number>;
};

export const initialMissionState: MissionState = {
  byMissionId: {},
  acceptedCountsByCharacterId: {},
  missionFlags: {},
  legacyPBandNeedingMapping: {},
};
