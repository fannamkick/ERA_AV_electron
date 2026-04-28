/**
 * COMF127: 바큠펠라 (Vacuum Fellatio)
 * 원본: ERB/指導関係/COMF127.ERB
 *
 * 他の奉仕系コマンドより사정させやすい
 */

import { CommandPlugin } from '../../types';
import { TrainingContext, SourceValues } from '../../types';

export const comf127VacuumFellatio: CommandPlugin = {
  id: 127,
  name: '바큠펠라',
  category: '봉사',
  staminaCost: 15,

  isAvailable(context: TrainingContext): boolean {
    // 원본: COMF127.ERB 라인 12-211

    let A = 0;
    let S = 0;
    const messages: string[] = [];

    // すべての命令に共通の要素を考慮
    // COM_ORDER 호출 (ABL:従順 체크는 별도 시스템에서 처리된다고 가정)

    // ABL:욕망 (라인 19-27)
    const abl11 = context.abilities[11] || 0;
    if (abl11) {
      A += abl11 * 1;
      messages.push(`욕망 LV${abl11}(${abl11 * 1})`);
      S = 1;
    }

    // ABL:봉사정신 (라인 28-36)
    const abl16 = context.abilities[16] || 0;
    if (abl16) {
      if (S) messages.push(' + ');
      A += abl16 * 4;
      messages.push(`봉사정신 LV${abl16}(${abl16 * 4})`);
      S = 1;
    }

    // ABL:정액중독 (라인 37-45)
    const abl32 = context.abilities[32] || 0;
    if (abl32) {
      if (S) messages.push(' + ');
      A += abl32 * 3;
      messages.push(`정액중독 LV${abl32}(${abl32 * 3})`);
      S = 1;
    }

    // MARK:1 (라인 47-54)
    const mark1 = context.marks?.[1] || 0;
    if (mark1) {
      if (S) messages.push(' + ');
      A += mark1 * 1;
      messages.push(`각인1 LV${mark1}(${mark1 * 1})`);
      S = 1;
    }

    // PALAM:욕정 (라인 57-78)
    const palam5 = context.params[5] || 0;
    let L = 0;
    if (palam5 < 1000) {
      L = 0;
    } else if (palam5 < 3000) {
      L = 1;
    } else if (palam5 < 10000) {
      L = 2;
    } else if (palam5 < 30000) {
      L = 3;
    } else if (palam5 < 100000) {
      L = 4;
    } else {
      L = 5;
    }
    if (L) {
      if (S) messages.push(' + ');
      A += L * 1;
      messages.push(`욕정 LV${L}(${L * 1})`);
      S = 1;
    }

    // 수줍음 (라인 80-87)
    if (context.talents[35]) {
      messages.push(' - ');
      A -= 1;
      messages.push('수줍음(1)');
      S = 1;
    }

    // 악취둔감 (라인 88-96)
    if (context.talents[61]) {
      if (S) messages.push(' + ');
      A += 1;
      messages.push('악취둔감(1)');
      S = 1;
    }

    // 악취민감 (라인 97-104)
    if (context.talents[62]) {
      messages.push(' - ');
      A -= 3;
      messages.push('악취민감(3)');
      S = 1;
    }

    // 헌신적 (라인 105-113)
    if (context.talents[63]) {
      if (S) messages.push(' + ');
      A += 6;
      messages.push('헌신적(6)');
      S = 1;
    }

    // 쾌감을 부정 (라인 114-121)
    if (context.talents[71]) {
      messages.push(' - ');
      A -= 1;
      messages.push('쾌감을 부정(1)');
      S = 1;
    }

    // 남성혐오 (라인 122-129)
    if (context.talents[82] && context.playerTalents?.[122]) {
      messages.push(' - ');
      A -= 12;
      messages.push('남성혐오(12)');
      S = 1;
    }

    // 愛 (라인 130-138)
    if (context.talents[85] && context.assiPlay === 0) {
      if (S) messages.push(' + ');
      A += 5;
      messages.push('애인(5)');
      S = 1;
    }

    // 調教者が후타나리 (라인 139-147)
    if (context.playerTalents?.[121]) {
      if (S) messages.push(' + ');
      A += 8;
      messages.push('후타나리(8)');
      S = 1;
    }

    // 獣姦 (라인 148-156)
    if (context.equipment[89] && !context.talents[136]) {
      if (S) messages.push(' - ');
      A -= 15;
      messages.push('아이템22(15)');
      S = 1;
    }

    // 汚れ計算 (라인 158-174)
    let Y = 0;
    const playerStain2 = context.playerStain?.[2] || 0;
    const playerStain4 = context.playerStain?.[4] || 0;

    // 愛液の汚れ
    if (playerStain2 & 1) Y += 1;
    // 精液の汚れ
    if (playerStain2 & 4) Y += 3;
    // アナルの汚れ
    if (playerStain2 & 8) Y += 7;
    // 모유の汚れ
    if (playerStain2 & 16) Y += 1;
    // 尿の汚れ
    if (playerStain4 & 32) Y += 3;

    // 汚れあり (라인 176-191)
    if (Y) {
      messages.push(' - ');
      A -= Y;
      if (context.talents[61]) {
        messages.push(`더러움 있음, 악취둔감(${Y})`);
      } else if (context.talents[62]) {
        messages.push(`더러움 있음, 악취민감(${Y})`);
      } else {
        messages.push(`더러움 있음(${Y})`);
      }
      S = 1;
    }

    // 合計を表示(40以上で実行) (라인 193-206)
    const totalMessage = messages.join('');
    console.log(`${totalMessage} = ${A}`);

    const V = 40;
    if (A < V) {
      console.log(`${A} < 실행치 ${V}`);
      return false;
    } else if (A === V) {
      console.log(`${A} = 실행치 ${V}`);
    } else {
      console.log(`${A} > 실행치 ${V}`);
    }

    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    const result = context.showMessage('바큠펠라');

    // SAVESTR:0 = 바큠펠라 (라인 213)
    context.saveStr = context.saveStr || [];
    context.saveStr[0] = '바큠펠라';

    // TRAIN_MESSAGE_B 호출 (라인 214)
    // (메시지 생성 시스템 호출)

    // %EXPNAME:22% +1 (라인 219-220)
    context.exp[22] = (context.exp[22] || 0) + 1;
    context.showMessage('정액경험 +1');

    // LOSEBASE (라인 225-231)
    if (context.talents[47]) {
      context.loseBase[0] = (context.loseBase[0] || 0) + 20;
      context.loseBase[1] = (context.loseBase[1] || 0) + 90;
    } else {
      context.loseBase[0] = (context.loseBase[0] || 0) + 50;
      context.loseBase[1] = (context.loseBase[1] || 0) + 150;
    }

    // SOURCE 초기값 (라인 233-234)
    const source: number[] = new Array(19).fill(0);

    // 上のほうで計算した汚れデータ (라인 236-238)
    const playerStain2 = context.playerStain?.[2] || 0;
    const playerStain4 = context.playerStain?.[4] || 0;
    let Y = 0;
    if (playerStain2 & 1) Y += 1;
    if (playerStain2 & 4) Y += 3;
    if (playerStain2 & 8) Y += 7;
    if (playerStain2 & 16) Y += 1;
    if (playerStain4 & 32) Y += 3;

    source[17] = Y * 40 + 100;

    // ABL:봉사정신をみる (라인 240-265)
    const abl16 = context.abilities[16] || 0;
    if (abl16 === 0) {
      source[5] = 620;
      source[4] = 150;
      source[17] = Math.floor(source[17] * 4.00);
    } else if (abl16 === 1) {
      source[5] = 700;
      source[4] = 300;
      source[17] = Math.floor(source[17] * 2.50);
    } else if (abl16 === 2) {
      source[5] = 820;
      source[4] = 600;
      source[17] = Math.floor(source[17] * 1.50);
    } else if (abl16 === 3) {
      source[5] = 940;
      source[4] = 900;
      source[17] = Math.floor(source[17] * 1.00);
    } else if (abl16 === 4) {
      source[5] = 1100;
      source[4] = 1500;
      source[17] = Math.floor(source[17] * 0.50);
    } else {
      source[5] = 1260;
      source[4] = 2200;
      source[17] = Math.floor(source[17] * 0.10);
    }

    // ABL:기교をみる (라인 268-287)
    const abl12 = context.abilities[12] || 0;
    if (abl12 === 0) {
      source[5] = Math.floor(source[5] * 0.50);
      source[4] = Math.floor(source[4] * 0.50);
    } else if (abl12 === 1) {
      source[5] = Math.floor(source[5] * 0.80);
      source[4] = Math.floor(source[4] * 0.80);
    } else if (abl12 === 2) {
      source[5] = Math.floor(source[5] * 1.00);
      source[4] = Math.floor(source[4] * 1.00);
    } else if (abl12 === 3) {
      source[5] = Math.floor(source[5] * 1.20);
      source[4] = Math.floor(source[4] * 1.20);
    } else if (abl12 === 4) {
      source[5] = Math.floor(source[5] * 1.50);
      source[4] = Math.floor(source[4] * 1.50);
    } else {
      source[5] = Math.floor(source[5] * 2.00);
      source[4] = Math.floor(source[4] * 2.00);
    }

    // 사정게이지チェック (라인 289-376)
    let B = 0;

    // ABL:기교をみる (라인 294-307)
    if (abl12 === 0) {
      B = 1500;
    } else if (abl12 === 1) {
      B = 2000;
    } else if (abl12 === 2) {
      B = 2600;
    } else if (abl12 === 3) {
      B = 3200;
    } else if (abl12 === 4) {
      B = 4000;
    } else {
      B = 4800;
    }

    // ABL:従順をみる (라인 309-322)
    const abl10 = context.abilities[10] || 0;
    if (abl10 === 0) {
      B = Math.floor(B * 0.50);
    } else if (abl10 === 1) {
      B = Math.floor(B * 0.80);
    } else if (abl10 === 2) {
      B = Math.floor(B * 1.00);
    } else if (abl10 === 3) {
      B = Math.floor(B * 1.20);
    } else if (abl10 === 4) {
      B = Math.floor(B * 1.50);
    } else {
      B = Math.floor(B * 2.00);
    }

    // ABL:봉사기술をみる (라인 324-337)
    const abl13 = context.abilities[13] || 0;
    if (abl13 === 0) {
      B = Math.floor(B * 0.50);
    } else if (abl13 === 1) {
      B = Math.floor(B * 0.80);
    } else if (abl13 === 2) {
      B = Math.floor(B * 1.20);
    } else if (abl13 === 3) {
      B = Math.floor(B * 1.50);
    } else if (abl13 === 4) {
      B = Math.floor(B * 1.80);
    } else {
      B = Math.floor(B * 2.40);
    }

    // ABL:정액중독をみる (라인 339-352)
    const abl32 = context.abilities[32] || 0;
    if (abl32 === 0) {
      B = Math.floor(B * 1.00);
    } else if (abl32 === 1) {
      B = Math.floor(B * 1.20);
    } else if (abl32 === 2) {
      B = Math.floor(B * 1.30);
    } else if (abl32 === 3) {
      B = Math.floor(B * 1.50);
    } else if (abl32 === 4) {
      B = Math.floor(B * 1.70);
    } else {
      B = Math.floor(B * 2.00);
    }

    // TALENT:혀놀림をみる (라인 354-356)
    if (context.talents[52]) {
      B = Math.floor(B * 2.00);
    }

    // プレイヤーのABL:C感覚をみる (라인 358-371)
    const playerAbl0 = context.playerAbilities?.[0] || 0;
    if (playerAbl0 === 0) {
      B = Math.floor(B * 1.00);
    } else if (playerAbl0 === 1) {
      B = Math.floor(B * 1.50);
    } else if (playerAbl0 === 2) {
      B = Math.floor(B * 2.00);
    } else if (playerAbl0 === 3) {
      B = Math.floor(B * 2.50);
    } else if (playerAbl0 === 4) {
      B = Math.floor(B * 3.50);
    } else {
      B = Math.floor(B * 5.00);
    }

    // BASE:PLAYER:2에 추가 (라인 373-374)
    if (context.playerTalents?.[119] || context.playerTalents?.[122] || context.playerTalents?.[121]) {
      context.playerBase = context.playerBase || [];
      context.playerBase[2] = (context.playerBase[2] || 0) + B;
    }

    // 사정チェック (라인 376-459)
    const S = context.playerBase?.[2] || 0;
    const EJAC = context.playerMaxBase?.[2] || 10000;

    let E = 0;
    if (S > EJAC * 2) {
      E = 2;
    } else if (S > EJAC) {
      E = 1;
    } else {
      E = 0;
    }

    if (E) {
      // 사정している (라인 391)
      source[5] = Math.floor(source[5] * 3.00);

      // ABL:정액중독をみる (라인 394-419)
      if (abl32 === 0) {
        source[4] = Math.floor(source[4] * 2.00);
        source[11] = Math.floor(source[11] * 4.00);
      } else if (abl32 === 1) {
        source[18] = 500;
        source[4] = Math.floor(source[4] * 3.00);
        source[11] = Math.floor(source[11] * 3.00);
      } else if (abl32 === 2) {
        source[18] = 1200;
        source[4] = Math.floor(source[4] * 4.00);
        source[11] = Math.floor(source[11] * 2.50);
      } else if (abl32 === 3) {
        source[18] = 3000;
        source[4] = Math.floor(source[4] * 6.00);
        source[11] = Math.floor(source[11] * 2.00);
      } else if (abl32 === 4) {
        source[18] = 6000;
        source[4] = Math.floor(source[4] * 9.00);
        source[11] = Math.floor(source[11] * 1.50);
      } else {
        source[18] = 12000;
        source[4] = Math.floor(source[4] * 15.00);
        source[11] = Math.floor(source[11] * 1.00);
      }
    }

    // 대량사정 (라인 422-442)
    if (E === 2) {
      source[18] = Math.floor(source[18] * 2.00);
      source[4] = Math.floor(source[4] * 1.50);

      context.playerExp = context.playerExp || [];
      context.playerExp[3] = (context.playerExp[3] || 0) + 2;
      context.exp[20] = (context.exp[20] || 0) + 9;

      context.showMessage('대량사정⚡', 'cyan');
      context.showMessage('정액경험 +9');

      // 精液汚れ (라인 434)
      context.playerStain = context.playerStain || [];
      context.playerStain[2] = (context.playerStain[2] || 0) | 4;

      context.playerBase[2] -= EJAC * 2;
      if (context.playerBase[2] >= EJAC) {
        context.playerBase[2] = EJAC - 1;
      }

      // 口で사정させたフラグ (라인 441)
      context.tflags = context.tflags || [];
      context.tflags[0] = 2;

    } else if (E === 1) {
      // 通常の사정 (라인 443-459)
      context.playerExp = context.playerExp || [];
      context.playerExp[3] = (context.playerExp[3] || 0) + 1;
      context.exp[20] = (context.exp[20] || 0) + 3;

      context.showMessage('사정⚡', 'cyan');
      context.showMessage('정액경험 +3');

      // 精液汚れ (라인 451)
      context.playerStain = context.playerStain || [];
      context.playerStain[2] = (context.playerStain[2] || 0) | 4;

      context.playerBase[2] -= EJAC;
      if (context.playerBase[2] >= EJAC) {
        context.playerBase[2] = EJAC - 1;
      }

      // 口で사정させたフラグ (라인 458)
      context.tflags = context.tflags || [];
      context.tflags[0] = 1;
    }

    // 汚れ (라인 461-473)
    // 奴隷の口⇔調教者のPの汚れが移動 (라인 464-466)
    context.stain = context.stain || [];
    context.playerStain = context.playerStain || [];
    context.stain[0] = (context.stain[0] || 0) | (context.playerStain[2] || 0);
    context.playerStain[2] = (context.playerStain[2] || 0) | (context.stain[0] || 0);

    // 봉사정신LV2以上, 기교LV2以上なら汚れをなめ取る (라인 469-472)
    if (abl16 >= 2 && abl12 >= 2) {
      context.playerStain[2] = 2;
      if (E >= 1) {
        context.tflags = context.tflags || [];
        context.tflags[8] = 1;
      }
    }

    // 経験上昇 (라인 475-486)
    if (!context.talents[122] && !context.playerTalents?.[122]) {
      context.showMessage('이성애경험 +7');
      context.exp[40] = (context.exp[40] || 0) + 7;
    } else if (context.talents[122] && context.playerTalents?.[122]) {
      context.showMessage('동성애경험 +7');
      context.exp[41] = (context.exp[41] || 0) + 7;
    }

    // ASSIPLAY == 0 && EXP:0 >= EXPLV:3 (라인 488-489)
    if (context.assiPlay === 0 && (context.exp[0] || 0) >= 3000) { // EXPLV:3 가정
      context.tflags = context.tflags || [];
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    // 첫 키스 (라인 491-522)
    let E2 = context.talents[122] ? 2 : 1;

    if ((context.charFlags[16] || 0) === -1) {
      context.charFlags[16] = 1;
      context.showMessage('첫 키스', 'pink');

      if (context.target?.no === 1 && context.player?.no === 0 && !context.talents[432] && !context.talents[76]) {
        context.charStr = context.charStr || [];
        context.charStr[1] = `오빠의 ${context.charStr[80] || ''}`;
      } else if (context.target?.no === 1 && context.player?.no === 0 && !context.talents[432] && context.talents[76]) {
        context.charStr = context.charStr || [];
        context.charStr[1] = `오빠의 ${context.charStr[80] || ''}`;
      } else if (context.target?.no === 1 && context.player?.no === 0 && context.talents[432]) {
        context.charStr = context.charStr || [];
        context.charStr[1] = `형님의 ${context.charStr[80] || ''}`;
      } else if (!context.talents[122] && !context.talents[432] && !context.talents[76]) {
        context.charStr = context.charStr || [];
        context.charStr[1] = `${context.player?.name || ''}의 ${context.charStr[80] || ''}`;
      } else if (!context.talents[122] && !context.talents[432] && context.talents[76]) {
        context.charStr = context.charStr || [];
        context.charStr[1] = `${context.player?.name || ''}의 ${context.charStr[80] || ''}`;
      } else if (!context.talents[122] && context.talents[432]) {
        context.charStr = context.charStr || [];
        context.charStr[1] = `${context.player?.name || ''}의 ${context.charStr[80] || ''}`;
      } else if (context.talents[122] && !context.talents[413]) {
        context.charStr = context.charStr || [];
        context.charStr[1] = `${context.player?.name || ''}의 ${context.charStr[80] || ''}`;
      } else if (context.talents[122] && context.talents[413]) {
        context.charStr = context.charStr || [];
        context.charStr[1] = `${context.player?.name || ''}의 ${context.charStr[80] || ''}`;
      } else {
        context.charStr = context.charStr || [];
        context.charStr[1] = `${context.player?.name || ''}의 ${context.charStr[80] || ''}`;
      }
    }

    // 애정경험 (라인 524-527)
    if ((context.charFlags[2] || 0) >= 1000 && context.assiPlay === 0) {
      context.showMessage(`애정경험+${E2}`);
      context.exp[23] = (context.exp[23] || 0) + E2;
    }

    // 調教者が후타나리 (라인 531-533)
    if (context.playerTalents?.[121]) {
      source[11] = Math.floor(source[11] / 2);
    }

    // TFLAG:100 = 1 (라인 535)
    context.tflags = context.tflags || [];
    context.tflags[100] = 1;

    // 굴복각인2に相当 (라인 538)
    context.tflags[200] = 2;

    // SOURCE 적용
    await context.applySource(source);
  }
};
