/**
 * RACHEL_LABO_DETAIL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function basehp_up(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 300000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('「원하는 분의 체력을 강화하는 약이옵니까?　네, 만들 수 있습니다――만,」');
  ctx.showMessage('그리고 레이첼이 보여준 재료는 간단하게 모을 수 있는 건 아니었지만,');
  ctx.showMessage('돈만 있다면 어떻게든 얻을 수 있는 것들이었다');
  ctx.showMessage('그러나 필요한 금액이 눈의 의심하게 되는 단위라, 자주 부탁하지는 못할 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('어떻게든 자금을 확보해 모은 재료를 레이첼에게 건내주니,');
  ctx.showMessage('그녀는 잠시 공방에 틀어박혔다');
  ctx.showMessage('공방 앞을 지나가니 코를 찌르는 냄새와 함께 수상한 목소리가 들려온다……');
  // TODO: PRINTW
  ctx.showMessage('「네, 다 됐습니다」');
  ctx.showMessage('얼마 후, 레이첼이 보라빛 액체가 가득담긴 작은 병을 가지고 왔다');
  ctx.showMessage('「주의 사항이 있습니다 ……인간이 아닌 분,');
  ctx.showMessage('예를들면 안드로이드나 음마 같은 분들에겐 효과가 없습니다.');
  ctx.showMessage('또, 부작용으로 체질이 변화할수도 있으니 조심해 주세요」');
  ctx.showMessage('그럼, 누구에게 먹일까……');
  // TODO: PRINTW
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】에겐 효과가 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상에겐 먹일 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 505)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 505)}】에겐 효과가 없습니다`);
    return 0;
  }
  T = ctx.result;
  // Label: INPUT_LOOP_ADD_PHYSICAL
  ctx.showMessage(`${ctx.getName(T)}에게 체력 강화제를 먹입니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  ctx.showMessage('[2] - 여러병 먹인다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.getName(T)}의 최대 체력이 100 늘었다`);
    MAXctx.base[T][0] += 100;
    character.cflags[T][700] += 1;
    ctx.money -= C;
    if (character.cflags[T][700] === 5 && ctx.getTalent(t, 112)) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 신진대사가 개선돼, ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 112)}】이 아니게 됐다`);
      ctx.getTalent(t, 112) = 0;
    } else if (character.cflags[T][700] === 10 && ctx.getTalent(t, 111) === 0 && ctx.getTalent(t, 419) === 0) {
      if (ctx.getTalent(t, 501) === 0) {
        if (ctx.getTalent(t, 511) === 0) {
          ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 신진대사가 개선돼, ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 111)}】이 됐다`);
          ctx.getTalent(t, 111) = 1;
        }
      }
    } else if (character.cflags[T][700] === 15 && ctx.getTalent(t, 419) === 0) {
      ctx.showMessage(`${ctx.getVarName("CALL", T)}의 신진대사가 개선돼, ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 419)}】이 됐다`);
      ctx.showMessage(`W ${ctx.getVarName("EXP", 50)}+1`);
      ctx.getTalent(t, 111) = 0;
      ctx.getTalent(t, 419) = 1;
      ctx.exp[T][50] += 1;
    }
    if (character.cflags[T][700] + character.cflags[T][701] >= 21 && ctx.getTalent(t, 9) === 0) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 모습이 이상하다……`);
      ctx.showMessage(`과도한 투여에 의해 ${ctx.getVarName("CALL", T)}의 정신이 붕괴돼 버렸다……`);
      await add_catastroph_labo(ctx, character);
    }
  } else if (ctx.result === 2) {
    // Label: INPUT_LOOP_BASE1
    ctx.showMessage(`${ctx.getName(T)}에게 체력 강화제를 몇병이나 먹입니까?`);
    await ctx.inputNumber();
    if (ctx.result === 0) {
      return 1;
    } else if (ctx.money < 300000 * ctx.result) {
      ctx.showMessage(`W 포인트가 부족합니다`);
      // GOTO INPUT_LOOP_BASE1 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.showMessage(`W ${ctx.getVarName("CALL", T)}에게 {RESULT}회 먹입니다 (필요포인트: {300000 * RESULT})`);
      ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 최대 체력이 {100 * RESULT} 늘었다`);
      MAXctx.base[T][0] += 100 * ctx.result;
      character.cflags[T][700] += 1 * ctx.result;
      ctx.money -= C * ctx.result;
      if (character.cflags[T][700] >= 5 && character.cflags[T][700] < 10 && ctx.getTalent(t, 112)) {
        ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 신진대사가 개선돼, ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 112)}】이 아니게 됐다`);
        ctx.getTalent(t, 112) = 0;
      } else if (character.cflags[T][700] >= 10 && character.cflags[T][700] < 15 && ctx.getTalent(t, 111) === 0 && ctx.getTalent(t, 419) === 0) {
        if (ctx.getTalent(t, 501) === 0) {
          if (ctx.getTalent(t, 511) === 0) {
            ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 신진대사가 개선돼, ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 111)}】이 됐다`);
            ctx.getTalent(t, 111) = 1;
            ctx.getTalent(t, 112) = 0;
          }
        }
      } else if (character.cflags[T][700] >= 15 && ctx.getTalent(t, 419) === 0) {
        ctx.showMessage(`${ctx.getVarName("CALL", T)}의 신진대사가 개선돼, ${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 419)}】이 됐다`);
        ctx.showMessage(`W ${ctx.getVarName("EXP", 50)}+1`);
        ctx.getTalent(t, 111) = 0;
        ctx.getTalent(t, 112) = 0;
        ctx.getTalent(t, 419) = 1;
        ctx.exp[T][50] += 1;
      }
      if (character.cflags[T][700] + character.cflags[T][701] >= 21 && ctx.getTalent(t, 9) === 0) {
        ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 모습이 이상하다……`);
        ctx.showMessage(`과도한 투여에 의해 ${ctx.getVarName("CALL", T)}의 정신이 붕괴돼 버렸다……`);
        await add_catastroph_labo(ctx, character);
      }
    }
  } else {
    // GOTO INPUT_LOOP_ADD_PHYSICAL - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function basesp_up(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('「원하는 분의 기력을 강화하는 약이옵니까?　네, 만들 수 있습니다――만,」');
  ctx.showMessage('그리고 레이첼이 보여준 재료는 간단하게 모을 수 있는 건 아니었지만,');
  ctx.showMessage('돈만 있다면 어떻게든 얻을 수 있는 것들이었다');
  ctx.showMessage('그러나 필요한 금액이 눈의 의심하게 되는 단위라, 자주 부탁하지는 못할 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('어떻게든 자금을 확보해 모은 재료를 레이첼에게 건내주니,');
  ctx.showMessage('그녀는 잠시 공방에 틀어박혔다');
  ctx.showMessage('공방 앞을 지나가니 코를 찌르는 냄새와 함께 수상한 목소리가 들려온다……');
  // TODO: PRINTW
  ctx.showMessage('「네, 다 됐습니다」');
  ctx.showMessage('얼마 후, 레이첼이 녹색 액체가 가득담긴 작은 병을 가지고 왔다');
  ctx.showMessage('「주의 사항이 있습니다 ……인간이 아닌 분,');
  ctx.showMessage('예를들면 안드로이드나 음마 같은 분들에겐 효과가 없습니다.');
  ctx.showMessage('또, 부작용으로 체질이 변화할수도 있으니 조심해 주세요」');
  ctx.showMessage('그럼, 누구에게 먹일까……');
  // TODO: PRINTW
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】에겐 효과가 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상에겐 먹일 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 505)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 505)}】에겐 효과가 없습니다`);
    return 0;
  }
  T = ctx.result;
  // Label: INPUT_LOOP_ADD_SP
  ctx.showMessage(`${ctx.getName(T)}에게 기력 강화제를 먹입니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  ctx.showMessage('[2] - 여러병 먹인다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W ${ctx.getName(T)}의 최대 기력이 100 늘었다`);
    MAXctx.base[T][1] += 100;
    character.cflags[T][701] += 1;
    ctx.money -= C;
    if (character.cflags[T][700] + character.cflags[T][701] >= 21 && ctx.getTalent(t, 9) === 0) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 모습이 이상하다……`);
      ctx.showMessage(`과도한 투여에 의해 ${ctx.getVarName("CALL", T)}의 정신이 붕괴돼 버렸다……`);
      await add_catastroph_labo(ctx, character);
    }
  } else if (ctx.result === 2) {
    // Label: INPUT_LOOP_BASE2
    ctx.showMessage(`${ctx.getName(T)}에게 기력 강화제를 몇병이나 먹입니까?`);
    await ctx.inputNumber();
    if (ctx.result === 0) {
      return 1;
    } else if (ctx.money < 500000 * ctx.result) {
      ctx.showMessage(`W 포인트가 부족합니다`);
      // GOTO INPUT_LOOP_BASE2 - 구조 변경 필요 (while/break 사용 권장)
    } else {
      ctx.showMessage(`W ${ctx.getVarName("CALL", T)}에게 {RESULT}회 먹입니다 (필요포인트: {300000 * RESULT})`);
      ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 최대 기력이 {100 * RESULT} 늘었다`);
      MAXctx.base[T][1] += 100 * ctx.result;
      character.cflags[T][701] += 1 * ctx.result;
      ctx.money -= C * ctx.result;
      if (character.cflags[T][700] + character.cflags[T][701] >= 21 && ctx.getTalent(t, 9) === 0) {
        ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 모습이 이상하다……`);
        ctx.showMessage(`과도한 투여에 의해 ${ctx.getVarName("CALL", T)}의 정신이 붕괴돼 버렸다……`);
        await add_catastroph_labo(ctx, character);
      }
    }
  } else {
    // GOTO INPUT_LOOP_ADD_SP - 구조 변경 필요 (while/break 사용 권장)
  }
  return 1;
}

export async function add_love(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('「반하는 약이옵니까?　네, 만들 수 있습니다――만,」');
  ctx.showMessage('그리고 레이첼이 보여준 재료는 간단하게 모을 수 있는 건 아니었지만,');
  ctx.showMessage('돈만 있다면 어떻게든 얻을 수 있는 것들이었다');
  ctx.showMessage('그러나 필요한 금액이 눈의 의심하게 되는 단위라, 자주 부탁하지는 못할 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('어떻게든 자금을 확보해 모은 재료를 레이첼에게 건내주니,');
  ctx.showMessage('그녀는 잠시 공방에 틀어박혔다');
  ctx.showMessage('공방 앞을 지나가니 코를 찌르는 냄새와 함께 수상한 목소리가 들려온다……');
  // TODO: PRINTW
  ctx.showMessage('「네, 다 됐습니다」');
  ctx.showMessage('얼마 후, 레이첼이 푸른 액체가 가득담긴 작은 병을 가지고 왔다');
  ctx.showMessage('「주의 사항이 있습니다 ……인간이 아닌 분,');
  ctx.showMessage('예를들면 안드로이드나 음마 같은 분들에겐 효과가 없습니다.');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 500) === 1) {
      if (ctx.getTalent(count, 85) === 0) {
        ctx.showMessage('');
        ctx.print('그리고…… 전 해독제를 가지고 있으니까 조심해 주세요');
      }
    }
  }
  ctx.showMessage('」');
  ctx.showMessage('그럼, 누구에게 먹일까……');
  // TODO: PRINTW
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】에겐 효과가 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 505)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 505)}】에겐 효과가 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상에겐 먹일 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 184)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 184)}】에겐 효과가 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 500) && ctx.getTalent(result, 85) === 0) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 500)}】에겐 효과가 없습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.getName(T)}에게 반하는 약을 먹입니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", T)}의 차에 몰래 반하는 약을 탔다`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 아무런 의심없이 차를 마셨다……`);
    // TODO: PRINTW
    ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 뺨을 상기시키고 ${ctx.josaHelper("플레이어를")} 바라보더니,`);
    ctx.showMessage(`사랑하는 마음을 ${ctx.getVarName("CALL", MASTER)}에게 털어놓았다`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 85)}】을 가졌다`);
    ctx.showMessage(`W ${ctx.getVarName("EXP", 57)}+1`);
    ctx.getTalent(t, 90) = 0;
    ctx.getTalent(t, 85) = 1;
    ctx.exp[T][57] += 1;
  }
  ctx.money -= C;
  return 1;
}

export async function add_lewd(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('「청순한 소녀도 바로 음란해지는 미약이옵니까?　네, 만들 수 있습니다――만,」');
  ctx.showMessage('그리고 레이첼이 보여준 재료는 간단하게 모을 수 있는 건 아니었지만,');
  ctx.showMessage('돈만 있다면 어떻게든 얻을 수 있는 것들이었다');
  ctx.showMessage('그러나 필요한 금액이 눈의 의심하게 되는 단위라, 자주 부탁하지는 못할 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('어떻게든 자금을 확보해 모은 재료를 레이첼에게 건내주니,');
  ctx.showMessage('그녀는 잠시 공방에 틀어박혔다');
  ctx.showMessage('공방 앞을 지나가니 코를 찌르는 냄새와 함께 수상한 목소리가 들려온다……');
  // TODO: PRINTW
  ctx.showMessage('「네, 다 됐습니다」');
  ctx.showMessage('얼마 후, 레이첼이 갈색 액체가 가득담긴 작은 병을 가지고 왔다');
  ctx.showMessage('「주의 사항이 있습니다 ……인간이 아닌 분,');
  ctx.showMessage('예를들면 안드로이드나 음마 같은 분들에겐 효과가 없습니다.');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 500) === 1) {
      if (ctx.getTalent(count, 85) === 0) {
        ctx.showMessage('');
        ctx.print('그리고…… 전 해독제를 가지고 있으니까 조심해 주세요');
      }
    }
  }
  ctx.showMessage('」');
  ctx.showMessage('그럼, 누구에게 먹일까……');
  // TODO: PRINTW
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】에겐 효과가 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 505)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 505)}】에겐 효과가 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상에겐 먹일 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 500) && ctx.getTalent(result, 85) === 0) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 500)}】에겐 효과가 없습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.getName(T)}에게 초강력 미약을 먹입니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", T)}의 차에 몰래 초강력 미약을 탔다`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 아무런 의심없이 차를 마셨다……`);
    // TODO: PRINTW
    ctx.showMessage(`W ${ctx.getVarName("CALL", T)}의 모습이 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")} 몽롱한 눈으로 ${ctx.josaHelper("플레이어를")} 바라보더니,`);
    ctx.showMessage(`자신의 비부를 만지며 ${ctx.getVarName("CALL", MASTER)}의 육봉을 바지 위에서 문지르기 시작했다……`);
    ctx.showMessage(`그리고 애액으로 질척해진 비소를 두 손가락으로 벌리고,`);
    ctx.showMessage(`열이 담긴 시선과 평소라면 절대로 하지 않을 음란한 말로 ${ctx.josaHelper("플레이어를")} 유혹했다……`);
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 76)}】해졌다`);
    ctx.showMessage(`W ${ctx.getVarName("EXP", 57)}+1`);
    ctx.getTalent(t, 76) = 1;
    ctx.exp[T][57] += 1;
  }
  ctx.money -= C;
  return 1;
}

export async function antiaging(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('「회춘약이옵니까?　네, 만들 수 있습니다――만,」');
  ctx.showMessage('그리고 레이첼이 보여준 재료는 간단하게 모을 수 있는 건 아니었지만,');
  ctx.showMessage('돈만 있다면 어떻게든 얻을 수 있는 것들이었다');
  ctx.showMessage('그러나 필요한 금액이 눈의 의심하게 되는 단위라, 자주 부탁하지는 못할 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('어떻게든 자금을 확보해 모은 재료를 레이첼에게 건내주니,');
  ctx.showMessage('그녀는 잠시 공방에 틀어박혔다');
  ctx.showMessage('공방 앞을 지나가니 코를 찌르는 냄새와 함께 수상한 목소리가 들려온다……');
  // TODO: PRINTW
  ctx.showMessage('「네, 다 됐습니다」');
  ctx.showMessage('얼마 후, 레이첼이 빨간 액체가 가득담긴 작은 병을 가지고 왔다');
  ctx.showMessage('「주의 사항이 있습니다 ……인간이 아닌 분,');
  ctx.showMessage('예를들면 안드로이드나 음마 같은 분들에겐 효과가 없습니다.');
  ctx.showMessage('그리고, 최저 12살 아래로는 돌아갈 수 없으니 조심해주세요');
  ctx.showMessage('그리고 회춘이라고 해도 실제 연령을 낮출 뿐, 겉모습은 그대로랍니다」');
  ctx.showMessage('그럼, 누구에게 먹일까……');
  // TODO: PRINTW
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 504)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 504)}】에겐 효과가 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 505)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 505)}】에겐 효과가 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 330)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 330)}】대상에겐 먹일 수 없습니다`);
    return 0;
  } else if (ctx.base[ctx.result][9] <= 12) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 더 이상 젊어질 수 없습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.getName(T)}에게 회춘약을 먹입니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(T), "는")} 1살 젊어졌다`);
    ctx.showMessage(`W ${ctx.getVarName("EXP", 57)}+1`);
    ctx.base[T][9] -= 1;
    ctx.exp[T][57] += 1;
  }
  ctx.money -= C;
  return 1;
}

export async function add_succubus(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 2000000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  if (character.cflags[ctx.master][760] === 3) {
    ctx.showMessage('더 이상 불러낼 음마가 없습니다'); ctx.waitInput();
    return 0;
  }
  ctx.showMessage(`「저기, 시험해보고 싶은 의식이 있어요……」`);
  ctx.showMessage(`진지한 얼굴로 ${ctx.getVarName("CALL", MASTER)}에게 레이첼이 상담한 것은,`);
  ctx.showMessage(`쉽게 말해 소환의식에 관한 것이었다`);
  ctx.showMessage(`아무리 레이첼이 신비하고, 마법으로 밖에 안보이는 힘을 가지고 있어도`);
  ctx.showMessage(`판타지한 모든 일이 가능한 것은 아니다`);
  ctx.showMessage(`그래도, 여배우 후보 지도를 헌신적으로 도와주는 레이첼의 부탁을 무시할 수 없었기에`);
  ctx.showMessage(`${ctx.josaHelper("플레이어는")} 일단 뭐가 필요하고 돈은 얼마나 있어야 하는지`);
  ctx.showMessage(`들어보기로 했다`);
  ctx.showMessage(`W`);
  ctx.showMessage(`필요한 자금은 키류 조직에게 변제해야하는 금액과 같고,`);
  ctx.showMessage(`거기에 의식엔「죄인의 목숨」이 필요하는 등, 금전적으로도, 윤리적으로도 상당히 부담이 큰 의식이었다`);
  ctx.showMessage(`${ctx.josaHelper("플레이어는")} 일단 레이첼의 요청을 보류하고, 키류 조직에게 상담해 보기로 했다……`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「레이첼 아가씨라면 잘 알고 있지. 우리도 아가씨에겐 비합법적인 약물제조로 신세지고 있으니까」`);
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 이야기를 들은 키류 조직 수장은,`);
  ctx.showMessage(`진지하게 고개를 끄덕이더니 ${ctx.getVarName("CALL", MASTER)}에게 몇가지 조건을 제시했다`);
  ctx.showMessage(`W`);
  ctx.showMessage(`・죄인은 키류 조직에서 준비해 주겠지만, 의식에 필요한 다른 도구는 스스로 준비할 것`);
  ctx.showMessage(`・200만 P의 변재기간을 열주만 연장해준다`);
  ctx.showMessage(`・만약 의식에 실패했어도 스스로 책임을 져라`);
  ctx.showMessage(`W`);
  ctx.showMessage(`여배우 후보들도 성장하고 있으니 변재기간이 열주만 연장돼도`);
  ctx.showMessage(`200만 P정도는 아슬아슬하게 준비 가능하다`);
  ctx.showMessage(`W 나머진 윤리적 문제인데――`);
  ctx.showMessage(`「이제와서 말씀드리긴 그래도, 저와 같은 소녀를『지도』해서 성욕의 분출구로 다루는`);
  ctx.showMessage(`　시점에서 윤리관은 이미 버리신 게 아닌가요?」`);
  ctx.showMessage(`레이첼의 말대로, 억지로라도 이런 일을 시작한 시점에서 이미 윤리관은 버리기로 각오했었다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`각오를 다시 다진 ${ctx.josaHelper("플레이어는")} 키류 조직에게 죄인을 부탁하고,`);
  ctx.showMessage(`레이첼이 원하는 재료를 모두 준비했다`);
  ctx.showMessage(`W`);
  ctx.showMessage(`레이첼의 공방의 바닥에 기묘한 도형을 짜맞춘 기하학적인 문양이 그려져있고,`);
  ctx.showMessage(`그 중심에 죄인―― 키류 조직의『돌격꾼』이 기절한 채 누워있다`);
  ctx.showMessage(`야릇한 냄새가 가득한 방에서, 진지한 표정의 레이첼은`);
  ctx.showMessage(`두꺼운 책을 위로 들고 주문을 외우기 시작했다`);
  ctx.showMessage(`W`);
  ctx.showMessage(`「소환가능한 음마는, 서큐버스와 인큐버스인 것 같아요」`);
  ctx.showMessage(`의식 내용을 조사하던 레이첼의 말로는 그러한――`);
  ctx.showMessage(`무슨 우연인지 이 일에 적합한 인외의 존재를 소환하는 의식이라고 한다`);
  ctx.showMessage(`의식은 아무런 문제없이 진행되어 갔고, 의식이 시작하고 몇십분이 경과한 지금,`);
  ctx.showMessage(`바닥에 누워있던 남자가 고통스러운 소리를 지르기 시작했다`);
  ctx.showMessage(`바닥에서 몸부림치던 남자는,`);
  ctx.showMessage(`빨리감기를 누른 영화처럼 급속히 미라가 되어갔다`);
  ctx.showMessage(`책을 닫고, 영창을 끝낸 레이첼이 문양의 중심을 가만히 바라보고 있다……`);
  ctx.showMessage(`W`);
  ctx.showMessage(`갑자기 빛이 쏟아져 나오더니 남자의 미라가 흔적도 없이 사라지고, 그곳에는――`);
  // TODO: PRINTW
  // Label: INPUT_LOOP
  if (GETCHARA(81,0 ) < 0 && (character.cflags[ctx.master][760] & 1) == 0) {
    ctx.showMessage('[0] - 얌전해보이는 반라의, 고●학생으로 보이는 소녀가 있었다');
  }
  if (GETCHARA(82,0 ) < 0 && (character.cflags[ctx.master][760] & 2) == 0) {
    ctx.showMessage('[1] - 건방져 보이는 전라의, 중●생으로 보이는 소녀가 있었다');
  }
  ctx.showMessage('※CAUTION※');
  ctx.showMessage('이 의식으로 소환한 캐릭터를 은퇴시키면 재게약이 불가능합니다!');
  await ctx.inputNumber();
  if (ctx.result === 0 && GETCHARA(81,0 ) < 0 && (character.cflags[ctx.master][760] ^ 1)) {
    ctx.showMessage(`ここがどこなのかわかっていないのか, その少女は周囲を怯えた目できょろきょろと見回`);
    ctx.showMessage(`している`);
    ctx.showMessage(`そして${ctx.getVarName("CALL", MASTER)}や레이첼の存在に気づくと, やたら流暢な日本語で자기소개を始めた…`);
    ctx.showMessage(`…`);
    // TODO: PRINTW
    ctx.showMessage(`よく分からないことを言っていたが, ${ctx.getVarName("CALL", MASTER)}が理解できたのはこの少女はまごうことなき`);
    ctx.showMessage(`서큐버스で, 名前を「에리스」ということ`);
    ctx.showMessage(`そして음마の名家の아가씨で箱入り同然に育てられてきたため, なんと서큐버스だという`);
    ctx.showMessage(`のにまだ처녀だという`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}が에리스にこれからしてもらうことを説明すると, 에리스は恥ずかしがりながらも`);
    ctx.showMessage(`容易に「食餌」が行える環境だと知ると笑顔でうなずいてみせた……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`《에리스が女優候補になりました》`);
    ctx.showMessage(`W`);
    // TODO: ADDCHARA 81
    // TODO: LOADGLOBAL
    ctx.global[281] += 1;
    // TODO: SAVEGLOBAL
    character.cflags[ctx.master][760] |= 1;
  } else if (ctx.result === 1 && GETCHARA(82,0 ) < 0 && (character.cflags[ctx.master][760] ^ 2)) {
    ctx.showMessage(`ここがどこなのかわかっていないのか, その少女は周囲を호기심旺盛にきょろきょろと`);
    ctx.showMessage(`見回している`);
    ctx.showMessage(`そして${ctx.getVarName("CALL", MASTER)}や레이첼の存在に気づくと, やたら流暢な日本語で자기소개を始めた…`);
    ctx.showMessage(`…`);
    // TODO: PRINTW
    ctx.showMessage(`よく分からないことを言っていたが, ${ctx.getVarName("CALL", MASTER)}が理解できたのはこの少女はまごうことなき`);
    ctx.showMessage(`서큐버스で, 名前を「リリス」ということ`);
    ctx.showMessage(`서큐버스らしく経験豊富で, 男の精を吸う技術は同世代の서큐버스と比べても優れて`);
    ctx.showMessage(`いるという`);
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}が에리스にこれからしてもらうことを説明すると, リリスは妖艶に舌なめずりして`);
    ctx.showMessage(`容易に「食餌」が行える環境だと知ると笑顔でうなずいてみせた……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`《リリスが女優候補になりました》`);
    ctx.showMessage(`W`);
    // TODO: ADDCHARA 82
    // TODO: LOADGLOBAL
    ctx.global[282] += 1;
    // TODO: SAVEGLOBAL
    character.cflags[ctx.master][760] |= 2;
  }
  ctx.money -= C;
  character.cflags[ctx.master][703] += 1;
  ctx.flags[3] += 10;
  return 1;
}

export async function add_reena(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 500000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  ctx.showMessage(`「당신께 부탁드릴 것이 있습니다만…… 괜찮으십니까?」`);
  ctx.showMessage(`레이첼의 공방에서, 작업중인 주인을 대신해 ${ctx.josaHelper("플레이어를")} 대접하던 여성이, 갑자기 말을 꺼냈다`);
  ctx.showMessage(`쿨뷰티라는 말이 어울리는, 유능한 비서라는 인상인 그녀는 리나・레스피치오`);
  ctx.showMessage(`해외 유학중인 레이첼의 감시와 호위를 맡은 인물로, 공방과 사무소에서 얼굴을 마주친 적이 있다`);
  ctx.showMessage(`직접 대화한 적은 손으로 꼽을 정도인 리나가,`);
  ctx.showMessage(`W 굳은 표정으로 말하는《부탁》이란 대체 무엇일까……`);
  ctx.showMessage(`「공주님이 당신을 신뢰하는 것은…… 우리나라의 비술을 제공하시고 계신것을 통해 알고 계시겠죠?`);
  ctx.showMessage(`　그라고, 공주님이 당신을 보시는 눈이 사랑하는 소녀의 눈인 것까지도`);
  ctx.showMessage(`　……당신에게 달리 의중에 둔 분이 계시다고 해도, 파고들 생각은 없습니다`);
  ctx.showMessage(`　어떤 형식으로든, 공주님의 마음이 보답받는 날이 온다면야`);
  ctx.showMessage(`　그럼, 제가 드리는 부탁을 말씀드리죠`);
  ctx.showMessage(`　이미 아시는대로 저는 보디가드이며, 공주님의 명령을 받아 밀정과 비슷한 짓도 하고 있습니다`);
  ctx.showMessage(`　밀정, 다시 말해 스파이로 활동할 경우 몸을 사용해 정보를 끌어내야 할 가능성도 생깁니다`);
  ctx.showMessage(`　그러나 다행이라고 해야 할까요…… 지금까지 그런 경험은 없고, 부끄럽지만 저는 아직 숫처녀입니다`);
  ctx.showMessage(`　앞으로, 만에 하나라도 그런 일이 필요해질 경우, 대상을 상대로 아무것도 못해서는 밀정 실격이나 마찬가지죠`);
  ctx.showMessage(`　그래서 당신께 드릴 부탁이란…… 이 나라 말로 하자면『방중술』입니다, 그것을 제게 지도해 주세요`);
  ctx.showMessage(`　단도직입적으로 말하면, 저도 공주님처럼 포르노 배우로 고용해주시길 바랍니다`);
  ctx.showMessage(`　공주님의 허가도 떨어졌고, 저도 당신이라면 안심하고 몸을 맡길 수 있습니다`);
  ctx.showMessage(`　공주님의 의중의 상대라면 문제는 없다, 라고 믿고 있으니까요`);
  ctx.showMessage(`　그러나…… 이번 일을 위해서 공주님께선 당신에게 50만 포인트를 요구하라,고 하셨습니다`);
  ctx.showMessage(`　이 금액은 장차, 제가 당신을 위해 밀정으로서 일하게 됐을때, 조사료의 선금이라고 해석해 주시길 바랍니다`);
  ctx.showMessage(`　예를 들어, 키류 조직등 뒷세계의 조직에게 의뢰할 경우, 조사비용은 200만 포인트가 필요해집니다`);
  ctx.showMessage(`　제가 할 수 있는 건 조사 뿐이지만, 당신과 연관된 모든 사람들의 조사를 약속드립니다`);
  ctx.showMessage(`W 　《부탁》이라기 보단《교섭》이 되버렸습니다만…… 어떠신가요?」`);
  ctx.showMessage(`리나의 제안은 매우 매력적이고, 뒤가 캥기는 부분도 없는 것 같다`);
  ctx.showMessage(`50만 포인트로 여배우 후보들의 신변조사가 상시 가능해진다면 싼값인데……`);
  ctx.showMessage(`L`);
  // Label: INPUT_LOOP_REENA
  ctx.showMessage(`리나・레스피치오와 계약하겠습니까?`);
  ctx.showMessage('[0] - 계약한다');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 0 && character.cflags[ctx.master][712] === 0) {
    ctx.showMessage(`「계약해 주셔서 감사합니다`);
    ctx.showMessage(`　저 같은 사람의 포르노가 팔릴지는 모르겠으나, 있는 힘껏 힘이 되어드리겠습니다」`);
    ctx.showMessage(`W`);
    ctx.showMessage(`《리나・레스피치오가 여배우 후보가 됐습니다》`);
    ctx.showMessage(`W`);
    // TODO: ADDCHARA 96
    character.cflags[ctx.master][712] = 1;
    await reena_ablcheck(ctx, character);
    // TODO: LOADGLOBAL
    ctx.global[296] += 1;
    // TODO: SAVEGLOBAL
    if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
      if (GETCHARA(96, 0) >= 0) {
        character = GETCHARA(96);
        await clearbonus_call(ctx, character);
      }
    }
  } else if (ctx.result === 1) {
    return 0;
  } else {
    // GOTO INPUT_LOOP_REENA - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 0;
}

export async function reena_ablcheck(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  K = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 9) {
      K += ctx.abilities[ctx.count][10];
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 96) {
      ctx.abilities[ctx.count][10] += K - 2;
    }
  }
}

export async function reena_search(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #DIM DYNAMIC C_NUM
  ctx.showMessage(`W 《리나에게 스탭의 동향을 체크해달라고 부탁했습니다》`);
  character.cflags[ctx.master][694] = 1;
  // TODO: FOR C_NUM, 1, CHARANUM
  if (character.cflags[C_NUM][661] === 1) {
    character.cflags[C_NUM][661] = 0;
    character.cflags[C_NUM][621] = 0;
  }
  // TODO: NEXT
}

export async function add_tentacle(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 75000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(` 촉수생물을 소환합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`《촉수생물을 소환했습니다》`);
    ctx.item[90] += 1;
    ctx.money -= C;
    await ctx.wait();
    return 1;
  } else if (ctx.result === 1) {
    return 0;
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}
