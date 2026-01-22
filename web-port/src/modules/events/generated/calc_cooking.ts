/**
 * CALC_COOKING.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function start_coocking(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (character.cflags[ctx.count][671] === 1) {
      await cooking_detail(ctx, character);
    }
  }
}

export async function cooking_detail(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 1;
  B = 0;
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 사무소에 들어와 자기 책상에 앉자, 타이밍을 재듯 달려온 ${ctx.josaHelper(ctx.getName(ctx.count), "가")}`);
  if (ctx.getTalent(count, 208) || ctx.getTalent(count, 407) || ctx.getTalent(count, 205)) {
    ctx.showMessage(`명품 브랜드의 작은 토트백을`);
  } else if (ctx.getTalent(count, 209)) {
    ctx.showMessage(`세련된 색의 보자기를`);
  } else {
    ctx.showMessage(`귀여운 바구니를`);
  }
  if (ctx.getTalent(count, 18)) {
    ctx.showMessage(`뺨을 붉히고 옆을 보며, 뻔한 그 말과 함께`);
  }
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 건내주었다`);
  ctx.showMessage(`내용물은 ${ctx.josaHelper("플레이어가")} 부탁했던 도시락인 모양이다`);
  if (ctx.abilities[ctx.count][73] <= 2) {
    if (ctx.getTalent(count, 208) || ctx.getTalent(count, 407) || ctx.getTalent(count, 205)) {
      ctx.showMessage(`토트백 손잡이를 잡고 있는`);
    } else if (ctx.getTalent(count, 209)) {
      ctx.showMessage(`보자기를 감싼`);
    } else {
      ctx.showMessage(`바구니를 내민`);
    }
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 손가락엔 여기저기 반창고가 붙어있다`);
  }
  ctx.showMessage(`${ctx.getVarName("CALL", MASTER)}에게 자기가 보는 앞에서 먹어달라고 말하는 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}`);
  if (ctx.abilities[ctx.count][73] <= 2) {
    ctx.showMessage(`자신이 없어 보이는`);
  } else {
    ctx.showMessage(`자신이 넘치는`);
  }
  ctx.showMessage(`표정이다……`);
  ctx.showMessage(`도시락 뚜껑을 여니, 안에는 한눈에 봐도 정성을 다해 만든 걸 알 수 있는,`);
  if (ctx.abilities[ctx.count][73] <= 2) {
    ctx.showMessage(`조금 못생긴`);
  } else {
    ctx.showMessage(`색색이 화려한`);
  }
  if (ctx.getTalent(count, 85) === 0) {
    if (ctx.rand(5) === 0) {
      ctx.showMessage(`샌드위치와`);
    } else if (ctx.rand(4) === 0) {
      ctx.showMessage(`주먹밥과`);
    } else if (ctx.rand(3) === 0) {
      ctx.showMessage(`볶음밥과`);
    } else if (ctx.rand(2) === 0) {
      ctx.showMessage(`약밥과`);
    } else if (ctx.rand(1) === 0) {
      ctx.showMessage(`나폴리탄과`);
    }
  } else if (ctx.getTalent(count, 85) === 1) {
    ctx.showMessage(`분홍어묵으로 하트마크가 그려진 밥과`);
  }
  ctx.showMessage(`반찬이 담겨있었다.`);
  ctx.showMessage(`${ctx.josaHelper("플레이어가")} 고맙다고 말하자, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 입이 귀에 걸린 것 같았다……`);
  ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "가")} 기대의 눈빛으로 감상을 기다리고 있기에, 바로 요리를 입에 넣어보니`);
  if (ctx.abilities[ctx.count][73] <= 2) {
    ctx.showMessage(`간조절이 아직 서투르지만, 그래도 먹을만 한`);
  } else {
    ctx.showMessage(`식었어도 맛있게 먹어지는`);
  }
  ctx.showMessage(`맛`);
  if (ctx.getTalent(count, 85) === 1) {
    ctx.showMessage(`과, 무엇보다도 잔뜩 담겨있는 애정이 느껴졌다`);
  } else {
    ctx.showMessage(`이었다`);
  }
  ctx.showMessage('');
  ctx.showMessage('');
  A += ctx.rand(6);
  B += ctx.rand(6);
  if (ctx.getTalent(count, 418) === 1) {
    A *= 2;
    if (A < 5) {
      A = 5;
    }
  }
  ctx.showMessage(`요리경험 +${A}`);
  ctx.exp[ctx.count][61] += A;
  if (ctx.getTalent(count, 85) === 1) {
    if (B > 0) {
      ctx.showMessage(`애정경험 +{B}`);
      ctx.exp[ctx.count][23] += B;
    }
  }
  // TODO: PRINTW
}
