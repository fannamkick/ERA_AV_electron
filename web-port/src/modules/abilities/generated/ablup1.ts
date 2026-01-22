/**
 * ABLUP1.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[1] >= 5 && ctx.talents[78] === 0) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[1] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  I = 0;
  await decide_ablup1(ctx, character);
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 14)}의 구슬×${ctx.juel[14]}/${A} ……`);
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
  ctx.abilities[1] += 1;
  if (ctx.result === 0) {
    ctx.juel[14] -= A;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 1)}의 레벨이 %조사처리(ABL:1,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[1] >= 5 && ctx.talents[78] == 0) {
    return 0;
  }
  if (ctx.abilities[1] >= 10) {
    return 0;
  }
  A = 0;
  I = 0;
  if (ctx.abilities[1] === 0) {
    A = 1;
  } else if (ctx.abilities[1] === 1) {
    A = 20;
  } else if (ctx.abilities[1] === 2) {
    A = 400;
  } else if (ctx.abilities[1] === 3) {
    A = 8000;
  } else if (ctx.abilities[1] === 4) {
    A = 20000;
  } else if (ctx.abilities[1] === 5) {
    A = 40000;
  } else if (ctx.abilities[1] === 6) {
    A = 60000;
  } else if (ctx.abilities[1] === 7) {
    A = 90000;
  } else if (ctx.abilities[1] === 8) {
    A = 120000;
  } else if (ctx.abilities[1] === 9) {
    A = 180000;
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.01);
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[1] == 4) {
      ctx.times('A', 2.00);
    }
    if (ctx.abilities[1] == 5) {
      ctx.times('A', 2.50);
    }
    if (ctx.abilities[1] >= 6) {
      ctx.times('A', 3.00);
    }
  }
  if (ctx.talents[107]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[110]) {
    ctx.times('A', 1.10);
  }
  if (ctx.talents[114]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[108]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.20);
  }
  if (ctx.talents[78]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[109]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[116]) {
    ctx.times('A', 0.65);
  }
  if (A < 1) {
    A = 1;
  }
  if (ctx.juel[14] < A) {
    I |= 1;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
