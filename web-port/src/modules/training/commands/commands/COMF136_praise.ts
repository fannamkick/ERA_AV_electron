/**
 * COMF136: 칭찬한다 (Praise)
 * 원본: ERB/指導関係/COMF136.ERB
 *
 * 애무系コマンド: 調教者が調教対象を칭찬한다
 */

import { CommandPlugin } from '../../types';
import { TrainingContext, SourceValues } from '../../types';

export const comf136Praise: CommandPlugin = {
  id: 136,
  name: '칭찬한다',
  category: '애무',
  staminaCost: 5,

  isAvailable(context: TrainingContext): boolean {
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // PRINTL 칭찬한다 (라인 7)
    context.showMessage('칭찬한다');

    // SAVESTR:0 = 칭찬한다 (라인 9)
    context.saveStr = context.saveStr || [];
    context.saveStr[0] = '칭찬한다';

    // CALL TRAIN_MESSAGE_B (라인 10)
    // (메시지 생성 시스템 호출)

    // ソースの計算 (라인 12-46)
    // LOSEBASE (라인 15-16)
    context.loseBase[0] = (context.loseBase[0] || 0) + 5;
    context.loseBase[1] = (context.loseBase[1] || 0) + 50;

    const source: number[] = new Array(19).fill(0);

    // ABL:봉사정신をみる (라인 19-44)
    const abl16 = context.abilities[16] || 0;
    if (abl16 === 0) {
      source[5] = 50;
      source[4] = 10;
      source[17] = Math.floor(source[17] * 4.00);
    } else if (abl16 === 1) {
      source[5] = 150;
      source[4] = 50;
      source[17] = Math.floor(source[17] * 2.50);
    } else if (abl16 === 2) {
      source[5] = 200;
      source[4] = 100;
      source[17] = Math.floor(source[17] * 1.50);
    } else if (abl16 === 3) {
      source[5] = 250;
      source[4] = 180;
      source[17] = Math.floor(source[17] * 1.00);
    } else if (abl16 === 4) {
      source[5] = 300;
      source[4] = 300;
      source[17] = Math.floor(source[17] * 0.50);
    } else {
      source[5] = 350;
      source[4] = 500;
      source[17] = Math.floor(source[17] * 0.10);
    }

    // TALENT:愛をみる (라인 48-50)
    if (context.talents[85]) {
      source[0] = Math.floor(source[0] * 2.00);
    }

    // 汚れの処理 (라인 52-57)
    // 奴隷の口⇔調教者の口の汚れが移動 (라인 55-57)
    context.stain = context.stain || [];
    context.playerStain = context.playerStain || [];
    context.stain[0] = (context.stain[0] || 0) | (context.playerStain[0] || 0);
    context.playerStain[0] = (context.playerStain[0] || 0) | (context.stain[0] || 0);

    // 経験上昇 (라인 59-71)
    // レズ・ホモ経験 (라인 62-71)
    if (!context.talents[122] && !context.playerTalents?.[122]) {
      context.showMessage('이성애경험 +3');
      context.exp[40] = (context.exp[40] || 0) + 3;
    } else if (context.talents[122] && context.playerTalents?.[122]) {
      context.showMessage('동성애경험 +3');
      context.exp[41] = (context.exp[41] || 0) + 3;
    }

    // 애정경험 (라인 73-86)
    // 基本値 (라인 74-75)
    let E = 1;

    // 愛かつ主人なら基本値に＋2 (라인 77-79)
    if (context.talents[85] && context.assiPlay === 0) {
      E += 2;
    }

    if ((context.charFlags[2] || 0) >= 1000 && context.assiPlay === 0) {
      context.showMessage(`애정경험+${E}`);
      context.exp[23] = (context.exp[23] || 0) + E;
    }

    // その他の処理 (라인 88-95)
    // TFLAG:100 = 1 (라인 91)
    context.tflags = context.tflags || [];
    context.tflags[100] = 1;

    // 主人경험 (라인 93-94)
    if (context.assiPlay === 0) {
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    await context.applySource(source);
  }
};
