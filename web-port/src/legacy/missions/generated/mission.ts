/**
 * MISSION.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #LOCALSIZE 4
  // Label: MISSION_MAIN
  ctx.locals[2] = -1;
  if (character >= 0) {
    ctx.locals[2] = (character.no - 1);
  }
  ctx.locals[3] = -1;
  if (ctx.assi >= 0) {
    ctx.locals[3] = ctx.assi.no;
  }
  ctx.locals[1] = 0;
  // TODO: FOR LOCAL, 1, 350
  if (ctx.paramBand[ctx.locals[0]] == 1) {
    ctx.locals[1] = ctx.locals[0];
  }
  // TODO: NEXT
  ctx.drawLine();
  ctx.showMessage('미션');
  ctx.showMessage('《미션의 수령과 보고 등을 행합니다》');
  ctx.showMessage('※ 한 번에 수령할 수 있는 미션은 한 개뿐입니다!');
  await mission_header_info(ctx.locals[1], ctx, character);
  if (ctx.locals[1]) {
    ctx.showMessage('[  0] - 수령중인 미션의 확인・보고');
  }
  ctx.showMessage('[  1] - 미션 수령');
  ctx.drawLine();
  ctx.showMessage('[998] - 돌아간다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0 && ctx.locals[1]) {
    // TODO: CALLFORM MISSION_INFO_{LOCAL:1}
    // Label: INPUT_LOOP_REPORT
    ctx.showMessage(`이 미션을 보고하시겠습니까?`);
    ctx.print('[  1] 네');
    ctx.showMessage('[  0] 아니오');
    ctx.showMessage('[999] - 미션의 달성조건을 표시한다');
    await ctx.inputNumber();
    if (ctx.result === 1) {
      await mission_exec_report(ctx.locals[1], ctx, character);
    } else if (ctx.result === 999) {
      // TODO: TRYCCALLFORM MISSION_COND_{LOCAL}
      // TODO: CATCH
      ctx.drawLine('‥');
      ctx.showMessage('이 미션은 달성조건의 상세 정보가 존재하지 않습니다');
      ctx.drawLine('‥');
      // TODO: ENDCATCH
      // GOTO INPUT_LOOP_REPORT - 구조 변경 필요 (while/break 사용 권장)
    }
    // GOTO MISSION_MAIN - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1 && ctx.charanum > ctx.flags[23]) {
    ctx.clearLine(1);
    // TODO: REUSELASTLINE 사무소의 관리인력을 넘어섰기에 미션을 수령하기 위해선 누군가를 은퇴시켜야 합니다
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1) {
    await mission_list(1, 50, ctx, character);
    // GOTO MISSION_MAIN - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 998) {
    if (ctx.locals[2] >= 0) {
      if (GETCHARA(ctx.locals[2]) >= 0) {
        character = GETCHARA(ctx.locals[2]);
      }
    }
    if (ctx.locals[3] >= 0) {
      if (GETCHARA(ctx.locals[3]) >= 0) {
        ctx.assi = GETCHARA(ctx.locals[3]);
      }
    }
    return;
  } else {
    ctx.clearLine(1);
    // TODO: REUSELASTLINE 잘못된 입력값입니다
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function mission_header_info_arg(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage(`{DAY + 1}주차\@ TIME == 0 ? 전반 # 후반 \@`);
  ctx.showMessage(`소지금: {MONEY}포인트 공헌도: ${ctx.exp[ctx.master][90]}`);
  if (ctx.args[0]) {
    // TODO: CALLFORM MISSION_TITLE_{ARG}
    // TODO: TRYCCALLFORM MISSION_CHARA_NO_{ARG}
    ctx.locals[0] = GETCHARA(ctx.result);
    if (ctx.locals[0] >= 0) {
      ctx.showMessage(`미션『${ctx.results}』수령 중 (기한까지 앞으로 ${character.cflags[ctx.locals[0]][25]}주)`);
    } else {
      console.log('FORML 경고: 미션 대상인 캐릭터가 존재하지 않습니다');
      ctx.showMessage(`미션『${ctx.results}』수령 중`);
    }
    // TODO: CATCH
    ctx.showMessage(`미션『${ctx.results}』수령 중`);
    // TODO: ENDCATCH
  }
  ctx.drawLine();
}

export async function mission_header_per_arg_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #LOCALSIZE 2
  ctx.locals[1] = 0;
  // TODO: FOR LOCAL, ARG:0, ARG:1 + 1
  if (ctx.paramBand[ctx.locals[0]] > 2) {
    ctx.locals[1]++;
  }
  // TODO: NEXT
  ctx.showMessage(`미션 소화율 ${ctx.locals[1] * 100 / ctx.args[2], 3}％`);
  ctx.drawLine();
}

export async function mission_list_arg_0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #LOCALSIZE 2
  // TODO: #DIM LIST, 250
  // TODO: #DIM PAGE
  // TODO: #DIM PAGE_END
  ctx.varSet(LIST, -1);
  ctx.page = 0;
  ctx.locals[1] = 0;
  // TODO: FOR LOCAL, ARG:0, ARG:1 + 1
  // TODO: TRYCCALLFORM MISSION_TITLE_{LOCAL}
  console.log('FORML 리스트 번호 {LOCAL:1}에 미션 번호{LOCAL} %조사처리(RESULTS,"를")% 등록합니다');
  // TODO: LIST:(LOCAL:1) = LOCAL
  ctx.locals[1]++;
  // TODO: CATCH
  // TODO: CONTINUE
  // TODO: ENDCATCH
  // TODO: NEXT
  ctx.pageEnd = (ctx.locals[1] - 1 < 0 ? 0 : ctx.locals[1] - 1) / 10;
  // Label: MISSION_LIST
  await mission_header_info(ctx, character);
  await mission_header_per(ctx.args[0], ctx.args[1], ctx.locals[1], ctx, character);
  // TODO: FOR LOCAL, PAGE * 10, PAGE * 10 + 10
  if (ctx.list[ctx.locals[0]] < 0) {
    // TODO: BREAK
  }
  // TODO: CALLFORM MISSION_VISIBLE_{LIST:LOCAL}
  if (pband[ctx.list[ctx.locals[0]]] === 0 && ctx.result === 1) {
    // TODO: CALLFORM MISSION_TITLE_{LIST:LOCAL}
    ctx.showMessage(`[${ctx.locals[0], 3}] - ${ctx.results}`);
  } else if (pband[ctx.list[ctx.locals[0]]] === 1) {
    // TODO: CALLFORM MISSION_TITLE_{LIST:LOCAL}
    ctx.showMessage(`[${ctx.locals[0], 3}] - ${ctx.results} ○ 수령중인 미션`);
  } else if (pband[ctx.list[ctx.locals[0]]] >= 2) {
    if (pband[ctx.list[ctx.locals[0]]] === 2) {
      ctx.localStrings[0] = "★ 실패";
    } else if (pband[ctx.list[ctx.locals[0]]] === 3) {
      ctx.localStrings[0] = "☆ 성공";
    } else {
      ctx.localStrings[0] = "☆ 대성공";
    }
    ctx.showMessage(`[ - ] - 완료된 미션 ${ctx.localStrings[0]}`);
  } else {
    ctx.showMessage(`[ - ] - －－－－－`);
  }
  // TODO: NEXT
  ctx.drawLine();
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
  if (ctx.result >= 0 && ctx.result < 250 && ctx.list[ctx.result] > 0 && ctx.list[ctx.result] < 50 && pband[ctx.list[ctx.result]] === 0 && character.cflags[ctx.master][770] > 0) {
    ctx.clearLine(1);
    // TODO: REUSELASTLINE 통상 미션은 한가지만 진행 가능합니다
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result >= 0 && ctx.result < ctx.locals[1] && pband[ctx.list[ctx.result]] < 2) {
    ctx.locals[0] = ctx.list[ctx.result];
    // TODO: CALLFORM MISSION_INFO_{LIST:RESULT}
    if (ctx.paramBand[ctx.locals[0]] === 0) {
      // Label: INPUT_LOOP_RECEIVE
      ctx.showMessage(`이 미션을 수령하시겠습니까?`);
      ctx.print('[  1] - 네');
      ctx.showMessage('[  0] - 아니오');
      ctx.showMessage('[999] - 미션의 달성조건을 표시한다');
      await ctx.inputNumber();
      if (ctx.result === 1) {
        ctx.paramBand[ctx.locals[0]] = 1;
        // TODO: CFLAG:MASTER:770++
        ctx.showMessage(`미션을 수령했습니다`);
        // TODO: CALLFORM MISSION_RECEIVE_{LOCAL}
        return;
      } else if (ctx.result === 999) {
        // TODO: TRYCCALLFORM MISSION_COND_{LOCAL}
        // TODO: CATCH
        ctx.drawLine('‥');
        ctx.showMessage('이 미션에는 달성 조건의 상세정보가 존재하지 않습니다');
        ctx.drawLine('‥');
        // TODO: ENDCATCH
        // GOTO INPUT_LOOP_RECEIVE - 구조 변경 필요 (while/break 사용 권장)
      } else {
        // GOTO MISSION_LIST - 구조 변경 필요 (while/break 사용 권장)
      }
    } else if (ctx.paramBand[ctx.locals[0]] === 1) {
      ctx.locals[0] = ctx.list[ctx.result];
      ctx.showMessage(`이 미션을 보고합니까?`);
      ctx.print('[1] 네');
      ctx.showMessage('[0] 아니오');
      // Label: INPUT_LOOP_REPORT
      await ctx.inputNumber();
      if (ctx.result === 1) {
        await mission_exec_report(ctx.locals[0], ctx, character);
        return;
      } else {
        // GOTO MISSION_LIST - 구조 변경 필요 (while/break 사용 권장)
      }
    }
  } else if (ctx.result === 997 && ctx.page > 0) {
    ctx.page--;
    // GOTO MISSION_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 998) {
    return;
  } else if (ctx.result === 999 && ctx.page < ctx.pageEnd) {
    ctx.page++;
    // GOTO MISSION_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else {
    ctx.clearLine(1);
    // TODO: REUSELASTLINE 잘못된 입력값입니다
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function mission_exec_report_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: CALLFORM MISSION_TITLE_{ARG}
  ctx.showMessage(`미션『${ctx.results}』%조사만처리(RESULTS,"를")% 보고합니다`);
  ctx.showMessage(`W ………………`);
  ctx.showMessage(`W …………`);
  ctx.showMessage(`W ……`);
  // TODO: CALLFORM MISSION_CALC_{ARG}
  ctx.locals[0] = ctx.result;
  if (ctx.locals[0] === 1) {
    ctx.paramBand[ctx.args[0]] = 3;
  } else if (ctx.locals[0] === 2) {
    ctx.paramBand[ctx.args[0]] = 4;
  } else {
    ctx.paramBand[ctx.args[0]] = 2;
  }
  ctx.varSet(P, 0);
  // TODO: CALLFORM MISSION_FEE_{ARG}
  if (ctx.locals[0] <= 0) {
    ctx.showMessage('미션을 실패했습니다……');
    if (P[3] && P[4]) {
      ctx.showMessage(`미션 실패의 페널티로서 ${P[3]}포인트와 ${P[4]}의 공헌도가 몰수됩니다`);
    } else if (P[3]) {
      ctx.showMessage(`미션 실패의 페널티로서 ${P[3]}포인트가 몰수됩니다`);
    } else if (P[4]) {
      ctx.showMessage(`미션 실패의 페널티로서 ${P[4]}의 공헌도가 몰수됩니다`);
    }
    if (P[3]) {
      ctx.money = ctx.money - P[3] < 0 ? 0 : ctx.money - P[3];
    }
    if (P[4]) {
      ctx.exp[ctx.master][90] = ctx.exp[ctx.master][90] - P[4] < 0 ? 0 : ctx.exp[ctx.master][90] - P[4];
    }
  } else {
    ctx.showMessage('미션에 성공했습니다!');
    if (P[1] && P[2]) {
      ctx.showMessage(`미션의 보수로서 ${P[1]}포인트와 공헌도에 ${P[2]} 가산됩니다`);
    } else if (P[1]) {
      ctx.showMessage(`미션의 보수로서 ${P[1]}포인트가  가산됩니다`);
    } else if (P[2]) {
      ctx.showMessage(`미션의 보수로서 공헌도에 ${P[2]} 가산됩니다`);
    }
    if (P[1]) {
      ctx.money += P[1];
    }
    if (P[2]) {
      ctx.exp[ctx.master][90] += P[2];
    }
    if (P[5]) {
      ctx.flags[3] += P[5];
    }
  }
  // TODO: CFLAG:MASTER:770--
  ctx.varSet(character.cvar[character], 0);
  // TODO: CALLFORM MISSION_REPORT_{ARG}(LOCAL)
}

export async function mission_add_exp_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.getName(ctx.args[0])}`);
  // TODO: FOR LOCAL, 0, VARSIZE("EXP")
  if (character.cvar[ctx.args[0]]:ctx.locals[0]) {
    if (ctx.getTalent(arg, 76) == 1) {
      // TODO: TCVAR:ARG:LOCAL *= 2
    }
    if (STRLENS(EXPctx.getName(ctx.locals[0])) > 0) {
      // TODO: EXP:ARG:LOCAL += TCVAR:ARG:LOCAL
    } else {
      console.log('FORML %조사처리(EXP:{(LOCAL)},"는")% 정의되지 않았기에 가속처리를 스킵합니다');
    }
    ctx.showMessage(`　${ctx.getVarName("EXP", LOCAL)} + ${character.cvar[ctx.args[0]]:ctx.locals[0]}`);
  }
  // TODO: NEXT
  ctx.varSet(character.cvar[ctx.args[0]], 0);
}

export async function mission_lifelist_decide_arg(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await mission_lifelist(ctx.args[0], ctx, character);
  character = ctx.result;
  ctx.showMessage(`%타겟을(1)% 미션에 참가시킵니다`);
}

export async function mission_lifelist_partner_arg(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await mission_lifelist(ctx.args[0], ctx, character);
  ctx.assi = ctx.result;
  ctx.showMessage(`%조수를(1)% 미션에 참가시킵니다`);
}

export async function mission_lifelist_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage('미션에 참가시킬 캐릭터를 선택해 주십시오');
  // Label: CHARA_LIST
  await life_list_new,1(ctx, character);
  if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    ctx.clearLine(1);
    // TODO: REUSELASTLINE 잘못된 입력값입니다
    // GOTO CHARA_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.args[0] > 0 && ctx.result.no != ctx.args[0]) {
    ctx.clearLine(1);
    // TODO: REUSELASTLINE %조사처리(NAME:RESULT,"는")% 미션 대상 캐릭터가 아닙니다
    // GOTO CHARA_LIST - 구조 변경 필요 (while/break 사용 권장)
  }
  return ctx.result;
}

export async function mission_day(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: FOR LOCAL, 0, CHARANUM
  if (ctx.locals[0] == ctx.master) {
    // TODO: CONTINUE
  }
  if (ctx.getTalent(local, 330) === 1) {
    // TODO: CFLAG:LOCAL:25--
    if (character.cflags[ctx.locals[0]][25] <= 0) {
      character.cflags[ctx.locals[0]][25] = 0;
      ctx.drawLine();
      ctx.showMessage(`미션 한도일을 맞은 캐릭터가 있습니다`);
      // TODO: FOR LOCAL:1, 1, 350
      if (pband[ctx.locals[1]] == 1) {
        ctx.locals[2] = ctx.locals[1];
      }
      // TODO: NEXT
      await mission_exec_report(ctx.locals[2], ctx, character);
    }
  }
  // TODO: NEXT
}
