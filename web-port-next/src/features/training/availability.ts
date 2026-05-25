import type { GameState, GameSession } from '../../game/state';
import { trainingCommandRegistry } from './registry';
import type { TrainingCommandSpec } from './types';

/**
 * 선언적 조교 사양(Spec)에 따라 조교 대상 캐릭터와 플레이어의 인벤토리 상태를 대조하여
 * 커맨드 실행 가능 여부를 판정합니다.
 */
export function checkCommandAvailability(
  commandId: string,
  state: GameState,
  session: GameSession
): boolean {
  const spec = trainingCommandRegistry[commandId];
  if (!spec) {
    return false; // 등록되지 않은 커맨드는 실행 불가
  }

  const { availability } = spec;
  const targetCharaId = session.interaction.participants.targetId;
  const target = targetCharaId ? state.people.characters[targetCharaId] : undefined;

  if (!target) {
    return false; // 조교 대상 캐릭터가 지정되지 않은 경우 실행 불가
  }

  // 1. 필수 아이템/도구 소지 여부 검증 (requiresItem)
  if (availability.requiresItem) {
    const itemCount = state.inventory.itemCounts[availability.requiresItem] ?? 0;
    if (itemCount <= 0) {
      return false;
    }
  }

  // 2. 금지 소질 보유 여부 검증 (excludeTraits)
  if (availability.excludeTraits) {
    for (const traitId of availability.excludeTraits) {
      const traitValue = target.attributes.traits[traitId];
      if (traitValue === true || (typeof traitValue === 'number' && traitValue !== 0)) {
        return false; // 금지 소질이 하나라도 존재하면 실행 불가
      }
    }
  }

  // 3. 필수 소질 보유 여부 검증 (requiredTraits)
  if (availability.requiredTraits) {
    for (const traitId of availability.requiredTraits) {
      const traitValue = target.attributes.traits[traitId];
      const hasTrait = traitValue === true || (typeof traitValue === 'number' && traitValue !== 0);
      if (!hasTrait) {
        return false; // 필수 소질이 결여되어 있으면 실행 불가
      }
    }
  }

  // 4. 필수 최소 능력치 검증 (minimumAbl)
  if (availability.minimumAbl) {
    for (const [ablId, minLevel] of Object.entries(availability.minimumAbl)) {
      const currentLevel = target.attributes.abilities[ablId] ?? 0;
      if (currentLevel < minLevel) {
        return false; // 능력치 미달인 경우 실행 불가
      }
    }
  }

  return true;
}
