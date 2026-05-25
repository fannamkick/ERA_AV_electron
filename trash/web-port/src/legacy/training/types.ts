/**
 * 조교 시스템 타입 정의
 */

// TrainingContext와 Character는 runtime/types에서 import
import type { TrainingContext as TC, Character as Char } from './runtime/types';

// 커맨드 정보 타입
export interface CommandInfo {
  id: number;
  name: string;
  description: string;
  category: string;
  isAvailable?: (ctx: TC) => boolean;
  calculateSource?: (ctx: TC) => SourceValues;
  generateMessage?: (ctx: TC) => string;
  staminaCost?: number;
}

// 커맨드 레지스트리 타입
export interface CommandRegistry {
  [id: number]: CommandInfo;
}

// 파라미터 키 타입 (한국어)
export type ParameterKey =
  | '쾌C' | '쾌V' | '쾌A' | '쾌B'
  | '윤활' | '굴종' | '욕정' | '굴복' | '습득' | '수치심'
  | '고통' | '공포' | '반감' | '불쾌' | '억울' | '애정' | '습관';

// SOURCE 값 타입
export interface SourceValues {
  [key: string]: number;
}

// 커맨드 실행 결과 타입
export interface CommandResult {
  success: boolean;
  message?: string;
  source?: SourceValues;
  staminaCost?: number;
}

// 조교 커맨드 인자 타입
export interface TrainingCommandArgs {
  targetId: number;
  assistantId?: number;
  commandId: number;
}

// 조교 파라미터 타입 (PALAM 값들)
export interface TrainingParameters {
  쾌C: number;
  쾌V: number;
  쾌A: number;
  쾌B: number;
  윤활: number;
  굴종: number;
  욕정: number;
  굴복: number;
  습득: number;
  수치심: number;
  고통: number;
  공포: number;
  반감: number;
  불쾌: number;
  억울: number;
  애정?: number;   // optional for backward compatibility
  습관?: number;   // optional for backward compatibility
  [key: string]: number | undefined;  // 인덱스 시그니처
}

// 조교 결과 타입
export interface TrainingResult {
  success?: boolean;
  message?: string;
  paramChanges?: Record<string, number>;
  // 구슬 시스템
  juelGained?: Record<string, number>;
  totalJuel?: number;
  negativeOffset?: number;
  expGained?: Record<string, number>;
  판매가능?: boolean;
  조수화가능?: boolean;
  summary?: string[];
}

// TrainingContext와 Character는 runtime/types에서 re-export
export type { TrainingContext, Character } from './runtime/types';
