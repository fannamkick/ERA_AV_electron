/**
 * CommandChainHandler - 연속 커맨드 시스템
 *
 * 원본: ERB에서 각 커맨드 상단의 PREVCOM 체크 로직
 *
 * 이전 커맨드 상태를 추적하여 특정 조건에서 다른 커맨드로 자동 파생
 * 예: 펠라치오 → 식스나인, 정상위 → 정상위·키스
 */

import type { TrainingContext } from '../types';

export class CommandChainHandler {
  /**
   * 연속 커맨드 체크 및 파생 판정
   *
   * @param context 조교 컨텍스트
   * @param currentCommandId 현재 실행하려는 커맨드 ID
   * @returns 파생할 커맨드 ID (없으면 null)
   */
  static checkChain(context: TrainingContext, currentCommandId: number): number | null {
    const prevCom = context.prevCom;
    const prevTrainer = context.flags[50] || 0; // TFLAG:50 (0=주인, 1=조수)
    const currentTrainer = context.assiPlay ? 1 : 0;
    const prevPrevCom = context.flags[59] || 0; // TFLAG:59 (전전회 커맨드)

    // 조교자가 동일한지 체크
    const sameTrainer = (context.assiPlay && prevTrainer === 1) ||
                        (!context.assiPlay && prevTrainer === 0);

    // 조교자가 교체되었는지 체크
    const trainerChanged = (context.assiPlay && prevTrainer === 0) ||
                           (!context.assiPlay && prevTrainer === 1);

    switch (currentCommandId) {
      case 1: // 커닐링구스
        return this.checkComf1Chain(context, prevCom, sameTrainer);

      case 3: // 자위
        return this.checkComf3Chain(context, prevCom, sameTrainer);

      case 5: // 가슴애무
        return this.checkComf5Chain(context, prevCom, sameTrainer);

      case 6: // 키스
        return this.checkComf6Chain(context, prevCom, sameTrainer);

      case 20: // 정상위
        return this.checkComf20Chain(context, prevCom, prevPrevCom, sameTrainer, trainerChanged);

      default:
        return null;
    }
  }

  /**
   * COMF1 (커닐링구스) 연속 커맨드 체크
   * 원본: COMF1.ERB 라인 8-14
   */
  private static checkComf1Chain(
    context: TrainingContext,
    prevCom: number,
    sameTrainer: boolean
  ): number | null {
    // 조교자가 동일하고, 밧줄 미사용, 수간 아님
    if (!sameTrainer || context.equipment[44] || context.equipment[89]) {
      return null;
    }

    // 전회가 펠라치오(31), 커닐링구스강제(61), 식스나인(69) → 식스나인(69)
    if (prevCom === 31 || prevCom === 61 || prevCom === 69) {
      // COM_ABLE69 체크 필요
      // TODO: availability check
      return 69; // 식스나인으로 파생
    }

    return null;
  }

  /**
   * COMF3 (자위) 연속 커맨드 체크
   * 원본: COMF3.ERB 라인 10-16
   */
  private static checkComf3Chain(
    context: TrainingContext,
    prevCom: number,
    sameTrainer: boolean
  ): number | null {
    if (!sameTrainer) return null;

    // 전회가 펠라(31), 파이즈리펠라(123), 딥스로트(124), 수음펠라(126), 바큠펠라(127) → 펠라자위(125)
    if (prevCom === 31 || prevCom === 123 || prevCom === 124 ||
        prevCom === 126 || prevCom === 127) {
      // COM_ABLE125 체크 필요
      return 125; // 펠라자위로 파생
    }

    return null;
  }

  /**
   * COMF5 (가슴애무) 연속 커맨드 체크
   * 원본: COMF5.ERB 라인 7-25
   */
  private static checkComf5Chain(
    context: TrainingContext,
    prevCom: number,
    sameTrainer: boolean
  ): number | null {
    if (!sameTrainer) return null;

    // 전회가 정상위(20), 정상위·가슴애무(129), 정상위SP(130) → 정상위·가슴애무(129)
    if (prevCom === 20 || prevCom === 129 || prevCom === 130) {
      return 129; // 정상위·가슴애무로 파생
    }

    // 전회가 후배위(21), 후배위·스팽킹(132), 서서삽입(133), 후배위SP(134) → 후배위·가슴애무(131)
    if (prevCom === 21 || prevCom === 132 || prevCom === 133 || prevCom === 134) {
      return 131; // 후배위·가슴애무로 파생
    }

    return null;
  }

