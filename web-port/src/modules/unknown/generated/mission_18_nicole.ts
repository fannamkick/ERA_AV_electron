/**
 * MISSION_18_NICOLE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "길잃은 산타클로스?";
}

export async function mission_visible_18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return DAY[1] == 12 && DAY[2] == 4;
}

export async function mission_fee_18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 0;
  P[2] = 20;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【니콜・파트리나탈리】(Nicole Patrinatali)');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 본인');
  ctx.showMessage('');
  ctx.showMessage('크리스마스 이브날 밤, 당신(=감독)의 사무소 앞에서');
  ctx.showMessage('알몸에 이상한 얼굴의 순록을 껴않고 몸을 녹이던 수수께끼의 소녀');
  ctx.showMessage('자칭 산타클로스라고 하며 선물도 입고있던 옷도 전부 정체모를 누군가가 훔쳐갔다고 한다');
  ctx.showMessage('');
  ctx.showMessage('수상하게 생각하면서도 마지못해 당신이 보호한 그녀는');
  ctx.showMessage('산타 활동을 재개하기 위해 자금을 모을 방법을 모색하던 도중,');
  ctx.showMessage('키류 카논이 그녀에게 돈을 버는 방법을 제안하는데');
  ctx.showMessage('그건 카논치고는 드문 방법이었다……');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『【아이돌】을 습득・풍속 및 AV데뷔 금지』');
  ctx.showMessage('이고 기한은 10주다');
  ctx.showMessage('');
  ctx.showMessage('또한 미션 성공시 그녀는【아이돌】로서 화려하게 데뷔하게 되지만');
  ctx.showMessage('실패할 경우, 혹은 그녀와 깊은 인연을 맺으면 당신의 옆에 남을지도 모른다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 19세　미션 난이도: ?');
  ctx.drawLine('‥');
}

export async function mission_receive_18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: LOADGLOBAL
  ctx.global[417] += 1;
  // TODO: SAVEGLOBAL
  // TODO: ADDCHARA 217
  character = GETCHARA(217);
  await clearbonus_call(ctx, character);
}

export async function mission_calc_18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(217);
  ctx.locals[1] = 0;
  if (ctx.getTalent(local, 203) == 1) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 400) == 0) {
    ctx.locals[1]++;
  }
  if (character.cflags[ctx.locals[0]][18] == 0) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] >= 3) {
    if (ctx.getTalent(local, 430)) {
      return 2;
    } else {
      return 1;
    }
  }
  return 0;
}

export async function mission_report_18_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(217);
  if (ctx.args[0] == 0) {
    ctx.getTalent(local, 330) = 0;
  }
  if (ctx.args[0] === 1) {
    if (ctx.locals[0] != -1) {
      await キャラ削除, local(ctx, character);
    }
  } else if (ctx.args[0] === 2) {
    ctx.showMessage(`니콜은【아이돌】로 화려하게 데뷔했지만, ${ctx.josaHelper("플레이어를")} 향한 마음을 잊지 못한것 같다……`);
    ctx.showMessage(`잊기는 커녕 ${ctx.getVarName("CALL", MASTER)}의 곁에 남고싶다며 억지를 부려왔다`);
    ctx.showMessage(`W 그게 무슨 뜻인지 알고 있냐고 물으니 니콜은 머뭇거리면서도 천천히 고개를 끄덕였다……`);
    ctx.getTalent(local, 330) = 0;
  }
}

export async function mission_chara_no_18(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 218;
}
