/**
 * SCENE02_MUSTERBATION.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function scene_title_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "자위";
}

export async function scene_visible_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function scene_fee_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 2;
  P[2] += 80;
  P[3] += 50;
}

export async function scene_info_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('《자위》');
  ctx.showMessage('카메라 앞에서 자위를 보여줍니다');
  ctx.drawLine('‥');
}

export async function scene_calc_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[1] = 0;
  ctx.locals[1] += ctx.abilities[0];
  ctx.locals[1] += ctx.abilities[10];
  ctx.locals[1] += ctx.abilities[11];
  ctx.locals[1] += ctx.abilities[17];
  ctx.locals[1] += ctx.abilities[31];
  ctx.locals[1] += ctx.abilities[70];
  if (ctx.talents[440]) {
    ctx.locals[1] += 20;
  }
  if (ctx.talents[89]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[74]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[88]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[76]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[36]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[60]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[17]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[34]) {
    ctx.locals[1] -= 20;
  }
  if (ctx.talents[203]) {
    ctx.locals[1] -= 10;
  }
  if (ctx.talents[35]) {
    ctx.locals[1] -= 5;
  }
  if (ctx.talents[15]) {
    ctx.locals[1] -= 5;
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

export async function scene_result_start_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[4] = 1;
  P[10] = 1000;
  ctx.showMessage(`${ctx.getVarName("NICK", TARGET)}, %타겟이(1)% 자위하는 모습을 촬영했다……`);
  // TODO: PRINTW
}

export async function scene_result_perfect_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")} 카메라를 의식하며, 비음섞인 달콤한 교성을 내뱉고`);
  ctx.showMessage(`전신을 경련하며 애액으로 질척질척한 성기를 만지고 있다……`);
  ctx.showMessage('');
  ctx.times('(P:10)', 1.25);
  P[4] *= 2;
}

export async function scene_result_success_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")} 카메라를 신경쓰면서,`);
  if (ctx.talents[35]) {
    ctx.showMessage(`새빨간 얼굴로`);
  }
  ctx.showMessage(`쾌락에 몸을 떨며 성기를 만지고 있다……`);
  ctx.showMessage('');
}

export async function scene_result_failed_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")}`);
  if (ctx.talents[35]) {
    ctx.showMessage(`새빨간 얼굴로`);
  }
  ctx.showMessage(`어색하게 성기를 만지고 있었지만, 이내 몸이 굳어버렸다……`);
  ctx.showMessage('');
  ctx.times('(P:10)', 0.8);
  P[4] = 0;
}

export async function scene_exp_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(ctx.locals[0], 0);
  ctx.locals[0] = (1 + ctx.rand(5));
  ctx.locals[0] += ctx.abilities[31];
  if (ctx.talents[74]) {
    ctx.times('LOCAL', 1.25);
  }
  character.cvar[10] += ctx.locals[0];
  character.cvar[11] += ctx.locals[0];
  if (P[4] != 0 && ctx.abilities[0] != 0) {
    ctx.locals[1] += ctx.abilities[0];
    if (ctx.talents[74]) {
      ctx.times('LOCAL', 1.50);
    }
    if (ctx.abilities[0] >= ctx.locals[0]) {
      ctx.locals[1] = ctx.locals[0];
    }
    character.cvar[2] += ctx.locals[1];
  }
}
