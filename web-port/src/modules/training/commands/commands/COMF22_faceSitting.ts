/**
 * COMF22 - 대면좌위 (Face-to-Face Sitting Position)
 * 원본: ERB/指導関係/COMF22.ERB
 *
 * 조교 대상이 플레이어에게 정면으로 앉는 체위
 * 낮은 체력/기력 소모, 봉사정신/기교 능력치 영향 큼
 * 파생: G스팟자극(120), 자궁구자극(121), 3P 체위
 */

import type { CommandPlugin } from '../../types';
import type { TrainingContext, SourceValues } from '../../types';
import { SourceModifier } from '../../systems/SourceModifier';
import { VaginaSexHandler } from '../common/VaginaSexHandler';
import { PlayerEjaculationHandler } from '../../systems/PlayerEjaculation';

export const COMF22_faceSitting: CommandPlugin = {
  id: 22,
  name: '대면좌위',
  category: '삽입',
  staminaCost: 10,

  /**
   * 가용성 판정
   * 원본: COMABLE.ERB @COM_ABLE22
   */
  isAvailable: (context: TrainingContext) => {
    // 촉수 지도중 불가
    if (context.equipment[90]) return false;

    // 슬라임 지도중 불가
    if (context.equipment[150]) return false;

    // 삼각목마 기승중 불가
    if (context.equipment[70]) return false;

    // 하의 OR 팬티 착용 불가
    if (context.charFlags[40] & 17) return false;

    // 검은 스타킹 불가
    if (context.charFlags[170] === 6 && context.charFlags[173] === 0) return false;

    // 기저귀 불가
    if (context.charFlags[42] === 69 && (context.charFlags[40] & 64)) return false;

    // 즈코 인형 불가
    if (context.charFlags[42] === 11 && (context.charFlags[40] & 64)) return false;

    return true;
  },

  /**
   * SOURCE 계산
   * 원본: COMF22.ERB 라인 85-313
   */
  // TODO: Move calculateSource logic to execute
  // calculateSource: (context: TrainingContext): SourceValues => {
    const { target } = context;
    const abilities = target.abl;
    const talents = context.talents;

    // V감각, C감각
    const vSense = abilities['V감각'] || 0;
    const cSense = abilities['C감각'] || 0;

    // 봉사정신 (ABL:16)
    const serviceSpirit = abilities['봉사정신'] || 0;

    // 플레이어 기교 (ABL:PLAYER:12)
    const playerTechnique = context.playerAbilities['기교'] || 0;

    // 기본 SOURCE 설정
    const source: number[] = new Array(19).fill(0);

    // LOSEBASE
    let loseBase0 = 10; // 체력
    let loseBase1 = 80; // 기력

    // V감각에 따른 쾌V 계산
    // 원본: COMF22.ERB 라인 94-107
    const vSenseValues = [
      100,  // 0
      600,  // 1
      1500, // 2
      3000, // 3
      5000, // 4
      6500, // 5
    ];
    source[1] = vSenseValues[Math.min(vSense, 5)];

    // C감각에 따른 쾌C 계산
    // 원본: COMF22.ERB 라인 109-122
    const cSenseValues = [
      50,   // 0
      300,  // 1
      800,  // 2
      1500, // 3
      2500, // 4
      3300, // 5
    ];
    source[0] = cSenseValues[Math.min(cSense, 5)];

    // 윤활
    // 원본: COMF22.ERB 라인 124-125
    source[6] = 150;

    // 기교 (플레이어) 보정
    // 원본: COMF22.ERB 라인 127-148
    let techniqueBonus = 0;
    if (playerTechnique === 0) {
      techniqueBonus = 0;
    } else if (playerTechnique === 1) {
      source[6] += 20;
      source.욕망 += 20;
      techniqueBonus = 100;
    } else if (playerTechnique === 2) {
      source[6] += 50;
      source.욕망 += 50;
      techniqueBonus = 200;
    } else if (playerTechnique === 3) {
      source[6] += 100;
      source.욕망 += 100;
      techniqueBonus = 400;
    } else if (playerTechnique === 4) {
      source[6] += 150;
      source.욕망 += 150;
      techniqueBonus = 600;
    } else {
      source[6] += 200;
      source.욕망 += 200;
      techniqueBonus = 800;
    }

    // 기교 보너스를 쾌C에 추가
    source[0] += techniqueBonus;

    // V감각 >= 4이면 기교 보너스를 쾌V에도 추가
    // 원본: COMF22.ERB 라인 150-152
    if (vSense >= 4) {
      source[1] += techniqueBonus;
    }

    // 봉사정신 보정
    // 원본: COMF22.ERB 라인 154-187
    if (serviceSpirit === 0) {
      source[7] = 100;
      source[8] = 50;
      source.반발심 = 100;
    } else if (serviceSpirit === 1) {
      source[7] = 200;
      source[8] = 100;
      source.반발심 = 50;
    } else if (serviceSpirit === 2) {
      source[7] = 400;
      source[8] = 150;
      source.반발심 = 0;
    } else if (serviceSpirit === 3) {
      source[7] = 600;
      source[8] = 200;
      source.반발심 = 0;
    } else if (serviceSpirit === 4) {
      source[7] = 800;
      source[8] = 250;
      source.반발심 = 0;
    } else {
      source[7] = 1000;
      source[8] = 300;
      source.반발심 = 0;
    }

    // TALENT:85 (애인) 보정
    // 원본: COMF22.ERB 라인 189-197
    if (talents[85] === 1 && context.assiPlay === 0) {
      source[6] *= 3.0;
      source.욕망 *= 2.0;
      source.반발심 *= 2.0;
    }

    context.loseBase[0] += Math.floor(loseBase0);
    context.loseBase[1] += Math.floor(loseBase1);

    // SourceModifier로 소질/능력 보정 적용
    source = SourceModifier.applyAll(source, context);

    return source;
  },

  /**
   * 커맨드 실행
   * 원본: COMF22.ERB 전체
   */
  async execute(context: TrainingContext): Promise<void> {
    const targetName = context.target.name;

    // 1. 커맨드명 표시
    context.showMessage('대면좌위');

    // 2. 처녀 확인 및 처리
    if (context.talents[74] === 1) {
      await VaginaSexHandler.handleVirginity(context);
    }

    // 3. TODO: TRAIN_MESSAGE_B 호출 (행위 설명 메시지)

    // 4. SOURCE 계산
    const source = this.calculateSource(context);

    // 5. 트레이너 사정 처리
    const ejacResult = await PlayerEjaculationHandler.check(context);
    if (ejacResult.ejaculated) {
      await VaginaSexHandler.handleEjaculation(context, ejacResult);

      // 임신 판정 (콘돔 없을 시)
      if (!context.equipment[30]) {
        await VaginaSexHandler.handlePregnancy(context);
      }
    }

    // 6. SOURCE 적용
    // TODO: applySource 메서드 호출

    // 7. 경험치 획득
    // 원본: COMF22.ERB 라인 199-233
    context.exp[0] += 1; // 삽입경험

    // V경험 (V감각 레벨별)
    // 원본: COMF22.ERB 라인 205-216
    const vSense = context.target.abl[2] || 0;
    let vExpGain = 0;
    if (vSense <= 1) vExpGain = 1;
    else if (vSense <= 4) vExpGain = 2;
    else if (vSense <= 7) vExpGain = 3;
    else vExpGain = 4;
    context.exp[1] += vExpGain;

    // C경험 (C감각 레벨별)
    // 원본: COMF22.ERB 라인 218-229
    const cSense = context.target.abl[0] || 0;
    let cExpGain = 0;
    if (cSense <= 1) cExpGain = 1;
    else if (cSense <= 4) cExpGain = 2;
    else if (cSense <= 7) cExpGain = 3;
    else cExpGain = 4;
    context.exp[2] += cExpGain;

    context.showMessage(`삽입경험 +1`);
    context.showMessage(`V경험 +${vExpGain}`);
    context.showMessage(`C경험 +${cExpGain}`);

    // 8. PREVCOM/TFLAG 업데이트
    // 원본: COMF22.ERB 라인 235-239
    context.flags[59] = context.flags[50] || 0; // TFLAG:59 = 전전회 커맨드 = 전회 조교자
    context.flags[50] = context.assiPlay === 1 ? 1 : 0; // TFLAG:50 = 현재 조교자 (조수=1, 플레이어=0)

    // 9. 더럽힘 처리
    // 원본: COMF22.ERB 라인 241-252
    if (ejacResult.ejaculated) {
      // 사정 시 질에 정액
      context.stain[3] |= 4; // STAIN:3 |= 4 (V에 정액)
    } else {
      // 사정하지 않았으면 질에 애액만
      context.stain[3] |= 2; // STAIN:3 |= 2 (V에 애액)
    }

    // 10. 커맨드 파생 로직
    // 원본: COMF22.ERB 라인 254-313
    await this.handleCommandDerivation(context);
  },

  /**
   * 커맨드 파생 처리
   * 원본: COMF22.ERB 라인 254-313
   */
  async handleCommandDerivation(context: TrainingContext): Promise<void> {
    const vSense = context.target.abl[2] || 0;
    const playerTechnique = context.playerAbilities['기교'] || 0;
    const lustLevel = context.getParamLevel(context.params[5] || 0); // 욕정 레벨

    // 욕정 레벨 보너스
    // 원본: COMF22.ERB 라인 257-264
    let lustBonus = 0;
    if (lustLevel >= 4) lustBonus = 5;
    else if (lustLevel >= 3) lustBonus = 4;
    else if (lustLevel >= 2) lustBonus = 3;
    else if (lustLevel >= 1) lustBonus = 2;
    else lustBonus = 1;

    // 파생값 계산
    // 원본: COMF22.ERB 라인 266-268
    let derivationValue = lustBonus * (Math.floor(Math.random() * 11));
    derivationValue += (Math.floor(Math.random() * 11)) * vSense;
    derivationValue += (Math.floor(Math.random() * 6)) * playerTechnique;

    // 파생 판정 (대면좌위는 30 이상에서 자궁구자극)
    // 원본: COMF22.ERB 라인 270-284
    if (derivationValue >= 30) {
      // 자궁구자극(121)으로 파생
      context.showMessage('[파생] 자궁구자극으로 파생합니다.');
      // TODO: COMF121 실행
      context.prevCom = 121;
    } else {
      // G스팟자극(120)으로 파생
      context.showMessage('[파생] G스팟자극으로 파생합니다.');
      // TODO: COMF120 실행
      context.prevCom = 120;
    }

    // 3P 체위 파생
    // 원본: COMF22.ERB 라인 286-313
    if (context.assiPlay === 1 && context.flags[42] === 0) {
      // 조수 플레이 중이고, 3P플래그가 아직 설정되지 않은 경우

      // 조수의 기교
      const assiTechnique = context.assiAbilities?.['기교'] || 0;

      // 3P 파생값 계산
      // 원본: COMF22.ERB 라인 294-296
      let threePValue = lustBonus * (Math.floor(Math.random() * 11));
      threePValue += (Math.floor(Math.random() * 11)) * vSense;
      threePValue += (Math.floor(Math.random() * 6)) * assiTechnique;

      // 3P 파생 판정
      // 원본: COMF22.ERB 라인 298-313
      if (threePValue >= 30) {
        // 3P 대면좌위(86)로 파생
        context.flags[42] = 1; // TFLAG:42 = 3P플래그
        context.showMessage('[파생] 3P 대면좌위로 파생합니다.');
        // TODO: COMF86 실행
        context.prevCom = 86;
      }
    }
  },

  /**
   * 메시지 생성
   * 원본: TRAIN_MESSAGE_B.ERB (대면좌위 관련 부분)
   */
  // TODO: Move generateMessage logic to execute
  // generateMessage: (context: TrainingContext) => {
    const targetName = context.target.name;

    let msg = `${targetName}은(는) 플레이어에게 정면으로 앉아 결합했다.`;

    // 봉사정신에 따른 반응
    const serviceSpirit = context.target.abl[16] || 0;
    if (serviceSpirit >= 4) {
      msg += ` ${targetName}은(는) 헌신적으로 허리를 움직이며 플레이어를 기쁘게 하려 한다.`;
    } else if (serviceSpirit === 0) {
      msg += ` ${targetName}은(는) 서툴게 몸을 움직이고 있다.`;
    }

    // V감각에 따른 반응
    const vSense = context.target.abl[2] || 0;
    if (vSense >= 4) {
      msg += ` 질 내부가 조여오며 ${targetName}의 몸이 떨린다.`;
    } else if (vSense === 0) {
      msg += ` ${targetName}은(는) 아직 미숙하지만 점차 쾌감을 느끼기 시작했다.`;
    }

    return msg;
  },
};
