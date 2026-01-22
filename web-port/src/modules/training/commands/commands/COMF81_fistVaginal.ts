/**
 * COMF81 - 피스트퍽 (Vaginal Fisting)
 *
 * Extreme command where the trainer inserts their fist into the target's vagina.
 * Causes significant pain and stretching.
 * No canExecute check - always available.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF81: CommandPlugin = {
  id: 81,
  name: '피스트퍽',
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
    state.saveStr[0] = '피스트퍽';

    // V경험 flag (virginity breaking)
    context.tflags[19] = 1;

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

    // ABL:V감각
    if (target.abl.V감각 === 0) source[1] = 2000;
    else if (target.abl.V감각 === 1) source[1] = 2500;
    else if (target.abl.V감각 === 2) source[1] = 3000;
    else if (target.abl.V감각 === 3) source[1] = 3300;
    else if (target.abl.V감각 === 4) source[1] = 3600;
    else source[1] = 3800;

    // Body size talents
    if (target.talent.큰체구) source[6] *= 0.80;
    if (target.talent.小柄体形) source[6] *= 2.00;
    if (target.talent.미숙함) source[6] *= 4.00;

    // Lesbian/gay experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 = (target.experience.레즈 || 0) + 1;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 = (target.experience.호모 || 0) + 1;
    }

    // V경험 UP
    target.experience.V경험 = (target.experience.V경험 || 0) + 25;

    // First time V확장경험
    if ((target.experience.V확장경험 || 0) === 0) {
      target.experience.이상 = (target.experience.이상 || 0) + 1;
    }

    // V확장경험 UP
    target.experience.V확장경험 = (target.experience.V확장경험 || 0) + 1;
  }
};
