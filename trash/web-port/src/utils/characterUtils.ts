/**
 * Character Utility Functions
 * 캐릭터 데이터 처리 및 변환 유틸리티
 */

import { GameData } from '@/constants';
import type { Character, CharacterAbilities, CharacterTalents, CharacterParameters, CharacterBase } from '@/types/character';

/**
 * 능력치 ID로 이름 가져오기
 */
export function getAbilityName(id: number): string {
  return GameData.abilities.getName(id);
}

/**
 * 파라미터 ID로 이름 가져오기
 */
export function getParameterName(id: number): string {
  return GameData.parameters.getName(id);
}

/**
 * 특성 ID로 이름 가져오기
 */
export function getTalentName(id: number): string {
  return GameData.talents.getName(id);
}

/**
 * 기본 능력치 ID로 이름 가져오기
 */
export function getBaseName(id: number): string {
  return GameData.base.getName(id);
}

/**
 * 경험치 ID로 이름 가져오기
 */
export function getExperienceName(id: number): string {
  return GameData.experience.getName(id);
}

/**
 * 훈련 커맨드 ID로 이름 가져오기
 */
export function getTrainingName(id: number): string {
  return GameData.training.getName(id);
}

/**
 * 아이템 ID로 이름 가져오기
 */
export function getItemName(id: number): string {
  return GameData.items.getName(id);
}

/**
 * 각인 ID로 이름 가져오기
 */
export function getMarkName(id: number): string {
  return GameData.marks.getName(id);
}

/**
 * 캐릭터의 모든 능력치를 이름과 함께 반환
 */
export function getCharacterAbilitiesWithNames(abl: CharacterAbilities): Array<{ id: number; name: string; value: number }> {
  return Object.entries(abl)
    .filter(([_, value]) => value !== undefined)
    .map(([id, value]) => ({
      id: Number(id),
      name: getAbilityName(Number(id)),
      value: value as number,
    }))
    .sort((a, b) => a.id - b.id);
}

/**
 * 캐릭터의 모든 파라미터를 이름과 함께 반환
 */
export function getCharacterParametersWithNames(palam: CharacterParameters): Array<{ id: number; name: string; value: number }> {
  return Object.entries(palam)
    .filter(([_, value]) => value !== undefined)
    .map(([id, value]) => ({
      id: Number(id),
      name: getParameterName(Number(id)),
      value: value as number,
    }))
    .sort((a, b) => a.id - b.id);
}

/**
 * 캐릭터의 모든 특성을 이름과 함께 반환
 */
export function getCharacterTalentsWithNames(talent: CharacterTalents): Array<{ id: number; name: string; value: number }> {
  return Object.entries(talent)
    .filter(([_, value]) => value !== undefined)
    .map(([id, value]) => ({
      id: Number(id),
      name: getTalentName(Number(id)),
      value: value as number,
    }))
    .sort((a, b) => a.id - b.id);
}

/**
 * 캐릭터의 모든 기본 능력치를 이름과 함께 반환
 */
export function getCharacterBaseWithNames(base: CharacterBase): Array<{ id: number; name: string; value: number }> {
  return Object.entries(base)
    .filter(([_, value]) => value !== undefined)
    .map(([id, value]) => ({
      id: Number(id),
      name: getBaseName(Number(id)),
      value: value as number,
    }))
    .sort((a, b) => a.id - b.id);
}

/**
 * 특정 카테고리의 능력치만 추출
 */
export function getAbilitiesByCategory(abl: CharacterAbilities, category: string): Array<{ id: number; name: string; value: number }> {
  const categories = GameData.abilities.categories as Record<string, Array<{ id: number; name: string; description: string }>>;
  const categoryAbilities = categories[category] || [];
  const categoryIds = new Set(categoryAbilities.map((a: { id: number }) => a.id));

  return getCharacterAbilitiesWithNames(abl)
    .filter(ability => categoryIds.has(ability.id));
}

/**
 * 특정 카테고리의 특성만 추출
 */
export function getTalentsByCategory(talent: CharacterTalents, category: string): Array<{ id: number; name: string; value: number }> {
  const categories = GameData.talents.categories as Record<string, Array<{ id: number; name: string; description: string }>>;
  const categoryTalents = categories[category] || [];
  const categoryIds = new Set(categoryTalents.map((t: { id: number }) => t.id));

  return getCharacterTalentsWithNames(talent)
    .filter(t => categoryIds.has(t.id));
}

/**
 * 캐릭터가 특정 특성을 가지고 있는지 확인
 */
export function hasTalent(character: Character, talentId: number): boolean {
  return character.talent[talentId] !== undefined && character.talent[talentId] > 0;
}

/**
 * 캐릭터의 특정 능력치 값 가져오기 (없으면 0)
 */
export function getAbilityValue(character: Character, abilityId: number): number {
  return character.abl[abilityId] ?? 0;
}

/**
 * 캐릭터의 특정 파라미터 값 가져오기 (없으면 0)
 */
export function getParameterValue(character: Character, parameterId: number): number {
  return character.palam[parameterId] ?? 0;
}

/**
 * 모든 능력치 카테고리 목록 가져오기
 */
export function getAllAbilityCategories(): string[] {
  return Object.keys(GameData.abilities.categories);
}

/**
 * 모든 특성 카테고리 목록 가져오기
 */
export function getAllTalentCategories(): string[] {
  return Object.keys(GameData.talents.categories);
}
