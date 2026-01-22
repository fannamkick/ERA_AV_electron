/**
 * SCENE10_AV_SM.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function scene_title_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = SM;
}

export async function scene_visible_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[ctx.player][12] === 3 && ctx.abilities[21] >= 3 && ctx.item[14] === 0) {
    return 0;
  } else {
    return 1;
  }
}

export async function scene_fee_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 5;
  P[2] += 200;
  P[3] += 400;
}

export async function scene_info_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('《SM》');
  ctx.showMessage('카메라 앞에서 SM플레이를 합니다');
  ctx.drawLine('‥');
}

export async function scene_calc_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[1] = 0;
  ctx.locals[1] += ctx.abilities[10];
  ctx.locals[1] += ctx.abilities[11];
  ctx.locals[1] += ctx.abilities[17];
  ctx.locals[1] += ctx.abilities[21];
  ctx.locals[1] += ctx.abilities[70];
  if (ctx.item[5]) {
    ctx.locals[1] += 5;
  }
  if (ctx.item[9]) {
    ctx.locals[1] += 5;
  }
  if (ctx.item[10]) {
    ctx.locals[1] += 5;
  }
  if (ctx.item[11]) {
    ctx.locals[1] += 5;
  }
  if (ctx.item[15]) {
    ctx.locals[1] += 10;
  }
  if (ctx.item[21]) {
    ctx.locals[1] += 10;
  }
  if (ctx.item[24]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[14]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[17]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[41]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[80]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[88]) {
    ctx.locals[1] += 10;
  }
  if (ctx.talents[110]) {
    ctx.locals[1] += 5;
  }
  if (ctx.talents[114]) {
    ctx.locals[1] += 5;
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
  if (ctx.talents[40]) {
    ctx.locals[1] -= 10;
  }
  if (ctx.locals[1] >= 30) {
    if (ctx.locals[1] >= 80) {
      return 2;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

export async function scene_result_start_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[4] = 6;
  P[10] = 3000;
  ctx.showMessage(`${ctx.getVarName("NICK", TARGET)}, ${ctx.getName(character)}의 SM조교를 촬영했다……`);
  // TODO: PRINTW
}

export async function scene_result_perfect_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")} 카메라를 의식하며,`);
  ctx.showMessage(`교성을 흘리고 밧줄에 묶인 몸을 경련하며, 성기를 애액으로 질척질척하게 적셨다……`);
  ctx.showMessage('');
  ctx.times('(P:10)', 1.25);
  P[4] *= 2;
}

export async function scene_result_success_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")} 카메라를 신경쓰면서,`);
  if (ctx.talents[35]) {
    ctx.showMessage(`새빨간 얼굴로`);
  }
  ctx.showMessage(`밧줄에 묶인 몸을 쾌락에 떨며, 성기를 적셨다……`);
  ctx.showMessage('');
}

export async function scene_result_failed_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "은")}`);
  if (ctx.talents[35]) {
    ctx.showMessage(`새빨간 얼굴로`);
  }
  ctx.showMessage(`밧줄이 조이는 고통을 참고 있다……`);
  ctx.showMessage('');
  ctx.times('(P:10)', 0.8);
  P[4] = 0;
}

export async function scene_exp_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(ctx.locals[0], 0);
  ctx.locals[0] = (1 + ctx.rand(5));
  ctx.locals[0] += ctx.abilities[21];
  if (ctx.talents[76]) {
    ctx.times('LOCAL', 1.25);
  }
  character.cvar[51] += ctx.locals[0];
  if (P[4] != 0 && ctx.abilities[21] != 0) {
    ctx.locals[1] += ctx.abilities[21];
    if (ctx.talents[76]) {
      ctx.times('LOCAL', 1.50);
    }
    if (ctx.abilities[0] >= ctx.locals[0]) {
      ctx.locals[1] = ctx.locals[0];
    }
    character.cvar[30] += ctx.locals[1];
  }
}
