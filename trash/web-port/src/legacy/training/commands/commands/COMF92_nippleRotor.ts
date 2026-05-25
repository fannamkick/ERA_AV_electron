/**
 * COMF92 - 유두로터 (Nipple Rotor)
 *
 * Simple equipment command - applies rotor to nipples.
 * Focuses on breast sensation pleasure.
 * No canExecute check - always available.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF92: CommandPlugin = {
  id: 92,
  name: '유두로터',
  category: 'equipment',

  isAvailable(context: TrainingContext): boolean {
    // No execution check - equipment command
    return {
      canExecute: true,
      score: 100,
      reasons: ['자동 실행']
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '유두로터';

    // LOSEBASE
    state.loseBase.health += 10;
    state.loseBase.stamina += 80;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[12] = 120; // Shame
    source[14] = 70; // Corruption

    // ABL:B감각 - breast sensation
    if (target.abl.B감각 === 0) source[17] = 150;
    else if (target.abl.B감각 === 1) source[17] = 300;
    else if (target.abl.B감각 === 2) source[17] = 675;
    else if (target.abl.B감각 === 3) source[17] = 1200;
    else if (target.abl.B감각 === 4) source[17] = 1800;
    else source[17] = 2250;

    // Lesbian/gay experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 = (target.experience.레즈 || 0) + 1;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 = (target.experience.호모 || 0) + 1;
    }

    // Nipple experience
    target.experience.젖꼭지경험 = (target.experience.젖꼭지경험 || 0) + 1;
  }
};
