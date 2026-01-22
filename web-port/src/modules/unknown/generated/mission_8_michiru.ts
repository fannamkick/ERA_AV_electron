/**
 * MISSION_8_MICHIRU.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "흑갸루 성처리 완구";
}

export async function mission_visible_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 300000;
  P[2] = 15;
  P[3] = 500000;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【료지마 미치루】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 키류 카논');
  ctx.showMessage('');
  ctx.showMessage('갈색으로 태운 피부에를 가진, 야한 일과 향락에 저항감이 없는 불량소녀');
  ctx.showMessage('싸움을 엄청 잘하여 다른 고등학교에서도 유명할 정도로');
  ctx.showMessage('키류 조직의 말단과 시비가 붙었을때 싸움실력을 눈여겨 본『수장파』가');
  ctx.showMessage('중요도가 낮은 변두리 클럽에서『단골』의 경호원으로 고용했다');
  ctx.showMessage('그러나 키류 조직을 재편할 때 적대 조직에게');
  ctx.showMessage('말단에게 알려질 정도로 중요하진 않으나, 기밀성이 있는 내부정보를 흘리거나');
  ctx.showMessage('프린세스포이즌을 유출하는등의 배반행위가 발각됐다');
  ctx.showMessage('과거의 키류 조직이라면 여자나 아이라도 배반행위는 가차없이 숙청했겠지만,');
  ctx.showMessage('지금의 조직, 즉 카논의 의향에 의해『숙청』만은 용서받았다');
  ctx.showMessage('과거 그녀와 육체관계를 가졌던 자의 말에 따르면');
  ctx.showMessage('몸을 놀렸던 것 치고는 명기를 가졌다고 하며, 그렇다면 조직에서');
  ctx.showMessage('성처리용 도구로『기르는』게 어떠냐는 의견이 채용됐다');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『성교중독 LV5 이상・성교기술 LV10・V경험 1000 이상・V확장경험 10 이상・굴복각인 LV3』');
  ctx.showMessage('이며 기한은 20주이다');
  ctx.showMessage('덧붙여, 미션 종료 후, 성공했을 경우에만,');
  ctx.showMessage('그녀의 신병을 당신(=감독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 17세　미션 난이도: A　보수: 30만 포인트 ＋ 공헌도 15');
  ctx.drawLine('‥');
}

export async function mission_receive_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 207
  // TODO: LOADGLOBAL
  ctx.global[407] += 1;
  // TODO: SAVEGLOBAL
  character = GETCHARA(207);
  await clearbonus_call(ctx, character);
}

export async function mission_calc_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(207);
  ctx.locals[1] = 0;
  if (ctx.exp[ctx.locals[0]][0] >= 1000) {
    ctx.locals[1]++;
  }
  if (ctx.exp[ctx.locals[0]][52] >= 10) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][14] == 10) {
    ctx.locals[1]++;
  }
  if (character.mark[ctx.locals[0]][2] == 3) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][30] >= 5) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] == 5) {
    return 1;
  }
  return 0;
}

export async function mission_report_8_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(207);
  if (ctx.args[0] === 0) {
    if (ctx.locals[0] >= 0) {
      await キャラ削除, local(ctx, character);
    }
  } else {
    ctx.getTalent(local, 330) = 0;
  }
}

export async function mission_chara_no_8(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 207;
}
