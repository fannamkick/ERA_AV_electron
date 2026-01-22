/**
 * ABLUP12.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[12] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[12] + ctx.abilities[15] >= 15 && ctx.talents[211] === 0) {
    ctx.showMessage(`W 기교(${ctx.abilities[12]})＋화술(${ctx.abilities[15]})의 상한은 15입니다`);
    return 0;
  }
  A = 0;
  I = 0;
  await decide_ablup12(ctx, character);
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
  ctx.abilities[12] += 1;
  if (ctx.result === 0) {
    ctx.juel[7] -= A;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 12)}의 레벨이 %조사처리(ABL:12,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[12] >= 10) {
    return 0;
  }
  if (ctx.abilities[12] + ctx.abilities[15] >= 15 && ctx.talents[211] == 0) {
    return 0;
  }
  A = 0;
  I = 0;
  if (ctx.abilities[12] === 0) {
    A = 1;
  } else if (ctx.abilities[12] === 1) {
    A = 25;
  } else if (ctx.abilities[12] === 2) {
    A = 200;
  } else if (ctx.abilities[12] === 3) {
    A = 3000;
  } else if (ctx.abilities[12] === 4) {
    A = 8000;
  } else if (ctx.abilities[12] === 5) {
    A = 12000;
  } else if (ctx.abilities[12] === 6) {
    A = 16000;
  } else if (ctx.abilities[12] === 7) {
    A = 22000;
  } else if (ctx.abilities[12] === 8) {
    A = 28000;
  } else if (ctx.abilities[12] === 9) {
    A = 35000;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[12] == 3) {
      ctx.times('A', 1.50);
    }
    if (ctx.abilities[12] == 4) {
      ctx.times('A', 2.00);
    }
    if (ctx.abilities[12] == 5) {
      ctx.times('A', 2.50);
    }
    if (ctx.abilities[12] >= 6) {
      ctx.times('A', 3.00);
    }
  }
  if (ctx.talents[13]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[21]) {
    ctx.times('A', 1.05);
  }
  if (ctx.talents[23]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[24]) {
    ctx.times('A', 1.10);
  }
  if (ctx.talents[32]) {
    ctx.times('A', 1.10);
  } else if (ctx.talents[33]) {
    ctx.times('A', 0.90);
  }
  if (ctx.talents[34]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[35]) {
    ctx.times('A', 1.05);
  } else if (ctx.talents[36]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[50]) {
    ctx.times('A', 0.80);
  } else if (ctx.talents[51]) {
    ctx.times('A', 1.50);
  }
  if (ctx.talents[52]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[63]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[64]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.01);
  }
  if (A < 1) {
    A = 1;
  }
  if (ctx.juel[7] < A) {
    I |= 1;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
