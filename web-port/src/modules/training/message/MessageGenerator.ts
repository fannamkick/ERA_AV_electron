/**
 * 조교 메시지 생성기
 * train_message_b의 로직을 TypeScript로 구현
 */

import { TrainingContext } from '../runtime/types';
import { Character } from '../../../types/game';

/**
 * 게임 상태 스냅샷
 * 메시지 생성 시점의 모든 상태를 담음
 */
interface GameState {
  // 캐릭터 플래그
  cflag40: number;  // 의상 비트마스크
  cflag42: number;  // 코스튬 번호
  cflag16: number;  // 의식 상태
  cflag110: number; // 출산일
  cflag7: number;   // 피어싱

  // 장비
  equipment: Record<number, number>;

  // 소질
  talents: number[];

  // 능력치
  abilities: Record<number, number>;

  // 파라미터
  params: Record<number, number>;

  // 더러움
  stain: Record<number, number>;

  // 기타
  name: string;
  day: number;
  prevCom: number;
}

/**
 * 행위자 타입
 */
enum ActorType {
  PLAYER = 'player',
  DOG = 'dog',
  TENTACLE = 'tentacle',
  SLIME = 'slime'
}

/**
 * 의상 타입
 */
enum ClothingType {
  NAKED = 0,
  UNDERWEAR = 1,
  NORMAL = 2,
  SPECIAL = 3
}

export class MessageGenerator {
  private messages: string[] = [];
  private ctx: TrainingContext;
  private character: Character;
  private commandId: number;
  private state!: GameState;

  constructor(ctx: TrainingContext, character: Character, commandId: number) {
    this.ctx = ctx;
    this.character = character;
    this.commandId = commandId;
  }

  /**
   * 메시지 생성
   */
  generate(): string[] {
    this.messages = [];

    // 조교 텍스트 생략 설정 확인
    if (this.ctx.flags?.[6] & 1) {
      return [];
    }

    // 상태 스냅샷 생성
    this.state = this.extractState();

    this.addMessage('‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥');

    // 커맨드별 메시지 생성
    switch (this.commandId) {
      case 0: this.generateCom0(); break;  // 애무
      case 1: this.generateCom1(); break;  // 커닐링구스
      case 2: this.generateCom2(); break;  // 애널애무
      case 3: this.generateCom3(); break;  // 자위
      case 4: this.generateCom4(); break;  // 펠라한다
      case 5: this.generateCom5(); break;  // 가슴애무
      case 6: this.generateCom6(); break;  // 키스한다
      case 7: this.generateCom7(); break;  // 조개벌리기
      case 8: this.generateCom8(); break;  // 손가락삽입
      case 9: this.generateCom9(); break;  // 애널핥기
      case 10: this.generateCom10(); break;  // 로터
      case 11: this.generateCom11(); break;  // 바이브
      case 12: this.generateCom12(); break;  // E마사지기
      case 13: this.generateCom13(); break;  // 애널바이브
      case 14: this.generateCom14(); break;  // 클리캡
      case 15: this.generateCom15(); break;  // 니플캡
      case 16: this.generateCom16(); break;  // 착유기
      case 17: this.generateCom17(); break;  // 오나홀
      case 19: this.generateCom19(); break;  // 애널비즈
      case 20: this.generateCom20(); break;  // 정상위
      // ... 나머지 커맨드
      default:
        this.addMessage(`${this.state.name}에게 조교를 실시했다.`);
    }

    return this.messages;
  }

  /**
   * 현재 상태를 스냅샷으로 추출
   */
  private extractState(): GameState {
    // CharacterTalents 객체를 number[] 배열로 변환
    const talentArray = Array.isArray(this.character.talent)
      ? this.character.talent
      : Object.keys(this.character.talent || {}).map(Number).filter(n => !isNaN(n));

    return {
      cflag40: this.character.cflag?.[40] || 0,
      cflag42: this.character.cflag?.[42] || 0,
      cflag16: this.character.cflag?.[16] || 0,
      cflag110: this.character.cflag?.[110] || 0,
      cflag7: this.character.cflag?.[7] || 0,
      equipment: this.ctx.equipment || {},
      talents: talentArray,
      abilities: this.ctx.abilities || {},
      params: this.ctx.params || {},
      stain: this.ctx.stain || {},
      name: this.character.name,
      day: this.ctx.day || 0,
      prevCom: this.ctx.prevCom || -1
    };
  }

