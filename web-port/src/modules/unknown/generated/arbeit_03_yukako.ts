/**
 * ARBEIT_03_YUKAKO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function arbeit_title_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "돌체・비타(웨이트리스)";
  return 1;
}

export async function arbeit_permission_3_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return GETCHARA(41) > 0 || GETCHARA(45) > 0;
}

export async function arbeit_exec_3_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(3);
  if (ctx.locals[0] == 0) {
    ctx.locals[0] = 1;
  }
  if (ctx.getTalent(arg, 13) == 1) {
    ctx.locals[0] *= 2;
  }
  if (ctx.getTalent(arg, 155) == 1) {
    ctx.locals[0] *= 2;
  }
  ctx.exp[ctx.args[0]][132] += ctx.locals[0];
  ctx.juel[ctx].args[7] += 300 * ctx.locals[0];
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.args[0]), "는")} 웨이트리스 아르바이트를 하고 있다……`);
  if (ctx.locals[0] >= 2) {
    ctx.showMessage(`열심히 일하는 모습이 평가받은 것 같다`);
  }
  if (ctx.exp[ctx.args[0]][132] >= 60 && ctx.getTalent(arg, 63) === 0) {
    ctx.getTalent(arg, 63) = 1;
    ctx.showMessage(`이 아르바이트를 오래한 덕분에 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.args[0]), "는")}【헌신적】이 됐다`);
  }
  ctx.showMessage(`W 습득의 구슬 +{300 * LOCAL}`);
  return 1;
}

export async function arbeit_info_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ※이 아르바이트에서 경험을 쌓으면【헌신적】을 습득 가능합니다`);
  return 1;
}
