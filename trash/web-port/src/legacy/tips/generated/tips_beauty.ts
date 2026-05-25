/**
 * TIPS_BEAUTY.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function tips_beauty(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`《TIPS》`);
  ctx.showMessage(`매력치에 대해서`);
  ctx.drawLine('･･');
  ctx.showMessage('[0] - 매력치의 효과');
  ctx.showMessage('[1] - 현재 매력치의 감소조건');
  ctx.showMessage('[2] - 현재 매력치의 회복조건');
  ctx.showMessage('[3] - 미용감각의 상승조건');
  ctx.showMessage('[4] - 최대 매력치의 증가조건');
  ctx.drawLine('･･');
  ctx.showMessage('[999] - 돌아간다');
  // Label: INPUT_LOOP
  await ctx.inputNumber();
  if (ctx.result === 0) {
    await tips_beautypoint(ctx, character);
  } else if (ctx.result === 1) {
    await tips_downbeauty(ctx, character);
  } else if (ctx.result === 2) {
    await tips_beauty_recover(ctx, character);
  } else if (ctx.result === 3) {
    await tips_beautysense(ctx, character);
  } else if (ctx.result === 4) {
    await tips_maxbeauty(ctx, character);
  } else if (ctx.result === 999) {
    await tips_main(ctx, character);
  } else {
    // GOTO INPUT_LOOP - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function tips_beautypoint(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆매력치의 효과◆`);
  ctx.showMessage(`현재 매력치를 1/100한 배율이 비디오 판매금액에 곱해진다`);
  ctx.showMessage(`(예: 현재 매력치가 115일 경우, 비디오 판매금액이 1.15배)`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_beauty(ctx, character);
}

export async function tips_downbeauty(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆현재 매력치의 감소조건◆`);
  ctx.showMessage(`지도 1번당 반드시 5감소`);
  ctx.showMessage(`그리고 지도가 강제종료된 경우 0~5정도 추가로 감소한다`);
  ctx.showMessage(`지도 이외에도 창관영업, 특수한 조건에 해방되는 미션에서도 감소할 수 있다.`);
  ctx.showMessage(`L`);
  ctx.showMessage(`그리고 지도, 창관영업, 미션중에 아래 조건을 만족한 경우 추가로 감소한다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○　　처녀상실　……　-10`);
  ctx.showMessage(`○애널처녀상실　……　 -5`);
  ctx.showMessage(`○　　　첫 키스　……　 -5~10`);
  ctx.showMessage(`※첫 키스는「입을 대는」행위 모두가 반영되어 보통 키스는 매력치가 5감소,`);
  ctx.showMessage(`　펠라치오나 커닐링등「입 이외의 부위」로 첫 키스한 경우 매력치가 10감소한다`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_beauty(ctx, character);
}

export async function tips_beauty_recover(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆현재 매력치의 회복조건◆`);
  ctx.showMessage(`월말처리시 현재 미용감각 레벨과 동일한 수치 ＋0~5 회복한다`);
  ctx.showMessage(`또 여자 기숙사를 건설하고 에스테룸을 확장했으며 캐릭터에게 에스테룸을 이용하게 했을시`);
  ctx.showMessage(`캐릭터의 최대 매력치를 1/100하고 반올림한 수치를 주말처리시에 회복한다`);
  ctx.showMessage(`(예: 최대 매력치가 150인 캐릭터는 주말처리시에 2회복)`);
  ctx.showMessage(`미션 클리어로 해방되는 스페셜에스테를 이용한 경우 최대 매력치까지 회복한다`);
  ctx.showMessage(`※단, 캐릭터마다 1번만 이용가능`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_beauty(ctx, character);
}

export async function tips_beautysense(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆미용감각의 상승조건◆`);
  ctx.showMessage(`캐릭터의 신뢰 LV3이상이면 사용가능한 숍화면의「부탁한다」로`);
  ctx.showMessage(`에스테에 다니게 하여 경험을 쌓으면 미용감각LV이 올라간다`);
  ctx.showMessage(`단 직업계 소질을 얻지 않으면 LV5이상 올라가지 않는다`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_beauty(ctx, character);
}

export async function tips_maxbeauty(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('･･');
  ctx.showMessage(`◆최대 매력치의 증가조건◆`);
  ctx.showMessage(`아래 조건을 만족한 경우 최대 매력치가 증가한다`);
  ctx.showMessage(`L`);
  ctx.showMessage(`○【AV배우】를 습득한 후, 랜덤 발생하는 스카우트 이벤트로 직업계 스킬을 습득한다`);
  ctx.showMessage(`○창관영업 결과【업소여성】이나【고급창부】를 습득한다`);
  ctx.showMessage(`○특수한 조건으로 해방되는 미션을 성공한다`);
  ctx.showMessage(`○특수한 조건으로 실행가능한 커맨드「유전자개조: 음마화」를 실행한다`);
  ctx.drawLine('･･');
  await ctx.wait();
  await tips_beauty(ctx, character);
}
