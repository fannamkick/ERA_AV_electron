import type { GameState, GameSession } from '../../game/state';
import type { PalamSourceId } from './types';

// 감각 ABL 레벨별 쾌감 소스 가산 테이블 (Emuera 원작 패리티 매핑)
export const SENSITIVITY_TABLES = {
  C_SENSE: [20, 100, 500, 1200, 2000, 2800], // ABL:0 (C감각)
  B_SENSE: [15, 50, 300, 700, 1100, 1600],   // ABL:1 (B감각)
  V_SENSE: [0, 40, 150, 400, 750, 1100],     // ABL:2 (V감각)
  A_SENSE: [0, 30, 100, 300, 600, 900],      // ABL:3 (A감각)
} as const;

/**
 * 캐릭터의 감각 ABL 레벨을 참조하여 기본 쾌감 소스(쾌C, 쾌B, 쾌V, 쾌A)를 가산합니다.
 */
export function applySensoryLevelBonus(
  targetAbl: Record<string, number>,
  sources: Partial<Record<PalamSourceId, number>>
): Partial<Record<PalamSourceId, number>> {
  const nextSources = { ...sources };

  // 1. C감각에 따른 쾌C 가산
  const cLevel = targetAbl['0'] ?? 0;
  const cBonusIndex = Math.min(cLevel, SENSITIVITY_TABLES.C_SENSE.length - 1);
  nextSources['0'] = (nextSources['0'] ?? 0) + SENSITIVITY_TABLES.C_SENSE[cBonusIndex];

  // 2. B감각에 따른 쾌B 가산 (B감각은 17번 소스에 매핑)
  const bLevel = targetAbl['1'] ?? 0;
  const bBonusIndex = Math.min(bLevel, SENSITIVITY_TABLES.B_SENSE.length - 1);
  nextSources['3'] = (nextSources['3'] ?? 0) + SENSITIVITY_TABLES.B_SENSE[bBonusIndex]; // 쾌B (원작 SOURCE:17)

  // 3. V감각에 따른 쾌V 가산 (V감각은 1번 소스에 매핑)
  const vLevel = targetAbl['2'] ?? 0;
  const vBonusIndex = Math.min(vLevel, SENSITIVITY_TABLES.V_SENSE.length - 1);
  nextSources['1'] = (nextSources['1'] ?? 0) + SENSITIVITY_TABLES.V_SENSE[vBonusIndex];

  // 4. A감각에 따른 쾌A 가산 (A감각은 2번 소스에 매핑)
  const aLevel = targetAbl['3'] ?? 0;
  const aBonusIndex = Math.min(aLevel, SENSITIVITY_TABLES.A_SENSE.length - 1);
  nextSources['2'] = (nextSources['2'] ?? 0) + SENSITIVITY_TABLES.A_SENSE[aBonusIndex];

  return nextSources;
}

/**
 * 조교 대상과 조교자의 특수 소질(TALENT) 및 상태를 대조하여 
 * 쾌감, 불결, 공포 등 소스에 대한 공통 곱셈 보정(Modifiers)을 일괄 적용합니다.
 */
export function applyTalentModifiers(
  state: GameState,
  session: GameSession,
  targetCharaId: string,
  trainerCharaId: string,
  sources: Partial<Record<PalamSourceId, number>>
): Partial<Record<PalamSourceId, number>> {
  const nextSources = { ...sources };
  
  const target = state.people.characters[targetCharaId];
  const trainer = state.people.characters[trainerCharaId];
  
  if (!target || !trainer) {
    return nextSources;
  }

  // 1. 조교자의 '혀놀림' (TALENT:52) 보정
  const tongueVal = trainer.attributes.traits['52'];
  const hasTongueTalent = tongueVal === true || tongueVal === 1;
  if (hasTongueTalent) {
    // 쾌C 소스에 2배 곱함
    if (nextSources['0']) {
      nextSources['0'] = Math.trunc(nextSources['0'] * 2.0);
    }
  }

  // 2. 조교 대상의 '악취둔감' (TALENT:61) 및 '악취민감' (TALENT:62) 보정
  const insensitiveVal = target.attributes.traits['61'];
  const sensitiveVal = target.attributes.traits['62'];
  const isSmellInsensitive = insensitiveVal === true || insensitiveVal === 1;
  const isSmellSensitive = sensitiveVal === true || sensitiveVal === 1;

  if (nextSources['24']) { // 불결 소스 (원작 SOURCE:8)
    if (isSmellInsensitive) {
      nextSources['24'] = Math.trunc(nextSources['24'] / 4); // 불결 소스 1/4로 경감
    } else if (isSmellSensitive) {
      nextSources['24'] = Math.trunc(nextSources['24'] * 3); // 불결 소스 3배 증가
    }
  }

  // 3. 조교 대상의 '자존심' (TALENT:15) 보정
  const prideVal = target.attributes.traits['15'];
  const hasPride = prideVal === true || prideVal === 1;
  if (hasPride && nextSources['24']) {
    nextSources['24'] = Math.trunc(nextSources['24'] * 2); // 자존심이 있으면 불결 수치 2배 증가
  }

  // 4. 조교 대상의 '연모' (TALENT:85) 보정 (조교자가 조수인 경우 제외)
  const loveVal = target.attributes.traits['85'];
  const hasLove = loveVal === true || loveVal === 1;
  const isAssistantPlay = session.interaction.participants.assistantPlay === true;

  if (hasLove && !isAssistantPlay) {
    // 情愛 소스 2배로 증가 (애정 - 원작 SOURCE:3)
    if (nextSources['12']) { // 욕정/정애 (원작 SOURCE:3/12에 매핑)
      nextSources['12'] = Math.trunc(nextSources['12'] * 2.0);
    }
    // 불결 소스 1/10로 경감
    if (nextSources['24']) {
      nextSources['24'] = Math.trunc(nextSources['24'] / 10);
    }
  }

  return nextSources;
}
