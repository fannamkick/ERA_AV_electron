export type InteractionEvent = {
  readonly id: string;
  readonly kind: string;
  readonly actorIds: readonly string[];
  readonly payload: Record<string, boolean | number | string>;
};

export type InteractionParticipants = {
  readonly targetId?: string;
  readonly assistantId?: string;
  readonly masterId?: string;
  readonly playerId?: string;
  readonly assistantPlay: boolean;
};

export type CommandFlowState = {
  readonly selectedCommandId?: string;
  readonly previousCommandId?: string;
  readonly nextCommandId?: string;
};

export type TemporaryEquipmentState = {
  readonly activeEquipment: Record<string, boolean | number | string>;
  readonly condomState: Record<string, boolean | number | string>;
  readonly modeState: Record<string, boolean | number | string>;
};

export type InteractionResultBuffers = {
  readonly nowEx: Record<string, number>;
  readonly gotJuel: Record<string, number>;
  readonly ejaculationThresholds: Record<string, number>;
  readonly climaxCounters: Record<string, number>;
};

export type InteractionMessageBuffers = {
  readonly saveStrings: Record<string, string>;
  readonly temporaryStrings: Record<string, string>;
  readonly temporaryVariables: Record<string, boolean | number | string>;
};

export type InteractionSessionState = {
  readonly participants: InteractionParticipants;
  readonly commandFlow: CommandFlowState;
  readonly temporaryFlags: Record<string, boolean | number | string>;
  readonly temporaryEquipment: TemporaryEquipmentState;
  readonly sources: Record<string, number>;
  readonly paramDeltas: Record<string, { readonly up: number; readonly down: number }>;
  readonly baseLoss: Record<string, number>;
  readonly resultBuffers: InteractionResultBuffers;
  readonly messageBuffers: InteractionMessageBuffers;
  readonly pendingEvents: readonly InteractionEvent[];
  readonly counters: Record<string, number>;
  readonly legacySessionIndexesNeedingMapping: Record<string, boolean | number | string>;
};

export const initialInteractionSessionState: InteractionSessionState = {
  participants: {
    assistantPlay: false,
  },
  commandFlow: {},
  temporaryFlags: {},
  temporaryEquipment: {
    activeEquipment: {},
    condomState: {},
    modeState: {},
  },
  sources: {},
  paramDeltas: {},
  baseLoss: {},
  resultBuffers: {
    nowEx: {},
    gotJuel: {},
    ejaculationThresholds: {},
    climaxCounters: {},
  },
  messageBuffers: {
    saveStrings: {},
    temporaryStrings: {},
    temporaryVariables: {},
  },
  pendingEvents: [],
  counters: {},
  legacySessionIndexesNeedingMapping: {},
};
