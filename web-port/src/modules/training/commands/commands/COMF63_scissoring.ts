/**
 * COMF63 - 조개맞대기 (Scissoring / Tribadism)
 *
 * Two female characters rub their genitals together.
 * Simplified command with no execution check phase.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF63: CommandPlugin = {
  id: 63,
  name: '조개맞대기',
  category: 'lesbian',

  isAvailable(context: TrainingContext): boolean {
    // This command has no canExecute phase in the original - it always succeeds
    return {
      canExecute: true,
      score: 100,
      reasons: ['자동 실행']
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '조개맞대기';

    // LOSEBASE
    state.loseBase.health += 30;
    state.loseBase.stamina += 90;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[7] = 500;
    source[12] = 250;
    source[13] = 400;
    source[14] = 300;

    // ABL:從順
    if (target.abl.從順 === 0) source[11] = 200;
    else if (target.abl.從順 === 1) source[11] = 120;
    else if (target.abl.從順 === 2) source[11] = 60;
    else if (target.abl.從順 === 3) source[11] = 20;
    else if (target.abl.從順 === 4) source[11] = 0;
    else source[11] = 0;

    // ABL:C감각
    if (target.abl.C감각 === 0) {
      source[0] = 20;
      source[4] = 0;
      source[5] = 0;
      source[13] = 20;
      source[12] *= 0.80;
    } else if (target.abl.C감각 === 1) {
      source[0] = 80;
      source[4] = 10;
      source[5] = 50;
      source[13] = 20;
      source[12] *= 0.90;
    } else if (target.abl.C감각 === 2) {
      source[0] = 350;
      source[4] = 50;
      source[5] = 100;
      source[13] = 20;
      source[12] *= 1.00;
    } else if (target.abl.C감각 === 3) {
      source[0] = 750;
      source[4] = 100;
      source[5] = 300;
      source[13] = 20;
      source[12] *= 1.10;
    } else if (target.abl.C감각 === 4) {
      source[0] = 1200;
      source[4] = 700;
      source[5] = 600;
      source[13] = 20;
      source[12] *= 1.20;
    } else {
      source[0] = 1750;
      source[4] = 2000;
      source[5] = 1000;
      source[13] = 20;
      source[12] *= 1.30;
    }

    // ABL:기교 (note: doesn't really affect anything in original code - all multipliers are the same)
    const techMult = 1.00;
    if (target.abl.기교 >= 0) {
      source[4] *= techMult;
      source[5] *= 0.60;
      source[13] *= 0.50;
    }

    // ABL:봉사정신
    if (target.abl.봉사정신 === 0) source[5] *= 0.50;
    else if (target.abl.봉사정신 === 1) source[5] *= 1.00;
    else if (target.abl.봉사정신 === 2) source[5] *= 1.20;
    else if (target.abl.봉사정신 === 3) source[5] *= 1.40;
    else if (target.abl.봉사정신 === 4) source[5] *= 1.70;
    else source[5] *= 2.00;

    // Trainer's ABL:C감각
    if (player.abl.C감각 === 0) {
      source[4] *= 0.80;
      source[5] *= 0.50;
    } else if (player.abl.C감각 === 1) {
      source[4] *= 0.90;
      source[5] *= 0.70;
    } else if (player.abl.C감각 === 2) {
      source[4] *= 1.00;
      source[5] *= 1.00;
    } else if (player.abl.C감각 === 3) {
      source[4] *= 1.10;
      source[5] *= 1.20;
    } else if (player.abl.C감각 === 4) {
      source[4] *= 1.20;
      source[5] *= 1.40;
    } else {
      source[4] *= 1.30;
      source[5] *= 1.70;
    }

    // Stain transfer: V ⇔ V
    target.stains.vagina |= player.stains.vagina;
    player.stains.vagina |= target.stains.vagina;

    // Lesbian experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 = (target.experience.레즈 || 0) + 8;
    }

    // Special flag for C감각 >= 3 (not in assistant play)
    if (state.assistantPlayMode === 0 && target.abl.C감각 >= 3) {
      context.tflags[30] = (context.tflags[30] || 0) + 1;
    }

    context.tflags[100] = 1;
  }
};
