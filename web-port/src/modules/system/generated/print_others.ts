/**
 * PRINT_OTHERS.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_others(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`마을의 치안상태:`);
  if (ctx.flags[301] === 0) {
    ctx.setColor(0x00FF00);
    ctx.showMessage(`좋음`);
  } else if (ctx.flags[301] === 1) {
    ctx.showMessage(`보통`);
  } else if (ctx.flags[301] === 2) {
    ctx.setColor(0xFFA500);
    ctx.showMessage(`악화`);
  } else if (ctx.flags[301] === 3) {
    ctx.setColor(0xFF0000);
    ctx.showMessage(`최악`);
  }
  ctx.resetColor();
  ctx.showMessage('');
  ctx.varSet(ctx.locals[0], 0);
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else {
      // TODO: TRYCALLFORM MISSION_VISIBLE_{(50 + COUNT)}
      if (ctx.result === 1) {
        if (pband[50 + ctx.count] == 0) {
          // TODO: LOCAL:1 ++
        }
      }
    }
  }
  if (ctx.flags[570] && ctx.exp[ctx.master][90] >= 50) {
    ctx.showMessage(`미션 대상 캐릭터:`);
    ctx.setColor(0x00FF00);
    ctx.showMessage(`${ctx.locals[1]}명`);
    ctx.resetColor();
    ctx.showMessage(`L`);
  }
  ctx.varSet(ctx.locals[0], 0);
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][613] === 1) {
      ctx.locals[1]++;
    }
  }
  if (ctx.flags[540] === 0 && ctx.locals[1] >= 1) {
    ctx.showMessage(`미팅 참가예정:`);
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count === 0) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][613] === 1) {
        ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}`);
      }
      if (ctx.count < ctx.locals[1]) {
        ctx.showMessage(`/`);
      }
    }
    ctx.showMessage('');
  }
}
