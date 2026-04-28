/**
 * ABLUP38.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup38(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[38] >= 5 && ctx.talents[230] === 0) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[38] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  F = 0;
  await decide_ablup38(ctx, character);
  if (F > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{F}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 11)}${ctx.abilities[38] + 1}이상(현재${ctx.abilities[11]})그리고`);
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 0)}의 구슬×${ctx.juel[0]}/${A} ……`);
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
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 5)}의 구슬×${ctx.juel[5]}/{B}`);
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 3)}　${ctx.exp[3]}/{C}`);
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
  ctx.abilities[38] += 1;
  if (ctx.result === 0) {
    ctx.juel[0] -= A;
    ctx.juel[5] -= B;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 38)}의 레벨이 %조사처리(ABL:38,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup38(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[38] >= 10) {
    return 0;
  }
  if (ctx.abilities[38] >= 5 && ctx.talents[230] == 0) {
    return 0;
  }
  I = 0;
  if (ctx.abilities[38] === 0) {
    A = 3000;
    B = 10000;
    C = 2;
  } else if (ctx.abilities[38] === 1) {
    A = 8000;
    B = 20000;
    C = 10;
  } else if (ctx.abilities[38] === 2) {
    A = 15000;
    B = 35000;
    C = 30;
  } else if (ctx.abilities[38] === 3) {
    A = 30000;
    B = 60000;
    C = 75;
    F = 1;
  } else if (ctx.abilities[38] === 4) {
    A = 50000;
    B = 130000;
    C = 150;
    F = 2;
  } else if (ctx.abilities[38] === 5) {
    A = 65000;
    B = 190000;
    C = 180;
  } else if (ctx.abilities[38] === 6) {
    A = 900000;
    B = 3000000;
    C = 250;
  } else if (ctx.abilities[38] === 7) {
    A = 120000;
    B = 500000;
    C = 350;
  } else if (ctx.abilities[38] === 8) {
    A = 200000;
    B = 800000;
    C = 500;
    F = 5;
  } else if (ctx.abilities[38] === 9) {
    A = 500000;
    B = 1500000;
    C = 600;
    F = 7;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[38] === 3) {
      ctx.times('A', 2.00);
      ctx.times('B', 2.00);
      ctx.times('C', 2.00);
    } else if (ctx.abilities[38] === 4) {
      ctx.times('A', 2.50);
      ctx.times('B', 2.50);
      ctx.times('C', 2.50);
    } else if (ctx.abilities[38] >= 5) {
      ctx.times('A', 3.00);
      ctx.times('B', 3.00);
      ctx.times('C', 3.00);
    }
  }
  F = 0;
  if (ctx.abilities[38] >= 2 && (ctx.talents[72] == 0 && ctx.talents[76] == 0)) {
    F = ctx.abilities[38] + 1;
  }
  if (ctx.talents[20]) {
    ctx.times('A', 2.50);
    ctx.times('B', 2.50);
    ctx.times('C', 1.50);
  }
  if (ctx.talents[70]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
  }
  if (ctx.talents[71]) {
    ctx.times('A', 1.75);
    ctx.times('B', 1.75);
  }
  if (ctx.talents[72]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[80]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.75);
  }
  if (ctx.talents[101]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.50);
    ctx.times('C', 1.50);
  }
  if (ctx.talents[102]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.75);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.40);
    ctx.times('B', 0.40);
    ctx.times('C', 0.40);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.01);
    ctx.times('B', 0.01);
    ctx.times('C', 0.01);
  }
  if (ctx.talents[230]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.75);
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
  if (ctx.abilities[11] < ctx.abilities[38] + 1) {
    I |= 4;
  }
  if (ctx.juel[0] < A) {
    I |= 1;
  }
  if (ctx.juel[5] < B) {
    I |= 1;
  }
  if (ctx.exp[3] < C) {
    I |= 2;
  }
  if (ctx.exp[50] < F) {
    I |= 2;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
