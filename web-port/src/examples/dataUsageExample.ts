/**
 * CSV 데이터 통합 사용 예시
 *
 * 이 파일은 생성된 CSV 데이터를 실제로 어떻게 사용하는지 보여주는 예시입니다.
 */

import { GameData } from '@/constants';
import {
  getAbilityName,
  getParameterName,
  getTalentName,
  getBaseName,
  getCharacterAbilitiesWithNames,
  getAbilitiesByCategory,
  hasTalent,
} from '@/utils/characterUtils';
import type { Character } from '@/types/character';

// ============================================
// 1. 직접 GameData 네임스페이스 사용
// ============================================

export function exampleDirectAccess() {
  // 능력치 이름 가져오기
  const ability50 = GameData.abilities.getName(50); // "미용감각"
  console.log(`능력치 50번: ${ability50}`);

  // 특성 이름 가져오기
  const talent153 = GameData.talents.getName(153); // "임신"
  console.log(`특성 153번: ${talent153}`);

  // 파라미터 이름 가져오기
  const param0 = GameData.parameters.getName(0); // "쾌C"
  console.log(`파라미터 0번: ${param0}`);

  // 기본 능력치 이름 가져오기
  const base0 = GameData.base.getName(0); // "체력"
  console.log(`기본 능력치 0번: ${base0}`);
}

// ============================================
// 2. 카테고리별 조회
// ============================================

export function exampleCategoryAccess() {
  // 감각 능력치 (0-3) 가져오기
  const sensingAbilities = GameData.abilities.categories['감각 (0-3)'];
  console.log('감각 능력치:', sensingAbilities);
  // [{ id: 0, name: 'C감각', description: '' }, ...]

  // 기본 소질 특성 (0-9) 가져오기
  const basicTalents = GameData.talents.categories['기본소질 (0-9)'];
  console.log('기본 소질:', basicTalents);

  // 모든 능력치 카테고리 목록
  const allAbilityCategories = Object.keys(GameData.abilities.categories);
  console.log('능력치 카테고리들:', allAbilityCategories);
}

// ============================================
// 3. 캐릭터 데이터와 함께 사용
// ============================================

export function exampleCharacterUsage(character: Character) {
  // 캐릭터의 능력치를 이름과 함께 표시
  const abilities = getCharacterAbilitiesWithNames(character.abl);
  console.log('캐릭터 능력치:', abilities);
  // [{ id: 0, name: 'C감각', value: 3 }, { id: 10, name: '신뢰', value: 5 }, ...]

  // 특정 카테고리 능력치만 가져오기
  const sensingSkills = getAbilitiesByCategory(character.abl, '감각 (0-3)');
  console.log('감각 능력치:', sensingSkills);

  // 특성 확인
  if (hasTalent(character, 153)) { // 임신
    console.log(`${character.name}는 임신 중입니다.`);
  }

  if (hasTalent(character, 0)) { // 처녀
    console.log(`${character.name}는 처녀입니다.`);
  }
}

// ============================================
// 4. UI 표시용 포맷팅
// ============================================

export function formatAbilityDisplay(abilityId: number, value: number): string {
  const name = getAbilityName(abilityId);
  return `${name}: Lv.${value}`;
}

export function formatParameterDisplay(parameterId: number, value: number): string {
  const name = getParameterName(parameterId);
  return `${name}: ${value}`;
}

export function formatTalentList(character: Character): string[] {
  return Object.entries(character.talent)
    .filter(([_, value]) => value !== undefined && value > 0)
    .map(([id]) => getTalentName(Number(id)));
}

// ============================================
// 5. 검색 기능
// ============================================

export function searchAbilityByName(searchTerm: string): Array<{ id: number; name: string }> {
  return GameData.abilities.list
    .filter(ability => ability.name.includes(searchTerm))
    .map(ability => ({ id: ability.id, name: ability.name }));
}

export function searchTalentByName(searchTerm: string): Array<{ id: number; name: string }> {
  return GameData.talents.list
    .filter(talent => talent.name.includes(searchTerm))
    .map(talent => ({ id: talent.id, name: talent.name }));
}

// ============================================
// 6. 통계 및 분석
// ============================================

export function getCharacterStats(character: Character) {
  const abilities = getCharacterAbilitiesWithNames(character.abl);
  const totalAbilityLevel = abilities.reduce((sum, ability) => sum + ability.value, 0);
  const avgAbilityLevel = abilities.length > 0 ? totalAbilityLevel / abilities.length : 0;

  const talents = Object.values(character.talent).filter(v => v !== undefined && v > 0);
  const talentCount = talents.length;

  return {
    totalAbilityLevel,
    avgAbilityLevel: avgAbilityLevel.toFixed(2),
    abilityCount: abilities.length,
    talentCount,
  };
}

// ============================================
// 사용 예시
// ============================================

/*
import { Character } from '@/types/character';
import { exampleCharacterUsage, formatAbilityDisplay } from '@/examples/dataUsageExample';

// 캐릭터 데이터 분석
exampleCharacterUsage(someCharacter);

// UI에 능력치 표시
const abilityText = formatAbilityDisplay(50, 3); // "미용감각: Lv.3"
*/
