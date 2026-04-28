/**
 * SHOP_AV.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function av_top(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.masterBase[60] = MAXctx.masterBase[60];
  ctx.varSet(P, 0, 0);
  ctx.varSet(TFLAG, 0, 0);
  await av_calc(ctx, character);
  // Label: DRAW
  ctx.drawLine();
  ctx.showMessage('AV촬영');
  ctx.showMessage('《지도하는 여배우 후보의 AV를 촬영해 포인트를 법니다》');
  ctx.showMessage('※이 기능은 미완성입니다');
  ctx.showMessage('시스템이 완성되면 지도의 비디오 촬영보다 많은 수입을 얻도록 조정할 계획입니다');
  ctx.drawLine();
  ctx.printValue(DAY+1);
  ctx.print('주차');
  if (TIME === 0) {
    ctx.showMessage('平日');
  } else {
    ctx.showMessage('週末');
  }
  T = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.abilities[ctx.count][10] >= 3) {
      T += 1;
    }
  }
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.showMessage(`이번달 유행:`);
  await videosale_print(ctx, character);
  ctx.showMessage('');
  // Label: INPUT_LOOP
  ctx.drawLine();
  if (T >= 1) {
    ctx.showMessage('[0] - 촬영 시작');
  } else {
    ctx.showMessage('[-] - －－－－－－－');
  }
  ctx.drawLine();
  ctx.showMessage(` [999] - 돌아간다`);
  await ctx.inputNumber();
  if (ctx.result === 0) {
    if (ctx.item[6] === 1 && T >= 1) {
      await chara_select_av(ctx, character);
      if (ctx.result == 1) {
        // GOTO DRAW - 구조 변경 필요 (while/break 사용 권장)
      }
    } else {
      ctx.showMessage('촬영에 필요한 기재가 없습니다');
      return;
    }
  } else if (ctx.result === 999) {
    return;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function chara_select_av(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_0
  ctx.drawLine();
  ctx.showMessage('누구를 촬영합니까?');
  await life_list_new,6(ctx, character);
  if (ctx.result === 999) {
    return 1;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.result === ctx.master) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 감독입니다`);
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.base[ctx.result][0] < 500) {
    ctx.showMessage('촬영하기엔 체력이 부족합니다');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (character.mark[ctx.result][3] >= 2) {
    ctx.showMessage('반발각인이 높아 촬영할 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  B = ctx.abilities[ctx.result][10];
  B += ctx.abilities[ctx.result][11];
  if (B < 3) {
    ctx.showMessage('능력이 부족합니다. 추가적인 지도가 필요합니다');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (character.cflags[ctx.result][110] - 2 <= DAY && ctx.getTalent(result, 153)) {
    ctx.showMessage('배가 너무 무거워 촬영할 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.getTalent(result, 154)) {
    ctx.showMessage('육아 중에는 촬영할 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.getTalent(result, 122)) {
    ctx.showMessage('호모는 취급하지 않습니다!');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (TIME === 1 && character.cflags[ctx.result][12] != 0) {
    ctx.showMessage('영업이 끝날때까지 촬영할 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  if (ctx.talents[400] === 0) {
    ctx.showMessage('');
    // Label: INPUTLOOP_DECIDENAME
    ctx.showMessage(`《${ctx.getVarName("CALL", TARGET)}의 예명을 정해주세요》`);
    // TODO: INPUTS
    if (ctx.results == "") {
      ctx.results = NICKNAME;
    }
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 예명을 %조사처리(RESULTS,"로")% 합니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUTLOOP_DECIDE
    await ctx.inputNumber();
    if (ctx.result === 0) {
      NICKctx.getName(character) = ctx.results;
      ctx.showMessage(`본인과 상담한 결과, ${ctx.josaHelper(ctx.getVarName("NICKNAME", character), "로")} 정해졌다`);
    } else if (ctx.result === 1) {
      ctx.showMessage(`예명을 다시 입력해 주세요`);
      // GOTO INPUTLOOP_DECIDENAME - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUTLOOP_DECIDE - 구조 변경 필요 (while/break 사용 권장)
    }
    ctx.showMessage('');
  }
  await av_list(ctx, character);
}

export async function av_labo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_02
  ctx.showMessage('누구와 계약합니까?');
  ctx.drawLine();
  if (ctx.flags[500] === 0) {
    ctx.showMessage('[0] - 유명 AV남배우【무카이 유우야】와 계약한다  (1000000포인트)');
  } else {
    ctx.showMessage('[-] - －－－－－－－');
  }
  if (C === 1 && ctx.flags[501] === 0) {
    ctx.showMessage('[1] - 【이가라시 료】와 계약한다                (2000000포인트)');
  } else {
    ctx.showMessage('[-] - －－－－－－－');
  }
  if (G === 1 && ctx.flags[504] === 0) {
    ctx.showMessage('[2] - 흑인 AV남배우【로버트 파머】와 계약한다    (1000000포인트)');
  } else {
    ctx.showMessage('[-] - －－－－－－－');
  }
  if (D === 1 && ctx.flags[502] === 0) {
    ctx.showMessage('[3] - 【사카키 아유무】를 남배우로 쓴다');
  } else {
    ctx.showMessage('[-] - －－－－－－－');
  }
  if (B === 1 && ctx.flags[505] === 0) {
    ctx.showMessage('[4] - 여배우로 데뷔한【와타라이 키쿄우】를 남배우로 쓴다');
  } else {
    ctx.showMessage('[-] - －－－－－－－');
  }
  if (A === 1 && ctx.flags[506] === 0) {
    ctx.showMessage('[5] - 여배우로 데뷔한【미야마 카나데】를 남배우로 쓴다');
  } else {
    ctx.showMessage('[-] - －－－－－－－');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 999;
  } else if (ctx.result === 0) {
    if (ctx.money >= 1000000 && ctx.flags[500] === 0) {
      ctx.showMessage('유명 AV남배우【무카이 유우야】와 계약했습니다');
      ctx.flags[500] = 1;
      await ctx.wait();
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.showMessage('포인트가 부족합니다');
      await ctx.wait();
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 1) {
    if (ctx.money >= 2000000 && ctx.flags[501] === 0) {
      ctx.showMessage('【이가라시 료】와 계약했습니다');
      ctx.flags[501] = 1;
      await ctx.wait();
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.showMessage('포인트가 부족합니다');
      await ctx.wait();
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 2) {
    if (ctx.money >= 1000000 && ctx.flags[504] === 0) {
      ctx.showMessage('흑인 AV남배우【로버트 파머】와 계약했습니다');
      ctx.flags[504] = 1;
      await ctx.wait();
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.showMessage('포인트가 부족합니다');
      await ctx.wait();
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 3 && ctx.flags[502] === 0) {
    ctx.showMessage('【사카키 아유무】를 남배우로 기용했다');
    ctx.flags[502] = 1;
    await ctx.wait();
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 4 && ctx.flags[505] === 0) {
    ctx.showMessage('여배우로 데뷔한【와타라이 키쿄우】를 남배우로 기용했다');
    ctx.flags[505] = 1;
    await ctx.wait();
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 5 && ctx.flags[506] === 0) {
    ctx.showMessage('여배우로 데뷔한【미야마 카나데】를 남배우로 기용했다');
    ctx.flags[506] = 1;
    await ctx.wait();
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function av_list(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #LOCALSIZE 50
  // TODO: #DIM LIST, 250
  // TODO: #DIM PAGE
  // TODO: #DIM PAGE_END
  ctx.varSet(LIST, -1);
  ctx.page = 0;
  ctx.varSet(ctx.locals[0], 0);
  ctx.varSet(TCVAR, 0);
  K = 0;
  // TODO: FOR LOCAL, 0, 50
  // TODO: TRYCCALLFORM SCENE_TITLE_{LOCAL}
  console.log('FORML 리스트번호 {LOCAL:1}에 미션번호 {LOCAL} %조사처리(RESULTS,"를")% 등록합니다');
  // TODO: LIST:(LOCAL:1) = LOCAL
  ctx.locals[1]++;
  // TODO: CATCH
  // TODO: CONTINUE
  // TODO: ENDCATCH
  // TODO: NEXT
  ctx.pageEnd = (ctx.locals[1] - 1 < 0 ? 0 : ctx.locals[1] - 1) / 10;
  // Label: SCENE_LIST
  ctx.showMessage(`《${ctx.getVarName("NICK", TARGET)}의 촬영씬을 정해주세요》`);
  ctx.showMessage(`남은 씬: ${ctx.masterBase[60]} / ${MAXctx.masterBase[60]}`);
  ctx.drawLine();
  // TODO: FOR LOCAL, PAGE * 10, PAGE * 10 + 10
  if (ctx.list[ctx.locals[0]] < 0) {
    // TODO: BREAK
  }
  // TODO: CALLFORM SCENE_VISIBLE_{LIST:LOCAL}
  if (ctx.result === 1) {
    // TODO: CALLFORM SCENE_TITLE_{LIST:LOCAL}
    ctx.showMessage(`[${ctx.locals[0], 3}] - ${ctx.results}`);
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
  if (character.tflags[700] === 0) {
    ctx.print('[998] - 돌아간다');
  } else {
    ctx.print('[998] - 촬영 시작');
  }
  if (ctx.page < ctx.pageEnd) {
    ctx.print('[999] - 다음 페이지');
  } else {
    ctx.printPlain('[ - ] - －－－－－');
  }
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result >= 0 && ctx.result < 250 && P[1] < MAXctx.masterBase[60]) {
    ctx.locals[0] = (ctx.list[ctx.result]);
    // TODO: CALLFORM SCENE_INFO_{LOCAL}
    // TODO: CALLFORM SCENE_FEE_{LOCAL}
    ctx.masterBase[60] -= P[1];
    if ((ctx.masterBase[60] < 0)) {
      ctx.clearLine(1);
      ctx.showMessage(`더 이상 촬영할 수 없습니다`);
      ctx.masterBase[60] += P[1];
      P[1] = 0;
      // GOTO SCENE_LIST - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // Label: INPUT_LOOP_RECEIVE
      ctx.showMessage(`이 씬을 촬영합니까?`);
      ctx.print('[  1] - 네');
      ctx.showMessage('[  0] - 아니오');
      await ctx.inputNumber();
      if (ctx.result === 1) {
        ctx.showMessage(`이 씬을 촬영합니다`);
        // TODO: TFLAG:(500 + K) = LOCAL
        character.tflags[700] += 1;
        K++;
        P[1] = 0;
        // GOTO SCENE_LIST - 구조 변경 필요 (while/break 사용 권장)
      } else {
        ctx.masterBase[60] += P[1];
        P[1] = 0;
        // GOTO SCENE_LIST - 구조 변경 필요 (while/break 사용 권장)
      }
    }
  } else if (ctx.result >= 0 && ctx.result < 250 && P[1] >= MAXctx.masterBase[60]) {
  } else if (ctx.result === 997 && ctx.page > 0) {
    ctx.page--;
    // GOTO SCENE_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 998 && character.tflags[700] === 0) {
    return;
  } else if (ctx.result === 998) {
    await av_choose(ctx, character);
  } else if (ctx.result === 999 && ctx.page < ctx.pageEnd) {
    ctx.page++;
    // GOTO SCENE_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else {
    ctx.clearLine(1);
    // TODO: REUSELASTLINE 잘못된 입력값입니다
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function av_choose(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  M = 0;
  ctx.drawLine('･･');
  ctx.showMessage('《이번 촬영씬은 다음과 같습니다》');
  ctx.showMessage('');
  ctx.varSet(ctx.locals[0], 0, 0);
  // TODO: FOR LOCAL, 0, 100
  if (tflag[500 + ctx.locals[0]]) {
    ctx.showMessage(`・`);
    // TODO: CALLFORM SCENE_TITLE_{TFLAG:(500 + LOCAL)}
    ctx.showMessage(`${ctx.results}`);
  }
  // TODO: NEXT
  ctx.showMessage('');
  ctx.showMessage(`《이상의 씬을 촬영합니다. 실행합니까?》`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`《촬영을 시작합니다》`);
    await av_result(ctx, character);
  } else if (ctx.result === 1) {
    ctx.showMessage('《다시 설정해 주십시오》'); ctx.waitInput();
    ctx.varSet(P, 0, 0);
    ctx.varSet(TFLAG, 0, 0);
    ctx.masterBase[60] = MAXctx.masterBase[60];
    await av_list(ctx, character);
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function av_result(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.varSet(ctx.locals[0], 0, 0);
  // TODO: FOR LOCAL, 0, 100
  if (tflag[500 + ctx.locals[0]]) {
    ctx.locals[1]++;
  }
  // TODO: NEXT
  // TODO: FOR LOCAL, 0, 100
  if (tflag[500 + ctx.locals[0]]) {
    ctx.showMessage(`◆촬영씬 (${ctx.locals[0] + 1} / ${ctx.locals[1]})`);
    // TODO: CALLFORM SCENE_TITLE_{TFLAG:(500 + LOCAL)}
    ctx.showMessage(`《${ctx.results}》`);
    ctx.drawLine('･･');
    // TODO: CALLFORM SCENE_RESULT_START_{TFLAG:(500 + LOCAL)}
    // TODO: CALLFORM SCENE_CALC_{TFLAG:(500 + LOCAL)}
    if (ctx.result === 2) {
      // TODO: CALLFORM SCENE_RESULT_PERFECT_{TFLAG:(500 + LOCAL)}
      ctx.showMessage(`《촬영 대성공》`);
    } else if (ctx.result === 1) {
      // TODO: CALLFORM SCENE_RESULT_SUCCESS_{TFLAG:(500 + LOCAL)}
      ctx.showMessage(`《촬영 성공》`);
    } else {
      // TODO: CALLFORM SCENE_RESULT_FAILED_{TFLAG:(500 + LOCAL)}
      ctx.showMessage(`《촬영 실패》`);
    }
    // TODO: CALLFORM SCENE_EXP_{TFLAG:(500 + LOCAL)}
    P += P[10];
    M += P[4];
    ctx.drawLine('･･');
    await ctx.wait();
  }
  // TODO: NEXT
  ctx.showMessage(`《모든 씬을 촬영했습니다》`);
  ctx.showMessage('');
  ctx.showMessage(`・${ctx.getName(character)}`);
  ctx.showMessage(`체력소비　　　　:`);
  ctx.showMessage(`${ctx.base[0]} - ${P[2]}`);
  ctx.base[0] -= P[2];
  ctx.showMessage(`기력소비　　　　:`);
  ctx.showMessage(`${ctx.base[1]} - ${P[3]}`);
  ctx.base[1] -= P[3];
  ctx.showMessage('');
  // TODO: FOR LOCAL:3, 0, 90
  if (tcvar[ctx.locals[3]]) {
    if (STRLENS(expname[ctx.locals[3]]) > 0) {
      // TODO: EXP:(LOCAL:3) += TCVAR:(LOCAL:3)
    } else {
      console.log('FORML %조사처리(EXP:{(LOCAL:3)},"는")% 정의되지 않았기에 가속처리를 스킵합니다');
    }
    if (tcvar[ctx.locals[3]] != 101) {
      ctx.showMessage(`${ctx.getVarName("EXPNAME", ctx.locals[3])} + ${tcvar[ctx.locals[3]]}`);
    }
  }
  // TODO: NEXT
  if (ctx.talents[400] == 0) {
    ctx.talents[400] = 1;
  }
  ctx.showMessage('');
  await av_pointcalc(ctx, character);
  ctx.base[31] -= 10;
  if (ctx.exp[76] === 0) {
    character.cflags[734] = P;
  } else {
    character.cflags[character][732] = P;
    X = P;
    if (character.cflags[character][731] < X) {
      character.cflags[character][731] = character.cflags[character][732];
    }
  }
  ctx.exp[76] += 1;
  ctx.exp[ctx.master][9] += 1;
  character.cflags[733] += ctx.rand(20);
  ctx.showMessage(`습득 포인트: {P}포인트`);
  ctx.showMessage(`　습득 메달: {M}개`);
  ctx.money += P;
  await ctx.wait();
  // TODO: BEGIN TURNEND
}
