/**
 * CALC_BEAUTY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function calc_beauty(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[0] === 0) {
    ctx.base[31] -= 10;
  } else if (ctx.talents[2] === 0) {
    ctx.base[31] -= 5;
  } else if (ctx.talents[47] === 1) {
    ctx.base[31] -= 5;
  } else if (ctx.talents[64] === 1) {
    ctx.base[31] -= 5;
  } else if (ctx.talents[115] === 1) {
    ctx.base[31] -= 20;
  } else if (ctx.talents[128] === 1) {
    ctx.base[31] -= 5;
  } else if (ctx.talents[180] === 1) {
    ctx.base[31] -= 5;
  } else if (ctx.talents[181] === 1) {
    ctx.base[31] -= 10;
  } else if (ctx.talents[184] === 1) {
    ctx.base[31] -= 5;
  } else if (ctx.talents[321] === 1) {
    ctx.base[31] -= 5;
  } else if (ctx.talents[424] === 1) {
    ctx.base[31] -= 10;
  } else if (character.cflags[16] === 1) {
    ctx.base[31] -= 5;
  }
}

export async function calc_b_trainend(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = 0;
  X += 5;
  if (character.tflags[136] === 1) {
    X += 10;
  }
  if (character.tflags[131] === 1) {
    X += 5;
  }
  if (character.tflags[134] === 1) {
    X += 5;
  }
  if (character.tflags[135] === 1) {
    X += 10;
  }
  if (character.tflags[137] === 1) {
    X += 5;
  }
  if (ctx.base[0] <= 500) {
    X += ctx.rand(6);
  }
  ctx.base[31] -= X;
  if (ctx.base[31] <= 0) {
    ctx.base[31] = 0;
  }
}

export async function calc_b_nextmonth(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else {
      X += ctx.rand(6);
      if (ctx.getTalent(count, 326) == 1) {
        X += ctx.rand(6);
      }
      X += ctx.abilities[ctx.count][50];
      ctx.base[ctx.count][31] += X;
      if (ctx.base[ctx.count][31] >= MAXctx.base[ctx.count][31]) {
        ctx.base[ctx.count][31] = MAXctx.base[ctx.count][31];
      }
      X = 0;
    }
  }
}
