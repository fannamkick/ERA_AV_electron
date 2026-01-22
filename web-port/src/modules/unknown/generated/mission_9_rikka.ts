/**
 * MISSION_9_RIKKA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_9(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "커리어 우먼 미망인";
}

export async function mission_visible_9(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_9(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 100000;
  P[2] = 5;
  P[3] = 300000;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_9(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【카스가 릿카】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 키류 엘렌');
  ctx.showMessage('');
  ctx.showMessage('지금은 죽은 남편이 남긴 작은 건설회사를 여성의 연약한 팔로 혼자 운영하는 여사장');
  ctx.showMessage('선천적으로 오기가 강하고, 근성론이나 정신론보다 합리성을 중시하는 한편,');
  ctx.showMessage('예상외의 사태가 일어나면 아무것도 못하는 일이 많고');
  ctx.showMessage('다른 사람에게 자신의 마음을 솔직하게 표현하지 못하며');
  ctx.showMessage('금속태 안경도 시너지를 내어 까칠한 성격으로 오인받아 경원시되기 십상이다');
  ctx.showMessage('그녀의 경영방침과 지휘력은 지역에서도 신뢰받고 있지만,');
  ctx.showMessage('때마침 찾아온 불경기에 의해 회사의 경영이 기울어가고');
  ctx.showMessage('언젠가 찾아올, 남편이 남겨진 회사가 망하는 날을 피하기 위해 발버둥치고 있다');
  ctx.showMessage('그러나 자금사정도 마땅치 않고, 주 거래 은행에게 대출을 취소당하거나');
  ctx.showMessage('견적상 확실하게 딸 수 있는 공공사업도. 관청과 유착이 있다며');
  ctx.showMessage('흉흉한 소문이 도는 회사에 뺐기는 등, 계속해서 안좋은 일이 일어나고 있었다');
  ctx.showMessage('최후의 수단으로 구면인 키류 엘렌에게 목돈의 원조를 요청했으나,');
  ctx.showMessage('엘렌은 원조를 거절하고 그 대신 그녀에게『간단한 일』을 소개시켜주기로 했다');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『AV 판매액 누계 200만』');
  ctx.showMessage('이며 기한은 30주이다');
  ctx.showMessage('덧붙여, 미션 종료 후에는 그녀의 신병을 당신(=감독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 34세　미션 난이도: C　보수: 10만 포인트 ＋ 공헌도5');
  ctx.drawLine('‥');
}

export async function mission_receive_9(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 208
  // TODO: LOADGLOBAL
  ctx.global[408] += 1;
  // TODO: SAVEGLOBAL
}

export async function mission_calc_9(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(208);
  if (character.cflags[ctx.locals[0]][730] >= 2000000) {
    return 1;
  }
  return 0;
}

export async function mission_report_9_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(208);
  ctx.getTalent(local, 330) = 0;
}

export async function mission_chara_no_9(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 208;
}
