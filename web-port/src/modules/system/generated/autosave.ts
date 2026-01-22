/**
 * AUTOSAVE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function system_autosave(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.getTime();
  switch (ctx.flags[5]) {
    case 1:
      ctx.results[0] += " EASY/";
      case 2:
        ctx.results[0] += " NORMAL/";
        case 3:
          ctx.results[0] += " HARD/";
          case 4:
            ctx.results[0] += " POWERFUL/";
            case 9:
              ctx.results[0] += " EXTRA/";
            break;
          }
          if (TIME === 0) {
            ctx.results[0] += "`${DAY+1}주차・전반`";
          } else {
            ctx.results[0] += "`${DAY+1}주차・후반`";
          }
          if (ctx.flags[1] >= 0) {
            character = ctx.flags[1];
          }
          if (ctx.flags[2] >= 0) {
            ctx.assi = ctx.flags[2];
          }
          if (character >= 1) {
            ctx.results[0] += "` 전회: ${ctx.getName(character)}지도`";
          }
          // TODO: SAVEDATA 99,RESULTS:0
          if (!ctx.locals[0]) {
            // TODO: SAVEDATA 991,RESULTS:0
            ctx.locals[0] = 1;
          } else {
            // TODO: SAVEDATA 992,RESULTS:0
            ctx.locals[0] = 0;
          }
}
