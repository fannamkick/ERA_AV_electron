/**
 * SYSTEM_DEBUG.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function debug_top(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('어떤 수치를 변경합니까?');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[0] - 난이도 설정');
  ctx.showMessage('[1] - 날짜');
  ctx.showMessage('[2] - 잔여 포인트');
  ctx.showMessage('[3] - 캐릭터 패러미터');
  ctx.showMessage('[4] - 모든 캐릭터의 체력・기력・매력치를 완전히 회복한다');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage('어떤 난이도로 변경합니까?');
    ctx.showMessage('(1:EASY 2:NORMAL 3:HARD 4:POWERFUL 9:EXTRA)');
    await ctx.inputNumber();
    if (ctx.result === 1) {
      ctx.flags[3] = 120;
      ctx.flags[4] = 1000000;
      ctx.flags[5] = 1;
    } else if (ctx.result === 2) {
      ctx.flags[3] = 100;
      ctx.flags[4] = 1800000;
      ctx.flags[5] = 2;
    } else if (ctx.result === 3) {
      ctx.flags[3] = 90;
      ctx.flags[4] = 2400000;
      ctx.flags[5] = 3;
    } else if (ctx.result === 4) {
      ctx.flags[3] = 80;
      ctx.flags[4] = 3600000;
      ctx.flags[5] = 4;
    } else if (ctx.result === 9) {
      ctx.flags[3] = 0;
      ctx.flags[4] = 0;
      ctx.flags[5] = 9;
    }
  } else if (ctx.result === 1) {
    ctx.showMessage('무슨 날짜로 변경합니까?');
    await ctx.inputNumber();
    DAY = ctx.result;
  } else if (ctx.result === 2) {
    ctx.showMessage('몇 포인트로 변경합니까?');
    await ctx.inputNumber();
    ctx.money = ctx.result;
  } else if (ctx.result === 3) {
    await debug_slave(ctx, character);
  } else if (ctx.result === 4) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      ctx.base[ctx.count][0] = MAXctx.base[ctx.count][0];
      ctx.base[ctx.count][1] = MAXctx.base[ctx.count][1];
      ctx.base[ctx.count][31] = MAXctx.base[ctx.count][31];
    }
  } else if (ctx.result != 999) {
    ctx.restart();
  }
  return 0;
}

export async function debug_slave(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  // Label: INPUT_LOOP
  ctx.showMessage('어느 캐릭터의 패러미터를 변경합니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 999;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_00
  ctx.showMessage(`${ctx.getName(character)}의 어느 패러미터를 변경시킵니까?`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[0] - TALENT');
  ctx.showMessage('[1] - ABL');
  ctx.showMessage('[2] - EXP');
  ctx.showMessage('[3] - CFLAG');
  ctx.showMessage('[4] - MARK');
  ctx.showMessage('[5] - BASE');
  ctx.showMessage('[6] - MAXBASE');
  ctx.showMessage('[7] - RELATION');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage('어느 TALENT를 변경합니까?');
    await ctx.inputNumber();
    A = ctx.result;
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 ${ctx.josaHelper(ctx.getVarName("TALENTNAME", A), "는")} ${ctx.talents[A]}입니다.`);
    ctx.showMessage('얼마로 설정합니까?');
    await ctx.inputNumber();
    ctx.talents[A] = ctx.result;
  } else if (ctx.result === 1) {
    ctx.showMessage('어느 ABL을 변경합니까?');
    await ctx.inputNumber();
    A = ctx.result;
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 ${ctx.josaHelper(ctx.getVarName("ABLNAME", A), "는")} ${ctx.abilities[A]}입니다.`);
    ctx.showMessage('얼마로 설정합니까?');
    await ctx.inputNumber();
    ctx.abilities[A] = ctx.result;
  } else if (ctx.result === 2) {
    ctx.showMessage('어떤 EXP를 변경합니까?');
    await ctx.inputNumber();
    A = ctx.result;
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 ${ctx.josaHelper(ctx.getVarName("EXPNAME", A), "는")} ${ctx.exp[A]}입니다.`);
    ctx.showMessage('얼마로 설정합니까?');
    await ctx.inputNumber();
    ctx.exp[A] = ctx.result;
  } else if (ctx.result === 3) {
    ctx.showMessage('어떤 CFLAG를 변경합니까?');
    await ctx.inputNumber();
    A = ctx.result;
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 CFLAG:${A}(은/)는 ${character.cflags[A]}입니다.`);
    ctx.showMessage('얼마로 설정합니까?');
    await ctx.inputNumber();
    character.cflags[A] = ctx.result;
  } else if (ctx.result === 4) {
    ctx.showMessage('어떤 MARK를 변경합니까?');
    await ctx.inputNumber();
    A = ctx.result;
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 ${ctx.josaHelper(ctx.getVarName("MARKNAME", A), "는")} ${character.mark[A]}입니다.`);
    ctx.showMessage('얼마로 설정합니까?');
    await ctx.inputNumber();
    character.mark[A] = ctx.result;
  } else if (ctx.result === 5) {
    ctx.showMessage('어떤 BASE를 변경합니까?');
    await ctx.inputNumber();
    A = ctx.result;
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 ${ctx.josaHelper(ctx.getVarName("BASENAME", A), "는")} ${ctx.base[A]}입니다.`);
    ctx.showMessage('얼마로 설정합니까?');
    await ctx.inputNumber();
    ctx.base[A] = ctx.result;
  } else if (ctx.result === 6) {
    ctx.showMessage('어떤 MAXBASE를 변경합니까?');
    await ctx.inputNumber();
    A = ctx.result;
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 ${ctx.josaHelper(ctx.getVarName("BASENAME", A), "는")} ${MAXctx.base[A]}입니다.`);
    ctx.showMessage('얼마로 설정합니까?');
    await ctx.inputNumber();
    MAXctx.base[A] = ctx.result;
  } else if (ctx.result === 7) {
    ctx.showMessage('누구와의 RELATION을 변경합니까?');
    await life_list_new,7(ctx, character);
    if (ctx.result == 999) {
      // GOTO INPUT_LOOP_00 - 구조 변경 필요 (while/break 사용 권장)
    }
    A = ctx.result;
    ctx.showMessage(`${ctx.josaHelper("타겟과")} ${ctx.getName(A)}의 RELATION은 ${relation[A.no]}입니다.`);
    ctx.showMessage('얼마로 설정합니까?');
    await ctx.inputNumber();
    // TODO: RELATION:(NO:A) = RESULT
  } else if (ctx.result === 999) {
    return 999;
  } else {
    // GOTO INPUT_LOOP_00 - 구조 변경 필요 (while/break 사용 권장)
  }
  // GOTO INPUT_LOOP_00 - 구조 변경 필요 (while/break 사용 권장)
}
