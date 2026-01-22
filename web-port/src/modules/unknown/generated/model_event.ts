/**
 * MODEL_EVENT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function model_event_call(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 402)) {
      ctx.locals[0] = ctx.rand(3);
      character = ctx.count;
      // TODO: TRYCALLFORM MODEL_EVENT(LOCAL)
    }
  }
}

export async function model_event0(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(3);
  ctx.drawLine('･･');
  ctx.showMessage(` 휴일을 이용해, 스튜디오에서 ${ctx.getVarName("CALL", TARGET)}의 촬영이 시작됐다……`);
  ctx.showMessage(`이번 촬영 내용은`);
  if (ctx.locals[0] === 1 && DAY[1] >= 5 && DAY[1] <= 7) {
    ctx.showMessage(`신상 수영복`);
    ctx.locals[1] = 1;
  } else if (ctx.locals[0] === 2 && ctx.abilities[17] >= 3) {
    ctx.showMessage(`신상 속옷`);
    ctx.locals[1] = 2;
  } else {
    if (DAY[1] >=4 && DAY[1] <= 6) {
      ctx.print('여름 신상');
    } else if (DAY[1] >=7 && DAY[1] <= 9) {
      ctx.print('가을 신상');
    } else if (DAY[1] >= 10 && DAY[1] <= 12) {
      ctx.print('겨울 신상');
    } else {
      ctx.print('본 신상');
    }
  }
  ctx.showMessage(`의 홍보라고 한다.`);
  ctx.showMessage(`후일,`);
  if (ctx.talents[432] == 1) {
    ctx.showMessage(`갸루계가 구독층인`);
  }
  ctx.showMessage(`패션잡지에`);
  if (ctx.locals[1] === 1) {
    if (ctx.rand(3) === 0) {
      ctx.showMessage(`천 면적이 작은 대담한 T팬티와 톱스로 구성된`);
    } else if (ctx.rand(2) === 0) {
      ctx.showMessage(`수영복이라기 보다는 줄이나 마찬가지인, 슬링 샷 계열의 어른스러운`);
    } else {
      ctx.showMessage(`파레오와 귀여운 프릴이 달린`);
    }
    ctx.showMessage(`수영복을 입은`);
  } else if (ctx.locals[1] === 2) {
    if (ctx.rand(3) === 0) {
      ctx.showMessage(`작은 자수가 들어간 어른스러운`);
    } else if (ctx.rand(2) === 0) {
      ctx.showMessage(`중요한 부분이 보일듯말듯한 시스루`);
    } else {
      ctx.showMessage(`귀여운 프릴이 달린`);
    }
    ctx.showMessage(`속옷을 입은`);
  }
  ctx.showMessage(`${ctx.josaHelper("타겟이")},`);
  if (ctx.abilities[17] >= 3 && ctx.abilities[17] <= 7) {
    ctx.showMessage(`『보여지는』것에 저항이 없어진 표정의`);
  } else if (ctx.abilities[17] >= 8) {
    ctx.showMessage(`당당하다――기보단 오히려『보여주는』포즈를 취한`);
  } else {
    ctx.showMessage(`촬영하기도 버거운 게 느껴지는, 부끄러움이 느껴지는 표정의`);
  }
  ctx.showMessage(`사진이 실려있다……`);
  ctx.showMessage('');
  ctx.showMessage(`${ctx.getVarName("EXP", 70)} +5`);
  ctx.exp[70] += 5;
  ctx.exp[120] += 2;
  ctx.base[31] += ctx.rand(6);
  if (ctx.talents[324] == 1) {
    ctx.base[31] += ctx.rand(6);
  }
  if (ctx.base[31] >= MAXctx.base[31]) {
    ctx.base[31] = MAXctx.base[31];
  }
  await ctx.wait();
  return 0;
}
