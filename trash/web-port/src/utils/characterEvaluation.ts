// 캐릭터 평가액 계산 유틸리티
// ERB/システム関係/SELL_CHARA_ESTIMATE.ERB의 단순화 버전

import type { Character } from '../types/character';

/**
 * 캐릭터의 평가액을 계산합니다 (ESTIMATE_CHARA 간소화 버전)
 * 실제 ERB 로직은 매우 복잡하므로 주요 능력치 기반으로 단순화
 */
export function calculateEstimatePrice(character: Character): number {
  let total = 0;

  // ABL:10 (신뢰) 점수
  const abl10 = character.abl[10] || 0;
  if (abl10 === 0) total += 0;
  else if (abl10 === 1) total += 200;
  else if (abl10 === 2) total += 500;
  else if (abl10 === 3) total += 850;
  else if (abl10 === 4) total += 1500;
  else if (abl10 === 5) total += 2000;
  else if (abl10 === 6) total += 2300;
  else if (abl10 === 7) total += 2600;
  else if (abl10 === 8) total += 3000;
  else if (abl10 === 9) total += 3200;
  else if (abl10 >= 10) total += 3500;

  // ABL:11 (욕망) 점수
  const abl11 = character.abl[11] || 0;
  if (abl11 === 0) total += 10;
  else if (abl11 === 1) total += 100;
  else if (abl11 === 2) total += 300;
  else if (abl11 === 3) total += 700;
  else if (abl11 === 4) total += 1200;
  else if (abl11 === 5) total += 2000;
  else if (abl11 === 6) total += 2300;
  else if (abl11 === 7) total += 2600;
  else if (abl11 === 8) total += 3000;
  else if (abl11 === 9) total += 3200;
  else if (abl11 >= 10) total += 3500;

  // ABL:12 (기교) 점수
  const abl12 = character.abl[12] || 0;
  if (abl12 === 0) total += 0;
  else if (abl12 === 1) total += 100;
  else if (abl12 === 2) total += 200;
  else if (abl12 === 3) total += 400;
  else if (abl12 === 4) total += 700;
  else if (abl12 === 5) total += 1200;
  else if (abl12 === 6) total += 1500;
  else if (abl12 === 7) total += 1800;
  else if (abl12 === 8) total += 2200;
  else if (abl12 === 9) total += 2600;
  else if (abl12 >= 10) total += 3000;

  // ABL:13 (봉사기술) 점수
  const abl13 = character.abl[13] || 0;
  if (abl13 >= 1) total += 100 * abl13;

  // ABL:14 (성교기술) 점수
  const abl14 = character.abl[14] || 0;
  if (abl14 >= 1) total += 150 * abl14;

  // 기타 능력치들 (간단히 처리)
  Object.entries(character.abl).forEach(([key, value]) => {
    const abilityId = parseInt(key);
    if (value && value > 0 && ![10, 11, 12, 13, 14].includes(abilityId)) {
      total += value * 50; // 기타 능력치는 레벨당 50포인트
    }
  });

  // 경험치 보너스
  Object.values(character.exp || {}).forEach((exp) => {
    if (exp > 0) {
      total += exp * 2;
    }
  });

  // 특성 보너스 (주요 특성만)
  if (character.talent[0]) total += 500;  // 처녀
  if (character.talent[113]) total += 300; // 매력
  if (character.talent[400]) total += 1000; // AV배우
  if (character.talent[401]) total += 2000; // 인기 AV배우

  // 최소값 체크
  if (total <= 0) return 0;

  return Math.floor(total);
}

/**
 * 캐릭터가 매각 가능한지 확인
 */
export function canSellCharacter(character: Character): boolean {
  // 플레이어는 매각 불가
  if (character.id === 0) return false;

  // 평가액이 0 이하면 매각 불가
  const estimate = calculateEstimatePrice(character);
  return estimate > 0;
}

/**
 * 캐릭터의 직업을 반환
 */
export function getCharacterJob(character: Character): string {
  // TALENT 기반 직업 판정 (ERB/システム関係/SHOP_MAIN.ERB 참조)
  if (character.id === 0) return 'AV감독';
  if (character.talent[554]) return '《색욕》LUXURIA';
  if (character.talent[511] && character.talent[505]) return '《죽음》MORS';
  if (character.talent[511] && !character.talent[505]) return '천사';
  if (character.talent[505] && !character.talent[511]) return '서큐버스';
  if (character.talent[556]) return '《나태》ACEDIA';
  if (character.talent[557]) return '《폭식》GULA';
  if (character.talent[558]) return '《강욕》AVARITIA';
  if (character.talent[551]) return '《질투》INVIDIA';
  if (character.talent[553]) return '《오만》SUPERBIA';
  if (character.talent[552]) return '《분노》IRA';
  if (character.talent[401]) return '인기 AV배우';
  if (character.talent[400]) return 'AV배우';
  if (character.talent[180]) return '업소여성';
  if (character.talent[181]) return '고급창부';
  if (character.talent[326]) return '패션모델';
  if (character.talent[220]) return '고등학생';
  if (character.talent[224]) return '우등생';

  return '일반인';
}

/**
 * 다니고 있는 곳을 반환
 */
export function getAttendingPlace(character: Character): string {
  const placeId = character.cflag[684] || 0;

  if (placeId === 0) return '없음';
  if (placeId === 1) return '에스테';
  if (placeId === 2) return '체육관';
  if (placeId === 3) return '요가';
  // 추가 장소는 필요시 확장

  return '알 수 없음';
}
