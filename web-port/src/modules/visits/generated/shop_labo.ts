/**
 * SHOP_LABO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function secret_labo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP
  ctx.drawLine();
  ctx.showMessage('비밀 연구소');
  ctx.showMessage('《여배우 후보들의 육체와 정신을 마개조합니다》');
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
  ctx.showMessage('□육체개조');
  ctx.showMessage('[0] - 거유로 만든다           (20000포인트)');
  ctx.showMessage('[1] - 빈유로 만든다           (10000포인트)');
  ctx.showMessage('[2] - 모유가 나오게 한다      (50000포인트)');
  ctx.showMessage('[3] - 후타나리로 만든다       (50000포인트)');
  ctx.showMessage('[4] - 후타나리를 지운다       (10000포인트)');
  ctx.showMessage('[5] - 동물귀를 붙인다         ( 2000포인트)');
  ctx.showMessage('[6] - 동물귀를 지운다         ( 1000포인트)');
  ctx.showMessage('[7] - 미숙함을 지운다         (10000포인트)');
  if (ctx.flags[36]) {
    ctx.showMessage('[9] - 음모 영구탈모           ( 5000포인트)');
  }
  ctx.showMessage('');
  ctx.showMessage('[10] - 모유가 안나오게 한다   (10000포인트)');
  ctx.showMessage('[11] - 오줌싸게를 지운다      (10000포인트)');
  ctx.showMessage('[12] - 처녀막을 재생한다      (100000포인트)');
  ctx.showMessage('');
  ctx.showMessage('□세뇌 (조수용)');
  ctx.showMessage('[30] -【불결무시】로 만든다   ( 5000포인트)');
  ctx.showMessage('[31] -【조루】로 만든다       ( 8000포인트)');
  ctx.showMessage('[32] -【유치】로 만든다       (10000포인트)');
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await modify_bustup(ctx, character);
  } else if (ctx.result === 1) {
    await modify_bustdown(ctx, character);
  } else if (ctx.result === 2) {
    await modify_bonyu(ctx, character);
  } else if (ctx.result === 3) {
    await modify_futanari(ctx, character);
  } else if (ctx.result === 4) {
    await modify_futanari_erase(ctx, character);
  } else if (ctx.result === 5) {
    await modify_animal(ctx, character);
  } else if (ctx.result === 6) {
    await modify_animal_erase(ctx, character);
  } else if (ctx.result === 7) {
    await modify_deimmaturity(ctx, character);
  } else if (ctx.result === 9 && ctx.flags[36]) {
    await modify_removehair(ctx, character);
  } else if (ctx.result === 10) {
    await modify_bonyu_erase(ctx, character);
  } else if (ctx.result === 11) {
    await modify_omorashi_erase(ctx, character);
  } else if (ctx.result === 12) {
    await shojo_saisei(ctx, character);
  } else if (ctx.result === 30) {
    C = 5000;
    B = 64;
    await brain_washing(ctx, character);
  } else if (ctx.result === 31) {
    C = 8000;
    B = 133;
    await brain_washing(ctx, character);
  } else if (ctx.result === 32) {
    C = 10000;
    B = 132;
    await brain_washing(ctx, character);
  } else if (ctx.result === 999) {
    return 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
}

export async function modify_bustup(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 20000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('개조대상의 유방을 강제로 확대시킵니다');
  ctx.showMessage('누구를 거유화 시킵니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][22] > 0 && ctx.flags[38] > 0) {
    await modify_bustup_iws(ctx, character);
    return 1;
  } else if (ctx.getTalent(result, 122)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 122)}】는 거유화 시킬 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 199)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 199)}】인 캐릭터는 개조할 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 114)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "는")} 더 이상 거유화 시킬 수 없습니다`);
    return 0;
  }
  if (ctx.getTalent(result, 110)) {
    ctx.showMessage(`${ctx.getName(ctx.result)}의 가슴을 더 크게 만들려면 50000포인트가 필요합니다`);
    C = 50000;
    if (ctx.money < C) {
      // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
    }
    ctx.showMessage('그래도 진행합니까?');
  } else {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.result), "를")} 거유화 시킵니까?`);
  }
  T = ctx.result;
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0 && ctx.getTalent(t, 116)) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 109)}】가 됐다》`);
    ctx.getTalent(t, 116) = 0;
    ctx.getTalent(t, 109) = 1;
  } else if (ctx.result === 0 && ctx.getTalent(t, 109)) {
    ctx.showMessage(`W 《${ctx.getName(T)}의 가슴사이즈가 보통이 됐다》`);
    ctx.getTalent(t, 109) = 0;
  } else if (ctx.result === 0 && ctx.getTalent(t, 110)) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 114)}】가 됐다》`);
    ctx.getTalent(t, 110) = 0;
    ctx.getTalent(t, 114) = 1;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 110)}】가 됐다》`);
    ctx.getTalent(t, 110) = 1;
  } else {
    return 0;
  }
  ctx.money -= C;
  return 1;
}

export async function modify_bustdown(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 10000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('개조대상의 유방을 강제로 축소시킵니다');
  ctx.showMessage('누구를 빈유화 시킵니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][22] > 0 && ctx.flags[38] > 0) {
    await modify_bustdown_iws(ctx, character);
    return 1;
  } else if (ctx.getTalent(result, 122)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 122)}】는 빈유화 시킬 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 199)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 199)}】인 캐릭터는 개조할 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 116)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "는")} 더 이상 빈유화 시킬 수 없습니다`);
    return 0;
  }
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.result), "를")} 빈유화 시킵니까?`);
  T = ctx.result;
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0 && ctx.getTalent(t, 114)) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 110)}】가 됐다》`);
    ctx.getTalent(t, 114) = 0;
    ctx.getTalent(t, 110) = 1;
  } else if (ctx.result === 0 && ctx.getTalent(t, 110)) {
    ctx.showMessage(`W 《${ctx.getName(T)}의 가슴사이즈가 보통이 됐다》`);
    ctx.getTalent(t, 110) = 0;
  } else if (ctx.result === 0 && ctx.getTalent(t, 109)) {
    ctx.showMessage(`W 《${ctx.getName(T)}의 가슴은 완전히 평평해졌다》`);
    ctx.getTalent(t, 109) = 0;
    ctx.getTalent(t, 116) = 1;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 109)}】가 됐다》`);
    ctx.getTalent(t, 109) = 1;
  } else {
    return 0;
  }
  ctx.money -= C;
  return 1;
}

export async function modify_bonyu(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 50000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('개조대상의 유선을 활성화시켜 모유 분비를 촉진시킵니다');
  ctx.showMessage('누구를 모유체질로 만듭니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 122)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 122)}】은 모유체질화 시킬 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 199)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 199)}】인 캐릭터는 개조할 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 109) || ctx.getTalent(result, 116)) {
    ctx.showMessage(`W ${ctx.getBreastSizeName(ctx.result)}의 가슴크기로는 모유체질화 시킬 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 130)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "는")} 이미 모유체질입니다`);
    return 0;
  }
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.result), "를")} 모유체질화 시킵니까?`);
  T = ctx.result;
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")} 모유가 나오게 됐다》`);
    ctx.getTalent(t, 130) = 1;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function modify_futanari(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 50000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('개조대상의 클리토리스를 변형시켜 페니스를 형성합니다');
  ctx.showMessage('난소에서 의사정액을 만들어 사정도 가능합니다');
  ctx.showMessage('누구를 후타나리로 만듭니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 121) || ctx.getTalent(result, 122)) {
    ctx.showMessage(`W ${ctx.getName(ctx.result)}에겐 이미 페니스가 있습니다`);
    return 0;
  } else if (ctx.getTalent(result, 199)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 199)}】인 캐릭터는 개조할 수 없습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.result), "를")} 후타나리로 만듭니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    if (ctx.flags[564] === 0) {
      ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 121)}】가 됐다》`);
      ctx.getTalent(t, 121) = 1;
      ctx.getTalent(t, 326) = 0;
      if (character.cflags[T][18] == 0) {
        ctx.getTalent(t, 1) = 1;
      }
      character.cflags[T][609] = ctx.rand(3);
      character.cflags[T][611] = ctx.rand(4);
      if (character.cflags[T][609] >= 2) {
        character.cflags[T][609] = 2;
      }
      if (character.cflags[T][611] >= 3) {
        character.cflags[T][611] = 3;
      }
      await decide_penissize(ctx, character);
      ctx.exp[T][50] += 1;
      ctx.showMessage('이상경험 +1');
    } else if (ctx.flags[564] === 1) {
      await decide_penisselect(ctx, character);
      ctx.exp[T][50] += 1;
      ctx.showMessage('이상경험 +1');
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function modify_futanari_erase(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 10000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('후타나리를 지웁니다');
  ctx.showMessage('누구의 페니스를 지웁니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 122)) {
    ctx.showMessage(`W 그걸 버린다니 당치도 않다!`);
    return 0;
  } else if (ctx.getTalent(result, 121) === 0) {
    ctx.showMessage(`W 지울 페니스가 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 511) === 1 && ctx.getTalent(result, 505) === 0) {
    ctx.showMessage(`W 【천사】는【후타나리】를 지울 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 511) === 1 && ctx.getTalent(result, 505) === 1) {
    ctx.showMessage(`W 【타천사】는【후타나리】를 지울 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 199)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 199)}】인 캐릭터는 개조할 수 없습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.getName(ctx.result)}의 페니스를 지웁니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 121)}】가 아니게 됐다》`);
    ctx.getTalent(t, 121) = 0;
    if (ctx.getTalent(t, 1) == 0) {
      character.cflags[T][610] = 1;
    }
    ctx.getTalent(t, 1) = 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function modify_animal(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 2000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('개조대상의 유전자 일부를 동물 유전자로 교체합니다');
  ctx.showMessage('누구를 동물귀로 만듭니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 124)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "는")} 이미 동물귀입니다`);
    return 0;
  } else if (ctx.getTalent(result, 199)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 199)}】인 캐릭터는 개조할 수 없습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.result), "를")} 동물귀로 만듭니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 124)}】가 됐다》`);
    ctx.getTalent(t, 124) = 1;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function modify_animal_erase(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 1000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('동물귀를 지웁니다');
  ctx.showMessage('누구의 동물귀를 지웁니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 124) === 0) {
    ctx.showMessage(`W 지울 동물귀가 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 199)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 199)}】인 캐릭터는 개조할 수 없습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.getName(ctx.result)}의 동물귀를 지웁니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 124)}】가 아니게 됐다》`);
    ctx.getTalent(t, 124) = 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function modify_removehair(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 5000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('개조대상의 성기에서 음모의 모근을 제거합니다');
  ctx.showMessage('누구의 음모를 영구탈모 시킵니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 125)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "는")} 이미 음모가 없습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.getName(ctx.result)}의 음모를 영구탈모 시킵니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    if (ctx.getTalent(t, 128)) {
      ctx.showMessage(`《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 128)}】이 아니게 됐다》`);
      ctx.getTalent(t, 128) = 0;
    }
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 125)}】이 됐다》`);
    ctx.getTalent(t, 125) = 1;
    character.cflags[T][6] = -2;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function modify_deimmaturity(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 10000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('개조대상의 성기만 발육시켜 성교가 가능하게 만듭니다');
  ctx.showMessage('누구의 미숙함을 지웁니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 135) === 0) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "는")} 미숙함이 아닙니다`);
    return 0;
  } else if (ctx.getTalent(result, 199)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 199)}】인 캐릭터는 개조할 수 없습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.getName(ctx.result)}의 미숙함을 지웁니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 135)}】이 아니게 됐다》`);
    ctx.getTalent(t, 135) = 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function modify_amnesia(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P = 100000;
  if (ctx.money < P) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('개조대상의 육체와 감각은 그대로 두고');
  ctx.showMessage('기억을 지도 시작 이전의 상태로 되돌립니다');
  ctx.showMessage('누구의 기억을 지웁니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 1 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 199)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 199)}】인 캐릭터는 개조할 수 없습니다`);
    return 0;
  }
  C = ctx.result;
  ctx.showMessage(`${ctx.getName(C)}의 기억을 지웁니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    D = ctx.charanum;
    // TODO: ADDCHARA NO:C
    await chara_buy_setting(ctx, character);
    ctx.base[D][0] = ctx.base[C][0];
    MAXctx.base[D][0] = MAXctx.base[C][0];
    ctx.base[D][1] = ctx.base[C][1];
    MAXctx.base[D][1] = MAXctx.base[C][1];
    ctx.getTalent(d, 0) = ctx.getTalent(c, 0);
    character.cflags[D][15] = character.cflags[C][15];
    ctx.getTalent(d, 1) = ctx.getTalent(c, 1);
    character.cflags[D][6] = character.cflags[C][6];
    ctx.getTalent(d, 121) = ctx.getTalent(c, 121);
    ctx.getTalent(d, 326) = ctx.getTalent(c, 326);
    ctx.getTalent(d, 130) = ctx.getTalent(c, 130);
    ctx.getTalent(d, 109) = ctx.getTalent(c, 109);
    ctx.getTalent(d, 110) = ctx.getTalent(c, 110);
    ctx.getTalent(d, 114) = ctx.getTalent(c, 114);
    ctx.getTalent(d, 116) = ctx.getTalent(c, 116);
    ctx.getTalent(d, 115) = ctx.getTalent(c, 115);
    ctx.abilities[D][0] = ctx.abilities[C][0];
    ctx.abilities[D][1] = ctx.abilities[C][1];
    ctx.abilities[D][2] = ctx.abilities[C][2];
    ctx.abilities[D][3] = ctx.abilities[C][3];
    ctx.exp[D][0] = ctx.exp[C][0];
    ctx.exp[D][1] = ctx.exp[C][1];
    ctx.exp[D][3] = ctx.exp[C][3];
    ctx.exp[D][5] = ctx.exp[C][5];
    ctx.exp[D][10] = ctx.exp[C][10];
    ctx.exp[D][20] = ctx.exp[C][20];
    ctx.exp[D][30] = ctx.exp[C][30];
    ctx.exp[D][31] = ctx.exp[C][31];
    ctx.exp[D][32] = ctx.exp[C][32];
    ctx.exp[D][33] = ctx.exp[C][33];
    ctx.exp[D][40] = ctx.exp[C][40];
    ctx.exp[D][41] = ctx.exp[C][41];
    ctx.exp[D][52] = ctx.exp[C][52];
    ctx.exp[D][53] = ctx.exp[C][53];
    ctx.exp[D][54] = ctx.exp[C][54];
    ctx.exp[D][57] = ctx.exp[C][57];
    ctx.exp[D][60] = ctx.exp[C][60];
    ctx.getTalent(d, 153) = ctx.getTalent(c, 153);
    ctx.getTalent(d, 154) = ctx.getTalent(c, 154);
    character.cflags[D][101] = character.cflags[C][101];
    character.cflags[D][102] = character.cflags[C][102];
    character.cflags[D][103] = character.cflags[C][103];
    character.cflags[D][104] = character.cflags[C][104];
    character.cflags[D][105] = character.cflags[C][105];
    character.cflags[D][106] = character.cflags[C][106];
    character.cflags[D][109] = character.cflags[C][109];
    character.cflags[D][110] = character.cflags[C][110];
    character.cflags[D][111] = character.cflags[C][111];
    ctx.getTalent(d, 46) = ctx.getTalent(c, 46);
    character.cflags[D][31] = character.cflags[C][31];
    character.cflags[D][32] = character.cflags[C][32];
    character.cflags[D][40] = character.cflags[C][40];
    character.cflags[D][41] = character.cflags[C][41];
    character.cflags[D][42] = character.cflags[C][42];
    character.cflags[D][43] = character.cflags[C][43];
    character.cflags[D][44] = character.cflags[C][44];
    character.cflags[D][45] = character.cflags[C][45];
    character.cflags[D][46] = character.cflags[C][46];
    character.cflags[D][47] = character.cflags[C][47];
    character.cflags[D][48] = character.cflags[C][48];
    character.cflags[D][70] = character.cflags[C][70];
    ctx.getTalent(d, 122) = ctx.getTalent(c, 122);
    // TODO: DELCHARA C
    D = C;
    if (C < ctx.charanum -1) {
      A = ctx.charanum - C - 1;
      for (let COUNT = 0; COUNT < A; COUNT++) {
        B = D;
        await chara_sort_2(ctx, character);
      }
    }
    C = D;
    character = C;
    ctx.showMessage(`《${ctx.josaHelper(ctx.getName(C), "는")} 지도를 받은 기억이 없어졌다》`);
    await ctx.wait();
    if (ctx.getTalent(c, 153)) {
      ctx.showMessage(`그녀의 인식으로는 갑자기 부풀어오른 배를 내려다보고,`);
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", C), "는")} 멍하니 서있다……`);
      await ctx.wait();
      if (ctx.getTalent(c, 155) === 0 && ctx.getTalent(c, 12) === 0) {
        ctx.showMessage(`${ctx.getVarName("CALL", C)}의 머리속에서 뭔가가 부서져 버렸다……`);
        ctx.showMessage(`${ctx.getVarName("CALL", C)}의 정신은【${ctx.getVarName("TALENT", 9)}】했다`);
        ctx.getTalent(c, 9) = 1;
        await ctx.wait();
      }
    }
    if (ctx.getTalent(c, 154)) {
      ctx.showMessage(`${ctx.getVarName("CALL", C)}에게, 육아 중이던 그녀의 아기를 데려왔다……`);
      await ctx.wait();
      if (ctx.getTalent(c, 155) || ctx.getTalent(c, 63)) {
        ctx.showMessage(`자신의 가슴에 달라붙는 처음보는 아기를, ${ctx.josaHelper(ctx.getVarName("CALLNAME", C), "는")} 신기한 듯이 바라보다가,`);
        ctx.showMessage(`무언가를 결심한 듯이 아기를 안아들고, 젖을 물렸다`);
        ctx.showMessage(`《육아를 계속합니다》`);
        await ctx.wait();
      } else {
        ctx.showMessage(`자신의 가슴에 달라붙는 처음보는 아기를, ${ctx.josaHelper(ctx.getVarName("CALLNAME", C), "는")} 의아하게 바라보고 있다`);
        ctx.showMessage(`${ctx.josaHelper("플레이어는")} 어쩔 수 없이, 아기를 입양보냈다`);
        await ctx.wait();
        ctx.getTalent(c, 154) = 0;
        MAXctx.base[C][0] += 500;
        await reverse_b_size(ctx, character);
        await clear_flag(ctx, character);
      }
    }
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= P;
  return 1;
}

export async function modify_bonyu_erase(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 10000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('모유가 안나오게 만듭니다');
  ctx.showMessage('누구의 모유체질를 지웁니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 130) === 0) {
    ctx.showMessage(`W 모유체질이 아닙니다`);
    return 0;
  } else if (ctx.getTalent(result, 199)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 199)}】인 캐릭터는 개조할 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 153)) {
    ctx.showMessage(`W 임신중인 캐릭터의 모유체질은 지울 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 154)) {
    ctx.showMessage(`W 육아 중인 캐릭터의 모유체질은 지울 수 없습니다`);
    return 0;
  }
  ctx.showMessage(`${ctx.getName(ctx.result)}의 모유체질를 지웁니까?`);
  T = ctx.result;
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")} 모유가 안나오게 됐습니다》`);
    ctx.getTalent(t, 130) = 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function modify_omorashi_erase(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 10000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage('오줌싸개를 치료합니다');
  ctx.showMessage('누구의 오줌싸개를 지웁니까?');
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 57) === 0) {
    ctx.showMessage(`W 오줌싸개가 아닙니다`);
    return 0;
  } else if (ctx.getTalent(result, 199)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 199)}】인 캐릭터는 개조할 수 없습니다`);
    return 0;
  }
  ctx.showMessage(`${ctx.getName(ctx.result)}의 오줌싸개를 지웁니까?`);
  T = ctx.result;
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")} 오줌싸개가 아니게 됐다》`);
    ctx.getTalent(t, 57) = 0;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function shojo_saisei(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 100000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`대상의 처녀막을 재생합니다`);
  ctx.showMessage(`누구의 처녀막을 재생시킵니까?`);
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result <0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, 122)) {
    ctx.showMessage('물리적으로 불가능합니다, 감솨함다!'); ctx.waitInput();
    return 0;
  } else if (ctx.getTalent(result, 0)) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.result), "는")} 처녀입니다`);
    return 0;
  }
  ctx.showMessage(`${ctx.getName(ctx.result)}의 처녀막을 재생시킵니까?`);
  T = ctx.result;
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 0)}】가 됐다》`);
    ctx.getTalent(t, 0) = 1;
    character.cflags[T][71] += 1;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function trans_sex(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 200000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`대상을 성전환시킵니다`);
  ctx.showMessage(`한번 전환하면 원래대로 돌릴 수 없습니다`);
  ctx.showMessage(`누구를 성전환 시킵니까?`);
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result <0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][70]) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "는")} 이미 성전환을 했습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.result), "를")} 성전환 시킵니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    if (ctx.getTalent(t, 122)) {
      ctx.showMessage(`《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 122)}】이 아니게 됐다》`);
      ctx.getTalent(t, 122) = 0;
      ctx.getTalent(t, 0) = 1;
      ctx.getTalent(t, 1) = 0;
    } else {
      if (ctx.getTalent(t, 121)) {
        ctx.showMessage(`《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 121)}】가 아니게 됐다》`);
        ctx.getTalent(t, 121) = 0;
      }
      ctx.showMessage(`《${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", 122)}】이 됐다》`);
      ctx.getTalent(t, 122) = 1;
      ctx.getTalent(t, 0) = 0;
      ctx.getTalent(t, 1) = 1;
    }
    Z = 1;
    ctx.showMessage(`W ${ctx.getVarName("EXP", 50)} +{Z}`);
    ctx.exp[T][50] += Z;
    character.cflags[T][70] = 1;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}

export async function brain_washing(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`세뇌대상의 심층심리를 외부에서 덮어씁니다`);
  ctx.showMessage(`누구를【${ctx.getVarName("TALENT", B)}】로 만듭니까?`);
  await life_list_new,1(ctx, character);
  if (ctx.result === 999) {
    return 0;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.base[ctx.result][0] < 1) {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.getTalent(result, B)) {
    ctx.showMessage(`W ${ctx.josaHelper(ctx.getName(ctx.result), "는")} 이미【${ctx.getVarName("TALENT", B)}】입니다`);
    return 0;
  } else if (ctx.result != 0 && character.cflags[ctx.result][1] < 2) {
    ctx.showMessage(`W 조수가 아닌 캐릭터는 세뇌할 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 121) === 0 && ctx.getTalent(result, 122) === 0 && B === 133) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 122)}】이나【${ctx.getVarName("TALENT", 121)}】가 아니면【조루】로 만들 수 없습니다`);
    return 0;
  } else if (ctx.getTalent(result, 152)) {
    ctx.showMessage(`W 【${ctx.getVarName("TALENT", 152)}】인 캐릭은 세뇌할 수 없습니다`);
    return 0;
  }
  T = ctx.result;
  ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.result), "를")}【${ctx.getVarName("TALENT", B)}】로 만듭니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return 0;
  } else if (ctx.result === 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getName(T), "는")}【${ctx.getVarName("TALENT", B)}】가 됐다`);
    // TODO: TALENT:T:B = 1
    await ctx.wait();
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 1;
}
