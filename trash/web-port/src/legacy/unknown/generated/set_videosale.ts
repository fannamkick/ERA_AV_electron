/**
 * SET_VIDEOSALE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function set_videosale(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.flags[560] = ctx.rand(31);
  if (ctx.flags[120] === 3) {
    if (ctx.flags[125] == 1) {
      ctx.flags[560] = ctx.flags[126];
    }
    ctx.flags[121] = ctx.rand(31);
    ctx.flags[122] = ctx.rand(31);
    ctx.flags[123] = ctx.rand(31);
    ctx.flags[124] = ctx.rand(100);
    ctx.flags[125] = 0;
    ctx.flags[126] = 0;
  }
}

export async function videosale_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[560] === -1 && character.no === 10) {
    ctx.times('P', 5.00);
  } else if (ctx.flags[560] === 0 && ctx.talents[505] === 0 && ctx.talents[504] === 0 && (ctx.base[9] <= 15  || ctx.talents[414] === 1)) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 1 && ctx.base[9] >= 23) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 2 && (ctx.talents[220] === 1 || ctx.talents[221] === 1)) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 3 && ctx.base[22] <= 78) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 4 && ctx.flags[22] & 4) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 5 && (ctx.talents[205] === 1 || ctx.talents[208] === 1 || ctx.talents[407] === 1)) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 6 && ctx.base[22] >= 85) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 7 && ctx.flags[22] & 1) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 8 && (ctx.talents[408] === 1 || ctx.talents[409] === 1 || ctx.talents[410] === 1)) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 9 && (ctx.talents[203] === 1 || ctx.talents[506] === 1)) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 10 && ctx.talents[432] === 1) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 11 && (character.tflags[32] & 1 || character.tflags[132] & 1)) {
    ctx.times('P', 2.00);
  } else if (ctx.flags[560] === 12 && ctx.talents[206]) {
    ctx.times('P', 2.00);
  } else if (ctx.flags[560] === 13 && 촬영경향SM) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 14 && ctx.talents[421]) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 15 && 촬영특수레즈) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 16 && (ctx.talents[180] === 1 || ctx.talents[181] === 1)) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 17 && ctx.talents[413]) {
    ctx.times('P', 2.00);
  } else if (ctx.flags[560] === 18 && 촬영경향자위) {
    ctx.times('P', 1.20);
  } else if (ctx.flags[560] === 19 && 촬영부위A && 촬영내용성교) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 20 && ctx.talents[153] === 1) {
    ctx.times('P', 2.00);
  } else if (ctx.flags[560] === 21 && ctx.talents[121] === 1) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 22 && ctx.talents[430] === 1) {
    ctx.times('P', 2.00);
  } else if (ctx.flags[560] === 23 && character.cflags[40] >= 64 && character.cflags[42] === 80) {
    ctx.times('P', 2.00);
  } else if (ctx.flags[560] === 24 && character.cflags[6] < 6) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 25 && ctx.talents[432] === 1) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 26 && ctx.talents[402] === 1) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 27 && ctx.talents[417] === 1) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 28 && ctx.talents[411] === 1) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 29 && ctx.talents[412] === 1) {
    ctx.times('P', 1.50);
  } else if (ctx.flags[560] === 30 && ctx.talents[415] === 1) {
    ctx.times('P', 1.50);
  }
}

export async function videosale_print(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[560] === -1) {
    ctx.showMessage(`카논 누님`);
  } else if (ctx.flags[560] === 0) {
    ctx.showMessage(`로리계`);
  } else if (ctx.flags[560] === 1) {
    ctx.showMessage(`누나계`);
  } else if (ctx.flags[560] === 2) {
    ctx.showMessage(`여고생계`);
  } else if (ctx.flags[560] === 3) {
    ctx.showMessage(`빈유`);
  } else if (ctx.flags[560] === 4) {
    ctx.showMessage(`코스프레계`);
  } else if (ctx.flags[560] === 5) {
    ctx.showMessage(`섹프계`);
  } else if (ctx.flags[560] === 6) {
    ctx.showMessage(`거유`);
  } else if (ctx.flags[560] === 7) {
    ctx.showMessage(`야외노출`);
  } else if (ctx.flags[560] === 8) {
    ctx.showMessage(`외국인・혼혈・쿼터`);
  } else if (ctx.flags[560] === 9) {
    ctx.showMessage(`연예인`);
  } else if (ctx.flags[560] === 10) {
    ctx.showMessage(`유부녀`);
  } else if (ctx.flags[560] === 11) {
    ctx.showMessage(`처녀상실`);
  } else if (ctx.flags[560] === 12) {
    ctx.showMessage(`서큐버스`);
  } else if (ctx.flags[560] === 13) {
    ctx.showMessage(`SM`);
  } else if (ctx.flags[560] === 14) {
    ctx.showMessage(`캬바레녀`);
  } else if (ctx.flags[560] === 15) {
    ctx.showMessage(`레즈게`);
  } else if (ctx.flags[560] === 16) {
    ctx.showMessage(`업소여성`);
  } else if (ctx.flags[560] === 17) {
    ctx.showMessage(`여장소년`);
  } else if (ctx.flags[560] === 18) {
    ctx.showMessage(`자위계`);
  } else if (ctx.flags[560] === 19) {
    ctx.showMessage(`애널SEX계`);
  } else if (ctx.flags[560] === 20) {
    ctx.showMessage(`임신`);
  } else if (ctx.flags[560] === 21) {
    ctx.showMessage(`후타나리`);
  } else if (ctx.flags[560] === 22) {
    ctx.showMessage(`순애SEX`);
  } else if (ctx.flags[560] === 23) {
    ctx.showMessage(`안경`);
  } else if (ctx.flags[560] === 24) {
    ctx.showMessage(`음모 없음`);
  } else if (ctx.flags[560] === 25) {
    ctx.showMessage(`갸루계`);
  } else if (ctx.flags[560] === 26) {
    ctx.showMessage(`모델`);
  } else if (ctx.flags[560] === 27) {
    ctx.showMessage(`메이드`);
  } else if (ctx.flags[560] === 28) {
    ctx.showMessage(`간호사`);
  } else if (ctx.flags[560] === 29) {
    ctx.showMessage(`여교사`);
  } else if (ctx.flags[560] === 30) {
    ctx.showMessage(`OL`);
  }
}
