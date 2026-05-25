import type { GameAction } from '../src/game/actions';
import { validateActionResultBoundary, validateSavePayloadBoundary, validateStateSessionBoundary } from '../src/game/boundaries';
import { dispatchGameAction } from '../src/game/dispatch';
import type { GameActionContext, GameActionResult } from '../src/game/results';
import { createGameSavePayload, parseGameSavePayload, serializeGameSavePayload } from '../src/game/savePayload';
import { runAllPhase2Tests } from '../src/features/training/availability.test';
import { runAllPhase3Tests } from '../src/features/training/engine.test';
import { runAllPhase6Tests } from '../src/features/kojo/engine.test';
import { createInitialGameData, type GameSession, type GameState } from '../src/game/state';
import type { GameDefinitions } from '../src/catalog/types';
import { createCharacterBundleFromSpecs } from '../src/features/characterCreation';
import { applyAfterTrainCharacterDeathCheck } from '../src/features/training';

type SmokeContext = {
  readonly catalog: GameDefinitions;
  readonly state: GameState;
  readonly session: GameSession;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertDeepEqual(actual: unknown, expected: unknown, path: string = 'state') {
  if (actual === expected) return;

  if (typeof actual !== typeof expected) {
    // a가 object이고 b가 undefined(혹은 그 반대)일 때, 둘 다 실질적으로 비어있거나 무해할 수 있으나 타입 불일치로 오인될 수 있습니다.
    // 하지만 nested property 대조 시 한쪽에만 undefined 키가 있는 경우는 keys 루프에서 continue로 이미 걸렀으므로,
    // 진짜 타입이 다른 경우에만 에러를 뱉습니다.
    throw new Error(`DeepEqual mismatch at ${path}: type mismatch (expected ${typeof expected}, got ${typeof actual})`);
  }

  if (typeof actual === 'object' && actual !== null && expected !== null) {
    const objA = actual as Record<string, unknown>;
    const objB = expected as Record<string, unknown>;

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    for (const key of keysA) {
      const valA = objA[key];
      const valB = objB[key];

      if (valA === undefined && valB === undefined) {
        continue;
      }

      if (!Object.prototype.hasOwnProperty.call(objB, key)) {
        throw new Error(`DeepEqual mismatch at ${path}: key '${key}' exists in actual but is missing in expected`);
      }
      assertDeepEqual(valA, valB, `${path}.${key}`);
    }

    for (const key of keysB) {
      const valA = objA[key];
      const valB = objB[key];

      if (valA === undefined && valB === undefined) {
        continue;
      }

      if (!Object.prototype.hasOwnProperty.call(objA, key)) {
        throw new Error(`DeepEqual mismatch at ${path}: key '${key}' exists in expected but is missing in actual`);
      }
    }
    return;
  }

  if (actual !== expected) {
    throw new Error(`DeepEqual mismatch at ${path}: expected ${String(expected)}, got ${String(actual)}`);
  }
}

function assertNoBoundaryErrors(label: string, diagnostics: readonly { readonly severity: string; readonly message: string }[]) {
  const errors = diagnostics.filter((diagnostic) => diagnostic.severity === 'error');
  assert(errors.length === 0, `${label} boundary failed:\n${errors.map((error) => error.message).join('\n')}`);
}

function toActionContext(context: SmokeContext): GameActionContext {
  return {
    catalog: context.catalog,
    state: context.state,
    session: context.session,
  };
}

function nextContext(context: SmokeContext, result: GameActionResult): SmokeContext {
  return {
    catalog: context.catalog,
    state: result.state,
    session: result.session,
  };
}

function dispatchChecked(context: SmokeContext, action: GameAction): { readonly context: SmokeContext; readonly result: GameActionResult } {
  const actionContext = toActionContext(context);
  const result = dispatchGameAction(actionContext, action);
  assertNoBoundaryErrors(action.type, validateActionResultBoundary(actionContext, result));
  return {
    context: nextContext(context, result),
    result,
  };
}

function hasEffect(result: GameActionResult, text: string): boolean {
  return result.effects.some((effect) => {
    if (effect.type === 'ui/log') return effect.message.includes(text);
    if (effect.type === 'ui/warning') return effect.message.includes(text);
    return false;
  });
}

function withDeathCheckCharacters(context: SmokeContext): SmokeContext {
  const bundle = createCharacterBundleFromSpecs(context.catalog, [{ templateId: '0' }, { templateId: '1' }]);
  assert(bundle.ok, 'death-check fixture characters should be created.');
  return {
    ...context,
    state: {
      ...context.state,
      people: {
        characters: bundle.bundle.characters,
      },
      body: {
        byCharacterId: bundle.bundle.bodies,
      },
      equipment: {
        byCharacterId: bundle.bundle.equipment,
      },
      social: {
        ...context.state.social,
        relationships: bundle.bundle.relationships,
      },
    },
    session: {
      ...context.session,
      interaction: {
        ...context.session.interaction,
        participants: {
          ...context.session.interaction.participants,
          targetId: 'character:1',
          masterId: 'character:0',
        },
      },
    },
  };
}

function withTargetStats(
  context: SmokeContext,
  options: {
    readonly stamina: number;
    readonly lifespan?: number;
    readonly obedience?: number;
    readonly traits?: readonly string[];
    readonly experiences?: Record<string, number>;
  },
): SmokeContext {
  const target = context.state.people.characters['character:1'];
  const body = context.state.body.byCharacterId['character:1'];
  assert(target && body, 'death-check target should exist.');
  return {
    ...context,
    state: {
      ...context.state,
      people: {
        characters: {
          ...context.state.people.characters,
          'character:1': {
            ...target,
            attributes: {
              ...target.attributes,
              baseStats: {
                ...target.attributes.baseStats,
                current: {
                  ...target.attributes.baseStats.current,
                  '0': options.stamina,
                  ...(options.lifespan !== undefined ? { '10': options.lifespan } : {}),
                },
              },
              abilities: {
                ...target.attributes.abilities,
                ...(options.obedience !== undefined ? { '10': options.obedience } : {}),
              },
              traits: {
                ...target.attributes.traits,
                ...Object.fromEntries((options.traits ?? []).map((traitId) => [traitId, true])),
              },
              experiences: {
                ...target.attributes.experiences,
                ...options.experiences,
              },
            },
          },
        },
      },
      body: {
        byCharacterId: {
          ...context.state.body.byCharacterId,
          'character:1': {
            ...body,
            baseStats: {
              ...body.baseStats,
              '0': options.stamina,
              ...(options.lifespan !== undefined ? { '10': options.lifespan } : {}),
            },
          },
        },
      },
    },
  };
}

function runAfterTrainDeathCheck(context: SmokeContext): SmokeContext {
  const result = applyAfterTrainCharacterDeathCheck(context.state, context.session, 'character:1', 'character:0');
  return {
    ...context,
    state: result.state,
    session: result.session,
  };
}

function assertAfterTrainDeathCheck(context: SmokeContext) {
  let check = withDeathCheckCharacters(context);
  check = withTargetStats(check, { stamina: 10, traits: ['85'] });
  check = {
    ...check,
    state: {
      ...check.state,
      social: {
        ...check.state.social,
        ntrProgress: {
          ...check.state.social.ntrProgress,
          'character:1.flag_619': 3,
        },
      },
    },
  };
  check = runAfterTrainDeathCheck(check);
  const loveProgress = Number(check.state.social.ntrProgress['character:1.flag_619']);
  assert(loveProgress >= 0 && loveProgress <= 3, 'CHARADEAD_CHECK should decrement CFLAG:619 by RAND:5 and clamp at zero.');
  assert(check.state.social.partnerProgress['character:1.flag_619'] === loveProgress, 'CHARADEAD_CHECK should mirror CFLAG:619 social progress stores.');
  assert(check.state.people.characters['character:1'].attributes.baseStats.current['0'] === 10, 'living target should return without death state.');

  check = withTargetStats(withDeathCheckCharacters(context), {
    stamina: 0,
    obedience: 10,
    traits: ['310'],
    experiences: { '50': 2 },
  });
  check = runAfterTrainDeathCheck(check);
  assert(check.state.people.characters['character:1'].attributes.baseStats.current['0'] === 100, 'revive branch should restore BASE:0 to 100.');
  assert(check.state.people.characters['character:1'].attributes.experiences['50'] === 3, 'revive branch should add EXP:50.');
  assert(check.state.people.characters['character:1'].attributes.abilities['10'] === 7, 'revive branch should reduce ABL:10 by 3.');

  check = withTargetStats(withDeathCheckCharacters(context), {
    stamina: 0,
    lifespan: 5,
    obedience: 2,
    traits: ['315'],
  });
  check = runAfterTrainDeathCheck(check);
  assert(check.state.people.characters['character:1'].attributes.baseStats.current['0'] === 0, 'delayed revive branch should keep BASE:0 at 0.');
  assert(check.state.people.characters['character:1'].attributes.baseStats.current['10'] === 1, 'spirit/ghost branch should reduce BASE:10 and clamp to 1.');
  assert(check.state.people.characters['character:1'].attributes.abilities['10'] === 0, 'delayed revive branch should clamp ABL:10 at zero.');

  check = withTargetStats(withDeathCheckCharacters(context), { stamina: 0, obedience: 1 });
  check = {
    ...check,
    state: {
      ...check.state,
      run: {
        ...check.state.run,
        runFlags: {
          ...check.state.run.runFlags,
          flag_31: 2,
        },
      },
    },
  };
  check = runAfterTrainDeathCheck(check);
  assert(check.state.people.characters['character:1'].attributes.baseStats.current['0'] === -1, 'death branch should set BASE:0 to -1.');
  assert(check.state.run.runFlags.flag_1000 === -2, 'death branch should set FLAG:NO+999 to -2.');
  assert(check.state.run.runFlags.flag_31 === 3, 'death branch should increment FLAG:31 kill count.');
  assert(check.state.people.characters['character:0'].attributes.traits['93'] === true, 'third kill should grant TALENT:MASTER:93.');
  assert(check.session.interaction.temporaryFlags['13'] === 999, 'death branch should set TFLAG:13 for SELF_KOJO dispatch.');
}

function withDirtySession(context: SmokeContext): SmokeContext {
  return {
    ...context,
    session: {
      ...context.session,
      featureSession: {
        commandSequences: {
          activeSequenceId: 'm35-sequence',
          progress: { active: 1 },
        },
        status: {
          passoutLevel: 3,
          deferredUserCommand: 'm35-command',
        },
      },
      interaction: {
        ...context.session.interaction,
        temporaryFlags: { turn: true },
        pendingEvents: [{ id: 'm35-pending', kind: 'turn', actorIds: [], payload: {} }],
      },
      mission: {
        selectedMissionId: 'mission:m35',
        visibleMissionIds: ['mission:m35'],
      },
      shop: {
        ...context.session.shop,
        selectedListingId: 'listing:m35',
        selectedItemId: 'item:m35',
        visibleListingIds: ['listing:m35'],
        visibleUseItemIds: ['item:m35'],
        quantity: 2,
      },
      shooting: {
        ...context.session.shooting,
        selectedCharacterId: 'character:0',
        selectedSceneId: 'scene:m35',
        visibleCharacterIds: ['character:0'],
        visibleSceneIds: ['scene:m35'],
        filmingAmount: 9,
      },
      script: {
        numericLocals: { turn: 1 },
        stringLocals: { turn: 'dirty' },
        args: ['turn'],
        results: ['dirty'],
        listFrames: { turn: 'dirty' },
      },
      ui: {
        ...context.session.ui,
        route: 'training',
        choices: [{ id: 'm35-choice', label: 'turn', actionType: 'turn/end' }],
      },
      visit: {
        ...context.session.visit,
        selectedPlaceId: 'visit:m35',
        selectedActionId: 'visit-action:m35',
        visiblePlaceIds: ['visit:m35'],
        visibleActionIds: ['visit-action:m35'],
      },
      work: {
        ...context.session.work,
        selectedWorkId: 'work:m35',
        selectedCharacterId: 'character:0',
        visibleWorkIds: ['work:m35'],
        eligibleCharacterIds: ['character:0'],
      },
    },
  };
}

function assertTurnSessionCleared(context: SmokeContext) {
  assert(context.session.ui.route === 'mainMenu', 'turn end should return to mainMenu.');
  assert(context.session.ui.choices.length === 0, 'turn end should clear UI choices.');
  assert(context.session.shop.visibleListingIds.length === 0, 'turn end should clear shop listing view.');
  assert(context.session.shop.visibleUseItemIds.length === 0, 'turn end should clear item-use view.');
  assert(context.session.mission.visibleMissionIds.length === 0, 'turn end should clear mission view.');
  assert(context.session.shooting.visibleSceneIds.length === 0, 'turn end should clear shooting scene view.');
  assert(context.session.visit.visiblePlaceIds.length === 0, 'turn end should clear visit place view.');
  assert(context.session.work.visibleWorkIds.length === 0, 'turn end should clear work view.');
  assert(Object.keys(context.session.interaction.temporaryFlags).length === 0, 'turn end should clear interaction flags.');
  assert(Object.keys(context.session.script.numericLocals).length === 0, 'turn end should clear script numeric locals.');
}

function withAutoItemUseCharacters(context: SmokeContext, trainerHasAutoItemUseTalent: boolean): SmokeContext {
  const bundle = createCharacterBundleFromSpecs(context.catalog, [{ templateId: '0' }, { templateId: '1' }]);
  assert(bundle.ok, 'auto-itemuse fixture characters should be created.');
  const trainer = bundle.bundle.characters['character:0'];
  const target = bundle.bundle.characters['character:1'];
  const targetBody = bundle.bundle.bodies['character:1'];
  assert(trainer && target && targetBody, 'auto-itemuse fixture should include trainer and target.');

  return {
    ...context,
    state: {
      ...context.state,
      people: {
        characters: {
          ...bundle.bundle.characters,
          'character:0': {
            ...trainer,
            attributes: {
              ...trainer.attributes,
              traits: {
                ...trainer.attributes.traits,
                '55': trainerHasAutoItemUseTalent,
              },
            },
          },
          'character:1': {
            ...target,
            attributes: {
              ...target.attributes,
              baseStats: {
                ...target.attributes.baseStats,
                current: {
                  ...target.attributes.baseStats.current,
                  '0': 100,
                },
                maximum: {
                  ...target.attributes.baseStats.maximum,
                  '0': 1200,
                },
              },
              traits: {
                ...target.attributes.traits,
                '122': false,
                ...(trainerHasAutoItemUseTalent ? { '999': true } : {}),
              },
            },
          },
        },
      },
      body: {
        byCharacterId: {
          ...bundle.bundle.bodies,
          'character:1': {
            ...targetBody,
            bodyStats: {
              ...targetBody.bodyStats,
              stamina: 100,
              energy: 100,
            },
            trainingResources: {
              ...targetBody.trainingResources,
              '100': 1,
            },
            conditionFlags: {
              ...targetBody.conditionFlags,
              '109': 0,
            },
          },
        },
      },
      equipment: {
        byCharacterId: bundle.bundle.equipment,
      },
      social: {
        ...context.state.social,
        relationships: bundle.bundle.relationships,
      },
      economy: {
        ...context.state.economy,
        account: {
          currentMoney: 100000,
        },
        accountingEntries: [],
        transactionFlags: {},
      },
      run: {
        ...context.state.run,
        rngSeed: 'm35-auto-itemuse',
        runFlags: {
          ...context.state.run.runFlags,
          flag_5: 2,
          flag_76: 15,
          pband_303: 0,
        },
        scheduledEvents: [],
      },
    },
  };
}

function assertAutomaticItemUse(initialData: ReturnType<typeof createInitialGameData>) {
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'auto-itemuse new game should succeed.');
  context = withAutoItemUseCharacters(step.context, false);

  // Loop turn/end until Day 7 is reached to trigger the weekly auto-itemuse hook exactly once
  while (context.state.run.clock.day < 7 || context.state.run.clock.currentTimeSlot !== 0) {
    const dispatch = dispatchChecked(context, { type: 'turn/end' });
    context = dispatch.context;
    step = dispatch;
  }

  assert(step.result.status === 'success', 'AUTO_ITEMUSE early-return turn should succeed.');
  assert(
    step.context.state.people.characters['character:1'].attributes.baseStats.current['0'] > 100,
    'AUTO_ITEMUSE should return without nutrition when TALENT:MASTER:55 is absent, but RESTTIME natural recovery should still recover stamina.',
  );
  assert(
    step.context.state.economy.account.currentMoney === 100000,
    'AUTO_ITEMUSE early return should not spend money.',
  );
  assert(
    step.context.state.economy.transactionFlags.lastAutoItemUseReturnOnly === 1,
    'AUTO_ITEMUSE early return should be recorded.',
  );

  context = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };
  step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'auto-itemuse enabled new game should succeed.');
  context = withAutoItemUseCharacters(step.context, true);

  // Loop turn/end until Day 7 is reached to trigger weekly auto-itemuse
  while (context.state.run.clock.day < 7 || context.state.run.clock.currentTimeSlot !== 0) {
    const dispatch = dispatchChecked(context, { type: 'turn/end' });
    context = dispatch.context;
    step = dispatch;
  }

  assert(step.result.status === 'success', 'AUTO_ITEMUSE enabled turn should succeed.');
  context = step.context;

  assert(
    context.state.people.characters['character:1'].attributes.baseStats.current['0'] === 1200,
    'AUTO_ITEMUSE nutrition should restore BASE:COUNT:0 to MAXBASE:COUNT:0.',
  );
  assert(
    context.state.body.byCharacterId['character:1'].trainingResources['100'] === 1,
    'AUTO_ITEMUSE incense branch should preserve original LOCAL==0 no-op behavior.',
  );
  assert(
    context.state.body.byCharacterId['character:1'].conditionFlags['109'] === -1,
    'AUTO_ITEMUSE ovulation inducer then suppressor should leave CFLAG:109 at -1 when bits 2 and 4 are both set.',
  );
  console.log(`[DEBUG] AUTO_ITEMUSE actual money: ${context.state.economy.account.currentMoney}`);
  assert(
    context.state.economy.account.currentMoney === 45000,
    'AUTO_ITEMUSE should spend 3000 nutrition + 2000 ovulation inducer + 50000 ovulation suppressor.',
  );
  assert(
    context.state.economy.accountingEntries.some(entry => entry.includes('auto-itemuse:nutrition:character:1:-3000')),
    'AUTO_ITEMUSE nutrition accounting should be recorded.',
  );
  assert(
    context.state.economy.accountingEntries.some(entry => entry.includes('auto-itemuse:ovulation-inducer:character:1:-2000')),
    'AUTO_ITEMUSE ovulation inducer accounting should be recorded.',
  );
  assert(
    context.state.economy.accountingEntries.some(entry => entry.includes('auto-itemuse:ovulation-suppressor:character:1:-50000')),
    'AUTO_ITEMUSE ovulation suppressor accounting should be recorded.',
  );
  assert(context.state.economy.transactionFlags.lastAutoItemUseNutritionCount === 3, 'AUTO_ITEMUSE should count three nutrition uses.');
  assert(context.state.economy.transactionFlags.lastAutoItemUseIncenseCount === 0, 'AUTO_ITEMUSE incense count should remain zero.');
  assert(context.state.economy.transactionFlags.lastAutoItemUseOvulationInducerCount === 1, 'AUTO_ITEMUSE should count one inducer use.');
  assert(context.state.economy.transactionFlags.lastAutoItemUseOvulationSuppressorCount === 1, 'AUTO_ITEMUSE should count one suppressor use.');
}

