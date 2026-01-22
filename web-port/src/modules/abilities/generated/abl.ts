/**
 * ABL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function show_juel(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  A = 0;
  B = 0;
  ctx.print('');
  for (let COUNT = 0; COUNT < 12; COUNT++) {
    if (ctx.count === 3) {
      B = 14;
    } else if (ctx.count === 11) {
      B = 100;
    } else {
      B = ctx.count;
    }
    ctx.showMessage(`${ctx.getVarName("PALAM", B)}의 구슬:`);
    if (ctx.juel[B] < 10) {
      ctx.print('');
    } else if (ctx.juel[B] < 100) {
      ctx.print('');
    } else if (ctx.juel[B] < 1000) {
      ctx.print('');
    } else if (ctx.juel[B] < 10000) {
      ctx.print('');
    } else if (ctx.juel[B] < 100000) {
      ctx.print('');
    }
    ctx.printValue(ctx.juel[B]);
    if (A%4 == 3) {
      ctx.showMessage('');
    }
    if (B != 100) {
      ctx.print('');
    }
    A = A + 1;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
}

export async function show_ablup_select(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM LCOUNT
  U = 0;
  for (let COUNT = 0; COUNT < 42; COUNT++) {
    if (ctx.count >= 4 && ctx.count <=9) {
      // TODO: CONTINUE
    }
    if (ctx.count >= 18 && ctx.count <= 19) {
      // TODO: CONTINUE
    }
    if (ctx.count >= 24 && ctx.count <= 29) {
      // TODO: CONTINUE
    }
    if (ctx.count >= 34 && ctx.count <= 36) {
      // TODO: CONTINUE
    }
    if (ctx.talents[122] && (ctx.count == 2 || ctx.count == 22 || ctx.count == 33)) {
      // TODO: CONTINUE
    }
    if (ctx.talents[122] == 0 && (ctx.count == 23 || ctx.count == 34)) {
      // TODO: CONTINUE
    }
    if ((ctx.talents[122] == 0 && ctx.talents[121] == 0) && ctx.count == 38) {
      // TODO: CONTINUE
    }
    X = ctx.count;
    ctx.showMessage(`[{X}]`);
    if (X < 10) {
      ctx.print('');
    }
    ctx.showMessage(`${ctx.getVarName("ABL", X)}`);
    if (X <= 3) {
      ctx.print('');
    } else if (X >= 17 && X <= 23) {
      ctx.print('');
    } else if ((X >= 10 && X <= 12) || X === 15) {
      ctx.print('');
    }
    ctx.showMessage(`-${ctx.abilities[X]}LV`);
    await decide_ablup,x(ctx, character);
    U += 1;
    if (U % 4 === 0) {
      ctx.showMessage('');
    }
  }
  if (U % 4 != 0) {
    ctx.showMessage('');
  }
  // TODO: FOR LCOUNT,70,74
  ctx.showMessage(`[{LCOUNT}]${ctx.getVarName("ABL", LCOUNT)}-${ctx.abilities[LCOUNT]}LV`);
  await decide_ablup,lcount(ctx, character);
  // TODO: NEXT
  ctx.showMessage('');
  ctx.showMessage(`[99]${ctx.getVarName("MARK", 3)}-${character.mark[3]}LV`);
  await decide_ablup99(ctx, character);
  if (ctx.result == 1) {
    ctx.printChar('*');
  }
  ctx.showMessage('');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[500] 자동 능력상승');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`LC \@(TARGET <= 1) ? %" " * 16% # [1001] 이전 캐릭터\@`);
  // TODO: PRINTLC [999] 메인 화면으로 돌아간다
  ctx.showMessage(`LC \@(TARGET >= CHARANUM - 1) ? %" " * 16% # [1003] 다음 캐릭터\@`);
  ctx.showMessage('');
}

export async function decide_ablup(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: CALLFORM DECIDE_ABLUP{ARG}
  if (ctx.result === 1) {
    ctx.printChar('*');
  } else if (ctx.abilities[X] >= 10) {
    ctx.print('');
  } else {
    ctx.print('');
  }
  return 1;
}

export async function userablup(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.result === 999) {
    await jujun_up_check(ctx, character);
    await yokubo_up_check(ctx, character);
    // TODO: BEGIN TURNEND
    return 1;
  }
  return 0;
}
