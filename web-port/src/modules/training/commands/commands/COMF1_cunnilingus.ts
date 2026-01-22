/**
 * COMF1 - 커닐링구스
 * 원본: ERB/指導関係/COMF1.ERB
 *
 * 조교자가 대상의 클리토리스를 입으로 자극하는 애무
 * 새 구조 (SafeContext + CaressCommand) 적용
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SafeContext } from '../../context/SafeContext';
import { generateMessage } from '../base/CaressCommand';
import { checkBasicAvailability, checkBottomNakedRequired } from '../../utils/sourceCalculator';
import { STAIN_PART } from '../../../../types/training';

/**
 * 메시지 생성
 */
function generateCunnilingusMessage(safe: SafeContext): string {
  return generateMessage(safe, {
    baseMessage: `{name}의 클리토리스를 입으로 자극했다.`,
    conditionalMessages: [
      {
        condition: (s) => s.getParamLevel(3) >= 3, // 윤활 레벨
        message: `{name}의 성기에서 애액이 흘러나온다.`,
      },
      {
        condition: (s) => s.hasPlayerTalent('혀놀림'),
        message: `능숙한 혀놀림에 {name}이(가) 몸을 떨었다.`,
      },
    ],
  });
}

export const COMF1_cunnilingus: CommandPlugin = {
  id: 1,
  name: '커닐링구스',
  category: '애무',
  staminaCost: 5,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE1
   */
  isAvailable: (context: TrainingContext) => {
    const safe = new SafeContext(context);

    // 대상이 남성이면 불가
    if (safe.hasTalent('남성')) return false;

    // 기본 불가 조건 (촉수, 슬라임, 삼각목마)
    if (!checkBasicAvailability(safe)) return false;

    // 하의 벗김 필요
    if (!checkBottomNakedRequired(safe)) return false;

    // 검은 스타킹 불가
    if (safe.getCharFlagByIndex(170) === 6 && safe.getCharFlagByIndex(173) === 0) {
      return false;
    }

    // 기저귀/즈코 인형 불가
    const cflag42 = safe.getCharFlagByIndex(42);
    const cflag40 = safe.getCharFlagByIndex(40);
    if ((cflag42 === 69 || cflag42 === 11) && (cflag40 & 64)) {
      return false;
    }

    // 성기가 더러워져있고, 악취민감이며 종순3이하인 조수는 불가
    const stain = context.stain || [];
    const dirtyGenitals = stain[STAIN_PART.V] && ((stain[STAIN_PART.V] & 4) || (stain[STAIN_PART.V] & 8) || (stain[STAIN_PART.V] & 32));

    if (dirtyGenitals && safe.isAssistantPlay) {
      const assiAbilities = context.assiAbilities || [];
      const assiTalents = context.assiTalents || [];
      const assiSubmission = assiAbilities[10] || 0;
      const assiSmellSensitive = assiTalents[62];
      const assiIgnoreDirty = assiTalents[64];

      if (assiSubmission <= 3 && assiSmellSensitive && !assiIgnoreDirty) {
        return false;
      }
    }

    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF1.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const safe = new SafeContext(context);

    // 커맨드명 표시
    safe.message('커닐링구스');

    // 메시지 생성 및 표시
    safe.message(generateCunnilingusMessage(safe));

    // SOURCE 계산 - C감각 기반
    const cSense = safe.getAbility('C감각');
    const cValueTable = [50, 150, 350, 650, 1050, 1550]; // 50 + C감각 * 100 기준
    safe.addSource('쾌C', cValueTable[Math.min(cSense, cValueTable.length - 1)] ?? 0);

    // LOSEBASE
    safe.addStaminaCost(5);
    safe.addWillpowerCost(50);

    // 수간인 경우 조기 종료
    if (safe.hasEquipment('수간')) {
      return;
    }

    // 혀놀림 소질/수간 보너스
    if (safe.hasPlayerTalent('혀놀림') || safe.hasEquipment('수간')) {
      safe.multiplySource('쾌C', 2.0);
      safe.addSource('습득', Math.floor(safe.getSource('쾌C') / 20));
    }

    // 더러움 처리: V ⇔ 조교자의 입
    safe.transferStainWithPlayer(STAIN_PART.V, 0); // 0 = 플레이어 입

    // SOURCE 적용
    if (context.applySource) {
      context.applySource(safe.getSourceArray());
    } else {
      const sourceArray = safe.getSourceArray();
      context.params = context.params || [];
      for (let i = 0; i < sourceArray.length && i < context.params.length; i++) {
        context.params[i] = (context.params[i] || 0) + sourceArray[i];
      }
    }

    // 레즈 경험치 (양쪽 다 여성)
    if (!safe.hasTalent('남성') && !safe.hasPlayerTalent('남성')) {
      safe.addExperience('레즈경험', 3);
    }

    // 첫 키스 기록
    if (context.playerCharFlags && context.playerCharFlags[16] === -1) {
      safe.setFlag(620, safe.getFlag(620) | 1);
      if (safe.hasTalent('남성') || safe.hasTalent('후타나리')) {
        safe.setFlag(620, safe.getFlag(620) | 2);
      } else {
        safe.setFlag(620, safe.getFlag(620) | 8);
      }
    }

    // 애정경험 판정
    safe.checkAffectionExp(1);
  },
};
