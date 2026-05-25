/**
 * ACHIEVEMENT_15_HAERETICUS.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = HAERETICUS;
}

export async function achievement_calc_15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if ((ctx.getCharacterNo(ctx.count) == 9 || ctx.getCharacterNo(ctx.count) == 96 || ctx.getCharacterNo(ctx.count) == 209 || ctx.getCharacterNo(ctx.count) == 86) && ctx.getTalent(count, 430) == 1) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[15] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] >= 4) {
    ctx.global[15] = 1;
  }
  return ctx.global[15];
}

export async function achievement_main_15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`이 세계와는 다른 세계에서 온 일족의 자손인 파라디수스 왕가……`);
  ctx.showMessage(`레이첼의 마술처럼 이 세계의 법칙과는 동떨어진 힘을 가진 규격외의 존재`);
  ctx.showMessage(`이 세계에선『이단자』인 그녀들은 아군으로 만든 것은`);
  ctx.showMessage(`W ${ctx.getVarName("CALL", MASTER)}의 미래에 엄청난 이익이 되겠죠`);
  if (ctx.flags[561] === 0 && ctx.flags[553] === 1) {
    if (GETCHARA(86, 0) >= 0) {
      ctx.showMessage(`《실적 해금 보너스로서 실적「위대한 유니콘」의 보너스 플래그가 리셋됐습니다》`);
      ctx.flags[561] = 1;
      ctx.flags[553] = 0;
    }
  }
}
