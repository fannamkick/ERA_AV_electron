import { executeKojoMatching } from './engine';
import { executeScriptEvents } from '../events/engine';
import type { GameState, GameSession } from '../../game/state';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

// Mock Context 팩토리
function createMockContext(options: {
  readonly traits?: Record<string, boolean | number | string>;
  readonly abilities?: Record<string, number>;
  readonly conditionFlags?: Record<string, number>;
}): { readonly state: GameState; readonly session: GameSession } {
  const targetId = 'character:1';
  const trainerId = 'character:0';

  const mockState: any = {
    people: {
      characters: {
        [trainerId]: {
          id: trainerId,
          roles: ['trainer', 'player'],
          identity: {
            templateId: '0',
            displayName: 'Player',
            profileTextSlots: {},
          },
          attributes: {
            traits: {},
            abilities: {},
            experiences: {},
          },
        },
        [targetId]: {
          id: targetId,
          roles: ['actress'],
          identity: {
            templateId: '1', // 캐릭터 템플릿 ID '1'
            displayName: 'Target Actress',
            profileTextSlots: {},
          },
          attributes: {
            traits: options.traits ?? {},
            abilities: options.abilities ?? {},
            experiences: {},
            baseStats: {
              current: { '0': 1000, '1': 1000 },
              maximum: { '0': 1000, '1': 1000 },
            },
          },
        },
      },
    },
    body: {
      byCharacterId: {
        [targetId]: {
          bodyStats: { stamina: 1000, energy: 1000 },
          conditionParams: {},
          conditionFlags: options.conditionFlags ?? {},
          trainingResources: {},
        },
      },
    },
    text: {
      characterTextEntries: {},
    },
    social: {
      relationships: {},
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
        assistantPlay: false,
      },
    },
  };

  return { state: mockState, session: mockSession };
}

// 1. Kojo Engine 검증
function testKojoEngine() {
  console.log('[TEST] kojoEngine: executeKojoMatching starting...');

  // Case A: 처녀막 상실 V절정 구상 대사 트리거 검증
  // targetId = 'character:1', traits['0'] = true (처녀), commandId = '20' (정상위), isVirginVOrgasm = true
  const { state: stateVirgin, session: sessionVirgin } = createMockContext({
    traits: { '0': true }, // 처녀
  });

  const nextStateVirgin = executeKojoMatching(stateVirgin, sessionVirgin, 'character:1', {
    commandId: '20',
    isVirginVOrgasm: true,
  });

  const textEntryVirgin = nextStateVirgin.text.characterTextEntries['character:1'];
  assert(textEntryVirgin !== undefined, 'Character text entry should exist for character:1');
  assert(
    textEntryVirgin.current === '아앗... 처음인데.. 안에 기분좋은게 가득해서.. 흐앗, 처녀막이 찢어져버렷...!',
    `Expected virgin v orgasm dialogue, but got: ${textEntryVirgin.current}`
  );

  // Case B: 고복종 정상위 대사 트리거 검증
  // targetId = 'character:1', 복종 ABL:10 = 3, commandId = '20' (정상위)
  const { state: stateHighOb, session: sessionHighOb } = createMockContext({
    traits: { '0': false }, // 비처녀
    abilities: { '10': 3 }, // 복종 3레벨
  });

  const nextStateHighOb = executeKojoMatching(stateHighOb, sessionHighOb, 'character:1', {
    commandId: '20',
  });

  const textEntryHighOb = nextStateHighOb.text.characterTextEntries['character:1'];
  assert(
    textEntryHighOb.current === '하앗! 주인님, V조교는 너무 가버려요...!',
    `Expected high obedience dialogue, but got: ${textEntryHighOb.current}`
  );

  // Case C: 기본 정상위 대사 트리거 검증
  // targetId = 'character:1', 복종 ABL:10 = 0, commandId = '20'
  const { state: stateDefault, session: sessionDefault } = createMockContext({
    traits: { '0': false },
    abilities: { '10': 0 },
  });

  const nextStateDefault = executeKojoMatching(stateDefault, sessionDefault, 'character:1', {
    commandId: '20',
  });

  const textEntryDefault = nextStateDefault.text.characterTextEntries['character:1'];
  assert(
    textEntryDefault.current === '안돼.. V조교는 그만해주세요..',
    `Expected default dialogue, but got: ${textEntryDefault.current}`
  );

  console.log('[TEST] kojoEngine: executeKojoMatching passed.');
}

// 2. Event Engine 검증
function testEventEngine() {
  console.log('[TEST] eventEngine: executeScriptEvents starting...');

  // CFLAG:109(배란 상태) = 1, CFLAG:110(정액 오염도) = 1
  const { state: statePreg, session: sessionPreg } = createMockContext({
    conditionFlags: {
      '109': 1, // 배란 상태
      '110': 1, // 정액 오염도 누적
    },
  });

  const { state: nextStatePreg, effects } = executeScriptEvents(statePreg, 'turnEnd');

  assert(effects.length > 0, 'Pregnancy confirmed event should trigger');
  
  const targetChara = nextStatePreg.people.characters['character:1'];
  const targetBody = nextStatePreg.body.byCharacterId['character:1'];
  const relationship = nextStatePreg.social.relationships['character:1->character:0'];

  // CFLAG:120 (임신 상태 플래그) === 1
  assert(
    targetBody.conditionFlags['120'] === 1,
    `CFLAG:120 should be 1, but got ${targetBody.conditionFlags['120']}`
  );

  // TALENT:130 (임신 소질) === true
  assert(
    targetChara.attributes.traits['130'] === true,
    `TALENT:130 should be true, but got ${targetChara.attributes.traits['130']}`
  );

  // 관계 역할에 '임신' 추가됨
  assert(
    relationship !== undefined && relationship.roles.includes('임신'),
    'Trainer relationship should include role "임신"'
  );

  console.log('[TEST] eventEngine: executeScriptEvents passed.');
}

// 3. 자가 실행 러너 Entry
export function runAllPhase6Tests() {
  console.log('=== PHASE 6 UNIT TESTS START ===');
  testKojoEngine();
  testEventEngine();
  console.log('=== PHASE 6 UNIT TESTS SUCCESS ===');
}
