/**
 * Training Module 타입 정의 (원본 타입 기반으로 재정의)
 */

import type {
  Character,
  CharacterAbilities,
  CharacterBase,
  CharacterParameters,
  CharacterTalents,
  CharacterExperience,
  CharacterMarks,
  CharacterFlags
} from './character';

import type { MasterCharacter } from './master';

// ============================================================================
// 조교 컨텍스트 - 커맨드 실행에 필요한 모든 정보
// ============================================================================

export interface TrainingContext {
  // ========== 핵심 캐릭터 데이터 ==========

  /** 대상 캐릭터 (전체 데이터) */
  target: Character;

  /** 대상 캐릭터 ID */
  targetId: number;

  /** 조수 캐릭터 (옵션) */
  assistant?: Character;

  /** 조수 캐릭터 ID (옵션) */
  assistantId?: number;

  /** 마스터(플레이어) 캐릭터 */
  master?: MasterCharacter;

  // ========== 편의성 배열 접근 (target 데이터의 별칭) ==========
  // 기존 COMF 코드 호환성을 위해 유지

  /** 능력치 배열 (target.abl의 별칭) */
  abilities: number[];

  /** 특성 배열 (target.talent의 별칭) */
  talents: number[];

  /** 파라미터 배열 (target.palam의 별칭) */
  params: number[];

  /** 경험치 배열 (target.exp의 별칭) */
  exp: number[];

  /** 각인 배열 (target.mark의 별칭) */
  marks?: number[];

  /** 기본 능력치 배열 (target.base의 별칭) */
  base?: number[];

  /** 최대 능력치 배열 (target.maxBase의 별칭) */
  maxBase?: number[];

  // ========== 조교 시스템 전용 데이터 ==========

  /** SOURCE 배열 - 커맨드 실행 시 PALAM 증가량 (인덱스 0-18) */
  source?: number[];

  /** LOSEBASE 배열 - 체력/기력 소모량 */
  loseBase?: number[];

  /** PALAM 레벨 기준값 */
  palamlv?: number[];

  /** 경험치 레벨 (EXPLV) */
  explv?: number[];

  /** 오염 상태 (STAIN) - 비트마스크 */
  stain?: number[];

  /** 임시 플래그 (TFLAG) */
  tflags?: Record<number, number>;

  /** 장비 활성 상태 (TEQUIP) */
  equipment?: Record<number, number>;

  /** 아이템 보유 (ITEM) */
  items?: Record<number, number>;

  /** 전역 플래그 (FLAG) */
  globalFlags?: Record<number, number>;

  /** 캐릭터 플래그 (CFLAG) - 의류, 피어싱, 음모 등 */
  charFlags?: Record<number, number>;

  /** 임시 플래그 (TFLAG) - flags 별칭 */
  flags?: Record<number, number>;

  /** 현재 커맨드 ID */
  currentCommand?: number;

  /** 조수 객체 (호환성) */
  assi?: Character;

  // ========== 조수 관련 배열 ==========

  /** 조수 능력치 (assistant.abl의 별칭) */
  assiAbilities?: number[];

  /** 조수 파라미터 (assistant.palam의 별칭) */
  assiParams?: number[];

  /** 조수 특성 (assistant.talent의 별칭) */
  assiTalents?: number[];

  /** 조수 경험치 (assistant.exp의 별칭) */
  assiExp?: number[];

  /** 조수 플레이 모드 여부 (0 or 1) */
  assiPlay: number;

  /** 조수 플레이 모드 여부 (boolean) */
  isAssistantPlay: boolean;

  // ========== 플레이어(마스터) 관련 배열 ==========

  /** 플레이어 능력치 (master.abl의 별칭) */
  playerAbilities?: number[];

  /** 플레이어 특성 (master.talent의 별칭) */
  playerTalents?: number[];

  /** 플레이어 기본 능력치 (master.base의 별칭) */
  playerBase?: number[];

  /** 플레이어 최대 능력치 */
  playerMaxBase?: number[];

  /** 플레이어 오염 상태 */
  playerStain?: number[];

  /** 플레이어 경험치 (master.exp의 별칭) */
  playerExp?: number[];

  /** 플레이어 캐릭터 플래그 (CFLAG:PLAYER) */
  playerCharFlags?: Record<number, number>;

  /** 플레이어 객체 (호환성) */
  player?: {
    id?: number;
    name?: string;
    base?: number[];
    maxBase?: number[];
    abilities?: number[];
    talents?: number[];
    stain?: number[];
    exp?: number[];
  };

