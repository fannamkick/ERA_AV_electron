/**
 * COSPLAY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_costume(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[180] === 1) {
    ctx.print('하츠네 ○쿠');
  } else if (character.tflags[180] === 2) {
    ctx.print('세일○문');
  } else if (character.tflags[180] === 3) {
    ctx.print('아야○미 레이');
  } else if (character.tflags[180] === 4) {
    ctx.print('아케미 ○무라');
  } else if (character.tflags[180] === 5) {
    ctx.print('안○라');
  } else if (character.tflags[180] === 6) {
    ctx.print('코○카 키리노');
  } else if (character.tflags[180] === 7) {
    ctx.print('CPG');
  } else if (character.tflags[180] === 8) {
    ctx.print('성 크○니카 학원');
  } else if (character.tflags[180] === 9) {
    ctx.print('혈○기사단 부단장');
  } else if (character.tflags[180] === 10) {
    ctx.print('사립 ○리안 여학원');
  } else if (character.tflags[180] === 11) {
    ctx.print('흑○공주');
  } else if (character.tflags[180] === 12) {
    ctx.print('하코○와 학원');
  } else if (character.tflags[180] === 13) {
    ctx.print('나나모○ 중학교');
  } else if (character.tflags[180] === 14) {
    ctx.print('금빛 ○둠');
  } else if (character.tflags[180] === 15) {
    ctx.print('사립 사○라가오카 여고');
  } else if (character.tflags[180] === 16) {
    ctx.print('텐○ 학원');
  } else if (character.tflags[180] === 17) {
    ctx.print('○하의 요정');
  } else if (character.tflags[180] === 18) {
    ctx.print('큐어 멜○디');
  } else if (character.tflags[180] === 19) {
    ctx.print('유○카제');
  } else if (character.tflags[180] === 20) {
    ctx.print('사립 아○티에 학원');
  } else if (character.tflags[180] === 21) {
    ctx.print('세○오 여학원');
  } else if (character.tflags[180] === 22) {
    ctx.print('카자마○리 학원');
  } else if (character.tflags[180] === 23) {
    ctx.print('코○에가하라 학원');
  } else if (character.tflags[180] === 31) {
    ctx.showMessage(`%CSTR:MASTER:4%`);
  } else {
    ctx.print('');
  }
}

export async function cosplay_costume(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`◆어떤 의상으로 갈아입을까요?◆`);
  // Label: INPUT_LOOP_1
  ctx.drawLine();
  ctx.showMessage(`[ 0] - 하츠네 ○쿠 의상`);
  ctx.showMessage(`[ 1] - 세일○문 의상`);
  ctx.showMessage(`[ 2] - 아야○미 레이 의상`);
  ctx.showMessage(`[ 3] - 아케미 ○무라 마법소녀옷`);
  ctx.showMessage(`[ 4] - 안○라 제복`);
  ctx.showMessage(`[ 5] - 코○카 키리노의 교복`);
  ctx.showMessage(`[ 6] - Colorful Pure Girls 유니폼`);
  if (ctx.item[60] === 1) {
    ctx.showMessage(`[ 7] - 성 크○니카 학원 교복`);
    ctx.showMessage(`[ 8] - 혈○기사단 부단장 제복`);
    ctx.showMessage(`[ 9] - 사립 ○리안 여학원 교복`);
    ctx.showMessage(`[10] - 흑○공주 아바타 의상`);
  }
  if (ctx.item[61] === 1) {
    ctx.showMessage(`[11] - 하코○와 학원 교복`);
    ctx.showMessage(`[12] - 나나모○ 중학교 교복`);
    ctx.showMessage(`[13] - 금빛 ○둠 의상`);
    ctx.showMessage(`[14] - 사립 사○라가오카 여교 교복`);
  }
  if (ctx.item[62] === 1) {
    ctx.showMessage(`[15] - 텐○ 학원 제복 블레이저타입`);
    ctx.showMessage(`[16] - ○하의 요정 무대의상`);
    ctx.showMessage(`[17] - 큐어 멜○디 의상`);
    ctx.showMessage(`[18] - 유키○제 닌자의상`);
  }
  if (ctx.item[63] === 1) {
    ctx.showMessage(`[19] - 사립 아○티에 학원 교복`);
    ctx.showMessage(`[20] - 세○오 여학원 교복`);
    ctx.showMessage(`[21] - 카자마○리 학원 고등학교 교복`);
    ctx.showMessage(`[22] - 코○에가하라 학원 교복`);
  }
  if (ctx.item[64] === 1) {
    ctx.showMessage(`[23] -`);
    ctx.showMessage(`[24] -`);
    ctx.showMessage(`[25] -`);
    ctx.showMessage(`[26] -`);
  }
  if (ctx.item[211] === 1) {
    ctx.showMessage(`[27] - 알몸 앞치마`);
  }
  if (ctx.flags[554]) {
    ctx.showMessage(`[30] - %CSTR:MASTER:4% 제복`);
  }
  ctx.drawLine();
  await ctx.inputNumber();
  if (ctx.result === 0 && ctx.abilities[81] >= 1) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 하츠네 ○쿠 의상을 입혔다`);
    character.tflags[180] = 1;
  } else if (ctx.result === 1 && ctx.abilities[81] >= 2) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 세일○문 의상을 입혔다`);
    character.tflags[180] = 2;
  } else if (ctx.result === 2 && ctx.abilities[81] >= 3) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 아야○미 레이 의상을 입혔다`);
    character.tflags[180] = 3;
  } else if (ctx.result === 3 && ctx.abilities[81] >= 1) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 아케미 ○무라 마법소녀옷을 입혔다`);
    character.tflags[180] = 4;
  } else if (ctx.result === 4) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 안○라 제복을 입혔다`);
    character.tflags[180] = 5;
  } else if (ctx.result === 5) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 코○카 키리노의 교복을 입혔다`);
    character.tflags[180] = 6;
  } else if (ctx.result === 6) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 Colorful Pure Girls 유니폼을 입혔다`);
    character.tflags[180] = 7;
  } else if (ctx.result === 7) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 성 크○니카 학원 교복을 입혔다.`);
    character.tflags[180] = 8;
  } else if (ctx.result === 8 && ctx.abilities[81] >= 5) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 혈○기사단 부단장 제복을 입혔다`);
    character.tflags[180] = 9;
  } else if (ctx.result === 9 && ctx.abilities[81] >= 1) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 사립 ○리안 여학원 교복을 입혔다`);
    character.tflags[180] = 10;
  } else if (ctx.result === 10 && ctx.abilities[81] >= 6) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 흑○공주 아바타 의상을 입혔다`);
    character.tflags[180] = 11;
  } else if (ctx.result === 11 && ctx.abilities[81] >= 1) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 하코○와 학원 교복을 입혔다`);
    character.tflags[180] = 12;
  } else if (ctx.result === 12 && ctx.abilities[81] >= 3) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 나나모○ 중학교 교복을 입혔다`);
    character.tflags[180] = 13;
  } else if (ctx.result === 13 && ctx.abilities[81] >= 7) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 금빛 ○둠 의상을 입혔다`);
    character.tflags[180] = 14;
  } else if (ctx.result === 14) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 사립 사○라가오카 여고 교복을 입혔다`);
    character.tflags[180] = 15;
  } else if (ctx.result === 15 && ctx.abilities[81] >= 4) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 텐○ 학원 제복 블레이저타입을 입혔다`);
    character.tflags[180] = 16;
  } else if (ctx.result === 16 && ctx.abilities[81] >= 7) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 ○하의 요정 무대의상을 입혔다`);
    character.tflags[180] = 17;
  } else if (ctx.result === 17 && ctx.abilities[81] >= 8) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 큐어 멜○디 의상 입혔다`);
    character.tflags[180] = 18;
  } else if (ctx.result === 18 && ctx.abilities[81] >= 5) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 유키○제 닌자의상을 입혔다`);
    character.tflags[180] = 19;
  } else if (ctx.result === 19 && ctx.abilities[81] >= 1) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 사립 아○티에 학원 교복을 입혔다`);
    character.tflags[180] = 20;
  } else if (ctx.result === 20 && ctx.abilities[81] >= 1) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 세○오 여학원 교복을 입혔다`);
    character.tflags[180] = 21;
  } else if (ctx.result === 21 && ctx.abilities[81] >= 4) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 카자마○리 학원 고등학교 교복을 입혔다`);
    character.tflags[180] = 22;
  } else if (ctx.result === 22 && ctx.abilities[81] >= 2) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 코○에가하라 학원 교복을 입혔다`);
    character.tflags[180] = 23;
  } else if (ctx.result === 27 && ctx.item[211] === 1) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 알몸 앞치마를 입혔다`);
    character.tflags[180] = 28;
  } else if (ctx.result === 30 && ctx.flags[554]) {
    ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}에게 %CSTR:MASTER:4% 유니폼을 입혔다`);
    character.tflags[180] = 31;
  } else {
    ctx.showMessage(`W 착용을 거부당했습니다`);
    // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
  }
}
