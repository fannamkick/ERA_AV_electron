import { TrainingContext, SourceValues, CommandPlugin } from '../../types';

/**
 * COMF110: 갈아입히기 (Change Clothes)
 * 원본: ERB/指導関係/COMF110.ERB
 *
 * 조교 대상의 의복을 착탈하는 특수 커맨드
 * 파라미터는 변경하지 않으며 통상 커맨드 취급하지 않음
 * UI 인터랙션이 필요한 복잡한 시스템
 */
export const comf110ChangeClothes: CommandPlugin = {
  id: 110,
  name: '갈아입히기',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    return true; // 항상 사용 가능
  },

  calculateSource(context: TrainingContext): SourceValues {
    // 원본 라인 1-872: 이 커맨드는 SOURCE를 변경하지 않음
    return {}; // 파라미터 변경 없음
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 6-611: @COM110 메인 로직

    context.showMessage('갈아입히기');

    // 라인 12-14: 현재 의복 상태 저장
    const currentCFlag40 = context.charFlags[40] || 0;

    // 착탈 UI 루프 (TypeScript에서는 단순화)
    // 실제 구현 시 React UI로 대체 필요

    // 라인 20-22: 현재 의복 상태 표시
    context.showMessage(`현재 ${context.target.name}의 모습은 ${this.getClothingDescription(context)}입니다……`);

    // 라인 24-52: 착탈 가능 여부 판정 (T/W 배열)
    const canTakeOff = this.checkCanTakeOff(context);
    const canWear = this.checkCanWear(context);

    // 착탈 옵션 표시 (간소화 - 실제는 UI)
    if (canTakeOff.special) {
      context.showMessage('[0] - 특별 코스를 벗는다');
    }
    if (canWear.special) {
      context.showMessage('[0] - 특별 코스를 입힌다');
    }
    if (canTakeOff.onepiece) {
      context.showMessage('[1] - 원피스를 벗게한다');
    }
    // ... (생략)

    // 라인 285-607: 실제 착탈 처리는 사용자 입력에 따라 분기
    // TypeScript에서는 UI 이벤트로 처리

    // 예시: 전라로 만들기 (라인 591-607)
    if (context.userInput === 7) {
      if (context.charFlags[42] === 79 && context.charFlags[49] === 1 && (currentCFlag40 & 64)) {
        // 정조대만 남기고 전라
        context.showMessage(`${context.target.name}을(를) 정조대만 남기고 알몸으로 만들었다`);
        context.charFlags[40] = 64;
        context.charFlags[173] = -1;
      } else {
        // 완전 전라
        context.showMessage(`${context.target.name}을(를) 알몸으로 만들었다`);
        context.charFlags[40] = 0;
        context.charFlags[173] = -1;
      }
    }

    // 이 커맨드는 SOURCE를 변경하지 않음 (라인 4)
  },

  generateMessage(context: TrainingContext): string {
    // 의복 변경 메시지는 execute에서 직접 출력
    return '';
  },

  /**
   * 현재 의복 상태를 문자열로 반환
   * 원본: PRINT_CLOTHTYPE 함수 호출
   */
  getClothingDescription(context: TrainingContext): string {
    const cflag40 = context.charFlags[40] || 0;
    const cflag42 = context.charFlags[42] || 0;

    // 비트플래그 분석
    if (cflag40 === 0) {
      return '알몸';
    }

    const parts: string[] = [];

    // 특별 코스 (bit 64)
    if (cflag40 & 64) {
      parts.push(this.getSpecialCostumeName(cflag42));
    }

    // 상의 (bit 4)
    if (cflag40 & 4) {
      parts.push('상의');
    }

    // 하의 (bit 8 or 16)
    if (cflag40 & 8) {
      parts.push('스커트');
    } else if (cflag40 & 16) {
      parts.push('하의');
    }

    // 브래지어 (bit 2)
    if (cflag40 & 2) {
      parts.push('브래지어');
    }

    // 팬티 (bit 1)
    if (cflag40 & 1) {
      parts.push('팬티');
    }

    // 양말 (CFLAG:173)
    if (context.charFlags[173] === 0) {
      parts.push('양말');
    }

    return parts.join(', ') + ' 차림';
  },

  /**
   * 특별 코스 이름 반환
   */
  getSpecialCostumeName(cflag42: number): string {
    // CFLAG:42 값에 따른 특별 코스명
    // 실제 구현 시 CSV 데이터 참조 필요
    const specialCostumes: Record<number, string> = {
      11: '즈코 인형',
      69: '기저귀',
      79: '정조대',
      // ... (더 많은 특별 코스)
    };

    return specialCostumes[cflag42] || '특별 의상';
  },

  /**
   * 착탈 가능 여부 판정
   * 원본: COM110_ABLE*T 함수들 (라인 617-872)
   */
  checkCanTakeOff(context: TrainingContext): any {
    const cflag40 = context.charFlags[40] || 0;
    const cflag41 = context.charFlags[41] || 0;
    const cflag42 = context.charFlags[42] || 0;

    return {
      special: this.canTakeOffSpecial(context),
      onepiece: this.canTakeOffOnepiece(context),
      twopiece: this.canTakeOffTwopiece(context),
      bra: (cflag40 & 2) && !(cflag40 & 4), // 브래지어 착용 중 & 상의 없음
      panty: (cflag40 & 1) && !(cflag40 & 16), // 팬티 착용 중 & 하의 없음
      socks: context.charFlags[173] === 0
    };
  },

  checkCanWear(context: TrainingContext): any {
    const cflag40 = context.charFlags[40] || 0;

    return {
      special: !(cflag40 & 64) && context.charFlags[42] !== 0, // 특별 코스 미착용 & 설정됨
      onepiece: this.canWearOnepiece(context),
      twopiece: this.canWearTwopiece(context),
      bra: !(cflag40 & 2) && !(cflag40 & 4), // 브래지어 미착용 & 상의 없음
      panty: !(cflag40 & 1), // 팬티 미착용
      socks: context.charFlags[173] === -1
    };
  },

  /**
   * 특별 코스 탈의 가능 여부
   * 원본: @COM110_ABLE0T (라인 617-638)
   */
  canTakeOffSpecial(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag42 = context.charFlags[42] || 0;

    // 특별 코스가 설정되어 있지 않으면 안 됨
    if (cflag42 === 0) return false;

    // 특별 코스를 착용하지 않으면 안 됨
    if ((cflag40 & 64) === 0) return false;

    // 가슴팍 개방 상태 체크 (bit 128)
    if ((cflag40 & 132) === 132) return true;

    // 기저귀 특수 처리
    if (cflag42 === 69) {
      if (cflag40 & 16) return false; // 하의 착용 시 불가
      if ((cflag40 & 64) && cflag42 <= 50) return false;
      if (cflag40 & 8 && context.charFlags[41] === 202) return false; // 기모노+스커트
    }

    return true;
  },

  canTakeOffOnepiece(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag41 = context.charFlags[41] || 0;
    const cflag42 = context.charFlags[42] || 0;

    // 원본 라인 669-681: @COM110_ABLE1T
    if (cflag41 <= 200) return false; // 원피스가 아님

    // 상의/하의 중 하나라도 착용 중이어야 함
    if ((cflag40 & 28) === 0) return false;

    // 방해되는 특별 코스
    if ((cflag40 & 64) && cflag42 <= 50) return false;

    if ((cflag40 & 132) === 132) return true; // 가슴팍 개방

    return true;
  },

  canTakeOffTwopiece(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag41 = context.charFlags[41] || 0;
    const cflag42 = context.charFlags[42] || 0;

    // 원본 라인 704-717: @COM110_ABLE2T
    if (cflag41 >= 201) return false; // 투피스가 아님

    // 상의 착용 중이어야 함
    if (!(cflag40 & 4)) return false;

    // 방해되는 특별 코스
    if ((cflag40 & 64) && cflag42 <= 50) return false;

    return true;
  },

  canWearOnepiece(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag41 = context.charFlags[41] || 0;
    const cflag45 = context.charFlags[45] || 0;
    const cflag46 = context.charFlags[46] || 0;

    // 원본 라인 684-702: @COM110_ABLE1W
    if (cflag41 <= 200) return false; // 원피스가 아님

    // 상의 OR 하의가 이미 착용 중이면 안 됨
    if ((cflag40 & 4) || cflag45 !== 0) {
      if ((cflag40 & 24) || cflag46 !== 0) {
        return false;
      }
    }

    return true;
  },

  canWearTwopiece(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag41 = context.charFlags[41] || 0;

    // 원본 라인 720-736: @COM110_ABLE2W
    if (cflag41 >= 201) return false; // 투피스가 아님

    // 상의 착용 중이면 안 됨
    if (cflag40 & 4) return false;

    return true;
  }
};
