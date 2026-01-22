/**
 * COMF82 - 애널피스트 (Anal Fisting)
 *
 * Extreme command where the trainer inserts their fist into the target's anus.
 * Even more painful than vaginal fisting with significant pain based on experience.
 * No canExecute check - always available.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF82: CommandPlugin = {
  id: 82,
  name: '애널피스트',
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
    state.saveStr[0] = '애널피스트';

    // LOSEBASE
    state.loseBase.health += 600;
    state.loseBase.stamina += 300;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[6] = 1200; // Pain
    source[12] = 1200; // Shame
    source[13] = 1200; // Submission
    source[14] = 1200; // Corruption
    source[16] = 1200; // Fear

    // ABL:A감각
    if (target.abl.A감각 === 0) {
      source[2] = 10;
      source[3] = 10;
      source[13] = 100;
    } else if (target.abl.A감각 === 1) {
      source[2] = 30;
      source[3] = 30;
      source[13] = 700;
    } else if (target.abl.A감각 === 2) {
      source[2] = 500;
      source[3] = 100;
      source[13] = 1500;
    } else if (target.abl.A감각 === 3) {
      source[2] = 1000;
      source[3] = 200;
      source[13] = 3000;
    } else if (target.abl.A감각 === 4) {
      source[2] = 1700;
      source[3] = 450;
      source[13] = 5000;
    } else {
      source[2] = 2200;
      source[3] = 750;
      source[13] = 8000;
    }

    // EXP:A경험 check
    const aExp = target.experience.A경험 || 0;
    if (aExp < 10) {
      source[2] *= 0.10;
      source[6] = 20000;
    } else if (aExp < 50) {
      source[2] *= 0.30;
      source[6] = 12000;
    } else if (aExp < 150) {
      source[2] *= 0.50;
      source[6] = 5000;
    } else if (aExp < 500) {
      source[2] *= 1.00;
      source[6] = 1800;
    } else if (aExp < 1500) {
      source[2] *= 1.40;
      source[6] = 1000;
    } else {
      source[2] *= 1.60;
      source[6] = 600;
    }

    // PALAM:윤활 (lubrication)
    const lubLevel = calculatePalamLevel(target.palam.윤활);
    if (lubLevel === 0) {
      source[2] *= 0.40;
      source[6] += 10000;
    } else if (lubLevel === 1) {
      source[2] *= 0.80;
      source[6] += 3600;
    } else if (lubLevel === 2) {
      source[2] *= 1.00;
      source[6] += 1200;
    } else if (lubLevel === 3) {
      source[2] *= 1.40;
      source[6] += 200;
    } else {
      source[2] *= 1.80;
      source[6] += 100;
    }

    // PALAM:욕정 (lust)
    const lustLevel = calculatePalamLevel(target.palam.욕정);
    if (lustLevel === 0) {
      source[2] *= 0.60;
      source[13] *= 0.60;
    } else if (lustLevel === 1) {
      source[2] *= 0.80;
      source[13] *= 0.80;
    } else if (lustLevel === 2) {
      source[2] *= 1.00;
      source[13] *= 1.00;
    } else if (lustLevel === 3) {
      source[2] *= 1.20;
      source[13] *= 1.20;
    } else {
      source[2] *= 1.40;
      source[13] *= 1.40;
    }

    // Body size talents
    if (target.talent.큰체구) source[6] *= 0.80;
    if (target.talent.小柄体形) source[6] *= 2.00;
    if (target.talent.미숙함) source[6] *= 4.00;

    // TALENT:A민감 / A둔감
    if (target.talent.A민감) {
      source[6] *= 1.50;
      source[13] *= 1.50;
      source[14] *= 1.50;
    } else if (target.talent.A둔감) {
      source[6] *= 0.60;
      source[13] *= 0.60;
      source[14] *= 0.60;
    }

    // Virgin with chastity concept
    if ((target.experience.V경험 || 0) === 0 && target.talent.정조관념) {
      source[13] = Math.floor(source[13] / 3);
    }

    // A경험 flag
    context.tflags[101] = 1;

    // A경험 UP
    target.experience.A경험 = (target.experience.A경험 || 0) + 25;

    // First time A확장경험
    if ((target.experience.A확장경험 || 0) === 0) {
      target.experience.이상 = (target.experience.이상 || 0) + 1;
    }

    // A확장경험 UP
    target.experience.A확장경험 = (target.experience.A확장경험 || 0) + 1;
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
