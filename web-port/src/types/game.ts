// 게임 데이터 타입 정의

/**
 * Character 타입은 types/character.ts에서 import
 */
import type { Character } from './character';
export type { Character };

// === 주사위 시스템 타입 ===

export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export interface RollResult {
  die: DieType;
  count: number;
  rolls: number[];
  total: number;
  modifier: number;
  finalTotal: number;
}

export interface D20Result extends RollResult {
  isCritical: boolean;   // Nat 20
  isFumble: boolean;     // Nat 1
  advantage: boolean;
  disadvantage: boolean;
}

export type CheckGrade = 'critical' | 'success' | 'fail' | 'fumble';

export interface CheckResult {
  roll: D20Result;
  dc: number;
  success: boolean;
  margin: number;         // 성공/실패 차이
  grade: CheckGrade;
}

// === 게임 시간 타입 ===

export type GamePhase =
  | 'morning_check'      // 기상 체크포인트
  | 'morning_action'     // 오전 행동
  | 'midday_check'       // 낮 체크포인트
  | 'afternoon_action'   // 오후 행동
  | 'night_check';       // 취침 체크포인트

export type TimeOfDay = 'morning' | 'afternoon';

// === 리그 시스템 타입 ===

export type LeagueDivision = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface LeagueState {
  division: LeagueDivision;
  rank: number;           // 현재 순위
  points: number;         // 누적 포인트
  weeklyPoints: number;   // 이번 주 획득 포인트
  seasonWeek: number;     // 시즌 내 주차 (1~12)
  season: number;         // 시즌 번호
}

export interface SeasonResult {
  finalRank: number;
  totalPoints: number;
  promotion: boolean;
  relegation: boolean;
  rewards: { money: number; reputation: number };
}

// === 경제 시스템 타입 ===

export interface EconomyState {
  debt: number;           // 빚
  interestRate: number;   // 주간 이자율 (0.0~1.0)
  reputation: number;     // 평판 (0~100)
  weeklyIncome: number;   // 이번 주 수입
  weeklyExpense: number;  // 이번 주 지출
}

// === 주간 통계 ===

export interface WeeklyStats {
  income: number;
  expense: number;
  trainingPoints: number;
  brothelCustomers: number;
  charactersSold: number;
}

/**
 * 기본 스탯 (BASE.csv)
 */
export interface BaseStats {
  체력: number;
  기력: number;
  사정게이지: number;
  출연료: number;
  외견연령: number;
  어림연령: number;
  진짜연령: number;
  수명: number;
  탄생월: number;
  탄생일: number;
  혈액형: number;
  키: number;
  체중: number;
  가슴: number;
  허리: number;
  엉덩이: number;
}

/**
 * 능력치 (Abl.csv)
 */
export interface Abilities {
  // 성감 (0-3)
  C감각: number;
  B감각: number;
  V감각: number;
  A감각: number;

  // 기술 (10-22)
  종순: number;        // 10: 종순 (obedience)
  욕망: number;        // 11: 욕망 (desire)
  기교: number;        // 12: 기교 (technique)
  신뢰: number;
  봉사기술: number;
  성교기술: number;
  봉사정신: number;    // 16: 봉사정신
  노출벽: number;      // 17: 노출벽 (exhibitionism)
  화술: number;
  가학: number;        // 20: 가학 (sadism)
  마조: number;        // 21: 마조 (masochism)
  레즈끼: number;      // 22: 레즈끼 (lesbian tendency)

  // 특수 (39+)
  수간중독: number;    // 39: 수간중독 (bestiality addiction)

  // 기타 능력치
  [key: string]: number;
}

/**
 * 파라미터 (Palam.csv)
 */
export interface Parameters {
  쾌C: number;
  쾌V: number;
  쾌A: number;
  쾌B: number;
  윤활: number;
  온순: number;
  욕정: number;
  굴복: number;
  습득: number;
  치정: number;
  고통: number;
  공포: number;
  반감: number;
  불쾌: number;
  억울: number;
  향락: number;
  부정: number;
}

/**
 * 게임 상태
 */
export interface GameState {
  day: number;            // 현재 날짜
  money: number;          // 소지금
  playerName: string;     // 플레이어 이름

  characters: Character[]; // 캐릭터 목록
  currentCharacter: number | null; // 현재 선택된 캐릭터 ID

  flags: Record<string, number>; // 전역 플래그
  items: Record<number, number>; // 아이템 소지 (아이템ID → 개수)
}

/**
 * 조교 커맨드 (레거시)
 * @deprecated 새 시스템은 gameplay/training.ts의 TrainingCommand 사용
 */
export interface LegacyTrainingCommand {
  id: number;
  name: string;
  description: string;
  category: string;
  requirements?: {
    abilities?: Partial<Abilities>;
    flags?: Record<string, number>;
    items?: string[];
  };
  effects: {
    parameters?: Partial<Parameters>;
    abilities?: Partial<Abilities>;
    flags?: Record<string, number>;
  };
  execute?: (char: Character, state: GameState) => void;
}

/**
 * 이벤트 데이터 (레거시)
 * @deprecated 새 시스템은 core/eventEngine.ts의 GameEvent 사용
 */
export interface LegacyGameEvent {
  id: string;
  name: string;
  type: 'daily' | 'training' | 'special' | 'ending';
  trigger?: {
    day?: number;
    flags?: Record<string, number>;
    abilities?: Partial<Abilities>;
  };
  execute: (state: GameState) => void;
}

/**
 * 아이템 데이터 (Item.csv)
 */
export interface GameItem {
  id: number;
  name: string;
  price?: number;
  description?: string;
}

/**
 * 인벤토리 아이템
 */
export interface InventoryItem {
  itemId: number;
  quantity: number;
}
