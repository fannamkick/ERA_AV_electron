/**
 * COMF89 - 수간 플레이 (Bestiality Play)
 *
 * Toggle equipment flag for bestiality play mode.
 * When active, modifies other commands with special bestiality mechanics.
 * This is a meta-command that toggles a state rather than executing a direct action.
 * No canExecute check - always available.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF89: CommandPlugin = {
  id: 89,
  name: '수간 플레이',
  category: 'extreme',

  isAvailable(context: TrainingContext): boolean {
    // No execution check - toggles equipment state
    return {
      canExecute: true,
      score: 100,
      reasons: ['자동 실행 (상태 토글)']
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '수간 플레이';

    // Toggle bestiality play mode
    state.equipFlags.수간플레이 = !state.equipFlags.수간플레이;

    // If turning on, apply effects
    if (state.equipFlags.수간플레이) {
      // Stamina/shame based on experience
      const bestialityExp = target.experience.수간경험 || 0;

      let staminaLoss = 0;
      let shameMult = 0;

      if (bestialityExp < 10) {
        staminaLoss = 400;
        shameMult = 2000;
      } else if (bestialityExp < 50) {
        staminaLoss = 200;
        shameMult = 1000;
      } else if (bestialityExp < 150) {
        staminaLoss = 100;
        shameMult = 500;
      } else if (bestialityExp < 500) {
        staminaLoss = 50;
        shameMult = 200;
      } else if (bestialityExp < 1500) {
        staminaLoss = 20;
        shameMult = 100;
      } else {
        staminaLoss = 10;
        shameMult = 50;
      }

      // ABL:수간중독 modifiers
      if (target.abl.수간중독 === 0) {
        staminaLoss *= 1.50;
        shameMult *= 1.50;
      } else if (target.abl.수간중독 === 1) {
        staminaLoss *= 1.00;
        shameMult *= 1.00;
        state.params.pleasure += 100;
      } else if (target.abl.수간중독 === 2) {
        staminaLoss *= 0.80;
        shameMult *= 0.80;
        state.params.pleasure += 400;
      } else if (target.abl.수간중독 === 3) {
        staminaLoss *= 0.60;
        shameMult *= 0.60;
        state.params.pleasure += 1200;
      } else if (target.abl.수간중독 === 4) {
        staminaLoss *= 0.40;
        shameMult *= 0.40;
        state.params.pleasure += 3000;
      } else {
        staminaLoss *= 0.20;
        shameMult *= 0.20;
        state.params.pleasure += 5000;
      }

      // TALENT modifiers
      if (target.talent.감정부족) shameMult *= 0.60;
      if (target.talent.동물귀) shameMult *= 0.50;
      if (target.talent.암캐) {
        staminaLoss *= 0.20;
        shameMult *= 0.20;
      }

      state.loseBase.stamina += staminaLoss;
      state.params.shame += shameMult;
      state.params.corruption += shameMult;
      state.params.lust += 200;

      // Multipliers to pleasure/pain/submission
      state.multipliers.clitoral *= 1.50;
      state.multipliers.anal *= 1.50;
      state.multipliers.breast *= 1.50;
      state.multipliers.pain *= 1.50;
      state.multipliers.submission *= 3.00;

      // TALENT:동물귀 reduces submission
      if (target.talent.동물귀) {
        state.multipliers.submission /= 2;
      }

      // TALENT:암캐 enhances effects
      if (target.talent.암캐) {
        state.multipliers.service *= 1.20;
        state.multipliers.pleasure *= 1.20;
        state.multipliers.obedience *= 1.20;
        state.multipliers.lust *= 3.00;
      }

      // First time bestiality
      if (bestialityExp === 0) {
        target.experience.이상 = (target.experience.이상 || 0) + 1;
      }

      // Submission mark based on command type (would be set by actual sex command)
      context.tflags[200] = 3; // Submission mark 3 for intercourse
    }
  }
};
