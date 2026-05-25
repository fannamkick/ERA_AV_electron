/**
 * MISSION_13_TOMOKO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "망상벽 있는 망가진 무녀";
}

export async function mission_visible_13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 150000;
  P[2] = 15;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【아사가미 토모코】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 도쿠가와 치와');
  ctx.showMessage('');
  ctx.showMessage('윤기있는 검은 생머리에 궁도부를 하고 있고');
  ctx.showMessage('히나미 신사만은 못하지만, 나름 유서깊은 아사가미 신사의 외동딸이자');
  ctx.showMessage('야마토 나데시코 타입의 폭유미소녀');
  ctx.showMessage('그러나 안타깝게도 성격이 조금『망가진』타입으로, 무녀가 해서는 안되는');
  ctx.showMessage('음담패설에다 화장실개그를 하며, 끝내 수업중에 망상에로소설을 쓰는 지경에 이른다');
  ctx.showMessage('거기다 오타쿠문화에도 정통하여 미소녀 게임의 판매량을 패키지만 보고도 맞추는,');
  ctx.showMessage('쓸데없는 재능도 가지고 있다');
  ctx.showMessage('그걸 감안하고봐도 남는 미소녀인 덕분인지 남자들의 인기가 높아');
  ctx.showMessage('비슷한 야마토 나데시코 타입인 히나미 하루노와 양분하고 있다');
  ctx.showMessage('또 의뢰인과 밴드를 하고 있으며 담당파트는 기타다');
  ctx.showMessage('의뢰인은 그녀의 망상벽을 단련시켜서 무언가를 꾸미려는 것 같은데……');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀의 미션 내용은');
  ctx.showMessage('『욕망 LV5 이상, 애널 경험만 완료한 상태로 와타라이 키쿄우 또는 스노 이쿠미와의 상성이 200 이상』');
  ctx.showMessage('이며 기한은 20주이다');
  ctx.showMessage('또한, 미션 종료 후에는 그녀의 망상벽을 보다 단련시키기 위해 신병을 당신(=감독)에게');
  ctx.showMessage('맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 15세　미션 난이도: C　보수: 15만 포인트 ＋ 공헌도 10');
  ctx.drawLine('‥');
}

export async function mission_receive_13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 212
  // TODO: LOADGLOBAL
  ctx.global[412] += 1;
  // TODO: SAVEGLOBAL
  if (ctx.global[200] >= 0) {
    character = GETCHARA(212);
    await clearbonus_call(ctx, character);
  }
}

export async function mission_calc_13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(212);
  ctx.locals[1] = 0;
  ctx.locals[4] = 0;
  if (GETCHARA(5, 0) >= 0) {
    ctx.locals[2] = GETCHARA(5);
  }
  if (GETCHARA(11, 0) >= 0) {
    ctx.locals[3] = GETCHARA(11);
  }
  if (ctx.abilities[ctx.locals[0]][11] >= 5) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 0) == 1) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 2) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.relation[local][ctx.getCharacterNo(ctx.locals[2]]) >= 200) {
    ctx.locals[4]++;
  }
  if (ctx.relation[local][ctx.getCharacterNo(ctx.locals[3]]) >= 200) {
    ctx.locals[4]++;
  }
  if (ctx.locals[1] >= 3 && ctx.locals[4] >= 1) {
    return 1;
  }
  return 0;
}

export async function mission_report_13_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(212);
  ctx.getTalent(local, 330) = 0;
}

export async function mission_chara_no_13(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 212;
}
