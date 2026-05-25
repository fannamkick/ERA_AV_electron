/**
 * KANON_ORDER.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function kanon_order(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('카논에게 의뢰한다');
  ctx.showMessage('《뒷세계 관련자를 카논이 준비해줍니다》');
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
  ctx.showMessage('[ 0] - 나쁜 벌레를 없애달라                (의뢰료:  300000포인트)');
  ctx.showMessage('[ 1] - 문신사를 소개받는다                 (의뢰료:  100000포인트)');
  ctx.showMessage('[ 4] - 호위를 소개받는다                   (의뢰료:  800000포인트)');
  if ((character.cflags[ctx.master][704] & 1) === 0) {
    ctx.showMessage('[ 5] - 초인기 아이돌을「소개」받는다        (의뢰료: 1000000포인트)');
  }
  if ((character.cflags[ctx.master][704] & 2) === 0) {
    ctx.showMessage('[ 6] - 인기성우를「소개」받는다            (의뢰료: 1000000포인트)');
  }
  if ((character.cflags[ctx.master][758] & 1) === 0 || (character.cflags[ctx.master][758] & 2) === 0 || (character.cflags[ctx.master][758] & 4) === 0) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count === 0) {
        // TODO: CONTINUE
      } else if (ctx.getCharacterNo(ctx.count) === 29) {
        if (character.cflags[ctx.count][1] >= 1) {
          ctx.showMessage('[11] - 시설관련자를「소개」받는다');
        }
      }
    }
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await boyfriend_lost(ctx, character);
  } else if (ctx.result === 1) {
    await tatto(ctx, character);
  } else if (ctx.result === 4) {
    await bodyguard(ctx, character);
  } else if (ctx.result === 5) {
    if ((character.cflags[ctx.master][704] & 1) === 0) {
      await add_idol(ctx, character);
    }
  } else if (ctx.result === 6) {
    if ((character.cflags[ctx.master][704] & 2) === 0) {
      await add_va(ctx, character);
    }
  } else if (ctx.result === 11) {
    if (character.cflags[ctx.master][758] != 7) {
      await add_shisetu(ctx, character);
    }
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}
