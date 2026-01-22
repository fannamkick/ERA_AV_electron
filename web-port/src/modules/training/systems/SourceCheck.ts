/**
 * SOURCE_CHECK System
 * Handles parameter threshold checks and orgasm processing
 */

import { TrainingContext } from '../types';
import { Character } from '../../../types/game';
import { gameData } from '../../../data/loaderJSON';

/**
 * Orgasm thresholds for each pleasure type
 */
const ORGASM_THRESHOLDS = {
  C: 10000,  // 쾌C 절정 임계값
  V: 10000,  // 쾌V 절정 임계값
  A: 10000,  // 쾌A 절정 임계값
  B: 10000,  // 쾌B 절정 임계값
};

/**
 * Maximum orgasm counts before fainting
 */
const MAX_ORGASMS = {
  total: 10,     // 총 절정 횟수
  continuous: 5, // 연속 절정 횟수
};

/**
 * Orgasm result
 */
export interface OrgasmResult {
  /** 절정 발생 여부 */
  occurred: boolean;
  /** 절정 타입 */
  type: 'C' | 'V' | 'A' | 'B' | 'multiple';
  /** 절정 횟수 */
  count: number;
  /** 기절 여부 */
  fainted: boolean;
  /** 분비액 증가량 */
  secretions: Record<number, number>;
}

/**
 * Source check system
 */
export class SourceCheckSystem {
  private ctx: TrainingContext;
  private character: Character;

  constructor(ctx: TrainingContext, character: Character) {
    this.ctx = ctx;
    this.character = character;
  }

  /**
   * Main source check execution
   */
  async execute(): Promise<void> {
    // 1. 파라미터 업데이트
    this.updateParameters();

    // 2. 절정 체크
    const orgasmResult = await this.checkOrgasm();

    // 3. 분비액 처리
    this.processSecretions(orgasmResult);

    // 4. 기절 체크
    if (orgasmResult.fainted) {
      await this.processFaint();
    }

    // 5. 상태 업데이트
    this.updateStatus();
  }

  /**
   * Update parameters from source values
   */
  private updateParameters(): void {
    // SOURCE 값을 PARAM에 누적
    const source = this.character.source;

    this.ctx.params[0] += source[0] || 0;  // 쾌C
    this.ctx.params[1] += source[1] || 0;  // 쾌V
    this.ctx.params[2] += source[2] || 0;  // 쾌A
    this.ctx.params[14] += source[17] || 0; // 쾌B
    this.ctx.params[3] += source[3] || 0;  // 윤활
    this.ctx.params[4] += source[4] || 0;  // 온순
    this.ctx.params[5] += source[5] || 0;  // 욕정
    this.ctx.params[6] += source[6] || 0;  // 굴복
    this.ctx.params[9] += source[9] || 0;  // 고통
    this.ctx.params[10] += source[10] || 0; // 공포

    // 자연 감소 처리
    this.applyNaturalDecay();
  }

  /**
   * Apply natural parameter decay
   */
  private applyNaturalDecay(): void {
    // 턴마다 일부 파라미터는 자연 감소
    this.ctx.params[5] = Math.max(0, this.ctx.params[5] - 10); // 욕정 감소
    this.ctx.params[9] = Math.max(0, this.ctx.params[9] - 20); // 고통 감소
    this.ctx.params[10] = Math.max(0, this.ctx.params[10] - 15); // 공포 감소
  }

  /**
   * Check for orgasm
   */
  private async checkOrgasm(): Promise<OrgasmResult> {
    const result: OrgasmResult = {
      occurred: false,
      type: 'C',
      count: 0,
      fainted: false,
      secretions: {}
    };

    const orgasms: Array<'C' | 'V' | 'A' | 'B'> = [];

    // 각 쾌감 타입별 절정 체크
    if (this.ctx.params[0] >= ORGASM_THRESHOLDS.C) {
      orgasms.push('C');
      await this.processOrgasm('C');
    }

    if (this.ctx.params[1] >= ORGASM_THRESHOLDS.V) {
      orgasms.push('V');
      await this.processOrgasm('V');
    }

    if (this.ctx.params[2] >= ORGASM_THRESHOLDS.A) {
      orgasms.push('A');
      await this.processOrgasm('A');
    }

    if (this.ctx.params[14] >= ORGASM_THRESHOLDS.B) {
      orgasms.push('B');
      await this.processOrgasm('B');
    }

    if (orgasms.length > 0) {
      result.occurred = true;
      result.count = orgasms.length;
      result.type = orgasms.length > 1 ? 'multiple' : orgasms[0];

      // 절정 횟수 누적
      this.character.cflags[10] = (this.character.cflags[10] || 0) + orgasms.length;

      // 연속 절정 체크
      const continuousOrgasms = this.character.cflags[11] || 0;
      this.character.cflags[11] = continuousOrgasms + 1;

      // 기절 판정
      if (this.character.cflags[10] >= MAX_ORGASMS.total ||
          this.character.cflags[11] >= MAX_ORGASMS.continuous) {
        result.fainted = true;
      }

      // 분비액 설정
      result.secretions = this.calculateSecretions(orgasms);
    } else {
      // 절정이 없으면 연속 카운터 리셋
      this.character.cflags[11] = 0;
    }

    return result;
  }

