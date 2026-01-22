/**
 * WORK_NORMAL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function work_1st(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await work_person_a(ctx, character);
  A = ctx.rand(3);
  if (A <= ctx.abilities[11]) {
    D += ctx.abilities[11] * 2;
  } else {
    D += ctx.abilities[11];
  }
  D += ctx.abilities[16];
  D += ctx.abilities[17];
  E = 0;
  if (ctx.abilities[10] <= 2) {
    D /= 2;
  }
  if (ctx.abilities[15] <= 2) {
    D /= 2;
  }
  if (ctx.rand(2) === 0) {
    if ((ctx.flags[6] & 2) == 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 고객과 술을 마시면서, 가벼운 잡담을 했다`);
    }
    character.tflags[13] = 100;
    B += ctx.abilities[11];
    B += ctx.abilities[16];
    if (ctx.abilities[12] > ctx.abilities[15]) {
      B += ctx.abilities[12] * 2;
    } else {
      B += ctx.abilities[15] * 3;
    }
    D += B;
    await work_happy(ctx, character);
    if ((ctx.flags[6] & 2) === 0) {
      if (A >= 2) {
        ctx.showMessage(`${ctx.josaHelper("타겟과")} 즐겁게 대화를 나눠 고객은 만족한 것 같다`);
      } else if (A <= 1) {
        ctx.showMessage('고객과의 대화는 시들해져, 만족시킬 수는 없었던 것 같다');
      }
    }
  } else {
    if ((ctx.flags[6] & 2) == 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 고객과 술을 마시면서, 음담패설이 들어간 잡담을 했다`);
    }
    character.tflags[13] = 101;
    B += ctx.abilities[10];
    B += ctx.abilities[17] * 2;
    if (ctx.abilities[12] > ctx.abilities[15]) {
      B += ctx.abilities[12];
    } else {
      B += ctx.abilities[15] * 3;
    }
    if (ctx.talents[33] || ctx.talents[36]) {
      B += 2;
    }
    D += B;
    await work_happy(ctx, character);
    if ((ctx.flags[6] & 2) === 0) {
      if (A >= 2) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 도발적인 말과 매력적인 거동에, 고객은 만족한 것 같다`);
      } else if (A <= 1) {
        ctx.showMessage('오히려 분위기가 어색해져, 고객을 만족시킬 수 없었던 것 같다');
      }
    }
  }
  if ((ctx.flags[6] & 2)) {
    ctx.print('회화영업');
  }
  T[91] = 1;
  F = 1;
}

export async function work_2nd(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await work_person_a(ctx, character);
  A = ctx.rand(4);
  if (A <= ctx.abilities[11]) {
    D += ctx.abilities[11] * 2;
  } else {
    D += ctx.abilities[11];
  }
  if ((ctx.flags[6] & 2) === 0) {
    if (character.cflags[12] === 2) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 고객의 앞에 무릎 꿇고, 그 성기에 봉사를 했다`);
    } else if (character.cflags[12] === 7) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 온몸을 거품으로 감싸고, 전신으로 고객의 몸을 씻어주었다`);
    }
  }
  character.tflags[13] = 102;
  D += ctx.abilities[16];
  D += ctx.abilities[32];
  D += ctx.abilities[12] * 2;
  D += ctx.abilities[13] * 2;
  if (ctx.abilities[10] <= 3) {
    D /= 2;
  }
  if (ctx.talents[122] && ctx.abilities[23] <= 1) {
    D /= 2;
  }
  if (ctx.talents[63]) {
    D += 2;
  }
  await work_happy(ctx, character);
  if ((ctx.flags[6] & 2) === 0) {
    if (A >= 3) {
      if (ctx.abilities[12] >= 3) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 능숙한 기교로 고객을 사로잡았다`);
      } else if (ctx.abilities[16] >= 4) {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 열띤 봉사에, 고객은 대단히 산뜻해졌다`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 봉사에, 고객은 대단히 만족한 것 같다`);
      }
    } else if (A === 2) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 봉사로 고객은 산뜻해진 것 같다`);
    } else if (A < 2) {
      ctx.showMessage(`그러나, ${ctx.getVarName("CALL", TARGET)}의 봉사로는 고객을 만족시킬 수 없었다`);
    }
  }
  if (character.cflags[16] === -1) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 낯선 남자의 페니스에 첫 키스를 바쳤다……`);
    character.cflags[16] = 2;
    if (character.cflags[16] === 4 && ctx.talents[76] === 0) {
      ctx.cstr[1] = "모르는 아저씨의 %CSTR:80%";
    } else if (character.cflags[16] === 4 && ctx.talents[76] === 1) {
      ctx.cstr[1] = "모르는 아저씨의 %CSTR:80%";
    }
    character.cflags[820] = ctx.base[9];
    character.cflags[821] = DAY[1];
    character.cflags[822] = DAY[2];
    character.cflags[823] = 7;
    character.cflags[824] = 1;
    ctx.exp[50] += 1;
  }
  T[20] = G;
  T[22] = G;
  T[74] = G;
  if (ctx.talents[122]) {
    T[41] = G;
  }
  if (ctx.talents[183] == 1) {
    T[75] = 2;
  }
  if (ctx.exp[23] <= 30) {
    T[75] *= 5;
  } else if (ctx.exp[23] <= 50) {
    T[75] *= 4;
  } else if (ctx.exp[23] <= 100) {
    T[75] *= 3;
  } else if (ctx.exp[23] >= 200) {
    T[75] /= 2;
  }
  if ((ctx.flags[6] & 2)) {
    ctx.print('봉사영업');
  }
  T[91] = 2;
  F = 3;
}

export async function work_3rd(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await work_person_a(ctx, character);
  A = ctx.rand(5);
  if (A <= ctx.abilities[11]) {
    D += ctx.abilities[11] * 2;
  } else {
    D += ctx.abilities[11];
  }
  E = 0;
  if ((ctx.flags[6] & 2) === 0) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 고객에게 몇번이고 애널을 범해져`);
    if (character.cflags[13]) {
      ctx.showMessage(` 버렸다`);
    } else {
      ctx.showMessage(`, 장내에 정액을 부어 넣어졌다`);
    }
  }
  character.tflags[13] = 103;
  D += ctx.abilities[3] * 3;
  D += ctx.abilities[12] * 2;
  D += ctx.abilities[16];
  D += ctx.abilities[14];
  D += ctx.abilities[30];
  if (ctx.exp[1] <= EXPLV[4]) {
    D -= 3;
  }
  if (ctx.abilities[10] <= 4) {
    D /= 2;
  }
  if (ctx.talents[122] && ctx.abilities[23] <= 2) {
    D /= 2;
  }
  if (ctx.talents[77]) {
    D += 5;
  }
  await work_happy(ctx, character);
  if ((ctx.flags[6] & 2) === 0) {
    if (A >= 3) {
      if (ctx.abilities[12] >= 3) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 그 기교로 고객들을 사로잡았다`);
      } else if (ctx.abilities[3] >= 4) {
        ctx.showMessage(`고객들은 ${ctx.getVarName("CALL", TARGET)}의 애널의 뛰어난 상태에 만족했다`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 애널은, 손님들을 매우 만족시켰다`);
      }
    } else if (A === 2) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 애널에, 고객들은 그런대로 만족은 한 것 같다`);
    } else if (A < 2) {
      ctx.showMessage(`그러나, ${ctx.getVarName("CALL", TARGET)}의 애널로는 고객들의 욕구를 만족시킬 수 없었다`);
    }
  }
  if (ctx.talents[2] === 1 && character.cflags[616] === 0) {
    ctx.showMessage(`W 【매춘으로 애널처녀상실】`);
    ctx.talents[2] = 0;
    character.cflags[616] = 2;
    ctx.cstr[3] = "모르는 남자";
    ctx.exp[50] += 1;
    character.cflags[830] = ctx.base[9];
    character.cflags[831] = DAY[1];
    character.cflags[832] = DAY[2];
    character.cflags[833] = 7;
    character.cflags[834] = 0;
  }
  if (ctx.exp[1] <= 200) {
    character.cflags[52] = 1;
  }
  T[1] = G;
  T[5] = G;
  T[20] = G;
  T[74] = G;
  if (ctx.talents[122]) {
    T[41] = G * 2;
  }
  if (ctx.talents[183] == 1) {
    T[75] = 4;
  }
  if (ctx.exp[23] <= 30) {
    T[75] *= 5;
  } else if (ctx.exp[23] <= 50) {
    T[75] *= 4;
  } else if (ctx.exp[23] <= 100) {
    T[75] *= 3;
  } else if (ctx.exp[23] >= 200) {
    T[75] /= 2;
  }
  if ((ctx.flags[6] & 2)) {
    ctx.print('A영업');
  }
  if (character.cflags[13]) {
    T[91] = 3;
  } else {
    T[91] = 5;
  }
  if (ctx.talents[122]) {
    T[91] += 1;
  }
  F = 6;
}

export async function work_4th(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await work_person_a(ctx, character);
  A = ctx.rand(5);
  if (A <= ctx.abilities[11]) {
    D += ctx.abilities[11] * 2;
  } else {
    D += ctx.abilities[11];
  }
  E = 0;
  if ((ctx.flags[6] & 2) === 0) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 고객에게 몇번이고 질을 범해져`);
    if (character.cflags[13]) {
      ctx.showMessage(` 버렸다`);
    } else {
      ctx.showMessage(`, 질내에 정액을 부어 넣어졌다`);
    }
  }
  character.tflags[13] = 104;
  D += ctx.abilities[2] * 3;
  D += ctx.abilities[12] * 2;
  D += ctx.abilities[16];
  D += ctx.abilities[14];
  D += ctx.abilities[30];
  if (ctx.exp[0] <= EXPLV[4]) {
    D -= 3;
  }
  if (ctx.abilities[10] <= 4) {
    D /= 2;
  }
  if (ctx.talents[75]) {
    D += 5;
  }
  await work_happy(ctx, character);
  if ((ctx.flags[6] & 2) === 0) {
    if (A >= 3) {
      if (ctx.abilities[12] >= 3) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")}, 그 기교로 고객들을 사로잡았다`);
      } else if (ctx.abilities[2] >= 4) {
        ctx.showMessage(`고객들은, ${ctx.getVarName("CALL", TARGET)}의 질의 상태에 만족한 것 같다`);
      } else {
        ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질에, 고객들은 매우 만족한 것 같다`);
      }
    } else if (A === 2) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 질의 상태에, 일단 고객은 만족한 것 같다`);
    } else if (A < 2) {
      ctx.showMessage(`그러나, ${ctx.getVarName("CALL", TARGET)}의 성기는 고객들의 욕구를 만족시킬 수 없었다`);
    }
  }
  if (ctx.talents[0]) {
    ctx.showMessage(`W 【매춘으로 처녀상실】`);
    character.cflags[50] = 2;
    ctx.talents[0] = 0;
    if (character.cflags[15] === 0) {
      character.cflags[15] = 2;
      ctx.cstr[0] = "모르는 남자";
      character.cflags[160] = ctx.base[9];
      character.cflags[161] = DAY[1];
      character.cflags[162] = DAY[2];
      character.cflags[163] = 7;
      character.cflags[164] = 0;
    }
    T[50] += 2;
  }
  T[0] = G;
  T[5] = G;
  T[20] = G;
  T[74] = G;
  if (ctx.talents[183] == 1) {
    T[75] = 4;
  }
  if (ctx.exp[23] <= 30) {
    T[75] *= 5;
  } else if (ctx.exp[23] <= 50) {
    T[75] *= 4;
  } else if (ctx.exp[23] <= 100) {
    T[75] *= 3;
  } else if (ctx.exp[23] >= 200) {
    T[75] /= 2;
  }
  if ((ctx.flags[6] & 2)) {
    ctx.print('V영업');
  }
  if (character.cflags[13]) {
    T[91] = 4;
  } else {
    T[91] = 7;
  }
  F = 6;
}

export async function work_5th(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await work_person_a(ctx, character);
  A = ctx.rand(6);
  if (A <= ctx.abilities[11]) {
    D += ctx.abilities[11] * 2;
  } else {
    D += ctx.abilities[11];
  }
  D += ctx.abilities[12];
  if (ctx.abilities[20] + ctx.talents[83] * 5 >= ctx.abilities[21] + ctx.talents[88] * 5) {
    D += ctx.abilities[20] + ctx.talents[83] * 5;
  } else {
    D += ctx.abilities[21] + ctx.talents[88] * 5;
  }
  E = 0;
  if (ctx.abilities[10] <= 4) {
    D /= 2;
  }
  if (ctx.abilities[20] + ctx.talents[83] * 5 >= ctx.abilities[21] + ctx.talents[88] * 5) {
    if ((ctx.flags[6] & 2) == 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 밧줄에 묶인 고객의 위에서 가학적인 미소를 지으며 허리를 흔들면서, 정액을 짜냈다……`);
    }
    character.tflags[13] = 105;
    D += ctx.abilities[12] * 2;
    D += ctx.abilities[20] * 2;
    D += ctx.talents[83] * 5;
    await work_happy(ctx, character);
    if ((ctx.flags[6] & 2) === 0) {
      if (A >= 3) {
        if (ctx.abilities[12] >= 3) {
          ctx.showMessage('그 기교로 고객들을 사로잡은 것 같다');
        } else if (ctx.abilities[20] >= 4) {
          ctx.showMessage(`고객들은 ${ctx.getVarName("CALL", TARGET)}에게 희롱당하는 것을 충분히 즐긴 것 같다`);
        } else {
          ctx.showMessage('고객들은 매우 만족한 것 같다');
        }
      } else if (A === 2) {
        ctx.showMessage(`${ctx.josaHelper("타겟과")}의 SM플레이에, 일단은 만족한 것 같다`);
      } else if (A < 2) {
        ctx.showMessage('그러나 안타깝게도, 고객들의 욕구를 만족시키지는 못한 것 같다');
      }
    }
    if (ctx.exp[0] <= 200) {
      character.cflags[51] = 1;
    }
    T[0] = G;
    T[5] = G;
    T[20] = G;
    T[33] = G;
    T[74] = G;
  } else {
    if ((ctx.flags[6] & 2) == 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 고객에게 움직이지 못하도록 묶여서, 그대로 그 질을 범해졌다……`);
    }
    character.tflags[13] = 106;
    D += ctx.abilities[12] * 2;
    D += ctx.abilities[21] * 2;
    D += ctx.talents[88] * 5;
    await work_happy(ctx, character);
    if ((ctx.flags[6] & 2) === 0) {
      if (A >= 3) {
        if (ctx.abilities[12] >= 3) {
          ctx.showMessage('그 기교로 고객들을 사로잡은 것 같다');
        } else if (ctx.abilities[21] >= 4) {
          ctx.showMessage(`고객들은 울며 애원하는 ${ctx.getVarName("CALL", TARGET)}에게서 가학심을 충분히 만족시킨 것 같다`);
        } else {
          ctx.showMessage('고객들은 매우 만족한 것 같다');
        }
      } else if (A === 2) {
        ctx.showMessage(`${ctx.josaHelper("타겟과")}의 SM플레이에, 일단은 만족한 것 같다`);
      } else if (A < 2) {
        ctx.showMessage('그러나 안타깝게도, 고객들의 욕구를 만족시키지는 못한 것 같다');
      }
    }
    if (ctx.exp[0] <= 200) {
      character.cflags[51] = 1;
    }
    T[0] = G;
    T[5] = G;
    T[20] = G;
    T[30] = G;
    T[74] = G;
  }
  if (ctx.talents[183] == 1) {
    T[75] = 4;
  }
  if (ctx.exp[23] <= 30) {
    T[75] *= 5;
  } else if (ctx.exp[23] <= 50) {
    T[75] *= 4;
  } else if (ctx.exp[23] <= 100) {
    T[75] *= 3;
  } else if (ctx.exp[23] >= 200) {
    T[75] /= 2;
  }
  if ((ctx.flags[6] & 2)) {
    ctx.print('SM영업');
  }
  if (character.cflags[13]) {
    T[91] = 5;
  } else {
    T[91] = 10;
  }
  F = 8;
  if (ctx.talents[0]) {
    ctx.showMessage(`【매춘으로 처녀상실】`);
    character.cflags[50] = 2;
    ctx.talents[0] = 0;
    if (character.cflags[15] == 0) {
      character.cflags[15] = 2;
    }
    ctx.cstr[3] = "모르는 남자";
    T[50] += 2;
  }
}

export async function work_6th(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await work_person_a(ctx, character);
  G = 1;
  A = ctx.rand(5);
  if (A <= ctx.abilities[11]) {
    D += ctx.abilities[11] * 2;
  } else {
    D += ctx.abilities[11];
  }
  D += ctx.abilities[15];
  D += ctx.abilities[16];
  E = 0;
  if (ctx.abilities[10] <= 4) {
    D /= 2;
  }
  if ((ctx.flags[6] & 2) == 0) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 고객의 집까지 가서, 농후한 서비스를 했다……`);
  }
  character.tflags[13] = 107;
  D += ctx.abilities[12] * 2;
  D += ctx.abilities[16] * 2;
  await work_happy(ctx, character);
  if ((ctx.flags[6] & 2) === 0) {
    if (A >= 3) {
      ctx.showMessage(`고객은 ${ctx.josaHelper("타겟과")} 매우 충실한 시간을 보낸 것 같다`);
    } else if (A === 2) {
      ctx.showMessage(`고객은 ${ctx.josaHelper("타겟과")} 즐거운 한때를 보낸 것 같다`);
    } else if (A < 2) {
      ctx.showMessage('아무래도 고객은 그다지 즐기지 못한 것 같다');
    }
  }
  if (ctx.talents[0]) {
    ctx.showMessage(`【매춘으로 처녀상실】`);
    character.cflags[50] = 2;
    ctx.talents[0] = 0;
    if (character.cflags[15] == 0) {
      character.cflags[15] = 2;
    }
    ctx.cstr[0] = "단골 손님";
    T[50] += 2;
  }
  if (character.cflags[16] === -1) {
    ctx.showMessage(`첫 키스`);
    character.cflags[16] = 4;
    if (ctx.talents[432] === 0) {
      ctx.cstr[1] = "단골 손님";
    } else if (ctx.talents[432] === 1) {
      ctx.cstr[1] = "단골 손님의 자지";
    }
  }
  if (ctx.exp[0] <= 200) {
    character.cflags[51] = 1;
  }
  if (ctx.talents[183] === 1) {
    character.cflags[50] = 0;
    character.cflags[51] = 0;
  }
  T[0] = G;
  T[5] = G;
  T[20] = G;
  T[22] = G;
  T[74] = G;
  if (ctx.talents[183] == 1) {
    T[75] = 8;
  }
  if (ctx.exp[23] <= 30) {
    T[75] *= 5;
  } else if (ctx.exp[23] <= 50) {
    T[75] *= 4;
  } else if (ctx.exp[23] <= 100) {
    T[75] *= 3;
  } else if (ctx.exp[23] >= 200) {
    T[75] /= 2;
  }
  if ((ctx.flags[6] & 2)) {
    ctx.print('출장영업');
  }
  if (character.cflags[13]) {
    T[91] = 10;
  } else {
    T[91] = 30;
  }
  F = 6;
}
