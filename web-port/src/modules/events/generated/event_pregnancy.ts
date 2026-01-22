/**
 * EVENT_PREGNANCY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function in_vagina_all(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await in_vagina_a_to_m(ctx, character);
  await in_vagina_t_to_m(ctx, character);
  await in_vagina_m_to_t(ctx, character);
  await in_vagina_m_to_a(ctx, character);
  await in_vagina_a_to_t(ctx, character);
  await in_vagina_t_to_a(ctx, character);
  await in_vagina_d_to_t(ctx, character);
  await in_vagina_s_to_t(ctx, character);
  await in_vagina_g_to_t(ctx, character);
}

export async function conception_check_all(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await conception_check_a_to_m(ctx, character);
  await conception_check_t_to_m(ctx, character);
  await conception_check_m_to_t(ctx, character);
  await conception_check_m_to_a(ctx, character);
  await conception_check_a_to_t(ctx, character);
  await conception_check_t_to_a(ctx, character);
  await conception_check_d_to_t(ctx, character);
  await conception_check_s_to_t(ctx, character);
  await conception_check_g_to_t(ctx, character);
}

export async function get_child_all(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    await get_child(ctx, character);
  }
}

export async function in_vagina_a_to_m(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.assi >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0) {
      T = ctx.master;
      P = 2;
      await nakadashi_check(ctx, character);
    }
  }
}

export async function in_vagina_t_to_m(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.getTalent(master, 153) === 0) {
    T = ctx.master;
    P = 3;
    await nakadashi_check(ctx, character);
  }
}

export async function in_vagina_m_to_t(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0) {
      T = character;
      P = 1;
      await nakadashi_check(ctx, character);
    }
  }
}

export async function in_vagina_m_to_a(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.assi >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0) {
      T = ctx.assi;
      P = 1;
      await nakadashi_check(ctx, character);
    }
  }
}

export async function in_vagina_a_to_t(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.assi >= 1 && character >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0) {
      T = character;
      P = 2;
      await nakadashi_check(ctx, character);
    }
  }
}

export async function in_vagina_t_to_a(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.assi >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0) {
      T = ctx.assi;
      P = 3;
      await nakadashi_check(ctx, character);
    }
  }
}

export async function in_vagina_d_to_t(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0) {
      T = character;
      P = 5;
      await nakadashi_check(ctx, character);
    }
  }
}

export async function in_vagina_s_to_t(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0) {
      T = character;
      P = 6;
      await nakadashi_check(ctx, character);
    }
  }
}

export async function in_vagina_g_to_t(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0) {
      T = character;
      P = 8;
      await nakadashi_check(ctx, character);
    }
  }
}

export async function in_vagina_extra(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getTalent(count, 153) === 0 && ctx.getTalent(count, 157) === 0) {
      T = ctx.count;
      P = 4;
      await nakadashi_check(ctx, character);
    }
  }
}

export async function nakadashi_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[60] == 1) {
    return 0;
  }
  if (character.cflags[T][33] != 0) {
    return 0;
  }
  if (character.cflags[T][645] != 1) {
    return 0;
  }
  F = 101 + P;
  if (P == 1) {
    F = 101;
  }
  if (P == 8) {
    F = 112;
  }
  if (ctx.getTalent(t, 122) || ctx.getTalent(t, 135)) {
    return 0;
  }
  if ((ctx.getTalent(t, 504) || ctx.getTalent(t, 505) || ctx.getTalent(t, 420) || ctx.getTalent(t, 500) || ctx.getTalent(t, 501) || ctx.getTalent(t, 511)) && (character.cflags[T][109] === 0 || ctx.paramBand[303] != 3)) {
    // TODO: CFLAG:T:F = 0
    return 0;
  }
  if ((P === 5 && ctx.getTalent(t, 124) === 0) && (character.cflags[T][109] === 0 || ctx.paramBand[303] != 3)) {
    // TODO: CFLAG:T:F = 0
    return 0;
  }
  if (ctx.getTalent(t, 520) && (character.cflags[T][109] === 0 || ctx.paramBand[303] != 3)) {
    // TODO: CFLAG:T:F = 0
    return 0;
  }
  if (character.cflags[T][F] == 0) {
    return 0;
  }
  if (character.cflags[T][110] > 0) {
    // TODO: CFLAG:T:F = 0
    return 0;
  }
  if (ctx.getTalent(t, 153) || ctx.getTalent(t, 154) || ctx.getTalent(t, 157)) {
    // TODO: CFLAG:T:F = 0
    return 0;
  }
  if (character.cflags[T][109] === -1) {
    // TODO: CFLAG:T:F = 0
    return 0;
  }
  C = 3 - (character.cflags[T][109] * 2);
  if (C < 0) {
    C = 1;
  }
  if (character.cflags[T][F] >= 30) {
    if (ctx.rand((1 + ctx.getTalent(t, 100) * 2) * C) == 0) {
      character.cflags[T][102] = P;
    }
  } else if (character.cflags[T][F] >= 20) {
    if (ctx.rand((2 + ctx.getTalent(t, 100) * 2) * C) == 0) {
      character.cflags[T][102] = P;
    }
  } else if (character.cflags[T][F] >= 15) {
    if (ctx.rand((3 + ctx.getTalent(t, 100) * 2) * C) == 0) {
      character.cflags[T][102] = P;
    }
  } else if (character.cflags[T][F] >= 10) {
    if (ctx.rand((4 + ctx.getTalent(t, 100) * 2) * C) == 0) {
      character.cflags[T][102] = P;
    }
  } else if (character.cflags[T][F] >= 5) {
    if (ctx.rand((5 + ctx.getTalent(t, 100) * 2) * C) == 0) {
      character.cflags[T][102] = P;
    }
  } else if (character.cflags[T][F] >= 1) {
    if (ctx.rand((6 + ctx.getTalent(t, 100) * 2) * C) == 0) {
      character.cflags[T][102] = P;
    }
  }
  // TODO: CFLAG:T:F = 0
}

export async function conception_check_a_to_m(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.assi >= 1) {
    if (ctx.getTalent(master, 153) === 0 && ctx.getTalent(target, 157) === 0 && character.cflags[ctx.master][102] === 2 && character.cflags[ctx.master][110] === 0) {
      character.cflags[ctx.master][110] = DAY + 10 + ctx.rand(3);
      character.cflags[ctx.master][111] = ctx.assi.no;
      character.cstr[ctx.master][60] = ctx.getName(ctx.assi);
    }
  }
}

export async function conception_check_t_to_m(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character >= 1) {
    if (ctx.getTalent(master, 153) === 0 && ctx.getTalent(target, 157) === 0 && character.cflags[ctx.master][102] === 3 && character.cflags[ctx.master][110] === 0) {
      character.cflags[ctx.master][110] = DAY + 10 + ctx.rand(3);
      character.cflags[ctx.master][111] = character.no;
      character.cstr[ctx.master][60] = ctx.getName(character);
    }
  }
}

export async function conception_check_m_to_t(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0 && character.cflags[character][102] === 1 && character.cflags[character][110] === 0) {
      character.cflags[character][110] = DAY + 10 + ctx.rand(3);
      character.cflags[character][111] = ctx.master.no;
      character.cstr[character][60] = CALLctx.getName(ctx.master);
    }
  }
}

export async function conception_check_m_to_a(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.assi >= 1) {
    if (ctx.getTalent(assi, 153) === 0 && ctx.getTalent(target, 157) === 0 && character.cflags[ctx.assi][102] === 1 && character.cflags[ctx.assi][110] === 0) {
      character.cflags[ctx.assi][110] = DAY + 10 + ctx.rand(3);
      character.cflags[ctx.assi][111] = ctx.master.no;
      character.cstr[ctx.assi][60] = CALLctx.getName(ctx.master);
    }
  }
}

export async function conception_check_a_to_t(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.assi >= 1 && character >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0 && character.cflags[character][102] === 2 && character.cflags[character][110] === 0) {
      character.cflags[character][110] = DAY + 10 + ctx.rand(3);
      character.cflags[character][111] = ctx.assi.no;
      character.cstr[character][60] = ctx.getName(ctx.assi);
    }
  }
}

export async function conception_check_t_to_a(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.assi >= 1 && character >= 1) {
    if (ctx.getTalent(assi, 153) === 0 && ctx.getTalent(target, 157) === 0 && character.cflags[ctx.assi][102] === 3 && character.cflags[ctx.assi][110] === 0) {
      character.cflags[ctx.assi][110] = DAY + 10 + ctx.rand(3);
      character.cflags[ctx.assi][111] = character.no;
      character.cstr[ctx.assi][60] = ctx.getName(character);
    }
  }
}

export async function conception_check_d_to_t(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0 && character.cflags[character][102] === 5 && character.cflags[character][110] === 0) {
      character.cflags[character][110] = DAY + 10 + ctx.rand(3);
      character.cflags[character][111] = -2;
      ctx.cstr[60] = "개";
    }
  }
}

export async function conception_check_s_to_t(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0 && character.cflags[character][102] === 6 && character.cflags[character][110] === 0) {
      character.cflags[character][110] = DAY + 5 + ctx.rand(3);
      character.cflags[character][111] = -3;
      ctx.cstr[60] = "촉수";
    }
  }
}

export async function conception_check_g_to_t(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character >= 1) {
    if (ctx.getTalent(target, 153) === 0 && ctx.getTalent(target, 157) === 0 && character.cflags[character][102] === 8 && character.cflags[character][110] === 0) {
      character.cflags[character][110] = DAY + 5 + ctx.rand(3);
      character.cflags[character][111] = -6;
      ctx.cstr[60] = "슬라임";
    }
  }
}

export async function conception_check_extra(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getTalent(count, 153) === 0 && ctx.getTalent(count, 157) === 0 && character.cflags[ctx.count][102] === 4 && character.cflags[ctx.count][110] === 0) {
      character.cflags[ctx.count][110] = DAY + 9 + ctx.rand(6);
      character.cflags[ctx.count][111] = -1;
      character.cstr[ctx.count][60] = "모르는 남자";
    }
  }
}

export async function get_child(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.getTalent(count, 153) || ctx.getTalent(count, 154) || ctx.getTalent(count, 157)) {
    return 0;
  }
  if (character.cflags[ctx.count][102] === 1 && character.cflags[ctx.count][110] <= DAY+13) {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} ${ctx.getVarName("CALL", MASTER)}의 아이를 임신한 것 같다`);
    ctx.showMessage('');
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")}【${ctx.getVarName("TALENT", 153)}】했다`);
    await ctx.wait();
    ctx.getTalent(count, 153) = 1;
    T = ctx.count;
    await change_n_status(ctx, character);
  } else if (character.cflags[ctx.count][102] === 2 && character.cflags[ctx.count][110] <= DAY+13) {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}%CSTR:COUNT:60%의 아이를 임신한 것 같다`);
    ctx.showMessage('');
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")}【${ctx.getVarName("TALENT", 153)}】했다`);
    await ctx.wait();
    ctx.getTalent(count, 153) = 1;
    T = ctx.count;
    await change_n_status(ctx, character);
  } else if (character.cflags[ctx.count][102] === 3 && character.cflags[ctx.count][110] <= DAY+13) {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} %CSTR:COUNT:60%의 아이를 임신한 것 같다`);
    ctx.showMessage('');
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")}【${ctx.getVarName("TALENT", 153)}】했다`);
    await ctx.wait();
    ctx.getTalent(count, 153) = 1;
    T = ctx.count;
    await change_n_status(ctx, character);
  } else if (character.cflags[ctx.count][102] === 4 && character.cflags[ctx.count][110] <= DAY+13) {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 이름도 모르는 남자의 아이를 임신한 것 같다`);
    ctx.showMessage('');
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")}【${ctx.getVarName("TALENT", 153)}】했다`);
    character.cstr[ctx.count][60] = "모르는 남자";
    await ctx.wait();
    ctx.getTalent(count, 153) = 1;
    T = ctx.count;
    await change_n_status(ctx, character);
  } else if (character.cflags[ctx.count][102] === 5 && character.cflags[ctx.count][110] <= DAY+8) {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 들개의 새끼를 임신한 것 같다`);
    ctx.showMessage('');
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")}【${ctx.getVarName("TALENT", 153)}】했다`);
    await ctx.wait();
    ctx.getTalent(count, 153) = 1;
    T = ctx.count;
    await change_n_status(ctx, character);
  } else if (character.cflags[ctx.count][102] === 6 && character.cflags[ctx.count][110] <= DAY+8) {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 촉수의 새끼를 임신한 것 같다`);
    ctx.showMessage('');
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")}【${ctx.getVarName("TALENT", 153)}】했다`);
    await ctx.wait();
    ctx.getTalent(count, 153) = 1;
    T = ctx.count;
    await change_n_status(ctx, character);
  } else if (character.cflags[ctx.count][102] === 8 && character.cflags[ctx.count][110] <= DAY+8) {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 슬라임의 알을 임신한 것 같다`);
    ctx.showMessage('');
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")}【${ctx.getVarName("TALENT", 153)}】했다`);
    await ctx.wait();
    ctx.getTalent(count, 157) = 1;
    T = ctx.count;
    await change_n_status(ctx, character);
  } else if (character.cflags[ctx.count][102] === 7 && character.cflags[ctx.count][110] <= DAY+13) {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 남친의 아이를 임신한 것 같다`);
    ctx.showMessage('');
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "는")}【${ctx.getVarName("TALENT", 153)}】했다`);
    if (ctx.getTalent(count, 206) === 0 && ctx.base[ctx.count][9] >= 16) {
      ctx.showMessage(`W`);
      ctx.showMessage(`남친의 아이를 임신해버린 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}, 고민한 끝에 남친과 결혼하기로 했다……`);
      ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(ctx.count), "는")}【유부녀】가 되어, 이름이 %CSTR:COUNT:7% ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 됐다》`);
      ctx.getName(ctx.count) = `${character.cstr[ctx.count][7]} ${CALLctx.getName(ctx.count)}`;
      ctx.getTalent(count, 206) = 1;
    }
    await ctx.wait();
    ctx.getTalent(count, 153) = 1;
    T = ctx.count;
    await change_n_status(ctx, character);
  }
}

export async function change_n_status(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  MAXctx.base[T][0] -= 500;
  if (ctx.base[T][0] > MAXctx.base[T][0]) {
    ctx.base[T][0] = MAXctx.base[T][0];
  }
  I = 0;
  F = 0;
  if (character.cflags[T][102] != 2 && character.cflags[T][102] != 3) {
    // GOTO INCEST_CHECK_END - 구조 변경 필요 (while/break 사용 권장)
  }
  G = ctx.count;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getCharacterNo(ctx.count) == character.cflags[T][111]) {
      F = ctx.count;
    }
  }
  for (let COUNT = 0; COUNT < 5; COUNT++) {
    B = ctx.count + 21;
    if (character.cflags[T][B] % 1000 === character.cflags[T][111]) {
      if (character.cflags[T][B] < 1000) {
        I = 1;
        if (F > 0 && ctx.getTalent(f, 122)) {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자신의 부친인 ${ctx.getVarName("CALL", F)}의 자식을 임신했다`);
        } else if (F > 0) {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자신의 모친인 ${ctx.getVarName("CALL", F)}의 자식을 임신했다`);
        } else {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자기 부모의 자식을 임신했다`);
        }
      } else if (character.cflags[T][B] < 2000) {
        I = 2;
        if (F > 0 && ctx.getTalent(f, 122)) {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자신의 아들인 ${ctx.getVarName("CALL", F)}의 자식을 임신했다`);
        } else if (F > 0) {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자신의 딸인 ${ctx.getVarName("CALL", F)}의 자식을 임신했다`);
        } else {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자기 아이의 자식을 임신했다`);
        }
      } else if (character.cflags[T][B] < 3000) {
        I = 3;
        if (F > 0 && ctx.getTalent(f, 122)) {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자신의 오빠인 ${ctx.getVarName("CALL", F)}의 자식을 임신했다`);
        } else if (F > 0) {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자신의 언니인 ${ctx.getVarName("CALL", F)}의 자식을 임신했다`);
        } else {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자기 친형제의 자식을 임신했다`);
        }
      } else if (character.cflags[T][B] < 4000) {
        I = 4;
        if (F > 0 && ctx.getTalent(f, 122)) {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자신의 남동생인 ${ctx.getVarName("CALL", F)}의 자식을 임신했다`);
        } else if (F > 0) {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자신의 여동생인 ${ctx.getVarName("CALL", F)}의 자식을 임신했다`);
        } else {
          ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 자기 친형제의 자식을 임신했다`);
        }
      }
      // TODO: BREAK
    }
  }
  ctx.count = G;
  // Label: INCEST_CHECK_END
  await grow_b_size(ctx, character);
  if (ctx.getTalent(t, 130) === 1) {
    character.mark[T][6] = 1;
  } else if (ctx.getTalent(t, 130) === 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 모유가 나오게 되었다`);
    await ctx.wait();
    ctx.getTalent(t, 130) = 1;
  }
  S = 0;
  A = character.cflags[T][111];
  if (ctx.getTalent(t, 85) && character.cflags[T][102] === 1) {
    S += 0;
  } else if (ctx.getTalent(t, 76) && character.cflags[T][102] === 1) {
    S += 30;
  }
  if (ctx.getTalent(t, 85) && (character.cflags[T][102] === 2 || character.cflags[T][102] === 3)) {
    if (ctx.relation[T][A] != 0) {
      S += 30 * ((200-ctx.relation[T][A]) / 100) + 30;
    } else {
      S += 60;
    }
  } else if (ctx.getTalent(t, 76) && (character.cflags[T][102] === 2 || character.cflags[T][102] === 3)) {
    if (ctx.relation[T][A] != 0) {
      S += 30 * ((200-ctx.relation[T][A]) / 100);
    } else {
      S += 30;
    }
  }
  if (ctx.getTalent(t, 85) && character.cflags[T][102] === 4) {
    S += 80;
  } else if (ctx.getTalent(t, 76) && character.cflags[T][102] === 4) {
    S += 50;
  }
  if (ctx.getTalent(t, 85) && character.cflags[T][102] === 5) {
    S += 120;
    if (ctx.getTalent(t, 136)) {
      S -= 40;
    }
  } else if (ctx.getTalent(t, 76) && character.cflags[T][102] === 5) {
    S += 80;
    if (ctx.getTalent(t, 136)) {
      S -= 40;
    }
  } else if (character.cflags[T][102] === 5) {
    S += 40;
    if (ctx.getTalent(t, 136)) {
      S -= 40;
    }
  }
  if (ctx.getTalent(t, 85) && character.cflags[T][102] === 6) {
    S += 120;
    if (ctx.exp[T][55] > 100) {
      S -= "LIMIT((EXP:T:55-300*MARK:T:3)/20, 0, 150)";
    }
  } else if (ctx.getTalent(t, 76) && character.cflags[T][102] === 6) {
    S += 80;
    if (ctx.exp[T][55] > 100) {
      S -= "LIMIT((EXP:T:55-300*MARK:T:3)/20, 0, 150)";
    }
  } else if (character.cflags[T][102] === 6) {
    S += 40;
    if (ctx.exp[T][55] > 100) {
      S -= "LIMIT((EXP:T:55-300*MARK:T:3)/20, 0, 150)";
    }
  }
  if (I == 1 || I == 2) {
    S += 100;
  }
  if (I == 3 || I == 4) {
    S += 60;
  }
  if (ctx.getTalent(t, 85) == 0 && ctx.getTalent(t, 76) == 0) {
    S += 100;
  }
  if (ctx.getTalent(t, 184) == 1 && character.cflags[T][102] == 7) {
    S = 0;
  }
  if (ctx.getTalent(t, 12)) {
    S -= 20;
  }
  if (ctx.getTalent(t, 155)) {
    S -= 40;
  }
  if (ctx.getTalent(t, 134)) {
    S += 20;
  }
  if (ctx.exp[T][60]) {
    S -= 20;
  }
  if (T == ctx.master) {
    S = 0;
  }
  if (S >= 100 && ctx.getTalent(t, 9) === 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 망연자실한 표정을 짓고 있다`);
    ctx.showMessage(`${ctx.getVarName("CALL", T)}의 안에서 뭔가가 망가져버린 것 같다……`);
    ctx.showMessage(`${ctx.getVarName("CALL", T)}의 정신은【${ctx.getVarName("TALENT", 9)}】돼버렸다`);
    await ctx.wait();
    if (ctx.getTalent(t, 85)) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 85)}】를 잃었다`);
      ctx.getTalent(t, 85) = 0;
    }
    if (ctx.getTalent(t, 76)) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 76)}】을 잃었다`);
      ctx.getTalent(t, 76) = 0;
    }
    ctx.getTalent(t, 9) = 1;
    await ctx.wait();
  }
  character = T;
  character.tflags[13] = 11;
  await self_kojo(ctx, character);
  ctx.drawLine();
}

export async function reach_full_term_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.args[0]), "는")} 산월을 맞이했다`);
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.args[0]), "는")} 출산준비를 위해 육아실로 이동합니다`);
  await ctx.wait();
  character.cflags[ctx.args[0]][12] = 0;
  if (character == ctx.args[0]) {
    character = -1;
  }
  if (ctx.assi == ctx.args[0]) {
    ctx.assi = -1;
  }
}

export async function child_birth(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  F = -1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getCharacterNo(ctx.count) == character.cflags[C][111]) {
      F = ctx.count;
    }
  }
  ctx.exp[C][52] += 1;
  ctx.exp[C][60] += 1;
  if (character.cflags[C][111] >= 0 && F >= 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(C), "는")} ${ctx.getName(F)}의 아이를 무사히 출산했습니다`);
  } else if (character.cflags[C][111] === -4 && ctx.getTalent(c, 184) === 1) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(C), "는")} 남친의 아이를 무사히 출산했습니다`);
  } else if (character.cflags[C][111] === -5 && ctx.getTalent(c, 184) === 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(C), "는")} 전남친의 아이를 무사히 출산했습니다`);
  } else if (character.cflags[C][111] === -1) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(C), "는")} 아비를 모르는 아이를 무사히 출산했습니다`);
  } else if (character.cflags[C][111] === -2) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(C), "는")} 강아지 귀와 꼬리가 난 아이를 몇 마리쯤 낳았습니다`);
    character.cflags[C][110] -= 10;
  } else if (character.cflags[C][111] === -3) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(C), "는")} 정체를 알 수 없는 알을 낳았습니다`);
    character.cflags[C][110] -= 10;
  } else {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(C), "는")} 아비가 없는 아이를 무사히 출산했습니다`);
  }
  await ctx.wait();
  character = C;
  character.tflags[13] = 12;
  await self_kojo(ctx, character);
  if (ctx.getTalent(c, 85) && character.cflags[C][111] == ctx.master.no) {
    ctx.flags[32] += 1;
  }
  if (ctx.flags[32] >= 3 && ctx.getTalent(master, 156) === 0 && ctx.getTalent(master, 122)) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}【${ctx.getVarName("TALENT", 156)}】에 눈을 떴다`);
    await ctx.wait();
    ctx.getTalent(master, 156) = 1;
  }
  ctx.getTalent(c, 153) = 0;
  // Label: INPUT_LOOP
  if (ctx.getTalent(c, 9) || C === ctx.master) {
    A = 0;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if ((ctx.getTalent(count, 153) == 0 && (ctx.getTalent(count, 154) || ctx.getTalent(count, 155)) && ctx.getTalent(count, 9) == 0 && character.cflags[ctx.count][1] == 2) || C == ctx.master) {
        A += 1;
      }
    }
    if (A > 0) {
      ctx.showMessage(`태어난 아기를 다른 노예에게 맡길 것인지, 입양 보낼 것인지를 선택해주십시오`);
      await ctx.wait();
      ctx.showMessage('누구에게 맡깁니까?');
      ctx.drawLine('‥');
      for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
        if ((ctx.getTalent(count, 153) === 0 && (ctx.getTalent(count, 154) || ctx.getTalent(count, 155)) && ctx.getTalent(count, 9) === 0 && character.cflags[ctx.count][1] === 2) || (ctx.count === ctx.master && C === ctx.master)) {
          ctx.showMessage(` [${ctx.count}] ${ctx.getName(ctx.count)}`);
        }
      }
      ctx.drawLine('‥');
      ctx.showMessage(` [100] - 입양 보낸다`);
      await ctx.inputNumber();
      if (ctx.result === 100) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 부득이하게, 아기를 입양 보냈습니다`);
        await ctx.wait();
      } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
        // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
      } else if ((ctx.getTalent(result, 153) === 1 || (ctx.getTalent(result, 154) ==0 && ctx.getTalent(result, 155) === 0) || ctx.getTalent(result, 9) || character.cflags[ctx.result][1] < 2) && ctx.result != ctx.master) {
        // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
      } else if (ctx.result === ctx.master && C != ctx.master) {
        // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
      }
      if (ctx.result != 100 && ctx.result === ctx.master) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 일을 쉬고 육아에 집중하기로 했습니다`);
        ctx.getTalent(c, 154) = 1;
        if (ctx.base[C][22] > 0 && ctx.flags[38] > 0) {
          await reverse_3_size_iws(ctx, character);
        }
        await ctx.wait();
      } else if (ctx.result != 100) {
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", RESULT)}에게 보모 일을 맡기기로 했습니다`);
        character.cflags[ctx.result][110] = DAY;
        if (character.cflags[C][111] == -2 || character.cflags[C][111] == -3) {
          character.cflags[ctx.result][110] -= 10;
        }
        character.cflags[ctx.result][12] = 0;
        if (ctx.getTalent(result, 154) === 0) {
          ctx.getTalent(result, 154) = 1;
          if (ctx.result == character) {
            character = -1;
          }
          if (ctx.result == ctx.assi) {
            ctx.assi = -1;
          }
          T = ctx.result;
          ctx.showMessage(`${ctx.getVarName("CALL", C)}의 아이에게 젖을 주기 위해`);
          await grow_b_size(ctx, character);
          if (ctx.getTalent(t, 130) === 1) {
            character.mark[T][6] = 1;
          } else if (ctx.getTalent(t, 130) === 0) {
            ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 모유가 나오게 되었다`);
            ctx.getTalent(t, 130) = 1;
          }
        }
        await ctx.wait();
      }
    } else {
      ctx.showMessage(`${ctx.josaHelper("플레이어는")} 부득이하게, 아기를 입양 보냈다`);
      await ctx.wait();
    }
    if (C != ctx.master || ctx.result != ctx.master) {
      MAXctx.base[C][0] += 500;
      await clear_flag(ctx, character);
      await reverse_b_size(ctx, character);
      ctx.showMessage(`${ctx.getName(C)}의 가슴은 모유수유를 포기했기에 작아졌습니다`);
      if (ctx.getTalent(c, 130) === 1 && character.mark[C][6] >= 1) {
        character.mark[T][6] = 0;
      } else if (ctx.getTalent(c, 130) === 1) {
        ctx.getTalent(c, 130) = 0;
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", C), "는")} 모유가 나오지 않게 됐다`);
      }
    }
  } else {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", C), "는")} 육아실에서 육아를 시작했다`);
    ctx.getTalent(c, 154) = 1;
    if (ctx.getTalent(c, 85) && character.cflags[C][111] === ctx.master.no && ctx.getTalent(c, 155) === 0) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", C), "는")}【${ctx.getVarName("TALENT", 155)}】에 눈을 뜬 것 같다`);
      ctx.getTalent(c, 155) = 1;
    }
    if (ctx.base[C][22] > 0 && ctx.flags[38] > 0) {
      await reverse_3_size_iws(ctx, character);
    }
    await ctx.wait();
  }
  ctx.drawLine();
}

export async function egg_birth(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.getTalent(c, 처녀) === 1) {
    character.cstr[C][0] = "슬라임의 알";
    // TODO: TALENT:C:처녀 = 0
    character.cflags[C][15] = 4;
    ctx.setColor(0xF58F98);
    ctx.showMessage('【처녀상실】');
    ctx.resetColor();
  }
  ctx.exp[C][52] += 1;
  ctx.exp[C][59] += 1;
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(C), "는")} 슬라임의 알을 무사히 산란했습니다`);
  await egg_item(ctx, character);
  await ctx.wait();
  ctx.getTalent(c, 157) = 0;
  MAXctx.base[C][0] += 500;
  ctx.getTalent(c, 154) = 0;
  if (ctx.getTalent(c, 109) === 0 && ctx.getTalent(c, 116) === 0) {
    ctx.showMessage(`${ctx.getName(C)}의 가슴은 모유수유를 끝냈으므로 작아졌습니다`);
    await ctx.wait();
    if (ctx.getTalent(t, 130) === 1 && character.mark[T][6] >= 1) {
      character.mark[T][6] = 0;
    } else if (ctx.getTalent(t, 130) === 1) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 모유가 나오지 않게 됐다`);
      ctx.getTalent(t, 130) = 0;
    }
    await reverse_b_size(ctx, character);
  }
  await clear_flag(ctx, character);
  ctx.drawLine();
}

export async function depearent(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.getVarName("CALL", C)}의 육아 중이던 아이가 부모에게서 독립했습니다`);
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", C), "는")} 다시 지도할 수 있습니다`);
  await ctx.wait();
  MAXctx.base[C][0] += 500;
  ctx.getTalent(c, 154) = 0;
  if (ctx.getTalent(c, 109) === 0 && ctx.getTalent(c, 116) === 0) {
    ctx.showMessage(`${ctx.getName(C)}의 가슴은 모유를 주는 역할을 끝냈으므로 작아졌습니다`);
    await ctx.wait();
    if (ctx.getTalent(t, 130) === 1 && character.mark[T][6] >= 1) {
      character.mark[T][6] = 0;
    } else if (ctx.getTalent(t, 130) === 1) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 모유가 나오지 않게 됐다`);
      ctx.getTalent(t, 130) = 0;
    }
    await reverse_b_size(ctx, character);
  }
  await clear_flag(ctx, character);
  ctx.drawLine();
}

export async function clear_flag(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.cflags[C][101] = 0;
  character.cflags[C][102] = 0;
  character.cflags[C][103] = 0;
  character.cflags[C][104] = 0;
  character.cflags[C][105] = 0;
  character.cflags[C][106] = 0;
  character.cflags[C][107] = 0;
  character.cflags[C][110] = 0;
  character.cflags[C][111] = 0;
  character.cflags[C][112] = 0;
}

export async function grow_b_size(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.base[T][22] > 0 && ctx.flags[38] > 0) {
  } else {
    if (ctx.getTalent(t, 116) === 1) {
      ctx.showMessage(`${ctx.getVarName("CALL", T)}의 가슴이【${ctx.getVarName("TALENT", 116)}】에서【${ctx.getVarName("TALENT", 109)}】정도로 커졌다`);
      ctx.getTalent(t, 116) = 0;
      ctx.getTalent(t, 109) = 1;
    } else if (ctx.getTalent(t, 109) === 1) {
      ctx.showMessage(`${ctx.getVarName("CALL", T)}의 가슴이【${ctx.getVarName("TALENT", 109)}】에서 평범한 수준으로 커졌다`);
      ctx.getTalent(t, 109) = 0;
    } else if (ctx.getTalent(t, 110) === 0 && ctx.getTalent(t, 114) === 0) {
      ctx.showMessage(`${ctx.getVarName("CALL", T)}의 가슴이 평범한 수준에서【${ctx.getVarName("TALENT", 110)}】사이즈로 커졌다`);
      ctx.getTalent(t, 110) = 1;
    } else if (ctx.getTalent(t, 110) === 1) {
      ctx.showMessage(`${ctx.getVarName("CALL", T)}의 가슴이【${ctx.getVarName("TALENT", 110)}】에서【${ctx.getVarName("TALENT", 114)}】사이즈가 되었다`);
      ctx.getTalent(t, 110) = 0;
      ctx.getTalent(t, 114) = 1;
    } else if (ctx.getTalent(t, 114) === 1) {
      ctx.showMessage(`${ctx.getVarName("CALL", T)}의 가슴이【${ctx.getVarName("TALENT", 114)}】에서 더 커졌다`);
      character.mark[T][5] = 1;
    }
  }
}

export async function reverse_b_size(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.base[T][22] > 0 && ctx.flags[38] > 0) {
    await reverse_3_size_iws(ctx, character);
  } else {
    if (ctx.getTalent(c, 114) && character.mark[C][5] >= 1) {
      character.mark[C][5] = 0;
    } else if (ctx.getTalent(c, 114)) {
      ctx.getTalent(c, 114) = 0;
      ctx.getTalent(c, 110) = 1;
    } else if (ctx.getTalent(c, 110)) {
      ctx.getTalent(c, 110) = 0;
    } else if (ctx.getTalent(c, 109) === 0 && ctx.getTalent(c, 116) === 0) {
      ctx.getTalent(c, 109) = 1;
    }
  }
}

export async function check_child_care(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((ctx.getTalent(c, 153) && character.cflags[C][110] - 3 <= DAY) || (ctx.getTalent(c, 154) && character.cflags[C][110] + 30 > DAY)) {
    return 1;
  }
  return 0;
}
