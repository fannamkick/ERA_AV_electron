/**
 * COMF 파일 Phase 2 변환 스크립트
 * 구 타입 시스템 파일들을 신 타입 시스템으로 변환
 */

import fs from 'fs';
import path from 'path';

// 변환 규칙 정의
const replacements: Array<{ from: RegExp; to: string; description: string }> = [
  // ============================================================================
  // 1. Import 문 수정
  // ============================================================================
  {
    from: /import type \{ TrainingCommand, Character, GameState \} from ['"]\.\.\/\.\.\/\.\.\/types['"]/g,
    to: "import type { CommandPlugin, TrainingContext } from '../../types'",
    description: 'Update imports to new type system',
  },

  // ============================================================================
  // 2. Character 속성명 변경 (target.abilities → target.abl)
  // ============================================================================
  {
    from: /target\.abilities/g,
    to: 'target.abl',
    description: 'target.abilities → target.abl',
  },
  {
    from: /context\.target\.abilities/g,
    to: 'context.target.abl',
    description: 'context.target.abilities → context.target.abl',
  },
  {
    from: /assistant\.abilities/g,
    to: 'assistant.abl',
    description: 'assistant.abilities → assistant.abl',
  },
  {
    from: /player\.abilities/g,
    to: 'player.abl',
    description: 'player.abilities → player.abl',
  },

  // talents → talent
  {
    from: /target\.talents/g,
    to: 'target.talent',
    description: 'target.talents → target.talent',
  },
  {
    from: /context\.target\.talents/g,
    to: 'context.target.talent',
    description: 'context.target.talents → context.target.talent',
  },

  // params → palam
  {
    from: /target\.params/g,
    to: 'target.palam',
    description: 'target.params → target.palam',
  },
  {
    from: /context\.target\.params/g,
    to: 'context.target.palam',
    description: 'context.target.params → context.target.palam',
  },

  // marks → mark
  {
    from: /target\.marks/g,
    to: 'target.mark',
    description: 'target.marks → target.mark',
  },

  // ============================================================================
  // 3. 한국어 속성 접근을 숫자 인덱스로 변환
  // ============================================================================

  // ABL 변환
  {
    from: /\.abl\['C감각'\]/g,
    to: '.abl[0]',
    description: "abl['C감각'] → abl[0]",
  },
  {
    from: /\.abl\['B감각'\]/g,
    to: '.abl[1]',
    description: "abl['B감각'] → abl[1]",
  },
  {
    from: /\.abl\['V감각'\]/g,
    to: '.abl[2]',
    description: "abl['V감각'] → abl[2]",
  },
  {
    from: /\.abl\['A감각'\]/g,
    to: '.abl[3]',
    description: "abl['A감각'] → abl[3]",
  },
  {
    from: /\.abl\['욕망'\]/g,
    to: '.abl[11]',
    description: "abl['욕망'] → abl[11]",
  },
  {
    from: /\.abl\['기교'\]/g,
    to: '.abl[12]',
    description: "abl['기교'] → abl[12]",
  },
  {
    from: /\.abl\['봉사기술'\]/g,
    to: '.abl[13]',
    description: "abl['봉사기술'] → abl[13]",
  },
  {
    from: /\.abl\['봉사정신'\]/g,
    to: '.abl[16]',
    description: "abl['봉사정신'] → abl[16]",
  },
  {
    from: /\.abl\['마조끼'\]/g,
    to: '.abl[21]',
    description: "abl['마조끼'] → abl[21]",
  },

  // PALAM 변환
  {
    from: /\.palam\['욕정'\]/g,
    to: '.palam[6]',
    description: "palam['욕정'] → palam[6]",
  },

  // TALENT 변환 (자주 사용되는 것들)
  {
    from: /\.talent\['수줍음'\]/g,
    to: '.talent[35]',
    description: "talent['수줍음'] → talent[35]",
  },
  {
    from: /\.talent\['혀놀림'\]/g,
    to: '.talent[52]',
    description: "talent['혀놀림'] → talent[52]",
  },

  // MARK 변환
  {
    from: /\.mark\['쾌락각인'\]/g,
    to: '.mark[1]',
    description: "mark['쾌락각인'] → mark[1]",
  },

  // ============================================================================
  // 4. SourceValues 객체를 배열로 변환
  // ============================================================================

  // SOURCE 객체 선언을 배열로 변경
  {
    from: /let source: SourceValues = \{[\s\S]*?\};/g,
    to: 'const source: number[] = new Array(19).fill(0);',
    description: 'Convert SOURCE object literal to array',
  },
  {
    from: /const source: SourceValues = \{[\s\S]*?\};/g,
    to: 'const source: number[] = new Array(19).fill(0);',
    description: 'Convert SOURCE const object to array',
  },

  // SOURCE 객체 접근을 배열 인덱스로 변경
  { from: /source\['쾌C'\]/g, to: 'source[0]', description: "source['쾌C'] → source[0]" },
  { from: /source\['쾌V'\]/g, to: 'source[1]', description: "source['쾌V'] → source[1]" },
  { from: /source\['쾌A'\]/g, to: 'source[2]', description: "source['쾌A'] → source[2]" },
  { from: /source\['쾌B'\]/g, to: 'source[3]', description: "source['쾌B'] → source[3]" },
  { from: /source\['윤활'\]/g, to: 'source[6]', description: "source['윤활'] → source[6]" },
  { from: /source\['굴종'\]/g, to: 'source[7]', description: "source['굴종'] → source[7]" },
  { from: /source\['욕정'\]/g, to: 'source[8]', description: "source['욕정'] → source[8]" },
  { from: /source\['굴복'\]/g, to: 'source[9]', description: "source['굴복'] → source[9]" },
  { from: /source\['습득'\]/g, to: 'source[10]', description: "source['습득'] → source[10]" },
  { from: /source\['수치심'\]/g, to: 'source[11]', description: "source['수치심'] → source[11]" },
  { from: /source\['고통'\]/g, to: 'source[12]', description: "source['고통'] → source[12]" },
  { from: /source\['공포'\]/g, to: 'source[13]', description: "source['공포'] → source[13]" },
  { from: /source\['반감'\]/g, to: 'source[14]', description: "source['반감'] → source[14]" },
  { from: /source\['불쾌'\]/g, to: 'source[15]', description: "source['불쾌'] → source[15]" },
  { from: /source\['억울'\]/g, to: 'source[16]', description: "source['억울'] → source[16]" },
  { from: /source\['불결'\]/g, to: 'source[17]', description: "source['불결'] → source[17]" },

  // SOURCE dot notation
  { from: /source\.쾌C(?!\w)/g, to: 'source[0]', description: 'source.쾌C → source[0]' },
  { from: /source\.쾌V(?!\w)/g, to: 'source[1]', description: 'source.쾌V → source[1]' },
  { from: /source\.쾌A(?!\w)/g, to: 'source[2]', description: 'source.쾌A → source[2]' },
  { from: /source\.쾌B(?!\w)/g, to: 'source[3]', description: 'source.쾌B → source[3]' },
  { from: /source\.윤활(?!\w)/g, to: 'source[6]', description: 'source.윤활 → source[6]' },
  { from: /source\.굴종(?!\w)/g, to: 'source[7]', description: 'source.굴종 → source[7]' },
  { from: /source\.욕정(?!\w)/g, to: 'source[8]', description: 'source.욕정 → source[8]' },
  { from: /source\.굴복(?!\w)/g, to: 'source[9]', description: 'source.굴복 → source[9]' },
  { from: /source\.습득(?!\w)/g, to: 'source[10]', description: 'source.습득 → source[10]' },
  { from: /source\.수치심(?!\w)/g, to: 'source[11]', description: 'source.수치심 → source[11]' },
  { from: /source\.고통(?!\w)/g, to: 'source[12]', description: 'source.고통 → source[12]' },
  { from: /source\.공포(?!\w)/g, to: 'source[13]', description: 'source.공포 → source[13]' },
  { from: /source\.반감(?!\w)/g, to: 'source[14]', description: 'source.반감 → source[14]' },
  { from: /source\.불쾌(?!\w)/g, to: 'source[15]', description: 'source.불쾌 → source[15]' },
  { from: /source\.억울(?!\w)/g, to: 'source[16]', description: 'source.억울 → source[16]' },
  { from: /source\.불결(?!\w)/g, to: 'source[17]', description: 'source.불결 → source[17]' },

  // ============================================================================
  // 5. TrainingCommand → CommandPlugin 변환
  // ============================================================================

  {
    from: /export const command(\d+): TrainingCommand = \{/g,
    to: 'export const COMF$1: CommandPlugin = {',
    description: 'command → COMF export name',
  },

  // canExecute → isAvailable (간단 버전, 복잡한 로직은 수동 수정 필요)
  {
    from: /async canExecute\(state: GameState, target: Character, player: Character\): Promise<\{ canExecute: boolean; score: number; reasons: string\[\] \}>/g,
    to: 'isAvailable(context: TrainingContext): boolean',
    description: 'canExecute signature → isAvailable',
  },

  // ============================================================================
  // 6. Context 속성 변경
  // ============================================================================

  {
    from: /context\.masterTalents/g,
    to: 'context.playerTalents',
    description: 'masterTalents → playerTalents',
  },
  {
    from: /state\.tempFlags/g,
    to: 'context.tflags',
    description: 'state.tempFlags → context.tflags',
  },

  // ============================================================================
  // 7. 제거할 메서드들 (수동 처리 필요 표시)
  // ============================================================================

  {
    from: /calculateSource:/g,
    to: '// TODO: Move calculateSource logic to execute\n  // calculateSource:',
    description: 'Mark calculateSource for manual conversion',
  },
  {
    from: /generateMessage:/g,
    to: '// TODO: Move generateMessage logic to execute\n  // generateMessage:',
    description: 'Mark generateMessage for manual conversion',
  },
];

// 통계
interface ConversionStats {
  totalFiles: number;
  processedFiles: number;
  skippedFiles: number;
  totalReplacements: number;
  errors: string[];
  filesNeedingManualWork: string[];
}

const stats: ConversionStats = {
  totalFiles: 0,
  processedFiles: 0,
  skippedFiles: 0,
  totalReplacements: 0,
  errors: [],
  filesNeedingManualWork: [],
};

/**
 * 단일 파일 변환
 */
function convertFile(filePath: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let replacementCount = 0;

    // Phase 4 파일들은 건너뛰기 (이미 변환됨)
    const fileName = path.basename(filePath);
    if (
      fileName.startsWith('COMF140') ||
      fileName.startsWith('COMF141') ||
      fileName.startsWith('COMF142') ||
      fileName.startsWith('COMF143') ||
      fileName.startsWith('COMF144') ||
      fileName.startsWith('COMF180')
    ) {
      console.log(`  ⊘ ${fileName} (Phase 4 - already converted)`);
      stats.skippedFiles++;
      return false;
    }

    // 모든 변환 규칙 적용
    for (const rule of replacements) {
      const matches = content.match(rule.from);
      if (matches) {
        content = content.replace(rule.from, rule.to);
        replacementCount += matches.length;
      }
    }

    // 수동 작업이 필요한 파일 감지
    if (
      content.includes('calculateSource') ||
      content.includes('generateMessage') ||
      content.includes('TODO:')
    ) {
      stats.filesNeedingManualWork.push(fileName);
    }

    // 변경 사항이 있으면 파일 저장
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      stats.totalReplacements += replacementCount;
      console.log(`  ✓ ${fileName} (${replacementCount} replacements)`);
      return true;
    } else {
      console.log(`  - ${fileName} (no changes)`);
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
  console.log('COMF 파일 Phase 2 변환 시작 (구 타입 시스템 → 신 타입 시스템)');
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

  if (stats.filesNeedingManualWork.length > 0) {
    console.log('⚠️  수동 작업이 필요한 파일들 (calculateSource/generateMessage 포함):');
    stats.filesNeedingManualWork.forEach(f => console.log(`  - ${f}`));
    console.log();
  }

  if (stats.errors.length > 0) {
    console.log('❌ Errors encountered:');
    stats.errors.forEach(err => console.log(`  - ${err}`));
    console.log();
  }

  console.log('✅ Phase 2 변환 스크립트 실행 완료!');
  console.log();
  console.log('다음 단계:');
  console.log('  1. npx tsc --noEmit src/modules/training/commands/commands/COMF*.ts 2>&1 | grep "error TS" | wc -l');
  console.log('  2. 에러가 많이 줄었는지 확인');
  console.log('  3. 남은 에러들 수동 수정');
  console.log();
}

// 실행
main();
