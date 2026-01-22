/**
 * AV_POINTCALC.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function av_pointcalc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[9]) {
    ctx.times('P', 0.50);
  }
  if (ctx.talents[0]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[21]) {
    ctx.times('P', 0.70);
  }
  if (ctx.talents[22]) {
    ctx.times('P', 0.70);
  }
  if (ctx.talents[35]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[76]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[440]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[100]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[110]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[114]) {
    ctx.times('P', 1.40);
  }
  if (ctx.talents[115]) {
    ctx.times('P', 0.50);
  }
  if (ctx.talents[121]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[123]) {
    ctx.times('P', 0.80);
  }
  if (ctx.talents[124]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[126]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[92]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[113]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[115]) {
    ctx.times('P', 0.20);
  }
  if (ctx.talents[122] && ctx.talents[413] == 0) {
    ctx.times('P', 0.20);
  }
  if (ctx.talents[130]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[135]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[201]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[203]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[204]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[209]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[224]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[205]) {
    ctx.times('P', 2.00);
  }
  if (ctx.talents[206]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[212]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[220]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[221]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[222]) {
    ctx.times('P', 1.40);
  }
  if (ctx.talents[402]) {
    ctx.times('P', 1.40);
  }
  if (ctx.talents[407]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[408]) {
    ctx.times('P', 1.40);
  }
  if (ctx.talents[409]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[410]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[413]) {
    ctx.times('P', 1.20);
  }
  if (ctx.talents[414]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[421]) {
    ctx.times('P', 1.30);
  }
  if (ctx.talents[422]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[427]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[429]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[432]) {
    ctx.times('P', 1.10);
  }
  if (ctx.talents[433]) {
    ctx.times('P', 1.40);
  }
  if (ctx.talents[507]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[505]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[502]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[516]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[509]) {
    ctx.times('P', 3.00);
  }
  if (ctx.talents[515]) {
    ctx.times('P', 2.50);
  }
  if (ctx.talents[518]) {
    ctx.times('P', 3.0);
  }
  if (ctx.talents[519]) {
    ctx.times('P', 3.0);
  }
  if (ctx.talents[522]) {
    ctx.times('P', 3.0);
  }
  if (ctx.talents[523]) {
    ctx.times('P', 3.0);
  }
  if (ctx.talents[512]) {
    ctx.times('P', 3.00);
  }
  if (ctx.talents[530]) {
    ctx.times('P', 1.25);
  }
  if (ctx.talents[531]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[552]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[562]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[604]) {
    ctx.times('P', 2.00);
  }
  if (ctx.talents[605]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[606]) {
    ctx.times('P', 1.50);
  }
  if (ctx.talents[607]) {
    ctx.times('P', 1.50);
  }
  if (character.no == 38) {
    ctx.times('P', 2.50);
  }
  if (character.no == 83) {
    ctx.times('P', 2.50);
  }
  if (character.no == 209) {
    ctx.times('P', 2.00);
  }
  if (ctx.abilities[70] === 0) {
    ctx.times('P', 1.00);
  } else if (ctx.abilities[70] === 1) {
    ctx.times('P', 1.10);
  } else if (ctx.abilities[70] === 2) {
    ctx.times('P', 1.20);
  } else if (ctx.abilities[70] === 3) {
    ctx.times('P', 1.30);
  } else if (ctx.abilities[70] === 4) {
    ctx.times('P', 1.40);
  } else if (ctx.abilities[70] === 5) {
    ctx.times('P', 1.50);
  } else if (ctx.abilities[70] === 6) {
    ctx.times('P', 1.60);
  } else if (ctx.abilities[70] === 7) {
    ctx.times('P', 1.70);
  } else if (ctx.abilities[70] === 8) {
    ctx.times('P', 1.80);
  } else if (ctx.abilities[70] === 9) {
    ctx.times('P', 1.90);
  } else {
    ctx.times('P', 2.00);
  }
  if (ctx.abilities[17] === 0) {
    ctx.times('P', 1.00);
  } else if (ctx.abilities[17] === 1) {
    ctx.times('P', 1.10);
  } else if (ctx.abilities[17] === 2) {
    ctx.times('P', 1.20);
  } else if (ctx.abilities[17] === 3) {
    ctx.times('P', 1.30);
  } else if (ctx.abilities[17] === 4) {
    ctx.times('P', 1.40);
  } else if (ctx.abilities[17] === 5) {
    ctx.times('P', 1.50);
  } else if (ctx.abilities[17] === 6) {
    ctx.times('P', 1.60);
  } else if (ctx.abilities[17] === 7) {
    ctx.times('P', 1.70);
  } else if (ctx.abilities[17] === 8) {
    ctx.times('P', 1.80);
  } else if (ctx.abilities[17] === 9) {
    ctx.times('P', 1.90);
  } else {
    ctx.times('P', 2.00);
  }
  if (ctx.flags[5] === 3) {
    ctx.times('P', 0.70);
  } else if (ctx.flags[5] === 4) {
    ctx.times('P', 0.50);
  }
}
