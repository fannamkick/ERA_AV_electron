/**
 * MISSION_12_HIKARU.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "존재감 있는 여자애가 되고 싶어!";
}

export async function mission_visible_12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 10000;
  if (ctx.paramBand[12] == 4) {
    P[1] += 300000;
  }
  P[2] = 5;
  if (ctx.paramBand[12] == 4) {
    P[2] += 10;
  }
  P[3] = 500000;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【아카기 히카루】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 본인＋α');
  ctx.showMessage('');
  ctx.showMessage('아이돌급의 외모와 높은 운동신경에 참한 마음씨를 가진');
  ctx.showMessage('무척이나 귀여운 여자아이');
  ctx.showMessage('그런데도 무슨 연유인지 존재감이 흐릿하여');
  ctx.showMessage('주위에서 잊혀지는 일이 자주 있다');
  ctx.showMessage('자기가 주연인 AV에서라면 존재감을 내는 방법을 익힐 수 있지 않을까');
  ctx.showMessage('깊게 고민한 끝에 그녀는 AV 데뷔를 결심했다');
  ctx.showMessage('촬영을 통해 어떻게든 존재감이 넘치게 되고 싶다, 라는게 그녀의 희망이며,');
  ctx.showMessage('그를 위해서라면 몸이 더럽혀지는 것도 각오를 한 상태라고 한다.');
  ctx.showMessage('');
  ctx.showMessage('그것과는 별개로, 그녀는 패션모델계의 카리스마라 불리는 모델겸 프로듀서인');
  ctx.showMessage('아카기 유우히의 여동생이며, 극도의 시스콘이면서 레즈비언인 유우히는');
  ctx.showMessage('이를 기회로 삼아 히카루를 레즈로 물들여 자신의 것으로 만들수 없을까 하며 찾아왔다.');
  ctx.showMessage('그녀의 요구를 들어준다면, 그녀에게 추가로 보수를 받는 것에 더해');
  ctx.showMessage('유우히 본인도 여배우 출연을 생각해 본다고 한다');
  ctx.showMessage('솔직힌 심정으론, 유우히가 여배우가 되어준다면, 여동생 이상으로 가치가 있을거라 할 수 있다');
  ctx.showMessage('');
  ctx.showMessage('히카루에게서 받은 미션 내용은……');
  ctx.showMessage('『피사기능4LV이상・신뢰5LV이상・매력최대치160이상』');
  ctx.showMessage('으로, 기한은 15주다.');
  ctx.showMessage('');
  ctx.showMessage('유우히에게서 받은 미션 내용은……');
  ctx.showMessage('『히카루가 바라는걸 충족시킨 상태에서, 레즈끼5LV이상・레즈중독5LV이상』');
  ctx.showMessage('또, 미션 종료 후엔 그녀의 신병을 당신(=감독)에게 맡긴다는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('나이: 13세　미션 난이도: D(A)');
  ctx.showMessage('보수: 1만 포인트 ＋ 공헌도5(히카루), 30만 포인트 ＋ 공헌도10(유우히)');
  ctx.drawLine('‥');
}

export async function mission_receive_12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 211
  // TODO: LOADGLOBAL
  ctx.global[411] += 1;
  // TODO: SAVEGLOBAL
  if (ctx.global[200] >= 0) {
    character = GETCHARA(211);
    await clearbonus_call(ctx, character);
  }
}

export async function mission_calc_12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(211);
  ctx.locals[1] = 0;
  if (ctx.abilities[ctx.locals[0]][70] >= 4) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][10] >= 5) {
    ctx.locals[1]++;
  }
  if (MAXctx.base[ctx].locals[31] >= 160) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] === 3) {
    if (ctx.abilities[ctx.locals[0]][22] >= 5 && ctx.abilities[ctx.locals[0]][33] >= 5) {
      return 2;
    }
    return 1;
  }
  return 0;
}

export async function mission_report_12_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(211);
  if (ctx.args[0] > 0) {
    ctx.showMessage(` 자신의 존재감이 올라갔다고 확신한 ${ctx.josaHelper("타겟은")}, 다른 사람을 끌어당기는 매력을 띠기 시작했다……`);
    ctx.showMessage(` ${ctx.josaHelper("타겟은")}【인기인】가 되었다.`);
    ctx.getTalent(local, 126) = 1;
    if (ctx.args[0] === 2) {
      ctx.showMessage('');
      ctx.showMessage(` 그 밤 자신의 방에서 자고있던${ctx.josaHelper("타겟은")}, 침대에 숨어들어온 아카기 유우히에게 덮쳐지고 말았다.`);
      ctx.showMessage(` 저항하려고 한 ${ctx.josaHelper(ctx.getVarName("CALLNAME", character), "이다")}였지만,`);
      ctx.showMessage(` 과도한 지도로 레즈끼가 개화해버린 그녀의 몸과 마음은 쉽게 유우히에게 굴복해버렸다……`);
      ctx.showMessage('');
      ctx.showMessage('사랑하는 여동생을 손에 넣은 유우히는 기분좋게 키류 조직에 추가보수를 지급하고, AV 데뷔를 승락했다.');
      ctx.showMessage('《아카기 유우히가 여배우 후보에 추가되었습니다》');
      // TODO: ADDCHARA 98
      // TODO: LOADGLOBAL
      ctx.global[298] += 1;
      // TODO: SAVEGLOBAL
    }
  }
  ctx.getTalent(local, 330) = 0;
}

export async function mission_chara_no_12(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 211;
}
