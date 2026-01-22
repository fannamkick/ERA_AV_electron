// COMF43: 아이마스크 (Eye Mask)
// SM系コマンド

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF43_Eyemask: TrainingCommand = {
  id: 43,
  name: '아이마스크',

  async execute(context: TrainingContext): Promise<number> {
    const { target, player, savestr, flags, printFn } = context;

    printFn('아이마스크');
    savestr[0] = '아이마스크';
    await context.callTrainMessageB();

    context.loseBase[0] += 0;
    // 긴박경험が高いと消費減少
    if (target.exp[51] < target.explv[3] / 2) {
      context.loseBase[1] += 150;
    } else if (target.exp[51] < target.explv[4] / 2) {
      context.loseBase[1] += 120;
    } else {
      context.loseBase[1] += 90;
    }

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    context.source[10] = 250;
    context.source[12] = 1000;
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
    // 겁쟁이
    if (target.talent[10]) {
      context.source[14] = Math.floor(context.source[14] * 2.00);
    }

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    target.exp[51] += 2;
    printFn('긴박경험 +2');

    // 아이마스크の着脱
    flags.TEQUIP[43] = 1 - flags.TEQUIP[43];

    return 1;
  },

  // -------------------------------------------------
  // 아이마스크 장착중
  // -------------------------------------------------
  async executeEquipped(context: TrainingContext): Promise<void> {
    const { target, player, flags, printFn } = context;

    printFn('＜아이마스크 장착중＞');

    context.loseBase[0] += 0;
    // 긴박경험が高いと消費減少
    if (target.exp[51] < target.explv[3] / 2) {
      context.loseBase[1] += 100;
    } else if (target.exp[51] < target.explv[4] / 2) {
      context.loseBase[1] += 80;
    } else {
      context.loseBase[1] += 60;
    }

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    let a = 250;
    let b = 1000;
    let c = 500;

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

    // ABL:従順をみる
    if (target.abl[10] === 0) {
      a = Math.floor(a * 0.40);
    } else if (target.abl[10] === 1) {
      a = Math.floor(a * 0.60);
    } else if (target.abl[10] === 2) {
      a = Math.floor(a * 0.80);
    } else if (target.abl[10] === 3) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[10] === 4) {
      a = Math.floor(a * 1.10);
    } else {
      a = Math.floor(a * 1.20);
    }

    // ABL:마조끼をみる
    if (target.abl[21] === 0) {
      a = Math.floor(a * 0.80);
    } else if (target.abl[21] === 1) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[21] === 2) {
      a = Math.floor(a * 1.30);
    } else if (target.abl[21] === 3) {
      a = Math.floor(a * 1.60);
    } else if (target.abl[21] === 4) {
      a = Math.floor(a * 2.00);
    } else {
      a = Math.floor(a * 3.00);
    }

    // 도착적
    if (target.talent[80]) {
      a = Math.floor(a * 2.00);
    }
    // 겁쟁이
    if (target.talent[10]) {
      c = Math.floor(c * 2.00);
    }

    context.source[10] += a;
    context.source[12] += b;
    context.source[14] += c;

    context.up[5] += a;
    context.up[10] += context.source[14];

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