  // ========== 게임 상태 ==========

  /** 현재 일자 */
  day: number;

  /** 현재 시간 */
  time: number;

  /** 이전 커맨드 ID */
  prevCom?: number;

  /** 문자열 저장용 (SAVESTR) */
  saveStr?: string[];

  /** 선택된 커맨드 (SELECTCOM) */
  selectCom?: number;

  // ========== 함수 ==========

  /** 메시지 표시 함수 */
  showMessage: (message: string, options?: { color?: string }) => void;

  /** SOURCE 적용 함수 (옵션) */
  applySource?: (source: number[]) => void;
}

// ============================================================================
// 커맨드 플러그인 인터페이스
// ============================================================================

export interface CommandPlugin {
  /** 커맨드 ID (0-180) */
  id: number;

  /** 커맨드 이름 */
  name: string;

  /** 카테고리 */
  category: CommandCategory;

  /** 스태미나 소비량 */
  staminaCost: number;

  /** 가용성 판정 함수 */
  isAvailable: (context: TrainingContext) => boolean;

  /** 실행 함수 */
  execute: (context: TrainingContext) => Promise<void>;
}

// ============================================================================
// 커맨드 카테고리
// ============================================================================

export type CommandCategory =
  | '애무'       // 0-9
  | '도구'       // 10-19
  | '삽입'       // 20-29
  | '봉사'       // 30-39
  | 'SM'         // 40-49
  | '약물'       // 50-59
  | '조수'       // 60-69
  | '복합'       // 70-79
  | '고급'       // 80-99
  | '촉수'       // 100-110
  | '특수'       // 기타
  | '파이즈리';  // 파이즈리계

// ============================================================================
// CSV 파싱 데이터에서 import (정본)
// ============================================================================

// ABL (능력치), PALAM (파라미터), TALENT (특성)는 data/에서 import
export { ABL } from '../../data/abilities';
export type { AblKey } from '../../data/abilities';

export { PALAM } from '../../data/parameters';
export type { PalamKey } from '../../data/parameters';

export { TALENT } from '../../data/talents';
export type { TalentKey } from '../../data/talents';

// ============================================================================
// PALAM 타입 (호환성)
// ============================================================================

// PALAM은 이제 data/parameters.ts에서 import됨

// ============================================================================
// SOURCE 인덱스 상수 (PALAM과 동일 + 추가)
// ============================================================================

export const SOURCE = {
  // 쾌감 계열
  쾌C: 0,
  쾌V: 1,
  쾌A: 2,

  // 행동/심리 계열
  정애: 3,        // 情愛 → UP:4 온순, UP:5 욕정
  성행동: 4,      // 性行動 → UP:7 습득
  달성: 5,        // 達成 → UP:4 온순
  통각: 6,        // 痛覺 → UP:9 고통, UP:10 공포, UP:11 반감
  중독충족: 7,    // 中毒充足 → UP:4 온순, UP:5 욕정
  불결: 8,        // 不潔 → UP:11 반감, UP:12 불쾌
  액체추가: 9,    // 液體追加 → UP:3 윤활
  윤활: 10,       // 愛液分泌 → UP:3 윤활
  욕정추가: 11,   // 欲情追加 → UP:5 욕정
  노출: 12,       // 露出 → UP:5 욕정, UP:8 치정, UP:11 반감
  굴종: 13,       // 屈從 → UP:13 억울, UP:6 굴복
  일탈: 14,       // 逸脫

  // 쾌B는 별도 인덱스
  쾌B: 17,        // 快B → UP:14 쾌B
} as const;

// ABL, PALAM, TALENT는 이제 data/에서 import됨

// ============================================================================
// EQUIPMENT 인덱스 상수 (TEQUIP)
// ============================================================================

export const EQUIPMENT = {
  바이브: 11,
  애널바이브: 13,
  샤워: 18,
  미약: 21,
  콘돔: 30,
  피임약: 51,
  비디오촬영: 53,
  야외: 54,
  TEQUIP60: 60,
  삼각목마: 70,
  수간: 89,
  촉수: 90,
  슬라임: 150,
  슬라임질내: 151,
  슬라임항문: 152,
} as const;

// ============================================================================
// EXP 인덱스 상수 (경험치)
// ============================================================================

