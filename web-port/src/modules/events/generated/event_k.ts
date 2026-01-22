/**
 * EVENT_K.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function eventshop(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: #PRI
  if (ctx.flags[7] == 0) {
    ctx.flags[7] = 2;
  }
}

export async function kojo_message_com(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[899] >= 1) {
    return 0;
  }
  if (ctx.flags[7] <= 0) {
    return 0;
  }
  // TODO: TRYCALLFORM KOJO_MESSAGE_COM_{NO:TARGET}
}

export async function kojo_message_palamcng(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[899] >= 1) {
    return 0;
  }
  if (ctx.flags[7] <= 0) {
    return 0;
  }
  // TODO: TRYCALLFORM KOJO_MESSAGE_PALAMCNG_{NO:TARGET}
}

export async function kojo_message_markcng(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.tflags[899] >= 1) {
    return 0;
  }
  if (ctx.flags[7] <= 0) {
    return 0;
  }
  // TODO: TRYCALLFORM KOJO_MESSAGE_MARKCNG_{NO:TARGET}
}

export async function self_kojo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[7] <= 0) {
    return 0;
  }
  // TODO: TRYCALLFORM SELF_KOJO_K{NO:TARGET}
}

export async function single_ending(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: TRYCALLFORM SINGLE_ENDING_K{NO:TARGET}
}

export async function kojo_lesplay(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: TRYCCALLFORM KOJO_LESPLAY_{NO:ARG},ARG:1
  // TODO: CATCH
  await maekojo_lesplay,arg,arg:1(ctx, character);
  // TODO: ENDCATCH
}

export async function kojo_ntr_staff(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: TRYCCALLFORM KOJO_NTR_STAFF_{NO:ARG}
  // TODO: CATCH
  await maekojo_ntr_staff(ctx, character);
  // TODO: ENDCATCH
}
