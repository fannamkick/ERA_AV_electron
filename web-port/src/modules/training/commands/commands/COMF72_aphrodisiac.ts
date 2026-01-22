/**
 * COMF72 - しあわせ草(미약) / Aphrodisiac
 *
 * Item use command. In other era series this corresponds to aphrodisiac items.
 * CFLAG:31 = Aphrodisiac residue in body
 * CFLAG:32 = Happiness addiction withdrawal symptom check
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF72: CommandPlugin = {
  id: 72,
  name: '미약',
  category: 'item',

  isAvailable(context: TrainingContext): boolean {
    // Aphrodisiac doesn't have execution checks - it's an item use
    return {
      canExecute: true,
      score: 100,
      reasons: ['Item use - automatic execution']
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '미약';

    // SOURCE calculation
    const source: Record<number, number> = {};

    // LOSEBASE calculation
    state.loseBase.health += 300;
    state.loseBase.stamina += 300;

    // If master or assistant has [조합지식] (Synthesis Knowledge), reduce stamina/health cost
    if (player.talents.조합지식) {
      state.loseBase.health -= 150;
      state.loseBase.stamina -= 150;
    } else if (state.assistant && state.assistant.talents.조합지식) {
      state.loseBase.health -= 150;
      state.loseBase.stamina -= 150;
    }

    // Drug experience affects health cost
    const drugExp = target.experience.약물;
    const drugExpLv1 = 100;  // EXPLV:1 threshold (example)
    const drugExpLv2 = 300;  // EXPLV:2
    const drugExpLv3 = 600;  // EXPLV:3
    const drugExpLv5 = 1500; // EXPLV:5

    if (drugExp < drugExpLv1) {
      state.loseBase.health += 300;
    } else if (drugExp < drugExpLv2) {
      state.loseBase.health += 50;
    } else if (drugExp < drugExpLv3) {
      state.loseBase.health += 0;
    } else if (drugExp < drugExpLv5) {
      state.loseBase.health -= 50;
    } else {
      state.loseBase.health -= 100;
    }

    source[14] = 2000; // Corruption

    // If addicted to happiness grass
    if (target.talent.しあわせ草중독) {
      state.loseBase.health -= 100;
      source[7] = 500;   // Addiction satisfaction
      source[14] = 1000; // Reduced corruption
      // Doubles to 20000 with aphrodisiac effect
      source[11] = 10000; // Lust increase
    } else {
      source[14] = 2000;
      // Doubles to 10000 with aphrodisiac effect
      source[11] = 5000;
    }

    // Health cost cannot go below 0
    if (state.loseBase.health < 0) {
      state.loseBase.health = 0;
    }

    // Experience increase
    // Lesbian/gay experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 += 1;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 += 1;
    }

    // Drug experience
    target.experience.약물 += 1;

    // Other processing
    // Set happiness grass usage flag
    state.targetEquip.aphrodisiac = true;

    // Consume item (if not in unlimited item mode)
    if (state.targetEquip.무한아이템 === 0) {
      state.items.しあわせ草 -= 1;
    }

    // Increase happiness grass residue concentration
    target.customFlags.aphrodisiacResidue = (target.customFlags.aphrodisiacResidue || 0) + 1;

    // If addicted to happiness grass, set withdrawal symptom avoidance flag
    if (target.talent.しあわせ草중독) {
      target.customFlags.withdrawalAvoidance = 1;
    }

    // Apply source values
    // applySourceValues(target, source);
  }
};
