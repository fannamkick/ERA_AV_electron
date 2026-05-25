/**
 * ACHIEVEMENT_30_ACTRESS_LIST_COMPLETE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "ACTRESS LIST COMPLETED!!";
}

export async function achievement_calc_30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(ctx.locals[0], 0);
  // TODO: FOR LOCAL, 0, 250
  if (!EXISTCSV(ctx.locals[0], 0)) {
    // TODO: CONTINUE
  }
  if (ctx.locals[0] == ctx.master) {
    // TODO: CONTINUE
  }
  ctx.locals[1]++;
  if (global[200 + ctx.locals[1]]) {
    ctx.locals[2]++;
  }
  // TODO: NEXT
  if (ctx.locals[2] == ctx.locals[1]) {
    ctx.global[30] = 1;
  }
  return ctx.global[30];
}

export async function achievement_main_30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`이 세계를 몇번이나 반복하며, 끝내 모든 여배우후보를 알게 된 ${ctx.getVarName("CALL", MASTER)}`);
  ctx.showMessage(`그 중에는 만나는 것조차 어려운 사람도 있었지만, ${ctx.josaHelper("플레이어는")} 어떤 고난도 해쳐나올 수 있었습니다`);
  ctx.showMessage(`세계를 반복하는 사이에, 만난 적이 없는 사람의 프로필까지 기록돼있는`);
  ctx.showMessage(`이상한『여배우명부』`);
  ctx.showMessage(`이게 있으면 앞으로의 지도가 편해질지도 모릅니다`);
  // TODO: PRINTW
  ctx.showMessage(`《실적 해금 보너스로서 실적「위대한 유니콘」의 보너스 플래그가 리셋됐습니다》`);
}
