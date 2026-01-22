/**
 * ABLUP21.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ablup21(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  if (ctx.abilities[21] >= 3 && ctx.talents[83] === 1 && ctx.talents[505] === 0) {
    ctx.showMessage(`W 소질 【${ctx.getVarName("TALENT", 83)}】가 있으므로 이 이상 올릴 수 없습니다`);
    return 0;
  } else if (ctx.abilities[21] >= 5 && (ctx.talents[10] === 0 && ctx.talents[14] === 0 && ctx.talents[37] === 0 && ctx.talents[88] === 0)) {
    ctx.showMessage('이 이상 올리려면 소질이 필요합니다'); ctx.waitInput();
    return 0;
  } else if (ctx.abilities[20] + ctx.abilities[21] >= 10 && ctx.talents[505] === 0) {
    ctx.showMessage(`W 새드끼(${ctx.abilities[20]})＋마조끼(${ctx.abilities[21]})의 상한은 10입니다`);
    return 0;
  } else if (ctx.abilities[21] >= 10) {
    ctx.showMessage('이미 MAX입니다'); ctx.waitInput();
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  G = 0;
  I = 0;
  J = 0;
  await decide_ablup21(ctx, character);
  ctx.showMessage(`${ctx.getVarName("ABL", 11)}${ctx.abilities[21]+1}LV이상 (현재${ctx.abilities[11]}LV) 그리고`);
  if (F > 0) {
    ctx.showMessage(`${ctx.getVarName("EXP", 50)}{F}이상 (현재${ctx.exp[50]}) 그리고`);
  }
  if (B > 0) {
    ctx.showMessage(`[0] - ${ctx.getVarName("PALAM", 9)}의 구슬×${ctx.juel[9]}/${A} ……`);
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
    ctx.showMessage(`　　　${ctx.getVarName("PALAM", 5)}의 구슬×${ctx.juel[5]}/{B}`);
    if (C > 0) {
      ctx.showMessage(`　　　${ctx.getVarName("EXP", 30)}　${ctx.exp[30]}/{C}`);
    }
  }
  if (D > 0) {
    ctx.showMessage(`[1] - ${ctx.getVarName("PALAM", 9)}의 구슬×${ctx.juel[9]}/{D} ……`);
    if (J === 0) {
      ctx.print('OK');
    } else {
      if (J & 1) {
        ctx.print('구슬부족');
      }
      if (J & 2) {
        ctx.print('경험부족');
      }
      if (J & 4) {
        ctx.print('능력부족');
      }
    }
    ctx.showMessage('');
    ctx.showMessage(`　　　${ctx.getVarName("PALAM", 6)}의 구슬×${ctx.juel[6]}/{E}`);
    if (C > 0) {
      ctx.showMessage(`　　　${ctx.getVarName("EXP", 30)}　${ctx.exp[30]}/{C}`);
    }
    if (G > 0) {
      ctx.showMessage(`　　　${ctx.getVarName("EXP", 2)}　${ctx.exp[2]}/{G}`);
    }
  }
  ctx.showMessage('[100] - 그만둔다');
  await ctx.inputNumber();
  if ((ctx.result < 0 || ctx.result > 1) && ctx.result != 100) {
    ctx.restart();
  } else if (I != 0 && ctx.result === 0) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (J === 256 && ctx.result === 1) {
    ctx.restart();
  } else if (J != 0 && ctx.result === 1) {
    ctx.showMessage('조건을 만족하지 않았습니다');
    ctx.restart();
  } else if (ctx.result === 100) {
    return 0;
  }
  ctx.abilities[21] += 1;
  if (ctx.result === 0) {
    ctx.juel[9] -= A;
    ctx.juel[5] -= B;
  } else if (ctx.result === 1) {
    ctx.juel[9] -= D;
    ctx.juel[6] -= E;
  }
  ctx.showMessage(`${ctx.getVarName("ABL", 21)}의 레벨이 %조사처리(ABL:21,"가")% 되었습니다`);
  return 0;
}

export async function decide_ablup21(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.abilities[21] >= 5 && (ctx.talents[10] == 0 && ctx.talents[14] == 0 && ctx.talents[37] == 0 && ctx.talents[88] == 0)) {
    return 0;
  }
  if (ctx.abilities[21] >= 10) {
    return 0;
  }
  if (ctx.abilities[21] >= 3 && ctx.talents[83] == 1 && ctx.talents[505] == 0) {
    return 0;
  }
  if (ctx.abilities[20] + ctx.abilities[21] >= 10 && ctx.talents[505] == 0) {
    return 0;
  }
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  I = 0;
  J = 0;
  if (ctx.abilities[21] === 0) {
    A = 100;
    B = 100;
    C = 0;
    D = 100;
    E = 100;
  } else if (ctx.abilities[21] === 1) {
    A = 500;
    B = 500;
    C = 0;
    D = 500;
    E = 300;
  } else if (ctx.abilities[21] === 2) {
    A = 1200;
    B = 1000;
    C = 0;
    D = 1500;
    E = 1000;
  } else if (ctx.abilities[21] === 3) {
    A = 0;
    B = 0;
    C = 30;
    D = 2800;
    E = 6000;
  } else if (ctx.abilities[21] === 4) {
    A = 0;
    B = 0;
    C = 80;
    D = 4300;
    E = 12000;
  } else if (ctx.abilities[21] === 5) {
    A = 0;
    B = 0;
    C = 150;
    D = 6000;
    E = 24000;
  } else if (ctx.abilities[21] === 6) {
    A = 0;
    B = 0;
    C = 200;
    D = 8000;
    E = 38000;
  } else if (ctx.abilities[21] === 7) {
    A = 0;
    B = 0;
    C = 300;
    D = 11000;
    E = 56000;
  } else if (ctx.abilities[21] === 8) {
    A = 0;
    B = 0;
    C = 450;
    D = 15000;
    E = 86000;
  } else if (ctx.abilities[21] === 9) {
    A = 0;
    B = 0;
    C = 600;
    D = 20000;
    E = 120000;
  }
  if (ctx.talents[27]) {
    if (ctx.abilities[21] === 3) {
      ctx.times('C', 1.50);
      ctx.times('D', 1.50);
      ctx.times('E', 1.50);
    } else if (ctx.abilities[21] === 4) {
      ctx.times('C', 2.00);
      ctx.times('D', 2.00);
      ctx.times('E', 2.00);
    } else if (ctx.abilities[21] === 5) {
      ctx.times('C', 2.50);
      ctx.times('D', 2.50);
      ctx.times('E', 2.50);
    } else if (ctx.abilities[21] >= 6) {
      ctx.times('C', 3.00);
      ctx.times('D', 3.00);
      ctx.times('E', 3.00);
    }
  }
  if ((ctx.abilities[21] == 3 || ctx.abilities[21] == 4 || ctx.abilities[21] == 7) && ctx.talents[33] == 0 && ctx.talents[80] == 0 && ctx.talents[88] == 0) {
    F = ctx.abilities[21] - 2;
  }
  G = 1;
  if (ctx.talents[10]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
    ctx.times('D', 1.10);
    ctx.times('E', 1.10);
  }
  if (ctx.talents[11]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[12]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[16]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[15]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  } else if (ctx.talents[17]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
    ctx.times('E', 0.90);
  }
  if (ctx.talents[20]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[21]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
    ctx.times('D', 1.10);
    ctx.times('E', 1.10);
  }
  if (ctx.talents[22]) {
    ctx.times('A', 1.50);
    ctx.times('B', 1.50);
    ctx.times('C', 1.50);
    ctx.times('D', 1.50);
    ctx.times('E', 1.50);
  }
  if (ctx.talents[24]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[26]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
    ctx.times('E', 0.90);
  }
  if (ctx.talents[30]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  } else if (ctx.talents[31]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
    ctx.times('E', 0.90);
  }
  if (ctx.talents[32]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  } else if (ctx.talents[33]) {
    ctx.times('A', 0.60);
    ctx.times('B', 0.60);
    ctx.times('C', 0.60);
    ctx.times('D', 0.60);
    ctx.times('E', 0.60);
  }
  if (ctx.talents[34]) {
    ctx.times('A', 2.00);
    ctx.times('B', 2.00);
    ctx.times('C', 2.00);
    ctx.times('D', 2.00);
    ctx.times('E', 2.00);
  }
  if (ctx.talents[35]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
    ctx.times('E', 0.90);
  } else if (ctx.talents[36]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[40]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
    ctx.times('D', 1.10);
    ctx.times('E', 1.10);
  } else if (ctx.talents[41]) {
    ctx.times('A', 0.95);
    ctx.times('B', 0.95);
    ctx.times('C', 0.95);
    ctx.times('D', 0.95);
    ctx.times('E', 0.95);
  }
  if (ctx.talents[70]) {
    ctx.times('A', 0.90);
    ctx.times('B', 0.90);
    ctx.times('C', 0.90);
    ctx.times('D', 0.90);
    ctx.times('E', 0.90);
  } else if (ctx.talents[71]) {
    ctx.times('A', 1.10);
    ctx.times('B', 1.10);
    ctx.times('C', 1.10);
    ctx.times('D', 1.10);
    ctx.times('E', 1.10);
  }
  if (ctx.talents[76]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.80);
    ctx.times('E', 0.80);
  }
  if (ctx.talents[440]) {
    ctx.times('A', 0.40);
    ctx.times('B', 0.40);
    ctx.times('C', 0.40);
    ctx.times('D', 0.40);
    ctx.times('E', 0.40);
  }
  if (ctx.talents[80]) {
    ctx.times('A', 0.75);
    ctx.times('B', 0.75);
    ctx.times('C', 0.75);
    ctx.times('D', 0.75);
    ctx.times('E', 0.75);
  }
  if (ctx.talents[83]) {
    ctx.times('A', 1.20);
    ctx.times('B', 1.20);
    ctx.times('C', 1.20);
    ctx.times('D', 1.20);
    ctx.times('E', 1.20);
  }
  if (ctx.talents[88]) {
    ctx.times('A', 0.50);
    ctx.times('B', 0.50);
    ctx.times('C', 0.50);
    ctx.times('D', 0.50);
    ctx.times('E', 0.50);
  }
  if (ctx.talents[123]) {
    ctx.times('A', 0.80);
    ctx.times('B', 0.80);
    ctx.times('C', 0.80);
    ctx.times('D', 0.80);
    ctx.times('E', 0.80);
  }
  if (ctx.talents[9]) {
    ctx.times('A', 2.00);
    ctx.times('B', 2.00);
    ctx.times('C', 2.00);
    ctx.times('D', 2.00);
    ctx.times('E', 2.00);
  }
  if (ctx.talents[505]) {
    ctx.times('A', 0.10);
    ctx.times('B', 0.10);
    ctx.times('C', 0.10);
    ctx.times('D', 0.10);
    ctx.times('E', 0.10);
  }
  if (character.no === 1) {
    ctx.times('A', 2.20);
    ctx.times('B', 2.20);
    ctx.times('C', 2.20);
    ctx.times('D', 2.20);
    ctx.times('E', 2.20);
  }
  if (character.no === 91) {
    ctx.times('A', 0.40);
    ctx.times('B', 0.40);
    ctx.times('C', 0.40);
    ctx.times('D', 0.40);
    ctx.times('E', 0.40);
  }
  if (D <= 0) {
    D = 1;
  }
  if (E <= 0) {
    E = 1;
  }
  if (G <= 0) {
    G = 1;
  }
  if (ctx.abilities[11] < ctx.abilities[21]+1) {
    I |= 4;
    J |= 4;
  }
  if (ctx.exp[50] < F) {
    I |= 2;
    J |= 2;
  }
  if (B > 0) {
    if (ctx.juel[9] < A) {
      I |= 1;
    }
    if (ctx.juel[5] < B) {
      I |= 1;
    }
    if (ctx.exp[30] < C) {
      I |= 2;
    }
  } else {
    I = 256;
  }
  if (D > 0) {
    if (ctx.juel[9] < D) {
      J |= 1;
    }
    if (ctx.juel[6] < E) {
      J |= 1;
    }
    if (ctx.exp[30] < C) {
      J |= 2;
    }
    if (ctx.exp[2] < G) {
      J |= 2;
    }
  } else {
    J = 256;
  }
  if (I === 0 || J === 0) {
    return 1;
  } else {
    return 0;
  }
}