  // ========================================================================
  // 공통 헬퍼 함수들
  // ========================================================================

  /**
   * 현재 행위자 타입 결정
   */
  private getActorType(s: GameState): ActorType {
    if (s.equipment[89]) return ActorType.DOG;
    if (s.equipment[90]) return ActorType.TENTACLE;
    if (s.equipment[150]) return ActorType.SLIME;
    return ActorType.PLAYER;
  }

  /**
   * 행위자 이름 반환
   */
  private getActorName(type: ActorType): string {
    switch (type) {
      case ActorType.DOG: return '개';
      case ActorType.TENTACLE: return '촉수';
      case ActorType.SLIME: return '슬라임';
      case ActorType.PLAYER: return '플레이어';
    }
  }

  /**
   * 의상 상태 타입 결정
   */
  private getClothingType(s: GameState): ClothingType {
    if (s.cflag40 === 0) return ClothingType.NAKED;
    if ((s.cflag40 & 64) && s.cflag42 <= 50) return ClothingType.SPECIAL;
    if (s.cflag40 & 28) return ClothingType.NORMAL;  // 상의(4) | 치마(8) | 하의(16)
    if ((s.cflag40 & 1) || (s.cflag40 & 2)) return ClothingType.UNDERWEAR;
    return ClothingType.NAKED;
  }

  /**
   * 의상 이름 반환
   */
  private getClothingName(s: GameState): string {
    const type = this.getClothingType(s);

    switch (type) {
      case ClothingType.SPECIAL:
        return this.getSpecialCostumeName(s.cflag42);
      case ClothingType.NORMAL:
        return this.getNormalClothingName(s.cflag40);
      case ClothingType.UNDERWEAR:
        return '속옷';
      case ClothingType.NAKED:
        return '';
    }
  }

  /**
   * 특수 의상 이름 (코스튬)
   */
  private getSpecialCostumeName(costumeId: number): string {
    // CSV/Costume.csv 기반 매핑
    const costumes: Record<number, string> = {
      1: '여자 교복',
      2: '남자 교복',
      3: '체조복',
      4: '스쿨 수영복',
      5: '블루마',
      6: '메이드복',
      7: '간호사복',
      8: '유카타',
      9: '무녀복',
      10: '기모노',
      11: '치파오',
      // ... 나머지 코스튬 (실제 CSV 데이터 필요)
    };

    return costumes[costumeId] || `코스튬${costumeId}`;
  }

  /**
   * 일반 의상 이름
   */
  private getNormalClothingName(cflag40: number): string {
    // 우선순위: 상의 > 치마 > 하의
    if (cflag40 & 4) return '상의';
    if (cflag40 & 8) return '치마';
    if (cflag40 & 16) return '하의';
    return '옷';
  }

  /**
   * 키스 가능 여부 체크
   */
  private canKiss(s: GameState): boolean {
    // 볼개그 착용 중
    if (s.equipment[45]) return false;

    // 첫 키스 미경험
    if (s.cflag16 === -1) return false;

    // 더러움 체크
    const stain0 = s.stain[0] || 0;
    const isClean = (stain0 < 2 || stain0 === 16 || stain0 === 17);

    return isClean;
  }

  /**
   * 소질 보유 여부 체크
   */
  private hasTalent(s: GameState, talentId: number): boolean {
    return s.talents.includes(talentId);
  }

  /**
   * 능력치 값 가져오기
   */
  private getAbility(s: GameState, abilityId: number): number {
    return s.abilities[abilityId] || 0;
  }

  /**
   * 파라미터 값 가져오기
   */
  private getParam(s: GameState, paramId: number): number {
    return s.params[paramId] || 0;
  }

  /**
   * 장비 착용 여부 체크
   */
  private hasEquipment(s: GameState, equipId: number): boolean {
    return !!s.equipment[equipId];
  }

  // ========================================================================
  // COM0: 애무
  // ========================================================================

