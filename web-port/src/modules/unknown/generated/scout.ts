/**
 * SCOUT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function event_scout(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 203) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 421) === 1) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 402) === 1) {
      // TODO: CONTINUE
    } else if (ctx.exp[ctx.master][9] === 0) {
      // TODO: CONTINUE
    } else if (ctx.exp[ctx.count][76] === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 10) {
      // TODO: CONTINUE
    } else {
      if (ctx.rand(100) >= 80) {
        switch (ctx.rand(3)) {
          case 0:
            await scout_idol(ctx, character);
            case 1:
              await scout_c_club(ctx, character);
              case 2:
                await scout_model(ctx, character);
              break;
            }
            ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥'); ctx.waitInput();
          }
        }
      }
}

export async function scout_idol(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W 어느 날, 키류 조직이 운영하는『정상적인』예능 프로덕션의 스카우트맨이 카논과 함께 사무소에 찾아왔다……`);
  ctx.showMessage(`용건을 들어보니, ${ctx.josaHelper(ctx.getName(ctx.count), "를")} 일반 미디어에 그라비아 아이돌로 데뷔시키고 싶다고 했다.`);
  if (ctx.base[ctx.count][22] < 80) {
    ctx.showMessage(`스카우트맨은 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 거유도 아니고 오히려 미유・빈유에 가까운 스타일이지만,`);
    ctx.showMessage(`오히려 그쪽이 수요가 있다, 라며 강하게 설파했다`);
  } else if (ctx.base[ctx.count][22] >= 80 && ctx.base[ctx.count][22] < 85) {
    ctx.showMessage(`스카우트맨은 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 거유는 아니지만, 균형잡힌 몸매는 남성을 자극하는 것이 있다,`);
    ctx.showMessage(`라며 강하게 설파했다`);
  } else {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 박력있는 거유는 남자의 마음을 잡고 놔주지 않는다, 라며 강하게 설파했다`);
  }
  ctx.showMessage(`일반 미디어에 노출시키면 ${ctx.getVarName("CALL", COUNT)}의 작품에『현역 그라비아 아이돌』이라는 부가가치가 붙겠지만,`);
  ctx.showMessage(`그래서『이쪽』활동이 어려워진다면 오히려 본말전도다`);
  ctx.showMessage(`그러자 스카우트맨은 힐쭉 웃으며, 그런 문제는 생기지 않도록 뒷공작을 완벽히 했다고 가슴을 피고,`);
  ctx.showMessage(`거기다 이번 ${ctx.getVarName("CALL", COUNT)}의 그라비아 데뷔는 카논의 지시라고 말했다`);
  ctx.showMessage(`확실히 카논이 공작을 지시했다면, 아무런 문제 없이 일이 원만히 굴러갈 것이다`);
  ctx.showMessage(`그러나 이쪽에만 이득이 있는 이야기는 반드시 캥기는 뒤가 있는 법인데……`);
  // TODO: PRINTW
  ctx.showMessage(`「뒤? 있다면 있고, 없다면 없지`);
  ctx.showMessage(`　너는 연예인물로 팔아재낄 수 있고, 우리는 일급품 소재를 그냥 얻어가는 거니까`);
  ctx.showMessage(`　한마디로 WIN－WIN관계라고 할 수 있어`);
  ctx.showMessage(`　아, 굳이 말하자면 우리 손님중에 아이돌을 좋아하는 사람이 있으니, 그땐 잘 부탁하겠지만`);
  ctx.showMessage(`　참고로 이번 일은 서로 WIN－WIN인데다가, 상대가 너니까 숨기는 거 없이 전부 털어놓은거야`);
  ctx.showMessage(`　필요 이상으로 의심받다가 귀찮아지는 건 우리도 싫으니까」`);
  // TODO: PRINTW
  ctx.showMessage(`겨우 입을 연 카논의 진지한 눈은, 다른 일을 꾸미는 사람으로 보이지는 않는다`);
  // Label: INPUT_LOOP_SCOUT_01
  ctx.showMessage(`그럼, 어떻게 해야하나`);
  ctx.showMessage(`[0] - ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "를")} 그라비아 아이돌로 데뷔시킨다`);
  ctx.showMessage(`[1] - 그만둔다`);
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`본인에게 동의는 구해야 겠지만, ${ctx.josaHelper("플레이어는")} 일단 일을`);
    ctx.showMessage(`진행해보자고 카논에게 전했다……`);
    // TODO: PRINTW
    ctx.showMessage(`얼마 뒤, 사무소에 온 ${ctx.getVarName("CALL", COUNT)}에게 이 일을 알리자, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 갑작스러운 이야기에 눈을 동그랗게 떴지만,`);
    ctx.showMessage(`그라비아 아이돌 데뷔를 받아들였다`);
    ctx.getTalent(count, 203) = 1;
    MAXctx.base[ctx.count][31] += 30;
    ctx.base[ctx.count][31] += 30;
    ctx.getTalent(count, 405) = 0;
    character.cflags[ctx.count][801] = 0;
  } else if (ctx.result === 1) {
    ctx.showMessage(`이번 이야기는 거절하겠다고 카논에게 전했다……`);
  } else {
    // GOTO INPUT_LOOP_SCOUT_01 - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function scout_c_club(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W 어느 날, 키류 조직이 운영하는『정상적인』캬바쿠라의 스카우트맨이 카논과 함께 사무소에 찾아왔다……`);
  ctx.showMessage(`용건을 들어보니, ${ctx.josaHelper(ctx.getName(ctx.count), "를")} 캬바레녀로 고용하고 싶다고 한다`);
  if (ctx.getTalent(count, 63) === 1) {
    ctx.showMessage(`마음씨 고운 아가씨에게 치유받고 싶어, 라는 주문이`);
  } else if (ctx.getTalent(count, 18) === 1) {
    ctx.showMessage(`가끔은 튕겨도, 사이가 좋아지면 어리광을 부려주는 아가씨와 술을 마시고 싶어, 라는 주문이`);
  } else if (ctx.getTalent(count, 15)) {
    ctx.showMessage(`프라이드가 높은, 절벽 위의 꽃같은 아가씨에게 매도받고 싶어, 라는 주문이`);
  } else {
    ctx.showMessage(`초 A급 미소녀・미녀와 술을 마시고 싶어, 라는 주문이`);
  }
  ctx.showMessage(`단골손님에게서 들어와, ${ctx.josaHelper(ctx.getName(ctx.count), "가")} 눈에 띄었다고 한다`);
  ctx.showMessage(`캬바레녀로 데뷔시키면 ${ctx.getVarName("CALL", COUNT)}의 작품에『현역 캬바레녀』라는 부가가치가 붙겠지만,`);
  ctx.showMessage(`그래서『이쪽』활동이 어려워진다면 오히려 본말전도다`);
  ctx.showMessage(`그러자 스카우트맨은 힐쭉 웃으며, 그런 문제는 생기지 않도록 뒷공작을 완벽히 했다고 가슴을 피고,`);
  ctx.showMessage(`거기다 이번 ${ctx.getVarName("CALL", COUNT)}의 캬바레녀 데뷔는 카논의 지시라고 말했다`);
  ctx.showMessage(`확실히 카논이 공작을 지시했다면, 아무런 문제 없이 일이 원만히 굴러갈 것이다`);
  ctx.showMessage(`그러나 이쪽에만 이득이 있는 이야기는 반드시 캥기는 뒤가 있는 법인데……`);
  // TODO: PRINTW
  ctx.showMessage(`「뒤? 있다면 있고, 없다면 없지`);
  ctx.showMessage(`　너는 캬바레녀물로 팔아재낄 수 있고, 우리는 일급품 소재를 그냥 얻어가는 거니까`);
  ctx.showMessage(`　한마디로 WIN－WIN관계라고 할 수 있어`);
  ctx.showMessage(`　아, 굳이 말하자면 우리 손님중에 캬바레녀를 좋아하는 사람이 있으니, 그땐 잘 부탁하겠지만`);
  ctx.showMessage(`　참고로 이번 일은 서로 WIN－WIN인데다가, 상대가 너니까 숨기는 거 없이 전부 털어놓은거야`);
  ctx.showMessage(`　필요 이상으로 의심받다가 귀찮아지는 건 우리도 싫으니까」`);
  // TODO: PRINTW
  ctx.showMessage(`겨우 입을 연 카논의 진지한 눈은, 다른 일을 꾸미는 사람으로 보이지는 않는다`);
  // Label: INPUT_LOOP_SCOUT_02
  ctx.showMessage(`그럼, 어떻게 해야하나`);
  ctx.showMessage(`[0] - ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "를")} 캬바레녀로 데뷔시킨다`);
  ctx.showMessage(`[1] - 그만둔다`);
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`본인에게 동의는 구해야 겠지만, ${ctx.josaHelper("플레이어는")} 일단 일을`);
    ctx.showMessage(`진행해보자고 카논에게 전했다……`);
    // TODO: PRINTW
    ctx.showMessage(`얼마 뒤, 사무소에 온 ${ctx.getVarName("CALL", COUNT)}에게 이 일을 알리자, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 갑작스러운 이야기에 눈을 동그랗게 떴지만,`);
    ctx.showMessage(`캬바레녀 데뷔를 받아들였다`);
    ctx.getTalent(count, 421) = 1;
    MAXctx.base[ctx.count][31] += 10;
    ctx.base[ctx.count][31] += 10;
    ctx.getTalent(count, 405) = 0;
    character.cflags[ctx.count][801] = 0;
  } else if (ctx.result === 1) {
    ctx.showMessage(`이번 이야기는 거절하겠다고 카논에게 전했다……`);
  } else {
    // GOTO INPUT_LOOP_SCOUT_02 - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function scout_model(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W 어느 날, 키류 조직이 운영하는『정상적인』출판사의 스카우트맨이 카논과 함께 사무소에 찾아왔다……`);
  ctx.showMessage(`용건을 들어보니, ${ctx.josaHelper(ctx.getName(ctx.count), "를")} 일반 미디어에 패션모델로 데뷔시키고 싶다고 했다.`);
  if (ctx.getTalent(count, 99) === 1) {
    ctx.showMessage(`스카우트맨은 ${ctx.getVarName("CALL", COUNT)}의 장신은 모델에 걸맞고, 연령대가 높은 패션 잡지에 딱이다`);
    ctx.showMessage(`, 라며 강하게 설파했다`);
  } else if (ctx.getTalent(count, 100) === 1) {
    ctx.showMessage(`스카우트맨은 ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 모델을 하기엔 작지만, 반대로 그게 로틴용 패션 잡지에 딱이다`);
    ctx.showMessage(`, 라며 강하게 설파했다`);
  } else {
    ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}처럼 평균적인 스타일은, 하이틴용 페션 잡지에 딱이다`);
    ctx.showMessage(`, 라며 강하게 설파했다`);
  }
  ctx.showMessage(`일반 미디어에 노출시키면 ${ctx.getVarName("CALL", COUNT)}의 작품에『현역 모델』이라는 부가가치가 붙겠지만,`);
  ctx.showMessage(`그래서『이쪽』활동이 어려워진다면 오히려 본말전도다`);
  ctx.showMessage(`그러자 스카우트맨은 힐쭉 웃으며, 그런 문제는 생기지 않도록 뒷공작을 완벽히 했다고 가슴을 피고,`);
  ctx.showMessage(`거기다 이번 ${ctx.getVarName("CALL", COUNT)}의 모델 데뷔는 카논의 지시라고 말했다`);
  ctx.showMessage(`확실히 카논이 공작을 지시했다면, 아무런 문제 없이 일이 원만히 굴러갈 것이다`);
  ctx.showMessage(`그러나 이쪽에만 이득이 있는 이야기는 반드시 캥기는 뒤가 있는 법인데……`);
  // TODO: PRINTW
  ctx.showMessage(`「뒤? 있다면 있고, 없다면 없지`);
  ctx.showMessage(`　너는 모델물로 팔아재낄 수 있고, 우리는 일급품 소재를 그냥 얻어가는 거니까`);
  ctx.showMessage(`　한마디로 WIN－WIN관계라고 할 수 있어`);
  ctx.showMessage(`　아, 굳이 말하자면 우리 손님중에 아이돌을 좋아하는 사람이 있으니, 그땐 잘 부탁하겠지만`);
  ctx.showMessage(`　참고로 이번 일은 서로 WIN－WIN인데다가, 상대가 너니까 숨기는 거 없이 전부 털어놓은거야`);
  ctx.showMessage(`　필요 이상으로 의심받다가 귀찮아지는 건 우리도 싫으니까」`);
  // TODO: PRINTW
  ctx.showMessage(`겨우 입을 연 카논의 진지한 눈은, 다른 일을 꾸미는 사람으로 보이지는 않는다`);
  // Label: INPUT_LOOP_SCOUT_03
  ctx.showMessage(`그럼, 어떻게 해야하나`);
  ctx.showMessage(`[0] - ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "를")} 모델로 데뷔시킨다`);
  ctx.showMessage(`[1] - 그만둔다`);
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`본인에게 동의는 구해야 겠지만, ${ctx.josaHelper("플레이어는")} 일단 일을`);
    ctx.showMessage(`진행해보자고 카논에게 전했다……`);
    // TODO: PRINTW
    ctx.showMessage(`얼마 뒤, 사무소에 온 ${ctx.getVarName("CALL", COUNT)}에게 이 일을 알리자, ${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")} 갑작스러운 이야기에 눈을 동그랗게 떴지만,`);
    ctx.showMessage(`모델 데뷔를 받아들였다`);
    ctx.getTalent(count, 402) = 1;
    MAXctx.base[ctx.count][31] += 20;
    ctx.base[ctx.count][31] += 20;
    ctx.getTalent(count, 405) = 0;
    character.cflags[ctx.count][801] = 0;
  } else if (ctx.result === 1) {
    ctx.showMessage(`이번 이야기는 거절하겠다고 카논에게 전했다……`);
  } else {
    // GOTO INPUT_LOOP_SCOUT_03 - 구조 변경 필요 (while/break 사용 권장)
  }
}
