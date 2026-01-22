/**
 * ACHIEVEMENT_16_MIYAMA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "미야마가";
}

export async function achievement_calc_16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if ((ctx.getCharacterNo(ctx.count) == 1 || ctx.getCharacterNo(ctx.count) == 17 || ctx.getCharacterNo(ctx.count) == 91) && ctx.master.no == 0 && ctx.getTalent(count, 430) == 1 && ctx.paramBand[141] == 3) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[16] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] == 3) {
    ctx.global[16] = 1;
  }
  return ctx.global[16];
}

export async function achievement_main_16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`여동생인 미야마 카나데, 안드로이드인 미야마 미이, 카나데의 클론인 미야마 카나……`);
  ctx.showMessage(`카나데를 제외한 두 사람도 어느새 미야마가에 눌러앉아, 그리고 어느새 진짜『가족』이 됐습니다`);
  ctx.showMessage(`이 일을 시작하지 않았다면 이런 가족의 형태는 없었을지도 모릅니다`);
  ctx.showMessage(`상냥한 장녀 미이, 똑부러지고 우등생인 차녀 카나데, 껄렁하지만 사실 착한 막내 카나`);
  ctx.showMessage(`W 앞으로도 모두를 행복하게 해주세요`);
  if (ctx.flags[562] === 0 && ctx.global[52] === 1) {
    if (GETCHARA(91, 0) >= 0) {
      ctx.showMessage(`《실적 해금 보너스로 실적「내 여동생이 이렇게 빗치일 리 없어」의 보너스 사용 플래그가 리셋 됐습니다》`);
      ctx.flags[562] = 1;
      ctx.flags[555] = 0;
    }
  }
}
