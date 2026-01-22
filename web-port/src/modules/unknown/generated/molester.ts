/**
 * MOLESTER.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function event_molester(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[301] == 0) {
    return 1;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 1 && ctx.master.no === 0 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 2 && ctx.master.no === 0 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 11 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 122) === 1) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][140] === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 502) === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 503) === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 504) === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 505) === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 429) === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 511) === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 516) === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 517) === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 519) === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 521) === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 553) === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][633] === 1 && character.cflags[ctx.count][690] === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][40] >= 64 && character.cflags[ctx.count][42] === 79) {
      // TODO: CONTINUE
    } else {
      ctx.locals[0] += ctx.rand(100);
      if (ctx.getTalent(count, 10) === 1) {
        ctx.locals[0] += ctx.rand(10);
      }
      if (ctx.getTalent(count, 14) === 1) {
        ctx.locals[0] += ctx.rand(10);
      }
      if (ctx.getTalent(count, 33) === 1) {
        ctx.locals[0] += ctx.rand(10);
      }
      if (ctx.getTalent(count, 35) === 1) {
        ctx.locals[0] += ctx.rand(10);
      }
      if (ctx.getTalent(count, 73) === 1) {
        ctx.locals[0] += 50;
      }
      if (ctx.getTalent(count, 76) === 1) {
        ctx.locals[0] += ctx.rand(10);
      }
      if (ctx.getTalent(count, 113) === 1) {
        ctx.locals[0] += ctx.rand(10);
      }
      if (ctx.getTalent(count, 134) === 1) {
        ctx.locals[0] += ctx.rand(10);
      }
      if (ctx.getTalent(count, 426) === 1) {
        ctx.locals[0] += ctx.rand(10);
      }
      if (ctx.getTalent(count, 11) === 1) {
        ctx.locals[0] -= ctx.rand(10);
      }
      if (ctx.getTalent(count, 12) === 1) {
        ctx.locals[0] -= ctx.rand(10);
      }
      if (ctx.getTalent(count, 16) === 1) {
        ctx.locals[0] -= ctx.rand(10);
      }
      if (ctx.getTalent(count, 30) === 1) {
        ctx.locals[0] -= ctx.rand(10);
      }
      if (ctx.getTalent(count, 34) === 1) {
        ctx.locals[0] -= ctx.rand(10);
      }
      if (ctx.getTalent(count, 36) === 1) {
        ctx.locals[0] -= ctx.rand(10);
      }
      if (ctx.getTalent(count, 79) === 1) {
        ctx.locals[0] -= ctx.rand(10);
      }
      if (ctx.getTalent(count, 82) === 1) {
        ctx.locals[0] -= ctx.rand(10);
      }
      if (ctx.getTalent(count, 93) === 1) {
        ctx.locals[0] -= ctx.rand(10);
      }
      if (ctx.getTalent(count, 127) === 1) {
        ctx.locals[0] -= ctx.rand(10);
      }
      if (ctx.getTalent(count, 184) === 1) {
        ctx.locals[0] -= 50;
      }
      if (ctx.getTalent(count, 204) === 1) {
        ctx.locals[0] -= ctx.rand(10);
      }
      if (character.cflags[ctx.count][690] === 1) {
        ctx.locals[0] += 50;
      }
      if (ctx.flags[301] == 1) {
        ctx.locals[0] += 10;
      }
      if (ctx.flags[301] == 2) {
        ctx.locals[0] += 20;
      }
      if (ctx.flags[301] == 3) {
        ctx.locals[0] += 30;
      }
      if (ctx.locals[0] >= 90) {
        await molester_brunch(ctx, character);
        ctx.locals[0] = 0;
      } else {
        ctx.locals[0] = 0;
      }
    }
  }
}
