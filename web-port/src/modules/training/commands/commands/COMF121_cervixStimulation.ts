import { TrainingContext, SourceValues, CommandPlugin } from '../../types';
import { VaginaSexHandler } from '../common/VaginaSexHandler';

/**
 * COMF121: 삽입자궁구자극 (Cervix Stimulation during Insertion)
 * 원본: ERB/指導関係/COMF121.ERB
 *
 * 질 삽입 중 자궁구를 집중적으로 자극하는 테크닉
 * PREVCOM=34 (승마)에서 파생되면 "승마자궁구고문"으로 표시
 * PREVCOM=612 (난란 보탄)에서 파생되면 추가 SOURCE 증폭
 * 전방향 삽입(정상위/대면좌위/기승위)에서만 C쾌감 발생
 */
export const comf121CervixStimulation: CommandPlugin = {
  id: 121,
  name: '삽입자궁구자극',
  category: '삽입',
  staminaCost: 50,

  isAvailable(context: TrainingContext): boolean {
    // COMABLE.ERB에 정의
    if (context.talents[122]) return false; // 남성 불가

    const cflag40 = context.charFlags[40] || 0;
    if (cflag40 & 17) return false; // 하의/팬티 착용 시 불가

    return true;
  },

  calculateSource(context: TrainingContext): SourceValues {
    const source: number[] = new Array(19).fill(0);

    // 원본 라인 4-416: @COM121 전체 로직

    const prevCom = context.prevCom || 0;

    // 라인 29-37: 기력/체력 소모
    if (prevCom === 34) {
      context.loseBase[0] = (context.loseBase[0] || 0) + 60;
      context.loseBase[1] = (context.loseBase[1] || 0) + 150;
      source[10] = 900;
    } else {
      context.loseBase[0] = (context.loseBase[0] || 0) + 50;
      context.loseBase[1] = (context.loseBase[1] || 0) + 100;
      source[10] = 400;
    }

    // 라인 39: SOURCE:0 초기화
    source[0] = 0;

    // 라인 41-57: 전방향 삽입인 경우만 C쾌감
    if (prevCom === 20 || prevCom === 22 || prevCom === 34) {
      const abl0 = context.abilities[0] || 0;
      const cSenseValues = [20, 100, 400, 900, 1400, 2100];
      source[0] = cSenseValues[Math.min(abl0, 5)];
    }

    // 라인 59-78: ABL:2 (V감각) 기반
    const abl2 = context.abilities[2] || 0;
    const vSenseValues = [
      { 쾌V: 10, 윤활: 100 },
      { 쾌V: 30, 윤활: 180 },
      { 쾌V: 400, 윤활: 250 },
      { 쾌V: 800, 윤활: 380 },
      { 쾌V: 2700, 윤활: 500 },
      { 쾌V: 3800, 윤활: 800 }
    ];
    source[1] = vSenseValues[Math.min(abl2, 5)].쾌V;
    source[6] = vSenseValues[Math.min(abl2, 5)].윤활;

    // 라인 80-99: EXP:0 (V경험) 보정
    const exp0 = context.exp[0] || 0;
    const explv = [0, 100, 500, 2000, 10000, 50000];

    if (exp0 < explv[1]) {
      source[1] *= 0.20;
      source[12] = 300;
    } else if (exp0 < explv[2]) {
      source[1] *= 0.60;
      source[12] = 100;
    } else if (exp0 < explv[3]) {
      source[1] *= 1.00;
      source[12] = 10;
    } else if (exp0 < explv[4]) {
      source[1] *= 1.20;
      source[12] = 0;
    } else if (exp0 < explv[5]) {
      source[1] *= 1.30;
      source[12] = 0;
    } else {
      source[1] *= 1.80;
      source[12] = 0;
    }

    // 라인 101-121: PALAM:3 (윤활) 보정
    const palam3 = context.params[3] || 0;
    const palamlv = [0, 10000, 30000, 100000, 300000, 1000000];

    if (palam3 < palamlv[1]) {
      source[0] *= 0.50;
      source[12] = (source[12] || 0) * 0.10 + 1000;
      source[12] *= 3.00;
    } else if (palam3 < palamlv[2]) {
      source[0] *= 0.60;
      source[12] = (source[12] || 0) * 0.40 + 300;
      source[12] *= 1.00;
    } else if (palam3 < palamlv[3]) {
      source[1] *= 1.00;
      source[12] *= 0.50;
    } else if (palam3 < palamlv[4]) {
      source[1] *= 1.40;
      source[12] *= 0.20;
    } else {
      source[1] *= 1.80;
      source[12] *= 0.10;
    }

    // 라인 123-131: 체위별 효과 보정
    if (prevCom === 22) {
      // 대면좌위 - 효과 높음
      source[1] *= 1.30;
      source[6] *= 1.10;
    } else if (prevCom === 23) {
      // 배면좌위 - 효과 낮음
      source[1] *= 0.70;
      source[6] *= 0.90;
    }

    // 라인 133-135: 플레이어가 남성
    if (context.playerTalents[122]) {
      source[1] *= 2.50;
    }

    // 라인 137-139: 소형 체형
    if (context.talents[100]) {
      source[12] *= 2.00;
    }

    // 라인 141-160: 정조관념 처리
    if (context.talents[30]) {
      // 정조관념
      if (context.talents[0] === 1) {
        // 처녀
        source[6] *= 0.60;
        source[7] = (source[7] || 0) * 5.00;
        source[14] = 2000;
      } else {
        source[6] *= 0.60;
        source[14] = 1000;
      }
    } else if (context.talents[31]) {
      // 정조무관심
      if (context.talents[0] === 1) {
        source[6] *= 0.60;
        source[14] = 300;
      }
    } else {
      // 일반
      if (context.talents[0] === 1) {
        source[14] = 3000;
      }
    }

    // 라인 162-183: PALAM:5 (욕정) 보정
    const palam5 = context.params[5] || 0;

    if (palam5 < palamlv[1]) {
      source[0] *= 0.60;
      source[1] *= 0.60;
      source[6] *= 0.30;
    } else if (palam5 < palamlv[2]) {
      source[0] *= 0.80;
      source[1] *= 0.80;
      source[6] *= 0.60;
    } else if (palam5 < palamlv[3]) {
      source[0] *= 1.00;
      source[1] *= 1.00;
      source[6] *= 1.00;
    } else if (palam5 < palamlv[4]) {
      source[0] *= 1.20;
      source[1] *= 1.20;
      source[6] *= 1.50;
    } else {
      source[0] *= 1.50;
      source[1] *= 1.50;
      source[6] *= 1.80;
    }

    // 라인 185-216: ABL:10 (종순) 보정
    const abl10 = context.abilities[10] || 0;

    if (abl10 === 0) {
      source[0] *= 0.50;
      source[1] *= 0.50;
      source[6] *= 0.60;
      if (source[14]) source[14] *= 2.00;
    } else if (abl10 === 1) {
      source[0] *= 0.80;
      source[1] *= 0.80;
      source[6] *= 0.80;
      if (source[14]) source[14] *= 1.50;
    } else if (abl10 === 2) {
      source[0] *= 1.00;
      source[1] *= 1.00;
      source[6] *= 1.00;
      if (source[14]) source[14] *= 1.00;
    } else if (abl10 === 3) {
      source[0] *= 1.20;
      source[1] *= 1.30;
      source[6] *= 1.20;
      if (source[14]) source[14] *= 0.80;
    } else if (abl10 === 4) {
      source[0] *= 1.40;
      source[1] *= 1.60;
      source[6] *= 1.40;
      if (source[14]) source[14] *= 0.60;
    } else {
      source[0] *= 1.60;
      source[1] *= 2.00;
      source[6] *= 1.60;
      if (source[14]) source[14] *= 0.30;
    }

    // 라인 218-265: 승마(PREVCOM=34)에서 파생
    if (prevCom === 34) {
      const abl13 = context.abilities[13] || 0;

      // 라인 219-244: ABL:13 (봉사기술)
      const serviceValues = [
        { 쾌C: 200, 습득: 300, 굴종: 50 },
        { 쾌C: 250, 습득: 100, 굴종: 200 },
        { 쾌C: 350, 습득: 30, 굴종: 550 },
        { 쾌C: 450, 습득: 0, 굴종: 900 },
        { 쾌C: 600, 습득: 0, 굴종: 1500 },
        { 쾌C: 750, 습득: 0, 굴종: 2200 }
      ];

      const serviceVal = serviceValues[Math.min(abl13, 5)];
      source[0] = (source[0] || 0) + serviceVal.쾌C;
      source[10] = serviceVal.습득;
      source[7] = (source[7] || 0) + serviceVal.굴종;

      // 라인 245-264: ABL:12 (기교)
      const abl12 = context.abilities[12] || 0;

      if (abl12 === 0) {
        source[1] *= 0.30;
        source[6] *= 0.30;
      } else if (abl12 === 1) {
        source[1] *= 0.60;
        source[6] *= 0.60;
      } else if (abl12 === 2) {
        source[1] *= 1.00;
        source[6] *= 1.00;
      } else if (abl12 === 3) {
        source[1] *= 1.10;
        source[6] *= 1.10;
      } else if (abl12 === 4) {
        source[1] *= 1.30;
        source[6] *= 1.20;
      } else {
        source[1] *= 1.50;
        source[6] *= 1.40;
      }
    }

    // 라인 267-411: 난란 보탄(PREVCOM=612)에서 파생
    if (prevCom === 612) {
      const abl1 = context.abilities[1] || 0;

      // 라인 269-294: ABL:1 (B감각)
      const bSenseValues = [
        { 쾌B: 50, 윤활: 50, 쾌C2: 50 },
        { 쾌B: 200, 윤활: 200, 쾌C2: 200 },
        { 쾌B: 500, 윤활: 500, 쾌C2: 400 },
        { 쾌B: 1000, 윤활: 600, 쾌C2: 600 },
        { 쾌B: 1600, 윤활: 1000, 쾌C2: 1000 },
        { 쾌B: 2100, 윤활: 1400, 쾌C2: 1400 }
      ];

      const bSenseVal = bSenseValues[Math.min(abl1, 5)];
      source[3] = (source[3] || 0) + bSenseVal.쾌B;
      source[6] = (source[6] || 0) + bSenseVal.윤활;
      source[0] = (source[0] || 0) + bSenseVal.쾌C2;

      // 라인 296-315: ABL:0 (C감각)
      const abl0 = context.abilities[0] || 0;
      const cSenseValues = [
        { 쾌C: 40, 쾌C2: 50 },
        { 쾌C: 160, 쾌C2: 200 },
        { 쾌C: 700, 쾌C2: 400 },
        { 쾌C: 1500, 쾌C2: 600 },
        { 쾌C: 2400, 쾌C2: 1000 },
        { 쾌C: 3600, 쾌C2: 1400 }
      ];

      const cSenseVal = cSenseValues[Math.min(abl0, 5)];
      source[0] = (source[0] || 0) + cSenseVal.쾌C;
      source[0] = (source[0] || 0) + cSenseVal.쾌C2;

      // 라인 317-372: 플레이어 ABL:12 (기교)
      const playerAbl12 = context.playerAbilities[12] || 0;
      const playerTechValues = [
        { 쾌C: 100, 쾌V: 100, 쾌B: 50, 윤활: 100, 쾌C2: 50, 공포: 0, 반감: 0, A: 0 },
        { 쾌C: 200, 쾌V: 200, 쾌B: 150, 윤활: 150, 쾌C2: 100, 공포: 50, 반감: 100, A: 0 },
        { 쾌C: 300, 쾌V: 300, 쾌B: 250, 윤활: 200, 쾌C2: 200, 공포: 100, 반감: 200, A: 50 },
        { 쾌C: 500, 쾌V: 400, 쾌B: 500, 윤활: 300, 쾌C2: 300, 공포: 150, 반감: 300, A: 100 },
        { 쾌C: 800, 쾌V: 500, 쾌B: 800, 윤활: 500, 쾌C2: 400, 공포: 250, 반감: 400, A: 300 },
        { 쾌C: 1200, 쾌V: 600, 쾌B: 1200, 윤활: 800, 쾌C2: 600, 공포: 400, 반감: 500, A: 500 }
      ];

      const playerTechVal = playerTechValues[Math.min(playerAbl12, 5)];
      source[0] = (source[0] || 0) + playerTechVal.쾌C;
      source[1] = (source[1] || 0) + playerTechVal.쾌V;
      source[3] = (source[3] || 0) + playerTechVal.쾌B;
      source[6] = (source[6] || 0) + playerTechVal.윤활;
      source[0] = (source[0] || 0) + playerTechVal.쾌C2;
      source[13] = (source[13] || 0) + playerTechVal.공포;
      source[14] = (source[14] || 0) + playerTechVal.반감;

      let A = playerTechVal.A;

      // 라인 374-399: ABL:17 (노출벽) - 원본은 ABL:17이지만 문맥상 ABL:14로 추정
      const abl17 = context.abilities[17] || 0;
      const exhibitionValues = [
        { 반항심: 100, 공포: 100, mult: 0.60 },
        { 반항심: 200, 공포: 200, mult: 1.00 },
        { 반항심: 400, 공포: 400, mult: 1.50 },
        { 반항심: 700, 공포: 700, mult: 2.40 },
        { 반항심: 1200, 공포: 1200, mult: 3.60 },
        { 반항심: 2000, 공포: 2000, mult: 5.80 }
      ];

      const exhVal = exhibitionValues[Math.min(abl17, 5)];
      source.반항심 = (source.반항심 || 0) + exhVal.반항심;
      source[13] = (source[13] || 0) + exhVal.공포;
      A *= exhVal.mult;

      // 라인 401-406: A 추가
      source[0] = (source[0] || 0) + A;
      source[1] = (source[1] || 0) + A;
      source[6] = (source[6] || 0) + A;

      if (exp0 >= explv[3]) {
        source[1] = (source[1] || 0) + A;
      }

      // 라인 408-410: TALENT:85 (애인)
      if (context.talents[85]) {
        source[6] *= 2.00;
      }
    }

    return source;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 1-416

    const prevCom = context.prevCom || 0;

    // 라인 6-13: 커맨드명 설정
    context.tflags[42] = 0;

    if (prevCom === 34) {
      context.showMessage('승마자궁구고문');
      context.saveString[0] = '승마자궁구고문';
    } else {
      context.showMessage('삽입자궁구자극');
      context.saveString[0] = '삽입자궁구자극';
    }

    // 라인 15: SELECTCOM
    context.selectCom = 121;

    // CALL TRAIN_MESSAGE_B

    // 라인 18-21: V경험 플래그
    context.tflags[19] = 1;
    if (context.talents[85] && context.assiPlay === 0 && (context.exp[0] || 0) === 0) {
      context.tflags[20] = 1;
    }

    // 라인 23-24: 플레이어 사정 체크
    await this.checkPlayerEjaculation(context);

    // SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    this.applySource(context, source);

    // 라인 413-414: 질내삽입 후처리
    await VaginaSexHandler.afterVaginaSex(context);
  },

  async checkPlayerEjaculation(context: TrainingContext): Promise<void> {
    // CALL COM_EJAC_PLAYER_SEX
  },

  generateMessage(context: TrainingContext): string {
    const prevCom = context.prevCom || 0;

    if (prevCom === 34) {
      return `${context.target.name}의 자궁구를 집중적으로 짓누르며 고문하듯 자극한다……`;
    } else if (prevCom === 612) {
      return `난란 보탄 자세에서 ${context.target.name}의 자궁구를 집중 공략한다!`;
    }

    return `${context.target.name}의 질 깊숙이 들어가 자궁구를 직접 자극한다……`;
  }
};
