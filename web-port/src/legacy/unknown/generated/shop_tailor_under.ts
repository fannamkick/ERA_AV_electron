/**
 * SHOP_TAILOR_UNDER.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function tailor_under_main(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[116] === 0 && ctx.talents[135] === 0 && (ctx.talents[132] === 0 || ctx.talents[109] === 0)) {
    await choice_tops(ctx, character);
  } else {
    await choice_under(ctx, character);
  }
}

export async function choice_tops(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = 0;
  Y = 19;
  ctx.showMessage(`□브래지어 일람`);
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage(`[ 0] - 기본 브래지어`);
  ctx.showMessage(`[ 1] - 하프컵 브래지어`);
  ctx.showMessage(`[ 2] - 프릴 브래지어`);
  ctx.showMessage(`[ 3] - 스포츠 브래지어`);
  ctx.showMessage(`[ 4] - 자수 브래지어`);
  ctx.showMessage(`[ 5] - 실크 브래지어`);
  ctx.showMessage(`[ 6] - 마이크로 비키니 브래지어`);
  ctx.showMessage(`[ 7] - 줄무늬 브래지어`);
  ctx.showMessage(`[ 8] - 스팽글 브래지어`);
  ctx.showMessage(`[ 9] - 튜브 탑 브래지어`);
  ctx.showMessage(`[10] - 반창고`);
  ctx.showMessage(`[11] - 니플리스`);
  ctx.showMessage(`[12] - 페더 모티브 브라`);
  ctx.showMessage(`[13] - 가죽 브래지어`);
  ctx.showMessage(`[14] - 붕대`);
  ctx.showMessage(`[15] - 체크무늬 브래지어`);
  ctx.showMessage(`[16] - 오픈 브래지어`);
  ctx.showMessage(`[17] - 시스루 레이스 브래지어`);
  ctx.showMessage(`[18] - 실크 뷔스티에`);
  ctx.showMessage(`[19] - 가죽 뷔스티에`);
  ctx.drawLine();
  ctx.showMessage(`[999] - 돌아간다`);
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  X = ctx.result;
  if (ctx.result === X && X != 999 && X <= Y) {
    character.cflags[175] = X;
    ctx.showMessage(`《브래지어 디자인은`);
    await print_underwear_tops(ctx, character);
    ctx.showMessage(`W  입니다》`);
    if (character.cflags[175] != 12 && character.cflags[175] != 11 && character.cflags[175] != 14 && character.cflags[175] != 10) {
      await choice_tops_color(ctx, character);
    } else {
      character.cflags[174] = 99;
      await choice_under(ctx, character);
    }
  } else if (ctx.result === 999) {
    return 999;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function choice_tops_color(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = 0;
  Y = 21;
  ctx.drawLine();
  ctx.showMessage(`□브래지어 일람`);
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage(`[ 0] - 흰색`);
  ctx.showMessage(`[ 1] - 검은색`);
  ctx.showMessage(`[ 2] - 핑크색`);
  ctx.showMessage(`[ 3] - 연보라색`);
  ctx.showMessage(`[ 4] - 물색`);
  ctx.showMessage(`[ 5] - 빨간색`);
  ctx.showMessage(`[ 6] - 보라색`);
  ctx.showMessage(`[ 7] - 주황색`);
  ctx.showMessage(`[ 8] - 노란색`);
  ctx.showMessage(`[ 9] - 베이지색`);
  ctx.showMessage(`[10] - 회색`);
  ctx.showMessage(`[11] - 샴페인골드색`);
  ctx.showMessage(`[12] - 은색`);
  ctx.showMessage(`[13] - 체리핑크색`);
  ctx.showMessage(`[14] - 페일블루색`);
  ctx.showMessage(`[15] - 펄화이트색`);
  ctx.showMessage(`[16] - 라임그린색`);
  ctx.showMessage(`[17] - 터코이즈블루색`);
  ctx.showMessage(`[18] - 로얄블루색`);
  ctx.showMessage(`[19] - 와인레드색`);
  ctx.showMessage(`[20] -블랙퍼플색`);
  if (character.cflags[175] != 8 && character.cflags[175] != 12 && character.cflags[175] != 15) {
    ctx.showMessage(`[21] - 표범무늬`);
  }
  ctx.drawLine();
  ctx.showMessage(`[999] - 돌아간다`);
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  X = ctx.result;
  if (ctx.result === X && X != 999 && X <= Y && X != 21) {
    character.cflags[174] = X;
    ctx.showMessage(`《브래지어 색은`);
    await print_underwear_color_tops(ctx, character);
    ctx.showMessage(`W  입니다》`);
    await choice_under(ctx, character);
  } else if (ctx.result === 21 && character.cflags[175] != 8 && character.cflags[175] != 12 && character.cflags[175] != 15) {
    character.cflags[174] = X;
    ctx.showMessage(`《브래지어 색은`);
    await print_underwear_color_tops(ctx, character);
    ctx.showMessage(`W  입니다》`);
    await choice_under(ctx, character);
  } else if (ctx.result === 999) {
    return 999;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function choice_under(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = 0;
  Y = 20;
  ctx.showMessage(`□팬티 일람`);
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage(`[ 0] - 평범한 팬티`);
  ctx.showMessage(`[ 1] - 하이레그 팬티`);
  ctx.showMessage(`[ 2] - 프릴 팬티`);
  ctx.showMessage(`[ 3] - 로우라이즈＆로우레그`);
  ctx.showMessage(`[ 4] - 자수팬티`);
  ctx.showMessage(`[ 5] - 실크 팬티`);
  ctx.showMessage(`[ 6] - 마이크로 비키니 팬티`);
  ctx.showMessage(`[ 7] - 줄무늬 팬티`);
  ctx.showMessage(`[ 8] - 스팽글 팬티`);
  ctx.showMessage(`[ 9] - 프린트 팬티`);
  ctx.showMessage(`[10] - 반창고`);
  ctx.showMessage(`[11] - 드로워즈`);
  ctx.showMessage(`[12] - 페더 모티브 팬티`);
  ctx.showMessage(`[13] - 가죽 팬티`);
  ctx.showMessage(`[14] - 훈도시`);
  ctx.showMessage(`[15] - 체크모양 팬티`);
  ctx.showMessage(`[16] - 오픈 팬티`);
  ctx.showMessage(`[17] - 시스루 레이스 팬티`);
  if (ctx.talents[122] === 1) {
    ctx.showMessage(`[18] - 트렁크`);
    ctx.showMessage(`[19] - 복서 팬티`);
    ctx.showMessage(`[20] - 부메랑 팬티`);
  }
  ctx.drawLine();
  ctx.showMessage(`[999] - 돌아간다`);
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  X = ctx.result;
  if (ctx.result === X && X != 999 && X <= Y && X != 18 && X != 19 && X != 20) {
    character.cflags[177] = X;
    ctx.showMessage(`《`);
    ctx.showMessage(`팬티 디자인은`);
    await print_underwear_under(ctx, character);
    ctx.showMessage(`W  입니다》`);
    if (character.cflags[177] != 12 && character.cflags[177] != 11 && character.cflags[177] != 14 && character.cflags[177] != 10) {
      await choice_under_color(ctx, character);
    } else {
      character.cflags[176] = 99;
    }
  } else if (ctx.result >= 18 && X <= Y && X != 999 && ctx.talents[122] === 1) {
    character.cflags[177] = X;
    ctx.showMessage(`《`);
    ctx.showMessage(`팬티 디자인은`);
    await print_underwear_under(ctx, character);
    ctx.showMessage(`W  입니다》`);
    if (character.cflags[177] != 12 && character.cflags[177] != 11 && character.cflags[177] != 14 && character.cflags[177] != 10) {
      await choice_under_color(ctx, character);
    }
  } else if (ctx.result === 999) {
    return 999;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function choice_under_color(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  X = 0;
  Y = 21;
  ctx.drawLine();
  ctx.showMessage(`□팬티 일람`);
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage(`[ 0] - 흰색`);
  ctx.showMessage(`[ 1] - 검은색`);
  ctx.showMessage(`[ 2] - 핑크색`);
  ctx.showMessage(`[ 3] - 연보라색`);
  ctx.showMessage(`[ 4] - 물색`);
  ctx.showMessage(`[ 5] - 빨간색`);
  ctx.showMessage(`[ 6] - 보라색`);
  ctx.showMessage(`[ 7] - 주황색`);
  ctx.showMessage(`[ 8] - 노란색`);
  ctx.showMessage(`[ 9] - 베이지색`);
  ctx.showMessage(`[10] - 회색`);
  ctx.showMessage(`[11] - 샴페인골드색`);
  ctx.showMessage(`[12] - 은색`);
  ctx.showMessage(`[13] - 체리핑크색`);
  ctx.showMessage(`[14] - 페일블루색`);
  ctx.showMessage(`[15] - 펄화이트색`);
  ctx.showMessage(`[16] - 라임그린색`);
  ctx.showMessage(`[17] - 터코이즈블루색`);
  ctx.showMessage(`[18] - 로얄블루색`);
  ctx.showMessage(`[19] - 와인레드색`);
  ctx.showMessage(`[20] - 블랙퍼플색`);
  if (character.cflags[177] != 7 && character.cflags[177] != 9 && character.cflags[177] != 15) {
    ctx.showMessage(`[21] - 표범무늬`);
  }
  ctx.drawLine();
  ctx.showMessage(`[999] - 돌아간다`);
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  X = ctx.result;
  if (ctx.result === X && X != 999 && X <= Y && X != 21) {
    character.cflags[176] = X;
    ctx.showMessage(`《`);
    ctx.showMessage(`팬티는`);
    await print_underwear_color_under(ctx, character);
    ctx.showMessage(`W  입니다》`);
  } else if (ctx.result === 21 && character.cflags[177] != 7 && character.cflags[177] != 9 && character.cflags[177] != 15) {
    character.cflags[176] = X;
    ctx.showMessage(`《`);
    ctx.showMessage(`팬티 색은`);
    await print_underwear_color_under(ctx, character);
    ctx.showMessage(`W  입니다》`);
  } else if (ctx.result === 999) {
    return 999;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}
