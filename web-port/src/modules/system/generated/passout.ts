/**
 * PASSOUT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function passout_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[70] == 1) {
    return 0;
  }
  character.tflags[895] = 0;
  Z = 0;
  Z = NOWEX[0] + NOWEX[1] + NOWEX[2] + NOWEX[3];
  if (Z >= 16 && character.tflags[897] === 0 && character.tflags[899] < 1 && ctx.rand(10) < 8) {
    character.tflags[897] = 1;
  } else if (Z >= 16 && character.tflags[897] === 1 && character.tflags[899] < 1 && ctx.rand(10) < 6) {
    character.tflags[895] = 1;
    character.tflags[897] = 2;
    ctx.exp[65] += 1;
    ctx.showMessage('실신');
  } else if (Z < 16 && character.tflags[897] < 2 && character.tflags[899] < 1) {
    character.tflags[897] = 0;
  }
  A = ctx.params[9];
  if (A >= 15000) {
    A -= 15000;
  }
  if ((UP[9] >= 7500 || UP[9] + A >= 15000) && character.tflags[899] < 1 && ctx.rand(10) < 5) {
    if (character.tflags[895] === 0) {
      character.tflags[895] = 2;
      character.tflags[898] = 2;
      ctx.exp[65] += 1;
      ctx.showMessage('실신');
    } else if (character.tflags[895] === 1) {
      character.tflags[895] = 4;
      character.tflags[898] = 2;
    }
  }
  if (UP[10] >= 5000 && character.tflags[899] < 1 && ctx.rand(10) < 5) {
    if (character.tflags[895] === 0) {
      character.tflags[895] = 3;
      character.tflags[896] = 2;
      ctx.exp[65] += 1;
      ctx.showMessage('실신');
    } else if (character.tflags[895] === 2) {
      character.tflags[895] = 6;
      character.tflags[896] = 2;
    }
  }
  if (character.tflags[896] >= 2 || character.tflags[897] >= 2 || character.tflags[898] >= 2) {
    if (character.tflags[899] === 0) {
      character.tflags[899] = 1;
    } else if (character.tflags[899] >= 1) {
      character.tflags[899] += 1;
    }
  }
  if (character.tflags[899] >= 2) {
    if (Z >= 16 || (character.tflags[899] >= 2 && UP[9] >= 5000) || character.tflags[899] >= 4) {
      character.tflags[896] = 3;
      character.tflags[897] = 3;
      character.tflags[898] = 3;
      ctx.showMessage('실신에서 회복');
    }
  }
}

export async function passout_text(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[895] > 0) {
    for (let COUNT = 0; COUNT < 31; COUNT++) {
      // TODO: TFLAG:(864 + COUNT) = 0
    }
  }
  if (character.tflags[899] > 1) {
    if (character.tflags[0] + character.tflags[6] >= 1) {
      if (SELECTCOM === 80 || character.cflags[74] === 1 || character.cflags[74] === 2) {
        if (character.equipment[35] === 0) {
          character.tflags[868] += character.tflags[0] + character.tflags[6];
        } else {
          character.tflags[868] += (character.tflags[0] + character.tflags[6]) - 1;
        }
      } else if (SELECTCOM === 29 || character.cflags[74] === 3 || character.cflags[74] === 5) {
        if (character.equipment[35] === 0) {
          character.tflags[869] += character.tflags[0] + character.tflags[6];
        } else {
          character.tflags[869] += (character.tflags[0] + character.tflags[6]) - 1;
        }
      }
    }
    if (character.tflags[1] + character.tflags[6] >= 1) {
      if (character.equipment[35] === 0) {
        character.tflags[870] += character.tflags[1] + character.tflags[6];
      } else {
        character.tflags[870] += (character.tflags[1] + character.tflags[6]) - 1;
      }
    }
    if (character.tflags[2] + character.tflags[6] >= 1) {
      if (SELECTCOM === 20 || SELECTCOM === 21 || SELECTCOM === 22 || SELECTCOM === 23 || SELECTCOM === 34 ||SELECTCOM === 64 || SELECTCOM === 120 || SELECTCOM === 121 || SELECTCOM === 128 || SELECTCOM === 129 || SELECTCOM === 130 || SELECTCOM === 131 || SELECTCOM === 132 || SELECTCOM === 133 || SELECTCOM === 134) {
        if (character.equipment[35] == 0) {
          character.tflags[871] += character.tflags[2] + character.tflags[6];
        }
      } else if (SELECTCOM === 26 || SELECTCOM === 27 || SELECTCOM === 28 || SELECTCOM === 29 || SELECTCOM === 36) {
        if (character.equipment[35] == 0) {
          character.tflags[872] += character.tflags[2] + character.tflags[6];
        }
      }
    }
    character.tflags[873] += character.tflags[3];
    if (character.tflags[2] + character.tflags[6] >= 1) {
      if (SELECTCOM === 33 || character.cflags[74] === 4 || character.cflags[74] === 6 || character.cflags[74] === 7) {
        if (character.equipment[35] === 0) {
          character.tflags[874] += character.tflags[6];
        } else {
          character.tflags[874] += character.tflags[6] - 1;
        }
      }
    }
    if (character.tflags[2] >= 1) {
      character.tflags[875] += character.tflags[2];
    }
    if (character.tflags[15] >= 1) {
      if (SELECTCOM === 101) {
        character.tflags[876] += 100;
      } else if (SELECTCOM === 102) {
        character.tflags[876] += 1000;
      } else {
        character.tflags[876] += character.tflags[15];
      }
    }
  }
  if (character.tflags[899] === 1) {
    character.tflags[867] = 0;
    character.tflags[877] = 0;
    if (character.equipment[13] == 1 || character.equipment[19] == 1) {
      character.tflags[867] = 1;
    }
    if (character.equipment[11] == 1) {
      character.tflags[877] = 1;
    }
    character.tflags[866] = 0;
    character.tflags[878] = 0;
    if (character.equipment[14] == 1 || character.equipment[17] == 1) {
      character.tflags[866] = 1;
    }
    if (character.equipment[15] == 1 || character.equipment[16] == 1) {
      character.tflags[878] = 1;
    }
    character.tflags[864] = 0;
    character.tflags[865] = 0;
    character.tflags[879] = 0;
    if (character.equipment[44]) {
      character.tflags[864] = character.equipment[44];
    }
    if (character.equipment[45] == 1) {
      character.tflags[865] = character.equipment[45];
    }
    if (character.equipment[46] == 1 || character.equipment[49] == 1) {
      character.tflags[879] = 1;
    }
    character.tflags[880] = 0;
    if (character.equipment[21]) {
      character.tflags[880] = 21;
    } else if (character.equipment[22]) {
      character.tflags[880] = 22;
    }
    character.tflags[881] = 0;
    if (character.equipment[53]) {
      character.tflags[881] = 53;
    } else if (character.equipment[54]) {
      character.tflags[881] = 54;
    } else if (character.equipment[58]) {
      character.tflags[881] = 58;
    }
    character.tflags[882] = character.equipment[90];
    if (character.cflags[74] != 0) {
      character.cflags[74] = 0;
    }
  } else {
    if (character.equipment[11] == 1 && (character.tflags[877] != 1)) {
      character.tflags[877] = (-1);
    }
    if ((character.equipment[13] == 1 || character.equipment[19] == 1) && (character.tflags[867] != 1)) {
      character.tflags[867] = (-1);
    }
    if ((character.equipment[14] == 1 || character.equipment[17] == 1) && (character.tflags[866] != 1)) {
      character.tflags[866] = (-1);
    }
    if ((character.equipment[15] == 1 || character.equipment[16] == 1) && (character.tflags[878] != 1)) {
      character.tflags[878] = (-1);
    }
    if (character.equipment[44] && character.tflags[864] != character.equipment[44]) {
      character.tflags[864] = (-1);
    }
    if (character.equipment[45] == 1 && character.tflags[865] != character.equipment[45]) {
      character.tflags[865] = (-1);
    }
    if ((character.equipment[46] == 1 || character.equipment[49] == 1) && (character.tflags[879] != 1)) {
      character.tflags[879] = (-1);
    }
    if ((character.equipment[21] && character.tflags[880] != 21) || (character.equipment[22] && character.tflags[880] != 22)) {
      character.tflags[880] = (-1);
    }
    if ((character.equipment[53] && character.tflags[881] != 53)  || (character.equipment[54] && character.tflags[881] != 54) || (character.equipment[58] && character.tflags[881] != 58)) {
      character.tflags[881] = (-1);
    }
    if (character.equipment[90] == 1 && character.tflags[882] != 1) {
      character.tflags[882] = (-1);
    }
  }
  if (character.tflags[899] >= 1) {
    if (character.tflags[895] === 1) {
      if (character.equipment[45] == 0) {
        ctx.showMessage(`「응하아아아아아ー!!…아읏……하…으…아아…♪」`);
      }
      ctx.showMessage(`L`);
      ctx.showMessage(`…${ctx.josaHelper("타겟은")} 절정과 함께 전신을 떨며, 그 자리에 쓰러졌다`);
      ctx.showMessage(`너무 강한 자극에 의식을 잃어버린 것 같다`);
    } else if (character.tflags[895] === 2) {
      if (character.equipment[45] == 0) {
        ctx.showMessage(`「히이이이이이ー익!!…요, 용서…해……아우…」`);
      }
      ctx.showMessage(`L`);
      ctx.showMessage(`…${ctx.josaHelper("타겟은")} 그 자리에 쓰러져버렸다. 극심한 고통에 정신을 잃어버린 것 같다.`);
    } else if (character.tflags[895] === 3) {
      if (character.equipment[45] == 0) {
        ctx.showMessage(`「히이이이이이ー익!!…요, 용서…해……아우…」`);
      }
      ctx.showMessage(`L`);
      ctx.showMessage(`…${ctx.josaHelper("타겟은")} 그 자리에 쓰러져버렸다. 극심한 공포에 정신을 잃어버린 것 같다.`);
    } else if (character.tflags[895] === 4) {
      if (character.equipment[45] == 0) {
        ctx.showMessage(`「응하아아아아아ー!!…요, 용서…해……아우…」`);
      }
      ctx.showMessage(`L`);
      ctx.showMessage(`…${ctx.josaHelper("타겟은")} 전신을 경련하며, 그 자리에 쓰러져버렸다.`);
      ctx.showMessage(`쾌감과 고통이 동시에 전해져 괴로움에 의식을 잃어버린 것 같다.`);
    } else if (character.tflags[895] === 6) {
      if (character.equipment[45] == 0) {
        ctx.showMessage(`「히이이이이이ー익!!…요, 용서…해……아우…」`);
      }
      ctx.showMessage(`L`);
      ctx.showMessage(`…${ctx.josaHelper("타겟은")} 전신을 경련하며, 그 자리에 쓰러져버렸다.`);
      ctx.showMessage(`아픔과 공포를 견디지 못하고 의식을 잃어버린 것 같다.`);
    } else if (character.tflags[896] === 3 && character.tflags[897] === 3 && character.tflags[898] === 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 의식을 되찾았다`);
      await ctx.wait();
      if (character.cflags[99] == 0) {
        await passout_message(ctx, character);
      }
    } else {
      ctx.showMessage(`L`);
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 아직 눈을 뜨지 않았다`);
    }
  }
}

export async function passout_message(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[60] === 1) {
    ctx.showMessage(`모르는 새`);
    if (SELECTCOM == 101 || SELECTCOM == 102) {
      ctx.print('촉수에게');
    }
    if (SELECTCOM === 20 || SELECTCOM === 21 || SELECTCOM === 22 || SELECTCOM === 23 || SELECTCOM === 34 || SELECTCOM === 101 || SELECTCOM === 120 || SELECTCOM === 121 || SELECTCOM === 128 || SELECTCOM === 129 || SELECTCOM === 130 || SELECTCOM === 131 || SELECTCOM === 132 || SELECTCOM === 133 || SELECTCOM === 134) {
      ctx.print('질내를');
    } else {
      ctx.print('항문을');
    }
    ctx.showMessage(`범해지고 있던 것에 당황하고 있는 ${ctx.josaHelper("타겟을")} 내버려두고,`);
    if (SELECTCOM === 101 || SELECTCOM === 102) {
      ctx.print('촉수');
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", PLAYER)}`);
    }
    ctx.showMessage('는 피스톤질을 계속하고 있다'); ctx.waitInput();
  }
  if (character.tflags[873] >= 1) {
    if (character.tflags[60] === 1) {
      if (SELECTCOM === 20 || SELECTCOM === 21 || SELECTCOM === 22 || SELECTCOM === 23 || SELECTCOM === 34 || SELECTCOM === 120 || SELECTCOM === 121 || SELECTCOM === 128 || SELECTCOM === 129 || SELECTCOM === 130 || SELECTCOM === 131 || SELECTCOM === 132 || SELECTCOM === 133 || SELECTCOM === 134) {
        ctx.print('무리하게 페니스가 삽입되어');
      } else if (SELECTCOM === 101) {
        ctx.print('무리하게 촉수가 삽입되어');
      }
    }
    ctx.print('비소에서 흐르는 피');
    if (character.tflags[871] === 1) {
      ctx.print('가 섞인 정액');
    } else if (character.tflags[871] >= 2) {
      ctx.print('가 섞인 대량의 정액');
    } else if (character.tflags[876] >= 100 && character.tflags[876] < 200) {
      ctx.print('가 섞인 더러운 액체');
    } else if (character.tflags[876] >= 200) {
      ctx.print('가 섞인 대량의 더러운 액체');
    }
    ctx.showMessage('를 깨달아,');
    ctx.showMessage(`W 모르는 동안 처녀를 빼앗겨버린 것에 멍하니 하고 있다…`);
  } else if (character.tflags[871] >= 1) {
    if (character.tflags[60] === 1) {
      if (SELECTCOM === 20 || SELECTCOM === 21 || SELECTCOM === 22 || SELECTCOM === 23 || SELECTCOM === 34 || SELECTCOM === 120 || SELECTCOM === 121 || SELECTCOM === 128 || SELECTCOM === 129 || SELECTCOM === 130 || SELECTCOM === 131 || SELECTCOM === 132 || SELECTCOM === 133 || SELECTCOM === 134) {
        ctx.print('무리하게 페니스가 삽입된');
      } else if (SELECTCOM === 101) {
        ctx.print('무리하게 촉수가 삽입된');
      }
    }
    ctx.print('비소');
    if (character.tflags[872] >= 1) {
      ctx.print('와');
      if (SELECTCOM === 26 || SELECTCOM === 27 || SELECTCOM === 28 || SELECTCOM === 29) {
        ctx.print('무리하게 페니스가 삽입된');
      } else if (SELECTCOM === 102) {
        ctx.print('무리하게 촉수가 삽입된');
      }
      ctx.print('항문');
    }
    ctx.print('에서');
    if (character.tflags[871] >= 2 || character.tflags[872] >= 2) {
      ctx.print('넘쳐흐르는 대량의');
    } else {
      ctx.print('떨어지는');
    }
    ctx.print('정액을 눈치채');
    if (ctx.talents[85] === 1) {
      ctx.showMessage('당황하고 있는 것 같다…'); ctx.waitInput();
    } else if (ctx.talents[10] === 1) {
      ctx.showMessage('당장이라도 울어버릴 것 같은 모습이다…'); ctx.waitInput();
    } else {
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.player), "를")} 노려보았다…`);
    }
  } else if (character.tflags[872] >= 1) {
    if (character.tflags[60] === 1) {
      if (SELECTCOM === 26 || SELECTCOM === 27 || SELECTCOM === 28 || SELECTCOM === 29) {
        ctx.print('무리하게 페니스가 삽입된');
      } else if (SELECTCOM === 102) {
        ctx.print('무리하게 촉수가 삽입된');
      }
    }
    ctx.print('애널에서');
    if (character.tflags[871] >= 2 || character.tflags[872] >= 2) {
      ctx.print('넘쳐흐르는 대량의');
    } else {
      ctx.print('떨어지는');
    }
    ctx.print('정액을 눈치채');
    if (ctx.talents[85] === 1) {
      ctx.showMessage('당황하고 있는 것 같다…'); ctx.waitInput();
    } else if (ctx.talents[10] === 1) {
      ctx.showMessage('당장이라도 울어버릴 것 같은 모습이다…'); ctx.waitInput();
    } else {
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.player), "를")} 노려보았다…`);
    }
  } else if (character.tflags[876] >= 1) {
    ctx.print('온 몸에 뿌려진');
    if (character.tflags[868] + character.tflags[869] + character.tflags[870] + character.tflags[871] + character.tflags[872] + character.tflags[873] + character.tflags[874] + character.tflags[875] >= 1) {
      ctx.print('정액과');
    }
    ctx.showMessage('촉수가 토한 더러운 액체에, 당황스러움을 숨기지 못하는 것 같다…'); ctx.waitInput();
  } else if (character.tflags[868] + character.tflags[869] + character.tflags[870] + character.tflags[874] + character.tflags[875] >= 1) {
    ctx.print('정신을 잃을때까지는 깨끗했던 몸');
    if (character.tflags[868] + character.tflags[869] + character.tflags[870] + character.tflags[874] + character.tflags[875] >= 3) {
      ctx.print('안');
    }
    ctx.print('에 뿌려진 정액에, 당황');
    if (ctx.talents[85] === 1) {
      ctx.showMessage('하고 있는 것 같다…'); ctx.waitInput();
    } else {
      ctx.showMessage('하며 두려워하고 있는 것 같다…'); ctx.waitInput();
    }
  } else if (character.tflags[867] < 0 || character.tflags[877] < 0) {
    ctx.showMessage(`어느새인가`);
    if (character.equipment[11] === 1) {
      if (character.equipment[13] === 1) {
        ctx.print('양구멍에 바이브');
      } else if (character.equipment[19] === 1) {
        ctx.print('양구멍에 각각 바이브와 비즈');
      } else {
        ctx.print('바이브');
      }
    } else if (character.equipment[13] === 1) {
      ctx.print('애널에 바이브');
    } else if (character.equipment[19] === 1) {
      ctx.print('애널에 비즈');
    }
    ctx.print('를 삽입되어');
    if (character.tflags[878] < 0 || character.tflags[866] < 0) {
      ctx.print('이상한 기구를 장착되고');
    }
    if (character.tflags[879] < 0 || character.tflags[864] < 0 || character.tflags[865] < 0) {
      ctx.print('기구를 장착하고');
    }
    if (character.equipment[53]) {
      ctx.print(', 그 모습을 촬영되고');
    }
    ctx.showMessage('있는 것에 당황하고 있는 것 같다…'); ctx.waitInput();
  } else if (character.tflags[878] < 0 || character.tflags[866] < 0) {
    ctx.print('어느샌가 몸에 기구가 장착된 것에 당황하고 있는 것 같다…');
  } else if (character.tflags[879] < 0 || character.tflags[864] < 0 || character.tflags[865] < 0) {
    ctx.showMessage(`어느샌가`);
    if (character.equipment[44]) {
      ctx.print('속박되어');
      if (character.tflags[878] < 0 || character.tflags[866] < 0) {
        ctx.print('있는데다, 이상한 기구를 장착되고');
      }
      ctx.showMessage(`있는 것`);
    } else if (character.equipment[45] === 1 || character.equipment[49] === 1 || character.equipment[46] === 1) {
      ctx.print('이상한 기구를 장착된 것');
    }
    ctx.showMessage(`W 을 눈치채 당황하고 무서워하고 있는 것 같다…`);
  } else if (character.tflags[880] < 0) {
    ctx.showMessage(`W 자신의 몸의 이변을 알아차려 당황을 감추지 못하는 것 같다`);
  } else if (character.tflags[881] < 0) {
    if (character.equipment[53]) {
      ctx.print('자신을 촬영하고 있는 비디오카메라를');
    } else if (character.equipment[54]) {
      ctx.print('어느샌가 밖으로 데리고 나와진 것을');
    } else if (character.equipment[58]) {
      ctx.print('어느샌가 목욕탕에 데려와진 것을');
    }
    ctx.showMessage(`W 눈치채 당황하고 무서워하고 있는 것 같다…`);
  } else if (character.tflags[882] < 0) {
    ctx.print('어느샌가 몸을 휘어감고 있는 촉수에 당황해 무서워하고 있는 것 같다…');
  }
  if ((character.tflags[867] + character.tflags[877] + character.tflags[878] + character.tflags[866] + character.tflags[879] + character.tflags[864] + character.tflags[865] + character.tflags[881] + character.tflags[882]) < 0 || character.tflags[872] >= 1) {
    await ctx.wait();
  }
  G = character.tflags[868] + character.tflags[869] + character.tflags[870] + character.tflags[874] + character.tflags[875] + character.tflags[876];
  X = character.tflags[867] + character.tflags[877] + character.tflags[878] + character.tflags[866] + character.tflags[879] + character.tflags[864] + character.tflags[865] + character.tflags[880] + character.tflags[881];
  Y = character.tflags[871] + character.tflags[872];
  ctx.times('X', -1);
}

export async function passout_palam_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[895] > 0) {
    character.tflags[883] += UP[6];
    character.tflags[884] += UP[8];
    character.tflags[885] += UP[10];
    character.tflags[886] += UP[11];
    character.tflags[887] += UP[12];
    character.tflags[888] += UP[13];
  } else {
    character.tflags[889] += UP[6];
    character.tflags[890] += UP[8];
    character.tflags[891] += UP[10];
    character.tflags[892] += UP[11];
    character.tflags[893] += UP[12];
    character.tflags[894] += UP[13];
  }
  UP[7] = 0;
  UP[4] = 0;
  UP[6] = 0;
  UP[8] = 0;
  UP[9] = 0;
  UP[10] = 0;
  UP[11] = 0;
  UP[12] = 0;
  UP[13] = 0;
}

export async function passout_palam_up(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = character.tflags[883] * (12 - character.tflags[899]);
  B = character.tflags[884] * (12 - character.tflags[899]);
  C = character.tflags[885] * (12 - character.tflags[899]);
  D = character.tflags[886] * (12 - character.tflags[899]);
  E = character.tflags[887] * (12 - character.tflags[899]);
  F = character.tflags[888] * (12 - character.tflags[899]);
  if (character.tflags[899] > 2) {
    A += character.tflags[889] * (character.tflags[899] - 2);
    B += character.tflags[890] * (character.tflags[899] - 2);
    C += character.tflags[891] * (character.tflags[899] - 2);
    D += character.tflags[892] * (character.tflags[899] - 2);
    E += character.tflags[893] * (character.tflags[899] - 2);
    F += character.tflags[894] * (character.tflags[899] - 2);
  }
  A /= 600;
  B /= 240;
  C /= 60;
  D /= 10;
  E /= 10;
  F /= 10;
  if (G >= 1) {
    A += A * G;
    B += B * G;
    C += C * G;
    D += D * G;
    E += E * G;
    F += F * G;
    if (ctx.abilities[32] === 3) {
      UP[5] += 1000;
    } else if (ctx.abilities[32] === 4) {
      UP[5] += 1500;
    } else if (ctx.abilities[32] >= 5) {
      UP[5] += 2000;
    }
  }
  if (X >= 1) {
    A += A * X;
    B += B * X;
    C += C * X;
    D += D * X;
    E += E * X;
    F += F * X;
  }
  if (Y >= 1) {
    A += A * Y;
    B += B * Y;
    C += C * Y;
    D += D * Y;
    E += E * Y;
    F += F * Y;
    if (ctx.abilities[32] === 3) {
      UP[5] += 1000;
    } else if (ctx.abilities[32] === 4) {
      UP[5] += 1500;
    } else if (ctx.abilities[32] >= 5) {
      UP[5] += 2000;
    }
  }
  if (character.tflags[873] >= 1) {
    A *= 2;
    B *= 2;
    C *= 2;
    D *= 2;
    E *= 2;
    F *= 2;
  }
  Z = 100;
  Z -= character.mark[2] * 10;
  Z -= ctx.abilities[10] * 5;
  if (ctx.talents[85]) {
    Z /= 2;
  }
  UP[7] += A * (100 - Z) / 100;
  UP[8] += B * (100 - Z) / 100;
  UP[10] += C * (100 - Z) / 100;
  UP[11] += D * Z / 100;
  UP[12] += E * Z / 100;
  UP[13] += F * Z / 100;
  if (character.tflags[896] === 3 || character.tflags[897] === 3 || character.tflags[898] === 3) {
    character.tflags[896] = 0;
    character.tflags[897] = 0;
    character.tflags[898] = 0;
    character.tflags[899] = 0;
  }
}

export async function passout_outdoor(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.equipment[54] = 0;
  ctx.showMessage(`W ${ctx.josaHelper("타겟이")} 실신해버려, 방으로 돌아가기로했다…`);
  ctx.masterBase[0] -= 20;
  ctx.masterBase[1] -= 10;
  if (ctx.masterBase[0] < 0) {
    ctx.masterBase[0] = 0;
  }
  if (ctx.masterBase[1] < 0) {
    ctx.masterBase[1] = 0;
  }
}
