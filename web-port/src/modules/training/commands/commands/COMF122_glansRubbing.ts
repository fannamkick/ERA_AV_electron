import { TrainingContext, SourceValues, CommandPlugin } from '../../types';

/**
 * COMF122: 투구비비기 (Glans Rubbing)
 * 원본: ERB/指導関係/COMF122.ERB
 *
 * 귀두를 직접 비비는 봉사 커맨드
 * 투구비비기는 더러움의 영향이 적음 (1/3)
 * 실행치 20으로 낮음
 */
export const comf122GlansRubbing: CommandPlugin = {
  id: 122,
  name: '투구비비기',
  category: '봉사',
  staminaCost: 30,

  isAvailable(context: TrainingContext): boolean {
    // 원본 라인 9-196 전체 포팅

    let A = 0;
    let S = 0;

    // 라인 14-16: COM_ORDER 호출 (공통 요소)
    // TypeScript에서는 별도 함수로 구현 필요

    // 라인 18-26: ABL:11 (욕망)
    const abl11 = context.abilities[11] || 0;
    if (abl11) {
      A += abl11 * 2;
      S = 1;
    }

    // 라인 27-35: ABL:16 (봉사정신)
    const abl16 = context.abilities[16] || 0;
    if (abl16) {
      A += abl16 * 4;
      S = 1;
    }

    // 라인 36-44: ABL:32 (정액중독)
    const abl32 = context.abilities[32] || 0;
    if (abl32) {
      A += abl32 * 1;
      S = 1;
    }

    // 라인 46-54: MARK:1 (쾌락각인)
    const mark1 = context.marks[1] || 0;
    if (mark1) {
      A += mark1 * 2;
      S = 1;
    }

    // 라인 57-78: PALAM:5 (욕정)
    const palam5 = context.params[5] || 0;
    const palamlv = [0, 10000, 30000, 100000, 300000, 1000000];

    let L = 0;
    if (palam5 < palamlv[1]) {
      L = 0;
    } else if (palam5 < palamlv[2]) {
      L = 1;
    } else if (palam5 < palamlv[3]) {
      L = 2;
    } else if (palam5 < palamlv[4]) {
      L = 3;
    } else if (palam5 < palamlv[5]) {
      L = 4;
    } else {
      L = 5;
    }

    if (L) {
      A += L * 3;
      S = 1;
    }

    // 라인 80-87: TALENT:35 (수줍음)
    if (context.talents[35]) {
      A -= 1;
      S = 1;
    }

    // 라인 88-95: TALENT:71 (쾌감을 부정)
    if (context.talents[71]) {
      A -= 3;
      S = 1;
    }

    // 라인 96-103: TALENT:82 (남성혐오) AND 플레이어가 남성
    if (context.talents[82] && context.playerTalents[122]) {
      A -= 7;
      S = 1;
    }

    // 라인 104-112: TALENT:85 (애인) AND 조수 아님
    if (context.talents[85] && context.assiPlay === 0) {
      A += 3;
      S = 1;
    }

    // 라인 114-122: 플레이어가 후타나리
    if (context.playerTalents[121]) {
      A += 8;
      S = 1;
    }

    // 라인 124-132: TEQUIP:21 (しあわせ草)
    if (context.equipment[21]) {
      A += 6;
      S = 1;
    }

    // 라인 134-176: 더러움 계산
    let Y = 0;

    // 라인 135-149: STAIN 비트플래그
    if (context.playerStain[2] & 1) Y += 1;  // 애액
    if (context.playerStain[2] & 4) Y += 3;  // 정액
    if (context.playerStain[2] & 8) Y += 7;  // 애널
    if (context.playerStain[2] & 16) Y += 1; // 모유
    if (context.playerStain[4] & 32) Y += 3; // 뇨

    // 라인 151-154: 악취 관련 소질
    if (context.talents[61]) Y = Math.floor(Y / 3); // 악취둔감
    if (context.talents[62]) Y *= 2; // 악취민감

    // 라인 156-157: 투구비비기는 더러움 영향 1/3
    Y = Math.floor(Y / 3);

    // 라인 159-176: 더러움 있음
    if (Y) {
      A -= Y;
      S = 1;
    }

    // 라인 178-190: 합계 표시 (20 이상으로 실행)
    const V = 20;

    return A >= V;
  },

  calculateSource(context: TrainingContext): SourceValues {
    const source: number[] = new Array(19).fill(0);

    // 원본 라인 201-519 전체 포팅

    // 라인 204-205: 기력/체력
    context.loseBase[0] = (context.loseBase[0] || 0) + 30;
    context.loseBase[1] = (context.loseBase[1] || 0) + 90;

    // 라인 207-209: 기본 SOURCE
    source[10] = 250;
    source[7] = 400;
    source.굴욕 = 300;

    // 라인 211-224: ABL:10 (종순) - 반감
    const abl10 = context.abilities[10] || 0;
    const obedienceValues = [200, 120, 60, 20, 0, 0];
    source[14] = obedienceValues[Math.min(abl10, 5)];

    // 라인 226-263: ABL:0 (C감각) - 쾌C/쾌C2/굴종/습득
    const abl0 = context.abilities[0] || 0;
    const cSenseValues = [
      { 쾌C: 20, 쾌C2: 0, 굴종: 0, 굴종2: 20, 습득Mult: 0.80 },
      { 쾌C: 80, 쾌C2: 10, 굴종: 50, 굴종2: 20, 습득Mult: 0.90 },
      { 쾌C: 350, 쾌C2: 50, 굴종: 100, 굴종2: 20, 습득Mult: 1.00 },
      { 쾌C: 750, 쾌C2: 100, 굴종: 300, 굴종2: 20, 습득Mult: 1.10 },
      { 쾌C: 1200, 쾌C2: 700, 굴종: 600, 굴종2: 20, 습득Mult: 1.20 },
      { 쾌C: 1750, 쾌C2: 2000, 굴종: 1000, 굴종2: 20, 습득Mult: 1.30 }
    ];

    const cSenseVal = cSenseValues[Math.min(abl0, 5)];
    source[0] = cSenseVal.쾌C;
    source[0] = (source[0] || 0) + cSenseVal.쾌C2;
    source[7] = (source[7] || 0) + cSenseVal.굴종;
    source[7] = (source[7] || 0) + cSenseVal.굴종2;
    source[10] *= cSenseVal.습득Mult;

    // 라인 265-290: ABL:12 (기교) - 쾌C/굴종/습득 배율
    const abl12 = context.abilities[12] || 0;
    const techMultipliers = [0.50, 0.80, 1.00, 1.10, 1.30, 1.50];

    const techMult = techMultipliers[Math.min(abl12, 5)];
    source[0] *= techMult;
    source[7] *= techMult;
    source[10] *= techMult;

    // 라인 292-311: 플레이어 ABL:0 (C감각) - 쾌C/굴종 배율
    const playerAbl0 = context.playerAbilities[0] || 0;
    const playerCSenseMultipliers = [
      { 쾌C: 0.80, 굴종: 0.50 },
      { 쾌C: 0.90, 굴종: 0.70 },
      { 쾌C: 1.00, 굴종: 1.00 },
      { 쾌C: 1.10, 굴종: 1.20 },
      { 쾌C: 1.20, 굴종: 1.40 },
      { 쾌C: 1.30, 굴종: 1.70 }
    ];

    const playerCSenseMult = playerCSenseMultipliers[Math.min(playerAbl0, 5)];
    source[0] *= playerCSenseMult.쾌C;
    source[7] *= playerCSenseMult.굴종;

    // 라인 313-332: PALAM:3 (윤활) - 쾌C/굴종 배율
    const palam3 = context.params[3] || 0;
    const palamlv = [0, 10000, 30000, 100000, 300000, 1000000];

    let lubMultiplier = { 쾌C: 1.0, 굴종: 1.0 };

    if (palam3 < palamlv[1]) {
      lubMultiplier = { 쾌C: 0.50, 굴종: 0.60 };
    } else if (palam3 < palamlv[2]) {
      lubMultiplier = { 쾌C: 0.75, 굴종: 0.80 };
    } else if (palam3 < palamlv[3]) {
      lubMultiplier = { 쾌C: 1.00, 굴종: 1.00 };
    } else if (palam3 < palamlv[4]) {
      lubMultiplier = { 쾌C: 1.50, 굴종: 1.20 };
    } else if (palam3 < palamlv[5]) {
      lubMultiplier = { 쾌C: 2.00, 굴종: 1.40 };
    } else {
      lubMultiplier = { 쾌C: 2.50, 굴종: 1.60 };
    }

    source[0] *= lubMultiplier.쾌C;
    source[7] *= lubMultiplier.굴종;

    return source;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 1-519

    context.showMessage('투구비비기');
    context.saveString[0] = '투구비비기';

    // CALL TRAIN_MESSAGE_B

    const source = this.calculateSource(context);

    // 라인 334-397: 사정 게이지 체크
    await this.calculateEjaculationGauge(context);

    // 라인 399-485: 사정 체크 및 처리
    await this.checkEjaculation(context, source);

    // SOURCE 적용
    this.applySource(context, source);

    // 라인 487-491: 레즈 경험치
    if (context.talents[122] === 0 && context.playerTalents[122] === 0) {
      context.exp[40] = (context.exp[40] || 0) + 9;
      context.showMessage('레즈경험 +9');
    }

    // 라인 493-498: 애정경험
    let E = 1;
    if (context.charFlags[2] >= 1000 && context.assiPlay === 0) {
      context.exp[23] = (context.exp[23] || 0) + E;
      context.showMessage(`애정경험 +${E}`);
    }

    // 라인 500-505: 더러움 이동
    context.stain[2] |= context.playerStain[2];
    context.playerStain[2] |= context.stain[2];

    // 라인 507-511: 백합 경험치 (여성+여성)
    if (context.talents[122] === 1) {
      context.exp[41] = (context.exp[41] || 0) + 8;
      context.showMessage('백합경험 +8');
    }

    // 라인 513-514: C감각 3 이상
    if (context.assiPlay === 0 && (context.abilities[0] || 0) >= 3) {
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    // 라인 516: TFLAG:100
    context.tflags[100] = 1;
  },

  async calculateEjaculationGauge(context: TrainingContext): Promise<void> {
    // 원본 라인 334-397: 사정 게이지 체크

    let B = 0;

    // 라인 339-352: ABL:12 (기교)
    const abl12 = context.abilities[12] || 0;
    const techGaugeValues = [1500, 2100, 2900, 4000, 5000, 6000];
    B = techGaugeValues[Math.min(abl12, 5)];

    // 라인 354-367: ABL:10 (종순)
    const abl10 = context.abilities[10] || 0;
    const obedienceMultipliers = [0.80, 0.90, 1.00, 1.10, 1.20, 1.30];
    B *= obedienceMultipliers[Math.min(abl10, 5)];

    // 라인 369-382: PALAM:3 (윤활)
    const palam3 = context.params[3] || 0;
    const palamlv = [0, 10000, 30000, 100000, 300000, 1000000];

    const lubMultipliers = [0.50, 0.80, 1.20, 1.50, 1.80, 2.40];
    let lubIndex = 0;
    if (palam3 < palamlv[1]) lubIndex = 0;
    else if (palam3 < palamlv[2]) lubIndex = 1;
    else if (palam3 < palamlv[3]) lubIndex = 2;
    else if (palam3 < palamlv[4]) lubIndex = 3;
    else if (palam3 < palamlv[5]) lubIndex = 4;
    else lubIndex = 5;

    B *= lubMultipliers[lubIndex];

    // 라인 384-397: 플레이어 ABL:0 (C감각)
    const playerAbl0 = context.playerAbilities[0] || 0;
    const playerCSenseMultipliers = [1.00, 1.50, 2.00, 2.50, 3.50, 5.00];
    B *= playerCSenseMultipliers[Math.min(playerAbl0, 5)];

    // 라인 399-400: 플레이어 성기 보유 시 BASE 증가
    if (context.playerTalents[121] || context.playerTalents[122]) {
      context.playerBase[2] = (context.playerBase[2] || 0) + Math.floor(B);
    }
  },

  async checkEjaculation(context: TrainingContext, source: SourceValues): Promise<void> {
    // 원본 라인 402-485: 사정 체크

    const S = context.playerBase[2] || 0;
    const EJAC = context.playerMaxBase[2] || 10000;

    let E = 0;
    if (S > EJAC * 2) {
      E = 2; // 대량사정
    } else if (S > EJAC) {
      E = 1; // 통상 사정
    }

    if (E) {
      // 라인 417-418: 사정 시 쾌C 3배
      source[0] *= 3.00;

      // 라인 420-445: ABL:32 (정액중독) 기반
      const abl32 = context.abilities[32] || 0;
      const semenAddictionValues = [
        { 정액쾌감: 0, 굴종Mult: 2.00, 굴복Mult: 6.00 },
        { 정액쾌감: 500, 굴종Mult: 3.00, 굴복Mult: 4.50 },
        { 정액쾌감: 1200, 굴종Mult: 4.00, 굴복Mult: 3.50 },
        { 정액쾌감: 3000, 굴종Mult: 6.00, 굴복Mult: 3.00 },
        { 정액쾌감: 6000, 굴종Mult: 9.00, 굴복Mult: 2.00 },
        { 정액쾌감: 12000, 굴종Mult: 15.00, 굴복Mult: 1.50 }
      ];

      const semenVal = semenAddictionValues[Math.min(abl32, 5)];
      source.정액쾌감 = semenVal.정액쾌감;
      source[7] *= semenVal.굴종Mult;
      source[9] = (source[9] || 0) * semenVal.굴복Mult;
    }

    // 라인 448-485: 사정 처리
    if (E === 2) {
      // 대량사정
      source.정액쾌감 *= 2.00;
      source[7] *= 1.50;

      context.playerExp[3] = (context.playerExp[3] || 0) + 2;
      context.exp[20] = (context.exp[20] || 0) + 9;
      context.showColoredMessage('대량사정⚡', 0x00ffff);
      context.showMessage('정액경험 +9');

      context.playerStain[2] |= 4; // 정액 오염

      context.playerBase[2] -= EJAC * 2;
      if (context.playerBase[2] >= EJAC) {
        context.playerBase[2] = EJAC - 1;
      }

      context.tflags[9] = 2; // 스마타로 사정시킨 플래그 유용
    } else if (E === 1) {
      // 통상 사정
      context.playerExp[3] = (context.playerExp[3] || 0) + 1;
      context.exp[20] = (context.exp[20] || 0) + 3;
      context.showColoredMessage('사정⚡', 0x00ffff);
      context.showMessage('정액경험 +3');

      context.playerStain[2] |= 4;

      context.playerBase[2] -= EJAC;
      if (context.playerBase[2] >= EJAC) {
        context.playerBase[2] = EJAC - 1;
      }

      context.tflags[9] = 1;
    }
  },

  generateMessage(context: TrainingContext): string {
    return `${context.target.name}이(가) 귀두를 직접 손으로 비빈다……`;
  }
};
