/**
 * ADD_CATASTROPH.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function add_catastroph(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: FOR LOCAL, 0, 600
  if (ctx.locals[0] == 0 || ctx.locals[0] == 1 ||  ctx.locals[0] == 2 ||  ctx.locals[0] == 121 || ctx.locals[0] == 122 || ctx.locals[0] == 130 || ctx.locals[0] == 153 || ctx.locals[0] == 154 || ctx.locals[0] == 422 || ctx.locals[0] == 424) {
    // TODO: CONTINUE
  }
  ctx.talents[ctx.locals[0]] = 0;
  // TODO: NEXT
  ctx.talents[9] = 1;
  ctx.talents[101] = 1;
  ctx.talents[103] = 1;
  ctx.talents[105] = 1;
  ctx.talents[107] = 1;
  MAXctx.base[31] = 10;
  if (ctx.base[31] >= MAXctx.base[31]) {
    ctx.base[31] = MAXctx.base[31];
  }
  MAXctx.base[0] -= 1500;
  if (MAXctx.base[0] < 800) {
    MAXctx.base[0] = 800;
  }
  ctx.base[0] = MAXctx.base[0];
  MAXctx.base[1] -= 1000;
  if (MAXctx.base[1] < 400) {
    MAXctx.base[1] = 400;
  }
  ctx.base[1] = MAXctx.base[1];
}

export async function add_catastroph_labo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: FOR LOCAL, 0, 600
  if (ctx.locals[0] == 0 || ctx.locals[0] == 1 ||  ctx.locals[0] == 2 ||  ctx.locals[0] == 121 || ctx.locals[0] == 122 || ctx.locals[0] == 130 || ctx.locals[0] == 153 || ctx.locals[0] == 154 || ctx.locals[0] == 422 || ctx.locals[0] == 424) {
    // TODO: CONTINUE
  }
  // TODO: TALENT:T:LOCAL = 0
  // TODO: NEXT
  ctx.getTalent(t, 9) = 1;
  ctx.getTalent(t, 101) = 1;
  ctx.getTalent(t, 103) = 1;
  ctx.getTalent(t, 105) = 1;
  ctx.getTalent(t, 107) = 1;
  MAXctx.base[T][31] = 10;
  if (ctx.base[T][31] >= MAXctx.base[T][31]) {
    ctx.base[T][31] = MAXctx.base[T][31];
  }
  MAXctx.base[T][0] -= 1500;
  if (MAXctx.base[T][0] < 800) {
    MAXctx.base[T][0] = 800;
  }
  ctx.base[T][0] = MAXctx.base[T][0];
  MAXctx.base[T][1] -= 1000;
  if (MAXctx.base[T][1] < 400) {
    MAXctx.base[T][1] = 400;
  }
  ctx.base[T][1] = MAXctx.base[T][1];
}

export async function add_catastroph_assi(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: FOR LOCAL, 0, 600
  if (ctx.locals[0] == 0 || ctx.locals[0] == 1 ||  ctx.locals[0] == 2 ||  ctx.locals[0] == 121 || ctx.locals[0] == 122 || ctx.locals[0] == 130 || ctx.locals[0] == 153 || ctx.locals[0] == 154 || ctx.locals[0] == 422 || ctx.locals[0] == 424) {
    // TODO: CONTINUE
  }
  // TODO: TALENT:ASSI:LOCAL = 0
  // TODO: NEXT
  ctx.getTalent(assi, 9) = 1;
  ctx.getTalent(assi, 101) = 1;
  ctx.getTalent(assi, 103) = 1;
  ctx.getTalent(assi, 105) = 1;
  ctx.getTalent(assi, 107) = 1;
  MAXctx.base[ctx.assi][31] = 10;
  if (ctx.base[ctx.assi][31] >= MAXctx.base[ctx.assi][31]) {
    ctx.base[ctx.assi][31] = MAXctx.base[ctx.assi][31];
  }
  MAXctx.base[ctx.assi][0] -= 1500;
  if (MAXctx.base[ctx.assi][0] < 800) {
    MAXctx.base[ctx.assi][0] = 800;
  }
  ctx.base[ctx.assi][0] = MAXctx.base[ctx.assi][0];
  MAXctx.base[ctx.assi][1] -= 1000;
  if (MAXctx.base[ctx.assi][1] < 400) {
    MAXctx.base[ctx.assi][1] = 400;
  }
  ctx.base[ctx.assi][1] = MAXctx.base[ctx.assi][1];
}
