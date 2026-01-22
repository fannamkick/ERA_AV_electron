/**
 * COMF 파일 일괄 변환 스크립트
 * 구 타입 시스템 → 신 타입 시스템 (원본 Character 타입 기반)
 */

import fs from 'fs';
import path from 'path';

// 변환 규칙 정의
const replacements: Array<{ from: RegExp; to: string; description: string }> = [
  // ============================================================================
  // 1. Import 경로 수정
  // ============================================================================
  {
    from: /from ['"]\.\.\/types['"]/g,
    to: "from '../../types'",
    description: 'Import path correction (../types → ../../types)',
  },

  // ============================================================================
  // 2. SOURCE 타입 변경 (객체 → 배열)
  // ============================================================================
  {
    from: /const source: SourceValues = \{\};?/g,
    to: 'const source: number[] = new Array(19).fill(0);',
    description: 'SOURCE declaration (object → array)',
  },
  {
    from: /const source = \{\} as SourceValues;?/g,
    to: 'const source: number[] = new Array(19).fill(0);',
    description: 'SOURCE declaration alternative',
  },

  // ============================================================================
  // 3. SOURCE 객체 접근 → 배열 인덱스 변환
  // ============================================================================
  { from: /source\.쾌C/g, to: 'source[0]', description: 'source.쾌C → source[0]' },
  { from: /source\.쾌V/g, to: 'source[1]', description: 'source.쾌V → source[1]' },
  { from: /source\.쾌A/g, to: 'source[2]', description: 'source.쾌A → source[2]' },
  { from: /source\.쾌B/g, to: 'source[3]', description: 'source.쾌B → source[3]' },
  { from: /source\.쾌감/g, to: 'source[4]', description: 'source.쾌감 → source[4]' },
  { from: /source\.쾌락/g, to: 'source[5]', description: 'source.쾌락 → source[5]' },
  { from: /source\.윤활/g, to: 'source[6]', description: 'source.윤활 → source[6]' },
  { from: /source\.굴종/g, to: 'source[7]', description: 'source.굴종 → source[7]' },
  { from: /source\.욕정/g, to: 'source[8]', description: 'source.욕정 → source[8]' },
  { from: /source\.굴복/g, to: 'source[9]', description: 'source.굴복 → source[9]' },
  { from: /source\.습득/g, to: 'source[10]', description: 'source.습득 → source[10]' },
  { from: /source\.수치심/g, to: 'source[11]', description: 'source.수치심 → source[11]' },
  { from: /source\.고통/g, to: 'source[12]', description: 'source.고통 → source[12]' },
  { from: /source\.공포/g, to: 'source[13]', description: 'source.공포 → source[13]' },
  { from: /source\.반감/g, to: 'source[14]', description: 'source.반감 → source[14]' },
  { from: /source\.불쾌/g, to: 'source[15]', description: 'source.불쾌 → source[15]' },
  { from: /source\.억울/g, to: 'source[16]', description: 'source.억울 → source[16]' },
  { from: /source\.불결/g, to: 'source[17]', description: 'source.불결 → source[17]' },
  { from: /source\.절정/g, to: 'source[18]', description: 'source.절정 → source[18]' },

  // ============================================================================
  // 4. 배열 초기화 (객체 → 배열)
  // ============================================================================
  {
    from: /context\.playerBase = context\.playerBase \|\| \{\}/g,
    to: 'context.playerBase = context.playerBase || []',
    description: 'playerBase initialization',
  },
  {
    from: /context\.playerMaxBase = context\.playerMaxBase \|\| \{\}/g,
    to: 'context.playerMaxBase = context.playerMaxBase || []',
    description: 'playerMaxBase initialization',
  },
  {
    from: /context\.loseBase = context\.loseBase \|\| \{\}/g,
    to: 'context.loseBase = context.loseBase || []',
    description: 'loseBase initialization',
  },
  {
    from: /context\.base = context\.base \|\| \{\}/g,
    to: 'context.base = context.base || []',
    description: 'base initialization',
  },
  {
    from: /context\.maxBase = context\.maxBase \|\| \{\}/g,
    to: 'context.maxBase = context.maxBase || []',
    description: 'maxBase initialization',
  },
  {
    from: /context\.stain = context\.stain \|\| \{\}/g,
    to: 'context.stain = context.stain || []',
    description: 'stain initialization',
  },
  {
    from: /context\.playerStain = context\.playerStain \|\| \{\}/g,
    to: 'context.playerStain = context.playerStain || []',
    description: 'playerStain initialization',
  },

  // 일반 패턴
  {
    from: /= \{\} as number\[\]/g,
    to: '= []',
    description: 'Remove unnecessary type assertion',
  },

  // ============================================================================
  // 5. 속성명 수정 (복수형 → 단수형)
  // ============================================================================
  {
    from: /context\.playerStains/g,
    to: 'context.playerStain',
    description: 'playerStains → playerStain',
  },
  {
    from: /context\.stains(?!\.)/g,
    to: 'context.stain',
    description: 'stains → stain (avoid false positive with stains.)',
  },

  // ============================================================================
  // 6. Typo 수정
  // ============================================================================
  {
    from: /context\.mark(?!s)/g,
    to: 'context.marks',
    description: 'context.mark → context.marks',
  },

  // ============================================================================
  // 7. LOSEBASE 배열 초기화
  // ============================================================================
  {
    from: /const loseBase: number\[\] = \{\};?/g,
    to: 'const loseBase: number[] = new Array(10).fill(0);',
    description: 'loseBase declaration',
  },
  {
    from: /const loseBase = \[\];?/g,
    to: 'const loseBase: number[] = new Array(10).fill(0);',
    description: 'loseBase declaration (no type)',
  },
];

// 통계
interface ConversionStats {
  totalFiles: number;
  processedFiles: number;
  skippedFiles: number;
  totalReplacements: number;
  errors: string[];
}

const stats: ConversionStats = {
  totalFiles: 0,
  processedFiles: 0,
  skippedFiles: 0,
  totalReplacements: 0,
  errors: [],
};

/**
 * 단일 파일 변환
 */
function convertFile(filePath: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let replacementCount = 0;

    // 모든 변환 규칙 적용
    for (const rule of replacements) {
      const matches = content.match(rule.from);
      if (matches) {
        content = content.replace(rule.from, rule.to);
        replacementCount += matches.length;
      }
    }

    // 변경 사항이 있으면 파일 저장
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      stats.totalReplacements += replacementCount;
      console.log(`  ✓ ${path.basename(filePath)} (${replacementCount} replacements)`);
      return true;
    } else {
      console.log(`  - ${path.basename(filePath)} (no changes)`);
      stats.skippedFiles++;
      return false;
    }
  } catch (error) {
    const errorMsg = `Error processing ${filePath}: ${error}`;
    stats.errors.push(errorMsg);
    console.error(`  ✗ ${errorMsg}`);
    return false;
  }
}

