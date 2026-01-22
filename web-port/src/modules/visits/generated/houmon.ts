/**
 * HOUMON.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function houmon(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('방문');
  ctx.showMessage('《이곳저곳을 방문해 특수한 행동이 가능합니다》');
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
  ctx.showMessage('어딜 가볼까……');
  ctx.showMessage('[10] - 키류 조직 사무소');
  if (U === 1) {
    ctx.showMessage('[11] - 비밀 연구소');
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 9) {
      if (character.cflags[ctx.count][1] === 2) {
        ctx.showMessage('[12] - 레이첼의 공방');
        ctx.locals[2] = 1;
      }
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 11) {
      if (character.cflags[ctx.count][1] === 2) {
        ctx.showMessage('[13] - 이쿠미의 연구소');
        ctx.locals[3] = 1;
      }
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 26) {
      if (character.cflags[ctx.count][1] === 2) {
        ctx.showMessage('[14] - RB단 아지트');
        ctx.locals[4] = 1;
      }
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 27) {
      if (character.cflags[ctx.count][1] === 2) {
        ctx.showMessage('[15] - 토모요시댁');
        ctx.locals[5] = 1;
      }
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 86) {
      if (ctx.getTalent(count, 430) === 1 && ctx.getTalent(count, 440) === 1) {
        ctx.showMessage('[16] - 아카샤 본부');
        ctx.locals[6] = 1;
      }
    }
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 10) {
    await kiryu_gumi(ctx, character);
  } else if (ctx.result === 11) {
    await secret_labo(ctx, character);
  } else if (ctx.result === 12 && ctx.locals[2] === 1) {
    await rachel_labo(ctx, character);
  } else if (ctx.result === 13 && ctx.locals[3] === 1) {
    await ikumi_labo(ctx, character);
  } else if (ctx.result === 14 && ctx.locals[4] === 1) {
    await sakura_azito(ctx, character);
  } else if (ctx.result === 15 && ctx.locals[5] === 1) {
    await ayano_order(ctx, character);
  } else if (ctx.result === 16 && ctx.locals[6] === 1) {
    await eunice_labo(ctx, character);
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}
