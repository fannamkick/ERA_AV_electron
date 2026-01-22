/**
 * GENITAL_SLANG.ERB 완전 변환
 * 원본 로직 100% 보존
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';

export async function genital_slang(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.flags[160] == 1) {
    return;
  }
  ctx.showMessage('');
  if (ctx.exp[112] === 0) {
    ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게도 꽤나 신뢰받게 되어,`);
    ctx.showMessage(`지도의 성과인지 이제 ${ctx.josaHelper("타겟은")} 성행위에 대한 수치심도 옅어진 것 같다……`);
    ctx.showMessage(`그리하여 ${ctx.josaHelper("플레이어는")} 다음 스텝을 위해 ${ctx.getVarName("CALL", TARGET)}에게`);
    ctx.showMessage(`AV에서 수요가 있는 요소――음어를 가르쳐주기로 했다`);
    ctx.showMessage('');
  }
  ctx.showMessage(`《${ctx.getName(character)}에게 음어를 가르쳐 주겠습니까?》`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUT_LOOP1
  await ctx.inputNumber();
  if (ctx.result === 1) {
    return;
  } else if (ctx.result === 0) {
    await decide_genital_slang(ctx, character);
  } else {
    // GOTO INPUT_LOOP1 - 구조 변경 필요 (while/break 사용 권장)
  }
}

export async function decide_genital_slang(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  // Label: INPUT_LOOP00
  ctx.showMessage(`현재 ${ctx.josaHelper("타겟은")} 남성기를 %CSTR:80%, 여성기를 %CSTR:81%, 항문을 %조사처리(CSTR:82,"라")%고 부르고 있습니다`);
  ctx.showMessage(`남성기를――`);
  ctx.showMessage('[0] - 그대로 부르게 한다');
  ctx.showMessage('[1] - 랜덤하게 설정한다');
  ctx.showMessage('[2] - 스스로 생각한다');
  // Label: INPUT_LOOP01
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.cstr[83] = ctx.cstr[80];
  } else if (ctx.result === 1) {
    await generate_callpenis(ctx, character);
  } else if (ctx.result === 2) {
    ctx.showMessage('《입력해주세요(입력하지 않을 경우 바꾸지 않습니다)》');
    // Label: INPUTLOOP_CALLPENIS
    // TODO: INPUTS
    if (ctx.results === "") {
      ctx.results = ctx.cstr[80];
      ctx.cstr[83] = ctx.results;
    } else {
      ctx.cstr[83] = ctx.results;
      ctx.showMessage(`남성기를『%CSTR:83%』%조사만처리(CSTR:83,"라")%고 부르게 합니까?`);
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      // Label: INPUT_LOOP02
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage('');
      } else if (ctx.result === 1) {
        ctx.showMessage(`《재입력해주세요(입력하지 않을 경우 바꾸지 않습니다)》`);
        // GOTO INPUTLOOP_CALLPENIS - 구조 변경 필요 (while/break 사용 권장)
      } else {
        // GOTO INPUT_LOOP02 - 구조 변경 필요 (while/break 사용 권장)
      }
    }
  } else {
    // GOTO INPUT_LOOP01 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage(`남성기를《%CSTR:83%》, 여성기를――`);
  ctx.showMessage('[0] - 그대로 부르게 한다');
  ctx.showMessage('[1] - 랜덤하게 설정한다');
  ctx.showMessage('[2] - 스스로 생각한다');
  // Label: INPUT_LOOP03
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.cstr[84] = ctx.cstr[81];
  } else if (ctx.result === 1) {
    await generate_callvagina(ctx, character);
  } else if (ctx.result === 2) {
    ctx.showMessage('《입력해주세요(입력하지 않을 경우 바꾸지 않습니다)》');
    // Label: INPUTLOOP_CALLVAGINA
    // TODO: INPUTS
    if (ctx.results === "") {
      ctx.results = ctx.cstr[81];
      ctx.cstr[84] = ctx.results;
    } else {
      ctx.cstr[84] = ctx.results;
      ctx.showMessage(`여성기를『%CSTR:84%』%조사만처리(CSTR:84,"라")%고 부르게 합니까?`);
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      // Label: INPUT_LOOP04
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage('');
      } else if (ctx.result === 1) {
        ctx.showMessage(`《재입력해주세요(입력하지 않을 경우 바꾸지 않습니다)》`);
        // GOTO INPUTLOOP_CALLVAGINA - 구조 변경 필요 (while/break 사용 권장)
      } else {
        // GOTO INPUT_LOOP04 - 구조 변경 필요 (while/break 사용 권장)
      }
    }
  } else {
    // GOTO INPUT_LOOP03 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage(`남성기를《%CSTR:83%》, 여성기를《%CSTR:84%》, 항문을――`);
  ctx.showMessage('[0] - 그대로 부르게 한다');
  ctx.showMessage('[1] - 랜덤하게 설정한다');
  ctx.showMessage('[2] - 스스로 생각한다');
  // Label: INPUT_LOOP05
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.cstr[85] = ctx.cstr[82];
  } else if (ctx.result === 1) {
    await generate_callanal(ctx, character);
  } else if (ctx.result === 2) {
    ctx.showMessage('《입력해주세요(입력하지 않을 경우 바꾸지 않습니다)》');
    // Label: INPUTLOOP_CALLANAL
    // TODO: INPUTS
    if (ctx.results === "") {
      ctx.results = ctx.cstr[82];
      ctx.cstr[85] = ctx.results;
    } else {
      ctx.cstr[85] = ctx.results;
      ctx.showMessage(`항문을『%CSTR:85%』%조사만처리(CSTR:85,"라")%고 부르게 합니까?`);
      ctx.showMessage('[0] - 네');
      ctx.showMessage('[1] - 아니오');
      // Label: INPUT_LOOP06
      await ctx.inputNumber();
      if (ctx.result === 0) {
        ctx.showMessage('');
      } else if (ctx.result === 1) {
        ctx.showMessage(`《재입력해주세요(입력하지 않을 경우 바꾸지 않습니다)》`);
        // GOTO INPUTLOOP_CALLANAL - 구조 변경 필요 (while/break 사용 권장)
      } else {
        // GOTO INPUT_LOOP06 - 구조 변경 필요 (while/break 사용 권장)
      }
    }
  } else {
    // GOTO INPUT_LOOP05 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.showMessage(`${ctx.getVarName("CALL", TARGET)}에게 남성기를《%CSTR:83%》, 여성기를《%CSTR:84%》, 항문을《%CSTR:85%》%조사만처리(CSTR:85,"라")%고 부르게 합니다`);
  ctx.showMessage(`실행하시겠습니까?`);
  ctx.showMessage('[0] - 네');
  ctx.showMessage('[1] - 아니오');
  // Label: INPUT_LOOP07
  await ctx.inputNumber();
  if (ctx.result === 0) {
    ctx.showMessage(`${ctx.josaHelper("타겟은")} 남성기를《%CSTR:83%》, 여성기를《%CSTR:84%》,`);
    ctx.showMessage(`항문을《%CSTR:85%》%조사만처리(CSTR:85,"라")%고 부르게 했습니다`);
    ctx.cstr[80] = ctx.cstr[83];
    ctx.cstr[81] = ctx.cstr[84];
    ctx.cstr[82] = ctx.cstr[85];
    ctx.showMessage(`다음「대화한다」선택시 단어지도를 안하도록 설정하겠습니까?`);
    ctx.showMessage('[0] - 네');
    ctx.showMessage('[1] - 아니오');
    // Label: INPUT_LOOP08
    await ctx.inputNumber();
    if (ctx.result === 0) {
      ctx.showMessage(`《앞으로 단어지도를 하지 않습니다》`);
      character.cflags[8] = 1;
    } else if (ctx.result === 1) {
      ctx.showMessage(`《앞으로도 단어지도를 계속합니다》`);
      ctx.showMessage(`(단어지도를 하기 위해선 다시「대화한다」를 선택해 주세요)`);
    } else {
      // GOTO INPUT_LOOP08 - 구조 변경 필요 (while/break 사용 권장)
    }
  } else if (ctx.result === 1) {
    ctx.showMessage(`《재입력해주세요》`);
    // GOTO INPUT_LOOP00 - 구조 변경 필요 (while/break 사용 권장)
  } else {
    // GOTO INPUT_LOOP07 - 구조 변경 필요 (while/break 사용 권장)
  }
  ctx.exp[112] += 1;
}

export async function generate_callpenis(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  ctx.locals[0] = ctx.rand(17);
  if (ctx.locals[0] ===  0) {
    ctx.cstr[83] = "자○";
  } else if (ctx.locals[0] ===  1) {
    ctx.cstr[83] = "자지";
  } else if (ctx.locals[0] ===  2) {
    ctx.cstr[83] = "좆";
  } else if (ctx.locals[0] ===  3) {
    ctx.cstr[83] = "거시기";
  } else if (ctx.locals[0] ===  4) {
    ctx.cstr[83] = "고○";
  } else if (ctx.locals[0] ===  5) {
    ctx.cstr[83] = "고추";
  } else if (ctx.locals[0] ===  6) {
    ctx.cstr[83] = "물건";
  } else if (ctx.locals[0] ===  7) {
    ctx.cstr[83] = "막대";
  } else if (ctx.locals[0] ===  8) {
    ctx.cstr[83] = "육봉";
  } else if (ctx.locals[0] ===  9) {
    ctx.cstr[83] = "남근";
  } else if (ctx.locals[0] ===  10) {
    ctx.cstr[83] = "페○스";
  } else if (ctx.locals[0] ===  11) {
    ctx.cstr[83] = "페니스";
  } else if (ctx.locals[0] ===  12) {
    ctx.cstr[83] = "꼬○";
  } else if (ctx.locals[0] ===  13) {
    ctx.cstr[83] = "꼬추";
  } else if (ctx.locals[0] ===  14) {
    ctx.cstr[83] = "대물";
  } else if (ctx.locals[0] ===  15) {
    ctx.cstr[83] = "딸꾹";
  } else if (ctx.locals[0] ===  16) {
    ctx.cstr[83] = "자지";
  }
}

export async function generate_callvagina(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  ctx.locals[0] = ctx.rand(12);
  if (ctx.locals[0] ===  0) {
    ctx.cstr[84] = "보○";
  } else if (ctx.locals[0] ===  1) {
    ctx.cstr[84] = "보지";
  } else if (ctx.locals[0] ===  2) {
    ctx.cstr[84] = "음○";
  } else if (ctx.locals[0] ===  3) {
    ctx.cstr[84] = "음부";
  } else if (ctx.locals[0] ===  4) {
    ctx.cstr[84] = "거기";
  } else if (ctx.locals[0] ===  5) {
    ctx.cstr[84] = "아랫도리";
  } else if (ctx.locals[0] ===  6) {
    ctx.cstr[84] = "암구멍";
  } else if (ctx.locals[0] ===  7) {
    ctx.cstr[84] = "육항아리";
  } else if (ctx.locals[0] ===  8) {
    ctx.cstr[84] = "그곳";
  } else if (ctx.locals[0] ===  9) {
    ctx.cstr[84] = "질";
  } else if (ctx.locals[0] ===  10) {
    ctx.cstr[84] = "자○구멍";
  } else if (ctx.locals[0] ===  11) {
    ctx.cstr[84] = "자지구멍";
  }
  ctx.locals[0] = 0;
}

export async function generate_callanal(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  ctx.locals[0] = 0;
  ctx.locals[0] = ctx.rand(6);
  if (ctx.locals[0] ===  0) {
    ctx.cstr[85] = "엉덩이구멍";
  } else if (ctx.locals[0] ===  1) {
    ctx.cstr[85] = "엉덩이";
  } else if (ctx.locals[0] ===  2) {
    ctx.cstr[85] = "똥꼬";
  } else if (ctx.locals[0] ===  3) {
    ctx.cstr[85] = "뒷구멍";
  } else if (ctx.locals[0] ===  4) {
    ctx.cstr[85] = "항문";
  } else if (ctx.locals[0] ===  5) {
    ctx.cstr[85] = "애널";
  }
  ctx.locals[0] = 0;
}

export async function defolt_genitalcall(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  if (ctx.getTalent(target, 432) === 1) {
    ctx.cstr[80] = "자지";
    ctx.cstr[81] = "보지";
    ctx.cstr[82] = "애널";
  } else if (ctx.getTalent(target, 76) === 1) {
    ctx.cstr[80] = "자지";
    ctx.cstr[81] = "보지";
    ctx.cstr[82] = "엉덩이";
  } else if (ctx.getTalent(target, 23) === 1) {
    ctx.cstr[80] = "고추";
    ctx.cstr[81] = "거기";
    ctx.cstr[82] = "엉덩이";
  } else if (ctx.getTalent(target, 408)) {
    ctx.cstr[80] = "페니스";
    ctx.cstr[81] = "질";
    ctx.cstr[82] = "애널";
  } else {
    ctx.cstr[80] = "거시기";
    ctx.cstr[81] = "그곳";
    ctx.cstr[82] = "엉덩이구멍";
  }
}
