import { TrainingContext, SourceValues, CommandPlugin } from '../../types';

/**
 * COMF100: 촉수소환 (Tentacles Summon)
 * 원본: ERB/指導関係/COMF100.ERB
 *
 * 촉수를 소환하여 장착/해제하는 특수 커맨드
 * 장착 시 공포/굴복 증가, 장비 중에는 모든 쾌감 배율 증가
 */
export const comf100TentaclesSummon: CommandPlugin = {
  id: 100,
  name: '촉수소환',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    return true; // 항상 사용 가능 (착탈 토글)
  },

  calculateSource(context: TrainingContext): SourceValues {
    const source: number[] = new Array(19).fill(0);

    // 원본 라인 2-62: @COM100 메인 로직

    return source; // 토글 커맨드는 calculateSource 사용 안 함
  },

  /**
   * 촉수 장착 중 SOURCE 계산
   * 원본: COMF100.ERB 라인 65-277 (@EQUIP_COM100)
   */
  static calculateEquippedSource(context: TrainingContext): SourceValues {
    const source: number[] = new Array(19).fill(0);

    // 라인 69-82: EXP:55 (촉수경험) 기반 공포 배율
    let A = 100;
    const exp55 = context.exp[55] || 0;
    const explv = [0, 100, 500, 2000, 10000, 50000]; // EXPLV 근사치

    if (exp55 < explv[1]) {
      A *= 3.00;
    } else if (exp55 < explv[2]) {
      A *= 2.50;
    } else if (exp55 < explv[3]) {
      A *= 2.00;
    } else if (exp55 < explv[4]) {
      A *= 1.00;
    } else if (exp55 < explv[5]) {
      A *= 0.80;
    } else {
      A *= 0.60;
    }

    // 라인 84-90: 소질 보정
    if (context.talents[10]) { // 겁쟁이
      A *= 2.00;
    }

    if (context.talents[22]) { // 감정부족
      A *= 0.60;
    }

    if (context.talents[76]) { // 음란
      A *= 0.50;
    }

    // 라인 96-103: 묘판 (TALENT:137) 보정
    if (context.talents[137]) {
      if (source[1]) source[1] *= 1.20;
      if (source[0]) source[0] *= 1.20;
      if (source[7]) source[7] *= 1.20;
      if (source.반항심) source.반항심 *= 2.00;
      if (source[13]) source[13] *= 3.00;
    }

    // 라인 105-117: ABL:41 (촉수내성?) 보정
    const abl41 = context.abilities[41] || 0;
    if (abl41 <= 1) {
      A *= 1.00;
    } else if (abl41 <= 2) {
      A *= 0.90;
    } else if (abl41 <= 3) {
      A *= 0.80;
    } else if (abl41 <= 4) {
      A *= 0.70;
    } else if (abl41 <= 5) {
      A *= 0.60;
    } else {
      A *= 0.50;
    }

    // 라인 119-124: 기력/체력/공포/불결 추가
    const loseBase0 = Math.floor(A);
    const loseBase1 = Math.floor(A * 2);
    context.loseBase[0] = (context.loseBase[0] || 0) + loseBase0;
    context.loseBase[1] = (context.loseBase[1] || 0) + loseBase1;

    source[13] = (source[13] || 0) + Math.floor(A * 20);
    source[17] = (source[17] || 0) + Math.floor(A * 10);
    source[7] = (source[7] || 0) + Math.floor(A * 5);

    // 라인 126-127: 촉수 윤활 (고정값)
    source[6] = (source[6] || 0) + 2000;

    // 라인 129-133: 모든 쾌감 배율 증가
    if (source[0]) source[0] *= 2.00;
    if (source[1]) source[1] *= 2.00;
    if (source[2]) source[2] *= 2.00;
    if (source[3]) source[3] *= 2.00;
    if (source[7]) source[7] *= 1.80;

    return source;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 1-63: @COM100 메인 로직

    context.showMessage(`${context.commandName}`);
    context.saveString[0] = '촉수소환';
    // CALL TRAIN_MESSAGE_B는 메시지 생성 시스템에서 처리

    // 라인 8-60: 촉수 착탈 토글
    if (context.equipment[90]) {
      // 촉수 해제
      context.equipment[90] = 0;

      // 라인 11-28: 모든 촉수 관련 장비 해제
      context.equipment[11] = 0; // 촉수 삽입 (바이브)
      context.equipment[13] = 0; // 애널촉수 (애널바이브)
      context.equipment[14] = 0; // 촉수 클리자극 (클리캡)
      context.equipment[15] = 0; // 촉수 유두자극 (니플캡)
      context.equipment[16] = 0; // 촉수 착유 (착유기)
      context.equipment[17] = 0; // 촉수 페니스자극 (오나홀)
      context.equipment[44] = 0; // 촉수 긴박 (밧줄)
      context.equipment[46] = 0; // 촉수 관장 (관장기)
      context.equipment[98] = 0; // 촉수 구욕

      context.showMessage('촉수를 해제했다.');

    } else {
      // 촉수 장착
      context.equipment[90] = 1;

      // 라인 33-59: EXP:55 기반 공포/굴복 계산
      let A = 100;
      const exp55 = context.exp[55] || 0;
      const explv = [0, 100, 500, 2000, 10000, 50000];

      if (exp55 < explv[1]) {
        A *= 3.00;
      } else if (exp55 < explv[2] / 2) { // 원본 라인 36
        A *= 2.50;
      } else if (exp55 < explv[3] / 2) {
        A *= 2.00;
      } else if (exp55 < explv[4] / 2) {
        A *= 1.00;
      } else if (exp55 < explv[5] / 2) {
        A *= 0.80;
      } else {
        A *= 0.60;
      }

      // 라인 48-53: 소질 보정
      if (context.talents[10]) { // 겁쟁이
        A *= 2.00;
      }

      if (context.talents[22]) { // 감정부족
        A *= 0.60;
      }

      // 라인 55-59: 기력/체력/공포/굴종
      context.loseBase[0] = (context.loseBase[0] || 0) + Math.floor(A);
      context.loseBase[1] = (context.loseBase[1] || 0) + Math.floor(A * 2);

      const source: number[] = new Array(19).fill(0);
      source[13] = Math.floor(A * 20);
      source[7] = Math.floor(A * 5);

      this.applySource(context, source);

      context.showMessage('촉수를 소환하여 장착했다!');
    }

    // 라인 61-62
    context.tflags[0] = 0; // T = 0

    // 장착 상태라면 @EQUIP_COM100이 매 턴 실행됨
  },

  generateMessage(context: TrainingContext): string {
    // 메시지 생성 로직
    if (context.equipment[90]) {
      return `촉수가 ${context.target.name}의 몸을 감싸기 시작했다……`;
    } else {
      return `촉수가 ${context.target.name}의 몸에서 물러났다.`;
    }
  }
};

