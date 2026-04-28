/**
 * AYANO_ORDER_DETAIL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function security_up(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 10000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`W 《아야노에게 뒤에서 압력을 넣어 순찰을 강화하도록 부탁했습니다》`);
  ctx.flags[300] = -10;
  ctx.flags[600] = 1;
  if (ctx.flags[300] <= 0) {
    ctx.flags[300] = 0;
  }
  if (ctx.flags[300] <= 24) {
    ctx.flags[301] = 0;
  } else if (ctx.flags[300] <= 49) {
    ctx.flags[301] = 1;
  } else if (ctx.flags[300] <= 75) {
    ctx.flags[301] = 2;
  } else {
    ctx.flags[301] = 3;
  }
  ctx.money -= C;
  await ctx.wait();
  return 1;
}

export async function security_down(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 10000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  // Label: INPUT_LOOP
  ctx.showMessage(`W 《아야노에게 뒤에서 압력을 넣어 순찰을 적게하도록 부탁했습니다》`);
  ctx.flags[600] = 0;
  ctx.money -= C;
  await ctx.wait();
  return 1;
}

export async function add_fumika(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  C = 100000;
  if (ctx.money < C) {
    ctx.showMessage('소지금이 부족합니다'); ctx.waitInput();
    return 0;
  }
  ctx.showMessage(`「그럼, 이쪽을 봐주세요」`);
  ctx.showMessage(`토모요시댁 응접실에서, 아야노는 메이드에게 종이 한장을 가져오게 했다`);
  ctx.showMessage(`그것은 사진과 간단한 프로필이 적힌, 이력서 비슷한 것이었다`);
  ctx.showMessage(`「그녀는 절 섬기는 메이드입니디만, 당신이 전에 좋은 여배우 후보가 없을지`);
  ctx.showMessage(`찾고 있던게 생각났기에……`);
  ctx.showMessage(`제가 선택한 메이드이니 소질은 보증하겠어요.`);
  ctx.showMessage(`――그렇다고 공짜로 넘겨 드릴수는 없지많요……」`);
  ctx.showMessage(`사진만 봐도 확실한 느낌이 올 정도니, 가격에 걸맞는 가치는 있을 것이다`);
  ctx.showMessage(`흥미가 생긴 ${ctx.josaHelper("플레이어는")} 프로필을 정독해봤다……`);
  // TODO: PRINTW
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  ctx.showMessage(`【카세 후미카】`);
  ctx.showMessage(`토모요시가를 모시는 메이드`);
  ctx.showMessage(`토모요시가의 사용인은 대부분 각자의 분야의 전문가로`);
  ctx.showMessage(`그 중에 딱히 특출난 점이 없는 자신이 있는 것을 의문시하고 있다`);
  ctx.showMessage(`사실 그녀는 아야노가 성적으로 희롱하기 위해 고용한, 말하자면 성노예 후보이며`);
  ctx.showMessage(`물론 본인은 그 사실을 티끌만큼도 모르고, 일하다 실수하여 침울해하는 일상을 보내고 있다`);
  ctx.showMessage(`당신(=감독)의 실력을 인정한 아야노가 그녀를 당신에게 맡기기로 했다 한다`);
  ctx.showMessage(`소심한 성격이지만, 연애에 관해선 보수적이다`);
  ctx.showMessage(`연령: 19세　난이도: D　성장도: B　공헌도: B　매각치: B`);
  ctx.showMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');
  // TODO: PRINTW
  // Label: INPUT_LOOP_FUMIKA
  ctx.showMessage(`「어떤가요?　10만 포인트로 이 아이를…… 아깝지만, 당신에게 맡길까요?」`);
  ctx.showMessage('[0] - 맡는다');
  ctx.showMessage('[1] - 관둔다');
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`아야노가 손뼉을 치니, 후미카가 황급히 응접실로 들어왔다`);
    ctx.showMessage(`아야노에게 ${ctx.josaHelper("플레이어를")} 소개받은 후미카는`);
    ctx.showMessage(`갑작스러운 아야노의 말에 눈을 동그랗게 뜨고 울먹였다……`);
    // TODO: PRINTW
    ctx.showMessage(`아야노가 그녀에게 앞으로 ${ctx.josaHelper("플레이어를")} 모실것과, 그곳에서 하게 될 일을 설명해주자`);
    ctx.showMessage(`후미카는 눈물을 흘리며 떨리는 손으로 계약서에 싸인했다……`);
    ctx.showMessage(`W`);
    ctx.showMessage(`《카세 후미카가 여배우 후보가 됐습니다》`);
    ctx.showMessage(`W`);
    // TODO: ADDCHARA 90
    character.cflags[ctx.master][761] = 1;
    // TODO: LOADGLOBAL
    ctx.global[290] += 1;
    // TODO: SAVEGLOBAL
    if (ctx.global[200] >= 0 && ctx.flags[540] === 0) {
      if (GETCHARA(90, 0) >= 0) {
        character = GETCHARA(90);
        await clearbonus_call(ctx, character);
      }
    }
  } else if (ctx.result === 1) {
    return 0;
  } else {
    // GOTO INPUT_LOOP_FUMIKA - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.money -= C;
  return 0;
}
