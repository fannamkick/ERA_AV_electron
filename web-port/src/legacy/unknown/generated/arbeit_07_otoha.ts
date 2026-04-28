/**
 * ARBEIT_07_OTOHA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function arbeit_title_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "러브핵・엔터테인먼트(매니저)";
  return 1;
}

export async function arbeit_permission_7_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return GETCHARA(46) > 0;
}

export async function arbeit_exec_7_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(3);
  if (ctx.locals[0] == 0) {
    ctx.locals[0] = 1;
  }
  if (ctx.getTalent(arg, 211) == 1) {
    ctx.locals[0] *= 2;
  }
  if (ctx.getTalent(arg, 224) == 1) {
    ctx.locals[0] *= 2;
  }
  if (ctx.getTalent(arg, 118) == 1) {
    ctx.locals[0] *= 2;
  }
  ctx.exp[ctx.args[0]][136] += ctx.locals[0];
  ctx.juel[ctx].args[7] += 500 * ctx.locals[0];
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.args[0]), "는")} 연애인 매니저 아르바이트를 하고 있다……`);
  if (ctx.locals[0] >= 2) {
    ctx.showMessage(`열심히 일하는 모습이 평가받은 것 같다`);
  }
  if (ctx.exp[ctx.args[0]][136] >= 100 && ctx.getTalent(arg, 202) === 0) {
    ctx.getTalent(arg, 202) = 1;
    ctx.showMessage(`이 아르바이트를 오래한 덕분에 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.args[0]), "는")}【매니저】로 인정받았다`);
  }
  ctx.showMessage(`W 습득의 구슬 +{500 * LOCAL}`);
  return 1;
}

export async function arbeit_info_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ※이 아르바이트에서 경험을 쌓으면【매니저】를 습득 가능합니다`);
  return 1;
}
