/**
 * COMF137: 삼각목마 (Triangle Horse / Wooden Horse)
 * 원본: ERB/指導関係/COMF137.ERB
 *
 * 道具使用コマンド: 삼각목마に乗せて클리토리스를刺激
 */

import { CommandPlugin } from '../../types';
import { TrainingContext, SourceValues } from '../../types';

export const comf137TriangleHorse: CommandPlugin = {
  id: 137,
  name: '삼각목마',
  category: '도구',
  staminaCost: 0,

  isAvailable(context: TrainingContext): boolean {
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // PRINTL 삼각목마 (라인 7)
    context.showMessage('삼각목마');

    // SAVESTR:0 = 삼각목마 (라인 8)
    context.saveStr = context.saveStr || [];
    context.saveStr[0] = '삼각목마';

    // CALL TRAIN_MESSAGE_B (라인 9)
    // (메시지 생성 시스템 호출)

    // ソースの計算 (라인 11-63)
    // LOSEBASE (라인 14-15)
    context.loseBase[0] = (context.loseBase[0] || 0) + 0;
    context.loseBase[1] = (context.loseBase[1] || 0) + 20;

    const source: number[] = new Array(19).fill(0);

    // ABL:C感覚をみる (라인 18-31)
    const abl0 = context.abilities[0] || 0;
    if (abl0 === 0) {
      source[0] = 400;
    } else if (abl0 === 1) {
      source[0] = 800;
    } else if (abl0 === 2) {
      source[0] = 1800;
    } else if (abl0 === 3) {
      source[0] = 3200;
    } else if (abl0 === 4) {
      source[0] = 4800;
    } else {
      source[0] = 6000;
    }

    // PALAM:苦痛をみる (라인 33-44)
    const palam9 = context.params[9] || 0;
    const palamlv1 = 1000;
    const palamlv2 = 3000;
    const palamlv3 = 10000;
    const palamlv4 = 30000;

    if (palam9 < palamlv1) {
      source[12] = 3000;
    } else if (palam9 < palamlv2) {
      source[12] = 3300;
    } else if (palam9 < palamlv3) {
      source[12] = 3600;
    } else if (palam9 < palamlv4) {
      source[12] = 4000;
    } else if (palam9 >= palamlv4) {
      source[12] = 4500;
    }

    // 大きいと重いので食い込みが強くなる (라인 46-56)
    // 큰체구 (라인 47-51)
    if (context.talents[99]) {
      source[0] = Math.floor(source[0] * 1.80);
      source[12] = Math.floor(source[12] * 1.80);
    }
    // 작은체형 (라인 52-56)
    if (context.talents[100]) {
      source[0] = Math.floor(source[0] * 0.80);
      source[12] = Math.floor(source[12] * 0.80);
    }

    // ****슬라임パッチ追加ここから**** (라인 58-62)
    if (context.items?.[213] && context.items[213] >= 1) {
      source[0] = Math.floor(source[0] * 1.20);
      source[12] = Math.floor(source[12] * 1.50);
    }
    // ****슬라임パッチ追加ここまで**** (라인 63)

    // 経験上昇 (라인 64-78)
    if (!context.talents[122] && !context.playerTalents?.[122]) {
      context.showMessage('이성애경험 +2');
      context.exp[40] = (context.exp[40] || 0) + 2;
    } else if (context.talents[122] && context.playerTalents?.[122]) {
      context.showMessage('동성애경험 +2');
      context.exp[41] = (context.exp[41] || 0) + 2;
    }

    if (context.assiPlay === 0 && (context.abilities[21] || 0) >= 3) {
      context.tflags = context.tflags || [];
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    // 삼각목마の乗降 (라인 85-91)
    context.equipment = context.equipment || [];
    if (context.equipment[70] && context.equipment[70] >= 1) {
      context.equipment[70] = 0;
    } else {
      context.equipment[70] = 1;
    }

    await context.applySource(source);
  }
};

/**
 * EQUIP_COM137: 삼각목마 기승 중 (Triangle Horse Active)
 * 원본: ERB/指導関係/COMF137.ERB @EQUIP_COM137
 */
export const equipCom137TriangleHorse: CommandPlugin = {
  id: 1137, // Equipment version uses different ID
  name: '삼각목마 기승 중',
  category: '도구',
  staminaCost: 10,

  isAvailable(context: TrainingContext): boolean {
    return (context.equipment[70] || 0) >= 1;
  },

  async execute(context: TrainingContext): Promise<void> {
    // PRINTL ＜삼각목마 기승 중＞ (라인 99)
    context.showMessage('＜삼각목마 기승 중＞');

    // LOSEBASE (라인 101-102)
    context.loseBase[0] = (context.loseBase[0] || 0) + 10;
    context.loseBase[1] = (context.loseBase[1] || 0) + 20;

    // ソースの計算 (라인 104-157)
    const source: number[] = new Array(19).fill(0);

    // ABL:C感覚をみる (라인 107-120)
    const abl0 = context.abilities[0] || 0;
    const tequip70 = context.equipment[70] || 0;

    let A = 0;
    if (abl0 === 0) {
      A = 40 + 10 * tequip70;
    } else if (abl0 === 1) {
      A = 80 + 20 * tequip70;
    } else if (abl0 === 2) {
      A = 180 + 30 * tequip70;
    } else if (abl0 === 3) {
      A = 320 + 40 * tequip70;
    } else if (abl0 === 4) {
      A = 480 + 50 * tequip70;
    } else {
      A = 600 + 100 * tequip70;
    }

    // PALAM:苦痛をみる (라인 124-135)
    const palam9 = context.params[9] || 0;
    const palamlv1 = 1000;
    const palamlv2 = 3000;
    const palamlv3 = 10000;
    const palamlv4 = 30000;

    let B = 0;
    if (palam9 < palamlv1) {
      B = 290 + 10 * tequip70;
    } else if (palam9 < palamlv2) {
      B = 320 + 10 * tequip70;
    } else if (palam9 < palamlv3) {
      B = 350 + 10 * tequip70;
    } else if (palam9 < palamlv4) {
      B = 390 + 10 * tequip70;
    } else if (palam9 >= palamlv4) {
      B = 440 + 10 * tequip70;
    }

    // 大きいと重いので食い込みが強くなる (라인 137-147)
    // 큰체구 (라인 138-142)
    if (context.talents[99]) {
      A = Math.floor(A * 1.80);
      B = Math.floor(B * 1.80);
    }
    // 작은체형 (라인 143-147)
    if (context.talents[100]) {
      A = Math.floor(A * 0.80);
      B = Math.floor(B * 0.80);
    }

    source[0] += A;
    source[12] += B;

    // ****슬라임パッチ追加ここから**** (라인 152-157)
    if (context.items?.[213] && context.items[213] >= 1) {
      source[0] = Math.floor(source[0] * 1.20);
      source[12] = Math.floor(source[12] * 1.50);
      source[17] = Math.floor(source[17] * 1.50);
    }
    // ****슬라임パッチ追加ここまで**** (라인 158)

    // 経験上昇 (라인 159-173)
    if (!context.talents[122] && !context.playerTalents?.[122]) {
      context.showMessage('이성애경험 +1');
      context.exp[40] = (context.exp[40] || 0) + 1;
    } else if (context.talents[122] && context.playerTalents?.[122]) {
      context.showMessage('동성애경험 +1');
      context.exp[41] = (context.exp[41] || 0) + 1;
    }

    if (context.assiPlay === 0 && (context.abilities[21] || 0) >= 3) {
      context.tflags = context.tflags || [];
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    // その他の処理 (라인 175-179)
    // 放置すると食い込んで効果が高くなる (라인 178-179)
    context.equipment[70] = (context.equipment[70] || 0) + 1;

    await context.applySource(source);
  }
};
