import type { GameState } from '../../game/state';

export interface KojoConditions {
  readonly commandId?: string;
  readonly isVirginVOrgasm?: boolean; // 처녀막 상실 절정 시
  readonly minObedience?: number;      // 최소 복종 (ABL:10)
  readonly requiredTraits?: readonly string[]; // 필수 소질 리스트
}

export interface KojoDialogueSpec {
  readonly id: string;
  readonly text: string;
  readonly conditions: KojoConditions;
  readonly specificity: number; // 적합도 가중치 (클수록 최우선 매칭)
}
