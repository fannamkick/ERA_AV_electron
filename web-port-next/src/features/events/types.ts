import type { GameState } from '../../game/state';

export interface EventEffect {
  readonly op: 'gain_trait' | 'lose_trait' | 'set_condition_flag' | 'add_experience' | 'set_relationship';
  readonly characterId: string; // 적용 대상 캐릭터 ID (예: "character:1" 등)
  readonly id: string;          // 소질 ID, CFLAG ID, 경험치 ID, 관계 대상 ID 등
  readonly value: number | string | boolean;
}

export interface EventConditions {
  readonly minConditionFlags?: Record<string, number>;
  readonly exactConditionFlags?: Record<string, number>;
  readonly requiredTraits?: readonly string[];
  readonly excludeTraits?: readonly string[];
  readonly minAbilities?: Record<string, number>;
  readonly customCondition?: (state: GameState, characterId: string) => boolean;
}

export interface ScriptEventSpec {
  readonly id: string;
  readonly name: string;
  readonly trigger: 'turnEnd' | 'turnStart' | 'immediate';
  readonly conditions: EventConditions;
  readonly postEffects: readonly EventEffect[];
}
