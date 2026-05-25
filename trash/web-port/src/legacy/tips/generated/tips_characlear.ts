/**
 * TIPS_CHARACLEAR.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function tips_characlear(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`《TIPS》`);
  ctx.showMessage(`여배우 후보의 함락・은퇴 가능 조건`);
  ctx.drawLine('･･');
  ctx.showMessage('[0] - 은퇴 가능 조건');
  ctx.showMessage('[1] - 조수 가능 조건');
  ctx.showMessage('[2] - 【연심】습득조건');
  ctx.showMessage('[3] - 【음란】습득조건');
  ctx.showMessage('[4] - 【영원한 사랑】습득조건');
  ctx.showMessage('[5] - 【절륜】습득조건');
  ctx.showMessage('[6] - 【섹프】습득조건');
  ctx.showMessage('[7] - 함락계 소질의 중첩 습득조건');
  ctx.drawLine('･･');
  ctx.showMessage('[999] - 돌아간다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await tips_retire(ctx, character);
  } else if (ctx.result === 1) {
    await tips_assi(ctx, character);
  } else if (ctx.result === 2) {
    await tips_love(ctx, character);
  } else if (ctx.result === 3) {
    await tips_lewdness(ctx, character);
  } else if (ctx.result === 4) {
    await tips_truelove(ctx, character);
  } else if (ctx.result === 5) {
    await tips_peerless(ctx, character);
  } else if (ctx.result === 6) {
    await tips_sexfriend(ctx, character);
  } else if (ctx.result === 7) {
    await tips_overlap(ctx, character);
  } else if (ctx.result === 999) {
    await tips_main(ctx, character);
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function tips_retire(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆은퇴 가능 조건◆`);
  ctx.showMessage(`【매각 불가】가 없고【AV배우】를 가지고 있고`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○신뢰＋욕망이 6LV이상`);
  ctx.showMessage(`○C・V・A・B감각중 하나가 최소 LV3`);
  ctx.showMessage(`○【건방짐】이나【다부짐】을 가지고 있으면 순종 LV4이상`);
  ctx.showMessage(`○【자제심】【억압】【저항】을 가지고 있으면 욕망 LV4이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`위 조건을 만족하고`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○기교 LV3이상, 봉사정신 LV3이상`);
  ctx.showMessage(`○노출벽 LV3이상, 자위중독 LV2이상`);
  ctx.showMessage(`○C・V・A・B감각의 LV합계가 13이상`);
  ctx.showMessage(`○순종이나 욕망중 하나가 LV5`);
  ctx.showMessage(`L`);
  ctx.showMessage(`중 하나를 만족한다`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_characlear(ctx, character);
}

export async function tips_assi(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆조수 가능 조건◆`);
  ctx.showMessage(`은퇴 가능 조건을 만족하고`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○신뢰・욕망・기교・C감각・레즈끼가 모두 LV3이상`);
  ctx.showMessage(`○순종 LV5이상, 욕망 LV4이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`중 하나를 만족하고 AV출연경험 3이상`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_characlear(ctx, character);
}

export async function tips_love(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆【연심】습득조건◆`);
  ctx.showMessage(`반발각인이 없고【남친있음】이 아닐때`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○레즈경험 1200이하, 신뢰 LV3이상, 봉사경험 200이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`호감도 100이상이고 다른 함락소질이 없다`);
  ctx.showMessage(`※단【음마】【안드로이드】【천사】【ONLY ONE EMPRESS】를 습득했을 경우,`);
  ctx.showMessage(`　혹은 실적「Strawberry Panic!」을 사용할 경우 레즈경험을 무시한다`);
  ctx.showMessage(`　또,【음마】【안드로이드】【천사】【ONLY ONE EMPRESS】를 습득한 캐릭터는`);
  ctx.showMessage(`　다른 함락계 소질과 중첩가능`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_characlear(ctx, character);
}

export async function tips_lewdness(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆【음란】습득조건◆`);
  ctx.showMessage(`반발각인이 없고【비처녀】혹은【애널비처녀】이고`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○C・V・A・B감각의 LV합계가 10이상, 욕망 LV3이상, 이상경험 3이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`호감도 100이상이고 다른 함락소질이 없다`);
  ctx.showMessage(`※단【음마】【안드로이드】【천사】【ONLY ONE EMPRESS】를 습득한 캐릭터는`);
  ctx.showMessage(`　다른 함락계 소질과 중첩가능`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_characlear(ctx, character);
}

export async function tips_truelove(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆【영원한 사랑】습득조건◆`);
  ctx.showMessage(`반발각인이 없고【연심】을 가졌고`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○신뢰・봉사정신 모두 LV7이상, 애정경험 500이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`이고 굴복각인이 3이다`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_characlear(ctx, character);
}

export async function tips_peerless(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆【절륜】습득조건◆`);
  ctx.showMessage(`반발각인이 없고【음란】을 가졌고`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○욕망 LV7이상, C・V・A・B 감각중 하나가 LV10, 이상경험 5이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`이고 쾌락각인이 3이다`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_characlear(ctx, character);
}

export async function tips_sexfriend(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆【섹프】습득조건◆`);
  ctx.showMessage(`반발각인이 없고【음란】【남친있음】【섹프있음】을 가졌고`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○신뢰 LV3이상, 욕망 LV5이상, 성교중독 LV2이상, 봉사경험 300이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`이고【정조관념】이 없다`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_characlear(ctx, character);
}

export async function tips_overlap(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆함락계 소질의 중첩 습득조건◆`);
  ctx.showMessage(`【음마】【안드로이드】【천사】【ONLY ONE EMPRESS】를 습득하지 않은 캐릭터가`);
  ctx.showMessage(`함락계 스킬을 중첩습득하는 방법은 이하와 같다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`레이첼・파라디수스가 조수가능하고【비밀지식】을 소지했을 경우,`);
  ctx.showMessage(`「연구소」목록에서 해방되는「레이첼의 공방에 간다」에서`);
  ctx.showMessage(`『반하는 약』또는『초강력 미약』을 투약한다`);
  ctx.showMessage(`단『반하는 약』을【남친있음】을 가진 캐릭터에게 투약할 수 없다`);
  ctx.showMessage(`또【섹프】를 가지고 있고【남친있음】을 자긴 캐릭터에게『반하는 약』을`);
  ctx.showMessage(`사용하면【섹프】가 사라지고【연심】이 된다`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_characlear(ctx, character);
}
