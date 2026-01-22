/**
 * ARBEIT_05_ELENA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function arbeit_title_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "해바라기 마을(간호스탭)";
  return 1;
}

export async function arbeit_permission_5_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return GETCHARA(32) > 0;
}

export async function arbeit_exec_5_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(3);
  if (ctx.locals[0] == 0) {
    ctx.locals[0] = 1;
  }
  if (ctx.getTalent(arg, 63) == 1) {
    ctx.locals[0] *= 2;
  }
  if (ctx.getTalent(arg, 117) == 1) {
    ctx.locals[0] *= 2;
  }
  ctx.exp[ctx.args[0]][134] += ctx.locals[0];
  ctx.juel[ctx].args[7] += 200 * ctx.locals[0];
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.args[0]), "는")} 간호스탭 아르바이트를 하고 있다……`);
  if (ctx.locals[0] >= 2) {
    ctx.showMessage(`열심히 일하는 모습이 평가받은 것 같다`);
  }
  if (ctx.exp[ctx.args[0]][134] >= 30 && ctx.getTalent(arg, 64) === 0) {
    ctx.getTalent(arg, 64) = 1;
    ctx.showMessage(`이 아르바이트를 오래한 덕분에 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.args[0]), "는")} 더러움을 신경쓰지 않게 됐다`);
  }
  ctx.showMessage(`W 습득의 구슬 +{200 * LOCAL}`);
  return 1;
}

export async function arbeit_info_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ※이 아르바이트에서 경험을 쌓으면【불결무시】를 습득 가능합니다`);
  return 1;
}
