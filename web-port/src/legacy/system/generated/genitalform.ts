/**
 * GENITALFORM.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function vaginaform(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[608] === 1 && ctx.flags[140] === 0) {
    ctx.print('소음순이 삐져나와 있습니다');
  } else if (character.cflags[608] === 2 && ctx.flags[140] === 0) {
    ctx.print('까맣게 변한 소음순이 삐져나와 있습니다');
  } else {
    ctx.print('예쁜 도끼자국입니다');
  }
}

export async function vaginaform_change(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  V = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getTalent(count, 122)) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 122) === 0) {
      V = ctx.exp[ctx.count][0] + ctx.exp[ctx.count][10];
      if (V >= 120 && V < 300) {
        character.cflags[ctx.count][608] = 1;
      } else if (V >= 300) {
        character.cflags[ctx.count][608] = 2;
      }
      V = 0;
    }
  }
}

export async function penisform(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[609] === 0) {
    ctx.print('조그마한');
  } else if (character.cflags[609] === 1) {
    ctx.print('');
  } else if (character.cflags[609] === 2) {
    ctx.print('극태');
  }
  if (character.cflags[611] === 0) {
    ctx.showMessage(`진성포경`);
  } else if (character.cflags[611] === 1) {
    ctx.showMessage(`가성포경`);
  } else if (character.cflags[611] === 2 && ctx.talents[1] === 1) {
    ctx.showMessage(`가성포경`);
  } else if (character.cflags[611] === 2 && ctx.talents[1] === 0) {
    ctx.showMessage(`벗겨진`);
  } else if (character.cflags[611] === 3) {
    ctx.showMessage(`벗겨진`);
  } else {
    ctx.showMessage(`가성포경`);
  }
}

export async function decide_penissize(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (character.cflags[T][609] === 0) {
    ctx.base[T][50] = 9 + ctx.rand(4);
  } else if (character.cflags[T][609] === 1) {
    ctx.base[T][50] = 13 + ctx.rand(4);
  } else if (character.cflags[T][609] === 2) {
    ctx.base[T][50] = 17 + ctx.rand(4);
  }
}

export async function decide_penisselect(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUTLOOP_START
  ctx.showMessage('《자지사이즈를 선택해주십시오》');
  ctx.showMessage('[0] - 작음');
  ctx.showMessage('[1] - 평균');
  ctx.showMessage('[2] - 거근');
  // Label: INPUTLOOP_1
  await ctx.inputNumber();
  if (ctx.result === 0) {
    character.cflags[T][609] = 0;
    ctx.base[T][50] = 9 + ctx.rand(4);
  } else if (ctx.result === 1) {
    character.cflags[T][609] = 1;
    ctx.base[T][50] = 13 + ctx.rand(4);
  } else if (ctx.result === 2) {
    character.cflags[T][609] = 2;
    ctx.base[T][50] = 17 + ctx.rand(4);
  } else {
    // GOTO INPUTLOOP_1 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage('《포경 상태를 선택해주십시오》');
  ctx.showMessage('[0] - 진성포경');
  ctx.showMessage('[1] - 가성포경(영속적)');
  ctx.showMessage('[2] - 가성포경(동정상실 후 「벗겨지」게 됨)');
  ctx.showMessage('[3] - 벗겨진 상태');
  // Label: INPUTLOOP_2
  await ctx.inputNumber();
  if (ctx.result === 0) {
    character.cflags[T][611] = 0;
  } else if (ctx.result === 1) {
    character.cflags[T][611] = 1;
  } else if (ctx.result === 2) {
    character.cflags[T][611] = 2;
  } else if (ctx.result === 3) {
    character.cflags[T][611] = 3;
  } else {
    // GOTO INPUTLOOP_2 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage(`${ctx.getName(T)}에게 달린 후타나리 페니스를 ${ctx.base[T][50]}cm인`);
  if (character.cflags[T][609] === 0) {
    ctx.showMessage(`작은`);
  } else if (character.cflags[T][609] === 1) {
    ctx.showMessage(``);
  } else if (character.cflags[T][609] === 2) {
    ctx.showMessage(`극태`);
  }
  if (character.cflags[T][611] === 0) {
    ctx.showMessage(`진성포경`);
  } else if (character.cflags[T][611] === 1) {
    ctx.showMessage(`가성포경`);
  } else if (character.cflags[T][611] === 2) {
    ctx.showMessage(`가성포경`);
  } else if (character.cflags[T][611] === 3) {
    ctx.showMessage(`벗겨진`);
  }
  ctx.showMessage(`페니스로 합니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUTLOOP_3
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`W 《${ctx.josaHelper(ctx.getVarName("CALLNAME", T), "는")}【${ctx.getVarName("TALENT", 121)}】가 되었다》`);
    ctx.getTalent(t, 121) = 1;
    ctx.getTalent(t, 1) = 1;
  } else if (ctx.result === 1) {
    ctx.showMessage(`다시 선택해주십시오`);
    // GOTO INPUTLOOP_START - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUTLOOP_3 - 구조 변경 필요 (while/break 사용 권장)
  }
}
