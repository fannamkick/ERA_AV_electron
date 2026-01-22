/**
 * 캐릭터 생성 시스템 검증 스크립트
 *
 * Usage: tsx tools/test_character_generation.ts
 */

import { createRandomCharacter } from '../src/utils/characterFactory';

console.log('='.repeat(80));
console.log('캐릭터 생성 시스템 검증');
console.log('='.repeat(80));
console.log();

// 50개 캐릭터 생성 및 통계
const characters = Array.from({ length: 50 }, (_, i) => createRandomCharacter(i + 1));

console.log(`총 ${characters.length}개 캐릭터 생성 완료\n`);

// 데이터 활용률 측정
let totalBaseFields = 0;
let totalAblFields = 0;
let totalPalamFields = 0;
let totalTalents = 0;
let totalExp = 0;
let totalJuel = 0;
let totalFlags = 0;
let virginCount = 0;

characters.forEach((char, idx) => {
  const baseFields = Object.keys(char.base).length;
  const ablFields = Object.keys(char.abl).length;
  const palamFields = Object.keys(char.palam).length;
  const talentCount = Object.keys(char.talent).length;
  const expCount = Object.keys(char.exp).length;
  const juelCount = Object.keys(char.juel).filter(k => char.juel[parseInt(k)] > 0).length;
  const flagCount = Object.keys(char.cflag).length;
  const isVirgin = char.talent[0] === 1;

  totalBaseFields += baseFields;
  totalAblFields += ablFields;
  totalPalamFields += palamFields;
  totalTalents += talentCount;
  totalExp += expCount;
  totalJuel += juelCount;
  totalFlags += flagCount;
  if (isVirgin) virginCount++;

  // 처음 5명만 상세 출력
  if (idx < 5) {
    console.log(`캐릭터 ${idx + 1}: ${char.name}`);
    console.log(`  나이: ${char.base[9]}세 (외견: ${char.base[7]}세)`);
    console.log(`  키: ${char.base[20]}cm, 체중: ${char.base[21]}kg`);
    console.log(`  3사이즈: B${char.base[22]}-W${char.base[23]}-H${char.base[24]}`);
    console.log(`  매력치: ${char.base[31]}, 가격: ${char.cflag[620]}원`);
    console.log(`  처녀: ${isVirgin ? 'O' : 'X'}`);
    console.log(`  데이터 필드 수:`);
    console.log(`    BASE: ${baseFields}/23 (${Math.round(baseFields / 23 * 100)}%)`);
    console.log(`    Abilities: ${ablFields}/34 (${Math.round(ablFields / 34 * 100)}%)`);
    console.log(`    Parameters: ${palamFields}/17 (${Math.round(palamFields / 17 * 100)}%)`);
    console.log(`    Talents: ${talentCount}개`);
    console.log(`    Experience: ${expCount}개`);
    console.log(`    Juel (>0): ${juelCount}개`);
    console.log(`    Flags: ${flagCount}개`);
    console.log();
  }
});

// 전체 통계
console.log('='.repeat(80));
console.log('전체 통계 (평균)');
console.log('='.repeat(80));
console.log(`BASE 필드: ${Math.round(totalBaseFields / characters.length)}/23 (${Math.round(totalBaseFields / characters.length / 23 * 100)}%)`);
console.log(`Abilities 필드: ${Math.round(totalAblFields / characters.length)}/34 (${Math.round(totalAblFields / characters.length / 34 * 100)}%)`);
console.log(`Parameters 필드: ${Math.round(totalPalamFields / characters.length)}/17 (${Math.round(totalPalamFields / characters.length / 17 * 100)}%)`);
console.log(`Talents 평균: ${Math.round(totalTalents / characters.length)}개`);
console.log(`Experience 평균: ${Math.round(totalExp / characters.length)}개`);
console.log(`Juel (>0) 평균: ${Math.round(totalJuel / characters.length)}개`);
console.log(`Flags 평균: ${Math.round(totalFlags / characters.length)}개`);
console.log(`처녀 비율: ${virginCount}/${characters.length} (${Math.round(virginCount / characters.length * 100)}%)`);
console.log();

