export type PalamSourceId =
  | '0'   // 쾌C
  | '1'   // 쾌V
  | '2'   // 쾌A
  | '3'   // 쾌B
  | '10'  // 액정 (액체분비)
  | '11'  // 접촉
  | '12'  // 욕정
  | '13'  // 수치
  | '14'  // 아픔 (통증)
  | '15'  // 공포
  | '16'  // 반감
  | '17'  // 불쾌
  | '18'  // 우울
  | '20'  // 육체
  | '21'  // 정신
  | '22'  // 성행위
  | '23'  // 노출
  | '24'  // 불결
  | '25'  // 울화
  | '30'  // 이탈
  | '31'; // 접촉2

export type CommandEffectOp =
  | 'add_experience'
  | 'lose_trait'
  | 'gain_trait'
  | 'stain_body'
  | 'set_condition_flag';

export interface CommandEffect {
  readonly op: CommandEffectOp;
  readonly id: string;
  readonly value: number | string | boolean;
}

export interface TrainingCommandAvailability {
  readonly requiresItem?: string;
  readonly excludeTraits?: readonly string[];
  readonly requiredTraits?: readonly string[];
  readonly minimumAbl?: Record<string, number>;
}

export interface TrainingCommandSpec {
  readonly id: string;
  readonly name: string;
  readonly staminaCost: number;
  readonly energyCost: number;
  readonly baseSources: Partial<Record<PalamSourceId, number>>;
  readonly availability: TrainingCommandAvailability;
  readonly postEffects?: readonly CommandEffect[];
}
