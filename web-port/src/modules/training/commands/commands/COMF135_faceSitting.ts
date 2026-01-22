/**
 * COMF135: 안면기승 플레이 (Face Sitting Play)
 * 원본: ERB/指導関係/COMF135.ERB
 *
 * 안면기승 플레이: Toggle equipment command
 */

import { CommandPlugin } from '../../types';
import { TrainingContext, SourceValues } from '../../types';

export const comf135FaceSitting: CommandPlugin = {
  id: 135,
  name: '안면기승 플레이',
  category: '특수',
  staminaCost: 0,

  isAvailable(context: TrainingContext): boolean {
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // PRINTL 안면기승 플레이 (라인 4)
    context.showMessage('안면기승 플레이');

    // SAVESTR:0 = 안면기승 플레이 (라인 5)
    context.saveStr = context.saveStr || [];
    context.saveStr[0] = '안면기승 플레이';

    // CALL TRAIN_MESSAGE_B (라인 6)
    // (메시지 생성 시스템 호출)

    // 終了時は修正なし (라인 9-13)
    if (context.equipment[55]) {
      context.equipment[55] = 0;
      return;
    }

    // 체력は消費なし (라인 15-16)
    context.loseBase[0] = (context.loseBase[0] || 0) + 0;
    // 기력は200消費 (라인 17-18)
    context.loseBase[1] = (context.loseBase[1] || 0) + 200;

    // A, B 계산 (라인 21-22)
    let A = 500;
    let B = 500;

    // EXP:가학쾌락경험をみる (라인 24-35)
    const exp33 = context.exp[33] || 0;
    const explv1 = 100;
    const explv2 = 500;
    const explv3 = 2000;
    const explv4 = 8000;

    if (exp33 < explv1) {
      A = Math.floor(A * 1.00);
    } else if (exp33 < explv2) {
      A = Math.floor(A * 1.10);
    } else if (exp33 < explv3) {
      A = Math.floor(A * 1.20);
    } else if (exp33 < explv4) {
      A = Math.floor(A * 1.30);
    } else if (exp33 < explv4) { // 원본 버그: explv4 두 번 비교
      A = Math.floor(A * 1.40);
    }

    const source: number[] = new Array(19).fill(0);

    // ABL:노출벽をみる (라인 37-70)
    const abl17 = context.abilities[17] || 0;
    if (abl17 === 0) {
      source[10] += 0;
      source[7] += 0;
      source[11] += 600;
      source.노출 += 1000;
      source[14] += 1000;
      A = Math.floor(A * 0.60);
    } else if (abl17 === 1) {
      source[10] += 150;
      source[7] += 150;
      source[11] += 500;
      A = Math.floor(A * 1.00);
    } else if (abl17 === 2) {
      source[10] += 300;
      source[7] += 300;
      source[11] += 400;
      A = Math.floor(A * 1.60);
    } else if (abl17 === 3) {
      source[10] += 600;
      source[7] += 600;
      source[11] += 300;
      A = Math.floor(A * 2.00);
    } else if (abl17 === 4) {
      source[10] += 1000;
      source[7] += 1000;
      source[11] += 200;
      A = Math.floor(A * 2.60);
    } else {
      source[10] += 1800;
      source[7] += 1800;
      source[11] += 100;
      A = Math.floor(A * 3.80);
    }

    // ABL:새드끼をみる (라인 71-84)
    const abl20 = context.abilities[20] || 0;
    if (abl20 === 0) {
      A = Math.floor(A * 1.00);
    } else if (abl20 === 1) {
      A = Math.floor(A * 1.20);
    } else if (abl20 === 2) {
      A = Math.floor(A * 1.40);
    } else if (abl20 === 3) {
      A = Math.floor(A * 1.60);
    } else if (abl20 === 4) {
      A = Math.floor(A * 1.80);
    } else {
      A = Math.floor(A * 2.00);
    }

    // 무관심 (라인 86-88)
    if (context.talents[21]) {
      A = Math.floor(A * 0.80);
    }
    // 감정부족 (라인 89-91)
    if (context.talents[22]) {
      A = Math.floor(A * 0.80);
    }
    // 호기심 (라인 92-94)
    if (context.talents[23]) {
      A = Math.floor(A * 2.50);
    }
    // 해방 (라인 95-97)
    if (context.talents[33]) {
      A = Math.floor(A * 1.50);
    }

    // 겁쟁이 (라인 99-101)
    if (context.talents[10]) {
      B = Math.floor(B * 1.50);
    }
    // 수줍음 (라인 102-104)
    if (context.talents[35]) {
      B = Math.floor(B * 3.00);
    }

    // 도착적 (라인 106-109)
    if (context.talents[80]) {
      A = Math.floor(A * 1.50);
      B = Math.floor(B * 1.20);
    }
    // 매력 (라인 110-115)
    if (context.talents[113]) {
      source[11] += 500;
      source.노출 += 500;
      A = Math.floor(A * 1.50);
      B = Math.floor(B * 1.20);
    }

    // SOURCE 적용 (라인 117-119)
    source[12] += A;
    source.노출 += B;
    source[8] += Math.floor(A / 2);

    // TEQUIP:55 = 1 (라인 121)
    context.equipment[55] = 1;

    await context.applySource(source);
  }
};

