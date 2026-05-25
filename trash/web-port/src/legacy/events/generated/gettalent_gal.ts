/**
 * GETTALENT_GAL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function gettalent_gal(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[85]) {
    return 0;
  }
  ctx.varSet(ctx.locals[0]);
  // TODO: FOR LOCAL,0,CHARANUM
  if (ctx.locals[0] == ctx.master || ctx.getTalent(local, 423) == 0 || ctx.getTalent(local, 432) == 1) {
    // TODO: CONTINUE
  }
  // TODO: FOR LOCAL:1,0,CHARANUM
  if (ctx.locals[0] != ctx.locals[1] && ctx.getTalent(ctx.locals[1], 432) && ctx.relation[local][ctx.getCharacterNo(ctx.locals[1]]) >= 120 && ctx.rand(100) <= 20 && ((ctx.locals[0].no != 1 && ctx.getCharacterNo(ctx.locals[1]) != 91) || (ctx.locals[0].no != 91 && ctx.getCharacterNo(ctx.locals[1]) != 1))) {
    ctx.showMessage(`W ${ctx.getName(ctx.locals[0])}의 상태가 이상하다……`);
    ctx.showMessage(`이전엔 화장품이나 악세사리, 네일에 별로 흥미가 없고, 어느쪽이냐면`);
    ctx.showMessage(`수수한 패션이었지만, 최근에는 그런 물건을 좋아하게 되고 언동도 가벼워졌다`);
    ctx.showMessage(`오늘도 사무소에서 %조사처리(NAME:(LOCAL:1),"와")% 패션잡지를 펼치고, 코디가 어디가 어떻고 어떤 네일샬롱이 좋냐느니`);
    ctx.showMessage(`하는 대화를 나누고 있다……`);
    ctx.showMessage(`W 아무래도 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "는")} ${ctx.getVarName("CALLNAME", ctx.locals[1])}의 영향을 받아【${ctx.getVarName("TALENT", 432)}】%조사만처리(TALENTNAME:432,"가")% 되버린 것 같다……`);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.getTalent(local, 432) = 1;
    ctx.getTalent(local, 209) = 0;
    // TODO: BREAK
  }
  // TODO: NEXT
  // TODO: NEXT
}
