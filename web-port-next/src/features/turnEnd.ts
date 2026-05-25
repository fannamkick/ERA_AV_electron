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
import { applyNaturalRecovery, progressHairGrowth } from '../domains/body/upkeep';

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
    id: 'running-cost',
    stage: 'after',
    status: 'implemented',
    ownerMilestone: 'M35',
    description: 'Apply EVENT_NEXTDAY @RUNNING_COST money deduction after the next DAY value is known.',
  },
  {
    id: 'world-event-hook',
    stage: 'after',
    status: 'implemented',
    ownerMilestone: 'M35',
    description: 'Reflect processed event notices into world event flags.',
  },
  {
    id: 'newday-event-hook',
    stage: 'after',
    status: 'implemented',
    ownerMilestone: 'M35',
    description: 'Record new-day event hook last turn and ordered call string for M35 EVENT_NEWDAY reachability.',
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

const NEW_DAY_EVENT_HOOK_IDS = ['MORNING_COWGIRL', 'HAPPY_BIRTHDAY', 'ONESHO', 'PARTICULAR_DATE', 'START_COOCKING'] as const;

export function advanceTurnClock(clock: GameClock): GameClock {
  const nextTurn = clock.turn + 1;
  let nextTimeSlot = clock.currentTimeSlot + 1;
  let nextDay = clock.day;
  let nextWeek = clock.week;
  let nextMonth = clock.month;
  let nextYear = clock.year;

  if (nextTimeSlot > 1) {
    nextTimeSlot = 0;
    nextDay = clock.day + 1;

    // Advance week every 7 days (e.g. day 0-6 is week 1, day 7 is week 2)
    if (nextDay % daysPerTurn === 0) {
      const nextWeekRaw = clock.week + 1;
      if (nextWeekRaw > weeksPerMonth) {
        nextWeek = 1;
        const nextMonthRaw = clock.month + 1;
        if (nextMonthRaw > monthsPerYear) {
          nextMonth = 1;
          nextYear = clock.year + 1;
        } else {
          nextMonth = nextMonthRaw;
        }
      } else {
        nextWeek = nextWeekRaw;
      }
    }
  }

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
      counter_3: nextMonth,
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

function applyAutomaticBuying(state: GameState, nextClock: GameClock): GameState {
  const autoBuyingFlags = Number(state.run.runFlags.flag_34 ?? state.run.runFlags.autoBuyingFlags ?? 0);
  let currentMoney = state.economy.account.currentMoney;
  const itemCounts = { ...state.inventory.itemCounts };
  const accountingEntries = [...state.economy.accountingEntries];

  if ((autoBuyingFlags & 1) !== 0 && currentMoney >= 200 && (itemCounts['25'] ?? 0) === 0) {
    itemCounts['25'] = (itemCounts['25'] ?? 0) + 1;
    currentMoney -= 200;
    accountingEntries.push(`turn:${nextClock.turn}:auto-buy:item:25:-200`);
  }

  if ((autoBuyingFlags & 8) !== 0) {
    for (let i = 0; i < 10; i += 1) {
      if (currentMoney >= 100 && (itemCounts['24'] ?? 0) < 10) {
        itemCounts['24'] = (itemCounts['24'] ?? 0) + 1;
        currentMoney -= 100;
        accountingEntries.push(`turn:${nextClock.turn}:auto-buy:item:24:-100`);
      }
    }
  }

  return {
    ...state,
    inventory: {
      ...state.inventory,
      itemCounts,
    },
    economy: {
      ...state.economy,
      account: {
        currentMoney,
      },
      accountingEntries,
    },
  };
}

function numericValue(value: unknown, fallback = 0): number {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function legacyDifficultyFlag(state: GameState): number {
  const explicitFlag = numericValue(state.run.runFlags.flag_5, Number.NaN);
  if (Number.isFinite(explicitFlag)) return explicitFlag;

  const modeId = String(state.run.runFlags.modeId ?? 'normal');
  if (modeId === 'easy') return 1;
  if (modeId === 'hard') return 3;
  if (modeId === 'powerful') return 4;
  if (modeId === 'phantasm') return 5;
  if (modeId === 'extra') return 9;
  return 2;
}

function trainerExperience(state: GameState, experienceId: string): number {
  const trainer =
    Object.values(state.people.characters).find((character) => character.roles.includes('trainer')) ??
    state.people.characters['character:0'] ??
    state.people.characters['0'];
  return numericValue(trainer?.attributes.experiences[experienceId]);
}

function trainerHasTrait(state: GameState, traitId: string): boolean {
  const trainer =
    Object.values(state.people.characters).find((character) => character.roles.includes('trainer')) ??
    state.people.characters['character:0'] ??
    state.people.characters['0'];
  const value = trainer?.attributes.traits[traitId];
  return value === true || numericValue(value) !== 0;
}

function orderedCharacterEntries(state: GameState): readonly {
  readonly count: number;
  readonly id: string;
}[] {
  return Object.keys(state.people.characters)
    .sort((left, right) => {
      const leftNumber = Number(left.split(':').at(-1));
      const rightNumber = Number(right.split(':').at(-1));
      if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber) && leftNumber !== rightNumber) {
        return leftNumber - rightNumber;
      }
      return left.localeCompare(right);
    })
    .map((id, count) => ({ count, id }));
}

function legacyTimes(value: number, multiplier: number): number {
  return Math.trunc(value * multiplier);
}

function legacyRand2(state: GameState, nextClock: GameClock, characterId: string): number {
  const seedText = `${state.run.rngSeed ?? 'm35'}:${nextClock.turn}:${characterId}:auto-itemuse-rand2`;
  let hash = 0;
  for (let index = 0; index < seedText.length; index += 1) {
    hash = (hash * 31 + seedText.charCodeAt(index)) >>> 0;
  }
  return hash % 2;
}

function computeRunningCost(state: GameState, nextClock: GameClock): {
  readonly cost: number;
  readonly shouldCharge: boolean;
} {
  const day = nextClock.day;
  const difficultyFlag = legacyDifficultyFlag(state);
  const facilityFlags = numericValue(state.run.runFlags.flag_48 ?? state.run.runFlags.facilityFlags);
  const guardCount = numericValue(state.run.runFlags.flag_40 ?? state.run.runFlags.guardCount);
  const characterCount = Object.keys(state.people.characters).length;
  let cost = 500;

  if (day > 31) cost += 1000;
  if (day > 51) cost += 2000;

  if ((facilityFlags & 1) !== 0) cost += 500;
  if ((facilityFlags & 2) !== 0) cost += 100;
  if ((facilityFlags & 4) !== 0) cost += 1000;
  if ((facilityFlags & 32) !== 0) cost += 500;
  if ((facilityFlags & 8) !== 0) cost += 1800;
  if ((facilityFlags & 16) !== 0) cost += 100;
  if ((facilityFlags & 64) !== 0) cost += guardCount * 500;

  const popularity = trainerExperience(state, '91');
  if (popularity >= 50) {
    cost = legacyTimes(cost, 1.1);
  } else if (popularity >= 70) {
    cost = legacyTimes(cost, 1.2);
  } else if (popularity >= 90) {
    cost = legacyTimes(cost, 1.3);
  }

  const contribution = trainerExperience(state, '90');
  if (contribution >= 3000) {
    cost = legacyTimes(cost, 0.1);
  } else if (contribution >= 2000) {
    cost = legacyTimes(cost, 0.3);
  } else if (contribution >= 1200) {
    cost = legacyTimes(cost, 0.5);
  } else if (contribution >= 700) {
    cost = legacyTimes(cost, 0.6);
  } else if (contribution >= 400) {
    cost = legacyTimes(cost, 0.7);
  } else if (contribution >= 200) {
    cost = legacyTimes(cost, 0.8);
  } else if (contribution >= 100) {
    cost = legacyTimes(cost, 0.9);
  }

  if (difficultyFlag <= 2 || difficultyFlag === 9) {
    cost += characterCount * 100;
  } else if (difficultyFlag === 3) {
    cost += characterCount * 200;
  } else if (difficultyFlag === 4) {
    cost += characterCount * 300;
  } else if (difficultyFlag === 5) {
    cost += characterCount * 400;
  }

  cost -= 100;

  if (difficultyFlag === 1) {
    cost = legacyTimes(cost, 0.8);
  } else if (difficultyFlag === 3) {
    if (day <= 20) {
      cost = legacyTimes(cost, 1.2);
    } else if (day <= 40) {
      cost = legacyTimes(cost, 1.5);
    } else if (day <= 60) {
      cost = legacyTimes(cost, 2);
    } else {
      cost = legacyTimes(cost, 2.5);
    }
  } else if (difficultyFlag === 4) {
    if (day <= 20) {
      cost = legacyTimes(cost, 1.4);
    } else if (day <= 30) {
      cost = legacyTimes(cost, 1.8);
    } else if (day <= 40) {
      cost = legacyTimes(cost, 3);
    } else {
      cost = legacyTimes(cost, 5);
    }
  } else if (difficultyFlag === 5) {
    if (day <= 15) {
      cost = legacyTimes(cost, 2);
    } else if (day <= 25) {
      cost = legacyTimes(cost, 4);
    } else if (day <= 35) {
      cost = legacyTimes(cost, 8);
    } else {
      cost = legacyTimes(cost, 16);
    }
  }

  return {
    cost,
    shouldCharge: difficultyFlag !== 9 && ((difficultyFlag === 1 && day >= 20) || (difficultyFlag >= 2 && day >= 10)),
  };
}

function applyRunningCost(state: GameState, nextClock: GameClock): {
  readonly state: GameState;
  readonly chargedCost: number;
} {
  const runningCost = computeRunningCost(state, nextClock);
  if (!runningCost.shouldCharge) {
    return {
      state: {
        ...state,
        economy: {
          ...state.economy,
          transactionFlags: {
            ...state.economy.transactionFlags,
            lastRunningCostCheckedTurn: nextClock.turn,
            lastRunningCostAmount: runningCost.cost,
            lastRunningCostCharged: 0,
          },
        },
      },
      chargedCost: 0,
    };
  }

  return {
    chargedCost: runningCost.cost,
    state: {
      ...state,
      economy: {
        ...state.economy,
        account: {
          currentMoney: state.economy.account.currentMoney - runningCost.cost,
        },
        accountingEntries: [
          ...state.economy.accountingEntries,
          `turn:${nextClock.turn}:running-cost:-${runningCost.cost}`,
        ],
        transactionFlags: {
          ...state.economy.transactionFlags,
          lastRunningCostCheckedTurn: nextClock.turn,
          lastRunningCostAmount: runningCost.cost,
          lastRunningCostCharged: runningCost.cost,
        },
      },
    },
  };
}

function roundedNutritionDose(missingStamina: number): number {
  if (missingStamina <= 499) return 500;
  if (missingStamina <= 1000 && missingStamina >= 500) return 1000;
  if (missingStamina <= 1500 && missingStamina >= 999) return 1500;
  if (missingStamina <= 2000 && missingStamina >= 1499) return 2000;
  if (missingStamina <= 2500 && missingStamina >= 1999) return 2500;
  if (missingStamina <= 3000 && missingStamina >= 2499) return 3000;
  if (missingStamina <= 3500 && missingStamina >= 2999) return 3500;
  if (missingStamina <= 4000 && missingStamina >= 3499) return 4000;
  if (missingStamina <= 4500 && missingStamina >= 3999) return 4500;
  if (missingStamina <= 5000 && missingStamina >= 4499) return 5000;
  return missingStamina;
}

function applyAutomaticItemUse(state: GameState, nextClock: GameClock): GameState {
  const autoItemUseFlags = numericValue(state.run.runFlags.flag_76 ?? state.run.runFlags.autoItemUseFlags);
  if (autoItemUseFlags === 0 || !trainerHasTrait(state, '55')) {
    return {
      ...state,
      economy: {
        ...state.economy,
        transactionFlags: {
          ...state.economy.transactionFlags,
          lastAutoItemUseCheckedTurn: nextClock.turn,
          lastAutoItemUseReturnOnly: autoItemUseFlags !== 0 ? 1 : 0,
        },
      },
    };
  }

  const entries = orderedCharacterEntries(state);
  const characters = { ...state.people.characters };
  const bodies = { ...state.body.byCharacterId };
  const accountingEntries = [...state.economy.accountingEntries];
  let currentMoney = state.economy.account.currentMoney;
  let usedNutrition = 0;
  let usedIncense = 0;
  let usedOvulationInducer = 0;
  let usedOvulationSuppressor = 0;
  
  // Emuera의 LOCAL 변수 오염을 막기 위해 actressCount 명사 변수로 명확히 정의
  let actressCount = 0;
  for (const entry of entries) {
    if (entry.count === 0) {
      continue;
    }
    actressCount += 1;
  }

  if ((autoItemUseFlags & 1) !== 0) {
    for (const entry of entries) {
      const character = characters[entry.id];
      if (entry.count === 0 || !character) {
        continue;
      }

      const currentStamina = numericValue(character.attributes.baseStats.current['0']);
      const maxStamina = numericValue(character.attributes.baseStats.maximum['0'], currentStamina);
      if (currentStamina === maxStamina) {
        continue;
      }

      const dose = roundedNutritionDose(maxStamina - currentStamina);
      const useCount = Math.trunc(dose / 500);
      const cost = useCount * 1000;
      if (currentMoney < cost) {
        break;
      }

      characters[entry.id] = {
        ...character,
        attributes: {
          ...character.attributes,
          baseStats: {
            ...character.attributes.baseStats,
            current: {
              ...character.attributes.baseStats.current,
              '0': maxStamina,
            },
          },
        },
      };
      currentMoney -= cost;
      usedNutrition += useCount;
      accountingEntries.push(`turn:${nextClock.turn}:auto-itemuse:nutrition:${entry.id}:-${cost}`);
    }
  }

  let local = 0;

  if ((autoItemUseFlags & 8) !== 0) {
    for (const entry of entries) {
      if (local === 0) {
        continue;
      }

      const body = bodies[entry.id];
      const negativeJuel = numericValue(body?.trainingResources['100']);
      if (!body || negativeJuel <= 0) {
        continue;
      }

      let halved = Math.trunc(negativeJuel / 2);
      let useCount = 1;
      while (halved !== 0) {
        halved = Math.trunc(halved / 2);
        useCount += 1;
      }

      const cost = useCount * 3000;
      if (currentMoney < cost) {
        break;
      }

      bodies[entry.id] = {
        ...body,
        trainingResources: {
          ...body.trainingResources,
          '100': 0,
        },
      };
      currentMoney -= cost;
      usedIncense += useCount;
      accountingEntries.push(`turn:${nextClock.turn}:auto-itemuse:incense:${entry.id}:-${cost}`);
    }
  }

  if ((autoItemUseFlags & 2) !== 0 && currentMoney >= 2000 * actressCount) {
    for (const entry of entries) {
      const character = characters[entry.id];
      const body = bodies[entry.id];
      if (entry.count === 0 || !character || !body) {
        continue;
      }
      if (character.attributes.traits['122'] === true || numericValue(character.attributes.traits['122']) === 1) {
        continue;
      }
      if (numericValue(body.conditionFlags['109']) >= 1) {
        continue;
      }

      const pband303 = numericValue(state.run.runFlags.pband_303 ?? state.run.runFlags.pband303 ?? state.run.runFlags.PBAND_303);
      const nextValue = 1 + (pband303 === 3 ? legacyRand2(state, nextClock, entry.id) : 0);
      bodies[entry.id] = {
        ...body,
        conditionFlags: {
          ...body.conditionFlags,
          '109': nextValue,
        },
      };
      currentMoney -= 2000;
      usedOvulationInducer += 1;
      accountingEntries.push(`turn:${nextClock.turn}:auto-itemuse:ovulation-inducer:${entry.id}:-2000`);
    }
  }

  if ((autoItemUseFlags & 4) !== 0 && currentMoney >= 50000 * actressCount) {
    for (const entry of entries) {
      const character = characters[entry.id];
      const body = bodies[entry.id];
      if (entry.count === 0 || !character || !body) {
        continue;
      }
      if (character.attributes.traits['122'] === true || numericValue(character.attributes.traits['122']) === 1) {
        continue;
      }
      if (numericValue(body.conditionFlags['109']) === -1) {
        continue;
      }

      bodies[entry.id] = {
        ...body,
        conditionFlags: {
          ...body.conditionFlags,
          '109': -1,
        },
      };
      currentMoney -= 50000;
      usedOvulationSuppressor += 1;
      accountingEntries.push(`turn:${nextClock.turn}:auto-itemuse:ovulation-suppressor:${entry.id}:-50000`);
    }
  }

  return {
    ...state,
    people: {
      ...state.people,
      characters,
    },
    body: {
      ...state.body,
      byCharacterId: bodies,
    },
    economy: {
      ...state.economy,
      account: {
        currentMoney,
      },
      accountingEntries,
      transactionFlags: {
        ...state.economy.transactionFlags,
        lastAutoItemUseCheckedTurn: nextClock.turn,
        lastAutoItemUseReturnOnly: 0,
        lastAutoItemUseNutritionCount: usedNutrition,
        lastAutoItemUseIncenseCount: usedIncense,
        lastAutoItemUseOvulationInducerCount: usedOvulationInducer,
        lastAutoItemUseOvulationSuppressorCount: usedOvulationSuppressor,
      },
    },
  };
}

function applyWeeklyAutomaticHooks(state: GameState, nextClock: GameClock): GameState {
  const markedState: GameState = {
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
  return applyAutomaticItemUse(applyAutomaticBuying(markedState, nextClock), nextClock);
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

function applyNewDayEventHooks(state: GameState, nextClock: GameClock): GameState {
  return {
    ...state,
    world: {
      ...state.world,
      eventFlags: {
        ...state.world.eventFlags,
        newDayHookLastTurn: nextClock.turn,
        newDayHookOrder: NEW_DAY_EVENT_HOOK_IDS.join('|'),
      },
    },
  };
}

function newDayEventEffects(nextClock: GameClock): readonly GameEffect[] {
  return [
    logEffect(`M35 new-day event hooks recorded at turn ${nextClock.turn}: ${NEW_DAY_EVENT_HOOK_IDS.join('|')}`),
  ];
}

function applyNaturalUpkeep(state: GameState, nextClock: GameClock): GameState {
  if (nextClock.day === state.run.clock.day) {
    return state;
  }

  const characters = { ...state.people.characters };
  const bodies = { ...state.body.byCharacterId };

  let healerCount = 0;
  for (const chara of Object.values(characters)) {
    if (chara.attributes.traits['511'] === true || Number(chara.attributes.traits['511']) !== 0) {
      healerCount += 1;
    }
  }

  for (const characterId of Object.keys(characters)) {
    const chara = characters[characterId];
    const body = bodies[characterId];
    if (!chara || !body) continue;

    const currentStamina = Number(body.bodyStats.stamina ?? chara.attributes.baseStats.current['0'] ?? 0);
    const maxStamina = Number(chara.attributes.baseStats.maximum['0'] ?? currentStamina);
    const currentEnergy = Number(body.bodyStats.energy ?? chara.attributes.baseStats.current['1'] ?? 0);
    const maxEnergy = Number(chara.attributes.baseStats.maximum['1'] ?? currentEnergy);
    const isNearDeath = currentStamina <= 0;

    const updatedBodyAfterRecovery = applyNaturalRecovery(
      characterId,
      body,
      currentStamina,
      maxStamina,
      currentEnergy,
      maxEnergy,
      chara.attributes.traits,
      chara.attributes.abilities,
      healerCount,
      isNearDeath
    );

    const finalBody = progressHairGrowth(
      updatedBodyAfterRecovery,
      chara.attributes.traits
    );

    bodies[characterId] = finalBody;

    characters[characterId] = {
      ...chara,
      attributes: {
        ...chara.attributes,
        baseStats: {
          ...chara.attributes.baseStats,
          current: {
            ...chara.attributes.baseStats.current,
            '0': finalBody.bodyStats.stamina,
            '1': finalBody.bodyStats.energy,
          },
        },
      },
    };
  }

  return {
    ...state,
    people: {
      ...state.people,
      characters,
    },
    body: {
      ...state.body,
      byCharacterId: bodies,
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
  
  const upkeepState = applyNaturalUpkeep(state, nextClock);
  const missionDeadline = boundary.weekStarted
    ? decrementMissionDeadlines(upkeepState)
    : { mission: upkeepState.mission, changedCount: 0, failedCount: 0 };
  
  const baseState: GameState = {
    ...upkeepState,
    mission: missionDeadline.mission,
    run: {
      ...upkeepState.run,
      clock: nextClock,
      scheduledEvents: remainingEvents,
    },
  };
  const weeklyState = boundary.weekStarted ? applyWeeklyAutomaticHooks(baseState, nextClock) : baseState;
  const monthlyResult = boundary.monthStarted
    ? applyMonthlyAutomaticHooks(weeklyState, nextClock)
    : { state: weeklyState, chargedCost: 0 };
  const processedState = applyProcessedEventFlags(monthlyResult.state, processedEvents);
  const runningCostResult = applyRunningCost(processedState, nextClock);
  const nextState = applyNewDayEventHooks(runningCostResult.state, nextClock);
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
        `M35 month/week automatic events processed: weekly=${boundary.weekStarted}, monthly=${boundary.monthStarted}, monthlyCost=${monthlyResult.chargedCost}, runningCost=${runningCostResult.chargedCost}.`,
      ),
      ...newDayEventEffects(nextClock),
    ],
  };
}
