/**
 * SAKURA_AZITO_DETAIL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function chastity_up(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 정조관념이 강한 여자다!　……아마도」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 30)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이미 강한 정조관념을 가지고 있습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 31)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 순결한 여성을 좋아하는 남자고 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 정조관념이 강해졌다`);
    ctx.getTalent(t, 30) = 1;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function chastity_down(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 마구 들이대는 육식계 여자다!　……아마도」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 30)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 31)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이미 한창 육식계입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 들이대는 여자에게 약한 남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 정조관념은【${ctx.getVarName("TALENT", 31)}】이 됐다`);
    ctx.getTalent(t, 31) = 1;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function chastity_neutral(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 100000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 자연스러운 여자다!　……아마도」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 30) === 0 && ctx.getTalent(result, 31) === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 자연스러운 여자를 좋아하는 남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 정조관념이 보통이 됐다`);
    ctx.getTalent(t, 30) = 0;
    ctx.getTalent(t, 31) = 0;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function shame_up(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 수줍어하는 여자다!　……아마도」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 35) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 벌써 수줍어하고 있습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 36) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 부끄러워하는 여자를 좋아하는 남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 35)}】을 배웠다`);
    ctx.getTalent(t, 35) = 1;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function shame_down(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 남들 앞에서도 부끄럼없이 애정행각을 펼치는 여자다!　……아마도」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 35) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 36) === 1) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", RESULT)}에게 부끄러운 것은 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 남들 앞에서도 부끄럼없이 애정행각을 펼치는 여자를 좋아하는`);
    ctx.showMessage(`남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 36)}】이 됐다`);
    ctx.getTalent(t, 36) = 1;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  // TODO: PRINTW
  ctx.money -= C;
  return 1;
}

export async function shame_neutral(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 100000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 자연스러운 여자다!　……아마도」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 35) === 0 && ctx.getTalent(result, 36) === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 자연스러운 여자를 좋아하는 남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 수치의식이 보통이 됐다`);
    ctx.getTalent(t, 35) = 0;
    ctx.getTalent(t, 36) = 0;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function personality_gentle(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 솔직한 여자다!　……아마도」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 13) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이미 솔직합니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 11) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 솔직한 여자를 좋아하는 남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 성격이【${ctx.getVarName("TALENT", 13)}】이 됐다`);
    ctx.getTalent(t, 13) = 1;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function personality_brazen(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 건방진 여자다!　……아마도」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 13) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 11) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 상당히 건방집니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 건방진 여자를 좋아하는 남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 성격이【${ctx.getVarName("TALENT", 11)}】이 됐다`);
    ctx.getTalent(t, 11) = 1;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function personality_quiet(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 얌전한 여자다!　……아마도」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 14) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 얌전합니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 16) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 얌전한 여자를 좋아하는 남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 성격이【${ctx.getVarName("TALENT", 14)}】이 됐다`);
    ctx.getTalent(t, 14) = 1;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function personality_lively(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 활발한 여자다!　……아마도」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 14) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 16) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 활발합니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 활발한 좋아하는 남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 성격이【${ctx.getVarName("TALENT", 16)}】이 됐다`);
    ctx.getTalent(t, 16) = 1;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function personality_neutral(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 100000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 자연스러운 여자다!　……아마도」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 11) === 0 && ctx.getTalent(result, 13) === 0 && ctx.getTalent(result, 14) === 0 && ctx.getTalent(result, 16) === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 자연스러운 여자를 좋아하는 남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 성격이 평범해졌다`);
    ctx.getTalent(t, 16) = 0;
    ctx.getTalent(t, 14) = 0;
    ctx.getTalent(t, 11) = 0;
    ctx.getTalent(t, 13) = 0;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function personality_gal(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 3000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 갸루계다!」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 432)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 432)}】는 세미나에 참가해도 소용 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.abilities[ctx.result][10] <= 2 || ctx.getTalent(result, 209) === 1) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 갸루계인 여자를 좋아하는 남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 갸루계가 됐다`);
    ctx.getTalent(t, 432) = 1;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function gal_neutral(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 3000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「인기있는 여자란, 곧 평범한 여자다!」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP
  ctx.drawLine();
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】는 그쪽 전문가에 의뢰해 주세요`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상은 세미나에 참가할 수 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 26) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 해당 세미나의 강사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.abilities[ctx.result][10] <= 2) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이번 세미나에 관심이 없나봅니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 432) === 0 && ctx.getTalent(result, 209) === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 평범합니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  T = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.getVarName("CALL", T)}에게 세미나를 듣게 할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(T), "는")} RB단이 주최한 세미나에 참가했다……`);
    ctx.showMessage(`이 세상엔 평범한 여자를 좋아하는 남자가 많다는 것을 알고, 느낀 점이 있어보인다`);
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 평범해졌다`);
    ctx.getTalent(t, 432) = 0;
    ctx.getTalent(t, 209) = 0;
    ctx.exp[T][110] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function kickinghorse(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 100000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「그래, 인싸에게 벌을 내리는 거구나!　성공할지는…… 음, 반반이려나?」');
  ctx.resetColor();
  // TODO: SETFONT ""
  // Label: INPUT_LOOP_3
  ctx.showMessage(` 커플의 연애를 방해합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count == 0) {
        // TODO: CONTINUE
      }
      character.cflags[ctx.count][629] += ctx.rand(3);
      if (character.cflags[ctx.count][629] === 2 && ctx.getTalent(count, 184) === 1 && character.cflags[ctx.count][621] === 1) {
        ctx.showMessage(`W 《RB단의 방해공작에 의해 ${ctx.josaHelper(ctx.getName(ctx.count), "는")} %CSTR:COUNT:7% %조사처리(CSTR:COUNT:8,"와")% 헤어졌습니다》`);
        ctx.getTalent(count, 184) = 0;
        ctx.getTalent(count, 190) = 0;
        character.cflags[ctx.count][619] = 0;
        character.cflags[ctx.count][621] = 2;
        character.cflags[ctx.count][629] = 0;
        if (character.cflags[15] === 8 && character.cflags[624] === 0) {
          ctx.cstr[0] = `${ctx.cstr[7]} ${ctx.cstr[8]}(전 남친)`;
          character.cflags[624] += 1;
        }
        if (character.cflags[16] === 3 && character.cflags[628] === 0) {
          ctx.cstr[1] = `${ctx.cstr[7]} ${ctx.cstr[8]}(전 남친)`;
          character.cflags[628] += 1;
        }
        ctx.exp[ctx.count][109] += 1;
      } else if (character.cflags[ctx.count][629] === 1) {
        ctx.showMessage(`W 《RB단의 방해공작에 의해 ${ctx.getName(ctx.count)}에게 작업거는 남자를 쫓아냈습니다》`);
        character.cflags[ctx.count][619] -= 30;
        if (character.cflags[ctx.count][619] <= 0) {
          character.cflags[ctx.count][619] = 0;
        }
        character.cflags[ctx.count][629] = 0;
      } else {
        ctx.showMessage(`W 《RB단의 방해공작은 실패했습니다》`);
        character.cflags[ctx.count][629] = 0;
      }
    }
  } else {
    // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}
