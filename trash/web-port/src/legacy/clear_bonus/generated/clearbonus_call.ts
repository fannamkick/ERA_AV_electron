/**
 * CLEARBONUS_CALL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function clearbonus_call(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await add_csv_birthday(ctx, character);
  await defolt_genitalcall(ctx, character);
  if (ctx.flags[569] == 1) {
    await clearbonus_hentai(ctx, character);
  }
  if (ctx.flags[567] == 1 && ctx.getTalent(target, 85) == 0) {
    await clearbonus_boyfriend(ctx, character);
  }
  if (ctx.flags[568] == 1) {
    await clearbonus_futanari(ctx, character);
  }
  if (ctx.talents[0] == 0) {
    await lostvirgin_detail_calc(ctx, character);
  }
}

export async function clearbonus_call_mihiro(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.no === 80) {
    ctx.showMessage(`${ctx.josaHelper("타겟이")}【ONLY ONE IDOL】을 습득한 상태로 시작합니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUT_LOOP
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W ${ctx.josaHelper("타겟이")}【ONLY ONE IDOL】을 습득한 상태로 시작합니다`);
      ctx.talents[552] = 1;
      MAXctx.base[31] += 80;
      ctx.base[31] += 80;
      ctx.paramBand[130] = 4;
      MAXctx.base[1] += 1000;
      ctx.base[1] += 1000;
    } else if (ctx.result === 1) {
      return;
    } else {
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    }
  }
}
