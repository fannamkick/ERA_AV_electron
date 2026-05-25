/**
 * SELL_MILK.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function sell_milk(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = character.tflags[35] * 100;
  O = A * 5;
  if (A > 0) {
    ctx.drawLine();
    if (ctx.exp[54] <= EXPLV[3]) {
      ctx.times('O', 1.00);
    } else if (ctx.exp[54] <= EXPLV[4]) {
      ctx.times('O', 1.20);
    } else if (ctx.exp[54] <= EXPLV[5]) {
      ctx.times('O', 1.50);
    } else {
      ctx.times('O', 2.00);
    }
    if (ctx.talents[0]) {
      O = O * 3;
    }
    if (ctx.talents[78]) {
      O = O * 2;
    }
    ctx.showMessage(`착유기를 사용해 ${ctx.getVarName("CALL", TARGET)}에게서 모유를 ${A}cc 짜냈습니다.`);
    if (ctx.assi > 0) {
      if (ctx.getTalent(assi, 211) && ctx.assiAbilities[15]) {
        ctx.showMessage(`${ctx.getVarName("CALL", ASSI)}의 뛰어난 가공 덕분에 ${ctx.getVarName("CALL", TARGET)}의 모유는 평소보다 비싸게 팔렸다.`);
        O *= 100 + ctx.assiAbilities[15] * 5;
        O /= 100;
      }
    }
    ctx.showMessage(`${ctx.getName(character)}의 모유는 {O}포인트로 팔렸다`);
    ctx.money += O;
    ctx.showMessage(`소지금 {O}포인트 증가`);
    await ctx.wait();
  }
  return 0;
}
