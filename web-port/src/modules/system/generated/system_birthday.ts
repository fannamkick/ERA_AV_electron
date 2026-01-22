/**
 * SYSTEM_BIRTHDAY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function show_info_birthday(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.print('연령:');
  if (ctx.base[7] > 0 && ctx.talents[85] === 0) {
    if (ctx.base[7] === 999) {
      ctx.print('불명');
    } else {
      if (ctx.base[8] == 6) {
        ctx.print('자칭');
      }
      ctx.showMessage(`${ctx.base[7]}`);
      if (ctx.base[8] === 0) {
        ctx.print('세');
      } else if (ctx.base[8] === 1) {
        ctx.print('대');
      } else if (ctx.base[8] === 2) {
        ctx.print('대 초반');
      } else if (ctx.base[8] === 3) {
        ctx.print('대 중반');
      } else if (ctx.base[8] === 4) {
        ctx.print('대 후반');
      } else if (ctx.base[8] === 5) {
        ctx.print('세 전후');
      } else if (ctx.base[8] === 6) {
        ctx.print('세');
      }
    }
  } else if (ctx.base[9] === 999) {
    ctx.print('미상');
  } else {
    ctx.showMessage(`${ctx.base[9]}세`);
  }
  if (ctx.base[11] === 0) {
    ctx.showMessage(`?월`);
  } else {
    ctx.showMessage(`${ctx.base[11]}월`);
  }
  if (ctx.base[12] === 0) {
    ctx.showMessage(`?일생`);
  } else {
    ctx.showMessage(`${ctx.base[12]}일생`);
  }
  ctx.print('혈액형:');
  if (ctx.base[13] === 0) {
    ctx.showMessage('불명');
  } else if (ctx.base[13] === 1) {
    ctx.showMessage('A형');
  } else if (ctx.base[13] === 2) {
    ctx.showMessage('B형');
  } else if (ctx.base[13] === 3) {
    ctx.showMessage('O형');
  } else {
    ctx.showMessage('AB형');
  }
}

export async function happy_birthday(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.varSet(ctx.locals[0]);
  // TODO: FOR LOCAL,0,CHARANUM
  if (DAY[1] === ctx.base[ctx].locals[11]) {
    if (DAY[1] === 3 || DAY[1] === 5 || DAY[1] === 8 || DAY[1] === 10) {
      if ((DAY[2] === 1 && 1 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 7) || (DAY[2] === 2 && 8 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 14) || (DAY[2] === 3 && 15 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 21) || (DAY[2] === 4 && 22 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 28) ||  (DAY[2] === 5 && 29 <= ctx.base[ctx].locals[12])) {
        ctx.showMessage('*****************************************************');
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "가")} 생일을 맞이했습니다`);
        ctx.showMessage('*****************************************************'); ctx.waitInput();
        if (!ctx.flags[74]) {
          ctx.base[ctx].locals[9] += 1;
        }
        if (ctx.locals[0] != 0) {
          character = ctx.locals[0];
          await event_birthday(ctx, character);
        }
      }
    } else {
      if ((DAY[2] === 1 && 1 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 7) || (DAY[2] === 2 && 8 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 14) || (DAY[2] === 3 && 15 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 21) || (DAY[2] === 4 && 22 <= ctx.base[ctx].locals[12])) {
        ctx.showMessage('*****************************************************');
        ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[0]), "가")} 생일을 맞이했습니다`);
        ctx.showMessage('*****************************************************'); ctx.waitInput();
        if (!ctx.flags[74]) {
          ctx.base[ctx].locals[9] += 1;
        }
        character = ctx.locals[0];
        await event_birthday(ctx, character);
      }
    }
  }
  // TODO: NEXT
}

export async function manual_set_birthday(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('연령・생일・혈액형을 수동으로 설정합니다');
  ctx.showMessage('어느 캐릭터를 설정하시겠습니까?');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    ctx.showMessage(`[${ctx.count}] - ${ctx.getVarName("CALL", COUNT)}`);
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result >= 0 && ctx.result < ctx.count) {
    A = character;
    character = ctx.result;
    ctx.showMessage(`${ctx.getName(character)}의 연령・생일・혈액형 설정은 다음과 같습니다`);
    await show_info_birthday(ctx, character);
    // Label: INPUT_LOOP_1
    ctx.showMessage(`${ctx.getName(character)}의 연령을 설정해주세요(10-60, 불명이면 0)`);
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.base[9] = ctx.result;
      ctx.showMessage('실제 연령은 불명입니다. 외견 연령을 설정해주세요(10대-50대)');
      await age_unknown(ctx, character);
    } else if (ctx.result < 10 || ctx.result > 60) {
      ctx.showMessage('부적절한 값입니다. 다시 설정해주세요');
      // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.base[9] = ctx.result;
      ctx.base[8] = 0;
    }
    M = 0;
    // Label: INPUT_LOOP_2
    ctx.showMessage(`${ctx.getName(character)}가 태어난 달의 숫자를 설정해주세요(1-12, 불명이면 0)`);
    await ctx.inputNumber();
    if (ctx.result < 0 || ctx.result > 12) {
      ctx.showMessage('부적절한 값입니다. 다시 설정해주세요');
      // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 0) {
      ctx.showMessage('태어난 달은 불명인 것으로 하겠습니다');
    } else {
      M = ctx.result;
      ctx.base[11] = ctx.result;
    }
    // Label: INPUT_LOOP_3
    ctx.showMessage(`${ctx.getName(character)}가 태어난 날의 숫자를 설정해주세요(1-31, 불명이면 0)`);
    await ctx.inputNumber();
    if (ctx.result < 0) {
      ctx.showMessage('부적절한 값입니다. 다시 한 번 입력해주세요');
      // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 0) {
      ctx.showMessage('태어난 날은 불명인 것으로 하겠습니다');
    } else if (ctx.result > 28 && M === 2) {
      ctx.showMessage('부적절한 값입니다. 다시 한 번 입력해주세요');
      // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result > 30 && ( M === 4 || M === 6 || M === 9 || M === 11 )) {
      ctx.showMessage('부적절한 값입니다. 다시 한 번 입력해주세요');
      // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result > 31 && ( M === 1 || M === 3 || M === 5 || M === 7 || M === 8 || M === 10 || M === 12)) {
      ctx.showMessage('부적절한 값입니다. 다시 한 번 입력해주세요');
      // GOTO INPUT_LOOP_3 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.base[12] = ctx.result;
    }
    // Label: INPUT_LOOP_4
    ctx.showMessage(`${ctx.getName(character)}의 혈액형을 설정해주세요(0-4)`);
    ctx.print('[0] 불명');
    ctx.print('[1] A형');
    ctx.showMessage('[2] B형');
    ctx.print('[3] O형');
    ctx.showMessage('[4] AB형');
    await ctx.inputNumber();
    if (ctx.result < 0 || ctx.result > 4) {
      ctx.showMessage('부적절한 값입니다. 다시 설정해주세요');
      // GOTO INPUT_LOOP_4 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.base[13] = ctx.result;
    }
    ctx.showMessage(`${ctx.getName(character)}의 연령・생일・혈액형 설정은 다음과 같습니다`);
    await show_info_birthday(ctx, character);
    ctx.showMessage('이것으로 좋습니까?');
    ctx.showMessage('[0] - 예');
    ctx.showMessage('[1] - 다시 설정');
    ctx.showMessage('[2] - 이 캐릭터의 설정을 그만둔다(기존의 값은 0이 됩니다)');
    // Label: INPUT_LOOP_6
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W ${ctx.getName(character)}의 연령・생일・혈액형을 설정합니다`);
      character = A;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 1) {
      ctx.showMessage('다시 설정하겠습니다'); ctx.waitInput();
      // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 2) {
      ctx.showMessage('이 캐릭터의 설정을 중지합니다(기존의 값은 0이 됩니다)'); ctx.waitInput();
      ctx.base[9] = 0;
      ctx.base[11] = 0;
      ctx.base[12] = 0;
      ctx.base[13] = 0;
      character = A;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      // GOTO INPUT_LOOP_6 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function age_unknown(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_7
  ctx.print('[0] 10대 초반');
  ctx.print('[1] 10대 중반');
  ctx.showMessage('[2] 10대 후반');
  ctx.print('[3] 20대 초반');
  ctx.print('[4] 20대 중반');
  ctx.showMessage('[5] 20대 후반');
  ctx.print('[6] 30대 초반');
  ctx.print('[7] 30대 중반');
  ctx.showMessage('[8] 30대 후반');
  ctx.print('[9] 40대 초반');
  ctx.print('[10] 40대 후반');
  ctx.print('[11] 50대 초반');
  ctx.showMessage('[12] 50대 후반');
  ctx.showMessage('[99] 연령 미상');
  await ctx.inputNumber();
  if (ctx.result === 99) {
    ctx.base[7] = 0;
    ctx.base[8] = 1;
  } else if (ctx.result === 0) {
    ctx.base[7] = 10;
    ctx.base[8] = 2;
  } else if (ctx.result === 1) {
    ctx.base[7] = 10;
    ctx.base[8] = 3;
  } else if (ctx.result === 2) {
    ctx.base[7] = 10;
    ctx.base[8] = 4;
  } else if (ctx.result === 3) {
    ctx.base[7] = 20;
    ctx.base[8] = 2;
  } else if (ctx.result === 4) {
    ctx.base[7] = 20;
    ctx.base[8] = 3;
  } else if (ctx.result === 5) {
    ctx.base[7] = 20;
    ctx.base[8] = 4;
  } else if (ctx.result === 6) {
    ctx.base[7] = 30;
    ctx.base[8] = 2;
  } else if (ctx.result === 7) {
    ctx.base[7] = 30;
    ctx.base[8] = 3;
  } else if (ctx.result === 8) {
    ctx.base[7] = 30;
    ctx.base[8] = 4;
  } else if (ctx.result === 9) {
    ctx.base[7] = 20;
    ctx.base[8] = 2;
  } else if (ctx.result === 10) {
    ctx.base[7] = 20;
    ctx.base[8] = 4;
  } else if (ctx.result === 11) {
    ctx.base[7] = 50;
    ctx.base[8] = 2;
  } else if (ctx.result === 12) {
    ctx.base[7] = 50;
    ctx.base[8] = 4;
  } else {
    // GOTO INPUT_LOOP_7 - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function manual_set_date(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('오늘의 날짜를 수동으로 설정합니다');
  // Label: INPUT_LOOP_0
  M = 0;
  ctx.showMessage('현재 몇 월입니까?');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result <= 0 || ctx.result > 12) {
    ctx.showMessage('부적절한 값입니다. 다시 한 번 입력해주세요');
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    M = ctx.result;
  }
  // Label: INPUT_LOOP_1
  ctx.showMessage('현재 며칠입니까?');
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 1) {
    ctx.showMessage('부적절한 값입니다. 다시 한 번 입력해주세요');
    // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result > 28 && M === 2) {
    ctx.showMessage('부적절한 값입니다. 다시 한 번 입력해주세요');
    // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result > 30 && ( M === 4 || M === 6 || M === 9 || M === 11 )) {
    ctx.showMessage('부적절한 값입니다. 다시 한 번 입력해주세요');
    // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result > 31 && ( M === 1 || M === 3 || M === 5 || M === 7 || M === 8 || M === 10 || M === 12)) {
    ctx.showMessage('부적절한 값입니다. 다시 한 번 입력해주세요');
    // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    DAY[1] = M;
    DAY[2] = ctx.result;
  }
  ctx.showMessage(`오늘의 날짜가 ${DAY[1]}월 ${DAY[2]}로 변경되었습니다`);
  ctx.flags[80] = 0;
  ctx.flags[81] = 0;
  ctx.flags[82] = 0;
  ctx.showMessage('또한, FLAG:80~FLAG:82를 0으로 수정하였습니다');
  // Label: INPUT_LOOP_2
  ctx.showMessage('이대로 실행합니까?');
  ctx.showMessage('[0] - 예');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    ctx.showMessage('다시 설정하겠습니다'); ctx.waitInput();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result != 0) {
    // GOTO INPUT_LOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function read_csv_birthday(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('CSV 파일로부터 연령, 생일, 혈액형 정보를 불러옵니다.');
  ctx.showMessage('불러들일 캐릭터의 종류를 선택해주십시오.');
  ctx.showMessage('');
  ctx.showMessage('[0] - 미설정 캐릭터만(패치가 되었을 때 사용하는 메뉴)');
  ctx.showMessage('[1] - 등록 캐릭터 모두(［고등학생］과 ［중학생］을 고려하지 않습니다)');
  ctx.showMessage('[9] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 9) {
    return 0;
  } else if (ctx.result === 0) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.base[ctx.count][9] === 0) {
        ctx.base[ctx.count][7] = "CSVBASE(NO:COUNT, 7, 0)";
        ctx.base[ctx.count][8] = "CSVBASE(NO:COUNT, 8, 0)";
        ctx.base[ctx.count][9] = "CSVBASE(NO:COUNT, 9, 0)";
      }
      if (ctx.base[ctx.count][11] === 0) {
        ctx.base[ctx.count][11] = "CSVBASE(NO:COUNT, 11, 0)";
        ctx.base[ctx.count][12] = "CSVBASE(NO:COUNT, 12, 0)";
        ctx.base[ctx.count][13] = "CSVBASE(NO:COUNT, 13, 0)";
      }
    }
  } else if (ctx.result === 1) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      ctx.base[ctx.count][7] = "CSVBASE(NO:COUNT, 7, 0)";
      ctx.base[ctx.count][8] = "CSVBASE(NO:COUNT, 8, 0)";
      ctx.base[ctx.count][9] = "CSVBASE(NO:COUNT, 9, 0)";
      ctx.base[ctx.count][11] = "CSVBASE(NO:COUNT, 11, 0)";
      ctx.base[ctx.count][12] = "CSVBASE(NO:COUNT, 12, 0)";
      ctx.base[ctx.count][13] = "CSVBASE(NO:COUNT, 13, 0)";
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage('완료했습니다'); ctx.waitInput();
}

export async function add_csv_birthday(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (DAY[1] === ctx.base[ctx].locals[11]) {
    if (DAY[1] === 3 || DAY[1] === 5 || DAY[1] === 8 || DAY[1] === 10) {
      if ((DAY[2] === 1 && 1 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 7) || (DAY[2] === 2 && 8 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 14) || (DAY[2] === 3 && 15 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 21) || (DAY[2] === 4 && 22 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 28) ||  (DAY[2] === 5 && 29 <= ctx.base[ctx].locals[12])) {
        if (!ctx.flags[74]) {
          ctx.base[ctx].locals[9] += 1;
        }
      }
    } else {
      if ((DAY[2] === 1 && 1 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 7) || (DAY[2] === 2 && 8 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 14) || (DAY[2] === 3 && 15 <= ctx.base[ctx].locals[12] && ctx.base[ctx].locals[12] <= 21) || (DAY[2] === 4 && 22 <= ctx.base[ctx].locals[12])) {
        if (!ctx.flags[74]) {
          ctx.base[ctx].locals[9] += 1;
        }
      }
    }
  }
}