  /**
   * Process individual orgasm
   */
  private async processOrgasm(type: 'C' | 'V' | 'A' | 'B'): Promise<void> {
    const paramIndex = type === 'C' ? 0 : type === 'V' ? 1 : type === 'A' ? 2 : 14;
    const paramName = gameData.getParameter(paramIndex)?.name || type;

    // 메시지 출력
    await this.showOrgasmMessage(type);

    // 절정 카운터 증가
    const countIndex = type === 'C' ? 20 : type === 'V' ? 21 : type === 'A' ? 22 : 23;
    this.character.cflags[countIndex] = (this.character.cflags[countIndex] || 0) + 1;

    // 파라미터 리셋
    this.ctx.params[paramIndex] = 0;

    // 경험치 획득
    const expIndex = type === 'C' ? 60 : type === 'V' ? 61 : type === 'A' ? 62 : 63;
    this.ctx.exp[expIndex] = (this.ctx.exp[expIndex] || 0) + 10;

    // 만족도 상승
    this.character.cflags[3] = (this.character.cflags[3] || 0) + 50;
  }

  /**
   * Show orgasm message
   */
  private async showOrgasmMessage(type: 'C' | 'V' | 'A' | 'B'): Promise<void> {
    const messages = {
      C: [
        '"으아앗...! 클리가...!!',
        '클리토리스가 경련하며 쾌감이 폭발한다!',
        '몸이 활처럼 휘어진다...'
      ],
      V: [
        '"이게...아...안돼에...!!',
        '질 안쪽에서 쾌감이 터져나온다!',
        '전신에 전율이 달린다...'
      ],
      A: [
        '"항문이...느껴져...!!',
        '항문의 경련과 함께 절정에 이른다!',
        '몸이 떨린다...'
      ],
      B: [
        '"가슴이...느껴...!!',
        '유두가 딱딱해지며 쾌감이 밀려온다!',
        '가슴 전체가 떨린다...'
      ]
    };

    const typeMessages = messages[type];
    for (const msg of typeMessages) {
      this.ctx.showMessage(msg);
    }

    // 절정 횟수 표시
    const countIndex = type === 'C' ? 20 : type === 'V' ? 21 : type === 'A' ? 22 : 23;
    const count = (this.character.cflags[countIndex] || 0) + 1;
    this.ctx.showMessage(`${type}절정 ${count}회째`);
  }

  /**
   * Calculate secretion amounts
   */
  private calculateSecretions(orgasms: Array<'C' | 'V' | 'A' | 'B'>): Record<number, number> {
    const secretions: Record<number, number> = {};

    for (const type of orgasms) {
      if (type === 'C' || type === 'V') {
        // 애액 분비
        secretions[7] = (secretions[7] || 0) + 100;

        // 윤활 증가
        this.ctx.params[3] += 500;
      }

      if (type === 'A') {
        // 항문 분비액
        secretions[8] = (secretions[8] || 0) + 50;
      }

      if (type === 'B') {
        // 모유 (수유 중인 경우)
        if (this.hasTalent(210)) {
          secretions[9] = (secretions[9] || 0) + 30;
        }
      }
    }

    // 조루 체질
    if (this.hasTalent(80)) {
      for (const key in secretions) {
        secretions[key] *= 1.5;
      }
    }

    return secretions;
  }

  /**
   * Process secretions
   */
  private processSecretions(result: OrgasmResult): void {
    if (!result.occurred) return;

    for (const [index, amount] of Object.entries(result.secretions)) {
      const idx = Number(index);
      this.character.source[idx] = (this.character.source[idx] || 0) + amount;

      // 메시지 출력
      const name = this.getSecretionName(idx);
      this.ctx.showMessage(`${name} +${amount}`);
    }
  }

  /**
   * Get secretion name
   */
  private getSecretionName(index: number): string {
    const names: Record<number, string> = {
      7: '애액',
      8: '항문 분비액',
      9: '모유',
      20: '정액'
    };
    return names[index] || `분비액[${index}]`;
  }

  /**
   * Process fainting
   */
  private async processFaint(): Promise<void> {
    this.ctx.showMessage('');
    this.ctx.showMessage('** 과도한 절정으로 기절했습니다! **');
    this.ctx.showMessage('');

    // 기절 상태 설정
    this.character.cflags[16] = -1;

    // 모든 쾌감 파라미터 리셋
    this.ctx.params[0] = 0;
    this.ctx.params[1] = 0;
    this.ctx.params[2] = 0;
    this.ctx.params[14] = 0;

    // 정신력 대폭 감소
    this.character.vital = Math.max(0, this.character.vital - 50);

    // 경험치 보너스
    this.ctx.exp[70] = (this.ctx.exp[70] || 0) + 50; // 기절 경험치
  }

  /**
   * Update status
   */
  private updateStatus(): void {
    // 윤활 상태 갱신
    if (this.ctx.params[3] >= 3000) {
      this.character.cflags[15] = 3; // 매우 젖음
    } else if (this.ctx.params[3] >= 1500) {
      this.character.cflags[15] = 2; // 젖음
    } else if (this.ctx.params[3] >= 500) {
      this.character.cflags[15] = 1; // 약간 젖음
    } else {
      this.character.cflags[15] = 0; // 건조
    }

    // 흥분 상태 갱신
    const totalPleasure = this.ctx.params[0] + this.ctx.params[1] + this.ctx.params[2] + this.ctx.params[14];
    if (totalPleasure >= 8000) {
      this.character.cflags[14] = 3; // 매우 흥분
    } else if (totalPleasure >= 5000) {
      this.character.cflags[14] = 2; // 흥분
    } else if (totalPleasure >= 2000) {
      this.character.cflags[14] = 1; // 약간 흥분
    } else {
      this.character.cflags[14] = 0; // 평온
    }
  }

  /**
   * Check if character has talent
   */
  private hasTalent(id: number): boolean {
    return this.ctx.talents.includes(id);
  }
}

/**
 * Execute source check
 */
export async function executeSourceCheck(
  ctx: TrainingContext,
  character: Character
): Promise<void> {
  const system = new SourceCheckSystem(ctx, character);
  await system.execute();
}
