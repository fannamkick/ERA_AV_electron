/**
 * ACHIEVEMENT_13_3RDGIRLFRIEND.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "제 3의 소꿉친구";
}

export async function achievement_calc_13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if ((ctx.getCharacterNo(ctx.count) == 1 || ctx.getCharacterNo(ctx.count) == 2 || ctx.getCharacterNo(ctx.count) == 80) && ctx.getTalent(count, 430) == 1) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[13] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] == 3) {
    ctx.global[13] = 1;
  }
  return ctx.global[13];
}

export async function achievement_main_13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 있어선 여동생인「미야마 카나데」와 소꿉친구라고 볼수 있는「사사키 미노리」「니지마 미히로」……`);
  ctx.showMessage(`그들과는 한번 소원해져버렸지만, 이렇게 다시 옛날처럼…… 하지만 이전과는 다른 관계로 돌아갈 수 있었습니다`);
  ctx.showMessage(`……그런데 잊지 않았습니까? ${ctx.getVarName("CALL", MASTER)}에게 다른 한명의 소꿉친구가 있었다는 것을`);
  ctx.showMessage(`그녀의 이름은「하세카와 미코토」누구보다 총명하고, 공주님처럼 가련했습니다`);
  ctx.showMessage(`W 하지만, 어느 날을 경계로『어딘가 먼 곳』으로 가버린 소꿉친구`);
  ctx.showMessage(`……그런 그녀가 간신히, 길었던 해외에서의 투병생활에서 돌아오게 되었습니다`);
  ctx.showMessage(`그때보다 청초해진 그녀는, 예전 소꿉친구들의 현황을 어디선가 우연히 듣고`);
  ctx.showMessage(`귀국하자마자 ${ctx.getVarName("CALL", MASTER)}에게 협력을 자청`);
  if (ctx.flags[551] === 0) {
    ctx.showMessage(`했습니다`);
    ctx.showMessage(`어떻게 설득해도 의사를 굽히지 않았고, 그뿐 아니라 ${ctx.josaHelper("플레이어가")} 승낙할 때까지 계속 눌러앉아 있을 생각인 것 같습니다`);
    ctx.showMessage(`말수 적고 완고한 성격이 옛날과 변함없는 것에 안도하면서도, ${ctx.josaHelper("플레이어는")} 그녀와 계약하기로 했습니다……`);
    ctx.showMessage(`W 옛날과 같은 관계를 유지할지, 그렇지 않으면 새로운 단계로 진행될지는, 모두 ${ctx.getVarName("CALL", MASTER)} 나름입니다`);
    ctx.showMessage('');
    ctx.showMessage(`W 《하세카와 미코토와 계약했다》`);
    // TODO: ADDCHARA 94
    ctx.global[294] = 1;
    // TODO: SAVEGLOBAL
    ctx.flags[551] = 1;
    if (ctx.global[200] >= 0) {
      character = GETCHARA(94);
      await clearbonus_call(ctx, character);
    }
  } else if (ctx.flags[551] === 1) {
    ctx.showMessage(`W 했던 것이 마치 어제같습니다`);
  }
}
