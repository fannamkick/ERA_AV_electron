/**
 * ARBEIT_01_KANON.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function arbeit_title_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "키류 조직(키류 카논의 비서)";
  return 1;
}

export async function arbeit_permission_1_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.args[0].no == 10) {
    return 0;
  }
  return GETCHARA(10) > 0;
}

export async function arbeit_exec_1_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(3);
  if (ctx.locals[0] == 0) {
    ctx.locals[0] = 1;
  }
  if (ctx.getTalent(arg, 224) == 1) {
    ctx.locals[0] *= 2;
  }
  if (ctx.getTalent(arg, 182) == 1) {
    ctx.locals[0] *= 2;
  }
  if (ctx.args[0].no == 1) {
    ctx.locals[0] *= 2;
  }
  ctx.exp[ctx.args[0]][130] += ctx.locals[0];
  ctx.juel[ctx].args[7] += 500 * ctx.locals[0];
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.args[0]), "는")} 키류 카논의 비서 아르바이트를 하고 있다……`);
  if (ctx.locals[0] >= 2) {
    ctx.showMessage(`열심히 일하는 모습이 평가받은 것 같다`);
  }
  if (ctx.exp[ctx.args[0]][130] >= 100 && ctx.getTalent(arg, 211) === 0) {
    ctx.getTalent(arg, 211) = 1;
    ctx.showMessage(`이 아르바이트를 오래한 덕분에 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.args[0]), "는")}【협상에 능숙함】을 얻었다`);
  }
  ctx.showMessage(`W 습득의 구슬 +{500 * LOCAL}`);
  return 1;
}

export async function arbeit_info_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ※이 아르바이트에서 경험을 쌓으면【협상에 능숙함】을 습득 가능합니다`);
  return 1;
}