/**
 * COMF101-109: 촉수 관련 서브 커맨드
 * 원본: COMF100.ERB 라인 279-458
 */

// @COM101: 촉수바이브 → COM11로 점프
export const comf101TentaclesVibrator: CommandPlugin = {
  id: 101,
  name: '촉수바이브',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    return context.equipment[90] === 1; // 촉수 장착 중에만
  },

  calculateSource(context: TrainingContext): SourceValues {
    return {}; // COM11로 위임
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 280-282: JUMP COM11
    // TypeScript에서는 COM11 실행으로 위임
    const { comf11Vibrator } = await import('./COMF11_vibrator');
    await comf11Vibrator.execute(context);
  }
};

// @COM102: 애널촉수 → COM13로 점프
export const comf102TentaclesAnal: CommandPlugin = {
  id: 102,
  name: '애널촉수',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    return context.equipment[90] === 1;
  },

  calculateSource(context: TrainingContext): SourceValues {
    return {};
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 285-287: JUMP COM13
    const { comf13AnalVibrator } = await import('./COMF13_analVibrator');
    await comf13AnalVibrator.execute(context);
  }
};

// @COM103: 촉수 클리자극 → COM14로 점프
export const comf103TentaclesClitoris: CommandPlugin = {
  id: 103,
  name: '촉수 클리자극',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    return context.equipment[90] === 1;
  },

  calculateSource(context: TrainingContext): SourceValues {
    return {};
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 290-292
    const { comf14ClitCap } = await import('./COMF14_clitCap');
    await comf14ClitCap.execute(context);
  }
};

