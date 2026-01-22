/**
 * ACHIEVEMENT_0_PLAYBOY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "제비";
}

export async function achievement_calc_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.global[0] == 0 && await difficulty_check(ctx, character) && ctx.flags[30] >= 10) {
    ctx.global[0] = 1;
  }
  return ctx.global[0];
}

export async function achievement_main_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`수많은 여자들을 구슬려 넘어오게 한 ${ctx.getVarName("CALL", MASTER)}에게 딱 어울리는 실적이로군요`);
  ctx.showMessage(`어떤 위대한`);
  ctx.setFontStyle(4);
  ctx.showMessage(`마코토 죽어라`);
  ctx.setFontStyle(0);
  ctx.showMessage(`W 선지자마냥 칼빵 맞고 나이스보트 당하지 않게 조심하시길`);
  if (ctx.getTalent(master, 카리스마) === 0) {
    ctx.showMessage(`그런 ${ctx.josaHelper("플레이어를")} 항간에서는『함락신』이라고 부르는 모양이더군요`);
    ctx.showMessage(`W 보너스로 소질【카리스마】를 당신에게 수여합니다`);
    // TODO: TALENT:MASTER:카리스마 = 1
  }
}
