import { TrainingContext, SourceValues, CommandPlugin } from '../../types';

/**
 * COMF111: 옷을 찢는다 (Tear Clothes)
 * 원본: ERB/指導関係/COMF111.ERB
 *
 * 조교 대상의 의복을 강제로 찢어 벗기는 커맨드
 * 찢어진 의복은 세탁 불가 상태(-3)가 됨
 */
export const comf111TearClothes: CommandPlugin = {
  id: 111,
  name: '옷을 찢는다',
  category: '특수',

  isAvailable(context: TrainingContext): boolean {
    // 원본 라인 1-265: 의복이 있어야 찢을 수 있음
    const cflag40 = context.charFlags[40] || 0;
    return cflag40 !== 0; // 알몸이 아니면 사용 가능
  },

  calculateSource(context: TrainingContext): SourceValues {
    // 원본: 이 커맨드도 SOURCE 변경하지 않음
    return {}; // 파라미터 변경 없음
  },

  async execute(context: TrainingContext): Promise<void> {
    // 원본 라인 5-169: @COM111 메인 로직

    context.showMessage('옷을 찢는다');

    const cflag40 = context.charFlags[40] || 0;
    const cflag42 = context.charFlags[42] || 0;

    // 라인 19-21: 현재 의복 상태 표시
    context.showMessage(`현재 ${context.target.name}의 모습은, ${this.getClothingDescription(context)}입니다……`);

    // 라인 23-37: 찢을 수 있는 부위 판정
    const canTear = this.checkCanTear(context);

    // 찢기 옵션 표시 (간소화 - 실제는 UI)
    if (canTear.special) {
      context.showMessage('[10] - 특별 코스를 찢는다');
    }
    if (canTear.onepieceUpper) {
      context.showMessage('[11] - 원피스의 상반신을 찢는다');
    }
    if (canTear.onepieceLower) {
      context.showMessage('[12] - 원피스의 하반신을 찢는다');
    }
    if (canTear.twopieceUpper) {
      context.showMessage('[11] - 투피스 위를 찢는다');
    }
    if (canTear.twopieceLower) {
      context.showMessage('[12] - 투피스 아래를 찢는다');
    }
    if (canTear.bra) {
      context.showMessage('[13] - 브래지어를 잡아 찢는다');
    }
    if (canTear.panty) {
      context.showMessage('[14] - 팬티를 잡아 찢는다');
    }

    context.showMessage('[19] - [갈아입히기]로 돌아간다');
    context.showMessage('[100] - 그만둠');

    // 라인 89-165: 찢기 처리 (사용자 입력에 따라 분기)
    const userChoice = context.userInput || 100;

    switch (userChoice) {
      case 10:
        // 라인 90-103: 특별 코스 찢기
        if ((cflag40 & 64) && (cflag42 === 11 || cflag42 === 79)) {
          const costumeName = this.getSpecialCostumeName(cflag42);
          context.showMessage(`${costumeName}은(는) 맨손으로는 찢기지 않는다`);
          return;
        }
        if (canTear.special) {
          const costumeName = this.getSpecialCostumeName(cflag42);
          context.showMessage(`${context.target.name}이(가) 입고 있는 ${costumeName}를 찢었다`);
          context.charFlags[40] -= 64;
          context.charFlags[47] = -3; // 세탁 불가
        }
        break;

      case 11:
        // 라인 105-110: 원피스 상반신 찢기
        if (canTear.onepieceUpper) {
          context.showMessage(`${context.target.name}이(가) 입고 있는 원피스의 상반신을 찢어냈다`);
          context.charFlags[40] -= 4;
          context.charFlags[45] = -3;
        }
        // 라인 122-127: 투피스 상의 찢기
        else if (canTear.twopieceUpper) {
          context.showMessage(`${context.target.name}이(가) 입고 있는 투피스 위를 찢었다`);
          context.charFlags[40] -= 4;
          context.charFlags[45] = -3;
        }
        break;

      case 12:
        // 라인 112-120: 원피스 하반신 찢기
        if (canTear.onepieceLower) {
          context.showMessage(`${context.target.name}이(가) 입고 있는 원피스의 하반신을 찢어냈다`);
          if (context.charFlags[40] & 8) {
            context.charFlags[40] -= 8;
          }
          if (context.charFlags[40] & 16) {
            context.charFlags[40] -= 16;
          }
          context.charFlags[46] = -3;
        }
        // 라인 129-141: 투피스 하의 찢기
        else if (canTear.twopieceLower) {
          const cflag41 = context.charFlags[41] || 0;
          if (cflag41 >= 1 && cflag41 <= 100) {
            context.showMessage(`${context.target.name}이(가) 입고 있는 투피스의 스커트를 찢었다`);
          } else {
            context.showMessage(`${context.target.name}이(가) 입고 있는 투피스 아래를 찢었다`);
          }
          if (context.charFlags[40] & 8) {
            context.charFlags[40] -= 8;
          }
          if (context.charFlags[40] & 16) {
            context.charFlags[40] -= 16;
          }
          context.charFlags[46] = -3;
        }
        break;

      case 13:
        // 라인 143-146: 브래지어 찢기
        if (canTear.bra) {
          context.showMessage(`${context.target.name}의 브래지어를 찢었다`);
          context.charFlags[40] -= 2;
          context.charFlags[44] = -3;
        }
        break;

      case 14:
        // 라인 148-151: 팬티 찢기
        if (canTear.panty) {
          context.showMessage(`${context.target.name}의 팬티를 찢었다`);
          context.charFlags[40] -= 1;
          context.charFlags[43] = -3;
        }
        break;

      case 19:
        // 라인 152-153: 갈아입히기로 돌아감
        return;

      case 100:
        // 라인 154-155: 종료
        return;
    }

    // 라인 160-164: 알몸이 되었는지 체크
    if (context.charFlags[40] === 0) {
      context.showMessage('(알몸이 되었으므로 갈아입히기로 돌아갑니다)');
      return;
    }

    // 루프 계속 (TypeScript에서는 재귀 호출 또는 UI 이벤트 처리)
  },

  generateMessage(context: TrainingContext): string {
    // 의복 찢기 메시지는 execute에서 직접 출력
    return '';
  },

  /**
   * 현재 의복 상태를 문자열로 반환
   * COMF110과 동일한 로직
   */
  getClothingDescription(context: TrainingContext): string {
    const cflag40 = context.charFlags[40] || 0;

    if (cflag40 === 0) {
      return '알몸';
    }

    const parts: string[] = [];

    if (cflag40 & 64) {
      parts.push(this.getSpecialCostumeName(context.charFlags[42] || 0));
    }
    if (cflag40 & 4) {
      parts.push('상의');
    }
    if (cflag40 & 8) {
      parts.push('스커트');
    } else if (cflag40 & 16) {
      parts.push('하의');
    }
    if (cflag40 & 2) {
      parts.push('브래지어');
    }
    if (cflag40 & 1) {
      parts.push('팬티');
    }

    return parts.join(', ') + ' 차림';
  },

  getSpecialCostumeName(cflag42: number): string {
    const specialCostumes: Record<number, string> = {
      11: '즈코 인형',
      69: '기저귀',
      79: '정조대',
    };
    return specialCostumes[cflag42] || '특별 의상';
  },

  /**
   * 찢을 수 있는 부위 판정
   * 원본: COM111_ABLE*L 함수들 (라인 174-264)
   */
  checkCanTear(context: TrainingContext): any {
    const cflag40 = context.charFlags[40] || 0;
    const cflag41 = context.charFlags[41] || 0;
    const cflag42 = context.charFlags[42] || 0;

    return {
      special: this.canTearSpecial(context),
      onepieceUpper: this.canTearOnepieceUpper(context),
      onepieceLower: this.canTearOnepieceLower(context),
      twopieceUpper: this.canTearTwopieceUpper(context),
      twopieceLower: this.canTearTwopieceLower(context),
      bra: this.canTearBra(context),
      panty: this.canTearPanty(context)
    };
  },

  /**
   * 특별 코스 찢기 가능 여부
   * 원본: @COM111_ABLE0L (라인 175-182)
   */
  canTearSpecial(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag42 = context.charFlags[42] || 0;

    if (cflag42 === 0) return false; // 특별 코스 미설정
    if ((cflag40 & 64) === 0) return false; // 미착용

    return true;
  },

  /**
   * 원피스 상반신 찢기 가능 여부
   * 원본: @COM111_ABLE1L (라인 185-195)
   */
  canTearOnepieceUpper(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag41 = context.charFlags[41] || 0;
    const cflag42 = context.charFlags[42] || 0;

    if (cflag41 <= 200) return false; // 원피스가 아님
    if ((cflag40 & 4) === 0) return false; // 상의 미착용
    if ((cflag40 & 64) && cflag42 <= 50) return false; // 방해되는 특별 코스

    return true;
  },

  /**
   * 원피스 하반신 찢기 가능 여부
   * 원본: @COM111_ABLE2L (라인 198-208)
   */
  canTearOnepieceLower(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag41 = context.charFlags[41] || 0;
    const cflag42 = context.charFlags[42] || 0;

    if (cflag41 <= 200) return false;
    if ((cflag40 & 24) === 0) return false; // 하의 미착용
    if ((cflag40 & 64) && cflag42 === 11) return false; // 즈코 인형

    return true;
  },

  /**
   * 투피스 상의 찢기 가능 여부
   * 원본: @COM111_ABLE3L (라인 211-221)
   */
  canTearTwopieceUpper(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag41 = context.charFlags[41] || 0;
    const cflag42 = context.charFlags[42] || 0;

    if (cflag41 >= 201) return false; // 투피스가 아님
    if ((cflag40 & 4) === 0) return false;
    if ((cflag40 & 64) && cflag42 <= 50) return false;

    return true;
  },

  /**
   * 투피스 하의 찢기 가능 여부
   * 원본: @COM111_ABLE4L (라인 224-234)
   */
  canTearTwopieceLower(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag41 = context.charFlags[41] || 0;
    const cflag42 = context.charFlags[42] || 0;

    if (cflag41 >= 201) return false;
    if ((cflag40 & 24) === 0) return false;
    if ((cflag40 & 64) && cflag42 === 11) return false;

    return true;
  },

  /**
   * 브래지어 찢기 가능 여부
   * 원본: @COM111_ABLE5L (라인 237-247)
   */
  canTearBra(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag42 = context.charFlags[42] || 0;

    if ((cflag40 & 2) === 0) return false; // 미착용
    if (cflag40 & 4) return false; // 상의 착용 중
    if ((cflag40 & 64) && cflag42 <= 50) return false;

    return true;
  },

  /**
   * 팬티 찢기 가능 여부
   * 원본: @COM111_ABLE6L (라인 250-263)
   */
  canTearPanty(context: TrainingContext): boolean {
    const cflag40 = context.charFlags[40] || 0;
    const cflag41 = context.charFlags[41] || 0;
    const cflag42 = context.charFlags[42] || 0;

    if ((cflag40 & 1) === 0) return false; // 미착용
    if (cflag40 & 16) return false; // 하의 착용 중
    if ((cflag40 & 64) && cflag42 === 11) return false; // 즈코 인형
    if (cflag41 === 202 && (cflag40 & 8)) return false; // 기모노+스커트

    return true;
  }
};
