import { checkCommandAvailability } from './availability';
import { applySensoryLevelBonus, applyTalentModifiers } from './modifiers';
import type { GameState, GameSession } from '../../game/state';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

// 1. Mock Game State & Session 팩토리
function createMockContext(options: {
  readonly traits?: Record<string, boolean | number | string>;
  readonly abilities?: Record<string, number>;
  readonly itemCounts?: Record<string, number>;
  readonly assistantPlay?: boolean;
}): { readonly state: GameState; readonly session: GameSession } {
  const targetId = 'character:1';
  const trainerId = 'character:0';

  const mockState: any = {
    people: {
      characters: {
        [trainerId]: {
          id: trainerId,
          name: 'Player',
          roles: ['trainer', 'player'],
          attributes: {
            traits: {},
            abilities: {},
            experiences: {},
          },
        },
        [targetId]: {
          id: targetId,
          name: 'Target Actress',
          roles: ['actress'],
          attributes: {
            traits: options.traits ?? {},
            abilities: options.abilities ?? {},
            experiences: {},
          },
        },
      },
    },
    body: {
      byCharacterId: {
        [targetId]: {
          bodyStats: { stamina: 1000, energy: 1000 },
          conditionFlags: {},
        },
      },
    },
    inventory: {
      itemCounts: options.itemCounts ?? {},
    },
    run: {
      progressFlags: {},
      runFlags: {},
    },
  };

  const mockSession: any = {
    interaction: {
      participants: {
        targetId,
        masterId: trainerId,
        assistantPlay: options.assistantPlay ?? false,
      },
    },
  };

  return { state: mockState, session: mockSession };
}

// 2. Availability 필터 단언 검증 테스트
function testCommandAvailability() {
  console.log('[TEST] trainingAvailability: checkCommandAvailability starting...');

  // Case A: 남성(TALENT:122)일 때 커닐링구스(COM_1) 실행 불가 검증
  const { state: stateMale, session: sessionMale } = createMockContext({
    traits: { '122': true },
  });
  assert(
    checkCommandAvailability('1', stateMale, sessionMale) === false,
    'Cunnilingus (COM:1) must be UNAVAILABLE for male targets.'
  );

  // Case B: 일반 여성일 때 커닐링구스(COM_1) 실행 가능 검증
  const { state: stateFemale, session: sessionFemale } = createMockContext({
    traits: { '122': false },
  });
  assert(
    checkCommandAvailability('1', stateFemale, sessionFemale) === true,
    'Cunnilingus (COM:1) must be AVAILABLE for female targets.'
  );

  // Case C: 로터 도구(ITEM:20)가 없을 때 로터(COM_10) 실행 불가 검증
  const { state: stateNoLotor, session: sessionNoLotor } = createMockContext({
    itemCounts: { '20': 0 },
  });
  assert(
    checkCommandAvailability('10', stateNoLotor, sessionNoLotor) === false,
    'Lotor (COM:10) must be UNAVAILABLE when Lotor tool is absent.'
  );

  // Case D: 로터 도구(ITEM:20)가 있을 때 로터(COM_10) 실행 가능 검증
  const { state: stateHasLotor, session: sessionHasLotor } = createMockContext({
    itemCounts: { '20': 1 },
  });
  assert(
    checkCommandAvailability('10', stateHasLotor, sessionHasLotor) === true,
    'Lotor (COM:10) must be AVAILABLE when Lotor tool is present.'
  );

  console.log('[TEST] trainingAvailability: checkCommandAvailability passed.');
}

// 3. 감각 레벨 및 소질 보정기 곱셈 공식 단언 검증 테스트
function testModifiers() {
  console.log('[TEST] trainingModifiers: sensory and talent multipliers starting...');

  // Case A: ABL:C감각 = 3일 때의 쾌C 기본 가산 검증
  const { state, session } = createMockContext({
    abilities: { '0': 3 }, // C감각 레벨 3
  });
  const rawSources = { '0': 100 }; // 쾌C 기본 100
  const bonusSources = applySensoryLevelBonus(state.people.characters['character:1'].attributes.abilities, rawSources);
  // C감각 3레벨 보너스 = 1200 이므로 100 + 1200 = 1300
  assert(
    bonusSources['0'] === 1300,
    `Sensory bonus at C-sense lvl 3 should be 1300, but got ${bonusSources['0']}`
  );

  // Case B: 조교자의 '혀놀림' (TALENT:52) 소질에 따른 쾌C 2배 곱셈 검증
  const mockTongueTrainer: any = {
    ...state,
    people: {
      characters: {
        ...state.people.characters,
        'character:0': {
          ...state.people.characters['character:0'],
          attributes: {
            ...state.people.characters['character:0'].attributes,
            traits: { '52': true }, // 혀놀림 true
          },
        },
      },
    },
  };
  const multiplierSources = applyTalentModifiers(
    mockTongueTrainer,
    session,
    'character:1',
    'character:0',
    { '0': 500 }
  );
  // 500 * 2.0 = 1000
  assert(
    multiplierSources['0'] === 1000,
    `Tongue modifier should multiply 쾌C by 2.0 to get 1000, but got ${multiplierSources['0']}`
  );

  // Case C: 조교 대상의 '연모' (TALENT:85) 소질에 따른 정애 2배 및 불결 1/10 경감 검증
  const { state: stateLove, session: sessionLove } = createMockContext({
    traits: { '85': true }, // 연모 true
  });
  const rawSourcesLove = {
    '12': 100, // 정애 100
    '24': 500, // 불결 500
  };
  const resultSourcesLove = applyTalentModifiers(
    stateLove,
    sessionLove,
    'character:1',
    'character:0',
    rawSourcesLove
  );
  // 정애 2배 (100 * 2 = 200), 불결 1/10 (500 / 10 = 50)
  assert(
    resultSourcesLove['12'] === 200,
    `Love trait should multiply affinity source by 2.0 to get 200, but got ${resultSourcesLove['12']}`
  );
  assert(
    resultSourcesLove['24'] === 50,
    `Love trait should divide dirty source by 10 to get 50, but got ${resultSourcesLove['24']}`
  );

  console.log('[TEST] trainingModifiers: sensory and talent multipliers passed.');
}

// 4. 자가 실행 러너 Entry
export function runAllPhase2Tests() {
  console.log('=== PHASE 2 UNIT TESTS START ===');
  testCommandAvailability();
  testModifiers();
  console.log('=== PHASE 2 UNIT TESTS SUCCESS ===');
}
