/**
 * COMF4 - 펠라한다 (Fellatio - target performs on player)
 * 원본: ERB/指導関係/COMF4.ERB
 *
 * 애무계 커맨드: 조교대상이 조교자의 성기를 입으로 자극
 * 새 구조 (SafeContext + CaressCommand) 적용
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SafeContext } from '../../context/SafeContext';
import { generateMessage } from '../base/CaressCommand';
import { checkBasicAvailability } from '../../utils/sourceCalculator';
import { STAIN_PART } from '../../../../types/training';

/**
 * C감각별 기본 SOURCE 테이블
 */
const C_SENSE_VALUES = [50, 200, 800, 1600, 2400, 3200];

/**
 * 메시지 생성
 */
function generateFellatio2Message(safe: SafeContext): string {
  const cSense = safe.getAbility('C감각');

  return generateMessage(safe, {
    baseMessage: `{name}이(가) 조교자의 성기를 입으로 자극했다.`,
    conditionalMessages: [
      {
        condition: () => cSense === 0,
        message: `{name}은(는) 아직 입으로 하는 것에 익숙하지 않다.`,
      },
      {
        condition: () => cSense >= 4,
        message: `{name}의 능숙한 혀놀림이 조교자를 자극한다.`,
      },
      {
        condition: (s) => s.hasPlayerTalent('혀놀림'),
        message: `조교자의 능숙한 움직임에 {name}이(가) 반응한다.`,
      },
    ],
  });
}

export const COMF4_fellatio2: CommandPlugin = {
  id: 4,
  name: '펠라한다',
  category: '애무',
  staminaCost: 5,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE4
   */
  isAvailable: (context: TrainingContext) => {
    const safe = new SafeContext(context);

    // 기본 불가 조건 (촉수, 슬라임, 삼각목마)
    if (!checkBasicAvailability(safe)) return false;

    // 조교자가 남성 또는 후타나리가 아니면 불가
    if (!safe.hasPlayerTalent('남성') && !safe.hasPlayerTalent('후타나리')) {
      return false;
    }

    // 대상이 볼개그 착용 중이면 불가
    if (safe.hasEquipmentByIndex(45)) return false; // 볼개그

    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF4.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const safe = new SafeContext(context);

    // 커맨드명 표시
    safe.message('펠라한다');

    // 메시지 생성 및 표시
    safe.message(generateFellatio2Message(safe));

    // LOSEBASE
    safe.addStaminaCost(5);
    safe.addWillpowerCost(50);

    // C감각 기반 SOURCE
    const cSense = safe.getAbility('C감각');
    safe.addSource('쾌C', C_SENSE_VALUES[Math.min(cSense, C_SENSE_VALUES.length - 1)]);

    // 수간인 경우 조기 종료
    if (safe.hasEquipment('수간')) {
      return;
    }

    // 혀놀림 소질 보너스
    if (safe.hasPlayerTalent('혀놀림')) {
      safe.multiplySource('쾌C', 2.0);
      safe.addSource('습득', Math.floor(safe.getSource('쾌C') / 20));
    }

    // 더러움 처리: 대상의 입 ⇔ 조교자의 V
    safe.transferStainWithPlayer(STAIN_PART.입, 3); // 3 = 플레이어 V (성기)

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

    // 애무경험
    safe.addExperience('애무경험', 2);

    // 펠라치오경험 (인덱스 15)
    safe.addExperienceByIndex(15, 3, '펠라치오경험');

    // 레즈/호모 경험치
    safe.handleSexualOrientationExp(3, 5);

    // 애정경험 판정
    safe.checkAffectionExp(1);
  },
};
