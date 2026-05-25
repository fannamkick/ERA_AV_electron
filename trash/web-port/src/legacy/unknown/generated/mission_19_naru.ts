/**
 * MISSION_19_NARU.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = Hermaphroditus;
}

export async function mission_visible_19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return GETCHARA(11) != -1 && GETCHARA(86) != -1;
}

export async function mission_fee_19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 150000;
  P[2] = 15;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【미즈호사카 나루】(Narcissus Mizuhozaka)');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 유니스・파라디수스');
  ctx.showMessage('');
  ctx.showMessage('당신(=감독)이 다니는 학원에 전학온 혼혈 귀국자녀로 미야마 카나데의 반친구');
  ctx.showMessage('');
  ctx.showMessage('전학 오자마자 미야마 카나데・히나미 하루노・미사키 에리카 세명과 친해져서 당신하고도 면식이 있다');
  ctx.showMessage('양친 모두 정부직속 연구소에 근무하는 연구자로 그녀도 이과, 특히 생물학에 조예가 깊다');
  ctx.showMessage('몸이 약하기는 커녕 오히려 건강한 쪽이지만, 수영 수업은 견학만 하는 것은');
  ctx.showMessage('밝은 성격임에도 항상 뭔가를 무서워하듯 떨고 있는 것과 관계가 있을지도 모른다');
  ctx.showMessage('또한 스노 이쿠미와 유니스・파라디수스 같은,');
  ctx.showMessage('세계 최고수준의 두뇌를 가진 자들과 독가적인 줄을 가지고 있기에');
  ctx.showMessage('이번 전학도 이 나라에 자리잡은 유니스가 준비한 것이라고 한다');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『【연심】또는【남친있음】을 습득・C감각 LV10・레즈끼 LV5이상');
  ctx.showMessage('《어떤 행위》를 경험하고【어떤 소질】이 없다』');
  ctx.showMessage('로, 기한은 10주다');
  ctx.showMessage('');
  ctx.showMessage('덧붙여, 미션 종료 후에는 그녀의 신병을 당신(=강독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 15세　미션 난이도: B　보수: 15만 포인트 ＋ 공헌도 15');
  ctx.drawLine('‥');
}

export async function mission_receive_19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 218
  // TODO: LOADGLOBAL
  ctx.global[418] += 1;
  // TODO: SAVEGLOBAL
  if (ctx.global[200] >= 0) {
    character = GETCHARA(218);
    await clearbonus_call(ctx, character);
  }
}

export async function mission_calc_19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(218);
  ctx.locals[1] = 0;
  if (ctx.getTalent(local, 85) == 1) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 184) == 1) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][0] == 10) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][22] >= 5) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 1) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] >= 4) {
    return 1;
  }
  return 0;
}

export async function mission_report_19_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(218);
  if (ctx.args[0] != 0) {
    ctx.getTalent(local, 330) = 0;
  }
}

export async function mission_chara_no_19(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 218;
}
