/**
 * COMF67 - 풋잡 (Footjob)
 *
 * Target uses their feet to stimulate the trainer's genitals.
 * Relatively simple service command with focus on masochism.
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF67: CommandPlugin = {
  id: 67,
  name: '풋잡',
  category: 'service',

  isAvailable(context: TrainingContext): boolean {
    const reasons: string[] = [];
    let score = 0;

    // ABL:욕망
    if (target.abl.욕망 > 0) {
      score += target.abl.욕망 * 1;
      reasons.push(`욕망 LV${target.abl.욕망}(${target.abl.욕망 * 1})`);
    }

    // ABL:마조끼
    if (target.abl.마조끼 > 0) {
      score += target.abl.마조끼 * 4;
      reasons.push(`마조끼 LV${target.abl.마조끼}(${target.abl.마조끼 * 4})`);
    }

    // MARK:쾌락각인
    if (target.mark.쾌락각인 > 0) {
      score += target.mark.쾌락각인 * 1;
      reasons.push(`쾌락각인 LV${target.mark.쾌락각인}(${target.mark.쾌락각인 * 1})`);
    }

    // PALAM:욕정
    const lustLevel = calculatePalamLevel(target.palam.욕정);
    if (lustLevel > 0) {
      score += lustLevel * 1;
      reasons.push(`욕정 LV${lustLevel}(${lustLevel * 1})`);
    }

    // TALENT:보수적
    if (target.talent.보수적) {
      score -= 3;
      reasons.push(`보수적(-3)`);
    }

    // TALENT:수줍음
    if (target.talent.수줍음) {
      score -= 1;
      reasons.push(`수줍음(-1)`);
    }

    // TALENT:쾌감에 솔직
    if (target.talent.쾌감에_솔직) {
      score += 3;
      reasons.push(`쾌감에 솔직(3)`);
    }

    // TALENT:쾌감을 부정
    if (target.talent.쾌감을_부정) {
      score -= 1;
      reasons.push(`쾌감을 부정(-1)`);
    }

    // Player's ABL:정액중독 (trainer being a cum addict makes them enjoy it more)
    if (player.abl.정액중독 > 0) {
      score += player.abl.정액중독 * 1;
      reasons.push(`${player.name}의 정액중독 LV${player.abl.정액중독}(${player.abl.정액중독 * 1})`);
    }

    // TALENT:새드 (trainer)
    if (player.talents.새드) {
      score += 6;
      reasons.push(`${player.name}가 새드(6)`);
    }

    // TALENT:소악마 (trainer)
    if (player.talents.소악마) {
      score += 3;
      reasons.push(`${player.name}가 소악마(3)`);
    }

    const threshold = 16;
    const canExecute = score >= threshold;

    return {
      canExecute,
      score,
      reasons: [...reasons, `= ${score}`, `${canExecute ? '>' : score === threshold ? '=' : '<'} 실행치 ${threshold}`]
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    state.saveStr[0] = '풋잡';

    // LOSEBASE
    state.loseBase.health += 30;
    state.loseBase.stamina += 150;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[14] = 100;

    // ABL:C감각
    if (target.abl.C감각 === 0) {
      source[0] = 40;
      source[13] = 40;
    } else if (target.abl.C감각 === 1) {
      source[0] = 160;
      source[13] = 160;
    } else if (target.abl.C감각 === 2) {
      source[0] = 700;
      source[13] = 700;
    } else if (target.abl.C감각 === 3) {
      source[0] = 1500;
      source[13] = 1500;
    } else if (target.abl.C감각 === 4) {
      source[0] = 2400;
      source[13] = 2400;
    } else {
      source[0] = 3300;
      source[13] = 3300;
    }

    // ABL:마조끼
    if (target.abl.마조끼 === 0) source[5] = 150;
    else if (target.abl.마조끼 === 1) source[5] = 300;
    else if (target.abl.마조끼 === 2) source[5] = 600;
    else if (target.abl.마조끼 === 3) source[5] = 900;
    else if (target.abl.마조끼 === 4) source[5] = 1500;
    else source[5] = 2200;

    // Player's ABL:기교
    if (player.abl.기교 === 0) {
      source[0] *= 0.50;
      source[13] *= 0.50;
    } else if (player.abl.기교 === 1) {
      source[0] *= 0.80;
      source[13] *= 0.80;
    } else if (player.abl.기교 === 2) {
      source[0] *= 1.00;
      source[13] *= 1.00;
    } else if (player.abl.기교 === 3) {
      source[0] *= 1.20;
      source[13] *= 1.50;
    } else if (player.abl.기교 === 4) {
      source[0] *= 1.50;
      source[13] *= 2.50;
    } else {
      source[0] *= 2.00;
      source[13] *= 4.00;
    }

    // TALENT:도착적
    if (target.talent.도착적) {
      source[5] *= 1.80;
    }

    // Lesbian/gay experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 = (target.experience.레즈 || 0) + 4;
    } else if (target.talent.オトコ && player.talents.オトコ) {
      target.experience.호모 = (target.experience.호모 || 0) + 4;
    }

    // Trainer is futa
    if (player.talents.후타나리) {
      source[13] = Math.floor(source[13] / 2);
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
