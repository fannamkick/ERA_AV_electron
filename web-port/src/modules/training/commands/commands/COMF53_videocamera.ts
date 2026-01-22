// COMF53: 비디오카메라 (Video Camera)

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF53_VideoCamera: TrainingCommand = {
  id: 53,
  name: '비디오카메라',

  async execute(context: TrainingContext): Promise<number> {
    const { savestr, flags, printFn } = context;

    savestr[0] = '비디오카메라';
    await context.callTrainMessageB();

    // カウントは10回とします
    const k = 10;

    if (flags.TEQUIP[53]) {
      // ビデオ撮影がされていれば終了させる
      // テープは終了時に数を減らす
      flags.TEQUIP[53] = 0;
      // items[28] -= 1;
    } else {
      // ビデオ撮影してなければ初期化して開始
      flags.TEQUIP[53] = 1;
      flags.TFLAG[70] = 0;
      for (let count = 0; count < k; count++) {
        const s = count + 11;
        flags.FLAG[s] = 0;
      }
      // 撮影開始時の状態を記録
      flags.FLAG[22] = 0;
      if (flags.TEQUIP[54]) {
        flags.FLAG[22] |= 1;
      }
      if (flags.TEQUIP[58]) {
        flags.FLAG[22] |= 2;
      }
      if (flags.TEQUIP[59]) {
        flags.FLAG[22] |= 4;
      }
      if (flags.TEQUIP[44]) {
        flags.FLAG[22] |= 8;
      }
      if (flags.TEQUIP[11]) {
        flags.FLAG[22] |= 16;
      }
      if (flags.TEQUIP[13]) {
        flags.FLAG[22] |= 32;
      }
      if (flags.TEQUIP[46]) {
        flags.FLAG[22] |= 64;
      }
      if (flags.TEQUIP[89]) {
        flags.FLAG[22] |= 128;
      }
      if (flags.TEQUIP[90]) {
        flags.FLAG[22] |= 256;
      }
      if (flags.TEQUIP[18]) {
        flags.FLAG[22] |= 512;
      }
    }

    return 1;
  },

  // -------------------------------------------------
  // 비디오 촬영중･･･
  // -------------------------------------------------
  async executeEquipped(context: TrainingContext): Promise<void> {
    const { target, flags, printFn, selectCom } = context;

    // カウントは10回とします
    const k = 10;

    if (flags.TFLAG[70] === 0) {
      // 初回はカウントに入れない
      flags.TFLAG[70] += 1;
    } else if (flags.TFLAG[70] > 0 && flags.TFLAG[70] <= k) {
      const s = flags.TFLAG[70] + 10;
      flags.FLAG[s] = selectCom;
      if (flags.ASSIPLAY) {
        flags.FLAG[s] += 1000;
      }

      printFn(`＜비디오 촬영중 ${flags.TFLAG[70]}/${k}＞`);

      flags.TFLAG[70] += 1;

      // パラメータ変化
      // TODO バランス調整(ビデオによるパラメータ変化は考慮しないか?)
      context.loseBase[0] += 0;
      context.loseBase[1] += 50;

      let a = 370;
      let b = 1750;
      let c = 700;

      // PALAM:욕정をみる
      if (target.palam[5] < target.paramlv[1]) {
        a = Math.floor(a * 0.80);
      } else if (target.palam[5] < target.paramlv[2]) {
        a = Math.floor(a * 0.90);
      } else if (target.palam[5] < target.paramlv[3]) {
        a = Math.floor(a * 1.00);
      } else if (target.palam[5] < target.paramlv[4]) {
        a = Math.floor(a * 1.10);
      } else if (target.palam[5] >= target.paramlv[4]) {
        a = Math.floor(a * 1.20);
      }

      // ABL:従順をみる
      if (target.abl[10] === 0) {
        a = Math.floor(a * 0.40);
      } else if (target.abl[10] === 1) {
        a = Math.floor(a * 0.60);
      } else if (target.abl[10] === 2) {
        a = Math.floor(a * 0.80);
      } else if (target.abl[10] === 3) {
        a = Math.floor(a * 1.00);
      } else if (target.abl[10] === 4) {
        a = Math.floor(a * 1.10);
      } else {
        a = Math.floor(a * 1.20);
      }

      // ABL:노출벽をみる
      if (target.abl[17] === 0) {
        a = Math.floor(a * 0.80);
        c = Math.floor(c * 2.00);
      } else if (target.abl[17] === 1) {
        a = Math.floor(a * 1.00);
        c = Math.floor(c * 1.70);
      } else if (target.abl[17] === 2) {
        a = Math.floor(a * 1.30);
        c = Math.floor(c * 1.40);
      } else if (target.abl[17] === 3) {
        a = Math.floor(a * 1.60);
        c = Math.floor(c * 1.00);
      } else if (target.abl[17] === 4) {
        a = Math.floor(a * 2.00);
        c = Math.floor(c * 0.80);
      } else {
        a = Math.floor(a * 3.00);
        c = Math.floor(c * 0.60);
      }

      // 도착적
      if (target.talent[80]) {
        a = Math.floor(a * 2.00);
      }
      // 튀고 싶어함
      if (target.talent[28]) {
        a = Math.floor(a * 1.50);
      }
      // 겁쟁이
      if (target.talent[10]) {
        c = Math.floor(c * 1.70);
      }
      // 노출광
      if (target.talent[89]) {
        a = Math.floor(a * 2.00);
        b = Math.floor(b * 1.20);
        c = Math.floor(c * 0.50);
      }

      context.source[10] += a;
      context.source[12] += b;
      context.source[14] += c;
    }

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    if (flags.TFLAG[70] > 1) {
      target.exp[70] += 1;
      printFn('피사경험 +1');
    }

    if (flags.ASSIPLAY === 0 && target.abl[7] >= 3) {
      flags.TFLAG[30] += 1;
    }
  },

  // -------------------------------------------------
  // テープ終了
  // -------------------------------------------------
  async rejectCamera(context: TrainingContext): Promise<void> {
    const { flags, printFn } = context;
    const k = 10;

    // テープ残量がなくなると強制的にEQUIPフラグを外す
    if (flags.TFLAG[70] > k && flags.TEQUIP[53]) {
      flags.TEQUIP[53] = 0;
      // items[28] -= 1;
      printFn('＜테이프를 전부 사용했습니다. 비디오 촬영을 종료합니다＞');
    }
  }
};
