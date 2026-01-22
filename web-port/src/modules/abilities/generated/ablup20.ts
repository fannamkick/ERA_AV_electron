/**
 * ABLUP20.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[20] >= 3 && ctx.talents[88] === 1 && ctx.talents[505] === 0) {
    ctx.showMessage(`W 소질【${ctx.getVarName("TALENT", 88)}】가 있으므로 이 이상 올릴 수 없습니다`);
    return 0;
  } else if (ctx.abilities[20] >= 5 && (ctx.talents[80] === 0 && ctx.talents[83] === 0 && ctx.talents[127] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[20] + ctx.abilities[21] >= 10 && ctx.talents[505] === 0) {
    ctx.showMessage(`W 새드끼(${ctx.abilities[20]})＋마조끼(${ctx.abilities[21]})의 상한은 10입니다`);
    return 0;
  } else if (ctx.abilities[20] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  I = 0;
  await decide_ablup20(ctx, character);
  ctx.showMessage(`${ctx.getVarName("ABL", 11)}${ctx.abilities[20]+1}LV이상 (현재${ctx.abilities[11]}LV) 그리고`);
  if (C > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{C} 이상(현재${ctx.exp[50]})그리고`);
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
  if (B > 0) {
    ctx.showMessage(`　　　${ctx.getVarName("EXP", 33)}　${ctx.exp[33]}/{B}`);
  }
  ctx.showMessage('[100] - 그만둔다');
  await ctx.inputNumber();
  if (ctx.result != 0 && ctx.result != 100) {
    ctx.restart();
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[20] += 1;
  ctx.juel[5] -= A;
  ctx.showMessage(`${ctx.getVarName("ABL", 20)}의 레벨이 %조사처리(ABL:20,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup20(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[20] >= 5 && (ctx.talents[80] == 0 && ctx.talents[83] == 0 && ctx.talents[127] == 0)) {
    return 0;
  }
  if (ctx.abilities[20] >= 10) {
    return 0;
  }
  if (ctx.abilities[20] >= 3 && ctx.talents[88] == 1 && ctx.talents[505] == 0) {
    return 0;
  }
  if (ctx.abilities[20] + ctx.abilities[21] >= 10 && ctx.talents[505] == 0) {
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  I = 0;
  if (ctx.abilities[20] === 0) {
    A = 100;
    B = 5;
  } else if (ctx.abilities[20] === 1) {
    A = 500;
    B = 20;
  } else if (ctx.abilities[20] === 2) {
    A = 1500;
    B = 50;
  } else if (ctx.abilities[20] === 3) {
    A = 3000;
    B = 120;
  } else if (ctx.abilities[20] === 4) {
    A = 5000;
    B = 300;
  } else if (ctx.abilities[20] === 5) {
    A = 8000;
    B = 600;
  } else if (ctx.abilities[20] === 6) {
    A = 12000;
    B = 1500;
  } else if (ctx.abilities[20] === 7) {
    A = 15000;
    B = 3000;
  } else if (ctx.abilities[20] === 8) {
    A = 25000;
    B = 5000;
  } else if (ctx.abilities[20] === 9) {
    A = 30000;
    B = 8000;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[20] === 3) {
      ctx.times('C', 1.50);
      ctx.times('D', 1.50);
      ctx.times('E', 1.50);
    } else if (ctx.abilities[20] === 4) {
      ctx.times('C', 2.00);
      ctx.times('D', 2.00);
      ctx.times('E', 2.00);
    } else if (ctx.abilities[20] === 5) {
      ctx.times('C', 2.50);
      ctx.times('D', 2.50);
      ctx.times('E', 2.50);
    } else if (ctx.abilities[20] >= 6) {
      ctx.times('C', 3.00);
      ctx.times('D', 3.00);
      ctx.times('E', 3.00);
    }
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.10);
    ctx.times('B', 0.10);
    ctx.times('C', 0.10);
    ctx.times('D', 0.10);
    ctx.times('E', 0.10);
  }
  if ((ctx.abilities[20] == 3 || ctx.abilities[20] == 4 || ctx.abilities[20] == 7) && ctx.talents[80] == 0 && ctx.talents[83] == 0 && ctx.talents[84] == 0 && ctx.talents[87] == 0) {
    C = ctx.abilities[20] - 2;
  }
  G = 1;
  if (ctx.talents[10]) {
    ctx.times('A', 1.50);
  }
  if (ctx.talents[11]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
  }
  if (ctx.talents[12]) {
    ctx.times('A', 0.90);
  }
  if (ctx.talents[14]) {
    ctx.times('A', 1.20);
  }
  if (ctx.talents[16]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
  }
  if (ctx.talents[15]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
  } else if (ctx.talents[17]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
  }
  if (ctx.talents[20]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
  }
  if (ctx.talents[21]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
  }
  if (ctx.talents[22]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.20);
  }
  if (ctx.talents[23]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
  }
  if (ctx.talents[26]) {
    ctx.times('A', 1.10);
  }
  if (ctx.talents[28]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
  }
  if (ctx.talents[30]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
  } else if (ctx.talents[31]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
  }
  if (ctx.talents[32]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
  } else if (ctx.talents[33]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
  }
  if (ctx.talents[79] || ctx.talents[82]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
  }
  if (ctx.talents[40]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
  } else if (ctx.talents[41]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.80);
    ctx.times('E', 0.80);
  }
  if (ctx.talents[553]) {
    ctx.times('A', 0.60);
    ctx.times('B', 0.60);
    ctx.times('C', 0.60);
    ctx.times('D', 0.60);
    ctx.times('E', 0.60);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.40);
    ctx.times('B', 0.40);
    ctx.times('C', 0.40);
    ctx.times('D', 0.40);
    ctx.times('E', 0.40);
  }
  if (ctx.talents[80]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
  }
  if (ctx.talents[83]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
  }
  if (ctx.talents[88]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
  }
  if (ctx.talents[84]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
  }
  if (ctx.talents[87]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
  }
  if (ctx.talents[123]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
  }
  if (ctx.talents[9]) {
    ctx.times('A', 2.00);
    ctx.times('B', 2.00);
  }
  if (ctx.talents[407]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
  }
  if (character.no === 1) {
    ctx.times('A', 0.40);
    ctx.times('B', 0.40);
    ctx.times('C', 0.40);
    ctx.times('D', 0.40);
    ctx.times('E', 0.40);
  }
  if (character.no === 91) {
    ctx.times('A', 2.20);
    ctx.times('B', 2.20);
    ctx.times('C', 2.20);
    ctx.times('D', 2.20);
    ctx.times('E', 2.20);
  }
  if (ctx.juel[5] < A) {
    I |= 1;
  }
  if (ctx.exp[33] < B) {
    I |= 2;
  }
  if (ctx.exp[50] < C) {
    I |= 2;
  }
  if (ctx.abilities[11] < ctx.abilities[20] + 1) {
    I |= 4;
  }
  if (I === 0) {
    return 1;
  } else {
    return 0;
  }
}
