/**
 * CSV 데이터 추출 및 분류 스크립트
 * 모든 CSV 파일을 읽어서 JSON으로 정리
 */

const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

const CSV_DIR = path.join(__dirname, '../../CSV');
const OUTPUT_DIR = path.join(__dirname, '../src/constants/generated');

// 출력 디렉토리 생성
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * CSV 파일 읽기 (인코딩 자동 감지)
 */
function readCSV(filename) {
  const filepath = path.join(CSV_DIR, filename);
  const buffer = fs.readFileSync(filepath);

  // UTF-16LE 또는 UTF-8 감지
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    // UTF-16LE BOM
    return iconv.decode(buffer, 'utf-16le');
  } else if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    // UTF-8 BOM
    return buffer.toString('utf-8');
  } else {
    // 기본값: UTF-8
    return buffer.toString('utf-8');
  }
}

/**
 * CSV 파싱 (키-값 형태)
 */
function parseKeyValueCSV(content) {
  const lines = content.split(/\r?\n/);
  const result = {};
  const list = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // 빈 줄이나 주석 건너뛰기
    if (!trimmed || trimmed.startsWith(';') || trimmed.startsWith('//')) {
      continue;
    }

    const parts = trimmed.split(',').map(p => p.trim());
    if (parts.length < 2) continue;

    const id = parseInt(parts[0], 10);
    if (isNaN(id)) continue;

    const name = parts[1];
    const description = parts[2] || '';

    result[id] = name;
    list.push({ id, name, description });
  }

  return { map: result, list };
}

/**
 * Ability 데이터 추출
 */
function extractAbilities() {
  console.log('📊 Extracting Abilities...');
  const content = readCSV('Abl.csv');
  const { map, list } = parseKeyValueCSV(content);

  console.log(`   Found ${list.length} abilities`);

  // 카테고리별 분류
  const categories = {
    '감각 (0-3)': list.filter(a => a.id >= 0 && a.id <= 3),
    '기술 (10-17)': list.filter(a => a.id >= 10 && a.id <= 17),
    '성벽 (20-23)': list.filter(a => a.id >= 20 && a.id <= 23),
    '중독 (30-41)': list.filter(a => a.id >= 30 && a.id <= 41),
    '스펙 (50-52)': list.filter(a => a.id >= 50 && a.id <= 52),
    '특수기능 (70-73)': list.filter(a => a.id >= 70 && a.id <= 73),
    '지식 (80-81)': list.filter(a => a.id >= 80 && a.id <= 81),
  };

  return { map, list, categories };
}

/**
 * Parameter 데이터 추출
 */
function extractParameters() {
  console.log('📊 Extracting Parameters...');
  const content = readCSV('Palam.csv');
  const { map, list } = parseKeyValueCSV(content);

  console.log(`   Found ${list.length} parameters`);

  return { map, list };
}

/**
 * Talent 데이터 추출
 */
function extractTalents() {
  console.log('📊 Extracting Talents...');
  const content = readCSV('Talent.csv');
  const { map, list } = parseKeyValueCSV(content);

  console.log(`   Found ${list.length} talents`);

  // 카테고리별 분류
  const categories = {
    '기본소질 (0-9)': list.filter(t => t.id >= 0 && t.id <= 9),
    '성격 (10-19)': list.filter(t => t.id >= 10 && t.id <= 19),
    '성관심 (20-29)': list.filter(t => t.id >= 20 && t.id <= 29),
    '처녀성 (30-39)': list.filter(t => t.id >= 30 && t.id <= 39),
    '체질 (40-49)': list.filter(t => t.id >= 40 && t.id <= 49),
    '기술 (50-59)': list.filter(t => t.id >= 50 && t.id <= 59),
    '결벽도 (60-69)': list.filter(t => t.id >= 60 && t.id <= 69),
    '솔직도 (70-79)': list.filter(t => t.id >= 70 && t.id <= 79),
    '성벽 (79-99)': list.filter(t => t.id >= 79 && t.id <= 99),
    '신체특징 (99-199)': list.filter(t => t.id >= 99 && t.id <= 199),
    '기타 (200+)': list.filter(t => t.id >= 200),
  };

  return { map, list, categories };
}

