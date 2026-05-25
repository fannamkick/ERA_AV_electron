/**
 * FUNC_SHOES.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_shoestype(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[170] === 0 && character.cflags[171] != 0) {
    ctx.showMessage(`맨발`);
  } else if (character.cflags[170] === 1) {
    ctx.showMessage(`발목양말`);
  } else if (character.cflags[170] === 2) {
    ctx.showMessage(`학교지정 양말`);
  } else if (character.cflags[170] === 3) {
    ctx.showMessage(`하이삭스`);
  } else if (character.cflags[170] === 4) {
    ctx.showMessage(`루즈삭스`);
  } else if (character.cflags[170] === 5) {
    ctx.showMessage(`니삭스`);
  } else if (character.cflags[170] === 6) {
    ctx.showMessage(`검은 스타킹`);
  } else if (character.cflags[170] === 7) {
    ctx.showMessage(`가터 스타킹`);
  } else if (character.cflags[170] === 8) {
    ctx.showMessage(`망사 스타킹`);
  } else if (character.cflags[170] === 9) {
    ctx.showMessage(`하얀 스타킹`);
  } else if (character.cflags[170] === 99) {
    ctx.showMessage(`유리 니삭스`);
  } else {
    ctx.showMessage(``);
  }
  if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
    ctx.showMessage(``);
  } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
    ctx.showMessage(``);
  } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
    ctx.showMessage(``);
  } else if (character.cflags[170] === 99 && character.cflags[40] != 0) {
    ctx.showMessage(``);
  } else if (character.cflags[170] != 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
    ctx.showMessage(``);
  } else {
    ctx.showMessage(`에`);
  }
  if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
    ctx.showMessage(``);
  } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
    ctx.showMessage(`맨발`);
  } else if (character.cflags[171] === 1 && character.cflags[170] != 99) {
    ctx.showMessage(`스니커`);
  } else if (character.cflags[171] === 2 && character.cflags[170] != 99) {
    ctx.showMessage(`학교 지정 로퍼`);
  } else if (character.cflags[171] === 3 && character.cflags[170] != 99) {
    ctx.showMessage(`펌프스`);
  } else if (character.cflags[171] === 4 && character.cflags[170] != 99) {
    ctx.showMessage(`하이힐`);
  } else if (character.cflags[171] === 5 && character.cflags[170] != 99) {
    ctx.showMessage(`샌들`);
  } else if (character.cflags[171] === 6 && character.cflags[170] != 99) {
    ctx.showMessage(`비치샌들`);
  } else if (character.cflags[171] === 7 && character.cflags[170] != 99) {
    ctx.showMessage(`간호사샌들`);
  } else if (character.cflags[171] === 8 && character.cflags[170] != 99) {
    ctx.showMessage(`펄핑크뮬`);
  } else if (character.cflags[171] === 9 && character.cflags[170] != 99) {
    ctx.showMessage(`게타`);
  } else if (character.cflags[171] === 10 && character.cflags[170] != 99) {
    ctx.showMessage(`털슬리퍼`);
  } else if (character.cflags[171] === 11 && character.cflags[170] != 99) {
    ctx.showMessage(`어째서인지 화장실 슬리퍼`);
  } else if (character.cflags[171] === 12 && character.cflags[170] != 99) {
    ctx.showMessage(`끈부츠`);
  } else if (character.cflags[171] === 13 && character.cflags[170] != 99) {
    ctx.showMessage(`카우보이부츠`);
  } else if (character.cflags[171] === 14 && character.cflags[170] != 99) {
    ctx.showMessage(`핀힐 니하이부츠`);
  } else if (character.cflags[171] === 15 && character.cflags[170] != 99) {
    ctx.showMessage(`크록스`);
  }
}

export async function print_shoestype_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[170] === 0 && character.cflags[171] != 0) {
    ctx.showMessage(`맨발`);
    return 1;
  } else if (character.cflags[170] === 1) {
    ctx.showMessage(`발목양말`);
    return 1;
  } else if (character.cflags[170] === 2) {
    ctx.showMessage(`학교지정 양말`);
    return 1;
  } else if (character.cflags[170] === 3) {
    ctx.showMessage(`하이삭스`);
    return 0;
  } else if (character.cflags[170] === 4) {
    ctx.showMessage(`루즈삭스`);
    return 0;
  } else if (character.cflags[170] === 5) {
    ctx.showMessage(`니삭스`);
    return 0;
  } else if (character.cflags[170] === 6) {
    ctx.showMessage(`검은 스타킹`);
    return 1;
  } else if (character.cflags[170] === 7) {
    ctx.showMessage(`가터 스타킹`);
    return 1;
  } else if (character.cflags[170] === 8) {
    ctx.showMessage(`망사 스타킹`);
    return 1;
  } else if (character.cflags[170] === 9) {
    ctx.showMessage(`하얀 스타킹`);
    return 1;
  } else if (character.cflags[170] === 99) {
    ctx.showMessage(`유리 니삭스`);
    return 0;
  } else {
    ctx.showMessage(``);
  }
}

export async function print_shoestype_main2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] === 0) {
    ctx.showMessage(``);
  } else if (character.cflags[170] === 0 && character.cflags[171] === 0 && character.cflags[40] != 0) {
    ctx.showMessage(`맨발`);
    return 1;
  } else if (character.cflags[171] === 1 && character.cflags[170] != 99) {
    ctx.showMessage(`스니커`);
    return 0;
  } else if (character.cflags[171] === 2 && character.cflags[170] != 99) {
    ctx.showMessage(`학교 지정 로퍼`);
    return 0;
  } else if (character.cflags[171] === 3 && character.cflags[170] != 99) {
    ctx.showMessage(`펌프스`);
    return 0;
  } else if (character.cflags[171] === 4 && character.cflags[170] != 99) {
    ctx.showMessage(`하이힐`);
    return 1;
  } else if (character.cflags[171] === 5 && character.cflags[170] != 99) {
    ctx.showMessage(`샌들`);
    return 1;
  } else if (character.cflags[171] === 6 && character.cflags[170] != 99) {
    ctx.showMessage(`비치샌들`);
    return 1;
  } else if (character.cflags[171] === 7 && character.cflags[170] != 99) {
    ctx.showMessage(`간호사샌들`);
    return 1;
  } else if (character.cflags[171] === 8 && character.cflags[170] != 99) {
    ctx.showMessage(`펄핑크뮬`);
    return 1;
  } else if (character.cflags[171] === 9 && character.cflags[170] != 99) {
    ctx.showMessage(`게타`);
    return 0;
  } else if (character.cflags[171] === 10 && character.cflags[170] != 99) {
    ctx.showMessage(`털슬리퍼`);
    return 0;
  } else if (character.cflags[171] === 11 && character.cflags[170] != 99) {
    ctx.showMessage(`어째서인지 화장실 슬리퍼`);
    return 0;
  } else if (character.cflags[171] === 12 && character.cflags[170] != 99) {
    ctx.showMessage(`끈부츠`);
    return 0;
  } else if (character.cflags[171] === 13 && character.cflags[170] != 99) {
    ctx.showMessage(`카우보이부츠`);
    return 0;
  } else if (character.cflags[171] === 14 && character.cflags[170] != 99) {
    ctx.showMessage(`핀힐 니하이부츠`);
    return 0;
  } else if (character.cflags[171] === 15 && character.cflags[170] != 99) {
    ctx.showMessage(`크록스`);
    return 0;
  }
}
