/**
 * COMF7 - 조개벌리기 (Self-spread vagina display)
 * 원본: ERB/指導関係/COMF7.ERB
 *
 * 애무계 커맨드: 조교대상 자신이 자신의 성기를 손으로 열어서 보여줌
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';

/**
 * 파라미터 레벨 계산
 */
function getParamLevel(value: number): number {
  const thresholds = [0, 10000, 30000, 100000, 300000, 1000000, 3000000, 10000000];
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (value >= thresholds[i]) return i;
  }
  return 0;
}

/**
 * 경험치 레벨 계산
 */
function getExpLevel(exp: number): number {
  if (exp >= 10000) return 5;
  if (exp >= 5000) return 4;
  if (exp >= 2000) return 3;
  if (exp >= 1000) return 2;
  if (exp >= 500) return 1;
  return 0;
}

/**
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF7.ERB 라인 201-336
 */
function calculateSelfSpreadSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;
  const talents = context.talents;

  // LOSEBASE
  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + 10;
  context.loseBase[1] = (context.loseBase[1] || 0) + 50;

  // 기본 SOURCE 설정
  const source: number[] = new Array(19).fill(0);

  // ABL:V감각
  const vSense = abilities[2] || 0; // V감각
  if (vSense === 0) {
    source[10] = 1500;
    source[8] = 300;
  } else if (vSense === 1) {
    source[10] = 1800;
    source[8] = 600;
  } else if (vSense === 2) {
    source[10] = 2100;
    source[8] = 1000;
  } else if (vSense === 3) {
    source[10] = 2400;
    source[8] = 1500;
  } else if (vSense === 4) {
    source[10] = 2700;
    source[8] = 2100;
  } else {
    source[10] = 3000;
    source[8] = 2800;
  }

  // ABL:봉사정신
  const service = abilities[16] || 0; // 봉사정신
  if (service === 0) {
    source[3] = 100;
    source[7] = 50;
  } else if (service === 1) {
    source[3] = 150;
    source[7] = 100;
  } else if (service === 2) {
    source[3] = 200;
    source[7] = 200;
  } else if (service === 3) {
    source[3] = 250;
    source[7] = 300;
  } else if (service === 4) {
    source[3] = 300;
    source[7] = 500;
  } else {
    source[3] = 350;
    source[7] = 750;
  }

  // ABL:노출벽
  const exhibition = abilities[17] || 0; // 노출벽
  if (exhibition === 0) {
    source[9] += 0;
    source[10] *= 1.00;
    source[7] *= 1.00;
  } else if (exhibition === 1) {
    source[9] += 100;
    source[10] *= 1.20;
    source[7] *= 1.20;
  } else if (exhibition === 2) {
    source[9] += 300;
    source[10] *= 1.40;
    source[7] *= 1.40;
  } else if (exhibition === 3) {
    source[9] += 800;
    source[10] *= 1.60;
    source[7] *= 1.60;
  } else if (exhibition === 4) {
    source[9] += 1500;
    source[10] *= 2.00;
    source[7] *= 2.00;
  } else {
    source[9] += 2500;
    source[10] *= 3.00;
    source[7] *= 3.00;
  }

  // TALENT:노출광
  if (talents[89]) {
    source[9] += 500;
    source[10] *= 1.50;
    source[7] *= 1.50;
  }

  // 음모를 기르는 설정이고 제모상태
  const flags = context.flags || {};
  const charFlags = context.charFlags || {};
  if (flags[36] && talents[125] === 0 && charFlags[6] <= 5) {
    source[10] *= 2.00;
  }

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 실행 가능 여부 판정
 * 원본: COMF7.ERB 라인 14-197
 */
