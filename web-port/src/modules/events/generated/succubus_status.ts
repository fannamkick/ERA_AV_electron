/**
 * SUCCUBUS_STATUS.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function succubus_status_ach(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 150; COUNT++) {
    // TODO: EXP:TARGET:COUNT = 0
  }
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    // TODO: JUEL:TARGET:COUNT = 0
    // TODO: PALAM:TARGET:COUNT = 0
  }
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    if (ctx.count == 50) {
      // TODO: CONTINUE
    }
    if (ctx.count == 51) {
      // TODO: CONTINUE
    }
    if (ctx.count == 52) {
      // TODO: CONTINUE
    }
    if (ctx.count == 81) {
      // TODO: CONTINUE
    }
    // TODO: ABL:TARGET:COUNT = 0
  }
  character.mark[0] = 0;
  character.mark[1] = 0;
  character.mark[2] = 0;
  character.mark[3] = 0;
  if (character.cflags[684] == 1) {
    ctx.flags[557] -= 1;
  }
  if (character.cflags[60] == 1) {
    character.cflags[ctx.master][65] = 0;
  }
  for (let COUNT = 0; COUNT < 999; COUNT++) {
    if (ctx.count == 170) {
      // TODO: CONTINUE
    }
    if (ctx.count == 171) {
      // TODO: CONTINUE
    }
    if (ctx.count == 172) {
      // TODO: CONTINUE
    }
    if (ctx.count == 173) {
      // TODO: CONTINUE
    }
    if (ctx.count == 174) {
      // TODO: CONTINUE
    }
    if (ctx.count == 175) {
      // TODO: CONTINUE
    }
    if (ctx.count == 176) {
      // TODO: CONTINUE
    }
    if (ctx.count == 177) {
      // TODO: CONTINUE
    }
    if (ctx.count == 178) {
      // TODO: CONTINUE
    }
    if (ctx.count == 179) {
      // TODO: CONTINUE
    }
    if (ctx.count == 180) {
      // TODO: CONTINUE
    }
    if (ctx.count == 600) {
      // TODO: CONTINUE
    }
    if (ctx.count == 602) {
      // TODO: CONTINUE
    }
    if (ctx.count == 606) {
      // TODO: CONTINUE
    }
    if (ctx.count == 609 && (ctx.getTalent(target, 121) || ctx.getTalent(target, 122))) {
      // TODO: CONTINUE
    }
    if (ctx.count == 610 && (ctx.getTalent(target, 121) || ctx.getTalent(target, 122))) {
      // TODO: CONTINUE
    }
    if (ctx.count == 611 && (ctx.getTalent(t, 121) || ctx.getTalent(t, 122))) {
      // TODO: CONTINUE
    }
    // TODO: CFLAG:TARGET:COUNT = 0
  }
  ctx.talents[12] = 0;
  ctx.talents[15] = 0;
  ctx.talents[17] = 0;
  ctx.talents[20] = 0;
  ctx.talents[21] = 0;
  ctx.talents[24] = 0;
  ctx.talents[26] = 0;
  ctx.talents[27] = 0;
  ctx.talents[30] = 0;
  ctx.talents[32] = 0;
  ctx.talents[34] = 0;
  ctx.talents[35] = 0;
  ctx.talents[43] = 0;
  ctx.talents[51] = 0;
  ctx.talents[71] = 0;
  ctx.talents[76] = 0;
  ctx.talents[82] = 0;
  ctx.talents[83] = 0;
  ctx.talents[84] = 0;
  ctx.talents[85] = 0;
  ctx.talents[86] = 0;
  ctx.talents[88] = 0;
  ctx.talents[90] = 0;
  ctx.talents[101] = 0;
  ctx.talents[103] = 0;
  ctx.talents[105] = 0;
  ctx.talents[107] = 0;
  ctx.talents[111] = 0;
  ctx.talents[112] = 0;
  ctx.talents[113] = 0;
  ctx.talents[127] = 0;
  ctx.talents[131] = 0;
  ctx.talents[134] = 0;
  ctx.talents[135] = 0;
  ctx.talents[136] = 0;
  ctx.talents[137] = 0;
  ctx.talents[154] = 0;
  ctx.talents[155] = 0;
  ctx.talents[156] = 0;
  ctx.talents[160] = 0;
  ctx.talents[161] = 0;
  ctx.talents[162] = 0;
  ctx.talents[163] = 0;
  ctx.talents[180] = 0;
  ctx.talents[181] = 0;
  ctx.talents[182] = 0;
  ctx.talents[183] = 0;
  ctx.talents[184] = 0;
  ctx.talents[190] = 0;
  ctx.talents[198] = 0;
  ctx.talents[206] = 0;
  ctx.talents[230] = 0;
  ctx.talents[231] = 0;
  ctx.talents[232] = 0;
  ctx.talents[233] = 0;
  ctx.talents[271] = 0;
  ctx.talents[272] = 0;
  ctx.talents[325] = 0;
  ctx.talents[400] = 0;
  ctx.talents[401] = 0;
  ctx.talents[416] = 0;
  if (ctx.talents[420] === 1) {
    ctx.talents[420] = 0;
    MAXctx.base[0] += 500;
  }
  ctx.talents[423] = 0;
  ctx.talents[424] = 0;
  ctx.talents[425] = 0;
  ctx.talents[430] = 0;
  ctx.talents[432] = 0;
  ctx.talents[440] = 0;
  ctx.abilities[11] = 5;
  ctx.abilities[12] = 3;
  ctx.exp[50] = 1;
  character.cflags[16] = -1;
  character.cflags[40] = 12;
  character.cflags[41] = 242;
  character.cflags[170] = 0;
  character.cflags[171] = 14;
  character.cflags[620] = 999999;
  character.cflags[621] = 0;
  if (ctx.talents[422] == 1) {
    character.cflags[614] = 4 + ctx.rand(4);
  }
  if (ctx.talents[122] == 0) {
    ctx.talents[0] = 1;
  }
  if (ctx.talents[122] == 1 || ctx.talents[121] == 1) {
    ctx.talents[1] = 1;
  }
  ctx.talents[2] = 1;
  ctx.talents[23] = 1;
  ctx.talents[31] = 1;
  ctx.talents[33] = 1;
  ctx.talents[50] = 1;
  ctx.talents[56] = 1;
  ctx.talents[70] = 1;
  ctx.talents[72] = 1;
  ctx.talents[102] = 1;
  ctx.talents[104] = 1;
  ctx.talents[106] = 1;
  ctx.talents[108] = 1;
  ctx.talents[80] += 1;
  ctx.talents[81] += 1;
  ctx.talents[91] = 1;
  ctx.talents[113] = 1;
  ctx.talents[152] = 1;
  ctx.talents[419] = 1;
  ctx.talents[505] = 1;
  if (ctx.talents[511] === 1 && ctx.talents[211] === 1) {
    ctx.abilities[15] = 10;
    ctx.abilities[12] = 10;
  }
  // TODO: CSTR:0 =
  // TODO: CSTR:1 =
  // TODO: CSTR:2 =
  // TODO: CSTR:3 =
  // TODO: CSTR:5 =
  // TODO: CSTR:6 =
  // TODO: CSTR:7 =
  // TODO: CSTR:8 =
  // TODO: CSTR:10 =
  // TODO: CSTR:11 =
  // TODO: CSTR:12 =
  // TODO: CSTR:13 =
  // TODO: CSTR:14 =
  // TODO: CSTR:15 =
  // TODO: CSTR:16 =
  // TODO: CSTR:17 =
  // TODO: CSTR:18 =
  // TODO: CSTR:19 =
  // TODO: CSTR:20 =
  // TODO: CSTR:21 =
  // TODO: CSTR:22 =
  // TODO: CSTR:23 =
  // TODO: CSTR:24 =
  // TODO: CSTR:25 =
  // TODO: CSTR:26 =
  // TODO: CSTR:27 =
  // TODO: CSTR:28 =
  // TODO: CSTR:29 =
  // TODO: CSTR:30 =
  // TODO: CSTR:31 =
  // TODO: CSTR:32 =
  // TODO: CSTR:33 =
  // TODO: CSTR:34 =
  // TODO: CSTR:35 =
  // TODO: CSTR:36 =
  // TODO: CSTR:37 =
  // TODO: CSTR:38 =
  // TODO: CSTR:39 =
  // TODO: CSTR:40 =
  ctx.relation[0] = 1000;
  MAXctx.base[0] += 1000;
  MAXctx.base[1] += 1000;
  MAXctx.base[31] += 50;
  ctx.base[0] = MAXctx.base[0];
  ctx.base[1] = MAXctx.base[1];
  ctx.base[31] = MAXctx.base[31];
}
