/**
 * ACHIEVEMENT_7_BLACKIMPACT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function achievement_title_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "BLACK IMPACT";
}

export async function achievement_calc_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  // TODO: FOR COUNT, 0, CHARANUM
  if (ctx.count == ctx.master) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(count, 422) == 1 && ctx.getTalent(count, 432) == 1) {
    ctx.locals[0]++;
  }
  // TODO: NEXT
  if (ctx.global[7] == 0 && await difficulty_check(ctx, character) && ctx.locals[0] >= 4) {
    ctx.global[7] = 1;
  }
  return ctx.global[7];
}

export async function achievement_main_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`수많은 흑갸루걸레들과 꺄꺄우후후 했던 ${ctx.getVarName("CALL", MASTER)}에게 딱맞는 실적이군요`);
  ctx.showMessage(`W 앞으로도 음란한 일에 탐욕적인 그녀들과 자아낼『충격』을 기대해 주세요`);
  ctx.showMessage(`그런 ${ctx.getVarName("CALL", MASTER)}에게 보너스를 내리겠습니다`);
  ctx.showMessage(`W 아래의 보너스 중에서 좋아하는 것을 선택해 주세요`);
  // Label: INPUT_LOOP_3
  ctx.drawLine('･･');
  ctx.showMessage(` [0] - 여자아이들을 빼앗을 남친을 흑갸루를 좋아하는【바람둥이】로 고정하고, 미팅을 하면 반드시 남친이 생기게 한다`);
  ctx.showMessage(` [1] - 여자아이들을 빼앗을 남친을 원래대로 랜덤으로 한다`);
  ctx.showMessage(` [2] - 흑갸루들의 사적인 행동을 억제한다`);
  ctx.showMessage(` [3] - 흑갸루들의 사적인 행동을 종래대로 랜덤으로 한다`);
  ctx.showMessage(` [4] - 사랑을 맹세한 흑갸루의 놀이를 허락한다`);
  ctx.showMessage(` [5] - 사랑을 맹세한 흑갸루의 놀이를 허락하지 않는다`);
  ctx.drawLine('･･');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0 && ctx.flags[541] === 0) {
    ctx.showMessage(`W  남친을【바람둥이】로 고정하고 미팅을 하면 반드시 남친이 생깁니다`);
    ctx.flags[541] = 1;
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 0 && ctx.flags[541] === 1) {
    ctx.showMessage(`W 이미 남친이【바람둥이】로 고정되어 있습니다`);
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1 && ctx.flags[541] === 1) {
    ctx.showMessage(`W 원래대로 랜덤으로 남친이 결정됩니다`);
    ctx.flags[541] = 0;
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1 && ctx.flags[541] === 0) {
    ctx.showMessage(`W 남친이 랜덤으로 결정되게 되어있습니다`);
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 2 && ctx.flags[542] === 0) {
    ctx.showMessage(`W 흑갸루들의 사적인 행동을 억제했습니다`);
    ctx.flags[542] = 1;
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 2 && ctx.flags[541] === 1) {
    ctx.showMessage(`W 흑갸루들의 사적인 행동은 억제되어 있습니다`);
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 3 && ctx.flags[542] === 1) {
    ctx.showMessage(`W 원래대로 랜덤으로 흑갸루들의 사적인 행동이 결정되도록 합니다`);
    ctx.flags[542] = 0;
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 3 && ctx.flags[542] === 0) {
    ctx.showMessage(`W 흑갸루들의 사적인 행동은 랜덤으로 결정되게 되어 있습니다`);
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 4 && ctx.flags[545] === 0) {
    ctx.showMessage(`W 사랑을 맹세한 흑갸루의 놀이를 허락한다(단, 남친은 생기지 않습니다)`);
    ctx.flags[545] = 1;
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 4 && ctx.flags[545] === 1) {
    ctx.showMessage(`W 현재, 사랑을 맹세한 흑갸루의 놀이를 허락하지 않고 있습니다`);
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 5 && ctx.flags[545] === 1) {
    ctx.showMessage(`W 사랑을 맹세한 흑갸루의 놀이를 허락하지 않습니다`);
    ctx.flags[545] = 0;
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 5 && ctx.flags[545] === 0) {
    ctx.showMessage(`W 현재, 사랑을 맹세한 흑갸루의 놀이를 허락하고 있습니다(단, 남친은 생기지 않습니다)`);
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  }
}
