// COMF45: 볼개그 (Ball Gag)
// SM系コマンド

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF45_BallGag: TrainingCommand = {
  id: 45,
  name: '볼개그',

  async execute(context: TrainingContext): Promise<number> {
    const { target, savestr, flags, printFn } = context;

    printFn('볼개그');
    savestr[0] = '볼개그';
    await context.callTrainMessageB();

    // 긴박경험が高いと消費減少
    if (target.exp[51] < target.explv[3] / 2) {
      context.loseBase[0] += 80;
      context.loseBase[1] += 100;
    } else if (target.exp[51] < target.explv[4] / 2) {
      context.loseBase[0] += 60;
      context.loseBase[1] += 80;
    } else {
      context.loseBase[0] += 40;
      context.loseBase[1] += 60;
    }

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    context.source[6] = 50;
    context.source[7] = 50;
    context.source[12] = 80;
    context.source[13] = 150;
    context.source[14] = 80;
    context.source[16] = 80;

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    target.exp[51] += 2;
    printFn('긴박경험 +2');

    // 볼개그の着脱
    flags.TEQUIP[45] = 1 - flags.TEQUIP[45];

    return 1;
  },

  // -------------------------------------------------
  // 볼개그장착중
  // -------------------------------------------------
  async executeEquipped(context: TrainingContext): Promise<void> {
    const { target, player, flags, printFn } = context;

    printFn('＜볼개그장착중＞');

    // 긴박경험が高いと消費減少
    if (target.exp[51] < target.explv[3]) {
      context.loseBase[0] += 50;
      context.loseBase[1] += 100;
    } else if (target.exp[51] < target.explv[4]) {
      context.loseBase[0] += 40;
      context.loseBase[1] += 80;
    } else {
      context.loseBase[0] += 30;
      context.loseBase[1] += 60;
    }

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    // ABL:마조끼をみる
    let a: number;
    if (target.abl[21] === 0) {
      a = 40;
    } else if (target.abl[21] === 1) {
      a = 120;
    } else if (target.abl[21] === 2) {
      a = 250;
    } else if (target.abl[21] === 3) {
      a = 450;
    } else if (target.abl[21] === 4) {
      a = 600;
    } else {
      a = 750;
    }

    // PALAM:욕정をみる
    if (target.palam[5] < target.paramlv[1]) {
      a = Math.floor(a * 0.80);
    } else if (target.palam[5] < target.paramlv[2]) {
      a = Math.floor(a * 0.90);
    } else if (target.palam[5] < target.paramlv[3]) {
      a = Math.floor(a * 1.00);
    } else if (target.palam[5] < target.paramlv[4]) {
      a = Math.floor(a * 1.10);
    } else if (target.palam[5] >= target.paramlv[4]) {
      a = Math.floor(a * 1.20);
    }

    context.source[12] += a;
    context.source[13] += a;
    context.source[14] += a;
    context.source[16] += a;

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    if (target.talent[122] === 0 && player.talent[122] === 0) {
      printFn(`${context.getExpName(40)} +1`);
      target.exp[40] += 1;
    } else if (target.talent[122] === 1 && player.talent[122] === 1) {
      printFn(`${context.getExpName(41)} +1`);
      target.exp[41] += 1;
    }

    target.exp[51] += 1;
    printFn('긴박경험 +1');
  }
};
