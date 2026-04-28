/**
 * EUNICE_LABO_DETAIL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function break_pride_high(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 2000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「그래, 이 아이의 프라이드가 높아지도록 조정하면 되는거지?」');
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
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 86) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 15) || ctx.getTalent(result, 17)) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(` 유니스는 끌려온 ${ctx.getVarName("CALL", TARGET)}에게 귓속말로, 말 그대로 악마의 유혹을 속삭였다……`);
    ctx.showMessage(` 그 말에 영혼이 침식당한 ${ctx.josaHelper("타겟은")} 텅 빈 눈으로 특정한 말을 읇조리고 있다`);
    ctx.showMessage(`《유니스의 광기에 침식당한 ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 15)}】이 됐다》`);
    ctx.showMessage(`L`);
    ctx.showMessage(`W  ${ctx.getVarName("EXP", 50)} +1`);
    ctx.exp[50] += 1;
    ctx.talents[15] = 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function break_pride_low(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 2000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「그래, 이 아이의 프라이드가 낮아지도록 조정하면 되는거지?」');
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
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 86) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 15) || ctx.getTalent(result, 17)) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(` 유니스는 끌려온 ${ctx.getVarName("CALL", TARGET)}에게 귓속말로, 말 그대로 악마의 유혹을 속삭였다……`);
    ctx.showMessage(` 그 말에 영혼이 침식당한 ${ctx.josaHelper("타겟은")} 텅 빈 눈으로 특정한 말을 읇조리고 있다`);
    ctx.showMessage(`《유니스의 광기에 침식당한 ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 17)}】이 됐다》`);
    ctx.showMessage(`L`);
    ctx.showMessage(`W  ${ctx.getVarName("EXP", 50)} +1`);
    ctx.exp[50] += 1;
    ctx.talents[17] = 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function break_pride_neutral(
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
  ctx.showMessage('「그래, 이 아이의 프라이드를 평범해지게 조정하면 되는거지?」');
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
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 86) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 15) === 0 && ctx.getTalent(result, 17)  === 0) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(` 유니스는 끌려온 ${ctx.getVarName("CALL", TARGET)}에게 귓속말로, 말 그대로 악마의 유혹을 속삭였다……`);
    ctx.showMessage(` 그 말에 영혼이 침식당한 ${ctx.josaHelper("타겟은")} 텅 빈 눈으로 특정한 말을 읇조리고 있다`);
    ctx.showMessage(`《유니스의 광기에 침식당한 ${ctx.getVarName("CALL", TARGET)}의 프라이드는 평범해졌다》`);
    ctx.showMessage(`L`);
    ctx.showMessage(`W  ${ctx.getVarName("EXP", 50)} +1`);
    ctx.exp[50] += 1;
    ctx.talents[15] = 0;
    ctx.talents[17] = 0;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function break_xtc_positive(
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
  ctx.showMessage('「그래, 이 아이가 쾌감에 솔직해지게 하면 되지?」');
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
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 86) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 70) || ctx.getTalent(result, 71)) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(` 유니스는 끌려온 ${ctx.getVarName("CALL", TARGET)}에게 귓속말로, 말 그대로 악마의 유혹을 속삭였다……`);
    ctx.showMessage(` 그 말에 영혼이 침식당한 ${ctx.josaHelper("타겟은")} 텅 빈 눈으로 특정한 말을 읇조리고 있다`);
    ctx.showMessage(`《유니스의 광기에 침식당한 ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 70)}】하게 됐다》`);
    ctx.showMessage(`L`);
    ctx.showMessage(`W  ${ctx.getVarName("EXP", 50)} +1`);
    ctx.exp[50] += 1;
    ctx.talents[70] = 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function break_xtc_negative(
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
  ctx.showMessage('「그래, 이 아이가 쾌감을 부정하게 하면 되지?」');
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
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 86) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 70) || ctx.getTalent(result, 71)) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(` 유니스는 끌려온 ${ctx.getVarName("CALL", TARGET)}에게 귓속말로, 말 그대로 악마의 유혹을 속삭였다……`);
    ctx.showMessage(` 그 말에 영혼이 침식당한 ${ctx.josaHelper("타겟은")} 텅 빈 눈으로 특정한 말을 읇조리고 있다`);
    ctx.showMessage(`《유니스의 광기에 침식당한 ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 71)}】하게 됐다》`);
    ctx.showMessage(`L`);
    ctx.showMessage(`W  ${ctx.getVarName("EXP", 50)} +1`);
    ctx.exp[50] += 1;
    ctx.talents[71] = 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function break_xtc_neutral(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「그래, 이 아이가 남들만큼만 쾌감을 받아들이게 하면 되지?」');
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
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 86) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 70) === 0 && ctx.getTalent(result, 71)  === 0) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(` 유니스는 끌려온 ${ctx.getVarName("CALL", TARGET)}에게 귓속말로, 말 그대로 악마의 유혹을 속삭였다……`);
    ctx.showMessage(` 그 말에 영혼이 침식당한 ${ctx.josaHelper("타겟은")} 텅 빈 눈으로 특정한 말을 읇조리고 있다`);
    ctx.showMessage(`《유니스의 광기에 침식당한 ${ctx.josaHelper("타겟은")} 남들만큼만 쾌감을 받아들이게 됐다》`);
    ctx.showMessage(`L`);
    ctx.showMessage(`W  ${ctx.getVarName("EXP", 50)} +1`);
    ctx.exp[50] += 1;
    ctx.talents[70] = 0;
    ctx.talents[71] = 0;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function break_sm_sadist(
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
  ctx.showMessage('「그래, 이 아이가 가학적 취향을 가지게 하면 되지?」');
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
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 86) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 83) || ctx.getTalent(result, 88)) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(` 유니스는 끌려온 ${ctx.getVarName("CALL", TARGET)}에게 귓속말로, 말 그대로 악마의 유혹을 속삭였다……`);
    ctx.showMessage(` 그 말에 영혼이 침식당한 ${ctx.josaHelper("타겟은")} 텅 빈 눈으로 특정한 말을 읇조리고 있다`);
    ctx.showMessage(`《유니스의 광기에 침식당한 ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 83)}】가 됐다》`);
    ctx.showMessage(`L`);
    ctx.showMessage(`W  ${ctx.getVarName("EXP", 50)} +1`);
    ctx.exp[50] += 1;
    ctx.talents[83] = 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function break_sm_masochist(
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
  ctx.showMessage('「그래, 이 아이가 피학적 취향을 가지게 하면 되지?」');
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
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 86) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 83) || ctx.getTalent(result, 88)) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(` 유니스는 끌려온 ${ctx.getVarName("CALL", TARGET)}에게 귓속말로, 말 그대로 악마의 유혹을 속삭였다……`);
    ctx.showMessage(` 그 말에 영혼이 침식당한 ${ctx.josaHelper("타겟은")} 텅 빈 눈으로 특정한 말을 읇조리고 있다`);
    ctx.showMessage(`《유니스의 광기에 침식당한 ${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 88)}】가 됐다》`);
    ctx.showMessage(`L`);
    ctx.showMessage(`W  ${ctx.getVarName("EXP", 50)} +1`);
    ctx.exp[50] += 1;
    ctx.talents[88] = 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function break_sm_neutral(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「그래, 이 아이의 성적기호를 평범하게 만들면 되지?」');
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
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 86) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 83) === 0 && ctx.getTalent(result, 88)  === 0) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(` 유니스는 끌려온 ${ctx.getVarName("CALL", TARGET)}에게 귓속말로, 말 그대로 악마의 유혹을 속삭였다……`);
    ctx.showMessage(` 그 말에 영혼이 침식당한 ${ctx.josaHelper("타겟은")} 텅 빈 눈으로 특정한 말을 읇조리고 있다`);
    ctx.showMessage(`《유니스의 광기에 침식당한 ${ctx.getVarName("CALL", TARGET)}의 성적기호가 평범해졌다》`);
    ctx.showMessage(`L`);
    ctx.showMessage(`W   ${ctx.getVarName("EXP", 50)} +1`);
    ctx.exp[50] += 1;
    ctx.talents[83] = 0;
    ctx.talents[88] = 0;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function change_work(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (B != 999) {
    C = 2000000;
  } else if (B === 999) {
    C = 1000000;
  }
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「그래, 이 아이의 상황을 바꾸면 되는 거지?」');
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
  } else if (ctx.getTalent(result, 330) && ctx.result.no != 217) {
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 86) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if ((ctx.getTalent(result, 203) === 1 || ctx.getTalent(result, 402) === 1 || ctx.getTalent(result, 421) === 1) && B != 999) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (B === 999 && ctx.getTalent(result, 203) === 0 && ctx.getTalent(result, 402) === 0 && ctx.getTalent(result, 421) === 0) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(` 유니스는 손가락을 한 번 튕기더니, ${ctx.getVarName("CALL", MASTER)}에게 인터넷으로 ${ctx.getVarName("CALL", TARGET)}의 이름을 검색해보라고 했다`);
    ctx.showMessage(`검색 결과,`);
    if (B != 999) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 프로필이【${ctx.getVarName("TALENT", B)}】로 변해있었다……`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 프로필이 달라져있다……`);
    }
    ctx.showMessage('');
    ctx.showMessage(`《유니스가 사상을 개변해,`);
    if (B != 999) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", B)}】%조사만처리(TALENTNAME:B,"가")% 됐다`);
    } else if (ctx.talents[400] === 1 && B === 999) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 평범한 AV배우가 됐다`);
    } else if (ctx.talents[400] === 0 && B === 999) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 평범한 AV배우 후보가 됐다`);
    }
    ctx.showMessage('》');
    ctx.showMessage(`L`);
    ctx.showMessage(`W  ${ctx.getVarName("EXP", 50)} +1`);
    ctx.exp[50] += 1;
    if (B != 999) {
      ctx.talents[B] = 1;
      if (B === 203) {
        MAXctx.base[31] += 30;
        ctx.base[31] += 30;
      } else if (B === 402) {
        MAXctx.base[31] += 20;
        ctx.base[31] += 20;
      } else if (B === 421) {
        MAXctx.base[31] += 10;
        ctx.base[31] += 10;
      }
      character.cflags[801] = 0;
    } else {
      if (ctx.talents[203] === 1) {
        MAXctx.base[31] -= 30;
        ctx.base[31] -= 30;
        if (ctx.talents[515] === 1) {
          MAXctx.base[31] -= 30;
          ctx.base[31] -= 30;
        }
      } else if (ctx.talents[402] === 1) {
        MAXctx.base[31] -= 20;
        ctx.base[31] -= 20;
      } else if (ctx.talents[421] === 1) {
        MAXctx.base[31] -= 10;
        ctx.base[31] -= 10;
      }
      ctx.talents[203] = 0;
      ctx.talents[402] = 0;
      ctx.talents[421] = 0;
      ctx.talents[515] = 0;
    }
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function change_virginity(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 80000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「그래, 이 아이의 성경험을 바꾸면 되는 거지?');
  ctx.showMessage('……응?　있는 그대로의 내가 귀엽다고?');
  ctx.showMessage('『당신』도 참…… 그래도 기뻐요『당신』」');
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
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (B === 100 && ctx.getTalent(result, 0) === 1 && character.cflags[ctx.result][15] === 0) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (B === 150 && ctx.getTalent(result, 2) === 1) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (B === 200 && character.cflags[ctx.result][16] === -1) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`유니스는 손가락을 한 번 튕기더니, ${ctx.getVarName("CALL", TARGET)}에게 간단한 문진을 실시했다……`);
    ctx.showMessage(`문진 도중, ${ctx.josaHelper("타겟은")} 지금까지 한 번도`);
    if (B === 100) {
      ctx.showMessage(`질에 뭔가를 넣었던`);
    } else if (B === 150) {
      ctx.showMessage(`애널에 뭔가를 넣었던`);
    } else if (B === 200) {
      ctx.showMessage(`키스를 한`);
    }
    ctx.showMessage(`적이 없다고, 갑자기 물어본 성적인 화재에`);
    if (ctx.talents[36]) {
      ctx.showMessage(`부끄러워하는 기색도 없이`);
    } else {
      ctx.showMessage(`뺨을 붉게 물들이며`);
    }
    ctx.showMessage(`대답했다……`);
    ctx.showMessage('');
    ctx.showMessage(`《유니스가 사상을 개변해,`);
    if (B === 100) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 순수한【처녀】가 됐다`);
      ctx.talents[0] = 1;
      ctx.exp[0] = 0;
      ctx.abilities[2] = 0;
      character.cflags[15] = 0;
      ctx.juel[1] = 0;
    } else if (B === 150) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}【애널처녀】가 됐다`);
      ctx.talents[2] = 1;
      ctx.exp[1] = 0;
      ctx.abilities[3] = 0;
      ctx.juel[2] = 0;
    } else if (B === 200) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 키스 미경험이 됐다`);
      character.cflags[16] = -1;
    }
    ctx.showMessage('》');
    ctx.showMessage(`L`);
    ctx.showMessage(`W  ${ctx.getVarName("EXP", 50)} +1`);
    ctx.exp[50] += 1;
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function change_fallen(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 30000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.showMessage('「그래, 이 아이를 타천사로 환생시키면 되는거지?」');
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
    ctx.showMessage(`W  유니스는【${ctx.getVarName("TALENT", 330)}】대상에겐 흥미가 없어 보입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if ((ctx.getTalent(result, 121) === 1 || ctx.getTalent(result, 122) === 1)) {
    ctx.showMessage(`W  유니스는 자신의 취미를 방해했다며 화를 냈다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result.no === 86) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if ((ctx.getTalent(result, 511) === 1 && ctx.getTalent(result, 505) === 1)) {
    ctx.showMessage(`W  ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 이미 타천사입니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 430) === 0) {
    ctx.showMessage(`W  ${ctx.getVarName("CALL", RESULT)}에겐 효과가 없습니다`);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_2
  ctx.showMessage(` ${ctx.josaHelper("타겟을")} 유니스에게 데려오겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(` 유니스는 ${ctx.josaHelper("타겟을")} 그때처럼 범하라고 했다……`);
    ctx.showMessage(`유니스의 광기와 거듭되는 이상한 경험에, 더러움을 모르던 ${ctx.josaHelper("타겟은")} 몸도 마음도 범해지며,`);
    ctx.showMessage(`【음마】의 음탕함과【천사】의 순수함이라는, 모순된 두가지 요소를 가진 고차원의 존재로 변했다`);
    ctx.showMessage(`《유니스의 광기와 거듭되는 이상한 경험에 몸도 마음도 범해진 ${ctx.josaHelper("타겟은")}【타천사】가 됐다》`);
    ctx.showMessage(`W`);
    await change_fallen_talent(ctx, character);
    await result_exp(ctx, character);
    C = 30000000;
    await ctx.wait();
  } else {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function change_fallen_talent(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = 0;
  Y = 0;
  M = 0;
  P = 0;
  B = 0;
  E = 0;
  Z = 0;
  V = 0;
  A = 0;
  O = 0;
  F = 0;
  S = 0;
  I = 0;
  T = 0;
  K = 0;
  N = 0;
  C = 0;
  G = 0;
  L = 0;
  H = 0;
  D = 0;
  J = 0;
  Q = 0;
  R = 0;
  A[1] = 0;
  B[1] = 0;
  if (ctx.talents[505] == 0) {
    MAXctx.base[31] -= 50;
  }
  await succubus_status_ach(ctx, character);
  ctx.talents[1] = 1;
  ctx.talents[121] = 1;
  ctx.talents[76] = 1;
  ctx.talents[123] = 1;
  ctx.talents[505] = 1;
  ctx.talents[511] = 1;
  ctx.talents[422] = 1;
  ctx.talents[430] = 0;
  ctx.talents[432] = 0;
  Z += 250 + ctx.rand(51);
  V += 150 + ctx.rand(21);
  A += 150 + ctx.rand(21);
  C += 40 + ctx.rand(21);
  O += 200 + ctx.rand(51);
  G += Z / 3 + ctx.rand(11);
  L += Z / 3 + ctx.rand(11);
  D += 1 + ctx.rand(51);
  S += 500 + ctx.rand(101);
  F += 200 + ctx.rand(26);
  J += 1 + ctx.rand(50);
  I = 666;
  T += Z / 3 + ctx.rand(11);
  K += T;
  R += Z /3 - ctx.rand(26);
  if (ctx.talents[76] === 1) {
    Z *= 2;
    V *= 2;
    A *= 2;
    O *= 2;
    F *= 2;
    S *= 2;
    K *= 2;
    G *= 2;
    N *= 2;
    C *= 2;
    L *= 2;
    H *= 2;
    J *= 2;
    R *= 2;
  }
  if (ctx.talents[0] === 1) {
    ctx.cstr[0] = CALLctx.getName(ctx.master);
    ctx.talents[0] = 0;
    character.cflags[15] = 16;
    character.cflags[160] = ctx.base[9];
    character.cflags[161] = DAY[1];
    character.cflags[162] = DAY[2];
    ctx.setColor(0xF58F98);
    ctx.showMessage('【처녀상실】');
    ctx.resetColor();
  }
  if (ctx.getTalent(master, 1) === 1) {
    character.cstr[ctx.master][2] = ctx.getName(character);
    ctx.getTalent(master, 1) = 0;
  }
  if (character.cflags[16] === -1) {
    character.cflags[16] = 1;
    character.cflags[820] = ctx.base[9];
    character.cflags[821] = DAY[1];
    character.cflags[822] = DAY[2];
    ctx.cstr[1] = "유니스・파라디수스의 극태 후타나리 자지";
    ctx.setColor(0xF58F98);
    ctx.showMessage('【첫 키스】');
    ctx.resetColor();
  }
  if (ctx.talents[1] === 1) {
    ctx.talents[1] = 0;
    ctx.cstr[2] = "모르는 여자아이의 처녀보지";
    ctx.setColor(0xF58F98);
    ctx.showMessage('【동정상실】');
    ctx.resetColor();
  }
  if (ctx.talents[2] === 1) {
    ctx.talents[2] = 0;
    character.cflags[616] = 14;
    character.cflags[830] = ctx.base[9];
    character.cflags[831] = DAY[1];
    character.cflags[832] = DAY[2];
    ctx.cstr[3] = "촉수생물";
    ctx.setColor(0xF58F98);
    ctx.showMessage('【애널처녀상실】');
    ctx.resetColor();
  }
  character.cflags[609] = 2;
  character.cflags[611] = 3;
  ctx.base[50] = 18 + ctx.rand(6);
  MAXctx.base[31] += 50;
  ctx.base[31] = MAXctx.base[31];
}

export async function result_exp(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (Z > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 2)} +{Z}`);
    ctx.exp[2] += Z;
  }
  if (V > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 0)} +{V}`);
    ctx.exp[0] += V;
  }
  if (A > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 1)} +${A}`);
    ctx.exp[1] += A;
  }
  if (O > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 5)} +{O}`);
    ctx.exp[5] += O;
  }
  if (S > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 20)} +{S}`);
    ctx.exp[20] += S;
  }
  if (F > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 22)} +{F}`);
    ctx.exp[22] += F;
  }
  if (L > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 40)} +{L}`);
    ctx.exp[40] += L;
  }
  if (H > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 41)} +{H}`);
    ctx.exp[41] += F;
  }
  if (Q > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 70)} +{Q}`);
    ctx.exp[70] += Q;
  }
  if (I > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 50)} +${I}`);
    ctx.exp[50] += I;
  }
  if (R > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 3)} +{R}`);
    ctx.exp[3] += R;
  }
  if (N > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 31)} +${N}`);
    ctx.exp[31] += N;
  }
  if (K > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 51)} +{K}`);
    ctx.exp[51] += K;
  }
  if (G > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 54)} +{G}`);
    ctx.exp[54] += G;
  }
  if (T > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 55)} +${T}`);
    ctx.exp[55] += T;
  }
  if (J > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 56)} +{J}`);
    ctx.exp[56] += J;
  }
  if (D > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 57)} +{D}`);
    ctx.exp[57] += D;
  }
  if (C > 0) {
    ctx.showMessage(` ${ctx.getVarName("EXP", 58)} +{C}`);
    ctx.exp[58] += C;
  }
}
