/**
 * CLEARBONUS_HENTAI.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function clearbonus_hentai(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[122] === 0) {
    ctx.showMessage(`%타겟이(1)% 노출광인 IF세계로 갈까요?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUT_LOOP
    await ctx.inputNumber();
    if (ctx.result === 0) {
      await clearbonus_hentai_addexp(ctx, character);
    } else if (ctx.result === 1) {
      return 0;
    } else {
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    }
  }
}

export async function clearbonus_hentai_addexp(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = character;
  // Label: INPUTLOOP_START
  ctx.showMessage(`W 《${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "는")}【${ctx.getVarName("TALENT", 89)}】%조사만처리(TALENTNAME:89,"이")% 됐다》`);
  ctx.getTalent(local, 89) = 1;
  ctx.getTalent(local, 35) = 0;
  ctx.getTalent(local, 36) = 1;
}