  private generateCom0(): void {
    const s = this.state;
    const parts: string[] = [];

    // 1. 의상 접두사
    const clothingType = this.getClothingType(s);
    if (clothingType !== ClothingType.NAKED) {
      parts.push(this.getClothingName(s), ' 너머로 ');
    }

    // 2. 행위자
    const actor = this.getActorType(s);
    if (actor === ActorType.PLAYER) {
      parts.push('플레이어는 ');

      // 키스 조건
      if (this.canKiss(s)) {
        parts.push('키스하면서 ');
      }
    }

    // 3. 대상 + 소질 수식어
    parts.push(s.name, '의 ');

    if (this.hasTalent(s, 135)) {
      parts.push('미숙한 ');
    } else if (this.hasTalent(s, 100)) {
      parts.push('미발달된 ');
    } else if (this.hasTalent(s, 115)) {
      parts.push('포동포동하게 살찐 ');
    }

    // 4. 행위 설명
    switch (actor) {
      case ActorType.SLIME:
        parts.push('몸을 슬라임이 기어다녔다…');
        break;
      case ActorType.TENTACLE:
        parts.push('몸을 촉수가 희롱했다…');
        break;
      case ActorType.DOG:
        parts.push('몸을 개의 혀가 핥아댔다…');
        break;
      default:
        parts.push('몸을 열심히 애무했다…');
    }

    this.addMessage(parts.join(''));

    // 5. 임신 메시지
    if (this.hasTalent(s, 153)) {  // 임신중
      const dueDate = s.cflag110;
      const daysUntilBirth = dueDate - s.day;

      if (daysUntilBirth <= 5) {
        // 특수 의상 착용 시 제외
        if (!(s.cflag42 === 11 && (s.cflag40 & 64))) {
          this.addMessage(`${s.name}의 둥글게 부풀어오른 배 안에서, 아이의 발길질이 희미하게 느껴진다……`);
        }
      }
    }
  }

  // ========================================================================
  // COM1: 커닐링구스
  // ========================================================================

  private generateCom1(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);
    parts.push(this.getActorName(actor), '는 ');

    // 행위
    if (this.hasEquipment(s, 57)) {  // 이와시미즈
      parts.push(s.name, '을 얼굴 위에 올라타게하고, 소리를 내면서 음순을 빨아');
    } else {
      parts.push(s.name, '의 비순을 상냥하게 빨아 풀어');
    }

    // 후타나리/욕정 수식어
    const lust = this.getParam(s, 5);  // 욕정
    const isFutanari = this.hasTalent(s, 121);
    const highLust = lust >= 1000000;

    if (isFutanari && highLust) {
      parts.push(', 단단히 발기한 페니스를 혀로 핥아');
    } else if (isFutanari) {
      parts.push(', 페니스 밑을 혀로 빨아올려');
    } else if (highLust) {
      parts.push(', 부풀어오른 클리토리스를 혀로 빨아올려');
    }

    parts.push('주었다…');
    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM2: 애널애무
  // ========================================================================

  private generateCom2(): void {
    const s = this.state;
    const actor = this.getActorType(s);

    // 특수 장비 우선 체크
    if (actor === ActorType.SLIME) {
      this.addMessage(`슬라임이 ${s.name}의 애널을 자극하고 있다…`);
      return;
    }

    if (actor === ActorType.TENTACLE) {
      this.addMessage(`점액 투성이의 촉수가 ${s.name}의 애널을 자극하고 있다…`);
      return;
    }

    // 애널 장비별 처리
    if (this.hasEquipment(s, 13)) {  // 애널바이브
      this.addMessage('조금씩 진동하는 애널바이브를 앞뒤로 넣고 빼기를 반복했다…');
    } else if (this.hasEquipment(s, 19)) {  // 애널비즈
      this.addMessage('애널비즈를 가볍게 움직여 주었다…');
    } else if (this.hasEquipment(s, 46)) {  // 애널플러그
      this.addMessage('배설감으로 떨리는 국혈을 플러그로 빙글빙글 돌려주었다…');
    } else if (this.hasEquipment(s, 49)) {  // 애널전극
      this.addMessage('희미하게 소리가 나는 전극으로 국혈을 집요허게 괴롭혔다…');
    } else {
      // 기본 애무
      const parts: string[] = [];
      parts.push('플레이어는 ', s.name, '의 애널을 자극');

      const lust = this.getParam(s, 5);
      const analSense = this.getAbility(s, 3);  // A감각

      if (lust >= 1000000 && analSense >= 3) {
        parts.push('하며 손 끝으로 직장까지 휘저었다…');
      } else {
        parts.push('했다…');
      }

      this.addMessage(parts.join(''));
    }
  }

