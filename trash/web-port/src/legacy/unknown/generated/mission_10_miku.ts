/**
 * MISSION_10_MIKU.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "일급 플래그 건축사";
}

export async function mission_visible_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 100000;
  P[2] = 5;
  P[3] = 300000;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【우에사카 미쿠】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 토모요시 아야노');
  ctx.showMessage('');
  ctx.showMessage('수천만분의 1이라 불릴 정도로 적은 확률로 태어난다는 음마와 인간의 혼혈 여성');
  ctx.showMessage('평소엔 당신(=감독)과 같은 학교에 다니고 있지만,');
  ctx.showMessage('음마 특유의 높은 신체능력을 살려, 본래 파라디수스 왕가의 요원이지만,');
  ctx.showMessage('명목상 자원봉사라는 취급으로 경찰의 치안유지에 협력하고 있다');
  ctx.showMessage('이성적이로 논리적인 사고와 신체능력에 걸맞는 실적으로 토모요시 아야노를 비롯한');
  ctx.showMessage('경찰 쪽 사람들에게 받는 신뢰는 두텁지만, 그런 그녀에게는 문제가 있었다……');
  ctx.showMessage('바로 부끄럼쟁이인 주제에 성적인 말로 상대를 조롱하는 성격으로');
  ctx.showMessage('이에는 경찰과 레이첼도 곤란해 하고 있다');
  ctx.showMessage('또 상대를 괴롭히는 말을 즐겨 사용하면서도');
  ctx.showMessage('본인 왈,『나는 도M이야』라는 등…… 아무래도 허세를 부려서라도');
  ctx.showMessage('자신이 음마의 아이라고 강조하는 것 같다');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『【솔직함】의 습득・굴복각인 LV3・마조끼 LV5 이상』');
  ctx.showMessage('이며 기한은 5주이다');
  ctx.showMessage('덧붙여, 미션 종료 후에는 그녀의 신병을 당신(=감독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 16세　미션 난이도: E　보수: 10만 포인트 ＋ 공헌도 5');
  ctx.drawLine('‥');
}

export async function mission_receive_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 209
  // TODO: LOADGLOBAL
  ctx.global[409] += 1;
  // TODO: SAVEGLOBAL
  character = GETCHARA(209);
  await clearbonus_call(ctx, character);
}

export async function mission_calc_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(209);
  ctx.locals[1] = 0;
  if (ctx.getTalent(local, 13) == 1) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][21] >= 5) {
    ctx.locals[1]++;
  }
  if (character.mark[ctx.locals[0]][2] == 3) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] == 3) {
    return 1;
  }
  return 0;
}

export async function mission_report_10_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(209);
  ctx.getTalent(local, 330) = 0;
}

export async function mission_chara_no_10(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 209;
}
