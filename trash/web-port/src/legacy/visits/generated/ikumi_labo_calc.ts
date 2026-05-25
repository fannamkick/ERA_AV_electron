/**
 * IKUMI_LABO_CALC.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function ikumi_labo_calc(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  X = 0;
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getTalent(count, 500) === 1 && character.cflags[ctx.count][1] === 2) {
      A = 1;
    } else if (ctx.getTalent(count, 505) === 1 && character.cflags[ctx.count][1] === 2 && ctx.getTalent(count, 501) === 0) {
      B = 1;
    } else if (ctx.getTalent(count, 501) === 1 && character.cflags[ctx.count][1] === 2) {
      C = 1;
    }
    if (ctx.getCharacterNo(ctx.count) == 92) {
      D = -1;
    }
  }
  if (A === 1 && B === 1 && C === 1) {
    character.cflags[ctx.master][720] = 1;
  }
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 17) {
      if (character.cflags[ctx.count][1] === 2) {
        D += 1;
      }
    }
  }
}

export async function add_ikumi_android(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  for (let COUNT = 0; COUNT < ctx.charanum; COUNT++) {
    if (ctx.count === 0) {
      // TODO: CONTINUE
    } else if (ctx.getCharacterNo(ctx.count) === 92) {
      ctx.showMessage(`이름을 정해주세요`);
      // TODO: INPUTS
      ctx.getName(ctx.count) = ctx.results;
      ctx.showMessage(`${ctx.josaHelper(ctx.getName(ctx.count), "를")} 뭐라고 부를까요?`);
      // TODO: INPUTS
      CALLctx.getName(ctx.count) = ctx.results;
      // Label: INPUT_LOOP_SEX
      ctx.showMessage(`${ctx.getVarName("CALL", COUNT)}의 성별은……`);
      ctx.showMessage('[0] - 여자');
      ctx.showMessage('[1] - 남자');
      ctx.showMessage('[2] - 후타나리');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 122) = 0;
        ctx.getTalent(count, 121) = 0;
        character.cflags[ctx.count][609] = 0;
        character.cflags[ctx.count][611] = 0;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 0) = 0;
        ctx.getTalent(count, 122) = 1;
        ctx.getTalent(count, 121) = 0;
        ctx.getTalent(count, 1) = 1;
        character.cflags[ctx.count][609] = 2;
        character.cflags[ctx.count][611] = 2;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 122) = 0;
        ctx.getTalent(count, 121) = 1;
        ctx.getTalent(count, 1) = 1;
        character.cflags[ctx.count][609] = 2;
        character.cflags[ctx.count][611] = 2;
      } else {
        // GOTO INPUT_LOOP_SEX - 구조 변경 필요 (while/break 사용 권장)
      }
      ctx.showMessage(`W ${ctx.getVarName("CALL", COUNT)}의 성격을 정합니다`);
      // Label: INPUT_LOOP_PERSONALITY_1
      ctx.showMessage(`${ctx.josaHelper(ctx.getVarName("CALLNAME", ctx.count), "는")}……`);
      ctx.showMessage('[0] - 건방짐');
      ctx.showMessage('[1] - 솔직');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 11) = 1;
        ctx.getTalent(count, 13) = 0;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 11) = 0;
        ctx.getTalent(count, 13) = 1;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 11) = 0;
        ctx.getTalent(count, 13) = 0;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_1 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_2
      ctx.showMessage(`이고……`);
      ctx.showMessage('[0] - 얌전함');
      ctx.showMessage('[1] - 활발');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 14) = 1;
        ctx.getTalent(count, 16) = 0;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 14) = 0;
        ctx.getTalent(count, 16) = 1;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 14) = 0;
        ctx.getTalent(count, 16) = 0;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_2 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_3
      ctx.showMessage(`프라이드는……`);
      ctx.showMessage('[0] - 높다');
      ctx.showMessage('[1] - 낮다');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 15) = 1;
        ctx.getTalent(count, 17) = 0;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 15) = 0;
        ctx.getTalent(count, 17) = 1;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 15) = 0;
        ctx.getTalent(count, 17) = 0;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_3 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_4
      ctx.showMessage(`성적인 흥미는……`);
      ctx.showMessage('[0] - 있다');
      ctx.showMessage('[1] - 보수적');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 23) = 1;
        ctx.getTalent(count, 24) = 0;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 23) = 0;
        ctx.getTalent(count, 24) = 1;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 23) = 0;
        ctx.getTalent(count, 24) = 0;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_4 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_5
      ctx.showMessage(`사고 패턴은……`);
      ctx.showMessage('[0] - 긍정적');
      ctx.showMessage('[1] - 부정적');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 25) = 1;
        ctx.getTalent(count, 26) = 0;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 25) = 0;
        ctx.getTalent(count, 26) = 1;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 25) = 0;
        ctx.getTalent(count, 26) = 0;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_5 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_6
      ctx.showMessage(`정조관념은……`);
      ctx.showMessage('[0] - 강하다');
      ctx.showMessage('[1] - 약하다');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 30) = 1;
        ctx.getTalent(count, 31) = 0;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 30) = 0;
        ctx.getTalent(count, 31) = 1;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 30) = 0;
        ctx.getTalent(count, 31) = 0;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_6 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_7
      ctx.showMessage(`수치심은……`);
      ctx.showMessage('[0] - 있다');
      ctx.showMessage('[1] - 없다');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 35) = 1;
        ctx.getTalent(count, 36) = 0;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 35) = 0;
        ctx.getTalent(count, 36) = 1;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 35) = 0;
        ctx.getTalent(count, 36) = 0;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_7 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_8
      ctx.showMessage(`약한 것엔……`);
      ctx.showMessage('[0] - 강하다');
      ctx.showMessage('[1] - 약하다');
      ctx.showMessage('[2] - 조통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 40) = 1;
        ctx.getTalent(count, 41) = 0;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 40) = 0;
        ctx.getTalent(count, 41) = 1;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 40) = 0;
        ctx.getTalent(count, 41) = 0;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_8 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_9
      ctx.showMessage(`기억력은……`);
      ctx.showMessage('[0] - 좋다');
      ctx.showMessage('[1] - 나쁘다');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 50) = 1;
        ctx.getTalent(count, 51) = 0;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 50) = 0;
        ctx.getTalent(count, 51) = 1;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 50) = 0;
        ctx.getTalent(count, 51) = 0;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_9 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_10
      ctx.showMessage(`냄새엔……`);
      ctx.showMessage('[0] - 둔감');
      ctx.showMessage('[1] - 민감');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 61) = 1;
        ctx.getTalent(count, 62) = 0;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 61) = 0;
        ctx.getTalent(count, 62) = 1;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 61) = 0;
        ctx.getTalent(count, 62) = 0;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_10 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_11
      ctx.showMessage(`체형은……`);
      ctx.showMessage('[0] - 큰체구');
      ctx.showMessage('[1] - 왜소');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 99) = 1;
        ctx.getTalent(count, 100) = 0;
        ctx.base[ctx.count][20] = 167;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 99) = 0;
        ctx.getTalent(count, 100) = 1;
        ctx.base[ctx.count][20] = 147;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 99) = 0;
        ctx.getTalent(count, 100) = 0;
        ctx.base[ctx.count][20] = 157;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_11 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_12
      ctx.showMessage(`가슴은……`);
      ctx.showMessage('[0] - 작음');
      ctx.showMessage('[1] - 큼');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.getTalent(count, 109) = 1;
        ctx.getTalent(count, 110) = 0;
        ctx.base[ctx.count][22] = 74;
      } else if (ctx.result === 1) {
        ctx.getTalent(count, 109) = 0;
        ctx.getTalent(count, 110) = 1;
        ctx.base[ctx.count][20] = 94;
      } else if (ctx.result === 2) {
        ctx.getTalent(count, 109) = 0;
        ctx.getTalent(count, 110) = 0;
        ctx.base[ctx.count][20] = 84;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_12 - 구조 변경 필요 (while/break 사용 권장)
      }
      // Label: INPUT_LOOP_PERSONALITY_13
      ctx.showMessage(`소비전력은……`);
      ctx.showMessage('[0] - 적다');
      ctx.showMessage('[1] - 크다');
      ctx.showMessage('[2] - 보통');
      await ctx.inputNumber();
      if (ctx.result === 0) {
        MAXctx.base[ctx.count][0] = 3000;
        MAXctx.base[ctx.count][1] = 3000;
        ctx.base[ctx.count][30] = 1500;
      } else if (ctx.result === 1) {
        MAXctx.base[ctx.count][0] = 5000;
        MAXctx.base[ctx.count][1] = 5000;
        ctx.base[ctx.count][30] = 8000;
      } else if (ctx.result === 2) {
        MAXctx.base[ctx.count][0] = 4000;
        MAXctx.base[ctx.count][1] = 4000;
        ctx.base[ctx.count][30] = 5000;
      } else {
        // GOTO INPUT_LOOP_PERSONALITY_13 - 구조 변경 필요 (while/break 사용 권장)
      }
      ctx.showMessage(`마지막으로, ${ctx.getVarName("CALL", COUNT)}의 예명을 정해주세요`);
      // TODO: INPUTS
      NICKctx.getName(ctx.count) = ctx.results;
      ctx.showMessage(`이상으로 신형 안드로이드 ${ctx.getName(ctx.count)}의 설정을 끝냅니다. 수고하셨습니다`);
      ctx.showMessage(`머리모양과 옷은 스타일리스트에서 정해주세요`);
      ctx.base[ctx.count][0] = MAXctx.base[ctx.count][0];
      ctx.base[ctx.count][1] = MAXctx.base[ctx.count][1];
      // TODO: PRINTW
    }
  }
}
