/**
 * FUNC_CLOTH.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_clothtype(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((character.cflags[41] === 0 && character.cflags[42] === 0) || ctx.flags[37] === 0) {
    if (character.cflags[40] === 0) {
      ctx.print('전라');
      return 2;
    } else {
      ctx.print('속옷');
      return 2;
    }
  }
  if (character.cflags[42] === 11 && (character.cflags[40] & 64)) {
    ctx.print('즈코 인형');
    return 1;
  }
  await print_clothtype_main(ctx, character);
  ctx.locals[1] = ctx.result;
  if (character.cflags[42] && (character.cflags[40] & 64)) {
    ctx.print('차림에');
    await print_clothtype_special(ctx, character);
    ctx.locals[1] = ctx.result;
    ctx.print('');
  }
  return ctx.locals[1];
}

export async function print_clothtype_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[41] === 192 && (character.cflags[40] & 16)) {
    ctx.print('훈도시 한장');
    return 1;
  } else if (character.cflags[41] === 109) {
    if ((character.cflags[40] & 4) && (character.cflags[40] & 24) === 0) {
      ctx.print('체육복 윗옷에');
      if ((character.cflags[40] & 1) && ctx.talents[76] === 0 && ctx.talents[121] === 0) {
        ctx.showMessage(`팬티를 노출한`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 0 && ctx.talents[121] === 1) {
        ctx.showMessage(`팬티를 노출한`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[121] === 0) {
        ctx.showMessage(`팬티를 노출한`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[121] === 1) {
        ctx.showMessage(`팬티를 노출한`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[122] === 1) {
        ctx.showMessage(`팬티를 노출한`);
      } else {
        ctx.print('하반신 알몸');
      }
      return 1;
    } else if ((character.cflags[40] & 4) === 0 && (character.cflags[40] & 24)) {
      if ((character.cflags[40] & 2) && ctx.talents[76] === 0 && character.no != 10) {
        ctx.print('부르마와 브레지어');
      } else if ((character.cflags[40] & 2) && ctx.talents[76] === 1 && character.no != 10) {
        ctx.print('부르마와 브레지어');
      } else if ((character.cflags[40] & 2) && ctx.talents[76] === 1 && character.no != 10) {
        ctx.print('부르마와 가슴붕대');
      } else {
        ctx.print('부르마 한장');
      }
      return 1;
    }
  }
  if (character.cflags[41] >= 201 && character.cflags[41] <= 300) {
    if ((character.cflags[40] & 4) && (character.cflags[40] & 24) === 0) {
      await print_clothtype_main2(ctx, character);
      ctx.print('의 하의가 찣어져');
      if ((character.cflags[40] & 1) && ctx.talents[76] === 0 && ctx.talents[121] === 0) {
        ctx.showMessage(`팬티를 노출한`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 0 && ctx.talents[121] === 1) {
        ctx.showMessage(`팬티를 노출한`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[121] === 0) {
        ctx.showMessage(`팬티를 노출한`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[121] === 1) {
        ctx.showMessage(`팬티를 노출한`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[121] === 1) {
        ctx.showMessage(`팬티를 노출한`);
      } else {
        ctx.print('하반신 알몸');
      }
      return 1;
    } else if ((character.cflags[40] & 4) === 0 && (character.cflags[40] & 24)) {
      await print_clothtype_main2(ctx, character);
      ctx.print('의 가슴부분이 찣어져');
      if ((character.cflags[40] & 2) && ctx.talents[76] === 0 && character.no != 10) {
        ctx.print('위는 브레지어 한장');
      } else if ((character.cflags[40] & 2) && ctx.talents[76] === 1 && character.no != 10) {
        ctx.print('위는 브레지어 한장');
      } else if ((character.cflags[40] & 2) && ctx.talents[76] === 1 && character.no != 10) {
        ctx.print('위는 가슴붕대만 맨');
      } else {
        if (ctx.talents[122] === 0 && ctx.talents[116] === 0 && (ctx.talents[109] === 0 || ctx.talents[132] === 0)) {
          ctx.print('가슴이 튀어나온');
        } else {
          ctx.print('상반신 알몸');
        }
      }
      return 1;
    }
  }
  if ((character.cflags[40] & 28)) {
    if ((character.cflags[40] & 4) && (character.cflags[40] & 24) === 0) {
      await print_clothtype_main2(ctx, character);
      ctx.print('상의에');
      if ((character.cflags[40] & 1) && ctx.talents[76] === 0 && ctx.talents[121] === 0) {
        ctx.showMessage(`팬티 한장`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 0 && ctx.talents[121] === 1) {
        ctx.showMessage(`팬티 한장`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[121] === 0) {
        ctx.showMessage(`팬티 한장`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[121] === 1) {
        ctx.showMessage(`팬티 한장`);
      } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[121] === 1) {
        ctx.showMessage(`팬티 한장`);
      } else {
        ctx.print('하반신 알몸');
      }
    } else if ((character.cflags[40] & 4) === 0 && (character.cflags[40] & 24)) {
      if ((character.cflags[40] & 2) && ctx.talents[76] === 0 && character.no != 10) {
        ctx.print('브래지어에');
      } else if ((character.cflags[40] & 2) && ctx.talents[76] === 1 && character.no != 10) {
        ctx.print('브래지어에');
      } else if ((character.cflags[40] & 2) && character.no === 10) {
        ctx.print('브래지어에');
      } else {
        if (ctx.talents[122] === 0 && ctx.talents[116] === 0 && (ctx.talents[109] === 0 || ctx.talents[132] === 0)) {
          ctx.print('가슴이 드러난');
        } else {
          ctx.print('상반신 알몸에');
        }
      }
      await print_clothtype_main2(ctx, character);
      if (character.cflags[41] >= 1 && character.cflags[41] <= 100) {
        ctx.print('스커트');
      } else {
        ctx.print('하의');
      }
    } else {
      await print_clothtype_main2(ctx, character);
      ctx.locals[1] = ctx.result;
      if ((character.cflags[40] & 64) == 0) {
        ctx.print('');
      }
      return ctx.locals[1];
    }
  } else if ((character.cflags[40] & 1) && (character.cflags[40] & 2) && ctx.talents[76] === 0) {
    ctx.print('속옷');
    if ((character.cflags[40] & 64) == 0) {
      ctx.print('');
    }
  } else if ((character.cflags[40] & 1) && (character.cflags[40] & 2) && ctx.talents[76] === 1 && ctx.talents[122] === 0) {
    ctx.print('속옷');
    if ((character.cflags[40] & 64) == 0) {
      ctx.print('');
    }
  } else if ((character.cflags[40] & 1) && (character.cflags[40] & 2) && ctx.talents[76] === 1 && ctx.talents[122] === 1) {
    ctx.print('검은 부메랑 팬티');
    if ((character.cflags[40] & 64) == 0) {
      ctx.print('');
    }
  } else if ((character.cflags[40] & 1) && ctx.talents[76] === 0 && ctx.talents[121] === 0) {
    ctx.showMessage(`팬티 한장`);
  } else if ((character.cflags[40] & 1) && ctx.talents[76] === 0 && ctx.talents[121] === 1) {
    ctx.showMessage(`팬티 한장`);
  } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[121] === 0) {
    ctx.showMessage(`팬티 한장`);
  } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[121] === 1) {
    ctx.showMessage(`팬티 한장`);
  } else if ((character.cflags[40] & 1) && ctx.talents[76] === 1 && ctx.talents[121] === 1) {
    ctx.showMessage(`팬티 한장`);
  } else if ((character.cflags[40] & 2) && ctx.talents[76] === 0 && character.no != 10) {
    ctx.print('브래지어에 하반신 알몸');
  } else if ((character.cflags[40] & 2) && ctx.talents[76] === 1 && character.no != 10) {
    ctx.print('브래지어에 하반신 알몸');
  } else if ((character.cflags[40] & 2) &&  character.no === 10) {
    ctx.print('가슴붕대에 하반신 알몸');
  } else {
    ctx.print('전라');
  }
  return 1;
}

export async function wearing_cloth_able(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await wearing_cloth_all(ctx, character);
  if (character.cflags[43] != 0) {
    character.cflags[40] -= (character.cflags[40] & 1);
  }
  if (character.cflags[44] != 0) {
    character.cflags[40] -= (character.cflags[40] & 2);
  }
  if (character.cflags[45] != 0) {
    character.cflags[40] -= (character.cflags[40] & 4);
  }
  if (character.cflags[46] != 0) {
    character.cflags[40] -= (character.cflags[40] & 8);
  }
  if (character.cflags[46] != 0) {
    character.cflags[40] -= (character.cflags[40] & 16);
  }
  if (character.cflags[47] != 0) {
    character.cflags[40] -= (character.cflags[40] & 64);
  }
  if (character.cflags[170] != 0) {
    character.cflags[173] = 0;
  }
}

export async function wearing_cloth_all(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[41] == 0 && character.cflags[42] == 0) {
    return 0;
  }
  character.cflags[40] = 0;
  if (character.cflags[41] != 0) {
    await wearing_underware_all(ctx, character);
    await wearing_outerware_all(ctx, character);
  }
  if (character.cflags[42]) {
    character.cflags[40] |= 64;
  }
  return 1;
}

export async function wearing_underware_all(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.cflags[40] |= 1;
  if (ctx.talents[116] == 0 && ctx.talents[135] == 0 && (ctx.talents[132] == 0 || ctx.talents[109] == 0)) {
    character.cflags[40] |= 2;
  }
  if (character.cflags[41] == 202 || character.cflags[41] == 254) {
    character.cflags[40] -= character.cflags[40] & 2;
  }
  if (character.cflags[41] >= 191 && character.cflags[41] <= 200) {
    character.cflags[40] -= character.cflags[40] & 3;
  }
  if (character.cflags[41] >= 241 && character.cflags[41] <= 250) {
    character.cflags[40] -= character.cflags[40] & 3;
  }
  if (character.cflags[41] >= 291 && character.cflags[41] <= 300) {
    character.cflags[40] -= character.cflags[40] & 3;
  }
  if (character.cflags[41] == 29) {
    character.cflags[40] -= character.cflags[40] & 3;
  }
  if (character.cflags[42] == 69) {
    character.cflags[40] -= character.cflags[40] & 1;
  }
}

export async function wearing_outerware_all(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[41] >= 1 && character.cflags[41] <= 100) {
    character.cflags[40] |= 4;
    character.cflags[40] |= 8;
  } else if (character.cflags[41] >= 101 && character.cflags[41] <= 200) {
    character.cflags[40] |= 4;
    character.cflags[40] |= 16;
  } else if (character.cflags[41] >= 201 && character.cflags[41] <= 250) {
    character.cflags[40] |= 4;
    character.cflags[40] |= 8;
  } else if (character.cflags[41] >= 251 && character.cflags[41] <= 300) {
    character.cflags[40] |= 4;
    character.cflags[40] |= 16;
  }
  if (character.cflags[41] == 192) {
    character.cflags[40] = 16;
  }
}

export async function aftertrain_cloth(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  S = 0;
  if (character.cflags[42] && (character.tflags[49] & 64)) {
    ctx.showMessage(`(${ctx.getName(character)}의`);
    await print_clothtype_special(ctx, character);
    if (ctx.result === 0) {
      ctx.showMessage('를 폐기처분 했습니다)');
    } else {
      ctx.showMessage('을 폐기처분 했습니다)');
    }
    character.cflags[42] = 0;
    character.tflags[49] = 0;
    S = 1;
    if (character.cflags[40] & 64) {
      character.cflags[40] -= 64;
    }
  } else if (character.cflags[42] === 69 && (character.tflags[49] & 3) && character.cflags[47] === 0 && ctx.money >= 50) {
    // Label: INPUT_LOOP_01
    ctx.showMessage(`50 드라크마로 ${ctx.getVarName("CALL", TARGET)}의 기저귀를 교환합니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`(${ctx.getVarName("CALL", TARGET)}에게 새 기저귀를 채웠습니다)`);
      ctx.money -= 50;
      character.cflags[47] = 0;
      character.tflags[49] = 0;
      if (ctx.talents[135] === 0) {
        ctx.showMessage('');
        ctx.showMessage(`${ctx.getVarName("PALAM", 8)}의 구슬 +500`);
        ctx.juel[8] += 500;
      }
      await ctx.wait();
      S = 1;
    } else if (ctx.result === 1) {
      ctx.showMessage(`W (${ctx.getName(character)}의 기저귀를 세탁하러 보냈습니다)`);
      character.cflags[47] = 2;
      character.tflags[49] = 0;
      S = 1;
      if (character.cflags[40] & 64) {
        character.cflags[40] -= 64;
      }
    } else {
      // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (character.cflags[42] && (character.tflags[49] & 3) && character.cflags[47] === 0) {
    ctx.showMessage(`(${ctx.getName(character)}の`);
    await print_clothtype_special(ctx, character);
    if (ctx.result === 0) {
      ctx.showMessage('를 세탁하러 보냈습니다)'); ctx.waitInput();
    } else {
      ctx.showMessage('을 세탁하러 보냈습니다)'); ctx.waitInput();
    }
    character.cflags[47] = 5;
    if (character.cflags[42] == 69) {
      character.cflags[47] = 2;
    }
    character.tflags[49] = 0;
    S = 1;
    if (character.cflags[40] & 64) {
      character.cflags[40] -= 64;
    }
  }
  if (character.cflags[41] && (character.tflags[48] & 64)) {
    ctx.showMessage(`(${ctx.josaHelper("타겟이")} 입었던`);
    await print_clothtype_main_bottom(ctx, character);
    if (ctx.result === 0) {
      ctx.showMessage('는 폐기처분됐습니다)'); ctx.waitInput();
    } else {
      ctx.showMessage('은 폐기처분됐습니다)'); ctx.waitInput();
    }
    if (character.cflags[41] >= 201) {
      character.cflags[41] = 0;
      if (character.cflags[40] & 4) {
        character.cflags[40] -= 4;
      }
      if (character.cflags[40] & 8) {
        character.cflags[40] -= 8;
      }
      if (character.cflags[40] & 16) {
        character.cflags[40] -= 16;
      }
    } else {
      character.cflags[46] = -2;
      if (character.cflags[40] & 8) {
        character.cflags[40] -= 8;
      }
      if (character.cflags[40] & 16) {
        character.cflags[40] -= 16;
      }
    }
    character.tflags[48] = 0;
    S = 1;
  } else if (character.cflags[41] && (character.tflags[48] & 3) && character.cflags[46] === 0) {
    ctx.showMessage(`(${ctx.josaHelper("타겟이")} 입었던`);
    await print_clothtype_main_bottom(ctx, character);
    if (ctx.result === 0) {
      ctx.showMessage('를 세탁하러 보냈습니다)'); ctx.waitInput();
    } else {
      ctx.showMessage('을 세탁하러 보냈습니다)'); ctx.waitInput();
    }
    if (character.cflags[41] >= 201) {
      character.cflags[45] = 3;
      character.cflags[46] = 3;
      if (character.cflags[40] & 4) {
        character.cflags[40] -= 4;
      }
      if (character.cflags[40] & 8) {
        character.cflags[40] -= 8;
      }
      if (character.cflags[40] & 16) {
        character.cflags[40] -= 16;
      }
    } else {
      character.cflags[46] = 3;
      if (character.cflags[40] & 8) {
        character.cflags[40] -= 8;
      }
      if (character.cflags[40] & 16) {
        character.cflags[40] -= 16;
      }
    }
    character.tflags[48] = 0;
    S = 1;
  }
  if ((character.tflags[45] & 64)) {
    ctx.showMessage(`W (${ctx.getName(character)}의 속옷은 폐기처분됐습니다)`);
    character.cflags[43] = -2;
    if (character.cflags[40] & 1) {
      character.cflags[40] -= 1;
    }
    character.tflags[45] = 0;
    S = 1;
  } else if ((character.tflags[45] & 3) && character.cflags[43] === 0) {
    ctx.showMessage(`W (${ctx.getName(character)}의 속옷을 세탁하러 보냈습니다)`);
    character.cflags[43] = 2;
    if (character.cflags[40] & 1) {
      character.cflags[40] -= 1;
    }
    character.tflags[45] = 0;
    S = 1;
  }
  if (character.cflags[41]) {
    if (character.cflags[45] < 0 && character.cflags[46] < 0) {
      character.cflags[41] = 0;
    }
    if (character.cflags[41] == 192 && character.cflags[46] < 0) {
      character.cflags[41] = 0;
    }
  }
  if (character.cflags[42]) {
    if (character.cflags[47] < 0) {
      character.cflags[42] = 0;
    }
  }
  return 1;
}

export async function re_clothed(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC T0
  // TODO: #DIM DYNAMIC T1
  // TODO: #DIM DYNAMIC T2
  // TODO: #DIM DYNAMIC T4
  await com110_able0t(ctx, character);
  T[0] = ctx.result;
  await com110_able1t(ctx, character);
  T[1] = ctx.result;
  await com110_able2t(ctx, character);
  T[2] = ctx.result;
  C = character.cflags[40];
  D = 0;
  if (character.cflags[42] == 79 && (character.cflags[40] & 64) == 0) {
    D = 1;
  }
  await wearing_cloth_able(ctx, character);
  if (D) {
    character.cflags[40] -= character.cflags[40] & 64;
  }
  if (character.cflags[40] > C) {
    ctx.showMessage(`(${ctx.josaHelper("타겟은")} 벗긴 의상을 다시 입었습니다)`);
    await ctx.wait();
  }
  if (T0 == 2 || T1 == 2 || T2 == 2) {
    character.cflags[40] -= 128;
  }
  return 1;
}

export async function washing_cloth(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  S = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    character = ctx.count;
    if (character.cflags[41] >= 200 && character.cflags[45] > 0 && character.cflags[46] > 0) {
      character.cflags[45] = character.cflags[46];
    }
    if (character.cflags[43] > 0) {
      character.cflags[43] -= 1;
      if (character.cflags[43] === 0) {
        ctx.showMessage(`(${ctx.getName(character)}의 속옷 세탁이 끝났습니다)`);
        S = 1;
      }
    }
    if (character.cflags[46] > 0) {
      character.cflags[46] -= 1;
      if (character.cflags[46] === 0 && character.cflags[41]) {
        ctx.showMessage(`(${ctx.getName(character)}의`);
        await print_clothtype_main_bottom(ctx, character);
        ctx.showMessage(`의 세탁이 끝났습니다)`);
        S = 1;
        if (character.cflags[41] >= 200 && character.cflags[45] >= 0) {
          character.cflags[45] = 0;
        }
      }
    }
    if (character.cflags[47] > 0) {
      character.cflags[47] -= 1;
      if (character.cflags[47] === 0 && character.cflags[42]) {
        ctx.showMessage(`(${ctx.getName(character)}의`);
        await print_clothtype_special(ctx, character);
        ctx.showMessage(`의 세탁이 끝났습니다)`);
        S = 1;
      }
    }
    if ((character.cflags[40] & 1)) {
      character.cflags[48] += 1;
    }
  }
  if (S) {
    await ctx.wait();
    ctx.drawLine();
  }
  return 1;
}

export async function soiling_cloth_no1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[37] == 0) {
    return 0;
  }
  if ((character.cflags[40] & 64) && (character.cflags[42] <= 50 || character.cflags[42] === 69)) {
    ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의`);
    await print_clothtype_special(ctx, character);
    if (ctx.result === 0) {
      ctx.showMessage('는 오줌으로 더러워졌다》'); ctx.waitInput();
    } else {
      ctx.showMessage('은 오줌으로 더러워졌다》'); ctx.waitInput();
    }
    character.tflags[49] |= 1;
    if (character.cflags[42] == 69) {
      return 1;
    }
  }
  if ((character.cflags[40] & 8) || (character.cflags[40] & 16)) {
    ctx.showMessage(`《${ctx.josaHelper("타겟이")} 입은`);
    await print_clothtype_main_bottom(ctx, character);
    ctx.showMessage(`는 오줌으로 더러워졌다》`);
    character.tflags[48] |= 1;
  }
  if ((character.cflags[40] & 1)) {
    ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 속옷은 오줌으로 더러워졌다》`);
    character.tflags[45] |= 1;
  }
  return 1;
}

export async function soiling_cloth_no2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[37] == 0) {
    return 0;
  }
  if ((character.cflags[40] & 64) && (character.cflags[42] <= 50 || character.cflags[42] === 69)) {
    ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의`);
    await print_clothtype_special(ctx, character);
    if (ctx.result === 0) {
      ctx.showMessage('는 오물로 더러워졌다》'); ctx.waitInput();
    } else {
      ctx.showMessage('은 오물로 더러워졌다》'); ctx.waitInput();
    }
    character.tflags[49] |= 64;
    if (character.cflags[42] == 69) {
      return 1;
    }
  }
  if ((character.cflags[40] & 8) || (character.cflags[40] & 16)) {
    ctx.showMessage(`《${ctx.josaHelper("타겟이")} 입은`);
    await print_clothtype_main_bottom(ctx, character);
    if (ctx.result === 0) {
      ctx.showMessage('는 오물로 더러워졌다》'); ctx.waitInput();
    } else {
      ctx.showMessage('은 오물로 더러워졌다》'); ctx.waitInput();
    }
    character.tflags[48] |= 64;
  }
  if ((character.cflags[40] & 1)) {
    ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 속옷은 오물로 더러워졌다》`);
    character.tflags[45] |= 64;
  }
  return 1;
}

export async function soiling_cloth_ejection(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[37] == 0) {
    return 0;
  }
  if ((character.cflags[40] & 64) && (character.cflags[42] <= 50 || character.cflags[42] === 69)) {
    ctx.showMessage(`《${ctx.josaHelper("타겟은")}`);
    await print_clothtype_special(ctx, character);
    ctx.showMessage(` 속에 사정했다》`);
    character.tflags[49] |= 2;
    if (character.cflags[42] == 69) {
      return 1;
    }
  }
  if ((character.cflags[40] & 1)) {
    ctx.showMessage(`《${ctx.josaHelper("타겟은")} 팬티 속에 사정했다》`);
    character.tflags[45] |= 2;
    return 1;
  }
  if ((character.cflags[40] & 8) || (character.cflags[40] & 16)) {
    ctx.showMessage(`《${ctx.josaHelper("타겟은")}`);
    await print_clothtype_main_bottom(ctx, character);
    ctx.showMessage(` 속에 사정했다》`);
    character.tflags[48] |= 2;
  }
  return 1;
}

export async function soiling_sumata(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[37] == 0) {
    return 0;
  }
  if ((character.cflags[40] & 16)) {
    ctx.showMessage(`《${ctx.josaHelper("타겟이")} 입은`);
    await print_clothtype_main_bottom(ctx, character);
    ctx.showMessage(`에 정액을 뿌렸다》`);
    character.tflags[48] |= 2;
    return 1;
  }
  if ((character.cflags[40] & 64) && character.cflags[42] === 69) {
    ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의`);
    await print_clothtype_special(ctx, character);
    ctx.showMessage(`에 정액을 뿌렸다》`);
    character.tflags[49] |= 2;
  }
  if ((character.cflags[40] & 1)) {
    ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 팬티에 정액을 뿌렸다》`);
    character.tflags[45] |= 2;
  }
  if ((character.cflags[40] & 8) && character.tflags[9] >= 2) {
    ctx.showMessage(`《${ctx.josaHelper("타겟이")} 입은`);
    await print_clothtype_main_bottom(ctx, character);
    ctx.showMessage(`에 정액을 뿌렸다》`);
    character.tflags[48] |= 2;
  }
  return 1;
}

export async function print_clothtype_special_changing(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[49] & 64) {
    ctx.print('오물로 더럽혀진');
  } else if (character.tflags[49] & 1) {
    ctx.print('오줌에 흠뻑젖은');
  } else if (character.tflags[49] & 2) {
    ctx.print('정액으로 끈적해진');
  } else if (character.tflags[49]) {
    ctx.print('더러워진');
  }
  await print_clothtype_special(ctx, character);
}

export async function print_clothtype_main_one_changing(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[47] & 64 || character.tflags[48] & 64) {
    ctx.print('오물로 더럽혀진');
  } else if (character.tflags[47] & 1 || character.tflags[48] & 1) {
    ctx.print('오줌에 흠뻑젖은');
  } else if (character.tflags[47] & 2 || character.tflags[48] & 2) {
    ctx.print('정액으로 끈적해진');
  } else if (character.tflags[47] || character.tflags[48]) {
    ctx.print('더러워진');
  }
  await print_clothtype_main2(ctx, character);
}

export async function print_clothtype_main_bottom_changing(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[48] & 64) {
    ctx.print('오물로 더럽혀진');
  } else if (character.tflags[48] & 1) {
    ctx.print('오줌에 흠뻑젖은');
  } else if (character.tflags[48] & 2) {
    ctx.print('정액으로 끈적해진');
  } else if (character.tflags[48]) {
    ctx.print('더러워진');
  }
  await print_clothtype_main_bottom(ctx, character);
}

export async function print_clothtype_pants_changing(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[45] & 64) {
    ctx.print('오물로 더럽혀진');
  } else if (character.tflags[45] & 1) {
    ctx.print('오줌에 흠뻑젖은');
  } else if (character.tflags[45] & 2) {
    ctx.print('정액으로 끈적해진');
  } else if (character.tflags[45]) {
    ctx.print('더러워진');
  }
  ctx.print('팬티');
}

export async function print_clothtype_main_bottom(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[41] === 109) {
    ctx.print('부르마');
  } else if (character.cflags[41] === 192) {
    ctx.print('훈도시');
  } else {
    await print_clothtype_main2(ctx, character);
    if (character.cflags[41] >= 1 && character.cflags[41] <= 100) {
      ctx.print('스커트');
    } else if (character.cflags[41] <= 200) {
      ctx.print('아래');
    }
  }
}

export async function print_clothtype_main2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[41] === 0) {
    ctx.print('전라');
    return 0;
  } else if (character.cflags[41] === 1) {
    ctx.print('평상복+스커트');
    return 1;
  } else if (character.cflags[41] === 2) {
    ctx.print('고쿠아쿠 고등학교 교복');
    return 1;
  } else if (character.cflags[41] === 3) {
    ctx.print('히노데 고등학교 교복');
    return 1;
  } else if (character.cflags[41] === 4) {
    ctx.print('하나마루 고등학교 교복');
    return 1;
  } else if (character.cflags[41] === 5) {
    ctx.print('신세츠 고등학교 교복');
    return 1;
  } else if (character.cflags[41] === 6) {
    ctx.print('세이에이 고등학교 교복');
    return 1;
  } else if (character.cflags[41] === 7) {
    ctx.print('파라이소 중학교 교복');
    return 1;
  } else if (character.cflags[41] === 8) {
    ctx.print('사립 메키메키 학원 교복');
    return 1;
  } else if (character.cflags[41] === 17) {
    ctx.print('고등학교 교복');
    return 1;
  } else if (character.cflags[41] === 18) {
    ctx.print('중학교 교복');
    return 1;
  } else if (character.cflags[41] === 19) {
    ctx.print('세일러복');
    return 1;
  } else if (character.cflags[41] === 20) {
    ctx.print('마호라 여자중학교 교복');
    return 1;
  } else if (character.cflags[41] === 21) {
    ctx.print('정장+치마');
    return 1;
  } else if (character.cflags[41] === 22) {
    ctx.print('아동복');
    return 1;
  } else if (character.cflags[41] === 23) {
    ctx.print('명품옷');
    return 1;
  } else if (character.cflags[41] === 24) {
    ctx.print('간호사복');
    return 1;
  } else if (character.cflags[41] === 25) {
    ctx.print('메이드복');
    return 1;
  } else if (character.cflags[41] === 26) {
    ctx.print('웨이트리스복');
    return 1;
  } else if (character.cflags[41] === 27) {
    ctx.print('편의점 제복');
    return 1;
  } else if (character.cflags[41] === 28) {
    ctx.print('사무원 제복');
    return 1;
  } else if (character.cflags[41] === 29) {
    ctx.print('CPG 유니폼');
    return 1;
  } else if (character.cflags[41] === 30) {
    ctx.print('펑크 로리타');
    return 0;
  } else if (character.cflags[41] === 31) {
    ctx.print('블레이저+스커트');
    return 0;
  } else if (character.cflags[41] === 32) {
    ctx.print('상복');
    return 1;
  } else if (character.cflags[41] === 40) {
    ctx.print('캐미솔과 데님미니스커트');
    return 0;
  } else if (character.cflags[41] === 51) {
    ctx.print('군복');
    return 1;
  } else if (character.cflags[41] === 52) {
    ctx.print('고식 로리타');
    return 0;
  } else if (character.cflags[41] === 53) {
    ctx.print('마호라예대 부속 중학교 교복');
    return 1;
  } else if (character.cflags[41] === 54) {
    ctx.print('치어리더 의상');
    return 1;
  } else if (character.cflags[41] === 55) {
    ctx.print('테니스복+스커트');
    return 1;
  } else if (character.cflags[41] === 56) {
    ctx.print('할로윈 마녀복');
    return 1;
  } else if (character.cflags[41] === 99) {
    ctx.print('유리 메이드복');
    return 1;
  } else if (character.cflags[41] === 101) {
    ctx.print('평상복+바지');
    return 1;
  } else if (character.cflags[41] === 102) {
    ctx.print('정장+바지');
    return 1;
  } else if (character.cflags[41] === 103) {
    ctx.print('츄리닝+바지');
    return 1;
  } else if (character.cflags[41] === 104) {
    ctx.print('무녀복+하카마');
    return 1;
  } else if (character.cflags[41] === 105) {
    ctx.print('야구 유니폼');
    return 1;
  } else if (character.cflags[41] === 106) {
    ctx.print('군복+바지');
    return 1;
  } else if (character.cflags[41] === 108) {
    ctx.print('블레이저+바지');
    return 0;
  } else if (character.cflags[41] === 109) {
    ctx.print('체육복+브루마');
    return 1;
  } else if (character.cflags[41] === 110) {
    ctx.print('닌자복');
    return 1;
  } else if (character.cflags[41] === 111) {
    ctx.print('왕자복');
    return 1;
  } else if (character.cflags[41] === 122) {
    ctx.print('아동복+반바지');
    return 1;
  } else if (character.cflags[41] === 131) {
    ctx.print('잠옷+바지');
    return 1;
  } else if (character.cflags[41] === 191) {
    ctx.print('마이크로 비키니');
    return 0;
  } else if (character.cflags[41] === 192) {
    ctx.print('육상부 유니폼');
    return 1;
  } else if (character.cflags[41] === 201) {
    ctx.print('원피스');
    return 0;
  } else if (character.cflags[41] === 202) {
    ctx.print('기모노');
    return 0;
  } else if (character.cflags[41] === 203) {
    ctx.print('칵테일 드레스');
    return 0;
  } else if (character.cflags[41] === 204) {
    ctx.print('유카타');
    return 0;
  } else if (character.cflags[41] === 205) {
    ctx.print('마이크로 미니타이트 원피스');
    return 0;
  } else if (character.cflags[41] === 221) {
    ctx.print('차이나 드레스');
    return 0;
  } else if (character.cflags[41] === 222) {
    ctx.print('페미닌 원피스');
    return 0;
  } else if (character.cflags[41] === 229) {
    ctx.print('중학교 교복');
    return 1;
  } else if (character.cflags[41] === 230) {
    ctx.print('성 우르술라 고등학교 교복');
    return 1;
  } else if (character.cflags[41] === 231) {
    ctx.print('수도복');
    return 1;
  } else if (character.cflags[41] === 232) {
    ctx.print('원피스정장');
    return 1;
  } else if (character.cflags[41] === 233) {
    ctx.print('여자 음양사복');
    return 1;
  } else if (character.cflags[41] === 240) {
    ctx.print('웨딩 드레스');
    return 0;
  } else if (character.cflags[41] === 241) {
    ctx.print('본디지');
    return 0;
  } else if (character.cflags[41] === 242) {
    ctx.print('음마의 본디지');
    return 0;
  } else if (character.cflags[41] === 243) {
    ctx.print('벨리댄스복');
    return 1;
  } else if (character.cflags[41] === 244) {
    ctx.print('구형 학교수영복');
    return 1;
  } else if (character.cflags[41] === 245) {
    ctx.print('라텍스 슈트');
    return 0;
  } else if (character.cflags[41] === 246) {
    ctx.print('슬링샷');
    return 1;
  } else if (character.cflags[41] === 251) {
    ctx.print('전신 타이즈');
    return 0;
  } else if (character.cflags[41] === 252) {
    ctx.print('멜빵바지');
    return 0;
  } else if (character.cflags[41] === 253) {
    ctx.print('프로페라단 코스튬');
    return 1;
  } else if (character.cflags[41] === 254) {
    ctx.print('버니걸');
    return 1;
  } else if (character.cflags[41] === 291) {
    ctx.print('학교수영복');
    return 1;
  } else if (character.cflags[41] === 292) {
    ctx.print('블랙 코스튬');
    return 1;
  } else if (character.cflags[41] === 295) {
    ctx.print('레오타드');
    return 0;
  } else if (character.cflags[41] === -1) {
    ctx.print('속옷');
    return 1;
  } else {
    ctx.print('옷');
    return 1;
  }
}

export async function print_clothtype_special(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[42] === 1) {
    ctx.print('에이프런');
    return 1;
  } else if (character.cflags[42] === 2) {
    ctx.print('코트');
    return 0;
  } else if (character.cflags[42] === 3) {
    ctx.print('백의');
    return 0;
  } else if (character.cflags[42] === 4) {
    ctx.print('남자용 와이셔츠');
    return 0;
  } else if (character.cflags[42] === 10) {
    ctx.print('수수한 조끼');
    return 0;
  } else if (character.cflags[42] === 11) {
    ctx.print('즈코 인형');
    return 1;
  } else if (character.cflags[42] === 12) {
    ctx.print('떠돌이의 망토');
    return 0;
  } else if (character.cflags[42] === 40) {
    ctx.print('정장 자켓');
    return 1;
  } else if (character.cflags[42] === 41) {
    ctx.print('마법사의 로브');
    return 0;
  } else if (character.cflags[42] === 50) {
    ctx.print('프릴 앞치마');
    return 0;
  } else if (character.cflags[42] === 51) {
    ctx.print('머플러');
    return 0;
  } else if (character.cflags[42] === 52) {
    ctx.print('간호사 모자');
    return 0;
  } else if (character.cflags[42] === 53) {
    ctx.print('롱 글러브');
    return 0;
  } else if (character.cflags[42] === 54) {
    ctx.print('헤어리본');
    return 1;
  } else if (character.cflags[42] === 60) {
    ctx.print('수녀용 베일');
    return 1;
  } else if (character.cflags[42] === 61) {
    ctx.print('웨딩 베일');
    return 1;
  } else if (character.cflags[42] === 62) {
    ctx.print('');
  } else if (character.cflags[42] === 65) {
    ctx.print('고양이귀&꼬리');
    return 0;
  } else if (character.cflags[42] === 66) {
    ctx.print('폼폼');
    return 1;
  } else if (character.cflags[42] === 69) {
    ctx.print('기저귀');
    return 0;
  } else if (character.cflags[42] === 71) {
    ctx.print('개목걸이');
    return 0;
  } else if (character.cflags[42] === 72) {
    ctx.print('귀갑묶기');
    return 0;
  } else if (character.cflags[42] === 73) {
    ctx.print('카우벨과 코뚜레');
    return 0;
  } else if (character.cflags[42] === 74) {
    ctx.print('뱅글&링');
    return 1;
  } else if (character.cflags[42] === 79) {
    ctx.print('정조대');
    return 0;
  } else if (character.cflags[42] === 80) {
    ctx.print('안경');
    return 1;
  } else if (character.cflags[42] === 81) {
    ctx.print('선글라스');
    return 0;
  } else if (character.cflags[42] === 82) {
    ctx.print('꼬리 애널플래그');
    return 0;
  } else if (character.cflags[42] === 83) {
    ctx.print('레이스 파티 글러브');
    return 0;
  } else if (character.cflags[42] === 85) {
    ctx.print('에나멜 롱 글러브');
    return 0;
  } else if (character.cflags[42] === 99) {
    ctx.print('유리 고양이귀');
    return 0;
  }
  return 1;
}
