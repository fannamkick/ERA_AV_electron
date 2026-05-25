import { CommandPlugin, TrainingContext } from '../../types';

/**
 * COMF180 - 구현 (Body Modification / Penis Toggle)
 * 원본: ERB/指導関係/COMF180.ERB (51 lines)
 *
 * Toggles penis existence (TALENT:121) and generates random penis size if creating.
 */
export const COMF180_bodyModification: CommandPlugin = {
  id: 180,
  name: '구현',
  category: '특수',
  staminaCost: 0,

  isAvailable(context: TrainingContext): boolean {
    // 원본: COMF180.ERB @COM180 (implicit availability)
    return true;
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본: COMF180.ERB @COM180 (라인 1-51)

    context.showMessage('구현');

    // 커맨드 이름 설정 (라인 7-12)
    if (context.talents[121] === 1) {
      context.saveStr[0] = '구현(페니스 소거)';
    } else {
      context.saveStr[0] = '구현(페니스 생성)';
    }

    // CALL TRAIN_MESSAGE_B

    // -------------------------------------------------
    // 기력/체력 소모 (라인 14-23)
    // -------------------------------------------------
    context.loseBase = context.loseBase || [];
    context.loseBase[0] = (context.loseBase[0] || 0) + 0;

    // 마조끼が高いと기력소비減少 (라인 16-23)
    const abl38 = context.abilities[38] || 0;
    if (abl38 === 0) {
      context.loseBase[1] = (context.loseBase[1] || 0) + 60;
    } else if (abl38 <= 2) {
      context.loseBase[1] = (context.loseBase[1] || 0) + 45;
    } else {
      context.loseBase[1] = (context.loseBase[1] || 0) + 30;
    }

    // -------------------------------------------------
    // 페니스 toggle (라인 25-44)
    // -------------------------------------------------
    context.talents = context.talents || [];

    if (context.talents[121] === 0) {
      // 페니스 생성
      context.talents[121] = 1;

      // CFLAG:18 == 0이면 남성으로 설정
      if ((context.charFlags[18] || 0) === 0) {
        context.talents[1] = 1; // 남성
      }

      // 페니스 크기 랜덤 생성 (라인 30-39)
      if ((context.maxBase?.[50] || 0) === 0) {
        if (!context.maxBase) {
          context.maxBase = [];
        }
        if (!context.base) {
          context.base = [];
        }
        if (!context.charFlags) {
          context.charFlags = {};
        }

        context.maxBase[50] = 15 + Math.floor(Math.random() * 6); // 15~20
        context.base[50] = context.maxBase[50];
        context.charFlags[611] = 1 + Math.floor(Math.random() * 3); // 1~3

        // 페니스 크기별 CFLAG:609 설정 (라인 34-38)
        if (context.maxBase[50] <= 16) {
          context.charFlags[609] = 1;
        } else {
          context.charFlags[609] = 2;
        }
      }
    } else {
      // 페니스 소거 (라인 40-44)
      context.talents[121] = 0;

      // CFLAG:18 == 0이면 여성으로 설정
      if ((context.charFlags[18] || 0) === 0) {
        context.talents[1] = 0; // 여성
      }
    }

    context.showMessage('구현 완료');
  }
};
