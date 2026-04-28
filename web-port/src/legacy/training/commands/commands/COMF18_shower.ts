/**
 * COMF18 - 샤워 (Shower/washing)
 * 원본: ERB/指導関係/COMF18.ERB
 *
 * 도구 사용 커맨드: 조교대상에게 샤워를 뿌려 더러움을 떨어뜨림
 * 착탈 시스템: 실행 시마다 사용/정지 토글
 * 사용 중에는 다른 커맨드 실행 시 추가 SOURCE 적용 (@EQUIP_COM18)
 */

import type { CommandPlugin, TrainingContext } from '../../../../types/training';
import { SourceModifier } from '../../systems/SourceModifier';

/**
 * SOURCE 계산 헬퍼 함수
 * 원본: COMF18.ERB 라인 14-69
 */
function calculateShowerSource(context: TrainingContext): number[] {
  const { target } = context;
  const abilities = target.abl;
  const talents = context.talents || {};

  // LOSEBASE (라인 11-12)
  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + 0;
  context.loseBase[1] = (context.loseBase[1] || 0) + 10;

  // 기본 SOURCE 설정 (라인 17-19)
  const source: number[] = new Array(19).fill(0);

  // PALAM:욕정을 봄 (라인 21-32)
  const lustLevel = getParamLevel(context.params?.[5] || 0);
  if (lustLevel < 1) {
    source[10] = 10;
  } else if (lustLevel < 2) {
    source[10] = 30;
  } else if (lustLevel < 3) {
    source[10] = 60;
  } else if (lustLevel < 4) {
    source[10] = 100;
  } else {
    source[10] = 150;
  }

  // 봉사정신을 봄 (라인 34-47) - 인덱스 11
  const service = abilities[11] || 0;
  if (service === 0) {
    source[9] = 0;
  } else if (service === 1) {
    source[9] = 20;
  } else if (service === 2) {
    source[9] = 40;
  } else if (service === 3) {
    source[9] = 70;
  } else if (service === 4) {
    source[9] = 110;
  } else {
    source[9] = 150;
  }

  // ABL:종순을 봄 (라인 49-62)
  const submission = abilities[10] || 0;
  if (submission === 0) {
    source[7] *= 0.80;
  } else if (submission === 1) {
    source[7] *= 0.90;
  } else if (submission === 2) {
    source[7] *= 1.00;
  } else if (submission === 3) {
    source[7] *= 1.10;
  } else if (submission === 4) {
    source[7] *= 1.20;
  } else {
    source[7] *= 1.30;
  }

  // 동물귀의 경우 (라인 64-69)
  if (talents[124]) {
    source[11] *= 1.60;
    source[8] *= 1.50;
    source[13] = 150;
    source[13] *= 2.00;
  }

  // SourceModifier로 소질/능력 보정 적용
  return SourceModifier.applyAll(source, context);
}

/**
 * 샤워 사용 중 추가 SOURCE 계산
 * 원본: COMF18.ERB @EQUIP_COM18 (라인 105-202)
 */
