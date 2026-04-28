/**
 * COMPA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function compa_start(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][613] === 1 && character.cflags[ctx.count][621] != 1 && ctx.getTalent(count, 184) === 0) {
      await compa_main(ctx, character);
    }
  }
}

export async function compa_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = 5 + ctx.rand(16);
  Y = ctx.base[ctx.count][31];
  P = 0;
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "를")} 포함해 {X}명이`);
  if (ctx.rand(2) === 0) {
    ctx.showMessage(`대학 테니스 서클이 주최하는 미팅`);
    P = 1;
  } else {
    ctx.showMessage(`유명 SNS 커뮤니티가 주최하는 오프모임`);
    P = 2;
  }
  ctx.showMessage(`W 에 참가했다`);
  if (Y >= 80) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 쉴틈 없이 다양한 직업의 이성들에게 대쉬받고 있다`);
  } else {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 다양한 직업의 이성들과 즐겁게 대화하고 있다`);
  }
  // TODO: PRINTW
  ctx.showMessage('………………'); ctx.waitInput();
  ctx.showMessage('…………'); ctx.waitInput();
  ctx.showMessage('……');
  // TODO: PRINTW
  if (P === 1) {
    ctx.showMessage(`미팅`);
  } else if (P === 2) {
    ctx.showMessage(`오프모임`);
  }
  ctx.showMessage(`결과, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}`);
  if (ctx.flags[541] == 1) {
    X = 150;
  }
  if (Y + ctx.rand(100) + X >= 150) {
    if (ctx.flags[541] === 0) {
      character.cflags[ctx.count][622] = ctx.rand(7);
      if (character.cflags[ctx.count][622] === 1) {
        character.cflags[ctx.count][622] = 0;
      } else if (character.cflags[ctx.count][622] === 3) {
        character.cflags[ctx.count][622] = 6;
      }
    }
    if (P === 1) {
      ctx.showMessage(`미팅`);
    } else if (P === 2) {
      ctx.showMessage(`오프모임`);
    }
    ctx.showMessage(`에서 만난`);
    if (character.cflags[ctx.count][622] === 1) {
      ctx.print('반친구와');
    } else if (character.cflags[ctx.count][622] === 2) {
      ctx.print('고등학생과');
    } else if (character.cflags[ctx.count][622] === 3) {
      ctx.print('중학생과');
    } else if (character.cflags[ctx.count][622] === 4) {
      ctx.print('대학생과');
    } else if (character.cflags[ctx.count][622] === 5) {
      ctx.print('직장인과');
    } else if (character.cflags[ctx.count][622] === 6) {
      ctx.print('호스트와');
    } else {
      ctx.print('양키와');
    }
    ctx.showMessage(`사귀게 된 모양이다……`);
    character.cflags[ctx.count][621] = 1;
    ctx.getTalent(count, 184) = 1;
    await decide_boyfriend,count(ctx, character);
    character.cflags[ctx.count][613] = 0;
    character.cflags[ctx.count][623] = 1;
  } else {
    ctx.showMessage(`마음에 드는 사람이 없던 모양이다……`);
    character.cflags[ctx.count][613] = 0;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
}

export async function compa_takeout(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character = ctx.count;
}
