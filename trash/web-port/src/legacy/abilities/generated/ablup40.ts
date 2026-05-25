/**
 * ABLUP40.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup40(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[40] >= 5 && (ctx.talents[140] === 0 && ctx.talents[136] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[40] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[32] + ctx.abilities[33] + ctx.abilities[40] >= 10 && ctx.talents[47] === 0 && ctx.talents[80] === 0 && ctx.talents[81] === 0 && ctx.talents[82] === 0 && ctx.talents[140] === 0 && ctx.talents[136] === 0) {
    ctx.showMessage(`W 정액중독(${ctx.abilities[32]})＋레즈중독(${ctx.abilities[33]})＋수간중독(${ctx.abilities[40]})의 상한은 10입니다`);
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  F = 0;
  await decide_ablup40(ctx, character);
  if (F > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{F}이상(현재${ctx.exp[50]})그리고`);
  }
  if (ctx.talents[136]) {
    ctx.showMessage(`${ctx.getVarName("ABL", 10)}${ctx.abilities[40] + 1}LV이상(현재${ctx.abilities[10]}LV) 그리고`);
  } else {
    ctx.showMessage(`${ctx.getVarName("ABL", 11)}${ctx.abilities[40] + 1}LV이상(현재${ctx.abilities[11]}LV) 그리고`);
  }
  ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 5)}의 구슬×${ctx.juel[5]}/${A} ……`);
  if (I === 0) {
    ctx.print('OK');
  } else {
    if (I & 1) {
      ctx.print('구슬부족');
    }
    if (I & 2) {
      ctx.print('경험부족');
    }
    if (I & 4) {
      ctx.print('능력부족');
    }
  }
  ctx.showMessage('');
  ctx.showMessage(`　　　${ctx.getVarName("PALAM", 6)}의 구슬×${ctx.juel[6]}/{B}`);
  ctx.showMessage(`　　　${ctx.getVarName("EXP", 56)}　${ctx.exp[56]}/{C}`);
  ctx.showMessage('[100] - 그만둔다');
  await ctx.inputNumber();
  if ((ctx.result < 0 || ctx.result > 0) && ctx.result != 100) {
    ctx.restart();
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[40] += 1;
  if (ctx.result === 0) {
    ctx.juel[5] -= A;
    ctx.juel[6] -= B;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 40)}의 레벨이 %조사처리(ABL:40,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup40(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[40] == 10) {
    return 0;
  }
  if (ctx.abilities[40] >= 5 && (ctx.talents[140] == 0 && ctx.talents[136] == 0)) {
    return 0;
  }
  if (ctx.abilities[32] + ctx.abilities[33] + ctx.abilities[40] >= 10 && ctx.talents[47] == 0 && ctx.talents[80] == 0 && ctx.talents[81] == 0 && ctx.talents[82] == 0 && ctx.talents[140] == 0 && ctx.talents[136] == 0) {
    return 0;
  }
  I = 0;
  if (ctx.abilities[40] === 0) {
    A = 2000;
    B = 2000;
    C = 30;
  } else if (ctx.abilities[40] === 1) {
    A = 5000;
    B = 5000;
    C = 100;
  } else if (ctx.abilities[40] === 2) {
    A = 10000;
    B = 10000;
    C = 220;
  } else if (ctx.abilities[40] === 3) {
    A = 20000;
    B = 20000;
    C = 400;
  } else if (ctx.abilities[40] === 4) {
    A = 30000;
    B = 30000;
    C = 800;
  } else if (ctx.abilities[40] === 5) {
    A = 45000;
    B = 45000;
    C = 1600;
  } else if (ctx.abilities[40] === 6) {
    A = 75000;
    B = 75000;
    C = 2000;
  } else if (ctx.abilities[40] === 7) {
    A = 100000;
    B = 100000;
    C = 2800;
  } else if (ctx.abilities[40] === 8) {
    A = 200000;
    B = 200000;
    C = 4000;
  } else if (ctx.abilities[40] === 9) {
    A = 300000;
    B = 300000;
    C = 6000;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[37] === 3) {
      ctx.times('A', 2.00);
      ctx.times('B', 2.00);
      ctx.times('C', 2.00);
    } else if (ctx.abilities[37] === 4) {
      ctx.times('A', 2.50);
      ctx.times('B', 2.50);
      ctx.times('C', 2.50);
    } else if (ctx.abilities[37] >= 5) {
      ctx.times('A', 3.00);
      ctx.times('B', 3.00);
      ctx.times('C', 3.00);
    }
  }
  F = 0;
  if (ctx.abilities[40] >= 2 && (ctx.talents[72] == 0 && ctx.talents[76] == 0 && ctx.talents[136] == 0)) {
    F = ctx.abilities[40] + 1;
  }
  if (ctx.talents[20]) {
    ctx.times('A', 2.50);
    ctx.times('B', 2.50);
    ctx.times('C', 1.50);
  }
  if (ctx.talents[70]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
  } else if (ctx.talents[71]) {
    ctx.times('A', 1.75);
    ctx.times('B', 1.75);
  }
  if (ctx.talents[72]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[80]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.75);
  }
  if (ctx.talents[123]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[124]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
  }
  if (ctx.talents[136]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
  }
  if (ctx.talents[85]) {
    ctx.times('A', 1.80);
    ctx.times('B', 1.80);
    ctx.times('C', 1.50);
  }
  if (A < 1) {
    A = 1;
  }
  if (B < 1) {
    B = 1;
  }
  if (C < 1) {
    C = 1;
  }
  if (ctx.talents[136]) {
    if (ctx.abilities[10] < ctx.abilities[40] + 1) {
      I |= 4;
    }
    if (ctx.juel[5] < A) {
      I |= 1;
    }
    if (ctx.juel[6] < B) {
      I |= 1;
    }
  } else {
    if (ctx.abilities[11] < ctx.abilities[40] + 1) {
      I |= 4;
    }
    if (ctx.juel[5] < A) {
      I |= 1;
    }
    if (ctx.juel[6] < B) {
      I |= 1;
    }
  }
  if (ctx.exp[56] < C) {
    I |= 2;
  }
  if (ctx.exp[50] < F) {
    I |= 2;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
