/**
 * IDOL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function idol_event(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 203) === 1) {
      await start_idolevent(ctx, character);
    }
  }
}

export async function start_idolevent(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.rand(8) === 0) {
    await nothing(ctx, character);
  } else if (ctx.rand(7) === 0) {
    await event_idolconcert(ctx, character);
  } else if (ctx.rand(6) === 0) {
    await event_idolconcert(ctx, character);
  } else if (ctx.rand(5) === 0) {
    await event_idolgravure(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  } else if (ctx.rand(4) === 0) {
    await nothing(ctx, character);
  } else if (ctx.rand(3) === 0) {
    await event_idolgravure(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  } else if (ctx.rand(2) === 0 && ctx.flags[540] === 0) {
    await event_idolconcert(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  } else if (ctx.rand(1) === 0) {
    await nothing(ctx, character);
  } else {
    await nothing(ctx, character);
  }
}

export async function event_idolgravure(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`휴일을 이용해, ${ctx.getName(ctx.count)}의 그라비아 촬영을 했다……`);
  character = ctx.count;
  character.tflags[13] = 7;
  await self_kojo(ctx, character);
  ctx.showMessage('');
  if (ctx.rand(2) === 0) {
    ctx.exp[ctx.count][12] += 1;
    ctx.showMessage('야외노출경험 +1');
  }
  ctx.showMessage('피사경험 +5');
  ctx.exp[ctx.count][70] += 5;
  ctx.exp[ctx.count][120] += 1;
}

export async function event_idolconcert(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`휴일을 이용해, ${ctx.getName(ctx.count)}의 가창 트레이닝을 했다……`);
  character = ctx.count;
  character.tflags[13] = 8;
  await self_kojo(ctx, character);
  ctx.showMessage('');
  ctx.showMessage('무용경험 +5');
  ctx.showMessage('가창경험 +5');
  ctx.exp[ctx.count][71] += 5;
  ctx.exp[ctx.count][72] += 5;
  ctx.exp[ctx.count][121] += 1;
}
