/**
 * AnalSexHandler - 애널삽입 공통 로직
 *
 * 원본: ERB/指導関係/COMF_ANALSEX.ERB
 *
 * 애널처녀 상실, 사정 처리 등 애널삽입 계열 커맨드의 공통 로직을 처리합니다.
 */

import type { TrainingContext } from '../../../../types/training';
import type { EjaculationResult } from './VaginaSexHandler';

export class AnalSexHandler {
  /**
   * 애널처녀 상실 확인
   * 원본: COMF_ANALSEX.ERB 라인 4-19
   */
  static async confirmAnalVirginity(ctx: TrainingContext): Promise<boolean> {
    // FLAG:81이 켜져 있으면 확인 없이 진행
    if (ctx.flags[81]) {
      return true;
    }

    // TALENT:2 (애널처녀) 확인
    const isAnalVirgin = ctx.talents[2] === 1;
    if (!isAnalVirgin) {
      return true;
    }

    // 애널처녀를 빼앗을지 사용자에게 확인
    // TODO: UI에서 확인 다이얼로그 표시
    // 임시로 true 반환
    return true;
  }

  /**
   * 애널처녀 상실 처리
   * 원본: COMF_ANALSEX.ERB (처녀 상실 로직 추정)
   */
  static async handleAnalVirginity(ctx: TrainingContext): Promise<void> {
    if (ctx.talents[2] !== 1) {
      return; // 이미 애널처녀가 아님
    }

    const targetName = ctx.target.name;

    // 애널처녀 소질 제거
    ctx.talents[2] = 0;

    // A경험 획득
    ctx.exp[1] += 10000;

    // 메시지
    ctx.showMessage(`${targetName}의 애널처녀를 빼앗았다!`);
    ctx.showMessage(`애널처녀 상실!`);

    // 레즈 경험 (양쪽 다 여성)
    if (ctx.talents[122] === 0 && ctx.playerTalents[122] === 0) {
      ctx.exp[40] += 5;
      ctx.showMessage('레즈경험 +5');
    }
    // 호모 경험 (양쪽 다 남성)
    else if (ctx.talents[122] === 1 && ctx.playerTalents[122] === 1) {
      ctx.exp[41] += 7;
      ctx.showMessage('호모경험 +7');
    }
  }

