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

// 파라미터 키 타입
export type ParameterKey = 'pleasureC' | 'pleasureV' | 'pleasureA' | 'pleasureB' |
  'lubrication' | 'submission' | 'lust' | 'love' | 'fear' | 'pain' | 'habit';

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

// 조교 파라미터 타입
export interface TrainingParameters {
  targetId: number;
  assistantId?: number;
  commandId: number;
}

// 조교 결과 타입
export interface TrainingResult {
  success: boolean;
  message: string;
  paramChanges: Record<string, number>;
}

// TrainingContext와 Character는 runtime/types에서 re-export
export type { TrainingContext, Character } from './runtime/types';
