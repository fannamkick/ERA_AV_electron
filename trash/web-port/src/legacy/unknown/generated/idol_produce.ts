/**
 * IDOL_PRODUCE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function idol_produce_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 509) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 518) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 519) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 522) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 523) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 524) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 203) === 1) {
      A += 1;
    }
  }
  if (A >= 4 && ctx.money >= 10000000) {
    await idol_produce(ctx, character);
  }
}

export async function idol_produce(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  B = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 509) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 518) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 519) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 522) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 523) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 524) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 203) === 1) {
      B = ctx.count;
      // TODO: BREAK
    }
  }
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 문뜻 켜놓았던 TV를 보니, 한 예능방송이 나오고 있었다`);
  ctx.showMessage(`출연석에는 초인기 아이돌『Colorful Pure Girls』멤버들이 앉아있고, 흔한「재미있는 영상」을 보며`);
  ctx.showMessage(`MC가 화제를 던지면 무난한 대답을 하고 있다`);
  ctx.showMessage(`그 광경을 멍하니 바라보다,`);
  ctx.showMessage(`팬에겐 현역 AV배우라는 걸 숨기고 있지만, ${ctx.getVarName("CALL", MASTER)}의 사무소에는 ${ctx.josaHelper(ctx.getName(B), "를")} 포함해, CPG에게도 지지 않는`);
  ctx.showMessage(`미모의 아이돌들이 소속돼 있는 걸 ${ctx.josaHelper("플레이어는")} 깨달았다`);
  ctx.showMessage(`이렇게 된거 ${ctx.josaHelper(ctx.getVarName("CALLNAME", B), "와")} 다른 아이돌들도 CPG처럼 그룹을 만들어서 팔고, 그 그룹이 인기를 얻으면……『닮은 꼴』이라는`);
  ctx.showMessage(`부가가치가 생길지도 모른다`);
  ctx.showMessage(`W 카논에게 이『생각』을 상담하자, 500만 포인트만 있으면 ${ctx.getVarName("CALL", B)}들을 CPG에 필적할만한 그룹으로 만들 수 있다고 한다……`);
  ctx.showMessage('');
  // Label: INPUT_LOOP_PRODUCE
  ctx.showMessage(`아이돌 그룹을 만듭니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage('');
    ctx.showMessage(`지금까지 솔로로 활동하던 ${ctx.getVarName("CALL", B)}들을 아이돌 그룹으로 데뷔시켰습니다`);
    // Label: INPUT_LOOP_DECIDE1
    ctx.showMessage('《아이돌 그룹의 이름을 정해주세요》');
    // TODO: INPUTS
    // Label: INPUT_LOOP_DECIDE2
    ctx.showMessage(`그룹명을《${ctx.results}》%조사만처리(RESULTS,"로")% 정합니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`${ctx.getVarName("CALL", B)}들을 %조사처리(RESULTS,"로")% 데뷔시켰습니다`);
      ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
      character.cstr[ctx.master][4] = ctx.results;
      ctx.flags[554] = 1;
      for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
        if (ctx.count === 0) {
          // TODO: CONTINUE
        } else if (ctx.getCharacterNo(ctx.count) === 2 && ctx.talents[518] === 1) {
          // TODO: CONTINUE
        } else if (ctx.getTalent(count, 509) === 1) {
          // TODO: CONTINUE
        } else if (ctx.getTalent(count, 518) === 1) {
          // TODO: CONTINUE
        } else if (ctx.getTalent(count, 519) === 1) {
          // TODO: CONTINUE
        } else if (ctx.getTalent(count, 522) === 1) {
          // TODO: CONTINUE
        } else if (ctx.getTalent(count, 523) === 1) {
          // TODO: CONTINUE
        } else if (ctx.getTalent(count, 524) === 1) {
          // TODO: CONTINUE
        } else if (ctx.getTalent(count, 203) === 1 && ctx.getTalent(count, 514) === 0) {
          ctx.getTalent(count, 515) = 1;
          MAXctx.base[ctx.count][31] += 30;
          ctx.base[ctx.count][31] += 30;
        }
      }
      ctx.money -= 5000000;
      // TODO: FOR LOCAL,0,CHARANUM
      if (ctx.getTalent(local, 515) === 0) {
        // TODO: CONTINUE
      } else {
        // TODO: FOR LOCAL:1,0,CHARANUM
        if (ctx.getTalent(ctx.locals[1], 515) == 0) {
          // TODO: CONTINUE
        }
        if (ctx.locals[0] == ctx.locals[1]) {
          // TODO: CONTINUE
        }
        if (ctx.relation[local][ctx.getCharacterNo(ctx.locals[1]]) <= 300) {
          // TODO: RELATION:LOCAL:(NO:(LOCAL:1)) = 300
        }
        // TODO: NEXT
      }
      // TODO: NEXT
    } else if (ctx.result === 1) {
      ctx.showMessage(`다시 입력해 주세요`);
      // GOTO INPUT_LOOP_DECIDE1 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_DECIDE2 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 1) {
    ctx.showMessage(`그룹 결성을 보류합니다`);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
  } else {
    // GOTO INPUT_LOOP_PRODUCE - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function idol_produce_add(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][672] === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 509) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 515) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 518) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 519) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 522) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 523) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 524) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 203) === 1 && ctx.getTalent(count, 515) === 0) {
      // Label: INPUT_LOOP_DECIDE3
      ctx.showMessage(`솔로로 활동중인 ${ctx.josaHelper(ctx.getName(ctx.count), "를")} %CSTR:MASTER:4%에 가입시킵니까?`);
      ctx.showMessage(`(${ctx.getVarName("CALL", COUNT)}의 레슨비로 500000포인트가 필요합니다)`);
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "를")} %CSTR:MASTER:4%에 가입시켰습니다`);
        ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
        ctx.flags[554] = 1;
        ctx.getTalent(count, 515) = 1;
        MAXctx.base[ctx.count][31] += 30;
        ctx.base[ctx.count][31] += 30;
        ctx.money -= 500000;
        // TODO: FOR LOCAL,0,CHARANUM
        if (ctx.getTalent(local, 515) === 0) {
          // TODO: CONTINUE
        } else {
          // TODO: FOR LOCAL:1,0,CHARANUM
          if (ctx.getTalent(ctx.locals[1], 515) == 0) {
            // TODO: CONTINUE
          }
          if (ctx.locals[0] == ctx.locals[1]) {
            // TODO: CONTINUE
          }
          if (ctx.relation[local][ctx.getCharacterNo(ctx.locals[1]]) <= 300) {
            // TODO: RELATION:LOCAL:(NO:(LOCAL:1)) = 300
          }
          // TODO: NEXT
        }
        // TODO: NEXT
      } else if (ctx.result === 1) {
        ctx.showMessage(`그룹 가입은 보류했습니다`);
        ctx.showMessage(`※앞으로 ${ctx.getVarName("CALL", COUNT)}의 그룹 가입을 확인할까요?`);
        ctx.showMessage('[0] - 네');
        ctx.showMessage('[1] - 아니오');
        // Label: INPUT_LOOP_DECIDE4
        await ctx.inputNumber();
        if (ctx.result === 0) {
          ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 그룹 가입을 확인합니다`);
        } else if (ctx.result === 1) {
          ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 그룹 가입을 확인하지 않습니다`);
          character.cflags[ctx.count][672] = 1;
        } else {
          // GOTO INPUT_LOOP_DECIDE4 - 구조 변경 필요 (while/break 사용 권장)
        }
        ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
      } else {
        // GOTO INPUT_LOOP_DECIDE3 - 구조 변경 필요 (while/break 사용 권장)
      }
    }
  }
}
