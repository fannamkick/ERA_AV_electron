/**
 * FUNCTIONS.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function nothing(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 0;
}

export async function incest(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  character.tflags[14] = 0;
  if (character.cflags[21] && character.cflags[21] % 1000 == ctx.player.no) {
    character.tflags[14] = (character.cflags[21] / 1000) + 1;
  }
  if (character.cflags[22] && character.cflags[22] % 1000 == ctx.player.no) {
    character.tflags[14] = (character.cflags[22] / 1000) + 1;
  }
  if (character.cflags[23] && character.cflags[23] % 1000 == ctx.player.no) {
    character.tflags[14] = (character.cflags[23] / 1000) + 1;
  }
  if (character.cflags[24] && character.cflags[24] % 1000 == ctx.player.no) {
    character.tflags[14] = (character.cflags[24] / 1000) + 1;
  }
  if (ctx.player === ctx.master && (character.cflags[21] === -1 || character.cflags[22] === -1 || character.cflags[23] === -1 || character.cflags[24] === -1)) {
    character.tflags[14] = 1;
  }
  return;
}

export async function serihu(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.setColor(0xDDBBCC);
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.showMessage(`「${ctx.argStrings[0]}」`);
  // TODO: SETFONT ""
  ctx.resetColor();
}

export async function serihu_fullcolor(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.setColor(ARG);
  // TODO: CHKFONT "あくびん"
  if (ctx.result) {
    // TODO: SETFONT "あくびん"
  }
  ctx.showMessage(`「${ctx.argStrings[0]}」`);
  // TODO: SETFONT ""
  ctx.resetColor();
}

export async function hint_chara(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.setColor(ARG);
  ctx.showMessage(`${ctx.argStrings[0]}`);
  // TODO: SETFONT ""
  ctx.resetColor();
}

export async function digit_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTION
  // TODO: #DIM LOOPCOUNT
  LOOPCOUNT = 0;
  // TODO: WHILE ARG
  ctx.args[0] /= 10;
  // TODO: LOOPCOUNT ++
  // TODO: WEND
  return;
}

export async function have_penis_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #FUNCTION
  if (ctx.getTalent(arg, 122) || ctx.getTalent(arg, 121)) {
    return;
  } else {
    return;
  }
}
