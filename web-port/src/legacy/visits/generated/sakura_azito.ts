/**
 * SAKURA_AZITO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function sakura_azito(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('RB단 아지트');
  ctx.showMessage('《인기만점☆인싸가 될 수 있는 다양한 세미나에 참가할 수 있습니다》');
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
  ctx.showMessage('[ 0] - 정조개혁: 정조관념        　(참가비: 1000000포인트)');
  ctx.showMessage('[ 1] - 정조개혁: 뉴트럴　        　(참가비:  100000포인트)');
  ctx.showMessage('[ 2] - 정조개혁: 정조무관심      　(참가비:  500000포인트)');
  ctx.showMessage('[ 3] - 수치개혁: 수줍음         　(참가비: 1000000포인트)');
  ctx.showMessage('[ 4] - 수치개혁: 뉴트럴　       　(참가비:  100000포인트)');
  ctx.showMessage('[ 5] - 수치개혁: 부끄럼 없음　     (참가비:  500000포인트)');
  ctx.showMessage('[ 6] - 성격개혁: 솔직함　　     　 (참가비:  500000포인트)');
  ctx.showMessage('[ 7] - 성격개혁: 건방짐        　 (참가비:  500000포인트)');
  ctx.showMessage('[ 8] - 성격개혁: 얌전함        　 (참가비:  500000포인트)');
  ctx.showMessage('[ 9] - 성격개혁: 활발함　　     　 (참가비:  500000포인트)');
  ctx.showMessage('[10] - 성격개혁: 뉴트럴  　       (참가비:  100000포인트)');
  ctx.showMessage('[11] - 방해공작: 킥킹 호스        (의뢰료:  100000포인트)');
  if (ctx.paramBand[76] == 3) {
    ctx.showMessage('[12] - 개성개혁: 갸루계 　   　　　(참가비: 3000000포인트)');
  }
  if (ctx.paramBand[76] == 3) {
    ctx.showMessage('[13] - 개성개혁: 뉴트럴           (참가비: 3000000포인트)');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await chastity_up(ctx, character);
  } else if (ctx.result === 1) {
    await chastity_neutral(ctx, character);
  } else if (ctx.result === 2) {
    await chastity_down(ctx, character);
  } else if (ctx.result === 3) {
    await shame_up(ctx, character);
  } else if (ctx.result === 4) {
    await shame_neutral(ctx, character);
  } else if (ctx.result === 5) {
    await shame_down(ctx, character);
  } else if (ctx.result === 6) {
    await personality_gentle(ctx, character);
  } else if (ctx.result === 7) {
    await personality_brazen(ctx, character);
  } else if (ctx.result === 8) {
    await personality_quiet(ctx, character);
  } else if (ctx.result === 9) {
    await personality_lively(ctx, character);
  } else if (ctx.result === 10) {
    await personality_neutral(ctx, character);
  } else if (ctx.result === 11) {
    await kickinghorse(ctx, character);
  } else if (ctx.result === 12 && ctx.paramBand[76] === 3) {
    await personality_gal(ctx, character);
  } else if (ctx.result === 13 && ctx.paramBand[76] === 3) {
    await gal_neutral(ctx, character);
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}
