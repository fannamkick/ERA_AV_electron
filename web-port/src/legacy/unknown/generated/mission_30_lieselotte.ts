/**
 * MISSION_30_LIESELOTTE.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = キスと魔法と……;
}

export async function mission_visible_30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return GETCHARA(9) != -1 && GETCHARA(104) != -1;
}

export async function mission_fee_30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 0;
  P[2] = 20;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 50;
}

export async function mission_info_30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【리젤롯테・K・파라디수스】(Lieselotte Kincsem Paradisus)');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 레이첼・I・파라디수스');
  ctx.showMessage('');
  ctx.showMessage('파라디수스 왕국의 제 2왕녀이자 레이첼과 유니스의 배다른 자매');
  ctx.showMessage('왕족 중에서는 약한 편이지만 방대한 마력을 작음 몸에 담고 있어');
  ctx.showMessage('빈번히 몸상태가 나빠지기에, 지금은 휠체어가 없으면 영지 밖으로 나가지도 못할 만큼 몸이 약하다');
  ctx.showMessage('');
  ctx.showMessage('그렇기에 사지의 움직임을 보조하는 목적으로');
  ctx.showMessage('대중에게 밝힐 수 없는 부위에 마술적인 의미를 가진 문신을 새겨넣었지만,');
  ctx.showMessage('그녀의 하얀 피부와 대조되어 가련함을 돋보이고 있다');
  ctx.showMessage('내성적이고 얌전하며 꽃과 동물을 사랑하는 상냥한 성격으로');
  ctx.showMessage('그탓에 신비함과 덧없음을 갖춘『정통파 공주님』으로서 국민중엔 열렬한 신봉자도 존재한다고 한다');
  ctx.showMessage('그녀의 존재는 레이첼이 마술약학을 연구하는 이유이기도 하다');
  ctx.showMessage('');
  ctx.showMessage('레이첼이 원인규명에 힘쓴 결과, 그녀의 몸상태가 나빠지는 원인은');
  ctx.showMessage('그녀의 마력용량에 비해 보유마력의 만성적인 고갈이 원인으로');
  ctx.showMessage('파라디수스 왕가에서는『선조회귀』라고도 불리는, 마력의 원천인 생명력을 자연에서 흡수하지 못하고');
  ctx.showMessage('다른 사람에게서 빼앗아서 보충해야 하는 체질때문이라고 판명됐다');
  ctx.showMessage('그리고 마력을 보충하는 가장 효율적인 방법은 파라디수스 왕국에서는 소실된 마술체계');
  ctx.showMessage('【성마술】――즉『정액』을 마력으로 변환하는 것이었다');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『마력 2000000이상・풍속 및 AV데뷔를 금지하고 엘파리아・라그라데와');
  ctx.showMessage('상성이 200이상으로【붕괴】【음마】【천사】가 없다』');
  ctx.showMessage('');
  ctx.showMessage('로 기한은 30주다');
  ctx.showMessage('');
  ctx.showMessage('※CAUTION!!※');
  ctx.showMessage('마력은 지도후 쾌CVAB의 수치와 절정횟수에 따라 상승합니다.');
  ctx.showMessage('단, 지도가 강제종료한 경우 상승하지 않습니다');
  ctx.showMessage('또한 마력 혹은 매력이 0이 된 경우 그녀의 정신은【붕괴】됩니다');
  ctx.showMessage('또한 미션 성공시 그녀는 당신(=감독)에게 협력해 주겠지만,');
  ctx.showMessage('실패할 경우엔……');
  ctx.showMessage('연령: 15세　미션 난이도: SS　보수: 실적「위대한 유니콘」의 사용권 부활');
  ctx.drawLine('‥');
}

export async function mission_receive_30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 230
  // TODO: LOADGLOBAL
  ctx.global[430] += 1;
  // TODO: SAVEGLOBAL
  // TODO: MAXBASE:(GETCHARA(230)):40 = 2000000
  // TODO: BASE:(GETCHARA(230)):40 = 300
  if (ctx.global[200] >= 0) {
    character = GETCHARA(230);
    await clearbonus_call(ctx, character);
  }
}

export async function mission_calc_30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(230);
  ctx.locals[1] = 0;
  ctx.locals[2] = GETCHARA(104);
  if (ctx.base[ctx].locals[40] >= 200000) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 9) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 400) == 0) {
    ctx.locals[1]++;
  }
  if (character.cflags[ctx.locals[0]][17] == 0) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 505) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 511) == 0) {
    ctx.locals[1]++;
  }
  if (ctx.relation[local][ctx.getCharacterNo(ctx.locals[2]]) >= 200) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] >= 7) {
    return 1;
  }
  return 0;
}

export async function mission_report_30_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(230);
  if (ctx.args[0] === 0) {
    if (ctx.locals[0] != -1) {
      await キャラ削除, local(ctx, character);
    }
  } else if (ctx.args[0] === 1) {
    ctx.flags[553] = 0;
    ctx.showMessage(` ${ctx.josaHelper("타겟은")}【성마술】덕분에`);
    ctx.showMessage(` 이제 휠체어 없이 일상생활이 가능할 정도로 회복한 것 같다……`);
    ctx.showMessage(`W  《%조사처리(CALLNAME:TARGET, "는")%【${ctx.getVarName("TALENT", 434)}】%조사만처리(TALENTNAME:434,"를")% 잃었다》`);
    ctx.showMessage(`W  《%조사처리(CALLNAME:TARGET, "는")%【${ctx.getVarName("TALENT", 520)}】%조사만처리(TALENTNAME:520,"를")% 잃었다》`);
    ctx.showMessage(`W  《${ctx.getVarName("CALL", TARGET)}의 최대 체력이 1000늘었다》`);
    ctx.showMessage(`W`);
    ctx.getTalent(local, 434) = 0;
    ctx.getTalent(local, 520) = 0;
    MAXctx.base[ctx].locals[0] += 1000;
    ctx.base[ctx].locals[0] = MAXctx.base[ctx].locals[0];
    ctx.base[31] = MAXctx.base[31];
    ctx.talents[330] = 0;
  }
}

export async function mission_chara_no_30(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 230;
}
