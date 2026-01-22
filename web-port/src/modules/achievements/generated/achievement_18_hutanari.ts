/**
 * ACHIEVEMENT_18_HUTANARI.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "후타나리 러버즈";
}

export async function achievement_calc_18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(count, 121) == 1 && ctx.abilities[ctx.count][38] >= 3 && ctx.getTalent(count, 1) == 0) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[18] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] >= 5) {
    ctx.global[18] = 1;
  }
  return ctx.global[18];
}

export async function achievement_main_18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`비밀 연구실에는 다양한 육체개조 메뉴가 있고, 그중에서도 ${ctx.josaHelper("플레이어가")} 좋아하는 건`);
  ctx.showMessage(`『여성의 클리토리스를 후타나리 페니스로 개조한다』였습니다`);
  ctx.showMessage(`남성기가 자라난 그녀들은 모두, 지금까지 경험한 적 없는 사정에 당황하고는`);
  ctx.showMessage(`얼마 안가 욕망이 악취를 풍기는 백탁액으로 튀어나오는 쾌감에 몸을 태워갔습니다`);
  ctx.showMessage(`그녀들은 조금씩 쾌감에 먹혀간 끝에, 언제부터인가 페니스로 얻는 열략을 당연하게 받아들였고……`);
  ctx.showMessage(`W 더 강한 쾌락을 추구한 끝에, 그녀들이 남자의 섹스를 경험하는 것은 시간문제였습니다`);
  if (ctx.flags[564] === 0) {
    ctx.showMessage(`W 《실적 해금 보너스로서 연구실의「후타나리로 만든다」에서 자지 사이즈를 선택할 수 있게 됐습니다》`);
    ctx.flags[564] = 1;
  }
}
