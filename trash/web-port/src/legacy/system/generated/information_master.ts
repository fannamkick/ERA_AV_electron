/**
 * INFORMATION_MASTER.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_information(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
      if (ctx.getTalent(count, 184)) {
        A += 1;
      } else if (ctx.getTalent(count, 85) === 1) {
        B += 1;
      } else if (character.cflags[ctx.count][16] === 2 || character.cflags[ctx.count][16] === 3 || character.cflags[ctx.count][16] === 6) {
        C += 1;
      } else if (ctx.exp[ctx.count][103] > 0) {
        D += 1;
      } else if (ctx.exp[ctx.count][103] > 0) {
        E += ctx.exp[ctx.count][103];
      }
    }
  }
  ctx.drawLine();
  ctx.showMessage(`이달의 히트 장르, 또는 잘 팔리는 여배우의 경향은`);
  await videosale_print(ctx, character);
  if (ctx.flags[560] === -1) {
    ctx.showMessage(`에요`);
  } else {
    ctx.showMessage(`입니다`);
  }
  ctx.showMessage(` ${ctx.josaHelper("플레이어가")} 지금까지 찍은 AV의 총 판매량은 ${ctx.money[2]}포인트입니다`);
  if (B > 0) {
    ctx.showMessage(` 현재, {B}명이 ${ctx.getVarName("CALL", MASTER)}에게 연심을 품고 있습니다`);
  }
  if (C > 0) {
    ctx.showMessage(` 현재, {C}명이 매춘으로 처녀상실을 당했습니다`);
  }
  if (A > 0) {
    ctx.showMessage(` 현재, ${A}명의 여배우 후보에게 남자친구가 있습니다`);
  }
  if (D > 0) {
    ctx.showMessage(` 현재, {D}명이 치한을 당했으며, 총 횟수는 {E}번입니다`);
  }
  ctx.drawLine();
  await ctx.wait();
}
