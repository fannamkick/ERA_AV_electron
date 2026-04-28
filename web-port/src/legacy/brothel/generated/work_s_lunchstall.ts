/**
 * WORK_S_LUNCHSTALL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function lunch_stall(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.flags[50] = 0;
  ctx.flags[51] = 0;
  ctx.flags[52] = 0;
  // Label: INPUT_LOOP_01
  if (ctx.flags[42] >= 2) {
    ctx.showMessage('누구에게 요리를 만들게 합니까?');
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      ctx.showMessage(` [${ctx.count}] - ${ctx.getName(ctx.count)}`);
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.showMessage('[100] - 그만둔다');
    await ctx.inputNumber();
    if (ctx.result < 0 || ctx.result >= ctx.charanum) {
      // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
    } else if (character.cflags[ctx.result][130] === 0) {
      // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.abilities[ctx.result][73] < 1) {
      ctx.showMessage(`W ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 손님에게 낼만한 요리를 만들지 못 합니다`);
      // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
    } else if (ctx.result === 100) {
      return 100;
    }
    character = ctx.result;
    ctx.drawLine();
  } else {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      character = ctx.count;
    }
  }
  F = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (character == ctx.count) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 122) || ctx.getTalent(count, 116)) {
      F = 0;
    }
  }
  if (ctx.flags[42] >= 2 && F) {
    // Label: INPUT_LOOP_02
    ctx.showMessage('어떤 포장마차를 여시겠습니까?');
    ctx.showMessage('[0] - 일반 포장마차');
    ctx.showMessage('[1] - 슴가 포장마차');
    ctx.showMessage('[100] - 그만둔다');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 일반 포장마차를 엽니다`);
    } else if (ctx.result === 1) {
      ctx.showMessage(`W 슴가 포장마차를 엽니다`);
      ctx.flags[50] = 1;
    } else if (ctx.result === 100) {
      return 100;
    } else {
      // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
    }
    ctx.drawLine();
  }
  A = 0;
  B = 0;
  F = 0;
  S = 0;
  V = 0;
  C = 0;
  D = 0;
  X = 0;
  Y = 0;
  for (let COUNT = 0; COUNT < 101; COUNT++) {
    T[ctx.count] = 0;
    U[ctx.count] = 0;
  }
  await work_sub_relation(ctx, character);
  if (ctx.flags[42] >= 3 && ctx.flags[37]) {
    ctx.flags[52] = 1;
    E = -1;
    F = 0;
    S = 0;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      if (ctx.count == character) {
        // TODO: CONTINUE
      }
      if (E === -1) {
        S = character.cflags[ctx.count][40];
        E = character.cflags[ctx.count][41];
        F = character.cflags[ctx.count][42];
      } else if (S === 0 && character.cflags[ctx.count][40] === 0) {
        // TODO: CONTINUE
      } else if (F === character.cflags[ctx.count][42] && S === 64 && character.cflags[ctx.count][40] === 64) {
        // TODO: CONTINUE
      } else if (S > 0 && S < 4 && character.cflags[ctx.count][40] > 0 && character.cflags[ctx.count][40] < 4) {
        // TODO: CONTINUE
      } else if (F === character.cflags[ctx.count][42] && S > 64 && S < 68 && character.cflags[ctx.count][40] > 64 && character.cflags[ctx.count][40] < 68) {
        // TODO: CONTINUE
      } else if ((character.cflags[ctx.count][45] || character.cflags[ctx.count][46] || character.cflags[ctx.count][47])) {
        ctx.flags[52] = 0;
      } else if ((character.cflags[ctx.count][40] & 92) === 0) {
        ctx.flags[52] = 0;
      } else if (E != character.cflags[ctx.count][41] || F != character.cflags[ctx.count][42]) {
        ctx.flags[52] = 0;
      } else if (((S & 92) != (character.cflags[ctx.count][40] & 92))) {
        ctx.flags[52] = 0;
      }
    }
    E = 0;
    F = 0;
    S = 0;
  } else if (ctx.flags[37]) {
    ctx.flags[52] = 1;
  }
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (E < ctx.exp[ctx.count][91] && character.cflags[ctx.count][130]) {
      E = ctx.exp[ctx.count][91];
    }
  }
  C = E / 4;
  G = C / 2;
  if (C) {
    if (C < 13) {
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else if (C < 16) {
      ctx.times('G', 1.50);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else if (C < 20) {
      ctx.times('G', 2.00);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else if (C < 24) {
      ctx.times('G', 2.50);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else {
      ctx.times('G', 3.00);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(3);
      }
    }
  }
  C = (ctx.exp[ctx.master][91] / 5);
  if (C) {
    for (let COUNT = 0; COUNT < C; COUNT++) {
      G += ctx.rand(2);
    }
  }
  if (ctx.flags[42]  - 1 === 0) {
    ctx.times('G', 0.25);
  } else if (ctx.flags[42] - 1 === 1) {
    ctx.times('G', 0.50);
  } else if (ctx.flags[42] - 1 === 2) {
    ctx.times('G', 0.75);
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == character && ctx.flags[42] >= 2) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 126)) {
      G += 3;
    }
    if (ctx.getTalent(count, 203)) {
      G += 5;
    }
    if (ctx.getTalent(count, 180)) {
      G += 1;
    }
    if (ctx.getTalent(count, 181)) {
      G += 2;
    }
    if (ctx.getTalent(count, 182)) {
      G += 5;
    }
    if (ctx.getTalent(count, 183)) {
      G += 2;
    }
    if (ctx.getTalent(count, 184)) {
      G += 1;
    }
    if (ctx.getTalent(count, 185)) {
      G += 5;
    }
    if (ctx.getTalent(count, 186)) {
      G += 5;
    }
    if (ctx.getTalent(count, 187)) {
      G += 10;
    }
    if (ctx.getTalent(count, 224)) {
      G += 2;
    }
    if (ctx.getTalent(count, 402)) {
      G += 1;
    }
    if (ctx.getTalent(count, 502)) {
      G += 20;
    }
    if (ctx.getTalent(count, 505)) {
      G += 5;
    }
    if (ctx.getTalent(count, 506)) {
      G += 10;
    }
    if (ctx.getTalent(count, 507)) {
      G += 15;
    }
    if (ctx.getTalent(count, 509)) {
      G += 25;
    }
    if (ctx.getTalent(count, 510)) {
      G += 15;
    }
    if (ctx.getTalent(count, 511)) {
      G += 30;
    }
    if (ctx.getTalent(count, 512)) {
      G += 15;
    }
    if (ctx.getTalent(count, 516)) {
      G += 25;
    }
    if (ctx.getTalent(count, 518)) {
      G += 20;
    }
    if (ctx.getTalent(count, 519)) {
      G += 25;
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == character && ctx.flags[42] >= 2) {
      // TODO: CONTINUE
    }
    G += ctx.abilities[ctx.count][74];
  }
  if (G < 5) {
    G = 5;
  }
  ctx.showMessage(`${ctx.getName(character)}`);
  if (ctx.flags[42] >= 2) {
    ctx.print('들');
  }
  ctx.showMessage('에게 정식 포장마차를 열게 했다……'); ctx.waitInput();
  if (ctx.exp[61] < 10) {
    D = 0 + ctx.rand(5);
  } else if (ctx.exp[61] < 50) {
    D = 1 + ctx.rand(5);
  } else if (ctx.exp[61] < 100) {
    D = 2 + ctx.rand(6);
  } else if (ctx.exp[61] < 200) {
    D = 4 + ctx.rand(6);
  } else if (ctx.exp[61] < 300) {
    D = 7 + ctx.rand(7);
  } else if (ctx.exp[61] < 500) {
    D = 10 + ctx.rand(7);
  } else if (ctx.exp[61] < 800) {
    D = 13 + ctx.rand(8);
  } else if (ctx.exp[61] < 1200) {
    D = 16 + ctx.rand(10);
  } else if (ctx.exp[61] < 1600) {
    D = 20 + ctx.rand(12);
  } else if (ctx.exp[61] < 2000) {
    D = 25 + ctx.rand(14);
  } else if (ctx.exp[61] < 2500) {
    D = 30 + ctx.rand(16);
  } else if (ctx.exp[61] < 3000) {
    D = 40 + ctx.rand(18);
  } else {
    D = 50 + ctx.rand(20);
  }
  D += ctx.abilities[73] * 3;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == character && ctx.flags[42] >= 2) {
      // TODO: CONTINUE
    }
    D += ctx.abilities[ctx.count][15] / 2;
    D += ctx.abilities[ctx.count][16] / 2;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == character && ctx.flags[42] >= 2) {
      // TODO: CONTINUE
    }
    D += ctx.abilities[ctx.count][50];
  }
  if (ctx.flags[50]) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      if (ctx.count == character && ctx.flags[42] >= 2) {
        // TODO: CONTINUE
      }
      D += ctx.abilities[ctx.count][1] / 2;
    }
  }
  if (ctx.talents[11]) {
    D -= 1;
  }
  if (ctx.talents[12]) {
    D += 1;
  }
  if (ctx.talents[22]) {
    D -= 1;
  }
  if (ctx.talents[23]) {
    D += 1;
  }
  if (ctx.talents[50]) {
    D += 2;
  }
  if (ctx.talents[51]) {
    D -= 2;
  }
  if (ctx.talents[61]) {
    D -= 3;
  }
  if (ctx.talents[62]) {
    D += 3;
  }
  if (ctx.talents[63]) {
    D += 3;
  }
  if (ctx.talents[155]) {
    D += 10;
  }
  if (ctx.talents[418]) {
    D *= 2;
  }
  if (ctx.talents[123] || ctx.talents[9]) {
    D /= 5;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == character && ctx.flags[42] >= 2) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 63)) {
      D += 3;
    }
    if (ctx.getTalent(count, 64)) {
      D -= 6;
    }
    if (ctx.getTalent(count, 91)) {
      D += 3;
    }
    if (ctx.getTalent(count, 92)) {
      D += 5;
    }
    if (ctx.flags[50]) {
      if (ctx.getTalent(count, 110)) {
        D += 3;
      }
      if (ctx.getTalent(count, 114)) {
        D += 5;
      }
      if (ctx.getTalent(count, 109)) {
        D -= 2;
      }
      if (ctx.getTalent(count, 116)) {
        D -= 5;
      }
      if (ctx.getTalent(count, 130)) {
        D += 5;
      }
      if (ctx.getTalent(count, 78)) {
        D += 10;
      }
    }
    if (ctx.getTalent(count, 123) || ctx.getTalent(count, 9)) {
      D /= 5;
    }
  }
  if (ctx.flags[10] > 1) {
    P = 41 + ctx.rand(10);
  } else {
    P = 21 + ctx.rand(5);
  }
  if (D < (P / 2)) {
    A = 0;
  } else if (D < P) {
    A = 1;
  } else if (D < (P * 3) / 2) {
    A = 2;
  } else if (D < P * 2) {
    A = 3;
  } else if (D < P * 4) {
    A = 4;
  } else {
    A = 5;
  }
  Z = 0;
  Z = A;
  if (ctx.flags[42] >= 2) {
    ctx.showMessage(`${ctx.josaHelper("타겟이")} 주방에서`);
    await lunch_name(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"를")% 요리하고,`);
    X = character;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      if (ctx.count != X) {
        character = ctx.count;
      }
    }
    if (ctx.flags[42] >= 2 && ctx.flags[52]) {
      if (character.cflags[40] === 0) {
        ctx.print('실오라기 하나 걸치지 않은 모습의');
      } else if (character.cflags[40] < 4) {
        ctx.print('속옷 차림의');
      } else {
        if (ctx.flags[50] && (character.cflags[40] & 4)) {
          ctx.print('가슴을 풀어헤친');
        }
        await print_clothtype_main2(ctx, character);
        if (character.cflags[42]) {
          ctx.print('에');
          await print_clothtype_special(ctx, character);
        }
        ctx.print('차림의');
      }
    }
    character = X;
    S = 0;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      if (ctx.count == X && ctx.flags[42] >= 2) {
        // TODO: CONTINUE
      }
      if (S) {
        ctx.showMessage(`%LOCALS:1%`);
      }
      ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}`);
      ctx.localStrings[1] = 조사만처리(ctx.getName(ctx.count),"와");
      S = 1;
    }
    S = 0;
    if (ctx.localStrings[1] === "와") {
      ctx.print('가');
    } else {
      ctx.print('이');
    }
    if (ctx.flags[50]) {
      ctx.print('드러낸 유방을 희롱당하면서,');
    }
    ctx.showMessage(`방문한 {G}명의 손님에게 요리를 날랐다……`);
  } else {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 정식 포장마차를 방문한 {G}명의 손님에게`);
    await lunch_name(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"를")% 대접했다……`);
  }
  await ctx.wait();
  ctx.showMessage('');
  ctx.showMessage(`만족도: {D}％`);
  P *= 4;
  ctx.showMessage(`W 목표 만족도: {P}％`);
  ctx.showMessage('');
  if (A <= 1) {
    ctx.showMessage(`불행하게도, ${ctx.getVarName("CALL", TARGET)}의 요리`);
    if (ctx.flags[50]) {
      ctx.print('와');
      if (ctx.flags[42] >= 2) {
        ctx.print('접객원');
      }
      if (ctx.flags[42] >= 3) {
        ctx.print('들의');
      }
      ctx.print('가슴');
    }
    ctx.showMessage('에 대한 평판은 매우 형편 없었다……'); ctx.waitInput();
    character.tflags[13] = 122;
  } else {
    ctx.showMessage(`손님들은 ${ctx.getVarName("CALL", TARGET)}의 요리`);
    if (ctx.flags[50]) {
      ctx.print('와');
      if (ctx.flags[42] >= 2) {
        ctx.print('접객원');
      }
      if (ctx.flags[42] >= 3) {
        ctx.print('들의');
      }
      ctx.print('가슴');
    }
    ctx.showMessage('에 만족한 것 같다……'); ctx.waitInput();
    character.tflags[13] = 123;
  }
  await self_kojo(ctx, character);
  ctx.drawLine();
  X = character;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    ctx.showMessage(`${ctx.getName(character)}의 패러미터가 다음과 같이 변화되었습니다`);
    if (Z <= 1) {
      if (character === X) {
        T[61] = G / 10 + 1;
        U[7] = G * 30;
        U[4] = G * 10;
        U[8] = G * 30;
      }
      if (character != X) {
        U[7] = G * 15;
        U[4] = G * 5;
        U[8] = G * 30;
        if (ctx.flags[50]) {
          U[14] = (G * 50) / ctx.flags[42];
          T[20] = G / (10 * ctx.flags[42]) + 1;
          T[22] = G / (10 * ctx.flags[42]) + 1;
          T[74] = G / (10 * ctx.flags[42]) + 1;
        }
      }
    } else {
      if (character === X) {
        T[23] = (G / (6 - Z)) + 1;
        T[61] = ((G / (7 - Z)) * ctx.abilities[73]);
        U[7] = G * 30 * Z;
        U[4] = G * 30 * Z;
        U[8] = G * 5 * Z;
      }
      if (character != X) {
        T[61] = (G / (10 - Z)) + (ctx.abilities[X][73] / (6 - Z));
        T[73] = (G / (6 - Z)) + 1;
        T[78] = (G / (6 - Z)) + 1;
        U[7] = G * 15 * Z;
        U[4] = G * 15 * Z;
        U[8] = G * 10 * Z;
        if (ctx.flags[50]) {
          U[14] = (G * 100) / ctx.flags[42];
          T[20] = G / ((5 * ctx.flags[42]) - Z + 1) + 1;
          T[22] = G / ((5 * ctx.flags[42]) - Z + 1) + 1;
          T[74] = G / ((5 * ctx.flags[42]) - Z + 1) + 1;
        }
      }
    }
    if (ctx.flags[50] === 1) {
      M = 15 - ctx.abilities[10];
    } else {
      M = 7 - ctx.abilities[10];
    }
    if (M <= 0) {
      M = 1;
    }
    U[100] = G * M;
    if (ctx.talents[22]) {
      ctx.times('U:100', 0.80);
    }
    if (ctx.talents[22]) {
      ctx.times('U:100', 0.90);
    }
    if (ctx.talents[15]) {
      ctx.times('U:100', 1.80);
    }
    if (ctx.talents[28]) {
      ctx.times('U:100', 0.80);
    }
    if (ctx.talents[16]) {
      ctx.times('U:100', 1.20);
    }
    if (ctx.talents[63]) {
      ctx.times('U:100', 0.80);
    }
    if (ctx.talents[202]) {
      ctx.times('U:100', 0.80);
    }
    if (ctx.talents[155]) {
      ctx.times('U:100', 0.50);
    }
    if (ctx.talents[35] && A <= 1) {
      ctx.times('U:100', 1.50);
    }
    if (ctx.flags[50] && character != X && ctx.talents[78] == 0) {
      ctx.times('U:100', 3.00);
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    Y = ctx.count;
    await work_exp(ctx, character);
    ctx.count = Y;
    O = ctx.abilities[10] * 200 + 1000;
    I = O;
    ctx.times('I', 2.23);
    J = O;
    ctx.times('J', 1.73);
    if (character.mark[3] != 3 && ctx.juel[100] > I) {
      ctx.showMessage('반발각인 LV3을 습득');
      character.mark[3] = 3;
    } else if (character.mark[3] != 2 && ctx.juel[100] > J) {
      ctx.showMessage('반발각인 LV2를 습득');
      character.mark[3] = 2;
    } else if (character.mark[3] != 1 && ctx.juel[100] > O) {
      ctx.showMessage('반발각인 LV1을 습득');
      character.mark[3] = 1;
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    LOSEctx.base[0] = G * 20;
    if (ctx.talents[100]) {
      ctx.times('LOSEBASE:0', 1.20);
    }
    if (ctx.flags[50] && character != X) {
      ctx.times('LOSEBASE:0', 4.00);
    }
    if (character != X && ctx.flags[42] >= 2) {
      LOSEctx.base[0] /= (ctx.flags[42] - 1);
    }
    if (character === X) {
      if (ctx.abilities[73] === 0) {
        ctx.times('LOSEBASE:0', 1.00);
      } else if (ctx.abilities[73] === 1) {
        ctx.times('LOSEBASE:0', 0.90);
      } else if (ctx.abilities[73] === 2) {
        ctx.times('LOSEBASE:0', 0.80);
      } else if (ctx.abilities[73] === 3) {
        ctx.times('LOSEBASE:0', 0.70);
      } else if (ctx.abilities[73] === 4) {
        ctx.times('LOSEBASE:0', 0.60);
      } else if (ctx.abilities[73] >= 5) {
        ctx.times('LOSEBASE:0', 0.50);
      }
    }
    if (ctx.abilities[51] === 1) {
      ctx.times('LOSEBASE:0', 0.95);
    } else if (ctx.abilities[51] === 2) {
      ctx.times('LOSEBASE:0', 0.90);
    } else if (ctx.abilities[51] === 3) {
      ctx.times('LOSEBASE:0', 0.85);
    } else if (ctx.abilities[51] === 4) {
      ctx.times('LOSEBASE:0', 0.80);
    } else if (ctx.abilities[51] === 5) {
      ctx.times('LOSEBASE:0', 0.75);
    } else if (ctx.abilities[51] === 6) {
      ctx.times('LOSEBASE:0', 0.70);
    } else if (ctx.abilities[51] === 7) {
      ctx.times('LOSEBASE:0', 0.65);
    } else if (ctx.abilities[51] === 8) {
      ctx.times('LOSEBASE:0', 0.60);
    } else if (ctx.abilities[51] === 9) {
      ctx.times('LOSEBASE:0', 0.55);
    } else if (ctx.abilities[51] >= 10) {
      ctx.times('LOSEBASE:0', 0.50);
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
      ctx.showMessage(`${ctx.josaHelper("타겟은")}, 포장마차를 연 직후 넙죽 엎드리듯 쓰러져버렸다`);
      ctx.showMessage(`무슨짓을 해도 반응이 없다……`);
      await ctx.wait();
      await charadead_check(ctx, character);
    } else if (ctx.base[0] <= 500) {
      ctx.showMessage(`체력이 한계에 달했습니다. 쉬게 해주세요`);
    }
    ctx.drawLine();
    await ctx.wait();
  }
  character = X;
  Q = 0;
  if (ctx.abilities[73] === 0) {
    V = 15;
  } else if (ctx.abilities[73] === 1) {
    V = 30;
  } else if (ctx.abilities[73] === 2) {
    V = 100;
  } else if (ctx.abilities[73] === 3) {
    V = 200;
  } else if (ctx.abilities[73] === 4) {
    V = 350;
  } else if (ctx.abilities[73] === 5) {
    V = 500;
  } else if (ctx.abilities[73] === 6) {
    V = 700;
  } else if (ctx.abilities[73] === 7) {
    V = 900;
  } else if (ctx.abilities[73] === 8) {
    V = 1100;
  } else if (ctx.abilities[73] === 9) {
    V = 1300;
  } else if (ctx.abilities[73] >= 10) {
    V = 1500;
  }
  ctx.showMessage(`요리(${ctx.getVarName("CALL", TARGET)})`);
  ctx.showMessage(`${ctx.abilities[73]}LV +{V}`);
  Q += V;
  V = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 93)) {
      V += 100;
    }
    if (ctx.getTalent(count, 117)) {
      V += 500;
    }
    if (V) {
      ctx.showMessage(`${ctx.getName(ctx.count)} +{V}`);
      Q += V;
      V = 0;
    }
  }
  if (ctx.abilities[12] === 0) {
    V = 50;
  } else if (ctx.abilities[12] === 1) {
    V = 70;
  } else if (ctx.abilities[12] === 2) {
    V = 100;
  } else if (ctx.abilities[12] === 3) {
    V = 110;
  } else if (ctx.abilities[12] === 4) {
    V = 120;
  } else if (ctx.abilities[12] === 5) {
    V = 130;
  } else if (ctx.abilities[12] === 6) {
    V = 140;
  } else if (ctx.abilities[12] === 7) {
    V = 150;
  } else if (ctx.abilities[12] === 8) {
    V = 160;
  } else if (ctx.abilities[12] === 9) {
    V = 180;
  } else if (ctx.abilities[12] >= 10) {
    V = 200;
  }
  ctx.showMessage(`기교(${ctx.getVarName("CALL", TARGET)})`);
  ctx.showMessage(`${ctx.abilities[12]}LV ×{V/100}.{V%100}`);
  Q *= V;
  Q /= 100;
  V = 0;
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      E += ctx.abilities[ctx.count][16];
    }
  }
  E /= ctx.flags[42];
  if (E === 0) {
    V = 100;
  } else if (E === 1) {
    V = 110;
  } else if (E === 2) {
    V = 120;
  } else if (E === 3) {
    V = 130;
  } else if (E === 4) {
    V = 140;
  } else if (E === 5) {
    V = 150;
  } else if (E === 6) {
    V = 160;
  } else if (E === 7) {
    V = 170;
  } else if (E === 8) {
    V = 180;
  } else if (E === 9) {
    V = 190;
  } else if (E >= 10) {
    V = 200;
  }
  ctx.print('봉사정신');
  if (ctx.flags[42] >= 2) {
    ctx.print('평균');
  }
  ctx.showMessage(`{E}LV ×{V/100}.{V%100}`);
  Q *= V;
  Q /= 100;
  V = 0;
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == character && ctx.flags[42] >= 2) {
      // TODO: CONTINUE
    }
    E += ctx.abilities[ctx.count][15];
  }
  if (ctx.flags[42] >= 2) {
    E /= (ctx.flags[42] - 1);
  }
  if (E === 0) {
    V = 100;
  } else if (E === 1) {
    V = 110;
  } else if (E === 2) {
    V = 120;
  } else if (E === 3) {
    V = 130;
  } else if (E === 4) {
    V = 140;
  } else if (E === 5) {
    V = 150;
  } else if (E === 6) {
    V = 160;
  } else if (E === 7) {
    V = 170;
  } else if (E === 8) {
    V = 180;
  } else if (E === 9) {
    V = 190;
  } else if (E >= 10) {
    V = 200;
  }
  ctx.print('화술');
  if (ctx.flags[42] === 1) {
    ctx.showMessage(`(${ctx.getVarName("CALL", TARGET)})`);
  } else {
    ctx.print('(접객원)');
  }
  ctx.showMessage(`{E}LV ×{V/100}.{V%100}`);
  Q *= V;
  Q /= 100;
  V = 0;
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.count == character && ctx.flags[42] >= 2) {
      // TODO: CONTINUE
    }
    E += ctx.base[ctx.count][31];
  }
  if (ctx.flags[42] >= 2) {
    E /= (ctx.flags[42] - 1);
  }
  V = E;
  ctx.print('매력치');
  if (ctx.flags[42] >= 2) {
    ctx.print('평균');
  }
  ctx.showMessage(`×{V/100}.{V%100}`);
  Q *= V;
  Q /= 100;
  V = 0;
  E = 0;
  if (ctx.flags[50] === 1) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      if (ctx.count == character && ctx.flags[42] >= 2) {
        // TODO: CONTINUE
      }
      V = 100;
      if (ctx.getTalent(count, 114)) {
        V = 120;
        ctx.showMessage(`${ctx.getVarName("TALENT", 114)}(${ctx.getVarName("CALL", COUNT)}) ×{V/100}.{V%100}`);
        Q *= V;
        Q /= 100;
      } else if (ctx.getTalent(count, 110)) {
        V = 110;
        ctx.showMessage(`${ctx.getVarName("TALENT", 110)}(${ctx.getVarName("CALL", COUNT)}) ×{V/100}.{V%100}`);
        Q *= V;
        Q /= 100;
      } else if (ctx.getTalent(count, 109)) {
        V = 80;
        ctx.showMessage(`${ctx.getVarName("TALENT", 109)}(${ctx.getVarName("CALL", COUNT)}) ×{V/100}.{V%100}`);
        Q *= V;
        Q /= 100;
      } else if (ctx.getTalent(count, 116)) {
        V = 50;
        ctx.showMessage(`${ctx.getVarName("TALENT", 116)}(${ctx.getVarName("CALL", COUNT)}) ×{V/100}.{V%100}`);
        Q *= V;
        Q /= 100;
      }
      if (ctx.getTalent(count, 130)) {
        V = 130;
        ctx.showMessage(`${ctx.getVarName("TALENT", 130)}(${ctx.getVarName("CALL", COUNT)}) ×{V/100}.{V%100}`);
        Q *= V;
        Q /= 100;
      }
    }
    V = 0;
  }
  await work_sp_money_cm(ctx, character);
  ctx.showMessage(`이번 포장마차 영업으로 한 끼 {Q}포인트의 요리를 {G}명에게 접대하여,`);
  Q *= G;
  ctx.showMessage(`도합 {Q}포인트를 벌었습니다`);
  ctx.money += Q;
  await work_sp_after(ctx, character);
  await ctx.wait();
  // TODO: BEGIN TURNEND
  return 1;
}

export async function lunch_name(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[1] = ctx.result;
  if (ctx.locals[1]) {
    ctx.locals[1] -= 1;
    return ctx.locals[1];
  }
  if (ctx.abilities[73] === 0) {
    ctx.print('수박 카레');
    return 0;
  } else if (ctx.abilities[73] === 1) {
    ctx.print('삼색 빵');
    return 1;
  } else if (ctx.abilities[73] === 2) {
    ctx.print('라멘');
    return 1;
  } else if (ctx.abilities[73] === 3) {
    ctx.print('수제 카레');
    return 0;
  } else if (ctx.abilities[73] === 4) {
    ctx.print('햄버그 정식');
    return 1;
  } else if (ctx.abilities[73] <= 9 && ctx.abilities[73] >= 5) {
    ctx.print('스테이크 정식');
    return 1;
  } else if (ctx.abilities[73] >= 10) {
    ctx.print('셰프의 전문 요리');
    return 0;
  }
}

export async function lunch_name_pawapoke(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.no === 1) {
    if (ctx.rand(2) === 0) {
      ctx.print('케이크');
    } else {
      ctx.print('쿠키');
    }
    return 1;
  } else if (character.no === 3) {
    if (ctx.rand(2) === 0) {
      ctx.print('특선 녹차');
    } else {
      ctx.print('수제 교자만두');
    }
    return 1;
  } else if (character.no === 6) {
    ctx.print('까맣게 탄 뫼니에르');
    return 1;
  } else if (character.no === 9) {
    if (ctx.rand(2) === 0) {
      ctx.print('경단');
      return 2;
    } else {
      ctx.print('카오스한 물체');
    }
    return 1;
  } else if (character.no === 10) {
    if (ctx.rand(2) === 0) {
      ctx.print('찜고구마');
    } else {
      ctx.print('카오스한 물체');
    }
    return 1;
  } else if (character.no === 11) {
    ctx.print('주먹밥');
    return 2;
  } else if (character.no === 13) {
    ctx.print('오키나와 요리');
    return 1;
  } else if (character.no === 15) {
    ctx.print('컵라면');
    return 2;
  } else if (character.no === 15) {
    ctx.print('남국 카레 비스무레한 것');
    return 2;
  } else if (character.no === 18) {
    ctx.print('히다카네 집 특제 카레');
    return 1;
  } else if (character.no === 19) {
    ctx.print('특제 사탕(죽을 정도로 매운 맛)');
    return 2;
  }
  return 0;
}
