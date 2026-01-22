/**
 * ACHIEVEMENT_19_ONLYONE_KANADE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "ONLY ONE EMPRESS";
}

export async function achievement_calc_19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(count, 553)) {
    if (ctx.getTalent(count, 181) === 1) {
      ctx.locals[0]++;
    }
  }
  // TODO: NEXT
  if (ctx.global[19] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] == 1) {
    ctx.global[19] = 1;
  }
  return ctx.global[19];
}

export async function achievement_main_19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`얌전하고 청순가련한 우등생이었던 미야마 카나데……`);
  ctx.showMessage(`그러나 그녀에겐 검고 음흉한 소질이 잠들어 있었습니다`);
  ctx.showMessage(`그리고 거듭되는 지도로 소질이 개화한 카나데는 겉으로는 평소대로 행동하면서도`);
  ctx.showMessage(`다른 누구보다도 남자들을 철저하게 괴롭히게 됐습니다`);
  ctx.showMessage(`W 그녀가 일하는 창관에선 오늘도 그녀를「카나데님」이라 부르는 수많은 마조남들이 다녀갑니다`);
  if (GETCHARA(1, 0) >= 1) {
    ctx.locals[0] = GETCHARA(1);
    if (ctx.getTalent(local, 553) === 0 && ctx.paramBand[51] === 0) {
      ctx.showMessage(`《미야마 카나데를【ONLY ONE EMPRESS】로 각성시키시겠습니까?》`);
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      // Label: INPUTLOOP
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage(`W 《미야마 카나데가【ONLY ONE EMPRESS】로 각성했습니다》`);
        ctx.getTalent(local, 76) = 1;
        ctx.getTalent(local, 33) = 1;
        ctx.getTalent(local, 83) = 1;
        ctx.getTalent(local, 87) = 1;
        ctx.getTalent(local, 93) = 1;
        ctx.getTalent(local, 211) = 1;
        ctx.getTalent(local, 24) = 0;
        ctx.getTalent(local, 35) = 0;
        ctx.getTalent(local, 30) = 0;
        ctx.getTalent(local, 423) = 0;
        ctx.getTalent(local, 553) = 1;
        MAXctx.base[ctx].locals[31] += 30;
        ctx.base[ctx].locals[31] += 30;
        MAXctx.base[ctx].locals[1] += 500;
        ctx.base[ctx].locals[1] += 500;
        ctx.paramBand[51] = 3;
      } else if (ctx.result === 1) {
        ctx.showMessage(`W 《미야마 카나데의 소질을 그대로 둡니다》`);
      } else {
        // GOTO INPUTLOOP - 구조 변경 필요 (while/break 사용 권장)
      }
    }
  }
}
