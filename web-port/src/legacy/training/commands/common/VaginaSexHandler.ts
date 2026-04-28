/**
 * VaginaSexHandler - 질내삽입 공통 로직
 *
 * 원본: ERB/指導関係/COMF_VAGINASEX.ERB
 *
 * 처녀 상실, 사정 처리, 임신 판정 등 질내삽입 계열 커맨드의 공통 로직을 처리합니다.
 */

import type { TrainingContext } from '../../../../types/training';

export interface EjaculationResult {
  ejaculated: boolean;
  amount: 'normal' | 'large' | 'none';
  location: 'inside' | 'outside' | 'condom';
}

export class VaginaSexHandler {
  /**
   * 처녀 상실 확인 및 처리
   * 원본: COMF_VAGINASEX.ERB 라인 8-18
   */
  static async confirmVirginity(ctx: TrainingContext): Promise<boolean> {
    // FLAG:80이 켜져 있으면 확인 없이 진행
    if (ctx.flags[80]) {
      return true;
    }

    // TALENT:0 (처녀) 확인
    const isVirgin = ctx.talents[0] === 1;
    if (!isVirgin) {
      return true;
    }

    // 처녀를 빼앗을지 사용자에게 확인
    // TODO: UI에서 확인 다이얼로그 표시
    // 임시로 true 반환
    return true;
  }

  /**
   * 처녀 상실 처리
   * 원본: COMF_VAGINASEX.ERB 라인 676-697
   */
  static async handleVirginity(ctx: TrainingContext): Promise<void> {
    if (ctx.talents[0] !== 1) {
      return; // 이미 처녀가 아님
    }

    const targetName = ctx.target.name;

    // 처녀 소질 제거
    ctx.talents[0] = 0;

    // 삽입경험 획득
    ctx.exp[0] += 10000;

    // 처녀막 파열 메시지
    ctx.showMessage(`${targetName}의 처녀막이 찢어졌다!`);
    ctx.showMessage(`처녀 상실!`);

    // 이상경험 계산
    let abnormalExp = 0;

    // 상대가 여성이면 +1
    if (ctx.playerTalents[122] === 0) {
      abnormalExp += 1;
    }

    // 수간이면 기본값 2
    if (ctx.equipment[89]) {
      abnormalExp = 2;
    }

    // 기승위면 +1
    if (ctx.currentCommand === 34) {
      abnormalExp += 1;
    }

    if (abnormalExp > 0) {
      ctx.exp[50] += abnormalExp;
      ctx.showMessage(`이상경험 +${abnormalExp}`);
    }

    // 레즈 경험 (양쪽 다 여성)
    if (ctx.talents[122] === 0 && ctx.playerTalents[122] === 0) {
      ctx.exp[40] += 4;
      ctx.showMessage('레즈경험 +4');
    }

    // 애정경험
    let affectionExp = 0;

    // 조교자가 동정이고 대상이 처녀
    if (ctx.playerTalents[1] === 1) {
      affectionExp = 100;
    } else {
      affectionExp = 50;
    }

    if (affectionExp > 0) {
      ctx.exp[14] += affectionExp;
      ctx.showMessage(`애정경험 +${affectionExp}`);
    }

    // 조교자 동정 상실 (플레이어가 동정이면)
    if (ctx.playerTalents[1] === 1) {
      ctx.playerTalents[1] = 0;
      ctx.showMessage(`【동정상실】(${ctx.player?.name || '조교자'})`);
    }
  }

