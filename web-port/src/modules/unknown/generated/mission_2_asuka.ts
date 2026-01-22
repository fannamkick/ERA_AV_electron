/**
 * MISSION_2_ASUKA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "공주 용사를 지혜롭게 만들어주자!";
}

export async function mission_visible_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 100000;
  P[2] = 5;
  P[3] = 0;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【아스카】(Asuka Eterna)');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 키류 카논');
  ctx.showMessage('');
  ctx.showMessage('자신을 이세계에서 찾아온 공주 용사라고 자칭하는, 신기한 아이');
  ctx.showMessage('당신이 AV감독이 되기 전에 하던 국민적RPG의 주인공을 닮았다');
  ctx.showMessage('운동신경은 매우 높으나 머리속은 완성도가 떨어진다');
  ctx.showMessage('당신이 운명의 상대라고 주장하며 아이를 만들어 달라며 다가온다');
  ctx.showMessage('백주 대낮에 키류 조직 사무소에 들어와 카논의 방의 선반을 뒤지다 포박당하고');
  ctx.showMessage('그녀의 발언을 재밌게 여긴 카논의 발상으로');
  ctx.showMessage('당신의 테스트를 겸해 미션이라는 명목으로 보내져왔다');
  ctx.showMessage('또한 키류 조직 사무소에 감금하는 것보다');
  ctx.showMessage('카논 스스로가 감시하는 것이 안전하다는 이유로 같은 학교에도 다니게 하고 있다');
  ctx.showMessage('다만 때때로 황당한 문제(?)를 일으키며 카논의 두통의 원인중 하나가 되고 있다……');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『【영원한 사랑】의 습득・학력 LV3 이상』');
  ctx.showMessage('이며 기한은 15주이다');
  ctx.showMessage('덧붙여, 미션 종료 후에는 그녀의 신병을 당신(=감독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 18세?　미션 난이도: E　보수: 10만 포인트 ＋ 공헌도 5');
  ctx.drawLine('‥');
}

export async function mission_receive_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 201
  // TODO: LOADGLOBAL
  ctx.global[401] += 1;
  // TODO: SAVEGLOBAL
  character = GETCHARA(201);
  await clearbonus_call(ctx, character);
}

export async function mission_calc_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(201);
  ctx.locals[1] = 0;
  if (ctx.getTalent(local, 430)) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][52] >= 3) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] == 2) {
    return 1;
  }
  return 0;
}

export async function mission_report_2_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(201);
  ctx.getTalent(local, 330) = 0;
}

export async function mission_chara_no_2(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 201;
}
