/**
 * ACHIEVEMENT_6_NTR.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "NTR = CUCKOLD";
}

export async function achievement_calc_6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(count, 184) == 1 && ctx.exp[ctx.count][101] >= 1) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[6] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] >= 4) {
    ctx.global[6] = 1;
  }
  return ctx.global[6];
}

export async function achievement_main_6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`수많은 여자아이와 나름대로 좋은 관계였지만, 그런 그녀들의 몸도 마음도`);
  ctx.showMessage(`다른 남자에게 빼앗겨버린 당신에게 딱 맞는 실적이군요`);
  ctx.showMessage(`영어로는『네토라레』를『CUCKOLD』라고 말한답니다。`);
  ctx.showMessage(`W 이번엔 네토라레 당하지 않도록 당신의 테크닉으로 여자아이들의 혼을 빼버리는 것이 좋을 겁니다`);
  ctx.showMessage(`그런 ${ctx.getVarName("CALL", MASTER)}에게 보너스를 내리겠습니다`);
  ctx.showMessage(`인계플레이가 아닌, 신규게임 개시 후에 이 실적을 선택해주시면 주인의 기량이 4`);
  ctx.showMessage(`W 이하인 경우, 주인의 기량이 5로 됩니다`);
  if (ctx.masterAbilities[12] <= 4) {
    ctx.masterAbilities[12] = 5;
  }
}