// @COM104: 촉수 유두자극 → COM15로 점프
export const comf104TentaclesNipple: CommandPlugin = {
  id: 104,
  name: '촉수 유두자극',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    return context.equipment[90] === 1;
  },

  calculateSource(context: TrainingContext): SourceValues {
    return {};
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 295-297
    const { comf15NippleCap } = await import('./COMF15_nippleCap');
    await comf15NippleCap.execute(context);
  }
};

// @COM105: 촉수 착유 → COM16로 점프
export const comf105TentaclesMilking: CommandPlugin = {
  id: 105,
  name: '촉수 착유',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    return context.equipment[90] === 1;
  },

  calculateSource(context: TrainingContext): SourceValues {
    return {};
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 300-302
    const { comf16MilkingMachine } = await import('./COMF16_milkingMachine');
    await comf16MilkingMachine.execute(context);
  }
};

// @COM106: 촉수 긴박 → COM44로 점프
export const comf106TentaclesBondage: CommandPlugin = {
  id: 106,
  name: '촉수 긴박',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    return context.equipment[90] === 1;
  },

  calculateSource(context: TrainingContext): SourceValues {
    return {};
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 305-307
    const { comf44Rope } = await import('./COMF44_rope');
    await comf44Rope.execute(context);
  }
};

// @COM107: 촉수 관장 → COM46로 점프
export const comf107TentaclesEnema: CommandPlugin = {
  id: 107,
  name: '촉수 관장',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    return context.equipment[90] === 1;
  },

  calculateSource(context: TrainingContext): SourceValues {
    return {};
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 310-312
    const { comf46Enema } = await import('./COMF46_enema');
    await comf46Enema.execute(context);
  }
};

// @COM108: 촉수 구욕
export const comf108TentaclesMouth: CommandPlugin = {
  id: 108,
  name: '촉수 구욕',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    return context.equipment[90] === 1;
  },

  calculateSource(context: TrainingContext): SourceValues {
    const source: number[] = new Array(19).fill(0);

    // 원본 라인 315-384: @COM108

    // 라인 333-352: ABL:16 (봉사정신) 기반
    const abl16 = context.abilities[16] || 0;
    let A = 100;

    if (abl16 === 0) {
      source[0] = 200;
      A = 100;
    } else if (abl16 === 1) {
      source[0] = 300;
      A = 200;
    } else if (abl16 === 2) {
      source[0] = 400;
      A = 400;
    } else if (abl16 === 3) {
      source[0] = 500;
      A = 600;
    } else if (abl16 === 4) {
      source[0] = 600;
      A = 800;
    } else {
      source[0] = 800;
      A = 1100;
    }

    // 라인 354-367: ABL:12 (기교) 보정
    const abl12 = context.abilities[12] || 0;
    const techMultipliers = [0.50, 0.80, 1.00, 1.20, 1.50, 2.00];
    source[0] *= techMultipliers[Math.min(abl12, 5)];

    // 라인 369-370
    source[7] = A;
    source.쾌욕 = A;

    return source;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 315-384

    context.showMessage('촉수 구욕');
    context.saveString[0] = '촉수 구욕';

    // 라인 320-321: 기력/체력
    context.loseBase[0] = (context.loseBase[0] || 0) + 80;
    context.loseBase[1] = (context.loseBase[1] || 0) + 100;

    // 라인 323-331: 첫 키스 체크
    if (context.charFlags[16] === -1) {
      context.charFlags[16] = 1;
      context.showColoredMessage('첫 키스', 0xDDBBCC);
      context.charStrings[1] = '촉수생물';
      context.tflags[135] = 1;
    }

    const source = this.calculateSource(context);
    this.applySource(context, source);

    // 라인 373-379: 촉수 구욕 착탈 토글
    if (context.equipment[98]) {
      context.equipment[98] = 0;
      context.showMessage('촉수를 입에서 뺐다.');
    } else {
      context.equipment[98] = 1;
      context.stain[0] |= 2; // 애액 오염
      context.stain[0] |= 4; // 정액 오염
      context.showMessage('촉수가 입을 침범했다!');
    }

    // 라인 382-383: 경험치
    context.exp[22] = (context.exp[22] || 0) + 1;
    context.showMessage('펠라경험 +1');
  },

  generateMessage(context: TrainingContext): string {
    if (context.equipment[98]) {
      return `촉수가 ${context.target.name}의 입을 침범하여 목 깊숙이 들어간다……`;
    }
    return '';
  }
};

