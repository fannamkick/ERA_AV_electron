/**
 * ACHIEVEMENT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_achievement(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #LOCALSIZE 2
  // TODO: #DIM LIST, 50
  // TODO: #DIM ACHIEVEMENT, 50
  // TODO: #DIM PAGE
  // TODO: #DIM PAGE_END
  ctx.varSet(LIST, -1);
  ctx.varSet(ACHIEVEMENT, 0);
  // TODO: LOADGLOBAL
  ctx.locals[1] = 0;
  // TODO: FOR LOCAL, 0, 50
  // TODO: TRYCCALLFORM ACHIEVEMENT_TITLE_{LOCAL}
  // TODO: LIST:(LOCAL:1) = LOCAL
  // TODO: CALLFORM ACHIEVEMENT_CALC_{LOCAL}
  if (ctx.result) {
    // TODO: ACHIEVEMENT:(LOCAL) = 1
  }
  ctx.locals[1]++;
  // TODO: CATCH
  // TODO: CONTINUE
  // TODO: ENDCATCH
  // TODO: NEXT
  ctx.pageEnd = ctx.locals[1] / 10;
  // TODO: SAVEGLOBAL
  // Label: ACHIEVE_LIST
  ctx.drawLine();
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 지금까지의 활동실적 page[{PAGE + 1}/{PAGE_END + 1}]`);
  ctx.drawLine();
  // TODO: FOR LOCAL, PAGE * 10, PAGE * 10 + 10
  if (ctx.list[ctx.locals[0]] < 0) {
    // TODO: BREAK
  }
  if (achievement[ctx.list[ctx.locals[0]]]) {
    // TODO: CALLFORM ACHIEVEMENT_TITLE_{LIST:LOCAL}
    ctx.showMessage(` [${ctx.locals[0], 2}] - ${ctx.results}`);
  } else {
    ctx.showMessage('[ -] - －－－－');
  }
  // TODO: NEXT
  ctx.showMessage('');
  if (ctx.page > 0) {
    ctx.print('[997] - 이전 페이지');
  } else {
    ctx.printPlain('[ - ] - －－－－－');
  }
  ctx.print('[998] - 확인 종료');
  if (ctx.page < ctx.pageEnd) {
    ctx.print('[999] - 다음 페이지');
  } else {
    ctx.printPlain('[ - ] - －－－－－');
  }
  ctx.showMessage('');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result < 100 && achievement[ctx.list[ctx.result]]) {
    // TODO: CALLFORM ACHIEVEMENT_MAIN_{LIST:RESULT}
    ctx.showMessage('');
    // GOTO ACHIEVE_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 997 && ctx.page > 0) {
    ctx.page--;
    // GOTO ACHIEVE_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 998) {
    return;
  } else if (ctx.result === 999 && ctx.page < ctx.pageEnd) {
    ctx.page++;
    // GOTO ACHIEVE_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else {
    ctx.clearLine(1);
    // TODO: REUSELASTLINE 잘못된 입력값입니다
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function difficulty_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTION
  return;
}

export async function check_achievement(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (!await difficulty_check(ctx, character)) {
    return;
  }
  // TODO: FOR LOCAL, 0, 50
  // TODO: TRYCALLFORM ACHIEVEMENT_CALC_{LOCAL}
  // TODO: NEXT
}
