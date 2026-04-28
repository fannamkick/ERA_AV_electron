// COMF44: 밧줄 (Rope/Bondage)
// SM系コマンド

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF44_Rope: TrainingCommand = {
  id: 44,
  name: '밧줄',

  async execute(context: TrainingContext): Promise<number> {
    const { target, player, savestr, flags, printFn, items, variables } = context;

    if (flags.TEQUIP[90]) {
      printFn('촉수 긴박');
      savestr[0] = '촉수 긴박';
    } else {
      printFn('밧줄');
      savestr[0] = '밧줄';
    }
    await context.callTrainMessageB();

    // 긴박경험が高いと消費減少
    if (target.exp[51] < target.explv[3] / 2) {
      context.loseBase[0] += 100;
      context.loseBase[1] += 150;
    } else if (target.exp[51] < target.explv[4] / 2) {
      context.loseBase[0] += 80;
      context.loseBase[1] += 120;
    } else {
      context.loseBase[0] += 60;
      context.loseBase[1] += 90;
    }

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    context.source[6] = 800;
    context.source[10] = 800;
    context.source[13] = 500;
    context.source[14] = 500;

    // PALAM:욕정をみる
    if (target.palam[5] < target.paramlv[1]) {
      context.source[10] = Math.floor(context.source[10] * 0.80);
    } else if (target.palam[5] < target.paramlv[2]) {
      context.source[10] = Math.floor(context.source[10] * 0.90);
    } else if (target.palam[5] < target.paramlv[3]) {
      context.source[10] = Math.floor(context.source[10] * 1.00);
    } else if (target.palam[5] < target.paramlv[4]) {
      context.source[10] = Math.floor(context.source[10] * 1.10);
    } else if (target.palam[5] >= target.paramlv[4]) {
      context.source[10] = Math.floor(context.source[10] * 1.20);
    }

    // ABL:従順をみる
    if (target.abl[10] === 0) {
      context.source[10] = Math.floor(context.source[10] * 0.40);
    } else if (target.abl[10] === 1) {
      context.source[10] = Math.floor(context.source[10] * 0.60);
    } else if (target.abl[10] === 2) {
      context.source[10] = Math.floor(context.source[10] * 0.80);
    } else if (target.abl[10] === 3) {
      context.source[10] = Math.floor(context.source[10] * 1.00);
    } else if (target.abl[10] === 4) {
      context.source[10] = Math.floor(context.source[10] * 1.10);
    } else {
      context.source[10] = Math.floor(context.source[10] * 1.20);
    }

    // ABL:마조끼をみる
    if (target.abl[21] === 0) {
      context.source[10] = Math.floor(context.source[10] * 0.80);
    } else if (target.abl[21] === 1) {
      context.source[10] = Math.floor(context.source[10] * 1.00);
    } else if (target.abl[21] === 2) {
      context.source[10] = Math.floor(context.source[10] * 1.30);
    } else if (target.abl[21] === 3) {
      context.source[10] = Math.floor(context.source[10] * 1.60);
    } else if (target.abl[21] === 4) {
      context.source[10] = Math.floor(context.source[10] * 2.00);
    } else {
      context.source[10] = Math.floor(context.source[10] * 3.00);
    }

    // 도착적
    if (target.talent[80]) {
      context.source[10] = Math.floor(context.source[10] * 2.00);
    }

    // ****슬라임パッチ追加ここから****
    if (items[209] >= 1 && flags.TEQUIP[90] === 0) {
      context.loseBase[0] = Math.floor(context.loseBase[0] * 0.80);
      context.loseBase[1] = Math.floor(context.loseBase[1] * 0.80);
      context.source[6] = Math.floor(context.source[6] * 1.50);
      context.source[10] = Math.floor(context.source[10] * 1.20);
      context.source[13] = Math.floor(context.source[13] * 1.20);
      context.source[14] = Math.floor(context.source[14] * 0.80);
    }
    // ****슬라임パッチ追加ここまで****

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    target.exp[51] += 5;
    printFn('긴박경험 +5');

    // 밧줄の着脱
    flags.TEQUIP[44] = 1 - flags.TEQUIP[44];
    if (flags.TEQUIP[90]) {
      variables.T = 0;
    }

    // 애정경험
    let e = 1;
    if (target.cflag[2] >= 1000 && (target.abl[21] >= 3 || target.talent[88]) && flags.ASSIPLAY === 0) {
      printFn(`${context.getExpName(23)}+${e}`);
      target.exp[23] += e;
    }
    e = 0;

    return 1;
  },

  // -------------------------------------------------
  // 밧줄で긴박중
  // -------------------------------------------------
  async executeEquipped(context: TrainingContext): Promise<void> {
    const { target, player, flags, printFn, items, variables } = context;

    if (flags.TEQUIP[90]) {
      printFn('＜촉수 긴박중＞');
    } else {
      printFn('＜긴박중＞');
    }

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    // 긴박경험が高いと消費減少
    if (target.exp[51] < target.explv[3] / 2) {
      context.loseBase[0] += 50;
      context.loseBase[1] += 100;
    } else if (target.exp[51] < target.explv[4] / 2) {
      context.loseBase[0] += 40;
      context.loseBase[1] += 80;
    } else {
      context.loseBase[0] += 30;
      context.loseBase[1] += 60;
    }

    // ABL:마조끼をみる
    let a: number;
    if (target.abl[21] === 0) {
      a = 60;
    } else if (target.abl[21] === 1) {
      a = 180;
    } else if (target.abl[21] === 2) {
      a = 300;
    } else if (target.abl[21] === 3) {
      a = 480;
    } else if (target.abl[21] === 4) {
      a = 700;
    } else {
      a = 850;
    }

    // 도착적
    if (target.talent[80]) {
      a = Math.floor(a * 2.00);
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

    context.source[6] += a;
    context.source[12] += a;
    context.source[13] += a;
    context.source[14] += a;

    // ****슬라임パッチ追加ここから****
    if (items[209] >= 1 && flags.TEQUIP[90] === 0) {
      context.loseBase[0] = Math.floor(context.loseBase[0] * 0.80);
      context.loseBase[1] = Math.floor(context.loseBase[1] * 0.80);
      context.source[6] = Math.floor(context.source[6] * 1.50);
      context.source[12] = Math.floor(context.source[12] * 1.20);
      context.source[13] = Math.floor(context.source[13] * 1.20);
      context.source[14] = Math.floor(context.source[14] * 0.80);
    }
    // ****슬라임パッチ追加ここまで****

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

    if (flags.ASSIPLAY === 0 && target.abl[21] >= 2) {
      flags.TFLAG[30] += 1;
    }

    if (flags.TEQUIP[90]) {
      variables.T += 1;
    }

    target.exp[51] += 2;
    printFn('긴박경험 +2');
  }
};
