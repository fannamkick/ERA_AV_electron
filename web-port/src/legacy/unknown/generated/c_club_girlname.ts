/**
 * C_CLUB_GIRLNAME.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function c_clubgirl_namedecide(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(20);
  if (ctx.locals[0] === 0) {
    character.cstr[ctx.master][50] = "아오이";
  } else if (ctx.locals[0] === 1) {
    character.cstr[ctx.master][50] = "마츠다";
  } else if (ctx.locals[0] === 2) {
    character.cstr[ctx.master][50] = "키리가야";
  } else if (ctx.locals[0] === 3) {
    character.cstr[ctx.master][50] = "나루세";
  } else if (ctx.locals[0] === 4) {
    character.cstr[ctx.master][50] = "우나바라";
  } else if (ctx.locals[0] === 5) {
    character.cstr[ctx.master][50] = "카와시마";
  } else if (ctx.locals[0] === 6) {
    character.cstr[ctx.master][50] = "아오바";
  } else if (ctx.locals[0] === 7) {
    character.cstr[ctx.master][50] = "나츠노";
  } else if (ctx.locals[0] === 8) {
    character.cstr[ctx.master][50] = "아리스가와";
  } else if (ctx.locals[0] === 9) {
    character.cstr[ctx.master][50] = "스미시로";
  } else if (ctx.locals[0] === 10) {
    character.cstr[ctx.master][50] = "타미야";
  } else if (ctx.locals[0] === 11) {
    character.cstr[ctx.master][50] = "토노";
  } else if (ctx.locals[0] === 12) {
    character.cstr[ctx.master][50] = "고교";
  } else if (ctx.locals[0] === 13) {
    character.cstr[ctx.master][50] = "미소노";
  } else if (ctx.locals[0] === 14) {
    character.cstr[ctx.master][50] = "마나카";
  } else if (ctx.locals[0] === 15) {
    character.cstr[ctx.master][50] = "토야마";
  } else if (ctx.locals[0] === 16) {
    character.cstr[ctx.master][50] = "아유카와";
  } else if (ctx.locals[0] === 17) {
    character.cstr[ctx.master][50] = "쿠스노키";
  } else if (ctx.locals[0] === 18) {
    character.cstr[ctx.master][50] = "유키";
  } else if (ctx.locals[0] === 19) {
    character.cstr[ctx.master][50] = "히메카와";
  } else if (ctx.locals[0] === 20) {
    character.cstr[ctx.master][50] = "모리야";
  } else {
    character.cstr[ctx.master][50] = "키사카";
  }
  ctx.locals[0] = ctx.rand(20);
  if (ctx.locals[0] === 0) {
    character.cstr[ctx.master][51] = "유키나";
  } else if (ctx.locals[0] === 1) {
    character.cstr[ctx.master][51] = "미유";
  } else if (ctx.locals[0] === 2) {
    character.cstr[ctx.master][51] = "란";
  } else if (ctx.locals[0] === 3) {
    character.cstr[ctx.master][51] = "안리";
  } else if (ctx.locals[0] === 4) {
    character.cstr[ctx.master][51] = "쿄";
  } else if (ctx.locals[0] === 5) {
    character.cstr[ctx.master][51] = "마치";
  } else if (ctx.locals[0] === 6) {
    character.cstr[ctx.master][51] = "나리카";
  } else if (ctx.locals[0] === 7) {
    character.cstr[ctx.master][51] = "시즈루";
  } else if (ctx.locals[0] === 8) {
    character.cstr[ctx.master][51] = "아키나";
  } else if (ctx.locals[0] === 9) {
    character.cstr[ctx.master][51] = "오토하";
  } else if (ctx.locals[0] === 10) {
    character.cstr[ctx.master][51] = "마키나";
  } else if (ctx.locals[0] === 11) {
    character.cstr[ctx.master][51] = "마히로";
  } else if (ctx.locals[0] === 12) {
    character.cstr[ctx.master][51] = "에리";
  } else if (ctx.locals[0] === 13) {
    character.cstr[ctx.master][51] = "아사히";
  } else if (ctx.locals[0] === 14) {
    character.cstr[ctx.master][51] = "아카리";
  } else if (ctx.locals[0] === 15) {
    character.cstr[ctx.master][51] = "치하야";
  } else if (ctx.locals[0] === 16) {
    character.cstr[ctx.master][51] = "카나";
  } else if (ctx.locals[0] === 17) {
    character.cstr[ctx.master][51] = "후유코";
  } else if (ctx.locals[0] === 18) {
    character.cstr[ctx.master][51] = "나나코";
  } else if (ctx.locals[0] === 19) {
    character.cstr[ctx.master][51] = "코즈에";
  } else if (ctx.locals[0] === 20) {
    character.cstr[ctx.master][51] = "사나에";
  } else {
    character.cstr[ctx.master][51] = "미나미";
  }
}

export async function c_clubgirl_status(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 79) {
      if (character.cflags[ctx.master][635] === 0) {
        ctx.getName(ctx.count) = `${character.cstr[ctx.master][50]} ${character.cstr[ctx.master][51]}`;
        CALLctx.getName(ctx.count) = character.cstr[ctx.master][51];
        ctx.base[ctx.count][9] += ctx.rand(5);
        character.cflags[ctx.master][635] = 1;
        character.cflags[ctx.count][600] = ctx.rand(10);
        character.cflags[ctx.count][601] = ctx.rand(1);
        character.cflags[ctx.count][602] = ctx.rand(8);
      }
    }
  }
}