  /**
   * COMF6 (키스) 연속 커맨드 체크
   * 원본: COMF6.ERB 라인 12-30
   */
  private static checkComf6Chain(
    context: TrainingContext,
    prevCom: number,
    sameTrainer: boolean
  ): number | null {
    if (!sameTrainer) return null;

    // 전회가 정상위(20), 정상위·가슴애무(129), 정상위SP(130) → 정상위·키스(128)
    if (prevCom === 20 || prevCom === 129 || prevCom === 130) {
      return 128; // 정상위·키스로 파생
    }

    // 전회가 후배위·가슴애무(131), 후배위·스팽킹(132), 후배위SP(134) → 서서삽입(133)
    if (prevCom === 131 || prevCom === 132 || prevCom === 134) {
      return 133; // 서서삽입으로 파생
    }

    return null;
  }

  /**
   * COMF20 (정상위) 연속 커맨드 체크
   * 원본: COMF20.ERB 라인 7-73
   */
  private static checkComf20Chain(
    context: TrainingContext,
    prevCom: number,
    prevPrevCom: number,
    sameTrainer: boolean,
    trainerChanged: boolean
  ): number | null {
    // 1. 정상위SP 파생 체크 (라인 7-16)
    if (sameTrainer) {
      // 정상위·키스(128)와 정상위·가슴애무(129)를 연속 실행 → 정상위SP(130)
      if ((prevPrevCom === 128 && prevCom === 129) ||
          (prevPrevCom === 129 && prevCom === 128) ||
          (prevPrevCom === 130 && (prevCom === 128 || prevCom === 129))) {
        return 130; // 정상위SP로 파생
      }
    }

    // 2. G스팟/자궁구 자극 파생 (라인 18-50)
    if (!context.flags[71] && sameTrainer) { // FLAG:71 == 0
      if ((prevCom === 20 || prevCom === 128 || prevCom === 129) &&
          (context.playerAbilities[12] || 0) > 2) { // 기교 3 이상

        // 욕정 레벨
        const lustLevel = context.getParamLevel(context.params[5] || 0);
        const vSense = context.target.abilities['V감각'] || 0;

        // 확률 계산 (0~100)
        const randA = Math.floor(Math.random() * 11);
        const randB = Math.floor(Math.random() * 11);
        const score = lustLevel * randA + randB * vSense;

        // 40 이상이면 자궁구(121), 미만이면 G스팟(120)
        if (score >= 40) {
          return 121; // 삽입자궁구자극
        } else {
          return 120; // 삽입G스팟자극
        }
      }
    }

    // 3. 3P 파생 (라인 57-73)
    // 전회가 3P(64)
    if (prevCom === 64) {
      context.flags[42] = 1; // TFLAG:42
      return 64; // 3P 유지
    }

    // 조교자가 교체되었을 때
    if (trainerChanged) {
      // 전회가 후배위애널(27), 펠라치오(31), 이라마치오(80) → 3P(64)
      if (prevCom === 27 || prevCom === 31 || prevCom === 80) {
        return 64; // 3P로 파생
      }
    }

    return null;
  }

  /**
   * 커맨드 실행 후 상태 업데이트
   *
   * @param context 조교 컨텍스트
   * @param executedCommandId 실행한 커맨드 ID
   */
  static updateChainState(context: TrainingContext, executedCommandId: number): void {
    // TFLAG:59 = 전전회 커맨드 (이전 PREVCOM 저장)
    context.flags[59] = context.prevCom || 0;

    // PREVCOM 업데이트
    context.prevCom = executedCommandId;

    // TFLAG:50 = 이번 조교자 (0=주인, 1=조수)
    context.flags[50] = context.assiPlay ? 1 : 0;
  }

  /**
   * 특정 커맨드가 가용한지 체크
   * (연속 커맨드 파생 시 해당 커맨드의 availability 체크 필요)
   *
   * @param context 조교 컨텍스트
   * @param commandId 체크할 커맨드 ID
   * @returns 가용 여부
   */
  static isCommandAvailable(context: TrainingContext, commandId: number): boolean {
    // TODO: commandRegistry에서 해당 커맨드의 isAvailable 호출
    // 현재는 임시로 true 반환
    return true;
  }
}
