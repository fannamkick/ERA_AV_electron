export type CommandSequenceState = {
  readonly activeSequenceId?: string;
  readonly progress: Record<string, number>;
};

export type FeatureSessionStatus = {
  readonly passoutLevel: number;
  readonly deferredUserCommand?: string;
};

export type FeatureSessionState = {
  readonly commandSequences: CommandSequenceState;
  readonly status: FeatureSessionStatus;
};

export const initialFeatureSessionState: FeatureSessionState = {
  commandSequences: {
    progress: {},
  },
  status: {
    passoutLevel: 0,
  },
};
