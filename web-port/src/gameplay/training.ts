/**
 * 조교 시스템 (gameplay/training.ts)
 *
 * 주사위 기반 조교 커맨드 실행.
 * Store를 직접 import하지 않음 - 호출자가 결과를 Store에 반영.
 */

import type { Character } from '../types/character';
import type { CharacterCondition } from '../types/character';
import type { CheckResult } from '../types/game';
import { check, rollFormula } from '../core/dice';
import { checkAdvantage, applyActionCost, canAct } from '../core/condition';

// === 타입 ===

export interface TrainingCommand {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'advanced' | 'hard' | 'special';
  dc: number;               // 판정 DC
  targetStat: string;       // 주 대상 능력치
  effectDice: string;       // 성공 시 효과 (예: '1d4+2')
  criticalDice?: string;    // 크리티컬 시 효과 (예: '2d6+4')
  fumblePenalty?: string;   // 펌블 시 패널티 (예: '1d4')
  hpCost: number;           // HP 소비
  mpCost: number;           // MP 소비
  modifierStat?: string;    // 보정치에 사용할 능력치 키
  requirements?: {
    minAbility?: Record<string, number>;
    minStars?: number;
    tier?: string[];
  };
}

export interface TrainingResult {
  command: TrainingCommand;
  checkResult: CheckResult;
  effectValue: number;       // 실제 적용된 값
  messages: string[];        // UI 표시 메시지
  hpUsed: number;
  mpUsed: number;
  newCondition: CharacterCondition; // 비용 적용 후 새 condition
}

// === 커맨드 레지스트리 ===

const commandRegistry = new Map<string, TrainingCommand>();

export function registerCommand(cmd: TrainingCommand): void {
  commandRegistry.set(cmd.id, cmd);
}

export function registerCommands(cmds: TrainingCommand[]): void {
  cmds.forEach((cmd) => commandRegistry.set(cmd.id, cmd));
}

export function getCommand(id: string): TrainingCommand | undefined {
  return commandRegistry.get(id);
}

export function getAllCommands(): TrainingCommand[] {
  return Array.from(commandRegistry.values());
}

// === 커맨드 실행 ===

/** 커맨드 사용 가능 여부 */
export function canUseCommand(char: Character, cmd: TrainingCommand): {
  available: boolean;
  reason?: string;
} {
  if (!canAct(char)) {
    return { available: false, reason: 'HP가 부족합니다' };
  }

  if (char.condition.hp < cmd.hpCost) {
    return { available: false, reason: `HP ${cmd.hpCost} 필요 (현재: ${char.condition.hp})` };
  }

  const req = cmd.requirements;
  if (req) {
    if (req.minStars !== undefined && char.stars < req.minStars) {
      return { available: false, reason: `성장 ${req.minStars}단계 필요` };
    }
    if (req.tier && !req.tier.includes(char.tier)) {
      return { available: false, reason: `등급 ${req.tier.join('/')} 필요` };
    }
  }

  return { available: true };
}

/** 사용 가능한 커맨드 목록 */
export function getAvailableCommands(char: Character): TrainingCommand[] {
  return getAllCommands().filter((cmd) => canUseCommand(char, cmd).available);
}

/** 조교 커맨드 실행 */
export function executeTraining(
  char: Character,
  commandId: string,
): TrainingResult | null {
  const cmd = commandRegistry.get(commandId);
  if (!cmd) return null;

  const availability = canUseCommand(char, cmd);
  if (!availability.available) return null;

  // HP/MP 소비 (불변 - 새 condition 반환)
  const newCondition = applyActionCost(char.condition, cmd.hpCost, cmd.mpCost);
  if (!newCondition) return null;

  // MOOD 기반 어드밴티지
  const advantageState = checkAdvantage(char);
  const advantage = advantageState === 'advantage';
  const disadvantage = advantageState === 'disadvantage';

  // 보정치 계산 (능력치 기반)
  let modifier = 0;
  if (cmd.modifierStat && char.abl) {
    const ablKey = parseInt(cmd.modifierStat, 10);
    if (!isNaN(ablKey)) {
      modifier = Math.floor((char.abl[ablKey] ?? 0) / 2);
    }
  }

  // d20 판정
  const checkResult = check(cmd.dc, modifier, { advantage, disadvantage });

  // 효과 계산
  let effectValue = 0;
  const messages: string[] = [];

  switch (checkResult.grade) {
    case 'critical':
      // criticalDice가 있으면 그것만 사용 (이미 강화된 주사위)
      // criticalDice가 없으면 effectDice × 2
      if (cmd.criticalDice) {
        effectValue = rollFormula(cmd.criticalDice).finalTotal;
      } else {
        effectValue = rollFormula(cmd.effectDice).finalTotal * 2;
      }
      messages.push(`크리티컬! ${cmd.name} 대성공!`);
      break;
    case 'success':
      effectValue = rollFormula(cmd.effectDice).finalTotal;
      messages.push(`${cmd.name} 성공 (DC ${cmd.dc}, 판정 ${checkResult.roll.finalTotal})`);
      break;
    case 'fail':
      effectValue = 0;
      messages.push(`${cmd.name} 실패 (DC ${cmd.dc}, 판정 ${checkResult.roll.finalTotal})`);
      break;
    case 'fumble':
      if (cmd.fumblePenalty) {
        effectValue = -(rollFormula(cmd.fumblePenalty).finalTotal);
        messages.push(`펌블! ${cmd.name} 역효과 발생!`);
      } else {
        effectValue = 0;
        messages.push(`펌블! ${cmd.name} 완전 실패!`);
      }
      break;
  }

  return {
    command: cmd,
    checkResult,
    effectValue,
    messages,
    hpUsed: cmd.hpCost,
    mpUsed: cmd.mpCost,
    newCondition,
  };
}
