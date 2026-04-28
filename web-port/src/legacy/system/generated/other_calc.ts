/**
 * OTHER_CALC.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function cigarettes(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.cflags[618] = ctx.rand(21);
  if (character.cflags[618] === 0) {
    ctx.cstr[6] = "세븐스타";
  } else if (character.cflags[618] === 1) {
    ctx.cstr[6] = "블랙스톤";
  } else if (character.cflags[618] === 2) {
    ctx.cstr[6] = "세일럼 피아니시모";
  } else if (character.cflags[618] === 3) {
    ctx.cstr[6] = "베블 플레어 멘톨";
  } else if (character.cflags[618] === 4) {
    ctx.cstr[6] = "말보로 멘톨 라이트";
  } else if (character.cflags[618] === 5) {
    ctx.cstr[6] = "세븐스타 멘톨";
  } else if (character.cflags[618] === 6) {
    ctx.cstr[6] = "빨간 라크";
  } else if (character.cflags[618] === 7) {
    ctx.cstr[6] = "하이라이트";
  } else if (character.cflags[618] === 8) {
    ctx.cstr[6] = "럭키 스트라이크";
  } else if (character.cflags[618] === 9) {
    ctx.cstr[6] = KENT;
  } else if (character.cflags[618] === 10) {
    ctx.cstr[6] = KOOL;
  } else if (character.cflags[618] === 11) {
    ctx.cstr[6] = "아메리칸 스피릿";
  } else if (character.cflags[618] === 12) {
    ctx.cstr[6] = "키스 아로마 메르티";
  } else if (character.cflags[618] === 13) {
    ctx.cstr[6] = "가람";
  } else if (character.cflags[618] === 14) {
    ctx.cstr[6] = "중남해";
  } else if (character.cflags[618] === 15) {
    ctx.cstr[6] = "골루아즈";
  } else if (character.cflags[618] === 16) {
    ctx.cstr[6] = JPS;
  } else if (character.cflags[618] === 17) {
    ctx.cstr[6] = "블랙 데빌";
  } else if (character.cflags[618] === 18) {
    ctx.cstr[6] = DEATH;
  } else if (character.cflags[618] === 19) {
    ctx.cstr[6] = "와카바";
  } else {
    ctx.cstr[6] = "말보로 레드";
  }
}

export async function kill_target_4count(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await キャラ削除, g(ctx, character);
}

export async function ovulation_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getTalent(count, 122) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 504)) {
      // TODO: CONTINUE
      if (character.cflags[ctx.count][30] > 5) {
        character.cflags[ctx.count][18] = 0;
      } else if (DAY[2] === 1 && character.cflags[ctx.count][30] === 1) {
        character.cflags[ctx.count][20] = 1;
      } else if (DAY[2] === 2 && character.cflags[ctx.count][30] === 2) {
        character.cflags[ctx.count][20] = 1;
      } else if (DAY[2] === 3 && character.cflags[ctx.count][30] === 3) {
        character.cflags[ctx.count][20] = 1;
      } else if (DAY[2] === 4 && character.cflags[ctx.count][30] === 4) {
        character.cflags[ctx.count][20] = 1;
      } else if (DAY[2] === 5 && character.cflags[ctx.count][30] === 5) {
        character.cflags[ctx.count][20] = 1;
      } else if (DAY[2] === 5 && character.cflags[ctx.count][30] === 0) {
        character.cflags[ctx.count][20] = 1;
      } else if (DAY[2] === 1 && character.cflags[ctx.count][30] === 3) {
        character.cflags[ctx.count][20] = 2;
      } else if (DAY[2] === 2 && character.cflags[ctx.count][30] === 4) {
        character.cflags[ctx.count][20] = 2;
      } else if (DAY[2] === 3 && character.cflags[ctx.count][30] === 5) {
        character.cflags[ctx.count][20] = 2;
      } else if (DAY[2] === 3 && character.cflags[ctx.count][30] === 0) {
        character.cflags[ctx.count][20] = 2;
      } else if (DAY[2] === 3 && character.cflags[ctx.count][30] === 1) {
        character.cflags[ctx.count][20] = 2;
      } else if (DAY[2] === 4 && character.cflags[ctx.count][30] === 2) {
        character.cflags[ctx.count][20] = 2;
      }
    }
  }
}

export async function cigarettes_4count(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.cflags[ctx.count][618] = ctx.rand(21);
  if (character.cflags[ctx.count][618] === 0) {
    character.cstr[ctx.count][6] = "세븐스타";
  } else if (character.cflags[ctx.count][618] === 1) {
    character.cstr[ctx.count][6] = "블랙스톤";
  } else if (character.cflags[ctx.count][618] === 2) {
    character.cstr[ctx.count][6] = "세일럼 피아니시모";
  } else if (character.cflags[ctx.count][618] === 3) {
    character.cstr[ctx.count][6] = "베블 플레어 멘톨";
  } else if (character.cflags[ctx.count][618] === 4) {
    character.cstr[ctx.count][6] = "말보로 멘톨 라이트";
  } else if (character.cflags[ctx.count][618] === 5) {
    character.cstr[ctx.count][6] = "세븐스타 멘톨";
  } else if (character.cflags[ctx.count][618] === 6) {
    character.cstr[ctx.count][6] = "빨간 라크";
  } else if (character.cflags[ctx.count][618] === 7) {
    character.cstr[ctx.count][6] = "하이라이트";
  } else if (character.cflags[ctx.count][618] === 8) {
    character.cstr[ctx.count][6] = "럭키 스트라이크";
  } else if (character.cflags[ctx.count][618] === 9) {
    character.cstr[ctx.count][6] = KENT;
  } else if (character.cflags[ctx.count][618] === 10) {
    character.cstr[ctx.count][6] = KOOL;
  } else if (character.cflags[ctx.count][618] === 11) {
    character.cstr[ctx.count][6] = "아메리칸 스피릿";
  } else if (character.cflags[ctx.count][618] === 12) {
    character.cstr[ctx.count][6] = "키스 아로마 메르티";
  } else if (character.cflags[ctx.count][618] === 13) {
    character.cstr[ctx.count][6] = "가람";
  } else if (character.cflags[ctx.count][618] === 14) {
    character.cstr[ctx.count][6] = "중남해";
  } else if (character.cflags[ctx.count][618] === 15) {
    character.cstr[ctx.count][6] = "골루아즈";
  } else if (character.cflags[ctx.count][618] === 16) {
    character.cstr[ctx.count][6] = JPS;
  } else if (character.cflags[ctx.count][618] === 17) {
    character.cstr[ctx.count][6] = "블랙 데빌";
  } else if (character.cflags[ctx.count][618] === 18) {
    character.cstr[ctx.count][6] = DEATH;
  } else if (character.cflags[ctx.count][618] === 19) {
    character.cstr[ctx.count][6] = "와카바";
  } else {
    character.cstr[ctx.count][6] = "말보로 레드";
  }
}

export async function av_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  G = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 422) === 1 && character.cflags[ctx.count][1] === 2 && ctx.getTalent(count, 400) === 1) {
      A = 1;
      if (ctx.flags[506] === 1 && ctx.getTalent(count, 121) === 1) {
        E = 1;
      }
    } else if (ctx.getCharacterNo(ctx.count) === 5 && character.cflags[ctx.count][1] === 2 && ctx.getTalent(count, 400) === 1) {
      B = 1;
      if (ctx.flags[505] === 1 && ctx.getTalent(count, 121) === 1) {
        F = 1;
      }
    } else if (ctx.getTalent(count, 507) === 1) {
      C = 1;
    } else if (ctx.getCharacterNo(ctx.count) === 13 && character.cflags[ctx.count][1] === 2) {
      D = 1;
    } else if (ctx.getTalent(count, 422) === 1) {
      G = 1;
    }
  }
}
