/**
 * ABLUP71.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup71(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[71] >= 5 && ctx.talents[76] === 0 && ctx.talents[85] === 0) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[71] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[71] + ctx.abilities[72] + ctx.abilities[73] >= 15 && ctx.talents[552] === 0) {
    ctx.showMessage(`W 가창기능(${ctx.abilities[71]})＋무용기능(${ctx.abilities[72]})＋요리기능(${ctx.abilities[73]})의 상한은 20입니다`);
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  await decide_ablup71(ctx, character);
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
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 71)}　${ctx.exp[71]}/{B}`);
  if (C) {
    ctx.showMessage(`　　　${ctx.getVarName("EXP", 23)}　${ctx.exp[23]}/{C}`);
  }
  ctx.showMessage('[100] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result != 0 && ctx.result != 100) {
    ctx.restart();
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[71] += 1;
  ctx.juel[7] -= A;
  ctx.showMessage(`${ctx.getVarName("ABL", 71)}의 레벨이 %조사처리(ABL:71,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup71(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[71] >= 10) {
    return 0;
  }
  if (ctx.abilities[71] >= 5 && ctx.talents[76] == 0 && ctx.talents[85] == 0) {
    return 0;
  }
  if (ctx.abilities[71] + ctx.abilities[72] + ctx.abilities[73] >= 15 && ctx.talents[552] == 0) {
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  I = 0;
  if (ctx.abilities[71] === 0) {
    A = 75;
    B = 5;
  } else if (ctx.abilities[71] === 1) {
    A = 500;
    B = 15;
  } else if (ctx.abilities[71] === 2) {
    A = 3000;
    B = 30;
    C = 10;
  } else if (ctx.abilities[71] === 3) {
    A = 9000;
    B = 75;
    C = 20;
  } else if (ctx.abilities[71] === 4) {
    A = 24000;
    B = 120;
    C = 50;
  } else if (ctx.abilities[71] === 5) {
    A = 30000;
    B = 180;
    C = 100;
  } else if (ctx.abilities[71] === 6) {
    A = 35000;
    B = 400;
    C = 300;
  } else if (ctx.abilities[71] === 7) {
    A = 40000;
    B = 600;
    C = 500;
  } else if (ctx.abilities[71] === 8) {
    A = 45000;
    B = 800;
    C = 800;
  } else if (ctx.abilities[71] === 9) {
    A = 50000;
    B = 1500;
    C = 1200;
  }
  if (ctx.talents[50]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
  } else if (ctx.talents[51]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
  }
  if (ctx.talents[552]) {
    ctx.times('A', 0.40);
    ctx.times('B', 0.40);
  }
  if (A < 1) {
    A = 1;
  }
  if (B < 1) {
    B = 1;
  }
  if (ctx.juel[7] < A) {
    I |= 1;
  }
  if (ctx.exp[71] < B) {
    I |= 2;
  }
  if (ctx.exp[23] < C) {
    I |= 2;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
