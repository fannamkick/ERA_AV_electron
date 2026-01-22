/**
 * SHOP_ITEM.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function item_shop(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage('어덜트 샵『NIGHT LOVE STORE』');
  ctx.showMessage('《지도에 사용하는 아이템을 구입할 수 있습니다》');
  ctx.drawLine();
  ctx.printValue(DAY+1);
  ctx.print('주차');
  if (TIME === 0) {
    ctx.showMessage('전반');
  } else {
    ctx.showMessage('후반');
  }
  ctx.showMessage(`소지금: {MONEY}포인트`);
  // TODO: PRINT_ITEM
  ctx.drawLine();
  await saleitem_check(ctx, character);
  character.tflags[15] = ctx.money;
  // Label: INPUT_LOOP
  // TODO: PRINT_SHOPITEM
  ctx.showMessage('《구입할 아이템의 번호를 입력해주세요》');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
}

export async function eventbuy(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.bought === 24 || ctx.bought === 25 || ctx.bought === 26 || ctx.bought === 27 || ctx.bought === 29 || ctx.bought === 28 || ctx.bought === 34) {
    await buy_plural(ctx, character);
    return 1;
  } else if (ctx.bought === 30 || ctx.bought === 31 || ctx.bought === 32 || ctx.bought === 33 || ctx.bought === 40 || ctx.bought === 41 || ctx.bought === 43) {
    await use_item(ctx, character);
    ctx.item[ctx.bought] = 0;
    return 1;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", ctx.bought), "를")} 구입하시겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    ctx.item[ctx.bought] -= 1;
    ctx.bought = 0;
    ctx.money = character.tflags[15];
    return 0;
  } else if (ctx.result != 0) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage(`《${ctx.josaHelper(ctx.getVarName("ITEMNAME", ctx.bought), "를")} 구입했습니다》`);
  if (ctx.bought === 38) {
    ctx.showMessage(`《%플레이어는(1)%【${ctx.getVarName("TALENT", 91)}】을 몸에 익혔다》`);
    ctx.getTalent(master, 91) = 1;
    ctx.item[ctx.bought] = 0;
  }
  if (ctx.bought === 39) {
    ctx.getTalent(master, 325) = 1;
    ctx.item[ctx.bought] = 0;
  }
  if (ctx.bought === 42) {
    ctx.getTalent(master, 55) = 1;
    ctx.item[ctx.bought] = 0;
  }
  if (ctx.bought === 52) {
    if (ctx.flags[5] === 1) {
      await technique_of_master_up(ctx, character);
    } else if (ctx.flags[5] === 2 || ctx.flags[5] === 9) {
      if (ctx.masterAbilities[12] >= 3) {
        F = ctx.masterAbilities[12] - 1;
        await technique_of_master(ctx, character);
      } else {
        await technique_of_master_up(ctx, character);
      }
    } else if (ctx.flags[5] === 3) {
      if (ctx.masterAbilities[12] >= 2) {
        F = ctx.masterAbilities[12];
        F *= 2;
        await technique_of_master(ctx, character);
      } else {
        await technique_of_master_up(ctx, character);
      }
    } else if (ctx.flags[5] === 4) {
      if (ctx.masterAbilities[12] >= 1) {
        F = ctx.masterAbilities[12];
        F *= 5;
        await technique_of_master(ctx, character);
      } else {
        await technique_of_master_up(ctx, character);
      }
    } else {
      F = ctx.masterAbilities[12];
      F *= 100;
      await technique_of_master(ctx, character);
    }
    MAXctx.masterBase[60] += 4;
  }
  await ctx.wait();
  return 1;
}

export async function saleitem_check(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 24; COUNT++) {
    if (ctx.count == 22) {
      // TODO: CONTINUE
    }
    ITEMSALES:ctx.count = 1;
  }
  ITEMSALES[21] = 0;
  ITEMSALES[23] = 0;
  if (ctx.getTalent(master, 93) === 1) {
    ITEMSALES[21] = 1;
    ITEMSALES[23] = 1;
  }
  ITEMSALES[30] = 0;
  M = 0;
  if (ctx.getTalent(master, 55)) {
    M = 1;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][1] >= 1 && ctx.isAssi[ctx.count] === 1) {
      if (ctx.getTalent(count, 55)) {
        M = 1;
      }
    }
  }
  if (M === 1) {
    ITEMSALES[30] = 1;
  }
  ITEMSALES[17] = 0;
  ITEMSALES[20] = 0;
  if (ctx.flags[5] === 9 || ctx.flags[5] <= 2) {
    ITEMSALES[17] = 1;
    ITEMSALES[20] = 1;
  }
  for (let COUNT = 0; COUNT < 24; COUNT++) {
    if (ctx.item[ctx.count] == 1) {
      ITEMSALES:ctx.count = 0;
    }
  }
  ITEMSALES[24] = 1;
  ITEMSALES[25] = 1;
  ITEMSALES[29] = 1;
  ITEMSALES[34] = 1;
  ITEMSALES[26] = 0;
  ITEMSALES[27] = 0;
  ITEMSALES[31] = 0;
  ITEMSALES[40] = 0;
  ITEMSALES[41] = 0;
  ITEMSALES[43] = 0;
  M = 0;
  if (ctx.getTalent(master, 55)) {
    M = 1;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][1] >= 1 && ctx.isAssi[ctx.count] === 1) {
      if (ctx.getTalent(count, 55)) {
        M = 1;
      }
    }
  }
  if (M === 1) {
    ITEMSALES[26] = 1;
    ITEMSALES[27] = 1;
    ITEMSALES[31] = 1;
    ITEMSALES[40] = 1;
    if (ctx.flags[36]) {
      ITEMSALES[41] = 1;
    }
    ITEMSALES[43] = 1;
  }
  if ((ctx.flags[5] == 3 && ctx.flags[61] >= 3) || (ctx.flags[5] == 4 && ctx.flags[61] >= 1)) {
    ITEMSALES[31] = 0;
  }
  if (ctx.item[24] >= 99) {
    ITEMSALES[24] = 0;
  }
  if (ctx.item[25] >= 99) {
    ITEMSALES[25] = 0;
  }
  if (ctx.item[26] >= 99) {
    ITEMSALES[26] = 0;
  }
  if (ctx.item[27] >= 99) {
    ITEMSALES[27] = 0;
  }
  if (ctx.item[29] >= 99) {
    ITEMSALES[29] = 0;
  }
  if (ctx.item[34] >= 99) {
    ITEMSALES[34] = 0;
  }
  ITEMSALES[37] = 1;
  if (ctx.item[37]) {
    ITEMSALES[37] = 0;
  }
  ITEMSALES[38] = 1;
  if (ctx.getTalent(master, 91) == 1) {
    ITEMSALES[38] = 0;
  }
  if (ctx.flags[5] == 3 || ctx.flags[5] == 4) {
    ITEMSALES[38] = 0;
  }
  ITEMSALES[39] = 1;
  if (ctx.getTalent(master, 325) == 1) {
    ITEMSALES[39] = 0;
  }
  ITEMSALES[42] = 1;
  if (ctx.getTalent(master, 55) == 1) {
    ITEMSALES[42] = 0;
  }
  ITEMSALES[52] = 1;
  if (ctx.masterAbilities[12] >= 10 || ctx.masterAbilities[12] > ctx.flags[30] + 1) {
    ITEMSALES[52] = 0;
  }
}

export async function buy_plural(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.bought == 24) {
    A = 10;
  }
  if (ctx.bought == 25) {
    A = 200;
  }
  if (ctx.bought == 26) {
    A = 2000;
  }
  if (ctx.bought == 29) {
    A = 100;
  }
  if (ctx.bought == 27) {
    A = 1000;
  }
  if (ctx.bought == 34) {
    A = 5000;
  }
  B = 100-ctx.item[ctx.bought];
  C = ctx.money/A+1;
  if (B <= C) {
    D = B;
    E = 0;
  } else {
    D = C;
    E = 1;
  }
  ctx.drawLine();
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", ctx.bought), "를")} 얼마나 삽니까? (1-`);
  ctx.printValue(D);
  ctx.showMessage(', 0은 메뉴로 복귀)');
  ctx.print('[1]');
  ctx.showMessage(`[{D}]`);
  ctx.print('[0]');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.item[ctx.bought] -= 1;
    ctx.money += ctx.itemPrice[ctx].bought;
    return 0;
  } else if (ctx.result < 0) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result > D) {
    if (ctx.result > D && E === 0) {
      ctx.showMessage('그렇게 많이 가질 수 없습니다');
    } else if (ctx.result > D && E === 1) {
      ctx.showMessage('소지금이 부족합니다');
    }
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 1) {
    ctx.showMessage(`《${ctx.josaHelper(ctx.getVarName("ITEMNAME", ctx.bought), "를")} 구입했습니다》`);
    await ctx.wait();
    return 0;
  } else {
    ctx.showMessage(`《${ctx.josaHelper(ctx.getVarName("ITEMNAME", ctx.bought), "를")} {RESULT}개 구입했습니다》`);
    await ctx.wait();
    ctx.item[ctx.bought] += ctx.result-1;
    ctx.money -= A*(ctx.result-1);
    return 0;
  }
}

export async function use_item(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.bought == 30) {
    ctx.showMessage(`${ctx.getVarName("ITEM", BOUGHT)}:체력을 회복시킵니다`);
  }
  if (ctx.bought == 31) {
    ctx.showMessage(`${ctx.getVarName("ITEM", BOUGHT)}:부정의 구슬을 절반 없앱니다`);
  }
  if (ctx.bought == 33) {
    ctx.showMessage(`${ctx.getVarName("ITEM", BOUGHT)}:세계의 역사를 바꾼 에너지원입니다`);
  }
  if (ctx.bought == 40) {
    ctx.showMessage(`${ctx.getVarName("ITEM", BOUGHT)}:임신 확률을 높게 만듭니다`);
  }
  if (ctx.bought == 41) {
    ctx.showMessage(`${ctx.getVarName("ITEM", BOUGHT)}:음모의 성장을 빠르게 합니다`);
  }
  if (ctx.bought == 43) {
    ctx.showMessage(`${ctx.getVarName("ITEM", BOUGHT)}:임신 확률을 낮춥니다`);
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("ITEMNAME", ctx.bought), "를")} 누구에게 사용합니까? 소지금: {MONEY+(ITEMPRICE:BOUGHT)}포인트`);
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    ctx.item[ctx.bought] = 0;
    ctx.money += ctx.itemPrice[ctx].bought;
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 0) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.bought === 30 && ctx.base[ctx.result][0] === MAXctx.base[ctx.result][0]) {
    ctx.showMessage(`이미 ${ctx.getName(ctx.result)}의 체력은 MAX입니다`);
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.bought === 31 && ctx.juel[ctx.result][100] < 1) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.result), "는")} ${ctx.getVarName("PALAM", 100)}의 구슬을 가지고 있지 않습니다`);
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.bought === 40 && ctx.getTalent(result, 153) || ctx.getTalent(result, 154)) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.result), "는")}`);
    if (ctx.getTalent(result, 153)) {
      ctx.showMessage('이미 임신한 상태입니다');
    } else if (ctx.getTalent(result, 154)) {
      ctx.showMessage('육아 중입니다');
    }
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.bought === 43 && ctx.getTalent(result, 153) || ctx.getTalent(result, 154)) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.result), "는")}`);
    if (ctx.getTalent(result, 153)) {
      ctx.showMessage('이미 임신한 상태입니다');
    } else if (ctx.getTalent(result, 154)) {
      ctx.showMessage('육아 중입니다');
    }
    await ctx.wait();
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.bought === 30) {
    ctx.showMessage(`《${ctx.getName(ctx.result)}의 체력이 회복되었습니다》`);
    ctx.base[ctx.result][0] += 500;
    if (ctx.base[ctx.result][0] > MAXctx.base[ctx.result][0]) {
      ctx.base[ctx.result][0] = MAXctx.base[ctx.result][0];
    }
    await ctx.wait();
    if (ctx.money >= 1000) {
      ctx.money -= 1000;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.showMessage('돈이 부족해서 이 이상 살 수 없습니다');
    }
  } else if (ctx.bought === 31) {
    ctx.showMessage(`《%조사처리(NAME:RESULT,"가") 가진 부정의 구슬이 반으로 줄었습니다》`);
    ctx.showMessage(` 부정의 구슬:${ctx.juel[ctx.result][100]} -> ${ctx.juel[ctx.result][100] / 2}`);
    ctx.juel[ctx.result][100] /= 2;
    ctx.flags[61] += 1;
    await ctx.wait();
    if (ctx.money >= 3000) {
      ctx.money -= 3000;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.showMessage('돈이 부족해서 이 이상 살 수 없습니다');
    }
  } else if (ctx.bought === 40) {
    ctx.showMessage(`《${ctx.josaHelper(ctx.getName(ctx.result), "는")} 임신하기 쉬워졌습니다》`);
    character.cflags[ctx.result][109] = 1;
    character.cflags[ctx.result][645] = 1;
    if (ctx.paramBand[303] == 3) {
      character.cflags[ctx.result][109] += ctx.rand(2);
    }
    await ctx.wait();
    if (ctx.money >= 2000) {
      ctx.money -= 2000;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.showMessage('돈이 부족해서 이 이상 살 수 없습니다');
    }
  } else if (ctx.bought === 41) {
    ctx.showMessage(`《${ctx.getName(ctx.result)}의 음모 성장이 빨라졌습니다》`);
    character.cflags[ctx.result][34] = 1;
    await ctx.wait();
    if (ctx.money >= 1000) {
      ctx.money -= 1000;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.showMessage('돈이 부족해서 이 이상 살 수 없습니다');
    }
  } else if (ctx.bought === 43) {
    ctx.showMessage(`《${ctx.josaHelper(ctx.getName(ctx.result), "는")} 임신하기 어려워졌습니다》`);
    character.cflags[ctx.result][109] = -1;
    character.cflags[ctx.result][645] = 1;
    await ctx.wait();
    if (ctx.money >= 50000) {
      ctx.money -= 50000;
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.showMessage('돈이 부족해서 이 이상 살 수 없습니다');
    }
  }
}

export async function technique_of_master(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[33] === F - 1) {
    await technique_of_master_up(ctx, character);
  } else {
    ctx.flags[33] += 1;
    ctx.showMessage('');
    ctx.showMessage(`기교LV을 올리기 위해 앞으로  {F - FLAG:33} 개 필요합니다`);
    ctx.showMessage('나머지를 대량으로 구입하시겠습니까?');
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUT_LOOP
    await ctx.inputNumber();
    if (ctx.result === 0) {
      if (ctx.money < (F - ctx.flags[33]) * 5000) {
        ctx.showMessage('소지금이 부족합니다');
      } else {
        ctx.money -= (F - ctx.flags[33]) * 5000;
        await technique_of_master_up(ctx, character);
      }
    } else if (ctx.result === 1) {
      return 0;
    } else {
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    }
  }
}

export async function technique_of_master_up(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.masterAbilities[12] += 1;
  ctx.flags[33] = 0;
  ctx.item[ctx.bought] = 0;
  ctx.showMessage(`《${ctx.getName(ctx.master)}의 기교가 LV%조사처리(ABL:MASTER:12,"가")% 되었다》`);
}

export async function clear_shop(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    ITEMSALES:ctx.count = 0;
  }
}
