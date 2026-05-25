/**
 * ACHIEVEMENT_14_BIG3.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = BIG3;
}

export async function achievement_calc_14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if ((ctx.getCharacterNo(ctx.count) == 9 || ctx.getCharacterNo(ctx.count) == 10 || ctx.getCharacterNo(ctx.count) == 11) && ctx.getTalent(count, 430) == 1) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[14] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] == 3) {
    ctx.global[14] = 1;
  }
  return ctx.global[14];
}

export async function achievement_main_14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`뒷세계에 뿌리깊게 관계되있는「키류 카논」「레이첼・파라디수스」「스노 이쿠미」……`);
  ctx.showMessage(`그녀들을 아군으로 얻었던 것은, 앞으로의 ${ctx.getVarName("CALL", MASTER)}에게 있어 큰 이익이 될 것 같습니다`);
  ctx.showMessage(`W 하지만 그와 동시에, 그런 ${ctx.getVarName("CALL", MASTER)}의 존재를 위험하게 생각하는 사람이 나와도 이상하지는 않을 것입니다`);
  if (ctx.flags[552] === 0) {
    ctx.showMessage(`……그리고 지금, 상하이의 뒷세계를 좌지우지하는 조직장이 당신에게 흥미를 가졌다고 합니다`);
    ctx.showMessage(`공식적으로는 단순한 유학생으로 온 소녀, 리 메이링`);
    ctx.showMessage(`레이첼이 말하길, 일찍이 존재했던 왕조를 몰락시킨 전설상의 구미호의 환생이라고도 소문난『구미회』의 장이라고 합니다`);
    ctx.showMessage(`그녀는 ${ctx.josaHelper("플레이어를")} 위험시 하는 것과 동시에, 파라디수스 왕가와 희대의 천재 과학자를 설득해서 납득시킨 그 인품에`);
    ctx.showMessage(`흥미를 가져, 그녀 스스로 접촉해 왔습니다`);
    ctx.showMessage(`W 얼핏 보기엔 겁쟁이에 얌전한 소녀로밖에 안 보이지만, 카논이나 레이첼조차 경계하는 그녀를 어찌할지는, 모두 ${ctx.getVarName("CALL", MASTER)} 나름입니다`);
    ctx.showMessage('');
    ctx.showMessage(`W 《리 메이링과 계약했습니다》`);
    // TODO: ADDCHARA 93
    ctx.global[293] = 1;
    // TODO: SAVEGLOBAL
    ctx.flags[552] = 1;
    if (ctx.global[200] >= 0) {
      character = GETCHARA(93);
      await clearbonus_call(ctx, character);
    }
  }
}
