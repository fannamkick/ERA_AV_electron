/**
 * 중앙화된 타입 정의
 * 모든 모듈에서 이 파일을 통해 타입을 import하세요
 */

// Character 타입은 types/character.ts에서만 export
export type { Character, CharacterBase, CharacterAbilities, CharacterTalents, CharacterFlags, CharacterStrings, CharacterParam, CharacterExp, CharacterMark, CharacterJuel, CharacterRelations } from './character';

// Game 타입은 types/game.ts에서 export (Character 제외)
export type { BaseStats, Abilities, Parameters, GameState, EventBusEvents } from './game';

// 게임 내부에서 사용하는 통합 타입
import type { Character as FullCharacter } from './character';
export type { FullCharacter as GameCharacter };
