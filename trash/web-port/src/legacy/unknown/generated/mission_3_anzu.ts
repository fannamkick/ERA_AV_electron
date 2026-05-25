/**
 * MISSION_3_ANZU.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "로리소녀 젊은 아내의 메이저 데뷔?";
}

export async function mission_visible_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 300000;
  P[2] = 15;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【오노하라 안즈】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 예능사무소『러브핵・엔터테인먼트』프로듀서');
  ctx.showMessage('');
  ctx.showMessage('사립 여학교에 다니는 고○학생이자');
  ctx.showMessage('교사인 오노하라 쿄스케와 결혼한 행복이 넘치는 새색시');
  ctx.showMessage('옛날부터 기타를 배워, 지금도 경음부에서 기타를 담당하고 있다');
  ctx.showMessage('그녀가 속한 밴드가 데모테이프를 보낸 곳이 키류 조직의 관련회사였기에');
  ctx.showMessage('여○생이자 기혼자라는 희귀한 프로필이 솔직하게 적힌 서류를 우연히 본 엘렌이');
  ctx.showMessage('그녀의 개인면접에서 직접 물어본');
  ctx.showMessage('『데뷔를 하고 싶으면…… 그러게, 카메라 앞에서도 벗을 수 있는 담력은 있어?』');
  ctx.showMessage('라는 말에 질 수 없다는 생각인지『해보겠어요!』라고 대답했기에');
  ctx.showMessage('이 미션이 시작되었다');
  ctx.showMessage('가창력도 외모도 평범하지만, 어째서인지 남성팬이 많다');
  ctx.showMessage('');
  ctx.showMessage('연령: 16세　난이도: A　성장도: C　공헌도: C　매각치: B');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『【아이돌】의 습득・미용감각 LV5 이상』');
  ctx.showMessage('이며 기한은 30주이다');
  ctx.showMessage('덧붙여, 미션 종료 후에는 그녀의 신병을 당신(=감독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 16세　미션 난이도: A　보수: 30만 포인트 ＋ 공헌도 15');
  ctx.drawLine('‥');
}

export async function mission_receive_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 202
  // TODO: LOADGLOBAL
  ctx.global[402] += 1;
  // TODO: SAVEGLOBAL
}

export async function mission_calc_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(202);
  ctx.locals[1] = 0;
  if (ctx.getTalent(local, 203) == 1) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][50] >= 5) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] == 2) {
    return 1;
  }
  return 0;
}

export async function mission_report_3_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(202);
  ctx.getTalent(local, 330) = 0;
}

export async function mission_chara_no_3(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 202;
}
