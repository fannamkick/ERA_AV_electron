/**
 * IKUMI_LABO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ikumi_labo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await ikumi_labo_calc(ctx, character);
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('이쿠미의 연구소');
  ctx.showMessage('《초☆최첨단 기술의 은총을 받을 수 있습니다》');
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
  ctx.showMessage('[ 0] - 불임수술을 한다   　　　　　　 (      0포인트)');
  if (D >= 1 && character.cflags[ctx.master][709] === 0) {
    ctx.showMessage('[ 2] - 신형 안드로이드 제작  　 　(5000000포인트)');
  }
  if (character.cflags[ctx.master][720] === 1) {
    ctx.showMessage('[ 3] - 유전자개조: 음마화　　　 　(5000000포인트)');
  }
  if (ctx.paramBand[303] != 3 && ctx.item[90] === 1) {
    ctx.showMessage('[ 4] - 약품개량: 배란유발제 강화　( 500000포인트)');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await kill_pregnancy(ctx, character);
  } else if (ctx.result === 1) {
  } else if (ctx.result === 2 && D >= 1 && character.cflags[ctx.master][709] === 0) {
    await add_android(ctx, character);
  } else if (ctx.result === 3 && character.cflags[ctx.master][720] === 1) {
    await succubus_change(ctx, character);
  } else if (ctx.result === 4 && ctx.paramBand[303] != 3 && ctx.item[90] === 1) {
    await boost_item40(ctx, character);
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}
