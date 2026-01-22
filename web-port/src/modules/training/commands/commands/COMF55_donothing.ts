// COMF55: 아무것도 안한다 (Do Nothing/Tease)
// 特殊系コマンド: 아무것도 안한다で調教対象を焦らす

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF55_DoNothing: TrainingCommand = {
  id: 55,
  name: '아무것도 안한다',

  async execute(context: TrainingContext): Promise<number> {
    const { target, savestr, flags, printFn } = context;

    printFn('아무것도 안한다');
    savestr[0] = '아무것도 안한다';

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    context.loseBase[0] += 0;
    context.loseBase[1] += 10;

    context.source[14] = 50;

    // PALAM:욕정をみる
    if (target.palam[5] < target.paramlv[1]) {
      context.source[12] = 10;
    } else if (target.palam[5] < target.paramlv[2]) {
      context.source[12] = 30;
    } else if (target.palam[5] < target.paramlv[3]) {
      context.source[12] = 60;
    } else if (target.palam[5] < target.paramlv[4]) {
      context.source[12] = 100;
    } else if (target.palam[5] >= target.paramlv[4]) {
      context.source[12] = 150;
    }

    // 봉사정신をみる
    if (target.abl[16] === 0) {
      context.source[3] = 0;
    } else if (target.abl[16] === 1) {
      context.source[3] = 20;
    } else if (target.abl[16] === 2) {
      context.source[3] = 40;
    } else if (target.abl[16] === 3) {
      context.source[3] = 70;
    } else if (target.abl[16] === 4) {
      context.source[3] = 110;
    } else {
      context.source[3] = 150;
    }

    // ABL:마조끼をみる
    if (target.abl[21] === 0) {
      context.source[3] = Math.floor(context.source[3] * 0.80);
      context.source[12] = Math.floor(context.source[12] * 0.80);
      context.source[10] = 0;
      context.source[11] = 0;
    } else if (target.abl[21] === 1) {
      context.source[3] = Math.floor(context.source[3] * 1.00);
      context.source[12] = Math.floor(context.source[12] * 1.00);
      context.source[10] = 20;
      context.source[11] = 30;
    } else if (target.abl[21] === 2) {
      context.source[3] = Math.floor(context.source[3] * 1.30);
      context.source[12] = Math.floor(context.source[12] * 1.20);
      context.source[10] = 40;
      context.source[11] = 70;
    } else if (target.abl[21] === 3) {
      context.source[3] = Math.floor(context.source[3] * 1.40);
      context.source[12] = Math.floor(context.source[12] * 1.40);
      context.source[10] = 70;
      context.source[11] = 120;
    } else if (target.abl[21] === 4) {
      context.source[3] = Math.floor(context.source[3] * 1.70);
      context.source[12] = Math.floor(context.source[12] * 1.50);
      context.source[10] = 110;
      context.source[11] = 180;
    } else {
      context.source[3] = Math.floor(context.source[3] * 2.00);
      context.source[12] = Math.floor(context.source[12] * 1.70);
      context.source[10] = 150;
      context.source[11] = 250;
    }

    if (target.palam[5] >= target.paramlv[3]) {
      flags.TFLAG[200] = 1;
    }

    return 1;
  }
};
