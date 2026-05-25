/**
 * FUNC_HAIRSTYLE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_hairstyle(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[600] === 0) {
    ctx.print('검은');
  } else if (character.cflags[600] === 1) {
    ctx.print('짙은');
  } else if (character.cflags[600] === 2) {
    ctx.print('금');
  } else if (character.cflags[600] === 3) {
    ctx.print('은');
  } else if (character.cflags[600] === 4) {
    ctx.print('붉은');
  } else if (character.cflags[600] === 5) {
    ctx.print('푸른');
  } else if (character.cflags[600] === 6) {
    ctx.print('녹');
  } else if (character.cflags[600] === 7) {
    ctx.print('핑크');
  } else if (character.cflags[600] === 8) {
    ctx.print('보라');
  } else if (character.cflags[600] === 9 && character.cflags[601] === 0) {
    ctx.print('하얀');
  } else if (character.cflags[600] === 10) {
    ctx.print('갈');
  } else if (character.cflags[600] === 11) {
    ctx.print('연보라');
  } else if (character.cflags[600] === 12) {
    ctx.print('진주');
  } else if (character.cflags[600] === 13) {
    ctx.print('붉은 보라');
  } else if (character.cflags[600] === 14) {
    ctx.print('애쉬브라운');
  }
  ctx.print('색');
  if (character.cflags[601] === 1 && character.cflags[600] != 9) {
    ctx.print('으로 물들인');
  } else if (character.cflags[601] === 1 && character.cflags[600] === 9) {
    ctx.print('탈색한');
  } else {
    ctx.print('');
  }
  if (character.no === 80 || character.no ==210 || character.no ==212 || character.no === 100) {
    ctx.print('곱슬머리를');
  } else {
    ctx.print('머리를');
  }
  if (character.cflags[602] === 0) {
    ctx.print('쇼트로');
  } else if (character.cflags[602] === 1) {
    ctx.print('세미 롱으로');
  } else if (character.cflags[602] === 2) {
    ctx.print('보브로');
  } else if (character.cflags[602] === 3) {
    ctx.print('포니테일로');
  } else if (character.cflags[602] === 4) {
    ctx.print('트윈테일로');
  } else if (character.cflags[602] === 5) {
    ctx.print('스트레이트 롱으로');
  } else if (character.cflags[602] === 6) {
    ctx.print('올림머리로');
  } else if (character.cflags[602] === 7) {
    ctx.print('풍성한 파마로');
  } else if (character.cflags[602] === 8) {
    ctx.print('롱 웨이브로');
  } else if (character.cflags[602] === 9) {
    ctx.print('땋음머리로');
  } else if (character.cflags[602] === 10) {
    ctx.print('투 사이드 업으로');
  } else if (character.cflags[602] === 11) {
    ctx.print('트윈드릴테일로');
  } else if (character.cflags[602] === 12) {
    ctx.print('경단머리로');
  } else if (character.cflags[602] === 99) {
    ctx.print('승천 페가서스MIX 올림으로');
  }
  ctx.print('하고 있습니다');
}

export async function print_hairstyle_4count(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[ctx.count][600] === 0) {
    ctx.print('검은');
  } else if (character.cflags[ctx.count][600] === 1) {
    ctx.print('짙은');
  } else if (character.cflags[ctx.count][600] === 2) {
    ctx.print('금');
  } else if (character.cflags[ctx.count][600] === 3) {
    ctx.print('은');
  } else if (character.cflags[ctx.count][600] === 4) {
    ctx.print('붉은');
  } else if (character.cflags[ctx.count][600] === 5) {
    ctx.print('푸른');
  } else if (character.cflags[ctx.count][600] === 6) {
    ctx.print('녹');
  } else if (character.cflags[ctx.count][600] === 7) {
    ctx.print('핑크');
  } else if (character.cflags[ctx.count][600] === 8) {
    ctx.print('보라');
  } else if (character.cflags[ctx.count][600] === 9 && character.cflags[ctx.count][601] === 0) {
    ctx.print('하얀');
  } else if (character.cflags[ctx.count][600] === 10) {
    ctx.print('갈');
  } else if (character.cflags[ctx.count][600] === 11) {
    ctx.print('연보라');
  } else if (character.cflags[ctx.count][600] === 12) {
    ctx.print('진주');
  }
  ctx.print('색');
  if (character.cflags[ctx.count][601] === 1 && character.cflags[ctx.count][600] != 9) {
    ctx.print('으로 물들인');
  } else if (character.cflags[ctx.count][601] === 1 && character.cflags[ctx.count][600] === 9) {
    ctx.print('탈색한');
  } else {
    ctx.print('');
  }
  if (character.cflags[ctx.count][602] === 0) {
    ctx.print('쇼트');
    return 0;
  } else if (character.cflags[ctx.count][602] === 1) {
    ctx.print('세미 롱');
    return 1;
  } else if (character.cflags[ctx.count][602] === 2) {
    ctx.print('보브');
    return 0;
  } else if (character.cflags[ctx.count][602] === 3) {
    ctx.print('포니테일');
    return 1;
  } else if (character.cflags[ctx.count][602] === 4) {
    ctx.print('트윈테일');
    return 1;
  } else if (character.cflags[ctx.count][602] === 5) {
    ctx.print('스트레이트 롱');
    return 1;
  } else if (character.cflags[ctx.count][602] === 6) {
    ctx.print('올림');
    return 1;
  } else if (character.cflags[ctx.count][602] === 7) {
    ctx.print('풍성한 파마');
    return 0;
  } else if (character.cflags[ctx.count][602] === 8) {
    ctx.print('롱 웨이브');
    return 1;
  } else if (character.cflags[ctx.count][602] === 9) {
    ctx.print('땋은');
    return 1;
  } else if (character.cflags[ctx.count][602] === 10) {
    ctx.print('투 사이드 업');
    return 1;
  } else if (character.cflags[ctx.count][602] === 11) {
    ctx.print('트윈드릴테일');
    return 1;
  } else if (character.cflags[ctx.count][602] === 12) {
    ctx.print('경단');
    return 1;
  } else if (character.cflags[ctx.count][602] === 99) {
    ctx.print('승천 페가서스MIX 올림');
    return 1;
  }
}

export async function print_hairstyle_tailor(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[602] === 0) {
    ctx.print('쇼트');
    return 0;
  } else if (character.cflags[602] === 1) {
    ctx.print('세미 롱');
    return 1;
  } else if (character.cflags[602] === 2) {
    ctx.print('보브');
    return 0;
  } else if (character.cflags[602] === 3) {
    ctx.print('포니테일');
    return 1;
  } else if (character.cflags[602] === 4) {
    ctx.print('트윈테일');
    return 1;
  } else if (character.cflags[602] === 5) {
    ctx.print('스트레이트 롱');
    return 1;
  } else if (character.cflags[602] === 6) {
    ctx.print('올림머리');
    return 1;
  } else if (character.cflags[602] === 7) {
    ctx.print('풍성한 파마');
    return 0;
  } else if (character.cflags[602] === 8) {
    ctx.print('롱 웨이브');
    return 1;
  } else if (character.cflags[602] === 9) {
    ctx.print('땋음머리');
    return 1;
  } else if (character.cflags[602] === 10) {
    ctx.print('투 사이드 업');
    return 1;
  } else if (character.cflags[602] === 11) {
    ctx.print('트윈드릴테일');
    return 1;
  } else if (character.cflags[602] === 12) {
    ctx.print('경단머리');
    return 1;
  } else if (character.cflags[602] === 99) {
    ctx.print('승천 페가서스MIX 올림');
    return 1;
  }
}

export async function print_haircolor_tailor(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[600] === 0) {
    ctx.print('검은');
  } else if (character.cflags[600] === 1) {
    ctx.print('짙은');
  } else if (character.cflags[600] === 2) {
    ctx.print('금');
  } else if (character.cflags[600] === 3) {
    ctx.print('은');
  } else if (character.cflags[600] === 4) {
    ctx.print('붉은');
  } else if (character.cflags[600] === 5) {
    ctx.print('푸른');
  } else if (character.cflags[600] === 6) {
    ctx.print('녹');
  } else if (character.cflags[600] === 7) {
    ctx.print('핑크');
  } else if (character.cflags[600] === 8) {
    ctx.print('보라');
  } else if (character.cflags[600] === 9 && character.cflags[601] === 0) {
    ctx.print('하얀');
  } else if (character.cflags[600] === 10) {
    ctx.print('갈');
  } else if (character.cflags[600] === 11) {
    ctx.print('연보라');
  } else if (character.cflags[600] === 12) {
    ctx.print('진주');
  }
}
