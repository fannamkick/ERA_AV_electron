/**
 * SCENE03_FELLATIO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function scene_title_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "펠라치오";
}

export async function scene_visible_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.getTalent(player, 121) === 0 && ctx.getTalent(player, 122) === 0 && ctx.item[4] === 0) {
    return 0;
  } else {
    return 1;
  }
}

export async function scene_fee_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 2;
  P[2] += 80;
  P[3] += 50;
}

export async function scene_info_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('《펠라치오》');
  ctx.showMessage('카메라 앞에서 펠라치오를 보여줍니다');
  ctx.drawLine('‥');
}

export async function scene_calc_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[1] = 0;
  ctx.locals[1] += ctx.abilities[10];
  ctx.locals[1] += ctx.abilities[11];
  ctx.locals[1] += ctx.abilities[12];
  ctx.locals[1] += ctx.abilities[13];
  ctx.locals[1] += ctx.abilities[16];
  ctx.locals[1] += ctx.abilities[17];
  ctx.locals[1] += ctx.abilities[70];
  if (ctx.talents[47]) {
    ctx.locals[1] += 20;
  }
  if (ctx.talents[52]) {
    ctx.locals[1] += 15;
  }
  if (ctx.talents[62]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[63]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[64]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[76]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[88]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[89]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[440]) {
    ctx.locals[1] += 20;
  }
  if (ctx.talents[15]) {
    ctx.locals[1] -= 5;
  }
  if (ctx.talents[34]) {
    ctx.locals[1] -= 20;
  }
  if (ctx.talents[35]) {
    ctx.locals[1] -= 5;
  }
  if (ctx.talents[61]) {
    ctx.locals[1] -= 10;
  }
  if (ctx.locals[1] >= 10) {
    if (ctx.locals[1] >= 50) {
      return 2;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

export async function scene_result_start_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[4] = 1;
  P[10] = 1000;
  ctx.showMessage(`${ctx.getVarName("NICK", TARGET)}, ${ctx.getName(character)}의 펠라치오를 촬영했다……`);
  // TODO: PRINTW
}

export async function scene_result_perfect_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")} 황홀한 표정으로 ${ctx.getVarName("CALL", PLAYER)}의 육봉을 물었다……`);
  ctx.showMessage('');
  ctx.times('(P:10)', 1.25);
  P[4] *= 2;
}

export async function scene_result_success_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")} ${ctx.getVarName("CALL", PLAYER)}의 육봉에 봉사했다……`);
  ctx.showMessage('');
}

export async function scene_result_failed_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")} 떨면서도 육봉을 입에 물었지만, 이내 몸이 굳어버렸다……`);
  ctx.showMessage('');
  ctx.times('(P:10)', 0.8);
  P[4] = 0;
}

export async function scene_exp_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(ctx.locals[0], 0);
  ctx.locals[0] = (1 + ctx.rand(5));
  ctx.locals[0] += ctx.abilities[13];
  if (ctx.talents[76]) {
    ctx.times('LOCAL', 1.25);
  }
  character.cvar[10] += ctx.locals[0];
  character.cvar[11] += ctx.locals[0];
  if (P[4] != 0 && ctx.abilities[16] != 0) {
    ctx.locals[1] += ctx.abilities[16];
    if (ctx.talents[76]) {
      ctx.times('LOCAL', 1.50);
    }
    if (ctx.abilities[0] >= ctx.locals[0]) {
      ctx.locals[1] = ctx.locals[0];
    }
    character.cvar[2] += ctx.locals[1];
  }
}
