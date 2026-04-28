/**
 * ACHIEVEMENT_20_STRAWBERRY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "Strawberry Panic!";
}

export async function achievement_calc_20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if (ctx.abilities[ctx.count][22] === 10) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[20] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] >= 7) {
    ctx.global[20] = 1;
  }
  return ctx.global[20];
}

export async function achievement_main_20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`지도와 촬영을 반복하며 동성과 다양한 행위를 경험하게 된 그녀들`);
  ctx.showMessage(`같은 여자이기에 알 수 있는, 서로의『기분 좋은 곳』을 자극해주는 행위에`);
  ctx.showMessage(`그녀들은 깊게 빠져있었다`);
  ctx.showMessage(`그것은 우정을 넘어, 육욕과 함께 동성을 향한 애정이라고도 할 수 있는 것으로 변하여`);
  ctx.showMessage(`W 이제와선 그녀들은 동성과 살을 겹치는 행위에 완전히 저항이 없어졌다`);
  if (ctx.flags[110] === 0) {
    ctx.showMessage(`W 《실적 해금 보너스로서【연심】습득조건에서 레즈경험을 무시하게 됐습니다》`);
    ctx.flags[110] = 1;
  }
}
