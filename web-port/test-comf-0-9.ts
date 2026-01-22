/**
 * COMF0-9 커맨드 테스트 스크립트
 * 게임 로직이 올바르게 작동하는지 검증
 */

import type { Character } from './src/types/character';
import type { MasterCharacter } from './src/types/master';
import type { TrainingContext } from './src/types/training';

// 커맨드 import
import { COMF0_caress } from './src/modules/training/commands/commands/COMF0_caress';
import { COMF1_cunnilingus } from './src/modules/training/commands/commands/COMF1_cunnilingus';
import { COMF2_analCaress } from './src/modules/training/commands/commands/COMF2_analCaress';
import { COMF3_masturbation } from './src/modules/training/commands/commands/COMF3_masturbation';
import { COMF4_fellatio2 } from './src/modules/training/commands/commands/COMF4_fellatio2';
import { COMF5_breastCaress } from './src/modules/training/commands/commands/COMF5_breastCaress';
import { COMF6_kiss } from './src/modules/training/commands/commands/COMF6_kiss';
import { COMF7_selfSpread } from './src/modules/training/commands/commands/COMF7_selfSpread';
import { COMF8_fingerInsertion } from './src/modules/training/commands/commands/COMF8_fingerInsertion';
import { COMF9_analLicking } from './src/modules/training/commands/commands/COMF9_analLicking';

// 테스트용 캐릭터 생성
function createTestCharacter(): Character {
  return {
    id: 1,
    name: '테스트캐릭터',
    abl: {
      0: 0, // C감각
      1: 0, // B감각
      2: 0, // V감각
      3: 0, // A감각
      4: 0, // 쾌감지식
      10: 1, // 종순
      11: 1, // 욕망
      12: 1, // 기교
      16: 0, // 봉사정신
      17: 0, // 노출벽
      18: 0, // 자위중독
    },
    talent: {
      122: 0, // 여성
    },
    palam: {
      0: 0, // 쾌C
      1: 0, // 쾌V
      2: 0, // 쾌A
      3: 0, // 윤활
      5: 0, // 욕정
      12: 0, // 반감
    },
    exp: {
      0: 0, // V경험
      1: 0, // A경험
    },
    mark: {},
    base: {},
    maxBase: {},
    cflag: {
      2: 500, // 호감도
      40: 0, // 의복
    },
  } as unknown as Character;
}

function createTestMaster(): MasterCharacter {
  return {
    id: 0,
    name: 'MASTER',
    abl: { 0: 3 },
    talent: { 52: 0, 122: 1 }, // 남성
    base: {},
    exp: {},
  } as unknown as MasterCharacter;
}

// 테스트용 컨텍스트 생성
function createTestContext(target: Character, master: MasterCharacter): TrainingContext {
  const messages: string[] = [];

  return {
    target,
    targetId: target.id,
    master,

    // 배열 별칭
    abilities: Object.values(target.abl),
    talents: Object.values(target.talent),
    params: Object.values(target.palam),
    exp: Object.values(target.exp),
    marks: Object.values(target.mark || {}),

    // 플레이어
    playerAbilities: Object.values(master.abl),
    playerTalents: Object.values(master.talent),
    playerBase: Object.values(master.base || {}),
    playerExp: Object.values(master.exp || {}),
    playerStain: [],

    // 조수
    assiPlay: 0,
    isAssistantPlay: false,

    // 초기화
    source: new Array(19).fill(0),
    loseBase: new Array(10).fill(0),
    stain: new Array(20).fill(0),
    equipment: {},
    charFlags: target.cflag,
    flags: {},

    day: 1,
    time: 0,

    showMessage: (msg: string) => {
      messages.push(msg);
      console.log(`  [MSG] ${msg}`);
    },

    applySource: (source: number[]) => {
      console.log(`  [SOURCE] 적용:`, source.slice(0, 16));
    },
  } as TrainingContext;
}

// 테스트 실행
async function runTests() {
  console.log('='.repeat(80));
  console.log('COMF0-9 커맨드 테스트 시작');
  console.log('='.repeat(80));

  const commands = [
    { cmd: COMF0_caress, name: 'COMF0_애무' },
    { cmd: COMF1_cunnilingus, name: 'COMF1_커닐링구스' },
    { cmd: COMF2_analCaress, name: 'COMF2_애널애무' },
    { cmd: COMF3_masturbation, name: 'COMF3_자위' },
    { cmd: COMF4_fellatio2, name: 'COMF4_펠라한다' },
    { cmd: COMF5_breastCaress, name: 'COMF5_가슴애무' },
    { cmd: COMF6_kiss, name: 'COMF6_키스' },
    { cmd: COMF7_selfSpread, name: 'COMF7_조개벌리기' },
    { cmd: COMF8_fingerInsertion, name: 'COMF8_손가락삽입' },
    { cmd: COMF9_analLicking, name: 'COMF9_애널핥기' },
  ];

  let passCount = 0;
  let failCount = 0;

  for (const { cmd, name } of commands) {
    console.log('\n' + '-'.repeat(80));
    console.log(`테스트: ${name}`);
    console.log('-'.repeat(80));

    try {
      const target = createTestCharacter();
      const master = createTestMaster();
      const ctx = createTestContext(target, master);

      // 가용성 체크
      const available = cmd.isAvailable(ctx);
      console.log(`  [가용성] ${available ? '✓ 가능' : '✗ 불가'}`);

      if (available) {
        // 실행
        await cmd.execute(ctx);
        console.log(`  [결과] ✓ 성공`);
        passCount++;
      } else {
        console.log(`  [결과] - 스킵 (가용하지 않음)`);
        passCount++;
      }

    } catch (error) {
      console.error(`  [결과] ✗ 실패:`, error);
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('테스트 결과');
  console.log('='.repeat(80));
  console.log(`✓ 성공: ${passCount}/10`);
  console.log(`✗ 실패: ${failCount}/10`);

  if (failCount === 0) {
    console.log('\n🎉 모든 테스트 통과!');
    process.exit(0);
  } else {
    console.log('\n❌ 일부 테스트 실패');
    process.exit(1);
  }
}

// 실행
runTests().catch(console.error);
