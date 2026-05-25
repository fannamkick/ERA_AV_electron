import type { GameState, GameSession } from '../../game/state';
import { trainingCommandRegistry } from './registry';
import { checkCommandAvailability } from './availability';
import { applySensoryLevelBonus, applyTalentModifiers } from './modifiers';
import type { PalamSourceId } from './types';

/**
 * 선언적 조교 사양(Specs) 및Modifiers 공식을 순차적으로 집행하는
 * 공용 조교 계산 파이프라인 엔진(Universal Training Engine)입니다.
 * 모든 신체, 소질, 경험, 구슬 정산은 트랜잭션 단위로 아토믹하게 집행됩니다.
 */
export function executeTrainingCommand(
  state: GameState,
  session: GameSession,
  commandId: string
): {
  readonly state: GameState;
  readonly session: GameSession;
  readonly effects: readonly string[];
} {
  // 1. Specs 로드 및 Availability 검증
  const spec = trainingCommandRegistry[commandId];
  if (!spec) {
    throw new Error(`Training command ${commandId} not found in registry.`);
  }

  if (!checkCommandAvailability(commandId, state, session)) {
    throw new Error(`Training command ${commandId} is currently unavailable.`);
  }

  const targetId = session.interaction.participants.targetId;
  const trainerId = session.interaction.participants.masterId;
  if (!targetId || !trainerId) {
    throw new Error("No target actress or trainer player assigned in session.");
  }

  const target = state.people.characters[targetId];
  const body = state.body.byCharacterId[targetId];
  if (!target || !body) {
    throw new Error(`Target actress character or body state not found: ${targetId}`);
  }

  const effects: string[] = [];

  // 2. 기본 비용 차감 (Stamina / Energy)
  const currentStamina = Number(body.bodyStats.stamina);
  const currentEnergy = Number(body.bodyStats.energy);

  const nextStamina = Math.max(0, currentStamina - spec.staminaCost);
  const nextEnergy = Math.max(0, currentEnergy - spec.energyCost);

  // 3. 소스 누적 가산 및 Modifiers 공용 보정
  let sources = { ...spec.baseSources };
  sources = applySensoryLevelBonus(target.attributes.abilities, sources);
  sources = applyTalentModifiers(state, session, targetId, trainerId, sources);

  // 4. PALAM 게이지 누적 및 절정 판정
  const conditionParams = { ...(body.conditionParams ?? {}) };
  const experiences = { ...(target.attributes.experiences ?? {}) };
  const abilities = { ...(target.attributes.abilities ?? {}) };
  const traits = { ...(target.attributes.traits ?? {}) };
  const conditionFlags = { ...(body.conditionFlags ?? {}) };
  const trainingResources = { ...(body.trainingResources ?? {}) };

  let extraStaminaLoss = 0;
  
  // 쾌C('0'), 쾌V('1'), 쾌A('2'), 쾌B('3')
  const sensorySourceIds: ('0' | '1' | '2' | '3')[] = ['0', '1', '2', '3'];
  for (const sourceId of sensorySourceIds) {
    const rawVal = sources[sourceId] ?? 0;
    if (rawVal <= 0) continue;

    const currentPalam = Number(conditionParams[sourceId] ?? 0);
    const nextPalam = currentPalam + rawVal;

    // 10,000 게이지 이상 시 절정(Orgasm) 판정
    if (nextPalam >= 10000) {
      const orgasmCount = Math.trunc(nextPalam / 10000);
      conditionParams[sourceId] = nextPalam % 10000; // 초과한 나머지만 보존

      // 절정 횟수에 따른 추가 체력 차감 (1회당 100 소모)
      extraStaminaLoss += orgasmCount * 100;

      // 경험치 가산: 절정경험(EXP:2) 및 부위별 절정경험 가산
      experiences['2'] = (experiences['2'] ?? 0) + orgasmCount; // 절정경험 총합

      // 부위 매핑: C쾌감->C경험(EXP:34), V쾌감->V경험(EXP:0), A쾌감->A경험(EXP:1), B쾌감->B경험(EXP:35)
      const expMapping = { '0': '34', '1': '0', '2': '1', '3': '35' };
      const expId = expMapping[sourceId];
      experiences[expId] = (experiences[expId] ?? 0) + orgasmCount;

      // 구슬(JUEL) 즉시 가산: 절정 1회당 구슬 1000개 적립 (쾌B는 JUEL 17번, 나머지는 소스 번호와 동일)
      const juelMapping = { '0': '0', '1': '1', '2': '2', '3': '17' };
      const juelId = juelMapping[sourceId];
      trainingResources[juelId] = (trainingResources[juelId] ?? 0) + (orgasmCount * 1000);

      effects.push(`${spec.name} 중 절정 발생! (부위: ${sourceId}, 횟수: ${orgasmCount}회)`);
    } else {
      conditionParams[sourceId] = nextPalam;
    }
  }

  // 5. postEffects 선언적 연산자 해석 집행
  if (spec.postEffects) {
    for (const effect of spec.postEffects) {
      if (effect.op === 'add_experience') {
        const expId = effect.id;
        const val = Number(effect.value);
        experiences[expId] = (experiences[expId] ?? 0) + val;
        effects.push(`경험 증가: [EXP:${expId}] +${val}`);
      } else if (effect.op === 'gain_trait') {
        const traitId = effect.id;
        traits[traitId] = true;
        effects.push(`소질 획득: [TALENT:${traitId}]`);
      } else if (effect.op === 'lose_trait') {
        const traitId = effect.id;
        traits[traitId] = false;
        effects.push(`소질 상실: [TALENT:${traitId}]`);
      } else if (effect.op === 'set_condition_flag') {
        const flagId = effect.id;
        const val = Number(effect.value);
        conditionFlags[flagId] = val;
        effects.push(`상태 플래그 변경: [CFLAG:${flagId}] = ${val}`);
      }
    }
  }

  // 최종 차감 체력 (기본 소모 + 절정 추가 소모)
  const finalStamina = Math.max(0, nextStamina - extraStaminaLoss);

  // 6. 새로운 GameState 빌드
  const nextState: GameState = {
    ...state,
    people: {
      ...state.people,
      characters: {
        ...state.people.characters,
        [targetId]: {
          ...target,
          attributes: {
            ...target.attributes,
            baseStats: {
              ...target.attributes.baseStats,
              current: {
                ...target.attributes.baseStats.current,
                '0': finalStamina,
                '1': nextEnergy,
              },
            },
            experiences,
            abilities,
            traits,
          },
        },
      },
    },
    body: {
      ...state.body,
      byCharacterId: {
        ...state.body.byCharacterId,
        [targetId]: {
          ...body,
          bodyStats: {
            ...body.bodyStats,
            stamina: finalStamina,
            energy: nextEnergy,
          },
          conditionParams,
          conditionFlags,
          trainingResources,
        },
      },
    },
  };

  return {
    state: nextState,
    session,
    effects,
  };
}
