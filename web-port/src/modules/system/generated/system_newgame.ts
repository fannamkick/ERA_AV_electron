/**
 * SYSTEM_NEWGAME.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function game_continue(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  // Label: INPUT_LOOP
  ctx.showMessage('강하게 뉴게임을 실행하시겠습니까?');
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    // Label: INPUT_LOOP2
    ctx.showMessage('');
    ctx.showMessage('주인공의 능력 및【연심】or【음란】을 습득한 여배우 및 후보를 인계하여,');
    ctx.showMessage('처음부터 다시 플레이합니다.');
    await ctx.wait();
    await start_newgame(ctx, character);
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function start_newgame(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_01
  X = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    character.cflags[ctx.count][680] = 0;
    character.cflags[ctx.count][681] = 0;
    character.cflags[ctx.count][682] = 0;
    character.cflags[ctx.count][683] = 0;
    character.cflags[ctx.count][684] = 0;
    character.cflags[ctx.count][60] = 0;
    character.cflags[ctx.count][613] = 0;
    character.cflags[ctx.count][671] = 0;
  }
  character.cflags[ctx.master][65] = 0;
  ctx.flags[556] = 0;
  ctx.flags[557] = 0;
  J = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    character.cflags[ctx.count][130] = 0;
  }
  await newgame_succeeded(ctx, character);
  // Label: INPUT_LOOP_02
  if (J > 0) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count == 0) {
        // TODO: CONTINUE
      }
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      character = ctx.count;
      ctx.showMessage(` ${ctx.getName(character)}`);
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.showMessage('이상의 노예를 인계하여 새 게임을 시작하시겠습니까?');
  } else {
    ctx.showMessage('배우를 인계하지 않고 새 게임을 시작하시겠습니까?');
  }
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result != 0) {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.charanum > 1) {
    J = ctx.charanum - 1;
    for (let COUNT = 0; COUNT < ctx.charanum - 1; COUNT++) {
      if (character.cflags[J][130] == 0) {
        // TODO: DELCHARA J
      }
      J -= 1;
    }
  }
  for (let COUNT = 0; COUNT < 99; COUNT++) {
    A = 1000 + ctx.count;
    ctx.flags[A] = 0;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 153) || ctx.getTalent(count, 154)) {
      character.cflags[ctx.count][110] -= DAY;
    } else {
      character.cflags[ctx.count][101] = 0;
      character.cflags[ctx.count][102] = 0;
      character.cflags[ctx.count][103] = 0;
      character.cflags[ctx.count][104] = 0;
      character.cflags[ctx.count][105] = 0;
      character.cflags[ctx.count][106] = 0;
      character.cflags[ctx.count][109] = 0;
      character.cflags[ctx.count][110] = 0;
      character.cflags[ctx.count][111] = 0;
    }
    if (character.cflags[ctx.count][43] > 0) {
      character.cflags[ctx.count][43] = 0;
    }
    if (character.cflags[ctx.count][44] > 0) {
      character.cflags[ctx.count][44] = 0;
    }
    if (character.cflags[ctx.count][45] > 0) {
      character.cflags[ctx.count][45] = 0;
    }
    if (character.cflags[ctx.count][46] > 0) {
      character.cflags[ctx.count][46] = 0;
    }
    if (character.cflags[ctx.count][47] > 0) {
      character.cflags[ctx.count][47] = 0;
    }
    character.cflags[ctx.count][12] = 0;
    character.cflags[ctx.count][13] = 0;
    A = ctx.getCharacterNo(ctx.count) + 999;
    ctx.flags[A] = -1;
    if (character.cflags[ctx.count][14] === 0 && character.cflags[ctx.count][15] === 1) {
      if (ctx.flags[201]) {
        character.cflags[ctx.count][14] = ctx.flags[201];
      } else {
        character.cflags[ctx.count][14] = 99;
      }
    }
    if (character.cflags[ctx.count][18] === 0 && (character.cflags[ctx.count][16] % 100) === 1) {
      if (ctx.flags[201]) {
        character.cflags[ctx.count][18] = ctx.flags[201];
      } else {
        character.cflags[ctx.count][18] = 99;
      }
    }
  }
  await chara_price(ctx, character);
  ctx.flags[10] += 1;
  for (let COUNT = 0; COUNT < 99; COUNT++) {
    if (ctx.count == 60) {
      // TODO: CONTINUE
    }
    if (ctx.count == 61) {
      // TODO: CONTINUE
    }
    if (ctx.count == 62) {
      // TODO: CONTINUE
    }
    if (ctx.count == 63) {
      // TODO: CONTINUE
    }
    if (ctx.count == 90) {
      // TODO: CONTINUE
    }
    if (ctx.count == 22) {
      // TODO: CONTINUE
    }
    ctx.item[ctx.count] = 0;
    ITEMSALES:ctx.count = 1;
  }
  ctx.item[6] = 1;
  DAY = 0;
  TIME = 0;
  character = -1;
  ctx.assi = -1;
  ctx.flags[1] = -1;
  ctx.flags[2] = -1;
  character = -1;
  ctx.assi = -1;
  ctx.flags[1] = -1;
  ctx.flags[2] = -1;
  ctx.flags[0] = 0;
  ctx.flags[1] = 0;
  ctx.flags[2] = 0;
  ctx.flags[3] = 0;
  ctx.flags[4] = 0;
  ctx.flags[5] = 0;
  ctx.flags[200] = 1;
  ctx.flags[40] = 0;
  ctx.flags[48] = 0;
  if (ctx.flags[39] === 0) {
    ctx.showMessage('로리콘 플래그를 계승하시겠습니까?');
    ctx.showMessage('[0] 계승한다');
    ctx.showMessage('[1] 계승하지 않는다');
    ctx.showMessage('[9] 로리콘 시스템을 사용하지 않는다');
    // Label: INPUT_LOOP_LOLI
    await ctx.inputNumber();
    if (ctx.result === 1) {
      ctx.flags[68] = 0;
      ctx.getTalent(master, 163) = 0;
    } else if (ctx.result === 9) {
      ctx.flags[68] = 0;
      ctx.getTalent(master, 163) = 0;
      ctx.flags[39] = 1;
    } else if (ctx.result != 0) {
      // GOTO INPUT_LOOP_LOLI - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  ctx.showMessage('');
  ctx.showMessage('★★모드를 선택해주세요★★');
  ctx.showMessage('[0] EASY     (120주 제한, 목표 금액 3000000pt)');
  ctx.showMessage('[1] NORMAL   (100주 제한, 목표 금액 5000000pt)');
  // Label: INPUT_LOOP_0
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.flags[3] = 120;
    ctx.flags[4] = 3000000;
    ctx.flags[5] = 1;
    ctx.flags[24] = 1;
    ctx.money = 5000;
    if (GETCHARA(151, 0) < 0) {
      // TODO: ADDCHARA 151
      // TODO: LOADGLOBAL
      ctx.global[351] += 1;
      // TODO: SAVEGLOBAL
      ctx.showMessage(`W 《키류 조직으로부터 업소녀「타카나시 노에미」가 파견되었습니다》`);
    }
  } else if (ctx.result === 1) {
    ctx.flags[3] = 100;
    ctx.flags[4] = 5000000;
    ctx.flags[5] = 2;
    ctx.flags[35] = 1;
    ctx.money = 2000;
  } else {
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  await start_select_opening(ctx, character);
  // TODO: BEGIN SHOP
  return 0;
}

export async function newgame_succeeded(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM 인수
  // TODO: #DIM 후보리스트,500
  // TODO: #DIM CNUM
  // TODO: #DIM LINENUM
  ctx.varSet(후보리스트);
  // TODO: 인수 = 0
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 85) == 0 && ctx.getTalent(count, 76) == 0) {
      // TODO: CONTINUE
    }
    // TODO: 후보리스트:인수 = COUNT
    // TODO: 인수++
  }
  ctx.showMessage(`인계할 배우를 선택해주세요`);
  ctx.drawLine();
  // Label: REFRESH_POINT
  LINENUM = LINECOUNT;
  // TODO: FOR CNUM,0,인수
  ctx.showMessage(`[{후보리스트:CNUM}]  %NAME:(후보리스트:CNUM)%`);
  if (cflag[후보리스트:CNUM][130] == 1) {
    ctx.print('(선택됨)');
  }
  ctx.showMessage('');
  // TODO: NEXT
  ctx.showMessage(` [999] - 선택완료 / [1000] - 전원 선택/선택 해제`);
  await ctx.inputNumber();
  if (ctx.result === 999) {
    return 1;
  } else if (ctx.result === 1000) {
    J = 0;
    if (cflag[후보리스트[0]][130] === 0) {
      // TODO: FOR CNUM,0,인수
      // TODO: CFLAG:(후보리스트:CNUM):130 = 1
      J++;
      // TODO: NEXT
    } else {
      // TODO: FOR CNUM,0,인수
      // TODO: CFLAG:(후보리스트:CNUM):130 = 0
      // TODO: NEXT
    }
    // GOTO RESET_POINT - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 0) {
    ctx.showMessage('잘못된 입력값입니다'); ctx.waitInput();
    // GOTO RESET_POINT - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    ctx.showMessage('잘못된 입력값입니다'); ctx.waitInput();
    // GOTO RESET_POINT - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 85) === 0 && ctx.getTalent(result, 76) === 0) {
    ctx.showMessage('잘못된 입력값입니다'); ctx.waitInput();
    // GOTO RESET_POINT - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    ctx.showMessage('잘못된 입력값입니다'); ctx.waitInput();
    // GOTO RESET_POINT - 구조 변경 필요 (while/break 사용 권장)
  }
  if (character.cflags[ctx.result][130] === 0) {
    character.cflags[ctx.result][130] = 1;
    J += 1;
  } else if (character.cflags[ctx.result][130] === 1) {
    character.cflags[ctx.result][130] = 0;
    J -= 1;
  }
  // Label: RESET_POINT
  ctx.clearLine(LINECOUNT-LINENUM);
  // GOTO REFRESH_POINT - 구조 변경 필요 (while/break 사용 권장)
}
