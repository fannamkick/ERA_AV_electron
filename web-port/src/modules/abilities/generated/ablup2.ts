/**
 * ABLUP2.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[122]) {
    return 0;
  }
  ctx.drawLine();
  if (ctx.abilities[2] >= 2 && ctx.talents[0] === 1) {
    ctx.showMessage('이 이상 올리려면 비처녀여야합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[2] >= 5 && ctx.talents[75] === 0) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[2] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  B = 0;
  I = 0;
  await decide_ablup2(ctx, character);
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 1)}의 구슬×${ctx.juel[1]}/${A} ……`);
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
  ctx.showMessage(`      ${ctx.getVarName("EXP", 0)}　　${ctx.exp[0]}/{B}`);
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
  ctx.abilities[2] += 1;
  if (ctx.result === 0) {
    ctx.juel[1] -= A;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 2)}의 레벨이 %조사처리(ABL:2,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[122]) {
    return 0;
  }
  if (ctx.abilities[2] >= 3 && ctx.talents[0] == 1) {
    return 0;
  }
  if (ctx.abilities[2] >= 5 && ctx.talents[75] == 0) {
    return 0;
  }
  if (ctx.abilities[2] >= 10) {
    return 0;
  }
  A = 0;
  B = 0;
  I = 0;
  if (ctx.abilities[2] === 0) {
    A = 1;
    B = 0;
  } else if (ctx.abilities[2] === 1) {
    A = 20;
    B = 0;
  } else if (ctx.abilities[2] === 2) {
    A = 400;
    B = 15;
  } else if (ctx.abilities[2] === 3) {
    A = 8000;
    B = 50;
  } else if (ctx.abilities[2] === 4) {
    A = 20000;
    B = 100;
  } else if (ctx.abilities[2] === 5) {
    A = 40000;
    B = 150;
  } else if (ctx.abilities[2] === 6) {
    A = 60000;
    B = 200;
  } else if (ctx.abilities[2] === 7) {
    A = 90000;
    B = 250;
  } else if (ctx.abilities[2] === 8) {
    A = 120000;
    B = 350;
  } else if (ctx.abilities[2] === 9) {
    A = 180000;
    B = 500;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[2] === 4) {
      ctx.times('A', 2.00);
      ctx.times('B', 2.00);
    } else if (ctx.abilities[2] === 5) {
      ctx.times('A', 2.50);
      ctx.times('B', 2.50);
    } else if (ctx.abilities[2] >= 6) {
      ctx.times('A', 3.00);
      ctx.times('B', 3.00);
    }
  }
  if (ctx.talents[103]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.10);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.20);
    ctx.times('B', 0.20);
  }
  if (ctx.talents[75]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
  }
  if (ctx.talents[104]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.01);
    ctx.times('B', 0.1);
  }
  if (A < 1) {
    A = 1;
  }
  if (B < 1 && ctx.abilities[2] >= 3) {
    B = 1;
  }
  if (ctx.juel[1] < A) {
    I |= 1;
  }
  if (ctx.exp[0] < B) {
    I |= 2;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
