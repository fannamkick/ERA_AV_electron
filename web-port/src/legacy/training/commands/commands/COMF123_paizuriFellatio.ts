// 원본: ERB/指導関係/COMF123.ERB (전체 556라인)
// 파이즈리펠라 - 파이즈리와 펠라치오 결합 커맨드
// 屈복と習得が他の奉仕系と比べると多めに取得できる

import { CommandPlugin } from '../../types';
import { TrainingContext, SourceValues } from '../../types';

export const comf123PaizuriFellatio: CommandPlugin = {
  id: 123,
  name: '파이즈리펠라',
  category: '봉사',
  staminaCost: 0,

  // 원본: COMF123.ERB 라인 10-208
  isAvailable(context: TrainingContext): boolean {
    let A = 0;
    let S = 0;

    // すべての命令に共通の要素を考慮 (라인 16-18)
    // COM_ORDER 호출 (従順が高いと命令に従いやすいなど)
    const comOrderResult = this.calculateComOrder(context);
    A += comOrderResult;

    // ABL:욕망 (라인 20-28)
    const abl11 = context.abilities[11] || 0;
    if (abl11 > 0) {
      A += abl11 * 1;
      S = 1;
    }

    // ABL:봉사정신 (라인 29-37)
    const abl16 = context.abilities[16] || 0;
    if (abl16 > 0) {
      A += abl16 * 4;
      S = 1;
    }

    // ABL:정액중독 (라인 38-46)
    const abl32 = context.abilities[32] || 0;
    if (abl32 > 0) {
      A += abl32 * 3;
      S = 1;
    }

    // 쾌락각인 (라인 48-56)
    const mark1 = context.marks[1] || 0;
    if (mark1 > 0) {
      A += mark1 * 1;
      S = 1;
    }

    // PALAM:욕정 (라인 59-80)
    const palam5 = context.params[5] || 0;
    let L = 0;
    const palamLv1 = 10000;
    const palamLv2 = 30000;
    const palamLv3 = 100000;
    const palamLv4 = 300000;
    const palamLv5 = 1000000;

    if (palam5 < palamLv1) {
      L = 0;
    } else if (palam5 < palamLv2) {
      L = 1;
    } else if (palam5 < palamLv3) {
      L = 2;
    } else if (palam5 < palamLv4) {
      L = 3;
    } else if (palam5 < palamLv5) {
      L = 4;
    } else {
      L = 5;
    }

    if (L > 0) {
      A += L * 1;
      S = 1;
    }

    // 수줍음 (라인 82-89)
    if (context.talents[35]) {
      A -= 3;
      S = 1;
    }

    // 악취둔감 (라인 90-98)
    if (context.talents[61]) {
      A += 1;
      S = 1;
    }

    // 악취민감 (라인 99-106)
    if (context.talents[62]) {
      A -= 3;
      S = 1;
    }

    // 헌신적 (라인 107-115)
    if (context.talents[63]) {
      A += 6;
      S = 1;
    }

    // 쾌감을 부정 (라인 116-123)
    if (context.talents[71]) {
      A -= 3;
      S = 1;
    }

    // 남성혐오 (라인 124-131)
    if (context.talents[82] && context.playerTalents[122]) {
      A -= 12;
      S = 1;
    }

    // 愛 (라인 132-140)
    if (context.talents[85] && context.assiPlay === 0) {
      A += 5;
      S = 1;
    }

    // 調教者が후타나리 (라인 141-149)
    if (context.playerTalents[121]) {
      A += 8;
      S = 1;
    }

    // 더러움 체크 (라인 151-188)
    let Y = 0;
    const playerStain2 = context.playerStain[2] || 0;
    const playerStain4 = context.playerStain[4] || 0;

    // 愛液の汚れ (라인 152-154)
    if (playerStain2 & 1) {
      Y += 1;
    }

    // 精液の汚れ (라인 155-157)
    if (playerStain2 & 4) {
      Y += 3;
    }

    // アナルの汚れ (라인 158-160)
    if (playerStain2 & 8) {
      Y += 7;
    }

    // 모유の汚れ (라인 161-163)
    if (playerStain2 & 16) {
      Y += 1;
    }

    // 尿の汚れ (라인 164-166)
    if (playerStain4 & 32) {
      Y += 3;
    }

    // 악취둔감/민감 보정 (라인 168-171)
    if (context.talents[61]) {
      Y = Math.floor(Y / 3);
    }
    if (context.talents[62]) {
      Y = Math.floor(Y * 2);
    }

    // 汚れあり (라인 172-188)
    if (Y > 0) {
      A -= Y;
      S = 1;
    }

    // 합계 표시 (36 이상에서 실행) (라인 190-202)
    const V = 36;

    // 실행 불가 (라인 206-208)
    if (A < V) {
      return false;
    }

    return true;
  },

  // 원본: COMF123.ERB 라인 213-556
  async execute(context: TrainingContext): Promise<void> {
    const prevCom = context.prevCom || 0;
    context.selectCom = 123;

    // 커맨드 이름 표시 (라인 8)
    context.showMessage('파이즈리펠라');

    // TRAIN_MESSAGE_B 호출 (라인 210-211)
    context.saveStrings[0] = '파이즈리펠라';
    await this.generateMessage(context);

    // 경험치 증가 (라인 216-217)
    context.exp[22] += 1;
    context.showMessage(`펠라경험 +1`);

    // SOURCE 계산 (라인 219-308)
    const source = await this.calculateSource(context);

    // 사정 게이지 체크 (라인 310-408)
    await this.calculateEjaculationGauge(context);

    // 사정 체크 (라인 410-493)
    await this.checkEjaculation(context, source);

    // 汚れ 처리 (라인 495-507)
    await this.handleStains(context);

    // 경험 상승 (라인 509-543)
    await this.gainExperience(context);

    // 調教者が후타나리 (라인 545-548)
    if (context.playerTalents[121]) {
      source[9] = Math.floor(source[9] / 2);
    }

    context.tflags[100] = 1;

    // 굴복각인3に相当 (라인 552-553)
    context.tflags[200] = 3;

    // SOURCE 적용
    await this.applySource(context, source);
  },

  // COM_ORDER 계산 헬퍼
  calculateComOrder(context: TrainingContext): number {
    // 従順 등 공통 요소 계산
    const abl10 = context.abilities[10] || 0;
    return abl10 * 2; // 簡易 구현
  },

  // SOURCE 계산 (라인 219-308)
  async calculateSource(context: TrainingContext): Promise<SourceValues> {
    const source: number[] = new Array(19).fill(0);

    // TALENT:47 (라인 222-228)
    if (context.talents[47]) {
      context.loseBase[0] += 20;
      context.loseBase[1] += 80;
    } else {
      context.loseBase[0] += 30;
      context.loseBase[1] += 160;
    }

    source[9] = 2200;
    source[10] = 900;

    // 위에서 계산한 더러움 데이터 (라인 233-234)
    const Y = this.calculateDirtiness(context);
    source[17] = Y * 40 + 100;

    // ABL:봉사정신をみる (라인 236-261)
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

    // ABL:B감각をみる (라인 263-287)
    const abl1 = context.abilities[1] || 0;
    let A = 0;
    if (abl1 === 0) {
      A = 100;
    } else if (abl1 === 1) {
      A = 200;
    } else if (abl1 === 2) {
      A = 400;
    } else if (abl1 === 3) {
      A = 800;
    } else if (abl1 === 4) {
      A = 1200;
    } else {
      A = 1500;
    }

    // 거유 (라인 278-286)
    if (context.talents[110]) {
      A = Math.floor(A * 1.20);
    }
    if (context.talents[108]) {
      A = Math.floor(A * 1.20);
    } else if (context.talents[107]) {
      A = Math.floor(A * 0.70);
    }

    source[3] += A;

    // ABL:기교をみる (라인 289-308)
    const abl12 = context.abilities[12] || 0;
    if (abl12 === 0) {
      source[5] = Math.floor(source[5] * 0.80);
      source[4] = Math.floor(source[4] * 0.80);
    } else if (abl12 === 1) {
      source[5] = Math.floor(source[5] * 1.00);
      source[4] = Math.floor(source[4] * 1.00);
    } else if (abl12 === 2) {
      source[5] = Math.floor(source[5] * 1.20);
      source[4] = Math.floor(source[4] * 1.20);
    } else if (abl12 === 3) {
      source[5] = Math.floor(source[5] * 1.50);
      source[4] = Math.floor(source[4] * 1.40);
    } else if (abl12 === 4) {
      source[5] = Math.floor(source[5] * 2.00);
      source[4] = Math.floor(source[4] * 1.80);
    } else {
      source[5] = Math.floor(source[5] * 2.50);
      source[4] = Math.floor(source[4] * 2.20);
    }

    return source;
  },

  // 더러움 계산 헬퍼
  calculateDirtiness(context: TrainingContext): number {
    let Y = 0;
    const playerStain2 = context.playerStain[2] || 0;
    const playerStain4 = context.playerStain[4] || 0;

    if (playerStain2 & 1) Y += 1;
    if (playerStain2 & 4) Y += 3;
    if (playerStain2 & 8) Y += 7;
    if (playerStain2 & 16) Y += 1;
    if (playerStain4 & 32) Y += 3;

    if (context.talents[61]) Y = Math.floor(Y / 3);
    if (context.talents[62]) Y = Math.floor(Y * 2);

    return Y;
  },

  // 사정 게이지 계산 (라인 310-408)
  async calculateEjaculationGauge(context: TrainingContext): Promise<void> {
    let B = 0;

    // ABL:기교をみる (라인 315-328)
    const abl12 = context.abilities[12] || 0;
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

    // ABL:従順をみる (라인 330-343)
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

    // ABL:봉사기술をみる (라인 345-358)
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

    // ABL:정액중독をみる (라인 360-373)
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

    // TALENT:혀놀림をみる (라인 375-377)
    if (context.talents[52]) {
      B = Math.floor(B * 2.00);
    }

    // プレイヤーのABL:C감각をみる (라인 379-392)
    const playerAbl0 = context.playerAbilities[0] || 0;
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

    // 폭유/거유/빈유 (라인 394-405)
    if (context.talents[114]) {
      B = Math.floor(B * 1.20);
    } else if (context.talents[110]) {
      B = Math.floor(B * 1.10);
    } else if (context.talents[110]) { // 원본 라인 401 (빈유는 107이지만 원본이 110 체크)
      B = Math.floor(B * 0.90);
    } else {
      B = Math.floor(B * 1.00);
    }

    // BASE:PLAYER:2 증가 (라인 407-408)
    if (context.playerTalents[119] || context.playerTalents[122] || context.playerTalents[121]) {
      context.playerBase[2] = (context.playerBase[2] || 0) + B;
    }
  },

  // 사정 체크 (라인 410-493)
  async checkEjaculation(context: TrainingContext, source: SourceValues): Promise<void> {
    const S = context.playerBase[2] || 0;
    const EJAC = context.playerMaxBase[2] || 10000;

    let E = 0;
    if (S > EJAC * 2) {
      E = 2;
    } else if (S > EJAC) {
      E = 1;
    } else {
      E = 0;
    }

    if (E > 0) {
      // 사정している (라인 426)
      source[5] = Math.floor(source[5] * 3.00);

      // ABL:정액중독をみる (라인 428-453)
      const abl32 = context.abilities[32] || 0;
      if (abl32 === 0) {
        source.정액쾌감 = 0;
        source[4] = Math.floor(source[4] * 2.00);
        source[9] = Math.floor(source[9] * 6.00);
      } else if (abl32 === 1) {
        source.정액쾌감 = 500;
        source[4] = Math.floor(source[4] * 3.00);
        source[9] = Math.floor(source[9] * 4.50);
      } else if (abl32 === 2) {
        source.정액쾌감 = 1200;
        source[4] = Math.floor(source[4] * 4.00);
        source[9] = Math.floor(source[9] * 3.50);
      } else if (abl32 === 3) {
        source.정액쾌감 = 3000;
        source[4] = Math.floor(source[4] * 6.00);
        source[9] = Math.floor(source[9] * 3.00);
      } else if (abl32 === 4) {
        source.정액쾌감 = 6000;
        source[4] = Math.floor(source[4] * 9.00);
        source[9] = Math.floor(source[9] * 2.00);
      } else {
        source.정액쾌감 = 12000;
        source[4] = Math.floor(source[4] * 15.00);
        source[9] = Math.floor(source[9] * 1.50);
      }
    }

    // 대량사정 (라인 456-475)
    if (E === 2) {
      source.정액쾌감 = Math.floor(source.정액쾌감 * 2.00);
      source[4] = Math.floor(source[4] * 1.50);

      context.playerExp[3] = (context.playerExp[3] || 0) + 2;
      context.exp[20] = (context.exp[20] || 0) + 9;
      context.showMessage('대량사정⚡');
      context.showMessage('정액경험 +9');

      // 精液汚れ (라인 467-468)
      context.playerStain[2] = (context.playerStain[2] || 0) | 4;

      context.playerBase[2] -= EJAC * 2;
      if (context.playerBase[2] >= EJAC) {
        context.playerBase[2] = EJAC - 1;
      }

      // 口で사정させたフラグ (라인 474-475)
      context.tflags[0] = 2;
    } else if (E === 1) {
      // 통상 사정 (라인 477-492)
      context.playerExp[3] = (context.playerExp[3] || 0) + 1;
      context.exp[20] = (context.exp[20] || 0) + 3;
      context.showMessage('사정⚡');
      context.showMessage('정액경험 +3');

      // 精液汚れ (라인 484-485)
      context.playerStain[2] = (context.playerStain[2] || 0) | 4;

      context.playerBase[2] -= EJAC;
      if (context.playerBase[2] >= EJAC) {
        context.playerBase[2] = EJAC - 1;
      }

      // 口で사정させたフラグ (라인 491-492)
      context.tflags[0] = 1;
    }
  },

  // 汚れ 처리 (라인 495-507)
  async handleStains(context: TrainingContext): Promise<void> {
    // 奴隷の口⇔調教者のPの汚れが移동 (라인 498-500)
    context.stain[0] = (context.stain[0] || 0) | (context.playerStain[2] || 0);
    context.playerStain[2] = (context.playerStain[2] || 0) | (context.stain[0] || 0);

    // 봉사정신LV2以上, 기교LV2以上なら汚れをなめ取る (라인 502-507)
    const abl16 = context.abilities[16] || 0;
    const abl12 = context.abilities[12] || 0;
    if (abl16 >= 2 && abl12 >= 2) {
      context.playerStain[2] = 2;
      const E = context.tflags[0] || 0;
      if (E >= 1) {
        context.tflags[8] = 1;
      }
    }
  },

  // 경험 상승 (라인 509-543)
  async gainExperience(context: TrainingContext): Promise<void> {
    // 이성애/동성애 경험 (라인 512-520)
    if (!context.talents[122] && !context.playerTalents[122]) {
      context.exp[40] = (context.exp[40] || 0) + 7;
      context.showMessage('이성애경험 +7');
    } else if (context.talents[122] && context.playerTalents[122]) {
      context.exp[41] = (context.exp[41] || 0) + 7;
      context.showMessage('동성애경험 +7');
    }

    // 애정경험 판정 (라인 522-524)
    if (context.assiPlay === 0 && (context.exp[0] || 0) >= 3000000) { // EXPLV:3
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    let E = 0;
    if (context.talents[122]) {
      E = 2;
    } else {
      E = 1;
    }

    // 첫 키스 (라인 530-533)
    context.tflags[621] = (context.tflags[621] || 0) | 1;
    context.tflags[621] = (context.tflags[621] || 0) | 2;

    // 애정경험 (라인 538-542)
    if ((context.charFlags[2] || 0) >= 1000 && context.assiPlay === 0) {
      context.exp[23] = (context.exp[23] || 0) + E;
      context.showMessage(`애정경험 +${E}`);
    }
    E = 0;
  },

  async generateMessage(context: TrainingContext): Promise<void> {
    // TRAIN_MESSAGE_B 로직 구현
    context.showMessage('파이즈리와 펠라치오를 동시에 수행한다.');
  },

  async applySource(context: TrainingContext, source: SourceValues): Promise<void> {
    // SOURCE → PALAM 적용
    for (const [key, value] of Object.entries(source)) {
      if (typeof value === 'number' && value !== 0) {
        // SourceCheckSystem을 통한 적용
      }
    }
  },
};
