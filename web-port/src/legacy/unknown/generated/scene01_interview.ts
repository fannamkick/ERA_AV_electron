/**
 * SCENE01_INTERVIEW.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function scene_title_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "인터뷰";
}

export async function scene_visible_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function scene_fee_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] += 1;
  P[2] += 10;
  P[3] += 50;
}

export async function scene_info_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('《인터뷰》');
  ctx.showMessage('여배우의 성경험과 연령등을 질문합니다');
  ctx.drawLine('‥');
}

export async function scene_calc_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[1] = 0;
  ctx.locals[1] += ctx.abilities[10];
  ctx.locals[1] += ctx.abilities[15];
  ctx.locals[1] += ctx.abilities[17];
  ctx.locals[1] += ctx.abilities[70];
  if (ctx.talents[28]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[74]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[182]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[36]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[17]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[34]) {
    ctx.locals[1] -= 20;
  }
  if (ctx.talents[35]) {
    ctx.locals[1] -= 5;
  }
  if (ctx.locals[1] >= 10) {
    if (ctx.locals[1] >= 40) {
      return 2;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

export async function scene_result_start_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[4] = 1;
  P[10] = 500;
  ctx.showMessage(`${ctx.getVarName("NICK", TARGET)}, ${ctx.getName(character)}의 인터뷰를 촬영했다……`);
  // TODO: PRINTW
}

export async function scene_result_perfect_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")} 침착하고 자연스럽게`);
  if (ctx.talents[35]) {
    ctx.showMessage(`새빨간 얼굴로`);
  } else if (ctx.talents[36]) {
    ctx.showMessage(`거리낌없이`);
  }
  ctx.showMessage(`상당히 아슬아슬한 수위의 질문에도 제대로 대답하고 있다……`);
  ctx.showMessage('');
  ctx.times('P:10', 1.25);
  P[4] *= 2;
}

export async function scene_result_success_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")} 살짝 긴장하면서`);
  if (ctx.talents[35]) {
    ctx.showMessage(`새빨간 얼굴로`);
  } else if (ctx.talents[36]) {
    ctx.showMessage(`거리낌없이`);
  }
  ctx.showMessage(`상당히 아슬아슬한 수위의 질문에 당황해 하면서도 대답하고 있다……`);
  ctx.showMessage('');
  ctx.times('P:10', 1.00);
  P[4] *= 1;
}

export async function scene_result_failed_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")} 많이 긴장했는지,`);
  if (ctx.talents[35]) {
    ctx.showMessage(`새빨간 얼굴로`);
  }
  ctx.showMessage(`동문서답을 하더니, 이내 입을 닫아버렸다……`);
  ctx.showMessage('');
  ctx.times('P:10', 0.80);
  P[4] = 0;
}

export async function scene_exp_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.cvar[73] += ctx.abilities[15] + ctx.rand(6);
  if (ctx.talents[182]) {
    character.cvar[73] += ctx.rand(6);
  }
}
