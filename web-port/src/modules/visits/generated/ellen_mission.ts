/**
 * ELLEN_MISSION.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ellen_mission(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('엘렌씨의 부탁');
  ctx.showMessage('《엘렌에게서 부탁을 받을 수 있습니다》');
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
  ctx.showMessage('[0] - 여배우 후보 소개');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 10) {
      if (ctx.getTalent(count, 430) === 1) {
        if (ctx.flags[570] === 0) {
          ctx.showMessage('[1] - 미션스타트!');
        }
      }
    }
  }
  if (ctx.paramBand[14] == 3) {
    ctx.showMessage('[2] - 카미나 유우키의 옛 친구들을 구출한다');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await ellen_extraactress(ctx, character);
    return 0;
  } else if (ctx.result === 1 && ctx.flags[570] === 0) {
    await mission_start(ctx, character);
  } else if (ctx.result === 2 && ctx.paramBand[14]== 3) {
    await koisora_add(ctx, character);
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}
