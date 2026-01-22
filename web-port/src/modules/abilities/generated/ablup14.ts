/**
 * ABLUP14.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if ((ctx.abilities[12] >= 5 && ctx.abilities[12] < 5) || ctx.abilities[14] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  B = 0;
  I = 0;
  await decide_ablup14(ctx, character);
  if (ctx.abilities[14] < 5) {
    ctx.showMessage(`${ctx.getVarName("ABL", 12)}${ctx.abilities[14] + 1}LV이상 (현재${ctx.abilities[12]}LV) 그리고`);
  }
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
    if (I & 4) {
      ctx.print('능력부족');
    }
  }
  ctx.showMessage('');
  ctx.showMessage(`      ${ctx.getVarName("EXP", 5)}　${ctx.exp[5]}/{B}`);
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
  ctx.abilities[14] += 1;
  if (ctx.result == 0) {
    ctx.juel[7] -= A;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 14)}의 레벨이 %조사처리(ABL:14,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((ctx.abilities[12] >= 5 && ctx.abilities[12] < 5) || ctx.abilities[14] >= 10) {
    return 0;
  }
  A = 0;
  B = 0;
  I = 0;
  if (ctx.abilities[14] === 0) {
    A = 1;
    B = 3;
  } else if (ctx.abilities[14] === 1) {
    A = 10;
    B = 10;
  } else if (ctx.abilities[14] === 2) {
    A = 100;
    B = 30;
  } else if (ctx.abilities[14] === 3) {
    A = 1500;
    B = 80;
  } else if (ctx.abilities[14] === 4) {
    A = 4000;
    B = 100;
  } else if (ctx.abilities[14] === 5) {
    A = 5000;
    B = 130;
  } else if (ctx.abilities[14] === 6) {
    A = 6500;
    B = 160;
  } else if (ctx.abilities[14] === 7) {
    A = 8000;
    B = 200;
  } else if (ctx.abilities[14] === 8) {
    A = 10000;
    B = 250;
  } else if (ctx.abilities[14] === 9) {
    A = 15000;
    B = 300;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[14] === 3) {
      ctx.times('A', 1.50);
      ctx.times('B', 1.50);
    } else if (ctx.abilities[14] === 4) {
      ctx.times('A', 2.00);
      ctx.times('B', 2.00);
    } else if (ctx.abilities[14] === 5) {
      ctx.times('A', 2.50);
      ctx.times('B', 2.50);
    } else if (ctx.abilities[14] >= 6) {
      ctx.times('A', 3.00);
      ctx.times('B', 3.00);
    }
  }
  if (ctx.talents[13]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.95);
  }
  if (ctx.talents[21]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.05);
  }
  if (ctx.talents[22]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.05);
  }
  if (ctx.talents[23]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
  }
  if (ctx.talents[24]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.10);
  }
  if (ctx.talents[32]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.05);
  } else if (ctx.talents[33]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.95);
  }
  if (ctx.talents[34]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.10);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.40);
    ctx.times('B', 0.40);
  }
  if (ctx.talents[35]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.05);
  } else if (ctx.talents[36]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
  }
  if (ctx.talents[50]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
  } else if (ctx.talents[51]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.20);
  }
  if (ctx.talents[63]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
  }
  if (ctx.talents[64]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
  }
  if (ctx.abilities[30] < 3) {
    ctx.times('A', 1.00);
    ctx.times('B', 1.00);
  } else if (ctx.abilities[30] < 6) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
  } else if (ctx.abilities[30] < 8) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
  } else if (ctx.abilities[30] < 10) {
    ctx.times('A', 0.85);
    ctx.times('B', 0.85);
  } else {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.01);
    ctx.times('B', 0.10);
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
  if (ctx.exp[5] < B) {
    I |= 2;
  }
  if (ctx.abilities[12] < 5 && ctx.abilities[12] < ctx.abilities[14] + 1) {
    I |= 4;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
