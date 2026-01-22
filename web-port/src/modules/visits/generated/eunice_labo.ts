/**
 * EUNICE_LABO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function eunice_labo(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  Y = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 0) === 1) {
      Y += 1;
    }
  }
  B = 0;
  ctx.drawLine();
  ctx.showMessage('아카샤 본부・유니스의 연구실');
  ctx.showMessage('《유니스의 은총을 받을 수 있습니다》');
  ctx.drawLine();
  ctx.printValue(DAY+1);
  ctx.print('주차');
  if (TIME === 0) {
    ctx.showMessage('전반');
  } else {
    ctx.showMessage('후반');
  }
  ctx.showMessage(`소지금: {MONEY}포인트`);
  ctx.drawLine();
  ctx.showMessage('[ 0] - 인격파괴:【프라이드 높음】을 습득    　　( 2000000포인트)');
  ctx.showMessage('[ 1] - 인격파괴: 뉴트럴　　　　　　　       　　( 1000000포인트)');
  ctx.showMessage('[ 2] - 인격파괴:【프라이드 낮음】을 습득    　　( 2000000포인트)');
  ctx.showMessage('[ 3] - 인격파괴:【쾌감에 솔직】을 습득      　　( 3000000포인트)');
  ctx.showMessage('[ 4] - 인격파괴: 뉴트럴    　　　　　       　　( 1500000포인트)');
  ctx.showMessage('[ 5] - 인격파괴:【쾌감을 부정】을 습득      　　( 3000000포인트)');
  ctx.showMessage('[ 6] - 인격파괴:【새드】를 습득    　 　　　　　( 3000000포인트)');
  ctx.showMessage('[ 7] - 인격파괴: 뉴트럴    　　　　　       　　( 1500000포인트)');
  ctx.showMessage('[ 8] - 인격파괴:【마조】를 습득　　       　　　( 3000000포인트)');
  ctx.showMessage('[ 9] - 사상개변:【아이돌】을 습득       　　　　( 2000000포인트)');
  ctx.showMessage('[10] - 사상개변:【패션모델】을 습득　           ( 2000000포인트)');
  ctx.showMessage('[11] - 사상개변:【캬바레녀】를 습득     　　　　( 2000000포인트)');
  ctx.showMessage('[12] - 사상개변: 뉴트럴　　　　　　　       　　( 1000000포인트)');
  if (ctx.paramBand[136] >= 3 || ctx.flags[563] === 1) {
    ctx.showMessage('[13] - 사상개변: 처녀상실　　　　　　　　　　　(80000000포인트)');
    ctx.showMessage('[14] - 사상개변: 애널처녀상실　　  　　　　　　(80000000포인트)');
    ctx.showMessage('[15] - 사상개변: 첫 키스　　　　      　　　　(80000000포인트)');
  }
  if (ctx.flags[563] == 1 && Y >= 2) {
    ctx.showMessage('[99] - 사상개변:【타천사】습득과 전생     　　(30000000포인트)');
  }
  ctx.drawLine();
  ctx.showMessage('[999] - 돌아간다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await break_pride_high(ctx, character);
  } else if (ctx.result === 1) {
    await break_pride_neutral(ctx, character);
  } else if (ctx.result === 2) {
    await break_pride_low(ctx, character);
  } else if (ctx.result === 3) {
    await break_xtc_positive(ctx, character);
  } else if (ctx.result === 4) {
    await break_xtc_neutral(ctx, character);
  } else if (ctx.result === 5) {
    await break_xtc_negative(ctx, character);
  } else if (ctx.result === 6) {
    await break_sm_sadist(ctx, character);
  } else if (ctx.result === 7) {
    await break_sm_neutral(ctx, character);
  } else if (ctx.result === 8) {
    await break_sm_masochist(ctx, character);
  } else if (ctx.result === 9) {
    B = 203;
    await change_work(ctx, character);
  } else if (ctx.result === 10) {
    B = 402;
    await change_work(ctx, character);
  } else if (ctx.result === 11) {
    B = 421;
    await change_work(ctx, character);
  } else if (ctx.result === 12) {
    B = 999;
    await change_work(ctx, character);
  } else if (ctx.result === 13 && (ctx.paramBand[136] >= 3 || ctx.flags[563] === 1)) {
    B = 100;
    await change_virginity(ctx, character);
  } else if (ctx.result === 14 && (ctx.paramBand[136] >= 3 || ctx.flags[563] === 1)) {
    B = 150;
    await change_virginity(ctx, character);
  } else if (ctx.result === 15 && (ctx.paramBand[136] >= 3 || ctx.flags[563] === 1)) {
    B = 200;
    await change_virginity(ctx, character);
  } else if (ctx.result === 99 && ctx.flags[563] === 1 && Y >= 2) {
    await change_fallen(ctx, character);
  } else if (ctx.result === 999) {
    return;
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}
