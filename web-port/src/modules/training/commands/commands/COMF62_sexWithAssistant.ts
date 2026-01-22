/**
 * COMF62 - 조수를 범한다 (Sex with Assistant)
 *
 * Trainer has sex with the assistant in front of the training target.
 * Causes significant psychological impact, especially if the assistant is a family member.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF62: CommandPlugin = {
  id: 62,
  name: '조수를 범한다',
  category: 'assistant',

  isAvailable(context: TrainingContext): boolean {
    const reasons: string[] = [];
    let score = 0;

    // Incest check between target and assistant
    context.tflags[14] = 0;
    // CALL INCEST with PLAYER = ASSI would be done here

    // ABL:욕망
    if (target.abl.욕망 > 0) {
      score += target.abl.욕망 * 2;
      reasons.push(`욕망 LV${target.abl.욕망}(${target.abl.욕망 * 2})`);
    }

    // ABL:봉사정신
    if (target.abl.봉사정신 > 0) {
      score += target.abl.봉사정신 * 4;
      reasons.push(`봉사정신 LV${target.abl.봉사정신}(${target.abl.봉사정신 * 4})`);
    }

    // MARK:쾌락각인
    if (target.mark.쾌락각인 > 0) {
      score += target.mark.쾌락각인 * 2;
      reasons.push(`쾌락각인 LV${target.mark.쾌락각인}(${target.mark.쾌락각인 * 2})`);
    }

    // PALAM:욕정
    const lustLevel = calculatePalamLevel(target.palam.욕정);
    if (lustLevel > 0) {
      score += lustLevel * 2;
      reasons.push(`욕정 LV${lustLevel}(${lustLevel * 2})`);
    }

    // TALENT:수줍음
    if (target.talent.수줍음) {
      score -= 1;
      reasons.push(`수줍음(-1)`);
    }

    // TALENT:헌신적
    if (target.talent.헌신적) {
      score += 6;
      reasons.push(`헌신적(6)`);
    }

    // TALENT:愛
    if (target.talent.愛 && state.assistantPlayMode === 0) {
      score += 5;
      reasons.push(`愛(5)`);
    }

    // Assistant is virgin penalty
    const assistantId = state.currentAssistant;
    if (assistantId && state.characterExp[assistantId]?.V경험 === 0) {
      score -= 15;
      reasons.push(`조수가 처녀(-15)`);
    }

    // Incest penalties
    const incestType = context.tflags[14];
    if (incestType === 1) {
      score -= 10;
      reasons.push(`조수가 모친(-10)`);
    } else if (incestType === 2) {
      score -= 20;
      reasons.push(`조수가 딸(-20)`);
    } else if (incestType === 3) {
      score -= 5;
      reasons.push(`조수가 언니(-5)`);
    } else if (incestType === 4) {
      score -= 5;
      reasons.push(`조수가 여동생(-5)`);
    }

    const threshold = 40;
    const canExecute = score >= threshold;

    return {
      canExecute,
      score,
      reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '조수를 범한다';

    // Ejaculation gauge calculation based on assistant's abilities
    let ejacGauge = 0;
    const assistantId = state.currentAssistant;
    const assistant = assistantId ? state.characters[assistantId] : null;

    if (!assistant) return;

    // Based on assistant's ABL:기교
    if (assistant.abl.기교 === 0) ejacGauge = 50;
    else if (assistant.abl.기교 === 1) ejacGauge = 300;
    else if (assistant.abl.기교 === 2) ejacGauge = 800;
    else if (assistant.abl.기교 === 3) ejacGauge = 1500;
    else if (assistant.abl.기교 === 4) ejacGauge = 2000;
    else ejacGauge = 3200;

    // Assistant's ABL:従順
    if (assistant.abl.從順 === 0) ejacGauge *= 0.80;
    else if (assistant.abl.從順 === 1) ejacGauge *= 0.90;
    else if (assistant.abl.從順 === 2) ejacGauge *= 1.00;
    else if (assistant.abl.從순 === 3) ejacGauge *= 1.10;
    else if (assistant.abl.從順 === 4) ejacGauge *= 1.20;
    else ejacGauge *= 1.30;

    // Assistant's ABL:성교기술
    if (assistant.abl.성교기술 === 0) ejacGauge *= 0.50;
    else if (assistant.abl.성교기술 === 1) ejacGauge *= 0.80;
    else if (assistant.abl.성교기술 === 2) ejacGauge *= 1.20;
    else if (assistant.abl.성교기술 === 3) ejacGauge *= 1.50;
    else if (assistant.abl.성교기술 === 4) ejacGauge *= 1.80;
    else ejacGauge *= 2.40;

    // Assistant's ABL:V감각
    if (assistant.abl.V감각 === 0) ejacGauge *= 0.50;
    else if (assistant.abl.V감각 === 1) ejacGauge *= 0.80;
    else if (assistant.abl.V감각 === 2) ejacGauge *= 1.00;
    else if (assistant.abl.V감각 === 3) ejacGauge *= 1.20;
    else if (assistant.abl.V감각 === 4) ejacGauge *= 1.50;
    else ejacGauge *= 2.00;

    // Assistant's EXP:V경험
    const vExp = assistant.experience.V경험 || 0;
    if (vExp < 10) ejacGauge *= 0.20;
    else if (vExp < 50) ejacGauge *= 0.50;
    else if (vExp < 150) ejacGauge *= 0.80;
    else if (vExp < 500) ejacGauge *= 1.00;
    else if (vExp < 1500) ejacGauge *= 1.20;
    else ejacGauge *= 1.40;

    // Master's ABL:C감각
    if (player.abl.C감각 === 0) ejacGauge *= 1.00;
    else if (player.abl.C감각 === 1) ejacGauge *= 1.50;
    else if (player.abl.C감각 === 2) ejacGauge *= 2.00;
    else if (player.abl.C감각 === 3) ejacGauge *= 2.50;
    else if (player.abl.C감각 === 4) ejacGauge *= 3.50;
    else ejacGauge *= 5.00;

    if (player.talents.オトコ || player.talents.후타나리) {
      player.base.ejaculationGauge += Math.floor(ejacGauge);
    }

    // LOSEBASE
    state.loseBase.health += 40;
    state.loseBase.stamina += 220;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[3] = 1500;
    source[14] = 800;

    // ABL:욕망
    if (target.abl.욕망 === 0) {
      source[10] = 200;
      source[13] = 1600;
    } else if (target.abl.욕망 === 1) {
      source[10] = 400;
      source[13] = 1900;
    } else if (target.abl.욕망 === 2) {
      source[10] = 750;
      source[13] = 2300;
    } else if (target.abl.욕망 === 3) {
      source[10] = 1200;
      source[13] = 2700;
    } else if (target.abl.욕망 === 4) {
      source[10] = 1700;
      source[13] = 3100;
    } else {
      source[10] = 2500;
      source[13] = 3500;
    }

    // ABL:봉사정신
    if (target.abl.봉사정신 === 0) {
      source[3] *= 0.10;
      source[10] *= 0.50;
    } else if (target.abl.봉사정신 === 1) {
      source[3] *= 0.40;
      source[10] *= 0.80;
    } else if (target.abl.봉사정신 === 2) {
      source[3] *= 0.70;
      source[10] *= 1.00;
    } else if (target.abl.봉사정신 === 3) {
      source[3] *= 1.00;
      source[10] *= 1.50;
    } else if (target.abl.봉사정신 === 4) {
      source[3] *= 1.60;
      source[10] *= 2.00;
    } else {
      source[3] *= 2.00;
      source[10] *= 2.50;
    }

    // Assistant's V경험 and 성교경험 UP
    if (assistant) {
      assistant.experience.V경험 = (assistant.experience.V경험 || 0) + 1;
      assistant.experience.성교경험 = (assistant.experience.성교경험 || 0) + 1;
    }

    // Incest multipliers
    const incestType = context.tflags[14];
    if (incestType === 1 || incestType === 2) {
      source[13] *= 3.00;
      source[14] *= 3.00;
      if (target.abl.從順 < 3) {
        target.abl.從順 = 3;
      }
    } else if (incestType === 3 || incestType === 4) {
      source[13] *= 2.00;
      source[14] *= 2.00;
      if (target.abl.從順 < 2) {
        target.abl.從順 = 2;
      }
    } else if (incestType === 5) {
      source[13] *= 1.50;
      source[14] *= 1.50;
      if (target.abl.從順 < 2) {
        target.abl.從順 = 2;
      }
    }

    context.tflags[14] = 0;

    // Virginity loss for trainer if applicable
    if (player.talents.동정) {
      player.talents.동정 = false;
    }

    // Ejaculation check
    const ejacThreshold = player.base.maxEjaculation;
    let ejacLevel = 0;
    if (player.base.ejaculationGauge > ejacThreshold * 2) ejacLevel = 2;
    else if (player.base.ejaculationGauge > ejacThreshold) ejacLevel = 1;

    if (ejacLevel > 0) {
      // Semen addiction check
      if (target.abl.정액중독 === 0) {
        source[13] *= 1.00;
      } else if (target.abl.정액중독 === 1) {
        source[13] *= 1.20;
      } else if (target.abl.정액중독 === 2) {
        source[13] *= 1.50;
      } else if (target.abl.정액중독 === 3) {
        source[13] *= 2.00;
      } else if (target.abl.정액중독 === 4) {
        source[13] *= 2.50;
      } else {
        source[13] *= 3.00;
      }
    }

    if (ejacLevel === 2) {
      source[10] *= 1.50;
      player.experience.사정 += 2;
      target.experience.정액 += 1;
      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold * 2;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }
      context.tflags[7] = 2;
    } else if (ejacLevel === 1) {
      player.experience.사정 += 1;
      player.stains.penis |= 4;
      player.base.ejaculationGauge -= ejacThreshold;
      if (player.base.ejaculationGauge >= ejacThreshold) {
        player.base.ejaculationGauge = ejacThreshold - 1;
      }
      context.tflags[7] = 1;
    }

    // Stain transfer
    if (player.talents.オトコ || player.talents.후타나리) {
      if (assistant) {
        player.stains.penis |= assistant.stains.vagina;
        assistant.stains.vagina |= player.stains.penis;
      }
    }

    // Lesbian/gay experience
    if (!player.talents.オトコ && assistant && !assistant.talents.オトコ) {
      if (assistant) {
        assistant.experience.레즈 = (assistant.experience.레즈 || 0) + 10;
      }
    } else if (player.talents.オトコ && assistant && assistant.talents.オトコ) {
      if (assistant) {
        assistant.experience.호모 = (assistant.experience.호모 || 0) + 10;
      }
    }

    context.tflags[100] = 1;
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