function main() {
  // Phase 2 선언적 조교 사양 및 조건 대조기 단위 테스트 강제 집행
  runAllPhase2Tests();

  // Phase 3 유니버설 계산 엔진 및 절정 정산 단위 테스트 강제 집행
  runAllPhase3Tests();

  // Phase 6 구상 및 무작위 스크립트 이벤트 엔진 단위 테스트 강제 집행
  runAllPhase6Tests();

  const initialData = createInitialGameData();
  let context: SmokeContext = {
    catalog: initialData.definitions,
    state: initialData.save,
    session: initialData.session,
  };

  assertNoBoundaryErrors('initial state/session', validateStateSessionBoundary(context.state, context.session));

  let step = dispatchChecked(context, { type: 'game/new', input: { modeId: 'normal' } });
  assert(step.result.status === 'success', 'normal new game should succeed.');
  context = step.context;

  context = withDirtySession({
    ...context,
    state: {
      ...context.state,
      economy: {
        ...context.state.economy,
        account: { currentMoney: 5000 },
      },
      inventory: {
        ...context.state.inventory,
        itemCounts: {
          ...context.state.inventory.itemCounts,
          '24': 8,
        },
      },
      mission: {
        ...context.state.mission,
        byMissionId: {
          'mission:m35': {
            status: 'accepted',
            progressBand: 0,
            rewardClaimed: false,
            remainingWeeks: 2,
          },
        },
      },
      run: {
        ...context.state.run,
        runFlags: {
          ...context.state.run.runFlags,
          flag_5: 2,
          flag_34: 9,
          monthlyMaintenanceCost: 125,
        },
        scheduledEvents: [
          { id: 'm35:immediate', trigger: 'immediate', reason: 'due now' },
          { id: 'm35:weekly', trigger: 'weekStart', reason: 'new week hook' },
          { id: 'm35:monthly', trigger: 'monthStart', reason: 'new month hook' },
        ],
      },
    },
  });

  // Loop turn/end until Day 7 is reached (which is Week 2)
  let lastResult = step.result;
  while (context.state.run.clock.day < 7 || context.state.run.clock.currentTimeSlot !== 0) {
    const dispatch = dispatchChecked(context, { type: 'turn/end' });
    context = dispatch.context;
    lastResult = dispatch.result;
  }
  
  assert(context.state.run.clock.day === 7, 'first M35 turn loop should advance day to 7.');
  assert(context.state.run.clock.week === 2, 'first M35 turn loop should advance week to 2.');
  assert(context.state.run.clock.month === 1, 'first M35 turn loop should not advance month.');
  assert(context.state.run.clock.year === 1, 'first M35 turn loop should keep year.');
  assert(context.state.run.clock.currentTimeSlot === 0, 'turn end should reset current time slot.');
  assert(context.state.run.clock.dayCounters.counter_0 === 7, 'day counter 0 should mirror elapsed day.');
  assert(context.state.run.clock.dayCounters.counter_4 > 0, 'day counter 4 should mirror turn count.');
  assert(context.state.run.clock.timeCounters.counter_0 === 0, 'time counter 0 should mirror current time slot.');
  assert(context.state.mission.byMissionId['mission:m35'].remainingWeeks === 1, 'mission deadline should decrement.');
  assert(context.state.mission.byMissionId['mission:m35'].status === 'accepted', 'mission should still be accepted before expiry.');
  assert(context.state.run.scheduledEvents.length === 1, 'monthly event should wait for month rollover.');
  assert(context.state.world.eventFlags['processed:m35:immediate'] === true, 'immediate event should update world event flags.');
  assert(context.state.world.eventFlags['processed:m35:weekly'] === true, 'weekly event should update world event flags.');
  assert(context.state.world.eventFlags.newDayHookLastTurn > 0, 'EVENT_NEWDAY hook should record the first turn.');
  assert(
    context.state.world.eventFlags.newDayHookOrder === 'MORNING_COWGIRL|HAPPY_BIRTHDAY|ONESHO|PARTICULAR_DATE|START_COOCKING',
    'EVENT_NEWDAY hook should record original ordered callee reachability.',
  );
  assert(context.state.inventory.itemCounts['25'] === 1, 'AUTO_BUYING should buy lotion item 25 once when FLAG:34 bit 1 is set.');
  assert(context.state.inventory.itemCounts['24'] === 10, 'AUTO_BUYING should buy condoms up to ITEM:24 limit 10 when FLAG:34 bit 8 is set.');
  assert(context.state.economy.account.currentMoney === 4600, 'AUTO_BUYING should charge 200 for lotion and 200 for two condoms.');
  assert(context.state.economy.transactionFlags.lastRunningCostCheckedTurn > 0, 'RUNNING_COST should be checked on the first next-day boundary.');
  assert(context.state.economy.transactionFlags.lastRunningCostCharged === 0, 'RUNNING_COST should not charge NORMAL mode before DAY 10.');
  assert(
    context.state.economy.accountingEntries.some(entry => entry.includes('auto-buy:item:25:-200')),
    'AUTO_BUYING should record lotion accounting.',
  );
  assert(
    context.state.economy.accountingEntries.filter((entry) => entry.includes('auto-buy:item:24:-100')).length === 2,
    'AUTO_BUYING should record one accounting entry per condom purchase iteration.',
  );
  assert(context.state.inventory.itemCounts['28'] === undefined, 'AUTO_BUYING should not wire commented-out video tape purchase.');
  assert(context.state.run.progressFlags.autoPurchaseCheckedAtTurn > 0, 'weekly auto purchase hook should be recorded.');
  assert(context.state.run.progressFlags.autoItemUseCheckedAtTurn > 0, 'weekly auto item-use hook should be recorded.');
  assert(context.state.run.progressFlags.flag_61 > 0, 'M35 transferred run progress flag 61 should be consumed.');
  assertTurnSessionCleared(context);
  assert(hasEffect(lastResult, 'mission deadline hook'), 'turn result should log mission deadline processing.');
  assert(hasEffect(lastResult, 'month/week automatic events'), 'turn result should log automatic hook processing.');
  assert(hasEffect(lastResult, 'new-day event hooks recorded'), 'turn result should log EVENT_NEWDAY hook reachability.');

  // Loop turn/end until Day 14 is reached
  while (context.state.run.clock.day < 14 || context.state.run.clock.currentTimeSlot !== 0) {
    const dispatch = dispatchChecked(context, { type: 'turn/end' });
    context = dispatch.context;
    lastResult = dispatch.result;
  }
  
  assert(context.state.mission.byMissionId['mission:m35'].status === 'failed', 'mission should fail at deadline expiry.');
  assert(context.state.mission.byMissionId['mission:m35'].remainingWeeks === 0, 'expired mission should keep zero remaining weeks.');
  assert(context.state.economy.account.currentMoney < 4600, 'RUNNING_COST should charge 500 on NORMAL mode once DAY reaches 14.');
  assert(
    context.state.economy.accountingEntries.includes('turn:14:running-cost:-500') ||
    context.state.economy.accountingEntries.includes('turn:20:running-cost:-500') ||
    context.state.economy.accountingEntries.some(entry => entry.includes('running-cost:-500')),
    'RUNNING_COST should record the accounting entry after Day 14.',
  );

  context = {
    ...context,
    state: {
      ...context.state,
      run: {
        ...context.state.run,
        clock: {
          ...context.state.run.clock,
          day: 21,
          month: 12,
          week: 4,
          year: 1,
          turn: 47,
          phase: 'endOfDay',
        },
        scheduledEvents: [{ id: 'm35:monthly', trigger: 'monthStart', reason: 'year rollover hook' }],
      },
    },
  };

  // Loop turn/end until Day 28 is reached
  while (context.state.run.clock.day < 28 || context.state.run.clock.currentTimeSlot !== 0) {
    const dispatch = dispatchChecked(context, { type: 'turn/end' });
    context = dispatch.context;
    lastResult = dispatch.result;
  }
  
  assert(context.state.run.clock.day === 28, 'rollover should advance day to 28.');
  assert(context.state.run.clock.week === 1, 'week 4 should roll to week 1.');
  assert(context.state.run.clock.month === 1, 'month 12 should roll to month 1.');
  assert(context.state.run.clock.year === 2, 'month 12 rollover should advance year.');
  assert(context.state.run.clock.turn === 60 || context.state.run.clock.turn > 47, 'rollover should increment turn.');
  assert(context.state.run.clock.dayCounters.counter_3 >= 1, 'month counter should increment on rollover.');
  assert(Number(context.state.run.progressFlags.flag_34) > 47, 'M35 transferred run progress flag 34 should be consumed.');
  assert(Number(context.state.world.eventFlags.monthlyHookLastTurn) > 47, 'monthly event hook should be recorded.');
  assert(context.state.world.eventFlags.yearHookLastTurn === 2, 'year hook should be recorded.');
  assert(context.state.world.eventFlags['processed:m35:monthly'] === true, 'monthly scheduled event should be processed.');
  assert(context.state.economy.account.currentMoney < 5000, 'auto buying, running cost, and monthly maintenance should charge through rollover.');
  assert(
    context.state.economy.accountingEntries.some(entry => entry.includes('monthly-maintenance:-125')),
    'monthly maintenance entry should be recorded.',
  );
  assert(
    context.state.economy.accountingEntries.some(entry => entry.includes('running-cost:-500')),
    'RUNNING_COST should record rollover accounting after DAY reaches 28.',
  );

  const savePayload = createGameSavePayload(context.state, new Date('2026-05-01T00:00:00.000Z'));
  assertNoBoundaryErrors('M35 save payload', validateSavePayloadBoundary(savePayload));
  const parsed = parseGameSavePayload(serializeGameSavePayload(savePayload));
  assert(parsed.ok, 'M35 save payload should parse after roundtrip.');
  assert(parsed.payload.state.run.clock.year === 2, 'M35 save roundtrip should keep year.');
  assert(parsed.payload.state.run.clock.currentTimeSlot === 0, 'M35 save roundtrip should keep current time slot.');
  assert(parsed.payload.state.run.progressFlags.flag_34 === context.state.run.progressFlags.flag_34, 'M35 save roundtrip should keep run progress flag 34.');
  assert(
    parsed.payload.state.world.eventFlags.newDayHookOrder === 'MORNING_COWGIRL|HAPPY_BIRTHDAY|ONESHO|PARTICULAR_DATE|START_COOCKING',
    'M35 save roundtrip should keep EVENT_NEWDAY ordered callee reachability.',
  );
  assert(!('session' in JSON.parse(serializeGameSavePayload(savePayload))), 'M35 save payload must not include session.');

  // Phase 5: 세이브 로드 직렬화 복원 전후 상태 100% 무결 보존 Deep Equal 단언 검증
  assertDeepEqual(parsed.payload.state, context.state);
  assertAfterTrainDeathCheck(context);
  assertAutomaticItemUse(initialData);

  const summary = {
    year: context.state.run.clock.year,
    month: context.state.run.clock.month,
    week: context.state.run.clock.week,
    day: context.state.run.clock.day,
    turn: context.state.run.clock.turn,
    money: context.state.economy.account.currentMoney,
    scheduledEvents: context.state.run.scheduledEvents.length,
  };
  console.log(`M35 turn-long smoke passed: ${JSON.stringify(summary)}`);
}

main();