  // ========================================================================
  // COM3: 자위
  // ========================================================================

  private generateCom3(): void {
    const s = this.state;

    // 성별 정보
    const genderInfo = this.getGenderInfo(s);

    // 순응도 vs 반감
    const obedience = this.getAbility(s, 10);
    const antipathy = this.getParam(s, 12);

    // 순응도 레벨에 따른 메시지
    if (obedience < antipathy) {
      this.masturbationRejected(s);
    } else if (obedience < 50) {
      this.masturbationResisting(s);
    } else if (obedience < 80) {
      this.masturbationObedient(s);
    } else {
      this.masturbationTrained(s, genderInfo.gender);
    }

    // 연속 자위 고조 상태
    this.masturbationContinuous(s, genderInfo.genitalAction);
  }

  /**
   * 성별/성기 정보
   */
  private getGenderInfo(s: GameState): { gender: string; genitalAction: string } {
    const isMale = this.hasTalent(s, 122);
    const isFutanari = this.hasTalent(s, 121);

    if (isMale) {
      return {
        gender: '수컷',
        genitalAction: '음경을 문지르고'
      };
    } else if (isFutanari) {
      return {
        gender: '암컷',
        genitalAction: '발기한 후타나리 페니스를 문지르며 비부를 만지작거리고'
      };
    } else {
      return {
        gender: '암컷',
        genitalAction: '비부를 만지작거리고'
      };
    }
  }

  /**
   * 자위 거부
   */
  private masturbationRejected(s: GameState): void {
    this.addMessage(`${s.name}에게 자위를 명령해보았지만 거부당했다. 좀 더 지도할 필요가 있다.`);
  }

  /**
   * 저항하며 자위 (순응 < 50)
   */
  private masturbationResisting(s: GameState): void {
    const parts: string[] = [];
    parts.push('플레이어가 자위를 명령하자 ', s.name, '은 ');

    // 의상 벗기
    if (s.cflag40 & 8) {  // 치마 착용
      parts.push(this.getNormalClothingName(s.cflag40), '의 앞을 올려 성기를 드러내고 ');
    }

    // 자존심
    if (this.hasTalent(s, 15)) {
      parts.push('자존심은 굽히지 않고 ');
    }

    // 성격별 태도
    parts.push(this.getPersonalityAttitude(s));

    // 비디오카메라
    if (this.hasEquipment(s, 53)) {
      parts.push('비디오카메라 앞에서 ');
    }

    parts.push('자위를 시작했다.');
    this.addMessage(parts.join(''));
  }

  /**
   * 복종하며 자위 (50 <= 순응 < 80)
   */
  private masturbationObedient(s: GameState): void {
    this.addMessage(`지도의 성과인지, ${s.name}은 플레이어의 명령에 복종해 자위를 시작했다.`);
  }

  /**
   * 완전히 사육된 상태 (순응 >= 80)
   */
  private masturbationTrained(s: GameState, gender: string): void {
    this.addMessage(`플레이어가 명령하자 기뻐하며, ${s.name}은 완전히 사육된 ${gender}의 표정으로 자위를 시작했다.`);
  }

  /**
   * 성격에 따른 태도 수식어
   */
  private getPersonalityAttitude(s: GameState): string {
    if (this.hasTalent(s, 22)) return '무표정한 얼굴로 묵묵히 ';
    if (this.hasTalent(s, 10) || this.hasTalent(s, 14)) return '떨리는 손 끝으로 ';
    if (this.hasTalent(s, 11)) return '반항적으로 노려봤지만 ';
    if (this.hasTalent(s, 12)) return '굴욕으로 입술을 깨물고 ';
    if (this.hasTalent(s, 35)) return '수치심에 귀까지 완전히 빨개져 ';
    return '';
  }