function calculateEquippedShowerSource(context: TrainingContext): number[] {
  const abilities = context.target.abl;
  const talents = context.talents || {};

  // LOSEBASE (라인 113-114)
  context.loseBase = context.loseBase || [];
  context.loseBase[0] = (context.loseBase[0] || 0) + 0;
  context.loseBase[1] = (context.loseBase[1] || 0) + 10;

  // 기본 SOURCE 설정 (라인 119-120)
  const source: number[] = new Array(19).fill(0);

  // PALAM:욕정을 봄 (라인 122-133)
  const lustLevel = getParamLevel(context.params?.[5] || 0);
  if (lustLevel < 1) {
    source[10] = 10;
  } else if (lustLevel < 2) {
    source[10] = 30;
  } else if (lustLevel < 3) {
    source[10] = 60;
  } else if (lustLevel < 4) {
    source[10] = 100;
  } else {
    source[10] = 150;
  }

  // 봉사정신을 봄 (라인 135-148) - 인덱스 11
  const service = abilities[11] || 0;
  if (service === 0) {
    source[9] = 0;
  } else if (service === 1) {
    source[9] = 20;
  } else if (service === 2) {
    source[9] = 40;
  } else if (service === 3) {
    source[9] = 70;
  } else if (service === 4) {
    source[9] = 110;
  } else {
    source[9] = 150;
  }

  // ABL:종순을 봄 (라인 150-163)
  const submission = abilities[10] || 0;
  if (submission === 0) {
    source[7] *= 0.80;
  } else if (submission === 1) {
    source[7] *= 0.90;
  } else if (submission === 2) {
    source[7] *= 1.00;
  } else if (submission === 3) {
    source[7] *= 1.10;
  } else if (submission === 4) {
    source[7] *= 1.20;
  } else {
    source[7] *= 1.30;
  }

  source[7] += 50;
  source[10] += 50;

  // 동물귀의 경우 (라인 168-174)
  if (talents[124]) {
    source[13] = 150;
    source[11] *= 1.60;
    source[8] *= 1.50;
    source[13] *= 2.00;
  }

  // 경험 상승 (라인 176-188)
  context.exp = context.exp || [];
  if (context.talents?.[122] === 0 && context.playerTalents?.[122] === 0) {
    context.exp[40] = (context.exp[40] || 0) + 1;
    context.showMessage('레즈경험 +1');
  } else if (context.talents?.[122] === 1 && context.playerTalents?.[122] === 1) {
    context.exp[41] = (context.exp[41] || 0) + 1;
    context.showMessage('호모경험 +1');
  }

  // 샤워로 더러움 리셋 (라인 190-200)
  context.stain = context.stain || [];
  context.stain[0] = 0;
  context.stain[1] = 0;
  context.stain[2] = 2;
  context.stain[3] = 1;
  context.stain[4] = 8;
  context.stain[5] = 0;

  context.params = context.params || [];
  context.params[3] = Math.floor(context.params[3] / 2);
  context.params[12] = Math.floor(context.params[12] / 2);

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
function generateShowerMessage(context: TrainingContext): string {
  const targetName = context.target.name;
  return `${targetName}에게 샤워를 뿌려 몸을 씻었다.`;
}

/**
 * 사용 중 상태 메시지
 * 원본: COMF18.ERB @EQUIP_COM18 라인 109-111
 */
function getEquippedStatusMessage(): string {
  return '＜샤워 사용중＞';
}

export const COMF18_shower: CommandPlugin = {
  id: 18,
  name: '샤워',
  category: '도구',
  staminaCost: 0,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE18
   */
  isAvailable: (context: TrainingContext) => {
    // 샤워는 대부분 항상 사용 가능
    return true;
  },

  /**
   * 커맨드 실행
   * 원본: COMF18.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const talents = context.talents || {};
    const equipment = context.equipment || {};

    // 커맨드명 표시 (라인 7)
    context.showMessage('샤워');

    // 메시지 생성 및 표시
    const message = generateShowerMessage(context);
    context.showMessage(message);

    // SOURCE 계산
    const source = calculateShowerSource(context);

    // SOURCE 적용
    if (context.applySource) {
      context.applySource(source);
    } else {
      context.params = context.params || [];
      for (let i = 0; i < source.length && i < context.params.length; i++) {
        context.params[i] = (context.params[i] || 0) + source[i];
      }
    }

    // 경험 상승 (라인 71-83)
    context.exp = context.exp || [];
    if (talents[122] === 0 && context.playerTalents?.[122] === 0) {
      context.exp[40] = (context.exp[40] || 0) + 1;
      context.showMessage('레즈경험 +1');
    } else if (talents[122] === 1 && context.playerTalents?.[122] === 1) {
      context.exp[41] = (context.exp[41] || 0) + 1;
      context.showMessage('호모경험 +1');
    }

    // 샤워의 시작과 종료 (라인 85-87)
    equipment[18] = equipment[18] === 1 ? 0 : 1;

    if (equipment[18] === 1) {
      context.showMessage('샤워를 시작했다.');
    } else {
      context.showMessage('샤워를 멈췄다.');
    }

    // 샤워로 더러움 리셋 (라인 89-98)
    context.stain = context.stain || [];
    context.stain[0] = 0;
    context.stain[1] = 0;
    context.stain[2] = 2;
    context.stain[3] = 1;
    context.stain[4] = 8;
    context.stain[5] = 0;

    // (가능하면) 윤활이 반으로 (라인 99-101)
    context.params = context.params || [];
    context.params[3] = Math.floor(context.params[3] / 2);
    context.params[12] = Math.floor(context.params[12] / 2);
  },
};
