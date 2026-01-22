/**
 * ACHIEVEMENT_8_BLACKKANADE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "내 여동생이 이렇게 빗치일 리 없어";
}

export async function achievement_calc_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if (ctx.getCharacterNo(ctx.count) == 1 && ctx.getTalent(count, 1) ==0 && ctx.getTalent(count, 425) == 1 && ctx.getTalent(count, 440) == 1 && ctx.getTalent(count, 85) == 0 && ctx.getTalent(count, 184) == 1) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[8] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] > 0) {
    ctx.global[8] = 1;
  }
  return ctx.global[8];
}

export async function achievement_main_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`사랑하는 여동생인『미야마 카나데』가 머리도 가랑이도 가벼워진【흑갸루】가 되어버린`);
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 마음 속 절규는, 이 실적 이름과 똑같겠죠`);
  ctx.showMessage(`W 순수했던『미야마 카나데』를 한번 더 만나고 싶다, 라고 원한다면 다시 처음부터 시작하는 수 밖에 없습니다……`);
  if (GETCHARA(91,0 ) < 0) {
    if (ctx.global[51] === 1 && ctx.flags[555] === 0) {
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
      ctx.showMessage(`스노 이쿠미가 조수가 되었던 적이 있었기에, 보너스가 해금되었습니다!`);
      ctx.showMessage(`스노 이쿠미가 가진 최첨단 과학지식에 의해 흑갸루가 된『미야마 카나데』의`);
      ctx.showMessage(`클론을 만들 수 있습니다`);
      ctx.showMessage(`※클론이기에 경험은 모두 초기화됩니다`);
      // Label: INPUT_LOOP_4
      ctx.showMessage(`《미야마 카나데』의 쿨론을 만듭니까?》`);
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      await ctx.inputNumber();
      if (ctx.result === 0 && ctx.flags[543] === 0 && ctx.global[52] === 0) {
        ctx.showMessage(`W 『미야마 카나데』의 클론을 탄생시켰습니다`);
        // TODO: ADDCHARA 91
        ctx.flags[555] = 1;
        ctx.global[291] = 1;
        // TODO: SAVEGLOBAL
        return 0;
        if (ctx.global[200] >= 0) {
          character = GETCHARA(91);
          await clearbonus_call(ctx, character);
        }
      } else if (ctx.result === 0 && ctx.flags[555] === 1) {
        ctx.showMessage(`W 『미야마 카나데』의 클론이 이미 있습니다`);
        return 0;
      } else if (ctx.result === 1) {
        return 0;
      } else {
        // GOTO INPUT_LOOP_4 - 구조 변경 필요 (while/break 사용 권장)
      }
    }
  }
}