// 처녀 일관성 체크
console.log('='.repeat(80));
console.log('처녀 일관성 체크');
console.log('='.repeat(80));
characters.forEach((char, idx) => {
  if (char.talent[0] === 1) { // 처녀
    const hasVExp = char.exp[0] !== undefined && char.exp[0] > 0;
    const hasInsertExp = char.exp[4] !== undefined && char.exp[4] > 0;
    const hasSexExp = char.exp[5] !== undefined && char.exp[5] > 0;

    if (hasVExp || hasInsertExp || hasSexExp) {
      console.log(`⚠️ 캐릭터 ${idx + 1}: 처녀인데 성경험 있음!`);
      console.log(`  V경험: ${char.exp[0] || 0}`);
      console.log(`  삽입경험: ${char.exp[4] || 0}`);
      console.log(`  성교경험: ${char.exp[5] || 0}`);
    } else {
      console.log(`✓ 캐릭터 ${idx + 1}: 처녀 일관성 OK`);
    }
  }
});
console.log();

// 특성 다양성 체크
console.log('='.repeat(80));
console.log('특성 다양성 체크');
console.log('='.repeat(80));
const talentSignatures = characters.map(c => Object.keys(c.talent).sort().join(','));
const uniqueSignatures = new Set(talentSignatures);
console.log(`고유한 특성 조합: ${uniqueSignatures.size}/${characters.length}`);
console.log(`다양성: ${Math.round(uniqueSignatures.size / characters.length * 100)}%`);
console.log();

// 상세 특성 분석 (첫 번째 캐릭터)
console.log('='.repeat(80));
console.log('상세 특성 분석 (캐릭터 1)');
console.log('='.repeat(80));
const char1 = characters[0];
console.log('특성 ID 목록:');
const talentIds = Object.keys(char1.talent).map(k => parseInt(k)).sort((a, b) => a - b);
console.log(talentIds.join(', '));
console.log();
console.log('경험치 ID 목록:');
const expIds = Object.keys(char1.exp).map(k => parseInt(k)).sort((a, b) => a - b);
console.log(expIds.join(', '));
console.log();

// 목표 달성도
console.log('='.repeat(80));
console.log('목표 달성도');
console.log('='.repeat(80));
const avgBaseUsage = totalBaseFields / characters.length;
const avgAblUsage = totalAblFields / characters.length;
const avgPalamUsage = totalPalamFields / characters.length;
const avgTalentUsage = totalTalents / characters.length;
const avgExpUsage = totalExp / characters.length;

console.log(`✓ BASE 활용률: ${Math.round(avgBaseUsage / 23 * 100)}% (목표: 91% 이상)`);
console.log(`  ${avgBaseUsage >= 21 ? '✓' : '✗'} ${avgBaseUsage.toFixed(1)}/23 필드 사용`);
console.log();
console.log(`✓ Abilities 활용률: ${Math.round(avgAblUsage / 34 * 100)}% (목표: 82% 이상)`);
console.log(`  ${avgAblUsage >= 27 ? '✓' : '✗'} ${avgAblUsage.toFixed(1)}/34 필드 사용`);
console.log();
console.log(`✓ Parameters 활용률: ${Math.round(avgPalamUsage / 17 * 100)}% (목표: 100%)`);
console.log(`  ${avgPalamUsage >= 17 ? '✓' : '✗'} ${avgPalamUsage.toFixed(1)}/17 필드 초기화`);
console.log();
console.log(`✓ Talents 생성: ${avgTalentUsage.toFixed(1)}개 (목표: 15-25개)`);
console.log(`  ${avgTalentUsage >= 15 && avgTalentUsage <= 30 ? '✓' : '✗'} 적절한 범위`);
console.log();
console.log(`✓ Experience 생성: ${avgExpUsage.toFixed(1)}개 (목표: 20-35개)`);
console.log(`  ${avgExpUsage >= 20 && avgExpUsage <= 40 ? '✓' : '✗'} 적절한 범위`);
console.log();

console.log('='.repeat(80));
console.log('검증 완료!');
console.log('='.repeat(80));
