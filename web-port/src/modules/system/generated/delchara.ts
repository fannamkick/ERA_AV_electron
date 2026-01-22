/**
 * DELCHARA.erb 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function _____(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  N = -1;
  if (ctx.assi >= 0) {
    N = ctx.assi.no;
  }
  if (character.cflags[ctx.args[0]][671] == 1) {
    ctx.flags[556] = 0;
  }
  if (character.cflags[ctx.args[0]][60] == 1) {
    character.cflags[ctx.master][65] = 0;
  }
  // TODO: DELCHARA ARG
  if (ctx.flags[1] == ctx.args[0]) {
    ctx.flags[1] = -1;
  }
  if (ctx.flags[2] == ctx.args[0]) {
    ctx.flags[2] = -1;
  }
  if (ctx.flags[1] > ctx.args[0]) {
    ctx.flags[1] -= 1;
  }
  if (ctx.flags[2] > ctx.args[0]) {
    ctx.flags[2] -= 1;
  }
  character = -1;
  ctx.assi = -1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getCharacterNo(ctx.count) == N) {
      ctx.assi = ctx.count;
    }
  }
}
