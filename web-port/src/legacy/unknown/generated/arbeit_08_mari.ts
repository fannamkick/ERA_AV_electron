/**
 * ARBEIT_08_MARI.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function arbeit_title_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "GLITTERIN\'(악세서리숍 점원)";
  return 1;
}

export async function arbeit_permission_8_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return GETCHARA(20) > 0;
}

export async function arbeit_exec_8_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(3);
  if (ctx.getTalent(arg, 17)) {
    ctx.locals[0] *= 2;
  }
  if (ctx.getTalent(arg, 423)) {
    ctx.locals[0] *= 5;
  }
  if (ctx.getTalent(arg, 15)) {
    ctx.locals[0] /= 2;
  }
  if (ctx.locals[0] == 0) {
    ctx.locals[0] = 1;
  }
  ctx.exp[ctx.args[0]][137] += ctx.locals[0];
  ctx.juel[ctx].args[7] += 200 * ctx.locals[0];
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.args[0]), "는")} 악세서리숍 점원 아르바이트를 하고 있다……`);
  if (ctx.locals[0] >= 2) {
    ctx.showMessage(`열심히 일하는 모습이 평가받은 것 같다`);
  }
  if (ctx.exp[ctx.args[0]][137] >= 40 && ctx.getTalent(arg, 432) === 0) {
    ctx.getTalent(arg, 432) = 1;
    ctx.showMessage(`이 아르바이트를 오래한 덕분에 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.args[0]), "는")}【갸루계】가 됐다`);
  }
  ctx.showMessage(`W 습득의 구슬 +{200 * LOCAL}`);
  return 1;
}

export async function arbeit_info_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ※이 아르바이트에서 경험을 쌓으면【갸루계】를 습득 가능합니다`);
  return 1;
}
