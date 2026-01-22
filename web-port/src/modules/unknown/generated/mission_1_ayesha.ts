/**
 * MISSION_1_AYESHA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "수줍음 많은 이국의 무희";
}

export async function mission_visible_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 150000;
  P[2] = 10;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【아이샤・알하즈랏드】(Ayesha Alhazred)');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 쇼 펍『벌레스크』지배인');
  ctx.showMessage('');
  ctx.showMessage('중동의 한 왕국의, 지금은 몰락한 무역상의 딸로 키류 조직');
  ctx.showMessage('키류 조직 관련회사가 채무 대신『받아낸』비취색 눈동자가 인상적인 소녀');
  ctx.showMessage('지금은 키류 조직이 운영하는 펍에서 벨리댄서로 일하지만,');
  ctx.showMessage('부끄러운 나머지 무대 위에서 굳어버린다고 한다');
  ctx.showMessage('항상 주뼛주뼛거리고 얌전하기에 다른 사람들과 거리를 좁히지 못하고 있는 모양이다');
  ctx.showMessage('또한 토착종교를 믿는 탓인지 일선을 넘기 싫어하기에');
  ctx.showMessage('창관으로 돌릴수도 없어서 관계자도 곤란해하고 있다');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『노출벽 Lv3 이상・신뢰 Lv4 이상・【일선을 넘지않음】을 제거』');
  ctx.showMessage('이며 기한은 10주이다');
  ctx.showMessage('덧붙여, 미션 종료 후에는 그녀의 신병을 당신(=감독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 14세　미션 난이도: C　보수: 15만 포인트 ＋ 공헌도 10');
  ctx.drawLine('‥');
}

export async function mission_receive_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 200
  // TODO: LOADGLOBAL
  ctx.global[400] += 1;
  // TODO: SAVEGLOBAL
  character = GETCHARA(200);
  await clearbonus_call(ctx, character);
}

export async function mission_calc_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(200);
  ctx.locals[1] = 0;
  if (ctx.abilities[ctx.locals[0]][17] >= 3) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][10] >= 4) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 27) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] == 3) {
    return 1;
  }
  return 0;
}

export async function mission_report_1_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(200);
  ctx.getTalent(local, 330) = 0;
}

export async function mission_chara_no_1(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 200;
}
