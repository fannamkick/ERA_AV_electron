/**
 * COMF83 - 양구멍피스트 (Double Hole Fisting)
 *
 * Extreme command where the trainer fists both vagina and anus simultaneously.
 * Combines effects of both vaginal and anal fisting with even more pain.
 * No canExecute check - always available.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF83: CommandPlugin = {
  id: 83,
  name: '양구멍피스트',
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
    state.saveStr[0] = '양구멍피스트';

    // V경험 flag (virginity breaking)
    context.tflags[19] = 1;

    // LOSEBASE
    state.loseBase.health += 800;
    state.loseBase.stamina += 500;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[6] = 1800; // Pain
    source[10] = 2800; // Lust
    source[11] = 1500; // Resistance
    source[12] = 2500; // Shame
    source[13] = 2500; // Submission
    source[14] = 2500; // Corruption
    source[16] = 2500; // Fear

    // ABL:V감각
    if (target.abl.V감각 === 0) {
      source[1] = 40;
      source[3] = 50;
    } else if (target.abl.V감각 === 1) {
      source[1] = 150;
      source[3] = 150;
    } else if (target.abl.V감각 === 2) {
      source[1] = 400;
      source[3] = 250;
    } else if (target.abl.V감각 === 3) {
      source[1] = 1000;
      source[3] = 350;
    } else if (target.abl.V감각 === 4) {
      source[1] = 1700;
      source[3] = 600;
    } else {
      source[1] = 2200;
      source[3] = 850;
    }

    // ABL:A감각
    if (target.abl.A감각 === 0) {
      source[2] = 10;
      source[3] += 10;
      source[13] = 100;
    } else if (target.abl.A감각 === 1) {
      source[2] = 30;
      source[3] += 30;
      source[13] = 700;
    } else if (target.abl.A감각 === 2) {
      source[2] = 500;
      source[3] += 100;
      source[13] = 1500;
    } else if (target.abl.A감각 === 3) {
      source[2] = 1000;
      source[3] += 200;
      source[13] = 3000;
    } else if (target.abl.A감각 === 4) {
      source[2] = 1700;
      source[3] += 450;
      source[13] = 5000;
    } else {
      source[2] = 2200;
      source[3] += 750;
      source[13] = 8000;
    }

    // EXP:V경험 check
    const vExp = target.experience.V경험 || 0;
    if (vExp < 10) {
      source[1] *= 0.20;
      source[6] += 20000;
      source[11] += 2000;

      if (!player.talents.オトコ) {
        target.experience.이상 = (target.experience.이상 || 0) + 1;
      }
    } else if (vExp < 50) {
      source[1] *= 0.60;
      source[6] += 300;
    } else if (vExp < 150) {
      source[1] *= 1.00;
      source[6] += 50;
    } else if (vExp < 500) {
      source[1] *= 1.20;
      source[6] += 10;
    } else if (vExp < 1500) {
      source[1] *= 1.40;
      source[6] += 0;
    } else {
      source[1] *= 1.60;
      source[6] = 0;
    }

    // EXP:A경험 check
    const aExp = target.experience.A경험 || 0;
    if (aExp < 10) {
      source[2] *= 0.10;
      source[6] += 5000;
      source[11] += 1000;
    } else if (aExp < 50) {
      source[2] *= 0.30;
      source[6] += 2000;
      source[11] += 1000;
    } else if (aExp < 150) {
      source[2] *= 0.50;
      source[6] += 2000;
      source[11] += 1000;
    } else if (aExp < 500) {
      source[2] *= 1.00;
      source[6] += 2000;
      source[11] += 1000;
    } else if (aExp < 1500) {
      source[2] *= 1.40;
      source[6] += 1000;
      source[11] += 200;
    } else {
      source[1] *= 1.60;
      source[6] += 600;
    }

    // PALAM:윤활 (lubrication)
    const lubLevel = calculatePalamLevel(target.palam.윤활);
    if (lubLevel === 0) {
      source[1] *= 0.20;
      source[2] *= 0.20;
      source[11] += 1000;
      source[6] += 1900;
      source[6] *= 9.00;
    } else if (lubLevel === 1) {
      source[1] *= 0.60;
      source[2] *= 0.40;
      source[11] += 800;
      source[6] += 1250;
      source[6] *= 3.00;
    } else if (lubLevel === 2) {
      source[1] *= 1.00;
      source[2] *= 0.60;
      source[11] += 600;
      source[6] += 1000;
      source[6] *= 1.50;
    } else if (lubLevel === 3) {
      source[1] *= 1.30;
      source[2] *= 1.00;
      source[11] += 200;
      source[6] += 200;
      source[6] *= 0.30;
    } else {
      source[1] *= 1.60;
      source[2] *= 1.30;
      source[6] *= 0.10;
    }

    // PALAM:욕정 (lust)
    const lustLevel = calculatePalamLevel(target.palam.욕정);
    if (lustLevel === 0) {
      source[1] *= 0.60;
      source[2] *= 0.60;
      source[13] *= 0.60;
    } else if (lustLevel === 1) {
      source[1] *= 0.80;
      source[2] *= 0.80;
      source[13] *= 0.80;
    } else if (lustLevel === 2) {
      source[1] *= 1.00;
      source[2] *= 1.00;
      source[13] *= 1.00;
    } else if (lustLevel === 3) {
      source[1] *= 1.20;
      source[2] *= 1.20;
      source[13] *= 1.20;
    } else {
      source[1] *= 1.40;
      source[2] *= 1.40;
      source[13] *= 1.40;
    }

    // ABL:從順
    if (target.abl.從順 === 0) {
      source[1] *= 0.50;
      source[2] *= 0.70;
      source[3] *= 0.60;
      source[11] *= 2.00;
    } else if (target.abl.從順 === 1) {
      source[1] *= 0.80;
      source[2] *= 0.90;
      source[3] *= 0.80;
      source[11] *= 1.20;
    } else if (target.abl.從順 === 2) {
      source[1] *= 1.00;
      source[2] *= 1.00;
      source[3] *= 1.00;
      source[11] *= 1.00;
    } else if (target.abl.從順 === 3) {
      source[1] *= 1.20;
      source[2] *= 1.10;
      source[3] *= 1.20;
      source[11] *= 0.60;
    } else if (target.abl.從順 === 4) {
      source[1] *= 1.40;
      source[2] *= 1.20;
      source[3] *= 1.40;
      source[11] *= 0.30;
    } else {
      source[1] *= 1.70;
      source[2] *= 1.30;
      source[3] *= 1.60;
      source[11] *= 0.10;
    }

    // Body size talents
    if (target.talent.큰체구) source[6] *= 0.80;
    if (target.talent.小柄体形) source[6] *= 3.00;
    if (target.talent.미숙함) source[6] *= 4.00;

    // TALENT:A민감 / A둔감
    if (target.talent.A민감) {
      source[6] *= 1.50;
      source[11] *= 1.50;
      source[13] *= 1.50;
      source[14] *= 1.50;
    } else if (target.talent.A둔감) {
      source[6] *= 0.60;
      source[11] *= 0.60;
      source[13] *= 0.60;
      source[14] *= 0.60;
    }

    // A경험 UP
    target.experience.A경험 = (target.experience.A경험 || 0) + 25;

    // TALENT:정조관념 / 정조무관심
    if (target.talent.정조관념) {
      if (vExp === 0) {
        source[3] *= 0.60;
        source[11] *= 5.00;
      } else {
        source[3] *= 0.60;
        source[11] *= 1.80;
      }
    } else if (target.talent.정조무관심) {
      if (vExp === 0) {
        source[11] *= 0.50;
      } else {
        source[11] *= 0.30;
      }
    }

    // V경험 UP
    target.experience.V경험 = (target.experience.V경험 || 0) + 25;

    // First time V확장경험
    if ((target.experience.V확장경험 || 0) === 0) {
      target.experience.이상 = (target.experience.이상 || 0) + 1;
    }

    // V확장경험 UP
    target.experience.V확장경험 = (target.experience.V확장경험 || 0) + 1;

    // First time A확장경험
    if ((target.experience.A확장경험 || 0) === 0) {
      target.experience.이상 = (target.experience.이상 || 0) + 1;
    }

    // A확장경험 UP
    target.experience.A확장경험 = (target.experience.A확장경험 || 0) + 3;
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
