/**
 * SEIIN.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function seiin_start(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[72] == 1) {
    return 0;
  }
  if (character.tflags[0] === 0 || character.tflags[899] > 0) {
    return 0;
  } else if (ctx.talents[47] && character.tflags[0] > 0) {
    await seiin_orgasm(ctx, character);
  } else if (character.tflags[0] > 0 && character.tflags[29] > 0) {
    await seiin_check(ctx, character);
  }
}

export async function seiin_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P = 50;
  if (ctx.talents[12] == 1) {
    P += 4;
  }
  if (ctx.talents[24] == 1) {
    P += 4;
  }
  if (ctx.talents[25] == 1) {
    P -= 2;
  }
  if (ctx.talents[26] == 1) {
    P += 2;
  }
  if (ctx.talents[27] == 1) {
    P += 5;
  }
  if (ctx.talents[32] == 1) {
    P += 4;
  }
  if (ctx.talents[33] == 1) {
    P -= 2;
  }
  if (ctx.talents[61] == 1) {
    P -= 2;
  }
  if (ctx.talents[62] == 1) {
    P += 2;
  }
  if (ctx.talents[70] == 1) {
    P -= 2;
  }
  if (ctx.talents[71] == 1) {
    P += 4;
  }
  if (ctx.talents[72] == 1) {
    P -= 5;
  }
  if (ctx.talents[80] == 1) {
    P -= 2;
  }
  if (ctx.talents[76] == 1) {
    P -= 20;
  }
  await seiin_compulsion_orgasm(ctx, character);
}

export async function seiin_orgasm(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  EX[13] += 1;
  ctx.exp[8] += 1;
  if (character.tflags[0] === 2) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)} 정음 절정`);
    ctx.showMessage(`정음절정경험 +1`);
    ctx.showMessage('대량의 정액이 목에 흘러드는 것에 의해 스위치가 켜져버린 것인지,');
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 우물거리는 소리를 내며, 동시에 움찔 하고 크게 어깨를 떨며 절정에 도달했다…`);
  } else {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)} 정음 절정`);
    ctx.showMessage(`정음절정경험 +1`);
    ctx.showMessage(`페니스를 입에 물고 있던 ${ctx.josaHelper("타겟은")} 우물거리는 소리를 내며,`);
    ctx.showMessage('움찔 하고 어깨를 작게 떨며 절정에 도달했다…');
  }
  character.source[10] = 2000;
  character.source[11] = 5000;
  character.source[13] = 10000;
  if (ctx.exp[8] === 1) {
    ctx.times('SOURCE:13', 3.00);
  } else if (ctx.abilities[32] === 3) {
    ctx.times('SOURCE:13', 2.00);
  } else if (ctx.abilities[32] === 4) {
    ctx.times('SOURCE:10', 1.50);
    ctx.times('SOURCE:11', 1.50);
    ctx.times('SOURCE:13', 1.50);
  } else if (ctx.abilities[32] === 5) {
    ctx.times('SOURCE:10', 2.00);
    ctx.times('SOURCE:11', 2.00);
  }
}

export async function seiin_compulsion_orgasm(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.cflags[580] += 1;
  if (character.cflags[580] >= P) {
    ctx.showMessage(`강제 정음 절정`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 완전히`);
    ctx.showMessage(`W 정액의 맛을 각인해버린 것 같다…`);
    character.tflags[110] = 1;
  } else if (character.cflags[580] === 1) {
    ctx.showMessage(`강제 정음 절정`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.josaHelper("플레이어가")} 쏟아낸 정액을 마시며`);
    ctx.showMessage(`지속적으로 주어지는 자극에 의해`);
    ctx.showMessage(`W 강제로 가버렸다…`);
    ctx.showMessage(`이상경험 +1`);
    ctx.exp[50] += 1;
  } else {
    ctx.showMessage(`강제 정음 절정`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} ${ctx.josaHelper("플레이어가")} 쏟아낸 정액을 마시며`);
    ctx.showMessage(`지속적으로 주어지는 자극에 의해`);
    ctx.showMessage(`강제로 가버렸다…`);
  }
  if (character.cflags[580] >= P) {
    if (ctx.abilities[32] < 3) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 정액중독이 LV3이 되었다`);
      ctx.abilities[32] = 3;
    }
  }
  character.source[13] = 1000;
  if (character.cflags[580] === 1) {
    ctx.times('SOURCE:13', 1.50);
  } else if (character.cflags[580] === P) {
    character.source[5] = 1000;
  }
}
