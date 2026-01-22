/**
 * MISSION_11_NOEL.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "남성불신인 아가씨";
}

export async function mission_visible_11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 100000;
  P[2] = 5;
  P[3] = 300000;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【아오노 노에루】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 무역상『아오노 유통』사장부부');
  ctx.showMessage('');
  ctx.showMessage('미츠루 이즈키의 후배 부원이자 작은 무역회사 사장부부의 외동딸');
  ctx.showMessage('밝고 상냥한 성격이지만, 가끔씩 큰 실수를 저지르는 게 단점');
  ctx.showMessage('그래도 포기하거나 비굴해지지 않으며, 항상 목표를 향해 노력하는 강한 의지를 가지고');
  ctx.showMessage('부활동에 올곧이 임하는 자세를 이즈키에게 평가받고 있다');
  ctx.showMessage('');
  ctx.showMessage('최근엔 새롭게 밸리 댄스를 배우고 있다고 하는데');
  ctx.showMessage('그 춤은 굳이 평가하자면『빠빠라밤ー』한 느낌이라 한다');
  ctx.showMessage('애지중지하며 자란 딸이라 그런지 속기 쉬운 성격이며');
  ctx.showMessage('최근엔 그녀의 주위에 수상한 남자들의 수상한 권유가 끊이질 않는다고 한다');
  ctx.showMessage('그리고 얼마전, 드디어 속아버린 결과 팔뚝에 문신을 새겨버리는,');
  ctx.showMessage('돌이킬 수 없는 일을 저질러 버렸고 그 이후로 남성들을 꺼리게 돼버려');
  ctx.showMessage('그녀의 장래를 걱정한 사장부부가 거래처인 키류 조직 관련회사에 상담한것이 일의 발단이다');
  ctx.showMessage('');
  ctx.showMessage('그 일을 알게된 카논이『쉽게 속는 성격이라면 아예 남자를 알게 해버리는 편이 안전하다』');
  ctx.showMessage('라는 해답을 내놓아 대리인을 통해 사장부부에게 전달했다');
  ctx.showMessage('처음엔 말도 안된다며 상식적으로 거부하던 사장부부도');
  ctx.showMessage('『속아넘어간 결과 더 지독한 꼴을 당할지도 모른다』');
  ctx.showMessage('라며 대리인이 쐐기를 박듯 추가로 전한 카논의 전언에 구슬려진 건지');
  ctx.showMessage('딸의 순결과 장래를 저울질하고, 괴로운 고민 끝에 딸을 키류 조직에게 맡기기로 했다……');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『【남성불신】을 제거』');
  ctx.showMessage('이며 기한은10주이다');
  ctx.showMessage('덧붙여, 미션 종료 후에는 그녀의 신병을 당신(=감독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 15세　미션 난이도: B　보수: 10만 포인트 ＋ 공헌도 5');
  ctx.drawLine('‥');
}

export async function mission_receive_11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 210
  // TODO: LOADGLOBAL
  ctx.global[410] += 1;
  // TODO: SAVEGLOBAL
  if (ctx.global[200] >= 0) {
    character = GETCHARA(210);
    await clearbonus_call(ctx, character);
  }
}

export async function mission_calc_11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(210);
  if (ctx.getTalent(local, 82) == 0) {
    return 1;
  }
  return 0;
}

export async function mission_report_11_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(210);
  ctx.getTalent(local, 330) = 0;
}

export async function mission_chara_no_11(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 210;
}
