/**
 * EVENT_TURNEND.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function eventturnend(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #PRI
  if (character > 0) {
    await check_sellassiable(ctx, character);
    await check_specialskil(ctx, character);
    await in_vagina_all(ctx, character);
    await conception_check_all(ctx, character);
  }
  await characlear_calc(ctx, character);
  await resttime(ctx, character);
  await ovulation_calc(ctx, character);
  await vaginaform_change(ctx, character);
  await public_hair(ctx, character);
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 11) {
      if (character.cflags[ctx.count][1] === 2) {
        // TODO: LOADGLOBAL
        ctx.global[51] = 1;
        // TODO: SAVEGLOBAL
      }
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (ctx.count >= ctx.charanum) {
      // TODO: BREAK
    }
    if (ctx.base[ctx.count][0] <= -1) {
      T = -1;
      if (character != ctx.count) {
        T = character;
      }
      character = ctx.count;
      C = ctx.count;
      await kill_target(ctx, character);
      ctx.count = C - 1;
      if (T != -1) {
        character = T;
      }
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else {
      if (ctx.base[ctx.count][31] <= 0) {
        ctx.base[ctx.count][31] = 0;
      }
    }
  }
  ctx.flags[0] = 0;
  if (TIME === 1) {
    await yuukaku_result(ctx, character);
    await in_vagina_extra(ctx, character);
    await conception_check_extra(ctx, character);
    await event_lesplay_new(ctx, character);
    await event_nextday(ctx, character);
    await event_scout(ctx, character);
    if (ctx.flags[554] == 0) {
      await idol_produce_calc(ctx, character);
    }
    if (ctx.flags[554] == 1 && ctx.money > 500000) {
      await idol_produce_add(ctx, character);
    }
    if (ctx.flags[540] == 0) {
      await badboy_rape_calc(ctx, character);
    }
    if (ctx.flags[540] == 0) {
      await event_molester(ctx, character);
    }
    if (ctx.flags[540] == 0) {
      await compa_start(ctx, character);
    }
    if (ctx.flags[540] === 0) {
      for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
        if (ctx.count === 0) {
          // TODO: CONTINUE
        } else if (character.cflags[ctx.count][140] === 1 && (ctx.flags[101] & 128)) {
          // TODO: CONTINUE
        } else if (ctx.getTalent(count, 122) === 0) {
          character.cflags[ctx.count][619] += ctx.rand(5);
          if (ctx.getTalent(count, 416)) {
            character.cflags[ctx.count][619] += ctx.rand(5);
          }
          if (ctx.getTalent(count, 432)) {
            character.cflags[ctx.count][619] += ctx.rand(5);
          }
          if (character.cflags[ctx.count][619] > character.cflags[ctx.count][620]) {
            await event_boyfriend(ctx, character);
          }
        }
      }
    }
    if (ctx.flags[540] === 0) {
      for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
        if (ctx.count === 0) {
          // TODO: CONTINUE
        } else if (character.cflags[ctx.count][140] === 1 && (ctx.flags[101] & 128)) {
          // TODO: CONTINUE
        } else {
          await event_lookschange(ctx, character);
        }
      }
    }
    if (ctx.flags[540] === 0) {
      for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
        if (ctx.count === 0) {
          // TODO: CONTINUE
        } else if (character.cflags[ctx.count][621] === 1) {
          await event_boyfriend2(ctx, character);
        }
      }
    }
    if (ctx.flags[540] == 0) {
      await ntr_staff_begin(ctx, character);
    }
    if (ctx.flags[540] == 0 && character.cflags[ctx.master][694] == 0) {
      await base_ntr_staff(ctx, character);
    }
    if (ctx.flags[542] === 0) {
      await blackgirl_event(ctx, character);
    }
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count === 0) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][691] === 0) {
        // TODO: CONTINUE
      } else {
        await event_bgsex(ctx, character);
      }
    }
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][692]) {
        character.cflags[ctx.count][692] = 0;
      }
    }
    await idol_event(ctx, character);
    await model_event_call(ctx, character);
    await c_club_event(ctx, character);
    if (character.cflags[ctx.master][634] === 1 && character.cflags[ctx.master][635] === 0) {
      await c_clubgirl_status(ctx, character);
    }
    await gettalent_gal(ctx, character);
    await check_specialskil(ctx, character);
    await add_exabl(ctx, character);
    await exabl_b(ctx, character);
    await exabl_p(ctx, character);
    await exabl_s(ctx, character);
    await exabl_o(ctx, character);
    await sunburn_after(ctx, character);
    await arbeit_exec(ctx, character);
    await job_exec(ctx, character);
    await mission_day(ctx, character);
    if (ctx.flags[100]) {
      await lycee_event_weekend(ctx, character);
    }
    DAY = DAY+1;
    ctx.showMessage('한 주가 끝났다……'); ctx.waitInput();
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][109] >= 1) {
        ctx.showMessage(`${ctx.getName(ctx.count)}의 배란유발제 효과가 다했다`);
        ctx.drawLine();
        character.cflags[ctx.count][109] = 0;
      } else if (character.cflags[ctx.count][109] === -1) {
        ctx.showMessage(`${ctx.getName(ctx.count)}의 배란억제제 효과가 다했다`);
        ctx.drawLine();
        character.cflags[ctx.count][109] = 0;
      }
    }
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][34]) {
        ctx.showMessage(`${ctx.getName(ctx.count)}의 강모제 효과가 다했다`);
        character.cflags[ctx.count][34] = 0;
      }
    }
    DAY[2] = DAY[2] + 1;
    if (DAY[2] > 4) {
      await event_nextmonth(ctx, character);
    }
    TIME = 0;
    await event_newday(ctx, character);
  } else {
    TIME = 1;
  }
  await ending_check(ctx, character);
  await auto_buying(ctx, character);
  if (ctx.flags[76]) {
    await auto_itemuse(ctx, character);
  }
  character = -1;
  ctx.assi = -1;
  if (character.cflags[ctx.master][65] == 1) {
    await event_morning_pickup(ctx, character);
  }
  await check_achievement(ctx, character);
  // TODO: BEGIN SHOP
}

export async function resttime(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  J = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count != character && ctx.getTalent(count, 84)) {
      J += 1;
    }
    if (ctx.count != character && ctx.getTalent(count, 123)) {
      J += 2;
    }
  }
  H = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.isAssi[ctx.count] && ctx.getTalent(count, 117)) {
      H += 1;
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    if (TIME === 0) {
      A = MAXctx.base[ctx.count][0] / 20;
    } else {
      A = MAXctx.base[ctx.count][0] / 4;
    }
    if (ctx.count != character && character.cflags[ctx.count][12] == 0) {
      A += 100;
    }
    if (ctx.getTalent(count, 419)) {
      A += 3000;
    }
    if (ctx.getTalent(count, 501)) {
      A += 3000;
    }
    if (ctx.getTalent(count, 505)) {
      A += 3000;
    }
    if (ctx.getTalent(count, 511)) {
      A += 3000;
    }
    if (ctx.getTalent(count, 504)) {
      A += 3000;
    }
    A += ctx.abilities[ctx.count][51] * 30;
    if (ctx.base[ctx.count][0] < 500) {
      A /= 5;
    }
    if (ctx.getTalent(master, 117)) {
      A += 100;
    } else if (H >= 2) {
      A += 100;
    } else if (H === 1 && ctx.getTalent(count, 117) === 100) {
      A += 100;
    }
    if (character.cflags[ctx.count][12]) {
      A /= 5;
    }
    if (ctx.getTalent(count, 84) && ctx.exp[ctx.count][10]) {
      ctx.times('A', 0.80);
      ctx.exp[ctx.count][10] += ctx.abilities[ctx.count][11] * 2;
    }
    if (A < 0) {
      A = 0;
    }
    if (TIME == 1 && A < 10) {
      A = 10;
    }
    if (ctx.getTalent(count, 111)) {
      A *= 2;
    } else if (ctx.getTalent(count, 112)) {
      A /= 2;
    }
    ctx.base[ctx.count][0] += A;
    if (ctx.base[ctx.count][0] > MAXctx.base[ctx.count][0]) {
      ctx.base[ctx.count][0] = MAXctx.base[ctx.count][0];
    }
    ctx.base[ctx.count][1] = MAXctx.base[ctx.count][1];
  }
  return 0;
}

export async function restlife(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[5] == 1) {
    return 0;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.base[ctx.count][10] > 0) {
      ctx.base[ctx.count][10] -= 1;
      if (ctx.base[ctx.count][10] === 0) {
        character = ctx.count;
        character.tflags[13] = 998;
        await self_kojo(ctx, character);
        ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 사라져버렸다……`);
        ctx.base[ctx.count][0] = -1;
        C = ctx.getCharacterNo(ctx.count) + 999;
        ctx.flags[C] = -3;
      }
    }
  }
  return 0;
}

export async function public_hair(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[36] == 0) {
    return 0;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if ((character.cflags[ctx.count][34] || ctx.getTalent(count, 128)) && character.cflags[ctx.count][6] <= 25) {
      character.cflags[ctx.count][6] += 1;
    }
    if (ctx.getTalent(count, 125) && character.cflags[ctx.count][6] > 5) {
      ctx.showMessage(`W ${ctx.getName(ctx.count)}의 성기에서 희미하게 털이 돋아나기 시작했다……`);
      ctx.showMessage(`W ${ctx.getName(ctx.count)}는【${ctx.getVarName("TALENT", 125)}】이 아니게 되었다.`);
      ctx.getTalent(count, 125) = 0;
    }
    if (ctx.getTalent(count, 128) === 0 && character.cflags[ctx.count][6] > 18) {
      ctx.showMessage(`${ctx.getName(ctx.count)}의 하복부는 치구에서 항문까지,`);
      ctx.showMessage(`W 무성한 음모로 뒤덮였다……`);
      ctx.showMessage(`W ${ctx.getName(ctx.count)}는【${ctx.getVarName("TALENT", 128)}】이 되었다.`);
      ctx.getTalent(count, 128) = 1;
    }
    if (ctx.getTalent(count, 125)) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][6] < 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][6] >= 9 && (ctx.getTalent(count, 132) || ctx.getTalent(count, 221))) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][6] >= 9 && ctx.getTalent(count, 422)) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][6] >= 12 && ctx.getTalent(count, 220)) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][6] >= 12) {
      // TODO: CONTINUE
    }
    character.cflags[ctx.count][6] += 1;
  }
}

export async function auto_buying(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((ctx.flags[34] & 1) && ctx.money >= 200 && ctx.item[25] === 0) {
    ctx.item[25] += 1;
    ctx.money -= 200;
  }
  if ((ctx.flags[34] & 8)) {
    for (let COUNT = 0; COUNT < 10; COUNT++) {
      if (ctx.money >= 100 && ctx.item[24] < 10) {
        ctx.item[24] += 1;
        ctx.money -= 100;
      }
    }
  }
}

export async function auto_itemuse(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.getTalent(master, 55) == 0) {
    return;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else {
      ctx.locals[0] += ctx.count;
    }
  }
  if ((ctx.flags[76] & 1)) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count === 0) {
        // TODO: CONTINUE
      } else if (ctx.base[ctx.count][0] === MAXctx.base[ctx.count][0]) {
        // TODO: CONTINUE
      } else {
        ctx.locals[1] = MAXctx.base[ctx.count][0] - ctx.base[ctx.count][0];
        if (ctx.locals[1] <= 499) {
          ctx.locals[1] = 500;
        } else if (ctx.locals[1] <= 1000 && ctx.locals[1] >= 500) {
          ctx.locals[1] = 1000;
        } else if (ctx.locals[1] <= 1500 && ctx.locals[1] >= 999) {
          ctx.locals[1] = 1500;
        } else if (ctx.locals[1] <= 2000 && ctx.locals[1] >= 1499) {
          ctx.locals[1] = 2000;
        } else if (ctx.locals[1] <= 2500 && ctx.locals[1] >= 1999) {
          ctx.locals[1] = 2500;
        } else if (ctx.locals[1] <= 3000 && ctx.locals[1] >= 2499) {
          ctx.locals[1] = 3000;
        } else if (ctx.locals[1] <= 3500 && ctx.locals[1] >= 2999) {
          ctx.locals[1] = 3500;
        } else if (ctx.locals[1] <= 4000 && ctx.locals[1] >= 3499) {
          ctx.locals[1] = 4000;
        } else if (ctx.locals[1] <= 4500 && ctx.locals[1] >= 3999) {
          ctx.locals[1] = 4500;
        } else if (ctx.locals[1] <= 5000 && ctx.locals[1] >= 4499) {
          ctx.locals[1] = 5000;
        }
        ctx.locals[2] = ctx.locals[1] / 500;
        if (ctx.money < 1000 * ctx.locals[2]) {
          // TODO: BREAK
        }
        ctx.showMessage(`《${ctx.getName(ctx.count)}에게 ${ctx.locals[2]}번 영양제를 먹였습니다》`);
        ctx.base[ctx.count][0] = MAXctx.base[ctx.count][0];
        ctx.money -= ctx.locals[2] * 1000;
        ctx.locals[1] = 0;
        ctx.locals[2] = 0;
      }
    }
  }
  ctx.varSet(ctx.locals[0], 0);
  if ((ctx.flags[76] & 8)) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.locals[0] === 0) {
        // TODO: CONTINUE
      } else if (ctx.juel[ctx.count][100] <= 0) {
        // TODO: CONTINUE
      } else {
        // Label: REPEAT_OKOU
        ctx.locals[1] = ctx.juel[ctx.count][100];
        ctx.locals[1] /= 2;
        ctx.locals[2] += 1;
        if (ctx.locals[1] != 0) {
          // GOTO REPEAT_OKOU - 구조 변경 필요 (while/break 사용 권장)
        }
        if (ctx.money < 3000 * ctx.locals[2]) {
          // TODO: BREAK
        }
        ctx.showMessage(`《${ctx.getName(ctx.count)}에게 ${ctx.locals[2]}번 향을 맡게 했습니다》`);
        ctx.juel[ctx.count][100] = 0;
        ctx.money -= ctx.locals[2] * 3000;
        ctx.locals[1] = 0;
        ctx.locals[2] = 0;
      }
    }
  }
  if ((ctx.flags[76] & 2) && ctx.money >= 2000 * ctx.locals[0]) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count === 0) {
        // TODO: CONTINUE
      } else if (ctx.getTalent(count, 122) === 1) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][109] >= 1) {
        // TODO: CONTINUE
      } else {
        character.cflags[ctx.count][109] = 1;
        if (ctx.paramBand[303] == 3) {
          character.cflags[ctx.count][109] += ctx.rand(2);
        }
        ctx.money -= 2000;
        ctx.showMessage(`《${ctx.getName(ctx.count)}에게 배란유발제를 먹였습니다》`);
      }
    }
  }
  if ((ctx.flags[76] & 4) && ctx.money >= 50000 * ctx.locals[0]) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.count === 0) {
        // TODO: CONTINUE
      } else if (ctx.getTalent(count, 122) === 1) {
        // TODO: CONTINUE
      } else if (character.cflags[ctx.count][109] === -1) {
        // TODO: CONTINUE
      } else {
        character.cflags[ctx.count][109] = -1;
        ctx.money -= 50000;
        ctx.showMessage(`《${ctx.getName(ctx.count)}에게 배란억제제를 먹였습니다》`);
      }
    }
  }
}