/**
 * EQUIP_COM135: 안면기승 플레이 중 (Face Sitting Active)
 * 원본: ERB/指導関係/COMF135.ERB @EQUIP_COM135
 */
export const equipCom135FaceSitting: CommandPlugin = {
  id: 1135, // Equipment version uses different ID
  name: '안면기승 플레이중',
  category: '특수',
  staminaCost: 10,

  isAvailable(context: TrainingContext): boolean {
    return context.equipment[55] === 1;
  },

  async execute(context: TrainingContext): Promise<void> {
    // PRINTL ＜안면기승 플레이중＞ (라인 130)
    context.showMessage('＜안면기승 플레이중＞');

    // LOSEBASE (라인 132-133)
    context.loseBase[0] = (context.loseBase[0] || 0) + 10;
    context.loseBase[1] = (context.loseBase[1] || 0) + 100;

    // A, B 계산 (라인 135-136)
    let A = 500;
    let B = 500;

    // EXP:가학쾌락경험をみる (라인 138-149)
    const exp33 = context.exp[33] || 0;
    const explv1 = 100;
    const explv2 = 500;
    const explv3 = 2000;
    const explv4 = 8000;

    if (exp33 < explv1) {
      A = Math.floor(A * 1.00);
    } else if (exp33 < explv2) {
      A = Math.floor(A * 1.10);
    } else if (exp33 < explv3) {
      A = Math.floor(A * 1.20);
    } else if (exp33 < explv4) {
      A = Math.floor(A * 1.30);
    } else if (exp33 < explv4) { // 원본 버그 보존
      A = Math.floor(A * 1.40);
    }

    const source: number[] = new Array(19).fill(0);

    // ABL:노출벽をみる (라인 150-183)
    const abl17 = context.abilities[17] || 0;
    if (abl17 === 0) {
      source[10] += 0;
      source[7] += 0;
      source[11] += 600;
      source.노출 += 1000;
      source[14] += 1000;
      A = Math.floor(A * 0.30);
    } else if (abl17 === 1) {
      source[10] += 150;
      source[7] += 150;
      source[11] += 500;
      A = Math.floor(A * 1.00);
    } else if (abl17 === 2) {
      source[10] += 300;
      source[7] += 300;
      source[11] += 400;
      A = Math.floor(A * 2.00);
    } else if (abl17 === 3) {
      source[10] += 600;
      source[7] += 600;
      source[11] += 300;
      A = Math.floor(A * 3.60);
    } else if (abl17 === 4) {
      source[10] += 1000;
      source[7] += 1000;
      source[11] += 200;
      A = Math.floor(A * 4.60);
    } else {
      source[10] += 1800;
      source[7] += 1800;
      source[11] += 100;
      A = Math.floor(A * 5.80);
    }

    // ABL:새드끼をみる (라인 184-197)
    const abl20 = context.abilities[20] || 0;
    if (abl20 === 0) {
      A = Math.floor(A * 1.00);
    } else if (abl20 === 1) {
      A = Math.floor(A * 1.20);
    } else if (abl20 === 2) {
      A = Math.floor(A * 1.40);
    } else if (abl20 === 3) {
      A = Math.floor(A * 1.60);
    } else if (abl20 === 4) {
      A = Math.floor(A * 1.80);
    } else {
      A = Math.floor(A * 2.00);
    }

    // 무관심 (라인 199-201)
    if (context.talents[21]) {
      A = Math.floor(A * 0.80);
    }
    // 감정부족 (라인 202-204)
    if (context.talents[22]) {
      A = Math.floor(A * 0.80);
    }
    // 호기심 (라인 205-207)
    if (context.talents[23]) {
      A = Math.floor(A * 2.50);
    }
    // 해방 (라인 208-210)
    if (context.talents[33]) {
      A = Math.floor(A * 1.50);
    }

    // 겁쟁이 (라인 212-214)
    if (context.talents[10]) {
      B = Math.floor(B * 1.50);
    }
    // 수줍음 (라인 215-217)
    if (context.talents[35]) {
      B = Math.floor(B * 3.00);
    }

    // 도착적 (라인 219-222)
    if (context.talents[80]) {
      A = Math.floor(A * 1.50);
      B = Math.floor(B * 1.20);
    }
    // 매력 (라인 223-228)
    if (context.talents[113]) {
      source[11] += 500;
      source.노출 += 500;
      A = Math.floor(A * 1.50);
      B = Math.floor(B * 1.20);
    }

    // SOURCE 적용 (라인 230-232)
    source[12] += A;
    source.노출 += B;
    source[8] += Math.floor(A / 2);

    // 가학쾌락경험 +1 (라인 234-235)
    context.showMessage('가학쾌락경험 +1');
    context.exp[33] = (context.exp[33] || 0) + 1;

    // 레즈・ホモ経験 (라인 237-248)
    if (!context.talents[122] && !context.playerTalents?.[122]) {
      context.showMessage('이성애경험 +1');
      context.exp[40] = (context.exp[40] || 0) + 1;
    } else if (context.talents[122] && context.playerTalents?.[122]) {
      context.showMessage('동성애경험 +1');
      context.exp[41] = (context.exp[41] || 0) + 1;
    }

    // 助手でなく対象の노출벽が3以上なら主人経験 +1 (라인 250-252)
    if (context.assiPlay === 0 && (context.abilities[17] || 0) >= 3) {
      context.tflags = context.tflags || [];
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    await context.applySource(source);
  }
};
