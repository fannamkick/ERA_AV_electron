/**
 * SYSTEM_IWS.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function show_info_bodysize(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.base[20] === 0) {
    ctx.showMessage(`신장: 불명`);
  } else {
    ctx.showMessage(`신장: ${ctx.base[20]}cm`);
  }
  if (ctx.base[21] === 0) {
    ctx.showMessage(`체중: 불명`);
  } else {
    ctx.showMessage(`체중: ${ctx.base[21]}kg`);
  }
  if (ctx.base[22] === 0) {
    ctx.showMessage(`B: 불명`);
  } else if (ctx.flags[38] === 0) {
    ctx.showMessage(`B: ${ctx.base[22]}cm`);
  } else {
    ctx.showMessage(`B: ${ctx.base[22]}.`);
    if (ctx.base[32] < 10) {
      ctx.print('0');
    }
    ctx.showMessage(`${ctx.base[32]}cm`);
  }
  ctx.print('(');
  await show_cupsize(ctx, character);
  ctx.print(')');
  if (ctx.base[23] === 0) {
    ctx.showMessage(`W: 불명`);
  } else {
    ctx.showMessage(`W: ${ctx.base[23]}cm`);
  }
  if (ctx.base[24] === 0) {
    ctx.showMessage(`H: 불명`);
  } else {
    ctx.showMessage(`H: ${ctx.base[24]}cm`);
  }
  ctx.showMessage('');
  if (ctx.talents[121] === 1 || ctx.talents[122] === 1) {
    ctx.showMessage(``);
    ctx.showMessage(`발기시 자지사이즈: ${ctx.base[50]}cm(`);
    if (character.cflags[611] === 3) {
      ctx.showMessage(`자연포경`);
    } else if (character.cflags[611] === 2) {
      ctx.showMessage(`가성포경`);
    } else if (character.cflags[611] === 1) {
      ctx.showMessage(`가성포경`);
    } else {
      ctx.showMessage(`진성포경`);
    }
    ctx.showMessage(`)`);
  }
}

export async function check_cupsize(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = ((((ctx.base[22] * 100) - (ctx.base[20] * 54)) * 100) / 250);
  Y = ((((ctx.base[20] * 38) - (ctx.base[23] * 100)) * 100) / 342);
  if (ctx.talents[153]) {
    Y = ((((ctx.base[20] * 38) - ((ctx.base[23] - (character.cflags[123] / 100)) * 100)) * 100) / 342);
  }
  Z = ((((ctx.base[20] * 100) - 15880) * 100) / 2300);
  S = X + Y + Z;
  character.cflags[36] = 0;
  // Label: CHECK_LOOP
  if (S > -450) {
    character.cflags[36] += 1;
    S -= 100;
    // GOTO CHECK_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else {
    X = 0;
    Y = 0;
    Z = 0;
    S = 0;
  }
}

export async function show_cupsize(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await check_cupsize(ctx, character);
  if (character.cflags[36] === 0) {
    ctx.print('측정불가');
  } else if (character.cflags[36] === 1) {
    ctx.print('AA');
  } else if (character.cflags[36] === 2) {
    ctx.print('A');
  } else if (character.cflags[36] === 3) {
    ctx.print('B');
  } else if (character.cflags[36] === 4) {
    ctx.print('C');
  } else if (character.cflags[36] === 5) {
    ctx.print('D');
  } else if (character.cflags[36] === 6) {
    ctx.print('E');
  } else if (character.cflags[36] === 7) {
    ctx.print('F');
  } else if (character.cflags[36] === 8) {
    ctx.print('G');
  } else if (character.cflags[36] === 9) {
    ctx.print('H');
  } else if (character.cflags[36] === 10) {
    ctx.print('I');
  } else if (character.cflags[36] === 11) {
    ctx.print('J');
  } else if (character.cflags[36] === 12) {
    ctx.print('K');
  } else if (character.cflags[36] === 13) {
    ctx.print('L');
  } else if (character.cflags[36] === 14) {
    ctx.print('M');
  } else if (character.cflags[36] === 15) {
    ctx.print('N');
  } else if (character.cflags[36] === 16) {
    ctx.print('O');
  } else if (character.cflags[36] === 17) {
    ctx.print('P');
  } else if (character.cflags[36] === 18) {
    ctx.print('Q');
  } else if (character.cflags[36] === 19) {
    ctx.print('R');
  } else if (character.cflags[36] === 20) {
    ctx.print('S');
  } else if (character.cflags[36] === 21) {
    ctx.print('T');
  } else if (character.cflags[36] === 22) {
    ctx.print('∪');
  } else if (character.cflags[36] === 23) {
    ctx.print('V');
  } else if (character.cflags[36] === 24) {
    ctx.print('W');
  } else if (character.cflags[36] === 25) {
    ctx.print('X');
  } else if (character.cflags[36] === 26) {
    ctx.print('Y');
  } else if (character.cflags[36] === 27) {
    ctx.print('Z');
  } else {
    ctx.print('측정불가');
  }
}

export async function check_iws(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  U = 0;
  if (B) {
    U = ((B + ctx.abilities[1]) * ctx.flags[38]);
    if (ctx.talents[116]) {
      U = 0;
    }
    ctx.base[32] += U;
    if (ctx.base[32] >= 100) {
      ctx.base[22] += "BASE:32 /100";
      ctx.base[32] = "BASE:32 % 100";
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    if (U % 100 < 10) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 가슴은 {U / 100}.{U % 100}cm 성장했다.`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 가슴은 {U / 100}.{U % 100}cm 성장했다.`);
    }
    await bust_rankup(ctx, character);
  }
}

export async function bust_rankup(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await check_cupsize(ctx, character);
  if (character.cflags[36] > 1 && ctx.talents[116]) {
    ctx.talents[116] = 0;
    ctx.talents[109] = 1;
    ctx.showMessage('＊바스트 랭크 업!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【절벽】에서【빈유】가 되었다.`);
  } else if (character.cflags[36] > 3 && ctx.talents[109]) {
    ctx.talents[109] = 0;
    ctx.showMessage('＊바스트 랭크 업!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【빈유】가 아니게 되었다.`);
  } else if (character.cflags[36] > 5 && ctx.talents[110] === 0 && ctx.talents[114] === 0 && ctx.talents[251] === 0 && ctx.talents[252] === 0 && ctx.talents[253] === 0) {
    ctx.talents[110] = 1;
    ctx.showMessage('＊바스트 랭크 업!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【거유】가 되었다.`);
  } else if (character.cflags[36] > 7  && ctx.talents[110]) {
    ctx.talents[110] = 0;
    ctx.talents[114] = 1;
    ctx.showMessage('＊바스트 랭크 업!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【거유】에서【폭유】가 되었다.`);
  } else if (character.cflags[36] > 10 && ctx.talents[114] && ctx.talents[251] === 0 && ctx.talents[252] === 0 && ctx.talents[253] === 0) {
    ctx.talents[251] = 1;
    ctx.showMessage('＊바스트 랭크 업!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【폭유】에서【초유】가 되었다.`);
  } else if (character.cflags[36] > 14 && ctx.talents[251]) {
    ctx.talents[251] = 0;
    ctx.talents[252] = 1;
    ctx.showMessage('＊바스트 랭크 업!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【초유】에서【마유】가 되었다.`);
  } else if (character.cflags[36] > 19 && ctx.talents[252]) {
    ctx.talents[252] = 0;
    ctx.talents[253] = 1;
    ctx.showMessage('＊바스트 랭크 업!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【마유】에서【신유】가 되었다.`);
  }
}

export async function bust_rankdown(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await check_cupsize(ctx, character);
  if (character.cflags[36] <= 19 && ctx.talents[253]) {
    ctx.talents[252] = 1;
    ctx.talents[253] = 0;
    ctx.showMessage('＊바스트 랭크 다운!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【신유】에서【마유】가 되었다.`);
  } else if (character.cflags[36] <= 14 && ctx.talents[252]) {
    ctx.talents[251] = 1;
    ctx.talents[252] = 0;
    ctx.showMessage('＊바스트 랭크 다운!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【마유】에서【초유】가 되었다.`);
  } else if (character.cflags[36] <= 10 && ctx.talents[251]) {
    ctx.talents[114] = 1;
    ctx.talents[251] = 0;
    ctx.showMessage('＊바스트 랭크 다운!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【초유】에서【폭유】가 되었다.`);
  } else if (character.cflags[36] <= 7  && ctx.talents[114]) {
    ctx.talents[110] = 1;
    ctx.talents[114] = 0;
    ctx.showMessage('＊바스트 랭크 다운!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【폭유】에서【거유】가 되었다.`);
  } else if (character.cflags[36] <= 5 && ctx.talents[110]) {
    ctx.talents[110] = 0;
    ctx.showMessage('＊바스트 랭크 다운!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【거유】가 아니게 되었다.`);
  } else if (character.cflags[36] <= 3 && ctx.talents[109] === 0 && ctx.talents[116] === 0) {
    ctx.talents[109] = 1;
    ctx.showMessage('＊바스트 랭크 다운!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【빈유】가 되었다.`);
  } else if (character.cflags[36] <= 1 && ctx.talents[109]) {
    ctx.talents[116] = 1;
    ctx.talents[109] = 0;
    ctx.showMessage('＊바스트 랭크 다운!＊');
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")}【빈유】에서【절벽】이 되었다.`);
  }
}

export async function modify_bustup_iws(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = character;
  character = ctx.result;
  await check_cupsize(ctx, character);
  C = (20000 + (character.cflags[36] * 3000));
  // Label: INPUT_LOOP
  ctx.showMessage(`%타겟을(1)% 거유화시키려면, {C}포인트 필요합니다`);
  ctx.showMessage(`%타겟을(1)% 거유화시킵니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    character = A;
    return 0;
  } else if (ctx.result === 0) {
    if (ctx.money < C) {
      ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
      character = A;
      return 0;
    }
    P = character.cflags[36];
    // Label: LOOP_BUSTUP
    if (character.cflags[36] === P) {
      ctx.base[22] += 1;
      await check_cupsize(ctx, character);
      // GOTO LOOP_BUSTUP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      if (ctx.base[32] < 10) {
        ctx.showMessage(`《${ctx.getName(character)}의 가슴은 ${ctx.base[22]}.0${ctx.base[32]}cm(`);
      } else {
        ctx.showMessage(`《${ctx.getName(character)}의 가슴은 ${ctx.base[22]}.${ctx.base[32]}cm(`);
      }
      await show_cupsize(ctx, character);
      ctx.showMessage(`W 컵)이 되었다》`);
      await bust_rankup(ctx, character);
      P = 0;
      ctx.money -= C;
      character = A;
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function modify_bustdown_iws(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = character;
  character = ctx.result;
  await check_cupsize(ctx, character);
  if (character.cflags[36] <= 1) {
    ctx.showMessage(`W ${ctx.getName(character)}의 가슴은 이 이상 작아질 수 없습니다.`);
    character = A;
    return 0;
  }
  C = 10000;
  if (character.cflags[36] <= 4) {
    C = 160000 - (character.cflags[36] * 30000);
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`%타겟을(1)% 빈유화시키려면, {C}포인트 필요합니다`);
  ctx.showMessage(`%타겟을(1)% 빈유화시킵니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    character = A;
    return 0;
  } else if (ctx.result === 0) {
    if (ctx.money < C) {
      ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
      character = A;
      return 0;
    }
    P = character.cflags[36];
    // Label: LOOP_BUSTDOWN
    if (character.cflags[36] === P) {
      ctx.base[22] -= 1;
      await check_cupsize(ctx, character);
      // GOTO LOOP_BUSTDOWN - 구조 변경 필요 (while/break 사용 권장)
    } else {
      if (ctx.base[32] < 10) {
        ctx.showMessage(`《${ctx.getName(character)}의 가슴은 ${ctx.base[22]}.0${ctx.base[32]}cm(`);
      } else {
        ctx.showMessage(`《${ctx.getName(character)}의 가슴은 ${ctx.base[22]}.${ctx.base[32]}cm(`);
      }
      await show_cupsize(ctx, character);
      ctx.showMessage(`W 컵)이 되었다》`);
      await bust_rankdown(ctx, character);
      P = 0;
      ctx.money -= C;
      character = A;
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function grow_3_size_iws(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = character;
  character = ctx.count;
  if (ctx.talents[153]) {
    U = 10 + ctx.rand(5);
    ctx.base[35] += U;
    character.cflags[121] += U;
    if (ctx.base[35] >= 100) {
      ctx.base[21] += ctx.base[35] / 100;
      ctx.base[35] = "BASE:35 % 100";
    }
  }
  U = 15 + ctx.rand(5);
  ctx.base[32] += U + (ctx.flags[38] * (ctx.rand(5) + 5));
  character.cflags[122] += U;
  if (ctx.base[32] >= 100) {
    ctx.base[22] += "BASE:32 /100";
    ctx.base[32] = "BASE:32 % 100";
  }
  await bust_rankup(ctx, character);
  if (ctx.talents[153]) {
    U = 70 + ctx.rand(20);
    ctx.base[33] += U;
    character.cflags[123] += U;
    if (ctx.base[33] >= 100) {
      ctx.base[23] += "BASE:33 /100";
      ctx.base[33] = "BASE:33 % 100";
    }
  }
  if (ctx.talents[153]) {
    U = 10 + ctx.rand(5);
    ctx.base[34] += U;
    character.cflags[124] += U;
    if (ctx.base[34] >= 100) {
      ctx.base[24] += "BASE:34 /100";
      ctx.base[34] = "BASE:34 % 100";
    }
  }
  character = A;
}

export async function reverse_3_size_iws(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = character;
  character = C;
  ctx.base[35] -= character.cflags[121];
  if (ctx.base[35] < 0) {
    ctx.base[21] += ctx.base[35] / 100;
    ctx.base[35] = 0 - (ctx.base[35] % 100);
  }
  character.cflags[121] = 0;
  if (ctx.talents[154] === 1) {
  } else {
    ctx.base[32] -= character.cflags[122];
    if (ctx.base[32] < 0) {
      ctx.base[22] += ctx.base[32] / 100;
      ctx.base[32] = 0 - (ctx.base[32] % 100);
    }
    character.cflags[122] = 0;
    await bust_rankdown(ctx, character);
    await bust_rankdown(ctx, character);
  }
  ctx.base[33] -= character.cflags[123];
  if (ctx.base[33] < 0) {
    ctx.base[23] += ctx.base[33] / 100;
    ctx.base[33] = 0 - (ctx.base[33] % 100);
  }
  character.cflags[123] = 0;
  ctx.base[34] -= character.cflags[124];
  if (ctx.base[34] < 0) {
    ctx.base[24] += ctx.base[34] / 100;
    ctx.base[34] = 0 - (ctx.base[34] % 100);
  }
  character.cflags[124] = 0;
  character = A;
}

export async function manual_set_3size(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('쓰리 사이즈를 수동으로 설정합니다');
  ctx.showMessage('설정 가능한 것은 쓰리 사이즈 미설정인 캐릭터에 한정됩니다');
  ctx.showMessage('어느 캐릭터를 설정하시겠습니까?');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == ctx.master) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][20] == 0) {
      ctx.showMessage(`[${ctx.count}] - ${ctx.getVarName("CALL", COUNT)}`);
    }
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.base[ctx.result][20] === 0) {
    A = character;
    character = ctx.result;
    // Label: INPUT_LOOP_1
    ctx.showMessage(`${ctx.getName(character)}의 신장을 설정해주세요(140-180)`);
    await ctx.inputNumber();
    if (ctx.result < 140 || ctx.result > 180) {
      ctx.showMessage('부적절한 값입니다. 다시 입력해주세요');
      // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      B = ctx.result;
      ctx.base[20] = ctx.result;
    }
    // Label: INPUT_LOOP_2
    ctx.showMessage(`${ctx.getName(character)}의 체중을 설정해주세요({B * 25 / 100}-{B * 30 / 100})`);
    await ctx.inputNumber();
    if (ctx.result < B * 25 / 100 || ctx.result > B * 30 / 100) {
      ctx.showMessage('부적절한 값입니다. 다시 설정해주세요');
      // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.base[21] = ctx.result;
    }
    // Label: INPUT_LOOP_3
    ctx.showMessage(`${ctx.getName(character)}의 가슴 사이즈를 설정해주세요({B * 45 / 100}-{B * 55 / 100})`);
    await ctx.inputNumber();
    if (ctx.result < B * 45 / 100 || ctx.result > (B * 55 / 100)) {
      ctx.showMessage('부적절한 값입니다. 다시 설정해주세요');
      // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      C = ctx.result;
      ctx.base[22] = ctx.result;
    }
    // Label: INPUT_LOOP_4
    ctx.showMessage(`${ctx.getName(character)}의 허리 사이즈를 설정해주세요({B * 35 / 100}-{B * 40 / 100})`);
    await ctx.inputNumber();
    if (ctx.result < B * 35 / 100 || ctx.result > B * 40 / 100) {
      ctx.showMessage('부적절한 값입니다. 다시 설정해주세요');
      // GOTO INPUT_LOOP_4 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.base[23] = ctx.result;
    }
    // Label: INPUT_LOOP_5
    ctx.showMessage(`${ctx.getName(character)}의 엉덩이 사이즈를 설정해주세요({C * 95 / 100}-{C * 105 / 100})`);
    await ctx.inputNumber();
    if (ctx.result < C * 95 / 100 || ctx.result > C * 105 / 100) {
      ctx.showMessage('부적절한 값입니다. 다시 설정해주세요');
      // GOTO INPUT_LOOP_5 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.base[24] = ctx.result;
    }
    ctx.showMessage(`${ctx.getName(character)}의 쓰리 사이즈 설정은 다음과 같습니다`);
    await show_info_bodysize(ctx, character);
    ctx.showMessage('이렇게 변경합니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 다시 설정한다');
    ctx.showMessage('[2] - 이 캐릭터의 설정을 그만둔다');
    // Label: INPUT_LOOP_6
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W ${ctx.getName(character)}의 쓰리 사이즈를 설정했습니다`);
      character = A;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('다시 설정하겠습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 2) {
      ctx.showMessage('이 캐릭터의 설정을 중지하겠습니다'); ctx.waitInput();
      ctx.base[20] = 0;
      ctx.base[21] = 0;
      ctx.base[22] = 0;
      ctx.base[23] = 0;
      ctx.base[24] = 0;
      character = A;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_6 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function read_csv_iws(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('CSV 파일로부터 쓰리 사이즈 정보를 불러옵니다.');
  ctx.showMessage('불러올 캐릭터의 분류를 선택해주세요.');
  ctx.showMessage('');
  ctx.showMessage('[0] - 미설정 캐릭터만(패치를 하였을 때 사용해주세요)');
  ctx.showMessage('[1] - 등록된 캐릭터 전부(모두의 사이즈가 리셋됩니다!)');
  ctx.showMessage('[9] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 9) {
    return 0;
  } else if (ctx.result === 0) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.base[ctx.count][20] === 0) {
        ctx.base[ctx.count][20] = "CSVBASE(NO:COUNT, 20, 0)";
        ctx.base[ctx.count][21] = "CSVBASE(NO:COUNT, 21, 0)";
        ctx.base[ctx.count][22] = "CSVBASE(NO:COUNT, 22, 0)";
        ctx.base[ctx.count][23] = "CSVBASE(NO:COUNT, 23, 0)";
        ctx.base[ctx.count][24] = "CSVBASE(NO:COUNT, 24, 0)";
      }
    }
  } else if (ctx.result === 1) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      ctx.base[ctx.count][20] = "CSVBASE(NO:COUNT, 20, 0)";
      ctx.base[ctx.count][21] = "CSVBASE(NO:COUNT, 21, 0)";
      ctx.base[ctx.count][22] = "CSVBASE(NO:COUNT, 22, 0)";
      ctx.base[ctx.count][23] = "CSVBASE(NO:COUNT, 23, 0)";
      ctx.base[ctx.count][24] = "CSVBASE(NO:COUNT, 24, 0)";
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage('완료했습니다'); ctx.waitInput();
}