  /**
   * 연속 자위 고조 상태
   */
  private masturbationContinuous(s: GameState, genitalAction: string): void {
    // 전제 조건
    const lust = this.getParam(s, 5);
    const isPrevMasturbation = s.prevCom === 3;

    if (lust < 5000 || !isPrevMasturbation) {
      return;  // 조건 불만족
    }

    // 능력치 체크
    const cSense = this.getAbility(s, 0) >= 5;
    const bSense = this.getAbility(s, 1) >= 5;
    const vSense = this.getAbility(s, 2) >= 5;
    const aSense = this.getAbility(s, 3) >= 5;
    const obedience = this.getAbility(s, 10) >= 3;

    const highSensitivity = cSense && bSense;

    // 케이스별 메시지
    if (this.hasEquipment(s, 11) && this.hasEquipment(s, 13)
        && vSense && aSense && highSensitivity) {
      // 바이브 + 애널바이브 + 모든 감각 5 이상
      this.addMessage(`${s.name}은 침을 흘리며, 움찔움찔 몸을 떨면서 울고 있다`);
      this.addMessage('절정이 멈추지 않아 계속해서 가고 있는 것 같다…');

    } else if (this.hasEquipment(s, 11) && vSense && highSensitivity) {
      // 바이브 + V감각 5 이상
      this.addMessage(`${s.name}은 애액이 흩날리는 것도 신경쓰지 않고, 바이브를 격렬하게 움직이고 있다.`);
      this.addMessage('이제는 다른 일을 신경쓸 여유도 없는 것 같다…');

    } else if (this.hasEquipment(s, 13) && aSense && highSensitivity) {
      // 애널바이브 + A감각 5 이상
      this.addMessage(`${s.name}은 부들부들 몸을 떨면서, 아누스에 바이브를 삽입하고 있다`);
      this.addMessage('주름을 밀고 들어올때마다 몇번이나 절정에 도달해버리는 것 같다…');

    } else if (obedience && highSensitivity) {
      // 순응도 3 이상
      this.addMessage(`${s.name}은 교성을 흘리며 일심분란하게 자신의 ${genitalAction} 있다`);
      this.addMessage('멈추고 싶어도 손이 멋대로 움직여 멈춰지지 않는 것 같다…');
    }
  }

  // ========================================================================
  // COM4: 펠라한다
  // ========================================================================

  private generateCom4(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);
    parts.push(this.getActorName(actor), '는 ', s.name, '의 ');

    // 발기 상태
    const lust = this.getParam(s, 5);
    if (lust >= 1000000) {
      parts.push('딱딱하게 발기된 ');
    }

    parts.push('페니스를 입에 삼키고 빨기 시작했다…');
    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM5: 가슴애무
  // ========================================================================

  private generateCom5(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);

    if (actor === ActorType.DOG) {
      parts.push('개는 할짝할짝 소리를 내며 ');
    } else if (actor === ActorType.PLAYER) {
      parts.push('플레이어는 ');

      // 피어싱 체크
      if (s.cflag7 & 1) {
        parts.push('유두를 관통하고 있는 금속제 피어스를 가볍게 잡아당기면서 ');
      }
    }

    // 대상
    parts.push(s.name, '의 ');

    // 가슴 크기 수식어
    parts.push(this.getBreastSizeModifier(s));

    // 행위
    parts.push(this.getBreastAction(s, actor));

