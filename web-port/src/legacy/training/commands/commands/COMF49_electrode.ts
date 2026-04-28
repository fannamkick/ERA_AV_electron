// COMF49: 애널전극 (Anal Electrode)
// SM系コマンド

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF49_AnalElectrode: TrainingCommand = {
  id: 49,
  name: '애널전극',

  async execute(context: TrainingContext): Promise<number> {
    const { target, savestr, flags, printFn } = context;

    printFn('애널전극');
    savestr[0] = '애널전극';
    await context.callTrainMessageB();

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    context.loseBase[0] += 100;
    context.loseBase[1] += 150;

    // ABL:A감각をみる
    if (target.abl[3] === 0) {
      context.source[2] = 200;
      context.source[13] = 1000;
    } else if (target.abl[3] === 1) {
      context.source[2] = 500;
      context.source[13] = 2000;
    } else if (target.abl[3] === 2) {
      context.source[2] = 900;
      context.source[13] = 3000;
    } else if (target.abl[3] === 3) {
      context.source[2] = 1800;
      context.source[13] = 5000;
    } else if (target.abl[3] === 4) {
      context.source[2] = 2400;
      context.source[13] = 8000;
    } else {
      context.source[2] = 3800;
      context.source[13] = 12000;
    }

    // EXP:A경험をみる
    if (target.exp[1] < target.explv[1]) {
      context.source[2] = Math.floor(context.source[2] * 0.50);
      context.source[6] = 2000;
    } else if (target.exp[1] < target.explv[2] / 2) {
      context.source[2] = Math.floor(context.source[2] * 1.00);
      context.source[6] = 300;
    } else if (target.exp[1] < target.explv[3] / 2) {
      context.source[2] = Math.floor(context.source[2] * 1.10);
      context.source[6] = 50;
    } else if (target.exp[1] < target.explv[4] / 2) {
      context.source[2] = Math.floor(context.source[2] * 1.20);
      context.source[6] = 10;
    } else if (target.exp[1] < target.explv[5] / 2) {
      context.source[2] = Math.floor(context.source[2] * 1.40);
      context.source[6] = 0;
    } else {
      context.source[2] = Math.floor(context.source[2] * 1.60);
      context.source[6] = 0;
    }

    // PALAM:윤활をみる
    if (target.palam[3] < target.paramlv[1]) {
      context.source[2] = Math.floor(context.source[2] * 0.40);
      context.source[6] += 800;
    } else if (target.palam[3] < target.paramlv[2]) {
      context.source[2] = Math.floor(context.source[2] * 0.80);
      context.source[6] += 500;
    } else if (target.palam[3] < target.paramlv[3]) {
      context.source[2] = Math.floor(context.source[2] * 1.00);
      context.source[6] += 300;
    } else if (target.palam[3] < target.paramlv[4]) {
      context.source[2] = Math.floor(context.source[2] * 1.40);
      context.source[6] += 120;
    } else if (target.palam[3] >= target.paramlv[4]) {
      context.source[2] = Math.floor(context.source[2] * 1.80);
      context.source[6] += 100;
    }

    // PALAM:욕정をみる
    if (target.palam[5] < target.paramlv[1]) {
      context.source[2] = Math.floor(context.source[2] * 0.80);
    } else if (target.palam[5] < target.paramlv[2]) {
      context.source[2] = Math.floor(context.source[2] * 0.90);
    } else if (target.palam[5] < target.paramlv[3]) {
      context.source[2] = Math.floor(context.source[2] * 1.00);
    } else if (target.palam[5] < target.paramlv[4]) {
      context.source[2] = Math.floor(context.source[2] * 1.10);
    } else if (target.palam[5] >= target.paramlv[4]) {
      context.source[2] = Math.floor(context.source[2] * 1.20);
    }

    // ABL:従順をみる
    if (target.abl[10] === 0) {
      context.source[2] = Math.floor(context.source[2] * 0.80);
    } else if (target.abl[10] === 1) {
      context.source[2] = Math.floor(context.source[2] * 0.90);
    } else if (target.abl[10] === 2) {
      context.source[2] = Math.floor(context.source[2] * 1.00);
    } else if (target.abl[10] === 3) {
      context.source[2] = Math.floor(context.source[2] * 1.10);
    } else if (target.abl[10] === 4) {
      context.source[2] = Math.floor(context.source[2] * 1.20);
    } else {
      context.source[2] = Math.floor(context.source[2] * 1.30);
    }

    // 큰체구
    if (target.talent[99]) {
      context.source[6] = Math.floor(context.source[6] * 0.80);
    }
    // 작은체형
    if (target.talent[100]) {
      context.source[6] = Math.floor(context.source[6] * 2.00);
    }
    // 미숙함
    if (target.talent[135]) {
      context.source[6] = Math.floor(context.source[6] * 2.00);
    }

    // A민감, 鈍感をみる
    // 快A自体のチェックは後でまとめてやる
    if (target.talent[105]) {
      context.source[6] = Math.floor(context.source[6] * 1.50);
      context.source[13] = Math.floor(context.source[13] * 1.50);
      context.source[14] = Math.floor(context.source[14] * 1.50);
    } else if (target.talent[106]) {
      context.source[6] = Math.floor(context.source[6] * 0.60);
      context.source[13] = Math.floor(context.source[13] * 0.60);
      context.source[14] = Math.floor(context.source[14] * 0.60);
    }

    if (target.exp[0] === 0 && target.talent[30]) {
      context.source[13] = Math.floor(context.source[13] / 3);
    }

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    target.exp[1] += 5;
    printFn('A경험 +5');

    // 電極の着脱
    flags.TEQUIP[49] = 1 - flags.TEQUIP[49];

    return 1;
  },

  // -------------------------------------------------
  // 애널전극 삽입중
  // -------------------------------------------------
  async executeEquipped(context: TrainingContext): Promise<void> {
    const { target, player, flags, printFn, variables } = context;

    printFn('＜애널전극 삽입중＞');

    context.loseBase[0] += 80;
    context.loseBase[1] += 120;

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    // ABL:A감각をみる
    let a: number, b: number;
    if (target.abl[3] === 0) {
      a = 250;
      b = 1000;
    } else if (target.abl[3] === 1) {
      a = 600;
      b = 2000;
    } else if (target.abl[3] === 2) {
      a = 1200;
      b = 3000;
    } else if (target.abl[3] === 3) {
      a = 1900;
      b = 5000;
    } else if (target.abl[3] === 4) {
      a = 2500;
      b = 8000;
    } else {
      a = 3900;
      b = 12000;
    }

    // EXP:A경험をみる
    let c: number;
    if (target.exp[1] < target.explv[1]) {
      a = Math.floor(a * 0.50);
      c = 2000;
    } else if (target.exp[1] < target.explv[2]) {
      a = Math.floor(a * 1.00);
      c = 300;
    } else if (target.exp[1] < target.explv[3]) {
      a = Math.floor(a * 1.10);
      c = 50;
    } else if (target.exp[1] < target.explv[4]) {
      a = Math.floor(a * 1.20);
      c = 10;
    } else if (target.exp[1] < target.explv[5]) {
      a = Math.floor(a * 1.40);
      c = 0;
    } else {
      a = Math.floor(a * 1.60);
      c = 0;
    }

    // PALAM:윤활をみる
    if (target.palam[3] < target.paramlv[1]) {
      a = Math.floor(a * 0.40);
      c += 800;
    } else if (target.palam[3] < target.paramlv[2]) {
      a = Math.floor(a * 0.80);
      c += 500;
    } else if (target.palam[3] < target.paramlv[3]) {
      a = Math.floor(a * 1.00);
      c += 300;
    } else if (target.palam[3] < target.paramlv[4]) {
      a = Math.floor(a * 1.40);
      c += 120;
    } else if (target.palam[3] >= target.paramlv[4]) {
      a = Math.floor(a * 1.80);
      c += 100;
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

    // ABL:従順をみる
    if (target.abl[10] === 0) {
      a = Math.floor(a * 0.80);
    } else if (target.abl[10] === 1) {
      a = Math.floor(a * 0.90);
    } else if (target.abl[10] === 2) {
      a = Math.floor(a * 1.00);
    } else if (target.abl[10] === 3) {
      a = Math.floor(a * 1.10);
    } else if (target.abl[10] === 4) {
      a = Math.floor(a * 1.20);
    } else {
      a = Math.floor(a * 1.30);
    }

    // 큰체구
    if (target.talent[99]) {
      c = Math.floor(c * 0.80);
    }
    // 작은체형
    if (target.talent[100]) {
      c = Math.floor(c * 2.00);
    }
    // 미숙함
    if (target.talent[135]) {
      c = Math.floor(c * 2.00);
    }

    // A민감, 鈍感をみる
    // 快A自体のチェックは後でまとめてやる
    if (target.talent[105]) {
      context.source[6] = Math.floor(context.source[6] * 1.50);
      context.source[13] = Math.floor(context.source[13] * 1.50);
      context.source[14] = Math.floor(context.source[14] * 1.50);
    } else if (target.talent[106]) {
      context.source[6] = Math.floor(context.source[6] * 0.60);
      context.source[13] = Math.floor(context.source[13] * 0.60);
      context.source[14] = Math.floor(context.source[14] * 0.60);
    }

    context.source[2] += a;
    context.source[13] += b;
    context.source[6] += c;

    // 처녀で정조관념
    if (target.exp[0] === 0 && target.talent[30]) {
      context.source[13] = Math.floor(context.source[13] / 3);
    }

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    target.exp[1] += 5;
    printFn('A경험 +5');

    if (target.talent[122] === 0 && player.talent[122] === 0) {
      printFn(`${context.getExpName(40)} +1`);
      target.exp[40] += 1;
    } else if (target.talent[122] === 1 && player.talent[122] === 1) {
      printFn(`${context.getExpName(41)} +1`);
      target.exp[41] += 1;
    }

    if (flags.TEQUIP[90]) {
      variables.T += 1;
    }
  }
};
