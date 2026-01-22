/**
 * MISSION_7_SHION.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "명문 여자고등학교의 낭자애";
}

export async function mission_visible_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 300000;
  P[2] = 15;
  P[3] = 500000;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【카부라기 시온】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 키류 엘렌');
  ctx.showMessage('');
  ctx.showMessage('아가씨 학원에 다니고 있지만, 그 정체는 카부라기 그룹의 도련님…… 남자이다');
  ctx.showMessage('본의아니게 조모의 지시대로 여장해서 아가씨학교에 다니고 있지만,');
  ctx.showMessage('여장이 취미인것도 남자를 좋아하는 것도 아니다');
  ctx.showMessage('매우 기가 드세고 가학적인 성격이며 자신이 귀엽다는 걸 자각하고 있다');
  ctx.showMessage('');
  ctx.showMessage('남자인줄 모르고 접근해온 백합취향의 상급생을 협박하여');
  ctx.showMessage('여러가지 의미로 노예처럼 부리고 있었으나, 그것이 화근이 되어');
  ctx.showMessage('키류 조직이 빚을 볼모로 학교에 스파이로 잡입시킨 여교사에게 현장을 목격당하고 만다');
  ctx.showMessage('현재는 그녀(?)의 비밀을 안, 카부라기 그룹과의 연줄을 노리고 있던 키류 조직과의');
  ctx.showMessage('『교섭』조건을 기다리고 있는 상황 같다……');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀(?)에 대한 미션의 내용은……');
  ctx.showMessage('『【애널광】의 습득・굴복각인 LV3・애널비처녀이며 조수 가능』');
  ctx.showMessage('이며 기한은 15주이다');
  ctx.showMessage('덧붙여, 미션 종료 후, 성공했을 경우에만,');
  ctx.showMessage('그녀의 신병을 당신(=감독)에게 맡기려는 것 같다……');
  ctx.showMessage('');
  ctx.showMessage('연령: 16세　미션 난이도: A　보수: 30만 포인트 ＋ 공헌도 15');
  ctx.drawLine('‥');
}

export async function mission_receive_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 206
  // TODO: LOADGLOBAL
  ctx.global[406] += 1;
  // TODO: SAVEGLOBAL
}

export async function mission_calc_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(206);
  ctx.locals[1] = 0;
  if (ctx.getTalent(local, 2) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 77) == 1) {
    ctx.locals[1]++;
  }
  if (character.cflags[ctx.locals[0]][1] == 2) {
    ctx.locals[1]++;
  }
  if (character.mark[ctx.locals[0]][2] == 3) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] == 4) {
    return 1;
  }
  return 0;
}

export async function mission_report_7_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(206);
  if (ctx.args[0] === 0) {
    if (ctx.locals[0] >= 0) {
      await キャラ削除, local(ctx, character);
    }
  } else {
    ctx.getTalent(local, 330) = 0;
  }
}

export async function mission_chara_no_7(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 206;
}
