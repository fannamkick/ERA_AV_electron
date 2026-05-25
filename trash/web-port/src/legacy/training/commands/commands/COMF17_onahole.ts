/**
 * COMF17 - 오나홀 (Onahole on target's penis)
 * 원본: ERB/指導関係/COMF17.ERB
 *
 * 도구 사용 커맨드: 조교대상의 페니스를 오나홀로 자극
 * 착탈 시스템: 실행 시마다 장착/해제 토글
 * 장착 중에는 다른 커맨드 실행 시 추가 SOURCE 적용 (@EQUIP_COM17)
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';

/**
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF17.ERB 라인 19-48
 */
function calculateOnaholeSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;

  // LOSEBASE (라인 16-17)
  let loseBase0 = 10;
  let loseBase1 = 80;

  // 기본 SOURCE 설정 (라인 22-23)
  const source: number[] = new Array(19).fill(0);

  // ABL:C감각을 봄 (라인 25-38)
  const cSense = abilities[0] || 0;
  if (cSense === 0) {
    source[0] = 200;
  } else if (cSense === 1) {
    source[0] = 400;
  } else if (cSense === 2) {
    source[0] = 900;
  } else if (cSense === 3) {
    source[0] = 1600;
  } else if (cSense === 4) {
    source[0] = 2400;
  } else {
    source[0] = 3000;
  }

  // 슬라임 패치 추가 (라인 40-48)
  const items = context.items || {};
  if (items[214] && items[214] >= 1 && !context.equipment?.[90]) {
    loseBase0 *= 0.80;
    loseBase1 *= 0.80;
    source[0] *= 1.20;
    source[10] *= 1.20;
    source[11] *= 0.80;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + Math.floor(loseBase0);
  context.loseBase[1] = (context.loseBase[1] || 0) + Math.floor(loseBase1);

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 오나홀 장착 중 추가 SOURCE 계산
 * 원본: COMF17.ERB @EQUIP_COM17 (라인 78-171)
 */
function calculateEquippedOnaholeSource(context: TrainingContext): number[] {
  const abilities = context.target.abl;

  // LOSEBASE (라인 91-92)
  let addLoseBase0 = 5;
  let addLoseBase1 = 20;

  // ABL:C감각을 봄 (라인 97-110)
  const cSense = abilities[0] || 0;
  let a = 0;
  if (cSense === 0) {
    a = 40;
  } else if (cSense === 1) {
    a = 120;
  } else if (cSense === 2) {
    a = 250;
  } else if (cSense === 3) {
    a = 450;
  } else if (cSense === 4) {
    a = 600;
  } else {
    a = 750;
  }

  // PALAM:욕정을 봄 (라인 112-123)
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

  // ABL:종순을 봄 (라인 125-138)
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

  const source: number[] = new Array(19).fill(0);

  // 슬라임 패치 추가 (라인 144-153)
  const items = context.items || {};
  if (items[214] && items[214] >= 1 && !context.equipment?.[90]) {
    addLoseBase0 *= 0.80;
    addLoseBase1 *= 0.80;
    source[0] *= 1.20;
    source[8] *= 1.20;
    source[7] *= 1.20;
    source[10] *= 1.20;
  }

  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + Math.floor(addLoseBase0);
  context.loseBase[1] = (context.loseBase[1] || 0) + Math.floor(addLoseBase1);

  // 경험 상승 (라인 154-166)
  context.exp = context.exp || [];
  if (context.talents?.[122] === 0 && context.playerTalents?.[122] === 0) {
    context.exp[40] = (context.exp[40] || 0) + 1;
    context.showMessage('레즈경험 +1');
  } else if (context.talents?.[122] === 1 && context.playerTalents?.[122] === 1) {
    context.exp[41] = (context.exp[41] || 0) + 1;
    context.showMessage('호모경험 +1');
  }

  source[0] = Math.floor(a);

  return source;
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
function generateOnaholeMessage(context: TrainingContext): string {
  const targetName = context.target.name;
  const equipment = context.equipment || {};

  if (equipment[90]) {
    return `${targetName}의 페니스에 촉수가 감아 자극하고 있다.`;
  }
  return `${targetName}의 페니스에 오나홀을 장착했다.`;
}

/**
 * 장착 중 상태 메시지
 * 원본: COMF17.ERB @EQUIP_COM17 라인 84-89
 */
function getEquippedStatusMessage(context: TrainingContext): string {
  const equipment = context.equipment || {};
  if (equipment[90]) {
    return '＜촉수 페니스자극중＞';
  } else {
    return '＜오나홀 장착중＞';
  }
}

export const COMF17_onahole: CommandPlugin = {
  id: 17,
  name: '오나홀',
  category: '도구',
  staminaCost: 10,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE17
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
   * 원본: COMF17.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const talents = context.talents || {};
    const equipment = context.equipment || {};

    // 커맨드명 표시 (라인 7-13)
    if (equipment[90]) {
      context.showMessage('촉수 페니스자극');
    } else {
      context.showMessage('오나홀');
    }

    // 메시지 생성 및 표시
    const message = generateOnaholeMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateOnaholeSource(context);

    // SOURCE 적용
    if (context.applySource) {
      context.applySource(source);
    } else {
      context.params = context.params || [];
      for (let i = 0; i < source.length && i < context.params.length; i++) {
        context.params[i] = (context.params[i] || 0) + source[i];
      }
    }

    // 경험 상승 (라인 49-61)
    context.exp = context.exp || [];
    if (talents[122] === 0 && context.playerTalents?.[122] === 0) {
      context.exp[40] = (context.exp[40] || 0) + 1;
      context.showMessage('레즈경험 +1');
    } else if (talents[122] === 1 && context.playerTalents?.[122] === 1) {
      context.exp[41] = (context.exp[41] || 0) + 1;
      context.showMessage('호모경험 +1');
    }

    // 오나홀의 착탈 (라인 63-67)
    equipment[17] = equipment[17] === 1 ? 0 : 1;
    if (equipment[90]) {
      // 촉수 중에는 토글하지 않음
      equipment[17] = 0; // T = 0
    }

    if (equipment[17] === 1) {
      context.showMessage('오나홀을 장착했다.');
    } else {
      context.showMessage('오나홀을 제거했다.');
    }

    // 더럽힘 처리 (촉수) (라인 69-76)
    if (equipment[90] && equipment[17]) {
      context.stain = context.stain || [];
      context.stain[3] = (context.stain[3] || 0) | 2; // V에 애액
      context.stain[3] = (context.stain[3] || 0) | 4; // V에 정액
    }
  },
};
