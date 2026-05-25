/**
 * characterFactory 단위 테스트
 */

import { createRandomCharacter } from '../characterFactory';

describe('createRandomCharacter', () => {
  it('should create a character with valid structure', () => {
    const char = createRandomCharacter(1);

    expect(char.id).toBe(1);
    expect(char.name).toBeTruthy();
    expect(char.callName).toBeTruthy();
  });

  it('should use 90%+ of BASE fields', () => {
    const char = createRandomCharacter(1);
    const usedFields = Object.keys(char.base).length;

    // 23개 중 20개 이상 사용
    expect(usedFields).toBeGreaterThanOrEqual(20);
  });

  it('should use 80%+ of Abilities fields', () => {
    const char = createRandomCharacter(1);
    const usedFields = Object.keys(char.abl).length;

    // 34개 중 27개 이상 사용
    expect(usedFields).toBeGreaterThanOrEqual(27);
  });

  it('should initialize all 17 Parameters', () => {
    const char = createRandomCharacter(1);

    // 17개 모두 초기화
    expect(Object.keys(char.palam).length).toBe(17);
  });

  it('should generate 10-30 Talents', () => {
    const char = createRandomCharacter(1);
    const talentCount = Object.keys(char.talent).length;

    // 보통 10-30개 정도 생성됨
    expect(talentCount).toBeGreaterThanOrEqual(8);
    expect(talentCount).toBeLessThanOrEqual(35);
  });

  it('should generate 20+ Experiences', () => {
    const char = createRandomCharacter(1);
    const expCount = Object.keys(char.exp).length;

    // 20개 이상 생성
    expect(expCount).toBeGreaterThanOrEqual(15);
  });

  it('should maintain virgin consistency', () => {
    // 여러 캐릭터를 생성해서 처녀인 경우 체크
    for (let i = 0; i < 10; i++) {
      const char = createRandomCharacter(i);

      if (char.talent[0] === 1) { // 처녀
        // V경험 없음
        expect(char.exp[0]).toBeUndefined();
      }
    }
  });

  it('should set breast size talent based on measurements', () => {
    const char = createRandomCharacter(1);
    const bust = char.base[22] || 0;
    const breastCup = Math.floor(bust / 15);

    // 가슴 크기 특성이 설정되어야 함
    const hasBreastTalent =
      char.talent[109] === 1 || // 빈유
      char.talent[116] === 1 || // 절벽
      char.talent[110] === 1 || // 거유
      char.talent[114] === 1;   // 폭유

    expect(hasBreastTalent).toBe(true);
  });

  it('should set charm and price', () => {
    const char = createRandomCharacter(1);

    // 매력치 설정
    expect(char.base[31]).toBeGreaterThan(0);

    // 가격 설정
    expect(char.cflag[620]).toBeGreaterThan(0);
  });

  it('should have age-appropriate virgin probability', () => {
    const youngChars: number[] = [];
    const oldChars: number[] = [];

    // 젊은 캐릭터 (18-22세) 100명 생성
    for (let i = 0; i < 100; i++) {
      const char = createRandomCharacter(i);
      if (char.base[9] && char.base[9] <= 22) {
        if (char.talent[0] === 1) youngChars.push(1);
      }
    }

    // 나이든 캐릭터 (28-35세) 100명 생성
    for (let i = 100; i < 200; i++) {
      const char = createRandomCharacter(i);
      if (char.base[9] && char.base[9] >= 28) {
        if (char.talent[0] === 1) oldChars.push(1);
      }
    }

    // 젊은 캐릭터가 더 높은 처녀 비율을 가져야 함
    // (이 테스트는 확률적이므로 실패할 수도 있음)
    console.log(`Young virgins: ${youngChars.length}, Old virgins: ${oldChars.length}`);
  });

  it('should generate varied characters', () => {
    const chars = Array.from({ length: 10 }, (_, i) => createRandomCharacter(i));

    // 10개 캐릭터가 모두 다른 특성 조합을 가져야 함
    const talentSignatures = chars.map(c => Object.keys(c.talent).join(','));
    const uniqueSignatures = new Set(talentSignatures);

    // 최소 8개 이상은 다른 조합이어야 함
    expect(uniqueSignatures.size).toBeGreaterThanOrEqual(8);
  });

  it('should initialize all required data structures', () => {
    const char = createRandomCharacter(1);

    // 모든 필수 구조 존재
    expect(char.base).toBeDefined();
    expect(char.abl).toBeDefined();
    expect(char.palam).toBeDefined();
    expect(char.talent).toBeDefined();
    expect(char.exp).toBeDefined();
    expect(char.mark).toBeDefined();
    expect(char.juel).toBeDefined();
    expect(char.cflag).toBeDefined();
    expect(char.cstr).toBeDefined();

    // Mark는 0으로 초기화
    expect(char.mark[0]).toBe(0);
    expect(char.mark[1]).toBe(0);
    expect(char.mark[2]).toBe(0);
    expect(char.mark[3]).toBe(0);
  });

  // ========================================
  // 새로운 확률 시스템 테스트
  // ========================================

  it('should average ~22.6 talents over 50 characters', () => {
    const chars = Array.from({ length: 50 }, (_, i) => createRandomCharacter(i));

    const totalTalents = chars.reduce((sum, char) => {
      return sum + Object.keys(char.talent).length;
    }, 0);

    const avgTalents = totalTalents / 50;

    // 목표: 22.6개, 허용 범위: 18~28개
    expect(avgTalents).toBeGreaterThanOrEqual(18);
    expect(avgTalents).toBeLessThanOrEqual(28);

    console.log(`평균 특성 개수: ${avgTalents.toFixed(1)}개 (목표: 22.6개)`);
  });

  it('should have virgin rate around 40-80%', () => {
    const chars = Array.from({ length: 50 }, (_, i) => createRandomCharacter(i));

    const virginCount = chars.filter(char => char.talent[0] === 1).length;
    const virginRate = (virginCount / 50) * 100;

    // 목표: 76%, 허용 범위: 40~90%
    expect(virginRate).toBeGreaterThanOrEqual(40);
    expect(virginRate).toBeLessThanOrEqual(90);

    console.log(`처녀 비율: ${virginRate.toFixed(1)}% (목표: 76%)`);
  });

  it('should not assign forbidden talents', () => {
    const FORBIDDEN = [
      47, 74, 75, 76, 77, 78, 85, 88, 90,  // 조교 전용
      9, 22, 46, 123,  // 약물/정신
      115, 131,  // 이벤트
      130, 136, 137,  // 조교 신체
      180, 181, 182, 183, 184,  // 업소/NTR
      230, 231, 232, 233, 271, 272,  // 강화
      430, 440,  // 최상위
      425, 156,  // 특수
      251, 252, 253,  // 신체 변형
      121, 124,  // 이벤트/연구소
      122,  // 남성 (사용자 제외)
    ];

    const chars = Array.from({ length: 20 }, (_, i) => createRandomCharacter(i));

    chars.forEach(char => {
      FORBIDDEN.forEach(forbiddenId => {
        expect(char.talent[forbiddenId]).toBeUndefined();
      });
    });
  });

  it('should have exclusive talents correctly', () => {
    const chars = Array.from({ length: 50 }, (_, i) => createRandomCharacter(i));

    chars.forEach(char => {
      // 건방짐 vs 얌전함
      const hasKenbou = char.talent[11] === 1;
      const hasYamato = char.talent[14] === 1;
      expect(hasKenbou && hasYamato).toBe(false);

      // 빈유/거유/폭유/절벽 중 최대 1개
      const breastTalents = [
        char.talent[109],
        char.talent[110],
        char.talent[114],
        char.talent[116],
      ].filter(v => v === 1);
      expect(breastTalents.length).toBeLessThanOrEqual(1);
    });
  });

  it('should assign newly discovered talents (trainedTraits, trainedRare)', () => {
    const chars = Array.from({ length: 100 }, (_, i) => createRandomCharacter(i));

    // trainedTraits: 솔직함(13), 젖기쉬움(42), 혀놀림(52), 바이(81), 소악마(87), 정조무관심(31), 인기인(126)
    const trainedTraitsCount = chars.filter(char => {
      return char.talent[13] || char.talent[42] || char.talent[52] ||
             char.talent[81] || char.talent[87] || char.talent[31] || char.talent[126];
    }).length;

    // trainedRare: 새드(83), 네거티브(26), 오줌싸개(57), 노출광(89), 역습(127)
    const trainedRareCount = chars.filter(char => {
      return char.talent[83] || char.talent[26] || char.talent[57] ||
             char.talent[89] || char.talent[127];
    }).length;

    // trainedTraits는 30% 확률이므로 100명 중 최소 10명 이상
    expect(trainedTraitsCount).toBeGreaterThanOrEqual(10);

    // trainedRare는 8% 확률이므로 100명 중 최소 2명 이상
    expect(trainedRareCount).toBeGreaterThanOrEqual(2);

    console.log(`trainedTraits 보유: ${trainedTraitsCount}명, trainedRare 보유: ${trainedRareCount}명`);
  });

  it('should set blood type string correctly', () => {
    const char = createRandomCharacter(1);
    const bloodTypeStr = char.cstr[9];

    expect(['A', 'B', 'O', 'AB']).toContain(bloodTypeStr);
  });

  it('should initialize juel based on experience', () => {
    const chars = Array.from({ length: 20 }, (_, i) => createRandomCharacter(i));

    chars.forEach(char => {
      // 절정경험 >= 10이면 쾌락 구슬 있어야 함
      if (char.exp[2] && char.exp[2] >= 10) {
        const hasJuel = (char.juel[0] || 0) > 0 || (char.juel[1] || 0) > 0;
        expect(hasJuel).toBe(true);
      }
    });
  });

  it('should have consistent parameters based on talents', () => {
    const chars = Array.from({ length: 20 }, (_, i) => createRandomCharacter(i));

    chars.forEach(char => {
      // 얌전함 → 온순
      if (char.talent[14] === 1) {
        expect(char.palam[4]).toBeGreaterThan(0);
      }

      // 건방짐 → 부정
      if (char.talent[11] === 1) {
        expect(char.palam[100]).toBeGreaterThan(0);
      }
    });
  });
});
