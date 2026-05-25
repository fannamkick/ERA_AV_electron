/**
 * ABLUP70.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup70(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[70] >= 5 && (ctx.talents[76] === 0 && ctx.talents[89] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[70] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  B = 0;
  await decide_ablup70(ctx, character);
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
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 70)}　${ctx.exp[70]}/{B}`);
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
  ctx.abilities[70] += 1;
  ctx.juel[7] -= A;
  ctx.showMessage(`${ctx.getVarName("ABL", 70)}의 레벨이 %조사처리(ABL:70,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup70(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[70] >= 10) {
    return 0;
  }
  if (ctx.abilities[70] >= 5 && (ctx.talents[76] == 0 && ctx.talents[89] == 0)) {
    return 0;
  }
  A = 0;
  B = 0;
  I = 0;
  if (ctx.abilities[70] === 0) {
    A = 100;
    B = 10;
  } else if (ctx.abilities[70] === 1) {
    A = 300;
    B = 30;
  } else if (ctx.abilities[70] === 2) {
    A = 500;
    B = 60;
  } else if (ctx.abilities[70] === 3) {
    A = 2000;
    B = 100;
  } else if (ctx.abilities[70] === 4) {
    A = 6000;
    B = 200;
  } else if (ctx.abilities[70] === 5) {
    A = 12000;
    B = 500;
  } else if (ctx.abilities[70] === 6) {
    A = 16000;
    B = 1000;
  } else if (ctx.abilities[70] === 7) {
    A = 22000;
    B = 1800;
  } else if (ctx.abilities[70] === 8) {
    A = 30000;
    B = 4000;
  } else if (ctx.abilities[70] === 9) {
    A = 35000;
    B = 10000;
  }
  if (ctx.talents[50]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
  } else if (ctx.talents[51]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
  }
  if (ctx.talents[89]) {
    ctx.times('A', 0.01);
    ctx.times('B', 0.01);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.10);
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
  if (ctx.exp[70] < B) {
    I |= 2;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
