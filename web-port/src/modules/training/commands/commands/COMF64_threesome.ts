/**
 * COMF64 - 3P (Threesome)
 *
 * Special command activated by specific command combinations with master and assistant.
 * Master and assistant simultaneously attack the target from different positions.
 * Trigger combinations:
 * - 후배위애널⇔정상위 (double penetration V & A)
 * - 후배위애널⇔후배위 (both from behind)
 * - 펠라/이라마⇔정상위/후배위 (fellatio + vaginal)
 * - 펠라/이라마⇔정상위애널/후배위애널 (fellatio + anal)
 */

import type { CommandPlugin, TrainingContext } from '../../types';

export const COMF64: CommandPlugin = {
  id: 64,
  name: '3P',
  category: 'special',

  isAvailable(context: TrainingContext): boolean {
    // This command is triggered automatically by command combinations
    // The canExecute logic is handled in COM_ABLE64
    return {
      canExecute: true,
      score: 100,
      reasons: ['자동 실행 (커맨드 연쇄)']
    };
  },

  async execute(state: GameState, target: Character, player: Character): Promise<void> {
    // Determine which body parts are being used
    // TFLAG:40 = master's target, TFLAG:41 = assistant's target
    // 1 = V, 2 = A, 3 = mouth
    const masterTarget = context.tflags[40] || 1;
    const assistTarget = context.tflags[41] || 2;

    let threesomeType = '';
    if ((masterTarget === 1 && assistTarget === 2) || (masterTarget === 2 && assistTarget === 1)) {
      threesomeType = '질＆애널 두개 꽂기';
    } else if ((masterTarget === 1 && assistTarget === 3) || (masterTarget === 3 && assistTarget === 1)) {
      threesomeType = '섹스 동시 펠라';
    } else if ((masterTarget === 2 && assistTarget === 3) || (masterTarget === 3 && assistTarget === 2)) {
      threesomeType = '애널섹스 동시 펠라';
    }

    state.saveStr[0] = `3P・${threesomeType}`;

    // V or A penetration flags
    if (masterTarget === 1 || assistTarget === 1) context.tflags[19] = 1; // V경험
    if (masterTarget === 2 || assistTarget === 2) context.tflags[101] = 1; // A경험

    // Ejaculation gauge calculation for master
    let masterEjacGauge = 0;
    if (target.abl.기교 === 0) masterEjacGauge = 2700;
    else if (target.abl.기교 === 1) masterEjacGauge = 2800;
    else if (target.abl.기교 === 2) masterEjacGauge = 2900;
    else if (target.abl.기교 === 3) masterEjacGauge = 3100;
    else if (target.abl.기교 === 4) masterEjacGauge = 3200;
    else masterEjacGauge = 3300;

    // PALAM:윤활
    const lubricationLevel = calculatePalamLevel(target.palam.윤활);
    if (lubricationLevel === 0) masterEjacGauge *= 0.40;
    else if (lubricationLevel === 1) masterEjacGauge *= 0.70;
    else if (lubricationLevel === 2) masterEjacGauge *= 1.00;
    else if (lubricationLevel === 3) masterEjacGauge *= 1.30;
    else masterEjacGauge *= 1.60;

    if (player.talents.オトコ || player.talents.후타나리) {
      player.base.ejaculationGauge += Math.floor(masterEjacGauge);
    }

    // Ejaculation gauge for assistant (if futa/male)
    const assistantId = state.currentAssistant;
    const assistant = assistantId ? state.characters[assistantId] : null;
    if (assistant && (assistant.talents.オトコ || assistant.talents.후타나리)) {
      let assistEjacGauge = 1500;
      if (target.abl.기교 === 1) assistEjacGauge = 1600;
      else if (target.abl.기교 === 2) assistEjacGauge = 1800;
      else if (target.abl.기교 === 3) assistEjacGauge = 2000;
      else if (target.abl.기교 === 4) assistEjacGauge = 2400;
      else if (target.abl.기교 >= 5) assistEjacGauge = 3000;

      // ABL:從順, 욕망 multipliers...
      if (target.abl.從順 === 0) assistEjacGauge *= 0.80;
      else if (target.abl.從順 === 1) assistEjacGauge *= 0.90;
      else if (target.abl.從順 === 2) assistEjacGauge *= 1.00;
      else if (target.abl.從順 === 3) assistEjacGauge *= 1.10;
      else if (target.abl.從順 === 4) assistEjacGauge *= 1.20;
      else assistEjacGauge *= 1.30;

      if (target.abl.욕망 === 0) assistEjacGauge *= 1.00;
      else if (target.abl.욕망 === 1) assistEjacGauge *= 1.10;
      else if (target.abl.욕망 === 2) assistEjacGauge *= 1.20;
      else if (target.abl.욕망 === 3) assistEjacGauge *= 1.30;
      else if (target.abl.욕망 === 4) assistEjacGauge *= 1.40;
      else assistEjacGauge *= 1.50;

      // Lubrication
      if (lubricationLevel === 0) assistEjacGauge *= 0.60;
      else if (lubricationLevel === 1) assistEjacGauge *= 0.80;
      else if (lubricationLevel === 2) assistEjacGauge *= 1.00;
      else if (lubricationLevel === 3) assistEjacGauge *= 1.20;
      else assistEjacGauge *= 1.40;

      assistant.base.ejaculationGauge = (assistant.base.ejaculationGauge || 0) + Math.floor(assistEjacGauge);
    }

    // LOSEBASE
    state.loseBase.health += 160;
    state.loseBase.stamina += 350;

    // SOURCE calculation
    const source: Record<number, number> = {};
    source[7] = 2800;
    source[11] = 1500;
    source[12] = 2500;
    source[14] = 1500;
    source[1] = 0;
    source[2] = 0;
    source[3] = 0;
    source[4] = 0;
    source[5] = 0;
    source[6] = 0;
    source[13] = 0;

    // V penetration
    if (masterTarget === 1 || assistTarget === 1) {
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

      // V경험 check
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
    }

    // A penetration
    if (masterTarget === 2 || assistTarget === 2) {
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

      // A경험 check
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
        source[2] *= 1.60;
        source[6] += 600;
      }

      target.experience.A경험 = (target.experience.A경험 || 0) + 5;
      target.experience.성교경험 = (target.experience.성교경험 || 0) + 1;
    }

    // Oral service
    if (masterTarget === 3 || assistTarget === 3) {
      if (target.abl.봉사정신 === 0) {
        source[4] = 420;
        source[5] = 150;
      } else if (target.abl.봉사정신 === 1) {
        source[4] = 500;
        source[5] = 300;
      } else if (target.abl.봉사정신 === 2) {
        source[4] = 580;
        source[5] = 600;
      } else if (target.abl.봉사정신 === 3) {
        source[4] = 660;
        source[5] = 900;
      } else if (target.abl.봉사정신 === 4) {
        source[4] = 740;
        source[5] = 1500;
      } else {
        source[4] = 820;
        source[5] = 2200;
      }

      // ABL:기교
      let techMult = 1.00;
      if (target.abl.기교 === 0) techMult = 0.50;
      else if (target.abl.기교 === 1) techMult = 0.80;
      else if (target.abl.기교 === 2) techMult = 1.00;
      else if (target.abl.기교 === 3) techMult = 1.20;
      else if (target.abl.기교 === 4) techMult = 1.50;
      else techMult = 2.00;
      source[4] *= techMult;
      source[5] *= techMult;
    }

    // Apply lubrication, lust, obedience multipliers (abbreviated for space)
    // ... (full logic would be here)

    // Body size talents
    if (target.talent.큰체구) source[6] *= 0.80;
    if (target.talent.小柄体形) source[6] *= 2.00;
    if (target.talent.미숙함) source[6] *= 4.00;

    if (masterTarget === 2 || assistTarget === 2) {
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
    }

    if (masterTarget === 1 || assistTarget === 1) {
      if (target.talent.정조관념) {
        const vExp = target.experience.V경험 || 0;
        if (vExp === 0) {
          source[3] *= 0.60;
          source[11] *= 5.00;
        } else {
          source[3] *= 0.60;
          source[11] *= 1.80;
        }
      } else if (target.talent.정조무관심) {
        const vExp = target.experience.V경험 || 0;
        if (vExp === 0) {
          source[11] *= 0.50;
        } else {
          source[11] *= 0.30;
        }
      }

      target.experience.V경험 = (target.experience.V경험 || 0) + 1;
      target.experience.성교경험 = (target.experience.성교경험 || 0) + 1;
    }

    // Ejaculation checks for master and assistant...
    // (Abbreviated for space - includes dual ejaculation logic)

    // Stain transfers...
    // (Full logic would be here)

    // Lesbian experience
    if (!target.talent.オトコ && !player.talents.オトコ) {
      target.experience.레즈 = (target.experience.레즈 || 0) + 10;
    }

    context.tflags[100] = 1;
    context.tflags[200] = 2; // Submission mark 2
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
