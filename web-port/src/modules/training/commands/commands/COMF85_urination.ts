/**
 * COMF85 - 방뇨 (Urination / Forced Peeing)
 *
 * Target urinates on command - extreme humiliation command.
 * Shame and corruption heavily influenced by location (outdoor, mirror, bathroom).
 * Heavily affected by various personality traits.
 * No canExecute check - always available.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF85: CommandPlugin = {
  id: 85,
  name: '방뇨',
  category: 'extreme',

  isAvailable(context: TrainingContext): boolean {
    // No execution check - always available
    return {
      canExecute: true,
      score: 100,
      reasons: ['자동 실행']
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    // Check for location modifiers
    let locationPrefix = '';
    if (state.location === '공개') locationPrefix = '공개 ';
    if (state.location === '야외') locationPrefix = '야외 ';

    state.saveStr[0] = `${locationPrefix}방뇨`;

    // LOSEBASE
    state.loseBase.health += 10;
    state.loseBase.stamina += 200;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[14] = 5000; // Corruption
    source[5] = 3000; // Obedience

    // PALAM:욕정 (lust) - slightly affects shame
    const lustLevel = calculatePalamLevel(target.palam.욕정);
    if (lustLevel === 0) source[12] = 1800;
    else if (lustLevel === 1) source[12] = 1900;
    else if (lustLevel === 2) source[12] = 2000;
    else if (lustLevel === 3) source[12] = 2100;
    else source[12] = 2200;

    // ABL:노출벽 (exhibitionism) - reduces shame, increases pleasure
    if (target.abl.노출벽 === 0) {
      source[7] = 0;
      source[13] = 6000;
    } else if (target.abl.노출벽 === 1) {
      source[7] = 30;
      source[13] = 5000;
    } else if (target.abl.노출벽 === 2) {
      source[7] = 100;
      source[13] = 4000;
    } else if (target.abl.노출벽 === 3) {
      source[7] = 300;
      source[13] = 3000;
    } else if (target.abl.노출벽 === 4) {
      source[7] = 500;
      source[13] = 2000;
    } else {
      source[7] = 1000;
      source[13] = 1000;
    }

    // ABL:마조끼 (masochism) - increases pleasure and resistance
    if (target.abl.마조끼 === 0) {
      source[7] *= 0.80;
      source[12] *= 0.80;
      source[10] = 100;
      source[11] = 100;
    } else if (target.abl.마조끼 === 1) {
      source[7] *= 1.00;
      source[12] *= 1.00;
      source[10] = 200;
      source[11] = 300;
    } else if (target.abl.마조끼 === 2) {
      source[7] *= 1.30;
      source[12] *= 1.20;
      source[10] = 400;
      source[11] = 700;
    } else if (target.abl.마조끼 === 3) {
      source[7] *= 1.40;
      source[12] *= 1.40;
      source[10] = 700;
      source[11] = 1200;
    } else if (target.abl.마조끼 === 4) {
      source[7] *= 1.70;
      source[12] *= 1.50;
      source[10] = 1100;
      source[11] = 1800;
    } else {
      source[7] *= 2.00;
      source[12] *= 1.70;
      source[10] = 1500;
      source[11] = 2500;
    }

    // Location modifiers
    if (state.location === '야외') {
      source[12] *= 2.50;
      source[14] *= 2.50;
    } else if (state.location === '큰거울') {
      source[12] *= 1.50;
      source[14] *= 1.50;
    } else if (state.location === '욕실') {
      source[12] *= 0.50;
      source[14] *= 0.50;
    }

    // Experience-based shame multiplier
    let shameMult = 100;
    const urinationExp = target.experience.방뇨경험 || 0;
    if (urinationExp < 10) shameMult *= 3.00;
    else if (urinationExp < 50) shameMult *= 2.50;
    else if (urinationExp < 150) shameMult *= 2.00;
    else if (urinationExp < 500) shameMult *= 1.00;
    else if (urinationExp < 1500) shameMult *= 0.80;
    else shameMult *= 0.60;

    // Personality trait modifiers
    if (target.talent.겁쟁이) shameMult *= 1.20;
    if (target.talent.반항적) shameMult *= 2.00;
    if (target.talent.프라이드_높음) shameMult *= 2.00;
    if (target.talent.프라이드_낮음) shameMult *= 0.80;
    if (target.talent.자제심) shameMult *= 1.50;
    if (target.talent.감정부족) shameMult *= 0.60;
    if (target.talent.튀고_싶어함) shameMult *= 0.80;
    if (target.talent.억압) shameMult *= 3.00;
    if (target.talent.저항) shameMult *= 3.00;
    if (target.talent.수줍음) shameMult *= 3.50;
    if (target.talent.부끄럼_없음) shameMult *= 0.50;

    // TALENT:노출광 (exhibitionist)
    if (target.talent.노출광) {
      source[7] += 500;
      source[12] *= 1.50;
    }

    source[14] += shameMult * 5;

    // 방뇨경험 UP
    target.experience.방뇨경험 = (target.experience.방뇨경험 || 0) + 2;

    // Urine stains
    target.stains.vagina |= 32; // Urine stain
    target.stains.penis |= 32; // Urine stain

    // Lesbian/gay experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 = (target.experience.레즈 || 0) + 1;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 = (target.experience.호모 || 0) + 1;
    }

    context.tflags[200] = 2; // Submission mark 2

    // Clear diuretic flag if present
    if (state.equipFlags.이뇨제) {
      state.equipFlags.이뇨제 = false;
    }
  }
};

function calculatePalamLevel(value: number): number {
  if (value < 100) return 0;
  if (value < 300) return 1;
  if (value < 600) return 2;
  if (value < 1000) return 3;
  if (value < 1500) return 4;
  return 5;
}
