/**
 * SELL_CHARA_ESTIMATE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function estimate_chara(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  S = 0;
  I = ctx.count;
  for (let COUNT = 0; COUNT < 600; COUNT++) {
    T[ctx.count] = 100;
  }
  ctx.count = I;
  if (ctx.abilities[10] === 0) {
    A[10] = 0;
  } else if (ctx.abilities[10] === 1) {
    A[10] = 200;
  } else if (ctx.abilities[10] === 2) {
    A[10] = 500;
  } else if (ctx.abilities[10] === 3) {
    A[10] = 850;
  } else if (ctx.abilities[10] === 4) {
    A[10] = 1500;
  } else if (ctx.abilities[10] === 5) {
    A[10] = 2000;
  } else if (ctx.abilities[10] === 6) {
    A[10] = 2300;
  } else if (ctx.abilities[10] === 7) {
    A[10] = 2600;
  } else if (ctx.abilities[10] === 8) {
    A[10] = 3000;
  } else if (ctx.abilities[10] === 9) {
    A[10] = 3200;
  } else if (ctx.abilities[10] >= 10) {
    A[10] = 3500;
  }
  S += A[10];
  if (ctx.abilities[11] === 0) {
    A[11] = 10;
  } else if (ctx.abilities[11] === 1) {
    A[11] = 100;
  } else if (ctx.abilities[11] === 2) {
    A[11] = 300;
  } else if (ctx.abilities[11] === 3) {
    A[11] = 700;
  } else if (ctx.abilities[11] === 4) {
    A[11] = 1200;
  } else if (ctx.abilities[11] === 5) {
    A[11] = 2000;
  } else if (ctx.abilities[11] === 6) {
    A[11] = 2300;
  } else if (ctx.abilities[11] === 7) {
    A[11] = 2600;
  } else if (ctx.abilities[11] === 8) {
    A[11] = 3000;
  } else if (ctx.abilities[11] === 9) {
    A[11] = 3200;
  } else if (ctx.abilities[11] >= 10) {
    A[11] = 3500;
  }
  S += A[11];
  if (ctx.abilities[12] === 0) {
    A[12] = 0;
  } else if (ctx.abilities[12] === 1) {
    A[12] = 100;
  } else if (ctx.abilities[12] === 2) {
    A[12] = 200;
  } else if (ctx.abilities[12] === 3) {
    A[12] = 400;
  } else if (ctx.abilities[12] === 4) {
    A[12] = 700;
  } else if (ctx.abilities[12] === 5) {
    A[12] = 1200;
  } else if (ctx.abilities[12] === 6) {
    A[12] = 1500;
  } else if (ctx.abilities[12] === 7) {
    A[12] = 1800;
  } else if (ctx.abilities[12] === 8) {
    A[12] = 2200;
  } else if (ctx.abilities[12] === 9) {
    A[12] = 2600;
  } else if (ctx.abilities[12] >= 10) {
    A[12] = 3000;
  }
  S += A[12];
  if (ctx.abilities[13] === 0) {
    A[13] = 0;
  } else if (ctx.abilities[13] === 1) {
    A[13] = 100;
  } else if (ctx.abilities[13] === 2) {
    A[13] = 150;
  } else if (ctx.abilities[13] === 3) {
    A[13] = 300;
  } else if (ctx.abilities[13] === 4) {
    A[13] = 500;
  } else if (ctx.abilities[13] === 5) {
    A[13] = 800;
  } else if (ctx.abilities[13] === 6) {
    A[13] = 2000;
  } else if (ctx.abilities[13] === 7) {
    A[13] = 2500;
  } else if (ctx.abilities[13] === 8) {
    A[13] = 3000;
  } else if (ctx.abilities[13] === 9) {
    A[13] = 3800;
  } else if (ctx.abilities[13] >= 10) {
    A[13] = 5000;
  }
  S += A[13];
  if (ctx.abilities[14] === 0) {
    A[14] = 0;
  } else if (ctx.abilities[14] === 1) {
    A[14] = 100;
  } else if (ctx.abilities[14] === 2) {
    A[14] = 150;
  } else if (ctx.abilities[14] === 3) {
    A[14] = 300;
  } else if (ctx.abilities[14] === 4) {
    A[14] = 500;
  } else if (ctx.abilities[14] === 5) {
    A[14] = 800;
  } else if (ctx.abilities[14] === 6) {
    A[14] = 2000;
  } else if (ctx.abilities[14] === 7) {
    A[14] = 2500;
  } else if (ctx.abilities[14] === 8) {
    A[14] = 3000;
  } else if (ctx.abilities[14] === 9) {
    A[14] = 3800;
  } else if (ctx.abilities[14] >= 10) {
    A[14] = 5000;
  }
  S += A[14];
  if (ctx.abilities[15] === 0) {
    A[15] = 0;
  } else if (ctx.abilities[15] === 1) {
    A[15] = 50;
  } else if (ctx.abilities[15] === 2) {
    A[15] = 120;
  } else if (ctx.abilities[15] === 3) {
    A[15] = 200;
  } else if (ctx.abilities[15] === 4) {
    A[15] = 300;
  } else if (ctx.abilities[15] === 5) {
    A[15] = 450;
  } else if (ctx.abilities[15] === 6) {
    A[15] = 1000;
  } else if (ctx.abilities[15] === 7) {
    A[15] = 1400;
  } else if (ctx.abilities[15] === 8) {
    A[15] = 2100;
  } else if (ctx.abilities[15] === 9) {
    A[15] = 2800;
  } else if (ctx.abilities[15] >= 10) {
    A[15] = 3500;
  }
  S += A[15];
  if (ctx.abilities[30] === 0) {
    A[30] = 0;
  } else if (ctx.abilities[30] === 1) {
    A[30] = 250;
  } else if (ctx.abilities[30] === 2) {
    A[30] = 500;
  } else if (ctx.abilities[30] === 3) {
    A[30] = 750;
  } else if (ctx.abilities[30] === 4) {
    A[30] = 1000;
  } else if (ctx.abilities[30] >= 5) {
    A[30] = 1300;
  }
  S += A[30];
  if (ctx.abilities[31] === 0) {
    A[31] = 0;
  } else if (ctx.abilities[31] === 1) {
    A[31] = 250;
  } else if (ctx.abilities[31] === 2) {
    A[31] = 500;
  } else if (ctx.abilities[31] === 3) {
    A[31] = 750;
  } else if (ctx.abilities[31] === 4) {
    A[31] = 1000;
  } else if (ctx.abilities[31] >= 5) {
    A[31] = 1300;
  }
  S += A[31];
  if (ctx.abilities[32] === 0) {
    A[32] = 0;
  } else if (ctx.abilities[32] === 1) {
    A[32] = 300;
  } else if (ctx.abilities[32] === 2) {
    A[32] = 600;
  } else if (ctx.abilities[32] === 3) {
    A[32] = 900;
  } else if (ctx.abilities[32] === 4) {
    A[32] = 1300;
  } else if (ctx.abilities[32] >= 5) {
    A[32] = 1700;
  }
  S += A[32];
  if (ctx.abilities[33] === 0) {
    A[33] = 0;
  } else if (ctx.abilities[33] === 1) {
    A[33] = 250;
  } else if (ctx.abilities[33] === 2) {
    A[33] = 500;
  } else if (ctx.abilities[33] === 3) {
    A[33] = 750;
  } else if (ctx.abilities[33] === 4) {
    A[33] = 1000;
  } else if (ctx.abilities[33] >= 5) {
    A[33] = 1300;
  }
  S += A[33];
  if (ctx.abilities[39] === 0) {
    A[39] = 0;
  } else if (ctx.abilities[39] === 1) {
    A[39] = 100;
  } else if (ctx.abilities[39] === 2) {
    A[39] = 300;
  } else if (ctx.abilities[39] === 3) {
    A[39] = 500;
  } else if (ctx.abilities[39] === 4) {
    A[39] = 1000;
  } else if (ctx.abilities[39] === 5) {
    A[39] = 1700;
  } else if (ctx.abilities[39] >= 6) {
    A[39] = 3000;
  }
  S += A[39];
  if (ctx.abilities[0] <= 3) {
    A[0] = 100;
  } else if (ctx.abilities[0] === 4) {
    A[0] = 110;
  } else if (ctx.abilities[0] === 5) {
    A[0] = 120;
  } else if (ctx.abilities[0] === 6) {
    A[0] = 130;
  } else if (ctx.abilities[0] === 7) {
    A[0] = 140;
  } else if (ctx.abilities[0] === 8) {
    A[0] = 150;
  } else if (ctx.abilities[0] === 9) {
    A[0] = 170;
  } else if (ctx.abilities[0] >= 10) {
    A[0] = 200;
  }
  S *= A[0];
  S /= 100;
  if (ctx.abilities[1] <= 2) {
    A[1] = 100;
  } else if (ctx.abilities[1] === 3) {
    A[1] = 110;
  } else if (ctx.abilities[1] === 4) {
    A[1] = 120;
  } else if (ctx.abilities[1] === 5) {
    A[1] = 130;
  } else if (ctx.abilities[1] === 6) {
    A[1] = 140;
  } else if (ctx.abilities[1] === 7) {
    A[1] = 150;
  } else if (ctx.abilities[1] === 8) {
    A[1] = 160;
  } else if (ctx.abilities[1] === 9) {
    A[1] = 180;
  } else if (ctx.abilities[1] >= 10) {
    A[1] = 200;
  }
  S *= A[1];
  S /= 100;
  if (ctx.abilities[2] <= 2) {
    A[2] = 100;
  } else if (ctx.abilities[2] === 3) {
    A[2] = 110;
  } else if (ctx.abilities[2] === 4) {
    A[2] = 120;
  } else if (ctx.abilities[2] === 5) {
    A[2] = 140;
  } else if (ctx.abilities[2] === 6) {
    A[2] = 150;
  } else if (ctx.abilities[2] === 7) {
    A[2] = 160;
  } else if (ctx.abilities[2] === 8) {
    A[2] = 170;
  } else if (ctx.abilities[2] === 9) {
    A[2] = 190;
  } else if (ctx.abilities[2] >= 10) {
    A[2] = 200;
  }
  S *= A[2];
  S /= 100;
  if (ctx.abilities[3] <= 1) {
    A[3] = 100;
  } else if (ctx.abilities[3] === 2) {
    A[3] = 110;
  } else if (ctx.abilities[3] === 3) {
    A[3] = 120;
  } else if (ctx.abilities[3] === 4) {
    A[3] = 140;
  } else if (ctx.abilities[3] === 5) {
    A[3] = 160;
  } else if (ctx.abilities[3] === 6) {
    A[3] = 180;
  } else if (ctx.abilities[3] === 7) {
    A[3] = 190;
  } else if (ctx.abilities[3] === 8) {
    A[3] = 200;
  } else if (ctx.abilities[3] === 9) {
    A[3] = 230;
  } else if (ctx.abilities[3] >= 10) {
    A[3] = 250;
  }
  S *= A[3];
  S /= 100;
  if (ctx.abilities[16] <= 2) {
    A[16] = 100;
  } else if (ctx.abilities[16] === 3) {
    A[16] = 110;
  } else if (ctx.abilities[16] === 4) {
    A[16] = 130;
  } else if (ctx.abilities[16] <= 7) {
    A[16] = 150;
  } else if (ctx.abilities[16] >= 8) {
    A[16] = 180;
  }
  S *= A[16];
  S /= 100;
  if (ctx.abilities[17] <= 2) {
    A[17] = 100;
  } else if (ctx.abilities[17] === 3) {
    A[17] = 110;
  } else if (ctx.abilities[17] === 4) {
    A[17] = 130;
  } else if (ctx.abilities[17] <= 7) {
    A[17] = 150;
  } else if (ctx.abilities[17] >= 8) {
    A[17] = 180;
  }
  S *= A[17];
  S /= 100;
  if (ctx.abilities[20] <= 2) {
    A[20] = 100;
  } else if (ctx.abilities[20] === 3) {
    A[20] = 130;
  } else if (ctx.abilities[20] === 4) {
    A[20] = 140;
  } else if (ctx.abilities[20] === 5) {
    A[20] = 150;
  } else if (ctx.abilities[20] <= 7) {
    A[20] = 200;
  } else if (ctx.abilities[20] <= 9) {
    A[20] = 250;
  } else if (ctx.abilities[20] >= 10) {
    A[20] = 300;
  }
  S *= A[20];
  S /= 100;
  if (ctx.abilities[21] <= 2) {
    A[21] = 100;
  } else if (ctx.abilities[21] === 3) {
    A[21] = 130;
  } else if (ctx.abilities[21] === 4) {
    A[21] = 140;
  } else if (ctx.abilities[21] === 5) {
    A[21] = 150;
  } else if (ctx.abilities[21] <= 7) {
    A[21] = 200;
  } else if (ctx.abilities[21] <= 9) {
    A[21] = 250;
  } else if (ctx.abilities[21] >= 10) {
    A[21] = 300;
  }
  S *= A[21];
  S /= 100;
  if (ctx.abilities[22] <= 2) {
    A[22] = 100;
  } else if (ctx.abilities[22] === 3) {
    A[22] = 110;
  } else if (ctx.abilities[22] === 4) {
    A[22] = 130;
  } else if (ctx.abilities[22] <= 7) {
    A[22] = 150;
  } else if (ctx.abilities[22] >= 8) {
    A[22] = 180;
  }
  S *= A[22];
  S /= 100;
  if (ctx.abilities[23] <= 2) {
    A[23] = 100;
  } else if (ctx.abilities[23] === 3) {
    A[23] = 110;
  } else if (ctx.abilities[23] === 4) {
    A[23] = 130;
  } else if (ctx.abilities[23] <= 7) {
    A[23] = 150;
  } else if (ctx.abilities[23] >= 8) {
    A[23] = 180;
  }
  S *= A[23];
  S /= 100;
  if (ctx.exp[60] === 0) {
    E[60] = 100;
  } else if (ctx.exp[60] === 1) {
    E[60] = 50;
  } else if (ctx.exp[60] === 2) {
    E[60] = 20;
  } else if (ctx.exp[60] >= 3) {
    E[60] = 10;
  }
  S *= E[60];
  S /= 100;
  if (ctx.talents[0]) {
    if (character.cflags[71] === 0) {
      T[0] = 200;
    } else {
      T[0] = 150;
    }
  }
  if (ctx.talents[2] === 1) {
    T[2] = 150;
  }
  if (ctx.talents[12] && ctx.abilities[10] >= 3) {
    T[12] = 120;
  }
  if (ctx.talents[15] && ctx.abilities[10] >= 3) {
    T[15] = 120;
  }
  if (ctx.talents[20] && ctx.abilities[11] <= 3) {
    T[20] = 80;
  }
  if (ctx.talents[21] && ctx.abilities[11] <= 3) {
    T[21] = 80;
  }
  if (ctx.talents[22] && ctx.abilities[11] <= 3) {
    T[22] = 80;
  }
  if (ctx.talents[24] && ctx.abilities[11] <= 3) {
    T[24] = 80;
  }
  if (ctx.talents[27] && ctx.abilities[10] <= 3) {
    T[27] = 80;
  }
  if (ctx.talents[33]) {
    T[33] = 120;
  }
  if (ctx.talents[42]) {
    T[42] = 120;
  }
  if (ctx.talents[46]) {
    T[46] = 20;
  }
  if (ctx.talents[63]) {
    T[63] = 120;
  }
  if (ctx.talents[70] && ctx.abilities[11] >= 3) {
    T[70] = 120;
  }
  if (ctx.talents[71] && ctx.abilities[11] <= 3) {
    T[71] = 60;
  }
  if (ctx.talents[73]) {
    T[73] = 20;
  }
  if (ctx.talents[76]) {
    T[76] = 150;
  }
  if (ctx.talents[91]) {
    T[91] = 150;
  }
  if (ctx.talents[92]) {
    T[92] = 400;
  }
  if (ctx.talents[109] && ctx.talents[100] == 0 && ctx.talents[132] == 0 && ctx.talents[135] == 0) {
    T[109] = 90;
  }
  if (ctx.talents[110]) {
    T[110] = 150;
  }
  if (ctx.talents[113]) {
    T[113] = 150;
  }
  if (ctx.talents[114]) {
    T[114] = 160;
  }
  if (ctx.talents[115]) {
    T[115] = 20;
  }
  if (ctx.talents[116] && ctx.talents[132] == 0 && ctx.talents[135] == 0) {
    T[116] = 50;
  }
  if (ctx.talents[121]) {
    T[121] = 200;
  }
  if (ctx.talents[122] && ctx.talents[113] === 0 && ctx.talents[132] === 0 && ctx.talents[135] === 0) {
    if (ctx.abilities[10] <= 3 || ctx.abilities[11] <= 3 || ctx.abilities[23] <= 2) {
      T[122] = 20;
    } else if (ctx.abilities[10] <= 4 || ctx.abilities[11] <= 4 || ctx.abilities[23] <= 3) {
      T[122] = 40;
    } else if (ctx.abilities[10] <= 5 || ctx.abilities[11] <= 5 || ctx.abilities[23] <= 4) {
      T[122] = 70;
    }
  }
  if (ctx.talents[124]) {
    T[124] = 120;
  }
  if (ctx.talents[126]) {
    T[126] = 150;
  }
  if (ctx.talents[130]) {
    T[130] = 140;
  }
  if (ctx.talents[135]) {
    T[135] = 50;
  }
  if (ctx.talents[180]) {
    T[180] = 150;
  }
  if (ctx.talents[181]) {
    T[181] = 150;
  }
  if (ctx.talents[203]) {
    T[203] = 150;
  }
  if (ctx.talents[204]) {
    T[203] = 150;
  }
  if (ctx.talents[209]) {
    T[203] = 150;
  }
  if (ctx.talents[224]) {
    T[224] = 150;
  }
  if (ctx.talents[320]) {
    T[320] = 150;
  }
  if (ctx.talents[407]) {
    T[407] = 500;
  }
  if (ctx.talents[408]) {
    T[408] = 150;
  }
  if (ctx.talents[409]) {
    T[409] = 150;
  }
  if (ctx.talents[410]) {
    T[410] = 120;
  }
  if (ctx.talents[411]) {
    T[411] = 150;
  }
  if (ctx.talents[412]) {
    T[412] = 200;
  }
  if (ctx.talents[413]) {
    T[413] = 300;
  }
  if (ctx.talents[414]) {
    T[414] = 200;
  }
  if (ctx.talents[417]) {
    T[417] = 150;
  }
  if (ctx.talents[422]) {
    T[422] = 90;
  }
  if (ctx.talents[500]) {
    T[500] = 200;
  }
  if (ctx.talents[501]) {
    T[501] = 300;
  }
  if (ctx.talents[502]) {
    T[502] = 200;
  }
  if (ctx.talents[504]) {
    T[504] = 300;
  }
  if (ctx.talents[505]) {
    T[505] = 300;
  }
  if (ctx.talents[506]) {
    T[506] = 200;
  }
  if (ctx.talents[507]) {
    T[507] = 500;
  }
  if (ctx.talents[509]) {
    T[509] = 800;
  }
  if (ctx.talents[511]) {
    T[511] = 1600;
  }
  if (ctx.talents[512]) {
    T[512] = 1600;
  }
  if (ctx.talents[513]) {
    T[513] = 300;
  }
  if (ctx.talents[515]) {
    T[515] = 600;
  }
  if (ctx.talents[519]) {
    T[519] = 800;
  }
  if (ctx.talents[9] || ctx.talents[123] || ctx.talents[153]) {
    if (ctx.talents[9]) {
      T[9] = ctx.abilities[10] * 5;
    } else if (ctx.talents[123]) {
      T[123] = ctx.abilities[10] * 5;
    } else if (ctx.talents[153]) {
      T[153] = ctx.abilities[10] * 5;
    }
  }
  I = ctx.count;
  for (let COUNT = 0; COUNT < 600; COUNT++) {
    if (T[ctx.count] != 100) {
      S *= T[ctx.count];
      S /= 100;
    }
  }
  ctx.count = I;
  O[1] = 100;
  M = 0;
  I = ctx.count;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getTalent(count, 211) && ctx.isAssi[ctx.count] && ctx.abilities[ctx.count][15] && ctx.count != character) {
      if (ctx.abilities[ctx.count][15] > ctx.abilities[M][15]) {
        M = ctx.count;
      }
    }
  }
  ctx.count = I;
  if (M) {
    O[1] = 100 + ctx.abilities[M][15] * 2;
  }
  S *= O[1];
  S /= 100;
  S /= 10;
  if (ctx.talents[199]) {
    S = -1;
  }
}
