import { executeTrainingCommand } from './engine';
import type { GameState, GameSession } from '../../game/state';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

// 1. Mock Context 팩토리
function createMockContext(options: {
  readonly traits?: Record<string, boolean | number | string>;
  readonly abilities?: Record<string, number>;
  readonly itemCounts?: Record<string, number>;
  readonly conditionParams?: Record<string, number>;
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
          conditionParams: options.conditionParams ?? {},
          conditionFlags: {},
          trainingResources: {},
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
        assistantPlay: false,
      },
    },
  };

  return { state: mockState, session: mockSession };
}

// 2. 유니버설 조교 엔진 트랜잭션 집행 단언 테스트
function testEngineTransaction() {
  console.log('[TEST] trainingEngine: executeTrainingCommand starting...');

  // Case A: 기본 비용 차감 검증 (애무 COM:0 실행)
  // 애무: staminaCost: 5, energyCost: 50. 감각 ABL 0인 상태.
  // C감각 0 보너스 = 쾌C 20 가산. 애무 baseSources에는 쾌C 없음.
  // 결과적으로 쾌C 20만 누적되며 절정은 없음.
  const { state: stateBasic, session: sessionBasic } = createMockContext({});
  const resultBasic = executeTrainingCommand(stateBasic, sessionBasic, '0');
  
  const targetChara = resultBasic.state.people.characters['character:1'];
  const targetBody = resultBasic.state.body.byCharacterId['character:1'];
  
  // 기본 소모: stamina 1000 -> 995, energy 1000 -> 950
  assert(
    targetBody.bodyStats.stamina === 995,
    `Stamina should be 995, but got ${targetBody.bodyStats.stamina}`
  );
  assert(
    targetBody.bodyStats.energy === 950,
    `Energy should be 950, but got ${targetBody.bodyStats.energy}`
  );
  // PALAM:쾌C(0) 가산: 0 + 20 = 20
  assert(
    targetBody.conditionParams['0'] === 20,
    `C-palam parameter should be 20, but got ${targetBody.conditionParams['0']}`
  );
  // postEffects: 애정경험(EXP:14) +1 검증
  assert(
    targetChara.attributes.experiences['14'] === 1,
    `Love experience (EXP:14) should increment to 1, but got ${targetChara.attributes.experiences['14']}`
  );

  // Case B: PALAM 절정(Orgasm) 1만 임계치 돌파 및 구슬/체력 소모 검증
  // 정상위(COM:20) 실행: staminaCost: 30, energyCost: 20
  // C감각 3레벨 셋업 -> 쾌C 보너스 1200가산.
  // 쾌C(0)의 기존 palam 게이지를 9000으로 셋업하면, 9000 + 1200 = 10200이 되어 절정 발생!
  const { state: stateOrgasm, session: sessionOrgasm } = createMockContext({
    abilities: { '0': 3 }, // C감각 lvl 3 (쾌C +1200)
    conditionParams: { '0': 9000 }, // 쾌C palam = 9000
  });
  
  const resultOrgasm = executeTrainingCommand(stateOrgasm, sessionOrgasm, '20');
  const targetCharaOrg = resultOrgasm.state.people.characters['character:1'];
  const targetBodyOrg = resultOrgasm.state.body.byCharacterId['character:1'];

  // C절정 1회 발생으로 기존 palam 10200은 나머지 200이 남음
  assert(
    targetBodyOrg.conditionParams['0'] === 200,
    `Orgasm palam remainder should be 200, but got ${targetBodyOrg.conditionParams['0']}`
  );
  // 체력 소모: 기본 30 + 절정 1회당 100 추가 소모 => 총 130 소모. 1000 - 130 = 870
  assert(
    targetBodyOrg.bodyStats.stamina === 870,
    `Stamina with orgasm penalty should be 870, but got ${targetBodyOrg.bodyStats.stamina}`
  );
  // 경험치 가산: 절정경험(EXP:2) +1 및 C절정경험(EXP:0) +1
  assert(
    targetCharaOrg.attributes.experiences['2'] === 1,
    `Orgasm count should be 1, but got ${targetCharaOrg.attributes.experiences['2']}`
  );
  assert(
    targetCharaOrg.attributes.experiences['34'] === 1,
    `C-orgasm count should be 1, but got ${targetCharaOrg.attributes.experiences['34']}`
  );
  // 구슬(JUEL:0) 적립: 절정 1회당 1000개 즉시 적립
  assert(
    targetBodyOrg.trainingResources['0'] === 1000,
    `C-juel (JUEL:0) earned should be 1000, but got ${targetBodyOrg.trainingResources['0']}`
  );

  console.log('[TEST] trainingEngine: executeTrainingCommand passed.');
}

// 3. 자가 실행 러너 Entry
export function runAllPhase3Tests() {
  console.log('=== PHASE 3 UNIT TESTS START ===');
  testEngineTransaction();
  console.log('=== PHASE 3 UNIT TESTS SUCCESS ===');
}
