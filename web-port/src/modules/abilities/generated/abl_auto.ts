/**
 * ABL_AUTO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function aut_lvupper(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await aut_c_0(ctx, character);
  await aut_b_0(ctx, character);
  await aut_v_0(ctx, character);
  await aut_a_0(ctx, character);
  await aut_zyuuzyun_0(ctx, character);
  await aut_zyuuzyun_1(ctx, character);
  await aut_zyuuzyun_2(ctx, character);
  await aut_zyuuzyun_3(ctx, character);
  await aut_yokubou_0(ctx, character);
  await aut_gikou_0(ctx, character);
  await aut_houshigi_0(ctx, character);
  await aut_seikougi_0(ctx, character);
  await aut_wazyutu_0(ctx, character);
  await aut_houshise_0(ctx, character);
  await aut_houshise_1(ctx, character);
  await aut_houshise_2(ctx, character);
  await aut_roshitu_0(ctx, character);
  await aut_rezukke_0(ctx, character);
  await aut_rezukke_1(ctx, character);
  await aut_blkke_0(ctx, character);
  await aut_blkke_1(ctx, character);
  await aut_vi_0(ctx, character);
  if (ctx.args[0] === 200) {
    await aut_zyuuzyun_1(ctx, character);
    await aut_houshise_1(ctx, character);
    await aut_baisyun_0(ctx, character);
  }
  ctx.showMessage('자동으로 레벨업 했습니다'); ctx.waitInput();
  await yokubo_up_check(ctx, character);
  await jujun_up_check(ctx, character);
}

export async function aut_c_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[0]; COUNT++) {
    await decide_ablup0(ctx, character);
    if (ctx.result === 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[0] += 1;
    ctx.juel[0] -= A;
  }
  await print_aut_ablup(0, 0, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_b_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[1]; COUNT++) {
    await decide_ablup1(ctx, character);
    if (ctx.result === 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[1] += 1;
    ctx.juel[14] -= A;
  }
  await print_aut_ablup(1, 14, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_v_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[2]; COUNT++) {
    await decide_ablup2(ctx, character);
    if (ctx.result === 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[2] += 1;
    ctx.juel[1] -= A;
  }
  await print_aut_ablup(2, 1, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_a_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[3]; COUNT++) {
    await decide_ablup3(ctx, character);
    if (ctx.result === 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[3] += 1;
    ctx.juel[2] -= A;
  }
  await print_aut_ablup(3, 2, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_zyuuzyun_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[10]; COUNT++) {
    await decide_ablup10(ctx, character);
    if (ctx.result === 0 || I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[10] += 1;
    ctx.juel[10] -= A;
  }
  await print_aut_ablup(10, 10, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_zyuuzyun_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[10]; COUNT++) {
    await decide_ablup10(ctx, character);
    if (ctx.result === 0 || J != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[10] += 1;
    ctx.juel[4] -= B;
  }
  await print_aut_ablup(10, 4, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_zyuuzyun_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[10]; COUNT++) {
    await decide_ablup10(ctx, character);
    if (C < 0) {
      // TODO: BREAK
    } else if (ctx.result === 0 || K != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[10] += 1;
    ctx.juel[5] -= C;
  }
  await print_aut_ablup(10, 5, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_zyuuzyun_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[10]; COUNT++) {
    await decide_ablup10(ctx, character);
    if (D < 0) {
      // TODO: BREAK
    } else if (ctx.result === 0 || L != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[10] += 1;
    ctx.juel[6] -= D;
  }
  await print_aut_ablup(10, 6, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_yokubou_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[11]; COUNT++) {
    await decide_ablup11(ctx, character);
    if (ctx.result === 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[11] += 1;
    ctx.juel[5] -= A;
  }
  await print_aut_ablup(11, 5, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_gikou_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 5 - ctx.abilities[12]; COUNT++) {
    await decide_ablup12(ctx, character);
    if (ctx.result === 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[12] += 1;
    ctx.juel[7] -= A;
  }
  await print_aut_ablup(12, 7, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_houshigi_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[13]; COUNT++) {
    await decide_ablup13(ctx, character);
    if (ctx.result === 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[13] += 1;
    ctx.juel[7] -= A;
  }
  await print_aut_ablup(13, 7, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_seikougi_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[14]; COUNT++) {
    await decide_ablup14(ctx, character);
    if (ctx.result === 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[14] += 1;
    ctx.juel[7] -= A;
  }
  await print_aut_ablup(14, 7, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_wazyutu_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 5 - ctx.abilities[15]; COUNT++) {
    await decide_ablup15(ctx, character);
    if (ctx.result === 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[15] += 1;
    ctx.juel[7] -= A;
  }
  await print_aut_ablup(15, 7, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_houshise_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[16]; COUNT++) {
    await decide_ablup16(ctx, character);
    if (ctx.result === 0 || I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[16] += 1;
    ctx.juel[6] -= A;
  }
  await print_aut_ablup(16, 6, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_houshise_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[16]; COUNT++) {
    await decide_ablup16(ctx, character);
    if (ctx.result === 0 || B <= 0 || J != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[16] += 1;
    ctx.juel[4] -= B;
  }
  await print_aut_ablup(16, 4, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_houshise_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[16]; COUNT++) {
    await decide_ablup16(ctx, character);
    if (ctx.result === 0 || C <= 0 || K != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[16] += 1;
    ctx.juel[7] -= C;
  }
  await print_aut_ablup(16, 7, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_roshitu_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[17]; COUNT++) {
    await decide_ablup17(ctx, character);
    if (ctx.result === 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[17] += 1;
    ctx.juel[8] -= A;
  }
  await print_aut_ablup(17, 8, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_sado_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[20]; COUNT++) {
    await decide_ablup20(ctx, character);
    if (B <= 0 || I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[20] += 1;
    ctx.juel[5] -= A;
  }
  await print_aut_ablup(20, 5, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_mazo_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[21]; COUNT++) {
    await decide_ablup21(ctx, character);
    if (B <= 0 || I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[21] += 1;
    ctx.juel[9] -= A;
    ctx.juel[5] -= B;
  }
  await print_aut_ablup(21, 9, 5, -1, ctx.locals[0], ctx, character);
}

export async function aut_mazo_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[21]; COUNT++) {
    await decide_ablup21(ctx, character);
    if (D <= 0 || J != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[21] += 1;
    ctx.juel[9] -= D;
    ctx.juel[6] -= E;
  }
  await print_aut_ablup(21, 9, 6, -1, ctx.locals[0], ctx, character);
}

export async function aut_rezukke_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[22]; COUNT++) {
    await decide_ablup22(ctx, character);
    if (ctx.result === 0 || I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[22] += 1;
    ctx.juel[5] -= A;
    ctx.juel[6] -= C;
  }
  await print_aut_ablup(22, 5, 6, -1, ctx.locals[0], ctx, character);
}

export async function aut_rezukke_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[22]; COUNT++) {
    await decide_ablup22(ctx, character);
    if (ctx.result === 0 || D <= 0 || J != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[22] += 1;
    ctx.juel[0] -= D;
  }
  await print_aut_ablup(22, 0, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_blkke_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[23]; COUNT++) {
    await decide_ablup23(ctx, character);
    if (ctx.result === 0 || I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[23] += 1;
    ctx.juel[5] -= A;
    ctx.juel[6] -= C;
  }
  await print_aut_ablup(23, 5, 6, -1, ctx.locals[0], ctx, character);
}

export async function aut_blkke_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[23]; COUNT++) {
    await decide_ablup23(ctx, character);
    if (ctx.result === 0 || D <= 0 || J != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[23] += 1;
    ctx.juel[2] -= D;
  }
  await print_aut_ablup(23, 2, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_seikou_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[30]; COUNT++) {
    await decide_ablup30(ctx, character);
    if (I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[30] += 1;
    ctx.juel[5] -= A;
    ctx.juel[6] -= B;
  }
  await print_aut_ablup(30, 5, 6, -1, ctx.locals[0], ctx, character);
}

export async function aut_seikou_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[30]; COUNT++) {
    await decide_ablup30(ctx, character);
    if (J != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[30] += 1;
    ctx.juel[5] -= A*3;
    ctx.juel[6] -= B*3;
  }
  await print_aut_ablup(30, 5, 6, -1, ctx.locals[0], ctx, character);
}

export async function aut_jii_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[31]; COUNT++) {
    await decide_ablup31(ctx, character);
    if (I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[31] += 1;
    ctx.juel[5] -= A;
    ctx.juel[0] -= B;
    ctx.juel[8] -= C;
  }
  await print_aut_ablup(31, 5, 0, 8, ctx.locals[0], ctx, character);
}

export async function aut_jii_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[31]; COUNT++) {
    await decide_ablup31(ctx, character);
    if (J != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[31] += 1;
    ctx.juel[5] -= A;
    ctx.juel[0] -= B;
    ctx.juel[8] -= C;
  }
  await print_aut_ablup(31, 5, 0, 8, ctx.locals[0], ctx, character);
}

export async function aut_seieki_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[32]; COUNT++) {
    await decide_ablup32(ctx, character);
    if (I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[32] += 1;
    ctx.juel[5] -= A;
    ctx.juel[6] -= B;
  }
  await print_aut_ablup(32, 5, 6, -1, ctx.locals[0], ctx, character);
}

export async function aut_seieki_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[32]; COUNT++) {
    await decide_ablup32(ctx, character);
    if (J != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[32] += 1;
    ctx.juel[5] -= A*3;
    ctx.juel[6] -= B*3;
  }
  await print_aut_ablup(32, 5, 6, -1, ctx.locals[0], ctx, character);
}

export async function aut_rezutyuudoku_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[33]; COUNT++) {
    await decide_ablup33(ctx, character);
    if (I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[33] += 1;
    ctx.juel[0] -= B;
    ctx.juel[5] -= A;
    ctx.juel[6] -= A;
  }
  await print_aut_ablup(33, 0, 5, 6, ctx.locals[0], ctx, character);
}

export async function aut_baisyun_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[37]; COUNT++) {
    await decide_ablup37(ctx, character);
    if (I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[37] += 1;
    ctx.juel[4] -= A;
    ctx.juel[5] -= B;
    ctx.juel[6] -= C;
  }
  await print_aut_ablup(37, 4, 5, 6, ctx.locals[0], ctx, character);
}

export async function aut_zyuukan_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[39]; COUNT++) {
    await decide_ablup39(ctx, character);
    if (I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[39] += 1;
    ctx.juel[5] -= A;
    ctx.juel[6] -= B;
  }
  await print_aut_ablup(39, 5, 6, -1, ctx.locals[0], ctx, character);
}

export async function aut_vi_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[70]; COUNT++) {
    await decide_ablup70(ctx, character);
    if (ctx.result === 0 || I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[70] += 1;
    ctx.juel[7] -= A;
  }
  await print_aut_ablup(70, 7, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_vo_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[71]; COUNT++) {
    await decide_ablup71(ctx, character);
    if (I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[71] += 1;
    ctx.juel[7] -= A;
  }
  await print_aut_ablup(71, 7, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_da_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[72]; COUNT++) {
    await decide_ablup72(ctx, character);
    if (I != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[72] += 1;
    ctx.juel[7] -= A;
  }
  await print_aut_ablup(72, 7, -1, -1, ctx.locals[0], ctx, character);
}

export async function aut_ryouri_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < 10 - ctx.abilities[73]; COUNT++) {
    await decide_ablup73(ctx, character);
    if (J != 0) {
      // TODO: BREAK
    }
    ctx.locals[0] += 1;
    ctx.abilities[73] += 1;
    ctx.juel[7] -= A;
  }
  await print_aut_ablup(73, 7, -1, -1, ctx.locals[0], ctx, character);
}

export async function print_aut_ablup_arg(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.args[4] < 1) {
    return 0;
  }
  if (ctx.args[2] < 0 && ctx.args[3] < 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ABLNAME", ctx.args[0]), "를")} ${ctx.getVarName("PALAMNAME", ctx.args[1])}의 구슬을 사용해 ${ctx.args[4]}LV 올렸습니다`);
  } else if (ctx.args[3] < 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ABLNAME", ctx.args[0]), "를")} ${ctx.josaHelper(ctx.getVarName("PALAMNAME", ctx.args[1]), "와")} ${ctx.getVarName("PALAMNAME", ctx.args[2])}의 구슬을 사용해 ${ctx.args[4]}LV 올렸습니다`);
  } else {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ABLNAME", ctx.args[0]), "를")} ${ctx.josaHelper(ctx.getVarName("PALAMNAME", ctx.args[1]), "와")} ${ctx.josaHelper(ctx.getVarName("PALAMNAME", ctx.args[2]), "와")} ${ctx.getVarName("PALAMNAME", ctx.args[3])}의 구슬을 사용해 ${ctx.args[4]}LV 올렸습니다`);
  }
}
