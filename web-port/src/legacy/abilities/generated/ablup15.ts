/**
 * ABLUP15.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[15] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[12] + ctx.abilities[15] >= 15 && ctx.talents[211] === 0) {
    ctx.showMessage(`W 기교(${ctx.abilities[12]})＋화술(${ctx.abilities[15]})의 상한은 15입니다`);
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  I = 0;
  await decide_ablup15(ctx, character);
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 7)}의 구슬×${ctx.juel[7]}/${A} ……`);
  if (I === 0) {
    ctx.print('OK');
  } else {
    if (I & 1) {
      ctx.print('구슬부족');
    }
    if (I & 2) {
      ctx.print('경험부족');
    }
  }
  ctx.showMessage('');
  ctx.showMessage(`      ${ctx.getVarName("EXP", 73)}　${ctx.exp[73]}/{B} or`);
  ctx.showMessage(`      ${ctx.getVarName("EXP", 74)}　${ctx.exp[74]}/{C}`);
  ctx.showMessage('[100] - 그만둔다');
  await ctx.inputNumber();
  if ((ctx.result < 0 || ctx.result > 0) && ctx.result != 100) {
    ctx.restart();
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[15] += 1;
  if (ctx.result === 0) {
    ctx.juel[7] -= A;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 15)}의 레벨이 %조사처리(ABL:15,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[15] >= 10) {
    return 0;
  }
  if (ctx.abilities[12] + ctx.abilities[15] >= 15 && ctx.talents[211] == 0) {
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  I = 0;
  if (ctx.abilities[15] === 0) {
    A = 1;
    B = 1;
    C = 5;
  } else if (ctx.abilities[15] === 1) {
    A = 10;
    B = 5;
    C = 20;
  } else if (ctx.abilities[15] === 2) {
    A = 100;
    B = 15;
    C = 50;
  } else if (ctx.abilities[15] === 3) {
    A = 1500;
    B = 40;
    C = 100;
  } else if (ctx.abilities[15] === 4) {
    A = 3000;
    B = 80;
    C = 150;
  } else if (ctx.abilities[15] === 5) {
    A = 4000;
    B = 120;
    C = 180;
  } else if (ctx.abilities[15] === 6) {
    A = 5200;
    B = 150;
    C = 250;
  } else if (ctx.abilities[15] === 7) {
    A = 7500;
    B = 180;
    C = 320;
  } else if (ctx.abilities[15] === 8) {
    A = 9000;
    B = 220;
    C = 350;
  } else if (ctx.abilities[15] === 9) {
    A = 13000;
    B = 250;
    C = 400;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[15] === 3) {
      ctx.times('A', 1.50);
      ctx.times('C', 1.25);
    } else if (ctx.abilities[15] === 4) {
      ctx.times('A', 2.00);
      ctx.times('C', 1.50);
    } else if (ctx.abilities[15] === 5) {
      ctx.times('A', 2.50);
      ctx.times('C', 1.75);
    } else if (ctx.abilities[15] >= 6) {
      ctx.times('A', 3.00);
      ctx.times('C', 2.00);
    }
  }
  if (ctx.talents[11]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
  }
  if (ctx.talents[13]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  }
  if (ctx.talents[16]) {
    ctx.times('A', 1.25);
    ctx.times('B', 1.15);
    ctx.times('C', 1.15);
  }
  if (ctx.talents[15]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
  }
  if (ctx.talents[21]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
  }
  if (ctx.talents[22]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
  }
  if (ctx.talents[23]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  }
  if (ctx.talents[25]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  } else if (ctx.talents[26]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
  }
  if (ctx.talents[28]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  }
  if (ctx.talents[32]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
  } else if (ctx.talents[33]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[34]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
  }
  if (ctx.talents[35]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
  } else if (ctx.talents[36]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  }
  if (ctx.talents[50]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
  } else if (ctx.talents[51]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
  }
  if (ctx.talents[92]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[87]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
  }
  if (ctx.talents[182]) {
    ctx.times('A', 0.60);
    ctx.times('B', 0.60);
    ctx.times('C', 0.80);
  }
  if (ctx.talents[224]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
  }
  if (A < 1) {
    A = 1;
  }
  if (B < 1) {
    B = 1;
  }
  if (C < 1) {
    C = 1;
  }
  if (ctx.juel[7] < A) {
    I |= 1;
  }
  if (ctx.exp[73] < B && ctx.exp[74] < C) {
    I |= 2;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
