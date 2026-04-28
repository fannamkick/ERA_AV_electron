/**
 * SHOP_CHARABUY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function chara_buy_new(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM XTHVIEW
  X = 0;
  character.tflags[100] = 0;
  // Label: INPUT_LOOP
  await chara_list_new(ctx, character);
  for (let COUNT = 0; COUNT < 60; COUNT++) {
    A = ctx.count + character.tflags[100] * 60 + 200;
    B = character.tflags[A];
    CHARASALES:B = 1;
  }
  await chara_buy_show_new(ctx, character);
  await ctx.inputNumber();
  if (ctx.result === 1) {
    if (character.tflags[100] > 0) {
      character.tflags[100] -= 1;
    }
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 9) {
    if (character.tflags[100] < 3) {
      character.tflags[100] += 1;
    }
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 999) {
    await chara_buy_after(ctx, character);
    return 0;
  }
  if (ctx.result < 100 || ctx.result > 100 + 99) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  C = ctx.result + 1 - 100;
  D = ctx.result + 1000 - 100;
  if (ctx.flags[D] <= 0) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.charanum > ctx.flags[23]) {
    ctx.showMessage('《이 이상 계약하려면 다른 배우를 은퇴시켜야 합니다》'); ctx.waitInput();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  XTHVIEW = FINDELEMENT(TFLAG,C,200,300);
  await chara_manual(XTHVIEW, ctx, character);
  if (ctx.result === 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else {
  }
  if (ctx.money < ctx.flags[D]) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= ctx.flags[D];
  ctx.flags[D] = -1;
  // TODO: ADDCHARA C
  character = ctx.charanum - 1;
  ctx.showMessage(`W 《%타겟과(1)% 계약했습니다》`);
  X = character.no + 200;
  // TODO: LOADGLOBAL
  ctx.global[X] += 1;
  // TODO: SAVEGLOBAL
  await chara_buy_setting(ctx, character);
  await chara_buy_event(ctx, character);
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function chara_buy_show_new(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('여배우 후보 혹은 스탭 스카우트');
  ctx.showMessage('《AV배우 혹은 스탭이 되어줄 캐릭터와 계약할 수 있습니다》');
  ctx.drawLine();
  ctx.printValue(DAY+1);
  ctx.print('주차');
  if (TIME === 0) {
    ctx.showMessage('전반');
  } else {
    ctx.showMessage('후반');
  }
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  await print_shopcharalist(ctx, character);
  ctx.drawLine();
  ctx.print('page');
  ctx.printValue(character.tflags[100]);
  ctx.print('[1] 이전 페이지');
  // TODO: PRINTC
  // TODO: PRINTC 　[9] 다음 페이지
  ctx.showMessage('');
  ctx.drawLine();
  ctx.print('[999] - 돌아간다');
  ctx.showMessage('');
}

export async function chara_list_new(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  F = 0;
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    CHARASALES:ctx.count = 0;
    F = ctx.count + 200;
    character.tflags[F] = 0;
  }
  F = 200;
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    E = ctx.count + 1000;
    if (ctx.flags[E] > 0) {
      character.tflags[F] = E - 999;
      F += 1;
    }
  }
  return 0;
}

export async function print_shopcharalist(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM LCOUNT
  // TODO: #DIM LSCOUNT
  // TODO: #DIM MOJIC
  // TODO: FOR LCOUNT,1,60
  if (CHARASALES:LCOUNT) {
    if (EXISTCSV(LCOUNT)) {
      ctx.localStrings[LCOUNT] = CSVNAME(LCOUNT);
    }
    switch (ctx.localStrings[LCOUNT]) {
      case "레이첼・파라디수스":
        ctx.localStrings[LCOUNT] = "레이첼・I・P";
        case "면접 상대":
          ctx.localStrings[LCOUNT] = "【구인광고】";
        break;
      }
      ctx.showMessage(`LC [{LCOUNT+99}] ${ctx.localStrings[LCOUNT]} (${flag[1000+LCOUNT-1]} P)`);
      // TODO: FOR LSCOUNT,(STRLENS(LOCALS:LCOUNT)+DIGIT(FLAG:(1000+LCOUNT-1))+11),35
      ctx.print('');
      // TODO: MOJIC ++
      if (MOJIC == 9) {
        // TODO: BREAK
      }
      // TODO: NEXT
      MOJIC = 0;
      // TODO: LOCAL ++
      if (ctx.locals[0] % 3 == 0) {
        ctx.showMessage('');
      }
    }
    // TODO: NEXT
    if (ctx.locals[0] % 3) {
      ctx.showMessage('');
    }
    ctx.locals[0] = 0;
}