export const EXP = {
  // === 기본 성경험 ===
  V경험: 0,
  A경험: 1,
  절정경험: 2,
  사정경험: 3,
  삽입경험: 4,
  성교경험: 5,

  // === 자위/노출 ===
  야외노출경험: 10,
  자위경험: 11,
  지도자위경험: 12,

  // === 애무/봉사 ===
  B개발경험: 14,
  애무경험: 14,
  펠라치오경험: 15,
  봉사경험: 21,
  펠라경험: 22,
  애정경험: 23,

  // === 쾌락/고통 ===
  피학쾌락경험: 30,
  방뇨경험: 31,
  A쾌락경험: 32,
  가학쾌락경험: 33,

  // === 특수 성경험 ===
  레즈경험: 40,
  호모경험: 41,
  가슴애무경험: 48,
  이상경험: 50,

  // === 특수 ===
  촉수경험: 55,
  수간경험: 56,
} as const;

// ============================================================================
// CLOTHING_BITS 비트마스크 상수 (CFLAG:40)
// ============================================================================

export const CLOTHING_BITS = {
  팬티: 1,
  브래지어: 2,
  상의: 4,
  하의: 16,
  특수의상: 64,
  상의벗김: 128,
} as const;

// ============================================================================
// STAIN 인덱스 및 비트마스크 상수
// ============================================================================

/** STAIN 부위 인덱스 */
export const STAIN_PART = {
  입: 0,
  손: 1,
  가슴: 2,
  V: 3,
  A: 4,
  배: 5,
} as const;

/** STAIN 비트마스크 (더러움 종류) */
export const STAIN_BITS = {
  애액: 1,
  땀: 2,
  정액: 4,
  항문오염: 8,
  우유: 16,
  오줌: 32,
} as const;

// 하위 호환성 (deprecated)
export const STAIN = {
  정액_얼굴: 0,
  정액_가슴: 1,
  정액_배: 2,
  정액_성기: 3,
  정액_엉덩이: 4,
  정액_등: 5,
  정액_팔: 6,
  정액_다리: 7,
  정액_머리: 8,
  정액_입: 9,
  정액_질내: 10,
  정액_항내: 11,
  애액: 12,
  오줌: 13,
  땀: 14,
} as const;

// ============================================================================
// BASE 인덱스 상수
// ============================================================================

export const BASE = {
  체력: 0,
  기력: 1,
  사정게이지: 2,
  분유게이지: 3,
  외견연령: 7,
  어림연령: 8,
  진짜연령: 9,
  수명: 10,
  탄생월: 11,
  탄생일: 12,
  혈액형: 13,
  키: 20,
  체중: 21,
  가슴: 22,
  허리: 23,
  엉덩이: 24,
  출연료: 30,
  매력치: 31,
  페니스사이즈: 50,
} as const;

// ============================================================================
// CFLAG 인덱스 상수
// ============================================================================

export const CFLAG = {
  호감도: 2,
  조교첫경험플래그: 3,
  음모길이: 6,
  조교경험회수: 10,
  처녀상실상대: 15,
  첫키스상대: 16,
  의류상태: 40,
  나이: 41,
  임신일수: 110,
  스타킹종류: 170,
  스타킹찢김: 173,
} as const;

// ============================================================================
// MARK 인덱스 상수 (각인)
// ============================================================================

export const MARK = {
  고통각인: 0,
  쾌락각인: 1,
  굴복각인: 2,
  반발각인: 3,
} as const;

// ============================================================================
// 레벨 기준 (PALAMLV)
// ============================================================================

export const PALAM_LEVELS = {
  L1: 500_000,      // 레벨 1 기준
  L2: 1_000_000,    // 레벨 2 기준
  L3: 5_000_000,    // 레벨 3 기준
  L4: 10_000_000,   // 레벨 4 기준
} as const;

// ============================================================================
// 하위 호환성 타입 (deprecated)
// ============================================================================

/**
 * @deprecated Use number[] instead
 * SOURCE는 이제 number[] 배열로 사용합니다.
 */
export type SourceValues = number[];

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * TrainingContext 생성 헬퍼
 * Character 객체로부터 TrainingContext를 생성
 */
