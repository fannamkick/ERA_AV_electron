/**
 * TIPS_TALENT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function tips_talent(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`《TIPS》`);
  ctx.showMessage(`특수한 소질의 획득 방법`);
  ctx.drawLine('･･');
  ctx.showMessage('[0] - 감각 강화 소질');
  ctx.showMessage('[1] - 감각 강화 종료 소질');
  ctx.showMessage('[2] - 도착계 소질');
  ctx.showMessage('[3] - 그 외의 소질');
  ctx.drawLine('･･');
  ctx.showMessage('[999] - 돌아간다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await tips_talent_cvab(ctx, character);
  } else if (ctx.result === 1) {
    await tips_talent_cvab_end(ctx, character);
  } else if (ctx.result === 2) {
    await tips_talent_sm(ctx, character);
  } else if (ctx.result === 3) {
    await tips_talent_others(ctx, character);
  } else if (ctx.result === 999) {
    await tips_main(ctx, character);
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function tips_talent_cvab(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆감각 강화 소질◆`);
  ctx.showMessage(`보통 LV5까지만 상승하는 C・V・A・B감각의 상한을 LV10까지 해방한다`);
  ctx.showMessage(`각 감각강화소질 습득방법은 이하`);
  ctx.showMessage(`L`);
  ctx.showMessage(`C감각 강화 소질:【자위광】`);
  ctx.showMessage(`C감각이 LV4이상이고 자위경험이 100이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`B감각 강화 소질:【가슴광】`);
  ctx.showMessage(`B감각이 LV4이상이고 B개발경험이 150이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`V감각 강화 소질:【섹스광】`);
  ctx.showMessage(`V감각이 LV4이상이고 V경험이 150이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`A감각 강화 소질:【애널광】`);
  ctx.showMessage(`A감각이 LV4이상이고 A쾌락경험이 300이상`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_talent(ctx, character);
}

export async function tips_talent_cvab_end(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆감각 강화 종료 소질◆`);
  ctx.showMessage(`감각 강화 소질과【절륜】또는【음마】를 습득했고 각종 감각을 LV10까지 올리면 습득가능`);
  ctx.showMessage(`각 감각 강화 종료 소질은 이하`);
  ctx.showMessage(`L`);
  ctx.showMessage(`C감각 강화 종료 소질:【음핵】`);
  ctx.showMessage(`B감각 강화 종료 소질:【음유】`);
  ctx.showMessage(`V감각 강화 종료 소질:【음호】`);
  ctx.showMessage(`A감각 강화 종료 소질:【음항】`);
  ctx.showMessage(`L`);
  ctx.showMessage(`감각 강화 종료 소질 모두를 습득하면【성호】를 습득하고 각 감각이【○민감】으로 변화한다`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_talent(ctx, character);
}

export async function tips_talent_sm(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆도착계 소질◆`);
  ctx.showMessage(`보통 LV5까지만 상승하는 각 능력의 상한을 LV10까지 해방한다`);
  ctx.showMessage(`각 도착계 소질 습득조건은 이하`);
  ctx.showMessage(`L`);
  ctx.showMessage(`【새드】: 새드끼 LV4이상, 가학쾌락경험 300이상`);
  ctx.showMessage(`【마조】: 마조끼 LV4이상, 피학쾌락경험 300이상`);
  ctx.showMessage(`L`);
  ctx.showMessage(`도착계 소질은【음마】【천사】중 하나를 습득하지 않았을 경우, 한쪽만 습득가능`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_talent(ctx, character);
}

export async function tips_talent_others(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆그 외의 소질◆`);
  ctx.showMessage(`그 외에 특정 조건을 만족했을 경우, 이하의 소질을 얻을 수 있다.`);
  ctx.showMessage(`L`);
  ctx.showMessage(`　　　【바이】: 레즈끼 LV4이상, 레즈중독 LV3이상, 호감도 150이상, 레즈경험 2000이상`);
  ctx.showMessage(`　　【노출광】: 노출벽 LV4이상, 야외노출경험 100이상, 자위경험 200이상`);
  ctx.showMessage(`　  【갸루계】:【영향받기 쉬움】을 습득한 캐릭터가`);
  ctx.showMessage(`　　　　　　　　【갸루계】를 습득한 캐릭터와 상성이 120이상일 경우, 랜덤으로 습득`);
  ctx.showMessage(`　【남친있음】: 주말처리시에 랜덤으로 가산되는 수치가 캐릭터마다 정해진 달성치를 넘어섰을때,`);
  ctx.showMessage(`　　　　　　　　혹은 미팅에 참가시키는 것으로 랜덤하게 습득`);
  ctx.showMessage(`  【섹프있음】:【갸루계】를 습득하고 있고,【정조관념】【일선을 넘지않음】이 없다`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_talent(ctx, character);
}
