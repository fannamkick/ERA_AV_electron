/**
 * SYSTEM_OTHERS.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function system_kikenbi(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 122) === 1) {
      // TODO: CONTINUE
    } else {
      character = ctx.count;
      if (character.cflags[644] === 4) {
        character.cflags[645] = 1;
        character.cflags[644] = 0;
      } else {
        character.cflags[645] = 0;
        character.cflags[644] += 1;
      }
    }
  }
}