function canExecute(context: TrainingContext): { canExecute: boolean; totalScore: number; requiredScore: number } {
  let a = 0;
  let s = 0;

  const abilities = context.target.abl;
  const talents = context.talents;
  const params = context.params || [];
  const equipment = context.equipment || {};

  // ABL:욕망
  const desire = abilities[11] || 0;
  if (desire) {
    if (s) context.showMessage(' + ');
    a += desire * 3;
    context.showMessage(`욕망 LV${desire}(${desire * 3})`);
    s = 1;
  }

  // ABL:V감각
  const vSense = abilities[2] || 0;
  if (vSense) {
    if (s) context.showMessage(' + ');
    a += vSense * 2;
    context.showMessage(`V감각 LV${vSense}(${vSense * 2})`);
    s = 1;
  }

  // ABL:봉사정신
  const service = abilities[16] || 0;
  if (service) {
    if (s) context.showMessage(' + ');
    a += service * 4;
    context.showMessage(`봉사정신 LV${service}(${service * 4})`);
    s = 1;
  }

  // ABL:노출벽
  const exhibition = abilities[17] || 0;
  if (exhibition) {
    if (s) context.showMessage(' + ');
    a += exhibition * 3;
    context.showMessage(`노출벽 LV${exhibition}(${exhibition * 3})`);
    s = 1;
  }

  // ABL:자위중독
  const masturbation = abilities[18] || 0;
  if (masturbation) {
    if (s) context.showMessage(' + ');
    a += masturbation * 3;
    context.showMessage(`자위중독 LV${masturbation}(${masturbation * 3})`);
    s = 1;
  }

  // PALAM:윤활(의 부족)
  const lubLevel = getParamLevel(params[3] || 0);
  if (lubLevel < 1) {
    context.showMessage(' - ');
    a -= 5;
    context.showMessage('윤활 부족(5)');
    s = 1;
  }

  // PALAM:욕정
  const lustLevel = getParamLevel(params[5] || 0);
  let l = lustLevel;
  if (l) {
    if (s) context.showMessage(' + ');
    a += l * 3;
    context.showMessage(`욕정 LV${l}(${l * 3})`);
    s = 1;
  }

  // 수줍음
  if (talents[35]) {
    context.showMessage(' - ');
    a -= 2;
    context.showMessage('수줍음(2)');
    s = 1;
  }

  // 부끄럼 없음
  if (talents[36]) {
    if (s) context.showMessage(' + ');
    a += 2;
    context.showMessage('부끄럼 없음(2)');
    s = 1;
  }

  // 쾌감에 솔직
  if (talents[70]) {
    if (s) context.showMessage(' + ');
    a += 5;
    context.showMessage('쾌감에 솔직(5)');
    s = 1;
  }

  // 쾌감을 부정
  if (talents[71]) {
    context.showMessage(' - ');
    a -= 5;
    context.showMessage('쾌감을 부정(5)');
    s = 1;
  }

  // 노출광
  if (talents[89]) {
    if (s) context.showMessage(' + ');
    a += 10;
    context.showMessage('노출광(10)');
    s = 1;
  }

  // 처녀
  const exp = context.exp || [];
  if (talents[0]) {
    context.showMessage(' - ');
    a -= 20;
    context.showMessage('처녀(20)');
    s = 1;
  } else {
    const vExpLevel = getExpLevel(exp[0] || 0);
    if (vExpLevel < 2) {
      context.showMessage(' - ');
      a -= 5;
      context.showMessage('V경험 부족(5)');
      s = 1;
    }
  }

  // 미약
  if (equipment[21]) {
    if (s) context.showMessage(' + ');
    a += 6;
    context.showMessage('미약(6)');
    s = 1;
  }

  // 합계를 표시 (22 이상이면 실행)
  context.showMessage(` = ${a}`);

  // 난이도 상승: 공개로 +10
  let v = 22;
  if (equipment[53]) {
    v += 10;
  }

  // 실행치 표시
  if (a < v) {
    context.showMessage(` < `);
  } else if (a === v) {
    context.showMessage(` = `);
  } else {
    context.showMessage(` > `);
  }
  context.showMessage(`실행치 ${v}`);

  return { canExecute: a >= v, totalScore: a, requiredScore: v };
}

/**
 * 메시지 생성 헬퍼 함수
 */
function generateSelfSpreadMessage(context: TrainingContext): string {
  const targetName = context.target.name;
  return `${targetName}이(가) 자신의 성기를 손으로 벌려 보여주었다.`;
}

export const COMF7_selfSpread: CommandPlugin = {
  id: 7,
  name: '조개벌리기',
  category: '애무',
  staminaCost: 10,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE7
   */
  isAvailable: (context: TrainingContext) => {
    // TODO: Add availability check from COMABLE.ERB
    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF7.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const equipment = context.equipment || {};

    // 커맨드명 표시
    if (equipment[53]) {
      context.showMessage('공개 조개벌리기');
    } else {
      context.showMessage('조개벌리기');
    }

    // 실행 가능 여부 판정
    const result = canExecute(context);
    if (!result.canExecute) {
      return;
    }

    // 메시지 생성 및 표시
    const message = generateSelfSpreadMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateSelfSpreadSource(context);

    // 더럽힘 처리
    // 손가락 ⇔ V의 더러움이 이동
    context.stain = context.stain || [];
    context.stain[1] = (context.stain[1] || 0) | (context.stain[3] || 0);
    context.stain[3] = (context.stain[3] || 0) | (context.stain[1] || 0);

    // SOURCE 적용
    if (context.applySource) {
      context.applySource(source);
    } else {
      context.params = context.params || [];
      for (let i = 0; i < source.length && i < context.params.length; i++) {
        context.params[i] = (context.params[i] || 0) + source[i];
      }
    }

    // 경험치 획득
    context.exp = context.exp || [];
    const exhibition = context.target.abl[17] || 0; // 노출벽

    // 노출벽 Lv3 이상이면 자위경험에 +1
    if (exhibition >= 3) {
      // 비디오 촬영시는 경험에 플러스
      if (equipment[53]) {
        context.exp[10] = (context.exp[10] || 0) + 2;
        context.showMessage('자위경험 +2');
        context.exp[11] = (context.exp[11] || 0) + 2;
        context.showMessage('지도자위경험 +2');
      } else {
        context.exp[10] = (context.exp[10] || 0) + 1;
        context.showMessage('자위경험 +1');
        context.exp[11] = (context.exp[11] || 0) + 1;
        context.showMessage('지도자위경험 +1');
      }

      context.charFlags = context.charFlags || {};
      if (equipment[53] && context.charFlags[3] === 0) {
        context.exp[50] = (context.exp[50] || 0) + 1;
        context.showMessage('이상경험 +1');
        context.charFlags[3] = 1;
      }
    }

    // 레즈경험
    const playerTalents = context.playerTalents || [];
    if (context.talents[122] === 0 && playerTalents[122] === 0) {
      context.exp[40] = (context.exp[40] || 0) + 2;
      context.showMessage('레즈경험 +2');
    }

    // 기타 처리
    // 굴복각인1에 해당
    context.flags = context.flags || {};
    context.flags[200] = 1;
  },
};
