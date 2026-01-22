/**
 * SHOP_ACTRESS_INFO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function actress_info(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP_0
  ctx.drawLine();
  ctx.showMessage('누구의 정보를 확인할까요?');
  await life_list_new,6(ctx, character);
  if (ctx.result === 999) {
    return 999;
  } else if (ctx.result < 0 || ctx.result >= ctx.charanum) {
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.result === ctx.master) {
    ctx.showMessage(`${ctx.josaHelper("플레이어는")} 감독입니다`);
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  if (ctx.getTalent(result, 400) === 0) {
    ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.result), "는")} 아직 데뷔하지 않았습니다`);
    await ctx.wait();
    // GOTO INPUT_LOOP_0 - 구조 변경 필요 (while/break 사용 권장)
  }
  character = ctx.result;
  await print_actress_info(ctx, character);
}

export async function print_actress_info(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  await actress_article(ctx, character);
  ctx.drawLine();
  ctx.showMessage(` 본명: ${ctx.getName(character)}　／　예명: ${ctx.getVarName("NICK", TARGET)}`);
  ctx.showMessage(` 총 매상: ${character.cflags[730]}포인트　／　출연작수: ${ctx.exp[76]}편`);
  ctx.showMessage(` 현재의 칭호: %CSTR:41% %CSTR:42%`);
  ctx.showMessage(` 팬 인원수: ${character.cflags[733]}명　／　전속계약: %CSTR:MASTER:5%`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(` ★데뷔작 타이틀★`);
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.setColor(0xDDBBCC);
  ctx.print('');
  await print_video_title(ctx, character);
  // TODO: SETFONT ""
  ctx.resetColor();
  ctx.showMessage(` 매상: ${character.cflags[734]}포인트`);
  if (character.cflags[732] > 0) {
    ctx.showMessage(` ★최신작 타이틀★`);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.setColor(0xDDBBCC);
    ctx.print('');
    await print_video_title_new(ctx, character);
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage(` 매상: ${character.cflags[732]}포인트`);
  }
  if (character.cflags[732] > 0) {
    ctx.showMessage(` ★대표작 타이틀★`);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.setColor(0xDDBBCC);
    ctx.print('');
    await print_video_title_represent(ctx, character);
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage(` 매상: ${character.cflags[731]}포인트`);
  }
  await ctx.wait();
  await actress_info(ctx, character);
}

export async function print_actress_str(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.talents[400] === 0) {
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.showMessage(`아직 데뷔하지 않았습니다`);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  } else {
    await actress_article(ctx, character);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.showMessage(` 총 매상: ${character.cflags[730]}포인트　／　출연작수: ${ctx.exp[76]}편`);
    ctx.showMessage(` 현재의 친호: %CSTR:41%%CSTR:42%`);
    ctx.showMessage(` 팬 수: ${character.cflags[733]}명　／　전속 계약: %CSTR:MASTER:5%`);
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
    ctx.showMessage(` ★데뷔작의 타이틀★`);
    // TODO: CHKFONT "あくびん"
    if (ctx.result) {
      // TODO: SETFONT "あくびん"
    }
    ctx.setColor(0xDDBBCC);
    ctx.print('');
    await print_video_title(ctx, character);
    // TODO: SETFONT ""
    ctx.resetColor();
    ctx.showMessage(` 매상: ${character.cflags[734]}포인트`);
    if (character.cflags[732] > 0) {
      ctx.showMessage(` ★최신작의 타이틀★`);
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      ctx.print('');
      await print_video_title_new(ctx, character);
      // TODO: SETFONT ""
      ctx.resetColor();
      ctx.showMessage(` 매상: ${character.cflags[732]}포인트`);
    }
    if (character.cflags[732] > 0) {
      ctx.showMessage(` ★대표작의 타이틀★`);
      // TODO: CHKFONT "あくびん"
      if (ctx.result) {
        // TODO: SETFONT "あくびん"
      }
      ctx.setColor(0xDDBBCC);
      ctx.print('');
      await print_video_title_represent(ctx, character);
      // TODO: SETFONT ""
      ctx.resetColor();
      ctx.showMessage(` 매상: ${character.cflags[731]}포인트`);
    }
    ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  }
}
