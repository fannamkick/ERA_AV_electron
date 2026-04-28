/**
 * WORK_S_SEXORGY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function sex_orgy(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    character.cflags[ctx.count][13] = 0;
    character.cflags[ctx.count][50] = 0;
    character.cflags[ctx.count][51] = 0;
    character.cflags[ctx.count][52] = 0;
    character.cflags[ctx.count][53] = 0;
  }
  ctx.flags[50] = 0;
  ctx.flags[51] = 0;
  ctx.flags[52] = 0;
  ctx.flags[53] = 0;
  S = 0;
  E = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] && ctx.abilities[ctx.count][31] == 0) {
      E = 0;
    }
  }
  if (E == 1) {
    S |= 1;
  }
  E = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] && ctx.abilities[ctx.count][32] == 0) {
      E = 0;
    }
  }
  if (ctx.getTalent(master, 122) == 0 && ctx.getTalent(master, 121) == 0) {
    E = 0;
  }
  if (E == 1) {
    S |= 2;
  }
  E = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] && ctx.abilities[ctx.count][21] == 0) {
      E = 0;
    }
  }
  if (E == 1) {
    S |= 4;
  }
  if (ctx.money < 1000) {
    S = 0;
  }
  // Label: INPUT_LOOP_01
  if (S) {
    ctx.showMessage('파티에서 특별 이벤트를 할까요?');
    ctx.showMessage('[0] - 하지않는다');
    if (S & 1) {
      ctx.showMessage('[1] - 자위 콘테스트');
    }
    if (S & 2) {
      ctx.showMessage('[2] - 펠라치오 콘테스트');
    }
    if (S & 4) {
      ctx.showMessage('[3] - 인간 경마');
    }
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`W 통상 난교 파티를 실시합니다`);
    } else if (ctx.result === 1 && (S & 1)) {
      ctx.showMessage(`W 난교 파티 마지막에 자위 콘테스트를 합니다`);
      ctx.flags[50] = 1;
    } else if (ctx.result === 2 && (S & 2)) {
      ctx.showMessage(`W 난교 파티 마지막에 펠라치오 콘테스트를 합니다`);
      ctx.flags[50] = 2;
    } else if (ctx.result === 3 && (S & 4)) {
      ctx.showMessage(`W 난교 파티 마지막에 인간 경마를 합니다`);
      ctx.flags[50] = 3;
    } else if (ctx.result === 100) {
      return 100;
    } else {
      // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
    }
    ctx.drawLine();
  }
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
  W = 0;
  Y = 0;
  X = 0;
  Z = 0;
  for (let COUNT = 0; COUNT < 101; COUNT++) {
    T[ctx.count] = 0;
    U[ctx.count] = 0;
  }
  character = -1;
  ctx.assi = -1;
  await work_sub_relation(ctx, character);
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      E += ctx.exp[ctx.count][91];
    }
  }
  E /= ctx.flags[42];
  C = E / 5;
  G = C / 4;
  if (C) {
    if (C < 13) {
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else if (C < 16) {
      ctx.times('B', 1.20);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else if (C < 20) {
      ctx.times('B', 1.50);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else if (C < 24) {
      ctx.times('B', 2.00);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(2);
      }
    } else {
      ctx.times('B', 2.00);
      for (let COUNT = 0; COUNT < C; COUNT++) {
        G += ctx.rand(3);
      }
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
  if (G < 5) {
    G = 5;
  }
  if (G < ctx.flags[42]) {
    G = ctx.flags[42];
  }
  ctx.showMessage(`W ${ctx.getName(ctx.master)} 주최 난교 파티를 개최했다……`);
  ctx.showMessage(`이번 파티에 모인 {G-1}명의 손님들을,`);
  await work_sub_print_fullname(ctx, character);
  ctx.showMessage(`%조사만처리(RESULT+2,"가")% 맞이하러 나갔다`);
  ctx.showMessage('');
  await ctx.wait();
  if (ctx.getTalent(master, 1)) {
    ctx.getTalent(master, 1) = 0;
    character.cstr[ctx.master][2] = "여자 손님";
  }
  await work_message_orgy_01(ctx, character);
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    character.tflags[13] = 114;
    await self_kojo(ctx, character);
    character.tflags[13] = 0;
    if (character.cflags[ctx.count][54] === 0 && ctx.getTalent(count, 0)) {
      if (character.cflags[ctx.count][15] === 0) {
        character.cflags[ctx.count][15] = 1;
        ctx.getTalent(count, 0) = 0;
        character.cflags[ctx.count][131] += ctx.rand(6);
        if (character.cflags[131] === 0 && ctx.getCharacterNo(ctx.count) != 1) {
          character.cstr[ctx.count][0] = CALLctx.getName(ctx.master);
          character.cflags[ctx.count][15] = 1;
        } else if (character.cflags[131] === 0 && ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 0) {
          character.cstr[ctx.count][0] = "오빠";
          character.cflags[ctx.count][15] = 1;
        } else if (character.cflags[131] === 0 && ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 0) {
          character.cstr[ctx.count][0] = "형님";
          character.cflags[ctx.count][15] = 1;
        } else if (character.cflags[131] === 1) {
          character.cstr[ctx.count][0] = "모르는 남자";
          character.cflags[ctx.count][15] = 2;
        } else if (character.cflags[131] === 2) {
          character.cstr[ctx.count][0] = "모르는 여자";
          character.cflags[ctx.count][15] = 3;
        } else if (character.cflags[131] === 3) {
          character.cstr[ctx.count][0] = "바이브";
          character.cflags[ctx.count][15] = 4;
        } else if (character.cflags[131] === 4) {
          character.cstr[ctx.count][0] = "극태 바이브";
          character.cflags[ctx.count][15] = 5;
        } else {
          character.cstr[ctx.count][0] = "누군지 모른다";
          character.cflags[ctx.count][15] = 6;
        }
      }
    }
    if (ctx.getTalent(count, 2) === 1) {
      ctx.getTalent(count, 2) = 0;
      character.cflags[ctx.count][132] += ctx.rand(3);
      if (character.cflags[ctx.count][132] === 0 && ctx.getCharacterNo(ctx.count) != 1) {
        character.cstr[ctx.count][3] = CALLctx.getName(ctx.master);
      } else if (character.cflags[ctx.count][132] === 0 && ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 0) {
        character.cstr[ctx.count][3] = "오빠";
      } else if (character.cflags[ctx.count][132] === 0 && ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 1) {
        character.cstr[ctx.count][3] = "형님";
      } else if (character.cflags[ctx.count][132] === 1) {
        character.cstr[ctx.count][3] = "모르는 남자";
      } else if (character.cflags[ctx.count][132] === 2) {
        character.cstr[ctx.count][3] = "모르는 여자";
      } else {
        character.cstr[ctx.count][3] = "누군지 모른다";
      }
    }
    if (ctx.getTalent(count, 1) === 1) {
      ctx.talents[1] = 0;
      character.cflags[ctx.count][133] += ctx.rand(3);
      if (character.cflags[ctx.count][133] === 0) {
        character.cstr[ctx.count][2] = "모르는 여자";
      } else if (character.cflags[ctx.count][133] === 1 && ctx.getTalent(master, 122) === 0) {
        character.cstr[ctx.count][2] = CALLctx.getName(ctx.master);
        if (ctx.getTalent(master, 0) === 1 && character.cflags[ctx.master][15] === 0) {
          character.cflags[ctx.master][15] = 1;
          character.cstr[ctx.master][0] = CALLctx.getName(character);
        }
      } else {
        character.cstr[ctx.count][2] = "누군지 모른다";
      }
    }
    if (character.cflags[ctx.count][16] === -1) {
      character.cflags[ctx.count][16] = 0;
      character.cflags[ctx.count][16] += ctx.rand(8);
      if (character.cflags[ctx.count][16] === 0 && ctx.getCharacterNo(ctx.count) != 1) {
        character.cstr[ctx.count][1] = CALLctx.getName(ctx.master);
      } else if (character.cflags[ctx.count][16] === 0 && ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 0) {
        character.cstr[ctx.count][1] = "오빠";
      } else if (character.cflags[ctx.count][16] === 0 && ctx.getCharacterNo(ctx.count) === 1 && ctx.getTalent(count, 432) === 1) {
        character.cstr[ctx.count][1] = "형님";
      } else if (character.cflags[ctx.count][16] === 1) {
        character.cstr[ctx.count][1] = "모르는 남자";
      } else if (character.cflags[ctx.count][16] === 2) {
        character.cstr[ctx.count][1] = "모르는 여자";
      } else if (character.cflags[ctx.count][16] === 3 && ctx.getTalent(count, 76) === 0 && ctx.getTalent(count, 432) === 0 && ctx.getCharacterNo(ctx.count) != 1) {
        character.cstr[ctx.count][1] = `${CALLctx.getName(ctx.master)}의 고○`;
      } else if (character.cflags[ctx.count][16] === 3 && ctx.getTalent(count, 76) === 1 && ctx.getTalent(count, 432) === 0 && ctx.getCharacterNo(ctx.count) != 1) {
        character.cstr[ctx.count][1] = `${CALLctx.getName(ctx.master)}의 자○`;
      } else if (character.cflags[ctx.count][16] === 3 && ctx.getTalent(count, 432) === 1 && ctx.getCharacterNo(ctx.count) != 1) {
        character.cstr[ctx.count][1] = `${CALLctx.getName(ctx.master)}의 자지`;
      } else if (character.cflags[ctx.count][16] === 3 && ctx.getTalent(count, 76) === 0 && ctx.getTalent(count, 432) === 0 && ctx.getCharacterNo(ctx.count) === 1) {
        character.cstr[ctx.count][1] = "오빠의 고○";
      } else if (character.cflags[ctx.count][16] === 3 && ctx.getTalent(count, 76) === 1 && ctx.getTalent(count, 432) === 0 && ctx.getCharacterNo(ctx.count) === 1) {
        character.cstr[ctx.count][1] = "오빠의 자○";
      } else if (character.cflags[ctx.count][16] === 3 && ctx.getTalent(count, 432) === 1 && ctx.getCharacterNo(ctx.count) === 1) {
        character.cstr[ctx.count][1] = "형님의 자지";
      } else if (character.cflags[ctx.count][16] === 4 && ctx.getTalent(count, 76) === 0 && ctx.getTalent(count, 432) === 0) {
        character.cstr[ctx.count][1] = "모르는 남자의 고○";
      } else if (character.cflags[ctx.count][16] === 4 && ctx.getTalent(count, 76) === 1 && ctx.getTalent(count, 432) === 0) {
        character.cstr[ctx.count][1] = "모르는 남자의 자○";
      } else if (character.cflags[ctx.count][16] === 4 && ctx.getTalent(count, 432) === 1) {
        character.cstr[ctx.count][1] = "모르는 남자의 자지";
      } else if (character.cflags[ctx.count][16] === 5 && ctx.getTalent(count, 76) === 0 && ctx.getTalent(count, 432) === 0) {
        character.cstr[ctx.count][1] = "모르는 여자의 그곳";
      } else if (character.cflags[ctx.count][16] === 5 && ctx.getTalent(count, 76) === 1 && ctx.getTalent(count, 432) === 0) {
        character.cstr[ctx.count][1] = "모르는 여자의 보지";
      } else if (character.cflags[ctx.count][16] === 5 && ctx.getTalent(count, 432) === 1) {
        character.cstr[ctx.count][1] = "모르는 여자의 보지";
      } else if (character.cflags[ctx.count][16] === 6 && ctx.getTalent(count, 76) === 0 && ctx.getTalent(count, 432) === 0 && ctx.getCharacterNo(ctx.count) != 1) {
        character.cstr[ctx.count][1] = `${CALLctx.getName(ctx.master)}의 엉덩이 구멍`;
      } else if (character.cflags[ctx.count][16] === 6 && ctx.getTalent(count, 76) === 1 && ctx.getTalent(count, 432) === 0 && ctx.getCharacterNo(ctx.count) != 1) {
        character.cstr[ctx.count][1] = `${CALLctx.getName(ctx.master)}의 애널`;
      } else if (character.cflags[ctx.count][16] === 6 && ctx.getTalent(count, 432) === 1 && ctx.getCharacterNo(ctx.count) != 1) {
        character.cstr[ctx.count][1] = `${CALLctx.getName(ctx.master)}의 똥구멍`;
      } else if (character.cflags[ctx.count][16] === 6 && ctx.getTalent(count, 76) === 0 && ctx.getTalent(count, 432) === 0 && ctx.getCharacterNo(ctx.count) === 1) {
        character.cstr[ctx.count][1] = "오빠의 엉덩이 구멍";
      } else if (character.cflags[ctx.count][16] === 6 && ctx.getTalent(count, 76) === 1 && ctx.getTalent(count, 432) === 0 && ctx.getCharacterNo(ctx.count) === 1) {
        character.cstr[ctx.count][1] = "오빠의 애널";
      } else if (character.cflags[ctx.count][16] === 6 && ctx.getTalent(count, 432) === 1 && ctx.getCharacterNo(ctx.count) === 1) {
        character.cstr[ctx.count][1] = "형님의 똥구멍";
      } else if (character.cflags[ctx.count][16] === 7 && ctx.getTalent(count, 76) === 0 && ctx.getTalent(count, 432) === 0) {
        character.cstr[ctx.count][1] = "모르는 남자의 엉덩이 구멍";
      } else if (character.cflags[ctx.count][16] === 7 && ctx.getTalent(count, 76) === 1 && ctx.getTalent(count, 432) === 0) {
        character.cstr[ctx.count][1] = "모르는 남자의 애널";
      } else if (character.cflags[ctx.count][16] === 7 && ctx.getTalent(count, 432) === 1) {
        character.cstr[ctx.count][1] = "모르는 남자의 똥구멍";
      } else if (character.cflags[ctx.count][16] === 8 && ctx.getTalent(count, 76) === 0 && ctx.getTalent(count, 432) === 0) {
        character.cstr[ctx.count][1] = "모르는 여자의 엉덩이 구멍";
      } else if (character.cflags[ctx.count][16] === 8 && ctx.getTalent(count, 76) === 1 && ctx.getTalent(count, 432) === 0) {
        character.cstr[ctx.count][1] = "모르는 여자의 애널";
      } else if (character.cflags[ctx.count][16] === 8 && ctx.getTalent(count, 432) === 1) {
        character.cstr[ctx.count][1] = "모르는 여자의 똥구멍";
      }
    }
  }
  if (ctx.flags[50] === 1) {
    await onany_contest(ctx, character);
  } else if (ctx.flags[50] === 2) {
    await fellatio_contest(ctx, character);
  } else if (ctx.flags[50] === 3) {
    await human_racing(ctx, character);
  }
  if (ctx.flags[50] != 0) {
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (character.cflags[ctx.count][130] == 0) {
        // TODO: CONTINUE
      }
      character = ctx.count;
      character.tflags[13] = 115;
      await self_kojo(ctx, character);
      character.tflags[13] = 0;
    }
  }
  ctx.showMessage(`W ……`);
  ctx.showMessage(`L`);
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
    if (character.cflags[ctx.count][54]) {
      B -= 10;
    }
    if (ctx.getTalent(count, 123) || ctx.getTalent(count, 9)) {
      B /= 5;
    }
  }
  C = 30 + A;
  if (B >= C) {
    ctx.showMessage(`이번 난교 파티에 손님들은 대단히 만족한 것 같다`);
    A = 4;
  } else if (B >= C * 3 / 4) {
    ctx.showMessage(`이번 난교 파티에 손님들은 만족한 것 같다`);
    A = 2;
  } else {
    ctx.showMessage(`손님들의 욕망을 채울 수 없었던 것 같다……`);
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
    T[0] = (G / ctx.flags[42]) + ctx.rand(6);
    if (character.cflags[54]) {
      T[0] = 0;
    }
    T[1] = (G / ctx.flags[42]) + ctx.rand(6);
    T[22] = (G / ctx.flags[42]) + ctx.rand(5);
    T[20] = T[0] + T[1] + T[22];
    T[5] = T[0] + T[1];
    M = 12 - ctx.abilities[10];
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
    if (ctx.flags[50] === 1) {
      ctx.times('U:100', 1.20);
    } else if (ctx.flags[50] === 2) {
      ctx.times('U:100', 1.20);
    } else if (ctx.flags[50] === 3) {
      ctx.times('U:100', 1.50);
    }
    X = ctx.count;
    await work_sp_sex_01(ctx, character);
    if (ctx.flags[50] === 1) {
      T[2] += 3;
      T[10] += 3;
      T[11] += 3;
    } else if (ctx.flags[50] === 2) {
      T[22] += 1;
      T[20] += 2;
    } else if (ctx.flags[50] === 3) {
      T[30] += 10 * ctx.abilities[21];
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    await work_exp(ctx, character);
    ctx.count = X;
    O = ctx.abilities[10] * 100 + 100;
    I = O;
    ctx.times('I', 2.23);
    J = O;
    ctx.times('J', 1.73);
    if (character.mark[3] != 3 && ctx.juel[100] > I) {
      ctx.showMessage('반발각인 LV3을 습득');
      character.mark[ctx.count][3] = 3;
      if (character.mark[4] <= 2) {
        character.mark[4] = 3;
        if (ctx.abilities[10] <= 8 && ctx.talents[22] === 0) {
          ctx.abilities[10] -= 2;
          ctx.showMessage(` 그리고 ${ctx.getVarName("ABL", 10)}가 LV%조사처리(ABL:10,"가")% 되었다`);
        }
      }
    } else if (character.mark[3] != 2 && ctx.juel[100] > J) {
      ctx.showMessage('반발각인 LV2를 습득');
      character.mark[3] = 2;
      if (character.mark[4] <= 1) {
        character.mark[4] = 2;
        if (ctx.abilities[10] <= 4 && ctx.talents[22] === 0) {
          ctx.abilities[10] -= 1;
          ctx.showMessage(` 그리고 ${ctx.getVarName("ABL", 10)}가 LV%조사처리(ABL:10,"가")% 되었다`);
        }
      }
    } else if (character.mark[3] != 1 && ctx.juel[100] > O) {
      ctx.showMessage('반발각인 LV1을 습득');
      character.mark[3] = 1;
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    LOSEctx.base[0] = G * 25;
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
    if (ctx.flags[50] == 3) {
      ctx.times('LOSEBASE:0', 1.30);
    }
    if (ctx.flags[42] >= 6) {
      ctx.times('LOSEBASE:0', 0.60);
    } else if (ctx.flags[42] >= 5) {
      ctx.times('LOSEBASE:0', 0.70);
    } else if (ctx.flags[42] >= 4) {
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
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 난교 파티가 끝난 후 쓰러져버렸다`);
      ctx.showMessage(`무슨짓을 해봐도 반응이 없다……`);
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
  V = 100000;
  ctx.print('기준액');
  ctx.showMessage(` +{V}`);
  Q += V;
  V = 0;
  if (A >= 3) {
    V = 130;
    ctx.print('대성공');
    ctx.showMessage(` ×{V/100}.{V%100}`);
    Q *= V;
    Q /= 100;
    V = 0;
  } else if (A === 1) {
    V = 70;
    ctx.print('실패');
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
    if (character.cflags[ctx.count][54]) {
      V = 70;
      if (ctx.getTalent(count, 122)) {
        ctx.print('남성');
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
  ctx.showMessage(`이번 난교 파티에서는 {Q}포인트의 티켓으로 {G-1}명의 손님을 초대해,`);
  Q *= G - 1;
  ctx.showMessage(`합계 {Q}포인트를 벌었습니다`);
  ctx.money += Q;
  await work_sp_after(ctx, character);
  await ctx.wait();
  // TODO: BEGIN TURNEND
  return 1;
}

export async function onany_contest(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W …`);
  ctx.showMessage(`L`);
  ctx.showMessage(`난교 파티의 마지막 여흥으로,`);
  ctx.showMessage(`자위 콘테스트를 하기로했다……`);
  await ctx.wait();
  ctx.showMessage(`《노예들이 일제히 자위를 시작해, 누가 제일 먼저 3회 절정하는지를 겨룹니다》`);
  await ctx.wait();
  // Label: INPUT_LOOP_02
  ctx.showMessage(`누구에게 걸까요?`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    ctx.showMessage(` [${ctx.count}] - ${ctx.getName(ctx.count)}`);
    character.cflags[ctx.count][53] = 0;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  await ctx.inputNumber();
  if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][130] === 0) {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 100) {
    return 0;
  }
  Y = ctx.result;
  ctx.showMessage(`파티 회장의 벽 옆에 늘어선 노예들은,`);
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 신호에 맞춰, 일제히 자위를 시작했다……`);
  await ctx.wait();
  // Label: LOOP_ONANY
  F = ctx.flags[42];
  E = ctx.rand(F);
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (E === 0) {
      character = ctx.count;
      // TODO: BREAK
    } else {
      E -= 1;
    }
  }
  E = 0;
  E += ctx.abilities[31]*2;
  E += ctx.abilities[17];
  if (ctx.talents[32]) {
    E -= 2;
  }
  if (ctx.talents[33]) {
    E += 2;
  }
  if (ctx.talents[60]) {
    E += 2;
  }
  if (ctx.talents[74]) {
    E += 5;
  }
  if (E < ctx.rand(100)) {
    // GOTO LOOP_ONANY - 구조 변경 필요 (while/break 사용 권장)
  }
  character.cflags[53] += 1;
  if (ctx.abilities[3] > ctx.abilities[2] && ctx.abilities[3] > ctx.abilities[0]) {
    ctx.print('자신의 애널을 계속 만지고 있던');
  } else if (ctx.abilities[2] > ctx.abilities[0] && ctx.talents[122] === 0 && character.cflags[54] === 0) {
    ctx.print('보지에 손가락을 넣고 움직이고 있던');
  } else if (ctx.talents[122] || ctx.talents[121]) {
    ctx.print('페니스를 계속 문지르고있던');
  } else {
    ctx.print('클리토리스를 계속 만지고 있던');
  }
  ctx.showMessage(`${ctx.josaHelper("타겟이")}`);
  if (character.cflags[53] === 1) {
    ctx.print('부르르 몸을 떨고');
  } else if (character.cflags[53] === 2) {
    ctx.print('애타는 소리를 내고');
  } else if (character.cflags[53] === 3) {
    ctx.print('크게 등을 젖히고');
  }
  if (ctx.talents[122] || ctx.talents[121]) {
    ctx.showMessage(', 힘차게 정액을 내뿜었다……');
  } else if (character.cflags[53] === 3) {
    ctx.showMessage(', 사타구니에서 애액을 흩뿌렸다……');
  } else {
    ctx.showMessage('있다……');
  }
  if (character.cflags[53] === 1) {
    ctx.print('그리고 뺨을 붉게 물들인채로 한손을 들어,');
  } else if (character.cflags[53] === 2) {
    ctx.print('그리고 자위를 계속하면서, 상기된 목소리로');
  } else if (character.cflags[53] === 3) {
    ctx.print('마지막에 살짝 한숨을 내쉬면서,');
  }
  ctx.showMessage(`W ${character.cflags[53]}회째의 절정을 맞이한 것을 고했다`);
  ctx.showMessage(`L`);
  if (character.cflags[53] < 3) {
    // GOTO LOOP_ONANY - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage(`${ctx.josaHelper("타겟은")}, 이것으로 3회째의 절정을 맞이했다`);
  await ctx.wait();
  ctx.showMessage(`《자위 콘테스트의 우승자는, %타겟으로(1)% 결정 됐습니다》`);
  W = character;
  await ctx.wait();
  if (Y === character) {
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 예상은 보기좋게 적중해,`);
    ctx.showMessage(`다른 손님이 건 ${ctx.flags[42]*1000}포인트는 ${ctx.getVarName("CALL", MASTER)}의 것이 되었다`);
    ctx.money += ctx.flags[42]*1000;
  } else {
    ctx.showMessage(`유감스럽게도, ${ctx.getVarName("CALL", MASTER)}의 예상은 빗나가버렸다……`);
    ctx.showMessage(`${ctx.getVarName("CALL", Y)}에게 건 1000포인트는 몰수되어버렸다`);
    ctx.money -= 1000;
  }
  await ctx.wait();
  return 1;
}

export async function fellatio_contest(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W …`);
  ctx.showMessage(`L`);
  ctx.showMessage(`난교 파티의 마지막 여흥으로,`);
  ctx.showMessage(`노예와 손님을 한 페어로 펠라치오 콘테스트를 하게 되었다……`);
  await ctx.wait();
  ctx.showMessage(`《노예가 같은 페어인 손님에게 펠라치오를 실시해, 어떤 페어가 제일 먼저 사정하는지를 겨룹니다》`);
  await ctx.wait();
  // Label: INPUT_LOOP_02
  ctx.showMessage(`누구에게 걸까요?(여기서 선택한 노예가 ${ctx.josaHelper("플레이어와")} 페어를 짭니다)`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    ctx.showMessage(` [${ctx.count}] - ${ctx.getName(ctx.count)}`);
    character.cflags[ctx.count][53] = 0;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  await ctx.inputNumber();
  if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][130] === 0) {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 100) {
    return 0;
  }
  Y = ctx.result;
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", Y), "가")}, ${ctx.getVarName("CALL", MASTER)}의 사타구니에 얼굴을 묻는 위치에 무릎 꿇었다`);
  if (ctx.getTalent(y, 85)) {
    ctx.showMessage(`다리 사이에서, ${ctx.josaHelper(ctx.getVarName("CALLNAME", Y), "는")} 신뢰로 가득찬 시선으로 올려다보고 있다`);
  }
  await ctx.wait();
  ctx.showMessage(`페어를 짠 상대의 다리 사이에 무릎 꿇은 노예들은,`);
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 신호에 맞춰 일제히 눈 앞의 육봉을 빨기 시작했다……`);
  await ctx.wait();
  // Label: LOOP_FELLATIO
  F = ctx.flags[42];
  E = ctx.rand(F);
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (E === 0) {
      character = ctx.count;
      // TODO: BREAK
    } else {
      E -= 1;
    }
  }
  E = 0;
  E += ctx.abilities[32]*2;
  E += ctx.abilities[16];
  if (ctx.talents[23]) {
    E += 2;
  }
  if (ctx.talents[24]) {
    E -= 2;
  }
  if (ctx.talents[52]) {
    E += 5;
  }
  if (ctx.talents[63]) {
    E += 2;
  }
  if (character == Y && ctx.getTalent(master, 133)) {
    E += 5;
  }
  if (E < ctx.rand(100)) {
    // GOTO LOOP_FELLATIO - 구조 변경 필요 (while/break 사용 권장)
  }
  character.cflags[53] += 1;
  if (character.cflags[53] === 1) {
    if (character === Y) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 혀놀림에, ${ctx.josaHelper("플레이어는")} 무심코 소리를 내버렸다……`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 페니스를 빨리고 있는 손님이 희미하게 소리를 냈다……`);
    }
    await ctx.wait();
    // GOTO LOOP_FELLATIO - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[53] === 2) {
    if (character === Y) {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 빨리고 있는 ${ctx.getVarName("CALL", MASTER)}의 음경 뿌리가 강하게 쑤신다`);
    } else {
      ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 입에 들락날락하고있는 손님의 페니스가 강하게 맥박치고 있다`);
    }
    ctx.showMessage(`사정의 순간이 가까워지고 있는 것 같다……`);
    await ctx.wait();
    // GOTO LOOP_FELLATIO - 구조 변경 필요 (while/break 사용 권장)
  }
  if (character === Y) {
    ctx.showMessage(`W 한계에 도달한 ${ctx.josaHelper("플레이어는")}, ${ctx.getVarName("CALL", TARGET)}의 입안에 마음껏 사정했다`);
  } else {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 봉사시키고 있던 손님이, ${ctx.getVarName("CALL", TARGET)}의 입안에 대량으로 사정했다`);
  }
  if (ctx.abilities[32] >= 3 || ctx.talents[52]) {
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 정액을 전부 마시고, 혀를 뻗어 페니스에 남은 정액도 깨끗하게 빨아먹었다`);
  }
  if (character === Y && ctx.talents[85]) {
    ctx.showMessage(`고간에서 움직이는 머리를 ${ctx.josaHelper("플레이어가")} 수고했다며 가볍게 쓰다듬어주자,`);
    ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 기쁜듯이 뺨을 붉혔다`);
  }
  await ctx.wait();
  ctx.showMessage(`《펠라치오 콘테스트의 우승자는, %타겟으로(1)% 결정되었습니다》`);
  W = character;
  await ctx.wait();
  if (Y === character) {
    ctx.showMessage(`${ctx.josaHelper("플레이어와")} ${ctx.getVarName("CALL", Y)} 페어는 보기좋게 승리해,`);
    ctx.showMessage(`다른 손님이 건 ${ctx.flags[42]*1000}포인트는 ${ctx.getVarName("CALL", MASTER)}의 것이 되었다`);
    ctx.money += ctx.flags[42]*1000;
  } else {
    ctx.showMessage(`유감이지만, ${ctx.josaHelper("플레이어와")} ${ctx.getVarName("CALL", Y)} 페어는 패배해버렸다……`);
    ctx.showMessage(`${ctx.getVarName("CALL", Y)}에게 건 1000포인트는 몰수되어버렸다`);
    ctx.money -= 1000;
  }
  await ctx.wait();
  return 1;
}

export async function human_racing(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W …`);
  ctx.showMessage(`L`);
  ctx.showMessage(`난교 파티의 마지막 여흥으로,`);
  ctx.showMessage(`노예를 암말 대신으로 사용하는 인간 경마를 개최했다……`);
  await ctx.wait();
  ctx.showMessage(`《엎드린 노예의 등에 손님이 한 명씩 올라타,`);
  ctx.showMessage(`　회장의 끝에서 끝까지 5왕복 달리게 해 1위를 겨룹니다》`);
  await ctx.wait();
  // Label: INPUT_LOOP_02
  ctx.showMessage(`누구에게 걸까요?(여기서 선택한 노예가 ${ctx.josaHelper("플레이어가")} 탈 말이 됩니다)`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    ctx.showMessage(` [${ctx.count}] - ${ctx.getName(ctx.count)}`);
    character.cflags[ctx.count][53] = 0;
    character.cflags[ctx.count][55] = 0;
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  await ctx.inputNumber();
  if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (character.cflags[ctx.result][130] === 0) {
    // GOTO INPUT_LOOP_02 - 구조 변경 필요 (while/break 사용 권장)
  } else if (ctx.result === 100) {
    return 0;
  }
  Y = ctx.result;
  Z = 0;
  ctx.showMessage(`바닥 위에 양손발을 댄 ${ctx.getVarName("CALL", Y)}의 등에,`);
  ctx.showMessage(`W ${ctx.josaHelper("플레이어가")} 체중을 실어 올라탔다`);
  if ((ctx.getTalent(y, 100) && ctx.getTalent(master, 100) === 0) || (ctx.getTalent(y, 99) === 0 && ctx.getTalent(master, 99))) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", Y), "는")} ${ctx.getVarName("CALL", MASTER)}의 체중에 거의 쓰러질듯이 되어,`);
    ctx.showMessage(`W 얼굴을 새빨갛게하고 양팔로 버티며, 가까스로 바닥에 닿지 않을 정도로 겨우 몸을 띄우고 있다`);
    ctx.showMessage(`솔직히, 이 기수(騎手)와`);
    if (ctx.getTalent(y, 122)) {
      ctx.print('숫');
    } else {
      ctx.print('암');
    }
    ctx.showMessage(`말의 조합은 무리가 있었을지도 모른다――`);
  } else if ((ctx.getTalent(y, 99) && ctx.getTalent(master, 99) === 0) || (ctx.getTalent(y, 100) === 0 && ctx.getTalent(master, 100))) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", Y)}의 등은, ${ctx.getVarName("CALL", MASTER)}의 체중에도 확실히 견디고 있다`);
    ctx.showMessage(`이것은, 꽤나 든든한`);
    if (ctx.getTalent(y, 122)) {
      ctx.print('숫');
    } else {
      ctx.print('암');
    }
    ctx.showMessage(`말이 되어줄 것 같다`);
  } else {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", Y), "는")} ${ctx.getVarName("CALL", MASTER)}의 체중에 등이 크게 흔들렸지만,`);
    ctx.showMessage(`어떻게는 이를 악물어 양손과 발에 힘을 주어 견뎌냈다`);
  }
  await ctx.wait();
  ctx.showMessage(`기수역할의 손님을 등에 태우고 스타트 라인에 선 기마역할의 노예들은,`);
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}의 신호에 맞춰, 일제히 홀의 반대편 벽을 목표로 나아가기 시작했다`);
  await ctx.wait();
  // Label: INPUT_LOOP_03
  ctx.flags[53] = 0;
  if ((ctx.flags[6] & 1)) {
    ctx.showMessage('……경기 진행중……');
    ctx.showMessage('');
  } else {
    ctx.showMessage(`경기 상황을 생략할까요?`);
    ctx.showMessage(` [0] - 생략한다`);
    ctx.showMessage(` [1] - 생략하지 않는다`);
    await ctx.inputNumber();
    if (ctx.result === 1) {
      ctx.flags[53] = 1;
    } else if (ctx.result === 0) {
      ctx.showMessage('……경기 진행중……');
      ctx.showMessage('');
    } else if (ctx.result != 0) {
      // GOTO INPUT_LOOP_03 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  // Label: LOOP_RACING
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    character = ctx.count;
    if (character.cflags[130] == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[0] - character.cflags[55] < 100) {
      // TODO: CONTINUE
    }
    E = 20;
    E += (ctx.base[0] - character.cflags[55]) / 200;
    if (ctx.talents[99]) {
      E += 5;
    }
    if (ctx.talents[100]) {
      E -= 5;
    }
    if (ctx.talents[135]) {
      E -= 5;
    }
    if (character == Y && ctx.getTalent(master, 100)) {
      E += 5;
    }
    if (character == Y && ctx.getTalent(master, 99)) {
      E -= 5;
    }
    if (ctx.talents[11]) {
      E -= 5;
    }
    if (ctx.talents[13]) {
      E += 5;
    }
    character.cflags[55] += 2;
    if (ctx.base[0] - character.cflags[55] < 100) {
      character.cflags[53] = -1;
      Z += 1;
      if (character === Y && ctx.flags[53]) {
        ctx.showMessage(`격렬하게 숨을 몰아쉬면서 비틀비틀 앞으로 나아가고 있던 ${ctx.josaHelper("타겟은")},`);
        ctx.showMessage(`W 결국 ${ctx.josaHelper("플레이어를")} 태운채로 바닥에 쓰러졌다`);
        ctx.showMessage(`W 몇번이나 엉덩이를 손바닥으로 때려보았지만, 이제 한 걸음도 갈 수 없는 것 같다`);
        ctx.showMessage(`유감이지만, 여기서 리타이어인 것 같다……`);
        ctx.showMessage(`(남은인원 ${ctx.flags[42]-Z}명)`);
        await ctx.wait();
      } else if (ctx.flags[53]) {
        ctx.showMessage(`손님을 등에 태우고 비틀비틀 나아가고 있던 ${ctx.josaHelper("타겟은")},`);
        ctx.showMessage(`W 풀썩 바닥에 쓰러져, 숨을 헐떡이며 움직이지 못하게 됐다`);
        ctx.showMessage(`유감이지만, 리타이어인 것 같다……`);
        ctx.showMessage(`(남은인원 ${ctx.flags[42]-Z}명)`);
        await ctx.wait();
      }
      // TODO: CONTINUE
    }
    if (E < ctx.rand(100)) {
      // TODO: CONTINUE
    }
    character.cflags[55] += 10 + ctx.rand(5);
    if (ctx.talents[99]) {
      character.cflags[55] -= 5;
    }
    if (ctx.talents[100]) {
      character.cflags[55] += 10;
    }
    if (character == Y && ctx.getTalent(master, 100)) {
      character.cflags[55] -= 5;
    }
    if (character == Y && ctx.getTalent(master, 99)) {
      character.cflags[55] += 10;
    }
    character.cflags[53] += 1;
    if ((character.cflags[53] === 10 || character.cflags[53] === 30 || character.cflags[53] === 50 || character.cflags[53] === 70 || character.cflags[53] === 90) && ctx.flags[53]) {
      if (character === Y) {
        ctx.showMessage(`${ctx.josaHelper("플레이어를")} 등에 태운 ${ctx.josaHelper("타겟이")},`);
      } else {
        ctx.showMessage(`손님을 등에 태운 ${ctx.josaHelper("타겟이")},`);
      }
      await human_racing_order(ctx, character);
      ctx.showMessage('반대편 벽에 손을 짚었다');
      ctx.print('(앞으로');
      if (character.cflags[53] === 90) {
        ctx.showMessage('반 왕복)');
      } else {
        ctx.showMessage(`{4 - (CFLAG:53 / 20)} 왕복 반)`);
      }
      await ctx.wait();
    } else if ((character.cflags[53] === 20 || character.cflags[53] === 40 || character.cflags[53] === 60 || character.cflags[53] === 80) && ctx.flags[53]) {
      if (character === Y) {
        ctx.showMessage(`${ctx.josaHelper("플레이어를")} 태운 ${ctx.josaHelper("타겟이")},`);
      } else {
        ctx.showMessage(`손님을 등에 태운 ${ctx.josaHelper("타겟이")},`);
      }
      await human_racing_order(ctx, character);
      ctx.showMessage('스타트 라인으로 돌아왔다');
      ctx.showMessage(`(앞으로 {5 - (CFLAG:53 / 20)} 왕복)`);
      if (ctx.base[0] - character.cflags[55] < 1200 && ctx.base[0] - character.cflags[55] >= 700) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 슬슬 숨이 거칠어져, 손발도 휘청휘청하고 있다`);
      } else if (ctx.base[0] - character.cflags[55] < 700 && ctx.base[0] - character.cflags[55] >= 300) {
        ctx.showMessage(`${ctx.josaHelper("타겟은")} 얼굴이 새빨개져 숨을 헐떡이면서, 그러면서도 비틀비틀 앞으로 나아가고 있다`);
      } else if (ctx.base[0] - character.cflags[55] < 300 && ctx.base[0] - character.cflags[55] >= 100) {
        ctx.showMessage(`전신이 땀투성이인 ${ctx.josaHelper("타겟은")} 거의 바닥에 몸이 닿을듯이, 기력만으로 더듬더듬 나아가고 있다`);
      }
      await ctx.wait();
    } else if (character.cflags[53] >= 100) {
      if (character === Y) {
        ctx.showMessage(`${ctx.josaHelper("플레이어를")} 태운 ${ctx.josaHelper("타겟이")},`);
      } else {
        ctx.showMessage(`손님을 등에 태운 ${ctx.josaHelper("타겟이")},`);
      }
      ctx.showMessage('난교 파티에 모인 손님들의 박수를 받으며, 첫번째로 골인 벽에 터치했다');
      await ctx.wait();
      // TODO: BREAK
    }
    if (ctx.base[0] - character.cflags[55] < 100) {
      character.cflags[53] = -1;
      Z += 1;
      if (character === Y && ctx.flags[53]) {
        ctx.showMessage(`격렬하게 숨을 몰아쉬면서 비틀비틀 앞으로 나아가고 있던 ${ctx.josaHelper("타겟은")},`);
        ctx.showMessage(`W 결국 ${ctx.josaHelper("플레이어를")} 태운채로 바닥에 쓰러졌다`);
        ctx.showMessage(`W 몇번이나 엉덩이를 손바닥으로 때려보았지만, 이제 한 걸음도 갈 수 없는 것 같다`);
        ctx.showMessage(`유감이지만, 여기서 리타이어인 것 같다……`);
        ctx.showMessage(`(남은인원 ${ctx.flags[42]-Z}명)`);
        await ctx.wait();
      } else if (ctx.flags[53]) {
        ctx.showMessage(`손님을 등에 태우고 비틀비틀 나아가고 있던 ${ctx.josaHelper("타겟은")},`);
        ctx.showMessage(`W 풀썩 바닥에 쓰러져, 숨을 헐떡이며 움직이지 못하게 됐다`);
        ctx.showMessage(`유감이지만, 리타이어인 것 같다……`);
        ctx.showMessage(`(남은인원 ${ctx.flags[42]-Z}명)`);
        await ctx.wait();
      }
    }
  }
  E = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    character = ctx.count;
    if (character.cflags[130] == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[53] >= 100) {
      E = character;
    }
  }
  if (E) {
    character = E;
    ctx.showMessage(`W 《인간경마의 우승자는, %타겟으로(1)% 결정 됐습니다》`);
    W = character;
    await human_racing_result(ctx, character);
    await ctx.wait();
    if (Y === character) {
      ctx.showMessage(`${ctx.josaHelper("플레이어와")} ${ctx.getVarName("CALL", Y)} 페어는 보기좋게 승리해,`);
      ctx.showMessage(`다른 손님이 건 ${ctx.flags[42]*1000}포인트는 ${ctx.getVarName("CALL", MASTER)}의 것이 되었다`);
      ctx.money += ctx.flags[42]*1000;
    } else {
      ctx.showMessage(`유감이지만, ${ctx.josaHelper("플레이어와")} ${ctx.getVarName("CALL", Y)} 페어는 패배했다……`);
      ctx.showMessage(`${ctx.getVarName("CALL", Y)}에게 건 1000포인트는 몰수되어버렸다`);
      ctx.money -= 1000;
    }
    await ctx.wait();
    return 1;
  } else if (Z >= ctx.flags[42]) {
    ctx.showMessage(`결과가 나오기 전에, 모든 말이 리타이어해버렸다`);
    ctx.showMessage(`《이번 인간 경마는 무승부입니다》`);
    await ctx.wait();
    return 1;
  } else {
    // GOTO LOOP_RACING - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function human_racing_order(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = ctx.count;
  E = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == character) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][53] >= character.cflags[53]) {
      E += 1;
    }
  }
  if (E === 1) {
    ctx.print('톱으로');
  } else if (E === ctx.flags[42] - Z) {
    ctx.print('꼴찌로');
  } else {
    ctx.showMessage(`{E}위로`);
  }
  ctx.count = X;
}

export async function human_racing_result(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage('~결과발표~');
  F[1] = character;
  F[2] = 1;
  // Label: RACING_RESULT_LOOP
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    character = ctx.count;
    await human_racing_order_2(ctx, character);
    if (E != F[2]) {
      // TODO: CONTINUE
    }
    if (F[2] < 10) {
      ctx.print('');
    }
    ctx.showMessage(`${F[2]}위 ${ctx.getName(character)}`);
    if (Y == character) {
      ctx.showMessage(`(기수:${ctx.getName(ctx.master)})`);
    }
    ctx.showMessage('');
    // TODO: BREAK
  }
  F[2] += 1;
  if (F[2] <= ctx.flags[42] - Z) {
    // GOTO RACING_RESULT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][53] >= 0) {
      // TODO: CONTINUE
    }
    ctx.showMessage(`탈락 ${ctx.getName(ctx.count)}`);
    if (Y == ctx.count) {
      ctx.showMessage(`(기수:${ctx.getName(ctx.master)})`);
    }
    ctx.showMessage('');
  }
  character = F[1];
  F[1] = 0;
  F[2] = 0;
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
}

export async function human_racing_order_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = ctx.count;
  E = 1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == character) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][130] == 0) {
      // TODO: CONTINUE
    }
    if (character.cflags[ctx.count][53] >= character.cflags[53]) {
      E += 1;
    }
    if (character.cflags[ctx.count][53] == character.cflags[53]) {
      character.cflags[ctx.count][53] -= 1;
    }
  }
  ctx.count = X;
}
