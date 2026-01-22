/**
 * ABLUP11.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[11] >= 5 && (ctx.talents[73] === 0 && ctx.talents[76] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[11] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  I = 0;
  E = 0;
  await decide_ablup11(ctx, character);
  if (E > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{E}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 5)}의 구슬×${ctx.juel[5]}/${A} ……`);
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
  ctx.abilities[11] += 1;
  if (ctx.result === 0) {
    ctx.juel[5] -= A;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 11)}의 레벨이 %조사처리(ABL:11,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[11] >= 5 && (ctx.talents[73] == 0 && ctx.talents[76] == 0)) {
    return 0;
  }
  if (ctx.abilities[11] >= 10) {
    return 0;
  }
  A = 0;
  E = 0;
  I = 0;
  if (ctx.abilities[11] === 0) {
    A = 5;
  } else if (ctx.abilities[11] === 1) {
    A = 50;
  } else if (ctx.abilities[11] === 2) {
    A = 1000;
  } else if (ctx.abilities[11] === 3) {
    A = 5000;
  } else if (ctx.abilities[11] === 4) {
    A = 12000;
  } else if (ctx.abilities[11] === 5) {
    A = 20000;
  } else if (ctx.abilities[11] === 6) {
    A = 30000;
  } else if (ctx.abilities[11] === 7) {
    A = 50000;
  } else if (ctx.abilities[11] === 8) {
    A = 80000;
  } else if (ctx.abilities[11] === 9) {
    A = 150000;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[11] == 3) {
      ctx.times('A', 1.50);
    }
    if (ctx.abilities[11] == 4) {
      ctx.times('A', 2.00);
    }
    if (ctx.abilities[11] == 5) {
      ctx.times('A', 2.50);
    }
    if (ctx.abilities[11] >= 6) {
      ctx.times('A', 3.00);
    }
  }
  if (ctx.talents[20]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[24]) {
    ctx.times('A', 1.10);
  }
  if (ctx.talents[30]) {
    ctx.times('A', 1.50);
  } else if (ctx.talents[31]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[32]) {
    ctx.times('A', 1.50);
  } else if (ctx.talents[33]) {
    ctx.times('A', 0.90);
  }
  if (ctx.talents[34]) {
    ctx.times('A', 1.50);
  }
  if (ctx.talents[35]) {
    ctx.times('A', 1.10);
  } else if (ctx.talents[36]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[70]) {
    ctx.times('A', 0.80);
  } else if (ctx.talents[71]) {
    ctx.times('A', 1.50);
  }
  if (ctx.talents[72]) {
    ctx.times('A', 0.95);
  }
  if (ctx.talents[73]) {
    ctx.times('A', 0.50);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.70);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.20);
  }
  if (ctx.talents[553]) {
    ctx.times('A', 0.40);
  }
  if (ctx.talents[209]) {
    ctx.times('B', 1.50);
  }
  if (ctx.talents[180]) {
    ctx.times('A', 0.90);
  }
  if (ctx.talents[422]) {
    ctx.times('A', 0.70);
  }
  if (ctx.talents[432]) {
    ctx.times('A', 0.50);
  }
  if (ctx.talents[181]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[206]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.01);
  }
  if (ctx.abilities[11] === 4 && (ctx.talents[33] === 0 && ctx.talents[70] === 0 && ctx.talents[73] === 0 && ctx.talents[76] === 0 && ctx.talents[123] === 0)) {
    E = 1;
  } else if (ctx.abilities[11] === 7 && (ctx.talents[33] === 0 && ctx.talents[70] === 0 && ctx.talents[73] === 0 && ctx.talents[76] === 0 && ctx.talents[123] && ctx.talents[505] === 0)) {
    E = 3;
  }
  if (A < 1) {
    A = 1;
  }
  if (ctx.juel[5] < A) {
    I |= 1;
  }
  if (E > ctx.exp[50]) {
    I |= 2;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
