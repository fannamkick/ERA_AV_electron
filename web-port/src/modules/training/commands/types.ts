/**
 * 커맨드 시스템 타입
 */

import type { TrainingCommand } from '../types';

export type { TrainingCommand };

// 커맨드 플러그인 인터페이스
export interface CommandPlugin extends TrainingCommand {}
