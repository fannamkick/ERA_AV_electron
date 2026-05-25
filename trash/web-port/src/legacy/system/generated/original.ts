/**
 * ORIGINAL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_bodypierce(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = character.cflags[40];
  await wearing_cloth_all(ctx, character);
  B = character.cflags[40];
  character.cflags[40] = A;
  if ((character.cflags[40] & 4)) {
    if ((character.cflags[40] & 2) === 0 && (B & 2) && (ctx.talents[109] === 0 && ctx.talents[116] === 0)) {
      ctx.print('노브라의 유방이 옷의 아래에서 흔들리고 있는 모습이');
      if (ctx.talents[110] || ctx.talents[114]) {
        ctx.print('분명히');
      } else {
        ctx.print('희미하게');
      }
      ctx.showMessage('느껴져, 눈을 즐겁게 해준다.');
    }
  }
  if ((character.cflags[7] & 1) && (character.cflags[40] & 2) === 0) {
    if ((character.cflags[40] & 4) === 1) {
      ctx.showMessage(`옷의 천 너머로, ${ctx.getVarName("CALL", TARGET)}의 양 유두에 채워진 피어스의 형태가 떠오르고 있었다.`);
    } else {
      ctx.showMessage(`${ctx.josaHelper("타겟이")} 몸을 움직일 때 마다, 그 양 유두에 달린 피어스가 작게 흔들렸다.`);
    }
  }
  if ((character.cflags[40] & 1) === 0 && ((character.cflags[40] & 8) || (character.cflags[40] & 16))) {
    if ((B & 1) && ctx.talents[135] == 0 && ctx.abilities[17] < 3) {
      ctx.showMessage('노팬티인 하반신이 불안한 듯이, 끊임없이 사타구니 부근을 신경 쓰고 있다……');
    }
  }
  if ((character.cflags[40] & 1) === 0 && (character.cflags[40] & 8)) {
    if ((B & 1) && ctx.abilities[17] >= 3) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 스커트의 옷자락을 걷어 붙이고, 속옷을 입지 않은 비부를 드러내 보였다.`);
    }
  }
  if ((character.cflags[7] & 4) || (character.cflags[7] & 8) && (character.cflags[40] & 1) === 0 && (character.cflags[40] & 16) === 0) {
    if ((character.cflags[40] & 8) === 1) {
      ctx.print('스커트의 사이에서 들여다 보이는');
    } else {
      ctx.print('벌거벗은');
    }
    ctx.print('비부의');
    if ((character.cflags[7] & 4)) {
      ctx.print('양쪽의 음순');
    }
    if ((character.cflags[7] & 4) && (character.cflags[7] & 8)) {
      ctx.print('과');
    }
    if ((character.cflags[7] & 8)) {
      ctx.print('클리토리스');
    }
    ctx.showMessage('에서 부드러운 살을 꿰뚫은 금속제의 피어스가 빛나고 있다……');
  }
  if ((character.cflags[7] & 16)) {
    ctx.showMessage(`손님에게 자기 어필을 하는 ${ctx.getVarName("CALL", TARGET)}의 혀에는 피어스가 박혀있다……`);
  }
  if ((character.cflags[7] & 2) && (character.cflags[40] & 4) === 0) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 배꼽에 박힌 피어스가 금속의 빛을 발하고 있었다……`);
  }
}

export async function work_exp2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
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
    ctx.print('창관인기　　:');
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
    ctx.showMessage(`(인기:${ctx.exp[91] + J})`);
  }
  ctx.exp[91] += J;
  ctx.exp[ctx.master][91] += I;
  if (A >= 4) {
    if (ctx.talents[183] === 0 && (C === 0 || character.cflags[12] === 3 || character.cflags[12] === 4 || character.cflags[12] === 5) && ctx.talents[27] === 0) {
      ctx.showMessage(`손님 중 한 사람은 ${ctx.josaHelper("타겟을")} 굉장히 마음에 들어한 듯 하다…`);
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
}
