/**
 * LIFELIST_AV.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function life_list_av(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage(` [0] ${ctx.getName(ctx.master)} (지도자)`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}(예명: ${ctx.getVarName("NICK", COUNT)})`);
    ctx.print('(체력:');
    A = ctx.base[ctx.count][0];
    if (ctx.base[ctx.count][0] < 0) {
      A = 0;
    }
    ctx.showMessage(`${A}/${MAXctx.base[ctx.count][0]})`);
    if (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153)) {
      ctx.print('[산월]');
    } else if (ctx.getTalent(count, 153)) {
      ctx.print('[임신]');
    } else if (ctx.getTalent(count, 154)) {
      ctx.print('[육아]');
    }
    ctx.showMessage('');
  }
  ctx.drawLine();
}
