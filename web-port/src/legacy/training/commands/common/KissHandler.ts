/**
 * KissHandler - 키스 공통 로직
 *
 * 원본: ERB/指導関係/COMF_KISS.ERB
 *
 * 첫 키스 확인 및 처리 로직
 */

import type { TrainingContext } from '../../../../types/training';

export interface KissOptions {
  isAssistant?: boolean; // 조수 키스인지 여부
  isDutch?: boolean; // 딥키스인지 여부
}

export class KissHandler {
  /**
   * 첫 키스 확인
   * 원본: COMF_KISS.ERB 라인 4-19
   */
  static async confirmFirstKiss(ctx: TrainingContext): Promise<boolean> {
    // FLAG:82가 켜져 있으면 확인 없이 진행
    if (ctx.flags[82]) {
      return true;
    }

    // CFLAG:16 == -1 (첫 키스 미경험) 확인
    const isFirstKiss = ctx.charFlags[16] === -1;
    if (!isFirstKiss) {
      return true;
    }

    // 첫 키스를 빼앗을지 사용자에게 확인
    // TODO: UI에서 확인 다이얼로그 표시
    // 임시로 true 반환
    return true;
  }

  /**
   * 첫 키스 처리
   */
  static async handleFirstKiss(ctx: TrainingContext, options: KissOptions = {}): Promise<void> {
    if (ctx.charFlags[16] !== -1) {
      return; // 이미 첫 키스가 아님
    }

    const targetName = ctx.target.name;

    // 첫 키스 플래그 설정 (상대 캐릭터 번호 저장)
    if (options.isAssistant) {
      ctx.charFlags[16] = ctx.assi?.id ?? 0;
    } else {
      ctx.charFlags[16] = ctx.player?.id ?? 0;
    }

    // 메시지
    ctx.showMessage(`${targetName}의 첫 키스를 빼앗았다!`);
    ctx.showMessage(`첫 키스 상실!`);

    // 키스 경험 획득
    ctx.exp[12] += 5000;
    ctx.showMessage('키스경험 +5000');

    // 레즈 경험 (양쪽 다 여성)
    if (ctx.talents[122] === 0 && ctx.playerTalents[122] === 0) {
      ctx.exp[40] += 2;
      ctx.showMessage('레즈경험 +2');
    }

    // 애정경험
    if (ctx.assiPlay === 0) {
      // 주인과의 첫 키스
      ctx.exp[14] += 10;
      ctx.showMessage('애정경험 +10');
    }
  }

  /**
   * 일반 키스 처리
   */
  static async handleKiss(ctx: TrainingContext, options: KissOptions = {}): Promise<void> {
    // 키스 경험 획득
    const kissExp = options.isDutch ? 2 : 1;
    ctx.exp[12] += kissExp;
    ctx.showMessage(`키스경험 +${kissExp}`);

    // 딥키스면 추가 효과
    if (options.isDutch) {
      // 윤활 증가
      ctx.params[3] = (ctx.params[3] || 0) + 50;

      // 애정경험
      if (ctx.assiPlay === 0 && ctx.charFlags[2] >= 1000) {
        ctx.exp[23] += 1;
        ctx.showMessage('애정경험 +1');
      }
    }

    // 레즈 경험 (양쪽 다 여성)
    if (!options.isAssistant && ctx.talents[122] === 0 && ctx.playerTalents[122] === 0) {
      ctx.exp[40] += 1;
      ctx.showMessage('레즈경험 +1');
    }
  }

  /**
   * 키스 전체 프로세스
   */
  static async execute(
    ctx: TrainingContext,
    options: KissOptions = {}
  ): Promise<void> {
    // 1. 첫 키스 확인
    const shouldProceed = await this.confirmFirstKiss(ctx);
    if (!shouldProceed) {
      return;
    }

    // 2. 첫 키스 처리
    if (ctx.charFlags[16] === -1) {
      await this.handleFirstKiss(ctx, options);
    } else {
      // 3. 일반 키스 처리
      await this.handleKiss(ctx, options);
    }

    // 4. 호감도 상승 (주인 키스)
    if (!options.isAssistant && ctx.assiPlay === 0) {
      ctx.flags[30] = (ctx.flags[30] || 0) + 1;
    }
  }
}
