import { CommandPlugin, TrainingContext } from '../../types';

/**
 * COMF144 - 배빵 (Belly Punch)
 * 원본: ERB/指導関係/COMF144.ERB (56 lines)
 *
 * SM계 커맨드: 복부를 타격하여 고통을 가한다
 */
export const COMF144_bellyPunch: CommandPlugin = {
  id: 144,
  name: '배빵',
  category: 'SM',
  staminaCost: 0,

  isAvailable(context: TrainingContext): boolean {
    // 원본: COMF144.ERB (availability not explicitly defined, assuming always available)
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF144.ERB @COM144 (라인 7-52)

    context.showMessage('배빵');

    // SAVESTR:0 = 배빵 (라인 8)
    context.saveStr = context.saveStr || [];
    context.saveStr[0] = '배빵';

    // CALL TRAIN_MESSAGE_B (라인 9)
    // (메시지 생성 로직 - 생략)

    // -------------------------------------------------
    // LOSEBASE 계산 (라인 12-13)
    // -------------------------------------------------
    context.loseBase = context.loseBase || [];
    context.loseBase[0] = (context.loseBase[0] || 0) + 0;
    context.loseBase[1] = (context.loseBase[1] || 0) + 100;

    // -------------------------------------------------
    // SOURCE 계산 (라인 18-31)
    // -------------------------------------------------
    const source: number[] = [];

    // SOURCE:14 = 1000 (라인 18)
    source[14] = 1000;

    // PALAM:苦痛をみる (라인 20-31)
    const palam9 = context.params[9] || 0;
    const palamlv1 = 10000;   // PALAMLV:1
    const palamlv2 = 30000;   // PALAMLV:2
    const palamlv3 = 100000;  // PALAMLV:3
    const palamlv4 = 300000;  // PALAMLV:4

    if (palam9 < palamlv1) {
      // 라인 21-22
      source[6] = 5000;
    } else if (palam9 < palamlv2) {
      // 라인 23-24
      source[6] = 5300;
    } else if (palam9 < palamlv3) {
      // 라인 25-26
      source[6] = 5600;
    } else if (palam9 < palamlv4) {
      // 라인 27-28
      source[6] = 6000;
    } else {
      // 라인 29-30
      source[6] = 6500;
    }

    // -------------------------------------------------
    // 경험치 상승 (라인 36-44)
    // -------------------------------------------------
    context.exp = context.exp || [];

    // EXP:40 (레즈 경험) or EXP:41 (동성 경험) +1 (라인 36-44)
    if (context.talents[122] === 0 && context.playerTalents?.[122] === 0) {
      context.exp[40] = (context.exp[40] || 0) + 1;
      context.showMessage('레즈경험 +1');
    } else if (context.talents[122] === 1 && context.playerTalents?.[122] === 1) {
      context.exp[41] = (context.exp[41] || 0) + 1;
      context.showMessage('동성경험 +1');
    }

    // -------------------------------------------------
    // 기타 처리 (라인 46-50)
    // -------------------------------------------------
    context.tflags = context.tflags || [];

    // 굴복각인3 (라인 47)
    context.tflags[200] = 3;

    // TFLAG:30 (애정 플래그) +1 (라인 49-50)
    const abl21 = context.abilities[21] || 0;
    if (context.assiPlay === 0 && abl21 >= 3) {
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    // SOURCE 적용
    context.source = source;
  }
};
