/**
 * COMF16 - 착유기 (Breast milking machine)
 * 원본: ERB/指導関係/COMF16.ERB
 *
 * 도구 사용 커맨드: 조교대상의 유방을 착유기로 자극
 * 착탈 시스템: 실행 시마다 장착/해제 토글
 * 장착 중에는 다른 커맨드 실행 시 추가 SOURCE 적용 (@EQUIP_COM16)
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';

/**
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF16.ERB 라인 19-77
 */
function calculateMilkingMachineSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;
  const talents = context.talents || {};

  // LOSEBASE (라인 16-17)
  let loseBase0 = 50;
  let loseBase1 = 100;

  // 기본 SOURCE 설정 (라인 22-28)
  const source: number[] = new Array(19).fill(0);

  // ABL:B감각을 봄 (라인 31-44)
  const bSense = abilities[1] || 0;
  let a = 0;
  if (bSense === 0) {
    a = 200;
  } else if (bSense === 1) {
    a = 400;
  } else if (bSense === 2) {
    a = 900;
  } else if (bSense === 3) {
    a = 1600;
  } else if (bSense === 4) {
    a = 2400;
  } else {
    a = 3000;
  }

  // 젖분비 (라인 46-48)
  if (talents[110]) {
    a *= 1.50;
  }

  // B민감/둔감 (라인 49-53)
  if (talents[108]) {
    a *= 1.50;
  } else if (talents[107]) {
    a *= 0.60;
  }

  // 절벽 (라인 55-57)
  if (talents[116]) {
    source[12] *= 1.80;
  }

  // 빈유 (라인 58-60)
  if (talents[109]) {
    source[12] *= 1.50;
  }

  source[3] = a;

  // 슬라임 패치 추가 (라인 64-77)
  const items = context.items || {};
  if (items[210] && items[210] >= 1 && !context.equipment?.[90]) {
    loseBase0 *= 0.80;
    loseBase1 *= 0.80;
    source[3] *= 1.20;
    source[7] *= 1.20;
    source[12] *= 0.80;
    source[9] *= 1.20;
    source[10] *= 1.20;
    source[8] *= 1.20;
    source[11] *= 1.20;
    source[2] *= 1.20;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + Math.floor(loseBase0);
  context.loseBase[1] = (context.loseBase[1] || 0) + Math.floor(loseBase1);

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 착유기 장착 중 추가 SOURCE 계산
 * 원본: COMF16.ERB @EQUIP_COM16 (라인 108-243)
 */
function calculateEquippedMilkingMachineSource(context: TrainingContext): number[] {
  const abilities = context.target.abl;
  const talents = context.talents || {};

  // LOSEBASE (라인 120-121)
  let addLoseBase0 = 15;
  let addLoseBase1 = 15;

  // ABL:B감각을 봄 (라인 126-139)
  const bSense = abilities[1] || 0;
  let a = 0;
  if (bSense === 0) {
    a = 40;
  } else if (bSense === 1) {
    a = 120;
  } else if (bSense === 2) {
    a = 250;
  } else if (bSense === 3) {
    a = 450;
  } else if (bSense === 4) {
    a = 600;
  } else {
    a = 750;
  }

  // PALAM:욕정을 봄 (라인 141-152)
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

  // ABL:종순을 봄 (라인 154-167)
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

  // EXP:분유경험을 봄 (라인 169-182)
  const milkExpLevel = getExpLevel(context, 54);
  if (milkExpLevel <= 0) {
    a *= 1.00;
  } else if (milkExpLevel <= 1) {
    a *= 1.20;
  } else if (milkExpLevel <= 2) {
    a *= 1.40;
  } else if (milkExpLevel <= 3) {
    a *= 1.80;
  } else if (milkExpLevel <= 4) {
    a *= 2.25;
  } else {
    a *= 4.00;
  }

  // 젖분비 (라인 184-186)
  if (talents[110]) {
    a *= 1.3;
  }

  // B민감/둔감 (라인 187-191)
  if (talents[108]) {
    a *= 1.4;
  } else if (talents[107]) {
    a *= 0.6;
  }

  const source: number[] = new Array(19).fill(0);

  // 절벽 (라인 194-196)
  if (talents[116]) {
    source[12] *= 1.80;
  }

  // 빈유 (라인 197-199)
  if (talents[109]) {
    source[12] *= 1.50;
  }

  // 슬라임 패치 추가 (라인 211-224)
  const items = context.items || {};
  if (items[210] && items[210] >= 1 && !context.equipment?.[90]) {
    addLoseBase0 -= 3;
    addLoseBase1 -= 3;
    source[3] *= 1.20;
    source[7] *= 1.20;
    source[12] *= 0.80;
    source[9] *= 1.20;
    source[10] *= 1.20;
    source[8] *= 1.20;
    source[11] *= 1.20;
    source[2] *= 1.20;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + addLoseBase0;
  context.loseBase[1] = (context.loseBase[1] || 0) + addLoseBase1;

  // 경험 상승 (라인 225-237)
  context.exp = context.exp || [];
  if (context.talents?.[122] === 0 && context.playerTalents?.[122] === 0) {
    context.exp[40] = (context.exp[40] || 0) + 1;
    context.showMessage('레즈경험 +1');
  } else if (context.talents?.[122] === 1 && context.playerTalents?.[122] === 1) {
    context.exp[41] = (context.exp[41] || 0) + 1;
    context.showMessage('호모경험 +1');
  }

  source[3] = Math.floor(a);

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
function generateMilkingMachineMessage(context: TrainingContext): string {
  const targetName = context.target.name;
  const equipment = context.equipment || {};

  if (equipment[90]) {
    return `${targetName}의 유방에 촉수가 달라붙어 착유를 시작했다.`;
  }
  return `${targetName}의 유방에 착유기를 장착했다.`;
}

/**
 * 장착 중 상태 메시지
 * 원본: COMF16.ERB @EQUIP_COM16 라인 112-118
 */
function getEquippedStatusMessage(context: TrainingContext): string {
  const equipment = context.equipment || {};
  if (equipment[90]) {
    return '＜촉수 착유중＞';
  } else {
    return '＜착유기 장착중＞';
  }
}

export const COMF16_milkingMachine: CommandPlugin = {
  id: 16,
  name: '착유기',
  category: '도구',
  staminaCost: 50,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE16
   */
  isAvailable: (context: TrainingContext) => {
    const equipment = context.equipment || {};

    // 슬라임 지도중 불가
    if (equipment[150]) return false;

    // 촉수 중이 아닐 때: 상의 착용 불가
    if (!equipment[90] && (context.charFlags?.[40] & 8)) return false;

    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF16.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const talents = context.talents || {};
    const equipment = context.equipment || {};

    // 커맨드명 표시 (라인 7-13)
    if (equipment[90]) {
      context.showMessage('촉수 착유');
    } else {
      context.showMessage('착유기');
    }

    // 메시지 생성 및 표시
    const message = generateMilkingMachineMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateMilkingMachineSource(context);

    // SOURCE 적용
    if (context.applySource) {
      context.applySource(source);
    } else {
      context.params = context.params || [];
      for (let i = 0; i < source.length && i < context.params.length; i++) {
        context.params[i] = (context.params[i] || 0) + source[i];
      }
    }

    // 경험 상승 (라인 78-89)
    context.exp = context.exp || [];
    if (talents[122] === 0 && context.playerTalents?.[122] === 0) {
      context.exp[40] = (context.exp[40] || 0) + 1;
      context.showMessage('레즈경험 +1');
    } else if (talents[122] === 1 && context.playerTalents?.[122] === 1) {
      context.exp[41] = (context.exp[41] || 0) + 1;
      context.showMessage('호모경험 +1');
    }

    // 착유기의 착탈 (라인 91-96)
    equipment[16] = equipment[16] === 1 ? 0 : 1;
    if (equipment[90]) {
      // 촉수 중에는 토글하지 않음
      equipment[16] = 0; // T = 0
    }

    if (equipment[16] === 1) {
      context.showMessage('착유기를 장착했다.');
    } else {
      context.showMessage('착유기를 제거했다.');
    }

    // 더럽힘 처리 (촉수) (라인 98-105)
    if (equipment[90] && equipment[16]) {
      context.stain = context.stain || [];
      context.stain[5] = (context.stain[5] || 0) | 2; // B에 애액
      context.stain[5] = (context.stain[5] || 0) | 4; // B에 정액
    }
  },
};
