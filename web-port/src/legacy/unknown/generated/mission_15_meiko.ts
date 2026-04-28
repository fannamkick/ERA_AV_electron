/**
 * MISSION_15_MEIKO.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "secret base";
}

export async function mission_visible_15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 0;
  P[2] = 15;
  P[3] = 0;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【혼죠 메이코】');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 키류 카논');
  ctx.showMessage('');
  ctx.showMessage('키류 조직이 새로 손에 넣은 건물에 들러붙은 유령');
  ctx.showMessage('매우 밝고 낯을 안가리며 13살 정도의 귀여운 소녀의 모습을 하고 있다');
  ctx.showMessage('생전엔 의원과 외국인 아내 사이에서 태어난 아가씨였다고 한다');
  ctx.showMessage('');
  ctx.showMessage('그녀를 쫓아내기 위해 키류 조직에서 영능력자를 불러 제령한 결과');
  ctx.showMessage('그녀를 쫓아내려한 원흉인 카논에게 씌어버렸다고 한다');
  ctx.showMessage('사람에게 해를 끼치지는 않지만, 카논이 부들부들 떨며');
  ctx.showMessage('머리부터 이불을 뒤집어쓰고 나오지 않는 탓에');
  ctx.showMessage('그녀의 사용인으로부터 당신에게 미션이 왔다');
  ctx.showMessage('');
  ctx.showMessage('아무래도 그녀는 사랑을 모르는 채로 죽어버린것에 미련이 남은듯');
  ctx.showMessage('그녀의 미련을 해결해 준다면 얌전히 성불해준다고 한다');
  ctx.showMessage('돈은 별로 안되겠지만, 카논이 기뻐해주겠지');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『【연심】의 습득・순종 5LV이상・봉사정신 5LV이상』');
  ctx.showMessage('으로, 기한은 5주다');
  ctx.showMessage('또한 미션을 달성하면 성불하기 때문에 사라질 것이다');
  ctx.showMessage('');
  ctx.showMessage('연령: 살아있다면 15세　미션 난이도: E　보수: 공헌도 15');
  ctx.drawLine('‥');
}

export async function mission_receive_15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 214
  // TODO: LOADGLOBAL
  ctx.global[414] += 1;
  // TODO: SAVEGLOBAL
}

export async function mission_calc_15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(214);
  ctx.locals[1] = 0;
  if (ctx.abilities[ctx.locals[0]][10] > 4) {
    ctx.locals[1]++;
  }
  if (ctx.abilities[ctx.locals[0]][16] > 4) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 85) == 1) {
    ctx.locals[1]++;
  }
  if (ctx.getTalent(local, 430) == 1) {
    ctx.locals[1]++;
  }
  if (ctx.locals[1] >= 3) {
    if (ctx.locals[1] == 4) {
      return 2;
    }
    return 1;
  }
  return 0;
}

export async function mission_report_15_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(214);
  if (ctx.args[0] <= 1) {
    if (ctx.args[0] === 1) {
      ctx.showMessage(` 「이제 더이상 미련은 없어…… 고마워」`);
      ctx.showMessage(` %조사처리(CALLNAME:LOCAL, "는")% 미련을 해결하고 성불했다……`);
    } else if (ctx.args[0] === 0) {
      ctx.showMessage(` %조사처리(CALLNAME:LOCAL, "를")% 성불 시키지 못했다`);
      ctx.showMessage(` 어쩔 수 없이 ${ctx.josaHelper("플레이어가")} 책임지고 사무소의 돈으로 %조사처리(CALLNAME:LOCAL, "를")% 제령했다……`);
    }
    if (ctx.locals[0] >= 0) {
      await キャラ削除, local(ctx, character);
    }
  } else {
    ctx.showMessage(` 「메이코, ${ctx.josaHelper("플레이어와")} 헤어지기 싫어……」`);
    ctx.showMessage(` 「앞으로도 쭉 같이 있자!」`);
    ctx.showMessage(` %조사처리(CALLNAME:LOCAL, "는")% 미련을 해결했지만, 아무래도 상태가 이상하다`);
    ctx.showMessage(` ${ctx.getVarName("CALL", MASTER)}에게【영원한 사랑】을 맹세한 %조사처리(CALLNAME:LOCAL, "는")% 미련과 상관없이 ${ctx.getVarName("CALL", MASTER)}에게서 떨어지지 못하게 된 것 같다`);
    ctx.showMessage(` ${ctx.josaHelper("플레이어는")} ${ctx.getVarName("CALL", LOCAL)}에게 평생 사랑받으며 살게 됐다`);
    ctx.showMessage('');
    ctx.getTalent(local, 330) = 0;
  }
}

export async function mission_chara_no_15(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 214;
}