/**
 * @EQUIP_COM108: 촉수 구욕 장착 중 SOURCE
 * 원본: COMF100.ERB 라인 387-441
 */
export function calculateEquippedCom108Source(context: TrainingContext): SourceValues {
  const source: number[] = new Array(19).fill(0);

  // 라인 390-396: 기력/체력
  if (context.talents[47]) { // 체력절감
    context.loseBase[0] = (context.loseBase[0] || 0) + 40;
    context.loseBase[1] = (context.loseBase[1] || 0) + 60;
  } else {
    context.loseBase[0] = (context.loseBase[0] || 0) + 80;
    context.loseBase[1] = (context.loseBase[1] || 0) + 100;
  }

  // 라인 398-417: ABL:16 (봉사정신)
  const abl16 = context.abilities[16] || 0;
  let A = 100;

  if (abl16 === 0) {
    source[0] = 200;
    A = 100;
  } else if (abl16 === 1) {
    source[0] = 300;
    A = 200;
  } else if (abl16 === 2) {
    source[0] = 400;
    A = 400;
  } else if (abl16 === 3) {
    source[0] = 500;
    A = 600;
  } else if (abl16 === 4) {
    source[0] = 600;
    A = 800;
  } else {
    source[0] = 800;
    A = 1100;
  }

  // 라인 419-432: ABL:12 (기교)
  const abl12 = context.abilities[12] || 0;
  const techMultipliers = [0.50, 0.80, 1.00, 1.20, 1.50, 2.00];
  source[0] *= techMultipliers[Math.min(abl12, 5)];

  // 라인 434-435
  source[7] = A;
  source.쾌욕 = A;

  // 라인 437-438: 경험치
  context.exp[22] = (context.exp[22] || 0) + 1;
  context.showMessage('펠라경험 +1');

  return source;
}

// @COM109: 촉수 페니스자극 → COM17로 점프
export const comf109TentaclesPenis: CommandPlugin = {
  id: 109,
  name: '촉수 페니스자극',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    return context.equipment[90] === 1;
  },

  calculateSource(context: TrainingContext): SourceValues {
    return {};
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 443-445
    const { comf17Onahole } = await import('./COMF17_onahole');
    await comf17Onahole.execute(context);
  }
};

/**
 * @SYOKUSYU_MILK: 촉수 착유 모유체질 획득
 * 원본: COMF100.ERB 라인 447-455
 */
export function checkTentaclesMilkTalent(context: TrainingContext): void {
  // B감각 3 이상 AND 모유체질 없음 AND 빈유/절벽/남성 아님
  const abl1 = context.abilities[1] || 0;
  const hasMilkTalent = context.talents[130];
  const hasSmallBreasts = context.talents[109];
  const hasFlat = context.talents[116];
  const isMale = context.talents[122];

  if (abl1 >= 3 && !hasMilkTalent && !hasSmallBreasts && !hasFlat && !isMale) {
    context.showMessage(`촉수 착유에 의해 ${context.target.name}은(는) 모유가 나오게 됐다`);
    context.talents[130] = 1; // 모유체질 획득
  }
}
