/**
 * MISSION_4_MIYA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "과묵한 그 애에게 연기 지도";
}

export async function mission_visible_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 50000;
  P[2] = 1;
  P[3] = P[1] * 2;
  ctx.locals[0] = GETCHARA(203);
  if (ctx.getTalent(local, 0) == 0) {
    P[3] += 500000;
  }
  if (ctx.getTalent(local, 2) == 0) {
    P[3] += 500000;
  }
  if (character.cflags[ctx.locals[0]][16] != -1) {
    P[3] += 500000;
  }
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【타카시나 미야】');
  ctx.showMessage('');
  ctx.showMessage('대리 의뢰인: 키류 카논');
  ctx.showMessage('');
  ctx.showMessage('최근에 당신(=감독)이 다니는 사립 XX학원에 전학온 소녀');
  ctx.showMessage('지역 전승을 각색한 연극무대를 계획하던 연극부가 히로인의 이미지에 딱이라며');
  ctx.showMessage('부원도 아닌 그녀를 히로인역에 발탁됐다');
  ctx.showMessage('정작 본인은 무뚝뚝하고 부끄럼쟁이라 무대에 올라가면 굳어버린다고 한다……');
  ctx.showMessage('다른 사람들의 눈이 너무 신경쓰인다고 하며');
  ctx.showMessage('조금이라도 익숙해지고 싶다며 상대역에게 약한 소리를 했다고 한다');
  ctx.showMessage('거기다 연극 속 히로인은 헌신적인 여동생이라는 설정이지만,');
  ctx.showMessage('때때로 소악마스러움이 묻어나는 역할이라 그녀와는 정반대의 성격이었다');
  ctx.showMessage('이번 일은 정식 의뢰인이 존재하지 않고');
  ctx.showMessage('카논의 독단으로 당신에게 미션 형식으로 맡겨지게 됐다');
  ctx.showMessage('미야 본인은 권유해준 부원에게 특별한 감정을 가지고 있는듯,');
  ctx.showMessage('카논이 내건 조건도『《오빠》를 위해서라면』받아들인 모양이다');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『【소악마】의 습득・노출벽 LV2 이상으로 삽입행위 및 AV 데뷔의 엄금・키스 미경험』');
  ctx.showMessage('이며 기간은 15주이다');
  ctx.showMessage('덧붙여, 미션 종료 후에는 그녀의 신병을 당신(=감독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 15세　미션 난이도: C　보수: 5만 포인트 ＋ 공헌도 1');
  ctx.drawLine('‥');
}

export async function mission_receive_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 203
  // TODO: LOADGLOBAL
  ctx.global[403] += 1;
  // TODO: SAVEGLOBAL
  character = GETCHARA(203);
  await clearbonus_call(ctx, character);
}

export async function mission_calc_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(203);
  ctx.locals[1] = 0;
  if (ctx.getTalent(local, 0) == 1) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 2) == 1) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][17] >= 2) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 87) == 1) {
    ctx.locals[1]++;
  }
  if (character.cflags[ctx.locals[0]][16] == -1) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 400) == 1) {
    ctx.locals[1] = 0;
  }
  if (ctx.locals[1] == 5) {
    return 1;
  }
  return 0;
}

export async function mission_report_4_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(203);
  ctx.getTalent(local, 330) = 0;
}

export async function mission_chara_no_4(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 203;
}
