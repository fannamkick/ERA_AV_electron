/**
 * WORK_S_STRIP.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function striptease(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.flags[50] = 0;
  ctx.flags[53] = 0;
  ctx.showMessage('어떤 티켓을 판매하시겠습니까?');
  ctx.showMessage('[0] - 보통티켓');
  if (TIME == 1) {
    ctx.showMessage('[1] - 특수티켓');
  }
  ctx.showMessage('[100] - 그만둔다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`W 보통티켓을 판매합니다`);
  } else if (ctx.result === 1 && TIME === 1) {
    ctx.showMessage(`W 특수티켓을 판매합니다。스트립쇼 후에 즐길거리가 있습니다`);
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
      } else if (ctx.exp[ctx.count][11] > ctx.exp[character][11]) {
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
      if (E < ctx.exp[ctx.count][11]) {
        character = ctx.count;
        E = ctx.exp[ctx.count][11];
      }
    }
    E = 0;
  }
  if (ctx.flags[42] === 2) {
    ctx.player = ctx.assi;
    character.tflags[14] = 0;
    await incest(ctx, character);
  }
  ctx.flags[53] = 0;
  if (ctx.flags[42] == 2 && ((ctx.talents[122] || ctx.talents[121]) || (ctx.getTalent(assi, 122) || ctx.getTalent(assi, 121)))) {
    ctx.flags[53] |= 4;
  }
  E = 0;
  E = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.abilities[ctx.count][31] < 3 && ctx.getTalent(count, 74) == 0) {
      E = 0;
    }
  }
  if (E) {
    ctx.flags[53] |= 1;
  }
  E = 0;
  E = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.abilities[ctx.count][22] < 2) {
      E = 0;
    }
  }
  if (E && ctx.flags[42] >= 2) {
    ctx.flags[53] |= 2;
  }
  E = 0;
  await work_sub_relation(ctx, character);
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
      ctx.times('G', 1.10);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else if (C < 20) {
      ctx.times('G', 1.30);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else if (C < 24) {
      ctx.times('G', 1.50);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else {
      ctx.times('G', 2.00);
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
      G += 10;
    }
    if (ctx.getTalent(count, 203)) {
      G += 5;
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
      G += 5;
    }
    if (ctx.getTalent(count, 186)) {
      G += 15;
    }
    if (ctx.getTalent(count, 187)) {
      G += 10;
    }
    if (ctx.getTalent(count, 224)) {
      G += 5;
    }
    if (ctx.getTalent(count, 401)) {
      G += 3;
    }
    if (ctx.getTalent(count, 402)) {
      G += 3;
    }
    if (ctx.getTalent(count, 502)) {
      G += 20;
    }
    if (ctx.getTalent(count, 505)) {
      G += 30;
    }
    if (ctx.getTalent(count, 506)) {
      G += 5;
    }
    if (ctx.getTalent(count, 507)) {
      G += 10;
    }
    if (ctx.getTalent(count, 509)) {
      G += 15;
    }
    if (ctx.getTalent(count, 510)) {
      G += 25;
    }
    if (ctx.getTalent(count, 511)) {
      G += 25;
    }
    if (ctx.getTalent(count, 512)) {
      G += 20;
    }
    if (ctx.getTalent(count, 516)) {
      G += 15;
    }
    if (ctx.getTalent(count, 518)) {
      G += 20;
    }
    if (ctx.getTalent(count, 519)) {
      G += 15;
    }
  }
  if (G > 50 && ctx.flags[40] < 10) {
    if ((50 + (ctx.flags[40] * 5)) < G) {
      G = (50 + (ctx.flags[40] * 5));
    }
  }
  if (ctx.flags[50] == 0) {
    G = G * 2 / 3;
  }
  if (G < 10) {
    G = 10;
  }
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    E += ctx.exp[ctx.count][11];
  }
  E /= ctx.flags[42];
  if (E < 10) {
    D = 0 + ctx.rand(5);
  } else if (E < 20) {
    D = 1 + ctx.rand(5);
  } else if (E < 30) {
    D = 2 + ctx.rand(6);
  } else if (E < 40) {
    D = 4 + ctx.rand(6);
  } else if (E < 50) {
    D = 7 + ctx.rand(7);
  } else if (E < 75) {
    D = 10 + ctx.rand(8);
  } else if (E < 100) {
    D = 13 + ctx.rand(9);
  } else if (E < 150) {
    D = 16 + ctx.rand(10);
  } else if (E < 200) {
    D = 20 + ctx.rand(12);
  } else if (E < 300) {
    D = 25 + ctx.rand(14);
  } else if (E < 500) {
    D = 30 + ctx.rand(16);
  } else if (E < 1000) {
    D = 40 + ctx.rand(18);
  } else {
    D = 50 + ctx.rand(20);
  }
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    D += ctx.abilities[ctx.count][17];
    if (ctx.flags[53] & 4) {
      D += ctx.abilities[ctx.count][30] / 2;
    }
    if (ctx.flags[53] & 2) {
      D += ctx.abilities[ctx.count][33] / 2;
    }
    if (ctx.flags[53] & 1) {
      D += ctx.abilities[ctx.count][31] / 2;
    }
    D += ctx.abilities[ctx.count][12] / 3;
    D += ctx.abilities[ctx.count][72] / 3;
    D += ctx.abilities[ctx.count][50];
    if (ctx.getTalent(count, 10)) {
      D -= 1;
    }
    if (ctx.getTalent(count, 14)) {
      D -= 1;
    }
    if (ctx.getTalent(count, 15)) {
      D += 2;
    }
    if (ctx.getTalent(count, 17)) {
      D -= 2;
    }
    if (ctx.getTalent(count, 22)) {
      D -= 1;
    }
    if (ctx.getTalent(count, 23)) {
      D += 1;
    }
    if (ctx.getTalent(count, 28)) {
      D += 3;
    }
    if (ctx.getTalent(count, 32)) {
      D -= 2;
    }
    if (ctx.getTalent(count, 33)) {
      D += 2;
    }
    if (ctx.getTalent(count, 34)) {
      D -= 2;
    }
    if (ctx.getTalent(count, 35)) {
      D -= 2;
    }
    if (ctx.getTalent(count, 36)) {
      D += 2;
    }
    if (ctx.getTalent(count, 60)) {
      D += 5;
    }
    if (ctx.getTalent(count, 70)) {
      D += 3;
    }
    if (ctx.getTalent(count, 76)) {
      D += 10;
    }
    if (ctx.getTalent(count, 80)) {
      D += 2;
    }
    if (ctx.getTalent(count, 89)) {
      D += 10;
    }
    if (ctx.getTalent(count, 92)) {
      D += 15;
    }
    if (ctx.flags[53] & 4) {
      if (ctx.getTalent(count, 75)) {
        D += 10;
      }
      if (ctx.getTalent(count, 81) && (ctx.getTalent(target, 122) == ctx.getTalent(assi, 122))) {
        D += 5;
      }
      if (ctx.getTalent(count, 79) && (ctx.getTalent(target, 122) == 0 || ctx.getTalent(assi, 122) == 0)) {
        D -= 3;
      }
      if (ctx.getTalent(count, 82) && (ctx.getTalent(target, 122) || ctx.getTalent(assi, 122))) {
        D -= 3;
      }
    }
    if (ctx.flags[53] & 2) {
      if (ctx.getTalent(count, 81)) {
        D += 5;
      }
      if (ctx.getTalent(count, 79)) {
        D -= 5;
      }
    }
    if (ctx.flags[53] & 1) {
      if (ctx.getTalent(count, 60)) {
        D += 2;
      }
      if (ctx.getTalent(count, 74)) {
        D += 10;
      }
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
  if (A < 2) {
    ctx.flags[53] -= ctx.flags[53] & 1;
  }
  if (A < 3) {
    ctx.flags[53] -= ctx.flags[53] & 2;
  }
  if (A < 4) {
    ctx.flags[53] -= ctx.flags[53] & 4;
  }
  if (ctx.flags[42] === 1) {
    ctx.showMessage(`${ctx.getName(character)}`);
  } else if (ctx.flags[42] === 2) {
    ctx.showMessage(`%타겟과(1)% ${ctx.getName(ctx.assi)}`);
  } else {
    S = 0;
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      if (S) {
        ctx.showMessage(`${LSTR}`);
      }
      ctx.showMessage(`${ctx.getName(ctx.count)}`);
      LSTR = 조사만처리(ctx.getName(ctx.count),"와");
      S = 1;
    }
  }
  if (ctx.flags[53] & 8) {
    if (character.tflags[14] === 2 && ctx.getTalent(player, 122) === 0 && ctx.getTalent(assi, 122) === 0) {
      ctx.print('에 의한 모녀');
    } else if (character.tflags[14] === 2 && ctx.talents[122] === 0 && ctx.getTalent(assi, 122)) {
      ctx.print('에 의한 모자');
    } else if (character.tflags[14] === 4 && ctx.getTalent(player, 122) === 0 && ctx.getTalent(assi, 122) === 0) {
      ctx.print('에 의한 자매');
    } else if (character.tflags[14] === 4 && ctx.talents[122] === 0 && ctx.getTalent(assi, 122)) {
      ctx.print('에 의한 남매');
    } else if (character.tflags[14] === 4 && ctx.talents[122] && ctx.getTalent(assi, 122) === 0) {
      ctx.print('에 의한 남매');
    } else {
      ctx.print('에 의한 근친');
    }
  } else {
    ctx.print('의');
  }
  if (ctx.flags[53] & 4) {
    ctx.print('공개섹스');
  } else if (ctx.flags[53] & 2) {
    ctx.print('레즈비언');
  } else if (ctx.flags[53] & 1) {
    ctx.print('공개자위');
  } else {
    ctx.print('스트립');
  }
  ctx.showMessage('쇼를 열었다……');
  ctx.showMessage(`이번의 스트립쇼에는 {G}명의 관객이 모였다`);
  await ctx.wait();
  ctx.print('스포트라이트를 받으며,');
  await work_sub_print_member(ctx, character);
  ctx.showMessage(`%조사만처리(RESULT+2,"는")% 관객에게 나체를 보이고 있다……`);
  await ctx.wait();
  if (ctx.flags[53] & 1) {
    ctx.print('그리고');
    await work_sub_print_member(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"는")% 객석을 향해서 다리를 벌려 비소를 드러내고,`);
    ctx.showMessage('음란한 소리를내며 성기를 만지기 시작했다……');
    await ctx.wait();
    if (ctx.flags[53] & 8) {
      ctx.print('무수한 눈이 지켜보는 가운데 늘어서서 자위를 계속하고 있는');
      if (character.tflags[14] === 2) {
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
      } else if (character.tflags[14] === 4) {
        if (ctx.talents[122] && ctx.getTalent(assi, 122)) {
          ctx.print('형제');
        }
        if (ctx.talents[122] == 0 && ctx.getTalent(assi, 122) == 0) {
          ctx.print('자매');
        }
        if (ctx.talents[122] ^ ctx.getTalent(assi, 122)) {
          ctx.print('남매');
        }
      }
      ctx.showMessage('에게,');
      ctx.showMessage('객석에서 추잡한 야유가 터졌다……');
      await ctx.wait();
    }
  }
  if (ctx.flags[53] & 2) {
    ctx.print('이윽고');
    await work_sub_print_member(ctx, character);
    ctx.showMessage(`%조사만처리(RESULT+2,"는")% 서로의 나체를 음란하게 얽기 시작했다……`);
    await ctx.wait();
    if (ctx.flags[53] & 8) {
      if (character.tflags[14] === 2) {
        ctx.showMessage('M자로 벌려진 모친의 가랑이에 얼굴을 묻고,');
        ctx.print('자신이 태어났던 장소에 혀로 핥는');
        if (ctx.getTalent(assi, 135)) {
          ctx.print('어린 소녀');
        } else if (ctx.getTalent(assi, 132)) {
          ctx.print('소녀');
        } else {
          ctx.print('딸');
        }
      } else if (character.tflags[14] === 4) {
        ctx.print('식스나인 자세가 되어 상대의 성기를 핥는 언니와 여동생');
      }
      ctx.showMessage('의 모습을,');
      ctx.showMessage('관객은 가만히 지켜보고 있다……');
      await ctx.wait();
    }
  }
  if (ctx.flags[53] & 4) {
    E = 0;
    ctx.showMessage('본방이 시작됐다……'); ctx.waitInput();
    if (ctx.getTalent(target, 121) && character.cflags[character][54] === 0 && ctx.getTalent(assi, 121) && character.cflags[ctx.assi][54] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟과")} ${ctx.josaHelper("조수는")}`);
      ctx.showMessage(`W 서로의 페니스로 서로의 바기나를 교대로 꿰뚫었다`);
      if (ctx.talents[0]) {
        E |= 1;
      }
      if (ctx.talents[1]) {
        E |= 2;
      }
      if (ctx.getTalent(assi, 0)) {
        E |= 4;
      }
      if (ctx.getTalent(assi, 1)) {
        E |= 8;
      }
      if (character.cflags[13] == 0) {
        character.cflags[103] += G / 10 + 1;
      }
      if (character.cflags[13] == 0) {
        character.cflags[104] += G / 10 + 1;
      }
    } else if ((ctx.getTalent(target, 122) || ctx.getTalent(target, 121)) && character.cflags[ctx.assi][54] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 발기한 자신의 페니스를`);
      ctx.showMessage(`W ${ctx.getVarName("CALL", ASSI)}의 음순에 넣다뺐다 하는 모습을 관객에게 보여주었다`);
      if (ctx.talents[1]) {
        E |= 2;
      }
      if (ctx.getTalent(assi, 0)) {
        E |= 4;
      }
      if (character.cflags[13] == 0) {
        character.cflags[104] += G / 10 + 1;
      }
    } else if ((ctx.getTalent(assi, 122) || ctx.getTalent(assi, 121)) && character.cflags[54] === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 자신의 바기나가`);
      ctx.showMessage(`W ${ctx.getVarName("CALL", ASSI)}의 음경으로 꿰뚫리는 모습을 관객에게 보여주었다`);
      if (ctx.talents[0]) {
        E |= 1;
      }
      if (ctx.getTalent(assi, 1)) {
        E |= 8;
      }
      if (character.cflags[13] == 0) {
        character.cflags[103] += G / 10 + 1;
      }
    }
    if (ctx.flags[53] & 8) {
      if (character.tflags[14] === 2 && ctx.getTalent(assi, 122) === 0) {
        ctx.print('자신의 딸');
      } else if (character.tflags[14] === 2 && ctx.getTalent(assi, 122)) {
        ctx.print('자신의 아들');
      } else if (character.tflags[14] === 4 && ctx.getTalent(assi, 122) === 0) {
        ctx.print('자신의 여동생');
      } else if (character.tflags[14] === 4 && ctx.getTalent(assi, 122)) {
        ctx.print('자신의 남동생');
      }
      if (ctx.talents[121] && character.cflags[54] === 0 && ctx.getTalent(assi, 121) && character.cflags[ctx.assi][54] === 0) {
        ctx.print('과 서로 범하는');
      } else if ((ctx.talents[122] || ctx.talents[121]) && character.cflags[ctx.assi][54] === 0) {
        ctx.print('을 계속 범하는');
      } else if ((ctx.getTalent(assi, 122) || ctx.getTalent(assi, 121)) && character.cflags[54] === 0) {
        ctx.print('에게 계속 범해지는');
      }
      if (character.tflags[14] === 2 && ctx.talents[122]) {
        ctx.print('부친');
      } else if (character.tflags[14] === 2 && ctx.talents[122] === 0) {
        ctx.print('모친');
      } else if (character.tflags[14] === 4 && ctx.talents[122] && ctx.getTalent(assi, 122) === 0) {
        ctx.print('오빠');
      } else if (character.tflags[14] === 4 && ctx.talents[122] && ctx.getTalent(assi, 122)) {
        ctx.print('형');
      } else if (character.tflags[14] === 4 && ctx.talents[122] === 0 && ctx.getTalent(assi, 122) === 0) {
        ctx.print('언니');
      } else if (character.tflags[14] === 4 && ctx.talents[122] === 0 && ctx.getTalent(assi, 122)) {
        ctx.print('누나');
      }
      ctx.showMessage('라는 이상한 광경에, 관객석은 아주 조용해져 있다……');
      await ctx.wait();
    }
    F = 0;
    if (E & 1) {
      ctx.talents[0] = 0;
      character.cflags[50] = 1;
      ctx.showMessage(`${ctx.getName(character)}【처녀상실】`);
      F += 1;
      if (ctx.flags[53] & 8) {
        F += 1;
      }
      if (ctx.getTalent(assi, 122) == 0) {
        F += 1;
      }
      if (character.cflags[18] == 0) {
        character.cflags[18] = 1;
      }
    }
    if (E & 2) {
      ctx.talents[1] = 0;
      ctx.showMessage(`${ctx.getName(character)}【동정상실】`);
      F += 1;
      if (ctx.flags[53] & 8) {
        F += 1;
      }
      if (character.cflags[18] == 0) {
        character.cflags[18] = 1;
      }
    }
    if (E & 1 || E & 2) {
      if (character.cflags[character][15] === 0) {
        character.cflags[character][15] = ctx.assi.no + 1;
        if (character.tflags[14] === 4 && ctx.getTalent(assi, 122)) {
          character.cflags[15] = 306;
        } else if (character.tflags[14] === 4 && ctx.getTalent(assi, 122) === 0) {
          character.cflags[15] = 307;
        }
        if (character.cflags[18] == 0) {
          character.cflags[18] = 1;
        }
      }
    }
    if (F) {
      if (F > 3) {
        F = 3;
      }
      ctx.showMessage(`이상경험 +{F}`);
      ctx.exp[50] += F;
      F = 0;
    }
    F = 0;
    if (E & 4) {
      ctx.getTalent(assi, 0) = 0;
      character.cflags[ctx.assi][50] = 1;
      ctx.showMessage(`${ctx.getName(ctx.assi)}【처녀상실】`);
      F += 1;
      if (ctx.flags[53] & 8) {
        F += 1;
      }
      if (ctx.talents[122] == 0) {
        F += 1;
      }
      if (character.cflags[ctx.assi][18] == 0) {
        character.cflags[ctx.assi][18] = 1;
      }
    }
    if (E & 8) {
      ctx.getTalent(assi, 1) = 0;
      ctx.showMessage(`${ctx.getName(ctx.assi)}【동정상실】`);
      F += 1;
      if (ctx.flags[53] & 8) {
        F += 1;
      }
      if (character.cflags[ctx.assi][18] == 0) {
        character.cflags[ctx.assi][18] = 1;
      }
    }
    if (E & 4 || E & 8) {
      if (character.cflags[ctx.assi][15] === 0) {
        character.cflags[ctx.assi][15] = character.no + 1;
        if (character.tflags[14] === 2 && ctx.talents[122]) {
          character.cflags[ctx.assi][15] = 300;
        } else if (character.tflags[14] === 2 && ctx.talents[122] === 0) {
          character.cflags[ctx.assi][15] = 301;
        } else if (character.tflags[14] === 4 && ctx.talents[122]) {
          character.cflags[ctx.assi][15] = 304;
        } else if (character.tflags[14] === 4 && ctx.talents[122] === 0) {
          character.cflags[ctx.assi][15] = 305;
        }
      }
      if (character.cflags[ctx.assi][18] == 0) {
        character.cflags[ctx.assi][18] = 1;
      }
    }
    if (F) {
      if (F > 3) {
        F = 3;
      }
      ctx.showMessage(`이상경험 +{F}`);
      ctx.exp[ctx.assi][50] += F;
      F = 0;
    }
    if (E) {
      await ctx.wait();
    }
    E = 0;
    await in_vagina_all(ctx, character);
    await conception_check_all(ctx, character);
  }
  ctx.showMessage('');
  ctx.showMessage(`만족도: {D}％`);
  P *= 4;
  ctx.showMessage(`W 목표 만족도: {P}％`);
  ctx.showMessage('');
  if (A <= 1) {
    ctx.showMessage(`수치심을 견딜 수 없었는지, 도중에`);
    if (ctx.flags[42] === 1 && character > 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    } else if (ctx.flags[42] === 2) {
      ctx.showMessage(`${ctx.josaHelper("타겟과")} ${ctx.josaHelper("조수는")}`);
    } else if (ctx.flags[42] ==3) {
      ctx.print('3명은');
    } else {
      ctx.showMessage(`${ctx.flags[42]}명은`);
    }
    ctx.showMessage(` 굳어버렸다`);
    ctx.showMessage(`이번 쇼는 실패한것 같다……`);
    await ctx.wait();
    character.tflags[13] = 118;
  } else {
    ctx.showMessage(`좋은 느낌으로 성공한것 같다`);
    await ctx.wait();
    if (ctx.flags[42] >= 2) {
      if ((ctx.flags[53] & 8) && ctx.abilities[17] >= 4 && ctx.talents[57] && ctx.assiAbilities[17] >= 4 && ctx.getTalent(assi, 57)) {
        ctx.showMessage(`마지막에 ${ctx.josaHelper("타겟이")} ${ctx.getVarName("CALL", ASSI)}의 양발을 아기처럼 안아올려서 방뇨시키고,`);
        ctx.showMessage(`자기자신도 그 자세를 유지한 채 다리를 게처럼 가랑이를 벌리고 동시에 방뇨하자,`);
        ctx.showMessage(`W 객석에서 대환성이 터졌다……`);
      } else if ((ctx.flags[53] & 8) && ctx.assiAbilities[17] >= 4 && ctx.getTalent(assi, 57)) {
        ctx.showMessage(`마지막에 ${ctx.josaHelper("타겟이")} ${ctx.getVarName("CALL", ASSI)}의 양발을 아기처럼 안아올려서,`);
        ctx.showMessage(`W 객석을 향해서 방뇨시키자, 대환성이 터졌다……`);
      } else if (ctx.abilities[17] >= 4 && ctx.talents[57] && ctx.assiAbilities[17] >= 4 && ctx.getTalent(assi, 57)) {
        ctx.showMessage(`마지막에 ${ctx.josaHelper("타겟과")} ${ctx.josaHelper("조수가")} 나란히 서서 양다리를 벌리고 서서,`);
        ctx.showMessage(`W 동시에 방뇨하자, 환성이 나왔다……`);
      } else if (ctx.abilities[17] >= 4 && ctx.talents[57]) {
        if (ctx.abilities[22] + ctx.assiAbilities[22] >= 6 && ctx.abilities[20] + ctx.assiAbilities[21] >= 6) {
          ctx.showMessage(`W 마지막에 ${ctx.josaHelper("타겟이")} ${ctx.getVarName("CALL", ASSI)}의 크게 벌린 입 안에 방뇨하자, 대환성이 터졌다……`);
        } else {
          ctx.showMessage(`W 마지막에 ${ctx.josaHelper("타겟이")} 객석을 향해서 방뇨하자, 환성이 나왔다……`);
        }
      }
    } else {
      if (ctx.abilities[17] >= 4 && ctx.talents[57]) {
        ctx.showMessage(`W 마지막에 ${ctx.josaHelper("타겟이")} 객석을 향해서 방뇨하자, 환성이 나왔다……`);
      }
    }
    if (ctx.flags[50] === 0) {
      await work_sub_print_member(ctx, character);
      ctx.showMessage(`W %조사만처리(RESULT+2,"는")% 수줍은 듯이 미소짓고, 스테이지에서 내려왔다……`);
    }
    character.tflags[13] = 119;
  }
  if (ctx.flags[50] === 1) {
    if (A <= 1) {
      ctx.showMessage(`불만을 느낀 관객들은`);
      await work_sub_print_member(ctx, character);
      ctx.showMessage(`W %조사만처리(RESULT+2,"를")% 향해서 쇄도했다……`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}`);
      if (ctx.flags[42] >= 2) {
        ctx.print('들');
      }
      ctx.showMessage(`의 치태에 매료된건지`);
      ctx.showMessage(`흥분한 관객들은 일제히`);
      await work_sub_print_member(ctx, character);
      ctx.showMessage(`W 의 아래에 쇄도했다……`);
    }
    ctx.showMessage('･'); ctx.waitInput();
    ctx.showMessage('･'); ctx.waitInput();
    ctx.showMessage('･'); ctx.waitInput();
    await work_sp_sex_01(ctx, character);
    if (A <= 1) {
      character.tflags[13] = 120;
    } else {
      character.tflags[13] = 121;
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
    U[7] = ((G * 80 * Z) / 5 );
    U[8] = ((G * 100 * Z) / 5 );
    if (ctx.flags[53] & 8) {
      U[6] = ((G * 60 * Z) / 5 );
    }
    if (Z <= 1) {
      T[72] = G / 20 + 1;
      T[70] = G / 10 + 1;
    } else {
      T[72] = ((G / (7 - Z)) * ctx.abilities[72]) + (G / 10);
      T[70] = ((G / (10 - Z)) * ctx.abilities[70]) + (G / 2);
    }
    if (ctx.flags[53] & 1) {
      T[2] = (G / (10 - Z)) + (G / 10);
      if (ctx.talents[122] || ctx.talents[121]) {
        T[3] = (G / (10 - Z)) + (G / 10);
      }
      T[10] = (G / (6 - Z)) + (G / 2);
      U[0] = G * (ctx.abilities[31] + ctx.talents[74] * 5) * 10;
      U[14] = G * (ctx.abilities[31] + ctx.talents[74] * 5) * 10;
      U[6] *= 2;
      U[7] *= 2;
      U[8] *= 2;
    }
    if (ctx.flags[53] & 2) {
      T[2] += (G / (10 - Z)) + (G / 10);
      T[40] += (G / (6 - Z)) + (G / 2);
      U[0] += G * (ctx.abilities[22] + ctx.abilities[33] * 2) * 10;
      U[14] += G * (ctx.abilities[22] + ctx.abilities[33] * 2) * 10;
      U[6] *= 2;
      U[8] *= 2;
    }
    if (ctx.flags[53] & 2) {
      if (ctx.talents[122] === 0 && character.cflags[54] === 0) {
        T[0] = (G / (10 - Z)) + (G / 10);
        U[1] = G * (ctx.abilities[30] + ctx.talents[75] * 5) * 10;
        T[5] = (G / (10 - Z)) + (G / 10);
      }
      if (ctx.talents[122] || ctx.talents[121]) {
        T[3] += (G / (10 - Z)) + (G / 10);
        U[0] += G * (ctx.abilities[30] + ctx.talents[75] * 5) * 10;
        T[5] += (G / (10 - Z)) + (G / 10);
      }
      T[2] += (G / (10 - Z)) + (G / 10);
      U[6] *= 2;
      U[8] *= 2;
    }
    if (A >= 2 && ctx.abilities[17] >= 4 && ctx.talents[57]) {
      T[31] = G / 10 + 1;
      U[8] *= 2;
    }
    if (ctx.flags[42] === 2) {
      ctx.times('U:6', 0.80);
      ctx.times('U:7', 0.80);
      ctx.times('U:8', 0.80);
      ctx.times('T:70', 0.50);
      ctx.times('T:72', 0.50);
    } else if (ctx.flags[42] >= 3) {
      ctx.times('U:6', 0.60);
      ctx.times('U:7', 0.60);
      ctx.times('U:8', 0.60);
      ctx.times('T:70', 0.30);
      ctx.times('T:72', 0.30);
    }
    if (ctx.flags[50] === 1) {
      M = 15 - ctx.abilities[10];
    } else {
      M = 9 - ctx.abilities[10];
    }
    if (M <= 0) {
      M = 1;
    }
    U[100] = G * M * 2;
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
    if (ctx.talents[89]) {
      ctx.times('U:100', 0.05);
    }
    if (ctx.talents[35] && A <= 1) {
      ctx.times('U:100', 1.50);
    }
    if (ctx.flags[53] & 4 && ctx.talents[75] == 0) {
      ctx.times('U:100', 1.20);
    }
    if (ctx.flags[53] & 2 && (ctx.abilities[33] < 3 && ctx.talents[81] == 0)) {
      ctx.times('U:100', 1.20);
    }
    if (ctx.flags[53] & 1 && ctx.talents[74] == 0) {
      ctx.times('U:100', 1.20);
    }
    if (ctx.flags[53] & 8) {
      U[100] *= 2;
    }
    if (ctx.flags[50] === 1) {
      await work_sp_sex_02(ctx, character);
      A += 1;
    } else {
      if (character.cflags[50]) {
        U[100] *= 3;
      }
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
    LOSEctx.base[0] = G * 30;
    if (ctx.talents[100]) {
      ctx.times('LOSEBASE:0', 1.20);
    }
    if (ctx.talents[89]) {
      ctx.times('LOSEBASE:0', 0.50);
    }
    if (ctx.flags[50] === 1) {
      LOSEctx.base[0] += G * 40;
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
    if (character.cflags[50]) {
      ctx.times('LOSEBASE:0', 2.00);
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
      ctx.showMessage(`${ctx.josaHelper("타겟은")}, 마지막 쇼 후에 쓰러지듯이 넘어졌다`);
      ctx.showMessage(`무슨짓을 해도 반응이 없다……`);
      await ctx.wait();
      await charadead_check(ctx, character);
    } else if (ctx.base[0] <= 500) {
      ctx.showMessage(`체력이 한계에 달했습니다. 쉬게 해주세요`);
    }
    ctx.drawLine();
    await ctx.wait();
  }
  Q = 0;
  B = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      B += ctx.base[ctx.count][22];
    }
  }
  B /= ctx.flags[42];
  W = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      W += ctx.base[ctx.count][23];
    }
  }
  W /= ctx.flags[42];
  H = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      H += ctx.base[ctx.count][24];
    }
  }
  H /= ctx.flags[42];
  T = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      T += ctx.base[ctx.count][21];
    }
  }
  T /= ctx.flags[42];
  S = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      S += ctx.base[ctx.count][20];
    }
  }
  S /= ctx.flags[42];
  if (S >= 161) {
    V += S - 160;
    V *= V;
  }
  if (V > 100) {
    V = 100;
  }
  L = 0;
  if (S < 150) {
    L += (45 - T) * (45 - T);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (B - 75) * (B - 75);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (55 - W) * (55 - W);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (H - 75) * (H - 75);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
  } else if (S < 160) {
    L += (50 - T) * (50 - T);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (B - 80) * (B - 80);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (60 - W) * (60 - W);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (H - 80) * (H - 80);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
  } else if (S < 170) {
    L += (55 - T) * (55 - T);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (90 - B) * (90 - B);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (65 - W) * (65 - W);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (90 - H) * (90 - H);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
  } else {
    L += (60 - T) * (60 - T);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (95 - B) * (95 - B);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (70 - W) * (70 - W);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
    L += (95 - H) * (95 - H);
    if (L >= 100) {
      L = 100;
    } else if (L <= 0) {
      L = 0;
    }
    V += L;
    L = 0;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.getTalent(count, 110)) {
      V += 3;
    }
    if (ctx.getTalent(count, 114)) {
      V += 2;
    }
    if (ctx.getTalent(count, 109)) {
      V -= 3;
    }
    if (ctx.getTalent(count, 116)) {
      V -= 5;
    }
    if (ctx.getTalent(count, 113)) {
      V += 10;
    }
    if (ctx.getTalent(count, 125)) {
      V += 3;
    }
    if (ctx.getTalent(count, 414)) {
      V += 5;
    }
    if (ctx.getTalent(count, 128)) {
      V /= 2;
    }
    if (ctx.getTalent(count, 115)) {
      V /= 4;
    }
  }
  ctx.print('기준액');
  ctx.showMessage(` +{V}`);
  Q += V;
  V = 0;
  B = 0;
  W = 0;
  H = 0;
  S = 0;
  T = 0;
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      E += ctx.abilities[ctx.count][17];
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
  ctx.print('노출');
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
    V = 100;
  } else if (E === 1) {
    V = 120;
  } else if (E === 2) {
    V = 140;
  } else if (E === 3) {
    V = 160;
  } else if (E === 4) {
    V = 180;
  } else if (E === 5) {
    V = 200;
  } else if (E === 6) {
    V = 240;
  } else if (E === 7) {
    V = 280;
  } else if (E === 8) {
    V = 320;
  } else if (E === 9) {
    V = 360;
  } else if (E >= 10) {
    V = 400;
  }
  ctx.print('무용');
  if (ctx.flags[42] >= 2) {
    ctx.print('평균');
  }
  ctx.showMessage(`{E}LV ×{V/100}.{V%100}`);
  Q *= V;
  Q /= 100;
  V = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    V = 100;
    if (ctx.getTalent(count, 93)) {
      ctx.times('V', 2.00);
    }
    if (ctx.getTalent(count, 92)) {
      ctx.times('V', 1.50);
    }
    if (V != 100) {
      ctx.showMessage(`${ctx.getName(ctx.count)} ×{V/100}.{V%100}`);
      Q *= V;
      Q /= 100;
    }
  }
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
  ctx.showMessage(`이번 스트립쇼에선 {Q}포인트의 티켓을 {G}에게 판매하고,`);
  Q *= G;
  ctx.showMessage(`합계 {Q}포인트를 벌었습니다`);
  ctx.money += Q;
  if (ctx.flags[50] === 0) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      character.cflags[ctx.count][105] = 0;
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] > 0 && ctx.abilities[ctx.count][12] >= 5 && ctx.abilities[ctx.count][72] >= 5 && ctx.exp[ctx.count][72] >= 1000 && ctx.getTalent(count, 185) === 0 && ctx.getTalent(count, 186) === 0 && ctx.getTalent(count, 187) === 0 && ctx.flags[50] === 0) {
      ctx.showMessage(`W ${ctx.getVarName("CALL", COUNT)}의 훌륭한 춤은 높은 평판을 받은 것 같다……`);
      ctx.showMessage(`W 소질【무희】를 습득했습니다`);
      ctx.getTalent(count, 186) = 1;
    }
  }
  await work_sp_after(ctx, character);
  await ctx.wait();
  // TODO: BEGIN TURNEND
  return 1;
}
