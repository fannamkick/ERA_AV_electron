// COMF46: 관장기+플러그 (Enema+Plug)
// SM系コマンド

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF46_Enema: TrainingCommand = {
  id: 46,
  name: '관장기+플러그',

  async execute(context: TrainingContext): Promise<number> {
    const { target, savestr, flags, printFn } = context;

    if (flags.TEQUIP[90]) {
      printFn('촉수 관장');
      savestr[0] = '촉수 관장';
    } else {
      printFn('관장기+플러그');
      savestr[0] = '관장기+플러그';
    }
    await context.callTrainMessageB();

    context.loseBase[0] += 60;
    context.loseBase[1] += 150;

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    // ABL:A감각をみる
    if (target.abl[3] === 0) {
      context.source[2] = 80;
      context.source[13] = 300;
    } else if (target.abl[3] === 1) {
      context.source[2] = 250;
      context.source[13] = 800;
    } else if (target.abl[3] === 2) {
      context.source[2] = 600;
      context.source[13] = 1400;
    } else if (target.abl[3] === 3) {
      context.source[2] = 1000;
      context.source[13] = 1800;
    } else if (target.abl[3] === 4) {
      context.source[2] = 1300;
      context.source[13] = 2100;
    } else {
      context.source[2] = 1700;
      context.source[13] = 2400;
    }

    // ABL8,마조끼をみる
    if (target.abl[21] < 1) {
      context.source[6] = 2000;
      context.source[8] = 1000;
      context.source[13] = 200;
      context.source[14] = 1000;
      context.source[15] = 2000;
    } else if (target.abl[21] < 2) {
      context.source[6] = 1600;
      context.source[8] = 2000;
      context.source[13] = 500;
      context.source[14] = 1000;
      context.source[15] = 1000;
    } else if (target.abl[21] < 3) {
      context.source[6] = 1200;
      context.source[8] = 1000;
      context.source[13] = 800;
      context.source[14] = 1000;
      context.source[15] = 500;
    } else if (target.abl[21] < 4) {
      context.source[6] = 800;
      context.source[8] = 1000;
      context.source[13] = 1200;
      context.source[14] = 1000;
      context.source[15] = 100;
    } else if (target.abl[21] < 5) {
      context.source[6] = 600;
      context.source[8] = 1000;
      context.source[13] = 1500;
      context.source[14] = 1000;
      context.source[15] = 0;
    } else {
      context.source[6] = 400;
      context.source[8] = 1000;
      context.source[13] = 2000;
      context.source[14] = 1000;
      context.source[15] = 0;
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
    // 小柄体形
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

    // 정조관념
    if (target.exp[0] === 0 && target.talent[30]) {
      context.source[13] = Math.floor(context.source[13] / 3);
    }

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    target.exp[1] += 5;
    printFn('A경험 +5');

    // 調教時の排泄が始めてだった場合
    if (flags.TEQUIP[46] && target.cflag[4] === 0) {
      let x = 1;
      // ビデオ録画中なら이상경험 +2, そうでなければ+1
      if (flags.TEQUIP[53]) {
        x += 1;
        target.cflag[4] = 2;
      } else {
        target.cflag[4] = 1;
      }
      printFn(`이상경험 +${x}`);
      target.exp[50] += x;
    // 初めてではないが, ビデオ録画中だった場合
    } else if (flags.TEQUIP[46] && target.cflag[4] === 1 && flags.TEQUIP[53]) {
      printFn('이상경험 +1');
      target.exp[50] += 1;
      target.cflag[4] = 2;
    }

    // 촉수 관장処理
    if (flags.TEQUIP[90]) {
      context.variables.T = 0;
    }
    if (flags.TEQUIP[46] === 0 && flags.TEQUIP[90]) {
      target.stain[4] |= 2;
      target.stain[4] |= 4;
    }

    // 着衣おもらし処理
    if (flags.TEQUIP[46] && flags.FLAG[37]) {
      await context.callSoilingClothNo2();
    }

    // 관장プラグの着脱
    flags.TEQUIP[46] = 1 - flags.TEQUIP[46];

    return 1;
  },

  // -------------------------------------------------
  // 관장+애널플러그 삽입중
  // -------------------------------------------------
  async executeEquipped(context: TrainingContext): Promise<void> {
    const { target, player, flags, printFn, variables } = context;

    if (flags.TEQUIP[90]) {
      printFn('＜관장 촉수 삽입중＞');
    } else {
      printFn('＜관장+애널플러그 삽입중＞');
    }

    context.loseBase[0] += 100;
    context.loseBase[1] += 80;

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    // ABL:A감각をみる
    let a: number, b: number;
    if (target.abl[3] === 0) {
      a = 80;
      b = 300;
    } else if (target.abl[3] === 1) {
      a = 250;
      b = 800;
    } else if (target.abl[3] === 2) {
      a = 600;
      b = 1400;
    } else if (target.abl[3] === 3) {
      a = 1000;
      b = 1800;
    } else if (target.abl[3] === 4) {
      a = 1300;
      b = 2100;
    } else {
      a = 1700;
      b = 2400;
    }

    // EXP:A경험をみる
    let c: number;
    if (target.exp[1] < target.explv[1]) {
      a = Math.floor(a * 0.50);
      c = 2000;
    } else if (target.exp[1] < target.explv[2] / 2) {
      a = Math.floor(a * 1.00);
      c = 300;
    } else if (target.exp[1] < target.explv[3] / 2) {
      a = Math.floor(a * 1.10);
      c = 50;
    } else if (target.exp[1] < target.explv[4] / 2) {
      a = Math.floor(a * 1.20);
      c = 10;
    } else if (target.exp[1] < target.explv[5] / 2) {
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
    // 小柄体形
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
    context.source[14] += b;

    // 처녀で정조관념
    if (target.exp[0] === 0 && target.talent[30]) {
      context.source[13] = Math.floor(context.source[13] / 3);
    }

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    target.exp[1] += 3;
    printFn('A경험 +3');

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
