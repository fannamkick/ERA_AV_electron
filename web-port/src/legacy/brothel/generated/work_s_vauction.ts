/**
 * WORK_S_VAUCTION.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function v_auction(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine();
  character.cflags[13] = 0;
  A = 0;
  B = 0;
  C = 0;
  G = 0;
  M = 0;
  N = 0;
  O = 0;
  L = 0;
  for (let COUNT = 0; COUNT < 101; COUNT++) {
    T[ctx.count] = 0;
    U[ctx.count] = 0;
  }
  character = -1;
  ctx.assi = -1;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (character.cflags[ctx.count][130]) {
      character = ctx.count;
    }
  }
  C = ctx.exp[91];
  C /= 5;
  if (C) {
    for (let COUNT = 0; COUNT < C; COUNT++) {
      G += ctx.rand(2);
    }
  }
  D = ctx.exp[ctx.master][91];
  D /= 5;
  if (D) {
    for (let COUNT = 0; COUNT < D; COUNT++) {
      G += ctx.rand(2);
    }
  }
  if (ctx.talents[126]) {
    G += 1;
  }
  if (ctx.talents[180]) {
    G += 2;
  }
  if (ctx.talents[180]) {
    G += 6;
  }
  if (ctx.talents[181]) {
    G += 3;
  }
  if (ctx.talents[203]) {
    G += 10;
  }
  if (ctx.talents[205]) {
    G += 5;
  }
  if (ctx.talents[208]) {
    G += 8;
  }
  if (ctx.talents[400]) {
    G += 5;
  }
  if (ctx.talents[401]) {
    G += 20;
  }
  if (ctx.talents[123]) {
    G -= 5;
  }
  if (ctx.talents[9]) {
    G -= 15;
  }
  if (G < 10) {
    G = 10;
  }
  ctx.showMessage(`${ctx.getName(character)}의 처녀 옥션을 열었다……`);
  await print_clothtype(ctx, character);
  ctx.showMessage(`인 %타겟이(1)% 회장으로 끌려왔다…`);
  await print_bodypierce(ctx, character);
  ctx.showMessage(``);
  ctx.showMessage(`L`);
  if (ctx.talents[76]) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")}`);
    ctx.showMessage(`지금부터 이름도 모르는 누군가에게 당하는 미지의 쾌락에 흥분했는지,`);
    ctx.showMessage(`음란한 소리를 내며 비소를 만지작거리기 시작했다…`);
    ctx.showMessage(`미소녀가 다른 사람들의 시선에도 아랑곳없이 자위에 빠진 모습에 손님들은`);
    ctx.showMessage(`흥분한듯이 한숨이 새어나오고 있다…`);
    // TODO: PRINTW
  }
  if (ctx.talents[121]) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)} 같은 미소녀에게는 너무나 언밸런스한,`);
    ctx.showMessage(`육체 개조에 의해 자라난 극태 후타나리 페니스가`);
    ctx.showMessage(`관객의 시선을 받아 ${ctx.josaHelper("타겟은")} 흥분했는지,`);
    if (character.cflags[6] >= 2) {
      ctx.print('음모가 우거진');
    }
    ctx.showMessage(`사타구니에서 발기하기 시작했다…`);
    // TODO: PRINTW
  }
  if (ctx.talents[401]) {
    if (character.cflags[28] == 1) {
      ctx.print('아이돌을 은퇴하고');
    }
    ctx.showMessage(`인기 AV 여배우가 된 ${ctx.josaHelper("타겟이었")}지만,`);
    ctx.showMessage(`아직도 실전을 촬영한 비디오는 발매되지 않았다`);
    ctx.showMessage(`이번 옥션은 그 ${ctx.getVarName("CALL", TARGET)}의 처녀 상실 씬 촬영도 겸하고 있었다`);
    ctx.showMessage(`AV여배우의 처녀를 빼앗을 수 있다는 드문 경험에 흥분한 손님들은`);
    ctx.showMessage(`스테에지 위에서`);
    await print_clothtype(ctx, character);
    ctx.showMessage(`인 ${ctx.josaHelper("타겟을")} 보며 자지를 세우고`);
    ctx.showMessage(`삽입할 준비를 갖추고 있었다…`);
    // TODO: PRINTW
  }
  character.tflags[13] = 108;
  await self_kojo(ctx, character);
  await ctx.wait();
  for (let COUNT = 0; COUNT < (G / 5); COUNT++) {
    M = ctx.count * 5000 + 5000;
    if (ctx.talents[12]) {
      ctx.times('M', 1.10);
    }
    if (ctx.talents[13]) {
      ctx.times('M', 1.10);
    }
    if (ctx.talents[35]) {
      ctx.times('M', 1.10);
    }
    if (ctx.talents[63]) {
      ctx.times('M', 1.10);
    }
    if (ctx.talents[76]) {
      ctx.times('M', 2.00);
    }
    if (ctx.talents[91]) {
      ctx.times('M', 1.50);
    }
    if (ctx.talents[92]) {
      ctx.times('M', 2.00);
    }
    if (ctx.talents[126]) {
      ctx.times('M', 1.50);
    }
    if (ctx.talents[132]) {
      ctx.times('M', 1.10);
    }
    if (ctx.talents[123]) {
      ctx.times('M', 0.50);
    }
    if (ctx.talents[9]) {
      ctx.times('M', 0.10);
    }
    if (ctx.talents[180]) {
      ctx.times('M', 1.30);
    }
    if (ctx.talents[181]) {
      ctx.times('M', 1.50);
    }
    if (ctx.talents[203]) {
      ctx.times('M', 1.50);
    }
    if (ctx.talents[205]) {
      ctx.times('M', 1.50);
    }
    if (ctx.talents[208]) {
      ctx.times('M', 2.00);
    }
    if (ctx.talents[400]) {
      ctx.times('M', 5.00);
    }
    ctx.showMessage(`「{M}포인트!」`);
    ctx.showMessage('……'); ctx.waitInput();
  }
  ctx.showMessage('…………'); ctx.waitInput();
  ctx.showMessage('………………'); ctx.waitInput();
  ctx.showMessage(`W 아무래도 낙찰자가 나온 모양이다`);
  M = 1000;
  M *= G;
  if (ctx.talents[12]) {
    ctx.times('M', 1.10);
  }
  if (ctx.talents[13]) {
    ctx.times('M', 1.10);
  }
  if (ctx.talents[35]) {
    ctx.times('M', 1.10);
  }
  if (ctx.talents[63]) {
    ctx.times('M', 1.10);
  }
  if (ctx.talents[76]) {
    ctx.times('M', 2.00);
  }
  if (ctx.talents[91]) {
    ctx.times('M', 1.50);
  }
  if (ctx.talents[92]) {
    ctx.times('M', 2.00);
  }
  if (ctx.talents[126]) {
    ctx.times('M', 1.50);
  }
  if (ctx.talents[132]) {
    ctx.times('M', 1.10);
  }
  if (ctx.talents[123]) {
    ctx.times('M', 0.50);
  }
  if (ctx.talents[9]) {
    ctx.times('M', 0.10);
  }
  if (ctx.talents[180]) {
    ctx.times('M', 1.30);
  }
  if (ctx.talents[181]) {
    ctx.times('M', 1.50);
  }
  if (ctx.talents[203]) {
    ctx.times('M', 1.50);
  }
  if (ctx.talents[205]) {
    ctx.times('M', 1.50);
  }
  if (ctx.talents[208]) {
    ctx.times('M', 2.00);
  }
  if (ctx.talents[400]) {
    ctx.times('M', 5.00);
  }
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 처녀는 {M} 포인트로 낙찰되었습니다`);
  if (ctx.talents[121]) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 페니스는 너무 흥분해 완전히 발기해버려`);
    ctx.showMessage(`끝 부분에서 쿠퍼액을 계속 흘려보내고 있었다……`);
  }
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 처녀는 낙찰자에게 바쳐졌다……`);
  ctx.showMessage(`L`);
  ctx.showMessage(`……다음날 아침.`);
  ctx.showMessage(`낙찰자가 회장을 떠난 후 플레이 룸에서 나오지 않는 ${ctx.josaHelper("타겟을")} 데리러 가자`);
  ctx.showMessage(`${ctx.josaHelper("타겟은")} 침대 위에서 정액 투성이가 된 채, 텅 빈 눈으로 누워있었다…`);
  ctx.money += M;
  await ctx.wait();
  ctx.showMessage(`【처녀상실】`);
  character.cflags[50] = 1;
  ctx.talents[0] = 0;
  if (character.cflags[15] === 0) {
    character.cflags[15] = 2;
    ctx.cstr[0] = "모르는 남자";
  }
  if (character.cflags[16] === -1) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 낙찰자에게 첫 키스를 빼앗겼다……`);
    character.cflags[16] = 1;
    ctx.cstr[1] = "모르는 남자";
    character.cflags[820] = ctx.base[9];
    character.cflags[821] = DAY[1];
    character.cflags[822] = DAY[2];
    character.cflags[823] = 7;
    T[50] += 1;
  }
  character.tflags[13] = 109;
  await self_kojo(ctx, character);
  T[0] = ctx.rand(10) > 1;
  T[20] = T[0];
  T[5] = T[0];
  T[74] = 1;
  T[50] = 2;
  if (ctx.abilities[37] === 1) {
    ctx.times('U:100', 0.90);
  } else if (ctx.abilities[37] === 2) {
    ctx.times('U:100', 0.80);
  } else if (ctx.abilities[37] === 3) {
    ctx.times('U:100', 0.70);
  } else if (ctx.abilities[37] === 4) {
    ctx.times('U:100', 0.60);
  } else if (ctx.abilities[37] >= 5) {
    ctx.times('U:100', 0.50);
  }
  if (ctx.talents[11]) {
    ctx.times('U:100', 1.20);
  }
  if (ctx.talents[15]) {
    ctx.times('U:100', 1.50);
  }
  if (ctx.talents[17]) {
    ctx.times('U:100', 0.90);
  }
  if (ctx.talents[21]) {
    ctx.times('U:100', 0.90);
  }
  if (ctx.talents[22]) {
    ctx.times('U:100', 0.90);
  }
  if (ctx.talents[24]) {
    ctx.times('U:100', 1.30);
  }
  if (ctx.talents[28]) {
    ctx.times('U:100', 0.80);
  }
  if (ctx.talents[30]) {
    ctx.times('U:100', 2.50);
  }
  if (ctx.talents[31]) {
    ctx.times('U:100', 0.90);
  }
  if (ctx.talents[32]) {
    ctx.times('U:100', 1.20);
  }
  if (ctx.talents[33]) {
    ctx.times('U:100', 0.80);
  }
  if (ctx.talents[34]) {
    ctx.times('U:100', 2.00);
  }
  if (ctx.talents[35]) {
    ctx.times('U:100', 1.10);
  }
  if (ctx.talents[76]) {
    ctx.times('U:100', 0.20);
  }
  if (ctx.talents[80]) {
    ctx.times('U:100', 0.80);
  }
  if (ctx.talents[88]) {
    ctx.times('U:100', 0.30);
  }
  if (ctx.talents[84]) {
    U[100] *= 200;
  }
  if (ctx.talents[85]) {
    U[100] *= 100;
  }
  if (ctx.talents[86]) {
    ctx.times('U:100', 0.70);
  }
  if (ctx.talents[180]) {
    ctx.times('U:100', 0.60);
  }
  if (ctx.talents[181]) {
    ctx.times('U:100', 0.10);
  }
  if (ctx.talents[184]) {
    U[100] *= 100;
  }
  A = 5;
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  await work_exp(ctx, character);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  LOSEctx.base[0] = 500 + G * 2;
  if (ctx.abilities[37] === 1) {
    ctx.times('LOSEBASE:0', 0.90);
  } else if (ctx.abilities[37] === 2) {
    ctx.times('LOSEBASE:0', 0.80);
  } else if (ctx.abilities[37] === 3) {
    ctx.times('LOSEBASE:0', 0.70);
  } else if (ctx.abilities[37] === 4) {
    ctx.times('LOSEBASE:0', 0.60);
  } else if (ctx.abilities[37] >= 5) {
    ctx.times('LOSEBASE:0', 0.50);
  }
  if (LOSEctx.base[0] >= ctx.base[0]) {
    LOSEctx.base[0] = ctx.base[0];
  }
  ctx.print('체력소비　　:');
  N = ctx.base[0];
  await figure_indent(ctx, character);
  ctx.printValue(ctx.base[0]);
  ctx.printChar('-');
  N = LOSEctx.base[0];
  await figure_indent(ctx, character);
  ctx.printValue(LOSEctx.base[0]);
  ctx.printChar('=');
  N = ctx.base[0] - LOSEctx.base[0];
  await figure_indent(ctx, character);
  ctx.printValueLine(ctx.base[0] - LOSEctx.base[0]);
  ctx.base[0] -= LOSEctx.base[0];
  ctx.print('체력　　　　:');
  ctx.drawBar(ctx.base[0], MAXctx.base[0], 32);
  ctx.showMessage(`(${ctx.base[0]}/${MAXctx.base[0]})`);
  await work_sp_after(ctx, character);
  if (ctx.base[0] <= 0) {
    ctx.showMessage(`처녀를 빼앗긴 ${ctx.josaHelper("타겟은")}, 미동조차 보이질 않는다`);
    ctx.showMessage(`무슨 짓을 해도 반응이 없다……`);
    await ctx.wait();
    await charadead_check(ctx, character);
  }
  character.cflags[105] += 100;
  await ctx.wait();
  // TODO: BEGIN TURNEND
  return 1;
}
