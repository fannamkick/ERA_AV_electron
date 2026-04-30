import { initialFeatureSessionState } from '../domains/featureSession/types';
import { initialInteractionSessionState } from '../domains/interaction/types';
import { initialMissionSessionState } from '../domains/missionSession/types';
import { initialRecruitSessionState } from '../domains/recruit/types';
import type { GameClock, ScheduledEvent } from '../domains/run/types';
import { initialSaveLoadSessionState } from '../domains/save/types';
import { initialScriptFrameState } from '../domains/script/types';
import { initialShopSessionState } from '../domains/shop/types';
import { initialShootingSessionState } from '../domains/shootingSession/types';
import { initialVisitSessionState } from '../domains/visit/types';
import { initialWorkSessionState } from '../domains/workSession/types';
import { logEffect, type GameEffect } from '../game/effects';
import type { GameSession, GameState } from '../game/state';

export type TurnEndHook = {
  readonly id: string;
  readonly stage: 'before' | 'after';
  readonly status: 'implemented' | 'stub';
  readonly ownerMilestone: string;
  readonly description: string;
};

export type TurnEndResult = {
  readonly state: GameState;
  readonly session: GameSession;
  readonly processedEvents: readonly ScheduledEvent[];
  readonly effects: readonly GameEffect[];
};

export const turnEndBeforeHooks: readonly TurnEndHook[] = [
  {
    id: 'scheduled-events',
    stage: 'before',
    status: 'implemented',
    ownerMilestone: 'M8',
    description: 'Consume currently scheduled immediate/end-of-day/next-day events as turn-end notices.',
  },
  {
    id: 'mission-deadline',
    stage: 'before',
    status: 'stub',
    ownerMilestone: 'M11/M27',
    description: 'Mission deadline decrement and failure/reward settlement are connected after mission state exists.',
  },
];

export const turnEndAfterHooks: readonly TurnEndHook[] = [
  {
    id: 'month-week-processing',
    stage: 'after',
    status: 'stub',
    ownerMilestone: 'M27',
    description: 'Month/week boundary events, auto buying, auto item use, and ending checks are connected later.',
  },
  {
    id: 'session-cleanup',
    stage: 'after',
    status: 'implemented',
    ownerMilestone: 'M8',
    description: 'Action-local session buffers are cleared before returning to the main menu.',
  },
];

const weeksPerMonth = 4;
const daysPerTurn = 7;

export function advanceTurnClock(clock: GameClock): GameClock {
  const nextWeek = clock.week >= weeksPerMonth ? 1 : clock.week + 1;

  return {
    day: clock.day + daysPerTurn,
    month: clock.week >= weeksPerMonth ? clock.month + 1 : clock.month,
    week: nextWeek,
    turn: clock.turn + 1,
    phase: 'freeAction',
  };
}

function clearTurnSession(session: GameSession): GameSession {
  return {
    ...session,
    featureSession: initialFeatureSessionState,
    interaction: initialInteractionSessionState,
    mission: initialMissionSessionState,
    recruit: initialRecruitSessionState,
    saveLoad: initialSaveLoadSessionState,
    shop: initialShopSessionState,
    shooting: initialShootingSessionState,
    script: initialScriptFrameState,
    visit: initialVisitSessionState,
    work: initialWorkSessionState,
    ui: {
      ...session.ui,
      route: 'mainMenu',
      choices: [],
    },
  };
}

function processScheduledEvents(events: readonly ScheduledEvent[]): {
  readonly processedEvents: readonly ScheduledEvent[];
  readonly remainingEvents: readonly ScheduledEvent[];
} {
  const processableTriggers = new Set<ScheduledEvent['trigger']>(['immediate', 'endOfDay', 'nextDay']);
  const processedEvents: ScheduledEvent[] = [];
  const remainingEvents: ScheduledEvent[] = [];

  for (const event of events) {
    if (processableTriggers.has(event.trigger)) {
      processedEvents.push(event);
    } else {
      remainingEvents.push(event);
    }
  }

  return { processedEvents, remainingEvents };
}

function scheduledEventEffects(processedEvents: readonly ScheduledEvent[]): readonly GameEffect[] {
  return processedEvents.map((event) =>
    logEffect(`Scheduled event processed: ${event.id} (${event.trigger}) - ${event.reason}`),
  );
}

export function endTurn(state: GameState, session: GameSession): TurnEndResult {
  const { processedEvents, remainingEvents } = processScheduledEvents(state.run.scheduledEvents);
  const nextClock = advanceTurnClock(state.run.clock);
  const nextState: GameState = {
    ...state,
    run: {
      ...state.run,
      clock: nextClock,
      scheduledEvents: remainingEvents,
    },
  };
  const nextSession = clearTurnSession(session);

  return {
    state: nextState,
    session: nextSession,
    processedEvents,
    effects: [
      ...scheduledEventEffects(processedEvents),
      logEffect(
        `Turn ended: month ${nextClock.month}, week ${nextClock.week}, day ${nextClock.day}, turn ${nextClock.turn}.`,
        'success',
      ),
      logEffect('M8 stub: mission deadline processing remains in M11/M27.', 'warning'),
      logEffect('M8 stub: month/week automatic events remain in M27.', 'warning'),
    ],
  };
}
