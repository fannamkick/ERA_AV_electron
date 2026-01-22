/**
 * COMF19 - 애널비즈 (Anal beads)
 * 원본: ERB/指導関係/COMF19.ERB
 *
 * 도구 사용 커맨드: 조교대상의 항문을 애널비즈로 자극
 * 착탈 시스템: 실행 시마다 장착/해제 토글
 * 장착 중에는 다른 커맨드 실행 시 추가 SOURCE 적용 (@EQUIP_COM19)
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';

/**
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF19.ERB 라인 14-146
 */
function calculateAnalBeadsSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;
  const talents = context.talents || {};

  // LOSEBASE (라인 11-12)
  let loseBase0 = 60;
  let loseBase1 = 150;

  // 기본 SOURCE 설정
  const source: number[] = new Array(19).fill(0);

  // ABL:A감각을 봄 (라인 17-36)
  const aSense = abilities[3] || 0;
  if (aSense === 0) {
    source[2] = 80;
    source[8] = 300;
  } else if (aSense === 1) {
    source[2] = 250;
    source[8] = 800;
  } else if (aSense === 2) {
    source[2] = 600;
    source[8] = 1400;
  } else if (aSense === 3) {
    source[2] = 1000;
    source[8] = 1800;
  } else if (aSense === 4) {
    source[2] = 1300;
    source[8] = 2100;
  } else {
    source[2] = 1700;
    source[8] = 2400;
  }

  // EXP:A경험을 봄 (라인 38-57)
  const aExpLevel = getExpLevel(context, 1);
  if (aExpLevel < 1) {
    source[2] *= 0.50;
    source[12] = 2000;
  } else if (aExpLevel < 2) {
    source[2] *= 1.00;
    source[12] = 300;
  } else if (aExpLevel < 3) {
    source[2] *= 1.10;
    source[12] = 50;
  } else if (aExpLevel < 4) {
    source[2] *= 1.20;
    source[12] = 10;
  } else if (aExpLevel < 5) {
    source[2] *= 1.40;
    source[12] = 0;
  } else {
    source[2] *= 1.60;
    source[12] = 0;
  }

  // PALAM:윤활을 봄 (라인 59-75)
  const lubLevel = getParamLevel(context.params?.[3] || 0);
  if (lubLevel < 1) {
    source[2] *= 0.40;
    source[12] += 1200;
  } else if (lubLevel < 2) {
    source[2] *= 0.80;
    source[12] += 700;
  } else if (lubLevel < 3) {
    source[2] *= 1.00;
    source[12] += 400;
  } else if (lubLevel < 4) {
    source[2] *= 1.40;
    source[12] += 150;
  } else {
    source[2] *= 1.80;
    source[12] += 100;
  }

  // PALAM:욕정을 봄 (라인 77-88)
  const lustLevel = getParamLevel(context.params?.[5] || 0);
  if (lustLevel < 1) {
    source[2] *= 0.80;
  } else if (lustLevel < 2) {
    source[2] *= 0.90;
  } else if (lustLevel < 3) {
    source[2] *= 1.00;
  } else if (lustLevel < 4) {
    source[2] *= 1.10;
  } else {
    source[2] *= 1.20;
  }

  // ABL:종순을 봄 (라인 90-103)
  const submission = abilities[10] || 0;
  if (submission === 0) {
    source[2] *= 0.80;
  } else if (submission === 1) {
    source[2] *= 0.90;
  } else if (submission === 2) {
    source[2] *= 1.00;
  } else if (submission === 3) {
    source[2] *= 1.10;
  } else if (submission === 4) {
    source[2] *= 1.20;
  } else {
    source[2] *= 1.30;
  }

  // 큰체구 (라인 105-107)
  if (talents[99]) {
    source[12] *= 0.80;
  }

  // 작은체형 (라인 108-110)
  if (talents[100]) {
    source[12] *= 2.00;
  }

  // 미숙함 (라인 111-113)
  if (talents[135]) {
    source[12] *= 2.00;
  }

  // A민감, 둔감을 봄 (라인 115-125)
  if (talents[105]) {
    source[12] *= 1.50;
    source[8] *= 1.50;
    source[11] *= 1.50;
  } else if (talents[106]) {
    source[12] *= 0.60;
    source[8] *= 0.60;
    source[11] *= 0.60;
  }

  // 처녀로 정조관념 (라인 127-129)
  if (context.exp?.[0] === 0 && talents[30]) {
    source[8] = Math.floor(source[8] / 3);
  }

  // 장착 상태에 따른 보정 (라인 131-135)
  if (context.equipment?.[19] === 0) {
    source[2] *= 0.80;
  } else if (context.equipment?.[19] === 1) {
    source[2] *= 3.00;
  }

  // 슬라임 패치 추가 (라인 137-146)
  const items = context.items || {};
  if (items[212] && items[212] >= 1 && !context.equipment?.[90]) {
    loseBase0 *= 0.80;
    loseBase1 *= 0.80;
    source[2] *= 1.20;
    source[12] *= 0.80;
    source[8] *= 1.20;
    source[11] *= 0.80;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + Math.floor(loseBase0);
  context.loseBase[1] = (context.loseBase[1] || 0) + Math.floor(loseBase1);

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 애널비즈 삽입 중 추가 SOURCE 계산
 * 원본: COMF19.ERB @EQUIP_COM19 (라인 165-328)
 */
function calculateEquippedAnalBeadsSource(context: TrainingContext): number[] {
  const abilities = context.target.abl;
  const talents = context.talents || {};

  // LOSEBASE (라인 173-174)
  let addLoseBase0 = 10;
  let addLoseBase1 = 30;

  // ABL:A감각을 봄 (라인 179-198)
  const aSense = abilities[3] || 0;
  let a = 0;
  let b = 0;
  if (aSense === 0) {
    a = 40;
    b = 100;
  } else if (aSense === 1) {
    a = 80;
    b = 300;
  } else if (aSense === 2) {
    a = 100;
    b = 500;
  } else if (aSense === 3) {
    a = 150;
    b = 700;
  } else if (aSense === 4) {
    a = 200;
    b = 900;
  } else {
    a = 300;
    b = 1200;
  }

  // EXP:A경험을 봄 (라인 200-219)
  const aExpLevel = getExpLevel(context, 1);
  let c = 0;
  if (aExpLevel < 1) {
    a *= 0.50;
    c = 2000;
  } else if (aExpLevel < 2) {
    a *= 1.00;
    c = 300;
  } else if (aExpLevel < 3) {
    a *= 1.10;
    c = 50;
  } else if (aExpLevel < 4) {
    a *= 1.20;
    c = 10;
  } else if (aExpLevel < 5) {
    a *= 1.40;
    c = 0;
  } else {
    a *= 1.60;
    c = 0;
  }

  // PALAM:윤활을 봄 (라인 221-237)
  const lubLevel = getParamLevel(context.params?.[3] || 0);
  if (lubLevel < 1) {
    a *= 0.40;
    c += 800;
  } else if (lubLevel < 2) {
    a *= 0.80;
    c += 500;
  } else if (lubLevel < 3) {
    a *= 1.00;
    c += 300;
  } else if (lubLevel < 4) {
    a *= 1.40;
    c += 120;
  } else {
    a *= 1.80;
    c += 100;
  }

  // PALAM:욕정을 봄 (라인 239-250)
  const lustLevel = getParamLevel(context.params?.[5] || 0);
  if (lustLevel < 1) {
    a *= 0.80;
  } else if (lustLevel < 2) {
    a *= 0.90;
  } else if (lustLevel < 3) {
    a *= 1.00;
  } else if (lustLevel < 4) {
    a *= 1.10;
  } else {
    a *= 1.20;
  }

  // ABL:종순을 봄 (라인 252-265)
  const submission = abilities[10] || 0;
  if (submission === 0) {
    a *= 0.80;
  } else if (submission === 1) {
    a *= 0.90;
  } else if (submission === 2) {
    a *= 1.00;
  } else if (submission === 3) {
    a *= 1.10;
  } else if (submission === 4) {
    a *= 1.20;
  } else {
    a *= 1.30;
  }

  // 큰체구 (라인 267-269)
  if (talents[99]) {
    c *= 0.80;
  }

  // 작은체형 (라인 270-272)
  if (talents[100]) {
    c *= 1.50;
  }

  // 미숙함 (라인 273-275)
  if (talents[135]) {
    c *= 2.00;
  }

  const source: number[] = new Array(19).fill(0);

  // A민감, 둔감을 봄 (라인 277-287)
  if (talents[105]) {
    source[12] *= 1.50;
    source[8] *= 1.50;
    source[11] *= 1.50;
  } else if (talents[106]) {
    source[12] *= 0.60;
    source[8] *= 0.60;
    source[11] *= 0.60;
  }

  // 처녀로 정조관념 (라인 293-296)
  if (context.exp?.[0] === 0 && talents[30]) {
    source[8] = Math.floor(source[8] / 3);
  }

  // 슬라임 패치 추가 (라인 298-307)
  const items = context.items || {};
  if (items[212] && items[212] >= 1 && !context.equipment?.[90]) {
    addLoseBase0 -= 2;
    addLoseBase1 -= 6;
    source[2] *= 1.20;
    source[12] *= 0.80;
    source[8] *= 1.20;
    source[11] *= 0.80;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + addLoseBase0;
  context.loseBase[1] = (context.loseBase[1] || 0) + addLoseBase1;

  // 경험 상승 (라인 308-313)
  context.exp = context.exp || [];
  context.exp[1] = (context.exp[1] || 0) + 1;
  context.showMessage('A경험 +1');

  // 레즈/호모 경험 (라인 314-322)
  if (context.talents?.[122] === 0 && context.playerTalents?.[122] === 0) {
    context.exp[40] = (context.exp[40] || 0) + 1;
    context.showMessage('레즈경험 +1');
  } else if (context.talents?.[122] === 1 && context.playerTalents?.[122] === 1) {
    context.exp[41] = (context.exp[41] || 0) + 1;
    context.showMessage('호모경험 +1');
  }

  source[2] = Math.floor(a);
  source[8] = Math.floor(b);
  source[12] = Math.floor(c);

  return source;
}

/**
 * EXP 레벨 계산
 */
function getExpLevel(context: TrainingContext, expIndex: number): number {
  const exp = (context.exp || [])[expIndex] || 0;
  if (exp >= 10000) return 5;
  if (exp >= 5000) return 4;
  if (exp >= 2000) return 3;
  if (exp >= 1000) return 2;
  if (exp >= 500) return 1;
  return 0;
}

/**
 * PALAM 레벨 계산
 */
function getParamLevel(value: number): number {
  if (value >= 40000) return 4;
  if (value >= 30000) return 3;
  if (value >= 10000) return 2;
  if (value >= 1000) return 1;
  return 0;
}

/**
 * 메시지 생성 헬퍼 함수
 */
function generateAnalBeadsMessage(context: TrainingContext): string {
  const targetName = context.target.name;
  return `${targetName}의 항문에 애널비즈를 삽입했다.`;
}

/**
 * 삽입 중 상태 메시지
 * 원본: COMF19.ERB @EQUIP_COM19 라인 169-171
 */
function getEquippedStatusMessage(): string {
  return '＜애널비즈 삽입중＞';
}

export const COMF19_analBeads: CommandPlugin = {
  id: 19,
  name: '애널비즈',
  category: '도구',
  staminaCost: 60,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE19
   */
  isAvailable: (context: TrainingContext) => {
    const equipment = context.equipment || {};

    // 슬라임 지도중 불가
    if (equipment[150]) return false;

    // 촉수 중이 아닐 때: 팬티 or 하의 착용 불가
    if (!equipment[90] && (context.charFlags?.[40] & 17)) return false;

    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF19.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const equipment = context.equipment || {};

    // 커맨드명 표시 (라인 7)
    context.showMessage('애널비즈');

    // 메시지 생성 및 표시
    const message = generateAnalBeadsMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateAnalBeadsSource(context);

    // SOURCE 적용
    if (context.applySource) {
      context.applySource(source);
    } else {
      context.params = context.params || [];
      for (let i = 0; i < source.length && i < context.params.length; i++) {
        context.params[i] = (context.params[i] || 0) + source[i];
      }
    }

    // 경험 상승 (라인 147-157)
    context.exp = context.exp || [];
    if (equipment[19] === 0) {
      context.exp[1] = (context.exp[1] || 0) + 1;
      context.showMessage('A경험 +1');
    } else if (equipment[19] === 1) {
      context.exp[1] = (context.exp[1] || 0) + 2;
      context.showMessage('A경험 +2');
    }

    // 애널비즈의 착탈 (라인 159-161)
    equipment[19] = equipment[19] === 1 ? 0 : 1;

    if (equipment[19] === 1) {
      context.showMessage('애널비즈를 삽입했다.');
    } else {
      context.showMessage('애널비즈를 제거했다.');
    }
  },
};
