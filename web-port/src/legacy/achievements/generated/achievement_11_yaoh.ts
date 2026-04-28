/**
 * ACHIEVEMENT_11_YAOH.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "야왕";
}

export async function achievement_calc_11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.global[11] == 0 && await difficulty_check(ctx, character) && ctx.exp[ctx.master][90] >= 500) {
    ctx.global[11] = 1;
  }
  return ctx.global[11];
}

export async function achievement_main_11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`수많은 중요인사들의 접대를 해낸 ${ctx.getVarName("CALL", MASTER)}에게 딱 맞는 실적이군요`);
  ctx.showMessage(`그런 ${ctx.josaHelper("플레이어는")} 언제부턴지 뒷세계에서『밤의 왕』이라고 불리고 있다던가……`);
  ctx.showMessage(`W 앞으로도 정기적으로 중요인사 접대를 빠뜨리지 않는다면 좋은 일이 있을지도 모릅니다`);
  if (ctx.flags[546] === 0) {
    ctx.showMessage(`그런 ${ctx.getVarName("CALL", MASTER)} 소유의 창관에, 특수영업이 추가되었습니다`);
    ctx.showMessage(`W 보너스로 특수영업 【난교파티】가 해금되어, 항상 특수영업을 할 수 있게 됩니다`);
    ctx.flags[546] = 1;
  }
}