  /**
   * 사정 게이지 계산
   * 원본: COMF_VAGINASEX.ERB 라인 23-569
   *
   * @param ctx 조교 컨텍스트
   * @param positionId 체위 ID (20=정상위, 21=후배위, 22=기승위 등)
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
    const devotion = ctx.abilities[16] || 0; // 봉사정신

    // 체위별 기본 게이지
    switch (positionId) {
      case 20: // 정상위
      case 21: // 후배위
        gauge = [1500, 1600, 1800, 2000, 2400, 3000][technique] || 1500;
        gauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.0;
        break;

      case 22: // 대면좌위
        gauge = [800, 1000, 1200, 1400, 1600, 1800][technique] || 800;
        gauge *= [1.00, 1.30, 1.60, 1.90, 2.10, 2.40][submission] || 1.0;
        break;

      case 23: // 배면좌위
        gauge = [500, 700, 900, 1100, 1300, 1500][technique] || 500;
        gauge *= [1.00, 1.10, 1.20, 1.30, 1.40, 1.50][submission] || 1.0;
        break;

      case 34: // 기승위
        gauge = [1000, 1300, 1700, 2200, 3000, 4500][technique] || 1000;
        gauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.0;
        gauge *= [0.30, 0.70, 1.00, 1.20, 1.50, 1.80][service] || 1.0;
        break;

      case 121: // 삽입 자궁구자극
        gauge = [1500, 1600, 1800, 2000, 2400, 3000][technique] || 1500;
        gauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.0;
        break;

      case 130: // 정상위SP
        gauge = [1500, 1600, 1800, 2500, 3200, 4000][technique] || 1500;
        gauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.0;
        gauge *= [0.50, 0.80, 1.20, 1.50, 1.80, 2.40][devotion] || 1.0;
        break;

      case 131: // 후배위・가슴애무・스팽킹
      case 132:
        gauge = [1500, 1600, 1800, 2000, 2400, 3000][technique] || 1500;
        gauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.0;
        break;

      case 133: // 서서삽입
        gauge = [1500, 1600, 1800, 2000, 2400, 3000][technique] || 1500;
        gauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.0;
        gauge *= [0.50, 0.80, 1.20, 1.50, 1.80, 2.40][devotion] || 1.0;
        break;

      case 134: // 후배위SP
        gauge = [1500, 1600, 1800, 2500, 3200, 4000][technique] || 1500;
        gauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.0;
        gauge *= [0.50, 0.80, 1.20, 1.50, 1.80, 2.40][devotion] || 1.0;
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
    gauge += lubLevel * 200;

    // C감각 보정
    const cSense = ctx.abilities[0] || 0;
    gauge += cSense * 150;

    // V감각 보정
    const vSense = ctx.abilities[2] || 0;
    gauge += vSense * 200;

    // 콘돔 착용 시 -40%
    if (ctx.equipment[30]) {
      gauge *= 0.6;
    }

    return Math.floor(gauge);
  }

  /**
   * 윤활 레벨 계산 (PALAMLV 계산식)
   * 원본: SYSTEM_SOURCE.ERB 참조
   */
  private static getLubricationLevel(value: number): number {
    const thresholds = [0, 10000, 30000, 100000, 300000, 1000000, 3000000, 10000000];
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (value >= thresholds[i]) return i;
    }
    return 0;
  }

  /**
   * 사정 판정
   * 원본: COMF_VAGINASEX.ERB 라인 23-569
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
      return { ejaculated: true, amount: 'large', location: 'inside' };
    } else if (ctx.playerBase[2] >= maxGauge) {
      // 1배 이상 - 보통 사정
      return { ejaculated: true, amount: 'normal', location: 'inside' };
    }

    return { ejaculated: false, amount: 'none', location: 'inside' };
  }

  /**
   * 사정 처리
   * 원본: COMF_VAGINASEX.ERB 라인 800+
   */
  static async handleEjaculation(
    ctx: TrainingContext,
    result: EjaculationResult
  ): Promise<void> {
    const targetName = ctx.target.name;

    if (!result.ejaculated) {
      return;
    }

    // 콘돔 사용 중
    if (ctx.equipment[30]) {
      ctx.showMessage(`콘돔 속에 사정했다.`);
      result.location = 'condom';
      return;
    }

    // 사정 메시지
    if (result.amount === 'large') {
      ctx.showMessage(`${targetName}의 질 속 깊은 곳에 대량의 정액을 쏟아부었다!`);
    } else {
      ctx.showMessage(`${targetName}의 질 속에 사정했다.`);
    }

    // 정액으로 더럽힘 (STAIN:3 - V)
    ctx.stain[3] |= 4; // 비트 4 = 정액

    // 조교자 페니스도 더럽힘 (STAIN:PLAYER:2)
    ctx.playerStain[2] |= 1; // 비트 1 = 애액
    ctx.playerStain[2] |= 4; // 비트 4 = 정액

    // 사정 게이지 리셋
    ctx.playerBase[2] = 0;
  }

  /**
   * 임신 판정
   * 원본: SYSTEM_SOURCE.ERB (임신 시스템)
   */
  static async handlePregnancy(ctx: TrainingContext): Promise<void> {
    // 콘돔 사용 중이면 임신 안 함
    if (ctx.equipment[30]) {
      return;
    }

    // 이미 임신 중이면 임신 안 함
    if (ctx.talents[153]) {
      return;
    }

    // 피임약 복용 중이면 임신 안 함 (TEQUIP:51)
    if (ctx.equipment[51]) {
      return;
    }

    // 임신 불가 소질 (TALENT:155 - 불임)
    if (ctx.talents[155]) {
      return;
    }

    // 임신 판정 (기본 5% 확률)
    const pregnancyChance = 0.05;
    const roll = Math.random();

    if (roll < pregnancyChance) {
      ctx.talents[153] = 1; // 임신 중
      ctx.charFlags[110] = ctx.day + 280; // 출산일 (280일 후)
      ctx.showMessage(`${ctx.target.name}이(가) 임신했다!`);
    }
  }

  /**
   * 질내삽입 전체 프로세스
   */
  static async execute(
    ctx: TrainingContext,
    positionId: number
  ): Promise<void> {
    // 1. 처녀 확인
    const shouldProceed = await this.confirmVirginity(ctx);
    if (!shouldProceed) {
      return;
    }

    // 2. 처녀 상실 처리
    if (ctx.talents[0] === 1) {
      await this.handleVirginity(ctx);
    }

    // 3. 사정 판정
    const ejacResult = await this.checkEjaculation(ctx, positionId);

    // 4. 사정 처리
    if (ejacResult.ejaculated) {
      await this.handleEjaculation(ctx, ejacResult);

      // 5. 임신 판정 (질내 사정 시)
      if (ejacResult.location === 'inside') {
        await this.handlePregnancy(ctx);
      }
    }
  }
}
