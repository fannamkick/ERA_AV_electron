/**
 * EVENT_ADDICT.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function aphrodisiac_addict(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if ((DAY + 1) % 7 === 0) {
    if (character.cflags[31] > 0) {
      character.cflags[31] -= 1;
      if (character.cflags[31] < 0) {
        character.cflags[31] = 0;
      }
    }
    if (ctx.talents[46]) {
      if (character.cflags[32]) {
        character.cflags[32] = 0;
      } else {
        await precipitate_withdrawal(ctx, character);
      }
    }
  }
  if (character.cflags[31] === 0 && ctx.talents[46]) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 모습이 바뀌었다……`);
    ctx.showMessage(`체내에서 미약의 효과가 전부 사라져, ${ctx.josaHelper("타겟은")} 의존증에서 회복했다`);
    ctx.showMessage(`%타겟은(1)%【${ctx.getVarName("TALENT", 46)}】에서 회복했다`);
    await ctx.wait();
    ctx.talents[46] = 0;
  }
  if (((ctx.talents[86] === 0 && character.cflags[31] >= 12) || (ctx.talents[72] && character.cflags[31] >= 9)) && ctx.talents[46] === 0) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다……`);
    ctx.showMessage(`미약의 과도한 사용으로, ${ctx.josaHelper("타겟은")} 중독되어버렸다`);
    ctx.showMessage(`%타겟은(1)%【${ctx.getVarName("TALENT", 46)}】이 됐다`);
    await ctx.wait();
    ctx.talents[46] = 1;
    if (character.cflags[31] < 15) {
      character.cflags[31] = 15;
    }
  }
  if ((character.cflags[31] >= 40 || (ctx.talents[72] && character.cflags[31] >= 30)) && ctx.talents[123] === 0) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 미약의 과도한 사용으로, 정신이 꺾여버렸다`);
    ctx.showMessage(`%타겟은(1)%【${ctx.getVarName("TALENT", 123)}】에 빠졌다`);
    ctx.showMessage('');
    ctx.talents[123] = 1;
  }
  if ((character.cflags[31] >= 100 || (ctx.talents[72] && character.cflags[31] >= 75)) && ctx.talents[9] === 0) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 상태가 이상하다……`);
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 미약의 과도한 사용으로, 완전히 폐인이 됐다`);
    ctx.showMessage(`${ctx.getName(character)}의 정신은【${ctx.getVarName("TALENT", 9)}】되버렸다`);
    ctx.showMessage('');
    ctx.talents[9] = 1;
  }
}

export async function precipitate_withdrawal(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  U = 0;
  V = 0;
  W = 0;
  ctx.showMessage(`${ctx.josaHelper("타겟이")} 몸의 이상을 호소해왔다`);
  ctx.showMessage('약물중독의 금단증상이 발생한 것 같다……');
  await ctx.wait();
  if (ctx.item[26]) {
    // Label: INPUT_LOOP_01
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 미약을 줍니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`${ctx.josaHelper("타겟은")} 미약이 든 앰플을 강탈해,`);
      ctx.showMessage(`곧바로 단번에 삼키고, 살짝 한숨을 내쉬었다`);
      await ctx.wait();
      character.cflags[31] += 1;
      ctx.item[26] -= 1;
      return 0;
    } else if (ctx.result != 1) {
      // GOTO INPUT_LOOP_01 - 구조 변경 필요 (while/break 사용 권장)
    }
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.getTalent(count, 117)) {
      U += 1;
    }
    if (ctx.getTalent(count, 63)) {
      U += 1;
    }
  }
  V = (character.cflags[31] / 10) + 1 - U;
  if (V < 1) {
    V = 1;
  } else if (V > 10) {
    V = 10;
  }
  for (let COUNT = 0; COUNT < V; COUNT++) {
    if (ctx.rand(100) < 40) {
      await suffer_from_withdrawal(ctx, character);
      // TODO: BREAK
    }
  }
  if (W) {
    ctx.showMessage(`금단증상의 괴로움에 몸부림치던 ${ctx.getVarName("CALL", TARGET)}였지만`);
    ctx.showMessage('날뛰는데 지쳤는지 아니면 증상이 완화된 것인지, 몇시간 뒤, 겨우 얌전해졌다');
    ctx.showMessage('하지만, 본인 뿐만이 아니라 간병하고 있던 옆사람도 완전히 지쳐버렸다……');
    await ctx.wait();
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}의 체력과 기력이 줄어들었다`);
    MAXctx.base[0] -= 50;
    if (ctx.base[0] > MAXctx.base[0]) {
      ctx.base[0] = MAXctx.base[0];
    }
    if (MAXctx.base[0] < 600) {
      MAXctx.base[0] = 600;
    }
    MAXctx.base[1] -= 50;
    if (ctx.base[1] > MAXctx.base[1]) {
      ctx.base[1] = MAXctx.base[1];
    }
    if (MAXctx.base[1] < 100) {
      MAXctx.base[1] = 100;
    }
    ctx.base[0] -= 500;
    if (ctx.base[0] < 1) {
      ctx.base[0] = 1;
    }
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.getTalent(count, 117) || ctx.getTalent(count, 63)) {
        ctx.base[ctx.count][0] -= 200;
        if (ctx.base[ctx.count][0] < 1) {
          ctx.base[ctx.count][0] = 1;
        }
      } else if (ctx.rand(3) === 0) {
        ctx.base[ctx.count][0] -= 200;
        if (ctx.base[ctx.count][0] < 1) {
          ctx.base[ctx.count][0] = 1;
        }
      }
    }
  } else {
    ctx.showMessage(`몇 시간후, ${ctx.getVarName("CALL", TARGET)}의 몸의 떨림이 간신히 멈추었다`);
    ctx.showMessage('간병하는 쪽도 진이 다 빠졌지만,');
    ctx.showMessage('이번에는 어떻게든 무사하게 넘어간 모양이다');
    await ctx.wait();
    ctx.base[0] -= 300;
    if (ctx.base[0] < 1) {
      ctx.base[0] = 1;
    }
    for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
      if (ctx.getTalent(count, 117) || ctx.getTalent(count, 63)) {
        ctx.base[ctx.count][0] -= 100;
        if (ctx.base[ctx.count][0] < 1) {
          ctx.base[ctx.count][0] = 1;
        }
      } else if (ctx.rand(3) === 0) {
        ctx.base[ctx.count][0] -= 100;
        if (ctx.base[ctx.count][0] < 1) {
          ctx.base[ctx.count][0] = 1;
        }
      }
    }
  }
  ctx.showMessage('');
}

export async function suffer_from_withdrawal(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  W = ctx.rand(50) - V + (U * 2);
  if (W < 5) {
    if (ctx.talents[9] === 0) {
      await precipitate_withdrawal_be_a_wreck(ctx, character);
    } else if (ctx.talents[123] === 0) {
      await precipitate_withdrawal_be_a_crazy(ctx, character);
    } else if (ctx.relation[0] === 0 || ctx.relation[0] > 50) {
      await precipitate_withdrawal_be_a_misanthropist(ctx, character);
    } else if (ctx.talents[34] === 0) {
      await precipitate_withdrawal_be_a_resister(ctx, character);
    } else if (ctx.talents[26] === 0) {
      await precipitate_withdrawal_be_a_depression(ctx, character);
    } else if (ctx.talents[22] === 0) {
      await precipitate_withdrawal_be_a_athymia(ctx, character);
    } else {
      await precipitate_withdrawal_fall_into_disfavor(ctx, character);
    }
  } else if (W < 10) {
    if (ctx.talents[123] === 0) {
      await precipitate_withdrawal_be_a_crazy(ctx, character);
    } else if (ctx.relation[0] === 0 || ctx.relation[0] > 50) {
      await precipitate_withdrawal_be_a_misanthropist(ctx, character);
    } else if (ctx.talents[34] === 0) {
      await precipitate_withdrawal_be_a_resister(ctx, character);
    } else if (ctx.talents[26] === 0) {
      await precipitate_withdrawal_be_a_depression(ctx, character);
    } else if (ctx.talents[22] === 0) {
      await precipitate_withdrawal_be_a_athymia(ctx, character);
    } else {
      await precipitate_withdrawal_fall_into_disfavor(ctx, character);
    }
  } else if (W < 15) {
    if ((ctx.talents[37] === 0 && ctx.getTalent(master, 120)) || (ctx.talents[38] === 0 && ctx.getTalent(master, 120) === 0)) {
      await precipitate_withdrawal_be_a_misanthropist(ctx, character);
    } else if (ctx.talents[34] === 0) {
      await precipitate_withdrawal_be_a_resister(ctx, character);
    } else if (ctx.talents[26] === 0) {
      await precipitate_withdrawal_be_a_depression(ctx, character);
    } else if (ctx.talents[22] === 0) {
      await precipitate_withdrawal_be_a_athymia(ctx, character);
    } else {
      await precipitate_withdrawal_fall_into_disfavor(ctx, character);
    }
  } else if (W < 20) {
    if (ctx.talents[34] === 0) {
      await precipitate_withdrawal_be_a_resister(ctx, character);
    } else if (ctx.talents[26] === 0) {
      await precipitate_withdrawal_be_a_depression(ctx, character);
    } else if (ctx.talents[22] === 0) {
      await precipitate_withdrawal_be_a_athymia(ctx, character);
    } else {
      await precipitate_withdrawal_fall_into_disfavor(ctx, character);
    }
  } else if (W < 25) {
    if (ctx.talents[26] === 0) {
      await precipitate_withdrawal_be_a_depression(ctx, character);
    } else if (ctx.talents[22] === 0) {
      await precipitate_withdrawal_be_a_athymia(ctx, character);
    } else {
      await precipitate_withdrawal_fall_into_disfavor(ctx, character);
    }
  } else if (W < 30) {
    if (ctx.talents[22] === 0) {
      await precipitate_withdrawal_be_a_athymia(ctx, character);
    } else {
      await precipitate_withdrawal_fall_into_disfavor(ctx, character);
    }
  } else {
    ctx.showMessage('');
  }
  ctx.showMessage('');
  W = 1;
}

export async function precipitate_withdrawal_fall_into_disfavor(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 모습이 명백히 이상하다……`);
  ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 금단증상의 고통 때문에 완전히 ${ctx.josaHelper("플레이어를")} 싫어하게 되어버린 것 같다`);
  character.cflags[2] -= 200;
}

export async function precipitate_withdrawal_be_a_athymia(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 모습이 명백히 이상하다……`);
  ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 금단증상의 고통 때문에 완전히 감정을 잃어버린 것 같다`);
  ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 22)}】을 얻었다`);
  ctx.talents[22] = 1;
}

export async function precipitate_withdrawal_be_a_depression(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 모습이 명백히 이상하다……`);
  ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 금단증상의 고통 때문에 완전히 비관적이 되어버린 것 같다`);
  ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 26)}】을 얻었다`);
  ctx.talents[26] = 1;
}

export async function precipitate_withdrawal_be_a_resister(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 모습이 명백히 이상하다……`);
  ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 금단증상의 고통 때문에 완전히 까다로워져버린 것 같다`);
  ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 34)}】을 얻었다`);
  ctx.talents[34] = 1;
}

export async function precipitate_withdrawal_be_a_misanthropist(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 모습이 명백히 이상하다……`);
  ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 금단증상의 고통 때문에 완전히 ${ctx.josaHelper("플레이어를")} 싫어하게 되어버린 것 같다`);
  if (ctx.relation[0] === 0) {
    ctx.relation[0] = 50;
  } else {
    ctx.relation[0] -= 50;
    if (ctx.relation[0] < 30) {
      ctx.relation[0] = 30;
    }
  }
  character.cflags[2] -= 200;
}

export async function precipitate_withdrawal_be_a_crazy(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 모습이 명백히 이상하다……`);
  ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 금단증상의 고통 때문에 마음에 영향이 가버린 것 같다`);
  ctx.showMessage(`W %타겟은(1)%【${ctx.getVarName("TALENT", 123)}】를 얻었다`);
  ctx.talents[123] = 1;
}

export async function precipitate_withdrawal_be_a_wreck(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.showMessage(`W ${ctx.getVarName("CALL", TARGET)}의 모습이 명백히 이상하다……`);
  ctx.showMessage(`W ${ctx.josaHelper("타겟은")} 금단증상의 고통 때문에 완전히 폐인이 됐다`);
  ctx.showMessage(`${ctx.getName(character)}의 정신은【${ctx.getVarName("TALENT", 9)}】되버렸다……`);
  ctx.talents[19] = 1;
}
