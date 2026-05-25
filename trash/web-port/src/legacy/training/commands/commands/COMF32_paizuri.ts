/**
 * COMF32 - 파이즈리 (Paizuri/Titjob)
 * 원본: ERB/指導関係/COMF32.ERB
 *
 * 봉사계 커맨드: 조교 대상이 조교자의 성기를 유방으로 자극
 * 입을 사용하지 않는 버전으로 123과 차별화
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF32_paizuri: CommandPlugin = {
  id: 32,
  name: '파이즈리',
  category: '봉사',
  staminaCost: 10,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE32
   */
  isAvailable: (context: TrainingContext) => {
    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF32.ERB 라인 232-554
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target, player } = context;
    const abilities = target.abl;
    const talents = context.talents;
    const playerTalents = context.playerTalents || {};

    // 더럽힘 계산 (라인 161-198)
    let dirtyValue = 0;
    if (context.stain?.player?.[2] & 1) dirtyValue += 1;
    if (context.stain?.player?.[2] & 4) dirtyValue += 3;
    if (context.stain?.player?.[2] & 8) dirtyValue += 7;
    if (context.stain?.player?.[2] & 16) dirtyValue += 1;
    if (context.stain?.player?.[4] & 32) dirtyValue += 3;

    if (talents[61]) dirtyValue = Math.floor(dirtyValue / 3);
    if (talents[62]) dirtyValue = Math.floor(dirtyValue * 2);

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE
    if (talents[47]) {
      context.loseBase[0] += 10;
      context.loseBase[1] += 70;
    } else {
      context.loseBase[0] += 10;
      context.loseBase[1] += 150;
    }

    // 봉사정신에 따른 SOURCE
    // 원본: 라인 245-270
    const service = abilities['봉사정신'] || 0;
    const serviceSettings = [
      [420, 150, 400],
      [500, 300, 300],
      [580, 600, 150],
      [660, 900, 50],
      [740, 1500, 20],
      [820, 2200, 0]
    ][service] || [420, 150, 400];

    source[0] = serviceSettings[0];
    source[8] = serviceSettings[1];
    source[11] = serviceSettings[2];

    // B감각에 따른 쾌B
    // 원본: 라인 272-297
    const bSense = abilities['B감각'] || 0;
    let bPleasure = [100, 200, 400, 800, 1200, 1500][bSense] || 100;

    // 거유
    if (talents[110]) bPleasure *= 1.20;
    if (talents[108]) bPleasure *= 1.20;
    else if (talents[107]) bPleasure *= 0.70;

    source[3] = Math.floor(bPleasure);

    // 기교에 따른 배율
    // 원본: 라인 298-317
    const technique = abilities['기교'] || 0;
    const techMult = [0.50, 0.80, 1.00, 1.20, 1.50, 2.00][technique] || 1.00;
    source[0] = Math.floor(source[0] * techMult);
    source[8] = Math.floor(source[8] * techMult);

    // 사정 게이지 체크
    // 원본: 라인 322-402
    let ejacGauge = [1500, 2100, 2900, 4000, 5000, 6000][technique] || 2100;

    const submission = abilities['종순'] || 0;
    ejacGauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][submission] || 1.00;

    const serviceTech = abilities['봉사기술'] || 0;
    ejacGauge *= [0.50, 0.80, 1.20, 1.50, 1.80, 2.40][serviceTech] || 1.00;

    const cumAddiction = abilities['정액중독'] || 0;
    ejacGauge *= [0.80, 0.90, 1.00, 1.10, 1.20, 1.30][cumAddiction] || 1.00;

    const playerCSense = context.player?.abilities?.['C감각'] || 0;
    ejacGauge *= [1.00, 1.50, 2.00, 2.50, 3.50, 5.00][playerCSense] || 1.00;

    if (playerTalents[121] || playerTalents[122]) {
      context.player.base[2] += Math.floor(ejacGauge);
    }

    // 사정 체크
    // 원본: 라인 408-451
    const ejacLevel = PlayerEjaculationHandler.checkLevel(context);

    if (ejacLevel > 0) {
      source[0] *= 3.00;

      const cumSources = [
        [0, 2.00, 6.00],
        [500, 3.00, 4.50],
        [1200, 4.00, 3.50],
        [3000, 6.00, 3.00],
        [6000, 9.00, 2.00],
        [12000, 15.00, 1.50]
      ][cumAddiction] || [0, 2.00, 6.00];

      source.정애 = cumSources[0];
      source[8] *= cumSources[1];
      source[7] *= cumSources[2];
    }

    // 대량 사정
    // 원본: 라인 453-492
    if (ejacLevel === 2) {
      source.정애 = Math.floor((source.정애 || 0) * 2.00);
      source[8] *= 1.50;
      // 입으로 사정 플래그는 [구불사용]으로 주석처리됨
      // context.flags[0] = 2;
    } else if (ejacLevel === 1) {
      // context.flags[0] = 1;
    }

    // 후타나리라면 굴종 반감
    // 원본: 라인 550-553
    if (playerTalents[121]) {
      source[7] = Math.floor(source[7] / 2);
    }

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF32.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const prevCom = context.prevCom || 0;
    const assiPlay = context.assiPlay || 0;
    const prevTrainer = context.flags[50] || 0;
    const sameTrainer = (assiPlay && prevTrainer) || (!assiPlay && !prevTrainer);

    // 1. 파생 체크
    // 원본: 라인 8-16
    if (sameTrainer) {
      // 펠라/딥스로트/수음펠라/펠라자위/바큠펠라 → 파이즈리펠라
      if ([31, 124, 125, 126, 127].includes(prevCom)) {
        // TODO: COM123
        context.showMessage('[파생] 파이즈리펠라 가능');
      }
    }

    // 2. 커맨드명 표시
    context.showMessage('파이즈리');

    // 3. TODO: TRAIN_MESSAGE_B
    // 원본: 라인 220-221

    // 첫 키스는 [구불사용]으로 주석처리
    // context.flags[621] |= 1;
    // context.flags[621] |= 2;

    // 4. SOURCE 계산 및 적용
    const source = this.calculateSource(context);
    // TODO: applySource

    // 5. 더럽힘 처리
    // 원본: 라인 494-512
    // 입 더러움은 [구불사용]으로 주석처리
    // 노예의 B ↔ 조교자의 P 더러움 이동
    context.stain[5] |= context.stain.player?.[2] || 0;
    if (context.stain.player) context.stain.player[2] |= context.stain[5] || 0;

    // 6. 경험 상승
    // 원본: 라인 516-540
    // 키스경험은 [구불사용]으로 주석처리

    const isMale = context.talents[122] || 0;
    const isPlayerMale = context.playerTalents?.[122] || 0;

    if (!isMale && !isPlayerMale) {
      context.addExp(40, 7);
    } else if (isMale && isPlayerMale) {
      context.addExp(41, 7);
    }

    // TFLAG:30 (키스경험 체크)
    if (!assiPlay && (context.exp[22] || 0) >= context.getExpLevel(3)) {
      context.flags[30] += 1;
    }

    // 애정경험
    if ((context.cflag?.[2] || 0) >= 1000 && !assiPlay) {
      context.addExp(23, 1);
    }

    // 7. 플래그 설정
    context.flags[100] = 1;
    context.flags[200] = 2; // 굴복각인2
  },

  /**
   * 메시지 생성
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;
    return `${targetName}이(가) 가슴으로 당신의 성기를 자극했다.`;
  },
};
