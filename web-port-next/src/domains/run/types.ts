export type GameClock = {
  readonly day: number;
  readonly month: number;
  readonly week: number;
  readonly turn: number;
  readonly phase: 'setup' | 'freeAction' | 'training' | 'event' | 'endOfDay';
};

export type ScheduledEvent = {
  readonly id: string;
  readonly trigger: 'immediate' | 'endOfDay' | 'nextDay';
  readonly reason: string;
};

export type ActorMemoryState = {
  readonly lastTargetId?: string;
  readonly lastAssistantId?: string;
};

export type RunState = {
  readonly clock: GameClock;
  readonly scheduledEvents: readonly ScheduledEvent[];
  readonly actorMemory: ActorMemoryState;
  readonly runFlags: Record<string, boolean | number | string>;
  readonly rngSeed?: string;
};

export const initialRunState: RunState = {
  clock: {
    day: 1,
    month: 1,
    week: 1,
    turn: 0,
    phase: 'setup',
  },
  scheduledEvents: [],
  actorMemory: {},
  runFlags: {},
};