/**
 * BASE 데이터 추출
 */
function extractBase() {
  console.log('📊 Extracting BASE stats...');
  const content = readCSV('BASE.csv');
  const { map, list } = parseKeyValueCSV(content);

  console.log(`   Found ${list.length} base stats`);

  return { map, list };
}

/**
 * TypeScript 파일 생성
 */
function generateTypeScriptFile(filename, data, typeName) {
  const content = `/**
 * Auto-generated from CSV files
 * DO NOT EDIT MANUALLY
 */

export const ${typeName}_MAP: Record<number, string> = ${JSON.stringify(data.map, null, 2)};

export const ${typeName}_LIST = ${JSON.stringify(data.list, null, 2)};

${data.categories ? `export const ${typeName}_CATEGORIES = ${JSON.stringify(data.categories, null, 2)};` : ''}
`;

  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`✅ Generated ${filename}`);
}

/**
 * 마크다운 문서 생성
 */
function generateMarkdownDoc(data) {
  let md = '# 게임 데이터 구조 문서\n\n';
  md += '> CSV 파일에서 자동 생성됨\n\n';

  // Abilities
  md += '## 📌 능력치 (ABL)\n\n';
  md += `총 ${data.abilities.list.length}개\n\n`;
  for (const [category, items] of Object.entries(data.abilities.categories)) {
    md += `### ${category}\n\n`;
    md += '| ID | 이름 |\n';
    md += '|---|---|\n';
    for (const item of items) {
      md += `| ${item.id} | ${item.name} |\n`;
    }
    md += '\n';
  }

  // Parameters
  md += '## 📌 파라미터 (PALAM)\n\n';
  md += `총 ${data.parameters.list.length}개\n\n`;
  md += '| ID | 이름 |\n';
  md += '|---|---|\n';
  for (const item of data.parameters.list) {
    md += `| ${item.id} | ${item.name} |\n`;
  }
  md += '\n';

  // Talents
  md += '## 📌 특성 (TALENT)\n\n';
  md += `총 ${data.talents.list.length}개\n\n`;
  for (const [category, items] of Object.entries(data.talents.categories)) {
    md += `### ${category}\n\n`;
    md += '| ID | 이름 |\n';
    md += '|---|---|\n';
    for (const item of items) {
      md += `| ${item.id} | ${item.name} |\n`;
    }
    md += '\n';
  }

  // BASE
  md += '## 📌 기본 스탯 (BASE)\n\n';
  md += `총 ${data.base.list.length}개\n\n`;
  md += '| ID | 이름 |\n';
  md += '|---|---|\n';
  for (const item of data.base.list) {
    md += `| ${item.id} | ${item.name} |\n`;
  }
  md += '\n';

  const filepath = path.join(__dirname, '../docs/DATA_STRUCTURE.md');
  fs.writeFileSync(filepath, md, 'utf-8');
  console.log(`✅ Generated documentation: docs/DATA_STRUCTURE.md`);
}

/**
 * 메인 실행
 */
function main() {
  console.log('🚀 Starting CSV data extraction...\n');

  const abilities = extractAbilities();
  const parameters = extractParameters();
  const talents = extractTalents();
  const base = extractBase();

  console.log('\n📝 Generating TypeScript files...\n');

  generateTypeScriptFile('abilities.ts', abilities, 'ABILITIES');
  generateTypeScriptFile('parameters.ts', parameters, 'PARAMETERS');
  generateTypeScriptFile('talents.ts', talents, 'TALENTS');
  generateTypeScriptFile('base.ts', base, 'BASE');

  console.log('\n📚 Generating documentation...\n');

  generateMarkdownDoc({ abilities, parameters, talents, base });

  console.log('\n✨ Done!\n');
}

main();
