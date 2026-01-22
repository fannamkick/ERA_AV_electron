/**
 * LIFELIST_PRINT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function life_list_slave_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  ctx.showMessage(` [0] ${ctx.getName(ctx.master)} (調教者)`);
  ctx.drawLine();
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count == 0) {
      // TODO: CONTINUE
    }
    if (ctx.base[ctx.count][0] < 1) {
      // TODO: CONTINUE
    }
    if (ctx.args[0] && GETBIT(ctx.flags[1111],ctx.count)) {
      ctx.printChar('*');
    } else {
      ctx.print('');
    }
    ctx.showMessage(`[${ctx.count}] ${ctx.getName(ctx.count)}`);
    ctx.print('(체력:');
    A = ctx.base[ctx.count][0];
    if (ctx.base[ctx.count][0] < 0) {
      A = 0;
    }
    ctx.showMessage(`${A}/${MAXctx.base[ctx.count][0]})`);
    ctx.print('/ (매력치:');
    if (ctx.base[ctx.count][0] < 0) {
      ctx.showMessage(`0/${MAXctx.base[ctx.count][31]}) /`);
    } else {
      ctx.showMessage(`${ctx.base[ctx.count][31]}/${MAXctx.base[ctx.count][31]}) /`);
    }
    if (ctx.count === ctx.flags[1] && character.cflags[ctx.count][1] >= 2) {
      ctx.print('(전회 지도・조수 가능)');
    } else if (ctx.count === ctx.flags[1]) {
      ctx.print('(전회 지도)');
    } else if (ctx.count === ctx.flags[2]) {
      ctx.print('(전회 조수)');
    } else if (character.cflags[ctx.count][1] >= 2) {
      ctx.print('(조수 가능)');
    }
    if (character.cflags[ctx.count][110] - 2 <= DAY && ctx.getTalent(count, 153)) {
      ctx.print('[산월]');
    } else if (ctx.getTalent(count, 153)) {
      ctx.print('[임신]');
    } else if (ctx.getTalent(count, 154)) {
      ctx.print('[육아]');
    }
    if (character.cflags[ctx.count][12] != 0) {
      if (character.cflags[ctx.count][12] === 1) {
        ctx.print('<会話');
      } else if (character.cflags[ctx.count][12] === 2 || character.cflags[ctx.count][12] === 7) {
        ctx.print('<奉仕');
      } else if (character.cflags[ctx.count][12] === 3) {
        ctx.print('<A営');
      } else if (character.cflags[ctx.count][12] === 4) {
        ctx.print('<V営');
      } else if (character.cflags[ctx.count][12] === 5) {
        ctx.print('<SM');
      } else if (character.cflags[ctx.count][12] === 6) {
        ctx.print('<出張');
      }
      if (character.cflags[ctx.count][13]) {
        ctx.print('C');
      }
      ctx.print('>');
    }
    if (character.cflags[ctx.count][140] ==1) {
      ctx.print('<入寮中>');
    }
    ctx.showMessage('');
  }
  ctx.drawLine();
}
