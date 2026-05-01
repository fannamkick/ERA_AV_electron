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
  readonly stage: 'before' | 'clock' | 'weekly' | 'monthly' | 'after';
  readonly status: 'implemented';
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
    ownerMilestone: 'M35',
    description: 'Consume turn-end event notices whose trigger is due before or at the next time boundary.',
  },
  {
    id: 'mission-deadline',
    stage: 'before',
    status: 'implemented',
    ownerMilestone: 'M35',
    description: 'Decrement accepted mission deadlines and fail expired mission progress before returning control.',
  },
];

export const turnEndAfterHooks: readonly TurnEndHook[] = [
  {
    id: 'clock-advance',
    stage: 'clock',
    status: 'implemented',
    ownerMilestone: 'M35',
    description: 'Advance day, week, month, year, turn, and mapped time counters together.',
  },
  {
    id: 'weekly-automatic-processing',
    stage: 'weekly',
    status: 'implemented',
    ownerMilestone: 'M35',
    description: 'Record weekly automatic buying, item use, and event hook checks without storing selections.',
  },
  {
    id: 'monthly-automatic-processing',
    stage: 'monthly',
    status: 'implemented',
    ownerMilestone: 'M35',
    description: 'Apply monthly maintenance cost and mark monthly event hook checks on month rollover.',
  },
  {
    id: 'world-event-hook',
    stage: 'after',
    status: 'implemented',
    ownerMilestone: 'M35',
    description: 'Reflect processed event notices into world event flags.',
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
const monthsPerYear = 12;
const daysPerTurn = 7;

export function advanceTurnClock(clock: GameClock): GameClock {
  const monthRollover = clock.week >= weeksPerMonth;
  const nextMonthRaw = monthRollover ? clock.month + 1 : clock.month;
  const yearRollover = nextMonthRaw > monthsPerYear;
  const nextMonth = yearRollover ? 1 : nextMonthRaw;
  const nextYear = clock.year + (yearRollover ? 1 : 0);
  const nextWeek = clock.week >= weeksPerMonth ? 1 : clock.week + 1;
  const nextDay = clock.day + daysPerTurn;
  const nextTurn = clock.turn + 1;
  const nextTimeSlot = 0;

  return {
    day: nextDay,
    month: nextMonth,
    week: nextWeek,
    year: nextYear,
    turn: nextTurn,
    currentTimeSlot: nextTimeSlot,
    dayCounters: {
      ...clock.dayCounters,
      counter_0: nextDay,
      counter_3: monthRollover ? Number(clock.dayCounters.counter_3 ?? 0) + 1 : Number(clock.dayCounters.counter_3 ?? 0),
      counter_4: nextTurn,
    },
    timeCounters: {
      ...clock.timeCounters,
      counter_0: nextTimeSlot,
    },
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

function getTurnBoundary(previousClock: GameClock, nextClock: GameClock): {
  readonly weekStarted: boolean;
  readonly monthStarted: boolean;
  readonly yearStarted: boolean;
} {
  return {
    weekStarted: nextClock.week !== previousClock.week,
    monthStarted: nextClock.month !== previousClock.month || nextClock.year !== previousClock.year,
    yearStarted: nextClock.year !== previousClock.year,
  };
}

function processScheduledEvents(
  events: readonly ScheduledEvent[],
  boundary: ReturnType<typeof getTurnBoundary>,
): {
  readonly processedEvents: readonly ScheduledEvent[];
  readonly remainingEvents: readonly ScheduledEvent[];
} {
  const processedEvents: ScheduledEvent[] = [];
  const remainingEvents: ScheduledEvent[] = [];

  for (const event of events) {
    const due =
      event.trigger === 'immediate' ||
      event.trigger === 'endOfDay' ||
      event.trigger === 'nextDay' ||
      (event.trigger === 'weekStart' && boundary.weekStarted) ||
      (event.trigger === 'monthStart' && boundary.monthStarted);

    if (due) {
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

function decrementMissionDeadlines(state: GameState): {
  readonly mission: GameState['mission'];
  readonly changedCount: number;
  readonly failedCount: number;
} {
  let changedCount = 0;
  let failedCount = 0;
  const byMissionId: GameState['mission']['byMissionId'] = {};

  for (const [missionId, progress] of Object.entries(state.mission.byMissionId)) {
    if (progress.status !== 'accepted' || typeof progress.remainingWeeks !== 'number') {
      byMissionId[missionId] = progress;
      continue;
    }

    changedCount += 1;
    const remainingWeeks = Math.max(0, progress.remainingWeeks - 1);
    if (remainingWeeks === 0) {
      failedCount += 1;
      byMissionId[missionId] = {
        ...progress,
        status: 'failed',
        remainingWeeks,
      };
      continue;
    }

    byMissionId[missionId] = {
      ...progress,
      remainingWeeks,
    };
  }

  if (changedCount === 0) {
    return {
      mission: state.mission,
      changedCount,
      failedCount,
    };
  }

  return {
    mission: {
      ...state.mission,
      byMissionId,
      missionFlags: {
        ...state.mission.missionFlags,
        lastDeadlineTurn: state.run.clock.turn + 1,
        lastDeadlineFailedCount: failedCount,
      },
    },
    changedCount,
    failedCount,
  };
}

function applyWeeklyAutomaticHooks(state: GameState, nextClock: GameClock): GameState {
  return {
    ...state,
    run: {
      ...state.run,
      progressFlags: {
        ...state.run.progressFlags,
        autoPurchaseCheckedAtTurn: nextClock.turn,
        autoItemUseCheckedAtTurn: nextClock.turn,
        weeklyEventHookCheckedAtTurn: nextClock.turn,
        flag_61: nextClock.turn,
      },
    },
    world: {
      ...state.world,
      eventFlags: {
        ...state.world.eventFlags,
        weeklyHookLastTurn: nextClock.turn,
      },
    },
  };
}

function applyMonthlyAutomaticHooks(state: GameState, nextClock: GameClock): {
  readonly state: GameState;
  readonly chargedCost: number;
} {
  const chargedCost = Math.max(0, Number(state.run.runFlags.monthlyMaintenanceCost ?? 0));

  return {
    chargedCost,
    state: {
      ...state,
      run: {
        ...state.run,
        progressFlags: {
          ...state.run.progressFlags,
          monthlyEventHookCheckedAtTurn: nextClock.turn,
          flag_34: nextClock.turn,
        },
      },
      world: {
        ...state.world,
        eventFlags: {
          ...state.world.eventFlags,
          monthlyHookLastTurn: nextClock.turn,
          yearHookLastTurn: nextClock.year,
        },
      },
      economy: {
        ...state.economy,
        account: {
          currentMoney: state.economy.account.currentMoney - chargedCost,
        },
        accountingEntries:
          chargedCost > 0
            ? [
                ...state.economy.accountingEntries,
                `turn:${nextClock.turn}:monthly-maintenance:-${chargedCost}`,
              ]
            : state.economy.accountingEntries,
        transactionFlags: {
          ...state.economy.transactionFlags,
          lastMonthlyMaintenanceTurn: nextClock.turn,
          lastMonthlyMaintenanceCost: chargedCost,
        },
      },
    },
  };
}

function applyProcessedEventFlags(state: GameState, processedEvents: readonly ScheduledEvent[]): GameState {
  if (processedEvents.length === 0) return state;

  const eventFlags = { ...state.world.eventFlags };
  for (const event of processedEvents) {
    eventFlags[`processed:${event.id}`] = true;
  }

  return {
    ...state,
    world: {
      ...state.world,
      eventFlags,
    },
  };
}

export function endTurn(state: GameState, session: GameSession): TurnEndResult {
  const nextClock = advanceTurnClock(state.run.clock);
  const boundary = getTurnBoundary(state.run.clock, nextClock);
  const { processedEvents, remainingEvents } = processScheduledEvents(state.run.scheduledEvents, boundary);
  const missionDeadline = decrementMissionDeadlines(state);
  const baseState: GameState = {
    ...state,
    mission: missionDeadline.mission,
    run: {
      ...state.run,
      clock: nextClock,
      scheduledEvents: remainingEvents,
    },
  };
  const weeklyState = boundary.weekStarted ? applyWeeklyAutomaticHooks(baseState, nextClock) : baseState;
  const monthlyResult = boundary.monthStarted
    ? applyMonthlyAutomaticHooks(weeklyState, nextClock)
    : { state: weeklyState, chargedCost: 0 };
  const nextState = applyProcessedEventFlags(monthlyResult.state, processedEvents);
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
      logEffect(
        `M35 mission deadline hook processed ${missionDeadline.changedCount} mission(s), failed ${missionDeadline.failedCount}.`,
      ),
      logEffect(
        `M35 month/week automatic events processed: weekly=${boundary.weekStarted}, monthly=${boundary.monthStarted}, monthlyCost=${monthlyResult.chargedCost}.`,
      ),
    ],
  };
}
