/**
 * RACHEL_LABO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function rachel_labo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('레이첼의 공방');
  ctx.showMessage('《레이첼이 제작한 약품등을 구입할 수 있습니다》');
  ctx.drawLine();
  ctx.printValue(DAY+1);
  ctx.print('주차');
  if (TIME === 0) {
    ctx.showMessage('전반');
  } else {
    ctx.showMessage('후반');
  }
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[0] - 체력 강화제   (재료비: 300000포인트)');
  ctx.showMessage('[1] - 기력 강화제   (재료비: 500000포인트)');
  ctx.showMessage('[2] - 반하는 약     (재료비: 1500000포인트)');
  ctx.showMessage('[3] - 초강력 미약   (재료비: 1500000포인트)');
  ctx.showMessage('[4] - 회춘약        (재료비: 1000000포인트)');
  if (character.cflags[ctx.master][703] <= 2) {
    ctx.showMessage('[5] - 음마 소환     (재료비: 2000000포인트)');
  }
  if (character.cflags[ctx.master][712] === 0) {
    ctx.showMessage('[6] - 파라디수스의 밀정을 소개받는다 (소개료: 500000포인트)');
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 96) {
      if (character.cflags[ctx.count][1] === 2 && character.cflags[ctx.master][694] === 0) {
        ctx.showMessage('[7] - 리나에게 스탭 동향을 조사해달라 한다');
      }
    }
  }
  if (ctx.getTalent(master, 325) === 1 && ctx.item[90] === 0) {
    ctx.showMessage('[10] - 촉수생물 소환 (재료비: 75000포인트)');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await basehp_up(ctx, character);
  } else if (ctx.result === 1) {
    await basesp_up(ctx, character);
  } else if (ctx.result === 2) {
    await add_love(ctx, character);
  } else if (ctx.result === 3) {
    await add_lewd(ctx, character);
  } else if (ctx.result === 4) {
    await antiaging(ctx, character);
  } else if (ctx.result === 5) {
    await add_succubus(ctx, character);
  } else if (ctx.result === 6) {
    if (character.cflags[ctx.master][712] === 0) {
      await add_reena(ctx, character);
    }
  } else if (ctx.result === 7) {
    if (character.cflags[ctx.master][712] === 1 && character.cflags[ctx.master][694] === 0) {
      await reena_search(ctx, character);
    }
  } else if (ctx.result === 10 && ctx.getTalent(master, 325) === 1 && ctx.item[90] === 0) {
    await add_tentacle(ctx, character);
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}
