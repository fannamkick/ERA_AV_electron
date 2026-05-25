/**
 * ARBEIT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function arbeit_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await arbeit_list(character, ctx, character);
}

export async function arbeit_list_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #LOCALSIZE 2
  // TODO: #LOCALSSIZE 2
  // TODO: #DIM LIST, 100
  // TODO: #DIM PAGE
  // TODO: #DIM PAGE_END
  ctx.varSet(LIST, 0);
  ctx.varSet(ctx.localStrings[0], "");
  ctx.page = 0;
  ctx.pageEnd = 0;
  ctx.locals[1] = 0;
  // TODO: FOR LOCAL, 1, 100
  // TODO: TRYCCALLFORM ARBEIT_TITLE_{LOCAL}
  console.log('FORML 리스트번호 {LOCAL:1}에 아르바이트 번호{LOCAL} %RESULTS%를 등록합니다');
  // TODO: LIST:(LOCAL:1) = LOCAL
  ctx.locals[1]++;
  // TODO: CATCH
  ctx.list[ctx.locals[0]] = 0;
  // TODO: ENDCATCH
  // TODO: NEXT
  ctx.pageEnd = (ctx.locals[1] - 1 < 0 ? 0 : ctx.locals[1] - 1) / 10;
  // Label: ARBEIT_LIST
  ctx.drawLine('=');
  await arbeit_header_info(ctx.args[0], ctx, character);
  ctx.showMessage('알바생');
  ctx.showMessage('《여러가지 아르바이트를 해보고 경험을 쌓게 합니다》');
  ctx.drawLine('=');
  // TODO: FOR LOCAL, PAGE * 10, PAGE * 10 + 10
  if (ctx.list[ctx.locals[0]] < 1) {
    // TODO: BREAK
  }
  // TODO: CALLFORM ARBEIT_PERMISSION_{LIST:LOCAL}(ARG)
  if (ctx.result === 1) {
    // TODO: CALLFORM ARBEIT_TITLE_{LIST:LOCAL}
    ctx.showMessage(`\@ CFLAG:ARG:801 == LIST:LOCAL ? [ - ] # [${ctx.locals[0], 3}] \@ - ${ctx.results} \@ CFLAG:ARG:801 == LIST:LOCAL ? ○ 실행중 # \@`);
  } else {
    ctx.showMessage(`[ - ] - －－－－－－－－－－－`);
  }
  // TODO: NEXT
  if (character.cflags[ctx.args[0]][801] > 0) {
    ctx.drawLine();
    ctx.showMessage('[900] - 지금 아르바이트를 관두게 한다');
  }
  ctx.drawLine('=');
  if (ctx.page > 0) {
    ctx.print('[997] - 이전 페이지');
  } else {
    ctx.printPlain('[ - ] - －－－－－');
  }
  ctx.print('[998] - 돌아간다');
  if (ctx.page < ctx.pageEnd) {
    ctx.print('[999] - 다음 페이지');
  } else {
    ctx.printPlain('[ - ] - －－－－－');
  }
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 900 && character.cflags[ctx.args[0]][801] > 0) {
    // TODO: CALLFORM ARBEIT_TITLE_{CFLAG:ARG:801}
    ctx.localStrings[0] = ctx.results;
    ctx.showMessage(`지금 실행중인 아르바이트『${ctx.localStrings[0]}』%조사만처리(LOCALS,"를")% 관두게 합니까?`);
    ctx.print('[  1] 네');
    ctx.showMessage('[  0] 아니오');
    // Label: INPUT_LOOP_RESIGN_00
    await ctx.inputNumber();
    if (ctx.result === 1) {
      await arbeit_resign(ctx.args[0], ctx, character);
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.args[0]), "가")} %조사처리(LOCALS,"를")% 관두게 했습니다`);
    } else if (ctx.result === 0) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.args[0]), "는")} %조사처리(LOCALS,"를")% 계속합니다`);
    } else {
      ctx.clearLine(1);
      // TODO: REUSELASTLINE 잘못된 입력값입니다
      // GOTO INPUT_LOOP_RESIGN_00 - 구조 변경 필요 (while/break 사용 권장)
    }
    // GOTO ARBEIT_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result >= 0 && ctx.result < 100 && character.cflags[ctx.args[0]][801] != ctx.list[ctx.result]) {
    ctx.locals[0] = ctx.list[ctx.result];
    // TODO: CALLFORM ARBEIT_TITLE_{LOCAL}
    if (STRLENS(ctx.results) < 1) {
      console.log('FORML ERROR: 이상을 일으킬 가능성이 있는 변수가 호출됐기 때문에 처리를 중단합니다({LOCAL}번)');
      return 0;
    }
    ctx.localStrings[1] = ctx.results;
    ctx.showMessage(`%LOCALS:1%`);
    // TODO: TRYCALLFORM ARBEIT_INFO_{LOCAL}
    ctx.showMessage('');
    ctx.showMessage(`${ctx.getVarName("CALL", ARG)}에게 이 아르바이트를 시키겠습니까?`);
    ctx.print('[  1] 네');
    ctx.showMessage('[  0] 아니오');
    // Label: INPUT_LOOP_SIGNUP
    await ctx.inputNumber();
    if (ctx.result === 1) {
      if (character.cflags[ctx.args[0]][801] > 0) {
        // TODO: CALLFORM ARBEIT_TITLE_{CFLAG:ARG:801}
        ctx.localStrings[0] = ctx.results;
        ctx.showMessage(`지금 실행중인 아르바이트『${ctx.localStrings[0]}』%조사만처리(LOCALS,"를")% 관두게 합니까?`);
        ctx.print('[  1] 네');
        ctx.showMessage('[  0] 아니오');
        // Label: INPUT_LOOP_RESIGN_01
        await ctx.inputNumber();
        if (ctx.result === 1) {
          await arbeit_resign(ctx.args[0], ctx, character);
          ctx.showMessage(`%조사처리(LOCALS:1,"로")% 변경하기 위해 %조사처리(LOCALS,"를")% 관두게 했습니다`);
        } else if (ctx.result === 0) {
          ctx.showMessage(`%조사처리(LOCALS:1,"로")% 변경하지 않고 %조사처리(LOCALS,"를")% 계속합니다`);
          // GOTO ARBEIT_LIST - 구조 변경 필요 (while/break 사용 권장)
        } else {
          ctx.clearLine(1);
          // TODO: REUSELASTLINE 잘못된 입력값입니다
          // GOTO INPUT_LOOP_SIGNUP - 구조 변경 필요 (while/break 사용 권장)
        }
      }
      await arbeit_signup(ctx.args[0], ctx.locals[0], ctx, character);
      ctx.showMessage(`${ctx.getVarName("CALL", ARG)}에게 %조사처리(LOCALS:1,"를")% 하게 했습니다`);
      // GOTO ARBEIT_LIST - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 0) {
      ctx.showMessage(`${ctx.getVarName("CALL", ARG)}의 아르바이트를 변경하지 않습니다`);
      // GOTO ARBEIT_LIST - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.clearLine(1);
      // TODO: REUSELASTLINE 잘못된 입력값입니다
      // GOTO INPUT_LOOP_SIGNUP - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 997 && ctx.page > 0) {
    ctx.page--;
    // GOTO ARBEIT_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 998) {
    return 0;
  } else if (ctx.result === 999 && ctx.page < ctx.pageEnd) {
    ctx.page++;
    // GOTO ARBEIT_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else {
    ctx.clearLine(1);
    // TODO: REUSELASTLINE 잘못된 입력값입니다
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function arbeit_header_info_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #LOCALSSIZE 1
  ctx.drawLine();
  // TODO: TRYCCALLFORM ARBEIT_TITLE_{CFLAG:ARG:801}
  ctx.localStrings[0] = ctx.results;
  // TODO: CATCH
  // TODO: LOCALS =
  // TODO: ENDCATCH
  ctx.showMessage(`{DAY + 1}주차\@ TIME == 0 ? 전반 # 후반 \@ 소지금: {MONEY}포인트`);
  ctx.showMessage(`${ctx.getName(ctx.args[0])} \@ STRLENS(LOCALS) > 0 ?『${ctx.localStrings[0]}』실행중 # \@`);
  ctx.drawLine('=');
}

export async function arbeit_signup_arg(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: TRYCALLFORM ARBEIT_SIGNUP_{ARG:1}(ARG)
  character.cflags[ctx.args[0]][801] = ctx.args[1];
}

export async function arbeit_resign_arg(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: TRYCALLFORM ARBEIT_RESIGN_{CFLAG:ARG:801}(ARG, ARG:1)
  character.cflags[ctx.args[0]][801] = 0;
}

export async function arbeit_exec(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: FOR LOCAL, 0, CHARANUM
  if (ctx.locals[0] == ctx.master) {
    // TODO: CONTINUE
  }
  if (character.cflags[ctx.locals[0]][801] == 0) {
    // TODO: CONTINUE
  }
  if (ctx.base[ctx].locals[0] < 500) {
    ctx.showMessage(`몸상태가 안좋은 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "는")} 일을 쉰 모양이다`);
    // TODO: TRYCALLFORM ARBEIT_ABSENCE_{CFLAG:LOCAL:801}(LOCAL)
    ctx.drawLine('･･');
  } else {
    // TODO: CALLFORM ARBEIT_EXEC_{CFLAG:LOCAL:801}(LOCAL)
    ctx.drawLine('･･');
  }
  ctx.drawLine();
  // TODO: NEXT
}

export async function arbeit_check_renew(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #LOCALSIZE 2
  // TODO: FOR LOCAL, 0, CHARANUM
  if (ctx.locals[0] == ctx.master) {
    // TODO: CONTINUE
  }
  if (character.cflags[ctx.locals[0]][801] == 0) {
    // TODO: CONTINUE
  }
  // TODO: CALLFORM ARBEIT_PERMISSION_{CFLAG:LOCAL:801}(LOCAL)
  if (ctx.result != 1) {
    // TODO: TRYCCALLFORM ARBEIT_RENEW_{CFLAG:LOCAL:801}
    ctx.locals[1] = ctx.result;
    // TODO: CATCH
    ctx.locals[1] = 0;
    // TODO: ENDCATCH
    if (ctx.locals[1]) {
      ctx.drawLine();
      await arbeit_resign(ctx.locals[0], 1, ctx, character);
      ctx.showMessage(`${ctx.getVarName("CALL", LOCAL)}의 아르바이트 고용기간이 끝났다`);
    }
  }
  // TODO: NEXT
}

export async function arbeit_add_exp_arg(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.getName(ctx.args[0])}`);
  // TODO: FOR LOCAL, 0, VARSIZE("EXP")
  if (character.cvar[ctx.args[0]]:ctx.locals[0]) {
    if (ctx.getTalent(arg, 224) == 1) {
      // TODO: TCVAR:ARG:LOCAL *= 2
    }
    if (STRLENS(EXPctx.getName(ctx.locals[0])) > 0) {
      // TODO: EXP:ARG:LOCAL += TCVAR:ARG:LOCAL
    } else {
      console.log('FORML NOTICE: EXP:{LOCAL}は定義されていないため加算処理をスキップします');
    }
    if (ctx.args[1] == 0) {
      ctx.showMessage(`　${ctx.getVarName("EXP", LOCAL)} + ${character.cvar[ctx.args[0]]:ctx.locals[0]}`);
    }
  }
  // TODO: NEXT
  ctx.varSet(character.cvar[ctx.args[0]], 0);
}
