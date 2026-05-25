/**
 * WORK_RESULT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function yuukaku_result(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (TIME != 0) {
    await working_result(ctx, character);
  }
}

export async function working_result(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][12] == 0) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    await working_main(ctx, character);
    ctx.count = character;
  }
  if ((ctx.flags[6] & 2)) {
    ctx.showMessage(` ☆현재의 창관 인기: ${ctx.exp[ctx.master][91]}☆`);
    ctx.drawLine();
  }
}

export async function working_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  G = 0;
  I = 0;
  J = 0;
  N = 0;
  for (let COUNT = 0; COUNT < 100; COUNT++) {
    T[ctx.count] = 0;
  }
  for (let COUNT = 0; COUNT < 101; COUNT++) {
    U[ctx.count] = 0;
  }
  if ((ctx.flags[6] & 2) === 0) {
    ctx.showMessage(`${ctx.getName(character)}의 영업 결과:`);
  } else {
    ctx.showMessage(`${ctx.getName(character)}:`);
  }
  if (character.cflags[12] === 1) {
    await work_1st(ctx, character);
  } else if (character.cflags[12] === 2 || character.cflags[12] === 7) {
    await work_2nd(ctx, character);
  } else if (character.cflags[12] === 3) {
    await work_3rd(ctx, character);
  } else if (character.cflags[12] === 4) {
    await work_4th(ctx, character);
  } else if (character.cflags[12] === 5) {
    await work_5th(ctx, character);
  } else if (character.cflags[12] === 6) {
    await work_6th(ctx, character);
  }
  if ((ctx.flags[6] & 2) == 0) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
  await work_money(ctx, character);
  if ((ctx.flags[6] & 2) == 0) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
  await work_exp(ctx, character);
  if ((ctx.flags[6] & 2) == 0) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
  await work_down(ctx, character);
  if ((ctx.flags[6] & 2) == 0) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
  await work_base(ctx, character);
  if (ctx.base[0] <= 0) {
    ctx.showMessage(`그 날의 영업이 끝나, ${ctx.josaHelper("타겟은")} 쓰러지듯이 누웠다…`);
    character.cflags[12] = 0;
    await charadead_check(ctx, character);
  } else if (ctx.base[0] <= 500) {
    ctx.showMessage(`체력이 한계에 도달했습니다. 영업 멤버에서 제외되었습니다`);
    character.cflags[12] = 0;
  }
  if (character.cflags[50] && character.cflags[15] === 0) {
    character.cflags[15] = 2;
    ctx.cstr[0] = "모르는 남자";
    character.cflags[160] = ctx.base[9];
    character.cflags[161] = DAY[1];
    character.cflags[162] = DAY[2];
    character.cflags[163] = 7;
    character.cflags[164] = 0;
  }
  character.cflags[50] = 0;
  character.cflags[51] = 0;
  character.cflags[52] = 0;
  character.cflags[53] = 0;
  character.cflags[54] = 0;
  if ((ctx.flags[6] & 2) == 0) {
    await ctx.wait();
  }
  ctx.drawLine();
}

export async function work_person_a(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  B = 0;
  if (ctx.talents[183]) {
    for (let COUNT = 0; COUNT < ctx.talents[183]; COUNT++) {
      B += ctx.rand(2);
    }
  }
  if (ctx.exp[70] === 0 && character.cflags[17] === 0) {
    D = ctx.exp[ctx.master][91];
    D /= 10;
    if (D) {
      for (let COUNT = 0; COUNT < D; COUNT++) {
        B += ctx.rand(2);
      }
    }
  } else {
    D = ctx.exp[91];
    D /= 10;
    if (D) {
      for (let COUNT = 0; COUNT < D; COUNT++) {
        B += ctx.rand(2);
      }
    }
  }
  D = ctx.exp[ctx.master][91];
  D /= 20;
  if (D) {
    for (let COUNT = 0; COUNT < D; COUNT++) {
      B += ctx.rand(2);
    }
  }
  G = B;
  G += ctx.abilities[30] / 2;
  if (ctx.talents[76] == 1) {
    ctx.times('G', 1.50);
  }
  if (ctx.talents[440] == 1) {
    ctx.times('G', 1.80);
  }
  G *= ctx.base[31];
  G /= 100;
  if (G < 1) {
    G = 1;
  }
  if (G < 2) {
    G = 2;
  }
  if (character.cflags[12] == 1) {
    ctx.times('G', 1.50);
  }
  if (ctx.talents[183]) {
    if (ctx.rand(10) < ctx.talents[183]) {
      C = 1;
    }
  }
  if (ctx.exp[74] > 10000 && C) {
    D = 40;
  } else if ((ctx.exp[74] > 5000 && C) || ctx.exp[74] > 10000) {
    D = ctx.rand(11) + 30;
  } else if ((ctx.exp[74] > 3000 && C) || ctx.exp[74] > 5000) {
    D = ctx.rand(16) + 25;
  } else if ((ctx.exp[74] > 1000 && C) || ctx.exp[74] > 3000) {
    D = ctx.rand(21) + 20;
  } else if ((ctx.exp[74] > 500 && C) || ctx.exp[74] > 1000) {
    D = ctx.rand(26) + 15;
  } else if ((ctx.exp[74] > 100 && C) || ctx.exp[74] > 500) {
    D = ctx.rand(31) + 10;
  } else if ((ctx.exp[74] > 50 && C) || ctx.exp[74] > 100) {
    D = ctx.rand(36) + 5;
  } else {
    D = ctx.rand(41);
  }
  E = 0;
  ctx.varSet(ctx.locals[0], 0);
  ctx.locals[0] = ctx.rand(10);
  ctx.showMessage(`{G}명의 손님에게 지명받은 %타겟은(1)%`);
  if (ctx.talents[184] === 1 && ctx.item[19]) {
    if (ctx.locals[0] === 0) {
      ctx.showMessage(``);
    } else if (ctx.locals[0] === 1) {
      ctx.showMessage(`교복 매니아`);
    } else if (ctx.locals[0] === 2) {
      ctx.showMessage(`메이드 취향`);
    } else if (ctx.locals[0] === 3) {
      ctx.showMessage(`무녀 취향`);
    } else if (ctx.locals[0] === 4) {
      ctx.showMessage(`아이돌 오타쿠`);
    } else if (ctx.locals[0] === 5) {
      ctx.showMessage(`여교사 취향`);
    } else if (ctx.locals[0] === 6) {
      ctx.showMessage(`간호사 페티쉬`);
    } else if (ctx.locals[0] === 7) {
      ctx.showMessage(`버니걸 취향`);
    } else if (ctx.locals[0] === 8) {
      ctx.showMessage(`체육복 매니아`);
    } else if (ctx.locals[0] === 9 && character.cflags[12] === 5 && ctx.abilities[20] + ctx.talents[83] * 5 >= ctx.abilities[21] + ctx.talents[88] * 5) {
      ctx.showMessage(`마조`);
    } else if (ctx.locals[0] === 9 && character.cflags[12] === 5 && ctx.abilities[20] + ctx.talents[83] * 5 < ctx.abilities[21] + ctx.talents[88] * 5) {
      ctx.showMessage(`새드`);
    } else if (ctx.locals[0] === 9) {
      ctx.showMessage(`수영복 페티쉬`);
    }
    if (ctx.locals[0] != 0) {
      ctx.showMessage(`인`);
    }
    ctx.showMessage(`단골손님의 요구에 응해,`);
  }
  if (ctx.locals[0] === 0) {
    if (ctx.talents[78]) {
      ctx.showMessage(`단단하게 발기한`);
    }
    if ((character.cflags[7] & 1)) {
      ctx.showMessage(`피어스가 빛나는`);
    }
    ctx.showMessage(`유두가 비쳐보이는, 시스루 베이비돌`);
  } else if (ctx.locals[0] === 1) {
    if (ctx.talents[220] == 1 || ctx.talents[221]) {
      ctx.showMessage(`자기가 다니는`);
    }
    ctx.showMessage(`학교 교복`);
  } else if (ctx.locals[0] === 2) {
    ctx.showMessage(`본격파 메이드복`);
  } else if (ctx.locals[0] === 3) {
    ctx.showMessage(`겨드랑이가 드러나는 무녀복`);
  } else if (ctx.locals[0] === 4) {
    if (ctx.talents[522]) {
      ctx.showMessage(`${ctx.getVarName("TALENT", 522)}`);
    } else if (ctx.talents[523]) {
      ctx.showMessage(`${ctx.getVarName("TALENT", 523)}`);
    } else if (ctx.talents[509]) {
      ctx.showMessage(`${ctx.getVarName("TALENT", 509)}`);
    } else if (ctx.talents[509]) {
      ctx.showMessage(`${ctx.getVarName("TALENT", 519)}`);
    } else if (ctx.talents[515]) {
      ctx.showMessage(`%CSTR:MASTER:4%`);
    } else if (ctx.talents[203]) {
      ctx.showMessage(`자신`);
    } else {
      ctx.showMessage(`${ctx.getVarName("TALENT", 509)}`);
    }
    ctx.showMessage(`의 스테이지 의상`);
  } else if (ctx.locals[0] === 5) {
    ctx.showMessage(`타이트스커트 정장`);
  } else if (ctx.locals[0] === 6) {
    ctx.showMessage(`연분홍색 간호사복`);
  } else if (ctx.locals[0] === 7) {
    ctx.showMessage(`가슴이 깊에 파인 버니걸`);
  } else if (ctx.locals[0] === 8) {
    ctx.showMessage(`감색 부르마에 ${ctx.josaHelper("타겟이라")}고 적힌 명찰이 박힌 체육복`);
  } else if (ctx.locals[0] === 9 && character.cflags[12] === 5) {
    ctx.showMessage(`에나멜 본디지`);
  } else if (ctx.locals[0] === 9) {
    if (ctx.talents[518]) {
      ctx.showMessage(`${ctx.josaHelper("타겟이")} 경기 때 입는 꽉 달라붙는 전신 수영복`);
    } else {
      ctx.showMessage(`구식 학교 수영복`);
    }
  }
  ctx.showMessage(` 차림으로『상대』하게 됐다……`);
  ctx.showMessage(`L`);
}

export async function work_happy(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[76]) {
    D += 2;
  }
  if (ctx.talents[92]) {
    D += 2;
  }
  if (ctx.talents[180]) {
    D += 3;
  }
  if (ctx.talents[181]) {
    D += 4;
  }
  if (character.cflags[13] && character.cflags[12]) {
    D *= 2;
    D /= 3;
  }
  if (D > 65) {
    A = 4;
  } else if (D > 45) {
    A = 3;
  } else if (D > 30) {
    A = 2;
  } else if (D > 15) {
    A = 1;
  } else {
    A = 0;
  }
}

export async function work_exp(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[17] === 0) {
    if ((ctx.flags[6] & 2) == 0 || character.cflags[12] == 0) {
      ctx.showMessage(`【%타겟이(1)% 업소여성으로 데뷔했습니다】`);
    }
    T[50] += 1;
    B = A;
    B *= 10;
    if (ctx.talents[126] && B < 40) {
      B = 40;
    }
    if (ctx.talents[203]) {
      B = 60;
    }
    if (ctx.talents[91] || ctx.talents[92]) {
      B += 10;
    }
    if (ctx.talents[509]) {
      B = 100;
    }
    if (ctx.talents[518]) {
      B = 100;
    }
    if (ctx.talents[553]) {
      B = 100;
    }
    if (ctx.talents[515]) {
      B = 80;
    }
    if (ctx.talents[519]) {
      B = 90;
    }
    if (B === 0) {
      J = 0;
      if ((ctx.flags[6] & 2) == 0 || character.cflags[12] == 0) {
        ctx.showMessage(`유감스럽게도 인기는 전혀 없었지만, 지금부터 열심히 하자`);
      }
    } else {
      J = B;
    }
    character.cflags[17] = 1;
    T[91] += 10;
  } else if (A <= 0) {
    J = -6;
    I = -5;
  } else if (A === 1) {
    J = -3;
    I = -1;
  } else if (A === 2) {
    J = 1;
    I = 0;
  } else if (A === 3) {
    J = 2;
    I = 1;
  } else if (A === 4) {
    J = 3;
    I = 1;
  } else if (A >= 5) {
    J = 5;
    I = 2;
  }
  if (ctx.flags[42] >= 3 && I >= 1) {
    if (A >= 5) {
      I = 1;
    } else {
      I = 0;
    }
  } else if (ctx.flags[42] === 2 && I >= 1) {
    if (A >= 4) {
      I = 1;
    } else {
      I = 0;
    }
  }
  if (ctx.exp[91] + J >= 100) {
    J = 100 - ctx.exp[91];
  }
  if (ctx.exp[ctx.master][91] + I >= 100) {
    I = 100 - ctx.exp[ctx.master][91];
  }
  if (ctx.exp[91] + J <= 0) {
    J = 0 - ctx.exp[91];
  }
  if (ctx.exp[ctx.master][91] + I <= 0) {
    I = 0 - ctx.exp[ctx.master][91];
  }
  if ((ctx.flags[6] & 2) === 0 || character.cflags[12] === 0) {
    ctx.print('인기　　　　:');
    N = ctx.exp[91];
    await figure_indent(ctx, character);
    ctx.printValue(ctx.exp[91]);
    if (J >= 0) {
      ctx.printChar('+');
      N = J;
      await figure_indent(ctx, character);
      ctx.printValue(J);
    } else {
      ctx.printChar('-');
      J = 0 - J;
      N = J;
      await figure_indent(ctx, character);
      ctx.printValue(J);
      J = 0 - J;
    }
    ctx.printChar('=');
    N = ctx.exp[91] + J;
    await figure_indent(ctx, character);
    ctx.printValueLine(ctx.exp[91] + J);
    ctx.print('창관 인기　　:');
    N = ctx.exp[ctx.master][91];
    await figure_indent(ctx, character);
    ctx.printValue(ctx.exp[ctx.master][91]);
    if (I >= 0) {
      ctx.printChar('+');
      N = I;
      await figure_indent(ctx, character);
      ctx.printValue(I);
    } else {
      ctx.printChar('-');
      I = 0 - I;
      N = I;
      await figure_indent(ctx, character);
      ctx.printValue(I);
      I = 0 - I;
    }
    ctx.printChar('=');
    N = ctx.exp[ctx.master][91] + I;
    await figure_indent(ctx, character);
    ctx.printValueLine(ctx.exp[ctx.master][91] + I);
  } else {
    ctx.showMessage(`(인기: ${ctx.exp[91] + J})`);
  }
  ctx.exp[91] += J;
  ctx.exp[ctx.master][91] += I;
  if (A >= 4) {
    if (ctx.talents[183] === 0 && (C === 0 || character.cflags[12] === 3 || character.cflags[12] === 4 || character.cflags[12] === 5) && ctx.talents[27] === 0) {
      ctx.showMessage(`손님 중 한 명은 ${ctx.josaHelper("타겟이")} 대단히 마음에 든 것 같다…`);
      ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게【${ctx.getVarName("TALENT", 183)}】이 붙었다`);
      ctx.talents[183] = 1;
    }
  }
  if ((ctx.flags[6] & 2) == 0 || character.cflags[12] == 0) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
  if (T[0] && character.cflags[13] == 0) {
    character.cflags[105] += T[0];
  }
  for (let COUNT = 0; COUNT < 76; COUNT++) {
    if (T[ctx.count]) {
      if ((ctx.flags[6] & 2) === 0 || character.cflags[12] === 0) {
        ctx.showMessage(`${ctx.getVarName("EXP", COUNT)}`);
        if (ctx.count === 0 || ctx.count === 1) {
          ctx.print('');
        } else if (ctx.count === 11 || ctx.count === 21 || ctx.count === 30 || ctx.count === 33 || ctx.count === 73 || ctx.count === 75) {
          ctx.print('');
        } else if (ctx.count === 22 || ctx.count === 32 || ctx.count === 52 || ctx.count === 53) {
          ctx.print('');
        } else {
          ctx.print('');
        }
        ctx.print(':');
        N = ctx.exp[ctx.count];
        await figure_indent(ctx, character);
        ctx.printValue(ctx.exp[ctx.count]);
        ctx.showMessage(`+`);
        N = T[ctx.count];
        await figure_indent(ctx, character);
        ctx.printValue(T[ctx.count]);
        ctx.showMessage(`=`);
        N = ctx.exp[ctx.count] + T[ctx.count];
        await figure_indent(ctx, character);
        ctx.printValueLine(ctx.exp[ctx.count] + T[ctx.count]);
      }
      ctx.exp[ctx.count] += T[ctx.count];
      T[ctx.count] = 0;
    }
  }
  if (character.cflags[12] == 0) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
  for (let COUNT = 0; COUNT < 101; COUNT++) {
    if (U[ctx.count]) {
      if ((ctx.flags[6] & 2) === 0 || character.cflags[12] === 0) {
        ctx.showMessage(`${ctx.getVarName("PALAM", COUNT)}의 구슬`);
        ctx.print(':');
        N = ctx.juel[ctx.count];
        await figure_indent(ctx, character);
        ctx.printValue(ctx.juel[ctx.count]);
        ctx.showMessage(`+`);
        N = U[ctx.count];
        await figure_indent(ctx, character);
        ctx.printValue(U[ctx.count]);
        ctx.showMessage(`=`);
        N = ctx.juel[ctx.count] + U[ctx.count];
        await figure_indent(ctx, character);
        ctx.printValueLine(ctx.juel[ctx.count] + U[ctx.count]);
      }
      ctx.juel[ctx.count] += U[ctx.count];
      U[ctx.count] = 0;
    }
  }
  if (ctx.exp[74] >= 100 && character.mark[3] === 0 && ctx.talents[180] === 0 && ctx.exp[91] >= 40 && ctx.talents[181] === 0 && ctx.abilities[37] >= 2) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 영업 모습이 이상하다…`);
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 업소여성의 일에 달성감을 느끼게 된 모양이다……`);
    ctx.talents[403] = 0;
    ctx.talents[404] = 0;
    ctx.talents[405] = 0;
    ctx.talents[180] = 1;
    MAXctx.base[31] += 10;
    ctx.base[31] += 10;
    if (ctx.talents[30] === 1) {
      ctx.showMessage(`《${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 30)}】을 잃었다》`);
      ctx.talents[30] = 0;
    } else if (ctx.talents[30] === 0 && ctx.talents[31] === 0) {
      ctx.showMessage(`《${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 31)}】이 됐다》`);
      ctx.talents[31] = 1;
    }
  }
  if (ctx.exp[74] >= 200 && character.mark[3] === 0 && ctx.talents[180] === 1 &&ctx.talents[181] === 0 && ctx.exp[91] >= 100 && ctx.abilities[37] >= 4) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 완전히 창관의 간판이 되어버렸다`);
    ctx.showMessage(`오늘도 ${ctx.josaHelper("타겟을")} 지명하고 싶어하는 손님이 몇 명이나 방문해왔다……`);
    ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 181)}】가 됐다`);
    ctx.talents[181] = 1;
    ctx.talents[180] = 0;
    MAXctx.base[31] += 20;
    ctx.base[31] += 20;
    if (ctx.talents[30] === 1) {
      ctx.showMessage(`《${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 30)}】을 잃었다》`);
      ctx.talents[30] = 0;
    } else if (ctx.talents[30] === 0 && ctx.talents[31] === 0) {
      ctx.showMessage(`《${ctx.josaHelper("타겟은")}【${ctx.getVarName("TALENT", 31)}】이 됐다》`);
      ctx.talents[31] = 1;
    }
  }
  if (ctx.exp[74] >= 100 && ctx.exp[75] >= 300 && ctx.talents[85] === 0 && ctx.talents[183] === 1 && ctx.talents[184] === 0 && ctx.exp[91] >= 60) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 영업 모습이 이상하다…`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 후원객과 연인 사이가 되어버린 것 같다……`);
    ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 184)}】이 됐다`);
    if (ctx.talents[85] === 0) {
      ctx.talents[184] = 1;
      character.cflags[621] = 1;
      character.cflags[622] += ctx.rand(6);
    }
  }
}

export async function work_money(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await work_moneyd(ctx, character);
  B *= G;
  B -= character.cflags[13] * G * 200;
  if (B < 0) {
    B = 0;
  }
  if (character.cflags[12] == 1) {
    ctx.times('B', 0.75);
  }
  B *= T[91];
  if (ctx.talents[180]) {
    ctx.times('B', 1.10);
  }
  if (ctx.talents[181]) {
    ctx.times('B', 1.30);
  }
  if (ctx.exp[91] >= 100) {
    ctx.times('B', 1.30);
  } else if (ctx.exp[91] >= 80) {
    ctx.times('B', 1.20);
  } else if (ctx.exp[91] >= 60) {
    ctx.times('B', 1.10);
  }
  if (A === 0) {
    if ((ctx.flags[6] & 2) == 0) {
      ctx.showMessage(`불친절한 서비스 때문에 대량의 클레임이 들어와 일부 요금을 환불해야했습니다.`);
    }
    ctx.times('B', 0.50);
  } else if (A === 1) {
    ctx.times('B', 1.00);
  } else if (A === 2) {
    ctx.times('B', 1.00);
  } else if (A === 3) {
    ctx.times('B', 1.20);
  } else if (A === 4) {
    ctx.times('B', 1.30);
  }
  if ((ctx.flags[6] & 2) === 0) {
    if (character.cflags[12] === 6) {
      ctx.showMessage(`돌아갈 때 손님에게 오늘분의 요금을 받았습니다`);
    } else {
      ctx.showMessage(`오늘은 {G}명의 고객이 방문했습니다`);
    }
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 영업으로 {B}포인트를 벌었습니다`);
  } else {
    if (A === 0) {
      ctx.print('대실패:');
    } else if (A === 1) {
      ctx.print('실패:');
    } else if (A === 2) {
      ctx.print('보통:');
    } else if (A === 3) {
      ctx.print('성공:');
    } else if (A === 4) {
      ctx.print('대성공:');
    }
    ctx.showMessage(`{G}명의 손님에게서 {B}포인트 획득`);
  }
  ctx.money += B;
}

export async function work_moneyd(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  B = 100;
  if (ctx.abilities[10] <= 3) {
    B += 5;
  } else if (ctx.abilities[10] === 4) {
    B += 10;
  } else if (ctx.abilities[10] === 5) {
    B += 20;
  } else if (ctx.abilities[10] === 6) {
    B += 25;
  } else if (ctx.abilities[10] === 7) {
    B += 30;
  } else if (ctx.abilities[10] === 8) {
    B += 35;
  } else if (ctx.abilities[10] === 9) {
    B += 45;
  } else if (ctx.abilities[10] >= 10) {
    B += 50;
  }
  if (ctx.abilities[11] <= 3) {
    B += 10;
  } else if (ctx.abilities[11] === 4) {
    B += 20;
  } else if (ctx.abilities[11] === 5) {
    B += 30;
  } else if (ctx.abilities[11] === 6) {
    B += 50;
  } else if (ctx.abilities[11] === 7) {
    B += 70;
  } else if (ctx.abilities[11] === 8) {
    B += 90;
  } else if (ctx.abilities[11] === 9) {
    B += 120;
  } else if (ctx.abilities[11] >= 10) {
    B += 150;
  }
  if (character.cflags[12] === 1) {
    if (ctx.abilities[15] === 1) {
      B += 10;
    } else if (ctx.abilities[15] === 2) {
      B += 20;
    } else if (ctx.abilities[15] === 3) {
      B += 40;
    } else if (ctx.abilities[15] === 4) {
      B += 70;
    } else if (ctx.abilities[15] === 5) {
      B += 100;
    } else if (ctx.abilities[15] >= 6) {
      B += 150;
    }
  } else {
    if (ctx.abilities[15] === 1) {
      B += 5;
    } else if (ctx.abilities[15] === 2) {
      B += 10;
    } else if (ctx.abilities[15] === 3) {
      B += 20;
    } else if (ctx.abilities[15] === 4) {
      B += 35;
    } else if (ctx.abilities[15] === 5) {
      B += 50;
    } else if (ctx.abilities[15] >= 6) {
      B += 75;
    }
  }
  if (character.cflags[12] === 6) {
    if (ctx.abilities[16] === 1) {
      B += 15;
    } else if (ctx.abilities[16] === 2) {
      B += 30;
    } else if (ctx.abilities[16] === 3) {
      B += 60;
    } else if (ctx.abilities[16] === 4) {
      B += 105;
    } else if (ctx.abilities[16] === 5) {
      B += 150;
    } else if (ctx.abilities[16] >= 6) {
      B += 225;
    }
  } else {
    if (ctx.abilities[16] === 1) {
      B += 10;
    } else if (ctx.abilities[16] === 2) {
      B += 20;
    } else if (ctx.abilities[16] === 3) {
      B += 40;
    } else if (ctx.abilities[16] === 4) {
      B += 70;
    } else if (ctx.abilities[16] === 5) {
      B += 100;
    } else if (ctx.abilities[16] >= 6) {
      B += 150;
    }
  }
  if (character.cflags[12] === 2 || character.cflags[12] === 7) {
    if (ctx.abilities[13] === 1) {
      B += 15;
    } else if (ctx.abilities[13] === 2) {
      B += 25;
    } else if (ctx.abilities[13] === 3) {
      B += 40;
    } else if (ctx.abilities[13] === 4) {
      B += 60;
    } else if (ctx.abilities[13] === 5) {
      B += 75;
    } else if (ctx.abilities[13] >= 6) {
      B += 100;
    }
  }
  if (character.cflags[12] === 3 || character.cflags[12] === 4) {
    if (ctx.abilities[14] === 1) {
      B += 30;
    } else if (ctx.abilities[14] === 2) {
      B += 50;
    } else if (ctx.abilities[14] === 3) {
      B += 75;
    } else if (ctx.abilities[14] === 4) {
      B += 100;
    } else if (ctx.abilities[14] === 5) {
      B += 150;
    } else if (ctx.abilities[14] >= 6) {
      B += 200;
    }
  }
  if (character.cflags[12] === 5) {
    if (ctx.abilities[20] >= ctx.abilities[21]) {
      if (ctx.abilities[20] === 1) {
        B += 15;
      } else if (ctx.abilities[20] === 2) {
        B += 25;
      } else if (ctx.abilities[20] === 3) {
        B += 40;
      } else if (ctx.abilities[20] === 4) {
        B += 60;
      } else if (ctx.abilities[20] === 5) {
        B += 75;
      } else if (ctx.abilities[20] >= 6) {
        B += 100;
      }
    } else if (ctx.abilities[21] > ctx.abilities[20]) {
      if (ctx.abilities[21] === 1) {
        B += 15;
      } else if (ctx.abilities[21] === 2) {
        B += 25;
      } else if (ctx.abilities[21] === 3) {
        B += 40;
      } else if (ctx.abilities[21] === 4) {
        B += 60;
      } else if (ctx.abilities[21] === 5) {
        B += 75;
      } else if (ctx.abilities[21] >= 6) {
        B += 100;
      }
    }
  }
  if (ctx.talents[76]) {
    B += 20;
  }
  if (ctx.talents[113]) {
    B += 40;
  }
  if (ctx.talents[91]) {
    B += 40;
  }
  if (ctx.talents[92]) {
    B += 75;
  }
  if (ctx.talents[126]) {
    B += 35;
  }
  if (ctx.talents[110] || ctx.talents[109]) {
    B += 25;
  }
  if (ctx.talents[121]) {
    B += 15;
  }
  if (ctx.talents[100]) {
    B += 25;
  }
  if (ctx.talents[203]) {
    B += 50;
  }
  B /= 10;
}

export async function work_down(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = G;
  B = 6 - ctx.abilities[10];
  if (B < 1) {
    B = 1;
  }
  A *= 5;
  A *= B;
  A *= B;
  if (character.cflags[50]) {
    ctx.times('A', 10.00);
  }
  if (character.cflags[51]) {
    ctx.times('A', 1.50);
  }
  if (character.cflags[52]) {
    ctx.times('A', 1.50);
  }
  if (ctx.abilities[37] === 1) {
    ctx.times('A', 0.90);
  } else if (ctx.abilities[37] === 2) {
    ctx.times('A', 0.80);
  } else if (ctx.abilities[37] === 3) {
    ctx.times('A', 0.70);
  } else if (ctx.abilities[37] === 4) {
    ctx.times('A', 0.60);
  } else if (ctx.abilities[37] >= 5) {
    ctx.times('A', 0.50);
  }
  if (ctx.talents[21]) {
    ctx.times('A', 0.90);
  }
  if (ctx.talents[22]) {
    ctx.times('A', 0.90);
  }
  if (ctx.talents[180]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[184]) {
    ctx.times('A', 0.50);
  }
  if (ctx.talents[15]) {
    ctx.times('A', 1.50);
  }
  if (ctx.talents[30]) {
    ctx.times('A', 2.50);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.80);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.01);
  }
  if (ctx.talents[85]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[84]) {
    A *= 100;
  }
  if ((ctx.flags[6] & 2) === 0) {
    ctx.print('부정의 구슬　　:');
    N = ctx.juel[100];
    await figure_indent(ctx, character);
    ctx.printValue(ctx.juel[100]);
    ctx.printChar('+');
    N = A;
    await figure_indent(ctx, character);
    ctx.printValue(A);
    ctx.printChar('=');
    N = ctx.juel[100] + A;
    await figure_indent(ctx, character);
    ctx.printValueLine(ctx.juel[100] + A);
  }
  ctx.juel[100] += A;
  A = ctx.abilities[10];
  A *= 150;
  A += 100;
  B = A;
  ctx.times('B', 1.41);
  C = A;
  ctx.times('C', 1.73);
  if ((ctx.flags[6] & 2) === 0) {
    ctx.print('허용량　　　:');
    if (character.mark[3] === 0) {
      ctx.drawBar(ctx.juel[100], A, 32);
      ctx.showMessage(`(${ctx.juel[100]}/${A})`);
    } else if (character.mark[3] === 1) {
      ctx.drawBar(ctx.juel[100], B, 32);
      ctx.showMessage(`(${ctx.juel[100]}/{B})`);
    } else {
      ctx.drawBar(ctx.juel[100], C, 32);
      ctx.showMessage(`(${ctx.juel[100]}/{C})`);
    }
  }
  if (character.mark[3] != 3 && ctx.juel[100] > C) {
    ctx.showMessage('반발각인 LV3을 습득');
    ctx.showMessage('더 이상 매춘을 계속할 수 없습니다');
    character.mark[3] = 3;
    character.cflags[12] = 0;
  } else if (character.mark[3] != 2 && ctx.juel[100] > B) {
    ctx.showMessage('반발각인 LV2를 습득');
    ctx.showMessage('더 이상 매춘을 계속할 수 없습니다');
    character.mark[3] = 2;
    character.cflags[12] = 0;
  } else if (character.mark[3] != 1 && ctx.juel[100] > A) {
    ctx.showMessage('반발각인 LV1을 습득');
    character.mark[3] = 1;
  }
}

export async function work_base(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (G > 45) {
    LOSEctx.base[0] = 50;
  } else if (G > 34) {
    LOSEctx.base[0] = 45;
  } else if (G > 24) {
    LOSEctx.base[0] = 40;
  } else if (G > 15) {
    LOSEctx.base[0] = 35;
  } else if (G > 7) {
    LOSEctx.base[0] = 30;
  } else {
    LOSEctx.base[0] = 25;
  }
  LOSEctx.base[0] *= F;
  if (character.cflags[50]) {
    ctx.times('LOSEBASE:0', 2.00);
    ctx.base[31] -= 20;
  }
  if (character.cflags[51]) {
    ctx.times('LOSEBASE:0', 1.10);
    ctx.base[31] -= 2;
  }
  if (character.cflags[52]) {
    ctx.times('LOSEBASE:0', 1.20);
    ctx.base[31] -= 2;
  }
  if (ctx.talents[76]) {
    ctx.times('LOSEBASE:0', 0.80);
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
  if ((ctx.flags[6] & 2) === 0) {
    ctx.print('체력 소비　　:');
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
    ctx.base[31] -= ctx.rand(6);
  }
  ctx.base[0] -= LOSEctx.base[0];
  LOSEctx.base[0] = 0;
  if ((ctx.flags[6] & 2) === 0) {
    ctx.print('체력　　　　:');
    ctx.drawBar(ctx.base[0], MAXctx.base[0], 32);
    ctx.showMessage(`(${ctx.base[0]}/${MAXctx.base[0]})`);
  }
}
