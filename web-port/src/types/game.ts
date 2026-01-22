// 게임 데이터 타입 정의

/**
 * Character 타입은 types/character.ts에서 import
 */
import type { Character } from './character';
export type { Character };

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
 * 조교 커맨드
 */
export interface TrainingCommand {
  id: number;
  name: string;
  description: string;
  category: string;       // 커맨드 분류

  // 실행 조건
  requirements?: {
    abilities?: Partial<Abilities>;
    flags?: Record<string, number>;
    items?: string[];
  };

  // 효과
  effects: {
    parameters?: Partial<Parameters>;
    abilities?: Partial<Abilities>;
    flags?: Record<string, number>;
  };

  // 실행 함수
  execute?: (char: Character, state: GameState) => void;
}

/**
 * 이벤트 데이터
 */
export interface GameEvent {
  id: string;
  name: string;
  type: 'daily' | 'training' | 'special' | 'ending';

  // 발생 조건
  trigger?: {
    day?: number;
    flags?: Record<string, number>;
    abilities?: Partial<Abilities>;
  };

  // 이벤트 실행
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
