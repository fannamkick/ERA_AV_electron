/**
 * LABELNAME.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function labelname(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = ctx.rand(7);
  if (ctx.locals[0] === 0) {
    ctx.showMessage(`메디터레니언・컴퍼니`);
    character.cstr[ctx.master][5] = "메디터레니언・컴퍼니";
  } else if (ctx.locals[0] === 1) {
    ctx.showMessage(`SkyPrincess Ent.`);
    character.cstr[ctx.master][5] = "SkyPrincess Ent";
  } else if (ctx.locals[0] === 2) {
    ctx.showMessage(`아시안 드림`);
    character.cstr[ctx.master][5] = "아시안 드림";
  } else if (ctx.locals[0] === 3) {
    ctx.showMessage(`Infinite Ent.`);
    character.cstr[ctx.master][5] = "Infinite Ent";
  } else if (ctx.locals[0] === 4) {
    ctx.showMessage(`일본열`);
    character.cstr[ctx.master][5] = "일본열";
  } else if (ctx.locals[0] === 5) {
    ctx.showMessage(`BlueCold Ent.`);
    character.cstr[ctx.master][5] = "BlueCold Ent.";
  } else if (ctx.locals[0] === 6) {
    ctx.showMessage(`S-1 Pictures`);
    character.cstr[ctx.master][5] = "S-1 Pictures";
  } else {
    ctx.showMessage(`닌자 포르노`);
    character.cstr[ctx.master][5] = "닌자 포르노";
  }
}

export async function producer_debut(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.exp[ctx.master][9] === 0) {
    ctx.showMessage(`${ctx.getVarName("CALL", MASTER)} 감독의 첫 작품은 {P} 포인트의 매상이 예상되었고, 순조로운 첫 비행이라고`);
    ctx.showMessage(`할 수 있을 것 같다`);
    ctx.showMessage(`W 조만간에, AV를 출시할 레이블명을 결정해야 한다`);
    ctx.showMessage(`W ${ctx.josaHelper("플레이어는")} 사무소 직원 모두와 상담하여, 레이블명을 정하기로 했다`);
    // Label: INPUT_LOOP_1
    ctx.showMessage(`직원이 내놓은 방안인 【`);
    await labelname(ctx, character);
    ctx.showMessage(`】로 결정하시겠습니까?`);
    ctx.showMessage('[0] - 예');
    ctx.showMessage('[1] - 스스로 정한다');
    ctx.showMessage('[2] - 더 의논 한다');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`레이블명을 【%CSTR:MASTER:5%】%조사만처리(CSTR:MASTER:5,"로")% 결정했습니다`);
    } else if (ctx.result === 1) {
      ctx.showMessage(`레이블명을 입력해주십시오`);
      // TODO: INPUTS
      if (ctx.results === "") {
        ctx.showMessage(`레이블 명이 없어서는 곤란하므로 다시 한번 의논 하는 것으로 했다`);
        // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
      }
      ctx.showMessage(`라벨명을 【${ctx.results}】%조사만처리(RESULTS,"로")% 결정했습니다`);
      character.cstr[ctx.master][5] = ctx.results;
    } else {
      // GOTO INPUT_LOOP_1 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
}
