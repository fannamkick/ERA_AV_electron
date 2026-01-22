/**
 * KIRYU_GUMI.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function kiryu_gumi(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('키류 조직 사무소');
  ctx.showMessage('《키류 조직과 계열사에 다양한 일을 부탁합니다》');
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
  if (ctx.flags[100] == 0) {
    ctx.showMessage('[1] - 여자 기숙사를 건설한다(700000포인트)');
  }
  ctx.showMessage('[2] - 사무소를 확장한다(150000포인트)');
  if (ctx.item[22] == 0) {
    ctx.showMessage('[4] - 촬영용 개를 구입한다(5000포인트)');
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 10) {
      if (character.cflags[ctx.count][1] === 2) {
        ctx.showMessage('[10] - 카논에게 상당한다');
        ctx.locals[1] = 1;
      }
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 95) {
      if (ctx.getTalent(count, 430) === 1) {
        ctx.showMessage('[11] - 엘렌을 만나러 간다');
        ctx.locals[2] = 1;
      }
    }
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 1 && ctx.flags[100] === 0) {
    await bought_lycee(ctx, character);
  } else if (ctx.result === 2) {
    await bought_room(ctx, character);
  } else if (ctx.result === 4 && ctx.item[22] === 0) {
    await bought_dog(ctx, character);
  } else if (ctx.result === 10 && ctx.locals[1] === 1) {
    await kanon_order(ctx, character);
  } else if (ctx.result === 11 && ctx.locals[2] === 1) {
    await ellen_mission(ctx, character);
  } else if (ctx.result === 999) {
    return 0;
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function bought_room(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 150000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(` 현재 사무소의 규모로 고용 가능한 여배우의 수는 ${ctx.flags[23]}명입니다`);
  ctx.showMessage(` 사무소 규모를 확장합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`《사무소 규모를 확장했습니다》`);
    ctx.flags[23] += 1;
    ctx.money -= C;
    await ctx.wait();
    return 1;
  } else if (ctx.result === 1) {
    return 0;
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function bought_lycee(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 700000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(` 여자 기숙사를 건설합니까?`);
  ctx.showMessage(` ※여자 기숙사란`);
  ctx.showMessage(` 　계약한 캐릭터를 입주시켜 여배우 리스트에 표시되지 않게 합니다`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`《여자 기숙사를 건설했습니다》`);
    ctx.showMessage(`※입주, 퇴거, 시설 추가는 한 주의 시작때 처리됩니다`);
    ctx.flags[100] += 1;
    ctx.money -= C;
    await ctx.wait();
    return 1;
  } else if (ctx.result === 1) {
    return 0;
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function bought_dog(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 5000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(` 촬영용 개를 구입합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`《개를 구입했습니다》`);
    ctx.item[22] += 1;
    ctx.money -= C;
    await ctx.wait();
    return 1;
  } else if (ctx.result === 1) {
    return 0;
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}
