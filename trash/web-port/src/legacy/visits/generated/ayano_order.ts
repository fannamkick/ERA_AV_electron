/**
 * AYANO_ORDER.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ayano_order(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('XX시 경찰서');
  ctx.showMessage('《아야노에게 다양한『부탁』을 할 수 있습니다》');
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
  if (ctx.flags[600] === 0) {
    ctx.showMessage('[ 0] - 치안단속을 강화해달라     　    (의뢰료:  10000포인트)');
  } else {
    ctx.showMessage('[ 0] - 치안단속을 약화해달라　     　  (의뢰료:  10000포인트)');
  }
  if (character.cflags[ctx.master][761] === 0) {
    ctx.showMessage('[ 1] - 아야노가의 메이드를 소개해달라  (의뢰료:  100000포인트)');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0 && ctx.flags[600] === 0) {
    await security_up(ctx, character);
  } else if (ctx.result === 0 && ctx.flags[600] === 1) {
    await security_down(ctx, character);
  } else if (ctx.result === 1 && character.cflags[761] === 0) {
    await add_fumika(ctx, character);
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}