  /**
   * 애널삽입 사정 게이지 계산
   * 원본: COMF_ANALSEX.ERB 라인 23-286
   *
   * @param ctx 조교 컨텍스트
   * @param positionId 체위 ID (26=정상위애널, 27=후배위애널, 28=대면좌위애널 등)
   * @returns 사정 게이지 증가량
   */
  static calculateEjaculationGauge(ctx: TrainingContext, positionId: number): number {
    // 수간은 사정 없음
    if (ctx.equipment[89]) {
      return 0;
    }

    let gauge = 0;
    const technique = ctx.abilities[12] || 0; // 기교
    const submission = ctx.abilities[10] || 0; // 종순
    const desire = ctx.abilities[11] || 0; // 욕망
    const sexSkill = ctx.abilities[14] || 0; // 성교기술
    const service = ctx.abilities[13] || 0; // 봉사기술

    // 체위별 기본 게이지
    switch (positionId) {
      case 26: // 정상위애널
        gauge = [1500, 1600, 1800, 2000, 2400, 3000][technique] || 1500;
        gauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.0;
        break;

      case 27: // 후배위애널
        gauge = [2700, 2800, 2900, 3100, 3200, 3300][technique] || 2700;
        break;

      case 28: // 대면좌위애널
        gauge = [800, 1000, 1200, 1400, 1600, 1800][technique] || 800;
        gauge *= [1.00, 1.30, 1.60, 1.90, 2.10, 2.40][submission] || 1.0;
        break;

      case 29: // 배면좌위애널
        gauge = [900, 1100, 1300, 1500, 1700, 1900][technique] || 900;
        gauge *= [1.00, 1.10, 1.20, 1.30, 1.40, 1.50][submission] || 1.0;
        break;

      case 36: // 기승위애널
        gauge = [1000, 1300, 1700, 2200, 3000, 4500][technique] || 1000;
        gauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.0;
        gauge *= [0.30, 0.70, 1.00, 1.20, 1.50, 1.80][service] || 1.0;
        break;

      default:
        gauge = 1500;
        break;
    }

    // 욕망 보정
    gauge *= [1.00, 1.10, 1.20, 1.30, 1.40, 1.50][desire] || 1.0;

    // 성교기술 보정
    gauge *= [1.00, 1.10, 1.20, 1.30, 1.40, 1.50][sexSkill] || 1.0;

    // 윤활 레벨 보정
    const lubLevel = this.getLubricationLevel(ctx.params[3] || 0);
    if (lubLevel < 1) {
      gauge *= 0.40;
    } else if (lubLevel < 2) {
      gauge *= 0.70;
    } else if (lubLevel < 3) {
      gauge *= 1.00;
    } else if (lubLevel < 4) {
      gauge *= 1.30;
    } else {
      gauge *= 1.60;
    }

    // C감각 보정 (플레이어)
    const playerCSense = ctx.playerAbilities[0] || 0;
    gauge *= [1.00, 1.50, 2.00, 2.50, 3.50, 5.00][playerCSense] || 1.0;

    // A경험 보정 (많을수록 조금 감소)
    const analExp = ctx.exp[1] || 0;
    const analExpLevel = this.getExpLevel(analExp);
    if (analExpLevel < 1) {
      gauge *= 1.50;
    } else if (analExpLevel < 2) {
      gauge *= 1.00;
    } else if (analExpLevel < 3) {
      gauge *= 0.90;
    } else if (analExpLevel < 4) {
      gauge *= 0.80;
    } else if (analExpLevel < 5) {
      gauge *= 0.70;
    } else {
      gauge *= 0.60;
    }

    // A확장경험 보정 (많을수록 크게 감소)
    const analStretchExp = ctx.exp[53] || 0;
    if (!ctx.talents[504]) {
      // TALENT:504 (애널확장)가 없으면
      if (analStretchExp < 1) {
        gauge *= 1.00;
      } else if (analStretchExp < 2) {
        gauge *= 0.90;
      } else if (analStretchExp < 3) {
        gauge *= 0.70;
      } else if (analStretchExp < 5) {
        gauge *= 0.50;
      } else if (analStretchExp < 8) {
        gauge *= 0.30;
      } else {
        gauge *= 0.10;
      }
    }

    // 콘돔 착용 시 -50%
    if (ctx.equipment[35] || (ctx.assiPlay && ctx.equipment[36])) {
      gauge *= 0.50;
    }

    return Math.floor(gauge);
  }

