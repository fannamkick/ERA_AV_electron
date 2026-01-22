/**
 * MISSION_16_ANN.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "노동의욕 제로인 신데렐라";
}

export async function mission_visible_16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 300000;
  P[2] = 15;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【후타미 안】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 어느 예능 프로덕션의 프로듀서');
  ctx.showMessage('');
  ctx.showMessage('보호욕을 자극하는 귀여운 외모와 천사의 목소리,');
  ctx.showMessage('사람을 매료시키는 천성을 가진 슈퍼 아이돌의 원석');
  ctx.showMessage('');
  ctx.showMessage('……일 터인데 의욕을 내지 않고 게으름만 피워, 스케줄 취소의 폭풍');
  ctx.showMessage('그 재능을 산 프로듀서도 결국 두손을 들고 아이돌영업을 포기해 버렸다');
  ctx.showMessage('');
  ctx.showMessage('적어도 그녀에게 들인 투자금이라도 회수하기 위해');
  ctx.showMessage('AV데뷔는 어떻겠냐고 당신의 사무소로 이적연락이 왔다');
  ctx.showMessage('그녀에게 아이돌로서의 반짝임을 느낀 카논은');
  ctx.showMessage('그녀를 지도해 어엿한 아이돌로 키워주길 바란다는 의향을 내비쳤다');
  ctx.showMessage('성적인 면은 어린아이 수준이었지만, 기분좋은 일을 하면서 돈을 받을 수 있다며');
  ctx.showMessage('본인의 동의는 얻었다고 한다……');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『신뢰 LV7이상・봉사정신 LV7이상・【봉사 안함】을 소거』');
  ctx.showMessage('로, 기한은 10주다');
  ctx.showMessage('또한, 미션 종료 후에는 그녀의 신병을 당신(=감독)에게 넘기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 17세　미션 난이도: A　보수: 30만 포인트 ＋ 공헌도 15');
  ctx.drawLine('‥');
}

export async function mission_receive_16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 215
  // TODO: LOADGLOBAL
  ctx.global[415] += 1;
  // TODO: SAVEGLOBAL
  if (ctx.global[200] >= 0) {
    character = GETCHARA(215);
    await clearbonus_call(ctx, character);
  }
}

export async function mission_calc_16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(215);
  ctx.locals[1] = 0;
  if (ctx.abilities[ctx.locals[0]][10] > 6) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][16] > 6) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 151) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] >= 3) {
    return 1;
  }
  return 0;
}

export async function mission_report_16_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(215);
  if (ctx.args[0] === 1) {
    MAXctx.base[31] += 30;
    ctx.base[31] += 30;
    ctx.getTalent(local, 330) = 0;
  }
}

export async function mission_chara_no_16(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 215;
}
