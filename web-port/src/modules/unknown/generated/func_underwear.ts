/**
 * FUNC_UNDERWEAR.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function print_underwear_color_tops(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[174] === 0) {
    ctx.showMessage(`흰색`);
  } else if (character.cflags[174] === 1) {
    ctx.showMessage(`검은색`);
  } else if (character.cflags[174] === 2) {
    ctx.showMessage(`핑크색`);
  } else if (character.cflags[174] === 3) {
    ctx.showMessage(`연보라색`);
  } else if (character.cflags[174] === 4) {
    ctx.showMessage(`물색`);
  } else if (character.cflags[174] === 5) {
    ctx.showMessage(`빨간색`);
  } else if (character.cflags[174] === 6) {
    ctx.showMessage(`보라색`);
  } else if (character.cflags[174] === 7) {
    ctx.showMessage(`주황색`);
  } else if (character.cflags[174] === 8) {
    ctx.showMessage(`노란색`);
  } else if (character.cflags[174] === 9) {
    ctx.showMessage(`베이지색`);
  } else if (character.cflags[174] === 10) {
    ctx.showMessage(`회색`);
  } else if (character.cflags[174] === 11) {
    ctx.showMessage(`샴페인골드색`);
  } else if (character.cflags[174] === 12) {
    ctx.showMessage(`은색`);
  } else if (character.cflags[174] === 13) {
    ctx.showMessage(`체리핑크색`);
  } else if (character.cflags[174] === 14) {
    ctx.showMessage(`페일블루색`);
  } else if (character.cflags[174] === 15) {
    ctx.showMessage(`펄화이트색`);
  } else if (character.cflags[174] === 16) {
    ctx.showMessage(`라임그린색`);
  } else if (character.cflags[174] === 17) {
    ctx.showMessage(`터코이즈블루색`);
  } else if (character.cflags[174] === 18) {
    ctx.showMessage(`로얄블루색`);
  } else if (character.cflags[174] === 19) {
    ctx.showMessage(`와인레드색`);
  } else if (character.cflags[174] === 20) {
    ctx.showMessage(`블랙퍼플색`);
  } else if (character.cflags[174] === 21) {
    ctx.showMessage(`표범무늬`);
  } else if (character.cflags[174] === 99) {
    ctx.print('');
  }
}

export async function print_underwear_tops(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[175] === -1) {
    ctx.showMessage(`없음`);
  } else if (character.cflags[175] === 0) {
    ctx.showMessage(`기본 브래지어`);
  } else if (character.cflags[175] === 1) {
    ctx.showMessage(`하프컵 브래지어`);
  } else if (character.cflags[175] === 2) {
    ctx.showMessage(`프릴 브래지어`);
  } else if (character.cflags[175] === 3) {
    ctx.showMessage(`스포츠 브래지어`);
  } else if (character.cflags[175] === 4) {
    ctx.showMessage(`자수 브래지어`);
  } else if (character.cflags[175] === 5) {
    ctx.showMessage(`실크 브래지어`);
  } else if (character.cflags[175] === 6) {
    ctx.showMessage(`마이크로 비키니 브래지어`);
  } else if (character.cflags[175] === 7) {
    ctx.showMessage(`줄무늬 브래지어`);
  } else if (character.cflags[175] === 8) {
    ctx.showMessage(`스팽글 브래지어`);
  } else if (character.cflags[175] === 9) {
    ctx.showMessage(`튜브 탑 브래지어`);
  } else if (character.cflags[175] === 10) {
    ctx.showMessage(`반창고`);
  } else if (character.cflags[175] === 11) {
    ctx.showMessage(`니플리스`);
  } else if (character.cflags[175] === 12) {
    ctx.showMessage(`페더 모티브 브라`);
  } else if (character.cflags[175] === 13) {
    ctx.showMessage(`가죽 브래지어`);
  } else if (character.cflags[175] === 14) {
    ctx.showMessage(`붕대`);
  } else if (character.cflags[175] === 15) {
    ctx.showMessage(`체크무늬 브래지어`);
  } else if (character.cflags[175] === 16) {
    ctx.showMessage(`오픈 브래지어`);
  } else if (character.cflags[175] === 17) {
    ctx.showMessage(`시스루 레이스 브래지어`);
  } else if (character.cflags[175] === 18) {
    ctx.showMessage(`실크 뷔스티에`);
  } else if (character.cflags[175] === 19) {
    ctx.showMessage(`가죽 뷔스티에`);
  } else {
    ctx.showMessage(`브래지어`);
  }
}

export async function print_underwear_color_under(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[176] === 0) {
    ctx.showMessage(`흰색`);
  } else if (character.cflags[176] === 1) {
    ctx.showMessage(`검은색`);
  } else if (character.cflags[176] === 2) {
    ctx.showMessage(`핑크색`);
  } else if (character.cflags[176] === 3) {
    ctx.showMessage(`연보라색`);
  } else if (character.cflags[176] === 4) {
    ctx.showMessage(`물색`);
  } else if (character.cflags[176] === 5) {
    ctx.showMessage(`빨간색`);
  } else if (character.cflags[176] === 6) {
    ctx.showMessage(`보라색`);
  } else if (character.cflags[176] === 7) {
    ctx.showMessage(`주황색`);
  } else if (character.cflags[176] === 8) {
    ctx.showMessage(`노란색`);
  } else if (character.cflags[176] === 9) {
    ctx.showMessage(`베이지색`);
  } else if (character.cflags[176] === 10) {
    ctx.showMessage(`회색`);
  } else if (character.cflags[176] === 11) {
    ctx.showMessage(`샴페인골드색`);
  } else if (character.cflags[176] === 12) {
    ctx.showMessage(`은색`);
  } else if (character.cflags[176] === 13) {
    ctx.showMessage(`체리핑크색`);
  } else if (character.cflags[176] === 14) {
    ctx.showMessage(`페일블루색`);
  } else if (character.cflags[176] === 15) {
    ctx.showMessage(`펄화이트색`);
  } else if (character.cflags[176] === 16) {
    ctx.showMessage(`라임그린색`);
  } else if (character.cflags[176] === 17) {
    ctx.showMessage(`터코이즈블루색`);
  } else if (character.cflags[176] === 18) {
    ctx.showMessage(`로얄블루색`);
  } else if (character.cflags[176] === 19) {
    ctx.showMessage(`와인레드색`);
  } else if (character.cflags[176] === 20) {
    ctx.showMessage(`블랙퍼플색`);
  } else if (character.cflags[176] === 21) {
    ctx.showMessage(`표범무늬`);
  } else if (character.cflags[176] === 99) {
    ctx.print('');
  }
}

export async function print_underwear_under(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[177] === -1) {
    ctx.showMessage(`노팬티`);
  } else if (character.cflags[177] === 0) {
    ctx.showMessage(`평범한 팬티`);
  } else if (character.cflags[177] === 1) {
    ctx.showMessage(`하이레그 팬티`);
  } else if (character.cflags[177] === 2) {
    ctx.showMessage(`프릴 팬티`);
  } else if (character.cflags[177] === 3) {
    ctx.showMessage(`로우라이즈＆로우레그`);
  } else if (character.cflags[177] === 4) {
    ctx.showMessage(`자수팬티`);
  } else if (character.cflags[177] === 5) {
    ctx.showMessage(`실크 팬티`);
  } else if (character.cflags[177] === 6) {
    ctx.showMessage(`마이크로 비키니 팬티`);
  } else if (character.cflags[177] === 7) {
    ctx.showMessage(`줄무늬 팬티`);
  } else if (character.cflags[177] === 8) {
    ctx.showMessage(`스팽글 팬티`);
  } else if (character.cflags[177] === 9) {
    ctx.showMessage(`프린트 팬티`);
  } else if (character.cflags[177] === 10) {
    ctx.showMessage(`반창고`);
  } else if (character.cflags[177] === 11) {
    ctx.showMessage(`드로워즈`);
  } else if (character.cflags[177] === 12) {
    ctx.showMessage(`페더 모티브 팬티`);
  } else if (character.cflags[177] === 13) {
    ctx.showMessage(`가죽 팬티`);
  } else if (character.cflags[177] === 14) {
    ctx.showMessage(`훈도시`);
  } else if (character.cflags[177] === 15) {
    ctx.showMessage(`체크모양 팬티`);
  } else if (character.cflags[177] === 16) {
    ctx.showMessage(`오픈 팬티`);
  } else if (character.cflags[177] === 17) {
    ctx.showMessage(`시스루 레이스 팬티`);
  } else if (character.cflags[177] === 18) {
    ctx.showMessage(`트렁크`);
  } else if (character.cflags[177] === 19) {
    ctx.showMessage(`복서 팬티`);
  } else if (character.cflags[177] === 20) {
    ctx.showMessage(`부메랑 팬티`);
  } else {
    ctx.showMessage(`팬티`);
  }
  return 0;
}

export async function show_info_casualwear(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`현재 복장:`);
  await print_clothtype_main2(ctx, character);
  ctx.showMessage(`L`);
  if (character.cflags[178] != 0) {
    ctx.showMessage(`예비 복장:`);
    await print_clothtype_casualwear(ctx, character);
    ctx.showMessage(`L`);
  }
  if (ctx.talents[116] === 0 && ctx.talents[135] === 0 && ctx.talents[122] === 0 && (ctx.talents[132] === 0 || ctx.talents[109] === 0)) {
    ctx.showMessage(`브라:`);
    await print_underwear_color_tops(ctx, character);
    if (character.cflags[175] != 12 &&  character.cflags[175] != 11 && character.cflags[175] != 14 && character.cflags[175] != 10 && character.cflags[175] != -1) {
      ctx.showMessage(``);
    }
    await print_underwear_tops(ctx, character);
    ctx.showMessage(`L`);
  }
  ctx.showMessage(`팬티:`);
  await print_underwear_color_under(ctx, character);
  if (character.cflags[176] != 99 && character.cflags[175] != -1) {
    ctx.showMessage(``);
  }
  await print_underwear_under(ctx, character);
  ctx.showMessage('');
  ctx.showMessage(`양말:`);
  await print_shoestype_main(ctx, character);
  ctx.showMessage(``);
  ctx.showMessage(`구두:`);
  await print_shoestype_main2(ctx, character);
  ctx.showMessage(``);
  ctx.showMessage('');
}