  /**
   * 윤활 레벨 계산 (PALAMLV 계산식)
   */
  private static getLubricationLevel(value: number): number {
    const thresholds = [0, 10000, 30000, 100000, 300000, 1000000, 3000000, 10000000];
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (value >= thresholds[i]) return i;
    }
    return 0;
  }

  /**
   * 경험치 레벨 계산 (EXPLV 계산식)
   */
  private static getExpLevel(value: number): number {
    const thresholds = [0, 10, 50, 200, 500, 1000, 2000, 5000];
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (value >= thresholds[i]) return i;
    }
    return 0;
  }

  /**
   * 사정 판정
   * 원본: COMF_ANALSEX.ERB 라인 291-335
   */
  static async checkEjaculation(
    ctx: TrainingContext,
    positionId: number
  ): Promise<EjaculationResult> {
    const gauge = this.calculateEjaculationGauge(ctx, positionId);
    const maxGauge = ctx.playerBase[200] || 5000; // MAXBASE:PLAYER:2

    // 현재 게이지에 증가량 추가
    ctx.playerBase[2] = (ctx.playerBase[2] || 0) + gauge;

    if (ctx.playerBase[2] >= maxGauge * 2) {
      // 2배 이상 - 대량 사정
      ctx.playerBase[2] -= maxGauge * 2;
      if (ctx.playerBase[2] >= maxGauge) {
        ctx.playerBase[2] = maxGauge - 1;
      }
      ctx.flags[2] = 2; // TFLAG:2 = 2 (대량 사정 플래그)
      return { ejaculated: true, amount: 'large', location: 'inside' };
    } else if (ctx.playerBase[2] >= maxGauge) {
      // 1배 이상 - 보통 사정
      ctx.playerBase[2] -= maxGauge;
      if (ctx.playerBase[2] >= maxGauge) {
        ctx.playerBase[2] = maxGauge - 1;
      }
      ctx.flags[2] = 1; // TFLAG:2 = 1 (보통 사정 플래그)
      return { ejaculated: true, amount: 'normal', location: 'inside' };
    }

    return { ejaculated: false, amount: 'none', location: 'inside' };
  }

  /**
   * 사정 처리
   * 원본: COMF_ANALSEX.ERB 라인 303-335
   */
  static async handleEjaculation(
    ctx: TrainingContext,
    result: EjaculationResult
  ): Promise<void> {
    const targetName = ctx.target.name;

    if (!result.ejaculated) {
      return;
    }

    // 사정 메시지
    if (result.amount === 'large') {
      ctx.showMessage(`대량사정⚡`);
      ctx.exp[20] += 1; // 정액경험 +1
      ctx.playerExp[3] += 2;
      ctx.showMessage(`정액경험 +1`);
    } else {
      ctx.showMessage(`사정⚡`);
      ctx.playerExp[3] += 1;
    }

    // 정액으로 더럽힘 (STAIN:4 - A)
    ctx.stain[4] |= 4; // 비트 4 = 정액

    // 조교자 페니스도 더럽힘 (STAIN:PLAYER:2)
    ctx.playerStain[2] |= 4; // 비트 4 = 정액
  }

  /**
   * 애널섹스 후처리
   * 원본: COMF_ANALSEX.ERB 라인 340-438
   */
  static async afterAnalSex(ctx: TrainingContext, positionId: number): Promise<void> {
    // A경험 상승
    const aSense = ctx.abilities[3] || 0; // A감각
    let analExp = 0;

    if (aSense <= 1) {
      analExp = 3;
    } else if (aSense <= 4) {
      analExp = 3;
    } else if (aSense <= 7) {
      analExp = 4;
    } else {
      analExp = 5;
    }

    ctx.exp[1] += analExp;
    ctx.showMessage(`A경험 +${analExp}`);

    // 성교경험
    ctx.exp[5] += 1;
    ctx.showMessage(`성교경험 +1`);

    // 수간은 여기서 종료
    if (ctx.equipment[89]) {
      return;
    }

    // 레즈 경험 (양쪽 다 여성)
    if (ctx.talents[122] === 0 && ctx.playerTalents[122] === 0) {
      ctx.exp[40] += 5;
      ctx.showMessage('레즈경험 +5');
    }
    // 호모 경험 (양쪽 다 남성)
    else if (ctx.talents[122] === 1 && ctx.playerTalents[122] === 1) {
      ctx.exp[41] += 7;
      ctx.showMessage('호모경험 +7');
    }

    // 배면좌위애널
    if (positionId === 29) {
      ctx.exp[14] += 1;
      ctx.showMessage('애정경험 +1');
    }

    // 애정경험
    let affectionExp = 0;

    if (positionId === 26) {
      // 정상위애널
      affectionExp = 3;
    } else if (positionId === 28) {
      // 대면좌위애널
      affectionExp = 4;
    } else {
      affectionExp = 2;
    }

    // 대상이 남성이면 +1
    if (ctx.talents[122]) {
      affectionExp += 1;
    }

    if (ctx.charFlags[2] >= 1000 && ctx.assiPlay === 0) {
      ctx.exp[23] += affectionExp;
      ctx.showMessage(`애정경험 +${affectionExp}`);
    }

    // 주인에 의한 섹스면 호감도 상승
    if (ctx.assiPlay === 0) {
      if (aSense >= 3) {
        ctx.flags[30] = (ctx.flags[30] || 0) + 2;
      } else {
        ctx.flags[30] = (ctx.flags[30] || 0) + 1;
      }
    }

    // 더럽힘 처리 (A ⇔ P)
    ctx.stain[4] |= ctx.playerStain[2];
    ctx.playerStain[2] |= ctx.stain[4];
  }

  /**
   * 애널삽입 전체 프로세스
   */
  static async execute(
    ctx: TrainingContext,
    positionId: number
  ): Promise<void> {
    // 1. 애널처녀 확인
    const shouldProceed = await this.confirmAnalVirginity(ctx);
    if (!shouldProceed) {
      return;
    }

    // 2. 애널처녀 상실 처리
    if (ctx.talents[2] === 1) {
      await this.handleAnalVirginity(ctx);
    }

    // 3. 사정 판정
    const ejacResult = await this.checkEjaculation(ctx, positionId);

    // 4. 사정 처리
    if (ejacResult.ejaculated) {
      await this.handleEjaculation(ctx, ejacResult);
    }

    // 5. 후처리
    await this.afterAnalSex(ctx, positionId);
  }
}
