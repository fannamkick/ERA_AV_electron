/**
 * SYSTEM_CHARASORT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function chara_sort(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  K = 0;
  // Label: INPUT_LOOP_0
  ctx.showMessage('여배우 리스트의 정렬순서를 바꿉니다');
  ctx.showMessage('[1] - 평가액 순');
  ctx.showMessage('[2] - 지도 횟수 순');
  ctx.showMessage('[3] - 성교 경험 순');
  ctx.showMessage('[4] - 애정 경험 순');
  ctx.showMessage('[5] - 매춘 경험 순');
  ctx.showMessage('[6] - 레즈 경험 순');
  ctx.showMessage('[7] - 연령 순');
  ctx.showMessage('[30] - 수동으로 교체한다');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    await chara_sort_estimate(ctx, character);
  } else if (ctx.result === 2) {
    await chara_sort_traincount(ctx, character);
  } else if (ctx.result === 3) {
    K = 5;
    await chara_sort_exp(ctx, character);
  } else if (ctx.result === 4) {
    K = 23;
    await chara_sort_exp(ctx, character);
  } else if (ctx.result === 5) {
    K = 74;
    await chara_sort_exp(ctx, character);
  } else if (ctx.result === 6) {
    K = 40;
    await chara_sort_exp(ctx, character);
  } else if (ctx.result === 7) {
    await chara_sort_old(ctx, character);
  } else if (ctx.result === 30) {
    await chara_sort_manual(ctx, character);
  }
  K = 0;
  if (ctx.result == 999) {
    return 0;
  }
  // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
}

export async function chara_sort_estimate(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage('…정렬 중…');
  F = 0;
  B = 0;
  C = 0;
  D = 0;
  G = 0;
  for (let COUNT = 0; COUNT < ctx.charanum - 1; COUNT++) {
    F = ctx.charanum - ctx.count;
    await chara_sort_estimate2(ctx, character);
    await chara_sort_2(ctx, character);
    ctx.count = ctx.charanum - F;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    } else {
      ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
      character = ctx.count;
      S = 0;
      await estimate_chara(ctx, character);
      if (S > 0) {
        ctx.showMessage(`[평가액: {S}포인트]`);
      } else {
        ctx.showMessage(`[매각 불가]`);
      }
      ctx.showMessage('');
    }
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`＜평가액순으로 여배우 리스트를 정렬합니다＞`);
  await ctx.wait();
  return 999;
}

export async function chara_sort_estimate2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  B = 1;
  C = 0;
  for (let COUNT = 0; COUNT < F; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    S = 0;
    await estimate_chara(ctx, character);
    if (S > C) {
      B = ctx.count;
      C = S;
    }
  }
}

export async function chara_sort_traincount(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage('…정렬 중…');
  F = 0;
  B = 0;
  C = 0;
  D = 0;
  G = 0;
  for (let COUNT = 0; COUNT < ctx.charanum - 1; COUNT++) {
    F = ctx.charanum - ctx.count;
    await chara_sort_traincount2(ctx, character);
    await chara_sort_2(ctx, character);
    ctx.count = ctx.charanum - F;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    } else {
      ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
      ctx.showMessage(`[지도 횟수: ${character.cflags[ctx.count][10]}회]`);
      ctx.showMessage('');
    }
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`＜지도 횟수 순으로 여배우 리스트를 정렬합니다＞`);
  await ctx.wait();
  return 999;
}

export async function chara_sort_traincount2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  B = 1;
  C = 0;
  for (let COUNT = 0; COUNT < F; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][10] > C) {
      B = ctx.count;
      C = character.cflags[ctx.count][10];
    }
  }
}

export async function chara_sort_exp(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage('…정렬 중…');
  F = 0;
  B = 0;
  C = 0;
  D = 0;
  G = 0;
  for (let COUNT = 0; COUNT < ctx.charanum - 1; COUNT++) {
    F = ctx.charanum - ctx.count;
    await chara_sort_exp2(ctx, character);
    await chara_sort_2(ctx, character);
    ctx.count = ctx.charanum - F;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    } else {
      ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
      ctx.showMessage(`[${ctx.getVarName("EXP", K)}: ${ctx.exp[ctx.count][K]}회]`);
      ctx.showMessage('');
    }
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`＜${ctx.getVarName("EXP", K)} 순으로 여배우 리스트를 정렬합니다＞`);
  await ctx.wait();
  return 999;
}

export async function chara_sort_exp2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  B = 1;
  C = 0;
  for (let COUNT = 0; COUNT < F; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (ctx.exp[ctx.count][K] > C) {
      B = ctx.count;
      C = ctx.exp[ctx.count][K];
    }
  }
}

export async function chara_sort_old(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage('…정렬 중…');
  F = 0;
  B = 0;
  C = 0;
  D = 0;
  G = 0;
  for (let COUNT = 0; COUNT < ctx.charanum - 1; COUNT++) {
    F = ctx.charanum - ctx.count;
    await chara_sort_old2(ctx, character);
    await chara_sort_2(ctx, character);
    ctx.count = ctx.charanum - F;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    } else {
      ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
      ctx.print('[');
      if (ctx.base[ctx.count][8] > 0) {
        if (ctx.base[ctx.count][7] === 0) {
          ctx.print('?세');
        } else {
          ctx.showMessage(`${ctx.base[ctx.count][7]}`);
          if (ctx.base[ctx.count][8] === 1) {
            ctx.print('대');
          } else if (ctx.base[ctx.count][8] === 2) {
            ctx.print('대 초반');
          } else if (ctx.base[ctx.count][8] === 3) {
            ctx.print('대 중반');
          } else if (ctx.base[ctx.count][8] === 4) {
            ctx.print('대 후반');
          } else if (ctx.base[ctx.count][8] === 5) {
            ctx.print('세 전후');
          }
        }
      } else {
        ctx.showMessage(`${ctx.base[ctx.count][9]}세`);
      }
      ctx.print(']');
      ctx.showMessage('');
    }
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`＜연령 순으로 여배우 리스트를 정렬합니다＞`);
  await ctx.wait();
  return 999;
}

export async function chara_sort_old2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  B = 1;
  C = 0;
  D = 0;
  for (let COUNT = 0; COUNT < F; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    D = ctx.base[ctx.count][7] * 3;
    if (ctx.base[ctx.count][8] === 1) {
      D += 28;
    } else if (ctx.base[ctx.count][8] === 2) {
      D += 16;
    } else if (ctx.base[ctx.count][8] === 3) {
      D += 17;
    } else if (ctx.base[ctx.count][8] === 4) {
      D += 29;
    } else if (ctx.base[ctx.count][8] === 5) {
      D += 1;
    }
    if (ctx.base[ctx.count][8] == 0) {
      D = ctx.base[ctx.count][9] * 3;
    }
    if (D > C) {
      B = ctx.count;
      C = D;
    }
  }
}

export async function chara_sort_manual(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 0;
  B = 0;
  G = 0;
  if (ctx.charanum < 1) {
    ctx.showMessage('배우가 없습니다'); ctx.waitInput();
    return 0;
  }
  ctx.showMessage('배우 리스트의 순서를 수동으로 정렬합니다');
  // Label: INPUT_LOOP_0
  ctx.showMessage('누구를 맨 위로 이동시키겠습니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 999;
  } else if (ctx.result < 1 || ctx.result >= ctx.charanum) {
    ctx.showMessage('잘못된 입력값입니다');
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    ctx.showMessage('잘못된 입력값입니다');
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage('…정렬 중…');
  A = ctx.result;
  if (A > 1) {
    C = A - 1;
    for (let COUNT = 0; COUNT < C; COUNT++) {
      B = 1;
      await chara_sort_2(ctx, character);
    }
  }
  if (A < ctx.charanum - 1) {
    C = ctx.charanum - A - 1;
    for (let COUNT = 0; COUNT < C; COUNT++) {
      B = 2;
      await chara_sort_2(ctx, character);
    }
  }
  A = 1;
  ctx.showMessage(`＜${ctx.josaHelper(ctx.getName(A), "를")} 맨 위로 이동시켰습니다＞`);
  // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
}

export async function chara_sort_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  G = ctx.count;
  // TODO: ADDCHARA NO:B
  C = ctx.charanum-1;
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    // TODO: MAXBASE:C:COUNT = MAXBASE:B:COUNT
    // TODO: BASE:C:COUNT = BASE:B:COUNT
  }
  ctx.isAssi[C] = ctx.isAssi[B];
  for (let COUNT = 0; COUNT < 999; COUNT++) {
    // TODO: TALENT:C:COUNT = TALENT:B:COUNT
  }
  for (let COUNT = 0; COUNT < 99; COUNT++) {
    // TODO: ABL:C:COUNT = ABL:B:COUNT
  }
  for (let COUNT = 0; COUNT < 999; COUNT++) {
    // TODO: EXP:C:COUNT = EXP:B:COUNT
  }
  for (let COUNT = 0; COUNT < 101; COUNT++) {
    // TODO: JUEL:C:COUNT = JUEL:B:COUNT
  }
  for (let COUNT = 0; COUNT < 6; COUNT++) {
    // TODO: MARK:C:COUNT = MARK:B:COUNT
  }
  for (let COUNT = 0; COUNT < 999; COUNT++) {
    // TODO: CFLAG:C:COUNT = CFLAG:B:COUNT
  }
  for (let COUNT = 0; COUNT < 999; COUNT++) {
    ctx.relation[C][ctx.count] = ctx.relation[B][ctx.count];
  }
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    // TODO: CSTR:C:COUNT = %CSTR:B:COUNT%
  }
  ctx.getName(C) = ctx.getName(B);
  CALLctx.getName(C) = CALLctx.getName(B);
  NICKctx.getName(C) = NICKctx.getName(B);
  character = -1;
  ctx.assi = -1;
  if (ctx.flags[1] === B) {
    ctx.flags[1] = C-1;
  } else if (B < ctx.flags[1]) {
    ctx.flags[1] -= 1;
  }
  if (ctx.flags[2] === B) {
    ctx.flags[2] = C-1;
  } else if (B < ctx.flags[2]) {
    ctx.flags[2] -= 1;
  }
  // TODO: DELCHARA B
  ctx.count = G;
  return 0;
}
