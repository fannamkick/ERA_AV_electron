// 원본: ERB/指導関係/COMF125.ERB (전체 1181라인)
// 펠라자위 - 펠라치오 + 자위 조합 커맨드
// 実行難度高め。複数の能力に経験地が入る

import { CommandPlugin } from '../../types';
import { TrainingContext, SourceValues } from '../../types';

export const comf125FellatioMasturbation: CommandPlugin = {
  id: 125,
  name: '펠라자위',
  category: '봉사',
  staminaCost: 0,

  // 원본: COMF125.ERB 라인 9-271
  isAvailable(context: TrainingContext): boolean {
    let A = 0;
    let S = 0;

    // すべての命令に共通の要素を考慮 (라인 15-17)
    const comOrderResult = this.calculateComOrder(context);
    A += comOrderResult;

    // ABL:욕망 (라인 19-27)
    const abl11 = context.abilities[11] || 0;
    if (abl11 > 0) {
      A += abl11 * 1;
      S = 1;
    }

    // ABL:봉사정신 (라인 28-36)
    const abl16 = context.abilities[16] || 0;
    if (abl16 > 0) {
      A += abl16 * 4;
      S = 1;
    }

    // ABL:정액중독 (라인 37-45)
    const abl32 = context.abilities[32] || 0;
    if (abl32 > 0) {
      A += abl32 * 3;
      S = 1;
    }

    // ABL:노출벽 (라인 46-54)
    const abl17 = context.abilities[17] || 0;
    if (abl17 > 0) {
      A += abl17 * 4;
      S = 1;
    }

    // ABL:자위중독 (라인 55-63)
    const abl31 = context.abilities[31] || 0;
    if (abl31 > 0) {
      A += abl31 * 3;
      S = 1;
    }

    // MARK:1 (라인 64-71)
    const mark1 = context.marks[1] || 0;
    if (mark1 > 0) {
      A += mark1 * 1;
      S = 1;
    }

    // PALAM:욕정 (라인 74-95)
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

    // 자제심 (라인 97-104)
    if (context.talents[20]) {
      A -= 5;
      S = 1;
    }

    // 수줍음 (라인 105-112)
    if (context.talents[35]) {
      A -= 1;
      S = 1;
    }

    // 악취둔감 (라인 113-121)
    if (context.talents[61]) {
      A += 1;
      S = 1;
    }

    // 악취민감 (라인 122-129)
    if (context.talents[62]) {
      A -= 3;
      S = 1;
    }

    // 헌신적 (라인 130-138)
    if (context.talents[63]) {
      A += 6;
      S = 1;
    }

    // 쾌감을 부정 (라인 139-146)
    if (context.talents[71]) {
      A -= 1;
      S = 1;
    }

    // 남성혐오 (라인 147-154)
    if (context.talents[82] && context.playerTalents[122]) {
      A -= 12;
      S = 1;
    }

    // 愛 (라인 155-163)
    if (context.talents[85] && context.assiPlay === 0) {
      A += 5;
      S = 1;
    }

    // 調教者が후타나리 (라인 164-172)
    if (context.playerTalents[121]) {
      A += 8;
      S = 1;
    }

    // 獣姦 (라인 173-181)
    if (context.equipment[89] && !context.talents[136]) {
      A -= 15;
      S = 1;
    }

    // 더러움 계산 (라인 183-225)
    let Y = 0;
    const playerStain2 = context.playerStain[2] || 0;
    const playerStain4 = context.playerStain[4] || 0;

    // 愛液の汚れ (라인 184-186)
    if (playerStain2 & 1) {
      Y += 1;
    }

    // 精液の汚れ (라인 187-189)
    if (playerStain2 & 4) {
      Y += 3;
    }

    // アナルの汚れ (라인 190-192)
    if (playerStain2 & 8) {
      Y += 7;
    }

    // 모유の汚れ (라인 193-195)
    if (playerStain2 & 16) {
      Y += 1;
    }

    // 尿の汚れ (라인 196-198)
    if (playerStain4 & 32) {
      Y += 3;
    }

    // 獣姦の場合は汚れ7で固定 (라인 200-202)
    if (context.equipment[89]) {
      Y = 7;
    }

    if (context.talents[61]) {
      Y = Math.floor(Y / 3);
    }
    if (context.talents[62]) {
      Y = Math.floor(Y * 2);
    }

    // 汚れあり (라인 209-225)
    if (Y > 0) {
      A -= Y;
      S = 1;
    }

    // 難이도 상승 (라인 231-242)
    // 공개で+10, 바이브で+5, 애널바이브で+5, 샤워で＋3
    let V = 50;
    if (context.equipment[53]) {
      V += 10;
    }
    if (context.equipment[18]) {
      V += 3;
    }
    if (context.equipment[11]) {
      V += 5;
    }
    if (context.equipment[13]) {
      V += 5;
    }

    // 실행 불가 (라인 254-256)
    if (A < V) {
      return false;
    }

    // 두 번째 체크 (라인 257-271)
    V = 40;
    if (A < V) {
      return false;
    }

    return true;
  },

  // 원본: COMF125.ERB 라인 273-1181
  async execute(context: TrainingContext): Promise<void> {
    context.selectCom = 125;
    context.showMessage('펠라자위');

    // TRAIN_MESSAGE_B (라인 273-274)
    context.saveStrings[0] = '펠라자위';
    await this.generateMessage(context);

    // 경험치 증가 (라인 279-284)
    context.exp[22] = (context.exp[22] || 0) + 1;
    context.showMessage('펠라경험 +1');
    context.exp[10] = (context.exp[10] || 0) + 1;
    context.showMessage('C경험 +1');
    context.exp[11] = (context.exp[11] || 0) + 1;
    context.showMessage('V경험 +1');

    // SOURCE 계산 (라인 286-910)
    const source = await this.calculateSource(context);

    // 사정 게이지 체크 (라인 912-997)
    await this.calculateEjaculationGauge(context);

    // 사정 체크 (라인 999-1082)
    await this.checkEjaculation(context, source);

    // 汚れ 처리 (라인 1084-1114)
    await this.handleStains(context);

    // 경험 상승 (라인 1116-1169)
    await this.gainExperience(context);

    // 調教者が후타나리 (라인 1170-1173)
    if (context.playerTalents[121]) {
      source[9] = Math.floor(source[9] / 2);
    }

    context.tflags[100] = 1;

    // 굴복각인3に相当 (라인 1177-1178)
    context.tflags[200] = 3;

    // SOURCE 적용
    await this.applySource(context, source);
  },

  // COM_ORDER 계산 헬퍼
  calculateComOrder(context: TrainingContext): number {
    const abl10 = context.abilities[10] || 0;
    return abl10 * 2;
  },

  // SOURCE 계산 (라인 286-910) - 매우 복잡한 장비별 분기
  async calculateSource(context: TrainingContext): Promise<SourceValues> {
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE (라인 289-295)
    if (context.talents[47]) {
      context.loseBase[0] = (context.loseBase[0] || 0) + 20;
      context.loseBase[1] = (context.loseBase[1] || 0) + 70;
    } else {
      context.loseBase[0] = (context.loseBase[0] || 0) + 30;
      context.loseBase[1] = (context.loseBase[1] || 0) + 150;
    }

    source[9] = 1500;
    source[10] = 500;

    // 더러움 데이터 (라인 300-301)
    const Y = this.calculateDirtiness(context);
    source[17] = Y * 40 + 100;

    let A = 0;
    let B = 0;
    let C = 0;
    let D = 0;

    // ABL:C감각をみる (라인 308-333)
    const abl0 = context.abilities[0] || 0;
    if (abl0 === 0) {
      source[0] = 15;
      source[11] = 2000;
      source[9] = 500;
    } else if (abl0 === 1) {
      source[0] = 50;
      source[11] = 2300;
      source[9] = 800;
    } else if (abl0 === 2) {
      source[0] = 300;
      source[11] = 2600;
      source[9] = 1200;
    } else if (abl0 === 3) {
      source[0] = 700;
      source[11] = 2900;
      source[9] = 1900;
    } else if (abl0 === 4) {
      source[0] = 1100;
      source[11] = 3200;
      source[9] = 2500;
    } else {
      source[0] = 1600;
      source[11] = 3500;
      source[9] = 3000;
    }

    // ABL:B감각をみる (라인 335-348)
    const abl1 = context.abilities[1] || 0;
    if (abl1 === 0) {
      source[3] = 15;
    } else if (abl1 === 1) {
      source[3] = 50;
    } else if (abl1 === 2) {
      source[3] = 300;
    } else if (abl1 === 3) {
      source[3] = 700;
    } else if (abl1 === 4) {
      source[3] = 1100;
    } else {
      source[3] = 1600;
    }

    // 바이브 삽입중の場合 (라인 350-401)
    if (context.equipment[11]) {
      const abl2 = context.abilities[2] || 0;

      // ABL:V감각をみる (라인 352-371)
      if (abl2 === 0) {
        A += 40;
        D += 150;
      } else if (abl2 === 1) {
        A += 120;
        D += 400;
      } else if (abl2 === 2) {
        A += 300;
        D += 700;
      } else if (abl2 === 3) {
        A += 500;
        D += 900;
      } else if (abl2 === 4) {
        A += 650;
        D += 1000;
      } else {
        A += 850;
        D += 1200;
      }

      // EXP:V경험をみる (라인 373-390)
      const exp0 = context.exp[0] || 0;
      if (exp0 < 100000) { // EXPLV:2
        A = Math.floor(A * 0.60);
        C += 150;
      } else if (exp0 < 3000000) { // EXPLV:3
        A = Math.floor(A * 1.00);
        C += 20;
      } else if (exp0 < 10000000) { // EXPLV:4
        A = Math.floor(A * 1.20);
        C += 0;
      } else if (exp0 < 30000000) { // EXPLV:5
        A = Math.floor(A * 1.40);
        C += 0;
      } else {
        A = Math.floor(A * 1.60);
        C += 0;
      }

      // V민감, 鈍感をみる (라인 391-398)
      if (context.talents[103]) {
        C = Math.floor(C * 1.50);
        D = Math.floor(D * 1.50);
      } else if (context.talents[104]) {
        C = Math.floor(C * 0.60);
        D = Math.floor(D * 0.60);
      }

      // 一度単독で計算 (라인 399-401)
      source[9] += D;
    }

    // 애널바이브 삽입중の場合 (라인 403-460)
    if (context.equipment[13]) {
      context.loseBase[0] = (context.loseBase[0] || 0) + 30;
      context.loseBase[1] = (context.loseBase[1] || 0) + 80;

      const abl3 = context.abilities[3] || 0;

      // ABL:A감각をみる (라인 408-427)
      if (abl3 === 0) {
        B += 40;
        D += 150;
      } else if (abl3 === 1) {
        B += 120;
        D += 400;
      } else if (abl3 === 2) {
        B += 300;
        D += 700;
      } else if (abl3 === 3) {
        B += 500;
        D += 900;
      } else if (abl3 === 4) {
        B += 650;
        D += 1000;
      } else {
        B += 850;
        D += 1200;
      }

      // EXP:A경험をみる (라인 429-448)
      const exp1 = context.exp[1] || 0;
      if (exp1 < 10000) { // EXPLV:1
        B = Math.floor(B * 0.50);
        C += 1000;
      } else if (exp1 < 100000) { // EXPLV:2
        B = Math.floor(B * 1.00);
        C += 150;
      } else if (exp1 < 3000000) { // EXPLV:3
        B = Math.floor(B * 1.10);
        C += 20;
      } else if (exp1 < 10000000) { // EXPLV:4
        B = Math.floor(B * 1.20);
        C += 0;
      } else if (exp1 < 30000000) { // EXPLV:5
        B = Math.floor(B * 1.40);
        C += 0;
      } else {
        B = Math.floor(B * 1.60);
        C += 0;
      }

      // A민감, 鈍감をみる (라인 450-457)
      if (context.talents[105]) {
        C = Math.floor(C * 1.50);
        D = Math.floor(D * 1.50);
      } else if (context.talents[106]) {
        C = Math.floor(C * 0.60);
        D = Math.floor(D * 0.60);
      }

      // 一度単独で計算 (라인 458-460)
      source[9] += D;
    }

    // 샤워사용중の場合 (라인 462-557)
    if (context.equipment[18]) {
      // ABL:C感覚をみる (라인 464-489)
      if (abl0 === 0) {
        source[0] = 150;
        source[11] = 1000;
        source[9] = 50;
      } else if (abl0 === 1) {
        source[0] = 400;
        source[11] = 1300;
        source[9] = 80;
      } else if (abl0 === 2) {
        source[0] = 800;
        source[11] = 1600;
        source[9] = 120;
      } else if (abl0 === 3) {
        source[0] = 1200;
        source[11] = 1900;
        source[9] = 190;
      } else if (abl0 === 4) {
        source[0] = 1500;
        source[11] = 2200;
        source[9] = 250;
      } else {
        source[0] = 1800;
        source[11] = 2500;
        source[9] = 300;
      }

      // ABL:V감각をみる (라인 491-510)
      const abl2 = context.abilities[2] || 0;
      if (abl2 === 0) {
        source[1] = 0;
        D = 0;
      } else if (abl2 === 1) {
        source[1] = 100;
        D = 300;
      } else if (abl2 === 2) {
        source[1] = 200;
        D = 400;
      } else if (abl2 === 3) {
        source[1] = 300;
        D = 500;
      } else if (abl2 === 4) {
        source[1] = 400;
        D = 600;
      } else {
        source[1] = 500;
        D = 700;
      }

      // ABL:A감각をみる (라인 512-531)
      const abl3 = context.abilities[3] || 0;
      if (abl3 === 0) {
        B = 40;
        D += 150;
      } else if (abl3 === 1) {
        B = 120;
        D += 400;
      } else if (abl3 === 2) {
        B = 300;
        D += 700;
      } else if (abl3 === 3) {
        B = 500;
        D += 900;
      } else if (abl3 === 4) {
        B = 650;
        D += 1000;
      } else {
        B = 850;
        D += 1200;
      }

      // V민감, 鈍感をみる (라인 533-540)
      if (context.talents[103]) {
        source[13] = Math.floor((source[13] || 0) * 1.50);
        D = Math.floor(D * 1.50);
      } else if (context.talents[104]) {
        source[13] = Math.floor((source[13] || 0) * 0.60);
        D = Math.floor(D * 0.60);
      }

      // A민감, 鈍感をみる (라인 541-548)
      if (context.talents[105]) {
        source[13] = Math.floor((source[13] || 0) * 1.50);
        D = Math.floor(D * 1.50);
      } else if (context.talents[106]) {
        source[13] = Math.floor((source[13] || 0) * 0.60);
        D = Math.floor(D * 0.60);
      }

      // 一度単独で計算 (라인 549-551)
      source[9] += D;
    } else {
      // 샤워 사용 안 함 (라인 552-557)
      B = 0;
      source[2] = 0;
      A = 0;
      source[1] = 0;
    }

    // VかAが上昇するとき, 上昇に従ってSOURCE:0, SOURCE:17を減らす (라인 559-581)
    if (context.equipment[11] || context.equipment[13]) {
      const E = (context.abilities[2] || 0) + (context.abilities[3] || 0);
      if (E <= 1) {
        source[0] = Math.floor(source[0] * 1.00);
        source[3] = Math.floor(source[3] * 1.00);
      } else if (E <= 3) {
        source[0] = Math.floor(source[0] * 0.90);
        source[3] = Math.floor(source[3] * 0.90);
      } else if (E <= 5) {
        source[0] = Math.floor(source[0] * 0.80);
        source[3] = Math.floor(source[3] * 0.80);
      } else if (E <= 7) {
        source[0] = Math.floor(source[0] * 0.70);
        source[3] = Math.floor(source[3] * 0.70);
      } else if (E <= 9) {
        source[0] = Math.floor(source[0] * 0.60);
        source[3] = Math.floor(source[3] * 0.60);
      } else {
        source[0] = Math.floor(source[0] * 0.50);
        source[3] = Math.floor(source[3] * 0.50);
      }
    }

    // 바이브, 애널바이브だけ先に計산 (라인 583-663)
    if (context.equipment[11] || context.equipment[13]) {
      const palam3 = context.params[3] || 0;
      const palam5 = context.params[5] || 0;

      // PALAM:윤활をみる (라인 585-606)
      if (palam3 < 10000) {
        A = Math.floor(A * 0.40);
        B = Math.floor(B * 0.40);
        C += 800;
      } else if (palam3 < 30000) {
        A = Math.floor(A * 0.80);
        B = Math.floor(B * 0.80);
        C += 500;
      } else if (palam3 < 100000) {
        A = Math.floor(A * 1.00);
        B = Math.floor(B * 1.00);
        C += 300;
      } else if (palam3 < 300000) {
        A = Math.floor(A * 1.40);
        B = Math.floor(B * 1.40);
        C += 120;
      } else {
        A = Math.floor(A * 1.80);
        B = Math.floor(B * 1.80);
        C += 100;
      }

      // PALAM:욕정をみる (라인 608-624)
      if (palam5 < 10000) {
        A = Math.floor(A * 0.80);
        B = Math.floor(B * 0.80);
      } else if (palam5 < 30000) {
        A = Math.floor(A * 0.90);
        B = Math.floor(B * 0.90);
      } else if (palam5 < 100000) {
        A = Math.floor(A * 1.00);
        B = Math.floor(B * 1.00);
      } else if (palam5 < 300000) {
        A = Math.floor(A * 1.10);
        B = Math.floor(B * 1.10);
      } else {
        A = Math.floor(A * 1.20);
        B = Math.floor(B * 1.20);
      }

      // ABL:從順をみる (라인 626-645)
      const abl10 = context.abilities[10] || 0;
      if (abl10 === 0) {
        A = Math.floor(A * 0.80);
        B = Math.floor(B * 0.80);
      } else if (abl10 === 1) {
        A = Math.floor(A * 0.90);
        B = Math.floor(B * 0.90);
      } else if (abl10 === 2) {
        A = Math.floor(A * 1.00);
        B = Math.floor(B * 1.00);
      } else if (abl10 === 3) {
        A = Math.floor(A * 1.10);
        B = Math.floor(B * 1.10);
      } else if (abl10 === 4) {
        A = Math.floor(A * 1.20);
        B = Math.floor(B * 1.20);
      } else {
        A = Math.floor(A * 1.30);
        B = Math.floor(B * 1.30);
      }

      // 큰체구 (라인 647-649)
      if (context.talents[99]) {
        C = Math.floor(C * 0.80);
      }

      // 小柄体形 (라인 650-652)
      if (context.talents[100]) {
        C = Math.floor(C * 2.00);
      }

      // 정조관념 (라인 654-657)
      if (context.talents[30]) {
        C = Math.floor(C * 3.00);
      }

      source[1] = A;
      source[2] = B;
      source[13] = C;
    }

    // 샤워だけ先に計算 (라인 665-732)
    if (context.equipment[18]) {
      const palam3 = context.params[3] || 0;
      const palam5 = context.params[5] || 0;

      // PALAM:윤활をみる (라인 667-688)
      if (palam3 < 10000) {
        A = Math.floor(A * 0.40);
        B = Math.floor(B * 0.40);
        C += 800;
      } else if (palam3 < 30000) {
        A = Math.floor(A * 0.80);
        B = Math.floor(B * 0.80);
        C += 500;
      } else if (palam3 < 100000) {
        A = Math.floor(A * 1.00);
        B = Math.floor(B * 1.00);
        C += 300;
      } else if (palam3 < 300000) {
        A = Math.floor(A * 1.40);
        B = Math.floor(B * 1.40);
        C += 120;
      } else {
        A = Math.floor(A * 1.80);
        B = Math.floor(B * 1.80);
        C += 100;
      }

      // PALAM:욕정をみる (라인 690-706)
      if (palam5 < 10000) {
        A = Math.floor(A * 0.80);
        B = Math.floor(B * 0.80);
      } else if (palam5 < 30000) {
        A = Math.floor(A * 0.90);
        B = Math.floor(B * 0.90);
      } else if (palam5 < 100000) {
        A = Math.floor(A * 1.00);
        B = Math.floor(B * 1.00);
      } else if (palam5 < 300000) {
        A = Math.floor(A * 1.10);
        B = Math.floor(B * 1.10);
      } else {
        A = Math.floor(A * 1.20);
        B = Math.floor(B * 1.20);
      }

      // ABL:従順をみる (라인 708-727)
      const abl10 = context.abilities[10] || 0;
      if (abl10 === 0) {
        A = Math.floor(A * 0.80);
        B = Math.floor(B * 0.80);
      } else if (abl10 === 1) {
        A = Math.floor(A * 0.90);
        B = Math.floor(B * 0.90);
      } else if (abl10 === 2) {
        A = Math.floor(A * 1.00);
        B = Math.floor(B * 1.00);
      } else if (abl10 === 3) {
        A = Math.floor(A * 1.10);
        B = Math.floor(B * 1.10);
      } else if (abl10 === 4) {
        A = Math.floor(A * 1.20);
        B = Math.floor(B * 1.20);
      } else {
        A = Math.floor(A * 1.30);
        B = Math.floor(B * 1.30);
      }

      source[1] += A;
      source[2] += B;
    }

    // ABL:봉사정신をみる (라인 734-759)
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

    // ABL:기교をみる (라인 761-810)
    const abl12 = context.abilities[12] || 0;
    if (abl12 === 0) {
      source[5] = 100;
      source[0] = Math.floor(source[0] * 0.30);
      source[3] = Math.floor(source[3] * 0.30);
      source[1] = Math.floor(source[1] * 0.30);
      source[2] = Math.floor(source[2] * 0.30);
      source[5] = Math.floor(source[5] * 0.50);
      source[4] = Math.floor(source[4] * 0.30);
    } else if (abl12 === 1) {
      source[5] = 160;
      source[0] = Math.floor(source[0] * 0.70);
      source[3] = Math.floor(source[3] * 0.70);
      source[1] = Math.floor(source[1] * 0.70);
      source[2] = Math.floor(source[2] * 0.70);
      source[5] = Math.floor(source[5] * 0.80);
      source[4] = Math.floor(source[4] * 0.70);
    } else if (abl12 === 2) {
      source[5] = 220;
      source[0] = Math.floor(source[0] * 1.00);
      source[3] = Math.floor(source[3] * 1.00);
      source[1] = Math.floor(source[1] * 1.00);
      source[2] = Math.floor(source[2] * 1.00);
      source[5] = Math.floor(source[5] * 1.00);
      source[4] = Math.floor(source[4] * 1.00);
    } else if (abl12 === 3) {
      source[5] = 280;
      source[0] = Math.floor(source[0] * 1.20);
      source[3] = Math.floor(source[3] * 1.20);
      source[1] = Math.floor(source[1] * 1.20);
      source[2] = Math.floor(source[2] * 1.20);
      source[5] = Math.floor(source[5] * 1.20);
      source[4] = Math.floor(source[4] * 1.20);
    } else if (abl12 === 4) {
      source[5] = 340;
      source[0] = Math.floor(source[0] * 1.40);
      source[3] = Math.floor(source[3] * 1.40);
      source[1] = Math.floor(source[1] * 1.40);
      source[2] = Math.floor(source[2] * 1.40);
      source[5] = Math.floor(source[5] * 1.50);
      source[4] = Math.floor(source[4] * 1.40);
    } else {
      source[5] = 400;
      source[0] = Math.floor(source[0] * 1.60);
      source[3] = Math.floor(source[3] * 1.60);
      source[1] = Math.floor(source[1] * 1.60);
      source[2] = Math.floor(source[2] * 1.60);
      source[5] = Math.floor(source[5] * 2.00);
      source[4] = Math.floor(source[4] * 1.60);
    }

    // ABL:자위중독をみる (라인 812-849)
    const abl31 = context.abilities[31] || 0;
    if (abl31 === 0) {
      source.정액쾌감 = 0;
      // 모든 쾌감 * 1.00 (변경 없음)
    } else if (abl31 === 1) {
      source.정액쾌감 = 100;
      source[0] = Math.floor(source[0] * 1.10);
      source[3] = Math.floor(source[3] * 1.10);
      source[1] = Math.floor(source[1] * 1.10);
      source[2] = Math.floor(source[2] * 1.10);
    } else if (abl31 === 2) {
      source.정액쾌감 = 300;
      source[0] = Math.floor(source[0] * 1.20);
      source[3] = Math.floor(source[3] * 1.20);
      source[1] = Math.floor(source[1] * 1.20);
      source[2] = Math.floor(source[2] * 1.20);
    } else if (abl31 === 3) {
      source.정액쾌감 = 800;
      source[0] = Math.floor(source[0] * 1.30);
      source[3] = Math.floor(source[3] * 1.30);
      source[1] = Math.floor(source[1] * 1.30);
      source[2] = Math.floor(source[2] * 1.30);
    } else if (abl31 === 4) {
      source.정액쾌감 = 1500;
      source[0] = Math.floor(source[0] * 1.50);
      source[3] = Math.floor(source[3] * 1.50);
      source[1] = Math.floor(source[1] * 1.50);
      source[2] = Math.floor(source[2] * 1.50);
    } else {
      source.정액쾌감 = 2500;
      source[0] = Math.floor(source[0] * 1.70);
      source[3] = Math.floor(source[3] * 1.70);
      source[1] = Math.floor(source[1] * 1.50);
      source[2] = Math.floor(source[2] * 1.50);
    }

    // 공개や야외のときは, ABL:노출벽とTALENT:노출광をみる (라인 851-905)
    if (context.equipment[53] || context.equipment[54]) {
      const abl17 = context.abilities[17] || 0;

      if (abl17 === 0) {
        source.정액쾌감 += 0;
        // 모든 쾌감 * 1.00 (변경 없음)
        source[11] = Math.floor(source[11] * 1.00);
      } else if (abl17 === 1) {
        source.정액쾌감 += 100;
        source[0] = Math.floor(source[0] * 1.10);
        source[3] = Math.floor(source[3] * 1.10);
        source[1] = Math.floor(source[1] * 1.10);
        source[2] = Math.floor(source[2] * 1.10);
        source[11] = Math.floor(source[11] * 1.20);
      } else if (abl17 === 2) {
        source.정액쾌감 += 300;
        source[0] = Math.floor(source[0] * 1.20);
        source[3] = Math.floor(source[3] * 1.20);
        source[1] = Math.floor(source[1] * 1.20);
        source[2] = Math.floor(source[2] * 1.20);
        source[11] = Math.floor(source[11] * 1.40);
      } else if (abl17 === 3) {
        source.정액쾌감 += 800;
        source[0] = Math.floor(source[0] * 1.30);
        source[3] = Math.floor(source[3] * 1.30);
        source[1] = Math.floor(source[1] * 1.30);
        source[2] = Math.floor(source[2] * 1.30);
        source[11] = Math.floor(source[11] * 1.60);
      } else if (abl17 === 4) {
        source.정액쾌감 += 1500;
        source[0] = Math.floor(source[0] * 1.50);
        source[3] = Math.floor(source[3] * 1.50);
        source[1] = Math.floor(source[1] * 1.50);
        source[2] = Math.floor(source[2] * 1.50);
        source[11] = Math.floor(source[11] * 2.00);
      } else {
        source.정액쾌감 += 2500;
        source[0] = Math.floor(source[0] * 1.70);
        source[3] = Math.floor(source[3] * 1.70);
        source[1] = Math.floor(source[1] * 1.70);
        source[2] = Math.floor(source[2] * 1.70);
        source[11] = Math.floor(source[11] * 3.00);
      }

      // TALENT:노출광 (라인 897-904)
      if (context.talents[89]) {
        source.정액쾌감 += 500;
        source[0] = Math.floor(source[0] * 1.20);
        source[3] = Math.floor(source[3] * 1.20);
        source[1] = Math.floor(source[1] * 1.20);
        source[2] = Math.floor(source[2] * 1.20);
        source[11] = Math.floor(source[11] * 1.50);
      }
    }

    // 陰毛を生やす設定で제모状態 (라인 907-909)
    if (context.flags[36] && !context.talents[125] && (context.charFlags[6] || 0) <= 5) {
      source[11] = Math.floor(source[11] * 2.00);
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

    // 獣姦の場合は汚れ7で固定
    if (context.equipment[89]) {
      Y = 7;
    }

    if (context.talents[61]) Y = Math.floor(Y / 3);
    if (context.talents[62]) Y = Math.floor(Y * 2);

    return Y;
  },

  // 사정 게이지 계산 (라인 912-997)
  async calculateEjaculationGauge(context: TrainingContext): Promise<void> {
    let B = 0;

    // ABL:기교をみる (라인 916-929)
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

    // ABL:従順をみる (라인 931-944)
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

    // ABL:봉사기술をみる (라인 946-959)
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

    // ABL:정액중독をみる (라인 961-974)
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

    // TALENT:혀놀림をみる (라인 976-978)
    if (context.talents[52]) {
      B = Math.floor(B * 2.00);
    }

    // プレイヤーのABL:C감각をみる (라인 980-993)
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

    // BASE:PLAYER:2 증가 (라인 995-996)
    if (context.playerTalents[119] || context.playerTalents[122] || context.playerTalents[121]) {
      context.playerBase[2] = (context.playerBase[2] || 0) + B;
    }
  },

  // 사정 체크 (라인 999-1082)
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
      // 사정している (라인 1014)
      source[5] = Math.floor(source[5] * 3.00);

      // ABL:정액중독をみる (라인 1016-1042)
      const abl32 = context.abilities[32] || 0;
      if (abl32 === 0) {
        source.정액쾌감 = 0;
        source[4] = Math.floor(source[4] * 2.00);
        source[9] = Math.floor(source[9] * 4.00);
      } else if (abl32 === 1) {
        source.정액쾌감 = 500;
        source[4] = Math.floor(source[4] * 3.00);
        source[9] = Math.floor(source[9] * 3.00);
      } else if (abl32 === 2) {
        source.정액쾌감 = 1200;
        source[4] = Math.floor(source[4] * 4.00);
        source[9] = Math.floor(source[9] * 2.50);
      } else if (abl32 === 3) {
        source.정액쾌감 = 3000;
        source[4] = Math.floor(source[4] * 6.00);
        source[9] = Math.floor(source[9] * 2.00);
      } else if (abl32 === 4) {
        source.정액쾌감 = 6000;
        source[4] = Math.floor(source[4] * 9.00);
        source[9] = Math.floor(source[9] * 1.50);
      } else {
        source.정액쾌감 = 12000;
        source[4] = Math.floor(source[4] * 15.00);
        source[9] = Math.floor(source[9] * 1.00);
      }
    }

    // 대량사정 (라인 1044-1064)
    if (E === 2) {
      source.정액쾌감 = Math.floor(source.정액쾌감 * 2.00);
      source[4] = Math.floor(source[4] * 1.50);

      context.playerExp[3] = (context.playerExp[3] || 0) + 2;
      context.exp[20] = (context.exp[20] || 0) + 9;
      context.showMessage('대량사정⚡');
      context.showMessage('정액경험 +9');

      // 精液汚れ (라인 1055-1056)
      context.playerStain[2] = (context.playerStain[2] || 0) | 4;

      context.playerBase[2] -= EJAC * 2;
      if (context.playerBase[2] >= EJAC) {
        context.playerBase[2] = EJAC - 1;
      }

      // 口で사정させたフラグ (라인 1062-1063)
      context.tflags[0] = 2;
    } else if (E === 1) {
      // 통상 사정 (라인 1065-1081)
      context.playerExp[3] = (context.playerExp[3] || 0) + 1;
      context.exp[20] = (context.exp[20] || 0) + 3;
      context.showMessage('사정⚡');
      context.showMessage('정액경험 +3');

      // 精液汚れ (라인 1072-1073)
      context.playerStain[2] = (context.playerStain[2] || 0) | 4;

      context.playerBase[2] -= EJAC;
      if (context.playerBase[2] >= EJAC) {
        context.playerBase[2] = EJAC - 1;
      }

      // 口で사정させたフラグ (라인 1079-1080)
      context.tflags[0] = 1;
    }
  },

  // 汚れ 처리 (라인 1084-1114)
  async handleStains(context: TrainingContext): Promise<void> {
    // 奴隷の口⇔調교者のPの汚れが移動 (라인 1086-1088)
    context.stain[0] = (context.stain[0] || 0) | (context.playerStain[2] || 0);
    context.playerStain[2] = (context.playerStain[2] || 0) | (context.stain[0] || 0);

    // 奴隷의 指⇔奴隷のBの汚れが移동 (라인 1090-1092)
    context.stain[1] = (context.stain[1] || 0) | (context.stain[5] || 0);
    context.stain[5] = (context.stain[5] || 0) | (context.stain[1] || 0);

    // 奴隷의 指⇔奴隷のVの汚れが移動 (라인 1094-1096)
    context.stain[1] = (context.stain[1] || 0) | (context.stain[3] || 0);
    context.stain[3] = (context.stain[3] || 0) | (context.stain[1] || 0);

    // 샤워자위の場合汚れをリセット, 潤滑更に半分。 (라인 1098-1106)
    if (context.equipment[18] === 1) {
      context.stain[1] = 0;
      context.stain[2] = 2;
      context.stain[3] = 1;
      context.stain[4] = 8;
      context.params[3] = Math.floor((context.params[3] || 0) / 2);
    }

    // 봉사정신LV2以上, 기교LV2以上なら汚れをなめ取る (라인 1108-1113)
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

  // 경험 상승 (라인 1116-1169)
  async gainExperience(context: TrainingContext): Promise<void> {
    // 이성애/동성애 경험 (라인 1118-1126)
    if (!context.talents[122] && !context.playerTalents[122]) {
      context.exp[40] = (context.exp[40] || 0) + 7;
      context.showMessage('이성애경험 +7');
    } else if (context.talents[122] && context.playerTalents[122]) {
      context.exp[41] = (context.exp[41] || 0) + 7;
      context.showMessage('동성애경험 +7');
    }

    // 애정경험 판정 (라인 1128-1129)
    if (context.assiPlay === 0 && (context.exp[0] || 0) >= 3000000) {
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    let E = 0;
    if (context.talents[122]) {
      E = 2;
    } else {
      E = 1;
    }

    // 첫 키스 (라인 1136-1162) - 매우 복잡한 CSTR:1 설정
    if ((context.charFlags[16] || 0) === -1) {
      context.charFlags[16] = 1;
      context.showMessage('첫 키스');
      context.charFlags[16] = 1;

      // 복잡한 조건 분기 (라인 1143-1161)
      const noTarget = context.targetNo || 0;
      const noPlayer = context.playerNo || 0;

      if (noTarget === 1 && noPlayer === 0 && !context.talents[432] && !context.talents[76]) {
        context.charStrings[1] = `오빠의 ${context.charStrings[80] || ''}`;
      } else if (noTarget === 1 && noPlayer === 0 && !context.talents[432] && context.talents[76]) {
        context.charStrings[1] = `오빠의 ${context.charStrings[80] || ''}`;
      } else if (noTarget === 1 && noPlayer === 0 && context.talents[432]) {
        context.charStrings[1] = `형님의 ${context.charStrings[80] || ''}`;
      } else if (!context.talents[122] && !context.talents[432] && !context.talents[76]) {
        context.charStrings[1] = `${context.playerCallName || ''}의 ${context.charStrings[80] || ''}`;
      } else if (!context.talents[122] && !context.talents[432] && context.talents[76]) {
        context.charStrings[1] = `${context.playerCallName || ''}의 ${context.charStrings[80] || ''}`;
      } else if (!context.talents[122] && context.talents[432]) {
        context.charStrings[1] = `${context.playerCallName || ''}의 ${context.charStrings[80] || ''}`;
      } else if (context.talents[122] && !context.talents[413]) {
        context.charStrings[1] = `${context.playerCallName || ''}의 ${context.charStrings[80] || ''}`;
      } else if (context.talents[122] && context.talents[413]) {
        context.charStrings[1] = `${context.playerCallName || ''}의 ${context.charStrings[80] || ''}`;
      } else {
        context.charStrings[1] = `${context.playerCallName || ''}의 ${context.charStrings[80] || ''}`;
      }
    }

    // 애정경험 (라인 1163-1167)
    if ((context.charFlags[2] || 0) >= 1000 && context.assiPlay === 0) {
      context.exp[23] = (context.exp[23] || 0) + E;
      context.showMessage(`애정경험 +${E}`);
    }
    E = 0;
  },

  async generateMessage(context: TrainingContext): Promise<void> {
    context.showMessage('펠라치오와 자위를 동시에 수행한다.');
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
