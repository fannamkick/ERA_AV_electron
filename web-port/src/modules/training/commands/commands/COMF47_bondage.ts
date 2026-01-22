// COMF47: 본디지 착용 (Bondage Wear)
// 助手系コマンド

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF47_Bondage: TrainingCommand = {
  id: 47,
  name: '본디지 착용',

  async execute(context: TrainingContext): Promise<number> {
    const { target, savestr, flags, printFn } = context;

    printFn('본디지 착용');
    savestr[0] = '본디지 착용';
    await context.callTrainMessageB();

    // 終了時は修正なし
    if (flags.TEQUIP[47]) {
      flags.TEQUIP[47] = 0;
      return 1;
    }

    context.loseBase[0] += 0;
    // 마조끼が高いと기력소비減少
    if (target.abl[21] === 0) {
      context.loseBase[1] += 60;
    } else if (target.abl[21] <= 2) {
      context.loseBase[1] += 45;
    } else {
      context.loseBase[1] += 30;
    }

    // 본디지ルックの装着
    flags.TEQUIP[47] = 1;

    return 1;
  },

  // -------------------------------------------------
  // 본디지장착중
  // -------------------------------------------------
  async executeEquipped(context: TrainingContext): Promise<void> {
    const { target, assi, flags, printFn } = context;

    printFn(`＜${context.getName(assi.no)} 본디지 착의중＞`);

    // 마조끼が高いと기력소비減少
    if (target.abl[21] === 0) {
      context.loseBase[1] += 60;
    } else if (target.abl[21] <= 2) {
      context.loseBase[1] += 45;
    } else {
      context.loseBase[1] += 30;
    }

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    let a = 300;

    if (assi.talent[553]) {
      a *= 3;
    }

    // PALAM:공포をみる
    if (target.palam[10] < target.paramlv[1]) {
      a = Math.floor(a * 1.00);
    } else if (target.palam[10] < target.paramlv[2]) {
      a = Math.floor(a * 1.10);
    } else if (target.palam[10] < target.paramlv[3]) {
      a = Math.floor(a * 1.20);
    } else if (target.palam[10] < target.paramlv[4]) {
      a = Math.floor(a * 1.30);
    } else if (target.palam[10] >= target.paramlv[4]) {
      a = Math.floor(a * 1.40);
    }

    // ABL:마조끼をみる
    if (target.abl[21] === 0) {
      context.source[11] += 0;
      context.source[10] += 0;
      context.source[15] += 100;
      a = Math.floor(a * 0.60);
    } else if (target.abl[21] === 1) {
      context.source[11] += 50;
      context.source[10] += 150;
      context.source[15] += 0;
      a = Math.floor(a * 1.00);
    } else if (target.abl[21] === 2) {
      context.source[11] += 100;
      context.source[10] += 300;
      context.source[15] += 0;
      a = Math.floor(a * 1.60);
    } else if (target.abl[21] === 3) {
      context.source[11] += 150;
      context.source[10] += 600;
      context.source[15] += 0;
    } else if (target.abl[21] === 4) {
      context.source[11] += 200;
      context.source[10] += 1000;
      context.source[15] += 0;
    } else if (target.abl[21] >= 5) {
      context.source[11] += 300;
      context.source[10] += 2000;
      context.source[15] += 0;
    }

    // ASSIのABL:새드끼をみる
    if (assi.abl[20] === 0) {
      a = Math.floor(a * 0.20);
    } else if (assi.abl[20] === 1) {
      a = Math.floor(a * 0.50);
    } else if (assi.abl[20] === 2) {
      a = Math.floor(a * 1.00);
    } else if (assi.abl[20] === 3) {
      a = Math.floor(a * 1.50);
    } else if (assi.abl[20] === 4) {
      a = Math.floor(a * 2.50);
    } else if (assi.abl[20] >= 5) {
      a = Math.floor(a * 3.00);
    }

    // 겁쟁이
    if (target.talent[10]) {
      a = Math.floor(a * 2.00);
    }

    context.source[14] += a;

    context.up[10] += context.source[14];
  }
};
