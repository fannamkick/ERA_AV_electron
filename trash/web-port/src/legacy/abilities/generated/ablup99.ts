/**
 * ABLUP99.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup99(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (character.mark[3] <= 0) {
    ctx.showMessage('반발각인이 없습니다');
    await ctx.wait();
    return 0;
  }
  A = 0;
  B = 0;
  I = 0;
  await decide_ablup99(ctx, character);
  ctx.showMessage(`${ctx.getVarName("MARK", 2)}${character.mark[3]}이상 (현재${character.mark[2]}) 그리고`);
  ctx.showMessage(`${ctx.getVarName("ABL", 10)}{B}LV이상 (현재${ctx.abilities[10]}LV)LV필요`);
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 6)}의 구슬×${ctx.juel[6]}/${A} ……`);
  if (I === 0) {
    ctx.print('OK');
  } else {
    if (I & 1) {
      ctx.print('구슬부족');
    }
    if (I & 2) {
      ctx.print('각인부족');
    }
    if (I & 4) {
      ctx.print('능력부족');
    }
  }
  ctx.showMessage('');
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
  character.mark[3] -= 1;
  ctx.juel[6] -= A;
  ctx.showMessage(`${ctx.getVarName("MARK", 3)}의 반발각인이 ${ctx.josaHelper(ctx.getVarName("MARKNAME", 3), "가")} 되었습니다`);
  return 0;
}

export async function decide_ablup99(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.mark[3] <= 0) {
    return 0;
  }
  I = 0;
  B = 0;
  if (character.mark[3] === 1) {
    A = 5000;
  } else if (character.mark[3] === 2) {
    A = 10000;
  } else if (character.mark[3] === 3) {
    A = 50000;
  }
  if (ctx.talents[12]) {
    ctx.times('A', 3.00);
  }
  if (ctx.talents[16]) {
    ctx.times('A', 1.50);
  }
  if (ctx.talents[13]) {
    ctx.times('A', 0.50);
  }
  if (ctx.talents[85]) {
    ctx.times('A', 0.50);
  }
  if (character.mark[3] > character.mark[2]) {
    I |= 2;
  }
  B = character.mark[3] + 2;
  if (B > ctx.abilities[10]) {
    I |= 4;
  }
  if (ctx.juel[6] < A) {
    I |= 1;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
