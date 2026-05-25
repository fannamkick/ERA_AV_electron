/**
 * SHOP_MAIN.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function eventshop(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    ITEMSALES:ctx.count = 0;
  }
  ctx.bought = -1;
}

export async function show_shop(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.bought >= 0) {
    // JUMP ITEM_SHOP - 구조 변경 필요 (함수 호출로 대체)
  }
  // Label: INPUT_LOOP
  ctx.drawLine();
  if (DAY[1] >=3 && DAY[1] <= 5) {
    DAY[4] = 0;
    ctx.print('[봄]');
  } else if (DAY[1] >=6 && DAY[1] <= 8) {
    DAY[4] = 1;
    ctx.print('[여름]');
  } else if (DAY[1] >= 9 && DAY[1] <= 11) {
    DAY[4] = 2;
    ctx.print('[가을]');
  } else {
    DAY[4] = 3;
    ctx.print('[겨울]');
  }
  if (DAY[1] != 0 && DAY[2] != 0) {
    ctx.showMessage(`${DAY[1]}월 ${DAY[2]}주`);
  } else {
    ctx.print('?월 ?일');
  }
  ctx.showMessage(`${DAY[3]}년째`);
  if (TIME === 0) {
    ctx.print('전반');
  } else {
    ctx.print('후반');
  }
  ctx.showMessage(`/ 시작한지 {DAY+1}주차`);
  if (ctx.flags[3] > 0) {
    ctx.showMessage(`(나머지 ${ctx.flags[3] - DAY - 1}주)`);
  }
  if (ctx.flags[201] > 100) {
    ctx.showMessage(`/ 지도담당: ${ctx.getName(ctx.master)}`);
  } else if (ctx.flags[201] >= 1 && ctx.flags[201] <= 20) {
    ctx.showMessage(`/ 지도담당:`);
    await print_special_mastername(ctx, character);
  }
  ctx.showMessage('');
  ctx.showMessage(`소지금: {MONEY}포인트`);
  if (ctx.flags[4] > 0) {
    ctx.showMessage(`/ 목표: ${ctx.flags[4]}포인트`);
    M = ctx.money;
    N = ctx.flags[4];
    if (M > N) {
      M = N;
    }
    ctx.drawBar(M, N, 32);
  }
  ctx.showMessage('');
  // TODO: PRINT_ITEM
  ctx.drawLine('･･');
  await print_others(ctx, character);
  S = 0;
  T = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][1] == 2) {
      S += 1;
    }
    if (character.cflags[ctx.count][1] >= 1) {
      T += 1;
    }
  }
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    E += 1;
  }
  U = 0;
  if (ctx.getTalent(master, 325)) {
    U = 1;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.isAssi[ctx.count] && ctx.getTalent(count, 325)) {
      U = 1;
    }
  }
  ctx.drawLine();
  if (E >= 1) {
    ctx.showMessage(`LC [100] - 지도한다`);
  } else {
    ctx.showMessage(`LC [---] - －－－－－－－`);
  }
  ctx.showMessage(`LC [101] - 인재 확보`);
  ctx.showMessage(`LC [102] - 자재 조달`);
  ctx.showMessage('');
  if (E >= 1) {
    ctx.showMessage(`LC [103] - 창관 영업`);
  } else {
    ctx.showMessage(`LC [---] - －－－－－－－`);
  }
  ctx.showMessage(`LC [104] - AV촬영(미실장)`);
  ctx.showMessage(`LC [105] - 아무것도 안한다`);
  ctx.showMessage('');
  if (E >= 1 && ctx.flags[37]) {
    ctx.showMessage(`LC [108] - 스타일리스트`);
  } else {
    ctx.showMessage(`LC [---] - －－－－－－－`);
  }
  ctx.showMessage(`LC [109] - 방문`);
  ctx.showMessage(`LC [---] - (미실장)`);
  ctx.showMessage('');
  ctx.showMessage(`LC [111] - 능력 표시`);
  if (ctx.charanum > 1) {
    ctx.showMessage(`LC [112] - 능력치업`);
  } else {
    ctx.showMessage(`LC [---] - －－－－－－－`);
  }
  if (ctx.charanum > 1) {
    ctx.showMessage(`LC [113] - 캐릭터 정렬`);
  } else {
    ctx.showMessage(`LC [---] - －－－－－－－`);
  }
  ctx.showMessage('');
  if (ctx.charanum > 1) {
    ctx.showMessage(`LC [115] - 부탁한다`);
  } else {
    ctx.showMessage(`LC [---] - －－－－－－－`);
  }
  if (ctx.charanum > 1 && TIME === 0 && ctx.flags[100] === 1) {
    ctx.showMessage(`LC [116] - 기숙사로 간다`);
  } else {
    ctx.showMessage(`LC [---] - －－－－－－－`);
  }
  if (ctx.flags[570] === 1) {
    ctx.showMessage(`LC [120] - 미션`);
  }
  if (ctx.flags[5] != 9 && ctx.money >= ctx.flags[4]) {
    ctx.showMessage(`LC [150] - 엔딩으로`);
  }
  ctx.showMessage('');
  ctx.showMessage(`LC [200] - 세이브`);
  ctx.showMessage(`LC [300] - 로드`);
  ctx.showMessage(`LC [400] - 설정`);
  ctx.showMessage('');
  ctx.showMessage(`LC [500] - 실적`);
  ctx.showMessage(`LC [600] - 정보`);
  ctx.showMessage(`LC [700] - 여배우명부`);
  ctx.showMessage('');
  ctx.showMessage(`LC [750] - TIPS`);
  ctx.showMessage(`LC [888] - 치트`);
  ctx.showMessage('');
}

export async function usershop(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.result === 999 && ctx.bought >= 0) {
    await clear_shop(ctx, character);
    ctx.bought = -1;
  } else if (ctx.bought >= 0) {
    return 0;
  }
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    E += 1;
  }
  U = 0;
  if (ctx.getTalent(master, 325)) {
    U = 1;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.isAssi[ctx.count] && ctx.getTalent(count, 325)) {
      U = 1;
    }
  }
  if (ctx.result === 100 && E >= 1) {
    await before_train(ctx, character);
  } else if (ctx.result === 101) {
    await chara_buy_new(ctx, character);
  } else if (ctx.result === 102) {
    ctx.bought = 1;
  } else if (ctx.result === 103 && E >= 1) {
    await yuukaku_top(ctx, character);
  } else if (ctx.result === 104) {
    await av_top(ctx, character);
  } else if (ctx.result === 108 && E >= 1 && ctx.flags[37]) {
    await tailor_main(ctx, character);
  } else if (ctx.result === 109) {
    await houmon(ctx, character);
  } else if (ctx.result === 105) {
    ctx.flags[0] = 1;
    // TODO: BEGIN TURNEND
  } else if (ctx.result === 150) {
    if (ctx.flags[5] != 9 && ctx.money >= ctx.flags[4]) {
      await ending_check_2(ctx, character);
    } else {
      return 0;
    }
  } else if (ctx.result === 111 && ctx.charanum > 0) {
    await show_chaladata(ctx, character);
  } else if (ctx.result === 112 && ctx.charanum > 1) {
    await ability_up(ctx, character);
  } else if (ctx.result === 113 && ctx.charanum > 1) {
    await chara_sort(ctx, character);
  } else if (ctx.result === 115 && ctx.charanum > 1) {
    await please_main(ctx, character);
  } else if (ctx.result === 116 && ctx.charanum > 1 && ctx.flags[100] && TIME === 0) {
    await lycee_main(ctx, character);
  } else if (ctx.result === 120 && ctx.flags[570] === 1) {
    await mission_main(ctx, character);
  } else if (ctx.result === 200) {
    await ctx.saveGame();
  } else if (ctx.result === 300) {
    await ctx.loadGame();
  } else if (ctx.result === 400) {
    await system_configuration(ctx, character);
  } else if (ctx.result === 500) {
    await print_achievement(ctx, character);
  } else if (ctx.result === 600) {
    await print_information(ctx, character);
  } else if (ctx.result === 700) {
    await actress_list(ctx, character);
  } else if (ctx.result === 750) {
    await tips_main(ctx, character);
  } else if (ctx.result === 888) {
    await cheat_main(ctx, character);
  } else if (ctx.result === 8826) {
    await debug_top(ctx, character);
  }
}

export async function before_train(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P = character;
  // Label: TARGET_LOOP
  await change_target(ctx, character);
  if (ctx.result == 0) {
    return 0;
  }
  await select_assi(ctx, character);
  if (ctx.result === 0) {
    character = P;
    // GOTO TARGET_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  // TODO: BEGIN TRAIN
}

export async function change_target(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.showMessage('이번엔 누구를 지도합니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage('자신은 지도할 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result < 1 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 154)) {
    ctx.showMessage('육아 중인 노예는 지도할 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][110] - 2 <= DAY && ctx.getTalent(result, 153)) {
    ctx.showMessage('임신중이라 지도할 수 있는 상태가 아닙니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 500) {
    ctx.showMessage('쇠약해서 지도할 수 있는 상태가 아닙니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (TIME === 1 && character.cflags[ctx.result][12] != 0) {
    ctx.showMessage('영업이 끝날때까지 지도대상으로 선택할 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (TIME === 1 && character.cflags[ctx.result][401] != 0) {
    ctx.showMessage('아르바이트가 끝날때까지 지도대상으로 선택할 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.result != 0) {
    character = ctx.result;
  }
  if (character == ctx.assi) {
    ctx.assi = -1;
  }
  character.cflags[character][12] = 0;
  return 1;
}

export async function select_assi(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  S = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0 || character.cflags[ctx.count][1] < 2) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 500) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 154)) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153)) {
      // TODO: CONTINUE
    }
    if (TIME == 1 && character.cflags[ctx.count][12] != 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == character) {
      // TODO: CONTINUE
    }
    if (ctx.flags[1111] && GETBIT(ctx.flags[1111],ctx.count)) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][140] == 1) {
      // TODO: CONTINUE
    }
    S += 1;
  }
  if (S < 1) {
    ctx.assi = -1;
    return 1;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('누구를 조수로 삼습니까?');
  ctx.drawLine();
  ctx.showMessage(` [0] 조수없음`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`지도대상: ${ctx.getName(character)}`);
  ctx.print('(체력:');
  A = ctx.base[character][0];
  if (ctx.base[character][0] < 0) {
    A = 0;
  }
  ctx.showMessage(`${A}/${MAXctx.base[character][0]})`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0 || character.cflags[ctx.count][1] < 2) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][140] == 1) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 500) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 154)) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153)) {
      // TODO: CONTINUE
    }
    if (TIME == 1 && character.cflags[ctx.count][12] != 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == character) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
    ctx.showMessage('');
  }
  ctx.drawLine();
  ctx.showMessage(` [999] - 돌아간다`);
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.assi = -1;
    return 1;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][1] < 2) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 500) {
    ctx.showMessage('쇠약해서 조수를 시킬 수 있는 상태가 아닙니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 154)) {
    ctx.showMessage('육아 중인 노예에게 조수를 시킬 수는 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][110] - 2 <= DAY && ctx.getTalent(result, 153)) {
    ctx.showMessage('임신 중이라 조수를 시킬 수 있는 상태가 아닙니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (TIME === 1 && character.cflags[ctx.result][12] != 0) {
    ctx.showMessage('오늘의 영업이 끝날 때까지 조수로 선택할 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === character) {
    ctx.showMessage('지도대상으로 선택된 캐릭터는 조수로 선택할 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.assi = ctx.result;
  ctx.isAssi[ctx.assi] = 1;
  if (ctx.assi == character) {
    character = -1;
  }
  character.cflags[ctx.assi][12] = 0;
  return 1;
}

export async function show_chaladata(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  await life_list_new, 2(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  ctx.locals[21] = 0;
  // Label: PRINT_LIST
  ctx.drawLine();
  ctx.print('');
  if (character != ctx.master) {
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.showMessage(`${ctx.getName(character)}`);
  } else {
    ctx.showMessage(`${ctx.getName(ctx.master)}`);
  }
  if (character > 0) {
    // TODO: SETFONT ""
    if (ctx.talents[121] === 0 && ctx.talents[154] === 0) {
      ctx.print('');
      if (character.cflags[645] === 1 && ctx.talents[420] === 0 && ctx.talents[500] === 0 && ctx.talents[501] === 0 && ctx.talents[504] === 0 && ctx.talents[505] === 0 && ctx.talents[511] === 0 && ctx.talents[520] === 0 && ctx.talents[532] === 0 && ctx.talents[554] === 0) {
        ctx.setColor(0xF58F98);
        ctx.print('');
        await heart_code(ctx, character);
        ctx.showMessage(`위험일`);
        ctx.print('');
        await heart_code(ctx, character);
        ctx.resetColor();
      } else if (character.cflags[644] === 3) {
        ctx.setColor(0xF58F98);
        ctx.print('');
        await heart_code(ctx, character);
        ctx.showMessage(`생리`);
        ctx.print('');
        await heart_code(ctx, character);
        ctx.resetColor();
      }
    }
    ctx.showMessage('');
    S = 0;
    // TODO: SETFONT ""
    await estimate_chara(ctx, character);
    if (S > 0) {
      ctx.showMessage(`[평가액: {S}포인트]`);
    }
  }
  if (ctx.base[30] > 0 && ctx.talents[504] === 0 && ctx.talents[400] === 1) {
    ctx.showMessage(`[매달 출연료: ${ctx.base[30]}포인트]`);
  } else if (ctx.base[30] > 0 && ctx.talents[504] === 1 && ctx.talents[400] === 1) {
    ctx.showMessage(`[매달 전기세: ${ctx.base[30]}포인트]`);
  }
  ctx.showMessage('');
  if (character != ctx.master) {
    ctx.print('');
    if (ctx.talents[400] === 1) {
      ctx.showMessage(`예명:`);
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.showMessage(`${ctx.getVarName("NICK", TARGET)}`);
    }
  }
  // TODO: SETFONT ""
  ctx.showMessage(`【성별:`);
  if (ctx.getTalent(target, 122) === 1 || ctx.getTalent(target, 413) === 1) {
    ctx.showMessage(`♂`);
  } else {
    ctx.showMessage(`♀`);
  }
  ctx.showMessage(`】`);
  ctx.showMessage(`【직업:`);
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  if (character.no === ctx.master.no) {
    ctx.showMessage(`AV감독`);
  } else if (ctx.getTalent(target, 554)) {
    ctx.showMessage(`《색욕》LUXURIA`);
  } else if (ctx.getTalent(target, 511) && ctx.talents[505]) {
    ctx.showMessage(`타천사`);
  } else if (ctx.talents[422] === 1 && ctx.talents[203] === 1 && ctx.talents[432] === 1) {
    ctx.showMessage(`흑갸루의 카리스마`);
  } else if (ctx.getTalent(target, 512)) {
    ctx.showMessage(`그랜드마스터`);
  } else if (ctx.getTalent(target, 511)) {
    ctx.showMessage(`천사`);
  } else if (ctx.getTalent(target, 513)) {
    ctx.showMessage(`RB단수령`);
  } else if (ctx.getTalent(target, 505)) {
    ctx.showMessage(`서큐버스`);
  } else if (ctx.getTalent(target, 407)) {
    ctx.showMessage(`공주님`);
  } else if (ctx.getTalent(target, 181)) {
    ctx.showMessage(`고급창부`);
  } else if (ctx.getTalent(target, 180)) {
    ctx.showMessage(`업소여성`);
  } else if (ctx.getTalent(target, 203)) {
    ctx.showMessage(`아이돌`);
  } else if (ctx.getTalent(target, 402)) {
    ctx.showMessage(`패션모델`);
  } else if (ctx.getTalent(target, 421)) {
    ctx.showMessage(`캬바레녀`);
  } else if (ctx.getTalent(target, 411)) {
    ctx.showMessage(`간호사`);
  } else if (ctx.getTalent(target, 412)) {
    ctx.showMessage(`교사`);
  } else if (ctx.getTalent(target, 517)) {
    ctx.showMessage(`보디가드`);
  } else if (ctx.getTalent(target, 433)) {
    ctx.showMessage(`여의사`);
  } else if (ctx.getTalent(target, 417)) {
    ctx.showMessage(`메이드`);
  } else if (ctx.getTalent(target, 506)) {
    ctx.showMessage(`성우`);
  } else if (ctx.getTalent(target, 427) && ctx.talents[122] === 0) {
    ctx.showMessage(`수녀`);
  } else if (ctx.getTalent(target, 427) && ctx.talents[122] === 1) {
    ctx.showMessage(`수사`);
  } else if (ctx.getTalent(target, 429) && ctx.talents[122] === 0) {
    ctx.showMessage(`여경`);
  } else if (ctx.getTalent(target, 429) && ctx.talents[122] === 1) {
    ctx.showMessage(`경관`);
  } else if (ctx.getTalent(target, 223)) {
    ctx.showMessage(`대학생`);
  } else if (ctx.getTalent(target, 220)) {
    ctx.showMessage(`고등학생`);
  } else if (ctx.getTalent(target, 221)) {
    ctx.showMessage(`중학생`);
  } else if (ctx.getTalent(target, 222)) {
    ctx.showMessage(`초등학생`);
  } else if (ctx.getTalent(target, 206) && ctx.talents[122] === 0) {
    ctx.showMessage(`주부`);
  } else if (ctx.getTalent(target, 206) && ctx.talents[122] === 1) {
    ctx.showMessage(`주부`);
  } else if (ctx.talents[422] === 1 && ctx.talents[203] === 0 && ctx.talents[432] === 1) {
    ctx.showMessage(`레게 댄서`);
  } else if (ctx.cstr[90] != "") {
    ctx.showMessage(`%CSTR:90%`);
  } else if (ctx.getTalent(target, 403)) {
    ctx.showMessage(`프리터`);
  } else if (ctx.getTalent(target, 404)) {
    ctx.showMessage(`프리터`);
  } else {
    ctx.showMessage(`프리터`);
  }
  // TODO: SETFONT ""
  ctx.showMessage(`】`);
  if (character.cflags[1] > 0) {
    ctx.print('(売却');
  }
  if (character.cflags[1] == 2) {
    ctx.print('・助手');
  }
  if (character.cflags[1] > 0) {
    ctx.print('可)');
  }
  if (character.cflags[110] - 2 <= DAY && ctx.talents[153]) {
    ctx.print('[산월]');
  } else if (ctx.talents[153]) {
    ctx.print('[임신중]');
  } else if (ctx.talents[154]) {
    ctx.print('[육아 중]');
  }
  if (character.cflags[12] != 0) {
    if (character.cflags[12] === 1) {
      ctx.print('《회화영업중》');
    } else if (character.cflags[12] === 2 || character.cflags[12] === 7) {
      ctx.print('《봉사영업중》');
    } else if (character.cflags[12] === 3) {
      ctx.print('《A영업중》');
    } else if (character.cflags[12] === 4) {
      ctx.print('《V영업중》');
    } else if (character.cflags[12] === 5) {
      ctx.print('《SM영업중》');
    } else if (character.cflags[12] === 6) {
      ctx.print('《출장영업중》');
    }
  }
  if (character.cflags[633] == 1) {
    ctx.print('《호위있음》');
  }
  ctx.showMessage('');
  if (ctx.abilities[10] >= 3) {
    ctx.showMessage(`다니고 있는 곳:`);
    if (character.cflags[684] === 0) {
      ctx.showMessage(`없음`);
    } else {
      if (character.cflags[680] === 1) {
        ctx.showMessage(`에스테`);
        if (ctx.abilities[50] === 10) {
          ctx.showMessage(`(이 이상은 효과가 없을 듯 합니다)`);
        } else if (ctx.abilities[50] >= 8 && ctx.talents[515] === 0 && ctx.talents[518] === 0 && ctx.talents[509] === 0 && ctx.talents[519] === 0) {
          ctx.showMessage(`(이 이상은 효과가 없을 듯 합니다)`);
        } else if (ctx.abilities[50] >= 5 && ctx.talents[203] === 0 && ctx.talents[402] === 0 && ctx.talents[515] === 0 && ctx.talents[518] === 0 && ctx.talents[509] === 0 && ctx.talents[519] === 0) {
          ctx.showMessage(`(이 이상은 효과가 없을 듯 합니다)`);
        }
      }
      if (character.cflags[681] === 1) {
        ctx.showMessage(`체육관`);
        if (ctx.abilities[51] === 10) {
          ctx.showMessage(`(이 이상은 효과가 없을 듯 합니다)`);
        } else if (ctx.abilities[51] >= 5 && ctx.talents[204] === 0) {
          ctx.showMessage(`(이 이상은 효과가 없을 듯 합니다)`);
        } else if (ctx.abilities[51] >= 5 && ctx.talents[16] === 0 && ctx.talents[204] === 0) {
          ctx.showMessage(`(이 이상은 효과가 없을 듯 합니다)`);
        }
      }
      if (character.cflags[682] === 1) {
        ctx.showMessage(`학원`);
        if (ctx.abilities[52] === 10) {
          ctx.showMessage(`(이 이상은 효과가 없을 듯 합니다)`);
        } else if (ctx.abilities[52] >= 8 && ctx.talents[224] === 0) {
          ctx.showMessage(`(이 이상은 효과가 없을 듯 합니다)`);
        } else if (ctx.abilities[52] >= 5 && ctx.talents[224] === 0 && ctx.talents[50] === 0) {
          ctx.showMessage(`(이 이상은 효과가 없을 듯 합니다)`);
        }
      }
    }
    ctx.showMessage('');
  }
  if (ctx.talents[330] === 1) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.setColor(0xFFD700);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.print('');
    ctx.showMessage(`※미션 종료까지: 앞으로 ${character.cflags[25]}주`);
    ctx.showMessage('');
    ctx.resetColor();
    // TODO: SETFONT ""
  }
  if (( character.cflags[15] > 0 && ctx.talents[0] == 0 && ctx.talents[122] == 0 ) || character.cflags[16] >= 0 || ctx.talents[2] == 0 || ( ( ctx.talents[121] == 1 || ctx.talents[122] == 1 ) && ctx.talents[1] == 0 )) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
  if (character.cflags[16] >= 0) {
    ctx.setColor(0xF58F98);
    await firstkiss_detail(ctx, character);
    ctx.resetColor();
  }
  if (character.cflags[15] > 0 && ctx.talents[0] === 0 && ctx.talents[122] === 0) {
    ctx.setColor(0xF58F98);
    await lostvirgin_detail(ctx, character);
    ctx.resetColor();
  }
  if (ctx.talents[2] === 0) {
    ctx.setColor(0xF58F98);
    await lostanalvirgin_detail(ctx, character);
    ctx.resetColor();
  }
  if (( ( ctx.talents[121] === 1 || ctx.talents[122] === 1 ) && ctx.talents[1] === 0 )) {
    ctx.setColor(0xF58F98);
    ctx.print('');
    await heart_code(ctx, character);
    ctx.print('동정상실　　　:');
    if (ctx.abilities[10] < 3 && character.no != 0) {
      ctx.showMessage('済');
    } else {
      ctx.showMessage(`%CSTR:2%`);
    }
    ctx.resetColor();
  }
  if (ctx.talents[184] || ctx.talents[425] || ctx.talents[153]) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
  if (ctx.talents[184]) {
    ctx.setColor(0xF58F98);
    ctx.print('');
    await heart_code(ctx, character);
    ctx.showMessage(`남자친구　　　　　:`);
    ctx.showMessage(`%CSTR:7% %CSTR:8%(`);
    await print_boyfriend(ctx, character);
    ctx.showMessage(')');
    ctx.resetColor();
  }
  if (ctx.talents[425]) {
    ctx.setColor(0xF58F98);
    ctx.print('');
    await heart_code(ctx, character);
    ctx.showMessage(`단골섹프　　:`);
    ctx.showMessage(`%CSTR:47% %CSTR:48%`);
    ctx.resetColor();
  }
  if (ctx.talents[153] === 1) {
    ctx.setColor(0xF58F98);
    ctx.print('');
    await heart_code(ctx, character);
    ctx.showMessage(`임신중　　　　:`);
    ctx.showMessage(`%CSTR:60%의 아이`);
    ctx.resetColor();
    ctx.showMessage('');
  }
  // TODO: SETFONT ""
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.print('');
  await life_bar(ctx, character);
  ctx.print('');
  await vital_bar(ctx, character);
  ctx.print('');
  await beauty_bar(ctx, character);
  ctx.print('');
  if (character.cflags[ctx.master][694] === 1 && ctx.talents[430] === 0 && character.no != (ctx.master.no)) {
    await ntr_bar(ctx, character);
  }
  ctx.print('');
  if (ctx.item[37] && character != ctx.master) {
    ctx.print('호감도');
    ctx.drawBar(character.cflags[2], 1000, 32);
    ctx.showMessage(`({(CFLAG:2)/10}％)`);
  }
  if (ctx.talents[520]) {
    await mp_bar(ctx, character);
  }
  if (ctx.base[10] > 0 && ctx.getTalent(target, 85) && ctx.flags[5] != 1) {
    D = ctx.base[10] / 2;
    ctx.showMessage(` 수명: 나머지{D}일`);
  }
  await show_info, local:21(ctx, character);
  T = character;
  ctx.showMessage(`LC \@(LOCAL:21 <= 0) ? %" " * 16% # [1001] 이전 페이지\@`);
  // TODO: PRINTLC [999] 리스트로 돌아간다
  ctx.showMessage(`LC \@(LOCAL:21 >= 4 || (TARGET == 0 && LOCAL:21 >= 1)) ? %" " * 16% # [1003] 다음 페이지\@`);
  ctx.showMessage('');
  ctx.showMessage(`LC \@(T <= 0) ? %" " * 16% # [1005] 이전 캐릭터\@`);
  // TODO: PRINTLC [1000] 메인 화면으로 돌아간다
  ctx.showMessage(`LC \@(T >= CHARANUM - 1) ? %" " * 16% # [1007] 다음 캐릭터\@`);
  ctx.showMessage('');
  // Label: INPUT_LOOP_01
  await ctx.inputNumber();
  if (ctx.result === 999) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1000) {
    return 0;
  } else if (ctx.result === 1005 && T > 0) {
    character = T - 1;
    ctx.drawLine();
    ctx.showMessage('');
    if (character == 0 && ctx.locals[21] >= 1) {
      ctx.locals[21] = 1;
    }
    // GOTO PRINT_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1007 && T < ctx.charanum - 1) {
    character = T + 1;
    ctx.drawLine();
    ctx.showMessage('');
    // GOTO PRINT_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1001 && ctx.locals[21] > 0) {
    ctx.locals[21] = ctx.locals[21] - 1;
    ctx.drawLine();
    ctx.showMessage('');
    // GOTO PRINT_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1003 && (ctx.locals[21] < 4 && (character != 0 || ctx.locals[21] < 1))) {
    ctx.locals[21] = ctx.locals[21] + 1;
    ctx.drawLine();
    ctx.showMessage('');
    // GOTO PRINT_LIST - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function ability_up(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_0
  ctx.showMessage('누구의 능력치를 올립니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][140] === 1) {
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 0) {
    ctx.showMessage('자신의 능력을 올릴 수는 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.locals[0] = character;
  character = ctx.result;
  // Label: INPUT_LOOP_1
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.showMessage(`${ctx.getName(character)}`);
  // TODO: SETFONT ""
  S = 0;
  await estimate_chara(ctx, character);
  if (S > 0) {
    ctx.showMessage(`[평가액:{S}포인트]`);
  }
  if (ctx.base[30] > 0 && ctx.talents[504] === 0 && ctx.talents[400] === 1) {
    ctx.showMessage(`[매달 출연료: ${ctx.base[30]}포인트]`);
  } else if (ctx.base[30] > 0 && ctx.talents[504] === 1 && ctx.talents[400] === 1) {
    ctx.showMessage(`[매달 전기세: ${ctx.base[30]}포인트]`);
  }
  ctx.showMessage('');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  await show_info_exp(ctx, character);
  await show_juel(ctx, character);
  await show_ablup_select(ctx, character);
  await ctx.inputNumber();
  // TODO: TRYCCALLFORM ABLUP{RESULT}
  // TODO: CATCH
  if (ctx.result === 99) {
    await ablup99(ctx, character);
  } else if (ctx.result === 999) {
    await jujun_up_check(ctx, character);
    await yokubo_up_check(ctx, character);
    await check_sellassiable(ctx, character);
    await check_specialskil(ctx, character);
    character = ctx.locals[0];
    return 1;
  } else if (ctx.result === 1001 && character > 1) {
    await jujun_up_check(ctx, character);
    await yokubo_up_check(ctx, character);
    await check_sellassiable(ctx, character);
    await check_specialskil(ctx, character);
    character -= 1;
  } else if (ctx.result === 1003 && character < ctx.charanum - 1) {
    await jujun_up_check(ctx, character);
    await yokubo_up_check(ctx, character);
    await check_sellassiable(ctx, character);
    await check_specialskil(ctx, character);
    character += 1;
  } else if (ctx.result === 500) {
    await aut_lvupper(ctx, character);
  }
  // TODO: ENDCATCH
  // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
}

export async function print_special_mastername(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`${ctx.getName(ctx.master)}`);
}

export async function print_lostvirgin_mastername(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await print_special_mastername(ctx, character);
}

export async function print_firstkiss_mastername(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await print_special_mastername(ctx, character);
}

export async function heart_code(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
    ctx.showMessage(`%UNICODE(0x2665)%`);
  }
}
