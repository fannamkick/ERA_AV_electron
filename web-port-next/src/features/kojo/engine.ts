import type { GameState, GameSession } from '../../game/state';
import { kojoRegistry } from './registry';

export interface KojoMatchingContext {
  readonly commandId?: string;
  readonly isVirginVOrgasm?: boolean;
}

/**
 * 런타임 조건(커맨드 ID, 처녀막 상실 절정 여부, 복종 수치 등)에 맞춰
 * 가장 적합도(Specificity)가 높은 구상 대사를 매칭하여 state.text.characterTextEntries에 기록합니다.
 */
export function executeKojoMatching(
  state: GameState,
  session: GameSession,
  characterId: string,
  context: KojoMatchingContext
): GameState {
  const character = state.people.characters[characterId];
  if (!character) return state;

  // character.identity?.templateId가 없으면 characterId의 식별자 숫자 활용
  const templateId = character.identity?.templateId ?? characterId.replace('character:', '');
  const specs = kojoRegistry[templateId];
  if (!specs || specs.length === 0) return state;

  // 1. 조건에 맞는 구상 대사 필터링
  const matchedSpecs = specs.filter((spec) => {
    const { conditions } = spec;

    // A. 커맨드 ID 조건 대조
    if (conditions.commandId !== undefined && conditions.commandId !== context.commandId) {
      return false;
    }

    // B. 처녀막 상실 V절정 조건 대조
    if (conditions.isVirginVOrgasm !== undefined && conditions.isVirginVOrgasm !== context.isVirginVOrgasm) {
      return false;
    }

    // C. 최소 복종 능력치 대조 (ABL:10)
    if (conditions.minObedience !== undefined) {
      const obedienceLevel = character.attributes.abilities['10'] ?? 0;
      if (obedienceLevel < conditions.minObedience) {
        return false;
      }
    }

    // D. 필수 소질 대조
    if (conditions.requiredTraits !== undefined) {
      for (const traitId of conditions.requiredTraits) {
        if (!character.attributes.traits[traitId]) {
          return false;
        }
      }
    }

    return true;
  });

  if (matchedSpecs.length === 0) return state;

  // 2. specificity가 가장 높은 대사 선택
  let bestSpec = matchedSpecs[0];
  for (let i = 1; i < matchedSpecs.length; i++) {
    if (matchedSpecs[i].specificity > bestSpec.specificity) {
      bestSpec = matchedSpecs[i];
    }
  }

  // 3. state.text.characterTextEntries에 대사 안착
  const nextCharacterTextEntries = {
    ...state.text.characterTextEntries,
    [characterId]: {
      ...(state.text.characterTextEntries[characterId] ?? {}),
      current: bestSpec.text,
      [bestSpec.id]: bestSpec.text,
    },
  };

  return {
    ...state,
    text: {
      ...state.text,
      characterTextEntries: nextCharacterTextEntries,
    },
  };
}
export { kojoRegistry };
