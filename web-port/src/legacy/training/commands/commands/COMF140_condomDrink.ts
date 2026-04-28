/**
 * COMF140: 콘돔정음 (Condom Drinking)
 * 원본: ERB/指導関係/COMF140.ERB
 *
 * 奉仕系コマンド: 調教対象が調교者의 페니스를 콘돔의 정액과 함께 먹는다
 */

import { CommandPlugin, TrainingContext } from '../../types';

export const comf140CondomDrink: CommandPlugin = {
  id: 140,
  name: '콘돔정음',
  category: '봉사',
  staminaCost: 10,

  isAvailable(context: TrainingContext): boolean {
    // 원본: COMF140.ERB 라인 8-219

    let A = 0;
    let S = 0;
    const messages: string[] = [];

    // すべての命令に共通の要素を考慮 (라인 14-16)
    // CALL COM_ORDER

    // ABL:욕망 (라인 18-26)
    const abl11 = context.abilities[11] || 0;
    if (abl11) {
      if (S) messages.push(' + ');
      A += abl11 * 1;
      messages.push(`욕망 LV${abl11}(${abl11 * 1})`);
      S = 1;
    }

    // ABL:봉사정신 (라인 27-35)
    const abl16 = context.abilities[16] || 0;
    if (abl16) {
      if (S) messages.push(' + ');
      A += abl16 * 4;
      messages.push(`봉사정신 LV${abl16}(${abl16 * 4})`);
      S = 1;
    }

    // ABL:정액중독 (라인 36-44)
    const abl32 = context.abilities[32] || 0;
    if (abl32) {
      if (S) messages.push(' + ');
      A += abl32 * 3;
      messages.push(`정액중독 LV${abl32}(${abl32 * 3})`);
      S = 1;
    }

    // MARK:1 (라인 46-53)
    const mark1 = context.marks?.[1] || 0;
    if (mark1) {
      if (S) messages.push(' + ');
      A += mark1 * 1;
      messages.push(`각인1 LV${mark1}(${mark1 * 1})`);
      S = 1;
    }

    // PALAM:욕정 (라인 56-77)
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

    // 수줍음 (라인 79-86)
    if (context.talents[35]) {
      messages.push(' - ');
      A -= 1;
      messages.push('수줍음(1)');
      S = 1;
    }

    // 악취둔감 (라인 87-95)
    if (context.talents[61]) {
      if (S) messages.push(' + ');
      A += 1;
      messages.push('악취둔감(1)');
      S = 1;
    }

    // 악취민감 (라인 96-103)
    if (context.talents[62]) {
      messages.push(' - ');
      A -= 3;
      messages.push('악취민감(3)');
      S = 1;
    }

    // 헌신적 (라인 104-112)
    if (context.talents[63]) {
      if (S) messages.push(' + ');
      A += 6;
      messages.push('헌신적(6)');
      S = 1;
    }

    // 쾌감을 부정 (라인 113-120)
    if (context.talents[71]) {
      messages.push(' - ');
      A -= 1;
      messages.push('쾌감을 부정(1)');
      S = 1;
    }

    // 남성혐오 (라인 121-128)
    if (context.talents[82] && context.playerTalents?.[122]) {
      messages.push(' - ');
      A -= 12;
      messages.push('남성혐오(12)');
      S = 1;
    }

    // 愛 (라인 129-137)
    if (context.talents[85] && context.assiPlay === 0) {
      if (S) messages.push(' + ');
      A += 5;
      messages.push('애인(5)');
      S = 1;
    }

    // 調教者가후타나리 (라인 138-146)
    if (context.playerTalents?.[121]) {
      if (S) messages.push(' + ');
      A += 8;
      messages.push('후타나리(8)');
      S = 1;
    }

    // 獣姦 (라인 147-155)
    if (context.equipment[89] && !context.talents[136]) {
      if (S) messages.push(' - ');
      A -= 15;
      messages.push('아이템22(15)');
      S = 1;
    }

    // 汚れ計算 (라인 157-182)
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

    // 獣姦の場合は汚れ7で固定 (라인 174-176)
    if (context.equipment[89]) {
      Y = 7;
    }

    if (context.talents[61]) {
      Y = Math.floor(Y / 3);
    }
    if (context.talents[62]) {
      Y *= 2;
    }

    // 汚れあり (라인 183-199)
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

    // 合計を表示(24以上で実行) (라인 201-215)
    const totalMessage = messages.join('');
    console.log(`${totalMessage} = ${A}`);

    const V = 24;
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
    // SAVESTR:0 = 콘돔정음 (라인 221)
    context.saveStr = context.saveStr || [];
    context.saveStr[0] = '콘돔정음';

    // 메시지 출력 (라인 223-232)
    context.showMessage('');
    context.showMessage(`플레이어는 콘돔 속 정액을 ${context.target.name}에게 마시게 했다`);

    const abl32 = context.abilities[32] || 0;
    if (abl32 >= 3) {
      context.showMessage(`${context.target?.name || '타겟'}은() 수컷의 냄새가 진하게 나는 따뜻한 정액을 콘돔째로 먹어버릴듯이 빨고 있다`);
    } else {
      context.showMessage(`${context.target?.name || '타겟'}은() 수컷의 냄새가 진하게 나는 따뜻한 정액에 입안을 유린당하는 감촉에 눈썹을 찡그리고 있다`);
    }
    context.showMessage('……');

    // ソースの計算 (라인 235-299)
    // LOSEBASE (라인 238-244)
    if (context.talents[47]) {
      context.loseBase[0] = (context.loseBase[0] || 0) + 10;
      context.loseBase[1] = (context.loseBase[1] || 0) + 90;
    } else {
      context.loseBase[0] = (context.loseBase[0] || 0) + 10;
      context.loseBase[1] = (context.loseBase[1] || 0) + 150;
    }

    // SOURCE (라인 246-247)
    const source: number[] = [];
    source[0] = 0;   // 쾌C
    source[1] = 0;   // 쾌V
    source[2] = 0;   // 쾌A
    source[3] = 0;   // 쾌B
    source[4] = 0;   // 쾌락
    source[5] = 0;   // 쾌감
    source[6] = 0;   // 고통
    source[7] = 0;   // 굴종
    source[8] = 0;   // 습득
    source[9] = 0;   // 공포
    source[10] = 0;  // 불결
    source[11] = 1500; // 수치심
    source[12] = 500;  // 노출
    source[13] = 0;  // 절정
    source[14] = 0;  // 반감
    source[15] = 0;  // 욕정
    source[16] = 0;  // 분비

    // 上のほうで計算した汚れデータ (라인 249-250)
    const playerStain2 = context.playerStain?.[2] || 0;
    const playerStain4 = context.playerStain?.[4] || 0;
    let Y = 0;
    if (playerStain2 & 1) Y += 1;
    if (playerStain2 & 4) Y += 3;
    if (playerStain2 & 8) Y += 7;
    if (playerStain2 & 16) Y += 1;
    if (playerStain4 & 32) Y += 3;

    source[15] = Y * 40 + 100;

    // ABL:봉사정신をみる (라인 252-277)
    const abl16 = context.abilities[16] || 0;
    if (abl16 === 0) {
      source[4] = 420;
      source[5] = 150;
      source[15] = Math.floor(source[15] * 4.00);
    } else if (abl16 === 1) {
      source[4] = 500;
      source[5] = 300;
      source[15] = Math.floor(source[15] * 2.50);
    } else if (abl16 === 2) {
      source[4] = 580;
      source[5] = 600;
      source[15] = Math.floor(source[15] * 1.50);
    } else if (abl16 === 3) {
      source[4] = 660;
      source[5] = 900;
      source[15] = Math.floor(source[15] * 1.00);
    } else if (abl16 === 4) {
      source[4] = 740;
      source[5] = 1500;
      source[15] = Math.floor(source[15] * 0.50);
    } else {
      source[4] = 820;
      source[5] = 2200;
      source[15] = Math.floor(source[15] * 0.10);
    }

    // ABL:기교をみる (라인 280-299)
    const abl12 = context.abilities[12] || 0;
    if (abl12 === 0) {
      source[4] = Math.floor(source[4] * 0.50);
      source[5] = Math.floor(source[5] * 0.50);
    } else if (abl12 === 1) {
      source[4] = Math.floor(source[4] * 0.80);
      source[5] = Math.floor(source[5] * 0.80);
    } else if (abl12 === 2) {
      source[4] = Math.floor(source[4] * 1.00);
      source[5] = Math.floor(source[5] * 1.00);
    } else if (abl12 === 3) {
      source[4] = Math.floor(source[4] * 1.20);
      source[5] = Math.floor(source[5] * 1.20);
    } else if (abl12 === 4) {
      source[4] = Math.floor(source[4] * 1.50);
      source[5] = Math.floor(source[5] * 1.50);
    } else {
      source[4] = Math.floor(source[4] * 2.00);
      source[5] = Math.floor(source[5] * 2.00);
    }

    // 사정게이지チェック (라인 301-383)
    let B = 0;

    // ABL:기교をみる (라인 306-319)
    if (abl12 === 0) {
      B = 1200;
    } else if (abl12 === 1) {
      B = 1700;
    } else if (abl12 === 2) {
      B = 2300;
    } else if (abl12 === 3) {
      B = 3000;
    } else if (abl12 === 4) {
      B = 3600;
    } else {
      B = 4200;
    }

    // ABL:従順をみる (라인 321-334)
    const abl10 = context.abilities[10] || 0;
    if (abl10 === 0) {
      B = Math.floor(B * 0.80);
    } else if (abl10 === 1) {
      B = Math.floor(B * 0.90);
    } else if (abl10 === 2) {
      B = Math.floor(B * 1.00);
    } else if (abl10 === 3) {
      B = Math.floor(B * 1.10);
    } else if (abl10 === 4) {
      B = Math.floor(B * 1.20);
    } else {
      B = Math.floor(B * 1.30);
    }

    // ABL:봉사기술をみる (라인 336-349)
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

    // ABL:정액중독をみる (라인 351-364)
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

    // TALENT:혀놀림をみる (라인 366-368)
    if (context.talents[52]) {
      B = Math.floor(B * 2.00);
    }

    // プレイヤーのABL:C感覚をみる (라인 370-383)
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

    // BASE:PLAYER:2에 추가 (라인 385-386)
    if (context.playerTalents?.[119] || context.playerTalents?.[122] || context.playerTalents?.[121]) {
      context.playerBase = context.playerBase || [];
      context.playerBase[2] = (context.playerBase[2] || 0) + B;
    }

    // 사정チェック (라인 388-432)
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
      // 사정している (라인 402-403)
      source[4] = Math.floor(source[4] * 3.00);

      // ABL:정액중독をみる (라인 406-431)
      if (abl32 === 0) {
        source[13] = 0;
        source[5] = Math.floor(source[5] * 2.00);
        source[11] = Math.floor(source[11] * 4.00);
      } else if (abl32 === 1) {
        source[13] = 500;
        source[5] = Math.floor(source[5] * 3.00);
        source[11] = Math.floor(source[11] * 3.00);
      } else if (abl32 === 2) {
        source[13] = 1200;
        source[5] = Math.floor(source[5] * 4.00);
        source[11] = Math.floor(source[11] * 2.50);
      } else if (abl32 === 3) {
        source[13] = 3000;
        source[5] = Math.floor(source[5] * 6.00);
        source[11] = Math.floor(source[11] * 2.00);
      } else if (abl32 === 4) {
        source[13] = 6000;
        source[5] = Math.floor(source[5] * 9.00);
        source[11] = Math.floor(source[11] * 1.50);
      } else {
        source[13] = 12000;
        source[5] = Math.floor(source[5] * 15.00);
        source[11] = Math.floor(source[11] * 1.00);
      }
    }

    // 汚れ (라인 434-439)
    // 奴隷の口⇔調교者のPの汚れが移動 (라인 437-438)
    context.stain = context.stain || [];
    context.playerStain = context.playerStain || [];
    context.stain[0] = (context.stain[0] || 0) | (context.playerStain[2] || 0);

    // 経験上昇 (라인 441-467)
    if (!context.talents[122] && !context.playerTalents?.[122]) {
      context.showMessage('이성애경험 +7');
      context.exp[40] = (context.exp[40] || 0) + 7;
    } else if (context.talents[122] && context.playerTalents?.[122]) {
      context.showMessage('동성애경험 +7');
      context.exp[41] = (context.exp[41] || 0) + 7;
    }

    if (context.assiPlay === 0 && (context.exp[0] || 0) >= 2000) { // EXPLV:3 가정
      context.tflags = context.tflags || [];
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    let E2 = context.talents[122] ? 2 : 1;

    // 애정경험 (라인 462-467)
    if ((context.charFlags[2] || 0) >= 1000 && context.assiPlay === 0) {
      context.showMessage(`애정경험+${E2}`);
      context.exp[23] = (context.exp[23] || 0) + E2;
    }

    // 調教者가후타나리 (라인 469-472)
    if (context.playerTalents?.[121]) {
      source[11] = Math.floor(source[11] / 2);
    }

    // TFLAG:900 = 0 (라인 474)
    context.tflags = context.tflags || [];
    context.tflags[900] = 0;

    // 굴복각인2に相当 (라인 476-477)
    context.tflags[200] = 3;

    // SOURCE 적용
    context.source = source;
  }
};
