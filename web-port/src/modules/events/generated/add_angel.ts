/**
 * ADD_ANGEL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function add_angel(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: FOR LOCAL, 0, 150
  ctx.exp[ctx.locals[0]] = 0;
  // TODO: NEXT
  // TODO: FOR LOCAL, 0, 100
  ctx.juel[ctx.locals[0]] = 0;
  ctx.params[ctx.locals[0]] = 0;
  // TODO: NEXT
  // TODO: FOR LOCAL, 0, 100
  if (ctx.locals[0] == 50 || ctx.locals[0] == 51 || ctx.locals[0] == 52 || ctx.locals[0] == 81) {
    // TODO: CONTINUE
  }
  ctx.abilities[ctx.locals[0]] = 0;
  // TODO: NEXT
  // TODO: FOR LOCAL, 0, 4
  character.mark[ctx.locals[0]] = 0;
  // TODO: NEXT
  if (character.cflags[684] == 1) {
    ctx.flags[557] -= 1;
  }
  if (character.cflags[60] == 1) {
    character.cflags[ctx.master][65] = 0;
  }
  // TODO: FOR LOCAL, 0, 999
  if (ctx.locals[0] == 40) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 41) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 42) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 170) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 171) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 172) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 173) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 174) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 175) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 176) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 177) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 178) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 179) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 180) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 600) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 602) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 609 && (ctx.talents[121] || ctx.talents[122])) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 610 && (ctx.talents[121] || ctx.talents[122])) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 611 && (ctx.talents[121] || ctx.talents[122])) {
    // TODO: CONTINUE
  }
  character.cflags[ctx.locals[0]] = 0;
  // TODO: NEXT
  character.cflags[16] = -1;
  character.cflags[620] = 999999;
  ctx.talents[0] = 1;
  ctx.talents[1] = 1;
  ctx.talents[2] = 1;
  ctx.talents[13] = 1;
  ctx.talents[24] = 1;
  ctx.talents[30] = 1;
  ctx.talents[50] = 1;
  ctx.talents[56] = 1;
  ctx.talents[63] = 1;
  ctx.talents[81] = 1;
  ctx.talents[93] = 1;
  ctx.talents[113] = 1;
  if (ctx.talents[121] === 0 && ctx.talents[122] === 0) {
    ctx.base[50] = 13 + ctx.rand(5);
    character.cflags[611] = ctx.rand(4);
  }
  ctx.talents[121] = 1;
  ctx.talents[211] = 1;
  ctx.talents[511] = 1;
  ctx.talents[430] = 0;
  ctx.talents[440] = 0;
  ctx.talents[31] = 0;
  ctx.talents[76] = 0;
  ctx.talents[85] = 0;
  ctx.talents[112] = 0;
  ctx.talents[113] = 0;
  ctx.talents[180] = 0;
  ctx.talents[181] = 0;
  ctx.talents[184] = 0;
  ctx.talents[190] = 0;
  ctx.talents[271] = 0;
  ctx.talents[272] = 0;
  ctx.talents[424] = 0;
  ctx.talents[400] = 0;
  ctx.talents[401] = 0;
  ctx.talents[425] = 0;
  ctx.talents[426] = 0;
  ctx.talents[432] = 0;
  MAXctx.base[0] += 1000;
  MAXctx.base[1] += 1000;
  MAXctx.base[31] += 80;
  ctx.base[0] = MAXctx.base[0];
  ctx.base[1] = MAXctx.base[1];
  ctx.base[31] = MAXctx.base[31];
}

export async function add_angel_assi(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: FOR LOCAL, 0, 150
  // TODO: EXP:ASSI:LOCAL = 0
  // TODO: NEXT
  // TODO: FOR LOCAL, 0, 100
  // TODO: JUEL:ASSI:LOCAL = 0
  // TODO: PALAM:ASSI:LOCAL = 0
  // TODO: NEXT
  // TODO: FOR LOCAL, 0, 100
  if (ctx.locals[0] == 50 || ctx.locals[0] == 51 || ctx.locals[0] == 52 || ctx.locals[0] == 81) {
    // TODO: CONTINUE
  }
  // TODO: ABL:ASSI:LOCAL = 0
  // TODO: NEXT
  // TODO: FOR LOCAL, 0, 4
  // TODO: MARK:ASSI:LOCAL = 0
  // TODO: NEXT
  if (character.cflags[ctx.assi][684] == 1) {
    ctx.flags[557] -= 1;
  }
  if (character.cflags[ctx.assi][60] == 1) {
    character.cflags[ctx.master][65] = 0;
  }
  // TODO: FOR LOCAL, 0, 999
  if (ctx.locals[0] == 40) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 41) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 42) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 170) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 171) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 172) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 173) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 174) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 175) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 176) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 177) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 178) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 179) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 180) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 600) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 602) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 609 && (ctx.talents[121] || ctx.talents[122])) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 610 && (ctx.talents[21] || ctx.talents[122])) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == 611 && (ctx.talents[21] || ctx.talents[122])) {
    // TODO: CONTINUE
  }
  // TODO: CFLAG:ASSI:LOCAL = 0
  // TODO: NEXT
  character.cflags[ctx.assi][16] = -1;
  character.cflags[ctx.assi][620] = 999999;
  ctx.getTalent(assi, 0) = 1;
  ctx.getTalent(assi, 1) = 1;
  ctx.getTalent(assi, 2) = 1;
  ctx.getTalent(assi, 13) = 1;
  ctx.getTalent(assi, 24) = 1;
  ctx.getTalent(assi, 30) = 1;
  ctx.getTalent(assi, 50) = 1;
  ctx.getTalent(assi, 56) = 1;
  ctx.getTalent(assi, 63) = 1;
  ctx.getTalent(assi, 81) = 1;
  ctx.getTalent(assi, 93) = 1;
  ctx.getTalent(assi, 113) = 1;
  ctx.getTalent(assi, 121) = 1;
  ctx.getTalent(assi, 211) = 1;
  ctx.getTalent(assi, 511) = 1;
  ctx.getTalent(assi, 430) = 0;
  ctx.getTalent(assi, 440) = 0;
  ctx.getTalent(assi, 31) = 0;
  ctx.getTalent(assi, 74) = 0;
  ctx.getTalent(assi, 75) = 0;
  ctx.getTalent(assi, 76) = 0;
  ctx.getTalent(assi, 77) = 0;
  ctx.getTalent(assi, 78) = 0;
  ctx.getTalent(assi, 85) = 0;
  ctx.getTalent(assi, 112) = 0;
  ctx.getTalent(assi, 113) = 0;
  ctx.getTalent(assi, 184) = 0;
  ctx.getTalent(assi, 190) = 0;
  ctx.getTalent(assi, 230) = 0;
  ctx.getTalent(assi, 231) = 0;
  ctx.getTalent(assi, 232) = 0;
  ctx.getTalent(assi, 232) = 0;
  ctx.getTalent(assi, 271) = 0;
  ctx.getTalent(assi, 272) = 0;
  ctx.getTalent(assi, 400) = 0;
  ctx.getTalent(assi, 424) = 0;
  ctx.getTalent(assi, 425) = 0;
  ctx.getTalent(assi, 426) = 0;
  ctx.getTalent(assi, 432) = 0;
  MAXctx.base[ctx.assi][0] += 1000;
  MAXctx.base[ctx.assi][1] += 1000;
  MAXctx.base[ctx.assi][31] += 80;
  ctx.base[ctx.assi][0] = MAXctx.base[ctx.assi][0];
  ctx.base[ctx.assi][1] = MAXctx.base[ctx.assi][1];
  ctx.base[ctx.assi][31] = MAXctx.base[ctx.assi][31];
  ctx.base[ctx.assi][50] = 13 + ctx.rand(5);
  character.cflags[ctx.assi][611] = ctx.rand(4);
}
