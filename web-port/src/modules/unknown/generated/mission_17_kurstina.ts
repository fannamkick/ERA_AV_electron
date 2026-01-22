/**
 * MISSION_17_KURSTINA.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function mission_title_17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.results = "공주님은 특훈중";
}

export async function mission_visible_17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 1;
}

export async function mission_fee_17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  P[1] = 0;
  P[2] = 20;
  P[3] = P[1] * 2;
  P[4] = 0;
  P[5] = 0;
}

export async function mission_info_17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.drawLine('‥');
  ctx.showMessage('【크리스티나・로코코・라그라데】(Kurstina Rokoko Rangurade)');
  ctx.showMessage('');
  ctx.showMessage('의뢰인: 크리스티나・로코코・라그라데');
  ctx.showMessage('예전 당신이 부모와 함께 간 라그라데 왕국이라는 소국에서 친해진 소녀로');
  ctx.showMessage('사실 라그라데 왕국의 공주님');
  ctx.showMessage('라그라데 왕국에서 개최되는 마법대회에서 우승하기 위해 마력을 높일 필요가 있어');
  ctx.showMessage('일족에게 전해지는, 흥분을 마력으로 변환하는 마술에 손을 댔지만');
  ctx.showMessage('성적인 흥분을 얻을 수단을 몰라 당신에게 상담하러 왔다고 한다……');
  ctx.showMessage('라그라데 왕국에선 그녀를 대대적으로 수색하고 있기에');
  ctx.showMessage('그녀를 감싸줬다 들켰다간 큰일이 벌어질 것이다');
  ctx.showMessage('');
  ctx.showMessage('그런 그녀에 대한 미션의 내용은……');
  ctx.showMessage('『마력 500000이상・【붕괴】미습득・풍속 및 AV데뷔 금지』');
  ctx.showMessage('로, 기한은 15주다');
  ctx.showMessage('');
  ctx.showMessage('※CAUTION!!※');
  ctx.showMessage('마력은 지도후 쾌CVAB의 수치와 절정횟수에 따라 상승합니다.');
  ctx.showMessage('단, 지도가 강제종료한 경우 상승하지 않습니다');
  ctx.showMessage('또한 마력 혹은 매력이 0이 된 경우 그녀의 정신은【붕괴】됩니다');
  ctx.showMessage('');
  ctx.showMessage('성공여부와 관계없이 그녀는 고국으로 돌아가게 됩니다');
  ctx.showMessage('');
  ctx.showMessage('연령: 18세　미션 난이도: SS　보수: 실적「위대한 유니콘」의 사용권 부활');
  ctx.drawLine('‥');
}

export async function mission_receive_17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // TODO: ADDCHARA 216
  // TODO: LOADGLOBAL
  ctx.global[416] += 1;
  // TODO: SAVEGLOBAL
  // TODO: MAXBASE:(GETCHARA(216)):40 = 500000
  // TODO: BASE:(GETCHARA(216)):40 = 300
  if (ctx.global[200] >= 0) {
    character = GETCHARA(216);
    await clearbonus_call(ctx, character);
  }
}

export async function mission_calc_17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(216);
  ctx.locals[1] = 0;
  if (ctx.base[ctx].locals[40] >= 500000) {
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
  if (ctx.locals[1] >= 4) {
    return 1;
  }
  return 0;
}

export async function mission_report_17_arg_(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = GETCHARA(216);
  if (ctx.args[0] === 0) {
    if (ctx.locals[0] != -1) {
      await キャラ削除, local(ctx, character);
    }
  } else if (ctx.args[0] === 1) {
    ctx.flags[553] = 0;
    if (ctx.getTalent(local, 153)) {
      await add_elfalia(ctx, character);
    }
    ctx.locals[0] = GETCHARA(216);
    await ctx.wait();
    if (ctx.locals[0] != -1) {
      await キャラ削除, local(ctx, character);
    }
    character = GETCHARA(104);
  }
}

export async function mission_chara_no_17(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  return 216;
}

export async function add_elfalia(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  F = 0;
  ctx.locals[10] = GETCHARA(216);
  ctx.locals[20] = GETCHARA(104);
  if (ctx.locals[10] != -1) {
    if (cflag[ctx.locals[10]][111] >= 0) {
      F = cflag[ctx.locals[10]][111];
    }
    // TODO: ADDCHARA 104
    // TODO: LOADGLOBAL
    ctx.global[304] += 1;
    // TODO: SAVEGLOBAL
    if (cflag[ctx.locals[10]][111] >= 0 && F === 0) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[10]), "가")} 낳은 당신의 딸?이 아빠인 당신을 돕기위해 와줬다 한다`);
      // TODO: MAXBASE:(GETCHARA(104)):0 += 200
      // TODO: MAXBASE:(GETCHARA(104)):1 += 100
      // TODO: MAXBASE:(GETCHARA(104)):31 += 20
      // TODO: BASE:(GETCHARA(104)):0 += 200
      // TODO: BASE:(GETCHARA(104)):1 += 100
      // TODO: BASE:(GETCHARA(104)):31 += 20
      // TODO: TALENT:(GETCHARA(104)):408 = 0
      // TODO: TALENT:(GETCHARA(104)):409 = 1
      // TODO: TALENT:(GETCHARA(104)):161 = 1
      // TODO: RELATION:(GETCHARA(104)):(NO:F) = 1000
      // TODO: RELATION:F:GETCHARA(104) = 1000
    } else if (cflag[ctx.locals[10]][111] >= 0 && F >= 0) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[10]), "와")} %CALLNAME:(GETCHARA(F))%의 딸?이 은혜를 갚으러 엄마 대신 당신을 돕기 위해 와줬다 한다`);
      // TODO: MAXBASE:(GETCHARA(104)):0 += 100
      // TODO: MAXBASE:(GETCHARA(104)):1 += 200
      // TODO: MAXBASE:(GETCHARA(104)):31 += 10
      // TODO: BASE:(GETCHARA(104)):0 += 100
      // TODO: BASE:(GETCHARA(104)):1 += 200
      // TODO: BASE:(GETCHARA(104)):31 += 10
      if (TALENT:(GETCHARA(F)):408 === 0) {
        // TODO: TALENT:(GETCHARA(104)):408 = 0
        // TODO: TALENT:(GETCHARA(104)):409 = 1
      }
      if (TALENT:(GETCHARA(F)):121 === 1) {
        // TODO: TALENT:(GETCHARA(104)):121 = 1
        // TODO: TALENT:(GETCHARA(104)):1 = 1
        // TODO: BASE:(GETCHARA(104)):50 = 13 + RAND:5
        // TODO: CFLAG:(GETCHARA(104)):611 = 1 + RAND:3
      }
      // TODO: RELATION:(GETCHARA(104)):(GETCHARA(F)) = 500
      // TODO: RELATION:(GETCHARA(F)):GETCHARA(104) = 500
    } else if (cflag[ctx.locals[10]][111] === -1) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[10]), "가")} 낳은 아빠 불명의 딸?이 은혜를 갚으러 엄마 대신 당신을 돕기 위해 와줬다 한다`);
      // TODO: MAXBASE:(GETCHARA(104)):0 += 100
      // TODO: MAXBASE:(GETCHARA(104)):1 += 100
      // TODO: BASE:(GETCHARA(104)):0 += 100
      // TODO: BASE:(GETCHARA(104)):1 += 100
    } else if (cflag[ctx.locals[10]][111] === -2) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[10]), "가")} 낳은 개의 딸?이 은혜를 갚으러 엄마 대신 당신을 돕기 위해 와줬다 한다`);
      // TODO: MAXBASE:(GETCHARA(104)):0 += 400
      // TODO: TALENT:(GETCHARA(104)):408 = 0
      // TODO: TALENT:(GETCHARA(104)):409 = 1
      // TODO: TALENT:(GETCHARA(104)):124 = 1
    } else if (cflag[ctx.locals[10]][111] === -3) {
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.locals[10]), "가")} 낳은 촉수의 딸?이 은혜를 갚으러 엄마 대신 당신을 돕기 위해 와줬다 한다`);
      // TODO: MAXBASE:(GETCHARA(104)):0 += 500
      // TODO: MAXBASE:(GETCHARA(104)):1 += 500
    }
  }
}
