// COMF48: 풋잡한다 (Make Target Do Footjob)
// SM系コマンド: 調教者が調教対象の%CSTR:80%を足で刺激

import { TrainingCommand } from '../command-interface';
import { TrainingContext } from '../training-context';

export const COMF48_Footjob: TrainingCommand = {
  id: 48,
  name: '풋잡한다',

  async execute(context: TrainingContext): Promise<number> {
    const { target, player, savestr, flags, printFn } = context;

    printFn('풋잡한다');
    savestr[0] = '풋잡한다';
    await context.callTrainMessageB();

    context.loseBase[0] += 10;
    context.loseBase[1] += 60;

    // -------------------------------------------------
    // ソースの計算
    // -------------------------------------------------
    context.source[12] = 150;
    context.source[14] = 400;

    // ABL:C感覚をみる
    if (target.abl[0] === 0) {
      context.source[0] = 30;
    } else if (target.abl[0] === 1) {
      context.source[0] = 100;
    } else if (target.abl[0] === 2) {
      context.source[0] = 200;
    } else if (target.abl[0] === 3) {
      context.source[0] = 500;
    } else if (target.abl[0] === 4) {
      context.source[0] = 1000;
    } else {
      context.source[0] = 1500;
    }

    // ABL:마조끼をみる
    if (target.abl[21] === 0) {
      context.source[0] = Math.floor(context.source[0] * 1.00);
      context.source[14] = Math.floor(context.source[14] * 1.00);
    } else if (target.abl[21] === 1) {
      context.source[0] = Math.floor(context.source[0] * 1.20);
      context.source[14] = Math.floor(context.source[14] * 0.80);
    } else if (target.abl[21] === 2) {
      context.source[0] = Math.floor(context.source[0] * 1.50);
      context.source[14] = Math.floor(context.source[14] * 0.60);
    } else if (target.abl[21] === 3) {
      context.source[0] = Math.floor(context.source[0] * 1.80);
      context.source[14] = Math.floor(context.source[14] * 0.40);
    } else if (target.abl[21] === 4) {
      context.source[0] = Math.floor(context.source[0] * 2.20);
      context.source[14] = Math.floor(context.source[14] * 0.20);
    } else {
      context.source[0] = Math.floor(context.source[0] * 3.00);
      context.source[14] = Math.floor(context.source[14] * 0.00);
    }

    // -------------------------------------------------
    // 汚れの処理
    // -------------------------------------------------

    // -------------------------------------------------
    // 経験上昇
    // -------------------------------------------------
    // 피학쾌락경험
    if (target.talent[88] === 1 || (target.abl[11] >= 3 && target.abl[21] >= 3)) {
      printFn(`${context.getExpName(30)}+3`);
      target.exp[30] += 3;
    } else if (target.abl[11] >= 3 && target.abl[21] >= 1) {
      printFn(`${context.getExpName(30)}+2`);
      target.exp[30] += 2;
    } else if (target.abl[11] >= 3 || target.abl[21] >= 1) {
      printFn(`${context.getExpName(30)}+1`);
      target.exp[30] += 1;
    }

    // レズ・ホモ経験
    if (target.talent[122] === 0 && player.talent[122] === 0) {
      printFn(`${context.getExpName(40)} +3`);
      target.exp[40] += 3;
    } else if (target.talent[122] === 1 && player.talent[122] === 1) {
      printFn(`${context.getExpName(41)} +3`);
      target.exp[41] += 3;
    }

    await eventSeitsuAsikoki(context);

    // 애정경험
    let e: number;
    if (target.talent[122]) {
      e = 2;
    } else {
      e = 1;
    }
    if (target.cflag[2] >= 1000 && flags.ASSIPLAY === 0) {
      printFn(`${context.getExpName(23)}+${e}`);
      target.exp[23] += e;
    }
    e = 0;

    return 1;
  }
};

// -------------------------------------------------
// 精通(풋잡)
// -------------------------------------------------
async function eventSeitsuAsikoki(context: TrainingContext): Promise<number> {
  const { target, player, flags } = context;
  const a = player.no;

  // 【남성】か【후타나리】であり【미숙함】
  if (!((target.talent[121] === 0 && target.talent[122] === 0) || target.talent[135] === 0)) {
    return 0;
  }
  // 更に［C感度］5以上で촉수調教や獣姦でなく
  if (target.abl[0] <= 4 || flags.TEQUIP[90] || flags.TEQUIP[89]) {
    return 0;
  }
  // 「調教対象」から「調教者」への関係が150以上
  if (target.relation[a] < 150) {
    return 0;
  }
  context.printFn(`${context.getName(player.no)}에 足で${context.getCStr(80)}을 踏まれる内に, ${context.getName(target.no)}는 精通을 迎えた…`);
  target.talent[135] = 0;

  return 1;
}
