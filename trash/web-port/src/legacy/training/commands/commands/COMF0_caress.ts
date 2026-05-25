/**
 * COMF0 - 애무
 * 원본: ERB/指導関係/COMF0.ERB
 *
 * 손과 입으로 유두/클리토리스를 자극하는 기본 애무
 * 새 구조 (SafeContext + CaressCommand) 적용
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { createCaressCommand, generateMessage } from '../base/CaressCommand';
import { SafeContext } from '../../context/SafeContext';

/**
 * 기본 애무 커맨드 생성
 */
const baseCommand = createCaressCommand({
  id: 0,
  name: '애무',
  category: '애무',

  staminaCost: 5,
  willpowerCost: 50,

  // C감각 + B감각 기반 (C감각을 주로 사용)
  sensoryAbility: 'C감각',
  primarySource: '쾌C',
  valueTable: [20, 70, 170, 320, 520, 770], // 20 + C감각 * 50 기준

  // 욕정 값
  lustTable: [50, 60, 70, 80, 90, 100],

  // 경험치 설정
  expIndex: 14, // 애무경험
  expGain: 2,

  // 레즈/호모 경험치
  lesbianExpAmount: 3,
  gayExpAmount: 3,

  // 추가 SOURCE 계산 (B감각 추가)
  extraSourceCalculation: (safe: SafeContext) => {
    const bSense = safe.getAbility('B감각');
    const bValueTable = [10, 40, 100, 190, 310, 460]; // 10 + B감각 * 30 기준
    const bValue = bValueTable[Math.min(bSense, bValueTable.length - 1)] ?? 0;
    safe.addSource('쾌B', bValue);
  },
});

/**
 * 메시지 생성
 */
function generateCaressMessage(safe: SafeContext): string {
  return generateMessage(safe, {
    baseMessage: `{name}의 몸을 애무했다...`,
    conditionalMessages: [
      {
        condition: (s) => s.getAbility('C감각') >= 4,
        message: `{name}의 민감한 부분이 반응한다.`,
      },
      {
        condition: (s) => s.hasPlayerTalent('혀놀림'),
        message: `능숙한 혀놀림에 {name}이(가) 몸을 떨었다.`,
      },
    ],
  });
}

export const COMF0_caress: CommandPlugin = {
  ...baseCommand,

  // 가용성 판정 (기본 애무는 항상 가능)
  isAvailable: (_context: TrainingContext) => {
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    const safe = new SafeContext(context);

    // 커맨드명 표시
    safe.message('애무');

    // 메시지 생성 및 표시
    const message = generateCaressMessage(safe);
    safe.message(message);

    // LOSEBASE
    safe.addStaminaCost(5);
    safe.addWillpowerCost(50);

    // SOURCE 초기화
    safe.addSource('쾌C', 0);
    safe.addSource('쾌B', 0);
    safe.addSource('정애', 0);
    safe.addSource('성행동', 60);
    safe.addSource('불결', 30);
    safe.addSource('노출', 100);

    // SOURCE 계산 - C감각 기반
    const cSense = safe.getAbility('C감각');
    if (cSense === 0) {
      safe.addSource('쾌C', 20);
      safe.addSource('정애', 25);
    } else if (cSense === 1) {
      safe.addSource('쾌C', 100);
      safe.addSource('정애', 50);
    } else if (cSense === 2) {
      safe.addSource('쾌C', 500);
      safe.addSource('정애', 80);
    } else if (cSense === 3) {
      safe.addSource('쾌C', 1200);
      safe.addSource('정애', 100);
    } else if (cSense === 4) {
      safe.addSource('쾌C', 2000);
      safe.addSource('정애', 115);
    } else {
      safe.addSource('쾌C', 2800);
      safe.addSource('정애', 125);
    }

    // SOURCE 계산 - B감각 기반
    const bSense = safe.getAbility('B감각');
    if (bSense === 0) {
      safe.addSource('쾌B', 15);
      safe.addSource('정애', 25);
    } else if (bSense === 1) {
      safe.addSource('쾌B', 50);
      safe.addSource('정애', 50);
    } else if (bSense === 2) {
      safe.addSource('쾌B', 300);
      safe.addSource('정애', 80);
    } else if (bSense === 3) {
      safe.addSource('쾌B', 700);
      safe.addSource('정애', 100);
    } else if (bSense === 4) {
      safe.addSource('쾌B', 1100);
      safe.addSource('정애', 115);
    } else {
      safe.addSource('쾌B', 1600);
      safe.addSource('정애', 125);
    }

    // 수간인 경우 조기 종료
    if (safe.hasEquipment('수간')) {
      return;
    }

    // 혀놀림 소질 보너스
    if (safe.hasPlayerTalent('혀놀림')) {
      safe.multiplySource('쾌C', 1.4);
      safe.multiplySource('쾌B', 1.4);
      safe.addSource('성행동', Math.floor(safe.getSource('쾌C') / 20));
    }

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

    // 경험치 획득
    safe.addExperience('애무경험', 2);

    // 레즈/호모 경험치
    safe.handleSexualOrientationExp(3, 3);

    // 애정경험 판정
    safe.checkAffectionExp(1);
  },
};