export function createTrainingContext(
  target: Character,
  options?: {
    assistant?: Character;
    master?: MasterCharacter;
    showMessage?: (message: string, options?: { color?: string }) => void;
  }
): TrainingContext {
  return {
    target,
    targetId: target.id,
    assistant: options?.assistant,
    assistantId: options?.assistant?.id,
    master: options?.master,

    // 배열 별칭 생성
    abilities: characterAbilitiesToArray(target.abl),
    talents: characterTalentsToArray(target.talent),
    params: characterParametersToArray(target.palam),
    exp: characterExperienceToArray(target.exp),
    marks: characterMarksToArray(target.mark),
    base: characterBaseToArray(target.base),
    maxBase: characterBaseToArray(target.maxBase),

    // 조수 배열
    assiAbilities: options?.assistant ? characterAbilitiesToArray(options.assistant.abl) : undefined,
    assiTalents: options?.assistant ? characterTalentsToArray(options.assistant.talent) : undefined,
    assiParams: options?.assistant ? characterParametersToArray(options.assistant.palam) : undefined,
    assiExp: options?.assistant ? characterExperienceToArray(options.assistant.exp) : undefined,
    assiPlay: options?.assistant ? 1 : 0,
    isAssistantPlay: !!options?.assistant,

    // 플레이어 배열
    playerAbilities: options?.master ? masterAbilitiesToArray(options.master.abl) : undefined,
    playerTalents: options?.master ? masterTalentsToArray(options.master.talent) : undefined,
    playerBase: options?.master ? masterBaseToArray(options.master.base) : undefined,
    playerExp: options?.master ? masterExperienceToArray(options.master.exp) : undefined,

    // 초기화
    source: new Array(19).fill(0),
    loseBase: new Array(10).fill(0),
    stain: new Array(20).fill(0),

    day: 1,
    time: 0,

    showMessage: options?.showMessage ?? (() => {}),
  };
}

// ============================================================================
// 변환 헬퍼 함수
// ============================================================================

function characterAbilitiesToArray(abl: CharacterAbilities): number[] {
  const arr = new Array(100).fill(0);
  Object.keys(abl).forEach(key => {
    arr[Number(key)] = abl[Number(key)] ?? 0;
  });
  return arr;
}

function characterTalentsToArray(talent: CharacterTalents): number[] {
  const arr = new Array(200).fill(0);
  Object.keys(talent).forEach(key => {
    arr[Number(key)] = talent[Number(key)] ?? 0;
  });
  return arr;
}

function characterParametersToArray(palam: CharacterParameters): number[] {
  const arr = new Array(20).fill(0);
  Object.keys(palam).forEach(key => {
    arr[Number(key)] = palam[Number(key)] ?? 0;
  });
  return arr;
}

function characterExperienceToArray(exp: CharacterExperience): number[] {
  const arr = new Array(150).fill(0);
  Object.keys(exp).forEach(key => {
    arr[Number(key)] = exp[Number(key)] ?? 0;
  });
  return arr;
}

function characterMarksToArray(mark: CharacterMarks): number[] {
  const arr = new Array(10).fill(0);
  Object.keys(mark).forEach(key => {
    arr[Number(key)] = mark[Number(key)] ?? 0;
  });
  return arr;
}

function characterBaseToArray(base: CharacterBase): number[] {
  const arr = new Array(100).fill(0);
  Object.keys(base).forEach(key => {
    arr[Number(key)] = base[Number(key)] ?? 0;
  });
  return arr;
}

function masterAbilitiesToArray(abl: any): number[] {
  const arr = new Array(100).fill(0);
  if (abl) {
    Object.keys(abl).forEach(key => {
      arr[Number(key)] = abl[Number(key)] ?? 0;
    });
  }
  return arr;
}

function masterTalentsToArray(talent: any): number[] {
  const arr = new Array(200).fill(0);
  if (talent) {
    Object.keys(talent).forEach(key => {
      arr[Number(key)] = talent[Number(key)] ?? 0;
    });
  }
  return arr;
}

function masterBaseToArray(base: any): number[] {
  const arr = new Array(100).fill(0);
  if (base) {
    Object.keys(base).forEach(key => {
      arr[Number(key)] = base[Number(key)] ?? 0;
    });
  }
  return arr;
}

function masterExperienceToArray(exp: any): number[] {
  const arr = new Array(150).fill(0);
  if (exp) {
    Object.keys(exp).forEach(key => {
      arr[Number(key)] = exp[Number(key)] ?? 0;
    });
  }
  return arr;
}

// ============================================================================
// 기존 타입 호환성 (character.ts에서 re-export하기 위함)
// ============================================================================

/**
 * 훈련 커맨드 인터페이스 (CSV 데이터용)
 * 실제 사용 시 GameData.training.getName(id)로 이름을 가져옴
 */
export interface TrainingCommands {
  [key: number]: number | undefined;
}

/**
 * 훈련 결과 데이터 (기존 시스템용)
 */
export interface TrainingResult {
  commandId: number;
  success: boolean;
  experienceGained: Record<number, number>;
  parameterChanges: Record<number, number>;
  abilityChanges: Record<number, number>;
  messages: string[];
}
