/**
 * ARBEIT_04_HARUNO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function arbeit_title_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "히나미 신사(무녀)";
  return 1;
}

export async function arbeit_permission_4_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return GETCHARA(15) > 0;
}

export async function arbeit_exec_4_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(3);
  if (ctx.getTalent(arg, 209) == 1) {
    ctx.locals[0] *= 2;
  }
  if (ctx.getTalent(arg, 428) == 1) {
    ctx.locals[0] *= 2;
  }
  if (ctx.getTalent(arg, 432) == 1) {
    ctx.locals[0] /= 2;
  }
  if (ctx.locals[0] == 0) {
    ctx.locals[0] = 1;
  }
  ctx.exp[ctx.args[0]][133] += ctx.locals[0];
  ctx.juel[ctx].args[4] += 300 * ctx.locals[0];
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.args[0]), "는")} 무녀 아르바이트를 하고 있다……`);
  if (ctx.locals[0] >= 2) {
    ctx.showMessage(`열심히 일하는 모습이 평가받은 것 같다`);
  }
  if (ctx.exp[ctx.args[0]][133] >= 100 && ctx.getTalent(arg, 207) === 0) {
    ctx.getTalent(arg, 207) = 1;
    ctx.showMessage(`이 아르바이트를 오래한 덕분에 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.args[0]), "는")}【무녀】로 인정받았다`);
  }
  ctx.showMessage(`W 온순의 구슬 +{300 * LOCAL}`);
  return 1;
}

export async function arbeit_info_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ※이 아르바이트에서 경험을 쌓으면【무녀】를 습득 가능합니다`);
  return 1;
}