/**
 * 메인 실행 함수
 */
function main() {
  console.log('='.repeat(80));
  console.log('COMF 파일 일괄 변환 시작');
  console.log('='.repeat(80));
  console.log();

  const comfDir = path.join(process.cwd(), 'src', 'modules', 'training', 'commands', 'commands');

  if (!fs.existsSync(comfDir)) {
    console.error(`❌ Directory not found: ${comfDir}`);
    process.exit(1);
  }

  // COMF 파일 목록 가져오기
  const allFiles = fs.readdirSync(comfDir);
  const comfFiles = allFiles.filter(f => f.startsWith('COMF') && f.endsWith('.ts'));

  stats.totalFiles = comfFiles.length;

  console.log(`📁 Directory: ${comfDir}`);
  console.log(`📄 Found ${comfFiles.length} COMF files`);
  console.log();

  // 각 파일 처리
  console.log('Processing files...');
  console.log('-'.repeat(80));

  for (const file of comfFiles) {
    const filePath = path.join(comfDir, file);
    if (convertFile(filePath)) {
      stats.processedFiles++;
    }
  }

  // 통계 출력
  console.log();
  console.log('='.repeat(80));
  console.log('변환 완료');
  console.log('='.repeat(80));
  console.log(`총 파일 수:        ${stats.totalFiles}`);
  console.log(`변환된 파일:       ${stats.processedFiles}`);
  console.log(`변경 없는 파일:    ${stats.skippedFiles}`);
  console.log(`총 치환 횟수:      ${stats.totalReplacements}`);
  console.log();

  if (stats.errors.length > 0) {
    console.log('⚠️  Errors encountered:');
    stats.errors.forEach(err => console.log(`  - ${err}`));
    console.log();
  }

  console.log('✅ 변환 스크립트 실행 완료!');
  console.log();
  console.log('다음 단계:');
  console.log('  1. npx tsc --noEmit  (타입 체크)');
  console.log('  2. 에러 발생 시 수동 수정');
  console.log();
}

// 실행
main();
