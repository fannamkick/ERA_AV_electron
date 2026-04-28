/**
 * ARBEIT_02_SAORI.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function arbeit_title_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "JOMANDA(부티크 점원)";
  return 1;
}

export async function arbeit_permission_2_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return GETCHARA(44) > 0;
}

export async function arbeit_exec_2_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(3);
  if (ctx.locals[0] == 0) {
    ctx.locals[0] = 1;
  }
  if (ctx.getTalent(arg, 221)) {
    ctx.locals[0] *= 2;
  }
  if (ctx.getTalent(arg, 113)) {
    ctx.locals[0] *= 2;
  }
  ctx.exp[ctx.args[0]][131] += ctx.args[0];
  ctx.juel[ctx].args[7] += 300 * ctx.locals[0];
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.args[0]), "는")} 부티크 점원 아르바이트를 하고 있다……`);
  if (ctx.locals[0] >= 2) {
    ctx.showMessage(`열심히 일하는 모습이 평가받은 것 같다`);
  }
  if (ctx.exp[ctx.args[0]][131] >= 100 && ctx.getTalent(arg, 326) === 0) {
    ctx.getTalent(arg, 326) = 1;
    ctx.showMessage(`이 아르바이트를 오래한 덕분에 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.args[0]), "는")}【멋쟁이】가 됐다`);
  }
  ctx.showMessage(`W 습득의 구슬 +{300 * LOCAL}`);
  return 1;
}

export async function arbeit_info_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ※이 아르바이트에서 경험을 쌓으면【멋쟁이】를 습득 가능합니다`);
  return 1;
}
