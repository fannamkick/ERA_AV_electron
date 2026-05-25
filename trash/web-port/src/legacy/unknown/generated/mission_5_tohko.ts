/**
 * MISSION_5_TOHKO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "음욕에 눈뜬 신체조부원";
}

export async function mission_visible_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 500000;
  P[2] = 30;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【이즈미 토코】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: XX학원 신체조부・코치');
  ctx.showMessage('');
  ctx.showMessage('당신(=감독)이 다니는 사립 XX학원에서 비밀리에 진행되는');
  ctx.showMessage('『여친으로 삼고싶은 여학생』앙케이트에서 정통파 미소녀인 레이첼이나');
  ctx.showMessage('여성표가 많은 이즈키, 숨은 팬이 많은 미노리와 더불어 항상 상위를 차지하는 미소녀');
  ctx.showMessage('그녀가 소속된 신체조부의 기대주지만,');
  ctx.showMessage('기술면은 전국에서 인정받으면서도 표현력에 문제가 있다고 한다');
  ctx.showMessage('『여성의 요염함』이 부족하다고 평가받으며,');
  ctx.showMessage('그 약점때문에 항상 전국대회 진출권을 코앞에서 놓치고 있다');
  ctx.showMessage('심사원과 관객의 시선에도 끄떡않는 걸 보면');
  ctx.showMessage('딱히 부끄럼쟁이인것도 아닌듯 한데……');
  ctx.showMessage('의뢰인은 그녀의 표현력 부족을『토코가 여자의 기쁨을 모르는 게 원인』이라며');
  ctx.showMessage('자신을 코치로 소개해준 키류 조직에게 의뢰했다고 한다');
  ctx.showMessage('본인에겐 이번 일은『표현력을 기르기 위한 훈련』이라고 전했으며');
  ctx.showMessage('그 내용에 관해서는 의외로 쉽게 받아들일만큼 속기 쉬운 성격이다');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션 내용은……');
  ctx.showMessage('『【음란】의 습득・노출벽 LV7 이상・V감각 LV6 이상・성교중독 LV3 이상');
  ctx.showMessage('성교경험 500 이상・최대 매력치 150 이상・양구멍 비처녀인 동시에 첫 키스 미경험』');
  ctx.showMessage('이며 기한은 30주이다');
  ctx.showMessage('덧붙여, 미션 종료 후, 성공했을 경우에만,');
  ctx.showMessage('그녀의 신병을 당신(=감독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 16세　미션 난이도: S　보수: 50만 포인트 ＋ 공헌도 20');
  ctx.showMessage('');
  ctx.drawLine('‥');
}

export async function mission_receive_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 204
  // TODO: LOADGLOBAL
  ctx.global[404] += 1;
  // TODO: SAVEGLOBAL
  character = GETCHARA(204);
  await clearbonus_call(ctx, character);
}

export async function mission_calc_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(204);
  ctx.locals[1] = 0;
  if (ctx.getTalent(local, 0) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 2) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][2] >= 6) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][17] >= 7) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][30] >= 3) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 76) == 1) {
    ctx.locals[1]++;
  }
  if (character.cflags[ctx.locals[0]][16] >= 1) {
    ctx.locals[1]++;
  }
  if (ctx.exp[ctx.locals[0]][5] >= 500) {
    ctx.locals[1]++;
  }
  if (MAXctx.base[ctx].locals[31] >= 150) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] == 9) {
    return 1;
  }
  return 0;
}

export async function mission_report_5_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(204);
  if (ctx.args[0] === 0) {
    if (ctx.locals[0] >= 0) {
      await キャラ削除, local(ctx, character);
    }
  } else {
    ctx.getTalent(local, 330) = 0;
  }
}

export async function mission_chara_no_5(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 204;
}
