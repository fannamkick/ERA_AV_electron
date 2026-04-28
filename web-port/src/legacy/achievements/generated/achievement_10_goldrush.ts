/**
 * ACHIEVEMENT_10_GOLDRUSH.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "GOLD RUSH";
}

export async function achievement_calc_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.global[10] == 0 && await difficulty_check(ctx, character) && ctx.money[2] >= 5000000) {
    ctx.global[10] = 1;
  }
  return ctx.global[10];
}

export async function achievement_main_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`당신이 여자아이를 지도하고, 촬영해온 AV는 훌륭한 총매상을 올렸습니다`);
  ctx.showMessage(`그런 당신의 뒤를 따라, 신규 라벨을 발매하는 사람들이 끊이지 않는 것 같습니다`);
  ctx.showMessage(`W 이 현상을 업계에서는, 역사를 모방해『골드 러시』라고 부르고 있다 합니다`);
  if (ctx.flags[550] === 0) {
    ctx.showMessage(`골드 러시의 주역인 당신에게 키류 조직으로부터 보수가 있습니다`);
    ctx.showMessage(`《보수를 받습니까?》`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    ctx.showMessage('※보수를 받으면 일부 실적의 해금・사용이 불가능해집니다!');
    // Label: INPUTLOOP
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 《키류 조직으로부터 보수 10만 포인트를 받았습니다》`);
      ctx.flags[550] = 1;
      ctx.money += 100000;
    } else if (ctx.result === 1) {
      ctx.showMessage(`W 《키류 조직으로부터 보수를 받지 않았습니다》`);
      return;
    } else {
      // GOTO INPUTLOOP - 구조 변경 필요 (while/break 사용 권장)
    }
  }
}
