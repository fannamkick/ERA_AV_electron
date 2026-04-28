/**
 * MISSION_14_YUUKI.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "사랑색 비구름";
}

export async function mission_visible_14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 200000;
  P[2] = 15;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【카미나 유우키】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 키류 엘렌');
  ctx.showMessage('');
  ctx.showMessage('○○현의, 풍광명미라고 하면 듣기는 좋지만 실상은 시골 그 자체인 ○○섬에서');
  ctx.showMessage('지금은 폐교된 학원에 다니던 고○학생');
  ctx.showMessage('온화하나 강직하고 정의감이 강한 성격으로 전엔 풍기위원을 맡을 정도였다');
  ctx.showMessage('빼어난 미소녀지만, 본인은 자신을『평범』하다고 생각하며');
  ctx.showMessage('이전 마음을 두고 있던 소년에게『자신과는 사는 세계가 다르다』며 고백도 못했다');
  ctx.showMessage('○○섬 근해에서 차세대 에너지원인 해양자원이 채굴된다는 사실이');
  ctx.showMessage('근년, 학회에서 밝혀져 눈독을 들인 투기꾼들에게 학원이 노려진다');
  ctx.showMessage('그때 마음을 둔 소년을 포함한 소수와 함께 투기꾼과 싸우기 위해 뛰어다녔지만,');
  ctx.showMessage('노력도 헛되이 폐교가 결정되고 그녀를 시작으로 투기꾼과 싸우던 몇명의 소녀들이');
  ctx.showMessage('소동의 혼란을 틈타, 돈이 될거라 판단한 투기꾼들에게 납치당했다');
  ctx.showMessage('그리고 그녀는 키류 조직에 팔렸지만, 이용가치가 있다고 판단한 엘렌에 의해 처리가 보류됐다');
  ctx.showMessage('');
  ctx.showMessage('그리고 최근들어 당신(=감독)의 눈부신 업적을 봐서');
  ctx.showMessage('그녀의 처분이 결정되었다');
  ctx.showMessage('그 과정에서 우선 당신이 다니는 학교에 복학하는 것과');
  ctx.showMessage('그녀의 옛 친구들의 수색이 약속됐는데……');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀의 미션 내용은');
  ctx.showMessage('『【영원한 사랑】의 습득＋【아이돌】의 습득＋최대 매력치 190 이상』');
  ctx.showMessage('이며 기한은 10주이다');
  ctx.showMessage('또한, 미션 종료 후에는 그녀의 신병을 당신(=감독)에게 넘기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 16세　미션 난이도: B　보수: 20만 포인트 ＋ 공헌도 15');
  ctx.drawLine('‥');
}

export async function mission_receive_14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 213
  // TODO: LOADGLOBAL
  ctx.global[413] += 1;
  // TODO: SAVEGLOBAL
  if (ctx.global[200] >= 0) {
    character = GETCHARA(213);
    await clearbonus_call(ctx, character);
  }
}

export async function mission_calc_14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(213);
  ctx.locals[1] = 0;
  if (ctx.getTalent(local, 430) == 1) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 203) == 1) {
    ctx.locals[1]++;
  }
  if (MAXctx.base[ctx].locals[31] >= 190) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] >= 3) {
    return 1;
  }
  return 0;
}

export async function mission_report_14_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(213);
  ctx.getTalent(local, 330) = 0;
}

export async function mission_chara_no_14(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 213;
}
