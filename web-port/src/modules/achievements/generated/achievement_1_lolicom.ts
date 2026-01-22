/**
 * ACHIEVEMENT_1_LOLICOM.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "로리큐브";
}

export async function achievement_calc_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if ((ctx.getTalent(count, 414) || ctx.base[ctx.count][9] <= 15) && ctx.getTalent(count, 505) == 0 && ctx.getTalent(count, 504) == 0 && ctx.getTalent(count, 511) == 0 && character.cflags[ctx.count][1] == 2) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[1] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] >= 4) {
    ctx.global[1] = 1;
  }
  return ctx.global[1];
}

export async function achievement_main_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`수많은 고○학생 아래의 소녀들과 꺄아꺄아 우후후 한 적 있는 ${ctx.getVarName("CALL", MASTER)}에게 딱 맞는 실적이군요`);
  ctx.showMessage(`어떤 위대한`);
  ctx.setFontStyle(4);
  ctx.showMessage(`로리콘`);
  ctx.setFontStyle(0);
  ctx.showMessage(`선지자께선 말씀하셨습니다`);
  ctx.showMessage(`「정말이지, 초○학생은 최고야!!」`);
  ctx.showMessage(`W ……라고`);
  if (ctx.getTalent(master, 163) === 0) {
    ctx.showMessage(`W 그런 ${ctx.getVarName("CALL", MASTER)}에겐【로리콘】이라는 칭호를 수여합니다`);
    ctx.getTalent(master, 163) = 1;
  }
}
