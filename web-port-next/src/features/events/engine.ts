import type { GameState } from '../../game/state';
import { scriptEventRegistry } from './registry';
import type { ScriptEventSpec, EventEffect } from './types';

/**
 * 턴 롤오버 시(또는 아침/밤 시점) 조건이 충족되는 이벤트를 찾아 아토믹 트랜잭션으로 집행하는 이벤트 제어 엔진입니다.
 */
export function executeScriptEvents(
  state: GameState,
  trigger: 'turnEnd' | 'turnStart' | 'immediate'
): {
  readonly state: GameState;
  readonly effects: readonly string[];
} {
  let nextState = { ...state };
  const effects: string[] = [];

  const activeEvents = scriptEventRegistry.filter((event) => event.trigger === trigger);

  for (const event of activeEvents) {
    // 모든 캐릭터를 대상으로 이벤트 조건을 탐색
    for (const characterId of Object.keys(nextState.people.characters)) {
      const character = nextState.people.characters[characterId];
      const body = nextState.body.byCharacterId[characterId];
      if (!character || !body) continue;

      const { conditions } = event;

      // 1. exactConditionFlags 대조 (CFLAG)
      if (conditions.exactConditionFlags) {
        let matched = true;
        for (const [flagId, expectedVal] of Object.entries(conditions.exactConditionFlags)) {
          const currentVal = body.conditionFlags[flagId] ?? 0;
          if (currentVal !== expectedVal) {
            matched = false;
            break;
          }
        }
        if (!matched) continue;
      }

      // 2. minConditionFlags 대조 (CFLAG)
      if (conditions.minConditionFlags) {
        let matched = true;
        for (const [flagId, minVal] of Object.entries(conditions.minConditionFlags)) {
          const currentVal = body.conditionFlags[flagId] ?? 0;
          if (Number(currentVal) < minVal) {
            matched = false;
            break;
          }
        }
        if (!matched) continue;
      }

      // 3. 필수 소질 대조 (TALENT)
      if (conditions.requiredTraits) {
        let matched = true;
        for (const traitId of conditions.requiredTraits) {
          const val = character.attributes.traits[traitId];
          if (!val) {
            matched = false;
            break;
          }
        }
        if (!matched) continue;
      }

      // 4. 제외 소질 대조 (TALENT)
      if (conditions.excludeTraits) {
        let matched = true;
        for (const traitId of conditions.excludeTraits) {
          const val = character.attributes.traits[traitId];
          if (val === true || (typeof val === 'number' && val !== 0)) {
            matched = false;
            break;
          }
        }
        if (!matched) continue;
      }

      // 5. 능력치 대조 (ABL)
      if (conditions.minAbilities) {
        let matched = true;
        for (const [ablId, minVal] of Object.entries(conditions.minAbilities)) {
          const val = character.attributes.abilities[ablId] ?? 0;
          if (val < minVal) {
            matched = false;
            break;
          }
        }
        if (!matched) continue;
      }

      // 6. 커스텀 조건식 대조
      if (conditions.customCondition) {
        if (!conditions.customCondition(nextState, characterId)) {
          continue;
        }
      }

      // 모든 조건을 만족하면 이벤트를 집행합니다.
      effects.push(`이벤트 발생: ${event.name} (${character.identity.displayName})`);

      // postEffects 반영 (아토믹 트랜잭션 집행)
      nextState = applyEventEffects(nextState, event.postEffects);
    }
  }

  return {
    state: nextState,
    effects,
  };
}

/**
 * 선언적 postEffects를 아토믹 트랜잭션으로 집행합니다.
 */
function applyEventEffects(state: GameState, postEffects: readonly EventEffect[]): GameState {
  let nextState = {
    ...state,
    people: {
      ...state.people,
      characters: { ...state.people.characters },
    },
    body: {
      ...state.body,
      byCharacterId: { ...state.body.byCharacterId },
    },
    social: {
      ...state.social,
      relationships: { ...state.social.relationships },
    },
  };

  for (const effect of postEffects) {
    const { characterId, id: targetId, op, value } = effect;

    // 1. 캐릭터 정보 가져오기
    const character = nextState.people.characters[characterId];
    const body = nextState.body.byCharacterId[characterId];

    if (op === 'set_condition_flag') {
      if (body) {
        nextState.body.byCharacterId[characterId] = {
          ...body,
          conditionFlags: {
            ...body.conditionFlags,
            [targetId]: Number(value),
          },
        };
      }
    } else if (op === 'gain_trait') {
      if (character) {
        nextState.people.characters[characterId] = {
          ...character,
          attributes: {
            ...character.attributes,
            traits: {
              ...character.attributes.traits,
              [targetId]: true,
            },
          },
        };
      }
    } else if (op === 'lose_trait') {
      if (character) {
        nextState.people.characters[characterId] = {
          ...character,
          attributes: {
            ...character.attributes,
            traits: {
              ...character.attributes.traits,
              [targetId]: false,
            },
          },
        };
      }
    } else if (op === 'add_experience') {
      if (character) {
        const curExp = character.attributes.experiences[targetId] ?? 0;
        nextState.people.characters[characterId] = {
          ...character,
          attributes: {
            ...character.attributes,
            experiences: {
              ...character.attributes.experiences,
              [targetId]: curExp + Number(value),
            },
          },
        };
      }
    } else if (op === 'set_relationship') {
      const relKey = `${characterId}->${targetId}`;
      const currentRel = nextState.social.relationships[relKey] ?? {
        affinity: 0,
        roles: [],
        historyTags: [],
        legacyRelationIndexesNeedingMapping: {},
      };
      nextState.social.relationships[relKey] = {
        ...currentRel,
        roles: Array.from(new Set([...currentRel.roles, String(value)])),
      };
    }
  }

  return nextState;
}
export { scriptEventRegistry };
