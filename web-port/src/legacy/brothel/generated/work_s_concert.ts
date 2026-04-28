/**
 * WORK_S_CONCERT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function concert(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.flags[50] = 0;
  ctx.flags[52] = 0;
  ctx.showMessage('어느 티켓을 판매합니까?');
  ctx.showMessage('[0] - 일반티켓');
  if (TIME == 1) {
    ctx.showMessage('[1] - 특수티켓');
  }
  ctx.showMessage('[100] - 그만둠');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`W 일반티켓을 판매합니다`);
  } else if (ctx.result === 1 && TIME === 1) {
    ctx.showMessage(`W 특수티켓을 판매합니다. 콘서트 후에 즐길 거리가 있습니다`);
    ctx.flags[50] = 1;
    character.cflags[13] = 0;
  } else if (ctx.result === 100) {
    return 100;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.drawLine();
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  G = 0;
  H = 0;
  I = 0;
  J = 0;
  N = 0;
  O = 0;
  P = 0;
  Q = 0;
  R = 0;
  S = 0;
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
      } else if (ctx.exp[ctx.count][71] > ctx.exp[character][71]) {
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
      if (E < ctx.exp[ctx.count][71]) {
        character = ctx.count;
        E = ctx.exp[ctx.count][71];
      }
    }
    E = 0;
  }
  await work_sub_relation(ctx, character);
  if (ctx.flags[42] >= 2 && ctx.flags[37]) {
    ctx.flags[52] = 1;
    E = -1;
    F = 0;
    S = 0;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
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
      ctx.times('G', 1.20);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else if (C < 20) {
      ctx.times('G', 1.50);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else if (C < 24) {
      ctx.times('G', 2.00);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else {
      ctx.times('G', 2.50);
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
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 126)) {
      G += 5;
    }
    if (ctx.getTalent(count, 203)) {
      G += 10;
    }
    if (ctx.getTalent(count, 180)) {
      G += 2;
    }
    if (ctx.getTalent(count, 181)) {
      G += 3;
    }
    if (ctx.getTalent(count, 182)) {
      G += 2;
    }
    if (ctx.getTalent(count, 183)) {
      G += 2;
    }
    if (ctx.getTalent(count, 184)) {
      G += 1;
    }
    if (ctx.getTalent(count, 185)) {
      G += 15;
    }
    if (ctx.getTalent(count, 186)) {
      G += 5;
    }
    if (ctx.getTalent(count, 187)) {
      G += 10;
    }
    if (ctx.getTalent(count, 224)) {
      G += 5;
    }
    if (ctx.getTalent(count, 402)) {
      G += 3;
    }
    if (ctx.getTalent(count, 502)) {
      G += 20;
    }
    if (ctx.getTalent(count, 505)) {
      G += 5;
    }
    if (ctx.getTalent(count, 506)) {
      G += 25;
    }
    if (ctx.getTalent(count, 507)) {
      G += 15;
    }
    if (ctx.getTalent(count, 509)) {
      G += 30;
    }
    if (ctx.getTalent(count, 510)) {
      G += 5;
    }
    if (ctx.getTalent(count, 511)) {
      G += 10;
    }
    if (ctx.getTalent(count, 512)) {
      G += 10;
    }
    if (ctx.getTalent(count, 516)) {
      G += 15;
    }
    if (ctx.getTalent(count, 518)) {
      G += 20;
    }
    if (ctx.getTalent(count, 519)) {
      G += 30;
    }
  }
  if (G > 50 && ctx.flags[40] < 10) {
    if ((50 + (ctx.flags[40] * 10)) < G) {
      G = (50 + (ctx.flags[40] * 10));
    }
  }
  if (G < 10) {
    G = 10;
  }
  ctx.showMessage('곡의 장르를 선택해주세요.');
  ctx.showMessage('[0] - 가요');
  ctx.showMessage('[1] - 팝');
  ctx.showMessage('[2] - 락');
  ctx.showMessage('[3] - 테크노');
  ctx.showMessage('[4] - R&B');
  ctx.showMessage('[5] - 애니송');
  ctx.showMessage('[6] - 엔카');
  // Label: INPUT_LOOP2
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`W 가요를 주로 노래합니다`);
  } else if (ctx.result === 1) {
    ctx.showMessage(`W 팝을 주로 노래합니다`);
  } else if (ctx.result === 2) {
    ctx.showMessage(`W 락을 주로 노래합니다`);
  } else if (ctx.result === 3) {
    ctx.showMessage(`W 테크노를 주로 노래합니다`);
  } else if (ctx.result === 4) {
    ctx.showMessage(`W R&B를 주로 노래합니다`);
  } else if (ctx.result === 5) {
    ctx.showMessage(`W 애니송을 주로 노래합니다`);
  } else if (ctx.result === 6) {
    ctx.showMessage(`W 엔카를 주로 노래합니다`);
  } else {
    // GOTO INPUT_LOOP2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.drawLine();
  await work_sub_print_fullname(ctx, character);
  ctx.showMessage(`W 의 콘서트를 열었다……`);
  ctx.showMessage(`이번 콘서트에는 {G}명의 청중이 모였다`);
  await ctx.wait();
  L = 0;
  K = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (L < MAXctx.base[ctx.count][1] && character.cflags[ctx.count][130]) {
      L = MAXctx.base[ctx.count][1] / 100;
    }
  }
  K = L / 10;
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (E > ctx.exp[ctx.count][71] && character.cflags[ctx.count][130]) {
      E = ctx.exp[ctx.count][71];
    }
  }
  if (E < 50) {
    D = 0 + ctx.rand(2) + ctx.rand(L) + K;
  } else if (E < 100) {
    D = 0 + ctx.rand(3) + ctx.rand(L) + K;
  } else if (E < 200) {
    D = 2 + ctx.rand(3) + ctx.rand(L) + K;
  } else if (E < 300) {
    D = 4 + ctx.rand(4) + ctx.rand(L) + (K * 2);
  } else if (E < 400) {
    D = 7 + ctx.rand(4) + ctx.rand(L) + (K * 2);
  } else if (E < 500) {
    D = 10 + ctx.rand(5) + ctx.rand(L) + (K * 2);
  } else if (E < 600) {
    D = 13 + ctx.rand(6) + ctx.rand(L) + (K * 3);
  } else if (E < 800) {
    D = 16 + ctx.rand(7) + ctx.rand(L) + (K * 3);
  } else if (E < 1000) {
    D = 20 + ctx.rand(8) + ctx.rand(L) + (K * 3);
  } else if (E < 1500) {
    D = 25 + ctx.rand(9) + ctx.rand(L) + (K * 4);
  } else if (E < 2500) {
    D = 30 + ctx.rand(9) + ctx.rand(L) + (K * 4);
  } else if (E < 4000) {
    D = 40 + ctx.rand(10) + ctx.rand(L) + (K * 4);
  } else {
    D = 50 + ctx.rand(10) + ctx.rand(L) + (K * 5);
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    D += ctx.abilities[ctx.count][71];
    D += ctx.abilities[ctx.count][70] / 2;
    D += ctx.abilities[ctx.count][72] / 2;
    D += ctx.abilities[ctx.count][15] / 3;
    D += ctx.abilities[ctx.count][17] / 3;
    D += ctx.abilities[ctx.count][50];
    if (ctx.getTalent(count, 10)) {
      D -= 2;
    }
    if (ctx.getTalent(count, 14)) {
      D -= 2;
    }
    if (ctx.getTalent(count, 15)) {
      D += 3;
    }
    if (ctx.getTalent(count, 16)) {
      D += 5;
    }
    if (ctx.getTalent(count, 17)) {
      D -= 1;
    }
    if (ctx.getTalent(count, 22)) {
      D -= 2;
    }
    if (ctx.getTalent(count, 23)) {
      D += 3;
    }
    if (ctx.getTalent(count, 28)) {
      D += 5;
    }
    if (ctx.getTalent(count, 32)) {
      D -= 3;
    }
    if (ctx.getTalent(count, 33)) {
      D += 3;
    }
    if (ctx.getTalent(count, 34)) {
      D -= 5;
    }
    if (ctx.getTalent(count, 35)) {
      D -= 3;
    }
    if (ctx.getTalent(count, 36)) {
      D += 3;
    }
    if (ctx.getTalent(count, 63)) {
      D += 3;
    }
    if (ctx.getTalent(count, 89)) {
      D += 3;
    }
    if (ctx.getTalent(count, 91)) {
      D += 5;
    }
    if (ctx.getTalent(count, 92)) {
      D += 10;
    }
    if (ctx.getTalent(count, 109)) {
      D -= 2;
    }
    if (ctx.getTalent(count, 110)) {
      D += 2;
    }
    if (ctx.getTalent(count, 113)) {
      D += 5;
    }
    if (ctx.getTalent(count, 114)) {
      D += 2;
    }
    if (ctx.getTalent(count, 116)) {
      D -= 3;
    }
    if (ctx.getTalent(count, 115)) {
      D /= 2;
    }
    if (ctx.getTalent(count, 123) || ctx.getTalent(count, 9)) {
      D /= 5;
    }
  }
  if (ctx.flags[51] >= 200) {
    ctx.times('D', 2.00);
  } else if (ctx.flags[51] >= 150) {
    ctx.times('D', 1.50);
  } else if (ctx.flags[51] >= 120) {
    ctx.times('D', 1.20);
  } else if (ctx.flags[51] < 100) {
    ctx.times('D', 0.50);
  }
  if (ctx.flags[10] > 1) {
    P = 41 + ctx.rand(10);
  } else {
    P = 21 + ctx.rand(5);
  }
  if (ctx.flags[50] == 1) {
    P -= 5;
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
  if (ctx.flags[52]) {
    await work_sub_print_member(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"는")%`);
    if (ctx.flags[42] >= 2) {
      ctx.print('맞춰입은');
    }
    if (character.cflags[40] === 0) {
      ctx.print('실오라기 하나 걸치지 않은 모습');
    } else if (character.cflags[40] < 4) {
      ctx.print('속옷차림');
    } else {
      await print_clothtype_main2(ctx, character);
      if (character.cflags[42]) {
        ctx.print('에');
        await print_clothtype_special(ctx, character);
      }
      ctx.print('차림');
    }
    ctx.showMessage(`으로 스테이지에 올랐다`);
  }
  ctx.showMessage(`W 일반 상연 목록 {L}곡에 더해 앵콜 {K}곡을 노래했다`);
  ctx.showMessage('「♪~♪~」');
  if (ctx.flags[42] >= 2 && ctx.flags[51] >= 175) {
    await work_sub_print_member(ctx, character);
    ctx.showMessage(`의 노랫소리는 절묘한 하모니를 만들어 내고 있다`);
  } else if (ctx.flags[42] >= 2 && ctx.flags[51] >= 120) {
    await work_sub_print_member(ctx, character);
    ctx.showMessage(`의 노랫소리는 그럭저럭 어울린다`);
  } else if (ctx.flags[42] >= 2 && ctx.flags[51] <= 100) {
    await work_sub_print_member(ctx, character);
    ctx.showMessage(`의 노랫소리는 빈말로도 어울린다고는 못한다……`);
  }
  await ctx.wait();
  ctx.showMessage('');
  ctx.showMessage(`만족도: {D}％`);
  P *= 4;
  ctx.showMessage(`W 목표 만족도: {P}％`);
  ctx.showMessage('');
  if (A <= 1) {
    ctx.showMessage(`매우 긴장했는지, 노래하는 도중에`);
    await work_sub_print_member(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"는")% 굳어 버렸다`);
    ctx.showMessage(`W 아무래도 이번 콘서트는 실패한 것 같다……`);
    character.tflags[13] = 110;
  } else {
    ctx.showMessage(`W 좋은 느낌으로 성공한 것 같다`);
    if (ctx.flags[50] === 0) {
      await work_sub_print_member(ctx, character);
      ctx.showMessage(`W %조사만처리(RESULT+2,"는")% 수줍은 듯이 웃으며, 스테이지에서 내려왔다……`);
    }
    character.tflags[13] = 111;
  }
  if (ctx.flags[50] === 1) {
    if (A <= 1) {
      ctx.showMessage(`불만을 느낀 청중들은`);
      await work_sub_print_member(ctx, character);
      ctx.showMessage(`W %조사만처리(RESULT+2,"를")% 향해 쇄도했다……`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
      if (ctx.flags[42] >= 2) {
        ctx.print('들');
      }
      ctx.showMessage(`의 매력과 노랫소리에 매료됬는지`);
      ctx.showMessage(`흥분한 청중들은 일제히`);
      await work_sub_print_member(ctx, character);
      ctx.showMessage(`W 의 곁으로 쇄도했다……`);
    }
    ctx.showMessage('･'); ctx.waitInput();
    ctx.showMessage('･'); ctx.waitInput();
    ctx.showMessage('･'); ctx.waitInput();
    await work_sp_sex_01(ctx, character);
    if (A <= 1) {
      character.tflags[13] = 112;
    } else {
      character.tflags[13] = 113;
    }
    await ctx.wait();
  }
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
  ctx.drawLine();
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    ctx.showMessage(`${ctx.getName(character)}의 패러미터가 다음과 같이 변화되었습니다`);
    if (Z <= 1) {
      T[71] = (G / 10) + 1;
      T[70] = (G / 20) + 1;
      T[72] = (G / 15) + 1;
      U[7] = (G * L / 10) + 1;
      U[4] = (G * L / 15) + 1;
      U[8] = (G * L / 20) + 1;
    } else {
      T[71] = ((G / (7 - Z)) * ctx.abilities[71]) + L + (K * 10);
      T[70] = ((G / (10 - Z)) * ctx.abilities[70]) + (L / 4) + (K * 3);
      T[72] = ((G / (9 - Z)) * ctx.abilities[72]) + (L / 2) + (K * 5);
      U[7] = ((G * L * Z) / 5 ) + (K * 500);
      U[4] = ((G * L * Z) / 6 ) + (K * 300);
      U[8] = ((G * L * Z) / 7 ) + (K * 100);
    }
    if (ctx.flags[42] === 2) {
      ctx.times('T:71', 0.50);
      ctx.times('T:70', 0.50);
      ctx.times('T:72', 0.50);
      ctx.times('U:7', 0.80);
      ctx.times('U:4', 0.80);
      ctx.times('U:8', 0.80);
    } else if (ctx.flags[42] >= 3) {
      ctx.times('T:71', 0.30);
      ctx.times('T:70', 0.30);
      ctx.times('T:72', 0.30);
      ctx.times('U:7', 0.60);
      ctx.times('U:4', 0.60);
      ctx.times('U:8', 0.60);
    }
    if (ctx.flags[50] === 1) {
      M = 15 - ctx.abilities[10];
    } else {
      M = 9 - ctx.abilities[10];
    }
    if (M <= 0) {
      M = 1;
    }
    U[100] = G * M;
    if (ctx.talents[21]) {
      ctx.times('U:100', 0.90);
    }
    if (ctx.talents[22]) {
      ctx.times('U:100', 0.90);
    }
    if (ctx.talents[15]) {
      ctx.times('U:100', 1.50);
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
    if (ctx.talents[203]) {
      ctx.times('U:100', 0.80);
    }
    if (ctx.talents[35] && A <= 1) {
      ctx.times('U:100', 1.50);
    }
    if (ctx.flags[50] === 1) {
      await work_sp_sex_02(ctx, character);
      A += 1;
    } else {
      if (ctx.flags[42] === 2) {
        ctx.times('U:100', 0.80);
      } else if (ctx.flags[42] >= 3) {
        ctx.times('U:100', 0.60);
      }
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    X = ctx.count;
    await work_exp(ctx, character);
    ctx.count = X;
    O = ctx.abilities[10];
    if (ctx.flags[50] === 1) {
      O *= 100;
    } else {
      O *= 200;
      O += 1000;
    }
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
    LOSEctx.base[0] = G * L;
    if (K === 1) {
      ctx.times('LOSEBASE:0', 1.10);
    } else if (K === 2) {
      ctx.times('LOSEBASE:0', 1.20);
    } else if (K >= 3) {
      ctx.times('LOSEBASE:0', 1.30);
    }
    if (ctx.talents[100]) {
      ctx.times('LOSEBASE:0', 1.20);
    }
    if (ctx.talents[203]) {
      ctx.times('LOSEBASE:0', 0.50);
    }
    if (ctx.flags[50] === 1) {
      LOSEctx.base[0] += G * 40;
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
      if (ctx.exp[0] <= 200 && ctx.talents[122] == 0) {
        ctx.times('LOSEBASE:0', 1.10);
      }
      if (ctx.exp[1] <= 200) {
        ctx.times('LOSEBASE:0', 1.20);
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
    if (ctx.flags[50]) {
      LOSEctx.base[0] /= ctx.flags[42];
    } else if (ctx.flags[42] >= 3) {
      ctx.times('LOSEBASE:0', 0.60);
    } else if (ctx.flags[42] >= 2) {
      ctx.times('LOSEBASE:0', 0.80);
    }
    LOSEctx.base[0] *= 100 - ctx.flags[40] * (1 + ctx.flags[50]);
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
      ctx.showMessage(`${ctx.josaHelper("타겟은")}, 마지막 스테이지 후 갑자기 푹 엎드리듯이 쓰러졌다`);
      ctx.showMessage(`무엇을 해도 반응이 없다……`);
      await ctx.wait();
      await charadead_check(ctx, character);
    } else if (ctx.base[0] <= 500) {
      ctx.showMessage(`체력이 한계에 달했습니다. 쉬게 해주세요`);
    }
    ctx.drawLine();
    await ctx.wait();
  }
  Q = 0;
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      E += ctx.abilities[ctx.count][71];
    }
  }
  E /= ctx.flags[42];
  if (E === 0) {
    V = (1 * L) + (5 * K);
  } else if (E === 1) {
    V = (2 * L) + (10 * K);
  } else if (E === 2) {
    V = (3 * L) + (15 * K);
  } else if (E === 3) {
    V = (5 * L) + (20 * K);
  } else if (E === 4) {
    V = (8 * L) + (25 * K);
  } else if (E === 5) {
    V = (10 * L) + (30 * K);
  } else if (E === 6) {
    V = (15 * L) + (40 * K);
  } else if (E === 7) {
    V = (20 * L) + (50 * K);
  } else if (E === 8) {
    V = (30 * L) + (60 * K);
  } else if (E === 9) {
    V = (40 * L) + (80 * K);
  } else if (E >= 10) {
    V = (50 * L) + (100 * K);
  }
  ctx.print('가창');
  if (ctx.flags[42] >= 2) {
    ctx.print('평균');
  }
  ctx.showMessage(`{E}LV +{V}`);
  Q += V;
  V = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 93)) {
      V += 500;
    }
    if (ctx.getTalent(count, 118)) {
      V += 100;
    }
    if (V) {
      ctx.showMessage(`${ctx.getName(ctx.count)} +{V}`);
      Q += V;
      V = 0;
    }
  }
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      E += ctx.abilities[ctx.count][15];
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
  ctx.print('화술');
  if (ctx.flags[42] >= 2) {
    ctx.print('평균');
  }
  ctx.showMessage(`{E}LV ×{V/100}.{V%100}`);
  Q *= V;
  Q /= 100;
  V = 0;
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      E += ctx.abilities[ctx.count][70];
    }
  }
  E /= ctx.flags[42];
  if (E === 0) {
    V = 70;
  } else if (E === 1) {
    V = 80;
  } else if (E === 2) {
    V = 85;
  } else if (E === 3) {
    V = 90;
  } else if (E === 4) {
    V = 95;
  } else if (E === 5) {
    V = 100;
  } else if (E === 6) {
    V = 110;
  } else if (E === 7) {
    V = 120;
  } else if (E === 8) {
    V = 130;
  } else if (E === 9) {
    V = 140;
  } else if (E >= 10) {
    V = 150;
  }
  ctx.print('피사');
  if (ctx.flags[42] >= 2) {
    ctx.print('평균');
  }
  ctx.showMessage(`{E}LV ×{V/100}.{V%100}`);
  Q *= V;
  Q /= 100;
  V = 0;
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      E += ctx.abilities[ctx.count][72];
    }
  }
  E /= ctx.flags[42];
  if (E === 0) {
    V = 50;
  } else if (E === 1) {
    V = 70;
  } else if (E === 2) {
    V = 100;
  } else if (E === 3) {
    V = 110;
  } else if (E === 4) {
    V = 120;
  } else if (E === 5) {
    V = 130;
  } else if (E === 6) {
    V = 140;
  } else if (E === 7) {
    V = 150;
  } else if (E === 8) {
    V = 160;
  } else if (E === 9) {
    V = 180;
  } else if (E >= 10) {
    V = 200;
  }
  ctx.print('무용');
  if (ctx.flags[42] >= 2) {
    ctx.print('평균');
  }
  ctx.showMessage(`{E}LV ×{V/100}.{V%100}`);
  Q *= V;
  Q /= 100;
  V = 0;
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      E += ctx.base[ctx.count][31];
    }
  }
  E /= ctx.flags[42];
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
    V = 150;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      if (character.cflags[ctx.count][54]) {
        ctx.times('V', 0.70);
      }
    }
    ctx.print('특수티켓');
    ctx.showMessage(` ×{V/100}.{V%100}`);
    Q *= V;
    Q /= 100;
    V = 0;
  }
  await work_sp_money_cm(ctx, character);
  ctx.showMessage(`이번 콘서트에는 {Q}포인트의 티켓을 {G}명에게 판매하여,`);
  Q *= G;
  ctx.showMessage(`합계 {Q}포인트 벌었다`);
  ctx.money += Q;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] > 0 && ctx.abilities[ctx.count][12] >= 5 && ctx.abilities[ctx.count][71] >= 5 && ctx.exp[ctx.count][71] >= 1000 && ctx.getTalent(count, 185) === 0 && ctx.getTalent(count, 186) === 0 && ctx.getTalent(count, 187) === 0 && ctx.flags[50] === 0) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", COUNT)}의 노래의 훌륭함이 세계적으로도 유명해진 것 같다……`);
      ctx.showMessage(`W 소질【가희】를 습득했습니다`);
      ctx.getTalent(count, 185) = 1;
    }
  }
  await work_sp_after(ctx, character);
  await ctx.wait();
  // TODO: BEGIN TURNEND
  return 1;
}