    this.addMessage(parts.join(''));
  }

  /**
   * 가슴 크기 수식어
   */
  private getBreastSizeModifier(s: GameState): string {
    if (this.hasTalent(s, 116)) {  // 빈유
      return '완전히 평평한 ';
    }
    if (this.hasTalent(s, 100) && this.hasTalent(s, 109)) {  // 미발달 + 작은가슴
      return '간신히 부푼 것을 알 수 있을 정도의 ';
    }
    if (this.hasTalent(s, 109)) {  // 작은가슴
      return '표준보다 약간 작은 ';
    }
    if (this.hasTalent(s, 110) && !this.hasEquipment(s, 89)) {  // 큰가슴
      return '손에서 넘쳐흐를 것 같은 ';
    }
    if (this.hasTalent(s, 114)) {  // 폭유
      return '한 쪽 가슴만으로도 넘쳐흐를 것 같은 ';
    }
    return '';
  }

  /**
   * 가슴애무 행위 설명
   */
  private getBreastAction(s: GameState, actor: ActorType): string {
    switch (actor) {
      case ActorType.SLIME:
        return '가슴에 슬라임이 모이기 시작했다…';
      case ActorType.TENTACLE:
        return '가슴을 짜내듯이, 촉수가 달라붙었다…';
      case ActorType.DOG:
        return '가슴을 빨고 있다…';
      default:
        if (this.hasTalent(s, 116)) {  // 빈유
          return '가슴을 더듬었다…';
        }
        return '가슴을 주물렀다…';
    }
  }

  // ========================================================================
  // COM6: 키스한다
  // ========================================================================

  private generateCom6(): void {
    const s = this.state;

    const actor = this.getActorType(s);
    const isSpecialCostume = s.cflag42 === 11 && (s.cflag40 & 64);

    if (actor === ActorType.DOG && isSpecialCostume) {
      const costumeName = this.getSpecialCostumeName(s.cflag42);
      this.addMessage(`들개는 ${costumeName}를 핥고 있다……`);
    } else if (isSpecialCostume) {
      const costumeName = this.getSpecialCostumeName(s.cflag42);
      this.addMessage(`플레이어는 ${costumeName}에게 키스했다……`);
    } else if (actor === ActorType.DOG) {
      this.addMessage(`개는 ${s.name}에게 키스했다……`);
    } else {
      this.addMessage(`플레이어는 ${s.name}에게 키스했다……`);
    }
  }

  // ========================================================================
  // COM7: 조개벌리기
  // ========================================================================

  private generateCom7(): void {
    const s = this.state;
    const parts: string[] = [];

    // 공개 여부 체크
    if (this.hasEquipment(s, 53)) {
      parts.push('공개 ');
    }

    parts.push(s.name, '는 ');

    // 자위 행위
    parts.push('자신의 ');

    // 후타나리 체크
    if (this.hasTalent(s, 121)) {
      parts.push('후타나리 ');
    }

    parts.push('질구를 손가락으로 벌려 보였다…');

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM8: 손가락삽입
  // ========================================================================

  private generateCom8(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);
    parts.push(this.getActorName(actor), '는 ');

    // 의상 접두사
    const clothingType = this.getClothingType(s);
    if (clothingType !== ClothingType.NAKED) {
      parts.push(this.getClothingName(s), ' 너머로 ');
    }

    // 대상
    parts.push(s.name, '의 ');

    // 후타나리 체크
    if (this.hasTalent(s, 121)) {
      parts.push('후타나리 ');
    }

    // 행위
    if (actor === ActorType.TENTACLE) {
      parts.push('질 안에 촉수를 삽입했다…');
    } else {
      parts.push('질 안에 손가락을 삽입했다…');
    }

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM9: 애널핥기
  // ========================================================================

  private generateCom9(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);

    if (actor === ActorType.DOG) {
      parts.push('개는 ');
      parts.push(s.name, '의 ');
      parts.push('항문을 핥고 있다…');
    } else {
      parts.push('플레이어는 ');

      // 의상 접두사
      const clothingType = this.getClothingType(s);
      if (clothingType !== ClothingType.NAKED) {
        parts.push(this.getClothingName(s), ' 너머로 ');
      }

      parts.push(s.name, '의 ');
      parts.push('항문을 혀로 핥았다…');
    }

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM10: 로터
  // ========================================================================

  private generateCom10(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);
    parts.push(this.getActorName(actor), '는 ');

    // 의상 접두사
    const clothingType = this.getClothingType(s);
    if (clothingType !== ClothingType.NAKED) {
      parts.push(this.getClothingName(s), ' 너머로 ');
    }

    // 대상
    parts.push(s.name, '의 ');

    // 클리토리스 수식어 추가
    if (this.hasTalent(s, 107)) {  // 클리토리스 비대
      parts.push('비대한 ');
    }

    parts.push('클리토리스에 ');

    // 로터 행위
    if (actor === ActorType.SLIME) {
      parts.push('슬라임이 모이기 시작했다…');
    } else if (actor === ActorType.TENTACLE) {
      parts.push('촉수가 달라붙었다…');
    } else {
      parts.push('로터를 대고 있다…');
    }

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM11: 바이브
  // ========================================================================

  private generateCom11(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);

    if (actor === ActorType.TENTACLE) {
      // 촉수 삽입
      parts.push(this.getActorName(actor), '가 ');

      // 의상 접두사
      const clothingType = this.getClothingType(s);
      if (clothingType !== ClothingType.NAKED) {
        parts.push(this.getClothingName(s), ' 너머로 ');
      }

      parts.push(s.name, '의 ');

      // 후타나리 체크
      if (this.hasTalent(s, 121)) {
        parts.push('후타나리 ');
      }

      parts.push('질 안에 꿈틀거리며 들어왔다…');
    } else {
      // 바이브 삽입
      parts.push(this.getActorName(actor), '는 ');

      // 의상 접두사
      const clothingType = this.getClothingType(s);
      if (clothingType !== ClothingType.NAKED) {
        parts.push(this.getClothingName(s), ' 너머로 ');
      }

      parts.push(s.name, '의 ');

      // 후타나리 체크
      if (this.hasTalent(s, 121)) {
        parts.push('후타나리 ');
      }

      parts.push('질 안에 바이브를 삽입했다…');
    }

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM12: E마사지기
  // ========================================================================

  private generateCom12(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);
    parts.push(this.getActorName(actor), '는 ');

    // 의상 접두사
    const clothingType = this.getClothingType(s);
    if (clothingType !== ClothingType.NAKED) {
      parts.push(this.getClothingName(s), ' 너머로 ');
    }

    // 대상
    parts.push(s.name, '의 ');

    // 클리토리스 수식어
    if (this.hasTalent(s, 107)) {  // 클리토리스 비대
      parts.push('비대한 ');
    }

    parts.push('클리토리스에 ');

    // 행위
    if (actor === ActorType.SLIME) {
      parts.push('슬라임이 집중적으로 모여들기 시작했다…');
    } else if (actor === ActorType.TENTACLE) {
      parts.push('촉수가 강하게 달라붙었다…');
    } else {
      parts.push('전동 마사지기를 강하게 눌렀다…');
    }

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM13: 애널바이브
  // ========================================================================

  private generateCom13(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);

    if (actor === ActorType.TENTACLE) {
      // 애널촉수
      parts.push('촉수가 ');

      // 의상 접두사
      const clothingType = this.getClothingType(s);
      if (clothingType !== ClothingType.NAKED) {
        parts.push(this.getClothingName(s), ' 너머로 ');
      }

      parts.push(s.name, '의 ');
      parts.push('항문 안에 파고들어왔다…');
    } else {
      // 애널바이브
      parts.push(this.getActorName(actor), '는 ');

      // 의상 접두사
      const clothingType = this.getClothingType(s);
      if (clothingType !== ClothingType.NAKED) {
        parts.push(this.getClothingName(s), ' 너머로 ');
      }

      parts.push(s.name, '의 ');
      parts.push('항문에 바이브를 삽입했다…');
    }

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM14: 클리캡
  // ========================================================================

  private generateCom14(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);

    if (actor === ActorType.TENTACLE) {
      // 촉수 클리자극
      parts.push('촉수가 ');

      // 의상 접두사
      const clothingType = this.getClothingType(s);
      if (clothingType !== ClothingType.NAKED) {
        parts.push(this.getClothingName(s), ' 너머로 ');
      }

      parts.push(s.name, '의 ');

      // 클리토리스 수식어
      if (this.hasTalent(s, 107)) {  // 클리토리스 비대
        parts.push('비대한 ');
      }

      parts.push('클리토리스를 빨아들이듯 덮쳤다…');
    } else {
      // 클리캡
      parts.push(this.getActorName(actor), '는 ');

      // 의상 접두사
      const clothingType = this.getClothingType(s);
      if (clothingType !== ClothingType.NAKED) {
        parts.push(this.getClothingName(s), ' 너머로 ');
      }

      parts.push(s.name, '의 ');

      // 클리토리스 수식어
      if (this.hasTalent(s, 107)) {  // 클리토리스 비대
        parts.push('비대한 ');
      }

      parts.push('클리토리스에 전동 클리캡을 장착했다…');
    }

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM15: 니플캡
  // ========================================================================

  private generateCom15(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);

    if (actor === ActorType.TENTACLE) {
      // 촉수 유두자극
      parts.push('촉수가 ');

      // 의상 접두사
      const clothingType = this.getClothingType(s);
      if (clothingType !== ClothingType.NAKED) {
        parts.push(this.getClothingName(s), ' 너머로 ');
      }

      parts.push(s.name, '의 ');
      parts.push('유두를 빨아들이듯 덮쳤다…');
    } else {
      // 니플캡
      parts.push(this.getActorName(actor), '는 ');

      // 의상 접두사
      const clothingType = this.getClothingType(s);
      if (clothingType !== ClothingType.NAKED) {
        parts.push(this.getClothingName(s), ' 너머로 ');
      }

      parts.push(s.name, '의 ');

      // 유두 피어싱 체크
      if (s.cflag7 & 1) {
        parts.push('피어싱이 뚫린 ');
      }

      parts.push('유두에 니플캡을 장착했다…');
    }

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM16: 착유기
  // ========================================================================

  private generateCom16(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);

    if (actor === ActorType.TENTACLE) {
      // 촉수 착유
      parts.push('촉수가 ');
      parts.push(s.name, '의 ');

      // 가슴 크기 수식어
      if (this.hasTalent(s, 110)) {  // 큰가슴
        parts.push('풍만한 ');
      } else if (this.hasTalent(s, 114)) {  // 폭유
        parts.push('거대한 ');
      }

      parts.push('가슴에 달라붙어 짜내기 시작했다…');
    } else {
      // 착유기
      parts.push(this.getActorName(actor), '는 ');
      parts.push(s.name, '의 ');

      // 가슴 크기 수식어
      if (this.hasTalent(s, 110)) {  // 큰가슴
        parts.push('풍만한 ');
      } else if (this.hasTalent(s, 114)) {  // 폭유
        parts.push('거대한 ');
      } else if (this.hasTalent(s, 116)) {  // 빈유
        parts.push('평평한 ');
      }

      parts.push('가슴에 착유기를 장착했다…');
    }

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM17: 오나홀
  // ========================================================================

  private generateCom17(): void {
    const s = this.state;
    const parts: string[] = [];

    // 행위자
    const actor = this.getActorType(s);

    if (actor === ActorType.TENTACLE) {
      // 촉수 페니스자극
      parts.push('촉수가 ');
      parts.push(s.name, '의 ');

      // 후타나리 체크
      if (this.hasTalent(s, 121)) {
        parts.push('후타나리 ');
      }

      parts.push('페니스에 휘감겼다…');
    } else {
      // 오나홀
      parts.push(this.getActorName(actor), '는 ');

      // 의상 접두사
      const clothingType = this.getClothingType(s);
      if (clothingType !== ClothingType.NAKED) {
        parts.push(this.getClothingName(s), ' 너머로 ');
      }

      parts.push(s.name, '의 ');

      // 후타나리 체크
      if (this.hasTalent(s, 121)) {
        parts.push('후타나리 ');
      }

      parts.push('페니스에 오나홀을 끼웠다…');
    }

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM19: 애널비즈
  // ========================================================================

  private generateCom19(): void {
    const s = this.state;
    const parts: string[] = [];

    parts.push('플레이어는 ');

    // 의상 접두사
    const clothingType = this.getClothingType(s);
    if (clothingType !== ClothingType.NAKED) {
      parts.push(this.getClothingName(s), ' 너머로 ');
    }

    parts.push(s.name, '의 ');
    parts.push('항문에 애널비즈를 삽입했다…');

    this.addMessage(parts.join(''));
  }

  // ========================================================================
  // COM20: 정상위
  // ========================================================================

  private generateCom20(): void {
    const s = this.state;
    const parts: string[] = [];

    parts.push('플레이어는 ');

    // 의상 접두사
    const clothingType = this.getClothingType(s);
    if (clothingType !== ClothingType.NAKED) {
      parts.push(this.getClothingName(s), ' 너머로 ');
    }

    parts.push(s.name, '의 ');

    // 후타나리 체크
    if (this.hasTalent(s, 121)) {
      parts.push('후타나리 ');
    }

    parts.push('질 안에 삽입했다…');

    // 처녀 상실 체크
    if (this.hasTalent(s, 74)) {
      this.addMessage(parts.join(''));
      this.addMessage(`${s.name}은 처녀를 잃었다…`);
    } else {
      this.addMessage(parts.join(''));
    }
  }

  // ========================================================================
  // 유틸리티
  // ========================================================================

  /**
   * 메시지 추가
   */
  private addMessage(msg: string): void {
    this.messages.push(msg);
  }
}
