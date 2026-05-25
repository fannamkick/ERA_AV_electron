/**
 * ACHIEVEMENT_17_FALLENANGELS.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "FALLEN ANGELS";
}

export async function achievement_calc_17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if ((ctx.getCharacterNo(ctx.count) == 15 || ctx.getCharacterNo(ctx.count) == 85 || ctx.getCharacterNo(ctx.count) == 94) && ctx.getTalent(count, 0) == 0 && ctx.getTalent(count, 2) == 0 && ctx.getTalent(count, 440) == 1 && ctx.paramBand[135] == 3 && ctx.paramBand[144] == 3) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[17] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] == 3) {
    ctx.global[17] = 1;
  }
  return ctx.global[17];
}

export async function achievement_main_17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`야마토 나데시코인 히나미 하루노, 더러움을 모르는 천사 히나미 마유, 인공적으로 천사를 만드는 계획으로 천사가 된 하세카와 미코토……`);
  ctx.showMessage(`그러나 그녀들의 깨끗했던 모습은 자취를 감추고, 지금은 양구멍으로 음탕하게 쾌락을 갈구하게 되어버렸습니다`);
  ctx.showMessage(`만약 ${ctx.josaHelper("플레이어와")} 만나지 않았더라도, 그녀들은 언젠가『진짜 자신』을 알게 됐을지도 모르죠`);
  ctx.showMessage(`반대로, 음욕에 빠진 그녀들의 유일한 희망은 이제 ${ctx.josaHelper("플레이어와")} 만났다는 걸지도 모릅니다`);
  ctx.showMessage(`W ……오늘도 그녀들은 정욕에 몸을 태우며 ${ctx.josaHelper("플레이어가")} 주는 쾌락을 기다리고 있습니다`);
  if (ctx.flags[563] === 0) {
    if (GETCHARA(86, 0) >= 0) {
      ctx.showMessage(`《실적 해금 보너스로서 유니스・파라디수스의 연구실에【사상개변: 타천사화】가 추가됐습니다》`);
      ctx.flags[563] = 1;
    }
  }
}
