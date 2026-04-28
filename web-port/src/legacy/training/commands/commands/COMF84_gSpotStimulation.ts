/**
 * COMF84 - G스팟자극 (G-spot Stimulation)
 *
 * Trainer stimulates the target's G-spot with fingers.
 * More pleasurable than painful, especially with high lubrication and experience.
 * No canExecute check - always available.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF84: CommandPlugin = {
  id: 84,
  name: 'G스팟자극',
  category: 'service',

  isAvailable(context: TrainingContext): boolean {
    // No execution check - always available
    return {
      canExecute: true,
      score: 100,
      reasons: ['자동 실행']
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = 'G스팟자극';

    // LOSEBASE
    state.loseBase.health += 50;
    state.loseBase.stamina += 180;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[3] = 300;
    source[7] = 200;
    source[10] = 500;
    source[12] = 300;
    source[14] = 400;
    source[15] = 50;

    // ABL:V감각
    if (target.abl.V감각 === 0) {
      source[1] = 10;
      source[13] = 20;
    } else if (target.abl.V감각 === 1) {
      source[1] = 150;
      source[13] = 120;
    } else if (target.abl.V감각 === 2) {
      source[1] = 600;
      source[13] = 500;
    } else if (target.abl.V감각 === 3) {
      source[1] = 1800;
      source[13] = 1200;
    } else if (target.abl.V감각 === 4) {
      source[1] = 2400;
      source[13] = 1800;
    } else {
      source[1] = 3200;
      source[13] = 2400;
    }

    // EXP:V경험 check
    const vExp = target.experience.V경험 || 0;
    if (vExp < 10) {
      source[1] *= 0.20;
      source[13] *= 0.20;
      source[6] = 150;
    } else if (vExp < 50) {
      source[1] *= 0.50;
      source[13] *= 0.50;
      source[6] = 80;
    } else if (vExp < 150) {
      source[1] *= 1.00;
      source[13] *= 0.80;
      source[6] = 80;
    } else if (vExp < 500) {
      source[1] *= 1.20;
      source[13] *= 1.00;
      source[6] = 0;
    } else if (vExp < 1500) {
      source[1] *= 1.60;
      source[13] *= 1.20;
      source[6] = 0;
    } else {
      source[1] *= 1.80;
      source[13] *= 1.50;
      source[6] = 0;
    }

    // PALAM:윤활 (lubrication) - critical for G-spot pleasure
    const lubLevel = calculatePalamLevel(target.palam.윤활);
    if (lubLevel === 0) {
      source[1] *= 0.10;
      source[6] = (source[6] || 0) + 2000;
      source[6] *= 3.00;
    } else if (lubLevel === 1) {
      source[1] *= 0.20;
      source[6] = (source[6] || 0) + 800;
      source[6] *= 1.00;
    } else if (lubLevel === 2) {
      source[1] *= 0.60;
      source[6] *= 0.80;
    } else if (lubLevel === 3) {
      source[1] *= 1.00;
      source[6] *= 0.50;
    } else {
      source[1] *= 2.00;
      source[6] *= 0.10;
    }

    // PALAM:욕정 (lust) - amplifies pleasure significantly
    const lustLevel = calculatePalamLevel(target.palam.욕정);
    if (lustLevel === 0) {
      source[1] *= 1.50;
      source[7] *= 0.90;
      source[10] *= 0.90;
    } else if (lustLevel === 1) {
      source[1] *= 1.80;
      source[7] *= 1.00;
      source[10] *= 1.00;
    } else if (lustLevel === 2) {
      source[1] *= 2.10;
      source[7] *= 1.10;
      source[10] *= 1.10;
    } else if (lustLevel === 3) {
      source[1] *= 3.20;
      source[7] *= 1.20;
      source[10] *= 1.20;
    } else {
      source[1] *= 4.30;
      source[7] *= 1.30;
      source[10] *= 1.30;
    }

    // TALENT:V민감 / V둔감
    if (target.talent.V민감) {
      source[6] = (source[6] || 0) * 1.50;
      source[13] *= 1.50;
      source[14] *= 1.50;
    } else if (target.talent.V둔감) {
      source[6] = (source[6] || 0) * 0.60;
      source[13] *= 0.60;
      source[14] *= 0.60;
    }

    // Virgin with chastity concept
    if (vExp === 0 && target.talent.정조관념) {
      source[13] *= 2.00;
    }

    // V경험 UP
    target.experience.V경험 = (target.experience.V경험 || 0) + 1;

    // Lesbian experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 = (target.experience.레즈 || 0) + 3;
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
