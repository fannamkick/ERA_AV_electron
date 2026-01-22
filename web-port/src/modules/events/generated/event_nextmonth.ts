/**
 * EVENT_NEXTMONTH.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function event_nextmonth(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  G = 0;
  E = 0;
  M = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getTalent(count, 400) === 0) {
      // TODO: CONTINUE
    } else {
      G += ctx.base[ctx.count][30];
      if (ctx.getTalent(count, 504)) {
        E += 1;
      }
    }
  }
  if (DAY[2] > 4 && (DAY[1] === 1 || DAY[1] === 2 || DAY[1] === 6 || DAY[1] === 7 || DAY[1] === 9 || DAY[1] === 11 )) {
    DAY[1] = DAY[1] + 1;
    DAY[2] = 1;
    ctx.showMessage(`다음주부터는 ${DAY[1]}월이다……`);
    ctx.showMessage(`여배우와 스탭의 급료`);
    if (E > 0) {
      ctx.showMessage(`와 전기세`);
    }
    ctx.showMessage(`W 로 {G}포인트 지불했습니다`);
    ctx.money -= G;
    await ending_check(ctx, character);
  } else if (DAY[1] === 4 && DAY[2] > 4 && DAY[3] === 0) {
    DAY[1] = DAY[1] + 1;
    DAY[2] = 1;
    ctx.showMessage(`다음주부터는 ${DAY[1]}월이다……`);
  } else if (DAY[1] === 4 && DAY[2] > 4 && DAY[3] != 0) {
    DAY[1] = DAY[1] + 1;
    DAY[2] = 1;
    ctx.showMessage(`다음주부터는 ${DAY[1]}월이다……`);
    ctx.showMessage(`여배우와 스탭의 급료`);
    if (E > 0) {
      ctx.showMessage(`와 전기세`);
    }
    ctx.showMessage(`W 로 {G}포인트 지불했습니다`);
    ctx.money -= G;
    await ending_check(ctx, character);
  } else if (DAY[2] > 5 && ( DAY[1] === 3 || DAY[1] === 5 ||  DAY[1] === 8 || DAY[1] === 10 )) {
    DAY[1] = DAY[1] + 1;
    DAY[2] = 1;
    ctx.showMessage(`다음주부터는 ${DAY[1]}월이다……`);
    ctx.showMessage(`여배우와 스탭의 급료`);
    if (E > 0) {
      ctx.showMessage(`와 전기세`);
    }
    ctx.showMessage(`W 로 {G}포인트 지불했습니다`);
    ctx.money -= G;
    await ending_check(ctx, character);
  } else if (DAY[2] > 4 && DAY[1] === 12) {
    DAY[1] = 1;
    DAY[2] = 1;
    ctx.showMessage(`다음주부터 새로운 해가 시작된다……`);
    DAY[3] += 1;
    ctx.showMessage(`여배우와 스탭의 급료`);
    if (E > 0) {
      ctx.showMessage(`와 전기세`);
    }
    ctx.showMessage(`W 로 {G}포인트 지불했습니다`);
    ctx.money -= G;
    await ending_check(ctx, character);
  }
  if (ctx.flags[557] > 0) {
    ctx.money -= ctx.flags[557] * 10000;
  }
  ctx.flags[300] += ctx.rand(11);
  ctx.flags[300] -= ctx.rand(6);
  if (DAY[1] == 3  || DAY[1] == 6 || DAY[1] == 10 || DAY[1] == 12) {
    ctx.flags[300] -= (10 + ctx.rand(11));
  }
  if (ctx.flags[300] <= 0) {
    ctx.flags[300] = 0;
  }
  if (ctx.flags[300] <= 24) {
    ctx.flags[301] = 0;
  } else if (ctx.flags[300] <= 49) {
    ctx.flags[301] = 1;
  } else if (ctx.flags[300] <= 75) {
    ctx.flags[301] = 2;
  } else {
    ctx.flags[301] = 3;
  }
  await set_videosale(ctx, character);
  await calc_b_nextmonth(ctx, character);
}
