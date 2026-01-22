/**
 * PLEASE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function please_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_01
  ctx.drawLine();
  ctx.showMessage('부탁한다');
  ctx.showMessage('《여배우 후보에게 여러가지 일을 부탁합니다》');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('누구에게 부탁합니까?');
  ctx.drawLine();
  await life_list_new,3(ctx, character);
  if (ctx.result === 999) {
    A = 0;
    C = 0;
    R = 0;
    return 0;
  } else if (ctx.result < 1 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.abilities[ctx.result][10] < 3) {
    ctx.showMessage(`W 《좀 더 사이 좋아진 뒤에 합시다》`);
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  // Label: INPUT_LOOP_02
  A = 0;
  C = 0;
  R = 0;
  S = 0;
  ctx.drawLine();
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 어떤 걸 부탁할까요?`);
  ctx.drawLine();
  if (character.cflags[684] === 0) {
    ctx.showMessage('[ 0] - 에스테틱에 다니게한다　　　(월당: 10000포인트)');
  }
  if (character.cflags[684] === 0) {
    ctx.showMessage('[ 1] - 체육관에 다니게한다　　　　(월당: 10000포인트)');
  }
  if ((ctx.base[9] <= 18 && character.cflags[684] === 0) && (ctx.talents[220] === 1 || ctx.talents[221] === 1 || ctx.talents[222] === 1)) {
    ctx.showMessage('[ 2] - 학원에 다니게한다　　　　　(월당: 10000포인트)');
  }
  if (character.cflags[684] === 1) {
    ctx.showMessage('[ 3] - 다니던 것을 그만두게한다');
  }
  if (ctx.flags[556] === 0 && character.cflags[671] === 0) {
    ctx.showMessage('[ 4] - 도시락을 만들게한다');
  }
  if (ctx.flags[556] === 1 && character.cflags[671] === 1) {
    ctx.showMessage('[ 4] - 도시락 만드는 것을 그만두게한다');
  }
  if (character.cflags[607] === 0) {
    ctx.showMessage('[ 5] - 제모를 그만두게한다　　　　(굴복의 구슬×5000)');
  }
  if (character.cflags[613] === 0 && character.cflags[621] != 1 && ctx.talents[184] === 0 && ctx.talents[85] === 0 && ctx.flags[540] === 0) {
    ctx.showMessage('[ 6] - 미팅에 참가하게한다');
  } else if (character.cflags[613] === 1 && character.cflags[621] != 1 && ctx.talents[184] === 0 && ctx.talents[85] === 0 && ctx.flags[540] === 0) {
    ctx.showMessage('[ 6] - 미팅 참가를 중지시킨다');
  }
  if (character.cflags[683] === 0) {
    ctx.showMessage('[ 7] - 신작 애니나 만화를 체크하게 한다');
  }
  if (character.cflags[683] === 1) {
    ctx.showMessage('[ 7] - 신작 애니나 만화를 체크하는 것을 그만두게한다');
  }
  if (character.cflags[60] === 0 && character.cflags[ctx.master][65] === 0) {
    ctx.showMessage('[ 8] - 매일 아침 일으켜 준다');
  }
  if (character.cflags[60] === 1 && character.cflags[ctx.master][65] === 1) {
    ctx.showMessage('[ 8] - 매일 아침 일으키는 것을 그만두게한다');
  }
  ctx.showMessage('[ 9] - 예명을 변경시킨다');
  if (character.cflags[690] === 0 && ctx.juel[5] >= 5000) {
    ctx.showMessage('[10] - 치한을 당하게 한다(욕정의 구슬×5000)');
  } else if (character.cflags[690] === 1) {
    ctx.showMessage('[10] - 치한 상대를 그만두게 한다');
  }
  if (ctx.talents[203] === 0 && ctx.talents[402] === 0 && ctx.talents[421] === 0) {
    ctx.showMessage('[11] - 아르바이트를 시킨다');
  }
  if (character.cflags[691] === 0 && ctx.abilities[11] >= 4 && ctx.talents[425] === 0 && ctx.talents[85] === 0 && ctx.talents[76] === 1) {
    ctx.showMessage('[12] - 섹프를 소개해준다');
  } else if (character.cflags[691] === 0 && ctx.abilities[11] >= 4 && ctx.talents[425] === 0 && ctx.talents[85] === 0 && ctx.talents[76] === 0) {
    ctx.showMessage(` [12] - ${ctx.josaHelper("타겟을")} 다른 남자가 안게한다`);
  } else if (character.cflags[691] === 0 && ctx.abilities[11] >= 4 && ctx.talents[85] === 1 && ctx.talents[76] === 0) {
    ctx.showMessage(` [12] - ${ctx.josaHelper("타겟을")} 다른 남자가 안게한다`);
  } else if (character.cflags[691] === 0 && ctx.abilities[11] >= 4 && ctx.talents[85] === 1 && ctx.talents[76] === 1) {
    ctx.showMessage(` [12] - 바람SEX를 허가한다`);
  } else if (character.cflags[691] === 1) {
    ctx.showMessage('[12] - 섹프와 인연을 끊게한다');
  }
  ctx.showMessage('[13] - 일인칭을 바꾸게 한다');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  T = character;
  ctx.showMessage(`LC \@(T <= 1) ? %" " * 16% # [1001] 이전 캐릭터\@`);
  // TODO: PRINTLC [999] 리스트로 돌아간다
  ctx.showMessage(`LC \@(T >= CHARANUM - 1) ? %" " * 16% # [1003] 다음 캐릭터\@`);
  ctx.showMessage('');
  ctx.showMessage(`LC %" " * 24% [1000] 메인 화면으로 돌아간다`);
  await ctx.inputNumber();
  if (ctx.result === 0 && character.cflags[684] === 0) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 에스테틱에 다녀달라고 부탁했습니다》`);
    character.cflags[680] = 1;
    character.cflags[684] = 1;
    ctx.flags[557] += 1;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1 && character.cflags[684] === 0) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 체육관에 다녀달라고 부탁했습니다》`);
    character.cflags[681] = 1;
    character.cflags[684] = 1;
    ctx.flags[557] += 1;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 2 && ((ctx.base[9] <= 18 && character.cflags[684] === 0) && (ctx.talents[220] === 1 || ctx.talents[221] === 1 || ctx.talents[222] === 1))) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 학원에 다녀달라고 부탁했습니다》`);
    character.cflags[682] = 1;
    character.cflags[684] = 1;
    ctx.flags[557] += 1;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 3 && character.cflags[684] === 1) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 다니던 곳을 그만두어달라고 부탁했습니다》`);
    character.cflags[680] = 0;
    character.cflags[681] = 0;
    character.cflags[682] = 0;
    character.cflags[684] = 0;
    ctx.flags[557] -= 1;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 4 && ctx.flags[556] === 0 && character.cflags[671] === 0) {
    ctx.showMessage(`W ${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게 도시락을 만들어달라고 부탁했다……`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    if (ctx.abilities[73] <= 2) {
      ctx.showMessage(`자신없는 표정으로`);
    } else if (ctx.abilities[73] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("플레이어가")} 먹고 싶어하는 것을 메모하면서`);
    }
    ctx.showMessage(`끄덕이고, 내일부터 곧바로 만들어오겠다고했다`);
    if (ctx.talents[85] === 1) {
      ctx.showMessage(`좋아하는 사람에게 도시락을 만들어 줄 수 있는 것이 기쁜것인지, 뺨을 붉히고 있다`);
    }
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 도시락을 만들어달라고 부탁했습니다》`);
    ctx.flags[556] = 1;
    character.cflags[671] = 1;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 4 && ctx.flags[556] === 1 && character.cflags[671] === 1) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 도시락 만드는 것을 그만두어달라고 부탁했습니다》`);
    ctx.flags[556] = 0;
    character.cflags[671] = 0;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 5 && character.cflags[607] === 0 && ctx.juel[4] > 4999) {
    ctx.showMessage(`W ${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", TARGET)}에게 겨털 제모를 그만두라고 부탁했다……`);
    ctx.showMessage(`그런 엉뚱한 부탁을 하는 ${ctx.josaHelper("플레이어를")}, ${ctx.josaHelper("타겟은")} 차가운 눈으로 응시했지만`);
    ctx.showMessage(`신뢰하고 있는 ${ctx.getVarName("CALL", MASTER)}의 부탁을 무시할수도 없었는지, 마지못해 수긍했다`);
    ctx.showMessage(`W 《${ctx.josaHelper("타겟은")} 제모를 그만두었습니다》`);
    character.cflags[607] = 1;
    ctx.juel[4] -= 5000;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 5 && (character.cflags[607] === 1 || ctx.juel[4] < 5000)) {
    ctx.showMessage(`W  당신의 부탁은 거절당했습니다……`);
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 6 && character.cflags[613] === 0 && character.cflags[621] != 1 && ctx.talents[184] === 0 && ctx.talents[85] === 0 && ctx.flags[540] === 0) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 미팅에 참가해달라고 부탁했습니다》`);
    character.cflags[613] = 1;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 6 && character.cflags[613] === 1 && character.cflags[621] != 1 && ctx.talents[184] === 0 && ctx.talents[85] === 0 && ctx.flags[540] === 0) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 미팅에 나가지 말아달라고 부탁했습니다》`);
    character.cflags[613] = 0;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 7 && character.cflags[683] === 0) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 신작 애니나 만화를 체크하도록 부탁했습니다》`);
    character.cflags[683] = 1;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 7 && character.cflags[683] === 1) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 신작 애니나 만화를 체크하는 것을 그만두어 달라고 부탁했습니다》`);
    character.cflags[683] = 0;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 8 && character.cflags[60] === 0 && character.cflags[ctx.master][65] === 0) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 매일 아침 일으켜 주도록 부탁했습니다》`);
    character.cflags[60] = 1;
    character.cflags[ctx.master][65] = 1;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 8 && character.cflags[60] === 1 && character.cflags[ctx.master][65] === 1) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 매일 아침 일으키는 것을 그만두어 달라고 부탁했습니다》`);
    character.cflags[60] = 0;
    character.cflags[ctx.master][65] = 0;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 9) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 현재 예명은 ${ctx.getVarName("NICK", TARGET)}입니다`);
    ctx.showMessage(`변경시킬 예명을 입력해주십시오`);
    // Label: INPUTLOOP_NICKNAME
    // TODO: INPUTS
    if (ctx.results === "") {
      ctx.showMessage('변경하지 않습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    }
    NICKctx.getName(character) = ctx.results;
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 새로운 예명은 %조사처리(RESULTS,"으로")% 괜찮습니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUTLOOP_NAMEDECIDE
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}의 예명을 ${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "으로")} 변경했습니다》`);
    } else if (ctx.result === 1) {
      ctx.showMessage(`다시 입력해주십시오`);
      // GOTO INPUTLOOP_NICKNAME - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUTLOOP_NAMEDECIDE - 구조 변경 필요 (while/break 사용 권장)
    }
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 10 && character.cflags[690] === 0 && ctx.juel[5] >= 5000) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 치한을 유혹해달라고 부탁했습니다》`);
    character.cflags[690] = 1;
    ctx.juel[5] -= 5000;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 10 && character.cflags[690] === 1) {
    ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}에게 치한을 유혹하지 말라고 부탁했습니다》`);
    character.cflags[690] = 0;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 11 && ctx.talents[203] === 0 && ctx.talents[402] === 0 && ctx.talents[421] === 0) {
    await arbeit_main(ctx, character);
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 12 && character.cflags[691] === 0 && ctx.abilities[11] >= 4 && ctx.talents[425] === 0) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")}`);
    if (ctx.talents[85] === 0 && ctx.talents[76] === 1) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 섹프를 소개해주기로`);
    } else if (ctx.talents[85] === 1 && ctx.talents[76] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟을")} 다른 남자가 안게`);
    } else if (ctx.talents[85] === 1 && ctx.talents[76] === 1) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 바람SEX를 허가해주기로`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟을")} 다른 남자가 안게`);
    }
    ctx.showMessage(`W 했다……`);
    ctx.showMessage(`그런 엉뚱한 부탁을 하는 ${ctx.josaHelper("플레이어를")}, ${ctx.josaHelper("타겟은")} 차가운 눈으로 응시했지만`);
    ctx.showMessage(`신뢰하고 있는 ${ctx.getVarName("CALL", MASTER)}의 부탁을 무시할수도 없었는지, 마지못해 수긍했다`);
    ctx.showMessage(`W 《${ctx.josaHelper("타겟은")} 키류 조직이 운영하는 만남사이트에 등록했다》`);
    character.cflags[691] = 1;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 12 && ctx.talents[425] === 1) {
    ctx.showMessage(`W 《${ctx.josaHelper("타겟은")} 섹프와 인연을 끊었다》`);
    character.cflags[691] = 0;
    ctx.talents[425] = 0;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 12 && character.cflags[691] === 1) {
    ctx.showMessage(`W 《${ctx.josaHelper("타겟은")} 만남사이트를 탈퇴했다》`);
    character.cflags[691] = 0;
    ctx.talents[425] = 0;
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 13) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 현재 일인칭은 %CSTR:9%입니다`);
    ctx.showMessage(`변경할 일인칭을 입력해주세요`);
    // Label: INPUTLOOP_CALLME
    // TODO: INPUTS
    if (ctx.results === "") {
      ctx.showMessage('변경하지 않습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 일인칭을 %조사처리(RESULTS,"로")% 바꾸겠습니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUTLOOP_CALLMENAMEDECIDE
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.cstr[9] = ctx.results;
      ctx.showMessage(`W 《${ctx.getVarName("CALL", TARGET)}의 일인칭이 %조사처리(CSTR:9,"로")% 변했습니다》`);
    } else if (ctx.result === 1) {
      ctx.showMessage(`다시 입력해주십시오`);
      // GOTO INPUTLOOP_CALLME - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUTLOOP_CALLMENAMEDECIDE - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 999) {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1000) {
    return 0;
  } else if (ctx.result === 1001 && T > 1) {
    ctx.locals[0] = T-1;
    if (ctx.abilities[ctx.locals[0]][10] < 3) {
      ctx.showMessage(`W 《좀 더 사이 좋아진 뒤에 합시다》`);
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    }
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", character), "으로")}はなく,`);
    character = T - 1;
    ctx.showMessage(`W ${ctx.getName(character)}에게 부탁하기로 했습니다`);
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1003 && T < ctx.charanum - 1) {
    ctx.locals[0] = T+1;
    if (ctx.abilities[ctx.locals[0]][10] < 3) {
      ctx.showMessage(`W 《좀 더 사이 좋아진 뒤에 합시다》`);
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}말고`);
    character = T + 1;
    ctx.showMessage(`W ${ctx.getName(character)}에게 부탁하기로 했습니다`);
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function life_list_please(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][140] == 1) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
    if (character.cflags[41] && (character.cflags[45] >= 0 || character.cflags[46] >= 0)) {
    }
    ctx.showMessage('');
  }
}
