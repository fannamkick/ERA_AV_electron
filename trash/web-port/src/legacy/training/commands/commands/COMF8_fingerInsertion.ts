/**
 * COMF8 - 손가락삽입 (Finger insertion into vagina)
 * 원본: ERB/指導関係/COMF8.ERB
 *
 * 애무계 커맨드: 조교자가 조교대상의 성기를 손으로 자극
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';

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
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF8.ERB 라인 17-127
 */
function calculateFingerInsertionSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;
  const talents = context.talents;
  const params = context.params || [];
  const exp = context.exp || [];

  // LOSEBASE
  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + 30;
  context.loseBase[1] = (context.loseBase[1] || 0) + 80;

  // 기본 SOURCE 설정
  const source: number[] = new Array(19).fill(0);

  // ABL:V감각
  const vSense = abilities[2] || 0; // V감각
  if (vSense === 0) {
    source[1] = 10;
    source[8] = 150;
  } else if (vSense === 1) {
    source[1] = 50;
    source[8] = 250;
  } else if (vSense === 2) {
    source[1] = 250;
    source[8] = 400;
  } else if (vSense === 3) {
    source[1] = 600;
    source[8] = 700;
  } else if (vSense === 4) {
    source[1] = 1200;
    source[8] = 1300;
  } else {
    source[1] = 1800;
    source[8] = 2000;
  }

  // EXP:V경험
  const vExpLevel = getExpLevel(exp[0] || 0);
  if (vExpLevel < 1) {
    source[1] *= 0.20;
    source[8] *= 0.20;
    source[12] = 300;
  } else if (vExpLevel < 2) {
    source[1] *= 0.50;
    source[8] *= 0.50;
    source[12] = 180;
  } else if (vExpLevel < 3) {
    source[1] *= 1.00;
    source[8] *= 0.80;
    source[12] = 80;
  } else if (vExpLevel < 4) {
    source[1] *= 1.20;
    source[8] *= 1.00;
    source[12] = 30;
  } else if (vExpLevel < 5) {
    source[1] *= 1.60;
    source[8] *= 1.20;
    source[12] = 0;
  } else {
    source[1] *= 1.80;
    source[8] *= 1.50;
    source[12] = 0;
  }

  // PALAM:윤활
  const lubLevel = getParamLevel(params[3] || 0);
  if (lubLevel < 1) {
    source[1] *= 0.10;
    source[12] += 700;
    source[12] *= 3.00;
  } else if (lubLevel < 2) {
    source[1] *= 0.20;
    source[12] += 200;
    source[12] *= 1.00;
  } else if (lubLevel < 3) {
    source[1] *= 0.60;
    source[12] *= 0.80;
  } else if (lubLevel < 4) {
    source[1] *= 1.00;
    source[12] *= 0.50;
  } else {
    source[1] *= 2.00;
    source[12] *= 0.10;
  }

  // PALAM:욕정
  const lustLevel = getParamLevel(params[5] || 0);
  if (lustLevel < 1) {
    source[1] *= 0.50;
  } else if (lustLevel < 2) {
    source[1] *= 0.80;
  } else if (lustLevel < 3) {
    source[1] *= 1.20;
  } else if (lustLevel < 4) {
    source[1] *= 1.50;
  } else {
    source[1] *= 1.80;
  }

  // V민감, 둔감
  if (talents[103]) {
    source[12] *= 1.50;
    source[8] *= 1.50;
    source[11] *= 1.50;
  } else if (talents[104]) {
    source[12] *= 0.60;
    source[8] *= 0.60;
    source[11] *= 0.60;
  }

  // 처녀로 정조관념
  if (exp[0] === 0 && talents[30]) {
    source[8] *= 2.00;
  }

  // 미숙함
  if (talents[135]) {
    source[12] *= 2.00;
  }

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 메시지 생성 헬퍼 함수
 */
function generateFingerInsertionMessage(context: TrainingContext): string {
  const targetName = context.target.name;
  return `${targetName}의 질에 손가락을 삽입했다.`;
}

export const COMF8_fingerInsertion: CommandPlugin = {
  id: 8,
  name: '손가락삽입',
  category: '애무',
  staminaCost: 30,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE8
   */
  isAvailable: (context: TrainingContext) => {
    // TODO: Add availability check from COMABLE.ERB
    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF8.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    // 전회의 조교가 손가락삽입이고 플레이어의 기교3 이상이면 G스팟자극으로
    const prevCom = context.prevCom || 0;
    const playerAbilities = context.playerAbilities || [];
    const playerTechnique = playerAbilities[12] || 0; // 기교
    if (prevCom === 8 && playerTechnique >= 3) {
      // TODO: JUMP COM84
      context.showMessage('[파생] G스팟자극 가능');
    }

    // 전회의 조교가 G스팟이면 계속 G스팟자극으로
    if (prevCom === 84) {
      // TODO: JUMP COM84
      context.showMessage('[파생] G스팟자극 계속');
    }

    // 커맨드명 표시
    context.showMessage('손가락삽입');

    // 메시지 생성 및 표시
    const message = generateFingerInsertionMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateFingerInsertionSource(context);

    // 더럽힘 처리
    context.stain = context.stain || [];
    context.playerStain = context.playerStain || [];
    const equipment = context.equipment || {};

    if (equipment[90]) {
      // V에 촉수의 더러움이 붙음
      context.stain[3] = (context.stain[3] || 0) | 2; // 애액
      context.stain[3] = (context.stain[3] || 0) | 4; // 정액
    } else {
      // V ⇔ 조교자의 손가락의 더러움이 이동
      context.stain[3] = (context.stain[3] || 0) | (context.playerStain[1] || 0);
      context.playerStain[1] = (context.playerStain[1] || 0) | (context.stain[3] || 0);
    }

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
    const playerTalents = context.playerTalents || [];

    // 레즈경험
    if (context.talents[122] === 0 && playerTalents[122] === 0) {
      context.exp[40] = (context.exp[40] || 0) + 4;
      context.showMessage('레즈경험 +4');
    }

    if (context.talents[0] === 0) {
      context.exp[0] = (context.exp[0] || 0) + 1;
      context.showMessage('V경험 +1');
    }

    // 애정경험
    const charFlags = context.charFlags || {};
    if (charFlags[2] >= 1000 && context.assiPlay === 0) {
      context.exp[23] = (context.exp[23] || 0) + 1;
      context.showMessage('애정경험 +1');
    }
  },
};
