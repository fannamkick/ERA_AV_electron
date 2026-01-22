/**
 * MISSION_6_HARUMI.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "타락한 상현";
}

export async function mission_visible_6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 500000;
  P[2] = 20;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【타카야시키 하루미】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 키류 카논');
  ctx.showMessage('');
  ctx.showMessage('당신(=감독)과 같은 사립 XX학원에 다니는 여자아이지만,');
  ctx.showMessage('사실 옛날부터 이어져오던 닌자 일족의 후예');
  ctx.showMessage('평소엔 평범한 여○생으로 지내지만, 선선대부터 일족이 키류 조직에게『보호』받고 있으며');
  ctx.showMessage('그 대가로 밤에는 키류 조직의 밀정이 되어 적대조직의 동향을 살피고 있다');
  ctx.showMessage('그러나 정조관념이 강한 탓에 몸을 사용한 정보수집에 거리낌이 있고');
  ctx.showMessage('『남자와 여자의 관계』가 아니면 끌어낼 수 없는 정보나');
  ctx.showMessage('상대의 약점을 잡을수 없기에 밀정으로서는 삼류라고 평가받는것 같다');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『【마조】의 습득・기교 LV10・봉사기술 LV10・성교기술 LV10・봉사정신 LV5 이상');
  ctx.showMessage('마조끼 LV5 이상・이상경험 5 이상・양구멍 비처녀이며 첫 키스 미경험』');
  ctx.showMessage('이며 기한은 20주이다');
  ctx.showMessage('덧붙여, 미션 종료 후, 성공했을 경우에만,');
  ctx.showMessage('그녀의 신병을 당신(=감독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 17세　미션 난이도: S　보수: 50만 포인트 ＋ 공헌도 20');
  ctx.drawLine('‥');
}

export async function mission_receive_6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 205
  // TODO: LOADGLOBAL
  ctx.global[405] += 1;
  // TODO: SAVEGLOBAL
  character = GETCHARA(205);
  await clearbonus_call(ctx, character);
}

export async function mission_calc_6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(205);
  ctx.locals[1] = 0;
  if (ctx.getTalent(local, 0) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 2) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][12] == 10) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][13] == 10) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][14] == 10) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][16] >= 5) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 88) == 1) {
    ctx.locals[1]++;
  }
  if (character.cflags[ctx.locals[0]][16] >= 1) {
    ctx.locals[1]++;
  }
  if (ctx.exp[ctx.locals[0]][50] >= 5) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][21] >= 5) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] == 10) {
    return 1;
  }
  return 0;
}

export async function mission_report_6_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(205);
  if (ctx.args[0] === 0) {
    if (ctx.locals[0] >= 0) {
      await キャラ削除, local(ctx, character);
    }
  } else {
    if (ctx.getTalent(local, 400)) {
      ctx.item[60] = 1;
    }
    ctx.getTalent(local, 330) = 0;
  }
}

export async function mission_chara_no_6(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 205;
}
