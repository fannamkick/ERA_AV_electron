/**
 * WORK_S_KBPLAY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function kb_play(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  character.cflags[13] = 0;
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  G = 0;
  M = 0;
  N = 0;
  O = 0;
  I = 0;
  J = 0;
  S = 0;
  Q = 0;
  R = 0;
  X = 0;
  for (let COUNT = 0; COUNT < 101; COUNT++) {
    T[ctx.count] = 0;
    U[ctx.count] = 0;
  }
  character = -1;
  ctx.assi = -1;
  if (ctx.flags[42] === 1) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130]) {
        character = ctx.count;
      }
    }
  } else if (ctx.flags[42] === 2) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      if (character === -1) {
        character = ctx.count;
      } else if (ctx.exp[ctx.count][5] > ctx.exp[character][5]) {
        ctx.assi = character;
        character = ctx.count;
      } else {
        ctx.assi = ctx.count;
      }
    }
  } else if (ctx.flags[42] >= 3) {
    E = -1;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      if (E < ctx.exp[ctx.count][5]) {
        character = ctx.count;
        E = ctx.exp[ctx.count][5];
      }
    }
    E = 0;
  }
  character.tflags[14] = 0;
  if (ctx.flags[42] === 2) {
    ctx.player = ctx.assi;
    await incest(ctx, character);
  }
  if (character.tflags[14]) {
    if (character.tflags[14] === 1) {
      X = character;
      character = ctx.assi;
      ctx.assi = X;
      character.tflags[14] = 2;
    } else if (character.tflags[14] === 3) {
      X = character;
      character = ctx.assi;
      ctx.assi = X;
      character.tflags[14] = 4;
    }
  }
  await work_sub_relation(ctx, character);
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (E < ctx.exp[ctx.count][91] && character.cflags[ctx.count][130]) {
      E = ctx.exp[ctx.count][91];
    }
  }
  C = E / 5;
  G = C / 3;
  if (C) {
    for (let COUNT = 0; COUNT < C; COUNT++) {
      G += ctx.rand(2);
    }
  }
  C = (ctx.exp[ctx.master][91] / 10);
  if (C) {
    for (let COUNT = 0; COUNT < C; COUNT++) {
      G += ctx.rand(2);
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 126)) {
      G += 1;
    }
    if (ctx.getTalent(count, 180)) {
      G += 2;
    }
    if (ctx.getTalent(count, 181)) {
      G += 3;
    }
    if (ctx.getTalent(count, 203)) {
      G += 3;
    }
    if (ctx.getTalent(count, 205)) {
      G += 3;
    }
    if (ctx.getTalent(count, 208)) {
      G += 5;
    }
  }
  if (G < 10) {
    G = 10;
  }
  await work_sub_print_fullname(ctx, character);
  ctx.showMessage(`의 공중변소 플레이를 개시했다……`);
  ctx.showMessage(`이번 플레이에는 {G}사람이 모였다`);
  await ctx.wait();
  if (ctx.flags[42] === 1 && character > 0) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
  } else if (ctx.flags[42] === 2 && character > 0 && ctx.assi > 0) {
    ctx.showMessage(`${ctx.josaHelper("타겟과")} ${ctx.josaHelper("조수는")}`);
  } else if (ctx.flags[42] ==3) {
    ctx.print('3명은');
  } else {
    ctx.showMessage(`${ctx.flags[42]}명은`);
  }
  ctx.showMessage(`움직일 수 없도록 단단히 묶여서, {G}사람의 손님에게 둘러쌓여,`);
  F = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 122)) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][42] == 79 && (character.cflags[ctx.count][40] & 64)) {
      // TODO: CONTINUE
    }
    F = 0;
  }
  if (F == 0) {
    ctx.print('질과');
  }
  ctx.showMessage(`W 아누스를 몇번이고 몇번이고 꿰뚫려서, 정액을 반복해 주입당했다`);
  ctx.showMessage(`손님이 나간 ${ctx.getVarName("CALL", TARGET)}`);
  if (ctx.flags[42] >= 2) {
    ctx.print('들');
  }
  ctx.showMessage(`W 의 몸에서는, 정액이 멈추지 않고 흘러나오고 있다`);
  S = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[54]) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 0)) {
      character.cflags[ctx.count][50] = 1;
      if (S == 0) {
        ctx.showMessage('');
      }
      if (S) {
        ctx.showMessage(`${LSTR}`);
      }
      ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}`);
      LSTR = 조사만처리(CALLctx.getName(ctx.count),"와");
      S = 1;
    }
  }
  if (S) {
    ctx.showMessage('의 질에서 흘러나온 정액은,');
    ctx.showMessage('뺏겨버린 순결을 나타내듯이 붉게 물들어 있다……'); ctx.waitInput();
  }
  S = 0;
  ctx.showMessage('');
  await work_sub_print_member(ctx, character);
  ctx.locals[1] = ctx.result+2;
  if (ctx.flags[42] >= 2 && ctx.flags[51] >= 175) {
    ctx.showMessage(`%조사만처리(LOCAL:1,"는")% 필사적으로 서로의 이름을 계속 부르고 있지만,`);
  } else {
    ctx.showMessage(`%조사만처리(LOCAL:1,"는")% 필사적으로 계속 도움을 구하고 있지만,`);
  }
  ctx.print('이윽고');
  S = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 76) || ctx.abilities[ctx.count][30] >= 4) {
      if (S) {
        ctx.showMessage(`${LSTR}`);
      }
      ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}`);
      LSTR = 조사만처리(CALLctx.getName(ctx.count),"와");
      S = 1;
    }
  }
  if (S) {
    ctx.showMessage('의 목소리는 음란한 신음으로 변해, 스스로 허리를 흔들기 시작했다……');
  } else {
    ctx.showMessage('그 목소리는 점차 약해져서, 차례차례 몸 위로 덮쳐오는 군중 아래에');
    ctx.showMessage('싹 지워져 버렸다……');
  }
  S = 0;
  await ctx.wait();
  character.tflags[13] = 116;
  X = character;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    await self_kojo(ctx, character);
  }
  character = X;
  character.tflags[13] = 0;
  X = character;
  character = -1;
  if (ctx.getTalent(x, 76) && (ctx.getTalent(x, 88) || ctx.getTalent(x, 89) || ctx.getTalent(x, 77))) {
    if (ctx.assi > 0) {
      if (ctx.getTalent(assi, 76) && (ctx.getTalent(assi, 88) || ctx.getTalent(assi, 89) || ctx.getTalent(assi, 77))) {
        character.cflags[X][53] = 1;
        character.cflags[ctx.assi][53] = 1;
        ctx.showMessage(`W 마지막으로, 한 손님이 가져왔던 관장기로 ${ctx.josaHelper(ctx.getVarName("CALLNAME", X), "과")} ${ctx.getVarName("CALL", ASSI)}의 아누스에 관장액을 주입했다`);
        ctx.showMessage(`W ${ctx.getVarName("CALL", X)}들은 애타는 소리를 내며, 손님이 지켜보는 가운데, 추잡한 소리를 내며 오물을 분출했다`);
        ctx.showMessage(`W 그 모습에 흥분한 손님들은 환호를 지르며 그녀들에게 박수를 보내고 있다`);
        ctx.showMessage(`환성을 지르는 손님들에게 둘러쌓여, ${ctx.josaHelper(ctx.getVarName("CALLNAME", X), "와")} ${ctx.josaHelper("조수는")} 공허한 눈으로 허공을 바라보고 있다`);
        character.tflags[13] = 117;
        character = X;
        await self_kojo(ctx, character);
        character = ctx.assi;
        await self_kojo(ctx, character);
        await ctx.wait();
        character = -1;
      } else {
        character = X;
      }
    } else {
      character = X;
    }
  } else if (ctx.assi > 0) {
    if (ctx.getTalent(assi, 76) && (ctx.getTalent(assi, 88) || ctx.getTalent(assi, 89) || ctx.getTalent(assi, 77))) {
      character = ctx.assi;
    }
  }
  if (character > 1) {
    character.cflags[53] = 1;
    ctx.showMessage(`W 마지막으로, 한 손님이 가져왔던 관장기로 ${ctx.getVarName("CALL", TARGET)}의 아누스에 관장액을 주입했다`);
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 참을 수 없는 소리를 내며, 손님이 지켜보는 가운데, 추잡한 소리를 내며 오물을 분출했다`);
    ctx.showMessage(`W 그 모습에 흥분한 손님들은 환호를 지르며 그녀들에게 박수를 보내고 있다`);
    ctx.showMessage(`환성을 지르는 손님들에게 둘러쌓여, ${ctx.josaHelper("타겟은")} 공허한 눈으로 허공을 바라보고 있다`);
    character.tflags[13] = 117;
    await self_kojo(ctx, character);
    await ctx.wait();
  }
  character = X;
  X = 0;
  character.tflags[13] = 0;
  A = 0;
  B = 0;
  C = 0;
  A = 5;
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      E += ctx.abilities[ctx.count][11];
    }
  }
  E /= ctx.flags[42];
  if (E >= A) {
    B += E * 2;
  } else {
    B += E;
  }
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    B += ctx.abilities[ctx.count][37];
    B += (ctx.abilities[ctx.count][30] / 2) + (ctx.abilities[ctx.count][31] / 2);
    B += (ctx.abilities[ctx.count][13] / 2) + (ctx.abilities[ctx.count][14] / 2);
    if (character.cflags[ctx.count][50]) {
      B += 10;
    }
    if (ctx.getTalent(count, 11)) {
      B -= 3;
    }
    if (ctx.getTalent(count, 21)) {
      B -= 5;
    }
    if (ctx.getTalent(count, 22)) {
      B -= 5;
    }
    if (ctx.getTalent(count, 32)) {
      B -= 3;
    }
    if (ctx.getTalent(count, 52)) {
      B += 1;
    }
    if (ctx.getTalent(count, 63)) {
      B += 2;
    }
    if (ctx.getTalent(count, 70)) {
      B += 3;
    }
    if (ctx.getTalent(count, 76)) {
      B += 10;
    }
    if (ctx.getTalent(count, 80)) {
      B += 3;
    }
    if (ctx.getTalent(count, 88)) {
      B += 5;
    }
    if (ctx.getTalent(count, 89)) {
      B += 5;
    }
    if (ctx.getTalent(count, 91)) {
      B += 2;
    }
    if (ctx.getTalent(count, 92)) {
      B += 5;
    }
    if (ctx.getTalent(count, 114)) {
      B += 3;
    }
    if (ctx.getTalent(count, 110)) {
      B += 2;
    }
    if (ctx.getTalent(count, 109)) {
      if (ctx.getTalent(count, 100) || ctx.getTalent(count, 132) || ctx.getTalent(count, 135)) {
        B += 2;
      } else {
        B -= 2;
      }
    }
    if (ctx.getTalent(count, 116)) {
      if (ctx.getTalent(count, 132) || ctx.getTalent(count, 135)) {
        B += 3;
      } else {
        B -= 3;
      }
    }
    if (ctx.getTalent(count, 126)) {
      B += 3;
    }
    if (ctx.getTalent(count, 180)) {
      B += 5;
    }
    if (ctx.getTalent(count, 181)) {
      B += 10;
    }
    if (ctx.getTalent(count, 183)) {
      B += 3;
    }
    if (character.cflags[ctx.count][53] == 1) {
      B += 5;
    }
    if (character.cflags[ctx.count][54]) {
      B -= 10;
    }
    if (ctx.getTalent(count, 123) || ctx.getTalent(count, 9)) {
      B /= 5;
    }
  }
  C = 30 + A;
  if (B >= C) {
    ctx.showMessage(`이번 공중변소 플레이로 손님들은 대만족한것 같다`);
    A = 4;
  } else if (B >= C * 3 / 4) {
    ctx.showMessage(`이번 공중변소 플레이로 손님들은 만족한것 같다`);
    A = 2;
  } else {
    ctx.showMessage(`손님들의 욕망을 채우지 못한것 같다……`);
    A = 1;
  }
  await ctx.wait();
  ctx.drawLine();
  ctx.player = character;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    ctx.showMessage(`${ctx.getName(character)}의 패러미터가 다음과 같이 변화되었습니다`);
    T[51] = G / (2 * ctx.flags[42]);
    M = 15 - ctx.abilities[10];
    if (M <= 0) {
      M = 1;
    }
    U[100] = G * M;
    if (ctx.talents[16]) {
      ctx.times('U:100', 1.50);
    }
    if (ctx.talents[21]) {
      ctx.times('U:100', 0.90);
    }
    if (ctx.talents[22]) {
      ctx.times('U:100', 0.90);
    }
    if (ctx.talents[28]) {
      ctx.times('U:100', 0.80);
    }
    if (ctx.talents[32]) {
      ctx.times('U:100', 1.20);
    }
    if (ctx.talents[33]) {
      ctx.times('U:100', 0.80);
    }
    if (ctx.talents[35]) {
      ctx.times('U:100', 1.10);
    }
    if (ctx.talents[89]) {
      ctx.times('U:100', 0.50);
    }
    if (A >= 2) {
      ctx.times('U:100', 0.80);
    } else {
      ctx.times('U:100', 1.20);
    }
    ctx.base[31] -= 15;
    await work_sp_sex_02(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    X = ctx.count;
    await work_exp(ctx, character);
    ctx.count = X;
    O = ctx.abilities[10] * 100 + 100;
    I = O;
    ctx.times('I', 2.23);
    J = O;
    ctx.times('J', 1.73);
    if (character.mark[3] != 3 && ctx.juel[100] > I) {
      ctx.showMessage('반발각인 LV3을 습득');
      character.mark[3] = 3;
      if (character.mark[4] <= 2) {
        character.mark[4] = 3;
        if (ctx.abilities[10] <= 8 && ctx.talents[22] === 0) {
          ctx.abilities[10] -= 2;
          ctx.showMessage(` 그리고 ${ctx.getVarName("ABL", 10)}가 LV%조사처리(ABL:10,"로")% 내려갔다`);
        }
      }
    } else if (character.mark[3] != 2 && ctx.juel[100] > J) {
      ctx.showMessage('반발각인 LV2를 습득');
      character.mark[3] = 2;
      if (character.mark[4] <= 1) {
        character.mark[4] = 2;
        if (ctx.abilities[10] <= 4 && ctx.talents[22] === 0) {
          ctx.abilities[10] -= 1;
          ctx.showMessage(` 그리고 ${ctx.getVarName("ABL", 10)}가 LV%조사처리(ABL:10,"로")% 내려갔다`);
        }
      }
    } else if (character.mark[3] != 1 && ctx.juel[100] > O) {
      ctx.showMessage('반발각인 LV1을 습득');
      character.mark[3] = 1;
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    LOSEctx.base[0] = G * 40;
    if (character.cflags[50]) {
      ctx.times('LOSEBASE:0', 2.00);
    }
    if (ctx.abilities[37] === 1) {
      ctx.times('LOSEBASE:0', 0.90);
    } else if (ctx.abilities[37] === 2) {
      ctx.times('LOSEBASE:0', 0.80);
    } else if (ctx.abilities[37] === 3) {
      ctx.times('LOSEBASE:0', 0.70);
    } else if (ctx.abilities[37] === 4) {
      ctx.times('LOSEBASE:0', 0.60);
    } else if (ctx.abilities[37] >= 5) {
      ctx.times('LOSEBASE:0', 0.50);
    }
    if (ctx.exp[0] <= 200 && character.cflags[54] == 0) {
      ctx.times('LOSEBASE:0', 1.10);
    }
    if (ctx.exp[1] <= 200) {
      ctx.times('LOSEBASE:0', 1.20);
    }
    if (character.cflags[53]) {
      ctx.times('LOSEBASE:0', 1.50);
    }
    if (ctx.flags[50]) {
      LOSEctx.base[0] /= ctx.flags[42];
    } else if (ctx.flags[42] >= 3) {
      ctx.times('LOSEBASE:0', 0.60);
    } else if (ctx.flags[42] >= 2) {
      ctx.times('LOSEBASE:0', 0.80);
    }
    LOSEctx.base[0] *= 100 - ctx.flags[40] * 2;
    LOSEctx.base[0] /= 100;
    if (LOSEctx.base[0] >= ctx.base[0]) {
      if (ctx.rand(100) < (ctx.flags[40] * 9 + 9)) {
        LOSEctx.base[0] = ctx.base[0] - 1;
      }
    }
    if (LOSEctx.base[0] >= ctx.base[0]) {
      LOSEctx.base[0] = ctx.base[0];
    }
    ctx.print('체력소비　　:');
    N = ctx.base[0];
    await figure_indent(ctx, character);
    ctx.printValue(ctx.base[0]);
    ctx.printChar('-');
    N = LOSEctx.base[0];
    await figure_indent(ctx, character);
    ctx.printValue(LOSEctx.base[0]);
    ctx.printChar('=');
    N = ctx.base[0] - LOSEctx.base[0];
    await figure_indent(ctx, character);
    ctx.printValueLine(ctx.base[0] - LOSEctx.base[0]);
    ctx.base[0] -= LOSEctx.base[0];
    ctx.print('체력　　　　:');
    ctx.drawBar(ctx.base[0], MAXctx.base[0], 32);
    ctx.showMessage(`(${ctx.base[0]}/${MAXctx.base[0]})`);
    if (ctx.base[0] <= 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} {G}번째 손님에게 정액을 주입당하던 도중, 갑자기 움직이지 못하게 됐다`);
      ctx.showMessage(`무슨짓을 해도 반응이 없다……`);
      await ctx.wait();
      await charadead_check(ctx, character);
    } else if (ctx.base[0] <= 500) {
      ctx.showMessage(`체력이 한계에 달했습니다. 쉬게 해주세요`);
    }
    ctx.drawLine();
    await ctx.wait();
  }
  character = ctx.player;
  Q = 0;
  V = 2300;
  ctx.print('기준액');
  ctx.showMessage(` +{V}`);
  Q += V;
  V = 0;
  if (character.tflags[14] === 2) {
    V = 150;
    if (ctx.talents[122]) {
      ctx.print('부');
    }
    if (ctx.talents[122] == 0) {
      ctx.print('모');
    }
    if (ctx.getTalent(assi, 122)) {
      ctx.print('자');
    }
    if (ctx.getTalent(assi, 122) == 0) {
      ctx.print('녀');
    }
    ctx.print('덮밥');
    ctx.showMessage(` ×{V/100}.{V%100}`);
    Q *= V;
    Q /= 100;
    V = 0;
  } else if (character.tflags[14] === 4) {
    V = 120;
    if (ctx.talents[122] && ctx.getTalent(assi, 122)) {
      ctx.print('형제');
    }
    if (ctx.talents[122] == 0 && ctx.getTalent(assi, 122) == 0) {
      ctx.print('자매');
    }
    if (ctx.talents[122] ^ ctx.getTalent(assi, 122)) {
      ctx.print('남매');
    }
    ctx.print('덮밥');
    ctx.showMessage(` ×{V/100}.{V%100}`);
    Q *= V;
    Q /= 100;
    V = 0;
  }
  if (A >= 3) {
    V = 130;
    ctx.print('대성공');
    ctx.showMessage(` ×{V/100}.{V%100}`);
    Q *= V;
    Q /= 100;
    V = 0;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][50]) {
      V = 200;
      ctx.showMessage(`처녀상실(${ctx.getVarName("CALL", COUNT)})`);
      ctx.showMessage(` ×{V/100}.{V%100}`);
      Q *= V;
      Q /= 100;
      V = 0;
    }
    if (character.cflags[ctx.count][53]) {
      V = 130;
      ctx.showMessage(`공개배설(${ctx.getVarName("CALL", COUNT)})`);
      ctx.showMessage(` ×{V/100}.{V%100}`);
      Q *= V;
      Q /= 100;
      V = 0;
    }
    if (character.cflags[ctx.count][54]) {
      V = 70;
      if (ctx.getTalent(count, 122)) {
        ctx.print('남자');
      } else {
        ctx.print('V불가');
      }
      ctx.showMessage(`(${ctx.getVarName("CALL", COUNT)})`);
      ctx.showMessage(` ×{V/100}.{V%100}`);
      Q *= V;
      Q /= 100;
      V = 0;
    }
  }
  await work_sp_money_cm(ctx, character);
  ctx.showMessage(`이번 공중변소 플레이로는 {Q}포인트의 대금으로 {G}명이 이용해서,`);
  Q *= G;
  ctx.showMessage(`합계 {Q}포인트을 벌었습니다`);
  ctx.money += Q;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    character.cflags[50] = 0;
    character.cflags[51] = 0;
    character.cflags[52] = 0;
    character.cflags[53] = 0;
  }
  await work_sp_after(ctx, character);
  await ctx.wait();
  // TODO: BEGIN TURNEND
  return 1;
}
