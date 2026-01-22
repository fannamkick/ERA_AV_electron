/**
 * ABLUP13.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if ((ctx.abilities[13] >= 5 && ctx.abilities[16] < 5) || ctx.abilities[13] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  I = 0;
  await decide_ablup13(ctx, character);
  if (ctx.abilities[13] < 5) {
    ctx.showMessage(`${ctx.getVarName("ABL", 12)}${ctx.abilities[13] + 1}LV이상 (현재${ctx.abilities[12]}LV) 그리고`);
  }
  if (ctx.abilities[13] >= 5) {
    ctx.showMessage(`${ctx.getVarName("ABL", 16)}${ctx.abilities[13] + 1}LV이상 (현재${ctx.abilities[16]}LV) 그리고`);
  }
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 7)}의 구슬×${ctx.juel[7]}/${A} ……`);
  if (I === 0) {
    ctx.print('OK');
  } else {
    if (I & 1) {
      ctx.print('구슬부족');
    }
    if (I & 2) {
      ctx.print('능력부족');
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
  ctx.abilities[13] += 1;
  if (ctx.result == 0) {
    ctx.juel[7] -= A;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 13)}의 레벨이 %조사처리(ABL:13,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[13] >= 5 && ctx.abilities[16] < 5) {
    return 0;
  }
  A = 0;
  I = 0;
  if (ctx.abilities[13] === 0) {
    A = 5;
  } else if (ctx.abilities[13] === 1) {
    A = 400;
  } else if (ctx.abilities[13] === 2) {
    A = 1000;
  } else if (ctx.abilities[13] === 3) {
    A = 3000;
  } else if (ctx.abilities[13] === 4) {
    A = 6000;
  } else if (ctx.abilities[13] === 5) {
    A = 9000;
  } else if (ctx.abilities[13] === 6) {
    A = 12000;
  } else if (ctx.abilities[13] === 7) {
    A = 16000;
  } else if (ctx.abilities[13] === 8) {
    A = 20000;
  } else if (ctx.abilities[13] === 9) {
    A = 25000;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[13] == 3) {
      ctx.times('A', 1.50);
    }
    if (ctx.abilities[13] == 4) {
      ctx.times('A', 2.00);
    }
    if (ctx.abilities[13] == 5) {
      ctx.times('A', 2.50);
    }
    if (ctx.abilities[13] >= 6) {
      ctx.times('A', 3.00);
    }
  }
  if (ctx.talents[11]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[13]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[16]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[15]) {
    ctx.times('A', 1.20);
  } else if (ctx.talents[17]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[21]) {
    ctx.times('A', 1.05);
  }
  if (ctx.talents[22]) {
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
  if (ctx.talents[37]) {
    ctx.times('A', 0.90);
  }
  if (ctx.talents[50]) {
    ctx.times('A', 0.80);
  } else if (ctx.talents[51]) {
    ctx.times('A', 1.50);
  }
  if (ctx.talents[52]) {
    ctx.times('A', 0.90);
  }
  if (ctx.talents[63]) {
    ctx.times('A', 0.90);
  }
  if (ctx.talents[430]) {
    ctx.times('A', 0.40);
  }
  if (ctx.talents[64]) {
    ctx.times('A', 0.90);
  }
  if (ctx.talents[73]) {
    ctx.times('A', 0.90);
  }
  if (ctx.talents[209]) {
    ctx.times('B', 0.90);
  }
  if (ctx.talents[504]) {
    ctx.times('B', 0.10);
  }
  if (ctx.talents[80]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[83]) {
    ctx.times('A', 1.10);
  }
  if (ctx.abilities[16] < 3) {
    ctx.times('A', 1.00);
  } else if (ctx.abilities[16] < 6) {
    ctx.times('A', 0.95);
  } else if (ctx.abilities[16] < 8) {
    ctx.times('A', 0.90);
  } else if (ctx.abilities[16] < 10) {
    ctx.times('A', 0.85);
  } else {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 2.00);
  }
  if (A < 1) {
    A = 1;
  }
  if (ctx.juel[7] < A) {
    I |= 1;
  }
  if (ctx.abilities[13] < 5 && ctx.abilities[12] < ctx.abilities[13] + 1) {
    I |= 2;
  }
  if (ctx.abilities[13] >= 5 && ctx.abilities[16] < ctx.abilities[13] + 1) {
    I |= 2;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
