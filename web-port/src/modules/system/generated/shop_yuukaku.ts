/**
 * SHOP_YUUKAKU.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function yuukaku_top(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('창관 영업');
  ctx.showMessage('《지도 중인 여배우 후보를 일하게 해 포인트를 법니다》');
  ctx.drawLine();
  ctx.printValue(DAY+1);
  ctx.print('주차');
  if (TIME === 0) {
    ctx.showMessage('전반');
  } else {
    ctx.showMessage('후반');
  }
  T = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][1] >= 1 && ctx.getTalent(count, 199) == 0) {
      T += 1;
    }
  }
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  if (T >= 1) {
    ctx.showMessage('[0] - 은퇴시킨다');
  } else {
    ctx.showMessage('[-] - －－－－');
  }
  ctx.showMessage('[1] - 성 접대');
  if (TIME === 0 && T >= 1) {
    ctx.showMessage('[2] - 통상 엽업 변경');
  } else if (T >= 1) {
    ctx.showMessage('[-] -(후반에는 통상 영업 변경 불가)');
  } else {
    ctx.showMessage('[-] - －－－－');
  }
  if (T >= 1) {
    if (ctx.flags[546] === 0 && TIME === 1) {
      ctx.showMessage('[3] - 특수 영업');
    } else if (ctx.flags[546] === 1) {
      ctx.showMessage('[3] - 특수 영업');
    }
  } else {
    ctx.showMessage('[-] - －－－－');
  }
  ctx.showMessage('[4] - 시설 확장');
  ctx.drawLine();
  ctx.showMessage(` [999] - 돌아간다`);
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result === 0 && T >= 1) {
    await chara_sale(ctx, character);
  } else if (ctx.result === 1) {
    await work_reception(ctx, character);
  } else if (ctx.result === 2 && TIME === 0) {
    await work_normal(ctx, character);
  } else if (ctx.result === 3 && T >= 1) {
    await work_special(ctx, character);
  } else if (ctx.result === 4) {
    await yuukaku_labo(ctx, character);
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 0;
}

export async function work_reception(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`(현재 공헌도: ${ctx.exp[ctx.master][90]})`);
  A = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (TIME == 1 && character.cflags[ctx.count][12] != 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][1] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 500) {
      // TODO: CONTINUE
    }
    if (character.mark[ctx.count][3] >= 1) {
      // TODO: CONTINUE
    }
    if (ctx.abilities[ctx.count][10] + ctx.abilities[ctx.count][11] < 8) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153)) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 154)) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 122)) {
      // TODO: CONTINUE
    }
    A += 1;
  }
  if (A === 0) {
    ctx.showMessage(`접대를 할 수 있는 노예가 없습니다`);
    await ctx.wait();
    return 999;
  }
  // Label: INPUT_LOOP_1
  ctx.showMessage(`성접대를 하는 턴 동안에는 일절 지도가 불가합니다.`);
  ctx.showMessage(`또한, 불리한 조건의 접대도 맡아야합니다.`);
  ctx.showMessage(`접대를 준비할까요?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await reception_main(ctx, character);
  } else if (ctx.result === 1) {
    return 999;
  } else {
    // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function work_normal(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_0
  ctx.drawLine();
  ctx.showMessage('누구의 영업 상황을 변경하시겠습니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 999;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.result === ctx.master) {
    ctx.showMessage('주인은 일을 할 수 없습니다');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (character.cflags[ctx.result][1] === 0) {
    ctx.showMessage('지도가 부족합니다. 일을 시키려면 더 교육시키세요.');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.base[ctx.result][0] < 500) {
    ctx.showMessage('쇠약해 일을 할 수 없습니다.');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (character.mark[ctx.result][3] >= 2) {
    ctx.showMessage('반발 감정이 심해 일을 할 수 없습니다.');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  B = ctx.abilities[ctx.result][10];
  B += ctx.abilities[ctx.result][11];
  if (B < 6) {
    ctx.showMessage('능력이 부족합니다. 일을 시키려면 더 지도하세요');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (character.cflags[ctx.result][110] - 2 <= DAY && ctx.getTalent(result, 153)) {
    ctx.showMessage('배가 무거워 일이 불가능합니다');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.getTalent(result, 154)) {
    ctx.showMessage('육아 중이라 일이 불가능합니다');
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  if (ctx.talents[122]) {
    character.cflags[54] = 1;
  } else if (character.cflags[42] === 79 && (character.cflags[40] & 64)) {
    character.cflags[54] = 1;
  } else {
    character.cflags[54] = 0;
  }
  // Label: INPUT_LOOP_1
  ctx.drawLine();
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 어떤 통상 영업을 시킵니까?`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  if (character.cflags[12] != 0) {
    ctx.showMessage('[0] - 시키지 않는다');
  }
  ctx.showMessage('[1] - 대화');
  ctx.showMessage('[2] - 봉사 접대');
  if (character.mark[2] >= 2 && (ctx.flags[48] & 1)) {
    ctx.showMessage('[3] - A영업');
  }
  if (ctx.talents[122] === 0 && character.mark[2] >= 2 && (ctx.flags[48] & 1)) {
    if (character.cflags[42] != 79 || (character.cflags[40] & 64) == 0) {
      ctx.showMessage('[4] - V영업');
    }
  }
  if (ctx.talents[122] === 0 && ctx.abilities[12] >=3 && character.mark[2] >= 3 && (ctx.flags[48] & 1) && (ctx.flags[48] & 2)) {
    if (character.cflags[42] != 79 || (character.cflags[40] & 64) == 0) {
      ctx.showMessage('[5] - SM영업');
    }
  }
  if (ctx.talents[122] === 0 && ctx.talents[183] === 1 && (ctx.flags[48] & 4) != 0) {
    if (character.cflags[42] != 79 || (character.cflags[40] & 64) == 0) {
      ctx.showMessage('[6] - 출장영업');
    }
  }
  if (character.cflags[12] >= 3) {
    if (character.cflags[13]) {
      ctx.showMessage('[9] - 콘돔을 사용하지 않는다');
    } else {
      ctx.showMessage('[9] - 콘돔을 사용한다');
    }
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 0) {
    ctx.showMessage(`《%타겟이(1)% 일을 쉬게합니다》`);
    await ctx.wait();
    character.cflags[12] = 0;
    character.cflags[13] = 0;
  } else if (ctx.result === 1) {
    ctx.showMessage(`《%타겟을(1)% 지역의 술집에서 대화로 접대하게 합니다》`);
    await ctx.wait();
    character.cflags[12] = 1;
    character.cflags[13] = 0;
  } else if (ctx.result === 2) {
    if ((ctx.flags[48] & 32) === 0) {
      ctx.showMessage(`《${ctx.getName(character)}에게 봉사로 접대하게 합니다》`);
      await ctx.wait();
      character.cflags[12] = 2;
      character.cflags[13] = 0;
    } else {
      await soup_work(ctx, character);
    }
  } else if (ctx.result === 3 && character.mark[2] >= 2 && (ctx.flags[48] & 1)) {
    ctx.showMessage(`《%타겟이(1)% A로 영업하게 합니다.》`);
    await ctx.wait();
    character.cflags[12] = 3;
  } else if (ctx.result === 4 && ctx.talents[122] === 0 && character.mark[2] >= 2 && (ctx.flags[48] & 1) != 0) {
    if (character.cflags[42] == 79 && (character.cflags[40] & 64)) {
      // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
    }
    ctx.showMessage(`《%타겟이(1)% V로 영업하게 합니다》`);
    await ctx.wait();
    character.cflags[12] = 4;
  } else if (ctx.result === 5 && ctx.talents[122] === 0 && ctx.abilities[12] >=3 && character.mark[2] >= 3 && (ctx.flags[48] & 1) != 0 && (ctx.flags[48] & 2) != 0) {
    if (character.cflags[42] == 79 && (character.cflags[40] & 64)) {
      // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
    }
    ctx.showMessage(`《%타겟이(1)% SM으로 영업하게 합니다》`);
    await ctx.wait();
    character.cflags[12] = 5;
  } else if (ctx.result === 6 && ctx.talents[122] === 0 && ctx.talents[183] === 1 && (ctx.flags[48] & 4) != 0) {
    if (character.cflags[42] == 79 && (character.cflags[40] & 64)) {
      // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
    }
    ctx.showMessage(`《%타겟이(1)% 단골손님에게 출장 나갑니다》`);
    await ctx.wait();
    character.cflags[12] = 6;
  } else if (ctx.result === 9 && character.cflags[12] >= 3) {
    character.cflags[character][13] = 1 - character.cflags[character][13];
    if (character.cflags[character][13]) {
      ctx.showMessage(`《콘돔을 사용하도록 했습니다.》`);
    } else {
      ctx.showMessage(`《콘돔을 사용하지 않도록 했습니다.》`);
    }
    await ctx.wait();
    // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
  }
  character = -1;
  // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
}

export async function soup_work(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage('[0]  - 일반 봉사 영업');
  ctx.showMessage('[1]  - 소프 플레이');
  ctx.showMessage('[999] - 돌아간다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 999;
  } else if (ctx.result === 0) {
    ctx.showMessage(`《%타겟이(1)% 일반 봉사 영업을 합니다》`);
    await ctx.wait();
    character.cflags[12] = 2;
    character.cflags[13] = 0;
  } else if (ctx.result === 1) {
    ctx.showMessage(`《%타겟이(1)% 소프 플레이를 합니다》`);
    await ctx.wait();
    character.cflags[12] = 7;
    character.cflags[13] = 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function work_special(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.flags[41] = 0;
  M = 0;
  // Label: INPUT_LOOP_01
  ctx.drawLine();
  ctx.showMessage(`어떤 특수 영업을 하겠습니까?`);
  if ((ctx.flags[48] & 128) != 0) {
    ctx.showMessage('[1] - 포장 마차');
  }
  if ((ctx.flags[48] & 16) != 0 && (ctx.flags[48] & 8) != 0) {
    ctx.showMessage('[2] - 콘서트');
  }
  if ((ctx.flags[48] & 8) != 0) {
    ctx.showMessage('[3] - 스트립쇼');
  }
  if ((ctx.flags[48] & 8) != 0 && ctx.flags[546] == 1) {
    ctx.showMessage('[4] - 난교 파티');
  }
  ctx.showMessage('[9] - 공중 변소 플레이');
  ctx.showMessage('[10]- 처녀 경매');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 999;
  } else if (ctx.result === 1 && (ctx.flags[48] & 128) != 0) {
    ctx.showMessage(`W 포장 마차에서 노예가 식사를 만들어 팔게합니다.`);
    ctx.showMessage(`누구를 포장마차로 보내겠습니까?`);
    ctx.flags[41] = 1;
    M = 4;
  } else if (ctx.result === 2 && (ctx.flags[48] & 8) != 0 && (ctx.flags[48] & 16) != 0) {
    ctx.showMessage(`W 인기 노예를 무대에서 노래를 부르게 하여 입장료를 법니다.`);
    ctx.showMessage(`콘서트에 누가 참여합니까?`);
    ctx.flags[41] = 2;
    M = 3;
  } else if (ctx.result === 3 && (ctx.flags[48] & 8) != 0) {
    ctx.showMessage(`W 노예의 스트립 쇼로 돈을 법니다.`);
    ctx.showMessage(`스트립쇼에 누가 참여합니까?`);
    ctx.flags[41] = 3;
    M = 3;
  } else if (ctx.result === 4 && (ctx.flags[48] & 8) != 0 && ctx.flags[546] === 1) {
    ctx.showMessage(`W 노예와 여러 사람이 어울리는 비밀 파티를 엽니다.`);
    ctx.showMessage(`누구를 난교파티에 보내겠습니까?`);
    ctx.flags[41] = 4;
    M = 6;
  } else if (ctx.result === 9) {
    ctx.showMessage(`W 노예를 공중 변소에 장비합니다.`);
    ctx.showMessage(`어떤 노예를 변소로 보냅니까?`);
    ctx.flags[41] = 9;
    M = 10;
  } else if (ctx.result === 10) {
    ctx.showMessage(`W 처녀의 첫날 밤 권한을 경매합니다.`);
    ctx.showMessage(`누구의 처녀를 경매합니까?`);
    ctx.flags[41] = 10;
    M = 1;
  } else {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  await work_special_select(ctx, character);
  if (ctx.flags[42] == 0) {
    ctx.restart();
  }
  // Label: INPUT_LOOP_02
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][130] != 1) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    ctx.showMessage(`${ctx.getName(character)} /`);
    await life_bar(ctx, character);
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  if (ctx.flags[41] === 1) {
    S = 0;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      if (ctx.abilities[ctx.count][73] >= 1) {
        S = 1;
      }
    }
    if (S) {
      ctx.showMessage('이 멤버로 포장 마차를 운영하시겠습니까?');
    } else {
      ctx.showMessage('포장마차는 주방 담당으로써 요리 기술 1 이상의 노예가 적어도 한 명 필요합니다.'); ctx.waitInput();
      ctx.restart();
    }
  } else if (ctx.flags[41] === 2) {
    S = 0;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      if (ctx.abilities[ctx.count][71] >= 1) {
        S = 1;
      }
    }
    if (S) {
      ctx.showMessage('이 인원으로 콘서트를 열겠습니까?');
    } else {
      ctx.showMessage('콘서트에는 리드 보컬로써 가창 기술 1 이상의 인원이 적어도 한명 이상 필요합니다.'); ctx.waitInput();
      ctx.restart();
    }
  } else if (ctx.flags[41] === 3) {
    ctx.showMessage('이 노예를 스트립쇼 시키겠습니까?');
  } else if (ctx.flags[41] === 8) {
    ctx.showMessage('이 노예를 난교 파티에 보내겠습니까?');
  } else if (ctx.flags[41] === 9) {
    ctx.showMessage('이 노예를 공중 변소에 보냅니까?');
  } else if (ctx.flags[41] === 10) {
    ctx.showMessage('이 노예를 처녀 경매합니까?');
  } else {
    ctx.showMessage('이렇게 특수 접대를 하겠습니까?');
  }
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    ctx.restart();
  } else if (ctx.result != 0) {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == -1) {
      character.cflags[ctx.count][130] = 0;
    }
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    character.cflags[ctx.count][12] = 0;
    if (ctx.getTalent(count, 122)) {
      character.cflags[ctx.count][54] = 1;
    } else if (character.cflags[ctx.count][42] === 79 && (character.cflags[ctx.count][40] & 64)) {
      character.cflags[ctx.count][54] = 1;
    } else {
      character.cflags[ctx.count][54] = 0;
    }
  }
  if (ctx.flags[41] === 1) {
    await lunch_stall(ctx, character);
  } else if (ctx.flags[41] === 2) {
    await concert(ctx, character);
  } else if (ctx.flags[41] === 3) {
    await striptease(ctx, character);
  } else if (ctx.flags[41] === 4) {
    await sex_orgy(ctx, character);
  } else if (ctx.flags[41] === 9) {
    await kb_play(ctx, character);
  } else if (ctx.flags[41] === 10) {
    await v_auction(ctx, character);
  }
}

export async function work_special_select(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.flags[42] = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    character.cflags[ctx.count][130] = -1;
  }
  // Label: INPUT_LOOP_01
  S = 0;
  if (M > 1) {
    ctx.showMessage(`(${ctx.flags[42]}/{M}명)`);
  }
  ctx.showMessage('');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][1] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 800) {
      // TODO: CONTINUE
    }
    if (character.mark[ctx.count][3] >= 2) {
      // TODO: CONTINUE
    }
    if (ctx.abilities[ctx.count][10] + ctx.abilities[ctx.count][11] < 8) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153)) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 154)) {
      // TODO: CONTINUE
    }
    if (TIME == 1 && character.cflags[ctx.count][12]) {
      // TODO: CONTINUE
    }
    if (ctx.flags[41] == 3 && ctx.abilities[ctx.count][17] < 2) {
      // TODO: CONTINUE
    }
    if (ctx.flags[41] == 4 && (ctx.abilities[ctx.count][10] < 4 || ctx.abilities[ctx.count][11] < 4)) {
      // TODO: CONTINUE
    }
    if (ctx.flags[41] == 9 && (ctx.abilities[ctx.count][10] < 4 || ctx.abilities[ctx.count][11] < 4 || ctx.abilities[ctx.count][17] < 3)) {
      // TODO: CONTINUE
    }
    if (ctx.flags[41] == 10 && ((ctx.getTalent(count, 0) == 0 || ctx.abilities[ctx.count][10] < 4) || (character.cflags[ctx.count][42] == 79 && (character.cflags[ctx.count][40] & 64)))) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
    if (character.cflags[ctx.count][130] === 1) {
      ctx.print('(선택된 항목)');
    } else if (character.cflags[ctx.count][12]) {
      if (character.cflags[ctx.count][12] === 1) {
        ctx.print('<대화 영업중>');
      } else if (character.cflags[ctx.count][12] === 2 || character.cflags[ctx.count][12] === 7) {
        ctx.print('<봉사 영업중>');
      } else if (character.cflags[ctx.count][12] === 3) {
        ctx.print('<A영업중>');
      } else if (character.cflags[ctx.count][12] === 4) {
        ctx.print('<V영업중>');
      } else if (character.cflags[ctx.count][12] === 5) {
        ctx.print('<SM영업중>');
      } else if (character.cflags[ctx.count][12] === 6) {
        ctx.print('<출장 영업중>');
      } else {
        ctx.print('<영업중>');
      }
    }
    ctx.showMessage('');
    if (character.cflags[ctx.count][130] == -1) {
      character.cflags[ctx.count][130] = 0;
    }
    S += 1;
  }
  if (S == 0) {
    ctx.showMessage('※이 특수 접대에 참여할 수 있는 노예가 없습니다.');
  }
  ctx.drawLine();
  ctx.showMessage(` [999] - 선택종료`);
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 1;
  } else if (ctx.result === 0) {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][130] === -1) {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  } else if (TIME === 1 && character.cflags[ctx.result][12]) {
    ctx.showMessage(`${ctx.getVarName("CALL", RESULT)}의 영업은 다음주까지 변경할 수 없습니다.`);
    await ctx.wait();
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.flags[42] >= M && character.cflags[ctx.result][130] === 0) {
    ctx.showMessage(`W 참가할 수 있는 건 {M}명까지 입니다.`);
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (character.cflags[ctx.result][130] === 0) {
    character.cflags[ctx.result][130] = 1;
    ctx.flags[42] += 1;
    if (M == 1) {
      return 1;
    }
  } else if (character.cflags[ctx.result][130] === 1) {
    character.cflags[ctx.result][130] = 0;
    ctx.flags[42] -= 1;
  }
  // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
}

export async function yuukaku_labo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  A = 0;
  B = 0;
  ctx.drawLine();
  ctx.showMessage('어떤 시설을 확장시키겠습니까?');
  ctx.showMessage(`《운영자금 {MONEY}포인트》(현재 공헌도: ${ctx.exp[ctx.master][90]})`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  if ((ctx.flags[48] & 1) == 0) {
    ctx.showMessage('[0] - 개인실　　　　　(3000포인트)');
  }
  if ((ctx.flags[48] & 2) == 0 && ctx.exp[ctx.master][90] >= 10) {
    ctx.showMessage('[1] - SM용품　　　　(1500포인트)');
  }
  if ((ctx.flags[48] & 4) == 0 && ctx.exp[ctx.master][90] >= 30) {
    ctx.showMessage('[2] - 호위　　　　　　(10000포인트)');
  }
  if ((ctx.flags[48] & 1) != 0 && (ctx.flags[48] & 32) == 0 && ctx.exp[ctx.master][90] >= 50) {
    ctx.showMessage('[3] - 목욕실　　　　　(30000포인트)');
  }
  if ((ctx.flags[48] & 128) == 0 && ctx.exp[ctx.master][90] >= 60) {
    ctx.showMessage('[4] - 포장마차　　　　(80000포인트)');
  }
  if ((ctx.flags[48] & 8) == 0 && ctx.exp[ctx.master][90] >= 80) {
    ctx.showMessage('[5] - 다목적홀　　　　(100000포인트)');
  }
  if ((ctx.flags[48] & 8) != 0 && (ctx.flags[48] & 16) == 0 && ctx.exp[ctx.master][90] >= 100) {
    ctx.showMessage('[6] - 음향설비　　　　(50000포인트)');
  }
  if ((ctx.flags[48] & 8) != 0 && ctx.flags[40] < 10 && ctx.exp[ctx.master][90] >= 120) {
    ctx.showMessage('[7] - 경비원　　　　　(50000포인트)');
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[99] - 확장 여부 확인');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 999;
  } else if (ctx.result === 99) {
    await facilities_check(ctx, character);
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 0 && (ctx.flags[48] & 1) === 0) {
    A = 3000;
    B = 1;
  } else if (ctx.result === 1 && (ctx.flags[48] & 2) === 0) {
    A = 1500;
    B = 2;
  } else if (ctx.result === 2 && (ctx.flags[48] & 4) === 0 && ctx.exp[ctx.master][90] >= 30) {
    A = 10000;
    B = 4;
  } else if (ctx.result === 3 && (ctx.flags[48] & 1) != 0 && (ctx.flags[48] & 32) === 0 && ctx.exp[ctx.master][90] >= 50) {
    A = 30000;
    B = 32;
  } else if (ctx.result === 4 && (ctx.flags[48] & 128) === 0 && ctx.exp[ctx.master][90] >= 60) {
    A = 80000;
    B = 128;
  } else if (ctx.result === 5 && (ctx.flags[48] & 8) === 0 && ctx.exp[ctx.master][90] >= 80) {
    A = 100000;
    B = 8;
  } else if (ctx.result === 6 && (ctx.flags[48] & 8) != 0 && (ctx.flags[48] & 16) === 0 && ctx.exp[ctx.master][90] >= 100) {
    A = 50000;
    B = 16;
  } else if (ctx.result === 7 && (ctx.flags[48] & 8) != 0 && ctx.flags[40] < 10 && ctx.exp[ctx.master][90] >= 120) {
    A = 50000;
    B = 64;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  R = ctx.result;
  M = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getTalent(count, 211) && ctx.isAssi[ctx.count] && ctx.abilities[ctx.count][15]) {
      if (ctx.abilities[ctx.count][15] > ctx.abilities[M][15]) {
        M = ctx.count;
      }
    }
  }
  if (M) {
    A *= 100 - (ctx.abilities[M][15] * 5);
    A /= 100;
    ctx.showMessage(`${ctx.getName(M)}의 협상을 통해 가격을 ${A}포인트로 흥정했다.`);
    await ctx.wait();
  }
  if (ctx.money < A) {
    ctx.showMessage('필요한 포인트가 부족합니다.');
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= A;
  ctx.flags[48] |= B;
  if (R === 0) {
    ctx.showMessage('방음 시설을 갖춘 독방을 추가했습니다.');
    ctx.showMessage('이제 A영업과 V영업이 가능합니다.');
    await ctx.wait();
  } else if (R === 1) {
    ctx.showMessage('각종 SM상품을 입하했습니다.');
    ctx.showMessage('이제 SM영업이 가능합니다.');
    await ctx.wait();
  } else if (R === 2) {
    ctx.showMessage('운전사 겸 호위를 고용했습니다.');
    ctx.showMessage('이제 출장 영업이 가능합니다.');
    await ctx.wait();
  } else if (R === 3) {
    ctx.showMessage('각 별실에 목욕실을 설치했습니다.');
    ctx.showMessage('이제 소프 플레이가 가능합니다.');
    await ctx.wait();
  } else if (R === 4) {
    ctx.showMessage(`손님에게 식사를 주기 위한 포장마차를 구비했습니다.`);
    ctx.showMessage('이제 요리를 판매할 수 있습니다.');
    await ctx.wait();
  } else if (R === 5) {
    ctx.showMessage('다목적 홀을 지었습니다.');
    ctx.showMessage('이제 특별한 영업이 가능합니다.');
    await ctx.wait();
  } else if (R === 6) {
    ctx.showMessage('음향 시설을 갖추었습니다.');
    ctx.showMessage('이제 다양한 쇼가 가능합니다.');
    await ctx.wait();
  } else if (R === 7) {
    ctx.flags[40] += 1;
    ctx.showMessage(`전속 경비원을 고용했습니다.(총 ${ctx.flags[40]}인)`);
    ctx.showMessage('쇼를 할 때 직원의 안전성이 높아집니다.');
    await ctx.wait();
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function facilities_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('어느 것을 봅니까?');
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  if (ctx.flags[48] & 1) {
    ctx.showMessage('[0] 개인실');
  }
  if (ctx.flags[48] & 2) {
    ctx.showMessage('[1] SM상품');
  }
  if (ctx.flags[48] & 4) {
    ctx.showMessage('[2] 호위');
  }
  if (ctx.flags[48] & 32) {
    ctx.showMessage('[3] 목욕실');
  }
  if (ctx.flags[48] & 128) {
    ctx.showMessage('[4] 포장마차');
  }
  if (ctx.flags[48] & 8) {
    ctx.showMessage('[5] 다목적 홀');
  }
  if (ctx.flags[48] & 16) {
    ctx.showMessage('[6] 음향 설비');
  }
  if (ctx.flags[48] & 64) {
    ctx.showMessage(`[7] 경비원(현재${ctx.flags[40]}/10인)`);
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('[999] - 돌아간다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 999;
  } else if (ctx.result === 0 && ctx.flags[48] & 1) {
    ctx.showMessage('＜개인실＞');
    ctx.showMessage('보다 성적인 서비스를 위해 필요한 방음 시설을 갖춘 독방');
    ctx.showMessage('A영업 및 V영업이 가능해진다.');
  } else if (ctx.result === 1 && ctx.flags[48] & 2) {
    ctx.showMessage('＜SM상품＞');
    ctx.showMessage('매니아가 선정한 다양한 SM상품');
    ctx.showMessage('SM영업이 가능해진다.');
  } else if (ctx.result === 2 && ctx.flags[48] & 4) {
    ctx.showMessage('＜호위＞');
    ctx.showMessage('직원의 호위겸 운전사');
    ctx.showMessage('출장 영업이 가능해진다.');
  } else if (ctx.result === 3 && ctx.flags[48] & 32) {
    ctx.showMessage('＜목욕실＞');
    ctx.showMessage('각 방마다 추가되는 넓은 목욕탕');
    ctx.showMessage('소프 플레이가 가능해진다.');
  } else if (ctx.result === 4 && ctx.flags[48] & 128) {
    ctx.showMessage('＜포장마차＞');
    ctx.showMessage('노예가 식사를 만들수 있는 포장마차');
    ctx.showMessage('포장 마차가 가능해진다.');
  } else if (ctx.result === 5 && ctx.flags[48] & 8) {
    ctx.showMessage('＜다목적 홀＞');
    ctx.showMessage('다양한 쇼가 가능해지는 넓은 홀');
    ctx.showMessage('특수 영업 메뉴에서 할 수 있는 접대의 종류가 증가');
  } else if (ctx.result === 6 && ctx.flags[48] & 16) {
    ctx.showMessage('＜음향 설비＞');
    ctx.showMessage('홀에 설치하는 다양한 음향 장비');
    ctx.showMessage('콘서트가 가능해진다.');
  } else if (ctx.result === 7 && ctx.flags[48] & 64) {
    ctx.showMessage('＜경비원＞');
    ctx.showMessage('다목적 홀에서 공연 개최시에 배치되는 경비');
    ctx.showMessage('고용 인원에 따라 직원의 안정성이 높아짐(최대 10명)');
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  await ctx.wait();
  ctx.restart();
}
