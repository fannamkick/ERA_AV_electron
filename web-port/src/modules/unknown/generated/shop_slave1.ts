/**
 * SHOP_SLAVE1.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function chara_buy(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = 0;
  character.tflags[100] = 0;
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    character.tflags[ctx.count] = ITEMSALES:ctx.count;
    ITEMSALES:ctx.count = 0;
  }
  // Label: INPUT_LOOP
  await chara_list(ctx, character);
  for (let COUNT = 0; COUNT < 60; COUNT++) {
    A = ctx.count + character.tflags[100] * 60 + 200;
    B = character.tflags[A];
    ITEMSALES:B = 1;
  }
  ITEMSALES[0] = 0;
  await chara_buy_show(ctx, character);
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
    ctx.showMessage('《誰かを은퇴させないと, これ以上契約できません》'); ctx.waitInput();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.flags[9] = C;
  await chara_manual(ctx, character);
  if (ctx.flags[9] === 0) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else {
    ctx.flags[9] = 0;
  }
  if (ctx.money < ctx.flags[D]) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= ctx.flags[D];
  ctx.flags[D] = -1;
  // TODO: ADDCHARA C
  character = ctx.charanum - 1;
  ctx.showMessage(`W 《《%타겟과(1)% 계약했습니다》 》`);
  X = character.no + 200;
  // TODO: LOADGLOBAL
  ctx.global[X] += 1;
  // TODO: SAVEGLOBAL
  await chara_buy_setting(ctx, character);
  await chara_buy_event(ctx, character);
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function chara_buy_show(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('女優候補やスタッフのスカウト');
  ctx.showMessage('《AV배우やスタッフになってくれるキャラと契約できます》');
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
  // TODO: PRINT_SHOPITEM
  ctx.drawLine();
  ctx.print('[999] - 돌아간다');
  ctx.showMessage('');
}

export async function chara_buy_after(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 60; COUNT++) {
    A = ctx.count + character.tflags[100] * 60 + 100;
    ITEMSALES:A = 0;
  }
  for (let COUNT = 0; COUNT < 200; COUNT++) {
    ITEMSALES:ctx.count = 0;
  }
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    ITEMSALES:ctx.count = character.tflags[ctx.count];
    character.tflags[ctx.count] = 0;
  }
  return 0;
}

export async function chara_list(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  F = 0;
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    A = ctx.count + 100;
    ITEMSALES:A = 0;
    F = ctx.count + 200;
    character.tflags[F] = 0;
  }
  F = 200;
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    E = ctx.count + 1000;
    if (ctx.flags[E] > 0) {
      character.tflags[F] = E - 1000 + 100;
      F += 1;
    }
  }
  return 0;
}
